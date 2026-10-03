# Kela Fashion — design-03-bridal · Bridal Couture

Opulent bridal-couture storefront for the ATELIER fashion category. Cinematic
kumkum-maroon ground, ivory-gold type, zari accents used sparingly — one glint
per section. Conversion is the **private appointment**; the trousseau builder
is the secondary funnel.

## Personality

Regal · Ceremonial · Unhurried. Motion moves like a dupatta in still air —
slow arcs, glowing edges, colour as the main event.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # open the ATELIER viewer and pick "Kela Fashion" (bridal design)
```

The template is self-contained; the standalone export bundles `index.jsx`,
`content.js`, `styles.css` and `assets/` with the `_shared` primitives.

## Structure

```
design-03-bridal/
  index.jsx      — the site (nav, hero, color chapters, trousseau builder,
                   craft, appointments, atelier, footer, mobile sticky bar)
  meta.js        — platform metadata (id design-03-bridal, num 03)
  content.js     — all copy, ceremonies, pieces, prices, contact (edit here)
  styles.css     — all styling; tokens on .tpl-design-03-bridal only
  assets/        — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                   frames/ (72 JPGs, "The Twirl" scroll-scrub sequence)
  README.md
```

Sections and tour stops: `hero` · `collection` (The Bridal Edit) ·
`products` (Trousseau Builder) · `craft` · `visit` (Appointments) ·
`story` (The Atelier) · footer.

## Signature pieces

- **"The Twirl"** — hero scroll-scrubbed frame sequence (72 JPG frames):
  lehenga hem twirl → zardozi macro → dupatta drift → settle. Via shared
  `<ScrollFrames>` (pins `+=170%`, scrub drives frames on canvas, first frame
  paints immediately, reduced-motion renders a static frame).
- **colorChapters** — pinned scroll (`end: '+=350%'`, `scrub: 1`) cross-tinting
  the scene Ivory → Blush → Gold → Crimson while chapter imagery crossfades,
  a dupatta edge drifts through frame, and 4 silk-thread dots fill as progress.
  Pin-gated to `≥768px` via `gsap.matchMedia`; below 768px (or with
  `prefers-reduced-motion`) the chapters stack, each keeping its own static
  tint. Chapter boundaries fire a full-viewport gold `weftWipe` page-turn.
- **Trousseau builder** — pick one look per ceremony; preview crossfades
  (0.5s), total tweens numerically (`snap: 1`, 0.6s; instant under
  reduced-motion), and the shortlist opens a prefilled **WhatsApp enquiry**
  (`wa.me/<contact.whatsapp>` — replace the template number in `content.js`).
- **Appointment scheduler** — type (In-Store 60 min / Video Call 30 min /
  Home Trial 90 min) → next-7-days pills → time slots → name/phone →
  confirmation with a booking reference. Stacks as a clean stepper on mobile.
- **Craft** — karigar adda-frame image with slow inner drift, quote, and four
  embroidery swatches (Zardozi, Dabka, Gota Patti, Nakshi) that bloom on hover.

## Tokens

```css
.tpl-design-03-bridal {
  --color-background: #311316;  /* kumkum maroon ground */
  --color-surface: #421A1E;     /* ceremony panels, couture cards */
  --color-primary: #F3E3C2;     /* ivory-gold headlines */
  --color-accent: #C6A15B;      /* zari gold — details & CTAs only */
  --color-text: #F6EBD4;
  --color-muted: #A98F7B;
  --font-display: 'Cinzel', serif;
  --font-body: 'Jost', sans-serif;
}
```

Fonts load once via a Google Fonts `<link id="tpl-font-design-03-bridal">`
(`display=swap`). Never write to `:root` — every rule is scoped under
`.tpl-design-03-bridal`.

## Replace images

Drop new files into `assets/` with the same names, or use the lab's
**Upload** panel — upload keys are `hero`, `product-0`, `product-1`,
`product-2`, `detail`. Replace the scroll sequence by swapping the JPGs in
`assets/frames/` (sorted order = playback order). All copy, prices (₹ via
`price()`), brand, and contact details live in `content.js`.

## Deploy

Export from the ATELIER viewer (**Download**), or bundle `index.jsx` +
`content.js` + `styles.css` + `assets/` with the `_shared` folder into any
React + Vite + GSAP host. `npm run build` must stay clean.
