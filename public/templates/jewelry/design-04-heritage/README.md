# KELA JEWELS — design-04-heritage

A luxury jewelry website template for the AURUM LAB project. An archival,
museum-vitrine experience for a fourth-generation Jaipur goldsmith house —
chapter-numbered sections, slow page-turn reveals, and gold used the way a
curator uses it: sparingly.

## Design personality

- **Temperament:** storytelling, archival, stately. Warm ivory paper
  (`#F5EFE3`) is the room; ink (`#2E2A24`) is the voice; muted gold
  (`#A8894F`) appears only as an accent — eyebrows, hairlines, prices,
  the offset frame around the hero print.
- **Chapters, not sections:** Chapter I — The Collections · Chapter II —
  High Jewelry · Chapter III — The Making · Chapter IV — The House ·
  Chapter V — The Appointment.
- **Motion language:** curtain-mask reveals (a paper panel slides away like
  a turned page), horizontal-crop page-turn reveals on editorial blocks,
  a 1.2s light sweep across product photography on hover, gentle 5–15px
  cursor depth on the hero, and a magnetic headline that drifts ≤3px.
  Craftsmanship is a horizontal timeline: Design → Sketch → Cast → Set →
  Polish → Hallmark.
- **Craft details:** sharp 2px corners (archival, never rounded), a thin
  gold frame offset behind the hero image with an italic caption, CSS-only
  paper grain (no texture images), skeleton shimmer while plates develop,
  and an elegant paper-tone fallback with the brand initial if any image
  fails to load.
- **Accessibility:** `prefers-reduced-motion` is respected in CSS *and* JS
  (depth and magnetic motion switch off; reveals become simple fades). Keyboard: product cards are buttons, the quick-view panel
  closes on Escape and returns focus.

## Technology

Plain HTML, CSS, and vanilla JavaScript — no libraries, no build step.
Fonts load from Google Fonts with `display=swap`, and the layout holds if
they fail.

## How to run

Open `index.html` directly in a browser (works over `file://`), or serve it:

```bash
cd design-04-heritage
npx serve .
# or
python3 -m http.server 8000
```

## Folder structure

```
design-04-heritage/
  index.html          — page skeleton; text is filled in by main.js
  styles.css          — design tokens + all styling
  main.js             — rendering, motion, quick view, customization API
  content.js          — ALL site text, prices, and image paths (edit this!)
  assets/images/
    hero.webp          — 16:9 hero plate
    product-1.webp     — 4:5 portrait
    product-2.webp     — 4:5 portrait
    product-3.webp     — 4:5 portrait
    craft.webp         — 16:9 craftsmanship plate
  README.md
```

## How to replace images

1. Drop your WebP image into `assets/images/` (keep the same file names, or use
   new names and update the paths in `content.js`).
2. Recommended sizes: hero/craft ≈ 1920×1080, products ≈ 1200×1500.
3. Every `<img>` already has `alt`, lazy loading (hero uses
   `fetchpriority="high"`), a skeleton shimmer, and an automatic
   paper-tone fallback — no extra work needed.

## How to change colors

Edit the `:root` tokens at the top of `styles.css`. Every color on the page
comes from these — nothing is hardcoded:

```css
--color-primary: #2E2A24;    /* ink / dominant */
--color-secondary: #E4D7BE;  /* supporting surfaces */
--color-accent: #A8894F;     /* muted gold — keep it an accent */
--color-background: #F5EFE3; /* paper */
--color-text: #2E2A24;
```

## How to change fonts

The template loads exactly two families (Libre Baskerville for display,
Instrument Sans for body). To swap them:

1. Change the Google Fonts `<link>` in `index.html`.
2. Update `--font-display` / `--font-body` in `styles.css`, keeping a
   serif/sans-serif fallback stack after each.

## How to change products (and everything else)

Open `content.js` — it is the single source of truth. Brand name, nav,
hero copy, collections, products (name, price, material, stone,
description, image), the six craftsmanship steps, story paragraphs,
contact details, form labels, and footer line all live there.
`main.js` renders the page from this file, so customized exports work by
replacing just this file.

Live customization is also available in the browser console:

```js
applyCustomization({
  brandName: "ATELIER NOOR",
  primaryColor: "#1f1b16",
  accentColor: "#b08d4f",
  fontPair: "Playfair Display|Inter",
  currency: "$",
  contactEmail: "hello@kelajewels.in",
  instagramUrl: "https://instagram.com/kelajewels",
  productNames: ["Noor Bridal Set"],
  productImages: { 0: "data:image/jpeg;base64,..." },
  heroImage: "data:image/jpeg;base64,...",
  logoText: "N"
});
```

URL parameters work too (handy over `file://`):
`index.html?brand=ATELIER%20NOOR&primary=%231f1b16&accent=%23b08d4f`

## How to deploy

Copy the folder to any static host — Netlify, Vercel, GitHub Pages, S3, or
plain shared hosting. No build, no server code, no environment variables.
The Google Fonts `<link>` needs internet access at view time; everything
else works offline.
