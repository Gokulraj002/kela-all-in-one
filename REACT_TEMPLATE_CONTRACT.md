# ATELIER — React Template Contract (v1)

Every native template lives at `src/templates/<category>/<design-id>/` and
MUST follow this contract. The platform (viewer, customizer, exporter, QA)
depends on it.

## Folder structure (exact)

```
src/templates/coffee/design-01-artisan/
  index.jsx      — default export: the website as a React component
  meta.js        — named export `meta` (see below)
  content.js     — named export `content` (all editable text/data)
  styles.css     — ALL styling, imported by index.jsx
  assets/        — images (hero.jpg, product-1.jpg, …)
  README.md
```

## Rules

1. **Self-containment.** `index.jsx` may import ONLY:
   - relative files inside its own folder (`./content.js`, `./styles.css`, `./assets/...`)
   - `../../_shared/*` (the documented shared primitives)
   - `react`, `gsap`, `gsap/ScrollTrigger`
   Anything else (platform components, other templates, other categories)
   breaks the standalone export. QA greps for violations.

2. **Scoped tokens.** Never touch `:root`. The platform wraps your component
   in `<div class="tpl-scope tpl-<design-id>">`. Define tokens on your scope:
   ```css
   .tpl-design-01-artisan {
     --color-primary: #2B2118; --color-secondary: …; --color-accent: …;
     --color-background: …; --color-surface: …;
     --color-text: …; --color-muted: …;
     --font-display: 'Fraunces', serif; --font-body: 'Manrope', sans-serif;
   }
   ```
   Every color/font in your CSS comes from these vars. The customizer rewrites
   them live.

3. **Customization hook (required).** Use it for brand, colors, images,
   currency, contact — so the lab's Customize/Upload panels work:
   ```jsx
   import { useCustom, Img } from '../../_shared';
   const { brand, img, currency, contact, productName } = useCustom();
   // img('hero') → custom upload dataURL or default asset path
   // <Img k="hero" alt="…" /> handles fallback + skeleton automatically
   ```
   Render product names/prices via `productName(i, fallback)` and `currency`.

4. **Sections.** A complete small website: nav, hero, 3–5 content sections,
   footer. Section ids for presentation mode: `hero`, plus any of
   `story menu|products gallery craft visit contact` — the viewer auto-tours
   whatever `[data-tour]` sections you mark. Mark tour stops with
   `data-tour="Our Story"` etc.

5. **Motion.** GSAP + ScrollTrigger, timeline-based, in `useLayoutEffect`
   with `gsap.context` + `revert()` cleanup. Respect the shared
   `useReducedMotion()` — when true, render simple fades only.
   Never animate on every scroll tick without rAF/ScrollTrigger.

6. **Images.** `<Img>` everywhere (skeleton + elegant error fallback built
   in). `alt` text required. `loading="lazy"` except hero.

7. **No emojis.** No lorem ipsum. No external JS libs beyond react/gsap.

## meta.js (exact shape)

```js
export const meta = {
  id: 'design-01-artisan', num: '01', name: 'Ember & Oak', tag: 'Artisan',
  style: '…', animation: '…', typography: 'Fraunces + Manrope',
  layout: '…', mood: '…', palette: '…',
  features: ['Roast timeline'],
  fonts: { display: 'Fraunces', body: 'Manrope' },
  colors: { primary: '#2B2118', accent: '#C08A3E' },
};
```

## content.js

Plain object, JSON-compatible (no functions). Brand, nav, hero, sections,
products/menu items with prices, contact, socials, footer.

## README.md

Design personality · run (`npm install`, `npm run dev`) · structure ·
how to replace images · tokens · content.js · deploy.

## QA gate (must pass before approval)

- `npm run build` clean; `vite build` of the standalone export clean
- Zero console errors; no failed asset refs
- No platform imports (grep); tokens scoped (no `:root` writes)
- `useCustom` used for brand/images/currency/contact
- Responsive 360 / 768 / 1440 (reasoned + class checks)
- `prefers-reduced-motion` path; images have alt; no emojis
