# Kela Tech — design-08-fintech

**Personality.** Kela Tech is the fintech API design for ATELIER's IT & Technology
category: editorial, numbers-led, calm. Paper background, deep green ink, champagne
gold accents; Bricolage Grotesque display type over Inter body. Nothing bouncy —
trust is built with exact numbers and restrained fades.

**Signature motion — the Ledger Cascade.** A pinned ledger-style table
(desktop ≥ 768px only). Scroll scrubs through five API products top→bottom;
the gold highlight lands on each row while its two metrics count up from zero,
then passes to the next row. Mobile and reduced-motion get a static,
fully-revealed table with final numbers — no pin.

**Sections.** Editorial nav → hero (signature "Gold traces" loop behind a
paper veil, live-stat chips) → ledger cascade API section → code sample
(syntax-tinted Node SDK snippet) → metrics band ($48B / 99.99% / 135,
count-ups) → compliance strip (PCI DSS, SOC 2, ISO 27001, PSD2, 3DS2, FCA) →
pricing → CTA → footer.

## Run

```bash
npm install
npm run dev
```

The design renders inside the ATELIER viewer; it is also exportable as a
standalone Vite template (see `tools/export-template.mjs`).

## Structure

```
design-08-fintech/
  index.jsx   — default export; nav, hero, ledger cascade, code, metrics,
                compliance, pricing, CTA, footer
  meta.js     — export const meta (contract shape)
  content.js  — all editable copy, endpoints, metrics, pricing (JSON-safe)
  styles.css  — all styling; tokens scoped to .tpl-design-08-fintech
  assets/     — hero.jpg (poster), feature-1.jpg, feature-2.jpg,
                feature-3.jpg, detail.jpg, frames/ (72 scroll frames)
```

## Replacing images

Swap files in `assets/` keeping the same filenames, or use the lab's Upload
panel — keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
The hero is a scroll-driven frame sequence: `assets/frames/frame-001.jpg` …
`frame-072.jpg` (72 frames), scrubbed through the shared `ScrollFrames`
component (`pinDistance="+=170%"`). `hero.jpg` stays as the poster asset and
the reduced-motion still (first frame renders static when reduced motion is
on).

## Tokens

Defined on `.tpl-design-08-fintech` (never `:root`):

- `--color-background: #FDFCF8` · `--color-primary: #0E3B2E` ·
  `--color-primary-deep: #0A2A21` · `--color-accent: #C9A227` ·
  `--color-accent-soft: #E8D9A0` · `--color-text / --color-ink: #14201B`
- `--font-display: 'Bricolage Grotesque'` · `--font-body: 'Inter'` ·
  `--font-mono` system mono stack

The customizer rewrites these live. Fonts load via a Google Fonts link with id
`tpl-font-design-08-fintech` (`display=swap`), injected once, kept on unmount.

## content.js

Plain object: `brand`, `nav`, `hero` (chips), `products` (name, endpoint,
desc, two metrics each with value/prefix/suffix/decimals/label), `developers`,
`gallery`, `metrics`, `company` (badges), `pricing` (tiers), `cta`,
`contact`, `footer`. Product names render through `productName(i, fallback)`,
tier amounts through `price(n)`, brand/email through `useCustom()` overrides.

## Deploy

Exported by the platform into a standalone Vite app; `npm run build` must
stay clean. Motion respects `prefers-reduced-motion` and degrades to a fully
visible static page (ledger numbers final, no pins, static first frame).
