# design-09-indie — Kela Studio

An intimate, first-person indie freelancer site. Journal rhythm, margin notes,
hand-drawn wavy underlines, warm morning-light imagery. The smallest scale and
warmest tone in the agency set.

## Personality
Warm · honest · personal. Everything is written in the first person — no
agency-speak, no superlatives, no dead ends. The conversion goal is an intro
call or a direct email.

## Run
```bash
cd ~/workspace/atelier
npm install
npm run dev
```
The template lives at `src/templates/agency/design-09-indie/`. The platform
viewer wraps it in `.tpl-scope .tpl-design-09-indie`.

## Structure
```
design-09-indie/
  index.jsx   — default-export React component (sections: nav, hero, work,
                how I work, notes/journal, about, contact, footer)
  meta.js     — named export `meta` (lab card data)
  content.js  — named export `content` (ALL editable copy, JSON-compatible)
  styles.css  — all styling, scoped to .tpl-design-09-indie
  assets/     — hero.jpg, work-1..3.jpg, detail.jpg, frames/ (72 scroll-scrub JPGs)
  README.md
```

## Sections & interactions
- **Hero** — portrait fades in (1.2s), name rises gently, availability pill
  pulses once; desk-loop video band (10s seamless) below the intro.
- **Selected work** — 6 projects, alternating rows, personal "What I learned"
  captions; hover warms the image (terracotta shift, 0.5s).
- **How I work** — 3 steps, honest do/don't lists, availability band.
- **Notes** — M9 journal margin notes: absolute asides on desktop (slide in
  from the margin as their paragraph enters), inline cards on mobile;
  key lines get a hand-drawn wavy SVG underline (0.8s draw).
- **About** — the person, the desk, the dog; fact list.
- **Contact** — email-first CTA, intro-call card.
- Tour stops are marked with `data-tour` (Hello · Selected work · How I work ·
  Notes · About · Contact).

## Replace images
Swap the files in `assets/` keeping the same names, or use the lab's
Customize → Upload panel — keys are `hero`, `work-1`…`work-6`, `note-photo`,
`about`. Images resolve via `useCustom().img(key, fallback)`.

## Tokens (scoped to `.tpl-design-09-indie`)
| Token | Value |
|---|---|
| `--color-background` | `#FBF7EF` warm white |
| `--color-surface` | `#F3ECDD` |
| `--color-primary` | `#33261A` espresso |
| `--color-secondary` | `#6B5741` |
| `--color-accent` | `#C26A3D` terracotta |
| `--color-text` | `#33261A` |
| `--color-muted` | `#97816A` |
| `--font-display` | Newsreader (400–600 + italic, opsz) |
| `--font-body` | Instrument Sans |

Fonts load via Google Fonts `<link id="tpl-font-design-09-indie">`. The
customizer can rewrite any `--color-*` / `--font-*` token live.

## content.js
Plain object: brand, nav, hero, work (6 projects + learned-lines), how
(steps, do/don't, availability), notes (3 journal entries with `marginAfter`,
`marginSide`, optional `marginPhoto`), about, contact, footer.

## Deploy
Standalone export via `tools/export-template.mjs` bundles this folder with
`_shared`; `vite build` must stay clean. Video is H.264 720p, muted/looping,
and is replaced by its poster when `prefers-reduced-motion` is set.
