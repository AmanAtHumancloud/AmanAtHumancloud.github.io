# Memory — portfolio

## 2026-09-22 — Initial build

Built the portfolio from an empty directory.

- Agreed the direction with the user up front: dark technical / terminal aesthetic,
  Vite + React + TS + Tailwind + Motion, deploy to `Amanzing01.github.io` at the root,
  single page with expandable case studies.
- Read both resumes (`AMAN Resume.pdf`, `Aman-Singh-HC.pdf`) to source all content.
- Scaffolded Vite 8 / React 19 / TS, added Tailwind v4 (`@tailwindcss/vite`), motion 13, lenis.
- Self-hosted fonts: Satoshi 400/500/700/900 from Fontshare, JetBrains Mono variable (latin
  subset) from Google Fonts. ~131 KB total in `public/fonts`, preloaded in index.html.
- Built the design system in `src/index.css` using Tailwind v4 `@theme` tokens, plus the
  fixed dot-grid and film-grain texture layers and the hero bloom.
- Put every string in `src/data/content.ts` so the site can be edited without touching
  components. Tenure is computed from `START_DATE` (June 2025) rather than hardcoded.
- Wrote the copy in a deliberately human voice; dropped "Jr." from the title because the
  described work is not junior-shaped.
- Built two hand-made animated SVG architecture diagrams: the Acai HIRE six-layer auth
  pipeline and the MeetBot async pipeline. These are the strongest technical signal on the page.
- Six motions total, all gated on `prefers-reduced-motion`: hero word reveal, product ticker,
  scroll reveal, case-study spring expand, magnetic cursor pull, SVG draw-on.
- Generated `public/og.png` (1200x630) with a one-off sharp script, then removed sharp from
  dependencies so CI installs stay small.
- Added the GitHub Pages Actions workflow, README and `.nojekyll`.

Verification: `tsc -b` clean, `npm run build` clean (~130 KB gzip JS), `oxlint src` clean.
Could NOT verify visually — the Claude in Chrome extension was not connected, so the
dev server at localhost:5177 was never screenshotted. Visual QA still outstanding.

Open items handed back to the user: real photo (placeholder `portrait.svg` in place),
Vettly case-study details (written conservatively from resume bullets only), and whether
to swap in a newer resume PDF.

## 2026-09-22 — v2 rebuild after user rejected v1

User feedback was blunt and specific: too dark, messy, font too small, everything grayed
out on black, green is the wrong accent, animation too shallow, and the tagline
("I build the systems that decide who gets hired") pigeonholed him into HR software when
he asked for a general developer portfolio. He also asked for Aceternity-UI-style
components so the site feels fresh.

Confirmed the new direction with him before rebuilding: light warm paper + indigo,
name-first headline, and all four animation options he was offered.

What changed:

- **Palette flipped to light.** `paper #fbfaf8`, `ink #14141a`, `body #45454f`,
  accent `indigo #4f46e5` + `violet #7c3aed`. Every text/bg pair now clears 7:1;
  the old `faint #52525b` on near-black was ~3:1, which was the real complaint.
- **Type scale raised.** Body base 17px (was 14px), leads 19–22px, section headings up to
  56px, hero name up to 144px. `label` went 11px -> 13px.
- **Hero rebuilt name-first.** "Aman Singh" reveals letter by letter, then a plain
  full-stack role line. Copy rewritten so he reads as a general developer who happens to
  work on hiring products, rather than an HR-software specialist.
- **Animation deepened** — added an Aceternity-style `ui/` layer:
  `Aurora` (drifting indigo/violet field that leans toward the cursor),
  `Intro` (page-load counter that races to 100 then wipes up),
  `CountUp` (spring count-to-value on scroll),
  `TiltCard` (3D tilt with a pointer-tracked sheen),
  `Marquee` (seamless tech strip).
  Also: scroll-filled timeline spine, shimmer sweep on the primary button.
- **Work section restructured** from a dense accordion list into a 2x2 grid of tilt cards
  feeding one shared detail panel below the grid — directly addressing "messy".
- Diagrams recoloured for light mode and their geometry widened (boxes 112->134 and
  124->152) because the larger label text no longer fit.
- OG card and favicon regenerated for the light palette.

