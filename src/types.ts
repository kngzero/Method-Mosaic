export interface Asset {
  id: string;
  src: string;
  name: string;
  w?: number;
  h?: number;
}

export interface Crop {
  x: number;
  y: number;
  zoom: number;
}

export interface BoardImage {
  id: string;
  assetId: string;
  src?: string;
  w?: number;
  h?: number;
  colSpan?: number;
  rowSpan?: number;
  crop?: Crop;
}
