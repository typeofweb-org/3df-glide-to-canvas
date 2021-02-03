export var GrTextureFormat_t;
(function (GrTextureFormat_t) {
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_8BIT"] = 0] = "GR_TEXFMT_8BIT";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_RGB_332"] = 0] = "GR_TEXFMT_RGB_332";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_YIQ_422"] = 1] = "GR_TEXFMT_YIQ_422";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ALPHA_8"] = 2] = "GR_TEXFMT_ALPHA_8"; /* (0..0xFF) alpha     */
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_INTENSITY_8"] = 3] = "GR_TEXFMT_INTENSITY_8"; /* (0..0xFF) intensity */
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ALPHA_INTENSITY_44"] = 4] = "GR_TEXFMT_ALPHA_INTENSITY_44";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_P_8"] = 5] = "GR_TEXFMT_P_8"; /* 8-bit palette */
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_RSVD0"] = 6] = "GR_TEXFMT_RSVD0";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_RSVD1"] = 7] = "GR_TEXFMT_RSVD1";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_16BIT"] = 8] = "GR_TEXFMT_16BIT";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ARGB_8332"] = 8] = "GR_TEXFMT_ARGB_8332";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_AYIQ_8422"] = 9] = "GR_TEXFMT_AYIQ_8422";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_RGB_565"] = 10] = "GR_TEXFMT_RGB_565";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ARGB_1555"] = 11] = "GR_TEXFMT_ARGB_1555";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ARGB_4444"] = 12] = "GR_TEXFMT_ARGB_4444";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_ALPHA_INTENSITY_88"] = 13] = "GR_TEXFMT_ALPHA_INTENSITY_88";
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_AP_88"] = 14] = "GR_TEXFMT_AP_88"; /* 8-bit alpha 8-bit palette */
    GrTextureFormat_t[GrTextureFormat_t["GR_TEXFMT_RSVD2"] = 15] = "GR_TEXFMT_RSVD2";
})(GrTextureFormat_t || (GrTextureFormat_t = {}));
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
};
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
];
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
];
export var GrAspectRatio_t;
(function (GrAspectRatio_t) {
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_8x1"] = 0] = "GR_ASPECT_8x1"; /* 8W x 1H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_4x1"] = 1] = "GR_ASPECT_4x1"; /* 4W x 1H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_2x1"] = 2] = "GR_ASPECT_2x1"; /* 2W x 1H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_1x1"] = 3] = "GR_ASPECT_1x1"; /* 1W x 1H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_1x2"] = 4] = "GR_ASPECT_1x2"; /* 1W x 2H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_1x4"] = 5] = "GR_ASPECT_1x4"; /* 1W x 4H */
    GrAspectRatio_t[GrAspectRatio_t["GR_ASPECT_1x8"] = 6] = "GR_ASPECT_1x8"; /* 1W x 8H */
})(GrAspectRatio_t || (GrAspectRatio_t = {}));
export var GrLOD_t;
(function (GrLOD_t) {
    GrLOD_t[GrLOD_t["GR_LOD_256"] = 0] = "GR_LOD_256";
    GrLOD_t[GrLOD_t["GR_LOD_128"] = 1] = "GR_LOD_128";
    GrLOD_t[GrLOD_t["GR_LOD_64"] = 2] = "GR_LOD_64";
    GrLOD_t[GrLOD_t["GR_LOD_32"] = 3] = "GR_LOD_32";
    GrLOD_t[GrLOD_t["GR_LOD_16"] = 4] = "GR_LOD_16";
    GrLOD_t[GrLOD_t["GR_LOD_8"] = 5] = "GR_LOD_8";
    GrLOD_t[GrLOD_t["GR_LOD_4"] = 6] = "GR_LOD_4";
    GrLOD_t[GrLOD_t["GR_LOD_2"] = 7] = "GR_LOD_2";
    GrLOD_t[GrLOD_t["GR_LOD_1"] = 8] = "GR_LOD_1";
})(GrLOD_t || (GrLOD_t = {}));
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
};
export const wh_aspect_table = [
    GrAspectRatio_t.GR_ASPECT_1x1,
    GrAspectRatio_t.GR_ASPECT_1x2,
    GrAspectRatio_t.GR_ASPECT_1x4,
    GrAspectRatio_t.GR_ASPECT_1x8,
];
export const hw_aspect_table = [
    GrAspectRatio_t.GR_ASPECT_1x1,
    GrAspectRatio_t.GR_ASPECT_2x1,
    GrAspectRatio_t.GR_ASPECT_4x1,
    GrAspectRatio_t.GR_ASPECT_8x1,
];
export const _gr_aspect_index_table = [3, 2, 1, 0, 1, 2, 3];
