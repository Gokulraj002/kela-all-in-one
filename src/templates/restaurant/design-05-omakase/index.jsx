import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

/* Hero frame sequence: 72 JPG frames scrubbed by scroll (video loop replaced). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

/* Serve visuals: five photographs + the chef's vermillion hanko seal as the
   closing "course". Keys match the upload panel: hero, product-0..2, detail. */
const SERVE = [
  { img: dish1Img, key: 'product-0', alt: 'Sashimi moriawase — three precise cuts of fish on dark slate' },
  { img: heroImg, key: 'hero', alt: 'A single toro nigiri on dark ceramic, vast negative space' },
  { img: dish2Img, key: 'product-1', alt: 'Uni gunkan — glistening sea urchin over rice, nori wrapped' },
  { img: dish3Img, key: 'product-2', alt: 'Tamago — layered sweet omelette in macro detail' },
  { img: detailImg, key: 'detail', alt: 'The chef’s hands forming nigiri at the counter' },
  { seal: true },
];
const ROMAN_JP = ['一', '二', '三', '四', '五', '六'];

function DishVisual({ serve }) {
  const { img, brand } = useCustom();
  if (serve.seal) {
    return (
      <div className="umi-dish-visual">
        <span className="umi-seal-plate" role="img" aria-label="The chef’s vermillion hanko seal, closing the evening">
          <span aria-hidden="true">{content.brand.mark}</span>
          <small aria-hidden="true">{brand || content.brand.name}</small>
        </span>
      </div>
    );
  }
  return (
    <div className="umi-dish-visual">
      <Img k={serve.key} src={img(serve.key, serve.img)} alt={serve.alt} />
    </div>
  );
}

function ReserveForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="umi-confirm" role="status">
        <span className="umi-seal" aria-hidden="true">{content.brand.mark}</span>
        <p>{content.reserve.confirm}</p>
      </div>
    );
  }
  return (
    <form
      className="umi-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="umi-field">
        <label htmlFor="umi-name">Name</label>
        <input id="umi-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="umi-form-row">
        <div className="umi-field">
          <label htmlFor="umi-date">Preferred date</label>
          <input id="umi-date" name="date" type="date" required />
        </div>
        <div className="umi-field">
          <label htmlFor="umi-seating">Seating</label>
          <select id="umi-seating" name="seating" defaultValue={content.reserve.seatings[0]}>
            {content.reserve.seatings.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="umi-field">
        <label htmlFor="umi-guests">Guests</label>
        <select id="umi-guests" name="guests" defaultValue="2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
          ))}
        </select>
      </div>
      <div className="umi-field">
        <label htmlFor="umi-note">Anything we should know</label>
        <textarea id="umi-note" name="note" placeholder="Allergies, occasions, quiet requests…" />
      </div>
      <button className="umi-cta" type="submit">Request a seat</button>
    </form>
  );
}

