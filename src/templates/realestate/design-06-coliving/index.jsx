import React, { useEffect, useLayoutEffect } from 'react';
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

/* Scroll-driven "Courtyard life" sequence — Apple-style frame scrub.
   Frames are eager-loaded URLs so frame 0 paints immediately (no blank flash). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-coliving';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';

/* Server-safe word-mask headline. Each word is an inline-block mask, so a
   real space is rendered between the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`kh-wm ${className}`} aria-label={text}>
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

/* Deterministic 0..1 "random" per card: the scatter keeps the same loose
   pile on every refresh instead of re-rolling positions (which made the
   cards jump whenever the page re-measured). */
const jitter = (i, salt) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export default function Design06Coliving() {
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

      /* Hero entrance: masked word-rise, sticker pop, note fade. <= 2s. */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.kh-hero .wi', { yPercent: 115 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 }, 0.15)
        .fromTo('.kh-hero-sticker', { scale: 0, rotation: -20 }, { scale: 1, rotation: 2.5, duration: 0.7, ease: 'back.out(2)' }, 0.7)
        .fromTo(
          '.kh-hero-sub, .kh-hero-actions, .kh-hero-note',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          0.85
        );

      /* Generic reveals. */
      gsap.utils.toArray('.kh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.kh-stagger').forEach((group) => {
        /* Land on each card's designed tilt (story cards and the featured
           plan are rotated in CSS) instead of flattening it to 0deg. */
        const rest = Array.from(group.children).map((el) => Number(gsap.getProperty(el, 'rotation')) || 0);
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40, rotation: (i) => rest[i] + (i % 2 ? 2 : -2) },
          {
            opacity: 1,
            y: 0,
            rotation: (i) => rest[i],
            duration: 1.05,
            ease: 'back.out(1.5)',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Polaroid scatter — the design's scroll mechanic.
         Desktop + motion: set A (the houses) scatters in from a loose pile
         with springy back.out rotation as the board scrolls in, settles into
         a readable grid as the stage pins, then re-scatters away while set B
         (house life) assembles from its own scatter. Mobile / reduced motion
         get the same content as a clean static stack (see matchMedia gate). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const stage = rootRef.current && rootRef.current.querySelector('.kh-pin-stage');
        if (!stage) return undefined;
        const blockA = stage.querySelector('.kh-set-a');
        const blockB = stage.querySelector('.kh-set-b');

        gsap.set('.kh-set-block', {
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.2rem',
        });

        const scattered = (spread, salt) => ({
          x: (i) => (jitter(i, salt) * 2 - 1) * spread,
          y: (i) => (jitter(i, salt + 1) * 2 - 1) * spread * 0.72,
          rotation: (i) => (jitter(i, salt + 2) * 2 - 1) * 34,
          scale: 0.85,
          opacity: 0,
        });
        const restRot = (i, el) => parseFloat(el.dataset.rot || 0);
        const grid = { x: 0, y: 0, scale: 1, opacity: 1, rotation: restRot };

        /* Only the set on screen is exposed to assistive tech. */
        let exposed = '';
        const expose = (which) => {
          if (which === exposed) return;
          exposed = which;
          if (blockA) blockA.setAttribute('aria-hidden', String(which !== 'a'));
          if (blockB) blockB.setAttribute('aria-hidden', String(which !== 'b'));
        };
        expose('a');

        /* 1 · On scroll enter: set A scatters in from the pile, springy, and
           lands as a readable grid by the time the stage pins — the board is
           never an empty frame while it approaches. */
        const tlIn = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            scroller: sc,
            start: 'top 85%',
            end: 'top top',
            scrub: 0.6,
          },
        });
        tlIn.fromTo('.kh-set-a .kh-polaroid', { ...scattered(430, 1), scale: 0.8 }, {
          ...grid,
          ease: 'back.out(1.35)',
          stagger: 0.16,
        }, 0);
        tlIn.fromTo('.kh-set-a .kh-set-label', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);

        /* 2 · Pinned: settle, re-scatter A, assemble B, settle B. Every tween
           has explicit from/to values (fixed px/deg), so refreshes never
           re-record a mid-scrub state and the grid always lands square. */
        const tl = gsap.timeline({
          defaults: { immediateRender: false },
          onUpdate: () => expose(tl.time() < 1.4 ? 'a' : 'b'),
          scrollTrigger: {
            trigger: stage,
            scroller: sc,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        /* Settle: a small playful nudge once the grid is readable. */
        tl.fromTo('.kh-set-a .kh-polaroid', { y: 0, rotation: restRot }, {
          y: 14,
          rotation: (i, el) => restRot(i, el) + 1.5,
          duration: 0.45,
          ease: 'sine.inOut',
          stagger: { each: 0.12, yoyo: true, repeat: 1 },
        }, 0.1);

        /* Re-scatter set A away... */
        tl.fromTo('.kh-set-a .kh-polaroid', grid, {
          ...scattered(480, 7),
          ease: 'power3.in',
          stagger: 0.1,
        }, 1.25);
        tl.fromTo('.kh-set-a .kh-set-label', { opacity: 1, y: 0 }, { opacity: 0, y: -24, duration: 0.45, ease: 'power2.in' }, 1.25);

        /* ...and assemble set B from its own scatter into the grid. */
        tl.fromTo('.kh-set-b .kh-polaroid', scattered(480, 13), {
          ...grid,
          ease: 'back.out(1.35)',
          stagger: 0.16,
        }, 1.4);
        tl.fromTo('.kh-set-b .kh-set-label', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 1.45);

        /* Final settle on set B before the pin releases. */
        tl.fromTo('.kh-set-b .kh-polaroid', { y: 0, rotation: restRot }, {
          y: 12,
          rotation: (i, el) => restRot(i, el) + 1.2,
          duration: 0.45,
          ease: 'sine.inOut',
          stagger: { each: 0.12, yoyo: true, repeat: 1 },
        }, 2.55);
        tl.to({}, { duration: 0.3 });

        /* Set B waits hidden (scattered) until its turn in the pin. */
        gsap.set('.kh-set-b .kh-polaroid', scattered(480, 13));
        gsap.set('.kh-set-b .kh-set-label', { opacity: 0, y: 26 });

        return () => {
          if (blockA) blockA.removeAttribute('aria-hidden');
          if (blockB) blockB.removeAttribute('aria-hidden');
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const housePicks = content.scatter.houses.map((h, i) => ({
    ...h,
    imgKey: `product-${i}`,
    src: img(`product-${i}`, [listing1Img, listing2Img, listing3Img][i]),
  }));
  const momentPicks = [
    { ...content.scatter.moments[0], imgKey: 'detail', src: img('detail', detailImg), tag: 'Every Sunday' },
    { ...content.scatter.moments[1], imgKey: 'hero', src: img('hero', heroImg), tag: 'Claim by 9 am' },
    { ...content.scatter.moments[2], imgKey: 'product-3', src: img('product-3', listing3Img), tag: 'Fridays' },
  ];
  const rotVals = [-2, 1.8, -1.2];
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-06-coliving">
      <header className="kh-nav">
        <a className="kh-wordmark" href="#hero" aria-label={name}>
          {name.split(' ').map((w, i, a) => (
            <React.Fragment key={w}>
              {w}
              {i < a.length - 1 && <span className="kh-dot">.</span>}
            </React.Fragment>
          ))}
        </a>
        <nav className="kh-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="kh-cta" href="#pricing">Book a tour</a>
      </header>

      <main>
        {/* HERO — courtyard-life scroll-driven sequence */}
        <section id="hero" className="kh-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Sunlit co-living courtyard: hammocks between trees, a long shared table, string lights overhead"
            pinDistance="+=170%"
          >
            <div className="kh-hero-shade" aria-hidden="true" />
            <div className="kh-hero-copy">
              <span className="kh-hero-sticker">{content.hero.sticker}</span>
              <p className="kh-eyebrow" style={{ color: 'var(--color-cream)', background: 'transparent', borderColor: 'var(--color-cream)', boxShadow: '3px 3px 0 var(--color-cream)' }}>
                {content.hero.eyebrow}
              </p>
              <h1 className="kh-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="kh-hero-sub">{content.hero.sub}</p>
              <div className="kh-hero-actions">
                <a className="kh-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="kh-cta kh-cta--ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
              </div>
              <p className="kh-hero-note">
                <strong>Move-in ready.</strong> {content.hero.note}
              </p>
            </div>
          </ScrollFrames>
        </section>

        {/* HOUSES — polaroid scatter board */}
        <section id="houses" className="kh-sec kh-scatter-sec" data-tour="The Houses">
          <div className="kh-wrap kh-scatter-head">
            <p className="kh-eyebrow kh-rv">{content.scatter.label}</p>
            <h2 className="kh-h2 kh-rv">Pick your <em>house.</em></h2>
            <p className="kh-scatter-hint kh-rv">
              Scroll — the pile scatters, then settles <span className="kh-arrow" aria-hidden="true">&#8595;</span>
            </p>
          </div>
          <div className="kh-pin-stage">
            <div className="kh-set-block kh-set-a">
              <div className="kh-set-label">
                <p className="kh-set-kicker">{content.scatter.setA.kicker}</p>
                <h3 className="kh-set-title">{content.scatter.setA.title}</h3>
              </div>
              <div className="kh-set">
                {housePicks.map((h, i) => (
                  <article className="kh-polaroid" data-rot={rotVals[i]} key={h.name}>
                    <div className="kh-pol-frame">
                      <Img k={h.imgKey} src={h.src} alt={h.photoAlt} />
                      <span className="kh-price-sticker">
                        {price(h.price)}
                        <small>{h.unit}</small>
                      </span>
                    </div>
                    <p className="kh-pol-cap">{productName(i, h.name)}</p>
                    <p className="kh-pol-note">{h.caption} · {h.note}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="kh-set-block kh-set-b">
              <div className="kh-set-label">
                <p className="kh-set-kicker">{content.scatter.setB.kicker}</p>
                <h3 className="kh-set-title">{content.scatter.setB.title}</h3>
              </div>
              <div className="kh-set">
                {momentPicks.map((m, i) => (
                  <article className="kh-polaroid" data-rot={rotVals[i]} key={m.caption}>
                    <div className="kh-pol-frame">
                      <Img k={m.imgKey} src={m.src} alt={m.photoAlt} />
                      <span className="kh-tag-sticker">{m.tag}</span>
                    </div>
                    <p className="kh-pol-cap">{m.caption}</p>
                    <p className="kh-pol-note">{m.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RITUALS */}
        <section id="rituals" className="kh-sec kh-rituals" data-tour="House Rituals">
          <div className="kh-wrap">
            <div className="kh-ritual-grid">
              <div className="kh-ritual-photo kh-rv">
                <Img k="product-1" src={img('product-1', listing2Img)} alt={content.rituals.photoAlt} />
              </div>
              <div>
                <p className="kh-eyebrow kh-rv">{content.rituals.eyebrow}</p>
                <h2 className="kh-h2 kh-rv">{content.rituals.title}</h2>
                <p className="kh-lede kh-rv">{content.rituals.body}</p>
                <ul className="kh-ritual-list kh-stagger">
                  {content.rituals.items.map((r) => (
                    <li className="kh-ritual" key={r.name}>
                      <span className="kh-day-badge">{r.day}</span>
                      <div>
                        <h3>{r.name}</h3>
                        <p>{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERS */}
        <section id="members" className="kh-sec kh-members" data-tour="Member Stories">
          <div className="kh-wrap">
            <p className="kh-eyebrow kh-rv">{content.members.eyebrow}</p>
            <h2 className="kh-h2 kh-rv">Moved in for a month. <em>Stayed for years.</em></h2>
            <div className="kh-story-grid kh-stagger">
              {content.members.stories.map((s) => (
                <article className="kh-story" key={s.name}>
                  <span className="kh-story-badge">Housemate</span>
                  <blockquote>{s.quote}</blockquote>
                  <p className="kh-story-name">{s.name}</p>
                  <p className="kh-story-role">{s.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="kh-sec kh-pricing" data-tour="Pricing">
          <div className="kh-wrap">
            <p className="kh-eyebrow kh-rv">{content.pricing.eyebrow}</p>
            <h2 className="kh-h2 kh-rv">One number. <em>Everything in.</em></h2>
            <p className="kh-lede kh-rv">{content.pricing.body}</p>
            <div className="kh-plans kh-stagger">
              {content.pricing.plans.map((p, i) => (
                <article className={`kh-plan${i === 1 ? ' is-featured' : ''}`} key={p.name}>
                  <span className="kh-plan-tag">{p.tag}</span>
                  <h3 className="kh-plan-name">{productName(10 + i, p.name)}</h3>
                  <p className="kh-plan-price">
                    {price(p.price)}
                    <small>{p.unit}</small>
                  </p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className="kh-cta" href="#visit">Book a tour</a>
                </article>
              ))}
            </div>
            <p className="kh-fineprint kh-rv">{content.pricing.fineprint}</p>
          </div>
        </section>
      </main>

      {/* FOOTER / VISIT */}
      <footer id="visit" className="kh-footer" data-tour="Visit">
        <div className="kh-wrap">
          <div className="kh-footer-grid">
            <div>
              <h2 className="kh-h2 kh-rv">{content.visit.title}</h2>
              <p className="kh-footer-body kh-rv">{content.visit.body}</p>
              <a className="kh-cta kh-rv" href={`mailto:${email}?subject=Tour%20booking`}>Book a tour</a>
            </div>
            <div className="kh-footer-links kh-rv">
              <address className="kh-address">
                {content.visit.address}
                <br />
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <a href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
              <a href="https://instagram.com/" target="_blank" rel="noreferrer">{content.visit.instagram}</a>
            </div>
          </div>
          <div className="kh-footer-base">
            <p>{content.footer.line}</p>
            <p>{content.footer.colophon}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
