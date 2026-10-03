# Kela Kitchen — design-06-farm · Farm-to-Table

**Personality:** Honest · Green · Grounded. A working farm & kitchen on
Kanakapura Road, Bengaluru — fourteen acres, nine growers, zero shortcuts.
The menu follows the seasons; the seasons answer to nobody.

## Signature mechanic — M6 "Season dial"

A large circular dial (Spring / Summer / Autumn / Winter). Scrolling through
the section **rotates the dial (scrub, 90° per season)**; the seasonal menu
below **crossfades** as the dial passes each detent — the active season's
dishes rise in, the previous season's sink out. The dial is the control; the
menu obeys. It is not a carousel: the dial is a single control surface and
the menu is driven by it.

- Reduced motion: four season **tabs** (click to switch), no rotation.
- Mobile: dial shrinks, still scrubbed in-flow (no pin).

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

## Structure

- `index.jsx` — the site (nav, hero, farm, seasons dial, harvest, supper club, visit, footer)
- `content.js` — all copy: 4 seasonal menus × 4 dishes (₹ prices, farm-source notes), growers, supper club dates, address/hours
- `styles.css` — all styling; tokens scoped to `.tpl-design-06-farm`
- `meta.js` — ATELIER contract metadata
- `assets/` — `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`, `detail.jpg`, plus `frames/` (72 scroll-scrubbed hero frames, 640px JPGs)

## Replace images

Drop same-named JPGs into `assets/`, or use the lab's Upload panel — upload
keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

`--color-primary` (leaf #2F4A2C), `--color-secondary` (soil #7A5C3E),
`--color-accent` (harvest #C07A2E), `--color-background` (cream #F6F1E2),
`--color-surface` (#ECE5D0), `--color-text`, `--color-muted`;
`--font-display` Lora, `--font-body` Nunito Sans.

## Deploy

Standalone export via `tools/export-template.mjs`; `npm run build` must stay clean.
