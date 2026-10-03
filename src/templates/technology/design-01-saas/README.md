# Kela Tech — design-01-saas · Enterprise SaaS

Confident enterprise clarity. A calm, trustworthy marketing site for a
fictional revenue platform, led by a CSS-built dashboard and a
scroll-scrubbed hotspot tour.

## Run

```bash
npm install
npm run dev        # standalone dev via the ATELIER viewer
npm run build      # production build
```

## Structure

```
design-01-saas/
  index.jsx     — default export; nav, hero, dashboard preview, logo strip,
                  hotspot tour, metrics, testimonial, pricing, CTA, footer
  meta.js       — template metadata (id, palette, fonts, features)
  content.js    — all editable copy (brand, nav, tour steps, tiers, footer)
  styles.css    — all styling; tokens scoped to .tpl-design-01-saas
  assets/       — hero.jpg, feature-1..3.jpg, detail.jpg, frames/ (72 JPGs)
  README.md
```

## Signature motion — hotspot tour

A pinned section (desktop ≥768px via `gsap.matchMedia`, resize-safe).
Scroll progress drives the active step: `min(3, floor(progress * 4))`.
The active hotspot dot on the dashboard pulses (CSS ring); the others dim;
the callout card beside the dashboard crossfades to that step's
title / body / checklist. Pin: `start: 'top 84px'`, `end: '+=250%'`,
`scrub: 1`, `scroller()` on the trigger. Hotspots are buttons — clicking one
smooth-scrolls the tour to that step. Mobile, small windows, and
`prefers-reduced-motion` get a static fallback: dashboard plus all four
callouts listed below it (no pin, fully visible).

## Replacing images

Swap files in `assets/` (same names) or use the lab's Upload panel —
`Img` keys are `product-0`, `product-1`, `product-2`, `detail`.
The hero is a scroll-driven frame sequence: 72 JPGs in `assets/frames/`
(`frame-001.jpg`…`frame-072.jpg`, from the old 10s H.264 loop) play
frame-by-frame as the visitor scrolls via the shared `<ScrollFrames>`
(pinned scrub `+=170%`, first frame as poster-like paint, static first
frame under reduced-motion). `assets/hero.jpg` remains the public
thumbnail (`public/templates/technology/design-01-saas/thumb.jpg`).

## Tokens

All design tokens live on `.tpl-design-01-saas` — never `:root` — so the
lab customizer can rewrite them live:

- `--nb-paper #FAFAF8` · `--nb-ink #101828` · `--nb-accent #4F46E5`
- slate scale `--nb-slate-100…900`
- `--nb-font-display 'Sora'` · `--nb-font-body 'Inter'`
  (injected as `tpl-font-design-01-saas`, `display=swap`)

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero`, `logos`,
`tour.steps[]` (title, body, points, dot position), `metrics.items[]`
(count-up targets), `testimonial`, `pricing.tiers[]` (monthly/annual prices),
`cta`, `contact`, `footer`. Brand, email, phone, prices, and images all flow
through `useCustom()` — never hardcoded in JSX.

## Deploy

The standalone export (`tools/export-template.mjs`) copies this folder with
`../../_shared`; the build is a static Vite bundle — host `dist/` anywhere.
