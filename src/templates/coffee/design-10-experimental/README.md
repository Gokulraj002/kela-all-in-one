# design-10-experimental — Kela Cafe

Experimental Café: an avant-garde lab-noir booking-first site. Black / cream /
persimmon; Fraunces used kinetically + Instrument Sans tracked-caps
lab-protocol labels.

## Personality
Daring · Sensory · Cryptic. The gallery piece of the category — strange, never
broken. Daring outside, usable inside the booking flow.

## Run
From the atelier repo root: `npm install`, then `npm run dev`. The template is a
self-contained React component (`index.jsx` default export).

## Structure
- `index.jsx` — the website (fixed nav + overlay menu, hero, brewing-method
  picker with flavor rings, experiment menu, sensory language, session booking
  stepper, manifesto, FAQ, footer)
- `content.js` — all copy: 4 brewing methods (temp/time/ratio/rings), experiment
  menu (prices as ₹ numbers), sensory cards, 3 session types (prices as ₹
  numbers), manifesto, FAQ, contact
- `meta.js` — contract metadata
- `styles.css` — all styling, tokens scoped to `.tpl-design-10-experimental`
- `assets/` — hero.jpg (siphon), menu-1.jpg (tasting flight), menu-2.jpg
  (nitro), menu-3.jpg (latte art), detail.jpg (bean macro)

## Signature motion
- Brewing-method picker: liquid clip-path wipe on art, staggered data rise, and
  an SVG flavor-ring visualizer that redraws per method (`originDraw` style).
- Custom cursor: desktop only, rAF lerp 0.15, expands over interactive targets,
  `pointer-events: none`, off under reduced-motion or coarse pointers.
- Overlay nav expands via circular clip-path from the menu button.
- Manifesto invert flash: a 0.15s white flash at 8% opacity, fired exactly once
  via a `once: true` ScrollTrigger, then the manifesto word-rises.
- Hero: inverted pour-wipe from the bottom, kinetic wordRise (stagger 0.12),
  static grain overlay, 20s ambient drift (pauses offscreen).

## Replacing images
Swap the five JPGs in `assets/` keeping the same filenames, or use the lab's
Upload panel (keys: `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`).

## Tokens
`--color-background #0D0C0A`, `--color-surface #16130F`,
`--color-primary #F4EDE0` (cream), `--color-secondary #8A8478` (ash),
`--color-accent #F4562A` (persimmon), `--font-display` Fraunces,
`--font-body` Instrument Sans. The customizer rewrites these live.

## content.js
JSON-compatible: brand, nav, hero, experiment.methods[4] (each with temp, time,
ratio, 4 flavor rings, tasting note), experiment.menu[4] (price numbers via
`price()`), sensory.cards[3], sessions.types[3] (price numbers), sessions.faq[3],
manifesto.lines[3], contact, footer.

## Deploy
Exported as a standalone Vite app via the lab's export tooling; needs only
`react`, `gsap`. Fonts load from Google Fonts with `display=swap`.

## Velocity-fling menu rows
The experiment menu rows ride the cursor's single rAF loop: x-offset + rotation
proportional to lerped scroll velocity (fast attack, soft spring-back when scroll
settles), staggered per row. Paused offscreen, skipped while a row's entrance reveal
is still tweening, static under reduced-motion or coarse pointers.

## Hero signature sequence
`assets/frames/frame-001.jpg`…`frame-072.jpg` ("Emulsion") play as the hero
background via the shared `<ScrollFrames>`: the 72-frame sequence is pinned
and scrubbed frame-by-frame as the visitor scrolls (`pinDistance="+=170%"`).
The ambient drift targets the ScrollFrames stage (inside the pin). Reduced
motion renders the first frame as a static print with no pin.
