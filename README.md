# ATELIER — The Website Experience Library

A premium website experience library: 10 industry categories × 10
completely unique website designs each = 100 experiences. React + Vite
+ JavaScript (no TypeScript), GSAP + ScrollTrigger, React Router.

## Status

| Category | State |
|---|---|
| 01 Jewelry | **Live** — 10 designs |
| 02 Coffee & Café | **In production** — 10 designs via the 4-agent workflow |
| 03–10 E-Commerce, Saree & Fashion, IT & Technology, Creative Agency, Hotel & Resort, Restaurant, Real Estate, Travel & Tourism | Queued — same pipeline, same bar |

## Run it

```bash
cd atelier
npm install
npm run dev
```

Open the local address (e.g. `http://localhost:5173`).

## Routes

- `/` — library home: editorial hero crossfading industries, category showcase
- `/category/:slug` — e.g. `/category/jewelry`: 10 designs, filters, compare, favorites, recently viewed
- `/category/:slug/design/:id` — full website experience + toolbar:
  Experience (fullscreen) · Present (auto-tour) · Customize · Upload ·
  Source · Download · Favorite

## Architecture

```
src/
  pages/            Home, Category, Viewer
  data/library.js   category + design registry
  lib/              store (localStorage), toast
  templates/
    _shared/        CustomContext (useCustom), Img — customization primitives
    coffee/         native React templates (contract: REACT_TEMPLATE_CONTRACT.md)
public/
  templates/jewelry/  static templates, served as-is in an iframe viewer
  downloads/          prebuilt source/asset zips
  platform/           home + category imagery
tools/
  export-template.mjs  build a standalone Vite project zip for a native template:
                       node tools/export-template.mjs coffee design-01-artisan
```

**Two template kinds.** *Static* templates (Jewelry) are standalone
HTML/CSS/JS sites rendered in an iframe; customization flows through
`window.applyCustomization`. *Native* templates are React components
rendered directly with a `CustomProvider`; they read brand/colors/images
via `useCustom()` and scope tokens to `.tpl-<id>` (never `:root`).

**Adding a category.** Append one entry to `CATEGORIES` in
`src/data/library.js`, add the folder `src/templates/<slug>/` following
`REACT_TEMPLATE_CONTRACT.md`, drop a preview at
`public/platform/cat-<slug>.jpg`. No platform rewrite needed.

**Standalone export.** Every native template ships as an independent Vite
project (`npm install && npm run dev`) via `tools/export-template.mjs`,
which also enforces the contract (no platform imports, no `:root` writes).
The viewer injects `public/custom.json` for customized exports.

## Conventions

- Premium bar: typography + photography + spacing + color + motion + detail.
  No emojis, no lorem ipsum, no cheap gradients, no purple-AI gradients.
- Motion: GSAP timelines, `gsap.context` + `revert()` cleanup,
  `prefers-reduced-motion` respected everywhere.
- Images: generated editorial photography, unique per design, never reused
  across templates. Shipped as WebP (full-bleed ≤1920px, others ≤1400px);
  heroes load eagerly (`<Img eager>`), everything else lazily.
- Brand: every design is a Kela site. Names, contact details and the brand
  colour (light-page and dark-page tones) live in
  `src/templates/_shared/brand.js`; templates read them via `useCustom()` /
  `brandFor()` and `--color-accent`, `--brand-on-light`, `--brand-on-dark`.
- Viewer layout: the template scrolls inside `.tpl-scope` below the toolbar.
  Fixed layers use `top: var(--tpl-top, 0px)`; full-height stages use
  `var(--tpl-vh, 100svh)`. Scrolling is Lenis + GSAP ScrollTrigger
  (`pinType: 'fixed'`).
- QA: `npm run qa:audit` (headless Chrome over every page) and
  `npm run qa:perf` (page speed on the production build).
