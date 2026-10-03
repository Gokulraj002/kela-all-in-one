# Kela Jewels — design-06-future

A dark, futuristic luxury jewelry website template for the AURUM LAB project.
Brand: **Kela Jewels** — *"Jewellery from the near future."*

## Design personality

Spatial, restrained, precise. Near-black grounds (`#141619`), warm-white type
(`#EDEAE4`), and a single ice-blue accent (`#9FB6C9`) used sparingly (~10%).
Fraunces display serif against Space Grotesk body text, thin rules, generous
black space, mono-spaced micro-labels.

Motion is spatial, never bouncy: vertical-crop + soft-scale reveals, layered
scroll parallax, a ≤3px magnetic headline, and a one-pass light sweep on
product hover.

**Special feature — 360° concept viewer (hero).** Drag left/right (touch works)
on the hero product to "rotate" it. Since there is no true 3D model, the
viewer fakes it with layered images: the base ring photo, a soft glow layer
behind, and a moving studio-light sheen on top. Dragging sweeps the sheen
across the ring, parallaxes the layers (±8px), and shifts brightness subtly —
so the piece feels like it's turning under studio lights. It is honestly
labeled in the UI: *"360° concept demo — interactive light study."*

## Technology

Plain HTML + CSS + vanilla JavaScript. No build step, no JS libraries.
Google Fonts via `<link>` only (Fraunces + Space Grotesk, `display=swap`).

## How to run

Just open the file — it works from `file://` with zero build:

```bash
cd templates/design-06-future
open index.html          # macOS
# or serve it:
npx serve .
```

## Folder structure

```
design-06-future/
  index.html          # page skeleton; all text injected by main.js
  styles.css          # design tokens + all styling
  main.js             # rendering, motion, 360 viewer, quick view, customization
  content.js          # every word of copy, prices, images — the content contract
  README.md           # this file
  assets/images/
    hero.webp          # 16:9 — hero / 360 viewer base
    product-1.webp     # 4:5 — Vector Cuff
    product-2.webp     # 4:5 — Singularity Stud
    product-3.webp     # 4:5 — Event Horizon Chain
    craft.webp         # 16:9 — atelier
```

## How to replace images

Drop new files over `assets/images/*.webp` (keep the names), or point
`content.js` at different paths:

```js
products: { items: [ { image: "assets/images/my-ring.webp", ... } ] }
```

Every `<img>` carries `alt`, lazy-loading (hero uses `fetchpriority="high"`),
a dark skeleton shimmer while loading, and an `onerror` fallback that swaps in
an elegant dark placeholder with the brand initial — never a broken icon.

## How to change colors

Edit the tokens at the top of `styles.css` — nothing else uses raw colors:

```css
:root {
  --color-background: #141619;
  --color-primary:    #E8E4DA;
  --color-secondary:  #23272C;
  --color-accent:     #9FB6C9;  /* keep restrained — ~10% of the composition */
  --color-text:       #EDEAE4;
  --radius-image: 4px;
}
```

Or do it live from the console / platform shell:

```js
applyCustomization({ primaryColor: "#F2EEE6", accentColor: "#A8C4D8" });
```

## How to change fonts

Replace the two families in `:root` (`--font-display`, `--font-body`) and the
Google Fonts `<link>` in `index.html`, or live:

```js
applyCustomization({ fontPair: "Cormorant Garamond|Jost" });
```

## How to change products

Edit `content.js` — `products.items` (name, price, currency, material, stone,
description, image). Prices render with Indian digit grouping (₹2,84,500).

## `applyCustomization` contract

`window.applyCustomization(custom)` accepts any subset of:

`brandName, primaryColor, accentColor, fontPair ("Display|Body"),
heroImage (dataURL), logoText, currency, contactEmail, instagramUrl,
productNames (array), productImages (map index → dataURL)`

Partial or empty objects are safe. Changes transition smoothly, no reload.
URL parameters also work on load: `index.html?brand=NOVA&primary=%23FFFFFF&accent=%23AABBCC`.

## Sections

`header.site-nav` → `section#hero` (360° viewer) → `section#collections`
→ `section#products` (quick view on click) → `section#craftsmanship`
→ `section#story` → `section#contact` (demo form with elegant confirmation)
→ `footer`.

## Accessibility & motion

`prefers-reduced-motion` is honored in CSS **and** JS: parallax, magnetic
type, the viewer's idle drift, and sweeps are disabled; reveals become simple
fades. Scroll parallax is a pure function of scroll position (no velocity
effects), so scrolling never shakes. All interactive elements are keyboard-reachable;
the quick-view panel traps focus on open and closes on Escape.

## How to deploy

Any static host: Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain
shared hosting. Upload the whole folder; `index.html` is the entry point.
