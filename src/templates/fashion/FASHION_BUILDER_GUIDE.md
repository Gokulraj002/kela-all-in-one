# ATELIER · Fashion Category — Builder Guide

Read `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` first, then your
design's sections of `FASHION_BRIEF.md`, `ART_DIRECTION.md`, `MOTION.md`,
`VIDEO_PLAN.md`. This guide adds the fashion-category conventions every
builder MUST follow so all 10 designs integrate identically.

## Your folder (exact)

```
src/templates/fashion/<design-id>/   (e.g. design-01-heritage)
  index.jsx    — default export React component
  meta.js      — `export const meta = {...}` (shape in contract)
  content.js   — `export const content = {...}` plain JSON-compatible object
  styles.css   — imported by index.jsx; tokens on `.tpl-<design-id>` ONLY
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg, hero-loop.mp4
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
import heroLoop from './assets/hero-loop.mp4';
```

`useCustom()` returns: `brand` (override or null → use content default),
`colors {primary, accent}`, `fonts`, `currency` ('₹' default), `contact {email, instagram}`,
`img(key, fallback)` (custom upload dataURL wins), `productName(i, fallback)`,
`price(n)` (formats with currency). Use ALL of these — never hardcode brand,
prices, or image paths in JSX.

`<Img k="hero" src={heroImg} alt="…" eager />` — `k` is the upload key.
Standard keys: `hero`, `product-0`, `product-1`, `product-2`, `product-3`, `detail`.
Map your 5 images: hero→`hero`, look-1→`product-0`, look-2→`product-1`,
look-3→`product-2`, detail→`detail`.
Always pass `alt`. `eager` only on the hero.

`<LoopVideo src={heroLoop} poster={heroImg} alt="…" className="…" />` — handles
muted/autoplay/loop/playsinline, preload="metadata", poster fallback,
offscreen pause, reduced-motion → poster only, error → poster. Do NOT hand-roll video.

## Root + tokens (exact)

```jsx
return <div ref={rootRef} className="tpl-design-01-heritage">…</div>;
```

```css
.tpl-design-01-heritage {
  --color-primary: #26355E; --color-secondary: …; --color-accent: #D9A441;
  --color-background: #F4ECDA; --color-surface: …;
  --color-text: …; --color-muted: …;
  --font-display: 'Rozha One', serif; --font-body: 'Mukta', sans-serif;
}
/* every color/font below uses var() — NEVER :root, NEVER hardcoded hex */
```

Use YOUR design's palette + fonts from ART_DIRECTION.md (all 10 are distinct).

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
    // …your design's signature motion + YOUR scroll mechanic from MOTION.md…
  }, rootRef);
  return () => ctx.revert();
}, [reduced, scroller]);
```

CRITICAL: the platform scrolls inside `.tpl-scope`, NOT window — always pass
`scroller: scroller()` on every ScrollTrigger. Pin-based mechanics MUST be
gated with `gsap.matchMedia('(min-width: 768px)')` so mobile gets a static
fully-visible layout. Never animate on raw scroll events without rAF.

## Structure

Nav, hero (`id="hero"`), 3–5 sections, footer. Mark tour stops:
`<section id="story" data-tour="Our Story">` (3+ stops).
Section ids from: `hero story products|collection gallery craft visit contact`
(use what fits your design).

## content.js (example shape)

```js
export const content = {
  brand: { name: 'Vastra Heritage', tagline: 'Handloom sarees, woven to last' },
  nav: ['Craft', 'Collection', 'Weavers', 'Visit'],
  hero: { eyebrow: 'Est. 1987 — Kanchipuram', title: '…', sub: '…', cta: '…' },
  products: [ { name: '…', price: 12500, desc: '…', fabric: 'Pure silk' }, … ],
  sections: { story: { title: '…', body: '…' }, … },
  contact: { email: '…', phone: '…', address: '…', hours: '…' },
  footer: { line: '© 2026 …' },
};
```

Prices in ₹ (numbers), render via `price()`. No lorem ipsum. No emojis.
Real-feeling copy — fabric names, weave names, craft clusters, real Indian
context (Kanchipuram, Banarasi, Chanderi, Jaipur, etc.).

## Images (5 per design — generate with the media tool)

Load the media namespace first: `tool_search.load_tool_namespace(["media"])`.
Then `media.generate_image` with `output_format: "jpg"` and
`output_dir: "workspace/atelier/src/templates/fashion/<design-id>/assets"`,
`name` set to `hero`, `look-1`, `look-2`, `look-3`, `detail` (rename the
returned file to `<name>.jpg` if needed).

Art direction: editorial fashion photography, NOT stocky. Photorealistic,
your design's palette and imagery grade from ART_DIRECTION.md. Real models,
Indian textiles, honest texture (silk sheen, cotton matte, zari). No text,
no watermarks, no logos in images. Max 4 image calls per response — do 4,
then the 5th in a follow-up. If one looks cheap, plasticky, or off-palette,
regenerate it. Verify each file opens (read it back) before wiring it in.

## Video (1 per design — generate with the media tool)

`media.generate_video` to YOUR storyboard in VIDEO_PLAN.md (timed beats,
~10s, seamless-loop feel). No text, no watermarks, NO visible faces
(hands/process/fabric only — crop at waist/neck). Photorealistic,
on-palette grade. Save/convert the result to
`assets/hero-loop.mp4` (H.264, 720p-ish; use ffmpeg to convert if the tool
returns another container). Verify with ffprobe: ~10s duration, has video
stream. Place per VIDEO_PLAN.md (hero background vs dedicated section).

## Spacing pass (before you report)

Creative-director whitespace review: section padding generous
`clamp()` rhythm; no cramped rows; clearances around headlines, cards,
nav; mobile 360px checked for collisions and dead gaps. Fix what you find.

## Self-QA before you report

- `npx oxlint` clean on your folder (run from ~/workspace/atelier)
- no `:root`, no platform imports (only react, gsap, ./local, ../../_shared)
- `useCustom` used for brand/prices/images/contact; `price()` for all prices
- `data-tour` on 3+ sections, all images have alt, no emojis, no lorem
- responsive: 360 / 768 / 1440 class behavior in your CSS
- reduced-motion path renders sensibly; video poster fallback present
- `meta.js` matches contract shape exactly
- all 6 asset files exist and are valid (5 jpg + 1 mp4)
