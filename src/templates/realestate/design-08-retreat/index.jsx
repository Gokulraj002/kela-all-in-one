import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-retreat';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans ("Where the days end", not "Wherethe daysend"). */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sr-wm ${className}`} aria-label={text}>
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

const listingAssets = [
  { image: listing1Img, imgKey: 'product-0', alt: 'Beach villa exterior with bleached wood deck and linen curtains drifting in open glass doors' },
  { image: listing2Img, imgKey: 'product-1', alt: 'Open-plan living room facing the sea through floor-to-ceiling glass, warm white interior' },
  { image: listing3Img, imgKey: 'product-2', alt: 'Bedroom with ocean view, sheer curtains glowing in soft morning light' },
];

/* Depth-layer chapter labels for the pinned parallax readout */
const depthChapters = ['The sea', 'The villa', 'The waterline'];

function ResidenceCard({ residence, index }) {
  const { productName, price, img } = useCustom();
  const asset = listingAssets[index];
  return (
    <article className="sr-card" aria-label={productName(index, residence.name)}>
      <div className="sr-card-visual">
        <Img k={asset.imgKey} src={img(asset.imgKey, asset.image)} alt={asset.alt} loading="lazy" />
      </div>
      <div className="sr-card-body">
        <p className="sr-eyebrow">Residence {String(index + 1).padStart(2, '0')}</p>
        <h3 className="sr-card-name">{productName(index, residence.name)}</h3>
        <p className="sr-card-desc">{residence.desc}</p>
        <ul className="sr-card-specs">
          {residence.specs.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="sr-card-price">
          <span className="sr-price-note">from</span> {price(residence.price)}
        </p>
      </div>
    </article>
  );
}

export default function Design08Retreat() {
  const { brand, img, contact, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const chapterRef = useRef(null);
  const name = brand || content.brand.name;
  const email = contact.email || content.ownership.contact.email;
  const phone = contact.phone || content.ownership.contact.phone;

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

      /* Hero entrance: unhurried — the frame breathes in, the headline rises
         word by word, the tide line draws itself. Total ~2.6s, slow by design. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sr-hero .sf-wrap',
        { clipPath: 'inset(6% 4% 94% 4%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 2, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.sr-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 },
          0.5
        )
        .fromTo(
          '.sr-hero-sub, .sr-hero-ctas',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 },
          1.1
        )
        .fromTo(
          '.sr-tide-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: 'sine.inOut' },
          1
        );

      /* Hero drift is now reader-driven: the frame sequence scrubs with
         scroll (ScrollFrames), so the old autoplay settle-drift is retired. */

      /* Nav solidifies past the hero — barely there, then just enough. */
      ScrollTrigger.create({
        trigger: '.sr-hero',
        scroller: sc,
        start: 'bottom 78%',
        toggleClass: { targets: '.sr-nav', className: 'is-solid' },
      });

      /* Slow reveals everywhere else — long, tide-like, never rushed. */
      gsap.utils.toArray('.sr-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'sine.inOut',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sr-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'sine.inOut',
            stagger: 0.22,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.sr-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'sine.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* ── Signature mechanic: parallax depth layers (MOTION.md §08) ──
         Pinned full-bleed scene in 3 depth layers. Scroll drifts each layer
         at its own rate — foreground 18 / mid 8 / background 3 — with
         tide-like sine.inOut easing, while the residence cards float up
         between the layers. Gated to ≥768px; mobile + reduced-motion keep
         the static layered composition with every card visible. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.sr-depth-pin');
        if (!pin) return;
        const cards = gsap.utils.toArray('.sr-card', pin);
        /* Hidden states are set here (desktop pin only) so mobile and
           reduced-motion never start with invisible content. */
        gsap.set('.sr-layer-mid', { xPercent: -50 });
        gsap.set(cards, { xPercent: -50, yPercent: -50, y: '46vh', opacity: 0 });
        gsap.set('.sr-depth-head', { opacity: 0, y: 30 });

        const dtl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(2, Math.floor(self.progress * 3));
              if (chapterRef.current) {
                chapterRef.current.textContent = `${String(i + 1).padStart(2, '0')} — ${depthChapters[i]}`;
              }
            },
          },
        });
        /* The heading breathes in first. */
        dtl.to('.sr-depth-head', { opacity: 1, y: 0, duration: 0.4, ease: 'sine.inOut' }, 0);
        /* Depth layers drift apart — foreground fastest, background slowest. */
        dtl.to('.sr-layer-fg', { yPercent: 18, ease: 'sine.inOut', duration: 3 }, 0);
        dtl.to('.sr-layer-mid', { yPercent: 8, ease: 'sine.inOut', duration: 3 }, 0);
        dtl.to('.sr-layer-bg', { yPercent: 3, ease: 'sine.inOut', duration: 3 }, 0);
        dtl.to('.sr-depth-head', { opacity: 0, y: -40, duration: 0.35, ease: 'sine.inOut' }, 0.45);
        /* Each residence floats up between the layers, lingers, drifts on. */
        cards.forEach((card, i) => {
          const at = 0.7 + i * 0.75;
          dtl.to(card, { y: '0vh', opacity: 1, duration: 0.5, ease: 'sine.inOut' }, at);
          dtl.to(card, { y: '-46vh', opacity: 0, duration: 0.5, ease: 'sine.inOut' }, at + 0.62);
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.ownership.contact.address)}`;

  return (
    <div ref={rootRef} className={`tpl-design-08-retreat${reduced ? ' is-reduced' : ''}`}>
      {/* NAV — barely there, with the horizon-line motif */}
      <header className="sr-nav">
        <a className="sr-wordmark" href="#hero">{name}</a>
        <nav className="sr-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="sr-cta" href="#ownership">Arrange a visit</a>
        <span className="sr-horizon" aria-hidden="true" />
      </header>

      <main>
        {/* HERO — the signature film, now scroll-driven frame by frame */}
        <section id="hero" className="sr-hero" data-tour="Arrive">
          <ScrollFrames
            frames={frames}
            alt="Slow drift over an infinity pool toward the ocean, palm fronds swaying at the frame edge, the horizon settling into view"
            pinDistance="+=170%"
          >
            <div className="sr-hero-veil" aria-hidden="true" />
            <div className="sr-hero-copy">
              <p className="sr-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="sr-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="sr-hero-sub">{content.hero.sub}</p>
              <div className="sr-hero-ctas">
                <a className="sr-cta sr-cta-solid" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <span className="sr-hero-note">{content.hero.note}</span>
              </div>
            </div>
            <div className="sr-scroll-cue" aria-hidden="true">
              <span className="sr-tide-line" />
              <span className="sr-scroll-label">drift down</span>
            </div>
          </ScrollFrames>
        </section>

        {/* THE PLACE */}
        <section id="place" className="sr-place" data-tour="The Place">
          <div className="sr-wrap">
            <p className="sr-eyebrow sr-rv">{content.place.eyebrow}</p>
            <h2 className="sr-h2 sr-rv">
              <Words text={content.place.title} />
            </h2>
            <span className="sr-rule" aria-hidden="true" />
            <div className="sr-place-cols">
              {content.place.body.map((p, i) => (
                <p className="sr-body sr-rv" key={i}>{p}</p>
              ))}
            </div>
            <dl className="sr-facts sr-stagger">
              {content.place.facts.map((f) => (
                <div className="sr-fact" key={f.unit}>
                  <dt className="sr-fact-value">{f.value}</dt>
                  <dd className="sr-fact-unit">{f.unit}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* RESIDENCES — pinned parallax depth layers */}
        <section id="residences" className="sr-depth-sec" data-tour="Residences">
          <div className="sr-depth-pin">
            <div className="sr-layers" aria-hidden="true">
              <div className="sr-layer sr-layer-bg">
                <Img k="hero" src={img('hero', heroImg)} alt="" />
              </div>
              <div className="sr-layer sr-layer-mid">
                <Img k="product-0" src={img('product-0', listing1Img)} alt="" />
              </div>
              <div className="sr-layer sr-layer-fg">
                <Img k="detail" src={img('detail', detailImg)} alt="" />
              </div>
              <div className="sr-layer-veil" aria-hidden="true" />
            </div>
            <div className="sr-depth-head">
              <p className="sr-eyebrow">{content.residences.eyebrow}</p>
              <h2 className="sr-h2 sr-h2-light">{content.residences.title}</h2>
              <p className="sr-depth-hint">{content.residences.hint}</p>
            </div>
            <div className="sr-cards">
              {content.residences.items.map((r, i) => (
                <ResidenceCard key={r.name} residence={r} index={i} />
              ))}
            </div>
            <p className="sr-depth-chapter" aria-live="polite">
              <span ref={chapterRef}>01 — The sea</span>
            </p>
          </div>
          {/* Static composition for mobile / reduced-motion: same content, no pins */}
          <div className="sr-depth-static">
            <div className="sr-wrap">
              <p className="sr-eyebrow">{content.residences.eyebrow}</p>
              <h2 className="sr-h2">{content.residences.title}</h2>
              <span className="sr-rule" aria-hidden="true" />
              {content.residences.items.map((r, i) => (
                <ResidenceCard key={r.name} residence={r} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* THE SLOW LIFE */}
        <section id="slow-life" className="sr-slow" data-tour="The Slow Life">
          <div className="sr-wrap">
            <p className="sr-eyebrow sr-rv">{content.slowLife.eyebrow}</p>
            <h2 className="sr-h2 sr-rv">
              <Words text={content.slowLife.title} />
            </h2>
            <span className="sr-rule" aria-hidden="true" />
            <p className="sr-body sr-slow-lede sr-rv">{content.slowLife.body}</p>
            <div className="sr-slow-grid">
              <ol className="sr-rituals sr-stagger">
                {content.slowLife.rituals.map((r) => (
                  <li className="sr-ritual" key={r.time}>
                    <span className="sr-ritual-time">{r.time}</span>
                    <div>
                      <h3 className="sr-ritual-title">{r.title}</h3>
                      <p className="sr-ritual-text">{r.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="sr-slow-visual sr-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Close-up where an infinity pool's edge meets the sea — two bands of water merging at a pale stone line"
                  loading="lazy"
                />
                <figcaption>The waterline, most mornings</figcaption>
              </figure>
            </div>
            <ul className="sr-services sr-stagger" aria-label="Included in every stay">
              {content.slowLife.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* OWNERSHIP */}
        <section id="ownership" className="sr-own" data-tour="Ownership">
          <div className="sr-wrap">
            <p className="sr-eyebrow sr-rv">{content.ownership.eyebrow}</p>
            <h2 className="sr-h2 sr-rv">
              <Words text={content.ownership.title} />
            </h2>
            <span className="sr-rule" aria-hidden="true" />
            <p className="sr-body sr-own-lede sr-rv">{content.ownership.body}</p>
            <div className="sr-plans sr-stagger">
              {content.ownership.plans.map((plan) => (
                <article className="sr-plan" key={plan.name}>
                  <h3 className="sr-plan-name">{plan.name}</h3>
                  <p className="sr-plan-price">
                    <span className="sr-price-note">{plan.priceNote}</span> {price(plan.price)}
                  </p>
                  <ul className="sr-plan-lines">
                    {plan.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <div className="sr-contact">
                <h3 className="sr-h3">Begin with a visit</h3>
                <p className="sr-body">The ferry leaves the Gateway at 9:40. We meet you at the jetty.</p>
                <address className="sr-address">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  <a href={`mailto:${email}`}>{email}</a>
                  <span>{content.ownership.contact.address}</span>
                </address>
                <div className="sr-own-ctas">
                  <a className="sr-cta sr-cta-solid" href={mapsUrl} target="_blank" rel="noreferrer">Find the reserve</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sr-footer">
        <span className="sr-horizon" aria-hidden="true" />
        <p className="sr-footer-line">{content.footer.line}</p>
        <p className="sr-colophon">{content.footer.colophon}</p>
        <p className="sr-footer-contact">
          <a href={`mailto:${email}`}>{email}</a> · <span>{content.ownership.contact.instagram}</span>
        </p>
      </footer>
    </div>
  );
}
