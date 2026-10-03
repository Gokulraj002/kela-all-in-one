import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

/* Scroll-driven hero frames (Apple-style): 72 stills scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-spiritual';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap';

/* The five yatra images, in journey order. */
const YATRA_IMGS = [dest1Img, dest2Img, dest3Img, heroImg, detailImg];
const YATRA_KEYS = ['product-0', 'product-1', 'product-2', 'product-3', 'product-4'];
const YATRA_ALTS = [
  'Varanasi ghats at dawn, empty wooden boats resting on still water in golden mist',
  'A Himalayan monastery on a cliff edge at sunset, long strings of prayer flags leading to it',
  'The Mahabodhi Temple at Bodh Gaya glowing in golden-hour light, framed by bodhi trees',
  'Rows of lit oil lamps along dark stone ghat steps at dusk, mist rising off the water',
  'A single lit clay diya beside marigold flowers, flame steady against deep shadow',
];

/* Server-safe word-mask headline. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sp-wm ${className}`} aria-label={text}>
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

/* Radial mandala motif — concentric rings, petals, and a flame at the heart. */
function Mandala({ spin = true }) {
  const petals = useMemo(() => Array.from({ length: 24 }), []);
  const dots = useMemo(() => Array.from({ length: 48 }), []);
  return (
    <svg
      className={`sp-mandala-svg${spin ? ' sp-mandala-spin' : ''}`}
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="200" r="192" className="sp-m-ring" />
      <circle cx="200" cy="200" r="152" className="sp-m-ring sp-m-faint" />
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="200"
          cy="86"
          rx="9"
          ry="34"
          transform={`rotate(${i * 15} 200 200)`}
          className="sp-m-petal"
        />
      ))}
      {dots.map((_, i) => (
        <circle
          key={`d${i}`}
          cx={200 + 118 * Math.cos((i * 7.5 * Math.PI) / 180)}
          cy={200 + 118 * Math.sin((i * 7.5 * Math.PI) / 180)}
          r="2.2"
          className="sp-m-dot"
        />
      ))}
      <circle cx="200" cy="200" r="62" className="sp-m-ring sp-m-faint" />
      <path
        d="M200 168 C 214 188, 220 201, 220 214 A 20 20 0 1 1 180 214 C 180 201, 186 188, 200 168 Z"
        className="sp-m-flame sp-flicker"
      />
    </svg>
  );
}

/* One yatra card — positioned on the orbit ring by its parent. */
function YatraCard({ journey, index, compact = false }) {
  const { img, productName, price } = useCustom();
  const key = YATRA_KEYS[index];
  return (
    <article className={`sp-card${compact ? ' is-compact' : ''}`}>
      <div className="sp-card-media">
        <Img k={key} src={img(key, YATRA_IMGS[index])} alt={YATRA_ALTS[index]} />
      </div>
      <div className="sp-card-body">
        <p className="sp-eyebrow sp-card-tag">{journey.tag}</p>
        <h3 className="sp-card-name">{productName(index, journey.name)}</h3>
        {!compact && (
          <p className="sp-card-meta">
            <span>{journey.duration}</span>
            <span className="sp-dot" aria-hidden="true" />
            <span>{price(journey.price)}</span>
          </p>
        )}
        {compact && (
          <>
            <p className="sp-card-blurb">{journey.blurb}</p>
            <p className="sp-card-meta">
              <span>{journey.duration}</span>
              <span className="sp-dot" aria-hidden="true" />
              <span>{price(journey.price)}</span>
            </p>
          </>
        )}
      </div>
    </article>
  );
}

/* Static vertical stack — mobile and reduced-motion path. */
function YatraStack() {
  return (
    <div className="sp-stack">
      <div className="sp-stack-mandala" aria-hidden="true">
        <Mandala spin={false} />
      </div>
      {content.yatras.journeys.map((j, i) => (
        <div className="sp-stack-item sp-rv" key={j.name}>
          <YatraCard journey={j} index={i} compact />
        </div>
      ))}
    </div>
  );
}

/* The signature scroll mechanic: a pinned circular stage. Destination cards
   ride a ring around a slowly turning mandala; scroll-scrub rotates the ring
   and the card nearest the top brightens while the others dim. */
