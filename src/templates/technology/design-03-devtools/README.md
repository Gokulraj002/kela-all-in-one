# Kela Tech — design-03-devtools

**Developer Tools** · Docs-led terminal aesthetic for a fictional deploy-platform CLI.

## Personality

Precise, fast, hacker-credible. A docs site that behaves like the product it
sells: a big terminal hero that installs Kela Tech on page load, a quickstart
with real copy-pasteable commands, and a pinned scroll section where the page
*types the CLI for you* — scroll progress drives a character-by-character
terminal, and each finished command prints its output and lights up its
feature panel. Motion is typed reveals, a blinking caret, and crisp 0.25s
transitions — nothing bouncy.

## Run

```bash
npm install
npm run dev
```

The design is a standalone template at
`src/templates/technology/design-03-devtools/`; it mounts inside the ATELIER
viewer, or export it with `tools/export-template.mjs`.

## Structure

```
index.jsx      — default export; nav, hero, quickstart, TerminalTyper,
                 API teaser, changelog, CTA, footer
meta.js        — template metadata (contract shape)
content.js     — all copy: nav, hero, quickstart steps, typer steps,
                 endpoints, changelog entries, CTA, footer
styles.css     — all styling; tokens scoped to .tpl-design-03-devtools
assets/        — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                 detail.jpg, frames/frame-001.jpg … frame-072.jpg
                 (scroll-driven hero sequence; the old autoplay mp4
                 was removed after conversion)
README.md
```

## Replacing images

Swap the files in `assets/` keeping the names, or use the lab's Upload panel —
upload keys are `product-0`, `product-1`, `product-2`, `detail`
(resolved through `useCustom().img()`, custom uploads win).

## Design tokens

```css
.tpl-design-03-devtools {
  --color-primary: #0d1117;   /* editor dark */
  --color-accent: #3fb950;    /* green */
  --color-amber: #d29922;     /* amber */
  --color-paper: #ffffff;     /* light docs sections */
  --font-display: 'JetBrains Mono', monospace;
  --font-body: 'Inter', sans-serif;
}
```

Fonts load via a Google Fonts `<link>` injected once with id
`tpl-font-design-03-devtools`. The platform customizer can override brand,
colors, fonts, contact email, and imagery at runtime.

## content.js

Plain JSON-compatible object. Edit `brand.name`, `hero`, `quickstart.steps`,
`typer.steps` (the four scroll-typed commands + outputs + feature panels),
`api.endpoints`, `changelog.entries`, `cta`, and `footer` — no code changes
needed for copy updates. Backtick spans in changelog items render as `<code>`.

## Scroll mechanic — Terminal Typer

`TerminalTyper` pins its stage on desktop (≥768px via `gsap.matchMedia`,
`scroller()` on the ScrollTrigger) with `scrub: 1, end: '+=300%'`. Each step
gets a character budget (command chars + output chars + reading pause);
`onUpdate` converts scroll progress to typed characters and writes them
directly to the DOM — commands type, outputs print on completion, the blinking
caret follows, and the matching feature panel activates. Mobile,
narrow viewports, and `prefers-reduced-motion` render the full transcript and
all four panels statically (no pin, no JS typing).

## Deploy

`npm run build` produces the app bundle; for a standalone site zip use the
platform's Export action (assembled by `tools/export-template.mjs`).
