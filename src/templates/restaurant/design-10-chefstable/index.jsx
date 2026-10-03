import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import { brandFor } from '../../_shared/brand.js';
import './styles.css';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-chefstable';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Space+Mono:wght@400;700&display=swap';

const FEATURED_FILES = [dish1Img, dish2Img, dish3Img];
const FALLBACK_EMAIL = `boxoffice@${(brandFor('restaurant') || {}).domain || 'example.com'}`;

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = String(text).split(' ');
  return (
    <span className={`enc-wm ${className}`} aria-label={text}>
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

function Eyebrow({ children, className = '' }) {
  return <p className={`enc-eyebrow rv ${className}`}>{children}</p>;
}

/* One act: two-panel curtain parts horizontally from centre (scrubbed),
   a soft-edged spotlight opens on the featured dish, the act title rises
   through a mask. Defaults are the OPEN state; GSAP only closes-then-opens. */
function Act({ act, index }) {
  const { img, productName } = useCustom();
  /* Product slots run 0–8 across the nine scenes, act-major order; the
     featured dish shares its scene's slot (Scenes 1 / 4 / 7). */
  const slot = index * 3;
  const dishName = productName(slot, act.featured.name);
  return (
    <article id={act.id} className="enc-act" aria-label={`${act.numeral} — ${act.title}`}>
      <div className="enc-act-stage">
        <div className="enc-spot">
          <Img
            k={act.featured.imgKey}
            src={img(act.featured.imgKey, FEATURED_FILES[index])}
            alt={act.featured.alt}
            className="enc-spot-img"
          />
          <div className="enc-spot-veil" aria-hidden="true" />
        </div>
        <div className="enc-curtain" aria-hidden="true">
          <div className="enc-curtain-l" />
          <div className="enc-curtain-r" />
        </div>
        <p className="enc-act-numeral">{act.numeral}</p>
      </div>
      <div className="enc-act-body">
        <p className="enc-act-kicker">{act.numeral}</p>
        <h3 className="enc-act-title">
          <span className="enc-mask">
            <span className="enc-mask-i">{act.title}</span>
          </span>
        </h3>
        <p className="enc-stage-dir">{act.direction}</p>
        <p className="enc-spot-name">
          TONIGHT’S SPOTLIGHT — <span>{dishName}</span>
        </p>
        <ul className="enc-playbill">
          {act.scenes.map((s, si) => (
            <li className="enc-scene" key={`${s.label}-${s.name}`}>
              <span className="enc-scene-edge" aria-hidden="true" />
              <h4 className="enc-scene-name">
                {s.label} — {productName(slot + si, s.name)}
              </h4>
              <p className="enc-scene-desc">{s.desc}</p>
              <p className="enc-scene-note">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Design10Chefstable() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const { brand, img, price, contact } = useCustom();
  const brandName = brand || content.brand.name;
  const [tier, setTier] = useState(1);
  const [booked, setBooked] = useState(false);

  /* Fonts: inject once, never remove. */
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }, []);

  /* Hero scrub: scroll-driven frame sequence (replaces the hero loop video).
     Frames play 0..N-1 pinned for +=170% of scroll; reduced-motion renders
     the first frame statically with no pin. */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // static final state; CSS handles visibility
      const sc = scroller();

      /* House grammar: soft rises. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hero: 0.5s black hold, then the frame-sequence stage wipes in;
         headline rises beneath it. Initial states via fromTo only. */
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl
        .fromTo(
          '.enc-hero .sf-stage',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'power4.inOut' }
        )
        .fromTo(
          '.enc-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.06, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.enc-hero-eyebrow, .enc-hero-sub, .enc-hero-actions, .enc-hero-scroll',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          '-=0.6'
        );

      /* The one ambient loop: smoke drift, 20s yoyo, paused offscreen. */
      const smoke = rootRef.current && rootRef.current.querySelector('.enc-smoke');
      if (smoke) {
        const drift = gsap.to(smoke, {
          x: 70,
          duration: 20,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
        ScrollTrigger.create({
          trigger: '.enc-hero',
          scroller: sc,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? drift.play() : drift.pause()),
        });
      }

      /* The premise: a single 0.15s invert flash, fired once. */
      ScrollTrigger.create({
        trigger: '.enc-premise',
        scroller: sc,
        start: 'top 62%',
        once: true,
        onEnter: () =>
          gsap.fromTo(
            '.enc-flash',
            { opacity: 0 },
            { opacity: 1, duration: 0.075, yoyo: true, repeat: 1, ease: 'none' }
          ),
      });

      /* M10 — Act curtains. Per act: panels part horizontally from centre
         (closed → open), the spotlight opens on the featured dish, and the
         act title rises through its mask. All scrubbed together. */
      gsap.utils.toArray('.enc-act').forEach((act) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: act,
            scroller: sc,
            start: 'top 78%',
            end: 'top 28%',
            scrub: 0.6,
          },
        });
        tl.fromTo(
          act.querySelector('.enc-curtain-l'),
          { clipPath: 'inset(0 0% 0 0%)' },
          { clipPath: 'inset(0 100% 0 0%)', ease: 'none' },
          0
        )
          .fromTo(
            act.querySelector('.enc-curtain-r'),
            { clipPath: 'inset(0 0% 0 0%)' },
            { clipPath: 'inset(0 0% 0 100%)', ease: 'none' },
            0
          )
          .fromTo(
            act.querySelector('.enc-spot-veil'),
            { '--spot': '0%' },
            { '--spot': '165%', ease: 'none' },
            0
          )
          .fromTo(
            act.querySelector('.enc-mask-i'),
            { yPercent: 110 },
            { yPercent: 0, ease: 'none' },
            0
          );
      });

      /* Image bloom on dish spotlights (house grammar: scale 1.08 → 1). */
      gsap.utils.toArray('.enc-spot-img img').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const activeTier = content.tickets.tiers[tier];

  return (
    <div ref={rootRef} className="tpl-design-10-chefstable">
      {/* ————— Theatrical nav ————— */}
      <header className="enc-nav">
        <a className="enc-wordmark" href="#hero" aria-label={`${brandName} — home`}>
          {brandName}
          <span>{content.brand.tagline.toUpperCase()}</span>
        </a>
        <nav className="enc-nav-links" aria-label="Acts">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="enc-nav-cta" href={content.hero.ctaHref}>
          {content.hero.cta}
        </a>
      </header>

      {/* ————— Hero ————— */}
      <section id="hero" className="enc-hero" data-tour="The Reveal">
        <ScrollFrames
          frames={frames}
          alt="A cloche lifts in slow motion, smoke billowing, to reveal the dish beneath"
          pinDistance="+=170%"
          className="enc-scrub"
        >
          <div className="enc-smoke" aria-hidden="true" />
          <div className="enc-hero-shade" aria-hidden="true" />
          <div className="enc-hero-copy">
            <p className="enc-eyebrow enc-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="enc-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="enc-hero-sub">{content.hero.sub}</p>
            <div className="enc-hero-actions">
              <a className="enc-btn" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <p className="enc-hero-note">{content.hero.note}</p>
            </div>
          </div>
          <p className="enc-hero-scroll">[ SCROLL FOR ACT I ]</p>
        </ScrollFrames>
      </section>

      {/* ————— The premise ————— */}
      <section id="story" className="enc-premise" data-tour="The Premise">
        <div className="enc-flash" aria-hidden="true" />
        <Eyebrow>{content.premise.eyebrow}</Eyebrow>
        <h2 className="enc-premise-title rv">
          <Words text={content.premise.title} />
        </h2>
        <div className="enc-premise-body">
          {content.premise.body.map((p, i) => (
            <p key={i} className="rv">
              {p}
            </p>
          ))}
        </div>
        <ul className="enc-directions" aria-label="Stage directions">
          {content.premise.directions.map((d) => (
            <li key={d} className="rv">
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* ————— The three acts ————— */}
      <section id="menu" className="enc-acts" data-tour="The Three Acts">
        <div className="enc-section-head">
          <Eyebrow>THE PLAYBILL</Eyebrow>
          <h2 className="enc-section-title rv">
            <Words text="The three acts" />
          </h2>
          <p className="enc-stage-dir rv">
            [THE HOUSE LIGHTS FALL. THREE CURTAINS. THREE REVEALS. APPLAUSE BETWEEN COURSES IS
            ENCOURAGED.]
          </p>
        </div>
        {content.acts.map((a, i) => (
          <Act key={a.id} act={a} index={i} />
        ))}
      </section>

      {/* ————— The chef: director's note ————— */}
      <section id="craft" className="enc-chef" data-tour="Director's Note">
        <div className="enc-chef-visual rv">
          <Img
            k="detail"
            src={img('detail', detailImg)}
            alt={content.chef.imageAlt}
            className="enc-chef-img"
          />
          <p className="enc-caption">[THE FINAL TOUCH, NIGHTLY, 7:24 PM]</p>
        </div>
        <div className="enc-chef-copy">
          <Eyebrow>{content.chef.eyebrow}</Eyebrow>
          <h2 className="enc-section-title rv">
            <Words text={content.chef.title} />
          </h2>
          {content.chef.body.map((p, i) => (
            <p key={i} className="enc-chef-quote rv">
              {p}
            </p>
          ))}
          <p className="enc-chef-signoff rv">{content.chef.signoff}</p>
        </div>
      </section>

      {/* ————— Cast list ————— */}
      <section id="contact" className="enc-cast" data-tour="Cast List">
        <Eyebrow>{content.cast.eyebrow}</Eyebrow>
        <h2 className="enc-section-title rv">
          <Words text={content.cast.title} />
        </h2>
        <p className="enc-cast-note rv">{content.cast.note}</p>
        <ul className="enc-cast-list">
          {content.cast.members.map((m) => (
            <li key={m.name} className="enc-cast-row rv">
              <span className="enc-scene-edge" aria-hidden="true" />
              <div className="enc-cast-who">
                <p className="enc-cast-role">{m.role}</p>
                <h3 className="enc-cast-name">{m.name}</h3>
              </div>
              <p className="enc-cast-line">{m.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ————— Box office ————— */}
      <section id="reserve" className="enc-tickets" data-tour="Box Office">
        <Eyebrow>{content.tickets.eyebrow}</Eyebrow>
        <h2 className="enc-section-title rv">
          <Words text={content.tickets.title} />
        </h2>
        <p className="enc-stage-dir rv">{content.tickets.note.toUpperCase()}</p>
        <div className="enc-tiers" role="group" aria-label="Ticket tiers">
          {content.tickets.tiers.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`enc-tier rv${tier === i ? ' is-active' : ''}`}
              aria-pressed={tier === i}
              onClick={() => {
                setTier(i);
                setBooked(false);
              }}
            >
              <p className="enc-tier-name">{t.name}</p>
              <p className="enc-tier-price">{price(t.price)}</p>
              <p className="enc-tier-desc">{t.desc}</p>
              <div className="enc-tier-perks">
                {t.perks.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
              <span className="enc-tier-pick" aria-hidden="true">
                {tier === i ? '[ SEAT TAKEN ]' : '[ TAKE THIS SEAT ]'}
              </span>
            </button>
          ))}
        </div>
        <div className="enc-book rv">
          {!booked ? (
            <>
              <p className="enc-book-line">
                {activeTier.name.toUpperCase()} · {price(activeTier.price)} PER GUEST · ONE SEATING
                NIGHTLY
              </p>
              <button type="button" className="enc-btn" onClick={() => setBooked(true)}>
                {content.tickets.cta}
              </button>
            </>
          ) : (
            <p className="enc-book-confirmed" role="status">
              {content.tickets.confirmed}
            </p>
          )}
        </div>
        <div className="enc-visit rv">
          <p>{content.visit.address}</p>
          <p>
            {content.visit.phone} ·{' '}
            <a href={`mailto:${contact.email || FALLBACK_EMAIL}`}>
              {contact.email || FALLBACK_EMAIL}
            </a>
          </p>
          <p>{content.visit.hours}</p>
        </div>
      </section>

      {/* ————— Playbill footer ————— */}
      <footer className="enc-footer">
        <p className="enc-footer-brand">{brandName.toUpperCase()}</p>
        <p className="enc-footer-line">{content.footer.line}</p>
        <p className="enc-footer-colophon">{content.footer.colophon}</p>
        <p className="enc-footer-end">[ FIN ]</p>
      </footer>
    </div>
  );
}
