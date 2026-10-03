import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import feature1Img from './assets/feature-1.webp';
import feature2Img from './assets/feature-2.webp';
import feature3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frames (Apple-style scrub). Posters (hero.jpg) stay
   in assets as fallbacks but the hero is fully frame-driven now. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-fintech';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Inter:wght@400;500;600;700&display=swap';

const fmt = (m, v) => `${m.prefix}${v.toFixed(m.decimals)}${m.suffix}`;

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ll-wm ${className}`} aria-label={text}>
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

export default function Design08Fintech() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  /* Code sample identifiers follow the brand: KelaTech / '@kelatech/node'. */
  const sdkClass = name.replace(/[^A-Za-z0-9]/g, '') || 'Client';
  const sdkPkg = content.developers.sdk.replace(/^npm i\s+/, '');

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

      /* Hero entrance: masked word-rise headline, then sub/chips/ctas. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.ll-hero-title .wi', { yPercent: 112 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 }, 0.15)
        .fromTo('.ll-hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo('.ll-hero-sub, .ll-hero-ctas', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.55)
        .fromTo('.ll-chip', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.9);

      /* Hero scrub is owned by ScrollFrames (pinned pin). No extra hero tween —
         pin spacing keeps the pinned hero and the ledger pin from overlapping. */

      /* Restrained reveals everywhere else. */
      gsap.utils.toArray('.ll-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.ll-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Count-ups in the metrics band (triggered once, eased — not scrubbed). */
      gsap.utils.toArray('.ll-count').forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const dec = parseInt(el.dataset.decimals, 10);
        const obj = { v: 0 };
        el.textContent = fmt({ prefix: el.dataset.prefix, suffix: el.dataset.suffix, decimals: dec }, 0);
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = fmt({ prefix: el.dataset.prefix, suffix: el.dataset.suffix, decimals: dec }, obj.v);
          },
        });
      });

      /* LEDGER CASCADE — the signature mechanic. Pinned ledger table on
         desktop; scrub processes rows top→bottom: highlight lands on a row
         while its numbers tween up from 0, then passes to the next row.
         Mobile gets a static fully-revealed table; reduced-motion skips
         all of this (final numbers rendered server-side below). */
      const pin = rootRef.current && rootRef.current.querySelector('.ll-ledger-pin');
      if (pin) {
        const rows = gsap.utils.toArray('.ll-row', pin);
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const states = rows.map(() => ({ a: 0, b: 0 }));
          rows.forEach((row, i) => {
            row.querySelector('.ll-num-a').textContent = fmt(content.products[i].metrics[0], 0);
            row.querySelector('.ll-num-b').textContent = fmt(content.products[i].metrics[1], 0);
            row.classList.toggle('is-active', i === 0);
          });
          /* The five rows are taller than any screen. Pin the ledger just
             under the sticky nav at exactly one visible screen and slide the
             table through its window as the rows post, so the active row is
             always in view (it used to post below the fold). */
          const nav = rootRef.current && rootRef.current.querySelector('.ll-nav');
          const viewport = pin.querySelector('.ll-table-viewport');
          const track = pin.querySelector('.ll-table-track');
          const navH = () => (nav ? nav.offsetHeight : 0);
          const setNavVar = () => pin.style.setProperty('--ll-nav-h', `${navH()}px`);
          pin.classList.add('is-live');
          setNavVar();
          const cascade = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: () => `top ${navH()}px`,
              end: '+=250%',
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefreshInit: setNavVar,
            },
            onUpdate: () => {
              const idx = Math.min(rows.length - 1, Math.floor(cascade.progress() * rows.length));
              rows.forEach((r, j) => r.classList.toggle('is-active', j === idx));
            },
          });
          rows.forEach((row, i) => {
            const m = content.products[i].metrics;
            cascade.to(
              states[i],
              {
                a: m[0].value,
                b: m[1].value,
                duration: 1,
                ease: 'none',
                onUpdate: () => {
                  row.querySelector('.ll-num-a').textContent = fmt(m[0], states[i].a);
                  row.querySelector('.ll-num-b').textContent = fmt(m[1], states[i].b);
                },
              },
              i
            );
          });
          if (viewport && track) {
            cascade.fromTo(
              track,
              { y: 0 },
              {
                y: () => -Math.max(0, track.offsetHeight - viewport.clientHeight),
                ease: 'none',
                duration: rows.length,
              },
              0
            );
          }
          return () => {
            rows.forEach((r) => r.classList.remove('is-active'));
            pin.classList.remove('is-live');
            pin.style.removeProperty('--ll-nav-h');
          };
        });
        mm.add('(max-width: 767.98px)', () => {
          rows.forEach((row, i) => {
            const m = content.products[i].metrics;
            row.querySelector('.ll-num-a').textContent = fmt(m[0], m[0].value);
            row.querySelector('.ll-num-b').textContent = fmt(m[1], m[1].value);
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-08-fintech">
      <header className="ll-nav">
        <a className="ll-wordmark" href="#hero" aria-label={`${name} home`}>
          <span className="ll-wordmark-mark" aria-hidden="true" />
          {name}
        </a>
        <nav className="ll-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="ll-cta-btn" href="#cta">{content.hero.cta}</a>
      </header>

      <main>
        {/* HERO — scroll-driven frame scrub (also the "Welcome" tour stop) */}
        <section id="hero" className="ll-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Extreme macro of gold circuit traces gliding laterally across a deep green field"
            pinDistance="+=170%"
          >
            <div className="ll-hero-veil" aria-hidden="true" />
            <div className="ll-wrap ll-hero-copy">
            <p className="ll-eyebrow ll-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="ll-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="ll-lede ll-hero-sub">{content.hero.sub}</p>
            <div className="ll-hero-ctas">
              <a className="ll-btn ll-btn-gold" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="ll-btn ll-btn-ghost" href={content.hero.docsHref}>{content.hero.docs}</a>
            </div>
            <div className="ll-chips" aria-label="Live platform statistics">
              {content.hero.chips.map((c) => (
                <div className="ll-chip" key={c.label}>
                  <span className="ll-chip-value">{c.value}</span>
                  <span className="ll-chip-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
          </ScrollFrames>
        </section>

        {/* LEDGER CASCADE — API PRODUCTS */}
        <section id="products" className="ll-products" data-tour="The Ledger API">
          <div className="ll-ledger-pin">
            <div className="ll-wrap ll-ledger-head">
              <p className="ll-eyebrow ll-rv">The platform</p>
              <h2 className="ll-h2 ll-rv">Five APIs. One ledger of record.</h2>
              <p className="ll-lede ll-rv">Scroll — each product posts to the ledger as you go.</p>
              <span className="ll-rule" aria-hidden="true" />
            </div>
            <div className="ll-wrap ll-table-viewport">
              <div className="ll-table-track">
              <div className="ll-table" role="table" aria-label={`${name} API products`}>
                {content.products.map((p, i) => (
                  <div className="ll-row" role="row" key={p.name}>
                    <div className="ll-row-main" role="cell">
                      <p className="ll-row-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
                      <h3 className="ll-row-name">{productName(i, p.name)}</h3>
                      <code className="ll-row-endpoint">{p.endpoint}</code>
                      <p className="ll-row-desc">{p.desc}</p>
                    </div>
                    <div className="ll-row-nums" role="cell">
                      {p.metrics.map((m, j) => (
                        <div className="ll-ledger-metric" key={m.label}>
                          <span className={`ll-num ll-num-${j === 0 ? 'a' : 'b'}`}>
                            {fmt(m, reduced ? m.value : 0)}
                          </span>
                          <span className="ll-metric-label">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="ll-ledger-note ll-rv">Figures: trailing-twelve-month platform totals, audited quarterly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CODE SAMPLE */}
        <section id="developers" className="ll-code-sec" data-tour="Code sample">
          <div className="ll-wrap ll-code-grid">
            <div>
              <p className="ll-eyebrow ll-rv">{content.developers.eyebrow}</p>
              <h2 className="ll-h2 ll-rv">{content.developers.title}</h2>
              <span className="ll-rule" aria-hidden="true" />
              <p className="ll-body ll-rv">{content.developers.body}</p>
              <code className="ll-sdk ll-rv">{content.developers.sdk}</code>
            </div>
            <div className="ll-code-frame ll-rv">
              <div className="ll-code-bar" aria-hidden="true">
                <span /><span /><span />
                <em>charge.js</em>
              </div>
              <pre className="ll-code" tabIndex="0" aria-label={`Code sample: creating a payment with the ${name} Node SDK`}><code>
<span className="tok-kw">import</span> <span className="tok-fn">{sdkClass}</span> <span className="tok-kw">from</span> <span className="tok-str">{`'${sdkPkg}'`}</span><span className="tok-punc">;</span>{'\n'}{'\n'}
<span className="tok-kw">const</span> client = <span className="tok-kw">new</span> <span className="tok-fn">{sdkClass}</span><span className="tok-punc">(</span><span className="tok-str">'sk_live_…'</span><span className="tok-punc">);</span>{'\n'}{'\n'}
<span className="tok-com">// Idempotent: retry safely, charge once.</span>{'\n'}
<span className="tok-kw">const</span> payment = <span className="tok-kw">await</span> client.<span className="tok-fn">payments</span>.<span className="tok-fn">create</span><span className="tok-punc">({'{ '}</span>{'\n'}
  <span className="tok-str">amount</span><span className="tok-punc">:</span> <span className="tok-num">24900</span><span className="tok-punc">,</span>{'\n'}
  <span className="tok-str">currency</span><span className="tok-punc">:</span> <span className="tok-str">'usd'</span><span className="tok-punc">,</span>{'\n'}
  <span className="tok-str">destination</span><span className="tok-punc">:</span> <span className="tok-str">'acct_1H7qQf'</span><span className="tok-punc">,</span>{'\n'}
  <span className="tok-str">metadata</span><span className="tok-punc">:</span> <span className="tok-punc">{'{ '}</span><span className="tok-str">order_id</span><span className="tok-punc">:</span> <span className="tok-str">'ord_88412'</span> <span className="tok-punc">{'}'}</span><span className="tok-punc">,</span>{'\n'}
<span className="tok-punc">{'}'});</span>{'\n'}{'\n'}
<span className="tok-fn">console</span>.<span className="tok-fn">log</span><span className="tok-punc">(</span>payment.<span className="tok-str">id</span><span className="tok-punc">);</span> <span className="tok-com">// pay_9f3K2mQvXy</span>{'\n'}
              </code></pre>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="ll-gallery">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.gallery.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.gallery.title}</h2>
            <span className="ll-rule" aria-hidden="true" />
            <div className="ll-gallery-grid">
              <figure className="ll-frame ll-rv">
                <Img k="product-0" src={img('product-0', feature1Img)} alt="Modern bank headquarters facade of stone and glass at dawn" />
                <figcaption>{content.gallery.captions[0]}</figcaption>
              </figure>
              <figure className="ll-frame ll-rv">
                <Img k="product-1" src={img('product-1', feature2Img)} alt="Hand holding a dark green metal payment card with gold rim light" />
                <figcaption>{content.gallery.captions[1]}</figcaption>
              </figure>
              <figure className="ll-frame ll-rv">
                <Img k="product-2" src={img('product-2', feature3Img)} alt="Financial district skyscrapers with lit windows at blue hour" />
                <figcaption>{content.gallery.captions[2]}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* METRICS BAND */}
        <section id="metrics" className="ll-metrics" data-tour="Scale, in numbers">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.metrics.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.metrics.title}</h2>
            <div className="ll-metrics-row">
              {content.metrics.items.map((m) => (
                <div className="ll-band-metric ll-rv" key={m.label}>
                  <span
                    className="ll-count"
                    data-value={m.value}
                    data-decimals={m.decimals}
                    data-prefix={m.prefix}
                    data-suffix={m.suffix}
                  >
                    {reduced ? fmt(m, m.value) : fmt(m, 0)}
                  </span>
                  <span className="ll-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section id="company" className="ll-company" data-tour="Compliance">
          <div className="ll-wrap ll-company-grid">
            <div>
              <p className="ll-eyebrow ll-rv">{content.company.eyebrow}</p>
              <h2 className="ll-h2 ll-rv">{content.company.title}</h2>
              <span className="ll-rule" aria-hidden="true" />
              <p className="ll-body ll-rv">{content.company.body}</p>
              <ul className="ll-badges ll-rv">
                {content.company.badges.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <figure className="ll-frame ll-rv">
              <Img k="detail" src={img('detail', detailImg)} alt="Macro of a gold payment chip on a deep green card surface" />
              <figcaption>Every credential encrypted at rest and in transit.</figcaption>
            </figure>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="ll-pricing" data-tour="Pricing">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.pricing.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.pricing.title}</h2>
            <p className="ll-lede ll-rv">{content.pricing.body}</p>
            <div className="ll-tiers">
              {content.pricing.tiers.map((t) => (
                <article className={`ll-tier${t.featured ? ' is-featured' : ''} ll-rv`} key={t.name}>
                  {t.featured && <p className="ll-tier-flag">Most popular</p>}
                  <h3 className="ll-tier-name">{t.name}</h3>
                  <p className="ll-tier-price">
                    <span className="ll-tier-amount">{price(t.price)}</span>
                    <span className="ll-tier-per">{t.per}</span>
                  </p>
                  <p className="ll-tier-note">{t.note}</p>
                  <p className="ll-tier-rate">{t.rate}</p>
                  <ul className="ll-tier-features">
                    {t.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a className={`ll-btn ${t.featured ? 'll-btn-gold' : 'll-btn-ghost'}`} href="#cta">{t.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="ll-cta">
          <div className="ll-wrap ll-cta-panel ll-rv">
            <p className="ll-eyebrow ll-rv">{content.cta.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.cta.title}</h2>
            <p className="ll-body ll-rv">{content.cta.body}</p>
            <div className="ll-cta-row ll-rv">
              <a className="ll-btn ll-btn-gold" href={content.cta.ctaHref}>{content.cta.cta}</a>
              <a className="ll-cta-mail" href={`mailto:${email}`}>{email}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ll-footer">
        <div className="ll-wrap">
          <div className="ll-footer-top">
            <div className="ll-footer-brand">
              <a className="ll-wordmark ll-wordmark-light" href="#hero">
                <span className="ll-wordmark-mark" aria-hidden="true" />
                {name}
              </a>
              <p className="ll-footer-tag">{content.brand.tagline}</p>
              <p className="ll-footer-contact">
                <a href={`mailto:${email}`}>{email}</a>
                <span aria-hidden="true"> · </span>
                <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`}>{content.contact.phone}</a>
              </p>
            </div>
            {content.footer.columns.map((col) => (
              <nav className="ll-footer-col" aria-label={col.title} key={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}><a href="#hero">{l}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="ll-footer-bottom">
            <p>{content.footer.line}</p>
            <p className="ll-colophon">{content.footer.colophon}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
