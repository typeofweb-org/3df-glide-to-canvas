import { assert } from "./utils.js";

function getChars(ui8Array: Uint8ClampedArray, start: number, end: number) {
  let result = "";
  for (let i = start; i < end; ++i) {
    result += String.fromCharCode(ui8Array[i]);
  }
  return result;
}

function getInt(ui8Array: Uint8ClampedArray, start: number) {
  return (
    (ui8Array[start + 3] << 24) |
    (ui8Array[start + 2] << 16) |
    (ui8Array[start + 1] << 8) |
    ui8Array[start]
  );
}

function getShortInt(ui8Array: Uint8ClampedArray, start: number) {
  return (ui8Array[start + 1] << 8) | ui8Array[start];
}

function getNthPage(ui8Array: Uint8ClampedArray, page: number) {
  const Disp = getInt(ui8Array, 8 * page + 12);
  console.log(
    getInt(ui8Array, 8 * page + 12),
    getShortInt(ui8Array, 8 * page + 12)
  );
  const Width = getShortInt(ui8Array, 8 * page + 16) & 0x7fff;
  const Height = getShortInt(ui8Array, 8 * page + 18) & 0x7fff;
  const Sign = Width & 0x8000;
  const SprPageHeader = {
    Data: ui8Array.slice(8 * page + 18),
    Disp,
    Width,
    Height,
    Sign,
  };
  return SprPageHeader;
}
type Page = ReturnType<typeof getNthPage>;

export function getDataForSpr(ui8Array: Uint8ClampedArray, name: string) {
  const ID = getChars(ui8Array, 0, 4);
  if (ID !== "spr1") {
    throw new Error('Incorrect preamble. Expected "spr1".');
  }

  const Reserv0 = getChars(ui8Array, 4, 8);

  const SprHeader = {
    ID,
    Reserv0,
    Count: getInt(ui8Array, 8),
  };

  assert(Number.isInteger(SprHeader.Count));

  const result = new Array<{
    data: Uint8ClampedArray;
    metadata: {
      width: number;
      height: number;
      name?: string;
    };
  }>(SprHeader.Count);
  for (let i = 0; i < SprHeader.Count; ++i) {
    result[i] = OpenPage(ui8Array, i);
    result[i].metadata.name = `${name} (${i})`;
  }
  return result;
}

function OpenPage(ui8Array: Uint8ClampedArray, page: number) {
  const pageObject = getNthPage(ui8Array, page);
  return CalcDisp(ui8Array, pageObject);
}

function CalcDisp(ui8Array: Uint8ClampedArray, pageObject: Page) {
  const Buf = new Uint8ClampedArray(4 * pageObject.Height * pageObject.Width);

  let PosWord = pageObject.Disp;
  if (pageObject.Sign) {
    PosWord += 4;
  }

  function posWordPlusPlus() {
    return PosWord + 2;
  }

  let Mask = 0xfc;
  let Disp2 = 3;
  let Disp7 = 8;

  let line = 0;

  for (let h = 0; h < pageObject.Height; ++h) {
    if (pageObject.Sign) {
      for (let i = 0; i < pageObject.Width; ++i, PosWord == posWordPlusPlus()) {
        Buf[line++] = (getShortInt(ui8Array, PosWord) << 3) & Mask;
        Buf[line++] = (getShortInt(ui8Array, PosWord) >> Disp2) & Mask;
        Buf[line++] = (getShortInt(ui8Array, PosWord) >> Disp7) & Mask;
        Buf[line++] = 255;
      }
    } else {
      PosWord = posWordPlusPlus();
      let value;
      while ((value = getShortInt(ui8Array, PosWord))) {
        if ((value & 0xc000) === 0xc000) {
          const Count = getShortInt(ui8Array, PosWord) & 0x3fff;
          PosWord = posWordPlusPlus();
          for (let i = 0; i < Count; ++i, PosWord = posWordPlusPlus()) {
            Buf[line++] = (getShortInt(ui8Array, PosWord) << 3) & Mask;
            Buf[line++] = (getShortInt(ui8Array, PosWord) >> Disp2) & Mask;
            Buf[line++] = (getShortInt(ui8Array, PosWord) >> Disp7) & Mask;
            Buf[line++] = 255;
          }
        } else {
          line += getShortInt(ui8Array, PosWord) * 4;
          PosWord = posWordPlusPlus();
        }
      }
      PosWord = posWordPlusPlus();
    }
  }
  return {
    data: Buf,
    metadata: { width: pageObject.Width, height: pageObject.Height },
  };
}
