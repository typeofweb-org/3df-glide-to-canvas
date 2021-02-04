import {
  ColorToGrTextureFormat_t,
  lodToLod,
  wh_aspect_table,
  hw_aspect_table,
  _grMipMapHostSize,
  _gr_aspect_index_table,
  GrTextureFormat_t,
  _grMipMapHostWH,
} from "./glide.js";
import { Preamble } from "./types";
import { assert } from "./utils.js";

const ALLOWED_ASCII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.:# \r\n"
  .split("")
  .map((c) => c.charCodeAt(0));

function getPreambleEndIndex(ui8Array: Uint8ClampedArray) {
  const lastPreambleIndex = ui8Array.findIndex(
    (code) => !ALLOWED_ASCII.includes(code)
  );
  return lastPreambleIndex;
}

function parsePreamble(preambleSlice: Uint8ClampedArray, name: string) {
  const preambleText = preambleSlice.reduce(
    (acc, code) => acc + String.fromCodePoint(code),
    ""
  );

  const preamble = preambleText
    .split(/\r|\n/g)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.split(": "))
    .reduce((acc, value, index) => {
      switch (index) {
        case 0: {
          acc["VERSION"] = value[0];
          return acc;
        }
        case 1: {
          const color = value[0].toLowerCase();
          assert(color in ColorToGrTextureFormat_t);
          assert(
            ColorToGrTextureFormat_t[
              color as keyof typeof ColorToGrTextureFormat_t
            ]
          );

          acc["COLOR"] = ColorToGrTextureFormat_t[
            color as keyof typeof ColorToGrTextureFormat_t
          ]!;
          return acc;
        }
        case 2: {
          const { 0: small, 1: large } = value[1].split(" ").map(Number);
          assert(small in lodToLod);
          assert(large in lodToLod);
          acc.lod_range = {
            large,
            small,
          };
          return acc;
        }
        case 3: {
          const { 0: aspect_width, 1: aspect_height } = value[1]
            .split(" ")
            .map(Number);

          for (let i = 0; i < 4; ++i) {
            if (aspect_width << i === aspect_height) {
              const aspect_ratio = wh_aspect_table[i];
              acc.aspect_ratio = {
                width: aspect_width,
                height: aspect_height,
                aspect_ratio,
              };
              return acc;
            }
          }

          for (let i = 0; i < 4; ++i) {
            if (aspect_height << i === aspect_width) {
              const aspect_ratio = hw_aspect_table[i];
              acc.aspect_ratio = {
                width: aspect_width,
                height: aspect_height,
                aspect_ratio,
              };
              return acc;
            }
          }
        }
        default: {
          console.warn(`Unexpected line in file ${name}: ${value}`);
          return acc;
        }
      }
    }, {} as Preamble);

  if (preamble.aspect_ratio.width >= preamble.aspect_ratio.height) {
    preamble.width = preamble.lod_range.large;
    preamble.height = preamble.lod_range.large / preamble.aspect_ratio.width;
  } else {
    preamble.height = preamble.lod_range.large;
    preamble.width = preamble.lod_range.large / preamble.aspect_ratio.height;
  }

  preamble.lod_range.small =
    lodToLod[preamble.lod_range.small as keyof typeof lodToLod];
  preamble.lod_range.large =
    lodToLod[preamble.lod_range.large as keyof typeof lodToLod];

  {
    let mem_required = 0;
    for (
      let lod = preamble.lod_range.large;
      lod <= preamble.lod_range.small;
      ++lod
    ) {
      mem_required +=
        _grMipMapHostSize[
          _gr_aspect_index_table[preamble.aspect_ratio.aspect_ratio]
        ][lod] << Number(preamble.COLOR >= GrTextureFormat_t.GR_TEXFMT_16BIT);
    }
    preamble.mem_required = mem_required;
  }

  return preamble;
}