function OrbitStage() {
  const { scroller } = useTplScope();
  const stageRef = useRef(null);
  const ctrRefs = useRef([]);
  const [focused, setFocused] = useState(0);
  const focusedRef = useRef(0);
  const reduced = useReducedMotion();

  const journeys = content.yatras.journeys;
  const bases = useMemo(
    () => journeys.map((_, i) => i * (360 / journeys.length)),
    [journeys]
  );
  const ROT = 540; /* total ring rotation across the scrub — slow and stately */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      const sc = scroller();
      const stage = stageRef.current;
      if (!stage) return;
      const ring = stage.querySelector('.sp-ring');
      if (!ring) return;

      const apply = (theta) => {
        let best = 0;
        let bestD = 999;
        bases.forEach((b, i) => {
          let world = (b + theta) % 360;
          if (world < 0) world += 360;
          const d = world > 180 ? 360 - world : world;
          const f = 1 - d / 180;
          const el = ctrRefs.current[i];
          if (el) {
            gsap.set(el, {
              rotation: -world,
              scale: 1 + 0.16 * f,
              opacity: 0.38 + 0.62 * f,
              zIndex: Math.round(f * 20),
            });
          }
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        if (best !== focusedRef.current) {
          focusedRef.current = best;
          setFocused(best);
        }
      };

      apply(0);

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          ring,
          { rotation: 0 },
          {
            rotation: ROT,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              scroller: sc,
              start: 'top top',
              end: '+=2300',
              pin: true,
              scrub: 1.4,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => apply(self.progress * ROT),
            },
          }
        );
        /* The mandala turns almost imperceptibly — one revolution takes
           nearly three minutes. */
        gsap.to(stage.querySelectorAll('.sp-mandala-spin'), {
          rotation: '+=360',
          duration: 170,
          repeat: -1,
          ease: 'none',
        });
      });
    }, stageRef);
    return () => ctx.revert();
  }, [reduced, scroller, bases]);

  const focus = journeys[focused];
  const { price, productName } = useCustom();

  return (
    <div ref={stageRef} className="sp-orbit-pin">
      <div className="sp-orbit-stage">
        <div className="sp-mandala" aria-hidden="true">
          <Mandala />
        </div>
        <div className="sp-ring" role="list" aria-label="Yatras">
          {journeys.map((j, i) => (
            <div
              key={j.name}
              className="sp-pos"
              role="listitem"
              style={{ transform: `rotate(${bases[i]}deg)` }}
            >
              <div
                className="sp-ctr"
                ref={(el) => {
                  ctrRefs.current[i] = el;
                }}
              >
                <YatraCard journey={j} index={i} />
              </div>
            </div>
          ))}
        </div>
        <div className="sp-caption" aria-live="polite">
          <div className="sp-caption-inner" key={focused}>
            <p className="sp-eyebrow">{content.yatras.captionEyebrow}</p>
            <h3 className="sp-caption-name">{productName(focused, focus.name)}</h3>
            <p className="sp-caption-blurb">{focus.blurb}</p>
            <p className="sp-caption-meta">
              <span>{focus.duration}</span>
              <span className="sp-dot" aria-hidden="true" />
              <span>{focus.tag}</span>
              <span className="sp-dot" aria-hidden="true" />
              <span>{price(focus.price)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Design08Spiritual() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

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

      /* Hero entrance — whispered, unhurried. Masked word-rise, then slow
         fades. Nothing arrives faster than a breath. */
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(
        '.sp-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.6, ease: 'power3.out', stagger: 0.14 },
        0.4
      )
        .fromTo(
          '.sp-hero-eyebrow, .sp-hero-sub, .sp-hero-cta',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.22 },
          0.9
        )
        .fromTo(
          '.sp-hero-whisper',
          { opacity: 0 },
          { opacity: 1, duration: 2 },
          2.2
        );

      /* Slow reveals — long fades, generous and calm. */
      gsap.utils.toArray('.sp-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sp-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: 'power2.out',
            stagger: 0.28,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Hairline rules draw themselves, slowly. */
      gsap.utils.toArray('.sp-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Flame-flicker — a tremor of light, like a diya in still air. */
      gsap.utils.toArray('.sp-flicker').forEach((el, i) => {
        gsap.to(el, {
          opacity: 0.7,
          scale: 0.965,
          transformOrigin: '50% 92%',
          duration: 0.9 + i * 0.27,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-08-spiritual">
      {/* NAV — almost invisible */}
      <header className="sp-nav">
        <a className="sp-wordmark" href="#hero">
          {name}
        </a>
        <nav className="sp-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="sp-nav-cta" href="#contact">
          Begin
        </a>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="sp-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Rows of oil lamps along a riverside ghat at dusk, flames trembling, mist rising off dark water"
            pinDistance="+=170%"
          >
            <div className="sp-hero-veil" aria-hidden="true" />
            <div className="sp-hero-copy">
              <p className="sp-eyebrow sp-hero-eyebrow">
                <span className="sp-flame-dot sp-flicker" aria-hidden="true" />
                {content.hero.eyebrow}
              </p>
              <h1 className="sp-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="sp-hero-sub">{content.hero.sub}</p>
              <a className="sp-cta sp-hero-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
            </div>
            <p className="sp-hero-whisper">{content.hero.whisper}</p>
          </ScrollFrames>
        </section>

        {/* YATRAS — the mandala orbit */}
        <section id="destinations" className="sp-yatras" data-tour="Yatras">
          <div className="sp-wrap sp-yatras-head">
            <p className="sp-eyebrow sp-rv">{content.yatras.eyebrow}</p>
            <h2 className="sp-h2 sp-rv">{content.yatras.title}</h2>
            <span className="sp-rule" aria-hidden="true" />
            <p className="sp-lede sp-rv">{content.yatras.lede}</p>
            <p className="sp-hint sp-rv">{content.yatras.hint}</p>
          </div>
          {reduced ? <YatraStack /> : <OrbitStage />}
        </section>

        {/* THE PRACTICE */}
        <section id="story" className="sp-practice" data-tour="The Practice">
          <div className="sp-wrap">
            <p className="sp-eyebrow sp-rv">{content.practice.eyebrow}</p>
            <h2 className="sp-h2 sp-rv">{content.practice.title}</h2>
            <span className="sp-rule" aria-hidden="true" />
            <div className="sp-practice-grid">
              <div className="sp-practice-text">
                {content.practice.body.map((p, i) => (
                  <p className="sp-body sp-rv" key={i}>
                    {p}
                  </p>
                ))}
                <div className="sp-pillars sp-stagger">
                  {content.practice.pillars.map((pl) => (
                    <div className="sp-pillar" key={pl.title}>
                      <h3 className="sp-h3">{pl.title}</h3>
                      <p>{pl.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <figure className="sp-practice-fig sp-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="A single lit clay diya beside marigold flowers, flame steady against deep shadow"
                />
                <figcaption>{content.practice.imageCaption}</figcaption>
              </figure>
            </div>
            <div className="sp-rhythm sp-rv">
              <p className="sp-eyebrow">The rhythm of a day</p>
              <ol>
                {content.practice.rhythm.map((r) => (
                  <li key={r.time}>
                    <span className="sp-rhythm-time">{r.time}</span>
                    <span className="sp-rhythm-text">{r.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* TEMPLE STAYS */}
        <section id="visit" className="sp-stays" data-tour="Temple Stays">
          <div className="sp-wrap">
            <p className="sp-eyebrow sp-rv">{content.stays.eyebrow}</p>
            <h2 className="sp-h2 sp-rv">{content.stays.title}</h2>
            <span className="sp-rule" aria-hidden="true" />
            <p className="sp-lede sp-rv">{content.stays.body}</p>
            <div className="sp-stays-grid sp-stagger">
              {content.stays.places.map((s, i) => (
                <article className="sp-stay" key={s.name}>
                  <p className="sp-eyebrow">{s.where}</p>
                  <h3 className="sp-h3">{productName(10 + i, s.name)}</h3>
                  <p className="sp-stay-text">{s.text}</p>
                  <p className="sp-stay-rate">
                    {price(s.rate)}
                    <span>{s.rateNote}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BEGIN / CONTACT */}
        <section id="contact" className="sp-contact" data-tour="Begin the Journey">
          <div className="sp-wrap sp-contact-inner">
            <div className="sp-contact-mandala sp-rv" aria-hidden="true">
              <Mandala spin={false} />
            </div>
            <p className="sp-eyebrow sp-rv">{content.contact.eyebrow}</p>
            <h2 className="sp-h2 sp-rv">{content.contact.title}</h2>
            <span className="sp-rule" aria-hidden="true" />
            <p className="sp-lede sp-rv">{content.contact.body}</p>
            <p className="sp-contact-links sp-rv">
              <a className="sp-cta" href={`mailto:${email}`}>
                {email}
              </a>
              <a className="sp-contact-phone" href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
                {content.contact.phone}
              </a>
            </p>
            <p className="sp-contact-note sp-rv">{content.contact.note}</p>
          </div>
        </section>
      </main>

      <footer className="sp-footer">
        <p className="sp-footer-line">{content.footer.line}</p>
        <p className="sp-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
