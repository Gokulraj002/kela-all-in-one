import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { brandFor } from '../../_shared/brand.js';
import { content } from './content.js';
import './styles.css';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Signature roast sequence: 72 frames scrubbed by scroll (Apple-style),
   replacing the old autoplay hero video loop. Sorted for playback order. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-roastery';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap';

function Words({ text, className = '' }) {
  return (
    <span className={`rw-wm ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function roastBand(r) {
  if (r <= 2) return 'light';
  if (r === 3) return 'medium';
  return 'dark';
}

function RoastScale({ roast, label }) {
  return (
    <div className="rw-scale">
      <div className="rw-scale-track" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((t) => (
          <span key={t} className={`rw-tick${t <= roast ? ' is-on' : ''}`} />
        ))}
        <span
          className="rw-dot"
          data-roast={roast}
          style={{ left: `${(roast / 5) * 100}%` }}
        />
      </div>
      <span className="rw-scale-label">{label}</span>
    </div>
  );
}

const lineupImgs = [menu1Img, menu2Img, menu3Img];

/* One product card, shared by the scrubbed zoom journey (desktop + motion)
   and the static grid fallback (mobile / reduced-motion). */
function LineupCard({ p, i, cardClass, onAdd }) {
  const { productName, price, img } = useCustom();
  const name = productName(i, p.name);
  return (
    <article className={`rw-card ${cardClass}`} data-name={name}>
      <div className="rw-card-media">
        <Img
          k={`menu-${i % 3}`}
          src={img(`menu-${i % 3}`, lineupImgs[i % 3])}
          alt={`${name} — ${p.origin} coffee, ${p.roastLabel.toLowerCase()} roast`}
        />
        <span className="rw-roasted">Roasted {p.roasted}</span>
      </div>
      <div className="rw-card-body">
        <div className="rw-badges">
          <span className="rw-badge">{p.origin}</span>
          <span className="rw-badge">{p.altitude}</span>
          <span className="rw-badge">{p.process}</span>
        </div>
        <h3 className="rw-card-name">{name}</h3>
        <p className="rw-card-desc">{p.desc}</p>
        <div className="rw-notes">
          {p.notes.map((n) => (
            <span className="rw-note" key={n}>{n}</span>
          ))}
        </div>
        <RoastScale roast={p.roast} label={p.roastLabel} />
        <div className="rw-card-foot">
          <span className="rw-price">{price(p.price)} <small>/ {p.weight}</small></span>
          <button className="rw-add" onClick={onAdd}>Add to bag</button>
        </div>
      </div>
    </article>
  );
}

export default function Design02Roastery() {
  const { brand, img, productName, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || `wholesale@${brandFor('coffee').domain}`;

  const [cat, setCat] = useState('all');
  const [roast, setRoast] = useState('all');
  const [bag, setBag] = useState(0);
  const [sent, setSent] = useState(false);
  const gridRef = useRef(null);
  const bagRef = useRef(null);
  const daysRef = useRef(null);
  const flightST = useRef(null);

  /* The zoom journey only runs on desktop viewports; mobile gets the grid. */
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => setWide(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  const flightActive = !reduced && wide;

  const roastInfo = useMemo(() => {
    const d = new Date();
    const diff = (d.getDay() - 2 + 7) % 7; // days since Tuesday
    return { days: diff, label: diff === 0 ? 'roasted today' : `${diff} day${diff === 1 ? '' : 's'} ago` };
  }, []);

  const filtered = content.lineup.filter(
    (p) => (cat === 'all' || p.category === cat) && (roast === 'all' || roastBand(p.roast) === roast)
  );

  const pickCat = (c) => {
    setCat(c);
    document.querySelector('#products')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const applyFilter = (setter, value) => {
    setter(value);
    if (reduced || !rootRef.current) return;
    const grid = rootRef.current.querySelector('.rw-grid');
    if (grid) {
      gsap.fromTo(grid, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    }
    rootRef.current.querySelectorAll('.rw-dot').forEach((dot) => {
      const track = dot.parentElement;
      const pct = Number(dot.dataset.roast) / 5;
      gsap.fromTo(
        dot,
        { x: -track.clientWidth * pct },
        { x: 0, duration: 0.5, ease: 'power3.inOut', overwrite: 'auto', delay: 0.15 }
      );
    });
  };

  const addToBag = () => {
    setBag((b) => b + 1);
    if (!reduced && bagRef.current) {
      gsap.fromTo(bagRef.current, { scale: 1.3 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  /* Jump the zoom journey to a card (roast-progress rail dots). */
  const jumpTo = (i) => {
    const st = flightST.current;
    const total = filtered.length;
    if (!st || total < 2) return;
    const y = st.start + (st.end - st.start) * (i / (total - 1));
    const s = st.scroller;
    if (s === window) window.scrollTo({ top: y, behavior: 'smooth' });
    else s.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Hero entrance — runs once per mount (NOT on filter changes). */
  useLayoutEffect(() => {
    /* The days counter is GSAP-written text: React renders the span empty. */
    if (daysRef.current) daysRef.current.textContent = String(reduced ? roastInfo.days : 0);
    if (reduced) {
      return undefined;
    }
    const ctx = gsap.context(() => {
      /* Hero: drum bean-bloom (canvas/static frame inside the scrub stage),
         word-rise headline, freshness days tick. */
      gsap.fromTo(
        '.rw-hero .sf-canvas',
        { scale: 1.12, y: 12 },
        { scale: 1, y: 0, duration: 1.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.rw-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.05, delay: 0.2 }
      );
      const tick = { v: 0 };
      gsap.to(tick, {
        v: roastInfo.days,
        duration: 1.2,
        delay: 0.6,
        ease: 'power2.out',
        snap: { v: 1 },
        onUpdate: () => {
          if (daysRef.current) daysRef.current.textContent = String(Math.round(tick.v));
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, roastInfo.days, wide, rootRef]);

  /* Section reveals, roast timeline and origin map — independent of the
     lineup filters, so changing a filter never replays or re-hides them. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) {
        /* Final state: timeline fully active, map fully drawn. */
        gsap.utils.toArray('.rw-stage').forEach((s) => s.classList.add('is-active'));
        return;
      }

      /* Snappy utility reveals. */
      gsap.utils.toArray('.rw-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.rw-batch').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.07,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Roast timeline: scrubbed fill drives stage activation. */
      const stages = gsap.utils.toArray('.rw-stage');
      ScrollTrigger.create({
        trigger: '.rw-timeline',
        scroller: sc,
        start: 'top 70%',
        end: 'bottom 55%',
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
          stages.forEach((s, i) => s.classList.toggle('is-active', i <= idx));
        },
      });
      gsap.fromTo(
        '.rw-timeline-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.rw-timeline', scroller: sc, start: 'top 70%', end: 'bottom 55%', scrub: 1 },
        }
      );

      /* Origin map: SVG path draws, pins bloom at ~80%. */
      const paths = gsap.utils.toArray('.rw-draw-path');
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      const mapTl = gsap.timeline({
        scrollTrigger: { trigger: '.rw-map', scroller: sc, start: 'top 75%', once: true },
      });
      mapTl
        .to(paths, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', stagger: 0.25 })
        .fromTo(
          '.rw-pin',
          { scale: 0, transformOrigin: 'center' },
          { scale: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.18 },
          '-=0.9'
        );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* Zoom journey — rebuilt whenever the filtered lineup changes. */
  useLayoutEffect(() => {
    if (!flightActive) return undefined;
    const ctx = gsap.context(() => {
      const sc = scroller();
      /* Zoom journey: a scrubbed camera flight across the lineup. The track
         translates so the active card centers; cards travel
         0.75 (approaching) → 1 (active, centered) → 1.12 (receding), while
         the ember roast-progress rail marks the journey. Desktop + motion
         only — mobile and reduced-motion render the static grid. */
      const flightPin = rootRef.current && rootRef.current.querySelector('.rw-flight-pin');
      if (flightPin) {
        const viewport = flightPin.querySelector('.rw-flight-viewport');
        const track = flightPin.querySelector('.rw-flight-track');
        const cards = gsap.utils.toArray('.rw-flight-card', flightPin);
        const dots = gsap.utils.toArray('.rw-flight-dot', flightPin);
        const n = cards.length;
        if (n > 0 && viewport && track) {
          const centerX = (i) => {
            const c = cards[i];
            return viewport.clientWidth / 2 - (c.offsetLeft + c.offsetWidth / 2);
          };
          const nameEl = flightPin.querySelector('.rw-flight-name');
          const idxEl = flightPin.querySelector('.rw-flight-index');
          const setActive = (i) => {
            if (nameEl) nameEl.textContent = cards[i].dataset.name || '';
            if (idxEl) idxEl.textContent = String(i + 1).padStart(2, '0');
            dots.forEach((d, di) => d.classList.toggle('is-active', di === i));
          };
          setActive(0);
          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: flightPin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${n * 85}%`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              /* declaring a priority makes every later refresh re-sort triggers by
                 page position, so a pin created late (ScrollFrames) can't break order */
              refreshPriority: 0,
              invalidateOnRefresh: true,
              onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
            },
          });
          tl.set(track, { x: () => centerX(0) }, 0);
          tl.set(cards, { scale: 0.75, opacity: 0.35, transformOrigin: 'center 62%' }, 0);
          tl.set(cards[0], { scale: 1, opacity: 1 }, 0);
          tl.fromTo(
            '.rw-flight-rail-fill',
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', duration: Math.max(1, n - 1) },
            0
          );
          for (let i = 1; i < n; i++) {
            tl.to(track, { x: () => centerX(i), duration: 0.9 }, i - 1);
            tl.to(cards[i], { scale: 1, opacity: 1, duration: 0.9 }, i - 1);
            tl.to(cards[i - 1], { scale: 1.12, opacity: 0.28, duration: 0.9 }, i - 1);
          }
          flightST.current = tl.scrollTrigger;
        }
      }
    }, rootRef);
    return () => {
      flightST.current = null;
      ctx.revert();
    };
  }, [flightActive, scroller, cat, roast, rootRef]);

  /* The hero pin is built by ScrollFrames in a child useEffect, and the
     flight pin above is (re)built after the triggers below it. Parent
     effects run after child effects: re-sort and refresh here so every
     start/end includes both pins' spacing. */
  useEffect(() => {
    /* …and once more two frames later: ScrollFrames re-creates its pin when
       its stage height settles (a second commit), which appends it after
       the triggers below it. */
    const run = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    run();
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(run); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reduced, flightActive, cat, roast]);

  const heroCopy = (
    <div className="rw-hero-copy">
      <p className="rw-eyebrow">{content.hero.eyebrow}</p>
      <h1 className="rw-hero-title"><Words text={content.hero.title} /></h1>
      <p className="rw-fresh">
        <span className="rw-fresh-badge">Roasted Tuesday</span>
        <span className="rw-fresh-note"><span ref={daysRef} /> {roastInfo.days === 1 ? 'day' : 'days'} ago — at peak now</span>
      </p>
      <p className="rw-lede">{content.hero.sub}</p>
      <div className="rw-hero-ctas">
        <a className="rw-btn" href={content.hero.ctaHref}>{content.hero.cta}</a>
        <a className="rw-btn rw-btn-ghost" href={content.hero.cta2Href}>{content.hero.cta2}</a>
      </div>
      <dl className="rw-schedule">
        {content.hero.schedule.map((sch) => (
          <div key={sch.day}>
            <dt>{sch.day}</dt>
            <dd>{sch.note}</dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <div ref={rootRef} className="tpl-design-02-roastery">
      <header className="rw-nav">
        <a className="rw-wordmark" href="#hero">{name}</a>
        <nav className="rw-shopnav" aria-label="Shop">
          {content.nav.shop.map((s) => (
            <button key={s.cat} className={`rw-navlink${cat === s.cat ? ' is-active' : ''}`} onClick={() => pickCat(s.cat)}>
              {s.label}
            </button>
          ))}
          <a className="rw-navlink rw-wholesale-link" href="#wholesale">{content.nav.wholesale}</a>
        </nav>
        <button className="rw-bag" onClick={() => document.querySelector('#products')?.scrollIntoView({ block: 'start' })}>
          {content.nav.bag} <span ref={bagRef} className="rw-bag-count">{bag}</span>
        </button>
      </header>

      <main>
        {/* HERO — the whole hero pins while the roast sequence scrubs.
            Desktop: split stage (copy left, framed scrub right) inside the
            pinned ScrollFrames stage. Mobile: copy in flow, then a
            full-height scrub stage (copy would not fit inside the pin). */}
        <section id="hero" className={`rw-hero${wide ? ' is-split' : ''}`} data-tour="Roastery">
          {!wide && heroCopy}
          {/* Stable React-owned host: the pin-spacer ScrollTrigger wraps
              around .sf-wrap lives inside it, so React never has to insert
              or remove siblings next to a node GSAP has moved. */}
          <div className="rw-hero-stage">
            <ScrollFrames
              frames={frames}
              alt="Green-to-gold coffee beans tumbling inside the roaster drum, ember glow rising"
              pinDistance="+=170%"
            >
              {wide && heroCopy}
              <p className="rw-caption rw-hero-caption">Drum No. 2, mid-roast — Tuesday 06:40</p>
            </ScrollFrames>
          </div>
        </section>

        {/* LINEUP */}
        <section id="products" className="rw-lineup" data-tour="Current Lineup">
          <div className="rw-wrap">
            <div className="rw-sec-head">
              <div>
                <p className="rw-eyebrow rw-rv">Current lineup</p>
                <h2 className="rw-h2 rw-rv">This week's roast.</h2>
              </div>
              <div className="rw-filters rw-rv" role="group" aria-label="Filter by roast level">
                {content.roastFilters.map((f) => (
                  <button
                    key={f.id}
                    className={`rw-chip${roast === f.id ? ' is-active' : ''}`}
                    onClick={() => applyFilter(setRoast, f.id)}
                    aria-pressed={roast === f.id}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {flightActive && filtered.length > 0 ? (
              /* stable host for the pin-spacer (see the hero) */
              <div className="rw-flight-host" key={`${cat}-${roast}`}>
              <div className="rw-flight-pin">
                <div className="rw-flight-viewport">
                  <div className="rw-flight-track">
                    {filtered.map((p, i) => (
                      <LineupCard key={p.name} p={p} i={i} cardClass="rw-flight-card" onAdd={addToBag} />
                    ))}
                  </div>
                </div>
                <div className="rw-flight-rail">
                  <p className="rw-flight-now" aria-live="polite">
                    {/* text written by the scrub (setActive) — no React text
                        children, so React and GSAP never fight over the nodes */}
                    <span className="rw-flight-index" />
                    <span className="rw-flight-name" />
                  </p>
                  <div className="rw-flight-rail-track" aria-hidden="true">
                    <span className="rw-flight-rail-fill" />
                  </div>
                  <div className="rw-flight-dots" role="group" aria-label="Jump to a coffee">
                    {filtered.map((p, i) => (
                      <button
                        key={p.name}
                        className={`rw-flight-dot${i === 0 ? ' is-active' : ''}`}
                        onClick={() => jumpTo(i)}
                        aria-label={`Go to ${productName(i, p.name)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              </div>
            ) : (
              <>
                <div ref={gridRef} className="rw-grid rw-batch">
                  {filtered.map((p, i) => (
                    <LineupCard key={p.name} p={p} i={i} cardClass="" onAdd={addToBag} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className="rw-empty">No coffees match this filter — try another roast level.</p>
                )}
              </>
            )}
          </div>
        </section>

        {/* ROAST TIMELINE */}
        <section id="craft" className="rw-journey" data-tour="Roast Journey">
          <div className="rw-wrap">
            <p className="rw-eyebrow rw-rv">{content.timeline.eyebrow}</p>
            <h2 className="rw-h2 rw-rv">{content.timeline.title}</h2>
            <div className="rw-timeline">
              <div className="rw-timeline-track" aria-hidden="true">
                <span className="rw-timeline-fill" />
              </div>
              <ol className="rw-stages">
                {content.timeline.stages.map((s, i) => (
                  <li className="rw-stage" key={s.title}>
                    <span className="rw-stage-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rw-detail rw-rv">
              <Img k="detail" src={img('detail', detailImg)} alt="Roaster's hands holding freshly roasted coffee beans" />
              <p className="rw-caption">Cooling tray, seconds after the drop — every batch cupped before it ships.</p>
            </div>
          </div>
        </section>

        {/* ORIGIN MAP */}
        <section id="story" className="rw-origins" data-tour="Origins">
          <div className="rw-wrap">
            <p className="rw-eyebrow rw-rv">{content.origins.eyebrow}</p>
            <h2 className="rw-h2 rw-rv">{content.origins.title}</h2>
            <div className="rw-map rw-rv">
              <svg className="rw-map-svg" viewBox="0 0 800 440" role="img" aria-label="Stylised sourcing map showing coffee origins routing to the Bengaluru roastery">
                <defs>
                  <pattern id="rw-dots" width="26" height="26" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.6" fill="currentColor" opacity="0.28" />
                  </pattern>
                </defs>
                <rect width="800" height="440" fill="url(#rw-dots)" />
                <path className="rw-draw-path" d="M150,250 C260,180 360,150 470,170" fill="none" />
                <path className="rw-draw-path" d="M470,170 C540,190 580,210 600,210" fill="none" />
                <path className="rw-draw-path" d="M600,210 C630,220 645,235 650,250" fill="none" />
                <g className="rw-pin" transform="translate(150,250)">
                  <circle r="7" className="rw-pin-dot" />
                  <text y="-16" textAnchor="middle" className="rw-pin-label">Huila, Colombia</text>
                </g>
                <g className="rw-pin" transform="translate(470,170)">
                  <circle r="7" className="rw-pin-dot" />
                  <text y="-16" textAnchor="middle" className="rw-pin-label">Yirgacheffe, Ethiopia</text>
                </g>
                <g className="rw-pin" transform="translate(600,210)">
                  <circle r="7" className="rw-pin-dot" />
                  <text y="-16" textAnchor="middle" className="rw-pin-label">Chikmagalur, India</text>
                </g>
                <g className="rw-pin" transform="translate(650,250)">
                  <circle r="9" className="rw-pin-home" />
                  <text y="28" textAnchor="middle" className="rw-pin-label">{name}, Bengaluru</text>
                </g>
              </svg>
              <div className="rw-region-cards">
                {content.origins.regions.map((r) => (
                  <article className="rw-region-card" key={r.id}>
                    <h3>{r.region}</h3>
                    <dl>
                      <div><dt>Farm</dt><dd>{r.farm}</dd></div>
                      <div><dt>Altitude</dt><dd>{r.altitude}</dd></div>
                      <div><dt>Varietal</dt><dd>{r.varietal}</dd></div>
                      <div><dt>Process</dt><dd>{r.process}</dd></div>
                    </dl>
                    <p>{r.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHOLESALE */}
        <section id="wholesale" className="rw-wholesale" data-tour="Wholesale">
          <div className="rw-wrap">
            <p className="rw-eyebrow rw-rv">{content.wholesale.eyebrow}</p>
            <h2 className="rw-h2 rw-rv">{content.wholesale.title}</h2>
            <p className="rw-lede rw-rv">{content.wholesale.text}</p>
            <div className="rw-tiers rw-batch">
              {content.wholesale.tiers.map((t) => (
                <article className="rw-tier" key={t.name}>
                  <h3>{t.name}</h3>
                  <p className="rw-tier-vol">{t.volume}</p>
                  <p className="rw-tier-price">{t.price}</p>
                  <ul>
                    {t.perks.map((pk) => (
                      <li key={pk}>{pk}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="rw-form-wrap rw-rv">
              <h3 className="rw-h3">{content.wholesale.formTitle}</h3>
              {sent ? (
                <p className="rw-success">{content.wholesale.success}</p>
              ) : (
                <form
                  className="rw-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <label>Your name<input name="name" required autoComplete="name" /></label>
                  <label>Café / business<input name="business" required autoComplete="organization" /></label>
                  <label>Email<input name="email" type="email" required autoComplete="email" placeholder={email} /></label>
                  <label>
                    Monthly volume
                    <select name="volume" defaultValue="10 kg / month">
                      <option>10 kg / month</option>
                      <option>40 kg / month</option>
                      <option>120 kg / month</option>
                    </select>
                  </label>
                  <button className="rw-btn" type="submit">Request quote</button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* BREW GUIDES */}
        <section id="menu" className="rw-guides" data-tour="Brew Guides">
          <div className="rw-wrap">
            <p className="rw-eyebrow rw-rv">{content.brewGuides.eyebrow}</p>
            <h2 className="rw-h2 rw-rv">{content.brewGuides.title}</h2>
            <div className="rw-guide-grid rw-batch">
              {content.brewGuides.guides.map((g) => (
                <article className="rw-guide" key={g.coffee}>
                  <p className="rw-guide-coffee">{g.coffee}</p>
                  <h3>{g.method}</h3>
                  <dl>
                    <div><dt>Ratio</dt><dd>{g.ratio}</dd></div>
                    <div><dt>Grind</dt><dd>{g.grind}</dd></div>
                    <div><dt>Water</dt><dd>{g.temp}</dd></div>
                    <div><dt>Time</dt><dd>{g.time}</dd></div>
                  </dl>
                  <p className="rw-guide-note">{g.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="rw-footer">
        <div className="rw-wrap rw-foot-grid">
          <div>
            <p className="rw-foot-brand">{name}</p>
            <p className="rw-foot-line">{content.footer.line}</p>
          </div>
          <div>
            <h4>{content.footer.retail.title}</h4>
            <ul>{content.footer.retail.lines.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
          <div>
            <h4>{content.footer.wholesale.title}</h4>
            <ul>{content.footer.wholesale.lines.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
