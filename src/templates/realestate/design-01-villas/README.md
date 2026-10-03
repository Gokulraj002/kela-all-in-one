# Kela Estates — design-01-villas

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Luxury villas developer experience for ATELIER. Cinematic, exclusive,
private: a full-bleed dusk film hero, whispered typography, and an
invitation-only viewing CTA. Museum spacing; one residence per viewport.

## Personality

Deep teal dusk, champagne light, warm ivory paper. Cormorant Garamond
display type at huge sizes; Manrope for everything whispered. The signature
moment is a **pinned drone-descent journey**: scroll pins a full-bleed
viewport and descends 300m → 120m → 12m across three crossfading frames
(scale 1.15 → 1), an altitude indicator tracking progress while a residence
card fades/slides in beside the frame at each stop.

## Run

```bash
npm install
npm run dev
```

The template is self-contained at `src/templates/realestate/design-01-villas/`
and follows the ATELIER React Template Contract.

## Structure

```
design-01-villas/
  index.jsx   — the site (nav, hero, descent, philosophy, location, enquiry)
  meta.js     — `export const meta` (contract shape)
  content.js  — all copy/data (JSON-compatible, no functions)
  styles.css  — all styling; tokens on .tpl-design-01-villas only
  assets/     — hero.jpg, listing-1/2/3.jpg, detail.jpg, hero-loop.mp4
```

## Replacing images

Drop new files over `assets/` keeping the names (or upload via the lab's
Customize panel — `Img` keys are `hero`, `product-0…product-2`, `detail`).
`hero-loop.mp4` is the hero film; its poster is always `hero.jpg`, which
remains the fallback if the clip is missing.

## Tokens

```css
.tpl-design-01-villas {
  --color-primary: #0E2A30;   /* deep teal */
  --color-night: #081B20;     /* darker teal, dark sections */
  --color-accent: #C9A961;    /* champagne */
  --color-background: #F4EFE6;/* warm ivory */
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Manrope', sans-serif;
}
```

Every color/font in `styles.css` comes from these vars. The customizer
rewrites them live. Never touch `:root`.

## content.js

Brand, nav, hero copy, the three descent stops (altitudes + alt text), the
three residences (names, ₹ prices as numbers, beds/baths/area/plot,
blurbs), philosophy principles, Alibaug distances, contact details, footer.
Prices render through `price()`; residence names through `productName()` —
both customizable in the lab.

## Motion

GSAP + ScrollTrigger, `gsap.context` + `revert()`, `scroller()` on every
trigger. The descent pin is gated to ≥768px via `gsap.matchMedia`.
Reduced-motion and mobile render the same stops as static stacked sections
— all content visible, no pins. Sections carry `data-tour` stops for
presentation mode: Arrival, Residences, Philosophy, Alibaug, Private Viewings.

## Deploy

Exported via the lab's standalone exporter (`tools/export-template.mjs`);
the folder builds as a standalone Vite app.
