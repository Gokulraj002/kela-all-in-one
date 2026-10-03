# Kela Jewels — design-10-experimental

**Design personality:** Kela Jewels is a dark, immersive high-jewelry experience. Think fashion publication meets cinema: near-black canvases, warm ivory Fraunces headlines, champagne hairlines, and chiaroscuro product photography. Motion is "Material Motion" — scroll-pinned scenes, layered parallax, masked line reveals and a cursor-driven light study — but always restrained. Nothing bounces, nothing glows neon, nothing shows off. The jewelry does the talking.

**Technology:** plain HTML, CSS and vanilla JavaScript. No build step, no JS libraries, no frameworks. Fonts come from Google Fonts via `<link>` tags only. Opens straight from `file://`.

## How to run

- **Easiest:** double-click `index.html` — it opens in your browser and just works.
- **Or serve it:** from this folder, run `npx serve .` (or `python3 -m http.server`) and open the printed URL.

## Folder structure

```
design-10-experimental/
├── index.html          # page skeleton (all text is rendered by main.js)
├── styles.css          # all styling + design tokens in :root
├── content.js          # ALL copy, prices, images — edit this to change content
├── main.js             # rendering, motion, quick view, customization API
├── README.md           # this file
└── assets/
    └── images/
        ├── hero.webp        # hero backdrop + maison story image
        ├── product-1.webp   # Monolith Ring
        ├── product-2.webp   # Abyss Pendant
        ├── product-3.webp   # Eclipse Drops
        └── craft.webp       # atelier / craftsmanship image
```

## How to replace images

Swap any WebP image in `assets/images/` with your own file of the same name (keep the dark, dramatic mood — deep blacks with warm light reads best here). Or point `content.js` at a different path: `hero`, product `image`, `craftsmanship.image` and `story.image` fields accept any relative path. If an image fails to load, an elegant branded placeholder appears automatically.

## How to change colors

Open `styles.css` and edit the `:root` block at the top:

```css
--color-background: #0F1214;  /* page canvas — keep near-black */
--color-primary: #EFE9DC;     /* warm ivory — display text, solid buttons */
--color-secondary: #1B2126;   /* deep charcoal — panels, form card */
--color-accent: #CDB78C;      /* champagne — hairlines, eyebrows, details only */
--color-text: #EFE9DC;        /* body text */
```

Every color on the page comes from these tokens, so changing them re-skins the whole template. Keep the 60/30/10 balance: dark dominant, ivory for type, champagne only as an accent — never as a fill.

## How to change fonts

In `styles.css`, `:root` holds `--font-display` (headlines, eyebrows) and `--font-body` (everything else). To use different Google Fonts: replace the `<link>` in `index.html` and update the two tokens, keeping the system fallbacks (e.g. `Georgia, serif`) so layout holds if fonts fail to load.

## How to change products (and all copy)

Edit `content.js` — `window.TEMPLATE_CONTENT` holds the brand, nav, hero, collections, products (name, price, currency, material, stone, description, image), craftsmanship, story, contact and footer text. Prices render in Indian grouping (₹2,10,000). `main.js` renders everything from this object; nothing is hardcoded in the HTML.

## Live customization

`window.applyCustomization({...})` re-skins the page without a reload and never throws on partial input. Supported keys: `brandName`, `logoText`, `primaryColor`, `accentColor`, `fontPair` (`"Display Name|Body Name"` — injects the Google Fonts link), `heroImage` (data URL), `productNames` (array), `productImages` (index → data URL map), `currency`, `contactEmail`, `instagramUrl`. You can also pass `?brand=NAME&primary=%23HEX&accent=%23HEX` in the URL — this works over `file://` too.

## How to deploy

It's static — upload this folder to any static host (Netlify, Vercel, GitHub Pages, S3, or any web server). No build, no server code, no environment variables.

## Notes

- Reduced-motion users get the full content with pinned scenes degraded to calm stacked sections and all parallax/depth/magnetic effects disabled.
- Product cards open a quick-view panel (FLIP animation from the card). Close with ×, the backdrop, or Esc.
