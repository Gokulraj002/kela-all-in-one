# ATELIER · Hotel Category — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then the coffee
`BUILDER_GUIDE.md` (same platform conventions). This guide lists what's
DIFFERENT for hotel.

## Your folder (exact)

```
src/templates/hotel/<design-id>/   (e.g. design-01-palace)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (contract shape)
  content.js   — `export const content = {...}` plain JSON-compatible
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg, hero-loop.mp4
  README.md
```

## Imports (exact — QA greps)

```jsx
import { useCustom, Img, LoopVideo, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.jpg';
import room1Img from './assets/room-1.jpg';
/* … room-2, room-3, detail … */
```
Hotel designs sit at the same depth as coffee's, so the import is
`../../_shared` — exactly like the coffee builders used. (Count from your
index.jsx: `..` → `hotel/`, `../..` → `templates/`.)

**Video:** dynamic import so the build never breaks before the clip exists:
```jsx
const [loopSrc, setLoopSrc] = useState(null);
useEffect(() => {
  let on = true;
  import('./assets/hero-loop.mp4').then((m) => { if (on) setLoopSrc(m.default); }).catch(() => {});
  return () => { on = false; };
}, []);
/* render: {loopSrc ? <LoopVideo src={loopSrc} poster={heroPoster} alt="…" className="…" /> : <Img … />} */
```
Generate the video with the media tool to `VIDEO_PLAN.md` BEFORE you finish.

## Image keys (must match the platform upload panel)

`hero`, `product-0`, `product-1`, `product-2`, `product-3`, `detail`.
Map rooms to product-N keys: room-1 → `product-0`, room-2 → `product-1`,
room-3 → `product-2`, spa/treatment or 4th visual → `product-3`, detail → `detail`.

`<Img k="hero" src={img('hero', heroImg)} eager alt="…" />` — alt always; eager only on hero.

## useCustom for hotel

- `brand` → hotel name; `productName(i, fallback)` → room/experience names
- `price(n)` → nightly rates (₹ default; numbers in content.js)
- `contact` → email/instagram; `img(key, fallback)` → uploads win
- Use ALL — never hardcode brand, rates, or image paths in JSX.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-palace">…</div>;
```
```css
.tpl-design-01-palace {
  --color-primary: #2A1A12; --color-accent: #C9A24B;
  --color-background: …; --color-surface: …; --color-text: …; --color-muted: …;
  --font-display: 'Cormorant Garamond', serif; --font-body: 'Jost', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

## Motion

`useLayoutEffect` + `gsap.context(..., rootRef)` + `return () => ctx.revert()`.
`scroller: scroller()` on EVERY ScrollTrigger. `useReducedMotion()` → static
final state. Your signature flow is in MOTION.md §3 — implement exactly it,
gated with `gsap.matchMedia('(min-width: 768px)')` where pinned.

## Booking widget (required)

Every design includes a realistic booking affordance: date inputs
(check-in/check-out), guests select, and a rate summary or "Check
availability" CTA. It need not charge — but it must feel real (live night
count, per-night math via `price()`).

## Structure

Nav, hero (`id="hero"`), 3–5 sections, footer. Tour stops: `data-tour` on 3+
sections; section ids from `hero story rooms dining experiences spa gallery
visit contact` (use what fits your design).

## content.js shape

```js
export const content = {
  brand: { name: 'The Rajwada Palace', tagline: 'A palace, not a hotel' },
  nav: [{ label: 'Suites', href: '#rooms' }, …],
  hero: { eyebrow: '…', title: '…', sub: '…', cta: 'Check availability', ctaHref: '#booking' },
  rooms: [{ name: '…', price: 45000, size: '850 sq ft', desc: '…', imgKey: 'product-0' }, …],
  sections: { story: { title: '…', body: ['…'] }, … },
  contact: { email: '…', phone: '…', address: '…' },
  footer: { line: '© 2026 …' },
};
```

## Self-QA before you report

- `npx oxlint` clean; no `:root`; no platform imports; `useCustom` everywhere
- `data-tour` on 3+ sections; all images alt; no emojis; no lorem ipsum
- 360 / 768 / 1440 responsive classes; reduced-motion static path
- meta.js exact shape; 5 unique JPGs + hero-loop.mp4 in assets/
- Spacing pass done (see ART_DIRECTION.md doctrine)
