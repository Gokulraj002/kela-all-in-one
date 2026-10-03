# design-08-spa — Kela Hotels

**Tag:** Wellness Retreat · **Mood:** Serene and slow — the slowest design in the hotel category.

A whisper-quiet spa & wellness retreat site. Still water, vast whitespace, one line of copy at a time. Cormorant Garamond (light) display + Jost body; stone ink `#3A4440` on pale travertine with aqua-sage `#8FB5A8` accents.

## Sections

1. **Hero** — infinity pool at dawn; 10s ambient video loop (still → single ripple → still), 2s fade, one line of copy: *"Arrive still. Leave lighter."*
2. **The Pause** — philosophy in three unhurried paragraphs + three principles.
3. **Programs** — 3 retreat programs (The Arrival 3-day ₹78,000 · The Turning 5-day ₹1,24,000 · The Becoming 7-day ₹1,68,000) with the **breath gallery** signature: images scale with scroll direction (down = inhale 1→1.04, 1.2s sine; up = exhale), plus a 6s ambient sine loop when idle. A program selector below reveals includes, daily rhythm, and per-night rate.
4. **Therapies** — six-treatment menu with honest pricing (₹3,600–₹9,800).
5. **The Space** — pools, gardens, bathhouse, dawn deck.
6. **A Day Here** — full daily rhythm on deep stone, 05:30 → 21:00.
7. **Begin** — booking widget: program, arrival/leave dates, guests; live night count and rate math.
8. **Visit** — practical details + contact.
9. Whisper-quiet **sticky booking bar** (dates/guests/total) + centered whisper nav with "Begin" CTA.

## Run

```bash
npm install
npm run dev
```

The template mounts inside the ATELIER viewer (`.tpl-scope`); standalone dev renders it directly.

## Structure

```
design-08-spa/
  index.jsx    — component (nav, hero, pause, programs, therapies, space, day, booking, visit, footer, booking bar)
  meta.js      — template metadata for the platform
  content.js   — all copy, programs, therapies, schedule (JSON-compatible)
  styles.css   — all styling; tokens on `.tpl-design-08-spa` only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

## Replacing images

Drop new files over the ones in `assets/` keeping the same names, or use the lab's Upload panel — image keys are `hero`, `product-0`…`product-3`, `detail` (room-1 → `product-0`, room-2 → `product-1`, room-3 → `product-2`, the ripples macro doubles as `detail` and `product-3`).

## Tokens

All design tokens live on `.tpl-design-08-spa`: `--color-primary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-deep`, `--color-text`, `--color-muted`, `--color-pale`, `--font-display`, `--font-body`. The lab customizer rewrites them live.

## Motion notes

- GSAP + ScrollTrigger, one `gsap.context` + `revert()`; `scroller()` on every trigger.
- Reveals are the slowest in the category (1.5s, sine.out, opacity-led).
- Breath gallery (§3.08): direction from `ScrollTrigger.onUpdate` drives a gsap tween (never raw scroll listeners); idle ambient loop is 6s (3s yoyo) and pauses when the section leaves the viewport.
- `prefers-reduced-motion`: fully static — no hidden content, poster image instead of video.

## Deploy

Exported as a standalone Vite template via `tools/export-template.mjs`; `npm run build` must stay clean.
