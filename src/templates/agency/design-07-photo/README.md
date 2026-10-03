# Kela Studio — design-07-photo

Photography-led studio site for the ATELIER library. Images are the interface;
text is kept to contact-sheet notes. The signature interaction is the **M7
darkroom develop**: every frame enters blurred and underexposed and develops
into clarity as it crosses the viewport, over a 60vh scrub per image.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template mounts inside the ATELIER viewer (`.tpl-scope` provides the scroll
container). As a standalone export it runs on `window` scroll.

## Structure

```
design-07-photo/
  index.jsx     — default-export React component
  meta.js       — named export `meta` (library card)
  content.js    — named export `content` (all editable copy/data)
  styles.css    — all styling, scoped to .tpl-design-07-photo
  README.md
  assets/
    hero.jpg        — hero frame (chiaroscuro portrait; also public thumb)
    frames/         — 72 JPG frames (portrait 720×1080) extracted from the
                      ~10s living-still portrait; scrubbed frame-by-frame
                      on scroll via the ScrollFrames component (pinned,
                      +=170%). The original autoplay mp4 has been deleted.
    work-1.jpg      — Form series lead (fashion editorial)
    work-2.jpg      — Concrete/Light series lead (architectural interior)
    work-3.jpg      — After Rain series lead (documentary street)
    series-{1,2,3,4}{b,c}.jpg — remaining series frames (12 frames total)
    detail.jpg      — darkroom craft (film negatives on light table)
```

## Sections

Hero (one perfect frame, full-bleed loop) → Selected Series (4 filmstrips with
CSS sprocket-hole edges) → Commissions (indexed client work, click opens the
frame) → Process (brief → shoot → edit → deliver) → Studio (photographers +
darkroom) → Contact (booking inquiry: date, usage, budget → mailto compose) →
Footer. `data-tour` markers on all six sections.

## Interactions

- **M7 develop** — `gsap.fromTo` filter tweens (`blur(24px) brightness(0.4)` →
  clear), scrubbed over 60vh per image. Never CSS-hidden: without JS everything
  renders developed. `will-change: filter` is applied only while a develop is
  active, and blurred regions stay under 60vh. The filter tween is the one
  allowed exception to the transform-only rule — it is the design's concept.
- **Filmstrips** — horizontal scroll-snap strips; native swipe on mobile.
- **Lightbox** — click any frame; prev/next, Escape, backdrop click.
- Reduced motion: all develops skipped (frames render developed), video shows
  the poster still, captions/reveals render in final state.

## Tokens

Scoped to `.tpl-design-07-photo` — never `:root`:

| Token | Value |
|---|---|
| `--color-background` | `#131110` deep charcoal |
| `--color-surface` | `#1c1917` |
| `--color-primary` / `--color-text` | `#efe9dd` warm silver |
| `--color-secondary` | `#8f867a` |
| `--color-accent` | `#c9b48a` warm silver-gold |
| `--color-muted` | `#6e665b` |
| `--font-display` | Bebas Neue (tracked caps) |
| `--font-body` | Manrope light |

## content.js

Brand, nav, hero, four series (frames carry `key`, contact-sheet `caption`,
`tech` line and `alt`), four commissions, four process steps, photographers,
darkroom note, booking form fields, footer. JSON-compatible — no functions.

## Replacing images

Drop new files into `assets/` with the same names, or override per-key from
the platform Customize panel (`img('s1a')` … `img('detail')`). `hero.jpg` is
also copied to `public/templates/agency/design-07-photo/thumb.jpg` as the
library thumbnail.

## Deviations from the brief docs

- The darkroom print-in-tray image and red-safelight looping storyboard could
  not be produced; the hero is instead a subtle ~10s living-still of the
  hero portrait (slow push-in, drifting dust, grain shimmer), and `detail.jpg`
  is film negatives on a light table. The "develop" concept is carried by the
  M7 scroll interaction itself.
- The hero video has been replaced by a scroll-driven frame-by-frame sequence
  (Apple-style): 72 portrait frames in `assets/frames/` are scrubbed on a
  pinned canvas as the visitor scrolls, instead of an autoplaying mp4.
- Hero blurred region is full-bleed during its develop (the signature moment);
  all other blurred regions stay under 60vh per the motion spec.

## Deploy

Exported as a standalone Vite app by `tools/export-template.mjs`; the folder
is self-contained (imports only `react`, `gsap`, `gsap/ScrollTrigger`,
`../../_shared` and local files).
