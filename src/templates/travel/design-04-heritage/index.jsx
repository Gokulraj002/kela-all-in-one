import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-heritage';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`or-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function Crest() {
  return (
    <svg className="or-crest" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 3 29 10 16 17 3 10Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 10 29 17 16 24 3 17Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 17 29 24 16 31 3 24Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

/* Era media: product-0..2 + detail keys, one use each. */
const eraMedia = [
  { key: 'product-0', src: dest1Img, alt: 'The stone chariot of Hampi among giant granite boulders, golden light raking the carved wheels' },
  { key: 'product-1', src: dest2Img, alt: 'A Rajasthan palace courtyard — rows of carved arches casting long geometric shadows across sandstone' },
  { key: 'product-2', src: dest3Img, alt: 'A carved temple gopuram rising tier upon tier against a deep blue sky, warm side-light on the sculpture' },
  { key: 'detail', src: detailImg, alt: 'Macro of carved sandstone beside a small brass diya lamp with a single living flame' },
];

function EraLayer({ era, index, journey, media }) {
  const { productName, price, img } = useCustom();
  return (
    <article className={`or-layer${index % 2 ? ' is-alt' : ''}`} data-era={era.name}>
      <div className="or-layer-inner">
        <div className="or-layer-fig">
          <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
          <span className="or-layer-stratum">Stratum {era.numeral} / IV</span>
        </div>
        <div className="or-layer-copy">
          <p className="or-era-period">{era.period}</p>
          <h3 className="or-era-name">{era.name}</h3>
          <p className="or-era-note">{era.note}</p>
          <span className="or-journey-tag">{journey.tag}</span>
          <h4 className="or-journey-name">{productName(index, journey.name)}</h4>
          <p className="or-journey-meta">
            {journey.duration} · {journey.era}
          </p>
          <p className="or-journey-blurb">{journey.blurb}</p>
          <div className="or-journey-foot">
            <p className="or-journey-price">
              <small>From</small>
              {price(journey.price)}
            </p>
            <a className="or-cta" href="#visit">
              Reserve a seat
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const DEPTH_SCALE = [0.9, 0.933, 0.966, 1]; // Ancient → Living, deep → surface

export default function Design04Heritage() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;
  const heroPoster = img('hero', heroImg);

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  const pinRef = useRef(null);
  const spineFillRef = useRef(null);
  const readoutRef = useRef(null);
  const spineMarksRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* HERO entrance: strata-wipe frame, counter-drift still, word-rise. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.or-hero-frame',
        { clipPath: 'inset(10% 6% 90% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.or-hero-drift img',
          { yPercent: -6, scale: 1.14 },
          { yPercent: 0, scale: 1.14, duration: 1.5, ease: 'power4.inOut' },
          0
        )
        .fromTo(
          '.or-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.09 },
          0.35
        )
        .fromTo(
          '.or-hero-sub, .or-hero-cta-row',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.85
        )
        .fromTo('.or-hero-plate', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.3)
        .fromTo('.or-nav', { yPercent: -110 }, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.25);

      /* Single parallax allowance: the hero still drifts as you leave it. */
      gsap.to('.or-hero-drift', {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: '.or-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: true },
      });

      /* Sepia-tinged reveals, hairline rules, clip-wipe frames. */
      gsap.utils.toArray('.or-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.or-sec-title .wi').forEach((word) => {
        gsap.fromTo(
          word,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
            scrollTrigger: { trigger: word.closest('.or-sec-title'), scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      gsap.utils.toArray('.or-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 7% 90% 7%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.or-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* ============ SIGNATURE: EXCAVATION LAYERS ============
         Pinned stratigraphic scroll (desktop). Living sits on top; scrub
         peels each stratum back via a clip-path inset wipe, revealing the
         journey beneath in visual depth (scale steps + sepia grade easing
         to full color). The timeline spine fills as eras pass. */
      const pin = pinRef.current;
      if (pin) {
        const layers = Array.from(pin.querySelectorAll('.or-layer'));
        const marks = spineMarksRef.current
          ? Array.from(spineMarksRef.current.querySelectorAll('.or-spine-mark'))
          : [];

        const renderStrata = (p) => {
          const P = clamp01(p);
          const activeTop = Math.min(3, Math.round(P * 3)); // 0=Living … 3=Ancient
          const activeLayer = 3 - activeTop;
          layers.forEach((layer, k) => {
            // Reveal progress for layer k: Living starts revealed; others ease
            // during the peel phase directly above them.
            const rk = k === 3 ? 1 : clamp01((P - (2 - k) / 3) * 3);
            // Peel progress for layer k (Ancient never peels).
            const pk = k === 0 ? 0 : clamp01((P - (3 - k) / 3) * 3);
            const figImg = layer.querySelector('.or-layer-fig img');
            const copy = layer.querySelector('.or-layer-copy');
            gsap.set(layer, {
              clipPath: `inset(0% ${(pk * 100).toFixed(2)}% 0% 0%)`,
              scale: (lerp(DEPTH_SCALE[k], 1, rk) * (1 - 0.045 * pk)).toFixed(4),
              xPercent: (-3 * pk).toFixed(2),
              filter: `brightness(${(1 - 0.12 * pk).toFixed(3)})`,
              zIndex: k + 1,
            });
            if (figImg) {
              gsap.set(figImg, {
                filter: `sepia(${(1 - rk).toFixed(3)}) saturate(${(0.62 + 0.38 * rk).toFixed(3)}) brightness(${(0.9 + 0.1 * rk).toFixed(3)})`,
              });
            }
            if (copy) {
              gsap.set(copy, { y: (30 * (1 - rk)).toFixed(1), opacity: (0.3 + 0.7 * rk).toFixed(3) });
            }
            layer.setAttribute('aria-hidden', k === activeLayer ? 'false' : 'true');
          });
          if (spineFillRef.current) {
            spineFillRef.current.style.height = `${(P * 100).toFixed(2)}%`;
          }
          if (readoutRef.current) {
            const era = content.eras.items[activeLayer];
            readoutRef.current.textContent = `Stratum ${era.numeral} / IV — ${era.name.toUpperCase()}`;
          }
          marks.forEach((m, i) => {
            m.classList.toggle('is-active', i === activeTop);
          });
        };

        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          renderStrata(0);
          ScrollTrigger.create({
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=350%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => renderStrata(self.progress),
          });
        });
        /* Mobile: stacked era chapters in normal flow (CSS). Mobile + JS
           don't mix — the strata render as full-color static plates. */
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;
  const featureEntry = content.journal.entries[0];
  const restEntries = content.journal.entries.slice(1);

  return (
    <div ref={rootRef} className={`tpl-design-04-heritage${reduced ? ' or-reduced' : ''}`}>
      <header className="or-nav">
        <a className="or-wordmark" href="#hero" aria-label="Old Roads — home">
          <Crest />
          <span className="or-wordmark-text">
            <span className="or-wordmark-name">{name}</span>
            <span className="or-wordmark-sub">{content.brand.descriptor}</span>
          </span>
        </a>
        <nav className="or-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="or-cta" href="#visit">
          Plan
        </a>
      </header>

      <main>
        {/* HERO — still image, slow drift */}
        <section id="hero" className="or-hero" data-tour="Old Roads">
          <div className="or-hero-frame">
            <div className="or-hero-drift">
              <Img
                k="hero"
                src={heroPoster}
                eager
                alt="An ancient sandstone temple at dawn, mist drifting around its carved tower under a deep indigo sky"
                className="or-hero-media"
              />
            </div>
            <div className="or-hero-shade" aria-hidden="true" />
          </div>
          <div className="or-hero-copy">
            <p className="or-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="or-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="or-hero-sub">{content.hero.sub}</p>
            <div className="or-hero-cta-row">
              <a className="or-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <a className="or-link" href={content.hero.secondaryHref}>
                {content.hero.secondary}
              </a>
            </div>
            <p className="or-hero-plate">{content.brand.est} · Printed &amp; walked</p>
          </div>
        </section>

        {/* ERAS — excavation layers (signature scroll mechanic) */}
        <section id="destinations" className="or-eras" data-tour="The Eras">
          <div className="or-wrap or-eras-head">
            <p className="or-eyebrow or-rv">{content.eras.eyebrow}</p>
            <h2 className="or-h2 or-sec-title">
              <Words text={content.eras.title} />
            </h2>
            <span className="or-rule" aria-hidden="true" />
            <p className="or-body or-rv">{content.eras.intro}</p>
            <p className="or-eras-hint or-rv">{content.eras.hint}</p>
          </div>
          <div ref={pinRef} className="or-pin">
            <div className="or-readout" ref={readoutRef} aria-hidden="true">
              Stratum IV / IV — LIVING
            </div>
            <div className="or-stage">
              {content.eras.items.map((era, i) => (
                <EraLayer
                  key={era.name}
                  era={era}
                  index={i}
                  journey={content.journeys[era.journey]}
                  media={eraMedia[era.journey]}
                />
              ))}
            </div>
            <aside className="or-spine" aria-hidden="true">
              <div className="or-spine-track">
                <span className="or-spine-fill" ref={spineFillRef} />
              </div>
              <div ref={spineMarksRef}>
                {[...content.eras.items].reverse().map((era, i) => (
                  <span
                    key={era.name}
                    className={`or-spine-mark${i === 0 ? ' is-active' : ''}`}
                    style={{ top: `${i * 33.3333}%` }}
                  >
                    <span className="or-spine-label">{era.name}</span>
                    <span className="or-spine-dot" />
                  </span>
                ))}
              </div>
            </aside>
          </div>
          <div className="or-wrap or-eras-foot">
            <p className="or-rv">Bedrock reached. The dig is over — the journey begins.</p>
          </div>
        </section>

        {/* FILM — "Morning Rite" interlude: scroll-scrubbed film moment (pinned) */}
        <section id="gallery" className="or-sec or-film" data-tour="Morning Rite">
          <div className="or-wrap">
            <p className="or-eyebrow or-rv">{content.film.eyebrow}</p>
            <h2 className="or-h2 or-sec-title">
              <Words text={content.film.title} />
            </h2>
            <span className="or-rule" aria-hidden="true" />
            <p className="or-body or-rv">{content.film.body}</p>
          </div>
          <ScrollFrames
            frames={frames}
            alt="Ten seconds inside a sandstone temple courtyard at dawn — incense smoke curling, light shafts crossing carved pillars, a doorway glowing from within"
            pinDistance="+=170%"
            stageHeight="80svh"
            className="or-film-scrub"
          >
            <p className="or-film-caption">{content.film.caption}</p>
            <p className="or-film-plate">Old Roads · Field film no. 4</p>
          </ScrollFrames>
        </section>

        {/* JOURNAL — monograph field notes */}
        <section id="story" className="or-sec or-journal" data-tour="The Journal">
          <div className="or-wrap">
            <div className="or-journal-head">
              <p className="or-eyebrow or-rv">{content.journal.eyebrow}</p>
              <h2 className="or-h2 or-sec-title">
                <Words text={content.journal.title} />
              </h2>
              <span className="or-rule" aria-hidden="true" />
              <p className="or-body or-rv">{content.journal.intro}</p>
            </div>
            <div className="or-journal-feature">
              <figure className="or-journal-fig or-wipe or-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Macro of carved sandstone beside a small brass diya lamp with a single living flame"
                />
              </figure>
              <article className="or-rv">
                <p className="or-entry-kicker">{featureEntry.date}</p>
                <h3 className="or-entry-title">{featureEntry.title}</h3>
                <p className="or-entry-excerpt">{featureEntry.excerpt}</p>
                <a className="or-entry-link" href="#contact">
                  Read the dispatch
                </a>
              </article>
            </div>
            <div className="or-journal-grid">
              {restEntries.map((e) => (
                <article key={e.title} className="or-rv">
                  <p className="or-entry-kicker">{e.date}</p>
                  <h3 className="or-entry-title">{e.title}</h3>
                  <p className="or-entry-excerpt">{e.excerpt}</p>
                  <a className="or-entry-link" href="#contact">
                    Read the dispatch
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GUIDES — scholar guides */}
        <section id="craft" className="or-sec or-guides" data-tour="Scholar Guides">
          <div className="or-wrap">
            <div className="or-guides-head">
              <p className="or-eyebrow or-rv">{content.guides.eyebrow}</p>
              <h2 className="or-h2 or-sec-title">
                <Words text={content.guides.title} />
              </h2>
              <span className="or-rule" aria-hidden="true" />
              <p className="or-body or-rv">{content.guides.intro}</p>
            </div>
            <div className="or-guides-grid">
              {content.guides.items.map((g) => (
                <article key={g.name} className="or-guide or-rv">
                  <span className="or-guide-mono" aria-hidden="true">
                    {g.initials}
                  </span>
                  <h3 className="or-guide-name">{g.name}</h3>
                  <p className="or-guide-field">{g.field}</p>
                  <p className="or-guide-bio">{g.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* VISIT — plan + contact */}
        <section id="visit" className="or-sec or-visit" data-tour="Plan Your Journey">
          <div className="or-wrap or-visit-grid">
            <div>
              <p className="or-eyebrow or-rv">{content.visit.eyebrow}</p>
              <h2 className="or-h2 or-sec-title">
                <Words text={content.visit.title} />
              </h2>
              <span className="or-rule" aria-hidden="true" />
              <p className="or-body or-rv">{content.visit.intro}</p>
              <dl className="or-facts or-rv">
                {content.visit.facts.map((f) => (
                  <div className="or-fact" key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="or-visit-card or-rv" aria-label="Contact details">
              <h3>Write, call, or visit</h3>
              <address className="or-address">
                {content.visit.address}
                <br />
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
                <br />
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  Find us on the map
                </a>
              </address>
              <p className="or-visit-note">{content.visit.note}</p>
            </aside>
          </div>
        </section>

        {/* CONTACT — correspondence band */}
        <section id="contact" className="or-sec or-contact" data-tour="Contact">
          <div className="or-wrap">
            <p className="or-eyebrow or-rv">{content.contact.eyebrow}</p>
            <h2 className="or-contact-title or-sec-title or-rv">
              <Words text={content.contact.title} />
            </h2>
            <p className="or-body or-rv">{content.contact.body}</p>
            <div className="or-contact-row or-rv">
              <a className="or-cta" href={`mailto:${email}?subject=A%20letter%20to%20Old%20Roads`}>
                {content.contact.cta}
              </a>
              <a className="or-link" href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>
                {content.visit.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="or-footer">
        <div className="or-wrap or-footer-inner">
          <span className="or-wordmark" aria-hidden="true">
            <Crest />
            <span className="or-wordmark-text">
              <span className="or-wordmark-name">{name}</span>
              <span className="or-wordmark-sub">{content.brand.descriptor}</span>
            </span>
          </span>
          <p className="or-footer-line">{content.footer.line}</p>
          <nav className="or-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="or-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
