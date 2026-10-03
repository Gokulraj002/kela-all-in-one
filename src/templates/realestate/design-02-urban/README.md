# Kela Estates — design-02-urban · Urban Apartments

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Sharp, efficient, dense. A data-forward urban apartment experience for a 24-floor
Whitefield, Bengaluru tower: price/sqft, floor, and facing up front, a sticky
filter bar, floor-plan-forward cards, and a neighbourhood section that talks in
drive-times instead of adjectives.

## Personality

No-nonsense and fast. Tabular numerals everywhere, hairline rules, uppercase
micro-labels, and one signal-orange accent (#E4572E) doing all the talking on an
ink (#141414) / bone (#EDEAE2) base. Headlines are Archivo 800, set tight and
uppercase; body is Inter.

## Signature mechanic — the elevator rail

Beside the listings sits a CSS-built 24-floor tower graphic. On desktop
(≥768px, motion allowed) the section pins and a stepped-scrub timeline
(ScrollTrigger `snap`) rides a glowing floor marker up the tower floor by floor;
each step slides the matching apartment card in from the side with its price,
carpet area, floor, facing, rate/sqft, and a schematic floor-plan diagram.
Below 768px or with `prefers-reduced-motion`, the same units render as a static,
fully-visible list — no pins, nothing hidden.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-02-urban/
  index.jsx    — component: nav, hero, listings+rail, floor plans, neighbourhood, contact
  meta.js      — lab metadata (id design-02-urban)
  content.js   — all copy + 8 showcase units (prices are numbers in ₹)
  styles.css   — tokens on .tpl-design-02-urban only; no :root
  assets/      — hero.jpg, listing-1/2/3.jpg, detail.jpg, frames/ (72 scroll frames)
```

## Replacing images

Swap the files in `assets/` keeping the names, or use the lab's Upload panel —
`Img` keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

`--color-primary #141414` · `--color-accent #E4572E` ·
`--color-background #EDEAE2` · `--font-display 'Archivo'` · `--font-body 'Inter'`.
Section rhythm uses `--pad-section: clamp(96px, 12vw, 180px)`.

## content.js

Units live in `content.units` (code, bhk, area, floor, facing, price in ₹,
imgKey, plan variant). Prices render through `price()` (₹, en-IN). Unit codes
render through `productName(i, fallback)` so the customizer can rename them.

## Deploy

Built as a standalone Vite export via `tools/export-template.mjs`; the folder is
self-contained (imports only `./*`, `../../_shared`, `react`, `gsap`).