Verification: `tsc -b` clean, `oxlint src` clean (fixed a set-state-in-effect warning in
Intro by deciding the reduced-motion case during render), `npm run build` clean at
142 KB gzip JS / 7.5 KB CSS. Production build served on :5178 — page and all four static
assets return 200.

Still not visually verified by me — the Claude in Chrome extension is not connected in
this environment, so every visual judgement here is from code, not from looking at it.

## 2026-09-22 — Real photo + layout adjustments

User supplied his headshot (`Downloads/Image (2).jfif`, 768x1024, blazer, green foliage
background) and asked for a filter — black and white, or something matching the site.

- Built `scripts/portrait.mjs`. It crops twice (4:5 for the about section, 1:1 for the
  avatars) and writes four files: duotone + plain mono for each crop.
- Compared four looks before committing to one. Settled on a **subtle duotone**: luminance
  mapped to indigo-950 shadows and paper highlights, so it reads as monochrome but sits in
  the palette. It also neutralises the green foliage background, which mattered since the
  user had rejected green. Pure B&W ships alongside as `-bw.jpg`; swapping is one line in
  `content.ts`.
- Enlarged the about-section photo from a 96px thumbnail to a full 4:5 portrait with a
  gradient name plate — the small thumb wasted a good photo.
- Added the portrait to the OG card; link previews are much stronger for it.
- Deleted `public/portrait.svg` (the monogram placeholder) and the README reference.

Mid-turn he asked for three more things, all done:

1. **Proof stats on one row** — was `grid-cols-2 md:grid-cols-4`, now `grid-cols-4` at every
   breakpoint with fluid `clamp()` type and left divider rules so four fit on a phone.
2. **Case study panel full-bleed** — the expanded detail now breaks out of the section's
   `max-w-6xl` with `left-1/2 -ml-[50vw] w-[100vw]`, keeping only the page gutter
   (`px-5 sm:px-8`). Inner content caps at 1400px and "What I built" goes two-column at xl
   so line lengths stay readable at that width.
3. **Scroll to the case study on expand** — added `src/lib/scroll.ts`, a tiny registry
   holding the Lenis instance (set by `SmoothScroll`, cleared on unmount) with a
   `scrollToEl` helper that falls back to `window.scrollTo` when Lenis is not running.
   `Work` scrolls to the panel on `openId` change. The panel sits below the grid so its top
   edge does not move while the height animates, which makes an immediate scroll correct.

Verification: `tsc -b`, `oxlint src` and `npm run build` all clean (143 KB gzip JS,
7.9 KB CSS). Production build served on :5180 — page and every portrait/OG asset return 200.
Compiled CSS confirmed to contain the new `grid-cols-4`, `-50vw`, `100vw` and the 80rem
media query.

Still unverified visually — Chrome extension remains unconnected in this environment.

## 2026-09-22 — Copy warmth, emoji badge, descender fix

Four asks, plus one mid-turn reversal.

- **"Live in production" was too corporate.** Replaced with a human framing:
  "Three of these are out there right now" / "Real teams log into them on a Monday morning."
  Product notes rewritten the same way ("recruiters use it daily",
  "60+ companies hiring on it"). Proof labels followed: "products people use daily",
  "companies hiring on them".
- **Small avatar replaced with a funky yellow badge** — a `#FFD84D` rounded square with a
  waving-hand emoji that actually waves on hover (`hand-wave` keyframes, disabled under
  reduced motion), next to "Hey, I'm Aman". The 56px photo was too small to read as a face.
- **Descender clipping fixed.** The per-letter reveal wraps each glyph in an
  `overflow-hidden` box; the 'g' in "Singh" was being cut at the baseline. Fixed with
  `pb-[0.24em] -mb-[0.24em]` — pads the clip box past the baseline, then removes the same
  amount from layout so nothing shifts.
- **Hero portrait: added then removed.** Built it beside the name with a `.photo-fade`
  mask dissolving from the left and bottom; user saw it and said "ah no bad idea remove the
  photo from top right, only the bottom one is cool". Removed the image, the `.photo-fade`
  CSS, the now-unused `profile.photo` field, and the two square crops from `public/` so
  nothing dead ships. The about-section portrait stays.

