# Kela Kitchen — design-08-patisserie

**Patisserie · Delicate morning craft.** A morning patisserie in Kala Ghoda,
Mumbai: Marcellus Roman headlines, Mulish body, blush / cocoa / rose palette,
generous whitespace, and the signature **glass-case scroll mechanic (M8)**.

## Personality

Quiet Roman elegance. Everything soft — soft rises, soft pops, a 1.4s
morning-light fade on the hero. Bake-time notes on every item ("Out of the
oven · 7:40").

## Sections

Nav → hero (mirror-glaze loop) → **The Craft** (lamination story, tour stop)
→ **The Case** (signature mechanic, tour stop) → **Bake Schedule** (morning
timeline, tour stop) → **Custom Cakes** (tour stop) → **Visit** (tour stop)
→ footer.

## Signature scroll mechanic — M8 "The glass case"

Three glass tiers (Viennoiserie / Entremets / Breads). On desktop the case
tilts in perspective (`rotationX: 8 → 0`, scrubbed, `transformPerspective`
1400) while the tier nearest viewport-center blooms forward (`z: 0 → 60`,
`scale: 1 → 1.08`, others recede to 0.55 alpha) and its rose bake-time flag
pops with `back.out(2)`. Mobile: flat shelves, scale-only bloom. Reduced
motion: flat, static — all flags and tiers fully visible.

This is vertical tiers with Z-depth — not coverflow, not stacking cards.

## Run

```bash
npm install
npm run dev        # open the ATELIER viewer and pick Kela Kitchen (patisserie)
```

## Structure

```
design-08-patisserie/
  index.jsx    — the site (Nav / Hero / Craft / GlassCase / Schedule / Cakes / Visit / Footer)
  meta.js      — catalog meta (id, palette, features, fonts, colors)
  content.js   — all copy, tiers, bake schedule, visit info (JSON-compatible)
  styles.css   — every style, tokens on .tpl-design-08-patisserie only
  assets/      — hero.jpg, dish-1.jpg, dish-2.jpg, dish-3.jpg, detail.jpg, frames/ (72 JPG scroll frames)
```

## Replace images

Drop new files over `assets/hero.jpg`, `assets/dish-1.jpg`,
`assets/dish-2.jpg`, `assets/dish-3.jpg`, `assets/detail.jpg` (JPG). The
hero "video" is a scroll-driven frame sequence (`assets/frames/frame-001.jpg`
… `frame-072.jpg`, 640px wide) rendered by the shared ScrollFrames component
— to re-cut it, replace the 72 frames in order. Or use the lab's
Upload panel: keys are `hero`, `product-0`, `product-1`, `product-2`,
`detail`.

## Tokens

```css
.tpl-design-08-patisserie {
  --color-background: #F8F1E7; --color-surface: #F1E4D3;
  --color-primary: #3E2A22;   --color-secondary: #8A6A52;
  --color-accent: #C48A7A;    --color-text: #3E2A22;
  --color-muted: #A08B78;     --color-cream: #FFF9F2;
  --color-cream-soft: #EDE0D0;
  --font-display: 'Marcellus', serif; --font-body: 'Mulish', sans-serif;
}
```

The lab's Customize panel rewrites these live.

## content.js

Brand, nav, hero, craft story + stats, the three case tiers (names, prices
in ₹ numbers, bake notes, image keys), the morning bake schedule, custom
cake copy, address / hours / contact, footer line. Edit text here — no code.

## Deploy

Exported by `tools/export-template.mjs` as a standalone Vite app (fonts,
images, video, and the `_shared` primitives are bundled in). Serve the
`dist/` output from any static host.
