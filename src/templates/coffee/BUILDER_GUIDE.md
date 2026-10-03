# ATELIER · Coffee Category — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first. This guide adds
the coffee-category conventions every builder MUST follow so all 10 designs
integrate identically with the platform.

## Your folder (exact)

```
src/templates/coffee/<design-id>/   (e.g. design-01-artisan)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (shape in contract)
  content.js   — `export const content = {...}` plain JSON-compatible object
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
  README.md
```

## Imports allowed (exact — QA greps)

```jsx
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import content from './content.js';           // or: import { content } from './content.js'
import heroImg from './assets/hero.jpg';      // vite asset imports
```

`useCustom()` returns: `brand` (override or null → use content default),
`colors {primary, accent}`, `fonts`, `currency` ('₹' default), `contact {email, instagram}`,
`img(key, fallback)` (custom upload dataURL wins), `productName(i, fallback)`,
`price(n)` (formats with currency). Use ALL of these — never hardcode brand,
prices, or image paths in JSX.

`<Img k="hero" src={heroImg} alt="…" eager />` — `k` is the upload key.
Standard keys (must match the platform upload panel): `hero`, `product-0`,
`product-1`, `product-2`, `product-3`, `detail`.
Always pass `alt`. `eager` only on the hero.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-artisan">…</div>;
```

```css
.tpl-design-01-artisan {
  --color-primary: #2B2118; --color-secondary: #…; --color-accent: #…;
  --color-background: #…; --color-surface: #…;
  --color-text: #…; --color-muted: #…;
  --font-display: 'Fraunces', serif; --font-body: 'Manrope', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

## Fonts (each template loads its own)

In a `useEffect` (runs once), inject your Google Fonts `<link>` with a unique
id (`tpl-font-<design-id>`), `display=swap`. Do NOT remove on unmount.

## Motion (GSAP + ScrollTrigger, timeline-based)

```jsx
gsap.registerPlugin(ScrollTrigger);
const { rootRef, scroller } = useTplScope();
const reduced = useReducedMotion();
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    if (reduced) return; // simple CSS fades only (add .rv CSS fallback)
    gsap.utils.toArray('.rv').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
      });
    });
    // …your design's signature motion, timeline-based…
  }, rootRef);
  return () => ctx.revert();
}, [reduced, scroller]);
```

CRITICAL: the platform scrolls inside `.tpl-scope`, NOT window — always pass
`scroller: scroller()` on every ScrollTrigger. Never animate on raw scroll
events; use ScrollTrigger or rAF.

## Structure

Nav, hero (`id="hero"`), 3–5 sections, footer. Mark tour stops:
`<section id="story" data-tour="Our Story">`. Section ids from:
`hero story menu products gallery craft visit contact` (use what fits).

## content.js (example shape)

```js
export const content = {
  brand: { name: 'Ember & Oak', tagline: 'Wood-fired coffee house' },
  nav: ['Story', 'Menu', 'Craft', 'Visit'],
  hero: { eyebrow: 'Est. 2016 — Fort, Mumbai', title: '…', sub: '…', cta: '…' },
  menu: [ { name: '…', price: 320, desc: '…' }, … ],   // numbers; render via price()
  sections: { story: { title: '…', body: '…' }, … },
  contact: { email: '…', phone: '…', address: '…', hours: '…' },
  footer: { line: '© 2026 …' },
};
```

Prices in ₹ (numbers). No lorem ipsum. No emojis. Real-feeling copy.

## Images

5 per design, photorealistic, generated with the media tool. Coffee direction:
beans, espresso extraction, pouring, barista hands, café interiors, roastery
drums — matched to YOUR design's palette/mood. Unique per design, never
reused. If one looks cheap or plasticky, regenerate it. Reference via vite
imports + `<Img>` (never raw `<img>`).

## Self-QA before you report

- `npx oxlint` clean on your folder
- no `:root`, no platform imports, `useCustom` used for brand/prices/images/contact
- `data-tour` on 3+ sections, all images have alt, no emojis
- responsive: check 360 / 768 / 1440 class behavior in your CSS
- reduced-motion path renders sensibly
- `meta.js` matches contract shape exactly (id, num, name, tag, style,
  animation, typography, layout, mood, palette, features[], fonts{}, colors{})
