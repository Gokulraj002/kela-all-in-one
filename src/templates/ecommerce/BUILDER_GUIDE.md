# ATELIER · E-commerce Category — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then
`ECOMMERCE_BRIEF.md`, `ART_DIRECTION.md`, `MOTION.md`, `VIDEO_PLAN.md`.
This guide gives the exact integration conventions — follow them so all
10 designs behave identically in the platform.

## Your folder (exact)

```
src/templates/ecommerce/<design-id>/   (e.g. design-01-flagship)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (contract shape)
  content.js   — `export const content = {...}` plain JSON-compatible object
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, product-1.jpg, product-2.jpg, product-3.jpg,
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
import product1Img from './assets/product-1.jpg';
import product2Img from './assets/product-2.jpg';
import product3Img from './assets/product-3.jpg';
import detailImg from './assets/detail.jpg';
import heroLoop from './assets/hero-loop.mp4';
```

`useCustom()` returns: `brand`, `colors {primary, accent}`, `fonts`,
`currency`, `contact {email, instagram}`, `img(key, fallback)`,
`productName(i, fallback)`, `price(n)`. Use ALL — never hardcode brand,
prices, or image paths in JSX.

`<Img k="hero" src={heroImg} alt="…" eager />` — `k` is the upload key.
Standard keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
Map: hero→hero.jpg, product-0→product-1.jpg, product-1→product-2.jpg,
product-2→product-3.jpg, detail→detail.jpg. Always pass `alt`; `eager`
only on the hero.

`<LoopVideo src={heroLoop} poster={heroImg} alt="…" className="…" />`
for the signature video placement in VIDEO_PLAN.md.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-flagship">…</div>;
```

```css
.tpl-design-01-flagship {
  --color-primary: …; --color-secondary: …; --color-accent: …;
  --color-background: …; --color-surface: …;
  --color-text: …; --color-muted: …;
  --font-display: '…', serif; --font-body: '…', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

## Fonts

In a `useEffect` (runs once), inject your Google Fonts `<link>` with a
unique id (`tpl-font-<design-id>`), `display=swap`. Do NOT remove on
unmount.

## Motion

GSAP + ScrollTrigger, timeline-based, in `useLayoutEffect` with
`gsap.context` + `revert()` cleanup. `scroller: scroller()` on EVERY
ScrollTrigger — the platform scrolls inside `.tpl-scope`, not window.
`useReducedMotion()` → static fully-visible layouts (CSS fallback class).
Your design's scroll product flow is assigned in MOTION.md — implement it
exactly, with the mobile fallback described there. Server-safe headline
reveals (word-mask spans rendered in JSX, animated by GSAP).

## Structure

Nav (with cart affordance), hero (`id="hero"`), product lineup, 2–4
further sections (story/craft/reviews/shipping/guarantee), footer. Mark
tour stops: `<section id="products" data-tour="The Lineup">` etc.
Section ids from: `hero story products gallery craft visit contact`
(use what fits; `products` is expected on every design).

## Demo cart (required)

An "Add" button on products must do something visible: cart count in the
nav + a drawer/panel listing added items with `price()` totals. Demo
only — label checkout as demo. Keep it in-component (useState), styled
to the design.

## content.js (shape)

```js
export const content = {
  brand: { name: '…', tagline: '…' },
  nav: ['Shop', 'Story', 'Reviews', 'Contact'],
  hero: { eyebrow: '…', title: '…', sub: '…', cta: '…', ctaSecondary: '…' },
  products: [ { name: '…', price: 12900, desc: '…', badge: '…' }, … ], // ≥4
  sections: { story: { title: '…', body: '…' }, … },
  contact: { email: '…', phone: '…', address: '…', hours: '…' },
  footer: { line: '© 2026 …' },
};
```

Prices in ₹ (numbers). No lorem ipsum. No emojis. Real-feeling copy.

## Images & video

5 JPGs per design, photorealistic, generated with the media tool to your
design's art direction (ART_DIRECTION.md). Unique per design — never
reused. hero-loop.mp4 (~10s, H.264, 1280×720, 24fps) storyboarded in
VIDEO_PLAN.md, generated to plan. If any asset looks cheap, plasticky,
off-palette → regenerate.

## Self-QA before you report

- `npx oxlint` clean on your folder
- no `:root`, no platform imports, `useCustom` for brand/prices/images/contact
- `data-tour` on 3+ sections, all images alt, no emojis
- responsive 360 / 768 / 1440 class behavior in CSS
- reduced-motion path renders everything statically
- `meta.js` matches contract shape exactly
- spacing pass: generous, intentional whitespace; nothing cramped
