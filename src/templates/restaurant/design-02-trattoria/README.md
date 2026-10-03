# Kela Kitchen — design-02-trattoria

**Rustic family-table editorial · Trattoria** — warm, hearty, generous. Cream / wood / terracotta. Fraunces (soft optical, italic for nonna quotes) + Karla (body, menu rows); prices in Fraunces tabular.

## Signature mechanic — Lazy-susan orbit (M2)

Six dish cards orbit a central table image as you scroll: the scrub rotates the ring 0 → 120°, every card counter-rotates to stay upright, and the centred dish name crossfades to whichever card passes the top marker. It lives in normal flow (no pin), works on mobile with a smaller ring, and renders as a static ring with all cards visible under `prefers-reduced-motion`.

Sections: warm nav (phone prominent) → hero (flame-toss frame sequence, scroll-scrubbed; pour-wipe in) → our story (nonna narrative) → the dishes (orbit) → chalkboard menu (dark panel inversion, names draw in with chalk-like stagger) → handmade pasta feature → Sunday family-style table → visit → warm footer.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template is auto-discovered from `src/templates/restaurant/design-02-trattoria/` by the platform viewer.

## Structure

```
design-02-trattoria/
  index.jsx    — default export component (all sections + orbit mechanic)
  meta.js      — design metadata (contract shape)
  content.js   — all editable copy, dishes, menu groups, hours
  styles.css   — all styling; tokens on .tpl-design-02-trattoria only
  assets/      — hero.jpg, dish-1.jpg, dish-2.jpg, dish-3.jpg, detail.jpg, frames/ (72 scroll-scrub JPGs)
```

## How to replace images

Replace the files in `assets/` keeping the same filenames, or use the lab's Upload panel — the upload keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`. Dish names/prices render via `productName(i, …)` / `price(n)` so the Customize panel works.

## Tokens

`--color-background #F7F0DF` · `--color-surface #EFE3C8` · `--color-primary #3A2A1E` · `--color-secondary #7C5B3A` · `--color-accent #B4552D` · `--color-text #33261B` · `--color-muted #96805F` · `--font-display 'Fraunces', serif` · `--font-body 'Karla', sans-serif`.

Chalkboard inversion + warm paper tones (all scope-only): `--color-board #241B13` · `--color-frame #5A4128` · `--color-chalk #F5EEDC` · `--color-chalk-dim #A68F66` · `--color-chalk-gold #E9B44C` · `--color-paper #FFFDF6` · `--color-cream-hi #FBF6E9` · `--color-cream-soft #F3EAD6` · `--color-foot-text #E9DCC3` · `--color-foot-dim #C9B795`. Every color and font in `styles.css` resolves through these vars — no `:root`, no hardcoded values outside the token block.

`--ct-orbit-r` controls the orbit radius (clamped per breakpoint).

## content.js

Plain object: `brand`, `nav`, `phone`, `hero`, `story`, `dishes.items[]` (`name`, `price` in ₹ as numbers, `img` upload key, `desc`, `note` origin note), `menu.groups[]`, `craft` + origin `notes[]`, `sunday` (family-style offering), `visit` (address/phone/email/hours), `footer`.

## Deploy

The export assembler (`tools/export-template.mjs`) copies this folder as a standalone Vite app — imports are limited to `react`, `gsap`, `../../_shared`, and local files, so the export builds clean. The hero background is a scroll-driven frame sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`, scrubbed by scroll via the shared `ScrollFrames` component), so the experience ships with no video weight; the frames load lazily via `import.meta.glob`.
