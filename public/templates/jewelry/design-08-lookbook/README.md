# Kela Jewels — design-08-lookbook

A fashion-editorial jewellery lookbook. Full-bleed spreads, oversized issue
numbers ("N°1 — The Gilded Hour"), a horizontal scrolling look strip,
editorial crop reveals, and a TRY THE LOOK concept-demo section.

## Design personality

- **Style:** Fashion editorial / Lookbook
- **Animation:** Editorial crop reveals, soft light sweeps, gentle
  scroll-linked hero parallax, whisper-quiet magnetic type
  (all disabled under `prefers-reduced-motion`)
- **Typography:** Cormorant Garamond (display) + Manrope (body)
- **Mood:** Editorial · Confident · Refined

## Special features

- **Look strip** — horizontally scrolling collection cards with snap,
  arrow controls and drag-to-scroll.
- **TRY THE LOOK** — upload a portrait (drag & drop) to preview it inside
  the Kela Jewels editorial frame and pair it with a piece. Clearly labelled
  *"Concept demo — illustrative preview, not AI try-on."*
- **Quick view** — click any piece; its image morphs from the card into a
  full detail panel (name, description, material, stone, price).

## Technology

Plain HTML, CSS and vanilla JavaScript. No build step, no libraries.
Google Fonts loaded via `<link>` with `display=swap`.

## How to run

Just open `index.html` in a browser — it works from `file://`.

Or serve it locally:

```bash
npx serve .
```

## Folder structure

```
design-08-lookbook/
  index.html          — page structure (text renders from content.js)
  styles.css          — all styling, driven by design tokens
  main.js             — rendering, motion, strip, try-on, quick view
  content.js          — ALL brand copy, products, prices (edit this)
  assets/images/
    hero.webp          — landscape cover spread
    product-1.webp     — portrait 4:5
    product-2.webp     — portrait 4:5
    product-3.webp     — portrait 4:5
    craft.webp         — landscape atelier shot
  README.md
```

## How to replace images

Drop new files into `assets/images/` keeping the same filenames
(`hero.webp` landscape ~16:9, products portrait 4:5, `craft.webp` landscape),
or edit the `image` paths in `content.js`. JPG, PNG and WEBP all work.
Every image has an elegant fallback (tone + brand initial) if a file is
missing — never a broken-image icon.

## How to change colors

Edit the tokens at the top of `styles.css`:

```css
:root {
  --color-primary:    #211E1B;
  --color-secondary:  #EFE3DC;
  --color-accent:     #B98F91;   /* keep this as an accent — never dominant */
  --color-background: #FBF8F5;
  --color-text:       #211E1B;
}
```

Everything on the page derives from these five tokens (tints are computed
with `color-mix`), so changing the primary color never means editing dozens
of files. Live customization also works via `window.applyCustomization()`
or URL params: `index.html?brand=Kela%20Jewels&primary=%23211E1B&accent=%23B98F91`.

## How to change fonts

In `styles.css`, update `--font-display` / `--font-body` and swap the
Google Fonts `<link>` in `index.html`. Only load the two fonts the design
uses.

## How to change products

Edit the `products` array in `content.js` — name, price (number), currency,
material, stone, description, image. The grid, look strip, pair-with row,
prices and quick-view panels all re-render automatically.

## How to deploy

Any static host: Netlify, Vercel, GitHub Pages, S3 — upload the folder as-is.
No build command needed.
