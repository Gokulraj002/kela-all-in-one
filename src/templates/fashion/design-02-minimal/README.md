# Kela Fashion — design-02-minimal

Modern minimalist label. Extreme restraint — contemporary pret in undyed
kora cotton. Vast whitespace, single serene column moments. No marquee,
no badges, no noise. Motion is fades and breath only, plus the pinned
pleat wall.

## Personality

Quiet · Precise · Confident. Restraint as luxury: garment first, words
second, copy reduced to fabric, fit, and price.

## Run

From `~/workspace/atelier`:

```bash
npm install
npm run dev
```

The template is wired into the ATELIER viewer automatically via
`src/templates/fashion/`.

## Structure

```
design-02-minimal/
  index.jsx    — KoraMinimal component (nav, hero, philosophy, collection, fabric, visit, footer)
  meta.js      — template metadata (id design-02-minimal, num 02, name "Kora")
  content.js   — all copy, 4 products with ₹ prices, fabric specs, contact
  styles.css   — all styling; tokens scoped to .tpl-design-02-minimal only
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg, frames/ (72 scrub frames)
  README.md
```

## Signature motion — scroll-scrubbed "Still Air" + pleatUnfold

Hero is a scroll-scrubbed frame sequence (`<ScrollFrames>`): 72 JPG
frames (`assets/frames/frame-001.jpg` … `frame-072.jpg`) pinned over
`+=170%` of scroll; motion is reader-driven. Reduced motion renders the
first frame static with all overlay content visible.

Hero entrance: the scrub stage fades in (1.8s `sine.out`), headline
fades 0.8s later; all other reveals are the long `drapeSettle` (1.4s
`sine.out`, opacity + 40px, no stagger).

## Signature motion — pleatUnfold

The collection is a pinned pleat wall (desktop ≥768px via
`gsap.matchMedia`): four cards start folded shut (`scaleY: 0.08`, origin
center) and unfold sequentially (`scaleY → 1`, `power4.inOut`) as the
scroll scrubs through `end: '+=250%'`. One ScrollTrigger, `scrub: 0.8`,
transform-only, `scroller` passed for the platform viewer. Each card's
fold line stays visible as a hairline seam. Mobile (<768px) and
`prefers-reduced-motion`: cards render fully open in a static stack.

## Replacing images

Drop new JPGs into `assets/` keeping the same filenames, or override
per-slot in the lab's Upload panel — keys: `hero`, `product-0` … `product-3`,
`detail`. Keep the grade: soft overcast daylight, desaturated,
true whites, no text or logos in frame.

## Tokens

Scoped to `.tpl-design-02-minimal` — never `:root`:

| Token | Value |
|---|---|
| `--color-background` | `#FAF8F2` paper white |
| `--color-surface` | `#ECE8DB` panels / cards |
| `--color-primary` | `#191817` soft black |
| `--color-accent` | `#9C6B4A` raw clay (one note per viewport) |
| `--color-text` | `#191817` |
| `--color-muted` | `#8B8577` specs, notes |
| `--color-line` | `#D9D3C2` hairlines, pleat seams |
| `--font-display` | Archivo |
| `--font-body` | Inter |

The customizer rewrites these live; `useCustom` also feeds brand name,
prices (`price()` → ₹), images, and contact into the component.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero`, `philosophy`,
`collection`, `products` (name / price / fabric / fit), `fabric` (body +
spec rows: weave, GSM, dye, shrinkage, finish), `visit`, `contact`
(email, phone, address, hours, instagram), `footer`.

## Deploy

Standalone export via `tools/export-template.mjs` (see
`REACT_TEMPLATE_CONTRACT.md`); the folder is fully self-contained —
imports only `react`, `gsap`, `./local`, `../../_shared`.
