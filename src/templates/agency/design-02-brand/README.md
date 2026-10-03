# Kela Studio — design-02-brand

A brand identity agency site, process-led and methodical. For founders rebranding
and marketing leads who buy rigor: the site sells a four-phase method, not adjectives.

## Personality

Rigorous · Considered · Enduring. Editorial serif headlines (Instrument Serif,
italic interrupts in ochre), Inter tracked-caps labels, deliverable lists, and a
bone/espresso/ochre print palette. The signature mechanic is the **M2 process spine
scrub**: scroll draws the vertical spine while each phase's deliverable collage
slides in from alternating sides.

## Run

From `~/workspace/atelier`:

```bash
npm install
npm run dev
```

The template is mounted by the ATELIER viewer at
`src/templates/agency/design-02-brand/index.jsx`. Standalone export via the
platform's `tools/export-template.mjs`.

## Structure

```
design-02-brand/
  index.jsx        — default-export React component
  meta.js          — template metadata (id, palette, fonts, features)
  content.js       — all copy/data (brand, nav, hero, cases, phases, caps, studio, contact)
  styles.css       — all styles, tokens scoped to .tpl-design-02-brand
  assets/
    hero.jpg       — identity flat-lay (hero + poster)
    work-1.jpg     — logo construction grid (Aurelia Press case)
    work-2.jpg     — signage in situ (Northline Rail case)
    work-3.jpg     — packaging lineup (Terra & Thyme case)
    detail.jpg     — nib sketching letterforms (Kaveri Bank case + phase collage)
    frames/        — "Letterforms" sequence: 72 JPG frames (nib macro → iterations → ochre-circled mark), scrubbed by scroll via ScrollFrames
  README.md
```

Sections: nav · hero (scroll-driven manifesto sequence) · selected identities (5 case cards) ·
process (M2 spine: Discover / Define / Design / Deliver) · capabilities (4) ·
studio (philosophy, facts, principals) · contact (discovery-call booking form) ·
footer.

## Tokens

Scoped to `.tpl-design-02-brand` (never `:root`):

| Token | Value | Role |
|---|---|---|
| `--color-background` | `#F3EEE3` | Bone ground |
| `--color-surface` | `#E7DFCC` | Spread panels |
| `--color-primary` | `#2A2118` | Espresso headlines |
| `--color-secondary` | `#6E5B3E` | Secondary type, rules |
| `--color-accent` | `#C68A2E` | Ochre — seals, spine, CTAs |
| `--color-text` | `#2A2118` | Body |
| `--color-muted` | `#93876F` | Annotations |
| `--font-display` | `'Instrument Serif'` | Headlines (400 + italic) |
| `--font-body` | `'Inter'` | UI + body |

## Motion

- GSAP + ScrollTrigger in `useLayoutEffect` with `gsap.context(...).revert()`.
- `scroller: scroller()` on **every** ScrollTrigger (platform scrolls in `.tpl-scope`).
- Hero: slow word-mask rise (stagger 0.09), flat-lay frame bloom.
- M2 spine scrub (`scrub: 1`): spine `scaleY` 0→1; collages slide in alternating
  sides; phase nodes activate at mid-viewport.
- Case cards: construction-grid overlay + image zoom 1.04 on hover; ochre seal rotates 8°.
- Reduced motion (`useReducedMotion()`): all gsap skipped; spine fully drawn,
  phases/collages statically visible; no hidden content.

## Replace images

Drop a same-named file into `assets/` (or use the viewer's Upload panel —
`Img k="…"` keys are `hero`, `work-1`, `work-2`, `work-3`, `detail`).

## Content

All editable text lives in `content.js` (plain JSON-compatible object). The
booking form submits via `mailto:` to the studio email (customizable in the lab).
