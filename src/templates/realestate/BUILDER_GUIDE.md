# ATELIER · Real Estate — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then the
category files in this folder: REALESTATE_BRIEF.md, ART_DIRECTION.md,
MOTION.md, VIDEO_PLAN.md. Coffee's design-01
(`src/templates/coffee/design-01-artisan/`) is the structural reference.

## Your folder (exact)

```
src/templates/realestate/<design-id>/   (e.g. design-01-villas)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (contract shape)
  content.js   — `export const content = {...}` plain JSON-compatible
  styles.css   — tokens on `.tpl-<design-id>` ONLY, never :root
  assets/      — hero.jpg, listing-1.jpg, listing-2.jpg, listing-3.jpg,
                 detail.jpg, hero-loop.mp4
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
import listing1Img from './assets/listing-1.jpg';
import listing2Img from './assets/listing-2.jpg';
import listing3Img from './assets/listing-3.jpg';
import detailImg from './assets/detail.jpg';
import heroLoop from './assets/hero-loop.mp4';
```

`useCustom()` returns: `brand`, `colors {primary, accent}`, `fonts`,
`currency` ('₹' default), `contact {email, instagram}`, `img(key, fallback)`,
`productName(i, fallback)`, `price(n)`. Use ALL — never hardcode brand,
prices, or image paths in JSX. Prices are numbers in ₹.

`<Img k="hero" src={heroImg} alt="…" eager />` — standard keys:
`hero`, `product-0`, `product-1`, `product-2`, `product-3`, `detail`.
Always pass `alt`. `eager` only on the hero.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-villas">…</div>;
```

```css
.tpl-design-01-villas {
  --color-primary: …; --color-secondary: …; --color-accent: …;
  --color-background: …; --color-surface: …;
  --color-text: …; --color-muted: …;
  --font-display: '…', serif; --font-body: '…', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

## Fonts

In a `useEffect` (runs once), inject your Google Fonts `<link>` with unique
id `tpl-font-<design-id>`, `display=swap`. Do NOT remove on unmount.

## Motion

GSAP + ScrollTrigger, timeline-based, `gsap.context(...)` + `revert()`.
`scroller: scroller()` on EVERY ScrollTrigger (platform scrolls inside
`.tpl-scope`, not window). `gsap.matchMedia` for ≥768px pin gating.
Reduced motion → static fully-visible layouts. See MOTION.md for your
assigned scroll mechanic — implement it fully, not as decoration.

## Signature video

Per VIDEO_PLAN.md: use `<LoopVideo src={heroLoop} poster={heroImg}
alt="…" className="…"/>`. Placement per the plan (hero bg, interlude, or
section film).

## Media

Generate with the media tool: 5 JPGs (photorealistic, art-directed to your
palette, no text/watermarks/faces) + 1 mp4 (~10s, 1280×720, H.264,
seamless-loop feel) storyboarded per VIDEO_PLAN.md. If anything looks cheap
or off-palette → regenerate. Never reuse another design's images.

## Spacing pass (before you report done)

Creative-director whitespace review: section padding generous
(`clamp(96px, 12vw, 180px)` scale), no cramped rows, no text touching
edges, consistent vertical rhythm, air around every card and headline.
Fix what you find.

## Self-QA before you report

- `npx oxlint` clean on your folder (or node --check your js files)
- no `:root`, no platform imports, `useCustom` for brand/prices/images/contact
- `data-tour` on 3+ sections, all images have alt, no emojis, no lorem ipsum
- responsive: 360 / 768 / 1440 class behavior in CSS
- reduced-motion path renders sensibly (content visible, no pins)
- `meta.js` matches contract shape exactly
- assets/ contains all 6 files; video plays (ffprobe duration ~10s)
