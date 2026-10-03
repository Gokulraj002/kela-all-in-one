import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import feature1Img from './assets/feature-1.webp';
import feature2Img from './assets/feature-2.webp';
import feature3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-cloud';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';

const LAYER_IMAGES = [feature1Img, feature2Img, feature3Img, detailImg];
const LAYER_KEYS = ['product-0', 'product-1', 'product-2', 'detail'];

/* Dotted world map: landmass approximated as filled cell-blocks on a 48x20 grid.
   Rendered dim — the 28 region pins carry the section. */
const BLOBS = [
  [3, 16, 2, 8], [8, 13, 8, 11], [11, 16, 11, 17], [12, 15, 17, 19],
  [21, 24, 1, 3], [23, 27, 3, 6], [22, 28, 7, 11], [23, 27, 11, 16],
  [28, 44, 2, 7], [30, 40, 7, 9], [34, 39, 10, 12], [42, 44, 4, 8], [37, 43, 13, 16],
];
const MAP_W = 480;
const MAP_H = 200;

function MapDots() {
  const { brand } = useCustom();
  const brandName = brand || content.brand.name;
  const dots = [];
  BLOBS.forEach(([x0, x1, y0, y1], bi) => {
    for (let gx = x0; gx <= x1; gx += 1) {
      for (let gy = y0; gy <= y1; gy += 1) {
        const jx = (((gx * 37 + gy * 91) % 10) / 10 - 0.5) * 3;
        const jy = (((gx * 53 + gy * 29) % 10) / 10 - 0.5) * 3;
        dots.push(
          <circle
            key={`${bi}-${gx}-${gy}`}
            cx={(gx + 0.5) * 10 + jx}
            cy={(gy + 0.5) * 10 + jy}
            r={1.7}
            fill="rgba(120, 180, 235, 0.26)"
          />
        );
      }
    }
  });
  const grid = [];
  for (let x = 40; x < MAP_W; x += 40) {
    grid.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={MAP_H} stroke="rgba(120,170,220,0.08)" strokeWidth={1} />);
  }
  for (let y = 33; y < MAP_H; y += 33) {
    grid.push(<line key={`h${y}`} x1={0} y1={y} x2={MAP_W} y2={y} stroke="rgba(120,170,220,0.08)" strokeWidth={1} />);
  }
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-label={`Stylized world map showing ${brandName} cloud regions`}>
      {grid}
      {dots}
    </svg>
  );
}

