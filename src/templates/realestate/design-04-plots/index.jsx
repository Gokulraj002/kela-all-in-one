import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-plots';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`aa-wm ${className}`} aria-label={text}>
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

/* Featured plots on the survey map: content data + map centers (viewBox 1000x700) */
const MAP_PLOTS = content.masterplan.plots.map((p, i) => ({
  ...p,
  cx: [260, 765, 290, 775][i],
  cy: [195, 225, 530, 580][i],
  w: [150, 150, 160, 170][i],
  h: [110, 105, 115, 120][i],
}));

/* Ghost (non-featured) plot rects for map texture */
const GHOSTS = [
  [110, 80, 60, 46], [178, 80, 60, 46], [110, 132, 60, 46], [178, 132, 60, 46],
  [110, 210, 60, 46], [178, 210, 60, 46], [326, 80, 60, 46], [394, 80, 60, 46],
  [326, 210, 60, 46],
  [600, 120, 56, 42], [664, 120, 56, 42], [846, 120, 56, 42], [600, 250, 56, 42],
  [664, 250, 56, 42], [846, 250, 56, 42], [910, 180, 56, 42],
  [110, 380, 64, 48], [182, 380, 64, 48], [110, 452, 64, 48], [182, 452, 64, 48],
  [360, 380, 64, 48], [360, 452, 64, 48], [110, 548, 64, 48], [360, 548, 64, 48],
  [560, 460, 60, 46], [628, 460, 60, 46], [860, 460, 60, 46], [560, 600, 60, 46],
  [628, 600, 60, 46], [860, 600, 60, 46],
];

/* The survey map, drawn once, used by both the pinned zoom and the static fallback */
function SurveyMap({ transform, highlight }) {
  return (
    <svg className="aa-map" viewBox="0 0 1000 700" role="img" aria-label="Survey map of Aaranya Acres showing sectors, roads, lake and highlighted plots">
      <rect x="0" y="0" width="1000" height="700" className="aa-map-bg" />
      <g className="aa-map-inner" transform={transform || undefined}>
        {/* outer survey boundary + ticks */}
        <rect x="40" y="40" width="920" height="620" className="aa-map-boundary" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line key={`t${i}`} x1={60 + i * 38} y1="40" x2={60 + i * 38} y2={i % 4 === 0 ? '22' : '30'} className="aa-map-tick" />
        ))}
        {/* lake */}
        <path
          className="aa-map-lake"
          d="M680,300 C760,290 820,330 815,395 C810,460 740,500 672,488 C610,477 560,440 565,385 C570,330 615,308 680,300 Z"
        />
        <text x="690" y="402" className="aa-map-label aa-map-label--lake">Aaranya Lake</text>
        {/* roads */}
        <rect x="480" y="40" width="40" height="620" className="aa-map-road" />
        <line x1="500" y1="60" x2="500" y2="640" className="aa-map-dash" />
        <rect x="40" y="300" width="920" height="26" className="aa-map-road" />
        <rect x="40" y="150" width="920" height="16" className="aa-map-road aa-map-road--thin" />
        <rect x="40" y="450" width="920" height="16" className="aa-map-road aa-map-road--thin" />
        <text x="528" y="120" className="aa-map-label">40-ft Boulevard</text>
        {/* ghost plots */}
        {GHOSTS.map(([x, y, w, h], i) => (
          <rect key={`g${i}`} x={x} y={y} width={w} height={h} className="aa-map-ghost" />
        ))}
        {/* featured plots */}
        {MAP_PLOTS.map((p, i) => (
          <g key={p.no} className={`aa-plot${highlight === i ? ' is-active' : ''}`}>
            <rect x={p.cx - p.w / 2} y={p.cy - p.h / 2} width={p.w} height={p.h} className="aa-plot-rect" />
            <rect x={p.cx - p.w / 2} y={p.cy - p.h / 2} width={p.w} height={p.h} className="aa-plot-pulse" />
            <text x={p.cx} y={p.cy + 7} className="aa-plot-no">{p.no}</text>
          </g>
        ))}
        {/* sector labels */}
        <text x="250" y="70" className="aa-map-label aa-map-sector">Northgate Meadows</text>
        <text x="752" y="92" className="aa-map-label aa-map-sector">Lakeview Rows</text>
        <text x="250" y="660" className="aa-map-label aa-map-sector">Boulevard Greens</text>
        <text x="752" y="660" className="aa-map-label aa-map-sector">Meadow Quarter</text>
        {/* compass */}
        <g className="aa-map-compass" transform="translate(920,110)">
          <circle r="26" className="aa-compass-ring" />
          <path d="M0,-18 L6,8 L0,3 L-6,8 Z" className="aa-compass-needle" />
          <text y="-32" className="aa-map-label aa-compass-n">N</text>
        </g>
        {/* scale bar */}
        <g className="aa-map-scale" transform="translate(80,628)">
          <line x1="0" y1="0" x2="120" y2="0" className="aa-scale-line" />
          <line x1="0" y1="-6" x2="0" y2="6" className="aa-scale-line" />
          <line x1="60" y1="-6" x2="60" y2="6" className="aa-scale-line" />
          <line x1="120" y1="-6" x2="120" y2="6" className="aa-scale-line" />
          <text x="0" y="22" className="aa-map-label">0</text>
          <text x="52" y="22" className="aa-map-label">50</text>
          <text x="104" y="22" className="aa-map-label">100 m</text>
        </g>
      </g>
    </svg>
  );
}

