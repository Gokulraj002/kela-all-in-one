# Kela Jewels — design-03-bridal

A luxury bridal jewelry website template for the AURUM LAB project.
Design personality: **Soft Romantic Motion** — gentle floats, slow fades,
delicate light sweeps, and overlapping editorial compositions (fashion-
publication typography, generous airy spacing). Palette: pearl white,
blush pink, dusty rose.

**Technology:** plain HTML + CSS + vanilla JavaScript. No build step, no
JS libraries. Google Fonts via `<link>` only (Cormorant Garamond + Manrope).

## How to run

Open `index.html` in any browser — it works from `file://` with zero setup.

Or serve it locally:

```bash
cd templates/design-03-bridal
npx serve .
# or: python3 -m http.server 8000
```

## Folder structure

```
design-03-bridal/
  index.html          # page skeleton; all copy injected by main.js
  styles.css          # all styling, design tokens in :root
  main.js             # rendering, motion, interactions, applyCustomization
  content.js          # ALL visible copy — edit this to re-skin the brand
  README.md           # this file
  assets/images/
    hero.webp          # 16:9 hero campaign image
    product-1.webp     # 4:5 product — Vow Solitaire (also the switcher base)
    product-2.webp     # 4:5 product — Promise Band
    product-3.webp     # 4:5 product — Blossom Earrings
    craft.webp         # 16:9 atelier image
```

## How to replace images

Drop new WebP images into `assets/images/` keeping the same filenames, or update
the `image` fields in `content.js` (collections, products, craftsmanship,
story). Keep `hero.webp`/`craft.webp` landscape (~16:9) and the product
shots portrait (~4:5). Every image gets an automatic blush-tone skeleton
shimmer while loading and an elegant placeholder (blush + brand initial)
if a file is missing — never a broken-image icon.

## How to change colors

Edit the tokens at the top of `styles.css`:

```css
:root {
  --color-primary:    #6D6661;
  --color-secondary:  #E8D7D3;
  --color-accent:     #B98F91;   /* dusty rose — keep it to ~10% */
  --color-background: #FCF9F7;
  --color-text:       #4A4440;
}
```

Everything else is derived from these with `color-mix()` — there are no
hardcoded colors elsewhere. The platform customizer rewrites these variables
live. Keep the 60/30/10 balance: pearl ground, blush support, dusty-rose
accents only.

## How to change fonts

In `styles.css` `:root`, set `--font-display` and `--font-body`, and update
the Google Fonts `<link>` in `index.html` (always with `display=swap`).

## How to change products

Edit the `products` array in `content.js` — name, price (number), currency,
material, stone, description, image. Prices are formatted for the `en-IN`
locale automatically (e.g. 264900 → ₹2,64,900).

## Special features

**1 · Material switcher (hero).** The floating "Vow Solitaire" panel on the
hero offers four finishes — 18K Gold / White Gold / Rose Gold / Platinum.
Switching crossfades the image treatment (tasteful CSS filter/duotone
variants over the single base photo, with a soft scale morph) and updates
the material label. It carries the honest caption *"Demo treatment —
simulated metal finishes."* — these are CSS treatments, not renders.

**2 · Try the look (concept demo).** A drag-&-drop upload zone ("Drop your
image here", with animated border feedback on dragover). After upload the
photo appears in a premium double-bordered frame with file name,
dimensions, and Replace / Remove buttons. Accepts PNG, JPG, JPEG, WEBP.
Labeled *"Concept demo — illustrative preview, not AI try-on."* Your photo
never leaves the page (read locally via FileReader).

## Sections (in order)

`header.site-nav` → `#hero` → `#collections` → `#products` → `#try-look`
→ `#craftsmanship` → `#story` → `#contact` → `footer`.

## Motion notes

- Light sweeps on product hover (~1.2s, once per hover).
- Cursor depth on layered imagery (max ~14px) and a magnetic headline
  (≤3px) — both disabled on touch devices. Nothing is tied to scroll
  velocity, so scrolling stays perfectly steady.
- Blur-to-sharp + soft-scale reveals via IntersectionObserver.
- `prefers-reduced-motion` is honored in both CSS and JS (fades only).
- Click any product for a quick-view panel that expands from the card.

## Deploy

Any static host works: Netlify, Vercel, GitHub Pages, Cloudflare Pages —
upload the folder as-is. No build, no server code.
