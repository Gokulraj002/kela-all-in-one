# ATELIER · Hotel & Resort — Art Direction

## Category palette logic
Hospitality sells light and material. Every design is graded around a **light condition** (golden hour, dawn, blue hour, firelight, mist) and **two honest materials** (marble+brass, teak+linen, stone+wool, concrete+glass). No generic gradients, no neon, no cheap gold — metallics only as restrained accents (#C9A24B antique brass max).

## Per-design direction

| # | Light | Materials | Display font | Body font | Primary | Accent | Image grade |
|---|-------|-----------|--------------|-----------|---------|--------|-------------|
| 01 Palace | Golden hour | Marble, brass | Cormorant Garamond | Jost | #2A1A12 deep maroon-ink | #C9A24B antique gold | Warm cinematic, deep shadows |
| 02 Beach | Pale dawn | Limewash, linen | Fraunces (light) | Inter | #3E4A4A sea-mist ink | #9DB8B0 sage | Desaturated, airy, soft |
| 03 Urban | Blue hour / neon-dusk | Concrete, brass | Archivo (Expanded feel via 700) | Space Grotesk | #14161A ink | #E8622C signal orange | High contrast, crisp |
| 04 Lodge | Firelight | Timber, wool | Fraunces | Manrope | #2E2118 bark | #C97B3F ember | Warm, honeyed, soft grain |
| 05 Haveli | Morning raking light | Sandstone, fresco pigment | Yatra One? NO — use "Rozha One" | Mada | #5A2E1E terracotta-ink | #D9A441 marigold | Ochre warmth, rich pattern |
| 06 Eco | Mist-filtered daylight | Bamboo, stone | Fraunces | Instrument Sans | #1E3226 forest ink | #7BA05B leaf | Lush greens, soft diffusion |
| 07 Business | Blue hour | Steel, glass | Archivo | Inter | #1B2A3A steel ink | #2E7CD6 confident blue | Clean, cool, precise |
| 08 Spa | Dawn stillness | Travertine, water | Cormorant Garamond (light) | Jost | #3A4440 stone ink | #8FB5A8 aqua-sage | Pale, calm, luminous |
| 09 Villas | Sunset | Teak, plaster | Cormorant Garamond | Manrope | #241D16 twilight ink | #C9A24B brass | Golden, exclusive warmth |
| 10 Noir | Night / shafts | Black glass, leather | "Cormorant Garamond" italic accents + Archivo | Space Mono? use "IBM Plex Mono" sparingly | #0C0C0E near-black | #D8D3C8 bone | Noir contrast, sodium highlights |

## Typography rules
- Display: one voice per design, never mixed. Body: quiet, highly legible.
- Google Fonts via injected `<link>` with unique id `tpl-font-<design-id>`, `display=swap`. Do NOT remove on unmount.
- No system-font stacks as display. No more than 2 families per design.

## Spacing doctrine (creative-director pass, binding)
- Section rhythm: `padding: clamp(5rem, 10vw, 9rem)` vertical; content max-widths 72–80rem with generous gutters.
- No two text blocks closer than 1.5rem; no image touching a viewport edge without intent.
- Every design gets a spacing pass BEFORE QA: check hero copy clearances, card grid gutters, section transitions, footer air, mobile 360px.
- Whitespace is a material — especially 02, 08 (vast), 01, 09 (ceremonial).

## Image direction
Photorealistic hospitality: golden-hour exteriors, real water, honest materials, shallow depth of field. 5 per design, unique across all 10, no text/watermarks/faces. If plasticky → regenerate.
