# design-04-witty — "Kela Studio"

A copy-driven witty agency site where words carry the design. The funniest
site in the ATELIER agency set: Bricolage Grotesque headlines with cobalt
punchline words, Space Mono for everything else, hard ink borders and
hard offset shadows — no soft fades anywhere.

## Design personality

Kela Studio is a fictional copy-first creative agency for founders tired of
agency-speak. Every section is a joke with a point: one killer hero line,
a scroll-tossed deck of eight one-liners, cases with honest
worked/flopped captions, the famous won't-do anti-list, opinionated team
bios, and a contact section that promises a one-working-day reply.

## Run

```bash
npm install
npm run dev
```

The template also builds standalone via `tools/export-template.mjs`
(`agency/design-04-witty`).

## Structure

```
design-04-witty/
  index.jsx      — default-export React component
  meta.js        — template metadata (id, palette, features…)
  content.js     — all editable copy: lines, cases, anti-list, bios, contact
  styles.css     — all styles, tokens scoped to .tpl-design-04-witty
  assets/
    hero.jpg       — studio wall of pinned headline cards (kept as source art)
    frames/frame-001.jpg … frame-072.jpg — 72 scroll-driven hero frames: the wall of lines
    work-1.jpg     — billboard campaign in situ
    work-2.jpg     — social campaign phone mockups
    work-3.jpg     — packaging lineup with playful labels
    detail.jpg     — marker on paper, mid-headline
  README.md
```

## Sections

`#hero` (data-tour "The Killer Line") → `#lines` ("The Lines") →
`#work` ("The Work") → `#wontdo` ("The Won't-Do List") →
`#studio` ("The Studio") → `#contact` ("Say Hello") → footer.

## Motion

- Hero: word-mask rise of the killer line; the cobalt punchline word
  (`ads.`) pops last (scale 1.18 → 1).
- **M4 headline toss deck**: 300vh region pins; a 200vh scrub tosses each
  top card off with alternating rotation (8–14°) while the next slams in
  and its cobalt punchline marker draws. A `LINE 01 / 08` counter tracks
  progress. Desktop (≥768px) only.
- Mobile: the deck becomes a native horizontal swipe strip.
- Reduced motion: static stacked list; all reveals render final-state;
  the hero scrub shows its first frame only, unpinned.
- Anti-list rows draw a cobalt strikethrough on hover; buttons do a hard
  shadow shift (translate 3px, shadow shrinks) — never a soft fade.

## Replacing images

Swap the files in `assets/` keeping the same filenames, or use the lab's
Upload panel — the component resolves images through `useCustom()` keys
`work-1`, `work-2`, `work-3`, `detail`. The hero is a 72-frame scrubbed
sequence (`assets/frames/frame-001.jpg … frame-072.jpg`), not a single
uploadable image. Keep replacements on-palette
(cream `#FAF6EC` / ink `#191713` / cobalt `#2B4BD3`) with abstract or blurred
type only — no legible text, no watermarks.

## Tokens

Scoped to `.tpl-design-04-witty` (never `:root`):

| Token | Value |
|---|---|
| `--color-background` | `#FAF6EC` cream |
| `--color-surface` | `#F0EAD8` |
| `--color-card` | `#FFFDF7` |
| `--color-primary` | `#191713` ink |
| `--color-secondary` | `#57503F` |
| `--color-accent` | `#2B4BD3` cobalt |
| `--color-text` | `#211E17` |
| `--color-muted` | `#8F8875` |
| `--font-display` | Bricolage Grotesque |
| `--font-body` | Space Mono |

The customizer rewrites these live; the font link id is
`tpl-font-design-04-witty`.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero` (line + punch word),
`lines.items[]` (`text` + `punch` substring), `work.cases[]`
(`worked` / `flopped` captions; set `noImage: true` for the typographic
cobalt card), `wontdo.items[]` (`text` + `why`), `studio.team[]`
(`name` / `role` / `flaw`), `contact` (response-time promise, checklist,
address), `footer`.

## Deploy

Export with `tools/export-template.mjs` for a standalone Vite build
(`vite build` clean), then host `dist/` anywhere static.
