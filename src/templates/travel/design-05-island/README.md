# Kela Travels — design-05-island

Beach island escapes, rendered with Scandinavian-level restraint applied to
tropical light. White space, sea-glass tones, everything breathes. The whole
site is one long exhale: fades only, a field of escape cards that drifts
sideways like flotsam as you scroll, and hairline dividers that swell and
settle like breath.

## Personality

- **Mood:** calm, luminous, weightless. No urgency anywhere — not in the copy,
  not in the motion, not in the CTAs.
- **Type:** Cormorant Garamond (light, editorial) over Outfit (quiet,
  geometric). Eyebrows are widely letterspaced; headlines never shout.
- **Palette:** sea-glass `#9CC5B8`, sand `#F2EAD8`, white `#FFFFFF`,
  deep sea `#1E3A3A` for text.

## Signature mechanic — Tide drift

The Escapes section is unpinned and scroll-linked. A wide field of escape
cards translates horizontally at a fraction of vertical scroll speed
(scrubbed `x` on the track), while each card rides its own sine-wave
vertical path via a rAF ticker:

`y = sin(scrollPos * f + phase) * amp + sin(time * 0.55 + phase * 1.7) * amp * 0.3`

Scroll velocity (from `ScrollTrigger.getVelocity()`) subtly swells the bob
amplitude, smoothed per frame and decaying when scrolling stops. Cards never
loop — they drift once across and rest. `prefers-reduced-motion` renders a
calm static grid; on mobile the same drift runs with gentler amplitude.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template is registered in the ATELIER library; open the Travel category
and pick **05 · Kela Travels**. Standalone export is assembled with
`tools/export-template.mjs`.

## Structure

```
design-05-island/
  index.jsx    — the site; TideDrift + Breath components, GSAP reveals
  meta.js      — library metadata (id, fonts, colors, features)
  content.js   — all editable copy: brand, nav, hero, 4 escapes, story,
                 journal notes, plan/contact, footer
  styles.css   — all styling, tokens scoped to .tpl-design-05-island
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

Sections: whisper-quiet centered nav · hero (`#hero`, scroll-driven frame
sequence) · escapes (`#destinations`, Tide drift) · philosophy (`#story`,
slowness + breathing divider) · journal (`#journal`) · plan/contact
(`#contact`) · footer.
Five `data-tour` stops for presentation mode.

## Replacing images

Swap any file in `assets/` keeping the name, or use the lab's Upload panel —
upload keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`
(mapped to hero.jpg, dest-1/2/3.jpg, detail.jpg). The hero background is a
scroll-driven 72-frame sequence (`assets/frames/frame-001.jpg` …
`frame-072.jpg`, scrubbed by the shared `ScrollFrames` component), so the
build stays green and the page stays light — the poster (`hero.jpg`) still
carries the hero's upload key.

## Tokens

All on `.tpl-design-05-island` (never `:root`):

| token | value |
|---|---|
| `--color-primary` | `#1E3A3A` deep sea |
| `--color-secondary` | `#9CC5B8` sea-glass |
| `--color-accent` | `#5E9A8C` |
| `--color-background` | `#FFFFFF` |
| `--color-surface` | `#F2EAD8` sand |
| `--color-text` / `--color-muted` | deep sea / 62% deep sea |
| `--font-display` / `--font-body` | Cormorant Garamond / Outfit |

The Customize panel rewrites these live.

## content.js

Plain JSON-compatible object. Escapes are `{ name, price, blurb, duration,
tag }` — prices are ₹ numbers formatted through `useCustom().price()`,
names through `productName(i, …)`, so the lab's Customize panel edits them.
Contact email/phone come from the platform's contact overrides when set.

## Deploy

Exported as a standalone Vite app (see `tools/export-template.mjs`); serve
the `dist/` output from any static host. The Google Fonts `<link>` is
injected once at runtime — keep network access to `fonts.googleapis.com`
or self-host the two families and point the link at them.