function useWide() {
  const [wide, setWide] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const fn = (e) => setWide(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return wide;
}

const LISTING_IMGS = [listing1Img, listing2Img, listing3Img];
const LISTING_ALTS = content.collections.items.map((it) => it.alt);

export default function Design04Plots() {
  const { brand, img, price, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const wide = useWide();
  const pinned = wide && !reduced;
  const name = brand || content.brand.name;
  const email = contact.email || content.enquire.email;
  const heroPoster = img('hero', heroImg);
  const detailSrc = img('detail', detailImg);

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Plot strings pre-formatted so the scrubbed detail card can swap text cheaply */
  const plotStrings = MAP_PLOTS.map((p) => ({
    no: p.no,
    meta: `${p.sector} · ${p.dims} · ${p.facing}`,
    area: p.area,
    price: price(p.price),
  }));

  const cardNoRef = useRef(null);
  const cardMetaRef = useRef(null);
  const cardAreaRef = useRef(null);
  const cardPriceRef = useRef(null);
  const stageLabelRef = useRef(null);
  const miniRectRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: frame pour-wipe + word-rise, <= 2.2s */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.aa-hero-frame', { clipPath: 'inset(10% 6% 90% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' }, 0)
        .fromTo('.aa-hero-title .wi', { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 }, 0.25)
        .fromTo('.aa-hero-sub, .aa-hero-cta, .aa-hero-eyebrow', { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.8)
        .fromTo('.aa-hero-stat', { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 1.1);

      /* Hero parallax drift */
      gsap.to('.aa-hero-drift', {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: '.aa-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      /* Generic reveals */
      gsap.utils.toArray('.aa-rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.aa-stagger').forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
        });
      });
      /* Image pour-wipes */
      gsap.utils.toArray('.aa-wipe').forEach((frame) => {
        gsap.fromTo(frame, { clipPath: 'inset(10% 6% 90% 6%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
        });
      });
      /* Survey hairlines draw */
      gsap.utils.toArray('.aa-rule').forEach((rule) => {
        gsap.fromTo(rule, { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: 'power2.inOut',
          scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
        });
      });

      /* MASTERPLAN ZOOM — pinned, three stages (estate → sector → plot) */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.aa-plan-pin');
        if (!pin) return;
        const inner = pin.querySelector('.aa-map-inner');
        const plotEls = gsap.utils.toArray('.aa-plot', pin);
        /* zoom keys: [scale, centerX, centerY] → translate */
        const keys = [
          { s: 1, cx: 500, cy: 350 },
          { s: 2.4, cx: 260, cy: 195 },  // Northgate Meadows
          { s: 2.4, cx: 765, cy: 225 },  // Lakeview Rows
          { s: 2.4, cx: 290, cy: 530 },  // Boulevard Greens
          { s: 5, cx: 775, cy: 580 },    // Meadow Quarter plot M-21
        ].map((k) => ({ s: k.s, x: 500 - k.s * k.cx, y: 350 - k.s * k.cy }));
        const state = { ...keys[0] };
        let lastActive = -1;
        /* Minimap viewport rect follows the zoom state (mini 120x84 over 1000x700),
           written straight to the DOM — no React re-render per scroll tick. */
        const applyMini = () => {
          const r = miniRectRef.current;
          if (!r) return;
          const w = 116 / state.s, h = 80 / state.s;
          const x = 2 + Math.max(0, Math.min(116 - w, (-state.x / state.s / 1000) * 116));
          const y = 2 + Math.max(0, Math.min(80 - h, (-state.y / state.s / 700) * 80));
          r.setAttribute('x', x.toFixed(2));
          r.setAttribute('y', y.toFixed(2));
          r.setAttribute('width', w.toFixed(2));
          r.setAttribute('height', h.toFixed(2));
        };
        const applyState = () => {
          if (inner) inner.setAttribute('transform', `translate(${state.x.toFixed(1)} ${state.y.toFixed(1)}) scale(${state.s.toFixed(3)})`);
          applyMini();
        };
        const setActive = (idx, progress) => {
          if (idx !== lastActive) {
            lastActive = idx;
            plotEls.forEach((el, i) => el.classList.toggle('is-active', i === idx));
            if (stageLabelRef.current) {
              stageLabelRef.current.textContent = progress < 0.2 ? content.masterplan.stages[0]
                : progress < 0.8 ? content.masterplan.stages[1] : content.masterplan.stages[2];
            }
            if (idx >= 0) {
              const d = plotStrings[idx];
              if (cardNoRef.current) cardNoRef.current.textContent = d.no;
              if (cardMetaRef.current) cardMetaRef.current.textContent = d.meta;
              if (cardAreaRef.current) cardAreaRef.current.textContent = d.area;
              if (cardPriceRef.current) cardPriceRef.current.textContent = d.price;
            }
          }
        };
        const master = gsap.timeline({
          scrollTrigger: {
            trigger: pin, scroller: sc, start: 'top top', end: '+=320%',
            pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = p < 0.2 ? -1 : p < 0.4 ? 0 : p < 0.6 ? 1 : p < 0.8 ? 2 : 3;
              setActive(idx, p);
            },
          },
        });
        for (let i = 1; i < keys.length; i++) {
          master.to(state, { ...keys[i], duration: 1, ease: 'power2.inOut', onUpdate: applyState }, i - 1);
        }
        applyState();
        setActive(-1, 0);
      });
    }, rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, scroller, rootRef, pinned]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.enquire.address)}`;
  const telHref = `tel:${content.enquire.phone.replace(/[^+\d]/g, '')}`;

  return (
    <div ref={rootRef} className="tpl-design-04-plots">
      {/* NAV */}
      <header className="aa-nav">
        <a className="aa-wordmark" href="#hero">
          <span className="aa-wordmark-mark" aria-hidden="true" />
          {name}
        </a>
        <nav className="aa-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="aa-cta" href="#enquire">Enquire</a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="aa-hero" data-tour="Welcome">
          <div className="aa-hero-frame">
            <div className="aa-hero-drift">
              <Img k="hero" src={heroPoster} eager alt="Golden-hour aerial over the Aaranya Acres plotted development — road grid, green avenues, the central lake catching the light" className="aa-hero-img" />
            </div>
            <div className="aa-hero-shade" aria-hidden="true" />
          </div>
          <div className="aa-hero-copy">
            <p className="aa-eyebrow aa-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="aa-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="aa-hero-sub">{content.hero.sub}</p>
            <a className="aa-cta aa-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
          </div>
          <dl className="aa-hero-stats">
            {content.hero.stats.map((s) => (
              <div className="aa-hero-stat" key={s.label}>
                <dt><span className="aa-stat-val">{s.value}</span><span className="aa-stat-unit">{s.unit}</span></dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* THE LAND */}
        <section id="land" className="aa-land" data-tour="The Land">
          <div className="aa-wrap aa-land-grid">
            <div className="aa-land-text">
              <p className="aa-eyebrow aa-rv">{content.land.eyebrow}</p>
              <h2 className="aa-h2 aa-rv">{content.land.title}</h2>
              <span className="aa-rule" aria-hidden="true" />
              {content.land.body.map((p, i) => (
                <p className="aa-body aa-rv" key={i}>{p}</p>
              ))}
              <dl className="aa-facts aa-stagger">
                {content.land.facts.map((f) => (
                  <div className="aa-fact" key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="aa-land-img aa-wipe">
              <Img k="detail" src={detailSrc} alt="Survey marker peg driven into rich dark soil among fresh grass, warm side light" />
              <figcaption>Plot corner C-03, pegged and recorded.</figcaption>
            </figure>
          </div>
        </section>

        {/* INTERLUDE — "The grid from above": scroll-scrubbed aerial flyover */}
        <section id="film" className="aa-film" aria-label="Aerial film of the estate" data-tour="Aerial Flyover">
          <ScrollFrames
            frames={frames}
            alt="Drone film: high aerial drift over the plotted development at golden hour, descent along the main boulevard, settling over the lake edge"
            pinDistance="+=120%"
            stageHeight="92svh"
          >
            <div className="aa-film-shade" aria-hidden="true" />
            <div className="aa-film-copy">
              <p className="aa-eyebrow aa-eyebrow--light aa-rv">{content.film.eyebrow}</p>
              <h2 className="aa-h2 aa-h2--light aa-rv">{content.film.title}</h2>
              <p className="aa-film-cap aa-rv">{content.film.caption}</p>
            </div>
          </ScrollFrames>
        </section>

        {/* MASTERPLAN */}
        <section id="masterplan" className="aa-plan" data-tour="Masterplan">
          {pinned ? (
            <div className="aa-plan-pin">
              <div className="aa-plan-stage">
                <div className="aa-wrap aa-plan-head">
                  <p className="aa-eyebrow">{content.masterplan.eyebrow}</p>
                  <h2 className="aa-h2">{content.masterplan.title}</h2>
                  <p className="aa-body">{content.masterplan.intro}</p>
                </div>
                <div className="aa-wrap aa-plan-body">
                  <div className="aa-plan-mapwrap">
                    <SurveyMap />
                    <svg className="aa-minimap" viewBox="0 0 120 84" aria-hidden="true">
                      <rect x="2" y="2" width="116" height="80" className="aa-mini-bg" />
                      <ellipse cx="82" cy="48" rx="18" ry="13" className="aa-mini-lake" />
                      <rect ref={miniRectRef} x="2" y="2" width="116" height="80" className="aa-mini-view" />
                    </svg>
                  </div>
                  <aside className="aa-plan-side">
                    <p className="aa-stage-label" ref={stageLabelRef}>{content.masterplan.stages[0]}</p>
                    <div className="aa-plot-card" aria-live="polite">
                      <p className="aa-plot-card-kicker">Surveyed plot</p>
                      <p className="aa-plot-no" ref={cardNoRef}>{plotStrings[0].no}</p>
                      <p className="aa-plot-meta" ref={cardMetaRef}>{plotStrings[0].meta}</p>
                      <dl className="aa-plot-dims">
                        <div><dt>Plot area</dt><dd ref={cardAreaRef}>{plotStrings[0].area}</dd></div>
                        <div><dt>Price</dt><dd ref={cardPriceRef}>{plotStrings[0].price}</dd></div>
                      </dl>
                      <a className="aa-cta aa-cta--small" href="#enquire">Reserve a visit</a>
                    </div>
                    <p className="aa-plan-hint">Scroll — the map carries you in</p>
                  </aside>
                </div>
              </div>
            </div>
          ) : (
            <div className="aa-plan-static">
              <div className="aa-wrap">
                <p className="aa-eyebrow aa-rv">{content.masterplan.eyebrow}</p>
                <h2 className="aa-h2 aa-rv">{content.masterplan.title}</h2>
                <p className="aa-body aa-rv">{content.masterplan.intro}</p>
                <div className="aa-plan-mapwrap aa-rv">
                  <SurveyMap highlight={-1} />
                </div>
                <ul className="aa-plot-list aa-stagger">
                  {MAP_PLOTS.map((p) => (
                    <li className="aa-plot-card" key={p.no}>
                      <p className="aa-plot-card-kicker">{p.sector}</p>
                      <p className="aa-plot-no">{p.no}</p>
                      <p className="aa-plot-meta">{p.dims} · {p.facing}</p>
                      <dl className="aa-plot-dims">
                        <div><dt>Plot area</dt><dd>{p.area}</dd></div>
                        <div><dt>Price</dt><dd>{price(p.price)}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="aa-collections" data-tour="Plot Collections">
          <div className="aa-wrap">
            <p className="aa-eyebrow aa-rv">{content.collections.eyebrow}</p>
            <h2 className="aa-h2 aa-rv">{content.collections.title}</h2>
            <span className="aa-rule" aria-hidden="true" />
            <div className="aa-cards aa-stagger">
              {content.collections.items.map((it, i) => (
                <article className="aa-card" key={it.name}>
                  <div className="aa-card-img aa-wipe">
                    <Img k={it.imgKey} src={img(it.imgKey, LISTING_IMGS[i])} alt={LISTING_ALTS[i]} />
                  </div>
                  <p className="aa-card-tick" aria-hidden="true">No. {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="aa-h3">{it.name}</h3>
                  <p className="aa-body">{it.desc}</p>
                  <dl className="aa-card-dims">
                    <div><dt>Typical plot</dt><dd>{it.dims}</dd></div>
                    <div><dt>Facing</dt><dd>{it.facing}</dd></div>
                    <div><dt>From</dt><dd className="aa-card-price">{price(it.price)}</dd></div>
                  </dl>
                  <a className="aa-cta aa-cta--ghost" href="#enquire">Enquire</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LEGACY / WHY LAND */}
        <section id="legacy" className="aa-legacy" data-tour="Why Land">
          <div className="aa-wrap aa-legacy-grid">
            <div>
              <p className="aa-eyebrow aa-rv">{content.legacy.eyebrow}</p>
              <h2 className="aa-h2 aa-rv">{content.legacy.title}</h2>
              <span className="aa-rule" aria-hidden="true" />
              <ol className="aa-reasons aa-stagger">
                {content.legacy.reasons.map((r, i) => (
                  <li className="aa-reason" key={r.title}>
                    <span className="aa-reason-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="aa-h3">{r.title}</h3>
                      <p className="aa-body">{r.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="aa-legacy-img aa-wipe">
              <Img k="hero" src={heroPoster} alt="Aerial of the estate at golden hour — avenues and lake laid out like a survey drawing" />
              <figcaption>The estate, surveyed and planted.</figcaption>
            </figure>
          </div>
        </section>

        {/* ENQUIRE */}
        <section id="enquire" className="aa-enquire" data-tour="Enquire">
          <div className="aa-wrap aa-enquire-grid">
            <div>
              <p className="aa-eyebrow aa-rv">{content.enquire.eyebrow}</p>
              <h2 className="aa-h2 aa-rv">{content.enquire.title}</h2>
              <span className="aa-rule" aria-hidden="true" />
              <p className="aa-body aa-rv">{content.enquire.text}</p>
              <p className="aa-enquire-hours aa-rv">{content.enquire.hours}</p>
            </div>
            <address className="aa-enquire-card aa-rv">
              <p className="aa-enquire-label">Experience centre</p>
              <p className="aa-enquire-address">{content.enquire.address}</p>
              <p className="aa-enquire-row">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="aa-enquire-row">
                <a href={telHref}>{content.enquire.phone}</a>
              </p>
              <div className="aa-enquire-ctas">
                <a className="aa-cta" href={`mailto:${email}?subject=${encodeURIComponent('Site visit — Aaranya Acres')}`}>Book a site visit</a>
                <a className="aa-cta aa-cta--ghost" href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
              </div>
            </address>
          </div>
        </section>
      </main>

      <footer className="aa-footer">
        <div className="aa-wrap">
          <p className="aa-footer-line">{content.footer.line}</p>
          <p className="aa-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
