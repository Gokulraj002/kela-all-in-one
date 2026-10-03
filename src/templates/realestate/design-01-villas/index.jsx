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

/* Scroll-driven "Dusk arrival" aerial sequence — Apple-style frame scrub.
   Frames are eager-loaded URLs so frame 0 paints immediately (no blank flash). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-villas';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Manrope:wght@400;500;600;700&display=swap';

/* Descent imagery per stop (wide → mid → detail); residence cards carry
   their own listing images. */
const stopImages = [heroImg, listing1Img, detailImg];
const residenceImages = [listing1Img, listing2Img, listing3Img];

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans — otherwise the headline reads as one run-on word. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`me-wm ${className}`} aria-label={text}>
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

function ResidenceCard({ residence, image, index, imgKey }) {
  const { img, productName, price } = useCustom();
  return (
    <article className="me-desc-card">
      <p className="me-eyebrow me-card-eyebrow">
        Residence {String(index + 1).padStart(2, '0')} — {content.descent.stops[index].altitude} m
      </p>
      <div className="me-desc-card-img">
        <Img k={imgKey} src={img(imgKey, image)} alt={residence.alt} />
      </div>
      <h3 className="me-card-name">{productName(index, residence.name)}</h3>
      <p className="me-card-blurb">{residence.blurb}</p>
      <dl className="me-specs">
        <div>
          <dt>Bedrooms</dt>
          <dd>{residence.beds}</dd>
        </div>
        <div>
          <dt>Baths</dt>
          <dd>{residence.baths}</dd>
        </div>
        <div>
          <dt>Area</dt>
          <dd>{residence.area}</dd>
        </div>
        <div>
          <dt>Plot</dt>
          <dd>{residence.plot}</dd>
        </div>
      </dl>
      <p className="me-card-price">{price(residence.price)}</p>
      <a className="me-card-link" href="#contact">
        Request details
      </a>
    </article>
  );
}

