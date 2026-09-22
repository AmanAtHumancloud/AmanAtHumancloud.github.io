# Anatomy — portfolio

Static single-page portfolio for Aman Singh. Vite 8 + React 19 + TypeScript + Tailwind v4 + Motion 13.
No backend. Deploys to GitHub Pages at `Amanzing01.github.io` (repo root, `base: '/'`).

## Layout

```
index.html                  meta, OG tags, font preloads
vite.config.ts              base '/', react + tailwind plugins
scripts/og.mjs              one-off OG image renderer (needs `npm i -D sharp`)
scripts/portrait.mjs        crops + filters the source headshot into the 4 portrait files
.github/workflows/deploy.yml  build -> upload-pages-artifact -> deploy-pages

public/
  fonts/                    Satoshi 400/500/700/900, JetBrains Mono variable (self-hosted woff2)
  portrait.jpg              4:5 duotone portrait (about section)
  portrait-square.jpg       1:1 duotone (avatars)
  portrait*-bw.jpg          plain mono alternates (swap in content.ts to use)
  Aman-Singh-Resume.pdf     served at /Aman-Singh-Resume.pdf
  og.png                    1200x630 link preview (committed, not built)
  favicon.svg

src/
  index.css                 @theme tokens, @font-face, textures, reduced-motion
  main.tsx / App.tsx        entry + section composition order
  data/content.ts           ALL copy, projects, metrics, links — single source of truth
  lib/utils.ts              cx(), tenure() computed from START_DATE
  lib/cn.ts                 cn() = clsx + tailwind-merge
  lib/scroll.ts             Lenis instance registry + scrollToEl() helper
  components/
    Nav.tsx                 fixed nav + scroll-progress bar
    Section.tsx             numbered header + large section intro heading
    Reveal.tsx              rise + fade, once at 20% in view
    StackChip.tsx           mono pill, 'default' | 'accent' tone
    Magnetic.tsx            cursor-pull link/button (pointer:fine only)
    SmoothScroll.tsx        Lenis + anchor interception
    ui/                     Aceternity-style animated components
      Aurora.tsx            drifting indigo/violet field, leans toward cursor
      Intro.tsx             page-load counter panel, wipes up
      CountUp.tsx           spring count-to-value on scroll into view
      TiltCard.tsx          3D tilt + pointer-tracked sheen
      Marquee.tsx           seamless infinite tech strip
    diagrams/
      AuthPipeline.tsx      Acai HIRE 6-layer auth flow, animated SVG
      MeetBot.tsx           MeetBot async pipeline, animated SVG
  sections/
    Hero.tsx                name-first letter reveal, aurora bg, live products, tech marquee
    Proof.tsx               4 metrics, count up on scroll
    Work.tsx                4 tilt cards -> one shared expanding detail panel (centerpiece)
    Stack.tsx               6 grouped skill clusters as tilt cards
    Timeline.tsx            scroll-filled spine: HumanCloud -> DRDO -> Infosys -> degree
    SideProjects.tsx        About section + profile card + 3 smaller projects
    Contact.tsx             footer, email CTA, links, aurora bg
```

## Design tokens (src/index.css `@theme`)

LIGHT theme (v2 — the dark v1 was rejected by the user, see cerebrum).

Surfaces: `--color-paper #fbfaf8` (page), `card #ffffff`, `sunk #f4f2ee`,
`line #e7e3dc`, `line-soft #f0ede7`.
Text: `ink #14141a` (16.1:1), `body #45454f` (8.2:1), `subtle #5f5f6b` (6.1:1, labels only).
Accent: `indigo #4f46e5`, `indigo-deep #4338ca`, `violet #7c3aed`, `glow #eef2ff`.
Type scale: `--text-body 17px`, `--text-body-lg 19px`, `--text-lead 22px`.
Body base font-size is 17px — do not use `text-sm` for prose.

CSS animations live in index.css: `aurora-drift`, `marquee-x`, `shimmer-x`,
plus `.paper-grid` (faint blueprint grid) and `.tilt-scene` / `.tilt-layer`.

## Commands

`npm run dev` · `npm run build` · `npm run preview` · `npx oxlint src`
