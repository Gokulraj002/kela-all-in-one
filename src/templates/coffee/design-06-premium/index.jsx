import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Hero frame sequence: 72 JPGs scrubbed by scroll (replaces the old hero video). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-premium';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@400;500;600;700&display=swap';

const SRC = { 'product-0': menu1Img, 'product-1': menu2Img, 'product-2': menu3Img };

/* Server-safe word-mask headline */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`mn-wm ${className}`} aria-label={text}>
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

/* Character-by-character lot reveal */
function LotChars({ text }) {
  return (
    <span className="mn-lot" aria-label={text}>
      {text.split('').map((c, i) => (
        <span className="mn-lot-ch" key={i} aria-hidden="true">
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  );
}

/* Resolve the platform scroller from an element inside the template. A child
   component's layout effect runs before the parent's rootRef is attached, so
   useTplScope().scroller() would still return window here. */
function scrollerFor(el) {
  try {
    const scope = el && el.closest('.tpl-scope');
    if (scope && scope.scrollHeight > scope.clientHeight + 2) return scope;
  } catch { /* window fallback */ }
  return window;
}

/* Clip-path morphing lot gallery. Desktop (≥768px): the stage pins and the
   numbered lots morph from one to the next via animated clip-path —
   alternating a vertical inset unfold and a circle iris — driven by scrub;
   one lot is fully present at a time while the outgoing lot recedes beneath.
   Mobile / reduced motion: no pin — the same slides become a native
   horizontal swipe gallery with every lot reachable. */
function LotGallery() {
  const { productName, price } = useCustom();
  const reduced = useReducedMotion();
  const [wrapped, setWrapped] = useState([false, false, false]);
  const ribbonRefs = useRef([]);
  const dotsRef = useRef([]);
  const stageRef = useRef(null);
  const products = content.collection.products;
  const n = products.length;
  const toggleWrap = (i) => {
    setWrapped((w) => w.map((v, j) => (j === i ? !v : v)));
    const el = ribbonRefs.current[i];
    if (!reduced && el) {
      gsap.fromTo(el, { rotateY: 0 }, { rotateY: 180, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
    }
  };

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const section = stage.closest('.mn-collection');
      if (section) section.classList.add('is-pinned');
      const slides = Array.from(stage.querySelectorAll('.mn-lot-slide'));
      const sc = scrollerFor(stage);
      slides.forEach((s, i) => {
        gsap.set(s, {
          clipPath:
            i === 0
              ? 'circle(100% at 50% 50%)'
              : i % 2 === 1
                ? 'inset(50% 0% 50% 0%)'
                : 'circle(0% at 50% 50%)',
        });
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          scroller: sc,
          start: 'top top',
          end: () => `+=${(n - 1) * 110}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
            dotsRef.current.forEach((d, j) => {
              if (d) d.classList.toggle('is-active', j === idx);
            });
          },
        },
      });
      for (let i = 0; i < n - 1; i++) {
        const open = (i + 1) % 2 === 1 ? 'inset(0% 0% 0% 0%)' : 'circle(100% at 50% 50%)';
        tl.to(slides[i + 1], { clipPath: open, duration: 1, ease: 'power2.inOut' }, i);
        tl.to(slides[i], { scale: 0.96, duration: 1, ease: 'power2.inOut' }, i);
      }
      return () => {
        if (section) section.classList.remove('is-pinned');
      };
    });
    return () => mm.revert();
  }, [reduced, n]);

  return (
    <div className="mn-lot-stage" ref={stageRef}>
      {products.map((p, i) => (
        <article
          className="mn-lot-slide"
          key={p.name}
          aria-label={`${p.name} — ${p.lot}`}
        >
          <div className="mn-lot-media">
            <Img k={p.img} src={SRC[p.img]} alt={p.alt} />
            <span
              ref={(el) => { ribbonRefs.current[i] = el; }}
              className={`mn-ribbon${wrapped[i] ? ' is-wrapped' : ''}`}
            >
              {wrapped[i] ? content.collection.wrapped : content.collection.gift}
            </span>
          </div>
          <p className="mn-p-lot">{p.lot}</p>
          <h3>{productName(i, p.name)}</h3>
          <p className="mn-p-notes">{p.notes}</p>
          <p className="mn-p-desc">{p.desc}</p>
          <div className="mn-p-foot">
            <span className="mn-p-price">{price(p.price)}</span>
            <button
              className={`mn-wrapbtn${wrapped[i] ? ' is-wrapped' : ''}`}
              aria-pressed={wrapped[i]}
              onClick={() => toggleWrap(i)}
            >
              {wrapped[i] ? content.collection.wrapped : content.collection.gift}
            </button>
          </div>
        </article>
      ))}
      <div className="mn-lot-dots" aria-hidden="true">
        {products.map((p, i) => (
          <span
            key={p.name}
            ref={(el) => { dotsRef.current[i] = el; }}
            className={`mn-lot-dot${i === 0 ? ' is-active' : ''}`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
        ))}
      </div>
    </div>
  );
}

function Circle() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const msgRef = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
    if (!reduced && msgRef.current) {
      gsap.fromTo(msgRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  };
  return (
    <div className="mn-circle-box rv">
      {!done ? (
        <form onSubmit={submit} className="mn-circle-form">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={content.circle.placeholder}
            aria-label={content.circle.placeholder}
            className="mn-circle-input"
          />
          <button type="submit" className="mn-circle-btn">{content.circle.cta}</button>
        </form>
      ) : (
        <p className="mn-circle-done" ref={msgRef}>{content.circle.success}</p>
      )}
    </div>
  );
}

export default function Design06Premium() {
  const { brand, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const lotNumRef = useRef(null);
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

      /* Hero entrance: near-black holds 0.6s (deliberate cinema), then the
         flagship frame stage pour-wipes in over 1.8s while copy word-rises
         and the lot number types in. Total <= 3.5s. */
      const tl = gsap.timeline();
      tl.to('.mn-hold', { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, 0.6)
        .fromTo(
          '.mn-hero .sf-stage',
          { clipPath: 'inset(12% 8% 88% 8%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'power4.inOut' },
          0.6
        )
        .fromTo(
          '.mn-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 },
          1.2
        )
        .fromTo('.mn-hero-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'sine.out' }, 1.4)
        .fromTo(
          '.mn-lot-ch',
          { opacity: 0 },
          { opacity: 1, duration: 0.7, stagger: 0.04, ease: 'sine.out' },
          1.6
        )
        .fromTo('.mn-hero-sub', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'sine.out' }, 2.0)
        .fromTo('.mn-hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'sine.out' }, 2.2);

      /* Museum reveals: one at a time, centered, never in cascades. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Lot count-up: 1 → 47 while the edition bar fills. */
      const lotEl = lotNumRef.current;
      if (lotEl) {
        const obj = { v: 1 };
        ScrollTrigger.create({
          trigger: lotEl,
          scroller: sc,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: 47,
              duration: 1.5,
              ease: 'power2.inOut',
              snap: { v: 1 },
              onUpdate: () => { lotEl.textContent = Math.round(obj.v); },
            });
            gsap.to('.mn-edition-fill', { scaleX: 47 / 200, duration: 1.5, ease: 'power2.inOut' });
          },
        });
      }

      /* Certificate clip-path unfold */
      const cert = '.mn-cert';
      if (document.querySelector(cert)) {
        gsap.fromTo(
          cert,
          { clipPath: 'inset(50% 0% 50% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: cert, scroller: sc, start: 'top 78%', once: true },
          }
        );
      }

      /* Fade-to-black beats between Philosophy → Collection → Provenance (max 2). */
      gsap.utils.toArray('.mn-beat').forEach((beat) => {
        const section = beat.closest('section');
        const bt = gsap.timeline({
          scrollTrigger: { trigger: section, scroller: sc, start: 'top 70%', once: true },
        });
        bt.fromTo(beat, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'sine.inOut' })
          .to(beat, { opacity: 0, duration: 0.4, ease: 'sine.inOut' }, '+=0.05');
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller]);

  return (
    <div ref={rootRef} className="tpl-design-06-premium">
      {/* Nav */}
      <header className="mn-nav">
        <a className="mn-wordmark" href="#hero">{name}</a>
        <nav className="mn-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="mn-circle-link" href="#circle">Circle</a>
      </header>

      {/* Hero — scroll-driven frame sequence (72 frames, Apple-style scrub) */}
      <section id="hero" data-tour={name} className="mn-hero">
        <ScrollFrames
          frames={frames}
          alt="Extreme macro of espresso crema, a slow champagne-lit swirl settling into a perfect spiral"
          pinDistance="+=170%"
          className="mn-hero-frames"
        >
          <div className="mn-hero-copy">
            <p className="mn-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="mn-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <LotChars text={content.hero.lot} />
            <p className="mn-hero-sub">{content.hero.sub}</p>
            <a className="mn-hero-cta" href="#collection">{content.hero.cta}</a>
          </div>
        </ScrollFrames>
        <div className="mn-hold" aria-hidden="true" />
      </section>

      {/* Philosophy */}
      <section id="philosophy" data-tour="Philosophy" className="mn-section mn-philosophy">
        <div className="mn-wrap">
          <p className="mn-eyebrow rv">{content.philosophy.eyebrow}</p>
          <h2 className="mn-h2 rv">{content.philosophy.title}</h2>
          <p className="mn-manifesto rv">{content.philosophy.manifesto}</p>
          <p className="mn-body rv">{content.philosophy.body}</p>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" data-tour="The Collection" className="mn-section mn-collection">
        <div className="mn-beat" aria-hidden="true" />
        <div className="mn-wrap">
          <p className="mn-eyebrow rv">{content.collection.eyebrow}</p>
          <h2 className="mn-h2 rv">{content.collection.title}</h2>
        </div>
        <LotGallery />
      </section>

      {/* Provenance */}
      <section id="provenance" data-tour="Provenance" className="mn-section mn-provenance">
        <div className="mn-beat" aria-hidden="true" />
        <div className="mn-wrap">
          <p className="mn-eyebrow rv">{content.provenance.eyebrow}</p>
          <h2 className="mn-h2 rv">{content.provenance.title}</h2>
          <div className="mn-lotcount rv">
            <span className="mn-lotnum" ref={lotNumRef}>47</span>
            <span className="mn-lotof">/ 200</span>
          </div>
          <p className="mn-lotlabel rv">{content.provenance.lotLabel}</p>
          <div className="mn-edition rv" aria-hidden="true">
            <span className="mn-edition-fill" />
          </div>
          <dl className="mn-prov-grid">
            {content.provenance.items.map((it) => (
              <div className="mn-prov-item rv" key={it.label}>
                <dt>{it.label}</dt>
                <dd>{it.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mn-cert">
            <div className="mn-cert-img">
              <Img k="detail" src={detailImg} alt={`Embossed gold seal close-up on the ${name} bag`} />
            </div>
            <div className="mn-cert-body">
              <p className="mn-cert-eyebrow">{content.provenance.certTitle}</p>
              <p className="mn-cert-text">{content.provenance.cert}</p>
              <p className="mn-cert-sign">E. Marchetti — Roast Master</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ritual */}
      <section id="ritual" data-tour="The Ritual" className="mn-section mn-ritual">
        <div className="mn-wrap">
          <p className="mn-eyebrow rv">{content.ritual.eyebrow}</p>
          <h2 className="mn-h2 rv">{content.ritual.title}</h2>
          <ol className="mn-ritual-steps">
            {content.ritual.steps.map((s, i) => (
              <li className="rv" key={s.t}>
                <span className="mn-ritual-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Circle */}
      <section id="circle" data-tour="The Circle" className="mn-section mn-circle">
        <div className="mn-wrap">
          <p className="mn-eyebrow rv">{content.circle.eyebrow}</p>
          <h2 className="mn-h2 rv">{content.circle.title}</h2>
          <p className="mn-body rv">{content.circle.sub}</p>
          <Circle />
        </div>
      </section>

      {/* Footer */}
      <footer className="mn-footer">
        <div className="mn-wrap">
          <p className="mn-foot-word">{name}</p>
          <p className="mn-foot-contact">
            <a href={`mailto:${email}`}>{email}</a>
            <span aria-hidden="true"> · </span>
            {content.contact.address}
          </p>
          <p className="mn-foot-line">{content.footer.line}</p>
          <p className="mn-foot-note">{content.footer.note}</p>
        </div>
      </footer>
    </div>
  );
}
