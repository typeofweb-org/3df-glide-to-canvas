import { getDataFor3DF } from "./3DF.js";
import {
  ColorToGrTextureFormat_t,
  GrLOD_t,
  GrTextureFormat_t,
  hw_aspect_table,
  lodToLod,
  wh_aspect_table,
  _grMipMapHostSize,
  _grMipMapHostWH,
  _gr_aspect_index_table,
} from "./glide.js";
import { getDataForSpr } from "./spr.js";

async function readFile(name: string) {
  const res = await fetch(`${location.pathname}${name}`);
  const data = await res.blob();
  const buffer = await data.arrayBuffer();
  return new Uint8ClampedArray(buffer);
}

function getDataFor(name: string, ui8Array: Uint8ClampedArray) {
  switch (name.split(".").pop()) {
    case "3df": {
      const { data, preamble } = getDataFor3DF(ui8Array, name)!;
      const {
        COLOR,
        width,
        height,
        aspect_ratio: { aspect_ratio },
      } = preamble;
      const metadata = {
        name: name.replace("examples/", ""),
        COLOR: GrTextureFormat_t[COLOR],
        width,
        height,
        aspect_ratio: { aspect_ratio },
      };
      return { data, metadata };
    }
    case "spr":
      return getDataForSpr(ui8Array, name);
  }
  throw new Error();
}

async function printFile(name: string) {
  const ui8Array = await readFile(name);

  const result = getDataFor(name, ui8Array)!;
  const packedResult = Array.isArray(result) ? result : [result];
  packedResult.forEach((result, i) => {
    const { data, metadata } = result;
    return renderToCanvas(
      metadata,
      metadata.name!,
      metadata.width,
      metadata.height,
      data
    );
  });
}

function renderToCanvas(
  metadata: object,
  name: string,
  width: number,
  height: number,
  data: Uint8ClampedArray
) {
  const container = document.createElement("div");
  {
    const meta = document.createElement("pre");

    meta.innerText = JSON.stringify(metadata, null, 2);
    container.appendChild(meta);
  }

  const canvas = document.createElement("canvas");
  canvas.title = name;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { alpha: true })!;
  const imgData = ctx.getImageData(0, 0, width, height);
  imgData.data.set(data);
  ctx.putImageData(imgData, 0, 0);

  container.appendChild(canvas);
  document.body.appendChild(container);
}

export async function init() {
  [
    "examples/inventory.spr",
    "examples/3d_menu.3df",
    "examples/3d_menu_1.3df",
    "examples/3d_menu_1_1.3df",
    "examples/3d_menu_2_pl.3df",
    "examples/3d_menu_glow.3df",
    "examples/3d_menu_glowg.3df",
    "examples/3d_menug.3df",
    "examples/3d_menug_1.3df",
    "examples/3d_menug_1_1.3df",
    "examples/3d_menug_2_pl.3df",
    "examples/babcia.3df",
    "examples/bacon.3df",
    "examples/bagnetrt.3df",
    "examples/bal.3df",
    "examples/barierka.3df",
    "examples/beczka.3df",
    "examples/beczka2.3df",
    "examples/beczka3a.3df",
    "examples/beczka3b.3df",
    "examples/bejsbolrt.1.3df",
    "examples/black_circle.3df",
    "examples/blank.3df",
    "examples/dym_black0003.3df",
    "examples/dym_black0004.3df",
    "examples/dym_black0005.3df",
    "examples/dym_black0006.3df",
    "examples/dym_black0007.3df",
    "examples/dym_black0008.3df",
    "examples/dym_black0009.3df",
    "examples/dym_black0010.3df",
    "examples/dym_black0011.3df",
    "examples/dym_black0012.3df",
    "examples/dym_black0013.3df",
    "examples/dym_black0014.3df",
    "examples/dym_black0015.3df",
    "examples/example.3df",
    "examples/kk.1.3df",
    "examples/kk.2.3df",
    "examples/kk.3.3df",
    "examples/kk.4.3df",
    "examples/odlamek14.3df",
  ].reduce((acc, name) => acc.then(() => printFile(name)), Promise.resolve());
}