Verification: `tsc -b`, `oxlint src`, `npm run build` all clean (143 KB gzip JS, 8.1 KB CSS).
Confirmed in the compiled CSS that `photo-fade` is gone and `hand-wave` +
`padding-bottom:.24em` remain. Served on :5181; all live assets 200. Note that `vite preview`
serves an SPA fallback, so a 200 on a deleted path is HTML, not a stale file — check
content-type before concluding an asset still exists.

Still not visually verified — Chrome extension unconnected.

## 2026-09-22 — Portrait swapped to second photo

User replaced the headshot with `Downloads/Image (3).jfif` — a mirror selfie in a lift:
phone held up in frame, face in three-quarter profile looking down, hoodie, cluttered
background with a notice board.

Flagged the professionalism concern in one line, then did the work as asked.

- Measured three candidate crops and compared them rendered before committing. The phone
  sits from x~466 in the 768x1024 source, so a 448x560 crop at left:14 top:170 is 4:5 and
  stops short of it entirely. Chose that one ("wider") for having the least cramped headroom.
- The duotone treatment does a lot of work here — it flattens the lift interior and the
  notice board into neutral tone, so the result reads as a deliberate moody portrait rather
  than a selfie.
- Output raised to 800x1000. The crop is only 448px wide in the source, so this is a ~1.8x
  upscale; acceptable because the card displays around 420px and the mono treatment hides
  softening.
- Rewrote `scripts/portrait.mjs` around a single documented `CROP` constant, since the
  previous version had crop maths hardcoded for the first photo and silently produces
  garbage on a different source. Dropped the square-crop outputs — nothing uses them.
- Regenerated `og.png`, and while there noticed its embedded caption still read
  "3 products live in production" from before the copy warm-up. Updated it to
  "3 products people use daily" to match the site.

Verification: `tsc -b`, `oxlint src`, clean `npm run build` (143 KB gzip JS). Served on
:5182 — portrait.jpg returns image/jpeg and og.png image/png, so the new files are really
being served rather than SPA-fallback HTML.

Follow-up: user said the crop was too tight. Rendered four zoom levels side by side to
choose against. Anything wider than 466px clips through the phone, so 466x582 at
left:0 top:140 is the widest 4:5 framing that keeps it out — settled there.

## 2026-09-22 — Techniques borrowed from BuzynessStories (not assets)

User pointed at his other project (`Desktop/hehe/BuzynessStories`) and asked to reuse the
hero video, the oval video set into the tagline, the How We Work animation, the project
videos and the Philosophy video.

**Key finding, raised with the user:** every video on that site is hot-linked from
`cdn.cuberto.com` — Cuberto's CDN — and the project covers (puntopago, riyadh, qvino, zelt,
cisco, kzero, magma, flipaclip, potion, ferrumpipe) are Cuberto's real client work. Copying
those URLs here would publish another studio's copyrighted video on Aman's site and imply
to recruiters that he worked on those projects. Declined to copy any asset; reimplemented
the techniques with his own content instead. Verified no `cuberto` string exists anywhere
in src/, public/ or index.html.

What was actually worth taking (the rest was staggered framer-motion reveals the portfolio
already had):

- **Pill of media set inline in a headline** — their signature move (`Hero.jsx`,
  `Projects.jsx`). Built `components/ui/InlineMedia.tsx`: a rounded-full inline span that
  renders a `<video>` when given one and falls back to an image. Used in the hero statement
  line and the Work section heading, carrying his own duotone portrait.
- **IntersectionObserver play/pause** — genuinely good engineering from their
  `MobileVideo.jsx`. Mobile browsers refuse autoplay on load but allow a programmatic
  `play()` once in view; pausing off-screen saves battery. Kept the iOS attribute handling
  (`playsinline`, `webkit-playsinline`, DOM-level `muted`).
- **Two-speed parallax columns** — theirs used locomotive-scroll `data-scroll-speed`
  (0 vs 0.5). Reimplemented with Motion `useScroll` + `useTransform` + `useSpring`: odd-index
  work cards drift +34px to -34px across the grid's scroll range. Subtle on purpose.

Since there is no video to put in the pill, added a `pill-drift` keyframe — a slow 14s
scale-and-pan on the still image so it reads as motion rather than a pasted photo. It is
replaced automatically the moment a real clip is passed as `video`, and is disabled under
reduced motion along with the other loops.

`hero.statement` is split into `before`/`after` in content.ts so the pill sits mid-sentence:
"I build software [pill] people log into every day."

