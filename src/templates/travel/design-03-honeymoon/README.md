# Kela Travels — design-03-honeymoon

Honeymoon specialists, in editorial romance. Blush, pearl, and dusk mauve;
Italiana headlines over Montserrat body copy; airy single-column layouts and
full-bleed destination diptychs. Romantic and soft — never saccharine. Slow
everything: nothing on this page is allowed to be snappy.

## Personality

- **Signature mechanic — "Slow dissolve duets".** The Escapes section is a
  pinned full-bleed stage (desktop, ≥768px). Three destination diptychs
  (paired wide + reframed-intimate images per escape) dissolve into each
  other on scroll-scrub through a soft circular iris mask
  (`radial-gradient` mask driven by a `--iris` CSS variable). Captions rise
  "like breath" — slow y + opacity. Mobile gets the same diptychs as a calm
  static stack with gentle fades; `prefers-reduced-motion` gets static,
  fully-visible layouts (the pin never engages).
- **Motion language:** iris dissolves, breath-rise captions, slow crossfades.
  Sine easings everywhere, scrub smoothing of 1.5, long holds. Masked
  word-rise headlines, hairline rule draws.
- **Imagery:** overwater villa at blue hour (hero loop), Maldives sandbank,
  Santorini cave suite, Bali jungle villa, champagne-coupes detail.

## Run

From the atelier root:

```bash
npm install
npm run dev
```

Open the template in the ATELIER viewer (Travel → Kela Travels). Standalone
preview: render `index.jsx` (default export) inside any React 18 app with
`gsap` installed.

## Structure

```
design-03-honeymoon/
  index.jsx    — default export: the site (nav, hero, escapes, philosophy,
                 love notes, plan/contact, footer)
  meta.js      — named export `meta` (contract shape)
  content.js   — named export `content` (all editable copy/data)
  styles.css   — all styling; tokens on `.tpl-design-03-honeymoon` only
  assets/      — hero.jpg, dest-1.jpg, dest-2.jpg, dest-3.jpg, detail.jpg,
                 frames/ (72 JPG frames, 640px — scroll-driven hero sequence)
  README.md
```

Section ids: `hero`, `escapes`, `story`, `notes`, `contact`. Tour stops are
marked with `data-tour` on the hero plus four sections.

## Replacing images

Drop new files over `assets/` keeping the same names, or use the lab's
Upload panel — the keys are `hero`, `product-0` (Maldives), `product-1`
(Santorini), `product-2` (Bali), `detail` (champagne coupes). The hero is a
scroll-driven frame sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`,
loaded via `import.meta.glob`, scrubbed by the pinned `<ScrollFrames>`);
reduced-motion shows the first frame as a static backdrop. Keep replacements
on-palette (blush / pearl / dusk mauve), photorealistic, no text or watermarks,
no visible faces.

To swap the video's storyboard, follow `src/templates/travel/VIDEO_PLAN.md`
("Blue Hour") and re-encode to 1280×720 H.264 24fps.

## Tokens (customizer-editable)

```css
.tpl-design-03-honeymoon {
  --color-primary: #6e5a6e;    /* dusk mauve */
  --color-secondary: #8a7688;
  --color-accent: #c98a7a;     /* rose */
  --color-background: #f7f1ea; /* pearl */
  --color-surface: #efe2d5;
  --color-blush: #e8cfc3;
  --color-text: #463b45;
  --color-muted: #8a7688;
  --color-ink: #2e2630;
  --font-display: 'Italiana', 'Didot', serif;
  --font-body: 'Montserrat', 'Helvetica Neue', sans-serif;
}
```

No `:root` writes — everything is scoped. The customizer rewrites the vars
live. Display/body fonts load via a Google Fonts `<link>` injected once
(`tpl-font-design-03-honeymoon`).

## content.js

Plain JSON-compatible object: brand, nav, hero, escapes (3 items with `name`,
`price` in ₹, `blurb`, `duration`, `tag`), story (body, house rules, quote),
notes (3 testimonials), contact (email/phone/studio/hours + quiet add-ons),
footer. All prices render through the shared `price()` formatter so the
currency picker works; names through `productName()`.

## Deploy

The design is self-contained: it imports only `react`, `gsap`,
`gsap/ScrollTrigger`, its own files, and `../../_shared`. The ATELIER
exporter (`tools/export-template.mjs`) copies the folder plus `_shared`
into a standalone Vite zip — no platform imports to break.

## Notes for the next builder

- The iris mask is applied in JS (`gsap.set` on pin build), never in CSS —
  so the static fallback can never hide content.
- `gsap.matchMedia()` gates the pin; its cleanup flips `pinMode` back, which
  unmounts the progress rail and returns the stage to the static stack.
- Captions animate via `.hy-cap-line` children; keep one element per line.
