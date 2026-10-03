# Kela Travels — design-01-luxury

**Ultra-exclusive luxury tour operator.** Cinematic, quiet, precise. A private
travel atelier: private charters, after-hours museum entries, villas that
never appear on booking sites.

## Design personality

Full-bleed cinematic chapters with museum spacing — ink navy
(`#101820`), champagne (`#C9A961`), ivory (`#F6F1E7`). Cormorant Garamond
display type with masked word-rise headlines; Jost body copy with wide,
hushed eyebrows. The centerpiece is **The Grand Itinerary**: a pinned section
where an SVG route line draws across the viewport on scroll-scrub while four
destination cards dock sequentially at waypoints along the path (scale 0.8→1,
fade in, pulse ring on arrival). Desktop pin is gated behind
`gsap.matchMedia('(min-width: 768px)')` so it's resize-safe; mobile and
`prefers-reduced-motion` get an elegant stacked card list with everything
fully visible.

Sections: nav → hero (10s looping aerial video, "The Approach") → The Grand
Itinerary → Philosophy/Craft → Guest Words (ivory chapter) → Enquire (contact)
→ footer. Tour stops: Welcome, The Grand Itinerary, The Philosophy,
Guest Words, Enquire.

## Run

From the atelier repo root:

```bash
npm install
npm run dev
```

Then open the ATELIER viewer and pick Travel → **01 · Kela Travels**.

## Structure

```
design-01-luxury/
  index.jsx    — the site; WaypointCard + Grand Itinerary mechanic + sections
  meta.js      — id/name/tag/fonts/colors for the library
  content.js   — ALL editable copy: brand, nav, hero, 4 destinations, craft,
                 testimonials, contact, footer
  styles.css   — all styling; tokens on .tpl-design-01-luxury only
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/ (72 scroll-scrub JPGs)
  README.md
```

## Replacing images

Swap the JPGs in `assets/` keeping the same filenames (`hero.jpg`,
`dest-1.jpg`, `dest-2.jpg`, `dest-3.jpg`, `detail.jpg`). The hero motion is a
scroll-driven frame sequence: 72 zero-padded JPGs in `assets/frames/`
(`frame-001.jpg` … `frame-072.jpg`), played frame-by-frame as the visitor
scrolls (see the shared `ScrollFrames` component). To re-skin the sequence,
replace the frames keeping the same filenames and count.
Upload keys for the Customize panel: `hero`, `product-0`, `product-1`,
`product-2`, `detail` (the 4th destination card reuses the `hero` key — a
yacht charter, so the aerial yacht shot is the right visual). Keep images
photorealistic, on-palette (ink-navy shadows, champagne-gold highlights),
no text/watermarks/faces. The scroll frames should be ~640px wide JPGs,
sequential and seamless-loop in feel.

## Tokens

```css
.tpl-design-01-luxury {
  --color-primary: #101820;   /* ink navy */
  --color-accent: #c9a961;    /* champagne */
  --color-ivory: #f6f1e7;
  --color-text: #f6f1e7;
  --color-muted: rgba(246, 241, 231, 0.62);
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Jost', sans-serif;
}
```

Every color/font in `styles.css` comes from these vars. The platform
customizer rewrites them live. Never write to `:root`.

## content.js

Plain JSON-compatible object. Destinations are `{ name, price, duration, tag,
blurb }` — `price` is a ₹ number rendered through the customizer's
`price()`; `name` through `productName(i, fallback)` so renames work in the
lab. Contact form composes a `mailto:` to `contact.email` — no backend.

## Deploy (standalone export)

The folder is self-contained: `index.jsx` imports only `./content.js`,
`./styles.css`, `./assets/*`, `../../_shared/*`, `react`, `gsap`,
`gsap/ScrollTrigger`. The export assembler copies the folder + `_shared`
into a standalone Vite app; the mp4 is loaded via dynamic `import()` so the
build stays green if the clip is ever missing (poster carries the hero).

## Motion notes

- All ScrollTriggers use `scroller()` (the platform scrolls `.tpl-scope`,
  not window) and live inside `gsap.context` + `revert()` cleanup.
- Waypoint positions are computed from the SVG path's true length
  (`getTotalLength` / `getPointAtLength`), so the line always meets the
  dots exactly; card sides alternate by which half of the map the waypoint
  lands on.
- Reduced motion: no pin, no line draw, no docking — static stacked layout.
