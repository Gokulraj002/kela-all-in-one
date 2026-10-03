import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Resolve the platform scroll container from a node inside the template —
   the same rule as useTplScope (.tpl-scope when it actually scrolls, else
   window). Child components need this: their layout effects run before the
   root div's ref is attached, so the root's scroller() would still answer
   window on first mount and the pin would never engage in the viewer. */
function scrollerFor(node) {
  try {
    const el = node && node.closest('.tpl-scope');
    if (el && el.scrollHeight > el.clientHeight + 2) return el;
  } catch { /* fall back to window */ }
  return window;
}

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-smart';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';

const PLAN_IMGS = { 'product-0': listing1Img, 'product-1': listing2Img, 'product-2': listing3Img };

/* Grade keyframes for the 24h scrub: [brightness, saturate, blue tint, amber tint, night veil]
   at progress stops 0 / .25 / .5 / .75 / 1 (06:00 → 22:00). */
const GRADE = [
  [0.95, 1.02, 0.38, 0.0, 0.0], // dawn
  [1.06, 1.0, 0.08, 0.0, 0.0], // mid-morning
  [1.08, 1.0, 0.04, 0.06, 0.0], // afternoon
  [1.0, 1.12, 0.05, 0.42, 0.06], // dusk
  [0.52, 0.85, 0.15, 0.1, 0.62], // night
];
const STOPS = [0, 0.25, 0.5, 0.75, 1];

function lerpGrade(p) {
  let i = 0;
  while (i < STOPS.length - 2 && p > STOPS[i + 1]) i += 1;
  const t = Math.min(1, Math.max(0, (p - STOPS[i]) / (STOPS[i + 1] - STOPS[i])));
  const a = GRADE[i];
  const b = GRADE[i + 1];
  return a.map((v, k) => v + (b[k] - v) * t);
}

