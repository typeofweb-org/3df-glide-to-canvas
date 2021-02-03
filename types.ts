import { GrAspectRatio_t, GrLOD_t, GrTextureFormat_t } from "./glide";

export type Preamble = {
  COLOR: GrTextureFormat_t;
  VERSION: string;
  aspect_ratio: {
    width: number;
    height: number;
    aspect_ratio: GrAspectRatio_t;
  };
  lod_range: { large: GrLOD_t; small: GrLOD_t };
  width: number;
  height: number;
  mem_required: number;
  palette: Uint8ClampedArray;
};
