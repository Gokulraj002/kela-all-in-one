# Kela Store Bazaar — design-02-bazaar

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

A vibrant marketplace experience for the ATELIER e-commerce library: joyful
density done with taste. Warm paper ground, saffron / deep teal / chili
accents, tilted stall cards, sticker badges, hand-drawn SVG dividers, and a
festival ticker that never sits still.

## Personality

- **Mood:** Festive, abundant, warm. Every lane has a story; every stall, a maker.
- **Signature motion:** the **Stall Conveyor** — two diagonal rows of stall
  cards drift in opposite directions. Speed = base drift + scroll-velocity ×
  factor, driven by an rAF loop reading `ScrollTrigger` `onUpdate` deltas
  (`getVelocity()`), with decay back to idle. Cards tilt with the plane.
  Mobile and `prefers-reduced-motion` get a calm static 2-column grid.
- **Extras:** sticker badges pop in with a back-ease on mount, squiggle
  dividers draw themselves on scroll, category sticker-chips filter the
  conveyor, and a demo cart drawer keeps a running subtotal.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template is picked up by the platform viewer automatically via
`src/templates/ecommerce/design-02-bazaar/`.

## Structure

```
design-02-bazaar/
  index.jsx    — default export: the full site (ticker, nav, hero,
                 Stall Conveyor, seller stories, delivery strip, footer,
                 cart drawer)
  meta.js      — named export `meta` (contract shape)
  content.js   — named export `content` (all copy, JSON-compatible)
  styles.css   — all styling; tokens on `.tpl-design-02-bazaar` only
  assets/      — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
                 detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

## Replace images

Drop new files over `assets/` keeping the names, or use the lab's Upload
panel — the customization keys are `hero`, `product-0` (textiles),
`product-1` (brass), `product-2` (spices), `detail` (hands). Product cards
map: Handloom Throw + Block-Print Cushion → `product-0`; Brass Diya Set +
Lac Bangles Pair → `product-1`; Spice Gift Box + Terracotta Planter →
`product-2`.

The hero is a scroll-driven frame sequence: `assets/frames/frame-001.jpg`
… `frame-072.jpg` (640px-wide JPGs in playback order) scrub frame by
frame as the visitor scrolls, replacing the old autoplay loop. With
reduced motion the hero shows the first frame as a static image.

## Tokens

```css
.tpl-design-02-bazaar {
  --color-background: #FBF3E4;  /* warm paper */
  --color-primary: #221A12;     /* ink */
  --color-accent: #E8862E;      /* saffron */
  --color-secondary: #0F5E5B;   /* deep teal */
  --color-chili: #C63B22;
  --font-display: 'Archivo'; --font-body: 'Work Sans';
}
```

The Customize panel rewrites these live; fonts load from Google Fonts
(`display=swap`) once per page.

## content.js

Brand, nav, ticker lines, hero copy, categories, six products (names + INR
prices via `price()`), seller stories, delivery strip items, contact and
footer copy. Product names resolve through `productName(i, fallback)` so
the lab's rename panel works per product.

## Deploy

Standalone export: the folder is self-contained (imports only its own
files, `../../_shared`, `react`, `gsap`). `assets/frames/` ships with
72 JPG frames; the first frame paints immediately, so the hero never
renders a black hole.
