# Cerebrum — portfolio

## Preferences

- Dark technical / terminal aesthetic. Near-black canvas, one mint accent, mono micro-labels,
  dot-grid + film-grain texture. Chosen over editorial-minimal and gradient-glassmorphic.
- Stack: Vite + React + TS + Tailwind + Motion. Static only, no backend.
- Deploy target: `Amanzing01.github.io` at the root (not a project subpath).
- Copy must read human. No "passionate", "leverage", "cutting-edge", "journey",
  "crafting digital experiences". Short sentences, specific nouns, at most one dry joke.
- Wants to impress recruiters — proof of shipped production work outranks decoration.

## Learnings

- Aman: Full-Stack Engineer at HumanCloud Technologies, Pune. Start date **June 2025** (confirmed).
  Render tenure from `START_DATE` in content.ts so it never goes stale.
- **CGPA is 8.7/10** (confirmed) — the 8.4 in the HumanCloud-branded resume is wrong.
- Three live products: teamcast.ai, vettly.ai, tryacai.app/products/hire. These are the
  strongest asset on the site; they lead.
- Resume undersells him as "Jr." while describing senior-shaped work (6-layer auth pipeline,
  MCP/RAG assistant, pgvector semantic search). Site drops the "Jr.".
- GitHub: Amanzing01. LinkedIn: /in/amanzing2001. Email: amanzing2001@gmail.com.
- Photo is a placeholder (`public/portrait.svg`) — user will supply a real one later.

## Do-Not-Repeat

- Do NOT name a Tailwind v4 `@theme` color token `base`, `sm`, `lg`, `xs` etc. —
  they collide with built-in font-size/spacing utilities. `text-base` broke a color.
  Page background token is `--color-void`.
- Do NOT write large TS/TSX content files via bash heredoc — apostrophes and em dashes
  break the shell parse. Use the Write tool for anything with prose in it.
- Do NOT `sed` across a whole file to rename a token — it hit a legitimate `text-base`
  font-size class. Scope the pattern or review every hit.
- Do NOT rely on `sharp`/librsvg honoring `@font-face` with base64 woff2 — it silently
  falls back to serif. The OG script uses system fonts on purpose.
- `sharp` is intentionally NOT a dependency. og.png is committed; install sharp ad-hoc
  only when regenerating.
- Bash `/tmp` in this environment is not the same path Node sees. Use the scratchpad dir.

## 2026-09-22 — Major user correction (v1 rejected)

The first build was rejected. What was wrong, in the user's words:

- **"so dark and messy"** — near-black canvas was oppressive; layout read as cluttered.
- **"the font is not too readable"** / **"increase the font size"** — body copy was `text-sm`
  (14px) almost everywhere. Far too small for a recruiter skimming once.
- **"only tagline is readable to me rest is grayed out in black bg"** — `faint #52525b` on
  `#0a0a0b` is ~3:1. Real contrast failure, not a taste issue.
- **"green is not a good color"** — mint `#6ee7b7` accent rejected outright.
- **"you went very shallow on that [animation]"** — 6 restrained motions was not what they
  wanted. They want the site to feel alive.
- **"what is this tagline, i wanted a developer's portfolio in general"** — the headline
  "I build the systems that decide who gets hired" over-specialised him into HR software.
  He wants to read as a general full-stack developer.
- **"i want my website fresh looking"** — explicitly asked for Aceternity UI / animate.ui
  style animated components.

### New direction (confirmed)

- Palette: **light warm paper** `#FBFAF8`, ink `#14141A`, body `#45454F`,
  accent **indigo `#4F46E5`** + violet `#7C3AED`. No green. No dark canvas.
- Headline: **name first** — "Aman Singh", then a plain full-stack role line.
- Animation: user picked **all four** — animated hero background, count-up stats,
  3D tilt cards on hover, page-load intro sequence.
- Build in the style of Aceternity UI (copy-paste components, not an npm install),
  adapted for Tailwind v4 + Motion.

### Standing rules from this

- Body copy floor is **16px**; secondary text 15px minimum. Never `text-sm` for prose.
- Every text/background pair must clear **7:1**. No decorative low-contrast grays.
- Default to a LIGHT theme for this user unless they say otherwise.
- Do not narrow his positioning to the hiring/HR domain — he is a general full-stack dev
  who happens to work on hiring products.
- When he says "animated", err generous, not restrained.

### Voice and UI notes (2026-09-22)

- He wants warm, human microcopy, not status-page language. "Live in production" was
  rejected; "Three of these are out there right now" is the register he wants.
- He likes a bit of unserious personality — asked for a funky yellow emoji badge outright.
- Tiny photos read as noise to him. A face should be big enough to be a face, or absent.
- He reversed himself on the hero portrait within the same turn. Expect iteration on
  visual ideas; build them cheaply and be ready to pull them out cleanly.
- When removing a feature, also remove its CSS, its content field and its assets —
  do not leave dead weight behind.

### Do-Not-Repeat additions (2026-09-22)

- NEVER copy media URLs from the BuzynessStories project into the portfolio. Every video
  there is hot-linked from cdn.cuberto.com and the project covers are Cuberto client work.
  Reimplement techniques with Aman's own assets; do not ship someone else's content.
- When he points at another site he likes, separate the TECHNIQUE from the ASSET. He wants
  the effect, and is not asking to appropriate the footage.
