# ScrollFrames Conversion Guide (for category coordinators)

The client wants every signature video replaced by a **scroll-driven frame-by-frame
sequence** (Apple-style): as the visitor scrolls, the "video" plays frame by frame.
This also cuts ~60% of media weight.

## What is already done (parent)

1. **Shared component**: `src/templates/_shared/ScrollFrames.jsx` (exported from
   `src/templates/_shared/index.js`). Canvas-based, pinned scrub, progressive
   preload, reduced-motion → static first frame, `scroller()`-aware,
   `gsap.context` + `revert()` cleanup. Read it before starting.
2. **Frames extracted**: every design's `hero-loop.mp4` → `assets/frames/frame-001.jpg`
   … `frame-072.jpg` (72 frames, 640px wide). The mp4s are still on disk; **your
   builders delete each mp4 only after the design no longer references it**.

## Per-design conversion steps

1. In `index.jsx`, remove the `LoopVideo` hero usage and the mp4 import.
2. Load frames with Vite glob (place near other imports):
   ```js
   const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
   const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);
   ```
3. Replace the hero video element with:
   ```jsx
   <ScrollFrames frames={frames} alt="<what the clip shows>" pinDistance="+=170%">
     {/* existing hero overlay: eyebrow, headline, CTA — keep as-is */}
   </ScrollFrames>
   ```
   For non-hero sections (shorter), pass `stageHeight="80svh"` (or what fits).
   Layout (stage/canvas/overlay positioning) is inline in the component —
   no stylesheet work needed for the frame stage itself.
4. CSS: only make sure your overlay children position correctly inside
   `.sf-overlay` (absolute inset 0). Do not set heights on `.sf-stage`.
5. If the video was NOT in the hero (check each design!):
   - restaurant design-09-cloud (order-section film), fashion design-05-slow /
     design-08-tailor (craft section), realestate design-04-plots (interlude),
     design-05-heritage (ritual), design-09-trust (story) — ScrollFrames works in
     any section; adapt the pin to that section. Keep the section's meaning.
6. Delete `assets/hero-loop.mp4` once nothing imports it. Keep poster JPGs.
7. Keep `data-tour` stops; add one on the scrub section if missing.
8. Reduced motion is handled by the component — verify the static frame shows.

## Constraints (same contract as before)

- Tokens scoped to `.tpl-<design-id>`; no `:root`.
- Imports: react, gsap, local files, `../../_shared` only.
- `useTplScope` / `useCustom` / `Img` as before; `import.meta.glob` is allowed.
- Spacing pass: the pinned hero changes rhythm — re-check whitespace above/below.
- No lorem, no emojis, no generic gradients.

## QA per design (all must pass)

- `npm run build` clean (platform) + standalone export builds via
  `node tools/export-template.mjs <category> <design-id>` (regenerate all 10 zips).
- Frames advance smoothly on scroll in both directions; no blank canvas flash.
- First frame visible immediately (poster-like); overlay text legible over frames.
- Reduced-motion: static frame, no pin, all content visible.
- Mobile (360px): pin works, canvas cover-fits, overlay doesn't crowd.
- Confirm the mp4 is deleted and not referenced anywhere (`grep -r hero-loop`).
- Thumbnails: `public/templates/<cat>/<id>/thumb.webp` (960px wide).

## Report

Per design: converted / QA pass / mp4 deleted / export zip rebuilt / notes.
Flag any design where the video placement made the scrub feel wrong and what
you did instead.