Verification: `tsc -b`, `oxlint src`, clean build (144 KB gzip JS, 8.3 KB CSS). Served on
:5184, page 200. Not visually verified — Chrome extension still unconnected.

## 2026-09-22 — Videos added (user asserted ownership of Cuberto)

After I flagged the Cuberto provenance, the user replied "its okay if you add cuberto links
cuberto is my only, just ignore the project section videos rest we can use". Restated the
doubt once, factually, then proceeded per his decision. He explicitly excluded the project
cover videos — which were the ones that would have implied he built Cuberto's client work,
so the worst version of the risk is off the table either way.

Four clips now in use, all **self-hosted in `public/video/`** rather than hot-linked:

| file | from | size |
|---|---|---|
| hero.mp4 | home/hero/1.mp4 | 0.33 MB |
| featured.mp4 | home/featured/header.mp4 | 0.29 MB |
| toolkit.mp4 | home/summary/1.mp4 | 0.73 MB |
| about.mp4 | home/summary/2.mp4 | 1.73 MB |

Self-hosted deliberately: hot-linking a third-party CDN breaks whenever they move a path,
and if he does own the assets there is no reason to depend on someone else's origin.
Skipped `showreel/2.mp4` — 10.6 MB is too heavy to autoplay on mobile data and a full-screen
abstract reel does not tell a recruiter anything. Skipped all project covers as instructed.

Placement: hero statement pill, Work heading pill, Toolkit heading pill, and a 16:9 block
above the About copy (their Philosophy layout). Paths live in `media` in content.ts so any
clip can be swapped by replacing one file.

Built `components/ui/AmbientVideo.tsx` for the larger block — same IntersectionObserver
play/pause as InlineMedia, plus `preload="none"` so the 1.7 MB About clip is only fetched
when it approaches the viewport. Both components hold on the first frame under reduced
motion. The pills pass `poster={image}` so the portrait shows until the clip decodes.

dist is now 4.3 MB total, 3.0 MB of it video — fine for GitHub Pages.

Verification: `tsc -b`, `oxlint src`, clean build (144 KB gzip JS). Served on :5185 — all
four clips return video/mp4, and no `cdn.cuberto` string remains in src/ or index.html.

## 2026-09-22 — Hero pill enlarged, greeting block removed

- Hero pill moved to the END of the statement sentence and made much larger:
  `h-[0.78em] w-[1.5em]` -> `h-[1.25em] w-[2.4em]`. `hero.statement` collapsed from a
  before/after pair into a single string, since the pill no longer splits it.
- User asked to remove the yellow emoji badge block ("Hey, I'm Aman" + tenure line) added
  earlier the same session. Removed the markup, `hero.emoji`, the `hand-wave` keyframes and
  the `.emoji-badge` rules, and the reduced-motion entry for it.
- That left `tenure()` with no callers. `src/lib/utils.ts` turned out to be entirely dead —
  `cx` had been superseded by `cn` in lib/cn.ts, and `totalMonths` was never used — so the
  file was deleted. Verified nothing imported from it first.
- `START_DATE` stays in content.ts as a documented constant. Worth knowing: the hero body
  now states "a year and a half of production experience" as prose, so it no longer updates
  itself and will go stale. Flagged to the user.

Verification: `tsc -b`, `oxlint src`, clean build (144 KB gzip JS, CSS down to 8.15 KB gzip
after the dead rules were dropped). Served on :5187, page and hero clip both 200.

## 2026-09-22 — Deployed to GitHub Pages

Live at **https://amanathumancloud.github.io/**
Repo: https://github.com/AmanAtHumancloud/AmanAtHumancloud.github.io

Blocker found before pushing: `gh` was authenticated as **AmanAtHumancloud**, but the whole
site had been built for **Amanzing01** (canonical URL, OG tags, README). Asked rather than
guessing, since the answer changes the repo name and every absolute URL. User chose to
publish under AmanAtHumancloud, so canonical/og:url/og:image, the OG card caption and the
README were all rewritten and og.png regenerated.

Note the GitHub *profile* link in the site still points at github.com/Amanzing01 — that is
deliberate, it is his code portfolio. Only the hosting account differs.

