import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence for the craft film section (72 frames). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-tailor';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap';

const FINAL_CM = 152; /* a suit's worth of tape */
const STAGE_NAMES = ['Measure', 'Cut', 'Stitch', 'Press', 'Fit'];
const STAGE_COUNT = STAGE_NAMES.length;

/* Server-safe word-mask headline */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`dz-wm ${className}`} aria-label={text}>
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

/* The platform passes a full Instagram URL, content.js a @handle — show both as @handle. */
const toHandle = (v) =>
  String(v || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/+$/, '');

function ChalkDivider() {
  return (
    <div className="dz-chalkline" aria-hidden="true">
      <span className="dz-chalkline-line" />
    </div>
  );
}

function Nav() {
  const { brand } = useCustom();
  return (
    <nav className="dz-nav" aria-label="Primary">
      <a className="dz-wordmark" href="#hero">
        {brand || content.brand.name}
        <span className="dz-wordmark-est">{content.brand.est}</span>
      </a>
      <div className="dz-nav-links">
        {content.nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </div>
      <a className="dz-nav-cta" href="#visit">
        Book a fitting
      </a>
    </nav>
  );
}

function Hero() {
  const { img } = useCustom();
  return (
    <header id="hero" className="dz-hero">
      <div className="dz-hero-copy">
        <p className="dz-eyebrow dz-rv-hero">{content.hero.eyebrow}</p>
        <h1 className="dz-hero-title">
          <Words text={content.hero.title} />
        </h1>
        <p className="dz-hero-sub dz-rv-hero">{content.hero.sub}</p>
        <div className="dz-rv-hero">
          <a className="dz-cta" href="#visit">
            {content.hero.cta}
          </a>
          <p className="dz-cta-note">{content.hero.ctaNote}</p>
        </div>
      </div>
      <figure className="dz-hero-figure">
        <div className="dz-hero-visual">
          <Img k="hero" src={img('hero', heroImg)} alt="Master tailor's hands chalking the lapel of a bandhgala in an atelier, window light" eager />
        </div>
        <figcaption className="dz-caption">{content.hero.caption}</figcaption>
      </figure>
      <div className="dz-hero-tape" aria-hidden="true">
        <span className="dz-tape-line" />
        <span className="dz-tape-tag">{content.hero.tapeNote}</span>
      </div>
    </header>
  );
}

/* The signature mechanic: a measurement-tape rail pinned along the section
   edge unrolls on scrub; as its leading edge passes each of the 5 stage
   markers, that stage's card activates — chalk outline draws, detail settles.
   All driven from ONE scrub progress value (no multi-trigger sync issues). */
function TapeRail() {
  return (
    <section id="story" data-tour="The Process" className="dz-tape" aria-label="The making process">
      <div className="dz-tape-head rv">
        <p className="dz-eyebrow">{content.process.eyebrow}</p>
        <h2 className="dz-h2">{content.process.title}</h2>
        <p className="dz-lede">{content.process.lede}</p>
      </div>
      <div className="dz-tape-pin">
        <div className="dz-tape-rail">
          <p className="dz-tape-readout" aria-label="Tape measurement">
            <span className="dz-tape-readout-num">{FINAL_CM}</span>
            <span className="dz-tape-readout-unit">cm</span>
          </p>
          <div className="dz-tape-strip" aria-hidden="true" />
        </div>
        <div className="dz-tape-cards">
          {content.process.stages.map((s, i) => (
            <article className="dz-stage" data-i={i} key={s.name}>
              <svg className="dz-stage-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect x="2" y="2" width="96" height="96" pathLength="1" />
              </svg>
              <p className="dz-stage-num">
                {String(i + 1).padStart(2, '0')} · {s.name}
              </p>
              <h3 className="dz-stage-title">{s.title}</h3>
              <div className="dz-stage-detail">
                <p className="dz-stage-body">{s.body}</p>
                <p className="dz-stage-cm">{s.cm} cm</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Image-key map (guide): hero, product-0 → look-1 (bandhgala),
   product-1 → look-2 (cloth rolls), product-2 → look-3 (sherwani),
   detail → needle/chalk macro (film poster + bespoke card). */
const WARDROBE_KEYS = [
  { imgKey: 'product-0', src: look1Img },
  { imgKey: 'product-2', src: look3Img },
  { imgKey: 'detail', src: detailImg },
];

function Wardrobe() {
  const { productName, price, img } = useCustom();
  return (
    <section id="products" data-tour="The Wardrobe" className="dz-wardrobe" aria-label="The wardrobe">
      <div className="rv">
        <p className="dz-eyebrow">{content.wardrobe.eyebrow}</p>
        <h2 className="dz-h2">{content.wardrobe.title}</h2>
        <p className="dz-lede">{content.wardrobe.lede}</p>
      </div>
      <div className="dz-wardrobe-grid">
        {content.wardrobe.items.map((item, i) => (
          <article className="dz-card rv" key={item.name}>
            <div className="dz-card-visual">
              <Img
                k={WARDROBE_KEYS[i].imgKey}
                src={img(WARDROBE_KEYS[i].imgKey, WARDROBE_KEYS[i].src)}
                alt={item.alt}
              />
            </div>
            <div className="dz-card-body">
              <p className="dz-card-fabric">{item.fabric}</p>
              <h3 className="dz-card-name">{productName(i, item.name)}</h3>
              <p className="dz-card-desc">{item.desc}</p>
              <p className="dz-card-price">
                <span className="dz-price-from">from</span> {price(item.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClothLibrary() {
  const { price, img } = useCustom();
  const [filter, setFilter] = useState('All');
  const visible = content.cloths.items.filter((c) => filter === 'All' || c.kind === filter);

  const pick = (f) => {
    if (f === filter) return;
    setFilter(f);
  };

  return (
    <section id="gallery" data-tour="Cloth Library" className="dz-cloth" aria-label="Cloth library">
      <div className="dz-cloth-head rv">
        <p className="dz-eyebrow">{content.cloths.eyebrow}</p>
        <h2 className="dz-h2">{content.cloths.title}</h2>
        <p className="dz-lede">{content.cloths.lede}</p>
        <div className="dz-cloth-filters" role="group" aria-label="Filter cloths by fibre">
          {content.cloths.filters.map((f) => (
            <button
              key={f}
              type="button"
              className={`dz-pill${filter === f ? ' is-active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => pick(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="dz-cloth-layout">
        <div className="dz-cloth-grid">
          {visible.map((c) => (
            <article
              className="dz-cloth-card rv"
              key={c.name}
            >
              <span className="dz-cloth-swatch" style={{ backgroundColor: c.swatch }} aria-hidden="true" />
              <div className="dz-cloth-body">
                <h3 className="dz-cloth-name">{c.name}</h3>
                <p className="dz-cloth-mill">{c.mill}</p>
                <p className="dz-cloth-spec">{c.spec}</p>
                <p className="dz-cloth-price">{price(c.price)} / metre</p>
              </div>
            </article>
          ))}
        </div>
        <figure className="dz-cloth-figure rv">
          <Img k="product-1" src={img('product-1', look2Img)} alt={content.cloths.imageAlt} />
          <figcaption className="dz-caption">The library · bolts indexed by mill and weight</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Fittings() {
  const [visit, setVisit] = useState(0);
  const [done, setDone] = useState(() => new Set());
  const reduced = useReducedMotion();
  const active = content.fittings.visits[visit];

  const toggle = (v, idx) => {
    const key = `${v}:${idx}`;
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <section id="fittings" data-tour="The Three Visits" className="dz-fittings" aria-label="The three visits">
      <div className="rv">
        <p className="dz-eyebrow">{content.fittings.eyebrow}</p>
        <h2 className="dz-h2">{content.fittings.title}</h2>
        <p className="dz-lede">{content.fittings.lede}</p>
      </div>
      <div className="dz-fit-layout">
        <ol className="dz-fit-steps">
          {content.fittings.visits.map((v, i) => (
            <li key={v.name}>
              <button
                type="button"
                className={`dz-fit-step${visit === i ? ' is-active' : ''}`}
                aria-current={visit === i ? 'step' : undefined}
                onClick={() => setVisit(i)}
              >
                <span className="dz-fit-step-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dz-fit-step-name">{v.name}</span>
                <span className="dz-fit-step-when">{v.when}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="dz-fit-panel" key={visit}>
          <p className="dz-fit-panel-when">{active.when}</p>
          <h3 className="dz-fit-panel-name">{active.name}</h3>
          <p className="dz-fit-panel-body">{active.body}</p>
          <ul className="dz-fit-checklist">
            {active.checklist.map((item, idx) => {
              const key = `${visit}:${idx}`;
              const isDone = done.has(key);
              return (
                <li key={item}>
                  <button
                    type="button"
                    className={`dz-fit-check${isDone ? ' is-done' : ''}`}
                    aria-pressed={isDone}
                    onClick={() => toggle(visit, idx)}
                  >
                    <span className="dz-fit-check-box" aria-hidden="true" />
                    <span className="dz-fit-check-label">{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {!reduced && <p className="dz-hint">Tap a checklist item to strike it through.</p>}
        </div>
      </div>
    </section>
  );
}

/* Craft film: "Needle & Steam" as a scroll-driven frame sequence, pinned for
   the section. The copy stays overlaid on the frames, exactly where it sat
   over the old autoplay loop. */
function CraftFilm() {
  return (
    <section id="craft" data-tour="The Craft Film" className="dz-film" aria-label="Craft film">
      <ScrollFrames
        frames={frames}
        alt="Needle & Steam — tailoring needle and steam"
        pinDistance="+=120%"
        stageHeight="calc(var(--tpl-vh, 100svh) * 0.9)"
      >
        <div className="dz-film-scrim" aria-hidden="true" />
        <div className="dz-film-copy">
          <p className="dz-eyebrow dz-eyebrow-light">{content.film.eyebrow}</p>
          <h2 className="dz-h2 dz-h2-light">{content.film.title}</h2>
          <p className="dz-lede dz-lede-light">{content.film.body}</p>
          <p className="dz-caption dz-caption-light">{content.film.caption}</p>
        </div>
      </ScrollFrames>
    </section>
  );
}

function Appointments() {
  const { contact } = useCustom();
  const [slot, setSlot] = useState(null);
  const [mode, setMode] = useState(0);
  const email = contact.email || content.contact.email;

  return (
    <section id="visit" data-tour="Book a Fitting" className="dz-book" aria-label="Book a fitting">
      <ChalkDivider />
      <div className="rv">
        <p className="dz-eyebrow">{content.booking.eyebrow}</p>
        <h2 className="dz-h2">{content.booking.title}</h2>
        <p className="dz-lede">{content.booking.lede}</p>
      </div>
      <div className="dz-book-layout">
        <div className="dz-book-modes rv">
          {content.booking.modes.map((m, i) => (
            <button
              key={m.name}
              type="button"
              className={`dz-mode${mode === i ? ' is-active' : ''}`}
              aria-pressed={mode === i}
              onClick={() => setMode(i)}
            >
              <span className="dz-mode-name">{m.name}</span>
              <span className="dz-mode-desc">{m.desc}</span>
            </button>
          ))}
          <p className="dz-book-contact">
            Prefer to write? <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="dz-book-slots rv">
          <p className="dz-book-slots-label">{content.booking.slotNote}</p>
          <div className="dz-slots" role="group" aria-label="Fitting slots">
            {content.booking.slots.map((s) => (
              <button
                key={s}
                type="button"
                className={`dz-slot${slot === s ? ' is-selected' : ''}`}
                aria-pressed={slot === s}
                onClick={() => setSlot(slot === s ? null : s)}
              >
                <svg className="dz-slot-ring" viewBox="0 0 40 40" aria-hidden="true">
                  <circle cx="20" cy="20" r="17" pathLength="1" />
                </svg>
                <span>{s}</span>
              </button>
            ))}
          </div>
          <a className="dz-cta" href={`mailto:${email}?subject=Fitting request${slot ? ` — ${encodeURIComponent(slot)}` : ''}`}>
            {content.booking.cta}
          </a>
          {slot && <p className="dz-slot-chosen">Selected: {slot} · {content.booking.modes[mode].name}</p>}
        </div>
      </div>
      <div className="dz-quotes">
        {content.testimonials.map((t) => (
          <blockquote className="dz-quote rv" key={t.name}>
            <p className="dz-quote-text">“{t.quote}”</p>
            <footer className="dz-quote-by">
              {t.name} <span>· {t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const { brand, contact } = useCustom();
  const email = contact.email || content.contact.email;
  const instagram = toHandle(contact.instagram || content.contact.instagram);
  return (
    <footer className="dz-footer">
      <div className="dz-footer-grid">
        <div className="dz-footer-brand">
          <p className="dz-wordmark dz-wordmark-light">{brand || content.brand.name}</p>
          <p className="dz-footer-ledger">{content.footer.ledger}</p>
        </div>
        <div className="dz-footer-col">
          <p className="dz-footer-head">Atelier</p>
          <p>{content.contact.address}</p>
          <p>{content.contact.hours}</p>
        </div>
        <div className="dz-footer-col">
          <p className="dz-footer-head">Write</p>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>{content.contact.phone}</p>
          <p>@{instagram}</p>
        </div>
        <div className="dz-footer-col">
          <p className="dz-footer-head">Cloth mills</p>
          <p>{content.footer.mills}</p>
        </div>
      </div>
      <p className="dz-footer-care">{content.footer.care}</p>
      <p className="dz-footer-line">{content.footer.line}</p>
    </footer>
  );
}

export default function Design08Tailor() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    // the webfont changes text heights: re-measure every trigger once it lands
    link.addEventListener('load', () => {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    });
    document.head.appendChild(link);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; /* CSS fallbacks: everything fully visible */

      /* Hero entrance — shears-and-chalk fold, word rise, tape draw */
      gsap.fromTo(
        '.dz-hero-visual',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut' }
      );
      gsap.fromTo(
        '.dz-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out', delay: 0.35 }
      );
      gsap.fromTo(
        '.dz-rv-hero',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power2.out', delay: 0.25 }
      );
      gsap.fromTo(
        '.dz-hero-tape .dz-tape-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power2.inOut', delay: 0.5 }
      );

      /* Utility scroll reveals — drapeSettle, short and snappy */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
          }
        );
      });

      /* Chalk-line dividers draw across between craft and booking */
      gsap.utils.toArray('.dz-chalkline-line').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 90%' },
          }
        );
      });

      /* tapeRail — the hard mechanic, kept simple:
         ONE scrubbed ScrollTrigger; everything derives from its progress:
         tape unroll (scaleY), stage activation thresholds (i+1)/5,
         and the cm readout. No multi-trigger sync to drift apart. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const q = gsap.utils.selector(rootRef);
        const stages = q('.dz-stage');
        const strip = q('.dz-tape-strip');
        const readout = q('.dz-tape-readout-num');
        const rects = q('.dz-stage-frame rect');
        const details = q('.dz-stage-detail');

        gsap.set(strip, { scaleY: 0, transformOrigin: 'top center' });
        /* not-yet-reached stages stay legible but quiet (never fully hidden) */
        gsap.set(stages, { opacity: 0.4 });
        gsap.set(rects, { strokeDashoffset: 1 });
        gsap.set(details, { opacity: 0.35, y: 10 });

        const activeState = stages.map(() => false);
        const setStage = (i, on) => {
          if (activeState[i] === on) return;
          activeState[i] = on;
          stages[i].classList.toggle('is-active', on);
          gsap.to(stages[i], { opacity: on ? 1 : 0.4, duration: 0.35, overwrite: 'auto' });
          gsap.to(rects[i], {
            strokeDashoffset: on ? 0 : 1,
            duration: 0.8,
            ease: 'power2.inOut',
            overwrite: 'auto',
          });
          gsap.to(details[i], {
            opacity: on ? 1 : 0.35,
            y: on ? 0 : 10,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        const apply = (p) => {
          gsap.set(strip, { scaleY: Math.max(p, 0.0001) });
          for (let i = 0; i < STAGE_COUNT; i += 1) setStage(i, p >= i / STAGE_COUNT);
          if (readout[0]) readout[0].textContent = String(Math.round(p * FINAL_CM));
        };

        apply(0);

        const nav = rootRef.current && rootRef.current.querySelector('.dz-nav');
        ScrollTrigger.create({
          trigger: '.dz-tape-pin',
          // pin just below the sticky nav so the first card is never tucked under it
          start: () => `top ${nav ? nav.offsetHeight : 0}px`,
          end: '+=320%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          scroller: scroller(),
          onUpdate: (self) => apply(self.progress),
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-08-tailor">
      <Nav />
      <Hero />
      <TapeRail />
      <Wardrobe />
      <ClothLibrary />
      <Fittings />
      <CraftFilm />
      <Appointments />
      <Footer />
    </div>
  );
}
