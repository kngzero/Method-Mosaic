import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import TemplateSelector from "@/components/TemplateSelector";
import { cx } from "@/utils/cx";
import {
  Images,
  LayoutGrid,
  Palette,
  Download,
  Trash2,
  Archive,
  ArchiveRestore,
  FileDown,
} from "lucide-react";

function AssetsTab({ assets, onRemoveAsset, onClearAssets }) {
  const [query, setQuery] = useState("");
  const filtered = assets.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-1 gap-2">
        <h2 className="text-xl font-semibold">Assets</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearAssets}
          aria-label="Remove all assets"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="asset-search" className="sr-only">
          Search
        </label>
        <Input
          id="asset-search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-8 text-sm"
          aria-label="Search"
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {filtered.map((asset) => (
          <div key={asset.id} className="relative group aspect-square overflow-hidden">
            <img
              src={asset.src}
              alt={asset.name}
              className="w-full h-full object-cover rounded-md cursor-grab"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("application/x-asset-id", asset.id);
                e.dataTransfer.effectAllowed = "copy";
              }}
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100"
              onClick={() => onRemoveAsset(asset.id)}
              aria-label="Remove asset"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-500">No assets</p>
        )}
      </div>
    </div>
  );
}

function LayoutTab({ board, handleTemplateChange }) {
  const SelectBox = ({ value, onChange, children }) => (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );
  return (
    <div className="space-y-6">
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
        <div className="px-1">
          <Slider
            min={50}
            max={200}
            step={10}
            value={[board.zoom]}
            onValueChange={([v]) => board.setZoom(v)}
          />
        </div>
        <div className="text-xs text-neutral-500">{board.zoom}%</div>
      </div>
      <div className={cx("grid gap-4", board.layoutMode === "grid" ? "grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-2">
          <Label className="text-sm">Columns</Label>
          <div className="px-1">
            <Slider
              min={1}
              max={12}
              step={1}
              value={[board.columns]}
              onValueChange={([v]) => board.setColumns(v)}
            />
          </div>
          <div className="text-xs text-neutral-500">{board.columns} column(s)</div>
        </div>
        {board.layoutMode === "grid" && (
          <div className="space-y-2">
            <Label className="text-sm">Row height</Label>
            <div className="px-1">
              <Slider
                min={1}
                max={12}
                step={1}
                value={[board.rows]}
                onValueChange={([v]) => board.setRows(v)}
              />
            </div>
            <div className="text-xs text-neutral-500">{board.rows} row(s)</div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Gaps</Label>
        <div className="px-1">
          <Slider
            min={0}
            max={48}
            step={1}
            value={[board.gap]}
            onValueChange={([v]) => board.setGap(v)}
          />
        </div>
        <div className="text-xs text-neutral-500">{board.gap}px</div>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Board padding</Label>
        <div className="px-1">
          <Slider
            min={0}
            max={96}
            step={2}
            value={[board.boardPadding]}
            onValueChange={([v]) => board.setBoardPadding(v)}
          />
        </div>
        <div className="text-xs text-neutral-500">{board.boardPadding}px</div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Switch checked={board.rounded} onCheckedChange={board.setRounded} id="rounded" />
          <Label htmlFor="rounded">Rounded corners</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={board.shadow} onCheckedChange={board.setShadow} id="shadow" />
          <Label htmlFor="shadow">Soft shadow</Label>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={board.showSafeMargin}
          onCheckedChange={board.setShowSafeMargin}
          id="safe-margin"
        />
        <Label htmlFor="safe-margin">Show safe margin</Label>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Background</Label>
        <div className="flex items-center gap-3">
          <Input
            type="color"
            value={board.bg}
            onChange={(e) => board.setBg(e.target.value)}
            className="w-16 h-10 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={board.bg}
            onChange={(e) => board.setBg(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

function BrandTab({ board, onLogoFiles }) {
  const logoInputRef = useRef(null);
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Switch checked={board.showText} onCheckedChange={board.setShowText} id="showText" />
        <Label htmlFor="showText" className="text-sm">Show text</Label>
      </div>
      <Input
        placeholder="Board title"
        value={board.boardTitle}
        onChange={(e) => board.setBoardTitle(e.target.value)}
      />
      <Input
        placeholder="Short description"
        value={board.boardDescription}
        onChange={(e) => board.setBoardDescription(e.target.value)}
      />
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
      <div className="space-y-3">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => logoInputRef.current?.click()}>Upload Logo</Button>
          {board.logoSrc && (
            <Button variant="ghost" onClick={() => board.setLogoSrc(null)}>Remove</Button>
          )}
        </div>
        <input
          ref={logoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onLogoFiles(e.target.files)}
        />
        {board.logoSrc && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Logo size</Label>
              <Slider
                min={16}
                max={128}
                step={1}
                value={[board.logoSize]}
                onValueChange={([v]) => board.setLogoSize(v)}
              />
              <div className="text-xs text-neutral-500">{board.logoSize}px</div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Switch
                checked={board.logoRounded}
                onCheckedChange={board.setLogoRounded}
                id="logoRound"
              />
              <Label htmlFor="logoRound">Rounded</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExportTab({
  exportFormat,
  setExportFormat,
  exportError,
  handleExport,
  exportAsPDF,
  saveBoardFile,
  loadBoardFile,
}) {
  const boardFileRef = useRef(null);
  const SelectBox = ({ value, onChange, children }) => (
    <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </select>
  );
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm">Project</Label>
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={saveBoardFile} className="w-full">
            <Archive className="h-4 w-4 mr-2" />Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => boardFileRef.current?.click()}
            className="w-full"
          >
            <ArchiveRestore className="h-4 w-4 mr-2" />Load
          </Button>
        </div>
        <input
          ref={boardFileRef}
          type="file"
          accept=".mlmboard"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) loadBoardFile(f);
            e.target.value = "";
          }}
        />
      </div>
      <div className="space-y-3">
        <Label className="text-sm">Export</Label>
        <div className="grid grid-cols-2 gap-3">
          <SelectBox value={exportFormat} onChange={setExportFormat}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </SelectBox>
          <Button onClick={handleExport} className="w-full" variant="default">
            <Download className="h-4 w-4 mr-2" />Save Image
          </Button>
          <div className="col-span-2">
            <Button onClick={exportAsPDF} variant="secondary" className="w-full">
              <FileDown className="h-4 w-4 mr-2" />Save as PDF
            </Button>
          </div>
          {exportError && (
            <div className="col-span-2 text-xs text-red-600">{exportError}</div>
          )}
        </div>
        <p className="text-xs text-neutral-500">
          Tip: Press ⌘/Ctrl + S to quick-save using the selected image format.
        </p>
      </div>
    </div>
  );
}

export default function Sidebar(props) {
  const [tab, setTab] = useState("assets");
  const tabs = [
    { key: "assets", label: "Assets", icon: Images },
    { key: "layout", label: "Layout", icon: LayoutGrid },
    { key: "brand", label: "Brand", icon: Palette },
    { key: "export", label: "Export", icon: Download },
  ];
  return (
    <div className="fixed left-0 bottom-0 top-[var(--header-height)] w-80 flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700">
      <div className="grid grid-cols-4 border-b border-neutral-200 dark:border-neutral-700">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cx(
              "flex flex-col items-center gap-1 py-2 text-xs",
              tab === t.key
                ? "text-violet-600 border-b-2 border-violet-600"
                : ""
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tab === "assets" && (
          <AssetsTab
            assets={props.assets}
            onRemoveAsset={props.onRemoveAsset}
            onClearAssets={props.onClearAssets}
          />
        )}
        {tab === "layout" && (
          <LayoutTab board={props.board} handleTemplateChange={props.handleTemplateChange} />
        )}
        {tab === "brand" && (
          <BrandTab board={props.board} onLogoFiles={props.onLogoFiles} />
        )}
        {tab === "export" && (
          <ExportTab
            exportFormat={props.exportFormat}
            setExportFormat={props.setExportFormat}
            exportError={props.exportError}
            handleExport={props.handleExport}
            exportAsPDF={props.exportAsPDF}
            saveBoardFile={props.saveBoardFile}
            loadBoardFile={props.loadBoardFile}
          />
        )}
      </div>
    </div>
  );
}

