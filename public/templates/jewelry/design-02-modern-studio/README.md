# Kela Jewels — design-02-modern-studio

A luxury jewelry website template for the AURUM LAB project.

**Design personality — Precise Geometric Movement.** A modern design studio
aesthetic: hairline grid lines, generous whitespace, vertical-crop image
reveals, and sharp, restrained motion. The layout is asymmetric but
architectural (never a card grid), with fashion-publication typography —
Fraunces display headlines against Space Grotesk body text.

**Palette:** white `#FFFFFF`, ink `#25272A`, pearl `#F4F4F1`, muted silver
`#9AA1A8` used only as a restrained accent (60 / 30 / 10).

## Technology

Plain HTML, CSS, and vanilla JavaScript. No build step, no JS libraries.
Google Fonts are loaded with a `<link>` tag only (`display=swap`, with
serif/sans-serif fallbacks so the layout never collapses if fonts fail).

## How to run

Just open the page — it works from `file://` with zero setup:

```bash
# option 1: double-click index.html
# option 2: serve it locally
npx serve .
```

Then visit the URL it prints (usually http://localhost:3000).

## Folder structure

```
design-02-modern-studio/
  index.html          # page skeleton (all text is filled in by main.js)
  styles.css          # design tokens + all styling
  main.js             # rendering, motion, quick view, customization API
  content.js          # every word of text, prices, and image paths
  assets/images/
    hero.webp          # 16:9 hero image
    product-1.webp     # 4:5 product shot
    product-2.webp     # 4:5 product shot
    product-3.webp     # 4:5 product shot
    craft.webp         # 16:9 craftsmanship image
  README.md
```

## How to replace images

Drop your new files into `assets/images/` keeping the same file names, or
edit the `image` paths in `content.js` (hero, collections, products,
craftsmanship sections). Keep the same shapes: `hero.webp` and `craft.webp`
landscape (~16:9), product shots portrait (4:5). Every image gets a pearl
skeleton shimmer while loading and, if a file is missing, an elegant
placeholder with the brand initial — never a broken-image icon.

## How to change colors

All colors live in the `:root` block at the top of `styles.css`:

```css
--color-primary:    #25272A;  /* ink — text, buttons */
--color-secondary:  #F4F4F1;  /* pearl — supporting surfaces */
--color-accent:     #9AA1A8;  /* muted silver — restrained accent only */
--color-background:#FFFFFF;
--color-text:       #25272A;
```

Change a value there and the whole template follows — nothing else in the
CSS uses a hardcoded color.

## How to change fonts

In `styles.css` `:root`, set:

```css
--font-display: "Your Display Font", serif;
--font-body: "Your Body Font", sans-serif;
```

and update the Google Fonts `<link>` in `index.html`. Or do it live in the
browser console:

```js
applyCustomization({ fontPair: "Playfair Display|Inter" });
```

## How to change products

Edit the `products` array in `content.js` — name, price (a number, formatted
Indian-style automatically, e.g. `184500` → ₹1,84,500), currency, material,
stone, description, image, alt text. The page re-renders from this file, so
exported customized versions work by replacing `content.js` alone.

## Live customization API

`main.js` exposes `window.applyCustomization(custom)` — all fields optional,
safe to call with a partial or empty object, no page reload:

```js
applyCustomization({
  brandName: "ATELIER",
  primaryColor: "#1c1e21",
  accentColor: "#8a8f96",
  fontPair: "Fraunces|Space Grotesk",
  heroImage: "data:image/jpeg;base64,...",
  logoText: "A.",
  currency: "$",
  contactEmail: "hello@kelajewels.in",
  instagramUrl: "https://instagram.com/kelajewels",
  productNames: ["Piece One", "Piece Two", "Piece Three"],
  productImages: { 0: "data:image/jpeg;base64,..." }
});
```

You can also pass `?brand=ATELIER&primary=%231c1e21&accent=%238a8f96`
in the URL — it applies on load and works over `file://`.

## Motion & accessibility

- Product hover: a soft diagonal light sweep, once per hover.
- Hero: cursor-depth layers (5–15px, disabled on touch), magnetic headline
  (≤3px), and a gentle scroll-linked drift on the hero figure.
- Reveals: vertical-crop + soft-scale via IntersectionObserver.
- Click a product for quick view — the image expands from its position into
  a detail panel (name, description, material, stone, price, enquire CTA).
- `prefers-reduced-motion` is respected in both CSS and JS: parallax, depth
  and magnetic type switch off, leaving simple fades.

## Deploy

It's static — upload the folder to any static host (Netlify, Vercel,
GitHub Pages, S3). No build, no server code.
