/**
 * Renders public/og.png (1200x630) — the link-preview card.
 * Run: npm i -D sharp && node scripts/og.mjs   (sharp is not a kept dependency)
 *
 * Uses system fonts on purpose: sharp's librsvg backend silently ignores
 * @font-face with a base64 woff2 and falls back to serif.
 */
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

// The duotone portrait, inlined so the card is a single self-contained PNG.
const portrait = (
  await sharp(resolve(root, 'public/portrait.jpg')).resize(360, 450).jpeg({ quality: 86 }).toBuffer()
).toString('base64')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="a" cx="18%" cy="8%" r="70%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="88%" cy="6%" r="55%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <style>
    .h { font-family: 'Segoe UI Semibold','Segoe UI',Arial,sans-serif; font-weight: 700; fill: #14141a; }
    .s { font-family: 'Segoe UI','Segoe UI',Arial,sans-serif; fill: #45454f; }
    .a { font-family: Consolas,'Courier New',monospace; fill: #4f46e5; }
    .d { font-family: Consolas,'Courier New',monospace; fill: #5f5f6b; }
  </style>

  <rect width="1200" height="630" fill="#fbfaf8"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>

  <g stroke="#14141a" stroke-opacity="0.04" stroke-width="1">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 72}" y1="0" x2="${i * 72}" y2="630"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 72}" x2="1200" y2="${i * 72}"/>`).join('')}
  </g>

  <circle cx="84" cy="86" r="6" fill="#4f46e5"/>
  <text x="104" y="93" class="a" font-size="20" letter-spacing="2">AMANZING01</text>

  <defs>
    <clipPath id="pc"><rect x="800" y="90" width="320" height="400" rx="24"/></clipPath>
  </defs>
  <image href="data:image/jpeg;base64,${portrait}" x="800" y="90" width="320" height="400"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#pc)"/>
  <rect x="800" y="90" width="320" height="400" rx="24" fill="none" stroke="#e7e3dc" stroke-width="2"/>

  <text x="80" y="290" class="h" font-size="104" letter-spacing="-4">Aman Singh</text>

  <line x1="80" y1="338" x2="720" y2="338" stroke="#e7e3dc" stroke-width="2"/>

  <text x="80" y="396" class="s" font-size="31">Full-stack developer building</text>
  <text x="80" y="438" class="s" font-size="31">web applications end to end.</text>

  <text x="80" y="536" class="d" font-size="21">React · Next.js · Node · NestJS · PostgreSQL</text>
  <text x="80" y="568" class="a" font-size="21">3 products people use daily</text>
  <text x="80" y="600" class="d" font-size="21">Pune, India · amanzing01.github.io</text>
</svg>`

const out = resolve(root, 'public/og.png')
await sharp(Buffer.from(svg)).png().toFile(out)
console.log('wrote', out)
