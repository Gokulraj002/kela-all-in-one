import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from './CustomContext';

/* LoopVideo — signature cinematic loop with layered fallbacks.
   - <video muted autoplay loop playsinline preload="metadata" poster>
   - pauses when offscreen (IntersectionObserver)
   - reduced-motion → poster image only (no video element at all)
   - on video error → video hides, poster image remains
   Usage:
     import heroLoop from './assets/hero-loop.mp4';
     import { LoopVideo } from '../../../_shared';
     <LoopVideo src={heroLoop} poster={heroImg} alt="Espresso extracting" className="my-hero-video" />
*/
export function LoopVideo({ src, poster, alt = '', className = '', style }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    let io = null;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            try {
              if (e.isIntersecting) { v.play().catch(() => {}); }
              else { v.pause(); }
            } catch (err) { /* ignore */ }
          });
        },
        { threshold: 0.15 }
      );
      io.observe(v);
    } catch (e) { /* IO unavailable: leave playing */ }
    return () => { try { io && io.disconnect(); } catch (e) {} };
  }, [reduced]);

  if (reduced || !src) {
    return (
      <span className={`a-loopvideo ${className || ''}`} style={style}>
        <img src={poster} alt={alt} loading="lazy" className="a-loopvideo-poster" />
      </span>
    );
  }
  return (
    <span className={`a-loopvideo ${className || ''}`} style={style}>
      <img src={poster} alt="" aria-hidden="true" loading="lazy" className="a-loopvideo-poster" />
      <video
        ref={ref}
        className="a-loopvideo-video"
        muted autoPlay loop playsInline preload="metadata" poster={poster}
        aria-label={alt}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="a-loopvideo-alt" role="img" aria-label={alt} />
    </span>
  );
}
