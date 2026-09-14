// Genereert alle raster-favicons uit public/favicon.svg (het Finable-beeldmerk in terracotta #C4643A).
// Draai met `node scripts/build-icons.mjs` zodra het beeldmerk of de merkkleur wijzigt.
//
// Uitvoer:
//   public/favicon.ico          16/32/48, transparant (browsertab, bladwijzers, oudere browsers)
//   public/apple-touch-icon.png 180x180 op wit (iOS beginscherm; iOS maakt transparantie zwart)
//   public/icon-192.png         192x192 op wit (Android/PWA via site.webmanifest)
//   public/icon-512.png         512x512 op wit (Android/PWA via site.webmanifest)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SRC = readFileSync(fileURLToPath(new URL('../public/favicon.svg', import.meta.url)));
const out = (name) => fileURLToPath(new URL(`../public/${name}`, import.meta.url));

/** Het beeldmerk vult zijn viewBox tot de rand; padding voorkomt dat het tegen de icoonrand plakt. */
async function render(size, { background, padding = 0 }) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(SRC, { density: 1200 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

/** Minimale ICO-container met PNG-entries (ondersteund door alle browsers en Windows Vista+). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // color planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of icoSizes) {
  icoImages.push({ size, data: await render(size, { background: TRANSPARENT, padding: 0.06 }) });
}
writeFileSync(out('favicon.ico'), ico(icoImages));

writeFileSync(out('apple-touch-icon.png'), await render(180, { background: WHITE, padding: 0.18 }));
writeFileSync(out('icon-192.png'), await render(192, { background: WHITE, padding: 0.14 }));
writeFileSync(out('icon-512.png'), await render(512, { background: WHITE, padding: 0.14 }));

console.log(`icons: favicon.ico (${icoSizes.join('/')}), apple-touch-icon.png 180, icon-192.png, icon-512.png`);
