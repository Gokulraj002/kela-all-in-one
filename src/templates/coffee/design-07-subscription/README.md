# Kela Cafe — design-07-subscription

**Personality:** Fresh · Reassuring · Sunny. A funnel-first coffee subscription site where
the plan builder is the hero, and reassurance copy (pause / skip / cancel) is treated as
a design material, not fine print.

**Run it:** from `~/workspace/atelier/` — `npm install`, then `npm run dev`. The template
also renders standalone inside the ATELIER viewer and in the exported zip.

**Structure**
```
design-07-subscription/
  index.jsx    — the site: nav, hero, how-it-works, plan builder, taste quiz, lineup, proof, FAQ, footer
  meta.js      — contract meta (id, palette, features…)
  content.js   — all copy + builder options + prices (₹ numbers)
  styles.css   — tokens scoped to .tpl-design-07-subscription
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
```

**Signature interaction — the plan builder**- 5 steps: method → coffee → amount → grind → frequency.
- Directional transitions: going forward, the panel enters from the right (slides left);
  going back, it enters from the left (slides right). Rapid changes cancel mid-tween
  cleanly via `overwrite: 'auto'`.
- Live numeric price: every option change retunes the per-delivery price with a 0.5 s
  GSAP numeric tween (killed and restarted on each change, `snap: 1`).
- Step-driven `roastProgress`: the 5-segment bar across the wizard fills by step state,
  never by scroll.
- Summary panel shows the live price, a first-delivery date (today + 2 days) that flips
  with a y-roll when frequency changes, and the one-tap "Start my subscription" CTA.
  On mobile the summary collapses to a sticky bottom bar with price + CTA.

**Taste quiz:** 3 questions with a step-driven progress bar; the result maps to one of
the three coffees and "Use this in my plan" applies it and jumps to the builder.

**Tokens** (on `.tpl-design-07-subscription`): cream `#F8F4E9`, surface `#EFEBDA`,
forest `#22392C`, sage `#5A6B4E`, terracotta `#C96F3F`, text `#242E22`, muted `#8B917F`;
`--font-display: 'DM Serif Display'`, `--font-body: 'Plus Jakarta Sans'`. The customizer
rewrites these live; nothing is hardcoded.

**Replace images:** drop new files over `assets/hero.jpg` etc., or use the lab's Upload
panel (keys: `hero`, `menu-1`, `menu-2`, `menu-3`, `detail`). All imagery goes through
`<Img>` with skeleton + fallback.

**Reduced motion:** steps crossfade instantly, price updates without tween, date flips
instantly, glow pulse off, scroll reveals render static — content is never hidden.

**Scroll-velocity 3D tilt (signature product layer):** lineup cards and plan-builder
option cards tilt in 3D (rotationX/rotationY) proportional to lerped scroll velocity,
easing back to flat when scrolling idles. One rAF loop, paused offscreen and when the
lineup/builder are out of view; desktop fine-pointer only; static under reduced-motion
or touch (CSS hover lifts stand down while tilt is live so GSAP owns the transform).

**Signature moment:** `assets/frames/frame-001.jpg` … `frame-072.jpg` (beans
cascading) scrub frame-by-frame in the lineup's ritual card via the shared
`<ScrollFrames>` (pinned `+=120%` scrub, progressive preload, canvas cover-fit;
reduced-motion shows the first frame as a static still). The source mp4 was removed
after conversion.
