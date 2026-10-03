# Kela Cafe — design-05-vintage

**Personality:** Heritage as the product. Cream, oxblood, brass. Playfair
Display with letterspaced small-caps eyebrows, long bookish paragraphs, sepia
grading on every photograph. Nothing rotates, nothing shouts.

**Conversion goal:** Visit, with table reservation as the premium path — the
reservation form is styled as a printed ticket with a perforated stub.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-05-vintage/
  index.jsx    — component (Crest nav, Hero, Timeline, Classics menu, Craft, Guestbook, Ticket reservation, Footer)
  meta.js      — contract meta
  content.js   — all copy, decades, menu (₹ numbers + joining years), guestbook, contact
  styles.css   — tokens scoped to .tpl-design-05-vintage
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
  README.md
```

**Note:** `menu-3.jpg` and `detail.jpg` are currently same-design stand-ins
(copies of `hero.jpg` and `menu-1.jpg`) — the original brass-machine-detail
and aged-menu-board generations failed with a media-pipeline transport error.
Regenerate those two shots and overwrite the files; no code changes needed
(upload keys `menu-2` and `detail`).

## Motion

- **Hero** — sepia interior fades in over 2s (opacity only); the "since 1962"
  line letterpress-stamps in (opacity + 1px settle, delay 0.8s); headline
  word-rises at a stately stagger of 0.1.
- **Decade timeline** — vertical `roastProgress` variant: a scrubbed brass fill
  (`scaleY`) drives five decade cards; on desktop (≥1024px) the photo panel is
  pinned beside the decades (sticky positioning — robust inside the platform's
  `.tpl-scope` scroller) and crossfades per active decade. On mobile the
  decades stack with inline framed prints. Reduced motion: all decades shown,
  fill complete, no scrub.
- **Prints** — soft opacity fades; a sepia vignette overlay eases out
  (opacity 0.85 → 0.25) as each image arrives. The sepia grade itself is a
  static CSS filter and is **never animated**.
- **Menu** — "on the menu since 1974" annotations fade in on row hover.
- **Ticket** — the submit button's perforated SVG border draws in
  (`stroke-dashoffset`, 0.6s) on hover.
- **Guestbook** — cards tilt up to ~1° toward the cursor (rAF-throttled,
  fine-pointer desktop only).
- Reduced motion: static layout, instant state changes, no tilt.

## Replace images

Swap the files in `assets/` (same filenames) or use the lab's Upload panel —
upload keys are `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`.

## Tokens

`--color-background #F4ECDC` · `--color-surface #E9DBC0` ·
`--color-primary #571C20` · `--color-secondary #7A5326` ·
`--color-accent #B08A3C` · `--color-text #33231C` · `--color-muted #97816B` ·
`--font-display 'Playfair Display'` · `--font-body 'Manrope'`.

## content.js

Edit brand, nav, hero, the five decades (year/title/body/photo/caption),
classic menu items (prices are ₹ numbers; `since` drives the annotation),
craft points, guestbook entries, reservation copy, contact, and footer.

## Deploy

Exported as a standalone Vite app via the ATELIER exporter; any static host
works (`npm run build` → `dist/`).
