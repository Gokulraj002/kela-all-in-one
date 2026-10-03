# Kela Estates — design-10-archviz

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Experimental archviz experience for ATELIER (Real Estate · 10/10).
3D-feel immersion: dark, graphic, kinetic type — the architecture is the art.

## Personality

Brutalist and daring. A full-screen overlay nav opens the piece; the hero is
a looping "concrete light study" film; projects ride a pinned **orbital
turntable** — a virtual ring of project cards that rotates with scroll
(scrub:1 inertia feel), the center card facing forward under a spotlight
while side cards fall away in perspective, with a live project index
readout. Then: a five-step process with a scroll-drawn progress line, a
manifesto-style studio section with a drifting giant outline word, and a
commission contact footer. Persimmon is spent sparingly — eyebrows, rules,
the marquee, the readout price.

Palette: concrete `#8E8C86` / black `#0C0C0C` / bone `#EDEAE2` /
persimmon `#F4562A`. Type: Archivo (expanded, kinetic headlines) + Space
Grotesk (body).

## Run

```bash
npm install
npm run dev      # the ATELIER viewer mounts this template in the lab
```

## Structure

```
design-10-archviz/
  index.jsx    — component (nav overlay, hero, orbit, process, studio, contact)
  meta.js      — lab metadata (id design-10-archviz, tag Experimental)
  content.js   — all editable copy, project data, ₹ prices as numbers
  styles.css   — tokens on .tpl-design-10-archviz only; all motion styles
  assets/      — hero.jpg, listing-1.jpg, listing-2.jpg, listing-3.jpg,
                 detail.jpg, frames/ (72 JPG keyframes for the scroll film)
  README.md
```

## Replacing images

Swap the files in `assets/` keeping the names, or use the lab's Upload
panel — the template reads images through `useCustom()` keys:

- `hero` → hero.jpg (customizer poster key)
- `product-0` → listing-1.jpg (Villa Meridian)
- `product-1` → listing-2.jpg (The Light Slot House)
- `product-2` → listing-3.jpg (Massing Study 07)
- `detail` → detail.jpg (process figure)

The hero film is a scroll-driven frame sequence: 72 JPGs in
`./assets/frames/` scrubbed by the shared `ScrollFrames` component
(pinned `+=170%`). Reduced motion falls back to the first frame, static.

## Tokens

```css
.tpl-design-10-archviz {
  --color-primary: #0c0c0c; --color-secondary: #8e8c86;
  --color-accent: #f4562a;  --color-background: #0c0c0c;
  --color-surface: #141412;  --color-text: #edeae2;
  --color-muted: #8e8c86;
  --font-display: 'Archivo', ...; --font-body: 'Space Grotesk', ...;
}
```

The customizer rewrites these live. Never add `:root` rules.

## content.js

Plain JSON-compatible object: brand, nav, hero, marquee words, projects
(name/location/area/price/status/desc), process steps, studio copy/stats/
principals, contact, footer. Prices are numbers in ₹ rendered via
`price()`; project names via `productName(i, fallback)`; contact via
`useCustom()` overrides.

## Motion notes

- All ScrollTriggers use `scroller()`; everything lives in `gsap.context`
  with `revert()` cleanup.
- The orbit pin is gated at ≥768px via `gsap.matchMedia`; below that (and
  for `prefers-reduced-motion`) a static horizontal snap carousel renders
  instead — all projects fully visible, no pins.
- `prefers-reduced-motion` also disables the marquee animation, the custom
  cursor, and all scrubbed sequences.

## Deploy

Exported as a standalone Vite template by the lab's exporter
(`tools/export-template.mjs`); the whole folder is self-contained per the
React Template Contract.