Privacy: user agreed to drop the phone number. Removing it from the Contact component was
not enough — everything in content.ts ships in the JS bundle whether or not a component
reads it, and `grep 70384 dist/assets/*.js` still hit. Deleted the field outright and
verified 0 occurrences in the live HTML and the live JS bundle. Contact now offers
email + LinkedIn. The number remains in the résumé PDF, which is normal for a résumé.

Deploy mechanics:
- Two commits (initial build, then the URL/privacy change).
- `gh repo create ... --source=. --remote=origin` created it; remote resolved to SSH, so
  pushing the `.github/workflows/` file worked despite the gh token lacking `workflow`
  scope (that restriction applies to HTTPS token auth, not SSH).
- Pages was auto-enabled as `build_type: legacy` on first push. POST to the pages API
  returns 409 once enabled — had to **PUT** `build_type=workflow` to switch it to Actions.
  Worth remembering: POST creates, PUT reconfigures.
- Deploy run 35742471347 succeeded in 44s.

Live verification: /, og.png, portrait.jpg, video/hero.mp4, the résumé PDF and a font all
return 200 with correct content-types; title and canonical are correct in the served HTML.

Non-blocking annotations from the runner: actions/checkout@v4, configure-pages@v5,
setup-node@v4 and upload-artifact@v4 target Node 20, which is deprecated and being forced
onto Node 24. Worth bumping the action versions at some point.

## 2026-09-22 — Mobile pass

Site was written with responsive classes from the start but had never been checked at phone
width. Audited the code rather than guessing, and found real bugs:

- **Work card drift broke the phone layout.** The two-speed parallax applied `y` to
  odd-index cards unconditionally. At md+ that is two columns drifting against each other;
  below md the grid is a single column, so it just knocked alternating cards out of rhythm.
  Gated behind a new `useIsDesktop()`.
- **No navigation on phones.** Every nav link was `hidden sm:block`, leaving only the logo
  and one button. Rebuilt Nav with a 44px hamburger and an animated dropdown sheet listing
  all five sections. Deliberately no body scroll-lock — the sheet is a dropdown, and locking
  would fight Lenis on the same tick a link inside it scrolls.
- **Four stats at 375px gave each label ~78px.** Added a `short` field to `proof` used below
  `sm` ("companies" vs "companies hiring on them"), tightened the gap, dropped the value
  clamp floor to 1.375rem.
- **Diagrams are 860px wide with no affordance.** Wrapped each in its own
  `overflow-x-auto overscroll-x-contain` scroller (so horizontal drag does not bounce the
  page) with a `lg:hidden` figcaption telling the reader it scrolls sideways.
- **TiltCard mounted spring machinery on touch devices** where mousemove never fires. Now
  returns a plain div unless `(pointer: fine)`.
- **Aurora**: three ~40rem layers at `blur(72px)` are expensive to composite on phone GPUs.
  Reduced to 44px blur and slowed the drift under 48rem.
- **Hero** had `min-h-[94svh]` on every size; on a phone the content already exceeds the
  viewport so it only added dead space. Now content-sized below md.

Added `src/lib/useMediaQuery.ts` using `useSyncExternalStore`, so the first render already
has the correct answer instead of flashing the wrong layout.

Overflow audit at 375px: only fixed widths left are the diagram `min-w-[860px]` (inside its
own scroller) and a `max-w-[1400px]` (a maximum, safe). Widest `whitespace-nowrap` chip is
"Multi-tenant architecture" at ~238px against ~279px available inside a card — fits.

Verification: `tsc -b`, `oxlint src`, clean build. Tried the Chrome extension again to
actually look at it — still not connected, so this pass is reasoned from code and measured
arithmetic, NOT seen. Mobile visual QA remains outstanding and the user should check it.

## 2026-09-24 — Portrait reverted to the first photo

User asked to go back to the original headshot. Repointed `scripts/portrait.mjs` at
`Image (2).jfif` and restored that photo's crop: `{left:0, top:32, width:768, height:960}`
at 900x1125 output. That is the largest 4:5 region the 768x1024 source contains, trimmed
from the bottom to keep the face centred, so it is only a ~1.2x upscale — noticeably better
than the 1.7x the selfie crop needed.

Regenerated portrait.jpg, portrait-bw.jpg and og.png (which embeds the portrait), rebuilt
and deployed. The duotone treatment is unchanged.
