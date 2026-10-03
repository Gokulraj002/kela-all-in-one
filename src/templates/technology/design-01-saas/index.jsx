import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import { brandFor } from '../../_shared/brand.js';
import './styles.css';
import feat1Img from './assets/feature-1.webp';
import feat2Img from './assets/feature-2.webp';
import feat3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-saas';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap';

/* Abstract CSS-built dashboard mock — clean shapes only, no text-heavy UI.
   Hotspots are enabled only in the scrubbed tour (desktop + motion). */
const KELA = brandFor('technology');

function Dashboard({ hotspots = false, activeStep = 0, onDot = null }) {
  const { brand } = useCustom();
  const brandName = brand || content.brand.name;
  const bars = [42, 58, 50, 66, 74, 62, 80, 70, 86, 78, 90, 84, 94, 88];
  return (
    <div className="nb-dash" role="img" aria-label={`Abstract ${brandName} dashboard mockup showing pipeline, forecast, billing and integrations`}>
      <div className="nb-dash-chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="nb-dash-url">app.{KELA.domain}/overview</span>
      </div>
      <div className="nb-dash-body">
        <div className="nb-dash-rail" aria-hidden="true">
          <i className="is-on" />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="nb-dash-main">
          <div className="nb-dash-title-row" aria-hidden="true">
            <span className="nb-dash-title" />
            <span className="nb-dash-cta" />
          </div>
          <div className="nb-kpis" aria-hidden="true">
            {[
              { label: 'Pipeline', value: '$48.2M', w: '74%' },
              { label: 'Forecast', value: '$11.9M', w: '58%' },
              { label: 'Collected', value: '$9.4M', w: '86%' },
            ].map((k) => (
              <div className="nb-kpi" key={k.label}>
                <span className="nb-kpi-label">{k.label}</span>
                <span className="nb-kpi-value">{k.value}</span>
                <span className="nb-kpi-trend">
                  <i style={{ width: k.w }} />
                </span>
              </div>
            ))}
          </div>
          <div className="nb-chart" aria-hidden="true">
            <div className="nb-chart-head">
              <span className="nb-kpi-label">Revenue vs forecast</span>
              <span className="nb-chart-legend">
                <span className="l1">
                  <i />
                  Actual
                </span>
                <span className="l2">
                  <i />
                  Forecast
                </span>
              </span>
            </div>
            <svg viewBox="0 0 560 104" preserveAspectRatio="none">
              {[22, 46, 70, 94].map((y) => (
                <line key={y} x1="0" y1={y} x2="560" y2={y} style={{ stroke: 'var(--nb-slate-200)' }} strokeWidth="1" />
              ))}
              {bars.map((h, i) => (
                <rect
                  key={i}
                  x={8 + i * 40}
                  y={100 - h}
                  width="22"
                  height={h}
                  rx="5"
                  style={{ fill: i % 4 === 3 ? 'var(--nb-accent)' : 'var(--nb-accent-soft)' }}
                  opacity={i % 4 === 3 ? 1 : 0.9}
                />
              ))}
              <path
                d="M8,74 C70,66 110,50 170,54 C230,58 270,38 330,42 C390,46 430,26 490,30 C520,32 545,24 556,22"
                fill="none"
                style={{ stroke: 'var(--nb-accent)' }}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M8,60 C90,52 170,44 250,40 C330,36 430,28 556,20"
                fill="none"
                style={{ stroke: 'var(--nb-slate-300)' }}
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="nb-rows" aria-hidden="true">
            {[0, 1].map((r) => (
              <div className="nb-row" key={r}>
                <span className="nb-row-ico" />
                <span className="nb-row-lines">
                  <i style={{ width: '70%' }} />
                  <i />
                </span>
                <span className="nb-row-status">Live</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {hotspots &&
        content.tour.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`nb-hotspot${i === activeStep ? ' is-active' : ''}`}
            style={{ top: s.dot.top, left: s.dot.left }}
            aria-label={`Go to ${s.title}`}
            onClick={() => onDot && onDot(i)}
          />
        ))}
    </div>
  );
}

