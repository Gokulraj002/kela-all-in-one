# Kela Hotels — design-06-eco (Eco Resort)

An eco jungle resort website: lush, conscious, data with soul. Fraunces display
+ Instrument Sans body, forest ink `#1E3226` with leaf accent `#7BA05B`.

## Personality

Quiet organic luxury. The signature is **"Canopy descent"** (§3.06): the rooms
section is a vertical multi-depth parallax — foreground leaf silhouettes
(1.4x), room cards (1.0x), background mist (0.6x) — scrubbed yPercent with no
pin, so scrolling down the page feels like descending through canopy. Rooms are
sold by height (Emergent 28 m / Canopy 18 m / Understorey 8 m). Impact numbers
count up on enter; the hero carries a 10s mist loop with slow drifting mist
overlays.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev   # open the ATELIER viewer, pick Hotel → Kela Hotels
```

## Structure

```
design-06-eco/
  index.jsx    — the site (nav, hero, booking widget, promise, canopy stays,
                 forest, dining, impact report, footer)
  meta.js      — `export const meta` (contract shape)
  content.js   — all copy, rates, impact data (JSON-compatible)
  styles.css   — tokens on `.tpl-design-06-eco` only; no :root
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/ (72 scroll-driven hero frames; the old autoplay
                 hero video is now deleted)
  README.md
```

## Replace images

Drop new files over `assets/*.jpg` (same names), or use the lab's Upload panel —
keys are `hero`, `product-0…product-3`, `detail`. Rooms map to `product-0/1/2`,
the forest visual to `product-3`, the dining visual to `detail`. `Img`
resolves uploads first, then the bundled file, then an elegant fallback.

## Tokens

All on `.tpl-design-06-eco`: `--color-primary`, `--color-accent`,
`--color-background`, `--color-surface`, `--color-card`, `--color-text`,
`--color-muted`, `--color-ink-deep`, `--color-cream`, `--color-mist`,
`--color-hairline`, `--font-display`, `--font-body`. The customizer rewrites
these live; every color/font in the CSS comes from them.

## content.js

Edit brand, nav, hero, booking defaults, rooms (name/height/price/size/desc),
experiences, dining menu (price `0` renders as "Included"), impact rows,
contact, footer. Rates render through `price()` so currency follows the lab.

## Motion notes

- `gsap.context` + `revert()` in `useLayoutEffect`; `scroller()` on every
  ScrollTrigger; `useReducedMotion()` renders the static final state.
- Hero mist: two x-yoyo layers (24s / 31s), paused when the hero is offscreen.
- Counters tween 0 → value once; final values are already in the markup.
- Canopy descent: scrubbed timeline over `.vn-stage`, yPercent −10→10 /
  −7→7 / −4→4 (≈1.4x / 1.0x / 0.6x). Room-card reveals apply to the inner
  `.vn-card-inner` so they never fight the layer parallax.

## Deploy

Standalone export via the lab exporter (`tools/export-template.mjs`); the
folder is self-contained — only `react`, `gsap`, `../../_shared`, and its own
files.
