# Kela Tech — design-10-webgl · "Experimental 3D"

A creative technology lab building impossible interfaces. Full-bleed
immersive layout with a scroll-driven CSS-3D camera dolly (no WebGL —
contract allows react+gsap only), overlay nav, lab notes, manifesto,
commission CTA.

## Personality

Daring, sensory, futuristic. Black `#060608` with restrained iridescent
violet→cyan accents (never gaudy) and white type. Unbounded for display,
Inter for body. One invert flash only (hero entrance).

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-10-webgl/
  index.jsx   — default export; overlay nav, hero (ScrollFrames scrub),
                3D dolly, lab notes, manifesto, CTA, footer
  meta.js     — `export const meta` (contract shape)
  content.js  — `export const content` (all editable copy, JSON-compatible)
  styles.css  — all styling; tokens on `.tpl-design-10-webgl` only
  assets/     — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                detail.jpg, frames/ (72 JPGs for the hero scrub)
  README.md
```

## The 3D dolly (signature mechanic)

A pinned section (desktop ≥ 768px, via `gsap.matchMedia`; static vertical
stack on mobile and under `prefers-reduced-motion`). Inside the pin, a
`perspective: 1200px` stage holds a camera wrapper with 5 layers at
`translateZ(0 / -300 / -600 / -900 / -1200px)` — one experiment per layer.
ScrollTrigger: pin, `scrub: 1`, `end: '+=400%'`. The camera wrapper's
translateZ animates 0 → +1100px: a dolly pushing forward through the layers.
Layers fade out as they pass the camera plane; a 5-tick depth indicator
tracks the nearest experiment.

## Hero: scroll-driven frames

The hero is a pinned frame-by-frame scrub (`ScrollFrames` from
`../../_shared`): `assets/frames/frame-001.jpg` … `frame-072.jpg` (72 frames,
640px) advance as the visitor scrolls (`pinDistance="+=170%"`). Under
`prefers-reduced-motion` the pin is off and the first frame shows as a
static image. `assets/hero.jpg` remains the customizable hero image key.

## Replace images

Swap the files in `assets/` keeping the names, or use the platform's Upload
panel — keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
To change the hero motion, replace the 72 frames in `assets/frames/`
(keep the `frame-001.jpg` … `frame-072.jpg` naming).

## Tokens

```css
.tpl-design-10-webgl {
  --color-primary: #060608; --color-accent: #8b5cf6;
  --color-accent-2: #22d3ee; --color-text: #ffffff;
  --font-display: 'Unbounded', sans-serif; --font-body: 'Inter', sans-serif;
}
```

The customizer rewrites these live. Brand default is `Kela Tech`
(`useCustom()` override wins); contact email resolves the same way.

## content.js

`brand`, `nav`, `hero`, `dolly`, `experiments[5]` (index/name/medium/year/
imgKey/desc), `notes.entries[3]`, `manifesto`, `cta`, `contact`, `footer`.

## Deploy

The folder is a standalone template: the platform's exporter copies it whole
(`export-template.mjs`) into a Vite app. No imports outside the folder
except `../../_shared`, `react`, `gsap`, `gsap/ScrollTrigger`.