function Pricing() {
  const { price, productName } = useCustom();
  const [cycle, setCycle] = useState('annual');
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="nb-pricing-head">
        <p className="nb-eyebrow nb-rv">{content.pricing.eyebrow}</p>
        <h2 className="nb-h2 nb-rv">{content.pricing.title}</h2>
        <p className="nb-lede nb-rv">{content.pricing.sub}</p>
        <div className="nb-toggle nb-rv" role="group" aria-label="Billing period">
          <button
            type="button"
            className={cycle === 'monthly' ? 'is-on' : ''}
            aria-pressed={cycle === 'monthly'}
            onClick={() => setCycle('monthly')}
          >
            {content.pricing.toggle.monthly}
          </button>
          <button
            type="button"
            className={cycle === 'annual' ? 'is-on' : ''}
            aria-pressed={cycle === 'annual'}
            onClick={() => setCycle('annual')}
          >
            {content.pricing.toggle.annual}
          </button>
        </div>
      </div>
      <div className="nb-tiers">
        {content.pricing.tiers.map((t, i) => {
          const amount = cycle === 'annual' ? t.annual : t.monthly;
          return (
            <article
              key={t.name}
              className={`nb-tier nb-rv${t.highlight ? ' is-highlight' : ''}`}
              aria-label={`${t.name} plan`}
            >
              {t.highlight && <span className="nb-tier-flag">Most popular</span>}
              <h3 className="nb-tier-name">{productName(i, t.name)}</h3>
              <p className="nb-tier-blurb">{t.blurb}</p>
              <p className="nb-tier-price">
                {amount == null ? (
                  'Custom'
                ) : (
                  <>
                    {price(amount)}
                    <span className="nb-tier-per"> / seat / mo</span>
                  </>
                )}
              </p>
              <ul>
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                className={`nb-btn ${t.highlight ? 'nb-btn-primary' : 'nb-btn-ghost'}`}
                href="#contact"
                onClick={(e) => {
                  if (reduced) return;
                  const panel = e.currentTarget;
                  gsap.fromTo(panel, { scale: 0.97 }, { scale: 1, duration: 0.35, ease: 'power2.out' });
                }}
              >
                {amount == null ? 'Talk to sales' : 'Start free trial'}
              </a>
            </article>
          );
        })}
      </div>
      <p className="nb-pricing-footnote nb-rv">{content.pricing.footnote}</p>
    </div>
  );
}

