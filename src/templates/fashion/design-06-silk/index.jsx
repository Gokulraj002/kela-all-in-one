import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-silk';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300..700;1,6..96,300..700&family=Manrope:wght@300;400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>
   A real space sits between the masks — inline-blocks alone render
   "Silk,pouredlikelight." with no gaps between the words. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`rm-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/* ---------- drapeSim wave geometry (module scope, pure) ---------- */
const DRAPE_W = 1200;
const DRAPE_H = 260;
const DRAPE_BASE = 130;
const DRAPE_PHASE = 0.8;
const drapeY = (x, amp) =>
  DRAPE_BASE + amp * Math.sin((x / DRAPE_W) * Math.PI * 3 + DRAPE_PHASE);
function drapePathD(amp) {
  const N = 56;
  let d = `M 0 ${DRAPE_H} L 0 ${drapeY(0, amp).toFixed(1)}`;
  for (let i = 1; i <= N; i++) {
    const x = (i / N) * DRAPE_W;
    d += ` L ${x.toFixed(1)} ${drapeY(x, amp).toFixed(1)}`;
  }
  return `${d} L ${DRAPE_W} ${DRAPE_H} Z`;
}
const DRAPE_STATIC_D = drapePathD(26); // reduced-motion / mobile resting drape
const FLECKS = Array.from({ length: 14 }, (_, i) => {
  const x = 70 + i * 76;
  return { x, y: drapeY(x, 26), r: i % 3 === 0 ? 3.6 : 2.4 };
});

const PRODUCT_IMAGES = [look1Img, look2Img, look3Img];

export default function ReshamMaison() {
  const { brand, img, productName, price, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const zariRef = useRef(null);
  const drapePinRef = useRef(null);
  const drapePathRef = useRef(null);
  const drapeFlecksRef = useRef(null);
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const name = brand || content.brand.name;
  const emailAddr = (contact && contact.email) || content.contact.email;
  const insta = (contact && contact.instagram) || content.contact.instagram;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const link = document.createElement('link');
      link.id = FONT_ID;
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      // the webfont changes text heights: re-measure every trigger once it lands
      link.addEventListener('load', () => {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      });
      document.head.appendChild(link);
    }
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    const root = rootRef.current;
    const el = root && root.querySelector(href);
    if (!el) return;
    const sc = scroller();
    const lenis = sc && sc.__lenis;
    if (lenis && !reduced) {
      lenis.scrollTo(el);
      return;
    }
    const behavior = reduced ? 'auto' : 'smooth';
    if (sc === window) {
      el.scrollIntoView({ behavior });
      return;
    }
    const scRect = sc.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    sc.scrollTo({ top: sc.scrollTop + (elRect.top - scRect.top), behavior });
  };

  /* ScrollFrames builds its pin in a child effect, after the triggers below
     were measured. Re-sort + re-measure once everything is mounted and when
     the webfonts land, so triggers sit in document order (viewer + export). */
  useEffect(() => {
    let alive = true;
    const remeasure = () => {
      if (!alive) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const raf = requestAnimationFrame(remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure).catch(() => {});
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced) return; // static, fully-visible layout; CSS handles the rest
    const sc = scroller();
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      /* Hero: near-black hold 0.6s, then the silk pour unfolds frame by frame
         as the visitor scrolls (ScrollFrames, pinned +=170%); copy rises
         beneath it; the zari thread count ticks in. Total ≤ 3.5s. */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.fromTo(
        '.rm-hero-title .wi',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.1, stagger: 0.09 },
        1.3
      );
      heroTl.fromTo(
        '.rm-hero-fade',
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.12 },
        1.5
      );
      const z = { v: 0 };
      heroTl.to(
        z,
        {
          v: content.hero.zariCount,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            if (zariRef.current)
              zariRef.current.textContent = Math.round(z.v).toLocaleString('en-IN');
          },
        },
        1.7
      );

      /* drapeSettle — the house reveal: cloth falls into place, 1.4s */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: -36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* foldUnfold — images open from a fold line, inner silk drifts 6% */
      gsap.utils.toArray('.rv-img').forEach((frame) => {
        const inner = frame.querySelector('.a-img');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
        });
        tl.fromTo(
          frame,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' }
        );
        if (inner)
          tl.fromTo(inner, { yPercent: 6 }, { yPercent: 0, duration: 1.6, ease: 'power4.inOut' }, 0);
      });

      /* The category's single parallax allowance: flagship silk drifts -6% */
      const flagship = rootRef.current && rootRef.current.querySelector('.rm-flagship-frame');
      if (flagship) {
        gsap.fromTo(
          flagship,
          { yPercent: 4 },
          {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: '.rm-collection',
              scroller: sc,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      /* Film-cut beats: a 0.8s black dip at two section boundaries, max */
      gsap.utils.toArray('.rm-cut').forEach((marker) => {
        ScrollTrigger.create({
          trigger: marker,
          scroller: sc,
          start: 'top 72%',
          once: true,
          onEnter: () =>
            gsap.fromTo(
              '.rm-veil',
              { opacity: 0 },
              { opacity: 1, duration: 0.4, yoyo: true, repeat: 1, ease: 'power1.inOut', overwrite: 'auto' }
            ),
        });
      });

      /* drapeSim — the signature. Pinned silk panel (desktop only):
         scroll scrubs the wave amplitude 8 → 46 → 14; a champagne sheen
         translates across; zari flecks brighten with amplitude.
         ONE <path> d-rewrite per scrub tick — nothing else moves per tick. */
      mm.add('(min-width: 768px)', () => {
        const wave = { amp: 8 };
        const path = drapePathRef.current;
        const flecks = drapeFlecksRef.current;
        const draw = () => {
          if (path) path.setAttribute('d', drapePathD(wave.amp));
        };
        draw();
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: drapePinRef.current,
            scroller: sc,
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onUpdate: () => {
              draw();
              if (flecks)
                flecks.setAttribute('opacity', (0.15 + 0.85 * (wave.amp / 46)).toFixed(3));
            },
          },
        });
        tl.to(wave, { amp: 46, duration: 0.55, ease: 'sine.inOut' }, 0)
          .to(wave, { amp: 14, duration: 0.45, ease: 'sine.inOut' }, 0.55)
          .fromTo('.rm-drape-sheen', { xPercent: 0 }, { xPercent: 45, duration: 1, ease: 'none' }, 0)
          .fromTo('.rm-drape-progress span', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none' }, 0);
        return () => {
          if (path) path.setAttribute('d', DRAPE_STATIC_D);
        };
      });
    }, rootRef);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  const join = (e) => {
    e.preventDefault();
    if (email.trim()) setJoined(true);
  };

  return (
    <div ref={rootRef} className="tpl-design-06-silk">
      <div className="rm-veil" aria-hidden="true" />

      <nav className="rm-nav" aria-label="Primary">
        <a className="rm-wordmark" href="#hero" onClick={(e) => go(e, '#hero')}>
          {name}
        </a>
        <div className="rm-nav-links">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>
              {n.label}
            </a>
          ))}
        </div>
        <a className="rm-nav-enquire" href={content.contact.whatsapp} target="_blank" rel="noreferrer">
          Enquire
        </a>
      </nav>

      {/* HERO — Silk Pour, scroll-scrubbed frame sequence */}
      <section id="hero" className="rm-hero" data-tour="Silk Pour">
        <ScrollFrames frames={frames} alt="Silk Pour — silk pouring in motion" pinDistance="+=170%" stageHeight="var(--tpl-vh, 100svh)">
          <div className="rm-hero-shade" aria-hidden="true" />
          <div className="rm-hero-copy">
            <p className="rm-eyebrow rm-hero-fade">{content.hero.eyebrow}</p>
            <h1 className="rm-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="rm-hero-sub rm-hero-fade">{content.hero.sub}</p>
            <p className="rm-hero-cta rm-hero-fade">
              <a className="rm-btn" href="#collection" onClick={(e) => go(e, '#collection')}>
                {content.hero.cta}
              </a>
            </p>
            <p className="rm-hero-zari rm-hero-fade">
              <span className="rm-zari-count" ref={zariRef}>
                {reduced ? content.hero.zariCount.toLocaleString('en-IN') : '0'}
              </span>{' '}
              {content.hero.zariCaption}
            </p>
          </div>
        </ScrollFrames>
      </section>

      {/* PHILOSOPHY */}
      <section id="story" className="rm-section rm-phil" data-tour="Philosophy">
        <p className="rm-eyebrow rv">{content.philosophy.eyebrow}</p>
        <h2 className="rm-title rv">{content.philosophy.title}</h2>
        {content.philosophy.lines.map((line, i) => (
          <p className="rm-manifesto rv" key={i}>
            {line}
          </p>
        ))}
        <div className="rm-stats rv">
          {content.philosophy.stats.map((s) => (
            <div className="rm-stat" key={s.label}>
              <p className="rm-stat-value">
                {s.value}
                <span className="rm-stat-unit">{s.unit}</span>
              </p>
              <p className="rm-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rm-cut" aria-hidden="true" />

      {/* COLLECTION */}
      <section id="collection" className="rm-section rm-collection" data-tour="The Collection">
        <p className="rm-eyebrow rv">{content.collection.eyebrow}</p>
        <h2 className="rm-title rv">{content.collection.title}</h2>
        <p className="rm-lede rv">{content.collection.sub}</p>
      </section>

      {/* DRAPESIM — pinned silk panel */}
      <section className="rm-drape" aria-label="Silk drape simulator">
        <div ref={drapePinRef} className="rm-drape-pin">
          <div className="rm-drape-stage">
            <svg
              className="rm-drape-svg"
              viewBox={`0 0 ${DRAPE_W} ${DRAPE_H}`}
              preserveAspectRatio="none"
              role="img"
              aria-label="A wave of champagne silk that rises and settles as you scroll"
            >
              <defs>
                <linearGradient id="rm-drape-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: 'var(--color-primary)' }} stopOpacity="0.55" />
                  <stop offset="100%" style={{ stopColor: 'var(--color-primary)' }} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                ref={drapePathRef}
                className="rm-drape-wave"
                d={DRAPE_STATIC_D}
                fill="url(#rm-drape-grad)"
              />
              <g ref={drapeFlecksRef} className="rm-drape-flecks" opacity="0.6">
                {FLECKS.map((f, i) => (
                  <circle key={i} cx={f.x} cy={f.y.toFixed(1)} r={f.r} />
                ))}
              </g>
            </svg>
            <div className="rm-drape-sheen" aria-hidden="true" />
            <p className="rm-drape-caption">{content.collection.drapeCaption}</p>
            <div className="rm-drape-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* MUSEUM PIECES */}
      <div className="rm-pieces">
        {content.products.map((p, i) => (
          <article className="rm-piece" key={p.name}>
            <div className={`rm-piece-frame rv-img${i === 0 ? ' rm-flagship-frame' : ''}`}>
              <Img k={p.imgKey} src={img(p.imgKey, PRODUCT_IMAGES[i])} alt={p.alt} />
            </div>
            <p className="rm-piece-run rv">{p.run}</p>
            <h3 className="rm-piece-name rv">{productName(i, p.name)}</h3>
            <p className="rm-piece-note rv">{p.note}</p>
            <dl className="rm-piece-data rv">
              <div>
                <dt>Silk</dt>
                <dd>{p.fabric}</dd>
              </div>
              <div>
                <dt>Zari</dt>
                <dd>{p.zari}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{p.length}</dd>
              </div>
            </dl>
            <p className="rm-piece-price rv">{price(p.price)}</p>
            <p className="rv">
              <a className="rm-btn rm-btn-quiet" href={content.contact.whatsapp} target="_blank" rel="noreferrer">
                Enquire on WhatsApp
              </a>
            </p>
          </article>
        ))}
      </div>

      <div className="rm-cut" aria-hidden="true" />

      {/* PROVENANCE */}
      <section id="provenance" className="rm-section rm-prov" data-tour="Provenance">
        <p className="rm-eyebrow rv">{content.provenance.eyebrow}</p>
        <h2 className="rm-title rv">{content.provenance.title}</h2>
        <div className="rm-prov-grid">
          {content.provenance.cards.map((c) => (
            <div className="rm-prov-card rv" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
        <figure className="rm-detail-band rv-img">
          <Img k="detail" src={img('detail', detailImg)} alt={content.provenance.imgAlt} />
          <figcaption>Mulberry silk, woven thread by thread — macro</figcaption>
        </figure>
      </section>

      {/* DRAPE RITUAL */}
      <section id="drape" className="rm-section rm-ritual" data-tour="The Drape">
        <p className="rm-eyebrow rv">{content.drape.eyebrow}</p>
        <h2 className="rm-title rv">{content.drape.title}</h2>
        <p className="rm-lede rv">{content.drape.sub}</p>
        <div className="rm-steps">
          {content.drape.steps.map((s) => (
            <div className="rm-step rv" key={s.num}>
              <p className="rm-step-num">{s.num}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVATE CIRCLE */}
      <section id="salon" className="rm-section rm-salon" data-tour="Private Circle">
        <p className="rm-eyebrow rv">{content.salon.eyebrow}</p>
        <h2 className="rm-title rv">{content.salon.title}</h2>
        <p className="rm-lede rv">{content.salon.body}</p>
        {joined ? (
          <p className="rm-salon-done rv">{content.salon.done}</p>
        ) : (
          <form className="rm-salon-form rv" onSubmit={join}>
            <label className="rm-sr" htmlFor="rm-email">
              Email address
            </label>
            <input
              id="rm-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={content.salon.placeholder}
              className="rm-field"
            />
            <button type="submit" className="rm-btn">
              {content.salon.button}
            </button>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="rm-footer">
        <p className="rm-footer-brand">{name}</p>
        <p className="rm-footer-line">{content.footer.line}</p>
        <p className="rm-footer-contact">
          <a href={`mailto:${emailAddr}`}>{emailAddr}</a>
          <span aria-hidden="true"> · </span>
          <a href={insta} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </p>
        <p className="rm-footer-meta">
          {content.contact.address} — {content.contact.hours}
        </p>
        <p className="rm-footer-legal">{content.footer.legal}</p>
      </footer>
    </div>
  );
}
