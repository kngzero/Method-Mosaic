import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Image as ImageIcon, LayoutGrid, RotateCcw, Archive, ArchiveRestore, Download, FileDown } from "lucide-react";
import SettingsDrawer from "@/components/SettingsDrawer";
import TemplateSelector from "@/components/TemplateSelector";
import { cx } from "@/utils/cx";

export default function SettingsPanel({
  open,
  onToggle,
  board,
  resetSettings,
  handleTemplateChange,
  onLogoFiles,
  exportFormat,
  setExportFormat,
  exportError,
  handleExport,
  exportAsPDF,
  saveBoardFile,
  loadBoardFile,
}) {
  const [brandingOpen, setBrandingOpen] = useState(true);
  const [layoutOpen, setLayoutOpen] = useState(true);
  const logoInputRef = useRef(null);
  const boardFileRef = useRef(null);

  const SelectBox = ({ value, onChange, children }) => (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );

  return (
    <SettingsDrawer open={open} onToggle={onToggle}>
      <div className="h-full overflow-y-auto space-y-6">
        <div className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Moodboard Settings</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => { resetSettings(); setBrandingOpen(true); setLayoutOpen(true); }}
              aria-label="Reset settings"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-between px-0 py-1"
              onClick={() => setBrandingOpen((v) => !v)}
              aria-expanded={brandingOpen}
            >
              <span className="flex items-center gap-2 text-sm"><ImageIcon className="h-4 w-4"/>Branding</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2"><Switch checked={board.showText} onCheckedChange={board.setShowText} id="showText"/><Label htmlFor="showText" className="text-sm">Show</Label></div>
                {brandingOpen ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
              </div>
            </button>
            {brandingOpen && (
              <>
                <div className="space-y-3">
                  <Input placeholder="Board title" value={board.boardTitle} onChange={(e) => board.setBoardTitle(e.target.value)} />
                  <Input placeholder="Short description" value={board.boardDescription} onChange={(e) => board.setBoardDescription(e.target.value)} />
                  <div className="space-y-2">
                    <Label className="text-sm">Preset</Label>
                    <select
                      className="input"
                      value={board.brandingPreset}
                      onChange={(e) => board.setBrandingPreset(e.target.value)}
                    >
                      <option value="left-s">Left S</option>
                      <option value="left-m">Left M</option>
                      <option value="center-s">Center S</option>
                      <option value="center-m">Center M</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => logoInputRef.current?.click()}>Upload Logo</Button>
                    {board.logoSrc && <Button variant="ghost" onClick={() => board.setLogoSrc(null)}>Remove</Button>}
                  </div>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onLogoFiles(e.target.files)} />
                  {board.logoSrc && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label className="text-sm">Logo size</Label><Slider min={16} max={128} step={1} value={[board.logoSize]} onValueChange={([v]) => board.setLogoSize(v)} /><div className="text-xs text-neutral-500">{board.logoSize}px</div></div>
                      <div className="flex items-center gap-2 mt-6"><Switch checked={board.logoRounded} onCheckedChange={board.setLogoRounded} id="logoRound"/><Label htmlFor="logoRound">Rounded</Label></div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-between px-0 py-1"
              onClick={() => setLayoutOpen((v) => !v)}
              aria-expanded={layoutOpen}
            >
              <span className="flex items-center gap-2 text-sm"><LayoutGrid className="h-4 w-4"/>Layout</span>
              {layoutOpen ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
            </button>
            {layoutOpen && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm">Template</Label>
                  <TemplateSelector value={board.selectedTemplate} onChange={handleTemplateChange} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Layout mode</Label>
                  <SelectBox value={board.layoutMode} onChange={board.setLayoutMode}>
                    <option value="auto">Auto</option>
                    <option value="grid">Grid</option>
                    <option value="square">Square</option>
                  </SelectBox>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Zoom</Label>
                  <div className="px-1"><Slider min={50} max={200} step={10} value={[board.zoom]} onValueChange={([v]) => board.setZoom(v)} /></div>
                  <div className="text-xs text-neutral-500">{board.zoom}%</div>
                </div>
                <div className={cx("grid gap-4", board.layoutMode === "grid" ? "grid-cols-2" : "grid-cols-1")}>
                  <div className="space-y-2">
                    <Label className="text-sm">Columns</Label>
                    <div className="px-1"><Slider min={1} max={12} step={1} value={[board.columns]} onValueChange={([v]) => board.setColumns(v)} /></div>
                    <div className="text-xs text-neutral-500">{board.columns} column(s)</div>
                  </div>
                  {board.layoutMode === "grid" && (
                    <div className="space-y-2">
                      <Label className="text-sm">Row height</Label>
                      <div className="px-1"><Slider min={1} max={12} step={1} value={[board.rows]} onValueChange={([v]) => board.setRows(v)} /></div>
                      <div className="text-xs text-neutral-500">{board.rows} row(s)</div>
                    </div>
                  )}
                </div>
                <div className="space-y-2"><Label className="text-sm">Gaps</Label><div className="px-1"><Slider min={0} max={48} step={1} value={[board.gap]} onValueChange={([v]) => board.setGap(v)} /></div><div className="text-xs text-neutral-500">{board.gap}px</div></div>
                <div className="space-y-2"><Label className="text-sm">Board padding</Label><div className="px-1"><Slider min={0} max={96} step={2} value={[board.boardPadding]} onValueChange={([v]) => board.setBoardPadding(v)} /></div><div className="text-xs text-neutral-500">{board.boardPadding}px</div></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2"><Switch checked={board.rounded} onCheckedChange={board.setRounded} id="rounded"/><Label htmlFor="rounded">Rounded corners</Label></div>
                  <div className="flex items-center gap-2"><Switch checked={board.shadow} onCheckedChange={board.setShadow} id="shadow"/><Label htmlFor="shadow">Soft shadow</Label></div>
                </div>
                <div className="flex items-center gap-2"><Switch checked={board.showSafeMargin} onCheckedChange={board.setShowSafeMargin} id="safe-margin"/><Label htmlFor="safe-margin">Show safe margin</Label></div>
                <div className="space-y-2"><Label className="text-sm">Background</Label><div className="flex items-center gap-3"><Input type="color" value={board.bg} onChange={(e) => board.setBg(e.target.value)} className="w-16 h-10 p-1 cursor-pointer"/><Input type="text" value={board.bg} onChange={(e) => board.setBg(e.target.value)} /></div></div>
              </>
            )}
          </div>
          <div className="space-y-3">
            <Label className="text-sm">Project</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={saveBoardFile} className="w-full"><Archive className="h-4 w-4 mr-2"/>Save</Button>
              <Button variant="secondary" onClick={() => boardFileRef.current?.click()} className="w-full"><ArchiveRestore className="h-4 w-4 mr-2"/>Load</Button>
            </div>
            <input ref={boardFileRef} type="file" accept=".mlmboard" className="hidden" onChange={(e)=>{ const f = e.target.files?.[0]; if(f) loadBoardFile(f); e.target.value=""; }} />
          </div>
          <div className="space-y-3">
            <Label className="text-sm">Export</Label>
            <div className="grid grid-cols-2 gap-3">
              <SelectBox value={exportFormat} onChange={setExportFormat}>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </SelectBox>
              <Button onClick={handleExport} className="w-full" variant="default"><Download className="h-4 w-4 mr-2"/>Save Image</Button>
              <div className="col-span-2"><Button onClick={exportAsPDF} variant="secondary" className="w-full"><FileDown className="h-4 w-4 mr-2"/>Save as PDF</Button></div>
              {exportError && <div className="col-span-2 text-xs text-red-600">{exportError}</div>}
            </div>
            <p className="text-xs text-neutral-500">Tip: Press ⌘/Ctrl + S to quick-save using the selected image format.</p>
          </div>
        </div>
      </div>
    </SettingsDrawer>
  );
}

