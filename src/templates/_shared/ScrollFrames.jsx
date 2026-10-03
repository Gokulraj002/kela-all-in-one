import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './CustomContext';

gsap.registerPlugin(ScrollTrigger);

/* ScrollFrames — cinematic frame sequence scrubbed by scroll.
   Replaces LoopVideo: instead of an autoplaying video file, a JPG frame
   sequence plays frame-by-frame as the visitor scrolls (Apple-style).
   Much lighter than video, and the motion is driven by the reader.

   Structure: the component pins its stage for `pinDistance` of scroll;
   scrubbing through the pin advances frames 0..N-1 on a <canvas>.

   Props:
     frames      — array of image URLs in playback order (use import.meta.glob)
     alt         — accessible label for the sequence
     className   — extra classes on the outer wrapper
     pinDistance — ScrollTrigger end, e.g. '+=180%' (default '+=160%')
     stageHeight — CSS height of the pinned stage (default '100svh').
                   Applied inline so the stage can never collapse to zero
                   if a stylesheet forgets it; pass e.g. '80svh' for
                   non-hero sections.
     anticipatePin — passed to ScrollTrigger (default 1)
     children    — overlay content (headlines, CTAs), absolutely positioned
     onProgress  — optional (progress 0..1) => void, for overlay choreography

   Reduced motion: no pin, no scrub — first frame rendered as a static <img>.
   If frames fail to load, the first frame (or poster) stays visible.

   Usage:
     const mods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
     const frames = Object.keys(mods).sort().map(k => mods[k]);
     <ScrollFrames frames={frames} alt="Espresso extracting, frame by frame" pinDistance="+=180%">
       <div className="hero-copy">…</div>
     </ScrollFrames>

   Layout contract (all inline — no stylesheet needed):
     .sf-stage   — position:relative, height:stageHeight, overflow:hidden
     .sf-canvas  — absolute inset:0, w/h 100%
     .sf-overlay — absolute inset:0 (your overlay content goes here;
                   position its children as your design needs)
*/
/* Viewport units resolve against the browser window, but inside the ATELIER
   viewer the template scrolls in .tpl-scope, which is shorter (toolbar above).
   A 100svh stage would hang off the bottom while pinned, hiding the overlay's
   lower edge. Resolve vh/svh/dvh/lvh heights against the scroll container
   instead; standalone (no .tpl-scope) keeps the CSS value as-is. */
