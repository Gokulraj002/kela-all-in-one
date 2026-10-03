# Kela Tech — design-07-robotics

**Industrial precision.** A website for Kela Tech, a fictional manufacturer of
precision robotic arms for modern factories. The signature moment is a
scroll-scrubbed **exploded view** of the Kela Tech K7 arm: the product image
pins, five part callouts (Base, Shoulder joint, Elbow actuator, Wrist,
Gripper) translate outward along their own vectors while leader lines draw,
then everything reassembles as you keep scrolling.

- Palette: graphite `#1A1D21` · safety orange `#FF5C00` · steel `#C7CDD4` ·
  blueprint `#12395B` (engineering section)
- Typography: Barlow Condensed (display, uppercase, technical) + Barlow (body),
  loaded via Google Fonts with link id `tpl-font-design-07-robotics`
- Motion: mechanical `power2.inOut` eases, leader-line draws, spec callouts
  tick in with stagger; count-up metrics

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-07-robotics/
  index.jsx   — default export; nav, hero, exploded view, engineering,
                use cases, metrics, contact, footer
  meta.js     — named export `meta` (contract shape)
  content.js  — all editable copy/specs (JSON-compatible)
  styles.css  — all styling; tokens scoped to `.tpl-design-07-robotics`
  assets/     — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                detail.jpg, frames/ (72 scroll-sequence JPGs)
  README.md
```

## Scroll mechanic — exploded view

`useLayoutEffect` builds a scrubbed, pinned GSAP timeline
(`trigger: .ke-xv-pin`, `pin: true`, `scrub: 1`, `end: '+=250%'`,
`scroller()` on the ScrollTrigger). Phase 1 (progress 0 → 0.5): each
callout label translates outward along its own vector, its leader line draws
(`scaleX` 0 → 1), and the product image scales 1 → 1.06. Phase 2
(0.5 → 1): everything reverses — reassembly.

- Desktop only: the pin is gated behind a 768px media query (React
  `matchMedia` listener + `staticXv` flag; the GSAP context reverts on
  resize across the breakpoint).
- Reduced-motion or < 768px: all five callouts render statically around the
  image with leader lines drawn (`.ke-xv.is-static` CSS).

## How to replace images

Swap the files in `assets/` keeping the names, or use the lab's Upload
panel — upload keys: `hero`, `product-0` (exploded-view product image),
`product-1`, `product-2`, `product-3` (use-case cards), `detail`
(engineering gripper macro). The hero motion is a scroll-driven frame
sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`, scrubbed via the
shared `ScrollFrames` component, pinned `+=170%`); frame-001 doubles as the
reduced-motion/poster frame.

## Tokens

On `.tpl-design-07-robotics`: `--color-primary`, `--color-accent`,
`--color-steel`, `--color-blueprint`, `--color-background`,
`--color-surface`, `--color-text`, `--color-muted`, `--color-line`,
`--font-display`, `--font-body`. The customizer rewrites these live; every
color/font in the stylesheet resolves through them.

## content.js

Brand, nav, hero copy + key specs, the five exploded-view callouts (anchor
`ax`/`ay` as % of the stage plus desktop `vec` and mobile `vecM` explosion
vectors in px), engineering points + spec sheet, metrics, use cases, contact,
footer. Real robotics copy throughout — no lorem ipsum.

## Deploy

Standalone export via `tools/export-template.mjs` (Vite build of this
folder; `_shared` is copied in). The 72 hero frames are bundled with an
eager `import.meta.glob`, so the build stays green and the first frame
paints immediately as the poster.
