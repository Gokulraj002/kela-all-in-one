# 04 · Kela Tech — Cybersecurity

High-contrast, precision-engineered cybersecurity site for ATELIER's IT &
Technology category. Black, white, and a single signal-red accent. Archivo
display type, IBM Plex Mono body. Vigilant, exact, uncompromising — scan-line
sweeps, subtle status flickers, hard cuts. No soft bounces anywhere.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The design lives at `src/templates/technology/design-04-secure/` and renders
through the ATELIER viewer. Standalone export works the same way as every
template (see `REACT_TEMPLATE_CONTRACT.md`).

## Structure

```
design-04-secure/
  index.jsx    — default export; sections: nav, hero (threat map), live
                 ticker, threat-scan sweep, platform grid + feature media,
                 compliance strip, metrics, CTA, footer
  meta.js      — template metadata (id, palette, fonts, features)
  content.js   — all editable copy: nav, hero, ticker feed, 8 threats,
                 4 platform systems, compliance badges, metrics, CTA, contact
  styles.css   — all styling; tokens scoped to .tpl-design-04-secure
  assets/      — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                 detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

## Signature motion — Threat-scan sweep

Desktop (≥768px, motion OK): the intercept panel pins for `+=250%` of scroll.
A red scan line scrubs top→bottom with the scroll position; the grid is
divided into 4 quarters — as the line passes each row, its two threat cards
flip from dormant (`SCANNING…`) to detected (red border, severity chip,
rotated `NEUTRALIZED` stamp). The sweep counter tracks `SWEEP n/4`.

Fallbacks: under `prefers-reduced-motion` or below 768px there is no pin and
no scan line — all 8 cards render in the detected state.

## Replacing images

Swap files in `assets/` keeping the same names, or use the lab's Upload
panel — keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.
The hero is a scroll-driven frame sequence (`assets/frames/frame-001.jpg` …
`frame-072.jpg`) rendered by the shared `ScrollFrames` component — pinned for
`+=170%` of scroll, scrubbing the frames as the visitor scrolls, and a static
first frame under `prefers-reduced-motion`.

## Tokens

On `.tpl-design-04-secure`: `--color-primary #0A0A0A`, `--color-accent
#FF3B30`, `--color-muted #8E8E93`, `--font-display 'Archivo'`,
`--font-body 'IBM Plex Mono'`, plus surface/panel/line tokens. The customizer
rewrites these live; never add `:root` rules.

## Deploy

Exported as a standalone Vite app via `tools/export-template.mjs` like every
ATELIER template. `npm run build` must be clean and `npx oxlint` must report
zero warnings on this folder.
