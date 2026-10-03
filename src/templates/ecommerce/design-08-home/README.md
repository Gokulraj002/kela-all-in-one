# Kela Store Home — design-08-home

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

A warm home & living store for the ATELIER e-commerce library. Room-scene
storytelling: the product flow is a pinned **"Room Dolly"** — a slow
dolly-zoom into a sunlit living-room scene (scale 1 → 1.35 scrub,
transform-origin drifting across hotspots). As each shoppable hotspot
centers, its product card docks at the side panel with details and price.
On touch devices the scene is static with tappable hotspots.

Palette: linen `#F3EDE2`, clay `#A96B47`, oak `#7A5C3E`, ink `#241F19`.
Typography: Fraunces + Manrope. Mood: warm, settled, tactile.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The design lives at `src/templates/ecommerce/design-08-home/`.

## Structure

```
design-08-home/
  index.jsx    — the website (default export)
  meta.js      — `export const meta` (contract shape)
  content.js   — `export const content` (all copy, products, hotspots)
  styles.css   — all styling, tokens on `.tpl-design-08-home` only
  assets/      — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                 detail.jpg, frames/ (72 JPG frames for the hero scroll-scrub)
  README.md
```

## Sections & tour stops

- `#hero` — "Welcome" — "The light" signature scroll-driven frame sequence
- `#products` — "The Rooms" — Room Dolly pinned scroll product flow
- `#craft` — "Materials" — interactive material swatches (linen / clay / wool / oak)
- `#gallery` — "Room Guides" — three styled rooms, each with a shoppable piece
- `#contact` — "Delivery & Care" — white-glove delivery, trial, warranty + studio visit
- Footer, demo cart drawer (basket count in nav)

## Replacing images

Standard upload keys: `hero`, `product-0`, `product-1`, `product-2`,
`detail`. Replace the JPGs in `assets/` keeping the filenames, or use the
lab's Upload panel — `<Img k="…">` resolves custom uploads first.

## Tokens

All design tokens live on `.tpl-design-08-home` (never `:root`):

`--color-background`, `--color-surface`, `--color-card`, `--color-primary`,
`--color-deep`, `--color-secondary`, `--color-accent`, `--color-text`,
`--color-muted`, `--color-line`, `--mat-linen`, `--mat-clay`, `--mat-wool`,
`--mat-oak`, `--font-display`, `--font-body`.

## content.js

Brand, nav, hero, `products` (name, price in ₹, badge, desc, material,
imgKey, room), `dolly` (hotspot visit order), `hotspots` (percent
coordinates on the hero scene), `materials`, `guides`, `delivery`,
`contact`, `footer`.

## Motion

GSAP + ScrollTrigger in `useLayoutEffect` with `gsap.context` + `revert()`.
Room Dolly pins only at `(min-width: 1024px)`; touch gets the static
tappable scene; `prefers-reduced-motion` renders everything statically
(full product grid, no hotspots).

## Deploy

Built as part of the ATELIER app (`npm run build` at the repo root), or
exported standalone with `tools/export-template.mjs design-08-home`.
