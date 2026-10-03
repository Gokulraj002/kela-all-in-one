import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

const FONT_ID = 'tpl-font-design-02-urban';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Inter:wght@400;500;600;700&display=swap';

const FLOORS = 24;
const LISTING_IMGS = { 'product-0': listing1Img, 'product-1': listing2Img, 'product-2': listing3Img };

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Resolve the platform scroll container from a node inside the template —
   the same rule as useTplScope (.tpl-scope when it actually scrolls, else
   window). Child components need this: their layout effects run before the
   root div's ref is attached, so the root's scroller() would still answer
   window on first mount and the pin would never engage in the viewer. */
function scrollerFor(node) {
  try {
    const el = node && node.closest('.tpl-scope');
    if (el && el.scrollHeight > el.clientHeight + 2) return el;
  } catch { /* fall back to window */ }
  return window;
}

/* Server-safe word-mask headline. Each word is an inline-block mask, so a
   real space is rendered between word spans ("& Stone", not "&Stone"). */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ss-wm ${className}`} aria-label={text}>
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

/* Schematic floor-plan diagrams, drawn sharp. */
function PlanDiagram({ variant }) {
  const rooms =
    variant === 's'
      ? [
          { x: 8, y: 8, w: 104, h: 92, l: 'LIVING' },
          { x: 8, y: 104, w: 104, h: 38, l: 'KITCHEN' },
          { x: 116, y: 8, w: 96, h: 60, l: 'BED 1' },
          { x: 116, y: 72, w: 96, h: 70, l: 'BED 2' },
        ]
      : variant === 'm'
      ? [
          { x: 8, y: 8, w: 120, h: 92, l: 'LIVING' },
          { x: 8, y: 104, w: 60, h: 38, l: 'KITCHEN' },
          { x: 72, y: 104, w: 56, h: 38, l: 'UTILITY' },
          { x: 132, y: 8, w: 80, h: 60, l: 'BED 1' },
          { x: 132, y: 72, w: 80, h: 70, l: 'BED 2+3' },
        ]
      : [
          { x: 8, y: 8, w: 128, h: 92, l: 'LIVING' },
          { x: 8, y: 104, w: 64, h: 38, l: 'KITCHEN' },
          { x: 76, y: 104, w: 60, h: 38, l: 'FAMILY' },
          { x: 140, y: 8, w: 72, h: 60, l: 'BED 1' },
          { x: 140, y: 72, w: 72, h: 70, l: 'BED 2+3' },
        ];
  return (
    <svg viewBox="0 0 220 150" className="ss-plan-svg" role="img" aria-label={`Schematic ${variant === 's' ? '2BHK' : '3BHK'} floor plan`}>
      <rect x="4" y="4" width="212" height="142" fill="none" stroke="currentColor" strokeWidth="2.5" />
      {rooms
        .filter((r) => r.w > 0)
        .map((r, i) => (
          <g key={i}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} style={{ fill: i === 0 ? 'var(--color-accent)' : 'none' }} fillOpacity={i === 0 ? 0.14 : 0} stroke="currentColor" strokeWidth="1.25" />
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 3} textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="currentColor" fontFamily="Archivo, sans-serif">
              {r.l}
            </text>
          </g>
        ))}
    </svg>
  );
}

function Nav({ unitsLeft }) {
  const { brand } = useCustom();
  const name = brand || content.brand.name;
  const numRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (reduced) {
      el.textContent = String(unitsLeft);
      return;
    }
    el.textContent = '0';
    const obj = { v: 0 };
    const tw = gsap.to(obj, {
      v: unitsLeft,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
    return () => tw.kill();
  }, [unitsLeft, reduced]);
  return (
    <header className="ss-nav">
      <a className="ss-wordmark" href="#hero">
        {name.split(' ')[0]} <b>&</b> {name.split(' ').slice(1).join(' ') || 'Stone'}
      </a>
      <nav className="ss-links" aria-label="Primary">
        {content.nav.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>
      <div className="ss-ticker" aria-live="polite" title={content.ticker.label}>
        <span className="ss-dot" aria-hidden="true" />
        <span ref={numRef} className="ss-count ss-num">{unitsLeft}</span>
        <span className="ss-tlabel">{content.ticker.label}</span>
      </div>
      <a className="ss-nav-cta" href="#contact">Enquire</a>
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="ss-hero" data-tour="Welcome">
      <ScrollFrames
        frames={frames}
        alt="Residential towers at blue hour — a slow crane descent past grids of warming windows down to the glowing lobby"
        pinDistance="+=170%"
      >
        <div className="ss-hero-shade" aria-hidden="true" />
        <div className="ss-hero-copy">
          <p className="ss-eyebrow">{content.hero.eyebrow}</p>
          <h1 className="ss-hero-title">
            <Words text="Stack" /> <span className="ss-thin"><Words text="& Stone" /></span>
          </h1>
          <p className="ss-hero-sub">{content.hero.sub}</p>
          <div className="ss-hero-cta-row">
            <a className="ss-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            <a className="ss-cta ss-ghost" href="#plans">Floor plans</a>
          </div>
        </div>
        <div className="ss-hero-stats ss-stagger">
          {content.hero.stats.map((s) => (
            <div className="ss-stat" key={s.label}>
              <div className="ss-stat-v ss-num">{s.value}</div>
              <div className="ss-stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </ScrollFrames>
    </section>
  );
}

function FilterBar({ bhk, setBhk, facing, setFacing, priceId, setPriceId, count }) {
  return (
    <div className="ss-filterbar" role="search" aria-label="Filter listings">
      <div className="ss-filterbar-in">
        <div className="ss-fgroup" role="group" aria-label="Bedrooms">
          <span className="ss-flabel">BHK</span>
          {content.filters.bhk.map((b) => (
            <button key={b} className={`ss-fbtn${bhk === b ? ' is-on' : ''}`} onClick={() => setBhk(b)} aria-pressed={bhk === b}>
              {b === 'All' ? 'All' : `${b} BHK`}
            </button>
          ))}
        </div>
        <div className="ss-fgroup" role="group" aria-label="Facing">
          <span className="ss-flabel">Facing</span>
          {content.filters.facing.map((f) => (
            <button key={f} className={`ss-fbtn${facing === f ? ' is-on' : ''}`} onClick={() => setFacing(f)} aria-pressed={facing === f}>
              {f}
            </button>
          ))}
        </div>
        <div className="ss-fgroup" role="group" aria-label="Price">
          <span className="ss-flabel">Price</span>
          {content.filters.price.map((p) => (
            <button key={p.id} className={`ss-fbtn${priceId === p.id ? ' is-on' : ''}`} onClick={() => setPriceId(p.id)} aria-pressed={priceId === p.id}>
              {p.label}
            </button>
          ))}
        </div>
        <p className="ss-fcount"><b className="ss-num">{count}</b> units match</p>
      </div>
    </div>
  );
}

/* Pinned elevator-rail card (desktop + motion). */
function RailCard({ unit, index, total }) {
  const { productName, price, img } = useCustom();
  const perSqft = Math.round(unit.price / unit.area);
  return (
    <article className="ss-rcard" aria-label={`Unit ${unit.code}`}>
      <div className="ss-rcard-media">
        <span className="ss-rcard-tag ss-num">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
        <Img k={unit.imgKey} src={img(unit.imgKey, LISTING_IMGS[unit.imgKey])} alt={`${unit.bhk}BHK apartment unit ${unit.code}, ${unit.facing.toLowerCase()} facing`} />
      </div>
      <div className="ss-rcard-body">
        <h3 className="ss-rcard-code">{productName(index, unit.code)}</h3>
        <p className="ss-rcard-type">{unit.bhk} BHK · Floor {unit.floor} · {unit.facing} facing</p>
        <dl className="ss-data">
          <div><dt>Carpet area</dt><dd className="ss-num">{unit.area.toLocaleString('en-IN')} sq ft</dd></div>
          <div><dt>Floor</dt><dd className="ss-num">L{unit.floor} / {FLOORS}</dd></div>
          <div><dt>Facing</dt><dd>{unit.facing}</dd></div>
          <div><dt>Rate</dt><dd className="ss-num">{price(perSqft)}/sq ft</dd></div>
        </dl>
        <figure className="ss-rcard-plan">
          <PlanDiagram variant={unit.plan} />
          <figcaption>Schematic plan — not to scale</figcaption>
        </figure>
        <p className="ss-rcard-note">{unit.note}</p>
        <div className="ss-rcard-foot">
          <p className="ss-rcard-price ss-num">{price(unit.price)}<small>excl. stamp duty, registration &amp; GST</small></p>
          <a className="ss-cta" href="#contact">Enquire</a>
        </div>
      </div>
    </article>
  );
}

/* Static unit card (mobile / reduced motion). */
function UnitCard({ unit, index }) {
  const { productName, price, img } = useCustom();
  const perSqft = Math.round(unit.price / unit.area);
  return (
    <article className="ss-ucard">
      <div className="ss-ucard-media">
        <Img k={unit.imgKey} src={img(unit.imgKey, LISTING_IMGS[unit.imgKey])} alt={`${unit.bhk}BHK apartment unit ${unit.code}, ${unit.facing.toLowerCase()} facing`} />
      </div>
      <div className="ss-ucard-body">
        <div className="ss-ucard-top">
          <h3 className="ss-ucard-code">{productName(index, unit.code)}</h3>
          <p className="ss-ucard-price ss-num">{price(unit.price)}</p>
        </div>
        <dl className="ss-udata">
          <div><dt>Type</dt><dd>{unit.bhk} BHK</dd></div>
          <div><dt>Area</dt><dd className="ss-num">{unit.area.toLocaleString('en-IN')} sq ft</dd></div>
          <div><dt>Floor</dt><dd className="ss-num">L{unit.floor}</dd></div>
          <div><dt>Facing</dt><dd>{unit.facing}</dd></div>
        </dl>
        <p className="ss-rcard-note">{unit.note} <span className="ss-num">({price(perSqft)}/sq ft)</span></p>
      </div>
    </article>
  );
}

function Listings({ reduced }) {
  const [bhk, setBhk] = useState('All');
  const [facing, setFacing] = useState('All');
  const [priceId, setPriceId] = useState('all');
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );
  const sectionRef = useRef(null);

  const priceMax = content.filters.price.find((p) => p.id === priceId).max;
  const filtered = useMemo(
    () =>
      content.units.filter(
        (u) => (bhk === 'All' || u.bhk === Number(bhk)) && (facing === 'All' || u.facing === facing) && u.price <= priceMax
      ),
    [bhk, facing, priceMax]
  );
  const filterKey = `${bhk}|${facing}|${priceId}`;
  const railOn = !reduced && isDesktop && filtered.length > 1;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const fn = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  /* Elevator rail: pinned scrub timeline, stepped floor by floor.
     The steps come from dwell segments baked into the timeline (each
     apartment holds still for a stretch of scroll) rather than
     ScrollTrigger snap, which fights the smooth-scroll inertia and makes
     the pinned rail jitter. The floor readout and marker label are written
     straight to the DOM from the timeline's own playhead (scrub-smoothed,
     correct in both directions) — no React re-render while scrolling. */
  useLayoutEffect(() => {
    if (!railOn || !sectionRef.current) return undefined;
    const section = sectionRef.current;
    const nav = section.closest('.tpl-design-02-urban')?.querySelector('.ss-nav');
    const bar = section.querySelector('.ss-filterbar');
    /* The sticky nav + filter bar sit over the pinned rail: reserve their
       height inside the pinned stage so no card hides beneath them. */
    const setSticky = () => {
      const h = (nav ? nav.offsetHeight : 60) + (bar ? bar.offsetHeight : 0);
      section.style.setProperty('--ss-sticky-h', `${h}px`);
    };
    setSticky();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(setSticky) : null;
    if (ro && bar) ro.observe(bar);
    const ctx = gsap.context(() => {
      const sc = scrollerFor(section);
      const stage = section.querySelector('.ss-rail-pin');
      const cards = gsap.utils.toArray('.ss-rcard', stage);
      const marker = stage.querySelector('.ss-marker');
      const markerLabel = marker.querySelector('span');
      const readout = stage.querySelector('.ss-floor-num');
      const fill = stage.querySelector('.ss-rail-progress-fill');
      const n = cards.length;
      /* Marker position as a transform: yPercent of its own height (one
         floor slot), so the move never triggers layout. */
      const yFor = (f) => (FLOORS - f) * 100;
      const HOLD = 0.6;
      const TRANS = 1;
      const mids = [];

      gsap.set(cards, { xPercent: 130, opacity: 0 });
      gsap.set(cards[0], { xPercent: 0, opacity: 1 });
      gsap.set(marker, { yPercent: yFor(filtered[0].floor) });
      let shown = -1;
      const show = (idx) => {
        if (idx === shown) return;
        shown = idx;
        const label = `L${filtered[idx].floor}`;
        if (markerLabel) markerLabel.textContent = label;
        if (readout) readout.textContent = label;
        cards.forEach((c, k) => c.setAttribute('aria-hidden', String(k !== idx)));
      };
      show(0);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onUpdate: () => {
          const t = tl.time();
          let idx = 0;
          for (let i = 1; i < n; i += 1) if (t >= mids[i]) idx = i;
          show(idx);
        },
        scrollTrigger: {
          trigger: stage,
          scroller: sc,
          start: 'top top',
          end: () => `+=${(n - 1) * 560 + 420}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (fill) fill.style.transform = `scaleX(${self.progress.toFixed(4)})`; },
        },
      });

      tl.to({}, { duration: HOLD * 0.5 }, 0);
      for (let i = 1; i < n; i += 1) {
        const at = HOLD * 0.5 + (i - 1) * (TRANS + HOLD);
        mids[i] = at + TRANS * 0.5;
        tl.to(marker, { yPercent: yFor(filtered[i].floor), duration: TRANS * 0.9 }, at);
        tl.to(cards[i - 1], { xPercent: -130, opacity: 0, duration: TRANS * 0.55, ease: 'power3.in' }, at);
        tl.to(cards[i], { xPercent: 0, opacity: 1, duration: TRANS * 0.55, ease: 'power3.out' }, at + TRANS * 0.2);
      }
      tl.to({}, { duration: HOLD * 0.5 });
    }, sectionRef);
    return () => {
      if (ro) ro.disconnect();
      ctx.revert();
    };
  }, [railOn, filterKey, filtered]);

  return (
    <section id="listings" className="ss-listings" data-tour="The Stack" ref={sectionRef}>
      <div className="ss-section ss-wrap" style={{ paddingBottom: 0 }}>
        <p className="ss-eyebrow ss-rv">Tower A · Live inventory</p>
        <h2 className="ss-h2 ss-rv">The stack, <span className="ss-accent">floor by floor.</span></h2>
        <p className="ss-lede ss-rv">
          Every released unit, with the numbers that matter — carpet area, floor, facing, and the
          all-in price. Scroll the tower: the marker rides the elevator, and each floor's
          apartment slides in.
        </p>
      </div>

      <FilterBar
        bhk={bhk} setBhk={setBhk}
        facing={facing} setFacing={setFacing}
        priceId={priceId} setPriceId={setPriceId}
        count={filtered.length}
      />

      {railOn ? (
        <div className="ss-rail-pin" aria-label="Apartment listings by floor">
          <div className="ss-rail-layout">
            <div className="ss-rail-side">
              <p className="ss-rail-label">Tower A</p>
              <p className="ss-floor-readout ss-num"><span className="ss-floor-num">L{filtered[0].floor}</span><small>Now viewing</small></p>
              <div className="ss-tower" aria-hidden="true">
                {Array.from({ length: FLOORS }, (_, i) => (
                  <div className="ss-floor" key={i} />
                ))}
                <div className="ss-marker"><span>L{filtered[0].floor}</span></div>
                <div className="ss-tower-base" />
              </div>
              <p className="ss-rail-label">Scroll — the lift moves</p>
            </div>
            <div className="ss-cards">
              {filtered.map((u, i) => (
                <RailCard key={u.code} unit={u} index={i} total={filtered.length} />
              ))}
            </div>
          </div>
          <div className="ss-rail-progress" aria-hidden="true"><span className="ss-rail-progress-fill" /></div>
        </div>
      ) : (
        <div className="ss-unit-list" aria-label="Apartment listings">
          {filtered.map((u, i) => (
            <UnitCard key={u.code} unit={u} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="ss-lede">No units match those filters. Loosen a constraint — the tower has more floors.</p>
          )}
        </div>
      )}
    </section>
  );
}