export default function Design01Saas() {
  const { brand, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const tourST = useRef(null);
  const stepRef = useRef(0);
  const [step, setStep] = useState(0);

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

  const jumpToStep = (i) => {
    const st = tourST.current;
    if (!st) return;
    const y = st.start + ((i + 0.5) / content.tour.steps.length) * (st.end - st.start);
    const s = scroller();
    // Go through the platform's Lenis instance when there is one: a native
    // smooth scrollTo would fight Lenis' own scroll position frame by frame.
    const lenis = s && s.__lenis;
    if (lenis) lenis.scrollTo(y, reduced ? { immediate: true } : { duration: 1.1 });
    else if (s === window) window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    else s.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance — calm, nothing bouncy. */
      gsap
        .timeline({ defaults: { ease: 'power2.out' } })
        .fromTo('.nb-hero-pill', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo('.nb-hero-title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1 }, 0.22)
        .fromTo('.nb-hero-sub', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .fromTo('.nb-hero-ctas', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .fromTo('.nb-hero-proof', { opacity: 0 }, { opacity: 1, duration: 1 }, 0.75);

      /* Calm scroll reveals. */
      gsap.utils.toArray('.nb-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Animated metric count-ups. */
      gsap.utils.toArray('.nb-metric-num').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        const fmt = (v) =>
          prefix +
          v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
          suffix;
        el.textContent = fmt(0); /* markup holds the final figure (reduced motion) */
        ScrollTrigger.create({
          trigger: el,
          scroller: sc,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = fmt(obj.v);
              },
            }),
        });
      });

      /* HOTSPOT TOUR — pinned scrub, desktop only (≥768px), resize-safe. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.nb-tour-pin');
        if (!pin) return undefined;
        stepRef.current = 0;
        const st = ScrollTrigger.create({
          trigger: pin,
          scroller: sc,
          start: 'top 84px',
          end: '+=250%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const i = Math.min(
              content.tour.steps.length - 1,
              Math.floor(self.progress * content.tour.steps.length)
            );
            if (i !== stepRef.current) {
              stepRef.current = i;
              setStep(i);
            }
          },
        });
        tourST.current = st;
        return () => {
          tourST.current = null;
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const steps = content.tour.steps;

  return (
    <div ref={rootRef} className={`tpl-design-01-saas${reduced ? ' is-reduced' : ''}`}>
      {/* NAV */}
      <header className="nb-nav">
        <div className="nb-nav-inner">
          <a className="nb-wordmark" href="#hero" aria-label={`${name} home`}>
            <span className="nb-wordmark-mark" aria-hidden="true" />
            {name}
          </a>
          <nav aria-label="Primary">
            <ul className="nb-nav-links">
              {content.nav.map((n) => (
                <li key={n.label}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nb-nav-actions">
            <a className="nb-signin" href="#contact">
              Sign in
            </a>
            <a className="nb-btn nb-btn-primary" href="#contact">
              Get started
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (Apple-style scrub) */}
        <section id="hero" className="nb-hero" data-tour="Welcome">
          <ScrollFrames frames={frames} alt="Glass facade drifting past" pinDistance="+=170%">
            <div className="nb-hero-veil" aria-hidden="true" />
            <div className="nb-hero-copy">
              <p className="nb-hero-pill">
                <span className="nb-hero-pill-dot" aria-hidden="true" />
                {content.hero.eyebrow}
              </p>
              <h1 className="nb-hero-title">
                {content.hero.titleStart} <span className="nb-accent-word">{content.hero.titleAccent}</span>
              </h1>
              <p className="nb-hero-sub">{content.hero.sub}</p>
              <div className="nb-hero-ctas">
                <a className="nb-btn nb-btn-primary" href={content.hero.ctaPrimaryHref}>
                  {content.hero.ctaPrimary}
                </a>
                <a className="nb-btn nb-btn-ghost" href={content.hero.ctaSecondaryHref}>
                  {content.hero.ctaSecondary}
                </a>
              </div>
              <p className="nb-hero-proof">
                <span className="nb-proof-stars" aria-hidden="true">
                  ★★★★★
                </span>
                <span>
                  <strong>4.9/5</strong> from 2,100+ reviews · Free 14-day trial
                </span>
              </p>
            </div>
          </ScrollFrames>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section className="nb-preview" aria-label="Product preview">
          <div className="nb-wrap">
            <div className="nb-rv">
              <Dashboard />
            </div>
          </div>
        </section>

        {/* LOGO STRIP */}
        <section className="nb-logos" aria-label="Trusted by">
          <p className="nb-logos-label nb-rv">{content.logos.label}</p>
          <div className="nb-logos-row nb-rv">
            {content.logos.marks.map((m, i) => (
              <span key={m} className={`nb-logo l${i}`} aria-label={m}>
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* HOTSPOT TOUR */}
        <section id="platform" className="nb-section nb-tour" data-tour="Platform tour">
          <div className="nb-wrap">
            <div className="nb-sec-head">
              <p className="nb-eyebrow nb-rv">{content.tour.eyebrow}</p>
              <h2 className="nb-h2 nb-rv">{content.tour.title}</h2>
              <p className="nb-lede nb-rv">{content.tour.sub}</p>
            </div>

            {!reduced && (
              <div className="nb-tour-pin">
                <div className="nb-tour-side">
                  <Dashboard hotspots activeStep={step} onDot={jumpToStep} />
                </div>
                <div className="nb-callouts" aria-live="polite">
                  {steps.map((s, i) => (
                    <article key={s.id} className={`nb-callout${i === step ? ' is-active' : ''}`}>
                      <span className="nb-callout-step">
                        {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                      </span>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                      <ul>
                        {s.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <div className="nb-tour-progress" aria-hidden="true">
                  {steps.map((s, i) => (
                    <i key={s.id} className={i <= step ? 'is-done' : ''} />
                  ))}
                </div>
              </div>
            )}

            <div className="nb-tour-static">
              <Dashboard />
              <div className="nb-tour-cards">
                {steps.map((s, i) => (
                  <article key={s.id} className="nb-tour-card">
                    <span className="nb-callout-step">
                      {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <ul>
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section id="metrics" className="nb-section nb-metrics" data-tour="By the numbers">
          <div className="nb-wrap">
            <p className="nb-eyebrow nb-rv">{content.metrics.eyebrow}</p>
            <h2 className="nb-h2 nb-rv">{content.metrics.title}</h2>
            <div className="nb-metrics-grid">
              {content.metrics.items.map((m) => (
                <div key={m.label} className="nb-rv">
                  <p
                    className="nb-metric-num"
                    data-target={m.target}
                    data-decimals={m.decimals}
                    data-prefix={m.prefix}
                    data-suffix={m.suffix}
                  >
                    {m.prefix}
                    {m.target.toLocaleString('en-US', {
                      minimumFractionDigits: m.decimals,
                      maximumFractionDigits: m.decimals,
                    })}
                    {m.suffix}
                  </p>
                  <p className="nb-metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section id="customers" className="nb-section" data-tour="Customers">
          <div className="nb-wrap">
            <div className="nb-testimonial-grid">
              <div className="nb-testimonial-imgs nb-rv">
                <figure>
                  <Img
                    k="product-0"
                    src={feat1Img}
                    alt={`Bright modern ${name} customer office in morning light, empty desks by tall windows`}
                  />
                </figure>
                <figure>
                  <Img
                    k="product-1"
                    src={feat2Img}
                    alt="Laptop on a bright desk showing an abstract blurred revenue dashboard"
                  />
                </figure>
              </div>
              <div className="nb-rv">
                <p className="nb-eyebrow">{content.testimonial.eyebrow}</p>
                <span className="nb-quote-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="nb-quote">{content.testimonial.quote}</blockquote>
                <div className="nb-quote-who">
                  <span className="nb-avatar" aria-hidden="true">
                    {content.testimonial.initials}
                  </span>
                  <div>
                    <p className="nb-quote-name">{content.testimonial.name}</p>
                    <p className="nb-quote-role">{content.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="nb-section nb-pricing" data-tour="Pricing">
          <div className="nb-wrap">
            <Pricing />
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="nb-section" data-tour="Get started">
          <div className="nb-wrap">
            <div className="nb-cta-panel nb-rv">
              <div className="nb-cta-bg" aria-hidden="true">
                <Img k="detail" src={detailImg} alt="" />
              </div>
              <div className="nb-cta-copy">
                <p className="nb-eyebrow">{content.cta.eyebrow}</p>
                <h2>{content.cta.title}</h2>
                <p>{content.cta.sub}</p>
                <div className="nb-cta-actions">
                  <a className="nb-btn nb-btn-primary" href={`mailto:${email}`}>
                    {content.cta.cta}
                  </a>
                  <a className="nb-btn nb-btn-ghost" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                    Talk to sales
                  </a>
                </div>
                <p className="nb-cta-note">{content.cta.note}</p>
              </div>
              <div className="nb-cta-visual" aria-hidden="true">
                <Img
                  k="product-2"
                  src={feat3Img}
                  alt="Revenue team gathered around a table with a laptop in bright daylight"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="nb-footer">
        <div className="nb-wrap">
          <div className="nb-footer-grid">
            <div className="nb-footer-brand">
              <a className="nb-wordmark" href="#hero" aria-label={`${name} home`}>
                <span className="nb-wordmark-mark" aria-hidden="true" />
                {name}
              </a>
              <p className="nb-footer-tag">{content.brand.tagline}. One live source of truth for pipeline, billing, and forecasts.</p>
              <address className="nb-footer-contact">
                <a href={`mailto:${email}`}>{email}</a>
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
              </address>
            </div>
            {content.footer.cols.map((c) => (
              <nav key={c.title} className="nb-footer-col" aria-label={c.title}>
                <h4>{c.title}</h4>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#hero">{l}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="nb-footer-bottom">
            <span>{content.footer.line.replace(content.brand.name, name)}</span>
            <span>SOC 2 Type II · GDPR ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
