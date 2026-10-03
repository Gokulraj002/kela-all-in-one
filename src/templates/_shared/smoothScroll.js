import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* startSmoothScroll — inertial wheel scrolling (Lenis) driven by GSAP's ticker.

   Native wheel scrolling moves the page on the compositor before JavaScript
   runs, so every scrubbed, pinned or parallax animation lands one frame late
   and visibly shakes. Lenis moves the scroll position inside the same frame
   that ScrollTrigger updates, so scroll and animation stay locked together.

   wrapper — the scroll container (the viewer's .tpl-scope), or window for a
             standalone export.
   Returns stop(). The Lenis instance is exposed as wrapper.__lenis so other
   code (e.g. the presentation tour) can scroll through it.
   Under prefers-reduced-motion nothing is installed: native scrolling stays. */
export function startSmoothScroll(wrapper = window) {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const isWindow = wrapper === window;
  const lenis = new Lenis({
    wrapper,
    content: isWindow ? document.documentElement : wrapper.firstElementChild || wrapper,
    // Only intercept wheel/touch over the scroll container itself, so panels
    // and toolbars around it keep their own native scrolling.
    eventsTarget: wrapper,
    lerp: 0.1,
    smoothWheel: true,
    // Drawers, menus and modals with their own overflow keep scrolling natively.
    allowNestedScroll: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  wrapper.__lenis = lenis;

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    if (wrapper.__lenis === lenis) delete wrapper.__lenis;
    lenis.destroy();
  };
}
