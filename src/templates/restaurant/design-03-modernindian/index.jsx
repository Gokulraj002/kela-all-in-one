import React, { useEffect, useLayoutEffect } from 'react';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const DISH_IMG = {
  hero: heroImg,
  'product-0': dish1Img,
  'product-1': dish2Img,
  'product-2': dish3Img,
  detail: detailImg,
};

function Glyph({ kind }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 48 48' };
  if (kind === 'smoke') return (
    <svg {...common} aria-hidden="true"><path d="M16 40c-3-4 3-6 0-10s3-6 0-10M24 42c-3-4 3-6 0-10s3-6 0-10M32 40c-3-4 3-6 0-10s3-6 0-10"/></svg>
  );
  if (kind === 'earth') return (
    <svg {...common} aria-hidden="true"><path d="M6 34l10-12 8 8 6-6 12 10"/><path d="M6 40h36"/></svg>
  );
  if (kind === 'fire') return (
    <svg {...common} aria-hidden="true"><path d="M24 6c4 8 12 10 12 20a12 12 0 0 1-24 0c0-6 4-8 6-14 2 3 4 4 4 4 .5-4 0-7 2-10z"/></svg>
  );
  return (
    <svg {...common} aria-hidden="true"><path d="M24 6v36M8 15l32 18M40 15L8 33M24 6l-5 5m5-5l5 5M24 42l-5-5m5 5l5-5"/></svg>
  );
}

/* Word-mask split. The space between words sits outside the inline-block
   masks: a trailing space inside one collapses and runs the words together. */
