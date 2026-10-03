# Kela Cafe — design-08-ecommerce

**Personality:** Clean · Confident · Commercial. Shelf-density commerce for shoppers who
compare — faceted discovery, quick-add everywhere, a cart drawer one tap away.

**Run it:** from `~/workspace/atelier/` — `npm install`, then `npm run dev`. The template
also renders standalone inside the ATELIER viewer and in the exported zip.

**Structure**
```
design-08-ecommerce/
  index.jsx    — the store: nav, promo hero, categories, sticky filters, grid, reviews, guides, footer
  meta.js      — contract meta (id, palette, features…)
  content.js   — all copy + 12 products with ₹ prices
  styles.css   — tokens scoped to .tpl-design-08-ecommerce
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg (+ menu-3.jpg, detail.jpg pending — see below)
```

**Signature interactions**
- **Quick-view FLIP:** clicking "Quick view" measures the card image's exact rect, mounts
  a flying image at that rect, and tweens it (`power3.inOut`, 0.5 s) into the modal's
  image slot while the modal shell fades in. Closing reverses the tween back to the
  exact card before unmounting.
- **Faceted filters:** roast / taste / origin / price facets with live counts, search,
  and sort in a sticky toolbar. Filter commits run a FLIP-lite re-flow — cards exit in
  0.22 s, the grid re-renders, cards rise back in with 0.03 stagger (under 0.6 s total).
- **Cart drawer (demo):** slides from the right (`power4.out`, 0.45 s) with backdrop
  fade; quantity steppers, subtotal, demo checkout note.
- **Micro-interactions:** quick-add morphs to a green "Added" check (0.3 s), wishlist
  heart pops (`back.out(3)`), cart count pops on add.

**Known gap — two images pending:** the media tool failed to generate `menu-3.jpg`
(gift set, boxed) and `detail.jpg` (packaging label close-up) due to a transient worker
disconnect, and the failure policy forbade retrying those requests in-session. The code
imports only `hero.jpg`, `menu-1.jpg`, `menu-2.jpg`; category tiles and guide cards were
designed to need no further imagery. To complete the set, regenerate those two shots
into `assets/` and they will be picked up by the `menu-3` / `detail` upload keys —
no code changes needed.

**Tokens** (on `.tpl-design-08-ecommerce`): white `#FFFFFF`, surface `#F5F1EA`,
espresso `#2A2019`, cocoa `#6B563E`, caramel `#C08B4D`, text `#2A2019`, muted `#98908A`;
`--font-display: 'Bodoni Moda'`, `--font-body: 'Inter'`. Nothing hardcoded; the
customizer rewrites these live.

**Replace images:** drop new files over `assets/*.jpg`, or use the lab's Upload panel
(keys: `hero`, `menu-1`, `menu-2`). All imagery goes through `<Img>` with skeleton +
elegant fallback.

**Reduced motion:** modal and drawer appear without FLIP/slide, grid re-renders
instantly, batched reveals are static — every product, price, and filter stays usable.

**Coverflow discovery rail (signature product layer):** a scrub-driven, pinned
coverflow between the categories and the shelf — the six highest-rated products spin
through a 3D rail as you scroll (centered card faces forward at full scale, neighbors
rotateY and shrink with distance from center). Dots + current-product label update from
the scrub. Desktop only (pinned, `gsap.matchMedia` ≥768px); mobile gets a native
scroll-snap swipe row, reduced-motion gets a static grid. Filters, quick-add, and the
quick-view FLIP are untouched — rail cards quick-view from their own rect.

**Signature film:** "The pour" is a scroll-driven frame sequence (`assets/frames/`,
72 JPGs) beside the product grid — pinned beside the grid on desktop (16/9 strip
above the grid on mobile), frames advance as the visitor scrolls the shelf via the
shared `<ScrollFrames>`; reduced-motion gets the static first frame.
