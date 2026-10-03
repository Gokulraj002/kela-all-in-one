# Kela Tech — design-06-consumer · ATELIER

A playful, warm consumer-fintech website for **Kela Tech**, a friendly personal-finance
app ("Spend smarter, live brighter."). Centered, phone-led layout with a
spring-assembled feature section, reviews wall, how-it-works steps, pricing
teaser and a big coral download CTA.

## Personality

Joyful, warm, approachable — playful but never childish. Cream canvas
(`#FFF8F0`), coral (`#FF6B6B`) actions, sunshine (`#FFC53D`) highlights and
teal (`#2EC4B6`) accents. Nunito (rounded display) + Inter (body).

## Signature motion — spring assembly

The features section holds a CSS-built phone frame. Four app-screen cards
(Smart budgets, Instant insights, Shared wallets, Rewards — each with a
CSS-drawn mini chart: budget ring + bars, bar chart + sparkline, avatar split
list, points + confetti) spring into the frame **in sequence** as their
matching description scrolls into view, using `ease: 'back.out(1.7)'` and
`toggleActions: 'play none none reverse'`, fanning into a stacked deck while
the active description crossfades beside the sticky phone. Not a pin — pure
scroll-triggered assembly, gated to ≥900px via `gsap.matchMedia`.

Under `prefers-reduced-motion` (or below 900px) the assembly is skipped: all
four screens render statically fanned in the phone and every description is
fully visible.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-06-consumer/
  index.jsx    — default export; nav, hero, features (assembly), stories,
                 stats band, steps, pricing, download, footer
  meta.js      — template metadata for the ATELIER viewer
  content.js   — all copy: brand, nav, hero, 4 features, 3 reviews,
                 stats, 3 steps, 3 pricing tiers, download, footer
  styles.css   — all styling; tokens scoped to .tpl-design-06-consumer
  README.md
  assets/      — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                 detail.jpg, frames/ (72 scroll-scrub JPGs)
```

## Replace images

Drop new files over `assets/` keeping the names, or use the lab's Upload
panel — the `Img` keys are `hero`, `product-0`, `product-1`, `product-2`,
`detail` and resolve through `useCustom().img()`.

## Tokens

Scoped on `.tpl-design-06-consumer` (never `:root`):

```
--color-primary #FF6B6B · --color-accent #FFC53D · --color-teal #2EC4B6
--color-background #FFF8F0 · --color-surface #FFFFFF
--color-text #402E28 · --color-muted #93796B · --color-ink #2E211C
--font-display 'Nunito' · --font-body 'Inter'
radius scale: --radius-card 26px · --radius-inner 16px ·
              --radius-pill 999px · --radius-phone 44px
```

The Customize panel rewrites `--color-primary` / `--color-accent` live.

## content.js

Plain JSON-compatible object. Brand name, nav links, hero copy, the four
feature entries (each with `screen` data for its mini-viz), reviews, band
stats, steps, pricing tiers (numeric `price`, rendered via `price()` with the
active currency) and footer columns. Edit copy here — no JSX changes needed.

## Deploy

Exported as a standalone Vite template by the ATELIER exporter
(`tools/export-template.mjs`); also viewable in the lab's viewer/presenter.
