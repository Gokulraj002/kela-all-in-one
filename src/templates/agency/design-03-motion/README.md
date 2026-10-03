# Kela Studio — design-03-motion

A dark, cinematic website for a motion & design film studio. Near-black ground,
charcoal surfaces, amber accents. Anton (uppercase, condensed) for display type,
Manrope for credits and body. The showreel is the centerpiece: a pinned,
letterboxed frame where scrolling scrubs through five film stills with a running
`HH:MM:SS:FF` frame counter, while the letterbox bars widen from 8% to 14%.

## Personality

Cinematic · Precise · Atmospheric. Cinema grammar throughout: black holds,
fade-to-black dips between acts (max two), frame-counted everything. Motion is
slow and decisive — `power3/4.out` entrances, `power2.inOut` crossfades.

## Run

```bash
npm install
npm run dev      # platform mounts this template under /templates/agency/design-03-motion
```

The standalone export (`tools/export-template.mjs`) copies this folder plus
`src/templates/_shared/`; `index.jsx` imports nothing else.

## Structure

```
design-03-motion/
  index.jsx      — default-export React component
  meta.js        — named export `meta` (library card data)
  content.js     — named export `content` (all copy, films, roster, form options)
  styles.css     — all styles, scoped to .tpl-design-03-motion (never :root)
  assets/
    hero.jpg       — projector beam in haze (hero poster / reduced-motion frame)
    frames/        — 72 stills of the beam (640px JPG), scrubbed by scroll
    work-1.jpg     — title-design light-streak still
    work-2.jpg     — CGI liquid-chrome frame
    work-3.jpg     — behind-the-scenes camera rig
    detail.jpg     — grading suite macro
```

## Sections & interactions

- **Hero** — full-bleed frame sequence (`<ScrollFrames>`): 72 stills of the beam
  scrubbed by scroll, pinned `+=170%`, with letterbox bars top and bottom. 0.5s
  black hold, then the stage fades in over 1.8s; Anton title rises through word
  masks. Under reduced motion the hold is skipped and the first frame shows as
  a static image.
- **Showreel (M3)** — pinned (≥1024px) letterboxed frame. Scroll scrubs 5 stills:
  crossfade + `scale 1.08→1` settle per still, running frame counter, letterbox
  bars 8%→14%. On mobile and under reduced motion: stacked stills, no pin.
- **Selected films** — title-card index with client / director / year / runtime
  credits. Hovering a thumbnail ticks a running timecode.
- **Capabilities** — six numbered cells: Title Design, 2D Animation, 3D & CGI,
  Brand Films, Idents & Packaging, Finishing & Grade.
- **Directors** — four-person roster plus the kit note.
- **Process** — Treatment → Design → Production → Delivery.
- **Contact** — treatment request form (project type, budget bands, timeline,
  brief). Submit composes a real email in the visitor's mail app — never a dead
  form.
- **Fade-to-black dips** — 0.6s dips entering the reel and the contact section
  (two total; disabled under reduced motion).

## Replace images

Swap any file in `assets/` keeping the same filename, or use the lab's Upload
panel — image keys are `hero`, `work-1`, `work-2`, `work-3`, `detail`
(`img(key, fallback)` in `index.jsx`). The hero beam: replace the stills in
`assets/frames/` keeping the zero-padded `frame-NNN.jpg` names (72 frames).

## Tokens

All on `.tpl-design-03-motion`:

| Token | Value |
|---|---|
| `--color-background` | `#0c0b09` |
| `--color-surface` | `#161310` |
| `--color-primary` / `--color-text` | `#f2ede3` |
| `--color-secondary` | `#8a8272` |
| `--color-accent` | `#e8a33d` |
| `--color-muted` | `#6e675a` |
| `--font-display` | Anton |
| `--font-body` | Manrope |

The customizer rewrites these live; the Google Fonts link id is
`tpl-font-design-03-motion`.

## content.js

Plain object: `brand`, `nav`, `hero`, `reel`, `films[]` (title, client, director,
year, runtime, discipline, imgKey, alt, logline), `capabilities[]`, `directors[]`,
`kit`, `process[]`, `contact` (email, phone, projectTypes, budgetBands),
`footer`. Edit copy here — no JSX changes needed.

## Deploy

Built by the platform's `vite build`; the standalone export zips this folder
with `_shared`. No external JS beyond `react` + `gsap`.
