# Kela Jewels — design-05-gemstone

A luxury jewelry website template for **Kela Jewels**, a contemporary gemstone
maison obsessed with coloured stones. Deep-emerald palette, ivory ground,
muted-gold accents (~10%). Motion is light/refraction-inspired: subtle hue
shifts, slow light sweeps, gentle depth — cool, precise, extremely restrained.

**Signature feature:** a hero **gemstone switcher** (DIAMOND / EMERALD / RUBY /
SAPPHIRE) that morphs one ring photograph through duotone tint treatments —
crossfade + scale + mask wipe, never a hard image swap.

## Technology

- Plain **HTML**, **CSS**, and **vanilla JavaScript** — no frameworks, no build step.
- Google Fonts via `<link>` only: **Bodoni Moda** (display) + **Plus Jakarta Sans** (body).

## How to run

Open `index.html` directly in a browser (works from `file://`), or serve it:

```bash
cd design-05-gemstone
npx serve .
# or
python3 -m http.server 8000
```

Then visit the printed local URL.

## Folder structure

```
design-05-gemstone/
  index.html          — page structure (all copy rendered by main.js)
  styles.css          — design tokens + all styling
  main.js             — rendering, motion, switcher, quick view, customization API
  content.js          — ALL brand text, products, stones (edit this, not HTML)
  assets/images/
    hero.webp          — diamond solitaire (hero panel + story band)
    product-1.webp     — emerald pendant
    product-2.webp     — ruby ring
    product-3.webp     — sapphire earrings
    craft.webp         — atelier craftsmanship
  README.md
```

## How to replace images

1. Drop your files into `assets/images/` (keep the same names, or update the
   paths in `content.js`).
2. Recommended sizes: `hero.webp` and `craft.webp` landscape (~16:9),
   `product-1/2/3.webp` portrait (4:5).
3. Every `<img>` has an `onerror` fallback — a broken file degrades to an
   elegant emerald panel with the brand initial, never a broken-image icon.

## How to change colors

Edit the tokens in `:root` at the top of `styles.css`:

```css
--color-primary:   #0E5146;  /* dominant emerald */
--color-secondary: #176B5B;  /* supporting emerald */
--color-accent:    #C5A15A;  /* muted gold — keep near 10% usage */
--color-background:#F8F5ED;  /* ivory */
--color-text:      #10302A;
--radius-image:    3px;
```

Every color in the template comes from these tokens — the platform customizer
rewrites them live. Keep `--color-accent` restrained (eyebrows, prices, rules).

## How to change fonts

Replace the two Google Fonts in the `<link>` in `index.html`, then update:

```css
--font-display: 'Your Display', Georgia, serif;
--font-body: 'Your Body', Arial, sans-serif;
```

If fonts fail to load, the serif/sans-serif fallbacks keep the layout intact.

## How to change products

Edit `window.TEMPLATE_CONTENT` in `content.js`:

- `products` — name, `price` (number), `currency`, `material`, `stone`,
  `description`, `image`.
- `collections` — three cards: `name`, `image`, `line`.
- `heroStones` — the four switcher tabs: `label`, `name`, `description`,
  `tint` (duotone color), `tintOpacity`, `glow`, `filter`.
- `craftsmanship.steps`, `story.stats`, `contact`, `footer.line`.

`main.js` renders everything from this file — no brand text lives in the HTML.

## Motion & accessibility

- Light sweep on product hover (~1.2s), hero depth layers (≤15px, desktop
  pointers only), magnetic headline (≤3px), blur-to-sharp + image-clip
  reveals. Nothing is driven by scroll velocity, so scrolling stays steady.
- `prefers-reduced-motion` is honored in **both** CSS and JS: depth and
  magnetic effects turn off, leaving simple fades.

## Customization API

`main.js` exposes `window.applyCustomization(custom)` for live theming
(partial objects are fine — missing keys are ignored):

```js
applyCustomization({
  brandName: "ATELIER NOOR",
  primaryColor: "#123f37",
  accentColor: "#C5A15A",
  fontPair: "Cormorant Garamond|Jost",
  heroImage: "data:image/jpeg;base64,…",
  currency: "$",
  contactEmail: "hello@kelajewels.in",
  instagramUrl: "https://instagram.com/kelajewels",
  productNames: ["Aurora Pendant", …],
  productImages: { 0: "data:image/jpeg;base64,…" }
});
```

URL parameters also work on load (including over `file://`):
`index.html?brand=ATELIER%20NOOR&primary=%23123f37&accent=%23C5A15A`

## How to deploy

Any static host works — no build, no server code:

- **Netlify / Vercel / Cloudflare Pages:** drag-and-drop this folder, or
  connect the repo.
- **GitHub Pages:** push the folder to a repo and enable Pages.
- **Plain web server:** copy the folder to the web root (e.g. Nginx/Apache).

## QA notes

- `node --check main.js && node --check content.js` — zero errors.
- No horizontal overflow at 360 / 768 / 1440 (fluid `clamp()` type, grid
  `minmax(0,1fr)`, `overflow-x: hidden` backstop).
- `applyCustomization({})` is a safe no-op; all selectors are guarded.
