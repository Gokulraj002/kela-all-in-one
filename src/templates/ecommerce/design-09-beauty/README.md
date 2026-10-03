# Kela Store Beauty — design-09-beauty

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

Soft, ingredient-led beauty commerce for the ATELIER library. Blush `#F7ECE6`,
sand `#E9DCCB`, rosewood `#8A4B3C`, ink `#2B2320`. Cormorant Garamond + Jost.
Dissolving layers, ingredient callouts, airy grids, dewy macro. Soft science.

## Signature motion — Formula Dissolve

Desktop (≥1024px): a pinned scrub sequence. Three formulas; per stage an
ingredient macro texture layer cross-dissolves — opacity + blur + scale
1.06→1 — into the packshot, like a formula resolving into the bottle.
Soft, slow, no hard cuts. Mobile: each stage's macro gently crossfades as
the card scrolls by. `prefers-reduced-motion`: static stacked cards, macro
hidden, everything fully visible.

## Sections

Nav (bag count) · hero (signature video loop) · Formula Dissolve lineup
(`#products`, tour “The Formulas”) · ingredient stories (`#story`, tour
“Ingredients”) · ritual guide (`#ritual`, tour “The Ritual”) · reviews
(`#reviews`, tour “Reviews”) · footer/contact (`#contact`, tour “Contact”).
Demo cart drawer with subtotals (demo checkout, labelled honestly). Petal
Lip Tint card includes a working shade finder (4 sheer shades).

## Run

```bash
npm install
npm run dev
```

The template is picked up by the ATELIER viewer automatically via `meta.js`.

## Structure

```
design-09-beauty/
  index.jsx    — the site; nav, hero, dissolve, story, ritual, reviews,
                 footer, cart drawer, shade finder
  meta.js      — contract metadata (id, palette, features, fonts, colors)
  content.js   — all copy, products (₹), shades, ritual, reviews, contact
  styles.css   — all styling; tokens scoped to .tpl-design-09-beauty only
  assets/      — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                 detail.jpg, frames/ (frame-001.jpg … frame-072.jpg)
  README.md
```

## Replace images

Drop new JPGs over `assets/hero.jpg`, `assets/product-1.jpg`,
`assets/product-2.jpg`, `assets/product-3.jpg`, `assets/detail.jpg`
(same filenames), or use the lab's Upload panel — keys are `hero`,
`product-0`, `product-1`, `product-2`, `detail`. The hero is a
scroll-driven frame sequence: replace `assets/frames/frame-001.jpg` …
`assets/frames/frame-072.jpg` with new frames (same filenames, JPG);
`hero.jpg` remains the upload key fallback for the hero slot.

## Tokens

```css
.tpl-design-09-beauty {
  --color-background: #F7ECE6; --color-surface: #E9DCCB;
  --color-primary: #2B2320;    --color-secondary: #8A4B3C;
  --color-accent: #8A4B3C;     --color-text: #2B2320;
  --color-muted: #7C6B63;      --color-cream: #FDF8F2;
  --color-rose: #EAC9BC;
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;
}
```

The lab customizer rewrites these live. Never add `:root` rules.

## content.js

Plain object: `brand`, `nav`, `hero`, `products` (name, price in ₹, size,
badge, desc, formula[]), `shades`, `formulasHead`, `story` (body[],
ingredients[]), `ritual` (steps[]), `reviews` (items[], assurances[]),
`contact`, `newsletter`, `cart`, `footer`. No functions.

## Deploy

Exported as a standalone Vite template via `tools/export-template.mjs`
like every other design — no extra steps.
