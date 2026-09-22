/**
 * Processes the source photo into the site portrait, with a filter baked in.
 * Run: npm i -D sharp && node scripts/portrait.mjs
 *
 * Writes:
 *   public/portrait.jpg     4:5 duotone — what the site uses
 *   public/portrait-bw.jpg  4:5 plain mono — swap in content.ts to use instead
 *
 * The duotone maps luminance onto indigo shadows / paper highlights, so the photo
 * reads as monochrome but sits in the site palette. Note that a flat sharp .tint()
 * after .grayscale() is a silent no-op — the pipeline is single-band by then — so
 * this renders the mono stage to a buffer first, then does the mapping itself with
 * a per-channel linear transform.
 *
 * CROP is in source pixels and is specific to the current source image. If you
 * swap the photo, re-measure it: the ratio must be 4:5, and for this shot the
 * right edge is pulled in deliberately to keep the phone out of frame.
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const SRC = process.env.PORTRAIT_SRC ?? 'C:/Users/loq_h/Downloads/Image (3).jfif'

// Source is 768x1024. The phone occupies roughly x466-640, so 466 is the widest
// 4:5 crop that keeps it out of frame entirely — anything wider clips through it.
const CROP = { left: 0, top: 140, width: 466, height: 582 }
const OUT_SIZE = [800, 1000]

// luminance 0 -> shadow, 255 -> highlight
const SHADOW = [30, 27, 75] // indigo-950
const HIGHLIGHT = [251, 250, 248] // paper

/** Grayscale + gentle contrast lift, rendered out so it has three sRGB bands. */
const mono = await sharp(SRC)
  .rotate()
  .extract(CROP)
  .grayscale()
  .normalise()
  .linear(1.06, -8)
  .toColourspace('srgb')
  .png()
  .toBuffer()

function duotone(buf) {
  const a = [0, 1, 2].map((i) => (HIGHLIGHT[i] - SHADOW[i]) / 255)
  return sharp(buf).linear(a, SHADOW)
}

async function write(pipe, name) {
  const out = resolve(root, `public/${name}`)
  await pipe.resize(...OUT_SIZE).jpeg({ quality: 88, mozjpeg: true }).toFile(out)
  console.log('wrote', out)
}

await write(duotone(mono), 'portrait.jpg')
await write(sharp(mono), 'portrait-bw.jpg')
