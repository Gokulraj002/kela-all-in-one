# Kela Travels — design-07-backpack

**Personality.** Hostel-noticeboard energy with real design craft: youthful,
honest, zero pretension. Sticker-like nav, torn-ticket route deals, a crew
finder board, and hostel picks — prices printed big and upfront, because
honesty is the brand.

**Palette.** Off-black `#17181C` · teal `#1F7A78` · marigold `#E8A33D` ·
paper `#F4F1E8`. **Type.** Archivo (700/800) display + Inter body.

## Signature mechanic — the ticket-deal shuffle

The routes section (`#destinations`) is a deal board. Four perforated travel
tickets (stub edge, dashed perforation, rotated "ADMIT" microcopy, circular
price stamp) start as a **fanned stack** — rotated, overlapping, the top card
on top.

- **Desktop:** the deal zone pins; scrolling scrubs each ticket to its 2×2
  grid slot (top of the stack deals first), and as each card lands its price
  **stamp punches down** (slams from oversized to seated). Scrolling back
  re-stacks them.
- **Mobile:** the same deal, scrubbed through the section in a vertical
  sequence (no pin).
- **Reduced motion:** static grid, stamps visible — the default CSS *is* the
  dealt state, so no-JS gets the same.

The stack offsets are measured from the live layout (each card is translated
onto the first card's position), so the deal survives responsive reflow and
customizer text edits. Breakpoint swap uses `gsap.matchMedia`, and the pin is
killed/restored on resize.

## Film — "Night Train" (mid-page, not hero)

`assets/frames/frame-001.jpg` … `frame-072.jpg` (72 frames, 640px wide,
extracted from the retired night-train clip, whose mp4 has been deleted):
platform lights smear past a night-train window → dark countryside with
scattered village lights → a distant town glows on the horizon. Grade:
off-black, sodium marigold, teal glass reflection. No text, no watermarks, no
faces. The frames are scrubbed by scroll via the shared `ScrollFrames`
component (pinned `+=170%` of scroll,
`stageHeight="80svh"` for the mid-page placement, progressive preload,
reduced-motion → static first frame). The film section pins while the ride
plays frame by frame, with the story copy held as an overlay; the hero
deliberately uses the still `hero.jpg` so the film lands mid-page as a beat change.

## Run

```bash
npm install
npm run dev
```

Then open the ATELIER viewer and pick **Travel → Kela Travels (07)**.

## Structure

```
design-07-backpack/
  index.jsx    — component: nav, hero, ticket-deal routes, Night Train film,
                 crew finder + hostel picks, plan/contact, footer
  meta.js      — template metadata (contract shape)
  content.js   — all editable copy; routes carry {name, price, blurb, duration, tag}
  styles.css   — all styling; tokens scoped on .tpl-design-07-backpack
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/ (72 film frames)
  README.md
```

## Replacing images

Swap files in `assets/` keeping the names, or use the lab's Upload panel:
`hero`, `product-0/1/2` (the three route photos), `detail` (hostel bunk).
Ticket 4 reuses the `hero` key. Images are rendered through `<Img>` with
skeleton + graceful fallback; always keep meaningful `alt` text.

## Tokens

Scoped on `.tpl-design-07-backpack` — never `:root`:

- `--color-primary` (ink), `--color-secondary` (teal), `--color-accent`
  (marigold), `--color-background` (paper), `--color-surface`, `--color-text`,
  `--color-muted`, `--color-card`
- `--font-display` (Archivo), `--font-body` (Inter)

The customizer rewrites these live; every color/font in the CSS comes from
`var()`.

## content.js

Plain JSON-compatible object: brand, nav, hero, routes (4 tickets), story
(film + rituals), crew (departures + hostel picks), visit (steps + contact),
footer. Prices are numbers in ₹ rendered via the `price()` hook so currency
customization works; names via `productName()`.

## Deploy

Standalone export via the lab's exporter (`tools/export-template.mjs`):
the folder self-contains — imports only `react`, `gsap`, local files and
`../../_shared`. The mp4 is dynamically imported so the export builds even
if the clip is absent (poster carries the frame).
