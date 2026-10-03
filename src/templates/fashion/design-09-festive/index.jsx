import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const DIWALI = new Date('2026-11-08T00:00:00+05:30');
const LOOK_SRC = { 'look-1': look1Img, 'look-2': look2Img, 'look-3': look3Img };
const WARP_COUNT = 18;
const WEFT_COLORS = ['#E07B1A', '#C2185B', '#1F7A5B', '#F5E7C6', '#B8860B', '#E07B1A', '#C2185B'];

function words(text) {
  const list = text.split(' ');
  return list.map((w, i) => (
    <React.Fragment key={i}>
      <span className="wr-mask">
        <span className="wr-word">{w}</span>
      </span>
      {i < list.length - 1 ? ' ' : null}
    </React.Fragment>
  ));
}

function Twinkles() {
  // One string of festival lights across the hero — CSS keyframes only (no rAF loop).
  const dots = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 22; i += 1) {
      const t = i / 21;
      pts.push({ left: `${6 + t * 88}%`, top: `${6 + Math.sin(t * Math.PI) * 14 + (i % 3) * 2.5}%`, d: (i * 0.23) % 2.4 });
    }
    return pts;
  }, []);
  return (
    <div className="u-twinkle" aria-hidden="true">
      {dots.map((p, i) => (
        <span key={i} className="u-tw" style={{ left: p.left, top: p.top, animationDelay: `${p.d}s` }} />
      ))}
    </div>
  );
}

function PetalRow() {
  // Marigold dots drifting down once per section entry.
  return (
    <div className="u-petals" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="u-petal" style={{ left: `${(i / 13) * 100}%`, animationDelay: `${(i * 0.09) % 1.2}s` }} />
      ))}
    </div>
  );
}

function WeaveOverlay() {
  // Single SVG overlay for weaveReveal: warp threads draw, weft bands fill, then the weave lifts.
  const warps = [];
  for (let i = 0; i < WARP_COUNT; i += 1) {
    const x = 30 + (i / (WARP_COUNT - 1)) * 940;
    warps.push(<line key={i} className="wv-warp" x1={x} y1="0" x2={x} y2="620" />);
  }
  const bands = [];
  const bh = 620 / WEFT_COLORS.length;
  WEFT_COLORS.forEach((c, i) => {
    bands.push(<rect key={i} className="wv-weft" x="0" y={i * bh} width="1000" height={bh} fill={c} />);
  });
  return (
    <div className="u-weave-overlay" aria-hidden="true">
      <svg viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" className="u-weave-svg">
        <rect x="0" y="0" width="1000" height="620" fill="#0F2B24" className="wv-base" />
        {bands}
        {warps}
      </svg>
      <p className="u-weave-caption">off the loom</p>
    </div>
  );
}

