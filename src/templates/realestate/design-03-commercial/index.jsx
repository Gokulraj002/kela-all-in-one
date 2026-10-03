import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frame sequence. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-commercial';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,600;1,400&display=swap';

/* Server-safe word-mask headline. Each word is an inline-block mask, so a
   real space is rendered between the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`nw-wm ${className}`} aria-label={text}>
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

/* Pinned blueprint section. Desktop (≥768px + motion): walls draw via
   stroke-dashoffset scrub; each completed room fades in its spec card.
   Reduced-motion / mobile: `is-static` — full plan, all cards visible. */
function PlanSection() {
  const rooms = content.plates.rooms;
  return (
    <section id="plates" className="nw-plates is-static" data-tour="Floor Plates">
      <div className="nw-wrap nw-plates-head">
        <p className="nw-eyebrow nw-rv">{content.plates.eyebrow}</p>
        <h2 className="nw-h2 nw-rv">{content.plates.title}</h2>
        <span className="nw-rule" aria-hidden="true" />
        <p className="nw-body nw-rv nw-plates-lede">{content.plates.body}</p>
      </div>

      <div className="nw-plan-pin">
        <div className="nw-plan-stage">
          <div className="nw-plan-topbar">
            <span className="nw-plan-doc">NW-TP-03 · TYPICAL PLATE · SCALE 1:200</span>
            <span className="nw-plan-room">
              ROOM <span className="nw-plan-count">01</span> / {String(rooms.length).padStart(2, '0')}
            </span>
          </div>

          <div className="nw-plan-wrap">
            <svg
              className="nw-plan-svg"
              viewBox="0 0 800 520"
              role="img"
              aria-label="Typical floor plate plan of Northgate Works with eight labeled rooms"
            >
              <defs>
                <pattern id="nw-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" className="nw-gridline" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="800" height="520" fill="url(#nw-grid)" />
              {rooms.map((r) => (
                <g key={r.id}>
                  <rect
                    className="nw-wall"
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    fillOpacity={0}
                  />
                  <text className="nw-roomlabel" x={r.x + 14} y={r.y + 30}>
                    {r.label.toUpperCase()}
                  </text>
                </g>
              ))}
              {/* scale bar */}
              <g className="nw-scalebar" aria-hidden="true">
                <rect x="600" y="496" width="176" height="6" />
                <text x="600" y="488">0</text>
                <text x="776" y="488">11 m</text>
              </g>
            </svg>

            <div className="nw-plan-cards">
              {rooms.map((r, i) => (
                <div
                  key={r.id}
                  className="nw-speccard"
                  style={{ left: r.card.left, top: r.card.top }}
                >
                  <p className="nw-speccard-num">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="nw-speccard-name">{r.label}</h3>
                  <dl className="nw-speccard-data">
                    <div><dt>Area</dt><dd>{r.area}</dd></div>
                    <div><dt>Ceiling</dt><dd>{r.ceiling}</dd></div>
                    <div><dt>Capacity</dt><dd>{r.capacity}</dd></div>
                  </dl>
                </div>
              ))}
            </div>
          </div>

          <div className="nw-plan-progress" aria-hidden="true">
            <span className="nw-plan-progress-fill" />
          </div>

          <div className="nw-plan-summary">
            {content.plates.summary.map((s) => (
              <div className="nw-stat" key={s.label}>
                <p className="nw-stat-value">
                  {s.value} <span>{s.unit}</span>
                </p>
                <p className="nw-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpacesSection() {
  const { productName, price, img } = useCustom();
  const pics = [
    { src: listing1Img, key: 'product-0', alt: 'Open-plan office floor plate with floor-to-ceiling glass and a city skyline view' },
    { src: listing2Img, key: 'product-1', alt: 'Office tower facade at dusk, a geometric grid of lit glass panels' },
    { src: listing3Img, key: 'product-2', alt: 'Minimalist boardroom with a long table in warm daylight' },
  ];
  return (
    <section id="spaces" className="nw-spaces" data-tour="Available Spaces">
      <div className="nw-wrap">
        <p className="nw-eyebrow nw-rv">{content.spaces.eyebrow}</p>
        <h2 className="nw-h2 nw-rv">{content.spaces.title}</h2>
        <span className="nw-rule" aria-hidden="true" />
        <p className="nw-body nw-rv nw-lede">{content.spaces.body}</p>
        <div className="nw-space-grid">
          {content.spaces.items.map((s, i) => (
            <article className="nw-space-card nw-rv" key={s.name}>
              <div className="nw-space-visual nw-frame">
                <Img k={pics[i].key} src={img(pics[i].key, pics[i].src)} alt={pics[i].alt} />
              </div>
              <p className="nw-space-num">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="nw-space-name">{productName(i, s.name)}</h3>
              <p className="nw-space-area">{s.area}</p>
              <p className="nw-space-rate">
                <span className="nw-space-price">{price(s.rate)}</span>
                <span className="nw-space-per"> / sq ft / month</span>
              </p>
              <p className="nw-space-desc">{s.desc}</p>
              <a className="nw-textlink" href="#contact">Enquire about this space</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Design03Commercial() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  useLayoutEffect(() => {
    /* The sticky nav's height (--nw-nav-h) keeps the hero copy and the
       pinned blueprint clear of it. */
    const root = rootRef.current;
    const navEl = root && root.querySelector('.nw-nav');
    const setNavH = () => { if (navEl) root.style.setProperty('--nw-nav-h', `${navEl.offsetHeight}px`); };
    setNavH();
    const navRO = typeof ResizeObserver !== 'undefined' && navEl ? new ResizeObserver(setNavH) : null;
    if (navRO) navRO.observe(navEl);

    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: masked word-rise headline, sub, CTAs, stat strip. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.nw-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 },
        0.2
      )
        .fromTo(
          '.nw-hero-eyebrow, .nw-hero-sub',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.55
        )
        .fromTo(
          '.nw-hero-ctas',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 },
          0.9
        )
        .fromTo(
          '.nw-hero-strip .nw-stat',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
          1.05
        );

      /* Section reveals. */
      gsap.utils.toArray('.nw-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hairline brass rules draw between sections. */
      gsap.utils.toArray('.nw-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.9, ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Blueprint draw-on: pinned plan, walls draw room by room, spec cards
         arrive at each room's position. Desktop + motion only. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = root && root.querySelector('.nw-plan-pin');
        if (!pin) return undefined;
        /* The static class lives on the section; the pinned layout sizes the
           stage to the visible scroll area below the sticky nav and moves
           the summary into a side column so the plan can stay large. */
        const section = pin.closest('.nw-plates');
        if (section) section.classList.remove('is-static');
        pin.classList.add('is-pinned');
        const summary = pin.querySelector('.nw-plan-summary');
        const walls = gsap.utils.toArray('.nw-wall', pin);
        const cards = gsap.utils.toArray('.nw-speccard', pin);
        const labels = gsap.utils.toArray('.nw-roomlabel', pin);
        walls.forEach((w) => {
          try {
            const L = w.getTotalLength();
            w.style.strokeDasharray = String(L);
            w.style.strokeDashoffset = String(L);
          } catch { /* keep wall visible */ }
        });
        const step = 1.5;
        const summaryAt = walls.length * step;
        /* Only the room being drawn shows its spec card (eight cards at
           once buried the plan); the card's text is exposed to assistive
           tech only while it is on screen, the summary once it arrives. */
        let active = -2;
        let btl = null;
        const sync = () => {
          if (!btl) return;
          const t = btl.time();
          const idx = t >= summaryAt + 0.2 ? -1 : Math.min(walls.length - 1, Math.floor(Math.max(0, t - 0.9) / step));
          if (idx === active) return;
          active = idx;
          cards.forEach((c, k) => c.setAttribute('aria-hidden', String(k !== idx)));
          if (summary) summary.setAttribute('aria-hidden', String(t < summaryAt));
        };
        /* ~330px of scroll per room (the old 1,350px per room pinned the
           plan for thirteen screens, which read as a frozen, blank page). */
        btl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: () => sync(),
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: () => `+=${Math.round(walls.length * 330 + 420)}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const n = Math.min(walls.length, Math.floor(self.progress * walls.length) + 1);
              const count = pin.querySelector('.nw-plan-count');
              if (count) count.textContent = String(n).padStart(2, '0');
              const fill = pin.querySelector('.nw-plan-progress-fill');
              if (fill) fill.style.transform = `scaleX(${self.progress.toFixed(4)})`;
            },
          },
        });
        walls.forEach((w, i) => {
          const t = i * step;
          /* explicit from/to values: nothing depends on re-recording */
          btl.to(w, { strokeDashoffset: 0, duration: 1 }, t);
          btl.fromTo(w, { attr: { 'fill-opacity': 0 } }, { attr: { 'fill-opacity': 0.08 }, duration: 0.5, immediateRender: false }, t + 0.7);
          if (labels[i]) btl.fromTo(labels[i], { opacity: 0 }, { opacity: 1, duration: 0.4 }, t + 0.8);
          if (cards[i]) {
            btl.fromTo(
              cards[i],
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              t + 0.9
            );
            /* hand over to the next room's card (the last one to the summary) */
            const out = i < walls.length - 1 ? t + step + 0.6 : summaryAt + 0.1;
            btl.fromTo(cards[i], { opacity: 1, y: 0 }, { opacity: 0, y: -10, duration: 0.3, ease: 'power2.in', immediateRender: false }, out);
          }
        });
        btl.fromTo(
          summary,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          summaryAt
        );
        /* A short hold on the finished plate before the pin releases. */
        btl.to({}, { duration: 0.6 });
        sync();
        return () => {
          pin.classList.remove('is-pinned');
          if (section) section.classList.add('is-static');
          cards.forEach((c) => c.removeAttribute('aria-hidden'));
          if (summary) summary.removeAttribute('aria-hidden');
          walls.forEach((w) => { w.style.strokeDasharray = ''; w.style.strokeDashoffset = ''; });
        };
      });
    }, rootRef);
    return () => {
      if (navRO) navRO.disconnect();
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-03-commercial">
      <header className="nw-nav">
        <a className="nw-wordmark" href="#hero">{name}</a>
        <nav className="nw-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="nw-cta nw-cta-nav" href="#specs">Download spec sheet</a>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="nw-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Morning light raking across the stone floor of the Northgate Works double-height atrium"
            pinDistance="+=170%"
          >
            <span className="nw-hero-shade" aria-hidden="true" />
            <div className="nw-hero-copy">
              <p className="nw-eyebrow nw-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="nw-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="nw-hero-sub">{content.hero.sub}</p>
              <div className="nw-hero-ctas">
                <a className="nw-cta" href={content.hero.ctaPrimary.href}>{content.hero.ctaPrimary.label}</a>
                <a className="nw-cta nw-cta-ghost" href={content.hero.ctaSecondary.href}>{content.hero.ctaSecondary.label}</a>
              </div>
            </div>
            <div className="nw-hero-strip">
              {content.hero.stats.map((s) => (
                <div className="nw-stat" key={s.label}>
                  <p className="nw-stat-value">{s.value} <span>{s.unit}</span></p>
                  <p className="nw-stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollFrames>
        </section>

        {/* FLOOR PLATES — blueprint draw-on */}
        <PlanSection />

        {/* SPACES */}
        <SpacesSection />

        {/* SPEC SHEET */}
        <section id="specs" className="nw-specs" data-tour="Spec Sheet">
          <div className="nw-wrap">
            <div className="nw-specs-grid">
              <div>
                <p className="nw-eyebrow nw-rv">{content.specs.eyebrow}</p>
                <h2 className="nw-h2 nw-rv">{content.specs.title}</h2>
                <span className="nw-rule" aria-hidden="true" />
                <p className="nw-body nw-rv nw-lede">{content.specs.body}</p>
                <div className="nw-spec-visual nw-rv nw-frame">
                  <Img k="detail" src={img('detail', detailImg)} alt="Close-up of a brushed brass handrail meeting honed stone, morning light on the metal grain" />
                </div>
                <a className="nw-cta nw-rv" href={content.specs.cta.href}>{content.specs.cta.label}</a>
              </div>
              <dl className="nw-spec-table nw-rv">
                {content.specs.rows.map((r) => (
                  <div className="nw-spec-row" key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CONNECTIVITY */}
        <section id="location" className="nw-location" data-tour="Connectivity">
          <div className="nw-wrap">
            <p className="nw-eyebrow nw-rv">{content.location.eyebrow}</p>
            <h2 className="nw-h2 nw-rv">{content.location.title}</h2>
            <span className="nw-rule" aria-hidden="true" />
            <p className="nw-body nw-rv nw-lede">{content.location.body}</p>
            <ol className="nw-conn-list">
              {content.location.points.map((p, i) => (
                <li className="nw-conn-row nw-rv" key={p.place}>
                  <span className="nw-conn-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nw-conn-place">{p.place}</span>
                  <span className="nw-conn-dots" aria-hidden="true" />
                  <span className="nw-conn-time">{p.time}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section id="contact" className="nw-contact" data-tour="Book a Walkthrough">
          <div className="nw-wrap">
            <p className="nw-eyebrow nw-rv">{content.contact.eyebrow}</p>
            <h2 className="nw-h2 nw-rv">{content.contact.title}</h2>
            <span className="nw-rule" aria-hidden="true" />
            <p className="nw-body nw-rv nw-lede">{content.contact.body}</p>
            <div className="nw-contact-grid">
              <a className="nw-contact-card nw-rv" href={`mailto:${email}?subject=Walkthrough%20request%20—%20Northgate%20Works`}>
                <span className="nw-contact-label">Email leasing</span>
                <span className="nw-contact-value">{email}</span>
              </a>
              <a className="nw-contact-card nw-rv" href={`tel:${phone.replace(/\s/g, '')}`}>
                <span className="nw-contact-label">Call leasing</span>
                <span className="nw-contact-value">{phone}</span>
              </a>
            </div>
            <address className="nw-address nw-rv">{content.contact.address}</address>
          </div>
        </section>
      </main>

      <footer className="nw-footer">
        <div className="nw-wrap nw-footer-grid">
          <p className="nw-footer-brand">{name}</p>
          <nav className="nw-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
        </div>
        <div className="nw-wrap">
          <p className="nw-footer-line">{content.footer.line}</p>
          <p className="nw-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
