import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import f1Img from './assets/feature-1.webp';
import f2Img from './assets/feature-2.webp';
import f3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-webgl';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Inter:wght@400;500;600&display=swap';

/* Scroll-driven hero frames (Apple-style scrub); hero.jpg stays as the
   customizable hero image. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`px-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {/* a real space between the inline-block word masks */}
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

const EXP_IMAGES = [heroImg, f1Img, f2Img, f3Img, detailImg];
const EXP_ALTS = [
  'Chrome geometric forms floating in black studio space, violet and cyan reflections',
  'Macro of dark iridescent material, violet and cyan interference colors along a ridge',
  'Glowing geometric wireframe installation suspended in a dark studio',
  'Monumental fractured crystal monolith glowing violet and cyan on a night plaza',
  'Glass prism refracting light into violet and cyan spectral bands on black',
];

/* Full-screen overlay menu */
function MenuOverlay({ open, onClose }) {
  const { brand } = useCustom();
  const reduced = useReducedMotion();
  const overlayRef = useRef(null);
  const name = brand || content.brand.name;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  /* Inside the ATELIER viewer the template scrolls in .tpl-scope, under the
     viewer's toolbar: fit the fixed overlay to that box (not the whole
     window) and hold the page still while the menu is open. */
  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el || !open) return undefined;
    const scope = el.closest('.tpl-scope');
    const scrolls = scope && scope.scrollHeight > scope.clientHeight + 2;
    const fitBox = () => {
      if (!scrolls) return;
      const r = scope.getBoundingClientRect();
      Object.assign(el.style, {
        top: `${r.top}px`,
        left: `${r.left}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        right: 'auto',
        bottom: 'auto',
      });
    };
    fitBox();
    window.addEventListener('resize', fitBox);
    const lenis = (scrolls ? scope : window).__lenis;
    if (lenis && lenis.stop) lenis.stop();
    return () => {
      window.removeEventListener('resize', fitBox);
      if (lenis && lenis.start) lenis.start();
    };
  }, [open]);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el || !open || reduced) return;
    const q = gsap.utils.selector(el);
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    gsap.fromTo(
      q('.px-overlay-link'),
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, delay: 0.1 }
    );
  }, [open, reduced]);

  if (!open) return null;
  return (
    <div
      ref={overlayRef}
      className="px-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent=""
    >
      <button className="px-overlay-close" onClick={onClose} aria-label="Close menu">
        <span aria-hidden="true">×</span>
      </button>
      <nav className="px-overlay-nav" aria-label="Overlay">
        {content.nav.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            className="px-overlay-link"
            onClick={onClose}
          >
            <span className="px-overlay-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {n.label}
          </a>
        ))}
      </nav>
      <p className="px-overlay-foot">
        {name} — {content.brand.tagline}
      </p>
    </div>
  );
}

/* One experiment panel, used in the dolly layers, the mobile stack and the
   reduced-motion static layout. */
function ExperimentPanel({ exp, k, src, alt }) {
  return (
    <article className="px-exp" aria-label={`Experiment ${exp.index}: ${exp.name}`}>
      <div className="px-exp-visual">
        <Img k={k} src={src} alt={alt} />
        <span className="px-exp-index" aria-hidden="true">{exp.index}</span>
      </div>
      <div className="px-exp-copy">
        <p className="px-eyebrow">{exp.medium} · {exp.year}</p>
        <h3 className="px-exp-name">{exp.name}</h3>
        <p className="px-body">{exp.desc}</p>
      </div>
    </article>
  );
}

/* Desktop CSS-3D dolly: pinned stage, camera wrapper with 5 translateZ layers. */
function DollyJourney() {
  const { img } = useCustom();
  return (
    <div className="px-dolly-desktop" aria-label="Experiment journey">
      <div className="px-dolly-pin">
        <div className="px-stage">
          <div className="px-camera">
            {content.experiments.map((exp, i) => (
              <div
                key={exp.index}
                className="px-layer"
                style={{ '--z': `${-i * 300}px` }}
              >
                <ExperimentPanel
                  exp={exp}
                  k={exp.imgKey}
                  src={img(exp.imgKey, EXP_IMAGES[i])}
                  alt={EXP_ALTS[i]}
                />
              </div>
            ))}
          </div>
          <div className="px-stage-fog" aria-hidden="true" />
        </div>
        <div className="px-dolly-hud" aria-hidden="true">
          <p className="px-eyebrow">{content.dolly.eyebrow}</p>
          <div className="px-ticks">
            {content.experiments.map((exp) => (
              <span key={exp.index} className="px-tick" />
            ))}
          </div>
          <p className="px-dolly-hint">{content.dolly.hint}</p>
        </div>
      </div>
    </div>
  );
}

/* Mobile + reduced-motion: the 5 experiments as a static vertical stack. */
function ExperimentStack() {
  const { img } = useCustom();
  return (
    <div className="px-dolly-mobile">
      <div className="px-wrap">
        <p className="px-eyebrow px-rv">{content.dolly.eyebrow}</p>
        <h2 className="px-h2 px-rv">
          <Words text={content.dolly.title} />
        </h2>
      </div>
      <div className="px-stack">
        {content.experiments.map((exp, i) => (
          <div className="px-rv" key={exp.index}>
            <ExperimentPanel
              exp={exp}
              k={exp.imgKey}
              src={img(exp.imgKey, EXP_IMAGES[i])}
              alt={EXP_ALTS[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Design10Webgl() {
  const { brand, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  /* Fonts: injected once, never removed (matches platform font lifecycle). */
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

      /* Hero entrance: frame-canvas settles, kinetic word-mask headline rises,
         and the design's single invert flash fires once as the title lands. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sf-canvas',
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      )
        .fromTo(
          '.px-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 },
          0.4
        )
        .fromTo(
          '.px-hero-sub, .px-hero-cta',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1.05
        )
        /* THE invert flash (one only): a 70ms white flash as the title lands. */
        .fromTo('.px-flash', { opacity: 0 }, { opacity: 1, duration: 0.07, ease: 'none' }, 1.15)
        .to('.px-flash', { opacity: 0, duration: 0.4, ease: 'power2.in' }, 1.22);

      /* The frame scrub is the hero's scroll motion now — the old video
         parallax is retired so it can't fight the pin. */

      /* Kinetic section headlines: word-mask rise on entry. */
      gsap.utils.toArray('.px-title .wi').forEach((word) => {
        const h = word.closest('.px-title');
        if (!h || h.classList.contains('px-hero-title')) return;
        gsap.fromTo(
          word,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: h, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Reveals + staggers. */
      gsap.utils.toArray('.px-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.px-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Hairline rules draw. */
      gsap.utils.toArray('.px-rule').forEach((rule) => {
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

      /* 3D DOLLY: pin the stage (desktop only), scrub the camera wrapper's
         translateZ from 0 to +1200px, so each of the five layers (300px
         apart) arrives at the screen plane in turn and the last one ends
         there. gsap.matchMedia reverts cleanly on resize across 768px. */
      const pin = rootRef.current && rootRef.current.querySelector('.px-dolly-pin');
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const camera = pin.querySelector('.px-camera');
          const layers = gsap.utils.toArray('.px-layer', pin);
          const ticks = gsap.utils.toArray('.px-tick', pin);
          const GAP = 300;
          const TRAVEL = GAP * (layers.length - 1);
          const FADE = 180;
          /* One readable layer at a time: a layer fades in as it approaches
             the screen plane (depth -240 → -60), holds, and fades out as it
             passes through the camera (+60 → +240). The fades are tweens on
             the scrubbed timeline itself, so they always stay locked to the
             smoothed camera move. */
          const opAt = (i, camZ) => {
            const eff = -i * GAP + camZ;
            return eff > 0
              ? gsap.utils.clamp(0, 1, 1 - (eff - 60) / FADE)
              : gsap.utils.clamp(0, 1, (eff + 240) / FADE);
          };
          layers.forEach((l, i) => gsap.set(l, { opacity: opAt(i, 0) }));
          /* Like inactive carousel slides, a faded-out layer leaves the
             accessibility tree and stops taking the pointer; the active
             tick follows the camera. */
          let lastActive = -1;
          const shown = layers.map(() => null);
          const sync = (progress) => {
            const camZ = progress * TRAVEL;
            layers.forEach((layer, i) => {
              const on = opAt(i, camZ) > 0.05;
              if (shown[i] !== on) {
                shown[i] = on;
                layer.classList.toggle('is-shown', on);
                layer.setAttribute('aria-hidden', on ? 'false' : 'true');
              }
            });
            const active = Math.round(progress * (layers.length - 1));
            if (active !== lastActive) {
              lastActive = active;
              ticks.forEach((t, i) => t.classList.toggle('is-active', i === active));
            }
          };
          sync(0);
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: '+=400%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => sync(self.progress),
            },
            onUpdate: () => sync(tl.progress()),
          });
          tl.fromTo(camera, { z: 0 }, { z: TRAVEL, ease: 'none', duration: 1 }, 0);
          layers.forEach((layer, i) => {
            const d = FADE / TRAVEL;
            if (i > 0) {
              tl.fromTo(layer, { opacity: 0 }, { opacity: 1, ease: 'none', duration: d, immediateRender: false }, (i * GAP - 240) / TRAVEL);
            }
            if (i < layers.length - 1) {
              tl.fromTo(layer, { opacity: 1 }, { opacity: 0, ease: 'none', duration: d, immediateRender: false }, (i * GAP + 60) / TRAVEL);
            }
          });
          return () => {
            ticks.forEach((t) => t.classList.remove('is-active'));
            layers.forEach((l) => {
              l.classList.remove('is-shown');
              l.removeAttribute('aria-hidden');
            });
          };
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-10-webgl${reduced ? ' is-reduced' : ''}`}>
      {/* The design's single invert flash (hero entrance only). */}
      <div className="px-flash" aria-hidden="true" />

      {/* OVERLAY NAV — a zero-height sticky dock keeps it on top of the
          scroll area (the viewer's .tpl-scope or the window) without
          position: fixed, which would escape the viewer onto its toolbar. */}
      <div className="px-nav-dock">
        <header className="px-nav">
          <a className="px-wordmark" href="#hero" aria-label={`${name} — home`}>{name}</a>
          <button
            className="px-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-label="Open menu"
          >
            <span aria-hidden="true">Menu</span>
          </button>
        </header>
      </div>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* HERO — scroll-driven frame scrub (also the "Welcome" tour stop) */}
        <section id="hero" className="px-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Chrome geometric forms drifting and rotating slowly in a black studio, iridescent reflections"
            pinDistance="+=170%"
          >
            <div className="px-hero-scrim" aria-hidden="true" />
            <div className="px-hero-copy">
              <p className="px-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="px-hero-title px-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="px-hero-sub">{content.hero.sub}</p>
              <a className="px-cta px-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <p className="px-hero-hint" aria-hidden="true">{content.hero.scrollHint}</p>
          </ScrollFrames>
        </section>

        {/* 3D-DOLLY EXPERIMENT JOURNEY */}
        <section id="experiments" className="px-dolly-sec" data-tour="The Dolly Journey">
          <DollyJourney />
          <ExperimentStack />
        </section>

        {/* LAB NOTES */}
        <section id="notes" className="px-notes" data-tour="Lab Notes">
          <div className="px-wrap">
            <p className="px-eyebrow px-rv">{content.notes.eyebrow}</p>
            <h2 className="px-h2 px-title px-rv">
              <Words text={content.notes.title} />
            </h2>
            <span className="px-rule" aria-hidden="true" />
            <ol className="px-notes-list px-stagger">
              {content.notes.entries.map((n, i) => (
                <li className="px-note" key={n.title}>
                  <span className="px-note-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="px-note-date">{n.date}</p>
                    <h3 className="px-note-title">{n.title}</h3>
                    <p className="px-body">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="px-manifesto" data-tour="Manifesto">
          <div className="px-wrap">
            <p className="px-eyebrow px-rv">{content.manifesto.eyebrow}</p>
            <h2 className="px-h2 px-title">
              <Words text={content.manifesto.title} />
            </h2>
            <span className="px-rule" aria-hidden="true" />
            <div className="px-manifesto-grid">
              {content.manifesto.body.map((p, i) => (
                <p className="px-body px-rv" key={i}>{p}</p>
              ))}
            </div>
            <blockquote className="px-quote px-rv">
              <p>{content.manifesto.quote}</p>
              <cite>{content.manifesto.quoteBy}</cite>
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section id="commission" className="px-cta-sec" data-tour="Commission">
          <div className="px-wrap">
            <p className="px-eyebrow px-rv">{content.cta.eyebrow}</p>
            <h2 className="px-cta-title px-title">
              <Words text={content.cta.title} />
            </h2>
            <p className="px-body px-cta-body px-rv">{content.cta.body}</p>
            <a className="px-cta px-rv" href={`mailto:${email}?subject=Commission%20an%20experiment`}>
              {content.cta.cta}
            </a>
            <p className="px-cta-note px-rv">{content.cta.note} — <a href={`mailto:${email}`}>{email}</a></p>
          </div>
        </section>
      </main>

      <footer className="px-footer">
        <div className="px-wrap px-footer-grid">
          <a className="px-wordmark" href="#hero">{name}</a>
          <nav className="px-footer-nav" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <p className="px-footer-line">{content.footer.line}</p>
          <p className="px-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
