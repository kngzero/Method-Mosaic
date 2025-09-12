import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { withDefaultCrop } from "@/hooks/useBoardState";

export default function CropDialog({ image, onClose, onApply }) {
  const [tempCrop, setTempCrop] = useState(() => withDefaultCrop(image).crop);
  const previewRef = useRef(null);
  const dragStateRef = useRef(null);

  useEffect(() => {
    if (image) setTempCrop(withDefaultCrop(image).crop);
  }, [image]);

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const onPreviewMouseDown = (e) => {
    if (!previewRef.current) return;
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startCrop: { ...tempCrop },
    };
  };

  const onPreviewMouseMove = (e) => {
    const st = dragStateRef.current;
    if (!st || !st.dragging || !previewRef.current) return;
    const box = previewRef.current.getBoundingClientRect();
    const dx = ((e.clientX - st.startX) / box.width) * 100;
    const dy = ((e.clientY - st.startY) / box.height) * 100;
    setTempCrop((c) => ({
      ...c,
      x: clamp(st.startCrop.x + dx, 0, 100),
      y: clamp(st.startCrop.y + dy, 0, 100),
    }));
  };

  const onPreviewMouseUpLeave = () => {
    if (dragStateRef.current) dragStateRef.current.dragging = false;
  };

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setTempCrop((c) => ({
        ...c,
        zoom: clamp((c.zoom || 1) + (e.deltaY > 0 ? -0.05 : 0.05), 1, 4),
      }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [image]);

  useEffect(() => {
    const onKey = (e) => {
      if (!image) return;
      if (e.key === "Escape") return onClose();
      if (e.key === "Enter") return handleApply();
      const step = e.shiftKey ? 2 : 0.5;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        setTempCrop((c) => ({
          ...c,
          x: clamp(c.x + (e.key === "ArrowRight" ? step : e.key === "ArrowLeft" ? -step : 0), 0, 100),
          y: clamp(c.y + (e.key === "ArrowDown" ? step : e.key === "ArrowUp" ? -step : 0), 0, 100),
        }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, onClose]);

  const handleApply = () => {
    onApply(tempCrop);
  };

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onMouseUp={onPreviewMouseUpLeave} onMouseLeave={onPreviewMouseUpLeave}>
      <div className="w-full max-w-[720px] bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-6">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold">Adjust Crop</h3><div className="flex items-center gap-2"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button variant="default" onClick={handleApply}>Apply</Button></div></div>
        <div ref={previewRef} className="mx-auto mb-4 w-[420px] h-[420px] bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 cursor-grab" onMouseDown={onPreviewMouseDown} onMouseMove={onPreviewMouseMove}>
          <img src={image.src} alt="preview" className="w-full h-full object-cover select-none" style={{ objectPosition: `${tempCrop.x}% ${tempCrop.y}%`, transform: `scale(${tempCrop.zoom})`, transformOrigin: "center center" }} draggable={false} />
        </div>
        <div className="space-y-3">
          <div><Label className="text-xs">Zoom</Label><Slider min={1} max={4} step={0.01} value={[tempCrop.zoom]} onValueChange={([v]) => setTempCrop((c) => ({ ...c, zoom: v }))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs">X Position</Label><Slider min={0} max={100} step={0.5} value={[tempCrop.x]} onValueChange={([v]) => setTempCrop((c) => ({ ...c, x: v }))} /></div>
            <div><Label className="text-xs">Y Position</Label><Slider min={0} max={100} step={0.5} value={[tempCrop.y]} onValueChange={([v]) => setTempCrop((c) => ({ ...c, y: v }))} /></div>
          </div>
          <p className="text-[11px] text-neutral-500">Tip: drag to pan • scroll to zoom • arrows to nudge</p>
        </div>
      </div>
    </div>
  );
}

