# Kela Studio — design-10-playground

**Personality:** Playful · Strange · Alive. An experimental interactive playground
where interaction IS the content. Commercial work is the footnote, not the headline.

## The idea

Peers, awards juries, and adventurous clients come to play. The hero is an **M10
kinetic type field**: the headline lives as individual letter spans in a
full-viewport field. Scroll velocity applies scatter force (letters panic, then
spring back), pointer proximity repels them (rAF, lerp 0.12, fine-pointer
desktops only), and a **calm/chaos slider** lets visitors tune the field energy.
One rAF loop for the whole template, paused offscreen (IntersectionObserver) and
on `document.hidden`.

Below the field: **5 interactive experiments** (pure GSAP/CSS/DOM — no WebGL),
a small **commercial proof** footnote, a **type playground** (Unbounded variable
font with live weight 200–900 / width 62–125 sliders driving
`font-variation-settings`), a studio note, and contact: *"Bring us something
weird"* with a playful brief form that composes a real `mailto:` — no dead
forms. Nav is an overlay with a circular clip-path expand (0.7s).

## Run

```bash
npm install
npm run dev
```

The template is self-contained under
`src/templates/agency/design-10-playground/` and renders through the ATELIER
viewer like every other design. Standalone export works via
`tools/export-template.mjs`.

## Structure

```
design-10-playground/
  index.jsx   — default export; KineticField, 5 experiment sketches,
                TypeTool, WeirdForm, overlay nav
  meta.js     — named export `meta` (contract shape)
  content.js  — named export `content` (all copy, experiments, cases, budgets)
  styles.css  — ALL styles, scoped to .tpl-design-10-playground
  assets/     — hero.jpg, work-1..3.jpg, detail.jpg, frames/ (72 JPG frames for the scroll-driven hero)
  README.md
```

## The 5 experiments

| # | Sketch | Tech | Interaction |
|---|--------|------|-------------|
| E·01 | LETTERSTORM | CSS + GSAP | Hover scatters letters, leave reassembles |
| E·02 | PUDDLE | DOM + GSAP | 72-dot grid ripples away from the pointer (quickTo) |
| E·03 | VELVET VELOCITY | ScrollTrigger | Scroll velocity skews the headline live |
| E·04 | CHARGE! | CSS + GSAP | Press-and-hold charges, release detonates particles |
| E·05 | MAGNETIC MARQUEE | GSAP | Drag the sentence, throw it, it sulks back |

All micro-interactions are event-driven (pointer/ScrollTrigger) — the kinetic
field owns the single rAF loop.

## Replacing images

Swap any file in `assets/` keeping the same filename, or override via the
lab's Upload panel (keys: `hero`, `work-1`, `work-2`, `work-3`, `detail`).
`hero.jpg` doubles as the video poster and the platform thumbnail source.
Abstract chromatic light works best; keep it text-free.

## Tokens (customizable)

```css
--color-background: #0A0A0B; --color-surface: #121214;
--color-primary: #F4F2EA;   --color-secondary: #8B8B90;
--color-accent: #C6F52E;    --color-violet: #8A5CFF;
--color-text: #F4F2EA;       --color-muted: #626268;
--font-display: 'Unbounded'; --font-body: 'Space Grotesk';
```

All scoped to `.tpl-design-10-playground` — nothing touches `:root`.

## content.js

Everything editable lives here: brand, nav, hero lines/sub, the 5 experiments
(title/tech/description/hint), the 4 commercial cases, type-tool labels, studio
facts, contact copy + budget bands + email, footer. JSON-compatible.

## Reduced motion

`prefers-reduced-motion` → kinetic field renders a static headline, the rAF
loop never starts, the calm/chaos slider is hidden, the type tool is hidden,
experiment sketches render statically with no handlers, overlay nav toggles
instantly, reveals use `fromTo` so nothing is ever left at `opacity: 0`.

## Deploy

Build the standalone export with `tools/export-template.mjs` (copies the
folder + `_shared`, rewrites asset imports). The Google Fonts link
(`tpl-font-design-10-playground`) is injected once by the component.
