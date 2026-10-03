import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-archviz';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Space+Grotesk:wght@400;500;600;700&display=swap';

const PROJECT_MEDIA = [
  { imgKey: 'product-0', image: listing1Img, alt: 'Monolithic board-formed concrete villa exterior, sharp geometric shadows slicing the facade' },
  { imgKey: 'product-1', image: listing2Img, alt: 'Raw concrete gallery interior with a single diagonal slot of daylight cutting through darkness' },
  { imgKey: 'product-2', image: listing3Img, alt: 'Monochrome architectural massing model of clustered concrete volumes under raking studio light' },
];

/* Scroll-driven hero film: 72 extracted frames scrubbed by scroll . */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans. */
function Words({ text, className = '' }) {
  const words = String(text).split(' ');
  return (
    <span className={`sm-wm ${className}`} aria-label={text}>
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

/* Trailing accent cursor: desktop + fine pointer only, reduced-motion off. */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;
    const dx = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const onMove = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const onOver = (e) => {
      if (e.target.closest('a, button, .sm-card')) ring.classList.add('is-hot');
      else ring.classList.remove('is-hot');
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [reduced]);
  if (reduced) return null;
  return (
    <>
      <span ref={dotRef} className="sm-cursor" aria-hidden="true" />
      <span ref={ringRef} className="sm-cursor-ring" aria-hidden="true" />
    </>
  );
}

/* Full-screen overlay navigation. */
function OverlayNav({ open, onClose }) {
  const { brand, contact } = useCustom();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const email = contact.email || content.contact.email;

  useEffect(() => {
    if (!open) return undefined;
    if (!reduced && ref.current) {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(
        ref.current.querySelectorAll('.sm-ov-link'),
        { y: 72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.08 }
      );
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, reduced]);

  if (!open) return null;
  return (
    <div ref={ref} className="sm-overlay" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="sm-ov-top">
        <span className="sm-wordmark">{brand || content.brand.name}</span>
        <button type="button" className="sm-burger is-open" onClick={onClose} aria-label="Close menu">
          <span />
          <span />
        </button>
      </div>
      <nav className="sm-ov-nav" aria-label="Overlay">
        {content.nav.map((n, i) => (
          <a key={n.href} href={n.href} className="sm-ov-link" onClick={onClose}>
            <span className="sm-ov-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="sm-ov-label">{n.label}</span>
          </a>
        ))}
      </nav>
      <div className="sm-ov-foot">
        <a href={`mailto:${email}`}>{email}</a>
        <span>{content.brand.short} — Bengaluru</span>
      </div>
    </div>
  );
}

function ProjectCard({ index, media }) {
  const { productName, price, img } = useCustom();
  const item = content.projects.items[index];
  const step = 360 / content.projects.items.length;
  return (
    <article className="sm-card" style={{ '--a': `${index * step}deg` }}>
      <div className="sm-card-visual">
        <Img k={media.imgKey} src={img(media.imgKey, media.image)} alt={media.alt} />
        <span className="sm-card-num">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="sm-card-body">
        <p className="sm-card-status">{item.status}</p>
        <h3 className="sm-card-name">{productName(index, item.name)}</h3>
        <p className="sm-card-loc">
          {item.location} · {item.area}
        </p>
        <p className="sm-card-desc">{item.desc}</p>
        <p className="sm-card-price">{price(item.price)}</p>
      </div>
    </article>
  );
}

export default function Design10Archviz() {
  const { brand, img, currency, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  /* Read the breakpoint up front so the orbit mounts once, instead of
     rendering the static row first and rebuilding every trigger a frame
     later. */
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(min-width: 768px)').matches
  );
  const showOrbit3D = isDesktop && !reduced;

  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram || content.contact.instagram;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: masked word-rise title, frame-stage settle, copy fade. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sm-hero .sf-canvas',
        { scale: 1.12 },
        { scale: 1, duration: 2.2, ease: 'expo.out' },
        0
      )
        .fromTo(
          '.sm-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.1 },
          0.3
        )
        .fromTo(
          '.sm-hero-eyebrow, .sm-hero-sub, .sm-hero-cta',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.14 },
          0.8
        )
        .fromTo('.sm-hero-side', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.4)
        .fromTo('.sm-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.6);

      /* Hero media motion is now the scroll scrub itself (ScrollFrames) —
         the old parallax drift would expose cover-fit canvas edges. */

      /* Generic reveals. */
      gsap.utils.toArray('.sm-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sm-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Section headline word-rise. */
      gsap.utils.toArray('.sm-h2 .wi').forEach((word) => {
        gsap.fromTo(
          word,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: word.closest('.sm-h2'), scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Image wipes. */
      gsap.utils.toArray('.sm-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Hairline rules draw. */
      gsap.utils.toArray('.sm-rule').forEach((rule) => {
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

      /* Studio giant word drift. */
      gsap.fromTo(
        '.sm-studio-giant',
        { xPercent: 8 },
        {
          xPercent: -22,
          ease: 'none',
          scrollTrigger: { trigger: '.sm-studio', scroller: sc, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        }
      );

      /* Process progress line. */
      gsap.fromTo(
        '.sm-process-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.sm-steps', scroller: sc, start: 'top 78%', end: 'bottom 60%', scrub: 0.4 },
        }
      );

      /* ORBITAL TURNTABLE — the signature mechanic (MOTION.md §10).
         Cards sit on a virtual ring (rotateY + translateZ); scroll scrubs the
         ring's rotationY with scrub:1 inertia; the card nearest the viewer is
         marked .is-front (spotlight) and the index readout updates.
         Desktop ≥768px only — matchMedia below; static snap row otherwise. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.sm-orbit-pin');
        if (!pin) return undefined;
        const ring = pin.querySelector('.sm-ring');
        const cards = gsap.utils.toArray('.sm-card', pin);
        const num = pin.querySelector('.sm-readout-num');
        const rname = pin.querySelector('.sm-readout-name');
        const rmeta = pin.querySelector('.sm-readout-meta');
        const rprice = pin.querySelector('.sm-readout-price');
        const fill = pin.querySelector('.sm-orbit-progress-fill');
        const n = cards.length;
        const step = 360 / n;
        let last = -1;
        const setFront = (i) => {
          if (i === last) return;
          last = i;
          const d = content.projects.items[i];
          cards.forEach((c, k) => c.classList.toggle('is-front', k === i));
          if (num) num.textContent = String(i + 1).padStart(2, '0');
          if (rname) rname.textContent = productName(i, d.name);
          if (rmeta) rmeta.textContent = `${d.location} · ${d.area}`;
          if (rprice) rprice.textContent = price(d.price);
        };
        setFront(0);
        gsap.fromTo(
          ring,
          { rotationY: 0 },
          {
            rotationY: -(n - 1) * step,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: '+=250%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setFront(Math.min(n - 1, Math.round(self.progress * (n - 1))));
                if (fill) fill.style.transform = `scaleX(${self.progress.toFixed(4)})`;
              },
            },
          }
        );
        return undefined;
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef, showOrbit3D, productName, price]);

  const first = content.projects.items[0];

  return (
    <div ref={rootRef} className={`tpl-design-10-archviz${reduced ? ' is-reduced' : ''}`}>
      <Cursor />

      <header className="sm-nav">
        <a className="sm-wordmark" href="#hero">{name}</a>
        <button
          type="button"
          className="sm-burger"
          aria-expanded={menuOpen}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>
      <OverlayNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        {/* HERO — concrete light study film, scroll-driven frames */}
        <section id="hero" className="sm-hero" data-tour="Overture">
          <ScrollFrames
            frames={frames}
            alt="Curved concrete planes with a slot of hard light raking across, slow orbital drift"
            pinDistance="+=170%"
          >
            <div className="sm-hero-shade" aria-hidden="true" />
            <div className="sm-hero-copy">
              <p className="sm-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="sm-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="sm-hero-sub">{content.hero.sub}</p>
              <a className="sm-cta sm-hero-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
            </div>
            <p className="sm-hero-side" aria-hidden="true">{content.hero.side}</p>
            <p className="sm-scroll-cue">{content.hero.scroll}</p>
          </ScrollFrames>
        </section>

        {/* KINETIC MARQUEE */}
        <div className="sm-marquee" aria-hidden="true">
          <div className="sm-marquee-track">
            {[0, 1].map((half) => (
              <span className="sm-marquee-half" key={half}>
                {content.marquee.map((w) => (
                  <span className="sm-marquee-word" key={`${half}-${w}`}>{w}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* PROJECTS — orbital turntable */}
        <section id="projects" className="sm-projects" data-tour="The Orbit">
          <div className="sm-wrap">
            <p className="sm-eyebrow sm-rv">{content.projects.eyebrow}</p>
            <h2 className="sm-h2">
              <Words text={content.projects.title} />
            </h2>
            <div className="sm-projects-head sm-rv">
              <p className="sm-hint">{content.projects.hint}</p>
              <p className="sm-note">
                {content.projects.note} {currency} — {content.projects.items.length} works
              </p>
            </div>
          </div>

          {showOrbit3D ? (
            <div className="sm-orbit-pin">
              <div className="sm-orbit-stage">
                <div className="sm-readout" aria-live="polite">
                  <p className="sm-readout-count">
                    <span className="sm-readout-num">01</span>
                    <span className="sm-readout-total">/{String(content.projects.items.length).padStart(2, '0')}</span>
                  </p>
                  <p className="sm-readout-name">{productName(0, first.name)}</p>
                  <p className="sm-readout-meta">{first.location} · {first.area}</p>
                  <p className="sm-readout-price">{price(first.price)}</p>
                </div>
                <div className="sm-ring">
                  {PROJECT_MEDIA.map((m, i) => (
                    <ProjectCard key={m.imgKey} index={i} media={m} />
                  ))}
                </div>
                <div className="sm-orbit-progress" aria-hidden="true">
                  <span className="sm-orbit-progress-fill" />
                </div>
              </div>
            </div>
          ) : (
            <div className="sm-orbit-static" aria-label="Projects">
              {PROJECT_MEDIA.map((m, i) => (
                <ProjectCard key={m.imgKey} index={i} media={m} />
              ))}
            </div>
          )}
        </section>

        {/* PROCESS */}
        <section id="process" className="sm-process" data-tour="Method">
          <div className="sm-wrap sm-process-grid">
            <div className="sm-process-main">
              <p className="sm-eyebrow sm-rv">{content.process.eyebrow}</p>
              <h2 className="sm-h2">
                <Words text={content.process.title} />
              </h2>
              <span className="sm-rule" aria-hidden="true" />
              <p className="sm-body sm-rv">{content.process.intro}</p>
              <ol className="sm-steps sm-stagger">
                {content.process.steps.map((s, i) => (
                  <li className="sm-step" key={s.title}>
                    <span className="sm-step-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="sm-step-title">{s.title}</h3>
                      <p className="sm-step-text">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="sm-process-line" aria-hidden="true">
                <span className="sm-process-line-fill" />
              </div>
            </div>
            <figure className="sm-process-fig">
              <div className="sm-wipe sm-frame">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Extreme close-up of board-formed concrete texture with raking light revealing the wood grain"
                />
              </div>
              <figcaption className="sm-rv">{content.process.imageCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* STUDIO */}
        <section id="studio" className="sm-studio" data-tour="The Studio">
          <p className="sm-studio-giant" aria-hidden="true">{content.studio.giant}</p>
          <div className="sm-wrap">
            <p className="sm-eyebrow sm-rv">{content.studio.eyebrow}</p>
            <h2 className="sm-h2">
              <Words text={content.studio.title} />
            </h2>
            <span className="sm-rule" aria-hidden="true" />
            <div className="sm-studio-cols">
              {content.studio.body.map((p, i) => (
                <p className="sm-body sm-rv" key={i}>{p}</p>
              ))}
            </div>
            <dl className="sm-stats sm-stagger">
              {content.studio.stats.map((s) => (
                <div className="sm-stat" key={s.label}>
                  <dt className="sm-stat-value">{s.value}</dt>
                  <dd className="sm-stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
            <ul className="sm-principals sm-stagger">
              {content.studio.principals.map((p) => (
                <li key={p.name}>
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sm-contact" data-tour="Commission">
          <div className="sm-wrap">
            <p className="sm-eyebrow sm-rv">{content.contact.eyebrow}</p>
            <h2 className="sm-h2 sm-contact-title">
              <Words text={content.contact.title} />
            </h2>
            <p className="sm-body sm-rv">{content.contact.text}</p>
            <div className="sm-rv">
              <a className="sm-cta sm-contact-cta" href={`mailto:${email}`}>{content.contact.cta}</a>
            </div>
            <div className="sm-contact-grid sm-stagger">
              <div>
                <p className="sm-contact-label">Email</p>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <div>
                <p className="sm-contact-label">Phone</p>
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
              </div>
              <div>
                <p className="sm-contact-label">Studio</p>
                <p>{content.contact.address}</p>
              </div>
              <div>
                <p className="sm-contact-label">Elsewhere</p>
                <p>{instagram}</p>
                <p>{content.contact.hours}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sm-footer">
        <div className="sm-wrap">
          <p className="sm-footer-line">{content.footer.line}</p>
          <p className="sm-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
