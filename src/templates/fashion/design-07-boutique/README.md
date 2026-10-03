# Kela Fashion — design-07-boutique

Multi-designer boutique, gallery curation. Twelve creative voices hang side by
side under one gallery roof — designers are the rooms, and every piece carries
its maker's name.

## Personality

Curated · Composed · Discerning. A white-box gallery that happens to sell
clothes: indexed designer rails, wall-label typography, exhibition dates in
rani pink. Motion orients — you always know which designer's rail you're on.

## Run

```bash
npm install
npm run dev     # standalone dev (template mounted directly)
npm run build   # production build
```

Inside the ATELIER platform the template mounts under
`<div class="tpl-scope tpl-design-07-boutique">`; the viewer scrolls inside
`.tpl-scope`, which the template's ScrollTriggers are wired to.

## Structure

```
design-07-boutique/
  index.jsx    — the site (nav, hero, designers, edit, film, styling, visit, footer)
  meta.js      — meta { id, num: '07', name, tag: 'Boutique', … }
  content.js   — all copy: brand, designers (6), products (6), slots, contact
  styles.css   — ALL styling; tokens scoped to .tpl-design-07-boutique only
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg, frames/ (72 scroll frames)
  README.md
```

### Sections

- **Hero** — current exhibition: headline `wordRise`, boutique interior, a
  designer-index card with a soft 2.5s glow pulse (the only loop; pauses
  offscreen).
- **Designers** — the signature `mirrorColumns` mechanic: a pinned stage
  (≥768px, `end: '+=280%'`, `scrub: 0.8`) where two garment-rack columns drift
  in opposite directions around a static centre column of designer names that
  highlight as their rail passes the centre line. Clicking a name opens that
  designer's room (philosophy, signature, price band) with a stamped
  curator's-selection badge. Mobile: names list above, one static rail grid.
- **The Edit** — cross-designer capsules ("The Monsoon Edit", "Handloom
  Modernists", "The Occasion Edit") filtering a product grid; every card shows
  designer attribution, fabric and ₹ price.
- **Atelier Film** — "The Rail": rail drift → hands parting garments
  → chalk marks and muslin toile. `ScrollFrames` scrubs 72 frames on a
  pinned `+=150%` canvas; frame 001 doubles as the reduced-motion still.
- **Styling** — appointment types + a booking sheet (slides up on mobile,
  email request + Instagram DM link, both driven by the Customize panel).
- **Visit / Footer** — address, hours, contact, designer-application note.

## Replacing images

Swap files in `assets/` keeping the names (`hero.jpg`, `look-1.jpg`,
`look-2.jpg`, `look-3.jpg`, `detail.jpg`), or upload via the lab's
Customize → Upload panel using keys `hero`, `product-0`, `product-1`,
`product-2`, `detail` (custom uploads win automatically via `useCustom`).

The film is scroll-driven: `assets/frames/frame-001.jpg` … `frame-072.jpg`
(72 frames) scrub on a canvas as the visitor scrolls through the pinned
"Atelier Film" section (`+=150%`). Replace the sequence by dropping new
`frame-NNN.jpg` files into `assets/frames/` (no faces, no text burned in);
frame 001 is the first frame visitors see and the reduced-motion fallback.

## Tokens

All on `.tpl-design-07-boutique` (the Customizer rewrites these live):

| Token | Default |
|---|---|
| `--color-background` | `#FCFBF8` gallery white |
| `--color-surface` | `#F1EEE7` |
| `--color-primary` | `#1E1C19` ink |
| `--color-accent` | `#BE2F5B` rani pink |
| `--color-text` | `#1E1C19` |
| `--color-muted` | `#8E8A80` |
| `--font-display` | `'Marcellus', serif` |
| `--font-body` | `'Outfit', sans-serif` |

## content.js

Brand name/tagline, nav, hero copy, the 6-designer roster (name, aesthetic,
signature, philosophy, price band), the 3 edit capsules + 6 products (prices
in ₹ numbers, rendered via `price()`), film copy, styling slots, visit block,
contact, footer lines.

## Deploy

Exported as a standalone Vite zip via `node tools/export-template.mjs fashion
design-07-boutique` — `npm install && npm run dev` inside the zip, then any
static host (`npm run build` → `dist/`).