function Words({ text }) {
  const words = text.split(' ');
  return (
    <span className="ag-line">
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="wmask"><span className="w">{w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function AgniTemplate() {
  const { brand, img, contact, productName, price } = useCustom();
  const brandName = brand || content.brand.name;
  const reduced = useReducedMotion();
  const { rootRef, scroller } = useTplScope();

  /* Fonts — injected once, never removed */
  useEffect(() => {
    const id = 'tpl-font-design-03-modernindian';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Rozha+One&family=Manrope:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; /* static final state */
      const sc = scroller();

      /* HERO — ember edge sweeps the frame (1s), headline slams power4.out */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.ag-hero-edge',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut' })
        .fromTo('.ag-hero-title .w',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.05 }, '-=0.45')
        .fromTo('.ag-hero-sub, .ag-hero-ctas, .ag-hero-eyebrow',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, '-=0.55');

      /* House reveals. CSS transitions are parked while GSAP drives the
         element and the transform is handed back to the stylesheet after. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.set(el, { transition: 'none' });
        gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          clearProps: 'transform,transition',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });

      /* M3 — Elemental bands: ember edge sweep (scrubbed clip-path),
         dish cards stagger-rise, element glyph scales in. No pin. */
      gsap.utils.toArray('.band').forEach((band) => {
        const edge = band.querySelector('.ember-edge');
        const cards = band.querySelectorAll('.dish');
        const glyph = band.querySelector('.band-glyph');
        const btl = gsap.timeline({
          scrollTrigger: {
            trigger: band, scroller: sc,
            start: 'top 72%', end: 'top 28%', scrub: 0.6,
          },
        });
        btl.fromTo(edge, { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
          .fromTo(cards, { y: 56, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none', stagger: 0.15 }, 0)
          .fromTo(glyph, { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, ease: 'none' }, 0.1);
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-03-modernindian">
      {/* NAV */}
      <nav className="ag-nav">
        <a className="ag-wordmark" href="#hero" aria-label={brandName}>
          <span className="ag-wordmark-dot" aria-hidden="true" />
          {brandName}
        </a>
        <div className="ag-nav-links">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </div>
        <a className="ag-btn ag-btn--ember" href="#reserve">Reserve</a>
      </nav>

      {/* HERO — scroll-driven tadka sequence */}
      <header className="ag-hero" id="hero" data-tour="The Fire">
        <ScrollFrames
          frames={frames}
          alt="Tadka tempering — hot oil with mustard seeds and curry leaves poured over dal"
          pinDistance="+=170%"
        >
          <span className="ag-hero-shade" aria-hidden="true" />
          <span className="ag-hero-edge" aria-hidden="true" />
          <div className="ag-hero-inner">
            <p className="ag-eyebrow ag-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="ag-hero-title">
              {content.hero.titleLines.map((line, i) => (
                <React.Fragment key={i}><Words text={line} /><br /></React.Fragment>
              ))}
            </h1>
            <p className="ag-hero-sub">{content.hero.sub}</p>
            <div className="ag-hero-ctas">
              <a className="ag-btn ag-btn--ember" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="ag-btn ag-btn--ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
            </div>
          </div>
        </ScrollFrames>
      </header>

      {/* PHILOSOPHY */}
      <section className="ag-section ag-phil" id="story" data-tour="Fire as Ingredient">
        <div className="ag-phil-grid">
          <div className="ag-phil-media rv">
            <Img k="detail" src={img('detail', detailImg)} alt="Tadka — hot oil with mustard seeds and curry leaves poured over dal" className="ag-phil-img" />
            <p className="ag-caption">{content.philosophy.imageNote}</p>
          </div>
          <div className="ag-phil-copy">
            <p className="ag-eyebrow rv">{content.philosophy.eyebrow}</p>
            <h2 className="ag-h2 rv">{content.philosophy.title}</h2>
            {content.philosophy.body.map((p, i) => (
              <p className="ag-body rv" key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* MENU — M3 ELEMENTAL BANDS */}
      <div id="menu" data-tour="The Menu by Element">
        {content.elements.map((el) => (
          <section
            key={el.id}
            className={`band band--${el.theme} ag-section`}
            aria-label={`${el.name} — element ${el.numeral}`}
          >
            <span className="ember-edge" aria-hidden="true" />
            <div className="band-inner">
              <header className="band-head">
                <span className="band-glyph" aria-hidden="true"><Glyph kind={el.glyph} /></span>
                <div className="band-head-text">
                  <p className="ag-eyebrow">Element {el.numeral}</p>
                  <h3 className="ag-h2 band-name">{el.name}</h3>
                  <p className="ag-body band-note">{el.note}</p>
                </div>
              </header>
              <div className="band-dishes">
                {el.dishes.map((d, i) => (
                  <article className={`dish${d.feature ? ' dish--feature' : ''}`} key={i}>
                    {d.feature && d.k && (
                      <span className="dish-media">
                        <Img k={d.k} src={img(d.k, DISH_IMG[d.k])} alt={productName(d.nameIdx, d.name)} />
                      </span>
                    )}
                    <div className="dish-row">
                      <h4 className="dish-name">{productName(d.nameIdx, d.name)}</h4>
                      <span className="dish-leader" aria-hidden="true" />
                      <span className="dish-price">{price(d.price)}</span>
                    </div>
                    <p className="dish-desc">{d.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* TASTING JOURNEYS */}
      <section className="ag-section ag-journeys" id="dishes" data-tour="Tasting Journeys">
        <div className="ag-wrap">
          <p className="ag-eyebrow rv">{content.journeys.eyebrow}</p>
          <h2 className="ag-h2 rv">{content.journeys.title}</h2>
          <div className="ag-journey-grid">
            {content.journeys.items.map((j, i) => (
              <article className="ag-journey rv" key={i}>
                <p className="ag-journey-courses">{j.courses}</p>
                <h3 className="ag-h3">{j.name}</h3>
                <p className="ag-body">{j.desc}</p>
                <div className="ag-journey-prices">
                  <div>
                    <span className="ag-journey-amount">{price(j.price)}</span>
                    <span className="ag-journey-label">tasting</span>
                  </div>
                  <div>
                    <span className="ag-journey-amount">{price(j.pairing)}</span>
                    <span className="ag-journey-label">with pairing</span>
                  </div>
                </div>
                <p className="ag-caption">{j.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BAR */}
      <section className="ag-section ag-bar" id="craft" data-tour="The Bar">
        <div className="ag-wrap ag-bar-grid">
          <div className="ag-bar-intro">
            <p className="ag-eyebrow rv">{content.bar.eyebrow}</p>
            <h2 className="ag-h2 rv">{content.bar.title}</h2>
            <p className="ag-body rv">{content.bar.sub}</p>
            <a className="ag-btn ag-btn--ghost rv" href="#reserve">Reserve the bar counter</a>
          </div>
          <ul className="ag-bar-list">
            {content.bar.cocktails.map((c, i) => (
              <li className="ag-bar-item rv" key={i}>
                <div className="dish-row">
                  <h4 className="dish-name">{c.name}</h4>
                  <span className="dish-leader" aria-hidden="true" />
                  <span className="dish-price">{price(c.price)}</span>
                </div>
                <p className="dish-desc">{c.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RESERVE */}
      <section className="ag-section ag-reserve" id="reserve" data-tour="Reserve">
        <div className="ag-wrap">
          <p className="ag-eyebrow rv">{content.reserve.eyebrow}</p>
          <h2 className="ag-h2 rv">{content.reserve.title}</h2>
          <div className="ag-loc-grid">
            {content.reserve.locations.map((l, i) => (
              <article className="ag-loc rv" key={i}>
                <h3 className="ag-h3">{l.city}</h3>
                <p className="ag-body">{l.address}</p>
                <p className="ag-body">{l.phone}</p>
                <p className="ag-caption">{l.hours}</p>
              </article>
            ))}
          </div>
          <div className="ag-reserve-cta rv">
            <a className="ag-btn ag-btn--ember ag-btn--lg" href={`mailto:${contact.email || content.reserve.email}`}>{content.reserve.cta}</a>
            <p className="ag-caption">{content.reserve.note}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ag-footer">
        <div className="ag-wrap ag-footer-inner">
          <a className="ag-wordmark" href="#hero" aria-label={brandName}>
            <span className="ag-wordmark-dot" aria-hidden="true" />
            {brandName}
          </a>
          <p className="ag-caption">{content.footer.colophon}</p>
          <p className="ag-caption">{content.footer.line}</p>
        </div>
      </footer>
    </div>
  );
}
