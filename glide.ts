export enum GrTextureFormat_t {
  GR_TEXFMT_8BIT = 0x0,
  GR_TEXFMT_RGB_332 = GrTextureFormat_t.GR_TEXFMT_8BIT,
  GR_TEXFMT_YIQ_422 = 0x1,
  GR_TEXFMT_ALPHA_8 = 0x2 /* (0..0xFF) alpha     */,
  GR_TEXFMT_INTENSITY_8 = 0x3 /* (0..0xFF) intensity */,
  GR_TEXFMT_ALPHA_INTENSITY_44 = 0x4,
  GR_TEXFMT_P_8 = 0x5 /* 8-bit palette */,
  GR_TEXFMT_RSVD0 = 0x6,
  GR_TEXFMT_RSVD1 = 0x7,
  GR_TEXFMT_16BIT = 0x8,
  GR_TEXFMT_ARGB_8332 = GrTextureFormat_t.GR_TEXFMT_16BIT,
  GR_TEXFMT_AYIQ_8422 = 0x9,
  GR_TEXFMT_RGB_565 = 0xa,
  GR_TEXFMT_ARGB_1555 = 0xb,
  GR_TEXFMT_ARGB_4444 = 0xc,
  GR_TEXFMT_ALPHA_INTENSITY_88 = 0xd,
  GR_TEXFMT_AP_88 = 0xe /* 8-bit alpha 8-bit palette */,
  GR_TEXFMT_RSVD2 = 0xf,
}

export const ColorToGrTextureFormat_t = {
  /**
   * @description 24-bit color + 8 bit alpha.
   */
  true: undefined,
  /**
   * @description 24-bit color + 8 bit alpha.
   */
  argb8888: undefined,
  /**
   * @description 8-bit intensity
   */
  i8: GrTextureFormat_t.GR_TEXFMT_INTENSITY_8,
  /**
   * @description 8-bit alpha
   */
  a8: GrTextureFormat_t.GR_TEXFMT_ALPHA_8,
  /**
   * @description 4-bit alpha/4-bit intensity
   */
  ai44: GrTextureFormat_t.GR_TEXFMT_ALPHA_INTENSITY_44,
  /**
   * @description narrow-channel compressed color
   */
  yiq: GrTextureFormat_t.GR_TEXFMT_YIQ_422,
  /**
   * @description 3-bit red, 3-bit green, 2-bit blue
   */
  rgb332: GrTextureFormat_t.GR_TEXFMT_RGB_332,
  /**
   * @description 5-bit red. 6-bit green, 5-bit blue
   */
  rgb565: GrTextureFormat_t.GR_TEXFMT_RGB_565,
  /**
   * @description 8-bit alpha, 3-bit red, 3-bit green, 2-bit blue
   */
  argb8332: GrTextureFormat_t.GR_TEXFMT_ARGB_8332,
  /**
   * @description 1-bit alpha, 5-bit red, 5-bit green, 5-bit blue
   */
  argb1555: GrTextureFormat_t.GR_TEXFMT_ARGB_1555,
  /**
   * @description 8-bit alpha + narrow-channel compressed color
   */
  ayiq8422: GrTextureFormat_t.GR_TEXFMT_AYIQ_8422,
  /**
   * @description 4-bit alpha, 4-bit red, 4-bit green, 4-bit blue
   */
  argb4444: GrTextureFormat_t.GR_TEXFMT_ARGB_4444,
  /**
   * @description 8-bit alpha, 8-bit intensity
   */
  ai88: GrTextureFormat_t.GR_TEXFMT_ALPHA_INTENSITY_88,

  /**
   * @description ?
   */
  p8: GrTextureFormat_t.GR_TEXFMT_P_8,
  ap88: GrTextureFormat_t.GR_TEXFMT_AP_88,
} as const;

