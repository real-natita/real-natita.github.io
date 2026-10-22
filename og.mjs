import sharp from "sharp";

const bg = { r: 0xf7, g: 0xec, b: 0xdf };
const W = 1200, H = 630;

const hero = await sharp("assets/hero-light.svg", { density: 220 })
  .resize({ width: 1000 })
  .png()
  .toBuffer();

const meta = await sharp(hero).metadata();

await sharp({ create: { width: W, height: H, channels: 3, background: bg } })
  .composite([{ input: hero, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2) }])
  .png()
  .toFile("og.png");

console.log("og.png", meta.width, "x", meta.height);
