import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
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

/* Scroll-driven frame sequence (replaces the autoplay hero loop). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-robotics';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Barlow:ital,wght@0,400;0,500;0,600;1,400&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ke-wm ${className}`} aria-label={text}>
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

/* 16000 -> "16,000" (thousands separators for the count-ups) */
const fmtMetric = (v, d) =>
  Number(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Design07Robotics() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.support.email;
  const phone = content.contact.support.phone;

  /* Mobile / narrow detection: the exploded-view pin only runs on desktop.
     Under reduced-motion or below 768px the callouts render statically. */
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = (e) => setIsNarrow(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  const staticXv = reduced || isNarrow;

  /* Callout geometry: anchor %, explosion vector, leader-line angle/length. */
  const callouts = useMemo(
    () =>
      content.callouts.map((c) => {
        const v = isNarrow ? c.vecM : c.vec;
        return {
          ...c,
          v,
          len: Math.hypot(v.dx, v.dy),
          ang: (Math.atan2(v.dy, v.dx) * 180) / Math.PI,
        };
      }),
    [isNarrow]
  );

  /* Hero is now a scroll-driven frame sequence — no video import. */

  /* Template fonts — injected once, never removed. */
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

      /* Hero entrance: frames settle, masked word-rise headline, spec row ticks
         in with mechanical eases. Total <= 2s. */
      const htl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      htl
        .fromTo('.ke-hero-frames .sf-canvas', { scale: 1.08 }, { scale: 1, duration: 1.6 }, 0)
        .fromTo(
          '.ke-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.07 },
          0.2
        )
        .fromTo(
          '.ke-hero-eyebrow, .ke-hero-sub',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          0.5
        )
        .fromTo(
          '.ke-spec',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 },
          0.8
        )
        .fromTo(
          '.ke-hero-cta-row',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.0
        );

      /* Mechanical reveals across sections. */
      gsap.utils.toArray('.ke-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.ke-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Wipe reveals on use-case frames. */
      gsap.utils.toArray('.ke-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(8% 6% 92% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Metrics count up with a mechanical ease. */
      gsap.utils.toArray('.ke-metric-num').forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const suffix = el.dataset.suffix || '';
        el.textContent = `${fmtMetric(0, decimals)}${suffix}`;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = `${fmtMetric(obj.v, decimals)}${suffix}`;
          },
        });
      });

      /* EXPLODED VIEW — the signature scroll mechanic. Desktop only (the
         matchMedia reverts on resize below 768px); reduced-motion and mobile
         get the static layout rendered by React. Pin the stage, scrub: 1,
         end '+=250%'. Phase 1 (0 → 0.5): labels translate outward along their
         vectors, leader lines draw, image scales 1 → 1.06. Phase 2
         (0.5 → 1): everything reassembles. */
      if (!staticXv) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const pin = rootRef.current.querySelector('.ke-xv-pin');
          const cos = gsap.utils.toArray('.ke-callout', pin);
          const labels = cos.map((co) => co.querySelector('.ke-co-label'));
          cos.forEach((co, i) => {
            /* Explicit transforms: GSAP can't recover the CSS centring
               (translate(-50%, -50%)) or the leader-line angle from a
               scaleX(0) matrix, which left every line pointing right and
               every label off-centre. At rest each label is folded into its
               joint (scale 0, opacity 0) and only unfolds during the
               explosion. */
            gsap.set(labels[i], { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0 });
            gsap.set(co.querySelector('.ke-co-line'), {
              rotation: callouts[i].ang, scaleX: 0, transformOrigin: 'left center',
            });
          });
          gsap.set(pin.querySelector('.ke-xv-frame'), { scale: 1 });

          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: '+=250%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          });

          /* Phase 1 — explosion. */
          tl.to(pin.querySelector('.ke-xv-frame'), { scale: 1.06, duration: 0.5 }, 0);
          cos.forEach((co, i) => {
            const v = callouts[i].v;
            const t = 0.03 + i * 0.04;
            tl.to(
              co.querySelector('.ke-co-label'),
              { x: v.dx, y: v.dy, opacity: 1, scale: 1, duration: 0.42 },
              t
            );
            tl.to(co.querySelector('.ke-co-line'), { scaleX: 1, duration: 0.38 }, t + 0.03);
          });

          /* Phase 2 — reassembly. */
          tl.to(pin.querySelector('.ke-xv-frame'), { scale: 1, duration: 0.5 }, 0.5);
          cos.forEach((co, i) => {
            const t = 0.53 + i * 0.04;
            tl.to(co.querySelector('.ke-co-line'), { scaleX: 0, duration: 0.38 }, t);
            tl.to(
              co.querySelector('.ke-co-label'),
              { x: 0, y: 0, opacity: 0, scale: 0, duration: 0.42 },
              t + 0.03
            );
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, staticXv, callouts, rootRef]);

  const caseImages = [f1Img, f2Img, f3Img];
  const caseKeys = ['product-1', 'product-2', 'product-3'];
  const caseAlts = [
    `Macro of a ${name} joint actuator: steel gears, bearings, and a safety-orange cable housing`,
    `A row of ${name} robotic arms working an assembly line on a dark factory floor`,
    "Engineer's hands measuring a machined gear with calipers on a dark workbench",
  ];

  return (
    <div ref={rootRef} className="tpl-design-07-robotics">
      {/* TECHNICAL NAV */}
      <header className="ke-nav">
        <a className="ke-wordmark" href="#hero" aria-label={`${name} — home`}>
          <span className="ke-mark" aria-hidden="true" />
          {name}
        </a>
        <nav className="ke-links" aria-label="Primary">
          {content.nav.map((n, i) => (
            <a key={n.href} href={n.href}>
              <span className="ke-link-num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="ke-cta" href="#contact">
          Get a quote
        </a>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (was autoplay video) */}
        <section id="hero" className="ke-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt={`${name} K7 robotic arm at rest in a precision lab; it picks a small component with deliberate slowness and settles back to rest`}
            pinDistance="+=170%"
            className="ke-hero-frames"
          >
            <div className="ke-hero-shade" aria-hidden="true" />
            <div className="ke-hero-copy">
            <p className="ke-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="ke-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="ke-hero-sub">{content.hero.sub}</p>
            <div className="ke-hero-cta-row">
              <a className="ke-cta ke-cta-solid" href={content.hero.ctaPrimaryHref}>
                {content.hero.ctaPrimary}
              </a>
              <a className="ke-cta ke-cta-ghost" href={content.hero.ctaSecondaryHref}>
                {content.hero.ctaSecondary}
              </a>
            </div>
            <dl className="ke-specs">
              {content.hero.specs.map((s) => (
                <div className="ke-spec" key={s.label}>
                  <dt className="ke-spec-value">{s.value}</dt>
                  <dd className="ke-spec-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          </ScrollFrames>
        </section>

        {/* EXPLODED VIEW */}
        <section
          id="products"
          className={`ke-xv${staticXv ? ' is-static' : ''}`}
          data-tour="Exploded View"
        >
          <div className="ke-wrap">
            <p className="ke-eyebrow ke-rv">{content.exploded.eyebrow}</p>
            <h2 className="ke-h2 ke-rv">{content.exploded.title}</h2>
            <span className="ke-rule" aria-hidden="true" />
            <p className="ke-body ke-rv">{content.exploded.body}</p>
          </div>
          <div className="ke-xv-pin">
            <div className="ke-xv-stage">
              <div className="ke-xv-frame">
                <Img
                  k="product-0"
                  src={img('product-0', heroImg)}
                  alt={`${name} K7 six-axis robotic arm, graphite finish with safety-orange accents, shown for the exploded-view breakdown`}
                />
              </div>
              {callouts.map((c, i) => (
                <div className="ke-callout" key={c.id} style={{ left: c.ax, top: c.ay }}>
                  <span className="ke-co-dot" aria-hidden="true" />
                  <span className="ke-co-tag" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="ke-co-line"
                    aria-hidden="true"
                    style={{ width: `${c.len}px`, '--ang': `${c.ang}deg` }}
                  />
                  <div
                    className="ke-co-label"
                    style={{ '--vx': `${c.v.dx}px`, '--vy': `${c.v.dy}px` }}
                  >
                    <span className="ke-co-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="ke-co-text">
                      <strong>{c.title}</strong>
                      <span>{c.spec}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {!staticXv && (
              <p className="ke-xv-hint" aria-hidden="true">
                {content.exploded.hint}
              </p>
            )}
            {/* Phones: five floating labels can't share a 360px-wide photo,
                so the parts are numbered on the image and listed here. */}
            {staticXv && (
              <ol className="ke-xv-legend">
                {callouts.map((c, i) => (
                  <li key={c.id}>
                    <span className="ke-co-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="ke-co-text">
                      <strong>{c.title}</strong>
                      <span>{c.spec}</span>
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        {/* ENGINEERING — blueprint section */}
        <section id="craft" className="ke-craft" data-tour="Engineering">
          <div className="ke-wrap">
            <p className="ke-eyebrow ke-rv">{content.craft.eyebrow}</p>
            <h2 className="ke-h2 ke-rv">{content.craft.title}</h2>
            <span className="ke-rule" aria-hidden="true" />
            <div className="ke-craft-grid">
              <div className="ke-craft-copy">
                <p className="ke-body ke-rv">{content.craft.body}</p>
                <ul className="ke-points">
                  {content.craft.points.map((p) => (
                    <li className="ke-point ke-rv" key={p.title}>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="ke-craft-fig ke-wipe ke-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt={`Macro of the ${name} servo gripper: machined steel fingers, hydraulic pistons, and safety-orange anodized details`}
                />
                <figcaption>Gripper assembly · servo-driven · IP67</figcaption>
              </figure>
            </div>
            <div className="ke-specsheet ke-rv">
              <h3 className="ke-h3">K7 — technical data</h3>
              <dl>
                {content.craft.specs.map((s) => (
                  <div className="ke-specrow" key={s.k}>
                    <dt>{s.k}</dt>
                    <dd>{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section id="gallery" className="ke-gallery" data-tour="Use Cases">
          <div className="ke-wrap">
            <p className="ke-eyebrow ke-rv">{content.gallery.eyebrow}</p>
            <h2 className="ke-h2 ke-rv">{content.gallery.title}</h2>
            <span className="ke-rule" aria-hidden="true" />
            <div className="ke-cases">
              {content.gallery.cases.map((c, i) => (
                <article className="ke-case ke-rv" key={c.title}>
                  <div className="ke-case-frame ke-wipe">
                    <Img k={caseKeys[i]} src={img(caseKeys[i], caseImages[i])} alt={caseAlts[i]} />
                  </div>
                  <p className="ke-case-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="ke-h3">{c.title}</h3>
                  <p className="ke-case-stat">
                    <strong>{c.stat}</strong>
                    <span>{c.statLabel}</span>
                  </p>
                  <p className="ke-body">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section className="ke-metrics" aria-label="Performance metrics">
          <div className="ke-wrap ke-metrics-grid">
            {content.metrics.map((m) => (
              <div className="ke-metric ke-rv" key={m.label}>
                <p
                  className="ke-metric-num"
                  data-value={m.value}
                  data-decimals={m.decimals}
                  data-suffix={m.suffix}
                >
                  {fmtMetric(m.value, m.decimals)}
                  {m.suffix}
                </p>
                <p className="ke-metric-label">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / CTA */}
        <section id="contact" className="ke-contact" data-tour="Get a Quote">
          <div className="ke-wrap">
            <p className="ke-eyebrow ke-rv">{content.contact.eyebrow}</p>
            <h2 className="ke-h2 ke-rv">{content.contact.title}</h2>
            <span className="ke-rule" aria-hidden="true" />
            <p className="ke-body ke-rv">{content.contact.body}</p>
            <a className="ke-cta ke-cta-solid ke-rv" href={`mailto:${email}?subject=K7%20quote%20request`}>
              {content.contact.cta}
            </a>
            <div className="ke-support ke-rv">
              <h3 className="ke-h3">{content.contact.support.title}</h3>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
              </p>
              <p className="ke-muted">{content.contact.support.hours}</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="ke-footer">
        <div className="ke-wrap ke-footer-grid">
          <a className="ke-wordmark" href="#hero">
            <span className="ke-mark" aria-hidden="true" />
            {name}
          </a>
          <nav className="ke-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="ke-footer-line">{content.footer.line}</p>
          <p className="ke-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
