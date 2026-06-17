// 파비콘/아이콘/OG 이미지 일괄 생성 — 로고 심볼(원+십자+물결)을 정사각으로 추출해 사용
import sharp from "sharp";
import fs from "node:fs";

const OUT = "public/clinic";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// 1) 심볼 마크 추출: 와이드 배너 좌측 영역 → 투명 여백 트림
const markBuf = await sharp("scripts/_banner.png")
  .extract({ left: 0, top: 0, width: 300, height: 283 })
  .trim()
  .png()
  .toBuffer();
const mark = await sharp(markBuf).metadata();

// 심볼을 size 정사각 캔버스(흰 배경)에 padRatio 여백으로 중앙 배치
async function squareIcon(size, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(markBuf)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

const favicon = await squareIcon(256, 0.1);
fs.writeFileSync(`${OUT}/favicon.png`, favicon);
fs.writeFileSync(`${OUT}/apple-touch-icon.png`, await squareIcon(180, 0.12));
fs.writeFileSync(`${OUT}/icon-192.png`, await squareIcon(192, 0.1));
fs.writeFileSync(`${OUT}/icon-512.png`, await squareIcon(512, 0.1));

// 2) favicon.ico (16/32/48 PNG 임베드 ICO)
async function buildIco(sizes) {
  const pngs = await Promise.all(sizes.map((s) => squareIcon(s, 0.08)));
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const entries = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngs.forEach((png, i) => {
    const s = sizes[i];
    const e = entries.subarray(16 * i, 16 * i + 16);
    e.writeUInt8(s >= 256 ? 0 : s, 0); // width
    e.writeUInt8(s >= 256 ? 0 : s, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(png.length, 8); // size
    e.writeUInt32LE(offset, 12); // offset
    offset += png.length;
  });
  return Buffer.concat([header, entries, ...pngs]);
}
fs.writeFileSync("public/favicon.ico", await buildIco([16, 32, 48]));

// 3) OG 이미지 1200×630 — 워드마크 배너를 흰 배경 중앙에 배치
const ogW = 1200, ogH = 630;
const bannerOnOg = await sharp("scripts/_banner.png")
  .resize(Math.round(ogW * 0.78), null, { fit: "inside" })
  .png()
  .toBuffer();
fs.writeFileSync(
  `${OUT}/og-image.png`,
  await sharp({ create: { width: ogW, height: ogH, channels: 4, background: WHITE } })
    .composite([{ input: bannerOnOg, gravity: "center" }])
    .png()
    .toBuffer()
);

console.log("mark trimmed:", mark.width, "x", mark.height);
console.log("generated: favicon.png(256), apple-touch-icon(180), icon-192, icon-512, favicon.ico, og-image(1200x630)");
