// 사용자가 올린 파비콘 원본(콩팥 OK 마크)을 정사각 아이콘 세트로 생성
import sharp from "sharp";
import fs from "node:fs";

const SRC = "scripts/_favsrc.png";
const OUT = "public/clinic";
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// 원본 투명 여백 트림 후 정사각 흰 캔버스에 중앙 배치
const markBuf = await sharp(SRC).trim().png().toBuffer();
const mark = await sharp(markBuf).metadata();

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

fs.writeFileSync(`${OUT}/favicon.png`, await squareIcon(256, 0.06));
fs.writeFileSync(`${OUT}/apple-touch-icon.png`, await squareIcon(180, 0.08));
fs.writeFileSync(`${OUT}/icon-192.png`, await squareIcon(192, 0.06));
fs.writeFileSync(`${OUT}/icon-512.png`, await squareIcon(512, 0.06));

// favicon.ico (16/32/48 PNG 임베드)
async function buildIco(sizes) {
  const pngs = await Promise.all(sizes.map((s) => squareIcon(s, 0.04)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = Buffer.alloc(16 * pngs.length);
  let offset = 6 + 16 * pngs.length;
  pngs.forEach((png, i) => {
    const s = sizes[i];
    const e = entries.subarray(16 * i, 16 * i + 16);
    e.writeUInt8(s >= 256 ? 0 : s, 0);
    e.writeUInt8(s >= 256 ? 0 : s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
  });
  return Buffer.concat([header, entries, ...pngs]);
}
fs.writeFileSync("public/favicon.ico", await buildIco([16, 32, 48]));

console.log("source trimmed:", mark.width, "x", mark.height);
console.log("regenerated: favicon.png, apple-touch-icon.png, icon-192, icon-512, favicon.ico (og-image unchanged)");