function Plans() {
  const { price, img } = useCustom();
  return (
    <section id="plans" className="ss-plans ss-section" data-tour="Floor Plans">
      <div className="ss-wrap">
        <p className="ss-eyebrow ss-rv">Floor plans</p>
        <h2 className="ss-h2 ss-rv">Three types. <span className="ss-accent">Zero fat.</span></h2>
        <p className="ss-lede ss-rv">
          The whole tower is built from three plan types. Learn one and you know the building —
          pick the one that fits, then check which floors still have it.
        </p>
        <span className="ss-rule" aria-hidden="true" />
        <div className="ss-plan-grid ss-stagger">
          {content.plans.map((p) => (
            <article className="ss-plan-card" key={p.id}>
              <div className="ss-plan-img">
                <Img k={p.imgKey} src={img(p.imgKey, LISTING_IMGS[p.imgKey])} alt={p.alt} />
                <p className="ss-plan-from"><small>From</small><span className="ss-num">{price(p.from)}</span></p>
              </div>
              <div className="ss-plan-body">
                <h3 className="ss-plan-name">{p.name}</h3>
                <p className="ss-plan-area ss-num">{p.area}</p>
                <p className="ss-plan-desc">{p.desc}</p>
                <div className="ss-plan-diagram"><PlanDiagram variant={p.id} /></div>
                <ul className="ss-plan-specs">
                  {p.specs.map((s) => (
                    <li key={s[0]}><span>{s[0]}</span><span className="ss-num">{s[1]}</span></li>
                  ))}
                </ul>
                <a className="ss-cta" href="#contact">Check availability</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Neighbourhood() {
  const { img } = useCustom();
  return (
    <section id="neighbourhood" className="ss-hood ss-section" data-tour="The Grid">
      <div className="ss-wrap">
        <p className="ss-eyebrow ss-rv">{content.neighbourhood.eyebrow}</p>
        <h2 className="ss-h2 ss-rv">{content.neighbourhood.title}</h2>
        <p className="ss-lede ss-rv">{content.neighbourhood.intro}</p>
        <div className="ss-hood-grid">
          <div className="ss-hood-table ss-rv">
            {content.neighbourhood.rows.map((r) => (
              <div className="ss-hood-row" key={r.place}>
                <span className="ss-hood-time ss-num">{r.time}</span>
                <span className="ss-hood-place">{r.place}<span className="ss-hood-note">{r.note}</span></span>
                <span className="ss-hood-dist ss-num">9 AM</span>
              </div>
            ))}
          </div>
          <div className="ss-bars ss-rv">
            <h3>Location scores</h3>
            {content.neighbourhood.bars.map((b) => (
              <div className="ss-bar" key={b.label}>
                <div className="ss-bar-top"><span>{b.label}</span><span className="ss-num">{b.value}/100</span></div>
                <div className="ss-bar-track"><span className="ss-bar-fill" data-w={b.value} /></div>
              </div>
            ))}
          </div>
        </div>
        <figure className="ss-detail-figure ss-rv">
          <Img k="detail" src={img('detail', detailImg)} alt="Close-up of the tower facade — concrete and glass in a tight geometric rhythm" />
          <figcaption>Facade study — concrete &amp; glass, Tower A</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Contact() {
  const { contact } = useCustom();
  const [done, setDone] = useState(false);
  const email = contact.email || content.contact.email;
  return (
    <section id="contact" className="ss-contact ss-section" data-tour="Enquire">
      <div className="ss-wrap">
        <p className="ss-eyebrow ss-rv">{content.contact.eyebrow}</p>
        <h2 className="ss-h2 ss-rv">{content.contact.title}</h2>
        <p className="ss-lede ss-rv">{content.contact.hours}</p>
        <div className="ss-contact-grid">
          <div className="ss-contact-lines ss-rv">
            <div className="ss-cline"><span className="ss-k">Experience centre</span><address className="ss-v">{content.contact.address}</address></div>
            <div className="ss-cline"><span className="ss-k">Phone</span><a className="ss-v ss-num" href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a></div>
            <div className="ss-cline"><span className="ss-k">Email</span><a className="ss-v" href={`mailto:${email}`}>{email}</a></div>
          </div>
          <div className="ss-rv">
            {done ? (
              <div className="ss-form-done">
                <h3>Noted.</h3>
                <p>Our sales desk calls back within two working hours, 10 am – 7 pm. Bring questions about floors, not finishes — we like those.</p>
              </div>
            ) : (
              <form className="ss-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <h3>Book a walkthrough</h3>
                <p>No spam. One call, one visit, the actual price sheet.</p>
                <div className="ss-field">
                  <label htmlFor="ss-name">Name</label>
                  <input id="ss-name" name="name" type="text" autoComplete="name" required placeholder="Your full name" />
                </div>
                <div className="ss-field">
                  <label htmlFor="ss-phone">Phone</label>
                  <input id="ss-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91 …" />
                </div>
                <div className="ss-field">
                  <label htmlFor="ss-interest">I am looking at</label>
                  <select id="ss-interest" name="interest" defaultValue="2BHK">
                    <option>2BHK — Type S</option>
                    <option>3BHK — Type M</option>
                    <option>3BHK Sky — Type L</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
                <button className="ss-cta" type="submit">Request callback</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <footer className="ss-footer">
        <div className="ss-footer-in">
          <div>
            <p><strong>{content.footer.line}</strong></p>
            <p className="ss-rera">{content.contact.rera}</p>
            <p>{content.footer.colophon}</p>
          </div>
          <p className="ss-num">© 2026 Stack &amp; Stone</p>
        </div>
      </footer>
    </section>
  );
}

export default function Design02Urban() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const unitsLeft = content.ticker.released - content.ticker.sold;

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

      /* Hero entrance: masked word-rise + media settle + stats stagger. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.ss-hero .sf-stage', { scale: 1.08 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
        .fromTo('.ss-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 }, 0.2)
        .fromTo('.ss-hero .ss-eyebrow, .ss-hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.7)
        .fromTo('.ss-hero-cta-row', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, 1.0);

      /* Generic reveals. */
      gsap.utils.toArray('.ss-rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.ss-stagger').forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
        });
      });
      /* Location score bars grow on entry. */
      gsap.utils.toArray('.ss-bar-fill').forEach((bar) => {
        gsap.fromTo(bar, { width: 0 }, {
          width: `${bar.dataset.w}%`, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: bar, scroller: sc, start: 'top 90%', once: true },
        });
      });
      /* Hairline rules draw. */
      gsap.utils.toArray('.ss-rule').forEach((rule) => {
        gsap.fromTo(rule, { scaleX: 0 }, {
          scaleX: 1, duration: 0.9, ease: 'power2.inOut', transformOrigin: 'left',
          scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-02-urban">
      <Nav unitsLeft={unitsLeft} />
      <main>
        <Hero />
        <Listings reduced={reduced} />
        <Plans />
        <Neighbourhood />
        <Contact />
      </main>
    </div>
  );
}
