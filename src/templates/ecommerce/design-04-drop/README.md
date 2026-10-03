# Kela Store Drop — design-04-drop

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

Drop-culture flash sale. Bone `#EFEDE6`, ink `#111110`, flat volt orange `#FF4D00`
(never neon). Space Grotesk + Inter. Oversized numerals, ticker tape, hard rules,
stamp badges. Kinetic street energy — gone by midnight.

## Run

```bash
npm install
npm run dev        # template mounts in the ATELIER viewer
```

Standalone export: `node tools/export-template.mjs ecommerce design-04-drop`
builds a self-contained Vite site from this folder.

## Structure

```
design-04-drop/
  index.jsx      — component: ticker, nav+cart, video hero, countdown band,
                   drop-cascade lineup, size guide/FAQ, restock alerts, footer,
                   demo cart drawer
  meta.js        — platform metadata (id, fonts, colors, features)
  content.js     — all copy/data: brand, ticker, hero, 4 products (₹ prices,
                   MSRPs, sizes, badges, alts), size chart, FAQs, restock, contact
  styles.css     — all styling, tokens scoped to .tpl-design-04-drop
  assets/        — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                   detail.jpg, frames/ (72 scroll-scrubbed JPGs, 8–10s "The burst"
                   storyboard — the hero video was converted, not kept)
  README.md
```

## Replacing images

Drop new JPGs over `assets/hero.jpg`, `product-1.jpg`, `product-2.jpg`,
`product-3.jpg`, `detail.jpg`. In the lab, the Upload panel maps to keys
`hero`, `product-0`, `product-1`, `product-2`, `detail` — keep the same
filenames so `img(key, fallback)` keeps working. Keep replacements
photorealistic, on-palette, no text or watermarks.

Hero motion: the hero is a scroll-driven frame sequence
(`assets/frames/frame-001.jpg` … `frame-072.jpg`) scrubbed by `ScrollFrames`;
re-export frames from your hero clip to replace them. Reduced motion shows
frame 001 statically. `hero.jpg` remains the upload fallback image.

## Tokens

All on `.tpl-design-04-drop` — never `:root`:

| Token | Value |
|---|---|
| `--color-background` / `--color-bone` | `#EFEDE6` |
| `--color-ink` / `--color-primary` | `#111110` |
| `--color-accent` | `#FF4D00` (flat — no glow shadows anywhere) |
| `--color-secondary` | `#3A3A37` |
| `--color-muted` | `#6E6C63` |
| `--color-surface` | `#E7E4D8` |
| `--font-display` | Space Grotesk |
| `--font-body` | Inter |

The Customize panel rewrites these live.

## content.js

Plain JSON-compatible object. Products carry `name`, `price` (₹, numbers),
`msrp` (struck-through on landing), `desc`, `badge` (stamp text), `sizes`,
`imgKey`, `alt`. Brand, nav, ticker, hero, guide (size rows + FAQs), restock,
contact, and footer are all editable there.

## Motion

- **Drop Cascade** (MOTION.md §04): scrub-driven — each product card falls
  from `yPercent: -130` with `back.out(1.4)` overshoot + slight rotation
  settle; as it lands, the price zone fades up and a volt slash strikes the
  MSRP.
- Ticker tape: CSS marquee (disabled under reduced motion).
- Countdown: real 1s interval to local midnight; CTA pulses via CSS.
- Hero: masked word-rise headline + stamp slam entrance.
- `prefers-reduced-motion` → static, fully-visible layouts; no GSAP runs.

## Deploy

Exported zip is a static Vite build — serve `dist/` from any static host.

Demo cart and restock form are front-end only (clearly labeled demo);
wire `onAdd`/`Restock.submit` to your commerce backend for production.
