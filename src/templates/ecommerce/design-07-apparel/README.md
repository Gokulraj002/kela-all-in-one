# Kela Store Apparel — design-07-apparel

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

**Editorial lookbook commerce.** Warm gray `#EDE8DF`, ink `#1C1A17`, oxblood
`#6E2A2A`. Bodoni Moda + Inter. Full-bleed folio pages with shoppable
product tags, a pinned scroll-scrubbed page turn, demo cart drawer, size
guide, and atelier story.

## Run

From the atelier repo root:

```bash
npm install
npm run dev
```

The template mounts through the platform viewer (Customize / Upload /
Present / Compare panels all work). Standalone export via
`tools/export-template.mjs design-07-apparel`.

## Structure

```
design-07-apparel/
  index.jsx   — default export; nav, hero, lookbook turn, index grid,
                story, size+shipping, footer, cart drawer
  meta.js     — platform metadata (contract shape)
  content.js  — all copy, products (INR), looks, sizes, contact
  styles.css  — all styling; tokens scoped to .tpl-design-07-apparel
  assets/     — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                detail.jpg, frames/ (72 scroll-sequence frames)
  README.md
```

## Sections & tour

| id | data-tour | contents |
|---|---|---|
| `hero` | Cover | scroll-driven frame sequence, word-mask headline |
| `products` | The Lookbook | pinned page turn (4 folio pages) + product index grid |
| `story` | The Atelier | atelier story, pull quote, stats |
| `craft` | Size & Shipping | size table, shipping & promises |

## Scroll mechanic — Lookbook Turn

Desktop (≥1024px, motion allowed): the 4 folio pages pin while scroll
scrubs a page-turn timeline — each incoming page wipes in from the right
(`clip-path`), its inner image counter-skews (`skewY 6°→0`, scale
1.07→1), a page-edge shadow trails off, then copy rises and the
shoppable tags pop with stagger (`back.out`). Folio numbers count
01→04 in the corner. Mobile and `prefers-reduced-motion`: the same four
looks render as stacked editorial cards with tags always visible.

## Images

Generated to the design's art direction (soft window light, warm gray /
ink / oxblood; partial faces, composed — never stock-smile; no text or
watermarks):

- `hero.jpg` — lookbook portrait, soft window light (video poster)
- `product-1.jpg` — blazer look (Folio 01)
- `product-2.jpg` — pleated silk macro (Folio 02)
- `product-3.jpg` — atelier rack (Folio 03)
- `detail.jpg` — tailoring hands, oxblood thread (Folio 04)

`assets/frames/frame-001.jpg` … `frame-072.jpg` — "The rack": slow dolly
along the garment rack, fabrics swaying, window light. Played frame by
frame as the visitor scrolls, via shared `<ScrollFrames>` (pinned scrub,
first-frame poster, progressive preload, reduced-motion safe).

Replace any image by overwriting the file in `assets/`, or use the
platform Upload panel (keys: `hero`, `product-0`, `product-1`,
`product-2`, `detail`).

## Tokens

All on `.tpl-design-07-apparel` — never `:root`:

`--color-background` `#EDE8DF` · `--color-surface` `#E2DACB` ·
`--color-primary` `#1C1A17` · `--color-secondary` `#4A443C` ·
`--color-accent` `#6E2A2A` · `--color-text` `#1C1A17` ·
`--color-muted` `#7D7466` · `--color-line` · `--color-page-ink` ·
`--color-page-text` · `--font-display` Bodoni Moda ·
`--font-body` Inter.

## content.js

Brand, nav, hero, `looks[]` (folio, title, quote, cite, imgKey, tag
positions in %), `products[]` (name, price in ₹, desc, fabric, badge),
`sections` (index, story, craft with size rows + shipping), contact,
footer. All prices render through `price()`; names through
`productName()`; brand/images through `useCustom()`.

## Demo cart

Bag count in the nav; tags and index cards add items; the drawer lists
items with `price()` totals, quantities, and remove. Checkout is honestly
labeled demo — no payment is taken.
