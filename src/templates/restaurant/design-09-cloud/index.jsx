import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';

gsap.registerPlugin(ScrollTrigger);

const LANE_IMGS = { 'product-0': dish1Img, 'product-1': dish2Img, 'product-2': dish3Img };
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Inter:wght@400;500;600;700&display=swap';

/* scroll-driven frame sequence: box fold → steam burst → sticker slap (72 frames) */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* ── StickyScrubFrames · scroll-driven frame sequence (Apple-style) ──
   Non-pinning sibling of shared <ScrollFrames/>. This design's film sits in a
   2-column "how it works" grid next to the steps list, so a full pin would
   inject pin-spacer into the grid cell and stretch the whole dark panel while
   the steps sit idle. Instead the film stays sticky in its own column and the
   visitor scrubs frames 0..N-1 by scrolling through the steps (same trigger
   range as the step light-up tracker, so the sequence and the tracker stay in
   sync). Canvas logic mirrors ScrollFrames: progressive preload, cover-fit
   draw, first-frame-painted-poster behavior, reduced-motion → static frame.
   Layout contract is inline like the shared component: .sf-stage is
   position:relative with height:stageHeight — pass stageHeight="100%" so the
   stage fills the .hb-film frame. */
function StickyScrubFrames({ frames: seq = [], alt = '', scroller, stageHeight = '100%', children }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const n = Array.isArray(seq) ? seq.length : 0;
  const first = n > 0 ? seq[0] : null;

  useEffect(() => {
    if (reduced || n < 2) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // Resolve the platform scroller the same way useTplScope does.
    let getScroller = () => window;
    try {
      if (typeof scroller === 'function') getScroller = () => scroller();
      else {
        const scopeEl = wrap.closest('.tpl-scope');
        if (scopeEl && scopeEl.scrollHeight > scopeEl.clientHeight + 2) getScroller = () => scopeEl;
      }
    } catch (e) { /* window fallback */ }

    const imgs = new Array(n).fill(null);
    const loaded = new Array(n).fill(false);
    let dead = false;
    let raf = 0;
    let wanted = 0;
    let current = -1;

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
      const imgEl = imgs[use];
      const cw = canvas.width, ch = canvas.height;
      const iw = imgEl.naturalWidth || imgEl.width, ih = imgEl.naturalHeight || imgEl.height;
      if (!iw || !ih || !cw || !ch) return;
      // cover-fit
      const s = Math.max(cw / iw, ch / ih);
      const dw = iw * s, dh = ih * s;
      g.drawImage(imgEl, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
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
      im.src = seq[i];
      im.decoding = 'async';
    };

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
    };

    fitCanvas();
    // Paint frame 0 as soon as it arrives (poster-like, no blank flash).
    const t0 = setInterval(() => {
      if (dead) { clearInterval(t0); return; }
      if (loaded[0]) { draw(0); clearInterval(t0); }
    }, 50);

    // No pin: the film is sticky in its grid column; the scrub range matches
    // the step light-up tracker so the sequence plays as the steps are read.
    const grid = wrap.closest('.hb-how-grid');
    const st = ScrollTrigger.create({
      trigger: grid || wrap,
      scroller: getScroller(),
      start: 'top 75%',
      end: 'bottom 45%',
      scrub: 0.5,
      onUpdate,
      invalidateOnRefresh: true,
    });
    const onResize = () => fitCanvas();
    window.addEventListener('resize', onResize);

    return () => {
      dead = true;
      clearInterval(t0);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      try { st.kill(); } catch (e) {}
      for (let i = 0; i < n; i++) { try { if (imgs[i]) imgs[i].src = ''; } catch (e) {} }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, n]);

  if (reduced || n < 2) {
    return (
      <div ref={wrapRef} className="sf-static" style={{ position: 'relative', height: '100%' }}>
        {first ? (
          <img
            src={first}
            alt={alt}
            className="sf-static-img"
            loading="lazy"
            style={{ width: '100%', height: stageHeight, objectFit: 'cover', display: 'block' }}
          />
        ) : null}
        <div className="sf-overlay" style={{ position: 'absolute', inset: 0 }}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="sf-wrap" style={{ height: '100%' }}>
      <div className="sf-stage" style={{ position: 'relative', height: stageHeight, overflow: 'hidden' }}>
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

/* live-feel doorstep timer: ticks down, loops */
function useDoorstepTimer(start) {
  const [t, setT] = useState(start);
  useEffect(() => {
    const parts = start.split(':').map(Number);
    let s = parts[0] * 60 + parts[1];
    const id = setInterval(() => {
      s -= 1;
      if (s < 20 * 60) s = 29 * 60 + 59;
      const mm = String(Math.floor(s / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      setT(`${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, [start]);
  return t;
}

export default function Hotbox() {
  const { brand, img, currency, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;
  const email = contact.email || content.footer.email;

  const doorstep = useDoorstepTimer(content.hero.timerStart);

  useEffect(() => {
    if (!document.getElementById('tpl-font-design-09-cloud')) {
      const link = document.createElement('link');
      link.id = 'tpl-font-design-09-cloud';
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      document.head.appendChild(link);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) {
        // static completed state: counts full, stages delivered (CSS fills the bars)
        gsap.utils.toArray('.hb-lane').forEach((laneEl) => {
          const cards = gsap.utils.toArray('.hb-card', laneEl);
          const countEl = laneEl.querySelector('.js-delivered');
          if (countEl) countEl.textContent = cards.length;
          cards.forEach((card) => {
            const stage = card.querySelector('.js-stage');
            if (stage) stage.textContent = 'Delivered';
          });
        });
        return;
      }

      // hero: box bursts open — image 1.1 → 1 fast, headline slams
      gsap.fromTo('.hb-hero-media img, .hb-hero-media .a-img-ph',
        { scale: 1.12 }, { scale: 1, duration: 0.7, ease: 'power3.out' });
      gsap.fromTo('.hb-slam',
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power4.out', stagger: 0.06, delay: 0.1 });

      // generic reveals — app-snappy, everything ≤0.6s
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 26 }, {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
        });
      });

      // ── M9 · Dispatch lanes: scroll accelerates cards along each lane ──
      // ease = slow start, fast middle, settle at end (sine.inOut)
      const travelEase = gsap.parseEase('sine.inOut');
      gsap.utils.toArray('.hb-lane').forEach((laneEl) => {
        const viewport = laneEl.querySelector('.hb-lane-viewport');
        const cardsEl = laneEl.querySelector('.hb-lane-cards');
        const cards = gsap.utils.toArray('.hb-card', laneEl);
        const countEl = laneEl.querySelector('.js-delivered');
        const n = cards.length;
        const stagger = 0.12; // lead card delivers first
        // cards start staged off the right edge (45% lead-in) so every
        // viewport gets real travel — never a static row, never a marquee
        const lead = () => viewport.offsetWidth * 0.45;
        const span = () => Math.max(0, cardsEl.scrollWidth - viewport.offsetWidth) + lead();
        // per-card journey progress: 0 (kitchen) → 1 (delivered)
        const journey = (p, i) => {
          const v = p * (1 + stagger * (n - 1)) - stagger * i;
          return Math.min(1, Math.max(0, v));
        };
        ScrollTrigger.create({
          trigger: laneEl,
          scroller: sc,
          start: 'top 78%',
          end: 'bottom 38%',
          scrub: 0.5,
          onUpdate(self) {
            const p = self.progress;
            gsap.set(cardsEl, { x: lead() - travelEase(p) * span() });
            let delivered = 0;
            cards.forEach((card, i) => {
              const j = journey(p, i);
              const bar = card.querySelector('.hb-card-bar i');
              if (bar) bar.style.transform = `scaleX(${j.toFixed(3)})`;
              const stage = card.querySelector('.js-stage');
              if (stage) stage.textContent = j < 0.45 ? 'Kitchen' : j < 0.95 ? 'Rider' : 'Delivered';
              if (j >= 1) delivered += 1;
            });
            if (countEl) countEl.textContent = delivered;
          },
        });
      });

      // tracker: 3 steps light up scrubbed across the film section
      const steps = gsap.utils.toArray('.hb-step');
      ScrollTrigger.create({
        trigger: '.hb-how-grid',
        scroller: sc,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 0.4,
        onUpdate(self) {
          const p = self.progress;
          steps.forEach((step, i) => {
            step.classList.toggle('is-on', p >= (i + 1) / (steps.length + 0.5));
          });
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-09-cloud${reduced ? ' hb-reduced' : ''}`}>
      {/* ── nav: app-like ── */}
      <nav className="hb-nav" aria-label="Primary">
        <a className="hb-brand" href="#hero">{brandName}<i>HOT</i></a>
        <div className="hb-nav-links">
          {content.nav.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <a className="hb-nav-track" href={content.trackHref}>
          <span className="dot" aria-hidden="true" />
          <span className="txt">{content.trackLabel}</span>
        </a>
      </nav>

      {/* ── hero ── */}
      <header className="hb-hero" id="hero" data-tour={brandName}>
        <div className="hb-hero-copy">
          <p className="hb-eyebrow hb-slam">{content.hero.eyebrow}</p>
          <h1 className="hb-title">
            <span className="hb-slam">{content.hero.titleA}</span><br />
            <span className="hb-slam accent">{content.hero.titleB}</span>
          </h1>
          <div className="hb-hero-timer hb-slam" role="timer" aria-label={content.hero.timerLabel}>
            <span className="lbl">{content.hero.timerLabel}</span>
            <span className="t">{reduced ? content.hero.timerStart : doorstep}</span>
          </div>
          <p className="hb-sub hb-slam">{content.hero.sub}</p>
          <div className="hb-hero-chips hb-slam">
            {content.hero.chips.map((c) => <span key={c}>{c}</span>)}
          </div>
          <a className="hb-btn hb-slam" href={content.hero.ctaHref}>{content.hero.cta}</a>
        </div>
        <div className="hb-hero-media">
          <Img k="hero" src={img('hero', heroImg)} alt="Delivery box bursting open with steam" eager />
          <span className="hb-hero-flag">Sealed with steam</span>
        </div>
      </header>

      {/* ── THE LINEUP · dispatch lanes ── */}
      <section className="hb-lanes hb-sec" id="lineup" data-tour="The Lineup">
        <p className="hb-eyebrow rv">{content.lineup.eyebrow}</p>
        <h2 className="hb-title rv">{content.lineup.title}</h2>
        <p className="hb-sub rv">{content.lineup.sub}</p>
        {content.lineup.lanes.map((lane, li) => (
          <div className="hb-lane" key={lane.id}>
            <div className="hb-lane-head">
              <div>
                <h3 className="hb-lane-name">{lane.name}</h3>
                <div className="hb-lane-note">{lane.note}</div>
              </div>
              <div className="hb-lane-count" aria-live="polite">
                <b className="js-delivered">{reduced ? lane.dishes.length : 0}</b>/{lane.dishes.length} delivered
              </div>
            </div>
            <div className="hb-lane-viewport">
              <div className="hb-lane-cards">
                {lane.dishes.map((d, di) => {
                  const i = li * 3 + di;
                  return (
                    <article className="hb-card" key={d.name}>
                      <div className="hb-card-img">
                        <Img k={lane.imgKey} src={img(lane.imgKey, LANE_IMGS[lane.imgKey])} alt={productName(i, d.name)} />
                        <span className="hb-card-tag">{d.tag}</span>
                        <span className="hb-card-eta">{d.eta}</span>
                      </div>
                      <div className="hb-card-body">
                        <h4 className="hb-card-name">{productName(i, d.name)}</h4>
                        <p className="hb-card-desc">{d.desc}</p>
                        <div className="hb-card-row">
                          <span className="hb-card-price">{price(d.price)}</span>
                          <span className="hb-card-stage js-stage">{reduced ? 'Delivered' : 'Kitchen'}</span>
                        </div>
                        <div className="hb-card-bar" aria-hidden="true"><i /></div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── how it works + order film ── */}
      <section className="hb-sec" id="how" data-tour="How It Works" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
        <div className="hb-how" style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)' }}>
          <p className="hb-eyebrow rv">{content.how.eyebrow}</p>
          <h2 className="hb-title rv">{content.how.title}</h2>
          <p className="hb-sub rv">{content.how.sub}</p>
          <div className="hb-how-grid">
            <div className="hb-film rv">
              <StickyScrubFrames frames={frames} alt={content.how.filmAlt} scroller={scroller} stageHeight="100%">
                <span className="hb-film-cap"><span className="rec" aria-hidden="true" />Live · the pass</span>
              </StickyScrubFrames>
            </div>
            <ol className="hb-steps" id="track">
              {content.how.steps.map((s) => (
                <li className="hb-step" key={s.n}>
                  <span className="hb-step-n">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── combos & deals ── */}
      <section className="hb-sec" id="deals" data-tour="Combos & Deals">
        <p className="hb-eyebrow rv">{content.deals.eyebrow}</p>
        <h2 className="hb-title rv">{content.deals.title}</h2>
        <p className="hb-sub rv">{content.deals.sub}</p>
        <div className="hb-deals-grid">
          {content.deals.combos.map((c) => (
            <article className="hb-deal rv" key={c.name}>
              <span className="hb-deal-flag">{c.flag}</span>
              <p className="hb-deal-tag">{c.tag}</p>
              <h3>{c.name}</h3>
              <p>{c.desc}</p>
              <div className="hb-deal-price">
                <b>{price(c.price)}</b>
                <s>{price(c.was)}</s>
              </div>
            </article>
          ))}
        </div>
        <p className="hb-deals-note rv">{content.deals.note}</p>
      </section>

      {/* ── coverage ── */}
      <section className="hb-sec" id="coverage" data-tour="Delivery Zones" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
        <div className="hb-coverage" style={{ padding: 'clamp(2.75rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem)' }}>
          <p className="hb-eyebrow rv">{content.coverage.eyebrow}</p>
          <h2 className="hb-title rv">{content.coverage.title}</h2>
          <p className="hb-sub rv">{content.coverage.sub}</p>
          <div className="hb-zones">
            {content.coverage.zones.map((z) => (
              <div className="hb-zone rv" key={z.name}>
                <b>{z.name}</b>
                <span>{z.time}</span>
              </div>
            ))}
          </div>
          <p className="hb-coverage-note rv">{content.coverage.note}</p>
        </div>
      </section>

      {/* ── order CTA ── */}
      <section className="hb-order hb-sec" id="order" data-tour="Order Now">
        <p className="hb-eyebrow rv" style={{ justifyContent: 'center' }}>{content.order.eyebrow}</p>
        <h2 className="hb-title rv">{content.order.title}</h2>
        <p className="hb-sub rv">{content.order.sub}</p>
        <div className="rv"><a className="hb-btn" href={content.order.ctaHref}>{content.order.cta}</a></div>
        <div><span className="hb-order-promise rv">{content.order.promise}</span></div>
      </section>

      {/* ── functional footer ── */}
      <footer className="hb-footer">
        <div className="hb-footer-inner">
          <div className="hb-footer-top">
            <div>
              <p className="hb-footer-brand">{brandName}</p>
              <p className="hb-footer-meta">
                {content.footer.address}<br />
                {content.footer.phone} · <a href={`mailto:${email}`}>{email}</a><br />
                {content.footer.hours}
              </p>
            </div>
            <div className="hb-footer-cols">
              {content.footer.columns.map((col) => (
                <div key={col.title}>
                  <h4>{col.title}</h4>
                  <ul>
                    {col.links.map((l) => <li key={l}><a href="#hero">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="hb-footer-line">
            <span>{content.footer.line}</span>
            <span>Prices in {currency}. Made hot in Bengaluru.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
