# Kela Hotels — design-09-villas

Private villas collection, exclusive. Tag: **Private Villas**.

## Design personality

Discreet luxury for a nine-villa private estate on the shoreline. Twilight ink
(#241D16) and antique brass (#C9A24B); Cormorant Garamond display + Manrope
body. Ceremonial, museum-like spacing. The tone is enquiry, never booking —
"Enquire privately", not "Book now". Prices appear only as quiet "from / night"
notes, never shouted.

## Sections

1. **Hero** — aerial estate at sunset; signature 10s sequence as scroll-driven
   frames (ScrollFrames, 72 JPGs, pinned `+=170%` scrub); slow settle zoom
   1.06 → 1 over 3s; masked word-rise headline.
2. **The Collection** — the signature flow: a stylized SVG estate map. On
   desktop (≥768px) the section pins and a brass marker travels the drawn path
   (strokeDashoffset + `getPointAtLength`, no MotionPathPlugin), scrubbed by
   scroll; nine villa cards highlight in sequence as the marker reaches their
   nodes. Mobile / reduced-motion: static fully-drawn map + stacked cards.
3. **Signature Villas** — three deep dives (The Main Villa, The Infinity House,
   Villa Tide) with specs, amenities, from-rates, plus a discreet comparison table.
4. **Private Staff** — chef, butler, chauffeur.
5. **Occasions** — weddings & retreats whole-estate buyouts, beach-deck banner.
6. **Enquire** — high-touch form: dates, guests, villa of interest, notes.
   Computes live night count × from-rate into an *indicative estimate*;
   final proposals are prepared personally. Submit shows a quiet confirmation
   (demo only — no data leaves the page).
7. **Footer** — discreet wordmark, links, colophon.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-09-villas/
  index.jsx    — component (nav, hero, map journey, signatures, staff,
                 occasions, enquire form, footer)
  meta.js      — meta export
  content.js   — all copy/data (9 villas, 3 signatures, staff, occasions…)
  styles.css   — all styling, tokens on .tpl-design-09-villas only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/ (frame-001.jpg … frame-072.jpg — the 10s aerial
                 sunset sequence, scrubbed by scroll)
  README.md
```

## Replacing images

Swap the JPGs in `assets/` keeping the same filenames, or use the platform
Upload panel — image keys are `hero`, `product-0`, `product-1`, `product-2`,
`detail` (resolved via `img(key, fallback)`). The hero is a 72-frame JPG
sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`) scrubbed by scroll
via the shared `ScrollFrames` component; swap the frames to change the motion.

## Tokens

On `.tpl-design-09-villas`: `--color-primary`, `--color-accent`,
`--color-background`, `--color-surface`, `--color-surface-2`, `--color-text`,
`--color-muted`, `--color-line`, `--font-display`, `--font-body`.
The customizer rewrites these live. Never write to `:root`.

## content.js

Plain object: `brand`, `nav`, `hero`, `villas[9]` (map order, gate → beach),
`signatures[3]` (by villa index), `compare`, `staff`, `occasions`, `enquire`
(form labels), `visit`, `footer`. Villa names/rates flow through
`productName(i, fallback)` / `price(n)` so Customize renames and currency
apply everywhere, including the map cards and the enquiry estimate.

## Deploy

Exported by `tools/export-template.mjs` as a standalone Vite app
(self-contained: only `react`, `gsap`, `gsap/ScrollTrigger`, `../../_shared`).
