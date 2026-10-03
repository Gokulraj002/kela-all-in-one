# Kela Store Brutal — design-10-brutal

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

Experimental brutalist commerce. No decoration — the rawness IS the design.

## Personality

A workwear inventory unit that refuses to sell you a story. Raw ledger
table on concrete, thick black rules, safety-yellow accents (flat, no
glow). Uppercase Space Mono labels, heavy Archivo headlines. The stock
ticker never stops; the ledger re-cuts itself when you scroll fast.

## Run

From the repo root:

```bash
npm install
npm run dev        # open the ATELIER viewer, pick E-commerce → Kela Store
npm run build      # production build
```

Standalone export: `node tools/export-template.mjs design-10-brutal`
produces a self-contained Vite project.

## Structure

```
design-10-brutal/
  index.jsx    — component: nav, ticker, hero, ledger, stock check, manifest, footer, cart drawer
  meta.js      — platform metadata (contract shape)
  content.js   — all copy, products, shipping lines (JSON-compatible)
  styles.css   — all styling, tokens on .tpl-design-10-brutal only
  assets/      — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg, detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

## The ledger shuffle (MOTION.md §10)

Scroll-velocity spikes (>2000px/s, debounced 1200ms) Fisher-Yates shuffle
the ledger rows with a hard 0.1s cut — no easing longer than 0.15s
anywhere. The first shuffle strikes every price down to its sale price
(live from then on, including cart totals). Sort buttons (price ↑/↓,
name A–Z, reset) re-cut the table instantly. Reduced motion: no velocity
shuffles — static table, sorts still work.

## Replacing images

Drop new JPGs over `assets/hero.jpg`, `product-1.jpg`, `product-2.jpg`,
`product-3.jpg`, `detail.jpg` (keep names), or regenerate
`assets/frames/frame-001.jpg` … `frame-072.jpg` (640px-wide JPGs in playback
order — the hero scrubs them frame-by-frame on scroll, replacing the old
loop clip). In the viewer, the Customize → Upload panel maps upload keys
`hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

```css
.tpl-design-10-brutal {
  --color-background: #D8D5CE;  /* concrete */
  --color-primary: #0A0A0A;     /* black */
  --color-accent: #F5C518;      /* safety yellow, flat */
  --font-display: 'Archivo', sans-serif;
  --font-body: 'Space Mono', monospace;
}
```

## content.js

`brand`, `nav`, `hero`, `ticker[]`, `products[]` (name, sku, price,
sale, sizes, stock, desc), `ledger`, `visual.frames`, `shipping.lines`,
`contact`, `footer`. Prices are plain numbers in ₹ — rendered via the
shared `price()` so currency customization works.

## Deploy

Ship the standalone export's `dist/` to any static host. The demo cart is
honestly labeled — no checkout exists.
