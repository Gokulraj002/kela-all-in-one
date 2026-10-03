# Kela Jewels — design-07-quiet-luxury

Whisper-quiet luxury. The most restrained template in AURUM LAB: simple fades,
enormous whitespace, tiny uppercase eyebrow labels, hairline rules. No
parallax, no magnetic type, no velocity effects — by design.

## Design personality

- **Style:** Quiet Luxury / Minimal editorial
- **Animation:** Simple fades only (opacity + a whisper of rise)
- **Typography:** Libre Baskerville (display) + Instrument Sans (body)
- **Mood:** Calm · Certain · Expensive

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
design-07-quiet-luxury/
  index.html          — page structure (text renders from content.js)
  styles.css          — all styling, driven by design tokens
  main.js             — rendering, reveals, quick view, customization
  content.js          — ALL brand copy, products, prices (edit this)
  assets/images/
    hero.webp          — landscape hero
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
  --color-primary:    #3B4038;
  --color-secondary:  #D8CFC2;
  --color-accent:     #747D67;   /* keep this as an accent — never dominant */
  --color-background: #F7F7F2;
  --color-text:       #2F332D;
}
```

Everything on the page derives from these five tokens (tints are computed
with `color-mix`), so changing the primary color never means editing dozens
of files. Live customization also works via `window.applyCustomization()`
or URL params: `index.html?brand=MAISON&primary=%233B4038&accent=%23747D67`.

## How to change fonts

In `styles.css`, update `--font-display` / `--font-body` and swap the
Google Fonts `<link>` in `index.html`. Only load the two fonts the design
uses.

## How to change products

Edit the `products` array in `content.js` — name, price (number), currency,
material, stone, description, image. Collections, prices and quick-view
panels all re-render automatically.

## How to deploy

Any static host: Netlify, Vercel, GitHub Pages, S3 — upload the folder as-is.
No build command needed.
