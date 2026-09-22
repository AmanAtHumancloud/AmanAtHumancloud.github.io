# Aman Singh — portfolio

Static single-page portfolio. React + Vite + Tailwind v4 + Motion, deployed to GitHub Pages.

## Editing the content

Everything the site says lives in `src/data/content.ts` — copy, projects, metrics, stack, timeline, links.
You should not need to open a component to change what the page says.

## Local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes to Pages.
One-time setup: repo Settings -> Pages -> Source = **GitHub Actions**.

The repo must be named `Amanzing01.github.io` for the site to live at the root domain.
For a custom domain later, add a `CNAME` file in `public/` containing the domain.

## To replace

- `public/portrait*.jpg` — generated from the source headshot by `scripts/portrait.mjs` (needs `npm i -D sharp`). Duotone by default; point `profile.photo` / `profile.photoTall` at the `-bw` variants for plain black and white.
- `public/Aman-Singh-Resume.pdf` — currently the older resume; overwrite with the latest.
- `public/og.png` — link preview image.