function useScopedHeight(wrapRef, stageHeight) {
  const [height, setHeight] = useState(stageHeight);
  useLayoutEffect(() => {
    const m = /^([\d.]+)[sdl]?vh$/.exec(String(stageHeight).trim());
    const scope = wrapRef.current && wrapRef.current.closest('.tpl-scope');
    // Standalone exports also wrap the template in .tpl-scope, but there the
    // window scrolls — only resolve against the wrapper when it is the scroller.
    const scrolls = scope && /(auto|scroll)/.test(getComputedStyle(scope).overflowY);
    if (!m || !scrolls) { setHeight(stageHeight); return undefined; }
    const pct = parseFloat(m[1]) / 100;
    const update = () => setHeight(`${Math.round(scope.clientHeight * pct)}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(scope);
    return () => ro.disconnect();
  }, [wrapRef, stageHeight]);
  return height;
}

export function ScrollFrames({
  frames = [],
  alt = '',
  className = '',
  pinDistance = '+=160%',
  stageHeight = '100svh',
  anticipatePin = 1,
  children,
  onProgress,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const scrollerFn = useRef(null);
  const height = useScopedHeight(wrapRef, stageHeight);

  const n = Array.isArray(frames) ? frames.length : 0;
  const first = n > 0 ? frames[0] : null;

  useEffect(() => {
    if (reduced || n < 2) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // Resolve the platform scroller the same way useTplScope does.
    let getScroller = () => window;
    try {
      const scopeEl = wrap.closest('.tpl-scope');
      if (scopeEl && scopeEl.scrollHeight > scopeEl.clientHeight + 2) {
        getScroller = () => scopeEl;
      }
    } catch (e) { /* window fallback */ }
    scrollerFn.current = getScroller;

    const ctx = gsap.context(() => {}, wrap);
    const imgs = new Array(n).fill(null);
    const loaded = new Array(n).fill(false);
    let dead = false;
    let raf = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fitCanvas = () => {
      const r = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        // Resizing clears the canvas — force a repaint (draw() early-returns
        // when idx === current, which would leave a blank canvas after resize).
        current = -1;
        draw(wanted);
      }
    };

    let current = -1;
    const draw = (idx) => {
      if (dead || idx === current) return;
      // Never show a blank canvas: fall back to the nearest loaded frame.
      let use = idx;
      if (!loaded[use] || !imgs[use]) {
        use = -1;
        for (let k = idx; k >= 0; k--) {
          if (loaded[k] && imgs[k]) { use = k; break; }
        }
        if (use < 0) return;
      }
      current = use;
      const g = canvas.getContext('2d');
      const img = imgs[use];
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
      if (!iw || !ih || !cw || !ch) return;
      // cover-fit
      const s = Math.max(cw / iw, ch / ih);
      const dw = iw * s, dh = ih * s;
      g.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const loadFrame = (i) => {
      if (dead || loaded[i] || imgs[i]) return;
      const im = new Image();
      imgs[i] = im;
      im.onload = () => {
        loaded[i] = true;
        // If this frame is the one we want right now, paint it.
        if (i === wanted) { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => draw(i)); }
      };
      im.onerror = () => { imgs[i] = null; };
      im.src = frames[i];
      im.decoding = 'async';
    };

    let wanted = 0;
    // Progressive preload: frame 0 first, then the rest in order, paced.
    loadFrame(0);
    let pi = 1;
    const pace = () => {
      if (dead) return;
      for (let k = 0; k < 4 && pi < n; k++, pi++) loadFrame(pi);
      if (pi < n) setTimeout(pace, 60);
    };
    setTimeout(pace, 300);

    const onUpdate = (self) => {
      wanted = Math.min(n - 1, Math.max(0, Math.round(self.progress * (n - 1))));
      loadFrame(wanted);
      // Prefetch neighbours for smooth scrubbing.
      if (wanted + 1 < n) loadFrame(wanted + 1);
      if (wanted + 2 < n) loadFrame(wanted + 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => draw(wanted));
      if (typeof onProgress === 'function') {
        try { onProgress(self.progress); } catch (e) {}
      }
    };

    fitCanvas();
    // Paint frame 0 as soon as it arrives (poster-like, no blank flash).
    const t0 = setInterval(() => {
      if (dead) { clearInterval(t0); return; }
      if (loaded[0]) { draw(0); clearInterval(t0); }
    }, 50);

    const st = ScrollTrigger.create({
      trigger: wrap,
      scroller: getScroller(),
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: 0.6,
      anticipatePin,
      onUpdate,
      invalidateOnRefresh: true,
      onRefresh: () => fitCanvas(),
    });
    const onResize = () => fitCanvas();
    window.addEventListener('resize', onResize);

    return () => {
      dead = true;
      clearInterval(t0);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      try { st.kill(); } catch (e) {}
      try { ctx.revert(); } catch (e) {}
      for (let i = 0; i < n; i++) { try { if (imgs[i]) imgs[i].src = ''; } catch (e) {} }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, n, pinDistance, height]);

  if (reduced || n < 2) {
    return (
      <div ref={wrapRef} className={`sf-static ${className || ''}`} style={{ position: 'relative' }}>
        {first ? (
          <img
            src={first}
            alt={alt}
            className="sf-static-img"
            loading="lazy"
            style={{ width: '100%', height, objectFit: 'cover', display: 'block' }}
          />
        ) : null}
        <div className="sf-overlay" style={{ position: 'absolute', inset: 0 }}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`sf-wrap ${className || ''}`}>
      <div className="sf-stage" style={{ position: 'relative', height, overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          className="sf-canvas"
          role="img"
          aria-label={alt}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
        <div className="sf-overlay" style={{ position: 'absolute', inset: 0 }}>{children}</div>
      </div>
    </div>
  );
}
