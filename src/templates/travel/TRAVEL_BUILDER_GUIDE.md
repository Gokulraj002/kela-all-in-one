# ATELIER · Travel & Tourism — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then your
design brief (supplied by the coordinator). This guide is the travel
adaptation of the coffee builder conventions. Study one finished coffee
design before you start: `~/workspace/atelier/src/templates/coffee/design-01-artisan/`.

## Your folder (exact)

```
src/templates/travel/<design-id>/   (e.g. design-01-luxury)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (contract shape)
  content.js   — `export const content = {...}` plain JSON-compatible object
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, dest-1.jpg, dest-2.jpg, dest-3.jpg, detail.jpg, hero-loop.mp4
  README.md
```

## Imports allowed (exact — QA greps)

```jsx
import { useCustom, Img, LoopVideo, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.jpg';
import dest1Img from './assets/dest-1.jpg';
/* … etc. Videos: dynamic import (see below), NEVER a static import. */
```

## Media (you generate all of it)

Load the `media` tool namespace first (`tool_search.load_tool_namespace`
with `paths: ["media"]`), then read its schemas. Generate:

- **5 JPGs** (photorealistic, no text, no watermarks, no visible faces —
  silhouettes at distance OK): `hero.jpg` + `dest-1/2/3.jpg` + `detail.jpg`.
  Art-direct every image to YOUR design's palette and mood. No repeats
  across designs. If one looks cheap, plasticky, off-palette, or has
  garbled detail → regenerate. Save into `assets/`.
- **1 MP4** `assets/hero-loop.mp4` (~10s, 1280×720, H.264, 24fps,
  seamless-loop feel) generated TO YOUR STORYBOARD in
  `src/templates/travel/VIDEO_PLAN.md`. Frame-verify it (extract a frame
  and look at it) before you ship.

## The shared primitives (use them — do not reinvent)

- `useCustom()` → `{ brand, colors, fonts, currency, contact, img, productName, price }`.
  `img(key, fallback)` — custom upload dataURL wins. `productName(i, fallback)`,
  `price(n)` formats with currency. Use for brand, images, prices, contact.
  In travel, "products" are destinations/itineraries — still use
  `productName`/`price` so the customizer works.
- `<Img k="hero" src={heroImg} alt="…" eager />` — `k` is the upload key.
  Standard keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
  Map: hero→hero.jpg, product-0→dest-1.jpg, product-1→dest-2.jpg,
  product-2→dest-3.jpg, detail→detail.jpg. Always pass `alt`. `eager` only on hero.
- `<LoopVideo src={loopSrc} poster={heroPoster} alt="…" className="…" />` —
  muted/autoplay/loop/playsinline, metadata preload, poster fallback,
  offscreen pause, reduced-motion → poster only. Wire the mp4 dynamically:
  ```jsx
  const [loopSrc, setLoopSrc] = useState(null);
  useEffect(() => {
    let on = true;
    import('./assets/hero-loop.mp4').then((m) => { if (on) setLoopSrc(m.default); }).catch(() => {});
    return () => { on = false; };
  }, []);
  ```
- `useTplScope()` → `{ rootRef, scroller }` — the platform scrolls inside
  `.tpl-scope`, NOT window: **every** ScrollTrigger gets `scroller: scroller()`.
- `useReducedMotion()` — when true, render simple fades/static layouts only.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-luxury">…</div>;
```

```css
.tpl-design-01-luxury {
  --color-primary: …; --color-secondary: …; --color-accent: …;
  --color-background: …; --color-surface: …;
  --color-text: …; --color-muted: …;
  --font-display: '…', serif; --font-body: '…', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

## Fonts

In a `useEffect` (runs once), inject your Google Fonts `<link>` with a unique
id (`tpl-font-<design-id>`), `display=swap`. Do NOT remove on unmount.

## Motion

GSAP + ScrollTrigger, timeline-based, in `useLayoutEffect` with
`gsap.context(...)` + `revert()` cleanup. `scroller()` on every trigger.
`gsap.matchMedia()` for ≥768px pin gating (resize-safe). Never animate on
raw scroll events. Reduced-motion → static fully-visible layouts.

Your design brief names your ONE signature scroll mechanic — implement it
faithfully and make it the centerpiece of the destinations/itineraries
section. Everything else: tasteful reveals (masked word-rise headlines,
clip-wipe frames, hairline rule draws) in your design's own motion language.

## Structure

Nav, hero (`id="hero"`), 3–5 sections, footer. Mark tour stops:
`<section id="destinations" data-tour="Destinations">`. Section ids from:
`hero story destinations gallery craft visit contact` (use what fits).

## content.js

Brand, nav, hero, destinations/itineraries (name, price number in ₹, blurb,
duration, tag), sections, testimonials, contact, footer. Real-feeling copy.
No lorem ipsum. No emojis.

## meta.js (exact shape)

```js
export const meta = {
  id: 'design-01-luxury', num: '01', name: 'Meridian & Grey', tag: 'Luxury',
  style: '…', animation: '…', typography: 'Cormorant Garamond + Jost',
  layout: '…', mood: '…', palette: '…',
  features: ['Private charters'],
  fonts: { display: 'Cormorant Garamond', body: 'Jost' },
  colors: { primary: '#101820', accent: '#C9A961' },
};
```

## Spacing pass (before you report)

Creative-director whitespace review: generous `clamp()` section padding,
no cramped rows, no dead gaps, clear hierarchy. Fix anything tight or
gappy by reading your own CSS with fresh eyes.

## Self-QA before you report

- All 6 files + 6 assets exist; video frame-verified; images on-palette
- `npx oxlint` clean on your folder
- no `:root`, no platform imports (only react/gsap/local/`../../_shared`)
- `useCustom` used for brand/images/prices/contact; `scroller()` on every ScrollTrigger
- `data-tour` on 3+ sections; all images have alt; no emojis; no lorem
- responsive 360/768/1440 reasoned in CSS; reduced-motion path sensible
- `npm run build` passes for the whole atelier app (run it once at the end)
