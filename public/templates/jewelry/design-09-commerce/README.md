# Kela Jewels — design-09-commerce

A premium e-commerce template for the AURUM LAB jewelry website experience lab.

**Design personality:** cool, airy, sapphire-clean commerce. A fashion-publication rhythm
(DM Serif Display headlines, generous whitespace) over a pearl-grey canvas, with deep
petrol-blue moments and a restrained champagne-gold accent used only for hairlines,
eyebrows, prices and small CTA touches. Motion is "Material Motion" — responsive but
restrained: a one-shot light sweep on product hover, subtle cursor-depth parallax in the
hero, a ≤3px magnetic headline, curtain-mask reveals, and a FLIP-animated quick-view
panel. Nothing bounces, nothing glitters.

## Technology

Plain HTML, CSS and vanilla JavaScript. No build step, no JavaScript libraries.
Google Fonts are loaded via `<link>` tags only.

## How to run

No build needed — just open the page:

- Double-click `index.html`, **or**
- Serve the folder (recommended, keeps relative paths tidy):

```bash
cd design-09-commerce
npx serve .
# or
python3 -m http.server 8000
```

Then visit the printed URL (e.g. http://localhost:8000).

## Folder structure

```
design-09-commerce/
  index.html          — page skeleton (text renders from content.js)
  styles.css          — design tokens + all styling
  main.js             — rendering, motion, quick view, customization API
  content.js          — ALL copy, prices, images and links (edit this!)
  README.md
  assets/images/
    hero.webp          — hero / story image (landscape)
    product-1.webp     — signature ring (portrait)
    product-2.webp     — necklace (portrait)
    product-3.webp     — earrings (portrait)
    craft.webp         — atelier (landscape)
```

## How to replace images

Drop new files into `assets/images/` (keep the same filenames, or update the
paths in `content.js`). Landscape shots work best for `hero.webp` / `craft.webp`;
portrait 4:5 for the three product shots. Every `<img>` already has an elegant
fallback: if a file is missing, a soft pearl-gradient placeholder with the brand
initial appears automatically.

## How to change colors

Edit the tokens at the top of `styles.css` (`:root`). That's the whole palette:

```css
--color-background: #F7F8F6;
--color-primary:    #1E3A4D;   /* text, footer, deep moments */
--color-secondary: #DCE8EE;   /* supporting panels */
--color-accent:    #C4A15F;   /* hairlines, eyebrows, prices, small touches */
--color-text:      #1C2B36;
```

Every color on the page derives from these tokens, so changing them re-themes
the entire site instantly. The 60/30/10 rule is baked in: background dominant,
accent never dominant.

## How to change fonts

In `styles.css`, update:

```css
--font-display: 'DM Serif Display', Georgia, serif;  /* headlines, eyebrows */
--font-body: 'Inter', system-ui, sans-serif;          /* everything else */
```

and swap the Google Fonts `<link>` in `index.html` to load your chosen families
(with `display=swap`). System fallbacks are included so layout holds even if the
webfont fails.

## How to change products

Edit `window.TEMPLATE_CONTENT` in `content.js`:

- `products` — name, price, currency, material, stone, description, image,
  category (`rings` / `necklaces` / `earrings` drives the filter pills), badge.
- `collections` — the three collection cards.
- `hero`, `craftsmanship`, `story`, `contact`, `footer` — all page copy.
- `brand` — name and tagline (updates the header, footer and page title).

For live re-theming without editing files, call:

```js
applyCustomization({
  brandName: 'Kela Jewels',
  primaryColor: '#1E3A4D',
  accentColor: '#C4A15F',
  fontPair: 'Playfair Display|Inter',   // "Display|Body" Google Font names
  heroImage: 'data:image/jpeg;base64,...',
  productNames: ['Aria II', 'Rivière II', 'Cascade II'],
  productImages: { 0: 'data:image/jpeg;base64,...' },
  currency: '$',
  contactEmail: 'hello@kelajewels.in',
  instagramUrl: 'https://instagram.com/kelajewels'
});
```

Any subset works — `applyCustomization({})` is a safe no-op. You can also pass
`?brand=NAME&primary=%231E3A4D&accent=%23C4A15F` in the URL (works over `file://`).

## How to deploy

It's a static site: upload the folder (keeping `assets/` beside `index.html`) to
any static host — Netlify, Vercel, GitHub Pages, S3, or plain shared hosting.
No server, no build, no environment variables.