export default function Design01Villas() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const descentRef = useRef(null);
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = contact.phone || content.contact.phone;

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

      /* Hero entrance: slow settle of the scrub stage, masked word-rise
         headline, then the whispered supporting lines. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.me-hero .sf-stage', { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
        .fromTo(
          '.me-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 },
          0.3
        )
        .fromTo(
          '.me-hero-eyebrow, .me-hero-sub, .me-hero-cta, .me-hero-hint',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
          0.9
        );

      /* Whispered parallax on the hero copy only (small numeric scrub so the
         drift eases with the scroll instead of stepping with it). */
      gsap.to('.me-hero-copy', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: '.me-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      /* Long, generous reveals. */
      gsap.utils.toArray('.me-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.me-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      /* Champagne rules draw between sections. */
      gsap.utils.toArray('.me-rule').forEach((rule) => {
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

      /* The signature scroll mechanic: a pinned drone-descent journey.
         Desktop only (≥768px) — mobile and reduced-motion get the same
         stops as static stacked sections via CSS. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const descent = descentRef.current;
        if (!descent) return undefined;
        descent.classList.add('me-motion');
        const layers = gsap.utils.toArray('.me-desc-layer', descent);
        const cards = gsap.utils.toArray('.me-desc-card', descent);
        const altNum = descent.querySelector('.me-alt-num');
        const alts = ['300', '120', '12'];
        gsap.set(layers[1], { autoAlpha: 0 });
        gsap.set(layers[2], { autoAlpha: 0 });
        gsap.set(cards[1], { autoAlpha: 0, x: 56 });
        gsap.set(cards[2], { autoAlpha: 0, x: 56 });
        /* Only the residence for the current altitude is exposed to assistive
           tech; the waiting cards are faded out by the timeline. */
        let shown = -1;
        const expose = (idx) => {
          if (idx === shown) return;
          shown = idx;
          cards.forEach((c, k) => c.setAttribute('aria-hidden', String(k !== idx)));
          layers.forEach((l, k) => l.setAttribute('aria-hidden', String(k !== idx)));
        };
        expose(0);

        const dtl = gsap.timeline({
          scrollTrigger: {
            trigger: descent,
            scroller: sc,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(2, Math.round(self.progress * 2));
              if (altNum && altNum.textContent !== alts[idx]) altNum.textContent = alts[idx];
              if (descent.dataset.stop !== String(idx)) descent.dataset.stop = String(idx);
              expose(idx);
            },
          },
        });
        /* Continuous slow push-in on every layer: scale 1.15 → 1. */
        layers.forEach((layer) => {
          dtl.fromTo(
            layer.querySelector('.me-desc-media'),
            { scale: 1.15 },
            { scale: 1, duration: 3, ease: 'none' },
            0
          );
        });
        /* Stop 1 → 2: crossfade to the three-quarter view, swap cards. */
        dtl
          .to(layers[1], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, 0.6)
          .to(cards[0], { autoAlpha: 0, x: -56, duration: 0.55, ease: 'power2.in' }, 0.6)
          .fromTo(
            cards[1],
            { autoAlpha: 0, x: 56 },
            { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out' },
            0.75
          )
          /* Stop 2 → 3: crossfade to the ground-level detail, swap cards. */
          .to(layers[2], { autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, 1.8)
          .to(cards[1], { autoAlpha: 0, x: -56, duration: 0.55, ease: 'power2.in' }, 1.8)
          .fromTo(
            cards[2],
            { autoAlpha: 0, x: 56 },
            { autoAlpha: 1, x: 0, duration: 0.9, ease: 'power3.out' },
            1.95
          );
        return () => {
          descent.classList.remove('me-motion');
          descent.dataset.stop = '0';
          cards.forEach((c) => c.removeAttribute('aria-hidden'));
          layers.forEach((l) => l.removeAttribute('aria-hidden'));
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-01-villas">
      <header className="me-nav">
        <a className="me-wordmark" href="#hero">
          {name}
        </a>
        <nav className="me-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="me-cta" href="#contact">
          Private Viewings
        </a>
      </header>

      <main>
        {/* HERO — "Dusk arrival" scrub sequence */}
        <section id="hero" className="me-hero" data-tour="Arrival">
          <ScrollFrames
            frames={frames}
            alt="Slow aerial orbit over a modern villa at dusk — warm light glowing through glass walls, the pool a sheet of turquoise"
            pinDistance="+=170%"
          >
            <div className="me-hero-scrim" aria-hidden="true" />
            <div className="me-hero-copy">
              <p className="me-eyebrow me-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="me-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="me-hero-sub">{content.hero.sub}</p>
              <a className="me-cta me-hero-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
            </div>
            <p className="me-hero-hint" aria-hidden="true">
              {content.hero.hint}
            </p>
          </ScrollFrames>
        </section>

        {/* RESIDENCES — pinned drone-descent journey */}
        <section id="residences" className="me-residences" data-tour="Residences">
          <div className="me-wrap me-residences-head">
            <p className="me-eyebrow me-rv">{content.descent.eyebrow}</p>
            <h2 className="me-h2 me-rv">{content.descent.title}</h2>
            <span className="me-rule" aria-hidden="true" />
            <p className="me-body me-rv">{content.descent.intro}</p>
          </div>
          <div className="me-descent" ref={descentRef} data-stop="0">
            <div className="me-altitude" aria-hidden="true">
              <span className="me-alt-num">300</span>
              <span className="me-alt-unit">m</span>
              <span className="me-alt-ticks">
                <i />
                <i />
                <i />
              </span>
            </div>
            {content.descent.stops.map((s, i) => (
              <div className="me-stop" key={s.altitude}>
                <div className="me-desc-layer">
                  <div className="me-desc-media">
                    <Img k={s.imgKey} src={img(s.imgKey, stopImages[i])} alt={s.alt} />
                  </div>
                </div>
                <ResidenceCard
                  residence={content.residences[i]}
                  image={residenceImages[i]}
                  imgKey={content.residences[i].imgKey}
                  index={i}
                />
              </div>
            ))}
            <div className="me-desc-scrim" aria-hidden="true" />
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" className="me-philosophy me-dark" data-tour="Philosophy">
          <div className="me-wrap me-phil-grid">
            <div className="me-phil-text">
              <p className="me-eyebrow me-rv">{content.philosophy.eyebrow}</p>
              <h2 className="me-h2 me-rv">{content.philosophy.title}</h2>
              <span className="me-rule" aria-hidden="true" />
              {content.philosophy.body.map((p, i) => (
                <p className="me-body me-rv" key={i}>
                  {p}
                </p>
              ))}
              <ul className="me-principles me-stagger">
                {content.philosophy.principles.map((pr) => (
                  <li key={pr.title}>
                    <h3>{pr.title}</h3>
                    <p>{pr.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="me-phil-img me-rv">
              <Img
                k="detail"
                src={img('detail', detailImg)}
                alt={content.philosophy.imageAlt}
              />
              <figcaption>{content.philosophy.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="me-location" data-tour="Alibaug">
          <div className="me-wrap me-loc-grid">
            <div>
              <p className="me-eyebrow me-rv">{content.location.eyebrow}</p>
              <h2 className="me-h2 me-rv">{content.location.title}</h2>
              <span className="me-rule" aria-hidden="true" />
              {content.location.body.map((p, i) => (
                <p className="me-body me-rv" key={i}>
                  {p}
                </p>
              ))}
              <p className="me-loc-note me-rv">{content.location.note}</p>
            </div>
            <ul className="me-distances me-stagger" aria-label="Distances">
              {content.location.distances.map((d) => (
                <li key={d.place}>
                  <span className="me-dist-place">{d.place}</span>
                  <span className="me-dist-dots" aria-hidden="true" />
                  <span className="me-dist-time">{d.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ENQUIRY */}
        <section id="contact" className="me-contact me-dark" data-tour="Private Viewings">
          <div className="me-wrap me-contact-inner">
            <p className="me-eyebrow me-rv">{content.contact.eyebrow}</p>
            <h2 className="me-contact-title me-rv">
              <Words text={content.contact.title} />
            </h2>
            <p className="me-body me-rv">{content.contact.body}</p>
            <div className="me-contact-rows me-stagger">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
              <span>{content.contact.hours}</span>
            </div>
            <a className="me-cta me-cta-gold me-rv" href={`mailto:${email}?subject=Private%20viewing%20request`}>
              Request a private viewing
            </a>
          </div>
        </section>
      </main>

      <footer className="me-footer me-dark">
        <div className="me-wrap">
          <p className="me-footer-word">{name}</p>
          <p className="me-footer-line">{content.footer.line}</p>
          <p className="me-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