/* ---------------- signature: scroll-zoomed topology ---------------- */
function TopologyStatic() {
  return (
    <div className="st-topo-static" aria-label="Platform layers">
      <div className="st-static-layers">
        {content.topology.layers.map((l) => (
          <div className="st-static-layer" key={l.id}>
            <h3><span className="st-tag">{l.tag}</span>{l.name}</h3>
            <p>{l.desc}</p>
            <div className="st-layer-chips">
              {l.stats.map((s) => (
                <span className="st-layer-chip" key={s.label}><b>{s.value}</b> {s.label}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- pricing calculator teaser ---------------- */
function Calculator() {
  const { price } = useCustom();
  const rates = content.pricing.rates;
  const [vals, setVals] = useState(() =>
    Object.fromEntries(content.pricing.sliders.map((s) => [s.id, s.def]))
  );
  const HOURS = 730;
  const lines = [
    { id: 'vcpu', label: 'Compute', amount: vals.vcpu * HOURS * rates.vcpu, unit: `${vals.vcpu} vCPUs × 730 hrs` },
    { id: 'storage', label: 'Storage', amount: vals.storage * rates.storage, unit: `${vals.storage.toLocaleString()} GB-months` },
    { id: 'egress', label: 'Data transfer', amount: vals.egress * rates.egress, unit: `${vals.egress.toLocaleString()} GB out` },
  ];
  const total = lines.reduce((a, l) => a + l.amount, 0);
  const set = (id, v) => setVals((p) => ({ ...p, [id]: Number(v) }));

  return (
    <div className="st-calc st-rv">
      <div className="st-calc-panel" role="group" aria-label="Workload estimator">
        {content.pricing.sliders.map((s) => {
          const pct = ((vals[s.id] - s.min) / (s.max - s.min)) * 100;
          return (
            <div className="st-slider-row" key={s.id}>
              <div className="st-slider-head">
                <label htmlFor={`st-range-${s.id}`}>
                  {s.label}
                  <small>{s.unit}</small>
                </label>
                <span className="st-slider-val">{vals[s.id].toLocaleString()}</span>
              </div>
              <input
                id={`st-range-${s.id}`}
                type="range"
                className="st-range"
                min={s.min}
                max={s.max}
                value={vals[s.id]}
                style={{ '--fill': `${pct}%` }}
                onChange={(e) => set(s.id, e.target.value)}
                aria-label={`${s.label} — ${s.unit}`}
              />
            </div>
          );
        })}
      </div>
      <div className="st-calc-total" aria-live="polite">
        <p className="st-total-label">Estimated monthly</p>
        <p className="st-total-value">{price(total)}</p>
        <p className="st-total-per">pay-as-you-go, billed by the second</p>
        <ul className="st-total-lines">
          {lines.map((l) => (
            <li key={l.id}>
              <span>{l.label} · {l.unit}</span>
              <b>{price(l.amount)}</b>
            </li>
          ))}
        </ul>
        <a className="st-btn st-btn-primary" href="#cta">{content.pricing.cta}</a>
      </div>
    </div>
  );
}

/* ---------------- main template ---------------- */
export default function Design05Cloud() {
  const { brand, img, contact, productName } = useCustom();
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

      /* nav solidifies after scroll */
      ScrollTrigger.create({
        scroller: sc,
        start: 70,
        end: 'max',
        toggleClass: { targets: '.st-nav', className: 'is-solid' },
      });

      /* hero entrance */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.st-hero .st-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo('.st-hero-title', { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1.1 }, 0.2)
        .fromTo('.st-hero-sub', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, 0.45)
        .fromTo('.st-hero-actions', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo('.st-hero-status', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.75);

      /* generic reveals */
      gsap.utils.toArray('.st-rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.st-stagger').forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
        });
      });

      /* metrics count-up */
      gsap.utils.toArray('.st-metric-value').forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const dec = parseInt(el.dataset.decimals, 10);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        /* markup holds the final figure (reduced motion); count from zero */
        el.textContent = (0).toFixed(dec) + suffix;
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          onUpdate: () => { el.textContent = obj.v.toFixed(dec) + suffix; },
        });
      });

      /* ===== signature: topology zoom (desktop + motion only) ===== */
      const pin = rootRef.current && rootRef.current.querySelector('.st-topo-pin');
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const layers = gsap.utils.toArray('.st-layer', pin);
          const rings = gsap.utils.toArray('.st-ring', pin);
          const infos = gsap.utils.toArray('.st-info', pin);
          const dots = gsap.utils.toArray('.st-dot', pin);
          const focusScale = [1.3, 1.45, 1.7, 2.2];

          /* x/y: 0 — GSAP would otherwise read the CSS translate(-50%, -50%)
             as pixels and stack it on top of xPercent/yPercent, pushing the
             wider layers off-centre. */
          gsap.set(layers, { x: 0, y: 0, xPercent: -50, yPercent: -50, opacity: 0, scale: 0.92 });
          gsap.set(rings, { opacity: 0 });
          gsap.set(infos, { autoAlpha: 0, y: 26 });
          gsap.set(layers[0], { opacity: 1, scale: 1 });
          gsap.set(rings[0], { opacity: 1 });
          gsap.set(infos[0], { autoAlpha: 1, y: 0 });

          /* Every step is placed on the scrubbed timeline at an absolute
             position, so layer, ring and copy stay in sync with the scroll. */
          let tl = null;
          const drawRing = (i, pos) => {
            tl.to(rings[i], { opacity: 1, duration: 0.15 }, pos).fromTo(
              rings[i].querySelectorAll('i'),
              { scale: 0 },
              { scale: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.07 },
              pos + 0.05
            );
          };
          const hideRing = (i, pos) => tl.to(rings[i], { opacity: 0, duration: 0.25 }, pos);
          const showInfo = (i, pos) =>
            tl.fromTo(infos[i], { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, pos);
          const hideInfo = (i, pos) => tl.to(infos[i], { autoAlpha: 0, y: -16, duration: 0.3 }, pos);

          tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: '+=300%',
              pin: true,
              scrub: 1,
              onUpdate: (self) => {
                const idx = Math.min(3, Math.floor(self.progress * 4));
                dots.forEach((d, di) => d.classList.toggle('is-active', di === idx));
              },
            },
          });

          /* segment 0 — edge: already on stage when the section arrives (no
             empty box before the pin), then the zoom begins */
          tl.to(layers[0], { scale: focusScale[0], duration: 0.7 }, 0.55);

          /* segment 1 — region */
          tl.to(layers[1], { opacity: 1, scale: 1, duration: 0.5 }, 1.25);
          tl.to(layers[0], { opacity: 0.14, scale: focusScale[0] * 1.15, duration: 0.5 }, 1.25);
          hideRing(0, 1.25); drawRing(1, 1.32);
          hideInfo(0, 1.25); showInfo(1, 1.35);
          tl.to(layers[1], { scale: focusScale[1], duration: 0.7 }, 1.8);

          /* segment 2 — cluster */
          tl.to(layers[2], { opacity: 1, scale: 1, duration: 0.5 }, 2.5);
          tl.to(layers[1], { opacity: 0.14, scale: focusScale[1] * 1.15, duration: 0.5 }, 2.5);
          hideRing(1, 2.5); drawRing(2, 2.57);
          hideInfo(1, 2.5); showInfo(2, 2.6);
          tl.to(layers[2], { scale: focusScale[2], duration: 0.7 }, 3.05);

          /* segment 3 — pod */
          tl.to(layers[3], { opacity: 1, scale: 1, duration: 0.5 }, 3.75);
          tl.to(layers[2], { opacity: 0.14, scale: focusScale[2] * 1.12, duration: 0.5 }, 3.75);
          hideRing(2, 3.75); drawRing(3, 3.82);
          hideInfo(2, 3.75); showInfo(3, 3.85);
          tl.to(layers[3], { scale: focusScale[3], duration: 0.7 }, 4.3);
          tl.to({}, { duration: 0.4 }); /* hold on the pod */
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const titleParts = content.hero.title.split('that ');
  const mapsNote = content.regions.list.length;

  return (
    <div ref={rootRef} className="tpl-design-05-cloud">
      {/* NAV */}
      <header className="st-nav">
        <div className="st-nav-inner">
          <a className="st-wordmark" href="#hero" aria-label={`${name} home`}>
            <span className="st-wordmark-mark" aria-hidden="true" />
            {name}
          </a>
          <nav className="st-nav-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="st-nav-cta">
            <a className="st-signin" href="#cta">Sign in</a>
            <a className="st-btn st-btn-primary" href="#pricing">Start free</a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="st-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Slow aerial push above a cloud deck at dusk, a lit data-center campus glowing below through a break in the clouds"
            pinDistance="+=170%"
          >
            <div className="st-hero-shade" aria-hidden="true" />
            <div className="st-wrap st-hero-inner">
              <p className="st-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="st-hero-title">
                {titleParts[0]}that <span className="st-grad">{titleParts[1]}</span>
              </h1>
              <p className="st-hero-sub">{content.hero.sub}</p>
              <div className="st-hero-actions">
                <a className="st-btn st-btn-primary" href={content.hero.ctaPrimaryHref}>{content.hero.ctaPrimary}</a>
                <a className="st-btn st-btn-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
              </div>
              <div className="st-hero-status">
                {content.hero.status.map((s) => (
                  <div className="st-status-item" key={s.label}>
                    <span className="st-status-label">{s.label}</span>
                    <span className="st-status-value">
                      {s.label === 'All systems' && <span className="st-status-dot" aria-hidden="true" />}
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <span className="st-scroll-cue" aria-hidden="true">Scroll</span>
          </ScrollFrames>
        </section>

        {/* TOPOLOGY ZOOM */}
        <section id="topology" className="st-topo st-sec-dark" data-tour="Platform Topology">
          <div className="st-topo-head st-wrap">
            <p className="st-eyebrow st-rv">{content.topology.eyebrow}</p>
            <h2 className="st-h2 st-rv">{content.topology.title}</h2>
            <p className="st-lede st-rv">{content.topology.body}</p>
          </div>
          <div className="st-topo-pin">
            <div className="st-topo-stage" aria-hidden="true">
              {content.topology.layers.map((l) => (
                <div className={`st-layer st-layer-${l.id}`} key={l.id}>
                  <span className="st-ring"><i /><i /><i /><i /></span>
                  <span className="st-layer-tag">{l.tag} · {l.name}</span>
                  <span className="st-layer-chips">
                    {l.stats.map((s) => (
                      <span className="st-layer-chip" key={s.label}><b>{s.value}</b> {s.label}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <div className="st-topo-side">
              <div className="st-topo-progress" aria-hidden="true">
                {content.topology.layers.map((l, i) => (
                  <span className={`st-dot${i === 0 ? ' is-active' : ''}`} key={l.id}>0{i + 1}</span>
                ))}
              </div>
              {content.topology.layers.map((l) => (
                <div className="st-info" key={l.id}>
                  <p className="st-info-tag">{l.tag}</p>
                  <h3>{l.name}</h3>
                  <p>{l.desc}</p>
                  <div className="st-info-stats">
                    {l.stats.map((s) => (
                      <div className="st-info-stat" key={s.label}>
                        <span>{s.label}</span>
                        <b>{s.value}</b>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TopologyStatic />
        </section>

        {/* PRODUCTS */}
        <section id="products" className="st-products" data-tour="Products">
          <div className="st-wrap">
            <div className="st-products-head">
              <div>
                <p className="st-eyebrow st-rv">The platform</p>
                <h2 className="st-h2 st-rv">Four primitives. Infinite architectures.</h2>
              </div>
              <p className="st-lede st-rv" style={{ maxWidth: '34ch' }}>
                Everything composes. Start with one primitive and grow into the rest — same API, same billing, same control plane.
              </p>
            </div>
            <div className="st-products-grid st-stagger">
              {content.products.map((p, i) => (
                <article className="st-card" key={p.name}>
                  <div className="st-card-media">
                    <Img k={LAYER_KEYS[i]} src={img(LAYER_KEYS[i], LAYER_IMAGES[i])} alt={p.alt} />
                  </div>
                  <div className="st-card-body">
                    <p className="st-card-tag">{p.tagline}</p>
                    <h3>{productName(i, p.name)}</h3>
                    <p>{p.body}</p>
                    <ul className="st-card-specs">
                      {p.specs.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                    <a className="st-card-link" href="#cta">
                      {p.cta} <span className="st-arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* REGIONS */}
        <section id="regions" className="st-regions st-sec-dark" data-tour="Global Regions">
          <div className="st-wrap">
            <div className="st-regions-head">
              <p className="st-eyebrow st-rv">{content.regions.eyebrow}</p>
              <h2 className="st-h2 st-rv">{content.regions.title}</h2>
              <p className="st-lede st-rv">{content.regions.body}</p>
            </div>
            <div className="st-map st-rv">
              <MapDots />
              {content.regions.list.map((r, i) => (
                <span
                  key={r.code}
                  className="st-pin"
                  title={`${r.name} (${r.code})`}
                  style={{
                    left: `${r.x}%`,
                    top: `${r.y}%`,
                    animationDelay: `${(i % 9) * 0.55}s`,
                    animationDuration: `${4.2 + (i % 5) * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <div className="st-region-grid st-stagger">
              {content.regions.list.map((r) => (
                <div className="st-region" key={r.code}>
                  <b>{r.name}</b>
                  <code>{r.code}</code>
                </div>
              ))}
            </div>
            <p className="st-region-count st-rv">{mapsNote} regions · 140+ edge locations · live now</p>
          </div>
        </section>

        {/* METRICS */}
        <section className="st-metrics st-sec-dark" aria-label="Platform metrics">
          <div className="st-wrap">
            <div className="st-metrics-grid st-stagger">
              {content.metrics.map((m) => (
                <div className="st-metric" key={m.label}>
                  <div
                    className="st-metric-value"
                    data-value={m.value}
                    data-decimals={m.decimals}
                    data-suffix={m.suffix}
                  >
                    {Number(m.value).toFixed(Number(m.decimals) || 0)}{m.suffix}
                  </div>
                  <p className="st-metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="st-pricing" data-tour="Pricing">
          <div className="st-wrap">
            <p className="st-eyebrow st-rv">{content.pricing.eyebrow}</p>
            <h2 className="st-h2 st-rv">{content.pricing.title}</h2>
            <p className="st-lede st-rv">{content.pricing.body}</p>
            <Calculator />
            <p className="st-calc-note st-rv">
              Note — {content.pricing.note}
            </p>
          </div>
        </section>

        {/* DOCS */}
        <section id="docs" className="st-docs">
          <div className="st-wrap">
            <p className="st-eyebrow st-rv">Documentation</p>
            <h2 className="st-h2 st-rv">Read the manual. Then break things safely.</h2>
            <div className="st-docs-grid st-stagger">
              {content.docs.map((d) => (
                <a className="st-doc" href="#docs" key={d.label}>
                  <h3>{d.label} <span className="st-arrow" aria-hidden="true">→</span></h3>
                  <p>{d.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="st-cta st-sec-dark">
          <div className="st-wrap">
            <p className="st-eyebrow st-rv">Get started</p>
            <h2 className="st-h2 st-rv">{content.cta.title}</h2>
            <p className="st-rv">{content.cta.body}</p>
            <div className="st-cta-actions st-rv">
              <a className="st-btn st-btn-primary" href="#pricing">{content.cta.primary}</a>
              <a className="st-btn st-btn-ghost" href={`mailto:${email}`}>{content.cta.secondary}</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="st-footer">
        <div className="st-wrap">
          <div className="st-footer-grid">
            <div className="st-footer-brand">
              <a className="st-wordmark" href="#hero">
                <span className="st-wordmark-mark" aria-hidden="true" />
                {name}
              </a>
              <p>{content.brand.tagline}</p>
              <a className="st-footer-mail" href={`mailto:${email}`}>{email}</a>
            </div>
            {content.footer.columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <h4>{c.title}</h4>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}><a href="#hero">{l}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="st-footer-bottom">
            <span>{content.footer.line}</span>
            <span className="st-footer-status">
              <span className="st-status-dot" aria-hidden="true" />
              All systems operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