export default function Umi() {
  const { brand: customBrand, contact, img, productName, price } = useCustom();
  const brand = customBrand || content.brand.name;
  const email = contact.email || content.visit.email;
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();

  // Fonts — injected once, never removed.
  useEffect(() => {
    const id = 'tpl-font-design-05-omakase';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // ---- Hero: overlay copy fades in over load. No masks, no wipes.

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // static final state; CSS handles visibility
      const sc = scroller();
      const root = rootRef.current;

      // ---- Hero: headline fades in over load. No masks, no wipes.
      gsap.fromTo(
        '.umi-hero-fade',
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'sine.out', stagger: 0.18, delay: 0.6 }
      );

      // ---- Quiet reveals: opacity only, 1.4s, sine.out.
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      // ---- M5 · The counter serve (desktop only: pinned, scrub 1).
      // Six dishes travel right → left along the counter bar. Each PAUSES at
      // center — spotlit (scale 1.06, others dim to 0.45) — while its course
      // note fades in above. One spotlight at a time, like being served: the
      // next dish slides in as the last one leaves, so the counter is never
      // bare mid-service, and the final course (the chef's seal) stays.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        if (!root) return undefined;
        const pin = root.querySelector('.umi-serve-pin');
        if (!pin) return undefined;
        const dishes = gsap.utils.toArray('.umi-dish', pin);
        const notes = gsap.utils.toArray('.umi-serve-note', pin);
        const count = pin.querySelector('.umi-serve-count');
        const startX = () => (pin.clientWidth || window.innerWidth) / 2 + 320;
        const SEG = 2; // arrive 1 · rest 1 — leaving overlaps the next arrival
        const last = dishes.length - 1;
        let current = -2;

        const applyServe = (t) => {
          // a dish holds the spotlight from mid-arrival to mid-departure
          const active = t < 0.5 ? -1 : Math.min(last, Math.floor((t - 0.5) / SEG));
          if (active === current) return;
          current = active;
          dishes.forEach((d, i) => {
            d.classList.toggle('is-spot', i === active);
            d.classList.toggle('is-dim', active !== -1 && i !== active);
          });
          notes.forEach((n, i) => {
            const on = i === active;
            n.classList.toggle('is-active', on);
            n.setAttribute('aria-hidden', String(!on));
          });
          if (count) {
            count.textContent = active === -1 ? '· · ·' : `${ROMAN_JP[active]} / 六`;
            gsap.fromTo(count, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'sine.out', overwrite: 'auto' });
          }
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: () => '+=' + Math.round((pin.clientHeight || window.innerHeight) * 4),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          // follow the smoothed timeline so notes change with the dishes
          onUpdate: () => applyServe(tl.time()),
        });
        tl.set(dishes, { x: () => startX() }, 0);
        dishes.forEach((d, i) => {
          const t0 = i * SEG;
          tl.to(d, { x: 0, duration: 1, ease: 'sine.inOut' }, t0); // arrives
          if (i < last) tl.to(d, { x: () => -startX(), duration: 1, ease: 'sine.inOut' }, t0 + SEG); // leaves as the next arrives
        });
        tl.to({}, { duration: 0.6 }, last * SEG + 1); // the seal rests before the pin lets go
        applyServe(0);
        return () => {};
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-05-omakase${reduced ? ' is-reduced' : ''}`}>
      {/* ---------- whisper nav ----------
          A zero-height sticky dock holds the bar over the page without
          position: fixed (inside the ATELIER viewer the page scrolls in a
          panel, and a fixed bar would cover the viewer's own toolbar). */}
      <div className="umi-nav-dock">
        <nav className="umi-nav" aria-label="Primary">
          <a className="umi-brand" href="#hero" aria-label={`${brand} — home`}>
            <span className="umi-seal" aria-hidden="true">{content.brand.mark}</span>
            <span className="umi-brand-name">{brand}</span>
          </a>
          <div className="umi-nav-links">
            {content.nav.map((n) => (
              <a key={n.href} className="umi-link" href={n.href}>{n.label}</a>
            ))}
          </div>
          <span className="umi-nav-seats">Twelve seats</span>
          <a className="umi-link" href={content.hero.ctaHref}>Reserve</a>
        </nav>
      </div>

      {/* ---------- hero: scroll-driven frame sequence ---------- */}
      <header id="hero" className="umi-hero" data-tour={brand} aria-label={`${brand} omakase`}>
        <ScrollFrames
          frames={frames}
          alt="A yanagiba knife drawing a single cut through toro"
          pinDistance="+=170%"
        >
          <div className="umi-hero-veil" aria-hidden="true" />
          <div className="umi-hero-inner">
            <p className="umi-eyebrow umi-hero-fade">{content.hero.eyebrow}</p>
            <h1 className="umi-hero-title umi-hero-fade">{content.hero.title}</h1>
            <p className="umi-hero-sub umi-hero-fade">{content.hero.sub}</p>
            <div className="umi-hero-fade">
              <a className="umi-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <p className="umi-hero-seats umi-hero-fade">{content.hero.seats}</p>
          </div>
          <span className="umi-scroll-cue" aria-hidden="true" />
        </ScrollFrames>
      </header>

      {/* ---------- the counter ---------- */}
      <section id="counter" className="umi-section" data-tour="The Counter" aria-label="The counter">
        <div className="umi-wrap umi-counter-grid">
          <div className="umi-counter-visual rv">
            <Img k="detail" src={img('detail', detailImg)} alt="The chef’s hands forming nigiri at the hinoki counter" />
          </div>
          <div>
            <p className="umi-eyebrow rv">{content.counter.eyebrow}</p>
            <h2 className="umi-section-title rv">{content.counter.title}</h2>
            {content.counter.body.map((p, i) => (
              <p className="umi-copy rv" key={i}>{p}</p>
            ))}
            <div className="umi-chef-note rv">
              <blockquote>“{content.counter.chefNote}”</blockquote>
              <p className="umi-chef-name">{content.counter.chef}</p>
              <p className="umi-chef-role">{content.counter.chefRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the progression ---------- */}
      <section id="progression" className="umi-section umi-progression" data-tour="The Progression" aria-label="The six-course progression">
        <div className="umi-measure">
          <p className="umi-eyebrow rv">{content.progression.eyebrow}</p>
          <h2 className="umi-section-title rv">{content.progression.title}</h2>
          <p className="umi-copy rv">{content.progression.copy}</p>
        </div>

        {/* desktop: pinned counter serve */}
        <div className="umi-serve-pin" aria-hidden={reduced}>
          <div className="umi-serve-notes">
            {content.courses.map((c, i) => (
              <div className="umi-serve-note" key={i}>
                <p className="umi-serve-jp">{c.jp}</p>
                <h3 className="umi-serve-name">{productName(i, c.name)}</h3>
                <p className="umi-serve-desc">{c.desc}</p>
                <p className="umi-serve-noteline">{c.note}</p>
              </div>
            ))}
          </div>
          <div className="umi-serve-stage">
            {SERVE.map((s, i) => (
              <div className="umi-dish" key={i}>
                <DishVisual serve={s} index={i} />
                <div className="umi-dish-shadow" aria-hidden="true" />
              </div>
            ))}
            <div className="umi-counter-bar" aria-hidden="true" />
          </div>
          <p className="umi-serve-count" aria-hidden="true">· · ·</p>
          <p className="umi-serve-hint">SCROLL — EACH COURSE IS SERVED IN TURN</p>
        </div>

        {/* mobile: horizontal swipe strip, no pin */}
        <div className="umi-serve-rail" aria-label="The six courses">
          {content.courses.map((c, i) => (
            <article className="umi-rail-card" key={i}>
              <DishVisual serve={SERVE[i]} index={i} />
              <p className="umi-rail-num">{ROMAN_JP[i]}</p>
              <p className="umi-serve-jp">{c.jp}</p>
              <h3 className="umi-serve-name">{productName(i, c.name)}</h3>
              <p className="umi-serve-desc">{c.desc}</p>
              <p className="umi-serve-noteline">{c.note}</p>
            </article>
          ))}
        </div>

        {/* reduced motion: static, all visible */}
        <div className="umi-serve-static" aria-label="The six courses">
          {content.courses.map((c, i) => (
            <article className="umi-static-card" key={i}>
              <DishVisual serve={SERVE[i]} index={i} />
              <p className="umi-static-num">{ROMAN_JP[i]}</p>
              <p className="umi-serve-jp">{c.jp}</p>
              <h3 className="umi-serve-name">{productName(i, c.name)}</h3>
              <p className="umi-serve-desc">{c.desc}</p>
              <p className="umi-serve-noteline">{c.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- etiquette ---------- */}
      <section id="etiquette" className="umi-section umi-etiquette" data-tour="Etiquette" aria-label="Omakase etiquette">
        <div className="umi-measure">
          <p className="umi-eyebrow rv">{content.etiquette.eyebrow}</p>
          <h2 className="umi-section-title rv">{content.etiquette.title}</h2>
        </div>
        <ol className="umi-rules">
          {content.etiquette.rules.map((r, i) => (
            <li className="umi-rule rv" key={i}>
              <span className="umi-rule-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className="umi-rule-text">{r}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- reserve ---------- */}
      <section id="reserve" className="umi-section" data-tour="Reserve" aria-label="Reserve a seat">
        <div className="umi-wrap">
          <div className="umi-measure">
            <p className="umi-eyebrow rv">{content.reserve.eyebrow}</p>
            <h2 className="umi-section-title rv">{content.reserve.title}</h2>
            <p className="umi-copy rv">{content.reserve.copy}</p>
          </div>
          <div className="umi-reserve-grid">
            <div className="rv">
              <ul className="umi-seatings">
                {content.reserve.seatings.map((s) => (
                  <li className="umi-seating" key={s}>
                    <span className="umi-seating-time">{s}</span>
                    <span className="umi-seating-note">Six courses · {price(content.reserve.price)} per guest</span>
                  </li>
                ))}
              </ul>
              <div className="umi-visit">
                <p>{content.visit.address}</p>
                <p>{content.visit.phone}</p>
                <p><a className="umi-link" href={`mailto:${email}`}>{email}</a></p>
                <p style={{ marginTop: '1.25rem' }}>{content.reserve.closed}</p>
              </div>
            </div>
            <div className="rv">
              <ReserveForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="umi-footer">
        <span className="umi-seal" aria-hidden="true">{content.brand.mark}</span>
        <p className="umi-footer-brand">{brand}</p>
        <p className="umi-footer-meta">{content.visit.address}</p>
        <p className="umi-footer-meta">
          <a className="umi-link" href={`mailto:${email}`}>{email}</a>
        </p>
        <p className="umi-footer-line">{content.footer.line}</p>
      </footer>
    </div>
  );
}
