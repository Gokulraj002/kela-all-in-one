import { useRef, useCallback } from 'react';

/* useTplScope — attach rootRef to your template's root element.
   scroller() returns the platform's scroll container (.tpl-scope) or
   `window` in standalone dev. Pass it as ScrollTrigger's `scroller`
   on every trigger so reveals work inside the ATELIER viewer.

   Example:
     const { rootRef, scroller } = useTplScope();
     useLayoutEffect(() => {
       const ctx = gsap.context(() => {
         gsap.utils.toArray('.rv').forEach((el) => {
           gsap.fromTo(el, { opacity: 0, y: 36 }, {
             opacity: 1, y: 0, duration: 1, ease: 'power3.out',
             scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
           });
         });
       }, rootRef);
       return () => ctx.revert();
     }, []);
     return <div ref={rootRef} className="tpl-design-01-artisan">…</div>;
*/
export function useTplScope() {
  const rootRef = useRef(null);
  const scroller = useCallback(() => {
    try {
      // In the ATELIER viewer .tpl-scope is the scroll container. In a
      // standalone export the wrapper div is NOT scrollable (the page scrolls
      // on window) — only return it when it can actually scroll, otherwise
      // ScrollTrigger would listen to scroll events that never fire.
      const el = rootRef.current && rootRef.current.closest('.tpl-scope');
      if (el && el.scrollHeight > el.clientHeight + 2) return el;
    } catch (e) { /* fall through to window */ }
    return window;
  }, []);
  return { rootRef, scroller };
}
