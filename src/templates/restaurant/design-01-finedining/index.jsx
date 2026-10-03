import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

// Scroll-driven frame sequence (scroll-driven).
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
// One image per course; process/detail shots stand in where a dedicated
// plate photo doesn't exist — no dish is ever paired with a wrong plate.
const COURSE_SRC = [dish1Img, detailImg, dish2Img, heroImg, detailImg, heroImg, dish3Img];
const COURSE_KEYS = ['product-0', 'detail', 'product-1', 'hero', 'detail', 'hero', 'product-2'];
const COURSE_ALT = [
  'Scallop crudo with citrus pearls, macro detail',
  "Chef's tweezers placing a micro-herb, hands only",
  'Dry-aged duck breast sliced, glossy jus',
  'A single plated course in low-key light',
  'The final touch at the pass, plated in low light',
  'A single plated course in low-key light',
  'Dark chocolate dessert with restrained gold leaf',
];

export default function Lumiere() {
  const { brand: customBrand, contact, img, productName, price } = useCustom();
  const brand = customBrand || content.brand.name;
  const email = contact.email || content.visit.email;
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const counterRef = useRef(null);

  // Fonts — injected once, never removed.
  useEffect(() => {
    const id = 'tpl-font-design-01-finedining';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // static final state; CSS handles visibility
      const sc = scroller();
      const root = rootRef.current;

      // ---- Hero: 0.6s black hold, then the 1.8s pour-wipe, word-mask rise.
      const heroTl = gsap.timeline();
      heroTl
        .fromTo('.lm-hero .sf-canvas', { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.8, ease: 'power4.inOut' }, 0.6)
        .to('.lm-hero-black', { opacity: 0, duration: 1.2, ease: 'power2.out' }, 0.6)
        .fromTo('.lm-hero-word', { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: 'power3.out', stagger: 0.09 }, 1.1)
        .fromTo('.lm-hero-fade', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 }, 1.5);

      // ---- Quiet reveals: 1.3s, y:40, no stagger. CSS transitions are parked
      // while GSAP drives the element (they would chase every frame), and the
      // inline transform is handed back to the stylesheet once it lands.
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.set(el, { transition: 'none' });
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power3.out',
            clearProps: 'transform,transition',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      // ---- M1 · The seven veils (desktop only: pinned, scrub 1).
      // Course I rests on stage. For every following course its panel lowers a
      // dark veil (the course numeral) over the plate before it, then the veil
      // lifts like a cloche to reveal the new course; it rests, and so on.
      // Later panels stay clipped away until their turn, so nothing stacked
      // above can hide the course on stage.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        if (!root) return undefined;
        root.classList.add('is-veil');
        const pin = root.querySelector('.lm-tasting-pin');
        const courses = gsap.utils.toArray('.lm-course', root);
        const counter = counterRef.current;
        const REST = 0.8; // a course rests on stage between movements
        const STEP = 2 + REST; // veil down (1) + veil lifts (1) + rest
        const showAt = courses.map((c, k) => (k === 0 ? 0 : REST + (k - 1) * STEP + 1));
        let current = -1;
        const setCounter = (idx) => {
          if (idx === current) return;
          current = idx;
          if (!counter) return;
          counter.textContent = ROMAN[idx];
          gsap.fromTo(counter, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=700%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
          // Follow the smoothed timeline (not the raw scroll) so the numeral
          // changes exactly when the veil lets the new course through.
          onUpdate: () => {
            const t = tl.time();
            let idx = 0;
            for (let k = 1; k < showAt.length; k++) if (t >= showAt[k]) idx = k;
            setCounter(idx);
          },
        });

        courses.forEach((course, k) => {
          if (k === 0) return;
          const veil = course.querySelector('.lm-veil');
          const at = REST + (k - 1) * STEP;
          tl.fromTo(course, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power1.inOut' }, at);
          // the lift begins just before the veil lands, so the stage never
          // sits fully covered — the cloche passes, it does not park
          if (veil) tl.fromTo(veil, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'power1.inOut' }, at + 0.8);
        });
        tl.to({}, { duration: REST }); // the last course rests before the pin releases
        setCounter(0);

        return () => {
          root.classList.remove('is-veil');
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const heroTitleWords = content.hero.title.split(' ');

  return (
    <div ref={rootRef} className={`tpl-design-01-finedining${reduced ? ' is-reduced' : ''}`}>
      {/* ---------- NAV ----------
          A zero-height sticky dock keeps the bar over the page without
          position: fixed — inside the ATELIER viewer the page scrolls in a
          panel, and a fixed bar would sit on the viewer's own toolbar. */}
      <div className="lm-nav-dock">
        <nav className="lm-nav" aria-label="Primary">
          <a className="lm-wordmark" href="#hero">{brand}</a>
          <div className="lm-nav-links">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href} className="lm-nav-link">{n.label}</a>
            ))}
          </div>
          <a className="lm-reserve" href={content.hero.ctaHref}>Reserve</a>
        </nav>
      </div>

      {/* ---------- HERO ---------- */}
      <header id="hero" className="lm-hero" data-tour={brand}>
        <ScrollFrames
          frames={frames}
          alt="Tweezers lower a micro-herb onto the plated dish; the light breathes across the glaze"
          pinDistance="+=170%"
        >
          <div className="lm-hero-shade" aria-hidden="true" />
          <div className="lm-hero-black" aria-hidden="true" />
          <div className="lm-hero-inner">
            <p className="lm-eyebrow lm-hero-fade">{content.hero.eyebrow}</p>
            <h1 className="lm-title" aria-label={content.hero.title}>
              {heroTitleWords.map((w, i) => (
                <span key={i} className="lm-word-mask" aria-hidden="true">
                  <span className="lm-hero-word">{w}</span>
                  {i < heroTitleWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <p className="lm-hero-sub lm-hero-fade">{content.hero.sub}</p>
            <div className="lm-hero-cta-row lm-hero-fade">
              <a className="lm-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <ul className="lm-hero-meta lm-hero-fade">
              {content.hero.meta.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </ScrollFrames>
      </header>

      {/* ---------- PHILOSOPHY ---------- */}
      <section id="philosophy" className="lm-section lm-philosophy" data-tour="Philosophy">
        <div className="lm-column">
          <p className="lm-eyebrow rv">{content.philosophy.eyebrow}</p>
          <h2 className="lm-h2 rv">{content.philosophy.title}</h2>
          {content.philosophy.body.map((p, i) => (
            <p key={i} className="lm-body rv">{p}</p>
          ))}
          <blockquote className="lm-chef-note rv">
            <p>“{content.philosophy.chefNote}”</p>
            <cite>— {content.philosophy.chef}</cite>
          </blockquote>
        </div>
      </section>

      {/* ---------- THE TASTING · seven veils ---------- */}
      <section id="tasting" className="lm-tasting" data-tour="The Tasting" aria-label="The seven-course tasting">
        <div className="lm-tasting-pin">
          <div className="lm-tasting-head">
            <p className="lm-eyebrow">{content.tasting.eyebrow}</p>
            <h2 className="lm-h2">{content.tasting.title}</h2>
          </div>
          {content.courses.map((course, i) => (
            <article key={i} className={`lm-course${i === 0 ? ' is-first' : ''}`} aria-label={`Course ${ROMAN[i]} — ${course.name}`}>
              <div className="lm-veil" aria-hidden="true">
                <span className="lm-veil-numeral">{ROMAN[i]}</span>
              </div>
              <div className="lm-course-inner rv">
                <p className="lm-numeral">{ROMAN[i]}</p>
                <figure className="lm-course-photo">
                  <Img k={COURSE_KEYS[i]} src={img(COURSE_KEYS[i], COURSE_SRC[i])} alt={COURSE_ALT[i]} />
                </figure>
                <h3 className="lm-course-name">{productName(i, course.name)}</h3>
                <p className="lm-course-desc">{course.desc}</p>
                <p className="lm-course-pairing">{course.pairing}</p>
                <p className="lm-course-price">{price(course.price)}</p>
              </div>
            </article>
          ))}
          <div className="lm-counter" aria-hidden="true">
            <span className="lm-counter-now" ref={counterRef}>I</span>
            <span className="lm-counter-sep">/</span>
            <span className="lm-counter-total">VII</span>
          </div>
          <p className="lm-tasting-note">{content.tasting.note}</p>
        </div>
      </section>

      {/* ---------- WINE ---------- */}
      <section id="wine" className="lm-section lm-wine" data-tour="Wine Pairings">
        <div className="lm-column">
          <p className="lm-eyebrow rv">{content.wine.eyebrow}</p>
          <h2 className="lm-h2 rv">{content.wine.title}</h2>
          <p className="lm-body rv">{content.wine.body}</p>
          <p className="lm-wine-price rv">Pairing — {price(content.wine.price)} per guest</p>
          <dl className="lm-wine-rows">
            {content.wine.rows.map((row, i) => (
              <div key={i} className="lm-wine-row rv">
                <dt className="lm-wine-course">{row.course}</dt>
                <dd className="lm-wine-name">{row.wine}</dd>
                <dd className="lm-wine-note">{row.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- PRIVATE DINING ---------- */}
      <section id="private" className="lm-section lm-private" data-tour="Private Dining">
        <div className="lm-card rv">
          <p className="lm-eyebrow">{content.private.eyebrow}</p>
          <h2 className="lm-h2">{content.private.title}</h2>
          <p className="lm-body">{content.private.body}</p>
          <ul className="lm-private-points">
            {content.private.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <a className="lm-cta lm-cta-quiet" href={content.private.ctaHref}>{content.private.cta}</a>
        </div>
      </section>

      {/* ---------- RESERVE / VISIT ---------- */}
      <section id="reserve" className="lm-section lm-visit" data-tour="Reserve a Table">
        <div className="lm-column">
          <p className="lm-eyebrow rv">{content.visit.eyebrow}</p>
          <h2 className="lm-h2 rv">{content.visit.title}</h2>
          <div className="lm-visit-grid">
            <div className="lm-visit-block rv">
              <h3 className="lm-kicker">Address</h3>
              {content.visit.address.map((line) => (
                <p key={line} className="lm-body">{line}</p>
              ))}
            </div>
            <div className="lm-visit-block rv">
              <h3 className="lm-kicker">Hours</h3>
              {content.visit.hours.map((h) => (
                <p key={h.time} className="lm-body">
                  <span className="lm-hours-days">{h.days}</span>
                  <span className="lm-hours-time">{h.time}</span>
                </p>
              ))}
            </div>
            <div className="lm-visit-block rv">
              <h3 className="lm-kicker">Contact</h3>
              <p className="lm-body"><a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a></p>
              <p className="lm-body"><a href={`mailto:${email}`}>{email}</a></p>
            </div>
          </div>
          <p className="lm-body lm-visit-note rv">{content.visit.note}</p>
          <div className="lm-visit-cta rv">
            <a className="lm-cta" href={`mailto:${email}?subject=Table%20reservation%20—%20${encodeURIComponent(brand)}`}>{content.hero.cta}</a>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="lm-footer">
        <p className="lm-wordmark lm-footer-mark">{brand}</p>
        <p className="lm-colophon">{content.footer.colophon}</p>
        <p className="lm-colophon">{content.footer.line}</p>
      </footer>
    </div>
  );
}
