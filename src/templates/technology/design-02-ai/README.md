# Kela Tech — design-02-ai (AI Platform)

Dark, cinematic AI-startup site for the ATELIER experience library.
Mood: mysterious, intelligent, cinematic. Motion: slow reveals, a 0.5s
black hold on hero entrance, and a scrub-linked neural pulse network.
No bouncy easing anywhere.

## Run

```bash
npm install
npm run dev
```

The template also builds standalone via the platform exporter
(`tools/export-template.mjs`).

## Structure

```
design-02-ai/
  index.jsx   — default export; nav, hero, neural pulse, models,
                metrics, research, CTA, footer
  meta.js     — named export `meta` (contract shape)
  content.js  — all editable copy/data (plain object)
  styles.css  — all styling; tokens on `.tpl-design-02-ai` only
  assets/     — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                detail.jpg, frames/ (72 JPG hero frames)
  README.md
```

## Signature motion — Neural Pulse

`#capabilities` pins on desktop (≥768px, via `gsap.matchMedia`) with
`end: '+=300%'` and `scrub: 1`. An SVG network (viewBox 800×600, 8 nodes)
carries a pulse dot that travels node→node as scroll progress advances.
Each reached node gets `.is-lit`, its route edge gets `.is-live`, and the
matching capability card (Reasoning / Vision / Agents / Fine-tuning)
activates with a highlight + lift. Below 768px and under
`prefers-reduced-motion` the section renders static: all nodes lit, all
cards visible in a grid.

## Replacing images

Swap the files in `assets/` (keep the names), or use the lab's Upload
panel — the upload keys are `hero`, `product-0`, `product-1`,
`product-2`, `detail`. The hero motion is a scroll-driven frame sequence
(`assets/frames/frame-001.jpg` … `frame-072.jpg`, 640px, pinned scrub via
ScrollFrames); the poster `hero.jpg` is kept as the static/reduced-motion
frame-0 asset.

## Tokens

```css
.tpl-design-02-ai {
  --color-primary: #050508; --color-accent: #8b5cf6; --color-cyan: #22d3ee;
  --color-background / --color-surface / --color-text / --color-muted;
  --font-display: 'Space Grotesk'; --font-body: 'Inter';
}
```

Fonts load via a Google Fonts `<link id="tpl-font-design-02-ai">`
injected once at runtime.

## content.js

Brand, nav, hero, pulse section copy, 4 capabilities, 3 models
(context window + per-1M-token input/output pricing, rendered through
`useCustom()`'s `price()`), 4 metrics, 3 research papers, CTA
(incl. code sample), contact, footer.

## Deploy

Exported as a standalone Vite app by the platform; `npm run build`
must stay clean. Motion respects `prefers-reduced-motion` (static,
fully visible layouts) and every ScrollTrigger uses the platform
`scroller()`.
