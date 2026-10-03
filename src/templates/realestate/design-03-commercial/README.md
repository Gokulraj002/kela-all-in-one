# Kela Estates — design-03-commercial

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

**Commercial spaces · Confident B2B.** Spec-sheet honesty: floor plates, ceiling
heights, parking ratios. Institutional, precise. CTAs: "Download spec sheet"
and "Book a walkthrough".

## Personality

Navy `#1B2A4A` / graphite `#2B2F36` / paper `#F5F3EE` / brass `#A9884B`.
IBM Plex Serif for display, IBM Plex Sans for body, IBM Plex Mono for every
number on the page — tabular numerals are the design language. The scroll
mechanic is a **blueprint draw-on**: a pinned floor-plan SVG draws its walls
via scrubbed `stroke-dashoffset`, and each completed room fades in its spec
card (area, ceiling height, capacity) at the room's position. It ends on the
full plan plus a spec summary bar.

Sections: sticky B2B nav (spec-sheet CTA) → hero (atrium film) → floor plates
(pinned blueprint) → available spaces (3 cards, ₹/sq ft/month via `price()`)
→ spec sheet (mono data table) → connectivity ledger (Hebbal / ORR) →
contact footer (walkthrough booking).

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # open the ATELIER viewer, pick Real Estate → Kela Estates (design-03-commercial)
```

## Structure

```
design-03-commercial/
  index.jsx      — default export React component
  meta.js        — named export `meta` (contract shape)
  content.js     — all copy/data (brand, rooms, listings, spec rows, contact)
  styles.css     — tokens on .tpl-design-03-commercial ONLY, never :root
  assets/        — hero.jpg, listing-1.jpg, listing-2.jpg, listing-3.jpg,
                   detail.jpg, frames/frame-001.jpg … frame-072.jpg
  README.md
```

## Replacing images

Drop new files into `assets/` keeping the same names, or use the lab's Upload
panel — keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`
(resolved through `useCustom().img`, custom uploads win automatically).
The hero motion is a scroll-driven frame sequence: `assets/frames/frame-001.jpg`
… `frame-072.jpg`, scrubbed by scroll through `ScrollFrames` (see
`src/templates/_shared/ScrollFrames.jsx`). `hero.jpg` remains as a static
poster/fallback asset.

## Tokens

```css
.tpl-design-03-commercial {
  --color-primary: #1B2A4A;   --color-accent: #A9884B;
  --color-background: #F5F3EE; --color-text: #2B2F36;
  --font-display: 'IBM Plex Serif'; --font-body: 'IBM Plex Sans';
  /* --font-mono: 'IBM Plex Mono' — all spec data */
}
```

The platform customizer rewrites these live; every color/font in the CSS
comes from `var()`.

## content.js

Plain object: `brand`, `nav`, `hero` (stats), `plates.rooms[]` (each room
carries SVG `x/y/w/h` plus a `card: {left, top}` overlay position),
`plates.summary[]`, `spaces.items[]` (`rate` = number, ₹/sq ft/month),
`specs.rows[]`, `location.points[]`, `contact`, `footer`. No functions.

## Motion notes

- GSAP + ScrollTrigger, `gsap.context` + `revert()`, `scroller()` on every
  trigger.
- Blueprint pin is gated at ≥768px via `gsap.matchMedia`; below that (and
  with `prefers-reduced-motion`) the section renders `is-static`: complete
  plan, all eight spec cards visible as a grid, no pin.

## Deploy

The design is self-contained: it imports only its own folder,
`../../_shared`, `react`, `gsap` and `gsap/ScrollTrigger`. The ATELIER
exporter (`tools/export-template.mjs`) zips it into a standalone Vite app.