function fmtClock(p) {
  const mins = Math.round(360 + p * 960); // 06:00 + progress * 16h
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/* Server-safe word-mask headline. Each word is an inline-block mask, so a
   real space is rendered between the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`hl-wm ${className}`} aria-label={text}>
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

const SYS_ICONS = {
  dawn: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16M4 9h16M4 13h16M4 17h16M7 5v16M17 5v16" />
    </svg>
  ),
  day: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4v16M12 20a3 3 0 0 0 3-3c0-2-3-3-3-7" />
      <circle cx="12" cy="17" r="1.4" />
    </svg>
  ),
  dusk: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.2 1.1 2.2h5c0-1 .4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
    </svg>
  ),
  night: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="10" width="14" height="10" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </svg>
  ),
};

const STATIC_VISUALS = [
  { id: 'dawn', img: heroImg, key: 'hero', grade: 'is-dawn', alt: 'Minimalist living room at dawn, blinds half-risen, single warm lamp glowing in blue ambience' },
  { id: 'day', img: listing3Img, key: 'product-2', grade: 'is-day', alt: 'Oak and charcoal kitchen in soft daylight, sunlight raking across the island' },
  { id: 'dusk', img: listing1Img, key: 'product-0', grade: 'is-dusk', alt: 'Living room in warm evening light, cove lighting glowing amber along the ceiling' },
  { id: 'night', img: listing2Img, key: 'product-1', grade: 'is-night', alt: 'Bedroom at night, dark walls, a single amber bedside lamp glowing' },
];

/* Pinned day-night simulation. Desktop + motion only; mobile and
   reduced-motion render four static phase cards instead. */
function DaySim() {
  const { img } = useCustom();
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );
  const frameImgRef = useRef(null);
  const blueRef = useRef(null);
  const amberRef = useRef(null);
  const nightRef = useRef(null);
  const clockRef = useRef(null);
  const phaseRef = useRef(null);
  const fillRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = (e) => setWide(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const pinned = wide && !reduced;

  if (!pinned) {
    return (
      <div className="hl-day-static">
        {content.day.phases.map((ph, i) => {
          const v = STATIC_VISUALS[i];
          return (
            <article className="hl-static-card" key={ph.id}>
              <div className={`hl-static-visual ${v.grade}`}>
                <Img k={v.key} src={img(v.key, v.img)} alt={v.alt} loading="lazy" />
              </div>
              <div>
                <span className="hl-static-time">{ph.time}</span>
                <p className="hl-phase-sys">
                  {SYS_ICONS[ph.id]}
                  {ph.name} · {ph.system}
                </p>
                <h3>{ph.title}</h3>
                <p className="hl-lede">{ph.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="hl-day-pin">
        <div className="hl-day-stage">
          <div className="hl-day-frame">
            <span ref={frameImgRef} className="hl-day-grade" style={{ position: 'absolute', inset: 0, display: 'block' }}>
              <Img k="hero" src={img('hero', heroImg)} alt="Minimalist living room interior, graded live through the day — dawn to night" loading="lazy" />
            </span>
            <span ref={blueRef} className="hl-day-tint is-blue" aria-hidden="true" />
            <span ref={amberRef} className="hl-day-tint is-amber" aria-hidden="true" />
            <span ref={nightRef} className="hl-day-tint is-night" aria-hidden="true" />
            <div className="hl-day-clock">
              <span ref={clockRef} className="hl-day-time">06:00</span>
              <span ref={phaseRef} className="hl-day-phase">Dawn · Blinds</span>
            </div>
          </div>
          <div className="hl-day-side">
            {content.day.phases.map((ph, i) => (
              <div
                key={ph.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`hl-phase-card${i === 0 ? ' is-active' : ''}`}
                aria-hidden={i !== 0}
              >
                <p className="hl-phase-sys">
                  {SYS_ICONS[ph.id]}
                  {ph.name} · {ph.system}
                </p>
                <h3>{ph.title}</h3>
                <p>{ph.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hl-day-ticks" aria-hidden="true">
          <span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span><span>22:00</span>
        </div>
        <div className="hl-day-progress" aria-hidden="true">
          <span ref={fillRef} className="hl-day-progress-fill" />
        </div>
      </div>
      <DayScrub
        refs={{ frameImgRef, blueRef, amberRef, nightRef, clockRef, phaseRef, fillRef, cardRefs }}
      />
    </>
  );
}

/* Attaches the scrubbed ScrollTrigger for the pinned simulation.
   Rendered only when the pinned stage is present. The scroller is resolved
   from the pin itself (scrollerFor): a fresh useTplScope() here had no
   rootRef attached and always answered window, so the pin never engaged
   inside the viewer. */
function DayScrub({ refs }) {
  useLayoutEffect(() => {
    const pin = refs.frameImgRef.current && refs.frameImgRef.current.closest('.hl-day-pin');
    if (!pin) return undefined;
    const ctx = gsap.context(() => {
      const sc = scrollerFor(pin);
      let lastIdx = -1;
      const apply = (p) => {
        const [b, s, blue, amber, night] = lerpGrade(p);
        if (refs.frameImgRef.current) {
          refs.frameImgRef.current.style.filter = `brightness(${b.toFixed(3)}) saturate(${s.toFixed(3)})`;
        }
        if (refs.blueRef.current) refs.blueRef.current.style.opacity = blue.toFixed(3);
        if (refs.amberRef.current) refs.amberRef.current.style.opacity = amber.toFixed(3);
        if (refs.nightRef.current) refs.nightRef.current.style.opacity = night.toFixed(3);
        if (refs.clockRef.current) refs.clockRef.current.textContent = fmtClock(p);
        if (refs.fillRef.current) refs.fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        const idx = Math.min(3, Math.floor(p * 4));
        if (idx !== lastIdx) {
          lastIdx = idx;
          refs.cardRefs.current.forEach((el, i) => {
            if (!el) return;
            el.classList.toggle('is-active', i === idx);
            el.setAttribute('aria-hidden', String(i !== idx));
          });
          const ph = content.day.phases[idx];
          if (refs.phaseRef.current) refs.phaseRef.current.textContent = `${ph.name} · ${ph.system}`;
        }
      };
      apply(0);
      ScrollTrigger.create({
        trigger: pin,
        scroller: sc,
        start: 'top top',
        end: '+=260%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => apply(self.progress),
      });
    });
    return () => ctx.revert();
  }, [refs]);
  return null;
}

export default function Design07Smart() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;

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
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: frame-stage settle + masked word-rise, <= 2.2s total. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.hl-hero-sf .sf-stage',
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' },
        0
      )
        .fromTo(
          '.hl-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.3
        )
        .fromTo(
          '.hl-hero .hl-eyebrow, .hl-hero-sub, .hl-hero-foot',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.9
        );

      /* Scrub drives the hero frames now — no separate parallax on the pinned stage. */

      /* Glow-fade reveals. */
      gsap.utils.toArray('.hl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.hl-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Hairline rules draw. */
      gsap.utils.toArray('.hl-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-07-smart">
      <header className="hl-nav">
        <a className="hl-wordmark" href="#hero">
          Halcyon <em>Living</em>
        </a>
        <nav className="hl-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="hl-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
      </header>

      <main>
        {/* HERO — "The house wakes" scroll-driven frame sequence */}
        <section id="hero" className="hl-hero" data-tour="The House Wakes">
          <ScrollFrames
            frames={frames}
            alt="A minimalist living room at dawn — blinds rise, a warm light fades up, cove lighting ignites, the room warms from blue to amber"
            pinDistance="+=170%"
            className="hl-hero-sf"
          >
            <div className="hl-hero-veil" aria-hidden="true" />
            <div className="hl-hero-copy">
              <p className="hl-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hl-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="hl-hero-sub">{content.hero.sub}</p>
              <div className="hl-hero-foot">
                <a className="hl-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <p className="hl-hero-note">
                  <span className="hl-pulse" aria-hidden="true" />
                  {content.hero.note}
                </p>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* THE DAY — day-night home simulation */}
        <section id="day" className="hl-day" data-tour="A Day in the House">
          <div className="hl-wrap hl-day-head">
            <p className="hl-eyebrow hl-rv">{content.day.eyebrow}</p>
            <h2 className="hl-h2 hl-rv">{content.day.title}</h2>
            <p className="hl-lede hl-rv">{content.day.sub}</p>
            <p className="hl-day-hint hl-rv">{content.day.hint}</p>
          </div>
          <DaySim />
        </section>

        {/* FEATURES */}
        <section id="features" className="hl-features" data-tour="Features">
          <div className="hl-wrap">
            <div className="hl-features-head">
              <p className="hl-eyebrow hl-rv">{content.features.eyebrow}</p>
              <h2 className="hl-h2 hl-rv">{content.features.title}</h2>
              <p className="hl-lede hl-rv">{content.features.sub}</p>
            </div>
            <div className="hl-feat-grid hl-stagger">
              {content.features.items.map((f, i) => (
                <article className="hl-feat" key={f.title}>
                  <span className="hl-feat-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <span className="hl-feat-spec">{f.spec}</span>
                </article>
              ))}
            </div>
            <div className="hl-feat-visual">
              <div className="hl-feat-frame hl-rv">
                <Img k="detail" src={img('detail', detailImg)} alt="Close-up of the Halcyon wall dial — brushed metal with a warm amber glowing ring in a dark interior" loading="lazy" />
              </div>
              <div className="hl-rv">
                <h3>One dial by the door.</h3>
                <p>
                  Every system in the house answers to a single brushed dial —
                  or the app, if you prefer. Turn it at dusk and the blinds
                  lower, the coves warm, the climate settles. No wall of
                  switches, no manual to read, no cloud required.
                </p>
                <p>
                  It is the only piece of technology you will ever see in a
                  Halcyon home. Everything else lives quietly in the walls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FLOOR PLANS */}
        <section id="plans" className="hl-plans" data-tour="Floor Plans">
          <div className="hl-wrap">
            <div className="hl-plans-head">
              <p className="hl-eyebrow hl-rv">{content.plans.eyebrow}</p>
              <h2 className="hl-h2 hl-rv">{content.plans.title}</h2>
              <p className="hl-lede hl-rv">{content.plans.sub}</p>
            </div>
            <div className="hl-plan-grid hl-stagger">
              {content.plans.residences.map((r, i) => (
                <article className="hl-plan" key={r.name}>
                  <div className="hl-plan-visual">
                    <Img k={r.image} src={img(r.image, PLAN_IMGS[r.image])} alt={`${productName(i, r.name)} — ${r.type}, ${r.facing.toLowerCase()}`} loading="lazy" />
                  </div>
                  <div className="hl-plan-body">
                    <span className="hl-plan-type">{r.type}</span>
                    <h3>{productName(i, r.name)}</h3>
                    <ul className="hl-plan-specs">
                      <li><span>Area</span><strong>{r.area}</strong></li>
                      <li><span>Facing</span><strong>{r.facing}</strong></li>
                      <li><span>Floors</span><strong>{r.floor}</strong></li>
                    </ul>
                    <p className="hl-plan-note">{r.note}</p>
                    <p className="hl-plan-price">
                      {price(r.price)}
                      <small>All-inclusive, Halcyon system fitted</small>
                    </p>
                    <a className="hl-plan-cta" href="#visit">{content.plans.cta}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* VISIT */}
        <section id="visit" className="hl-visit" data-tour="Visit">
          <div className="hl-wrap">
            <p className="hl-eyebrow hl-rv">{content.visit.eyebrow}</p>
            <h2 className="hl-h2 hl-rv">{content.visit.title}</h2>
            <p className="hl-lede hl-rv">{content.visit.text}</p>
            <div className="hl-visit-meta hl-rv">
              <div>
                <strong>Find us</strong>
                <span>{content.visit.address}</span>
              </div>
              <div>
                <strong>Call</strong>
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
              </div>
              <div>
                <strong>Write</strong>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
            <a className="hl-cta hl-rv" href={`mailto:${email}?subject=Private%20tour%20—%20${encodeURIComponent(name)}`}>
              {content.visit.cta}
            </a>
          </div>
        </section>
      </main>

      <footer className="hl-footer">
        <div className="hl-footer-inner">
          <div>
            <p className="hl-wordmark" style={{ marginBottom: 12 }}>Halcyon <em>Living</em></p>
            <p>{content.footer.line}</p>
            <p>{content.footer.colophon}</p>
          </div>
          <p>{content.brand.tagline} — {content.brand.location}</p>
        </div>
      </footer>
    </div>
  );
}