export default function UtsavFestive() {
  const { brand, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [occasion, setOccasion] = useState('all');

  const brandName = brand || content.brand.name;
  const [days] = useState(() => Math.max(0, Math.ceil((DIWALI - Date.now()) / 86400000)));

  // Fonts: this template loads its own pairing, once.
  useEffect(() => {
    if (document.getElementById('tpl-font-design-09-festive')) return;
    const link = document.createElement('link');
    link.id = 'tpl-font-design-09-festive';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Yatra+One&family=Hind:wght@300;400;500;600&display=swap';
    // the webfont changes text heights: re-measure every trigger once it lands
    link.addEventListener('load', () => {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    });
    document.head.appendChild(link);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // CSS fallback: everything rendered final & visible

      // Hero entrance: headline wordRise
      gsap.fromTo(
        '.u-hero .wr-word',
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out', delay: 0.35 }
      );
      gsap.fromTo(
        '.u-hero-fade',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.7 }
      );

      // Scroll reveals: drapeSettle at 0.9s, warm stagger
      gsap.utils.toArray('.u-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44, scale: 0.985 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 86%' },
          }
        );
      });

      // Petal-fall dividers: marigold dots drift once per section entry
      gsap.utils.toArray('.u-petals').forEach((row) => {
        const petals = row.querySelectorAll('.u-petal');
        gsap.fromTo(
          petals,
          { y: -24, opacity: 0 },
          {
            y: 84, opacity: 1, duration: 1.2, stagger: 0.09, ease: 'sine.in',
            scrollTrigger: { trigger: row, scroller: scroller(), start: 'top 92%', once: true },
            onComplete: () => gsap.to(petals, { opacity: 0, duration: 0.6, stagger: 0.02 }),
          }
        );
      });

      // Signature mechanic: weaveReveal — ONE pinned ScrollTrigger, ≥768px.
      // Overlay starts covered: warp threads draw (0→40%), weft bands fill
      // (40→80%), weave lifts away (80→100%) revealing the collection beneath.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.u-weave-pin',
            scroller: scroller(),
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
        tl.fromTo(
          '.wv-warp',
          { strokeDashoffset: 640 },
          { strokeDashoffset: 0, duration: 0.4, stagger: 0.008, ease: 'none' },
          0
        )
          .fromTo(
            '.wv-weft',
            { scaleY: 0 },
            { scaleY: 1, duration: 0.4, stagger: 0.035, ease: 'none' },
            0.4
          )
          .to(
            '.u-weave-overlay',
            { opacity: 0, yPercent: -7, duration: 0.2, ease: 'none' },
            0.8
          );
        return () => {};
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const filtered = occasion === 'all'
    ? content.products
    : content.products.filter((p) => p.occasion === occasion);

  return (
    <div ref={rootRef} className={`tpl-design-09-festive${reduced ? ' is-reduced' : ''}`}>
      {/* Countdown strip */}
      <div className="u-strip">
        <span className="u-strip-dot" aria-hidden="true" />
        <p>
          {content.hero.countdownLabel} — {days} days to go · free festive shipping ends soon
        </p>
      </div>

      {/* Nav */}
      <nav className="u-nav">
        <a className="u-wordmark" href="#hero">{brandName}</a>
        <div className="u-nav-links">
          {content.nav.map((n) => {
            const occ = { Diwali: 'diwali', Eid: 'eid', Wedding: 'wedding' }[n];
            if (occ) {
              return (
                <button
                  key={n}
                  className="u-nav-btn"
                  onClick={() => {
                    setOccasion(occ);
                    const t = rootRef.current && rootRef.current.querySelector('#edits');
                    if (!t) return;
                    const sc = scroller();
                    const lenis = sc && sc.__lenis;
                    if (lenis && !reduced) lenis.scrollTo(t);
                    else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
                  }}
                >
                  {n}
                </button>
              );
            }
            const href = n === 'The Edit' ? '#edits' : n === 'Gifting' ? '#gifting' : n === 'Visit' ? '#visit' : '#hero';
            return <a key={n} href={href}>{n}</a>;
          })}
        </div>
        <a className="u-cart" href="#edits" aria-label="Cart">Cart</a>
      </nav>

      {/* Hero — scroll-driven frames: the festive twirl plays as the visitor scrolls */}
      <header id="hero" className="u-hero" data-tour="Hero">
        <ScrollFrames frames={frames} alt="Color in Motion — festive twirl with petals" pinDistance="+=170%" stageHeight="var(--tpl-vh, 100svh)">
          <div className="u-hero-shade" aria-hidden="true" />
          <Twinkles />
          <div className="u-hero-copy">
            <p className="u-eyebrow u-hero-fade">{content.hero.eyebrow}</p>
            <h1 className="u-title">{words(content.hero.title)}</h1>
            <p className="u-sub u-hero-fade">{content.hero.sub}</p>
            <div className="u-hero-ctas u-hero-fade">
              <a className="u-btn" href="#edits">{content.hero.cta}</a>
              <a className="u-btn u-btn-ghost" href="#gifting">{content.hero.secondary}</a>
            </div>
          </div>
        </ScrollFrames>
      </header>

      {/* Festive edits — weaveReveal pinned mechanic */}
      <section id="edits" className="u-section u-weave-section" data-tour="Festive Edits">
        <div className="u-weave-pin">
          <div className="u-weave-content">
            <p className="u-eyebrow u-rv">Occasion first</p>
            <h2 className="u-h2 u-rv">The festive edit</h2>
            <p className="u-lede u-rv">Shop by occasion, not by category. Four edits, one festival season.</p>

            <div className="u-chips u-rv" role="tablist" aria-label="Filter by occasion">
              <button
                className={`u-chip${occasion === 'all' ? ' is-active' : ''}`}
                role="tab" aria-selected={occasion === 'all'}
                onClick={() => setOccasion('all')}
              >
                All
              </button>
              {content.occasions.map((o) => (
                <button
                  key={o.id}
                  className={`u-chip${occasion === o.id ? ' is-active' : ''}`}
                  role="tab" aria-selected={occasion === o.id}
                  onClick={() => setOccasion(o.id)}
                  style={{ '--chip-color': o.color }}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div className="u-grid u-rv">
              {filtered.map((p, i) => (
                <article className="u-card" key={p.name}>
                  <div className="u-card-img">
                    <Img k={`product-${content.products.indexOf(p)}`} src={[look1Img, look2Img, look3Img, heroImg][content.products.indexOf(p)]} alt={`${p.name} — ${p.desc}`} />
                  </div>
                  <div className="u-card-body">
                    <span className="u-badge">{p.badge}</span>
                    <h3>{productName(i, p.name)}</h3>
                    <p className="u-card-desc">{p.desc}</p>
                    <p className="u-card-fabric">{p.fabric}</p>
                    <div className="u-card-row">
                      <span className="u-price">{price(p.price)}</span>
                      <button className="u-shop">Shop the look</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <WeaveOverlay />
        </div>
        <PetalRow />
      </section>

      {/* Lookbook */}
      <section id="lookbook" className="u-section" data-tour="Lookbook">
        <p className="u-eyebrow u-rv">Lookbook</p>
        <h2 className="u-h2 u-rv">Worn in celebration</h2>
        <div className="u-lookstrip">
          {content.lookbook.map((l, i) => (
            <figure className="u-look u-rv" key={l.title}>
              <div className="u-look-img u-sway">
                <Img k={l.img} src={LOOK_SRC[l.img]} alt={`${l.title} — ${l.sub}`} />
              </div>
              <figcaption>
                <strong>{productName(10 + i, l.title)}</strong>
                <span>{l.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <PetalRow />
      </section>

      {/* Occasion calendar */}
      <section id="calendar" className="u-section">
        <p className="u-eyebrow u-rv">Occasion calendar</p>
        <h2 className="u-h2 u-rv">Festivals, with delivery dates</h2>
        <p className="u-lede u-rv">Cut-off dates stated plainly, so your order arrives before the first diya is lit.</p>
        <div className="u-cal">
          {content.calendar.map((c) => (
            <div className="u-cal-row u-rv" key={c.fest}>
              <div>
                <strong>{c.fest}</strong>
                <span className="u-cal-date">{c.date} · {c.edit}</span>
              </div>
              <span className="u-cal-ship">{c.ship}</span>
            </div>
          ))}
        </div>
        <PetalRow />
      </section>

      {/* Gifting */}
      <section id="gifting" className="u-section u-gift" data-tour="Gifting">
        <div className="u-gift-grid">
          <div className="u-gift-img u-rv">
            <Img k="detail" src={detailImg} alt="Gota patti embroidery macro in diya light" />
          </div>
          <div>
            <p className="u-eyebrow u-rv">Gifting</p>
            <h2 className="u-h2 u-rv">{content.gifting.title}</h2>
            <p className="u-lede u-rv">{content.gifting.body}</p>
            <div className="u-gift-list">
              {content.gifts.map((g, i) => (
                <div className="u-gift-row u-rv" key={g.name}>
                  <div>
                    <strong>{productName(20 + i, g.name)}</strong>
                    <span className="u-card-desc">{g.desc}</span>
                  </div>
                  <span className="u-price">{price(g.price)}</span>
                </div>
              ))}
            </div>
            <p className="u-note u-rv">{content.gifting.note}</p>
          </div>
        </div>
        <PetalRow />
      </section>

      {/* Visit */}
      <section id="visit" className="u-section" data-tour="Visit">
        <p className="u-eyebrow u-rv">Visit</p>
        <h2 className="u-h2 u-rv">{content.visit.title}</h2>
        <p className="u-lede u-rv">{content.visit.body}</p>
        <div className="u-visit-card u-rv">
          <address>
            {content.visit.address}
            <br />
            {content.visit.hours}
          </address>
          <div className="u-visit-contact">
            <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
            {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="u-footer">
        <p className="u-wordmark u-foot-brand">{brandName}</p>
        <p className="u-foot-cal">{content.footer.calendarNote}</p>
        <p className="u-foot-conc">{content.footer.concierge}</p>
        <p className="u-foot-line">{content.footer.line}</p>
      </footer>
    </div>
  );
}
