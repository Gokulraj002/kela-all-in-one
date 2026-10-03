# ATELIER · Restaurant — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then
`RESTAURANT_BRIEF.md`, `ART_DIRECTION.md` (your design's palette/type/imagery),
`MOTION.md` (your design's signature scroll mechanic + motion personality),
`VIDEO_PLAN.md` (your clip's storyboard). This guide adds the restaurant
conventions every builder MUST follow so all 10 designs integrate identically.

## Your folder (exact)

```
src/templates/restaurant/<design-id>/   (e.g. design-01-finedining)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (shape in contract)
  content.js   — `export const content = {...}` plain JSON-compatible object
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, dish-1.jpg, dish-2.jpg, dish-3.jpg, detail.jpg,
                 hero-loop.mp4
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
```

`useCustom()` returns: `brand`, `colors {primary, accent}`, `fonts`,
`currency` ('₹' default), `contact {email, instagram}`, `img(key, fallback)`,
`productName(i, fallback)`, `price(n)`. Use ALL of these — never hardcode
brand, prices, or image paths in JSX.

`<Img k="hero" src={heroImg} alt="…" eager />` — `k` is the upload key.
Standard keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
Always pass `alt`. `eager` only on the hero.

Video: load via dynamic import so the build never breaks if the clip is
missing; render `<Img>` poster until it resolves:

```jsx
const [loopSrc, setLoopSrc] = useState(null);
useEffect(() => {
  let on = true;
  import('./assets/hero-loop.mp4').then((m) => { if (on) setLoopSrc(m.default); }).catch(() => {});
  return () => { on = false; };
}, []);
{loopSrc
  ? <LoopVideo src={loopSrc} poster={img('hero', heroImg)} alt="…" className="…" />
  : <Img k="hero" src={img('hero', heroImg)} eager alt="…" className="…" />}
```

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-finedining">…</div>;
```

```css
.tpl-design-01-finedining {
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

## Motion (GSAP + ScrollTrigger, timeline-based)

```jsx
gsap.registerPlugin(ScrollTrigger);
const { rootRef, scroller } = useTplScope();
const reduced = useReducedMotion();
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    if (reduced) return; // static final state; CSS handles visibility
    const sc = scroller();
    gsap.utils.toArray('.rv').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
      });
    });
    // …your signature scroll mechanic from MOTION.md…
  }, rootRef);
  return () => ctx.revert();
}, [reduced, scroller]);
```

CRITICAL: the platform scrolls inside `.tpl-scope`, NOT window — always
`scroller: scroller()` on every ScrollTrigger. Pins gated to desktop via
`gsap.matchMedia('(min-width: 768px)')` (reverted with the context).
Never animate on raw scroll events.

## Structure

Nav, hero (`id="hero"`), 3–5 sections, footer. Mark tour stops:
`<section id="menu" data-tour="The Menu">` (3+ stops). Section ids from:
`hero story menu dishes craft gallery visit reserve contact` (use what fits).

## content.js (example shape)

```js
export const content = {
  brand: { name: 'Lumière', tagline: 'A seven-course tasting' },
  nav: [{ label: 'Tasting', href: '#tasting' }, …],
  hero: { eyebrow: '…', title: '…', sub: '…', cta: 'Reserve a table', ctaHref: '#reserve' },
  dishes: [ { name: '…', price: 1450, desc: '…', note: '…' }, … ],  // numbers; render via price()
  story: { eyebrow: '…', title: '…', body: ['…'] },
  visit: { address: '…', phone: '…', email: '…', hours: [{ days: '…', time: '…' }] },
  footer: { line: '© 2026 …' },
};
```

Prices in ₹ (numbers). No lorem ipsum. No emojis. Real-feeling copy —
dish names, chef notes, addresses in India (Mumbai/Delhi/Bengaluru/Goa…).

## Images (5 per design — the make-or-break)

Generate with the media tool (load it via tool_search first). Photorealistic,
art-directed to YOUR palette/mood per ART_DIRECTION.md. Unique per design,
never reused. Food must look genuinely delicious — Michelin-grade styling.
If one looks cheap or plasticky, regenerate it.

Files: `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`, `detail.jpg`
(all JPG). Then copy: `cp assets/hero.jpg
~/workspace/atelier/public/templates/restaurant/<design-id>/thumb.jpg`
(create the dir first).

## Video (1 per design)

Storyboard FIRST per VIDEO_PLAN.md, then generate with the media tool:
`assets/hero-loop.mp4`, H.264, 1280×720, ~6–10s, seamless-loop feel,
on-palette grade, no text/faces/watermarks. Placement per VIDEO_PLAN.md.

## Spacing pass (before you report)

Creative-director whitespace review: section padding generous
(`clamp(5rem, 10vw, 9rem)` rhythm), no cramped rows, no dead gaps, clear
hierarchy per viewport. Check 360 / 768 / 1440 class behavior in your CSS.

## Self-QA before you report

- `npx oxlint` clean on your folder (run from `~/workspace/atelier`)
- no `:root`, no platform imports (only react, gsap, `../../_shared`, local)
- `useCustom` for brand/prices/images/contact; `productName(i, …)` for dish names
- `data-tour` on 3+ sections; all images have alt; no emojis
- reduced-motion path renders fully visible static layout
- `meta.js` matches contract shape exactly
- report: files created, video verified (ffprobe duration), mechanics working,
  spacing pass done, any deviations