function parseImage(
  preamble: Preamble,
  imageSlice: Uint8ClampedArray,
  name: string
) {
  switch (preamble.COLOR) {
    case GrTextureFormat_t.GR_TEXFMT_ARGB_4444: {
      const ui8Result = new Uint8ClampedArray(preamble.mem_required * 2);
      imageSlice.forEach((el, idx) => {
        //      0 1 2 3
        //  IN: G B A R
        // OUT: R G B A

        const iin = idx % 2;

        // [0,255] - [240,240] - [15,240] - [15,255]
        //    G        B       A       R
        // ["0000", "0000", "1111", "1111"]
        // ["1111", "0000", "1111", "0000"]
        // ["0000", "1111", "1111", "0000"]
        // ["0000", "1111", "1111", "1111"]

        if (iin === 0) {
          const A = el >> 4;
          const R = el & 0b00001111;
          ui8Result[2 * idx + 3] = A << 4;
          ui8Result[2 * idx] = R << 4;
        } else {
          const G = el >> 4;
          const B = el & 0b00001111;
          ui8Result[2 * idx - 1] = G << 4;
          ui8Result[2 * idx] = B << 4;
        }
      });
      return ui8Result;
    }
    case GrTextureFormat_t.GR_TEXFMT_P_8: {
      const palette = new Uint8ClampedArray(256 * 4);
      imageSlice.slice(0, 256 * 4).forEach((el, idx) => {
        //      0 1 2 3
        //  IN: A R G B
        // OUT: R G B A

        switch (idx % 4) {
          // A
          case 0: {
            palette[idx + 3] = el;
            return;
          }
          // R
          case 1: {
            palette[idx - 1] = el;
            return;
          }
          // G
          case 2: {
            palette[idx - 1] = el;
            return;
          }
          // B
          case 3: {
            palette[idx - 1] = el;
            return;
          }
        }
      });
      preamble.palette = palette;
      const ui8Result = new Uint8ClampedArray(preamble.mem_required * 4);
      imageSlice.slice(256 * 4).forEach((el, idx) => {
        {
          const R = palette[el * 4 + 0];
          const G = palette[el * 4 + 1];
          const B = palette[el * 4 + 2];
          const A = palette[el * 4 + 3];
          ui8Result[idx * 4 + 0] = R;
          ui8Result[idx * 4 + 1] = G;
          ui8Result[idx * 4 + 2] = B;
          ui8Result[idx * 4 + 3] = R | G | B | A;
          // ui8Result[idx * 4 + 3] = R + G + B + A;
        }
      });
      return ui8Result;
    }
    case GrTextureFormat_t.GR_TEXFMT_YIQ_422: {
      const yRGB = new Uint16Array(16);
      const iRGB = [
        new Int16Array(3),
        new Int16Array(3),
        new Int16Array(3),
        new Int16Array(3),
      ] as [Int16Array, Int16Array, Int16Array, Int16Array];
      const qRGB = [
        new Int16Array(3),
        new Int16Array(3),
        new Int16Array(3),
        new Int16Array(3),
      ] as [Int16Array, Int16Array, Int16Array, Int16Array];

      /*
       ** read in Y
       */
      for (let index = 0; index < 16; index++) {
        yRGB[index] =
          (imageSlice[2 * index + 0] << 8) | imageSlice[2 * index + 1];
      }

      /*
       ** read in I (A)
       */
      for (let index = 0; index < 4; index++) {
        iRGB[index][0] =
          (imageSlice[32 + 6 * index + 0] << 8) |
          imageSlice[32 + 6 * index + 1];
        iRGB[index][1] =
          (imageSlice[32 + 6 * index + 2] << 8) |
          imageSlice[32 + 6 * index + 3];
        iRGB[index][2] =
          (imageSlice[32 + 6 * index + 4] << 8) |
          imageSlice[32 + 6 * index + 5];
      }

      /*
       ** read in Q (B)
       */
      for (let index = 0; index < 4; index++) {
        qRGB[index][0] =
          (imageSlice[56 + 6 * index + 0] << 8) |
          imageSlice[56 + 6 * index + 1];
        qRGB[index][1] =
          (imageSlice[56 + 6 * index + 2] << 8) |
          imageSlice[56 + 6 * index + 3];
        qRGB[index][2] =
          (imageSlice[56 + 6 * index + 4] << 8) |
          imageSlice[56 + 6 * index + 5];
      }

      const palette = new Uint8ClampedArray(256 * 4);

      const get = <T extends Array<Int16Array>>(array: T, i: number) => {
        return array[(i / 3) | 0][i % 3 | 0];
      };

      for (let i = 0; i < 256; ++i) {
        const iy = (i >> 4) & 0xf;
        const ia = (i >> 2) & 0x3;
        const ib = (i >> 0) & 0x3;

        let r = yRGB[iy] + get(iRGB, 3 * ia + 0) + get(qRGB, 3 * ib + 0);
        let g = yRGB[iy] + get(iRGB, 3 * ia + 1) + get(qRGB, 3 * ib + 1);
        let b = yRGB[iy] + get(iRGB, 3 * ia + 2) + get(qRGB, 3 * ib + 2);

        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        palette[4 * i + 0] = r;
        palette[4 * i + 1] = g;
        palette[4 * i + 2] = b;
        palette[4 * i + 3] = 255;
      }

      const ui8Result = new Uint8ClampedArray(preamble.mem_required * 4);
      imageSlice.slice(80).forEach((el, idx) => {
        {
          const R = palette[el * 4 + 0];
          const G = palette[el * 4 + 1];
          const B = palette[el * 4 + 2];
          const A = palette[el * 4 + 3];
          ui8Result[idx * 4 + 0] = R;
          ui8Result[idx * 4 + 1] = G;
          ui8Result[idx * 4 + 2] = B;
          ui8Result[idx * 4 + 3] = A;
          // ui8Result[idx * 4 + 3] = R + G + B > 0 ? 255 : 0;
        }
      });
      return ui8Result;
    }
    default:
      console.error(
        new Error(
          `${
            GrTextureFormat_t[preamble.COLOR]
          } is not supported in file ${name}!`
        )
      );
  }
}

export function getDataFor3DF(ui8Array: Uint8ClampedArray, name: string) {
  const lastPreambleIndex = getPreambleEndIndex(ui8Array);

  const preambleSlice = ui8Array.slice(0, lastPreambleIndex);
  const imageSlice = ui8Array.slice(lastPreambleIndex);

  const preamble = parsePreamble(preambleSlice, name);
  const image = parseImage(preamble, imageSlice, name);
  if (!image) {
    throw new Error("No image.");
  }

  let sumPixels = 0;
  for (
    let lod = preamble.lod_range.large;
    lod <= preamble.lod_range.small;
    ++lod
  ) {
    const width = _grMipMapHostWH[preamble.aspect_ratio.aspect_ratio][lod][0];
    const height = _grMipMapHostWH[preamble.aspect_ratio.aspect_ratio][lod][1];
    const cnt = width * height;
    const pixels = cnt * 4;

    const data = image.slice(sumPixels, pixels);
    return { data, preamble };

    // we only care about the largest mipmap hence rest of the code is not used

    // sumPixels += pixels;

    // if (data.every((val) => val === 0)) {
    //   continue;
    // }
  }
}