export const _grMipMapHostSize = [
  /* 1:1 aspect ratio */ [
    256 * 256,
    128 * 128,
    64 * 64,
    32 * 32,
    16 * 16,
    8 * 8,
    4 * 4,
    2 * 2,
    1 * 1,
  ],
  /* 2:1 aspect ratio */ [
    256 * 128,
    128 * 64,
    64 * 32,
    32 * 16,
    16 * 8,
    8 * 4,
    4 * 2,
    2 * 1,
    1 * 1,
  ],
  /* 4:1 aspect ratio */ [
    256 * 64,
    128 * 32,
    64 * 16,
    32 * 8,
    16 * 4,
    8 * 2,
    4 * 1,
    2 * 1,
    1 * 1,
  ],
  /* 8:1 aspect ratio */ [
    256 * 32,
    128 * 16,
    64 * 8,
    32 * 4,
    16 * 2,
    8 * 1,
    4 * 1,
    2 * 1,
    1 * 1,
  ],
] as const;

export const _grMipMapHostWH = [
  [
    [256, 32],
    [128, 16],
    [64, 8],
    [32, 4],
    [16, 2],
    [8, 1],
    [4, 1],
    [2, 1],
    [1, 1],
  ],
  [
    [256, 64],
    [128, 32],
    [64, 16],
    [32, 8],
    [16, 4],
    [8, 2],
    [4, 1],
    [2, 1],
    [1, 1],
  ],
  [
    [256, 128],
    [128, 64],
    [64, 32],
    [32, 16],
    [16, 8],
    [8, 4],
    [4, 2],
    [2, 1],
    [1, 1],
  ],
  [
    [256, 256],
    [128, 128],
    [64, 64],
    [32, 32],
    [16, 16],
    [8, 8],
    [4, 4],
    [2, 2],
    [1, 1],
  ],
  [
    [128, 256],
    [64, 128],
    [32, 64],
    [16, 32],
    [8, 16],
    [4, 8],
    [2, 4],
    [1, 2],
    [1, 1],
  ],
  [
    [64, 256],
    [32, 128],
    [16, 64],
    [8, 32],
    [4, 16],
    [2, 8],
    [1, 4],
    [1, 2],
    [1, 1],
  ],
  [
    [32, 256],
    [16, 128],
    [8, 64],
    [4, 32],
    [2, 16],
    [1, 8],
    [1, 4],
    [1, 2],
    [1, 1],
  ],
] as const;

export enum GrAspectRatio_t {
  GR_ASPECT_8x1 = 0x0 /* 8W x 1H */,
  GR_ASPECT_4x1 = 0x1 /* 4W x 1H */,
  GR_ASPECT_2x1 = 0x2 /* 2W x 1H */,
  GR_ASPECT_1x1 = 0x3 /* 1W x 1H */,
  GR_ASPECT_1x2 = 0x4 /* 1W x 2H */,
  GR_ASPECT_1x4 = 0x5 /* 1W x 4H */,
  GR_ASPECT_1x8 = 0x6 /* 1W x 8H */,
}

export enum GrLOD_t {
  GR_LOD_256 = 0x0,
  GR_LOD_128 = 0x1,
  GR_LOD_64 = 0x2,
  GR_LOD_32 = 0x3,
  GR_LOD_16 = 0x4,
  GR_LOD_8 = 0x5,
  GR_LOD_4 = 0x6,
  GR_LOD_2 = 0x7,
  GR_LOD_1 = 0x8,
}

export const lodToLod = {
  1: GrLOD_t.GR_LOD_1,
  2: GrLOD_t.GR_LOD_2,
  4: GrLOD_t.GR_LOD_4,
  8: GrLOD_t.GR_LOD_8,
  16: GrLOD_t.GR_LOD_16,
  32: GrLOD_t.GR_LOD_32,
  64: GrLOD_t.GR_LOD_64,
  128: GrLOD_t.GR_LOD_128,
  256: GrLOD_t.GR_LOD_256,
} as const;

export const wh_aspect_table = [
  GrAspectRatio_t.GR_ASPECT_1x1,
  GrAspectRatio_t.GR_ASPECT_1x2,
  GrAspectRatio_t.GR_ASPECT_1x4,
  GrAspectRatio_t.GR_ASPECT_1x8,
] as const;
export const hw_aspect_table = [
  GrAspectRatio_t.GR_ASPECT_1x1,
  GrAspectRatio_t.GR_ASPECT_2x1,
  GrAspectRatio_t.GR_ASPECT_4x1,
  GrAspectRatio_t.GR_ASPECT_8x1,
] as const;

export const _gr_aspect_index_table = [3, 2, 1, 0, 1, 2, 3] as const;
