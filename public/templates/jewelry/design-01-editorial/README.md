# Kela Jewels — design-01-editorial

A luxury jewelry website template for the **AURUM LAB** project. Slow,
cinematic, editorial — a fashion-publication feel for a fictional haute
joaillerie maison called Kela Jewels.

## Design personality

- **SLOW CINEMATIC REVEALS** — the hero image unveils behind a sliding
  curtain mask; product and atelier images resolve from blur to sharp as
  you scroll.
- **Asymmetrical editorial layout** — images break the grid and overlap
  the headline; staggered collection cards; generous whitespace.
- **Material Motion** — a soft light sweep crosses product images on
  hover (~1.2s), hero layers drift a few pixels with the cursor, the
  headline letters lean almost imperceptibly toward the pointer, and the
  atelier photographs glide inside their frames as you scroll
  (transform-only, so scrolling stays perfectly smooth).
- **Restraint** — motion is quiet, gold is an accent (never the field),
  and everything stills gracefully under `prefers-reduced-motion`.

## Technology

Plain HTML, CSS, and vanilla JavaScript. No build step, no JS libraries.
Fonts load from Google Fonts (`Playfair Display` + `Manrope`,
`display=swap`). All copy renders from `content.js`.

## How to run

Just open the file — no server needed:

```bash
open index.html            # macOS
xdg-open index.html        # Linux
```

or serve it:

```bash
npx serve .
```

## Folder structure

```
design-01-editorial/
  index.html          — page structure (no brand text hardcoded)
  styles.css          — all styling, token-driven
  main.js             — rendering, motion, quick view, customization API
  content.js          — every word of copy (window.TEMPLATE_CONTENT)
  assets/images/
    hero.webp          — hero, landscape 16:9
    product-1.webp     — product, portrait 4:5
    product-2.webp     — product, portrait 4:5
    product-3.webp     — product, portrait 4:5
    craft.webp         — atelier, landscape 16:9
  README.md
```

## How to replace images

Drop your own WebP images into `assets/images/` keeping the same filenames, or
point `content.js` at new paths:

```js
products: [
  { name: "…", image: "assets/images/my-ring.webp", … }
]
```

Recommended: hero and craft at ~16:9, products at 4:5, sRGB WebP.
Images that fail to load are replaced automatically with an elegant
ivory placeholder carrying the brand initial — never a broken-image icon.

## How to change colors

Edit the tokens at the top of `styles.css` — nothing else uses raw
colors:

```css
:root {
  --color-primary:    #3D3935;  /* 60% — text / dominant surfaces */
  --color-secondary:  #D8C3A5;  /* 30% — supporting surfaces */
  --color-accent:     #B89B5E;  /* 10% — metallic accent, keep it rare */
  --color-background: #F8F5EF;
  --color-text:       #3D3935;
}
```

The live customizer rewrites these same variables, so never hardcode a
hex value anywhere else.

## How to change fonts

Replace the Google Fonts `<link>` in `index.html` and the two tokens:

```css
--font-display: 'Your Display Font', Georgia, serif;
--font-body: 'Your Body Font', sans-serif;
```

Display is used for headlines/eyebrows; body for everything else.

## How to change products

Edit `window.TEMPLATE_CONTENT.products` in `content.js` — name, price
(number, formatted with Indian grouping: `486500` → `₹4,86,500`),
currency, material, stone, description, image. Prices re-render
automatically; the quick-view panel reads from the same data.

## Try it with your own brand (no code)

Append query parameters to the URL — works over `file://` too:

```
index.html?brand=MAISON%20NOIR&primary=%23222222&accent=%23C9A227
```

Or call `window.applyCustomization({…})` from the console with any of:
`brandName, primaryColor, accentColor, fontPair ("Display|Body"),
heroImage (dataURL), logoText, currency, contactEmail, instagramUrl,
productNames (array), productImages (map index → dataURL)`.
Changes apply live with smooth transitions — no reload, and partial
input is safely ignored.

## How to deploy

It's static — upload the folder to any static host (Netlify, Vercel,
GitHub Pages, S3). No build, no environment variables.

## Sections

Header nav → `#hero` → `#collections` → `#products` →
`#craftsmanship` → `#story` → `#contact` → footer. The contact form is a
non-functional demo that shows an elegant confirmation state.
