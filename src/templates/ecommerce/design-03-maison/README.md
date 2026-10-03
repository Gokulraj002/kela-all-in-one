# Kela Store Maison — design-03-maison

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

Dark luxury boutique, editorial. Near-black `#0E0D0B`, champagne `#D9C39A`,
smoke `#8A857C`. Cormorant Garamond italic headlines, Manrope body.
Letterbox bars, full-bleed spreads, slow crossfades, generous leading.
Silent opulence.

## Personality

Kela Store's maison storefront is the third e-commerce design in the ATELIER library and its
quietest. Four pieces — a silk gown, a watch, a clutch, a parfum — are
unveiled one spread at a time behind a lifting dark veil. Nothing shouts;
everything is spaced like a museum after hours. The cart is a "Private List"
drawer; checkout is honestly labelled demo and hands off to a concierge.

## Run

From the atelier repo root:

```bash
npm install
npm run dev
```

The design mounts inside the platform viewer (Explore → E-commerce →
Kela Store Maison). Standalone export is produced by the platform's exporter
(`tools/export-template.mjs`), which copies this folder plus `_shared`.

## Structure

```
design-03-maison/
  index.jsx      — the site: nav, hero, veil spreads, story, concierge, footer, private-list drawer
  meta.js        — platform card metadata (id, palette, features, fonts…)
  content.js     — all editable copy, products, prices (₹), contact
  styles.css     — all styling; tokens scoped to .tpl-design-03-maison only
  assets/        — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                   detail.jpg, frames/ (72 scrub frames for the hero)
  README.md
```

### Sections

- Minimal fixed nav with Private List count → opens the drawer
- Hero (`id="hero"`, `data-tour="Welcome"`) — scroll-driven frame-sequence
  background, letterbox bars, word-mask headline
- Veil Unveiling (`id="products"`, `data-tour="The Collection"`) — pinned
  desktop flow, 3 editorial spreads (gown / watch+clutch diptych / parfum)
- Atelier story (`id="story"`, `data-tour="Atelier"`)
- Concierge (`id="contact"`, `data-tour="Concierge"`) — maison promise trio,
  address, hours, mailto CTA
- Footer; Private List drawer (demo cart)

## Scroll mechanic — Veil Unveiling (MOTION.md §03)

Desktop (≥1024px): the spreads section pins for 3 viewport-heights of
scroll. A dark scrim lifts via `clip-path: inset()` scrub (0→55% of each
third); a champagne hairline draws on; spread copy rises; the letterbox
bars breathe (scaleY 1→2.4) at each spread crossing; slow crossfade into
the next spread. Mobile / reduced-motion: stacked full-height spreads, the
scrim simply fades away, no pin.

## Video → scroll-driven frames

`assets/frames/frame-001.jpg` … `frame-072.jpg` — "The drape" (VIDEO_PLAN.md
§03): dark silk drapes over a luxury object, champagne rim light, settles,
light breathes. Rendered through the shared `ScrollFrames`: the hero pins
for `+=170%` of scroll and the 72 frames scrub forward/backward as the
visitor scrolls (progressive preload, no blank flash, cover-fit canvas,
reduced-motion → static first frame, no pin).

## How to replace images

Swap the files in `assets/` keeping the names, or use the lab's Upload
panel — the upload keys are `product-0`, `product-1`, `product-2`,
`detail` (mapped to product-1/2/3.jpg, detail.jpg). Keep the
near-black/champagne grade for the veil flow to read correctly.

## Tokens

All design tokens live on `.tpl-design-03-maison` — never `:root`:

`--color-background/surface/primary/secondary/accent/text/muted`,
`--font-display`, `--font-body`. The lab customizer rewrites them live.

## content.js

Brand, nav, hero copy, `products` (name + numeric ₹ price + desc),
spreads, story, promise trio, contact, footer. Product names and prices
render through `useCustom()` (`productName`, `price`) so Customize works.

## Deploy

Standalone export via `tools/export-template.mjs` (copies this folder +
`_shared`, builds with Vite). Any static host serves the `dist/` output.
