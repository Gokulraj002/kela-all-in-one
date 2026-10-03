# 09 · Kela Tech — Open-source project

A welcoming, energetic community site for a fictional open-source framework called **Kela Tech**. Warm paper background, purple/green accents, Public Sans display type with IBM Plex Mono accents.

## Signature scroll mechanic — Contribution Fill

The centerpiece is a pinned contributor-wall section (desktop ≥ 768px, via `gsap.matchMedia`; static full mosaic on mobile and under reduced-motion):

- **48 contributor tiles** (CSS initials avatars in purple/green/paper tones) start face-down.
- A pinned `ScrollTrigger` (`scrub: 1`, `end: '+=250%'`) drives a single timeline:
  - Tiles flip in (`rotationY 90 → 0`) in a wave sweeping left→right, top→bottom via `stagger: { from: 'start' }`.
  - A commit counter tallies `0 → 12,480` in tabular mono numerals.
  - A gradient progress bar fills in lockstep.
- By progress 1 the mosaic is complete.

Supporting motion: masked word-rise hero headline, warm rise reveals (`.cf-rv`), count-up stats band (48,200 stars · 2,140 contributors · 940k downloads), gentle hero drift-out. All ScrollTriggers use `scroller()`.

## Sections

Community nav (Docs / Showcase / Blog + GitHub star button) → hero with signature loop video → contribution wall → features (MIT licensed · Plugin ecosystem · First-class docs) → community showcase grid → stats band → docs teaser (install steps) → "Star us on GitHub" CTA → footer.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-09-opensource/
  index.jsx   — default export; the whole site
  meta.js     — { meta } template metadata
  content.js  — { content } all editable copy/data
  styles.css  — all styling; tokens scoped to .tpl-design-09-opensource
  assets/     — hero.jpg, feature-1..3.jpg, detail.jpg, frames/ (72 scroll frames)
  README.md
```

## Images & video

- `hero.jpg` — sunlit collaboration table
- `feature-1.jpg` — community meetup from behind
- `feature-2.jpg` — laptops with blurred purple/green code
- `feature-3.jpg` — community mural wall
- `detail.jpg` — sticky-note macro (docs teaser)
- `assets/frames/frame-001.jpg` … `frame-072.jpg` — 72 frames extracted from the former 8s "Many hands" hero loop; played frame-by-frame on scroll via shared `<ScrollFrames>` (pin `+=170%`)

Upload keys (customize panel): `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

Defined on `.tpl-design-09-opensource` (never `:root`): `--color-paper`, `--color-ink`, `--color-purple`, `--color-green`, `--color-line`, `--font-display` (Public Sans), `--font-body`, `--font-mono` (IBM Plex Mono). The customizer rewrites these live.

Fonts load once via a Google Fonts `<link id="tpl-font-design-09-opensource">` (display=swap).

## Deploy

Standalone export: the folder + `../../_shared` is copied by `tools/export-template.mjs` into a Vite app; `index.jsx` imports only relative files, `_shared`, `react`, and `gsap`.
