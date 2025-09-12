import { useState, useCallback } from "react";

export const withDefaultCrop = (img) => ({
  colSpan: img?.colSpan ?? 1,
  rowSpan: img?.rowSpan ?? 1,
  ...img,
  crop: {
    x: img?.crop?.x ?? 50,
    y: img?.crop?.y ?? 50,
    zoom: img?.crop?.zoom ?? 1,
  },
});

export const BRANDING_PRESETS = {
  "left-s": {
    header: "flex items-center gap-3 text-left",
    logo: 32,
    title: "text-xl",
    desc: "text-xs",
  },
  "left-m": {
    header: "flex items-center gap-3 text-left",
    logo: 40,
    title: "text-2xl",
    desc: "text-sm",
  },
  "center-s": {
    header: "flex flex-col items-center gap-3 text-center",
    logo: 32,
    title: "text-xl",
    desc: "text-xs",
  },
  "center-m": {
    header: "flex flex-col items-center gap-3 text-center",
    logo: 40,
    title: "text-2xl",
    desc: "text-sm",
  },
};

export default function useBoardState() {
  const [images, _setImages] = useState([]);
  const [assets, _setAssets] = useState([]);
  const [boardTitle, _setBoardTitle] = useState("");
  const [boardDescription, _setBoardDescription] = useState("");
  const [showText, _setShowText] = useState(true);
  const [logoSrc, _setLogoSrc] = useState(null);
  const [logoSize, _setLogoSize] = useState(BRANDING_PRESETS["left-m"].logo);
  const [logoRounded, _setLogoRounded] = useState(true);
  const [brandingPreset, _setBrandingPreset] = useState("left-m");
  const [titleClass, _setTitleClass] = useState(BRANDING_PRESETS["left-m"].title);
  const [descClass, _setDescClass] = useState(BRANDING_PRESETS["left-m"].desc);
  const [gap, _setGap] = useState(12);
  const [columns, _setColumns] = useState(4);
  const [rows, _setRows] = useState(3);
  const [layoutMode, _setLayoutMode] = useState("auto");
  const [rounded, _setRounded] = useState(true);
  const [shadow, _setShadow] = useState(true);
  const [showSafeMargin, _setShowSafeMargin] = useState(false);
  const [boardPadding, _setBoardPadding] = useState(24);
  const [selectedTemplate, _setSelectedTemplate] = useState("custom");
  const [boardWidth, _setBoardWidth] = useState(null);
  const [boardHeight, _setBoardHeight] = useState(null);
  const [boardAspect, _setBoardAspect] = useState(undefined);
  const [zoom, _setZoom] = useState(100);
  const [bg, _setBg] = useState("#ffffff");

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const getSnapshot = useCallback(() => ({
    images: structuredClone(images),
    assets: structuredClone(assets),
    boardTitle,
    boardDescription,
    showText,
    logoSrc,
    logoSize,
    logoRounded,
    brandingPreset,
    titleClass,
    descClass,
    gap,
    columns,
    rows,
    layoutMode,
    rounded,
    shadow,
    showSafeMargin,
    boardPadding,
    selectedTemplate,
    boardWidth,
    boardHeight,
    boardAspect,
    zoom,
    bg,
  }), [images, assets, boardTitle, boardDescription, showText, logoSrc, logoSize, logoRounded, brandingPreset, titleClass, descClass, gap, columns, rows, layoutMode, rounded, shadow, showSafeMargin, boardPadding, selectedTemplate, boardWidth, boardHeight, boardAspect, zoom, bg]);

  const pushHistory = useCallback(() => {
    setHistory((h) => [...h, getSnapshot()]);
    setFuture([]);
  }, [getSnapshot]);

  const setImages = useCallback((v) => { pushHistory(); _setImages(v); }, [pushHistory]);
  const setAssets = useCallback((v) => { pushHistory(); _setAssets(v); }, [pushHistory]);
  const setBoardTitle = useCallback((v) => { pushHistory(); _setBoardTitle(v); }, [pushHistory]);
  const setBoardDescription = useCallback((v) => { pushHistory(); _setBoardDescription(v); }, [pushHistory]);
  const setShowText = useCallback((v) => { pushHistory(); _setShowText(v); }, [pushHistory]);
  const setLogoSrc = useCallback((v) => { pushHistory(); _setLogoSrc(v); }, [pushHistory]);
  const setLogoSize = useCallback((v) => { pushHistory(); _setLogoSize(v); }, [pushHistory]);
  const setLogoRounded = useCallback((v) => { pushHistory(); _setLogoRounded(v); }, [pushHistory]);
  const setBrandingPreset = useCallback((v) => { pushHistory(); _setBrandingPreset(v); }, [pushHistory]);
  const setTitleClass = useCallback((v) => { pushHistory(); _setTitleClass(v); }, [pushHistory]);
  const setDescClass = useCallback((v) => { pushHistory(); _setDescClass(v); }, [pushHistory]);
  const setGap = useCallback((v) => { pushHistory(); _setGap(v); }, [pushHistory]);
  const setColumns = useCallback((v) => { pushHistory(); _setColumns(v); }, [pushHistory]);
  const setRows = useCallback((v) => { pushHistory(); _setRows(v); }, [pushHistory]);
  const setLayoutMode = useCallback((v) => { pushHistory(); _setLayoutMode(v); }, [pushHistory]);
  const setRounded = useCallback((v) => { pushHistory(); _setRounded(v); }, [pushHistory]);
  const setShadow = useCallback((v) => { pushHistory(); _setShadow(v); }, [pushHistory]);
  const setShowSafeMargin = useCallback((v) => { pushHistory(); _setShowSafeMargin(v); }, [pushHistory]);
  const setBoardPadding = useCallback((v) => { pushHistory(); _setBoardPadding(v); }, [pushHistory]);
  const setSelectedTemplate = useCallback((v) => { pushHistory(); _setSelectedTemplate(v); }, [pushHistory]);
  const setBoardWidth = useCallback((v) => { pushHistory(); _setBoardWidth(v); }, [pushHistory]);
  const setBoardHeight = useCallback((v) => { pushHistory(); _setBoardHeight(v); }, [pushHistory]);
  const setBoardAspect = useCallback((v) => { pushHistory(); _setBoardAspect(v); }, [pushHistory]);
  const setZoom = useCallback((v) => { pushHistory(); _setZoom(v); }, [pushHistory]);
  const setBg = useCallback((v) => { pushHistory(); _setBg(v); }, [pushHistory]);

  const applySnapshot = useCallback((snap) => {
    _setImages(snap.images || []);
    _setAssets(snap.assets || []);
    _setBoardTitle(snap.boardTitle || "");
    _setBoardDescription(snap.boardDescription || "");
    _setShowText(snap.showText ?? true);
    _setLogoSrc(snap.logoSrc || null);
    _setLogoSize(snap.logoSize ?? BRANDING_PRESETS["left-m"].logo);
    _setLogoRounded(snap.logoRounded ?? true);
    _setBrandingPreset(snap.brandingPreset || "left-m");
    _setTitleClass(snap.titleClass || BRANDING_PRESETS["left-m"].title);
    _setDescClass(snap.descClass || BRANDING_PRESETS["left-m"].desc);
    _setGap(snap.gap ?? 12);
    _setColumns(snap.columns ?? 4);
    _setRows(snap.rows ?? 3);
    _setLayoutMode(snap.layoutMode || "auto");
    _setRounded(snap.rounded ?? true);
    _setShadow(snap.shadow ?? true);
    _setShowSafeMargin(snap.showSafeMargin ?? false);
    _setBoardPadding(snap.boardPadding ?? 24);
    _setSelectedTemplate(snap.selectedTemplate || "custom");
    _setBoardWidth(snap.boardWidth ?? null);
    _setBoardHeight(snap.boardHeight ?? null);
    _setBoardAspect(snap.boardAspect);
    _setZoom(snap.zoom ?? 100);
    _setBg(snap.bg || "#ffffff");
  }, []);

  const undo = useCallback(() => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setFuture((f) => [getSnapshot(), ...f]);
      applySnapshot(prev);
      return h.slice(0, -1);
    });
  }, [applySnapshot, getSnapshot]);

  const redo = useCallback(() => {
    setFuture((f) => {
      if (!f.length) return f;
      const next = f[0];
      setHistory((h) => [...h, getSnapshot()]);
      applySnapshot(next);
      return f.slice(1);
    });
  }, [applySnapshot, getSnapshot]);

  const resetBoard = useCallback(() => {
    _setBoardTitle("");
    _setBoardDescription("");
    _setShowText(true);
    _setLogoSrc(null);
    _setLogoSize(BRANDING_PRESETS["left-m"].logo);
    _setLogoRounded(true);
    _setGap(12);
    _setColumns(4);
    _setRows(3);
    _setLayoutMode("auto");
    _setRounded(true);
    _setShadow(true);
    _setShowSafeMargin(false);
    _setBoardPadding(24);
    _setSelectedTemplate("custom");
    _setBoardWidth(null);
    _setBoardHeight(null);
    _setBoardAspect(undefined);
    _setZoom(100);
    _setBg("#ffffff");
    _setBrandingPreset("left-m");
    _setTitleClass(BRANDING_PRESETS["left-m"].title);
    _setDescClass(BRANDING_PRESETS["left-m"].desc);
  }, []);

  return {
    images,
    setImages,
    assets,
    setAssets,
    boardTitle,
    setBoardTitle,
    boardDescription,
    setBoardDescription,
    showText,
    setShowText,
    logoSrc,
    setLogoSrc,
    logoSize,
    setLogoSize,
    logoRounded,
    setLogoRounded,
    brandingPreset,
    setBrandingPreset,
    titleClass,
    setTitleClass,
    descClass,
    setDescClass,
    gap,
    setGap,
    columns,
    setColumns,
    rows,
    setRows,
    layoutMode,
    setLayoutMode,
    rounded,
    setRounded,
    shadow,
    setShadow,
    showSafeMargin,
    setShowSafeMargin,
    boardPadding,
    setBoardPadding,
    selectedTemplate,
    setSelectedTemplate,
    boardWidth,
    setBoardWidth,
    boardHeight,
    setBoardHeight,
    boardAspect,
    setBoardAspect,
    zoom,
    setZoom,
    bg,
    setBg,
    undo,
    redo,
    resetBoard,
    history,
    future,
  };
}

