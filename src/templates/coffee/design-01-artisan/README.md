# Kela Cafe — design-01-artisan

Artisan Coffee House. A warm craft editorial zine for a wood-fired coffee house in Fort, Mumbai — cream, espresso, and copper; Fraunces headlines with the soft-wonky axis on, Manrope for everything functional. Asymmetric grids, overlapping magazine spreads, one copper rule per section.

## Personality

Warm · Editorial · Grounded. Motion reads like turning pages of a printed house journal: unhurried, asymmetric, paper-soft. Signature motion is the **pour-wipe hero** (clip-path sweeps the frame open while the inner image counter-drifts, in a single timeline) plus **steamRise** reveals. One parallax — the hero image drifts gently on scroll. Nothing else moves without a reason.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template renders inside the ATELIER viewer (wrapped in `.tpl-scope`). For a standalone check, import the component directly in a scratch Vite page with the `_shared` folder alongside `src/templates`.

## Structure

```
design-01-artisan/
  index.jsx    — default export; nav, hero, menu board, story, craft/roast-timeline, gallery, visit, footer, mobile quick-bar
  meta.js      — contract-shaped meta
  content.js   — all copy, menu tabs, prices (₹ numbers), hours
  styles.css   — tokens on .tpl-design-01-artisan; every rule scoped
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
```

Interactive bits: time-of-day hero note (swaps copy morning/afternoon/evening), tabbed menu board (Espresso/Filter/Brunch/Bakes) with underline-draw tabs and crossfading panels, a five-act roast timeline, and a sticky mobile bottom bar with Get directions / Menu.

## Replace images

Drop new files over `assets/hero.jpg`, `menu-1.jpg`, `menu-2.jpg`, `menu-3.jpg`, `detail.jpg` — or use the lab's Upload panel, which maps to keys `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`. Keep the warm daylight grade (cream/espresso/copper) so the palette stays coherent.

## Tokens

On `.tpl-design-01-artisan`: `--color-background #F6F1E8`, `--color-surface #ECE2CE`, `--color-primary #2B2118`, `--color-secondary #6B4F33`, `--color-accent #B07B3F`, `--color-text #241B12`, `--color-muted #8A7A64`, `--font-display 'Fraunces'`, `--font-body 'Manrope'`. The customizer rewrites these live.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero` (incl. time-aware `notes`), `menuTabs` (items with ₹ number prices), `story`, `craft` (roast `stages`, `methods`, `team`), `gallery`, `visit` (address, hours, holiday note, directions), `footer`. Brand, contact email, prices, and product names all flow through `useCustom()` so overrides apply.

## Deploy

Exported as a standalone Vite template via the lab's exporter (see `tools/export-template.mjs`). Fonts load from Google Fonts at runtime with `display=swap`.
