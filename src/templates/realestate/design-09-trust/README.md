# design-09-trust · "Kela Estates"

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Trust-led affordable housing experience for ATELIER. Honest pricing, cost
breakup, construction proof, resident voices — warm and proof-driven, with
no luxury gloss.

## Personality

The site reads like an open ledger: a wordmark, a price per square foot,
and a builder willing to show its working. Serif display headlines
(Source Serif 4), clear Public Sans body copy, generous line-height, and a
brick/leaf/ink palette on honest white.

## Run

From the atelier root:

```bash
npm install
npm run dev
```

## Structure

```
design-09-trust/
  index.jsx    — the site; default export
  meta.js      — catalog metadata (id, name, palette, features, fonts)
  content.js   — all copy: homes, ledger lines, milestones, voices
  styles.css   — tokens scoped to .tpl-design-09-trust
  assets/      — hero.jpg, listing-1..3.jpg, detail.jpg, frames/ (72 scroll frames)
```

## Signature scroll mechanic — transparent pricing ledger

Section `#pricing` ("Where every rupee goes"). On ≥768px with motion
enabled, the ledger pins: scroll stacks the five cost lines (land,
construction, approvals, amenities, margin); each arriving line grows its
bar and counts its number up while a running total accumulates in the
sticky header. It ends with the all-in per-sqft figure and a "No hidden
charges" seal. Below 768px, or with `prefers-reduced-motion`, the ledger
renders complete and static with final numbers.

## The signature film

"The handover" plays mid-page in the STORY section (`#story`) as a
scroll-driven frame sequence via the shared `<ScrollFrames>` — hands
exchanging keys, a pull-back into a sunlit living room, settling on the
wall with the child's drawing. The section pins for `+=120%` of scroll so
the scrub feels like the handover story unfolding. Frames live in
`assets/frames/` (frame-001.jpg … frame-072.jpg, 72 frames).

## Tokens

All on `.tpl-design-09-trust` (never `:root`):

- `--color-background` #FBFAF7 · `--color-surface` #FFFFFF
- `--color-primary` #2A2620 (ink) · `--color-accent` #B4552D (brick)
- `--color-secondary` #5A7A4E (leaf) · `--color-text` #2A2620
- `--color-muted` #6F6557 · `--color-line` #E4DDCC · `--color-paper` #F4F0E6
- `--font-display` 'Source Serif 4' · `--font-body` 'Public Sans'

## Replacing images

Drop new JPGs into `assets/` keeping the same filenames (or update the
`imgForKey` map in `index.jsx`). Keys: `hero`, `product-0` (2BHK),
`product-1` (construction), `product-2` (courtyard), `detail` (door detail). The handover story is 72 JPG frames in
`assets/frames/` (frame-001.jpg … frame-072.jpg); the scroll scrub in
`index.jsx` reads them via `import.meta.glob`.

## content.js

Plain JSON-compatible object: brand, nav, hero, homes (prices are numbers
in ₹, formatted with `price()`), pricing lines (per-sqft amounts), progress
milestones, film copy, resident quotes, contact, footer.
