import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-villas';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&display=swap';

function Wordmark({ name }) {
  const i = name.indexOf(' ');
  if (i < 0) return <>{name}</>;
  return (
    <>
      <span>{name.slice(0, i)}</span> {name.slice(i + 1)}
    </>
  );
}
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`nv-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

const roomFallbacks = { 'product-0': room1Img, 'product-1': room2Img, 'product-2': room3Img };
const roomAlts = {
  'product-0': 'The Main Villa living pavilion at golden hour — teak beams, linen sofas, sheer curtains in the breeze',
  'product-1': 'The Infinity House pool edge at sunset — still water merging with the ocean horizon',
  'product-2': 'Private candlelit dining terrace at Villa Tide, facing the sea at dusk',
};

/* Node fractions along the journey path, in map order (gate → beach). */
const NODE_FRACTIONS = [0.03, 0.14, 0.25, 0.36, 0.47, 0.58, 0.69, 0.8, 0.9];

/* Stylized estate map. Nodes + marker are positioned at runtime with
   path.getPointAtLength() (motionPath-free), so the SVG stays resolution-clean. */
function EstateMap({ name }) {
  return (
    <div className="nv-map-frame">
      <svg className="nv-map-svg" viewBox="0 0 1024 640" role="img" aria-label={`Stylized map of the ${name} estate, from the gates to the beach`}>
        {/* sea */}
        <path className="map-sea" d="M 892 -20 C 856 120, 936 220, 900 340 C 868 452, 942 560, 910 680 L 1044 680 L 1044 -20 Z" />
        <path className="map-land" d="M 892 -20 C 856 120, 936 220, 900 340 C 868 452, 942 560, 910 680" />
        <text className="map-label" x="952" y="120">The Sea</text>
        {/* grounds contours */}
        <ellipse className="map-contour" cx="380" cy="300" rx="220" ry="150" />
        <ellipse className="map-contour" cx="380" cy="300" rx="140" ry="92" />
        <ellipse className="map-contour" cx="700" cy="220" rx="120" ry="80" />
        {/* garden walk spurs */}
        <path className="map-secondary" d="M 300 492 C 280 420, 330 380, 380 360" />
        <path className="map-secondary" d="M 660 430 C 700 350, 660 300, 620 280" />
        {/* compass */}
        <circle className="map-land" cx="80" cy="80" r="26" />
        <line x1="80" y1="96" x2="80" y2="64" stroke="#C9A24B" strokeWidth="1.5" />
        <path d="M 80 60 L 75 70 L 85 70 Z" fill="#C9A24B" />
        <text className="map-compass" x="80" y="118" textAnchor="middle">N</text>
        {/* labels */}
        <text className="map-label" x="120" y="600">Estate gates</text>
        <text className="map-label" x="560" y="560">West lawn</text>
        <text className="map-label" x="800" y="330">Beach path</text>
        {/* the journey path — drawn + travelled by the marker */}
        <path
          className="map-journey"
          d="M 120 560 C 190 545, 220 500, 300 492 C 380 484, 400 520, 480 495 C 560 470, 580 420, 660 430 C 740 440, 745 505, 810 470 C 850 450, 862 402, 895 382"
        />
        {/* villa nodes, positioned at runtime */}
        {NODE_FRACTIONS.map((_, i) => (
          <g className="map-node-g" key={i} data-node={i}>
            <circle className="map-node" r="13" />
            <text className="map-node-num" dy="4">{i + 1}</text>
          </g>
        ))}
        {/* travelling marker */}
        <g className="map-marker" data-marker="1">
          <circle className="map-marker-pulse" r="12" />
          <circle className="map-marker-ring" r="12" />
          <circle className="map-marker-dot" r="4" />
        </g>
      </svg>
      <div className="nv-map-caption" aria-hidden="true">
        <span>Gate → Beach</span>
        <span>Nine villas · one shoreline</span>
      </div>
    </div>
  );
}

function EnquiryForm() {
  const { productName, price } = useCustom();
  const f = content.enquire.fields;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState('2');
  const [villa, setVilla] = useState('-1');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  const nights = useMemo(() => {
    if (!arrival || !departure) return 0;
    const a = new Date(arrival);
    const d = new Date(departure);
    const n = Math.round((d - a) / 86400000);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [arrival, departure]);

  const villaRate = villa === '-1' ? 0 : content.villas[Number(villa)].rate;
  const estimate = nights > 0 && villaRate > 0 ? nights * villaRate : null;

  if (sent) {
    return (
      <div className="nv-enq-form" role="status">
        <div className="nv-sent">
          <span className="nv-sent-mark" aria-hidden="true">—</span>
          <h3>{f.sentTitle}</h3>
          <p>{f.sentBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="nv-enq-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="nv-field">
        <label htmlFor="nv-name">{f.name}</label>
        <input id="nv-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </div>
      <div className="nv-field">
        <label htmlFor="nv-email">{f.email}</label>
        <input id="nv-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>
      <div className="nv-field-row">
        <div className="nv-field">
          <label htmlFor="nv-arrival">{f.arrival}</label>
          <input id="nv-arrival" type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} />
        </div>
        <div className="nv-field">
          <label htmlFor="nv-departure">{f.departure}</label>
          <input id="nv-departure" type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} />
        </div>
      </div>
      <div className="nv-field-row">
        <div className="nv-field">
          <label htmlFor="nv-guests">{f.guests}</label>
          <select id="nv-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="nv-field">
          <label htmlFor="nv-villa">{f.villa}</label>
          <select id="nv-villa" value={villa} onChange={(e) => setVilla(e.target.value)}>
            <option value="-1">{f.anyVilla}</option>
            {content.villas.map((v, i) => (
              <option key={v.name} value={i}>{productName(i, v.name)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="nv-estimate" aria-live="polite">
        <span className="nv-est-label">
          {f.estimateLabel}
          <small>{f.estimateNote}</small>
        </span>
        <span className="nv-est-value">
          {estimate ? price(estimate) : '—'}
          {estimate && nights > 0 && <small>{nights} {f.nights}</small>}
        </span>
      </div>
      <div className="nv-field">
        <label htmlFor="nv-notes">{f.notes}</label>
        <textarea id="nv-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <button className="nv-cta" type="submit">{f.submit}</button>
    </form>
  );
}

export default function Design09Villas() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;

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
      const root = rootRef.current;
      if (!root) return;

      /* ---- map node + marker layout (all modes; layout, not motion) ---- */
      const path = root.querySelector('.map-journey');
      const marker = root.querySelector('[data-marker]');
      const nodeGs = gsap.utils.toArray('.map-node-g', root);
      const L = path ? path.getTotalLength() : 0;
      const placeAt = (el, t) => {
        if (!path || !el || !L) return;
        const pt = path.getPointAtLength(Math.max(0, Math.min(1, t)) * L);
        el.setAttribute('transform', `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})`);
      };
      nodeGs.forEach((g, i) => placeAt(g, NODE_FRACTIONS[i]));
      if (path) {
        gsap.set(path, { strokeDasharray: L, strokeDashoffset: reduced ? 0 : L });
      }
      if (marker) placeAt(marker, reduced ? NODE_FRACTIONS[NODE_FRACTIONS.length - 1] : 0);

      const staticMode = reduced || (window.matchMedia && window.matchMedia('(max-width: 767px)').matches);
      const mapSec = root.querySelector('.nv-map-sec');
      if (staticMode && mapSec) mapSec.classList.add('nv-map-static');
      if (staticMode && path) gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
      if (staticMode && marker) marker.style.display = 'none';

      if (reduced) return;

      /* ---- hero entrance: slow aerial settle 1.06 → 1 over 3s ---- */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.nv-hero .sf-canvas', { scale: 1.06 }, { scale: 1, duration: 3, ease: 'power2.out' }, 0)
        .fromTo('.nv-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 }, 0.3)
        .fromTo('.nv-hero-copy .nv-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.15)
        .fromTo('.nv-hero-sub, .nv-hero-actions', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 }, 0.9);

      /* nav veil — keyed to the scroll position itself, so it also stays on
         at the very bottom (a toggleClass trigger switches off at 'max'). */
      const navEl = root.querySelector('.nv-nav');
      const setNav = (self) => navEl && navEl.classList.toggle('is-scrolled', self.scroll() > 60);
      ScrollTrigger.create({ scroller: sc, start: 0, end: 'max', onUpdate: setNav, onRefresh: setNav });

      /* light-arrival reveals */
      gsap.utils.toArray('.nv-rv', root).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.nv-stagger', root).forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      /* brass rules draw */
      gsap.utils.toArray('.nv-rule', root).forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* ---- signature flow §3.09: estate map journey (desktop pin) ---- */
      const pin = root.querySelector('.nv-map-pin');
      if (pin && path && !staticMode) {
        const cards = gsap.utils.toArray('.nv-map-card', root);
        const nodes = gsap.utils.toArray('.map-node', root);
        const list = root.querySelector('.nv-map-cards');
        const view = root.querySelector('.nv-map-cardsview');
        const first = NODE_FRACTIONS[0];
        const last = NODE_FRACTIONS[NODE_FRACTIONS.length - 1];
        /* Writes only while scrolling: the list overflow is measured on
           refresh (no layout read per frame) and the active classes change
           only when the active villa does. */
        let overflow = 0;
        let lastActive = -1;
        const measure = () => {
          overflow = list && view ? Math.max(0, list.scrollHeight - view.clientHeight) : 0;
        };
        const setJourney = (p) => {
          gsap.set(path, { strokeDashoffset: L * (1 - p) });
          const pt = path.getPointAtLength(p * L);
          gsap.set(marker, { x: pt.x, y: pt.y });
          let active = 0;
          NODE_FRACTIONS.forEach((fr, i) => {
            if (p >= fr - 0.02) active = i;
          });
          if (active !== lastActive) {
            lastActive = active;
            cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
            nodes.forEach((n, i) => n.classList.toggle('is-active', i === active));
          }
          /* the villa list glides with the journey so the highlighted
             villa is always inside the pinned view */
          if (list) {
            const t = Math.min(1, Math.max(0, (p - first) / (last - first)));
            gsap.set(list, { y: -overflow * t });
          }
        };
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          /* pinned stage = the visible scroll area (CSS .is-pinned) */
          pin.classList.add('is-pinned');
          measure();
          setJourney(0);
          ScrollTrigger.create({
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=2600',
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => setJourney(self.progress),
            onRefresh: (self) => {
              measure();
              setJourney(self.progress);
            },
          });
          return () => {
            pin.classList.remove('is-pinned');
            if (list) gsap.set(list, { clearProps: 'transform' });
          };
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-09-villas">
      {/* Zero-height sticky shell: the nav overlays the hero and stays
          inside the scroll area. */}
      <div className="nv-navshell">
        <header className="nv-nav">
          <a className="nv-wordmark" href="#hero"><Wordmark name={name} /></a>
          <nav className="nv-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="nv-cta" href="#enquire">Enquire</a>
        </header>
      </div>

      <main>
        {/* HERO */}
        <section id="hero" className="nv-hero" data-tour="Arrive">
          <ScrollFrames
            frames={frames}
            alt={`Aerial drift over the ${name} estate at sunset — private pools glinting as the light drops`}
            pinDistance="+=170%"
          >
            <div className="nv-hero-shade" aria-hidden="true" />
            <div className="nv-hero-copy">
              <p className="nv-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="nv-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="nv-hero-sub">{content.hero.sub}</p>
              <div className="nv-hero-actions">
                <a className="nv-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="nv-cta nv-cta-ghost" href={content.hero.secondaryHref}>{content.hero.secondary}</a>
              </div>
            </div>
            <span className="nv-scroll-cue" aria-hidden="true">Descend</span>
          </ScrollFrames>
        </section>

        {/* THE COLLECTION — estate map journey */}
        <section id="collection" className="nv-map-sec" data-tour="The Collection">
          <div className="nv-map-head">
            <p className="nv-eyebrow nv-rv">The collection</p>
            <h2 className="nv-h2 nv-rv">Nine villas, <em>one shoreline</em></h2>
            <span className="nv-rule" aria-hidden="true" />
            <p className="nv-body nv-rv">
              Follow the path from the estate gates to the beach. Each number is a villa —
              its own house, pool, and staff — held within a single private estate.
            </p>
          </div>
          <div className="nv-map-pin">
            <div className="nv-map-stage">
              <EstateMap name={name} />
              <div className="nv-map-cardsview">
                <div className="nv-map-cards" aria-label="The nine villas in map order">
                  {content.villas.map((v, i) => (
                    <article className="nv-map-card" key={v.name}>
                      <span className="nv-card-num" aria-hidden="true">{i + 1}</span>
                      <h3>{productName(i, v.name)}</h3>
                      <p>{v.note}</p>
                      <span className="nv-card-meta">Sleeps {v.sleeps}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE VILLAS */}
        <section id="villas" className="nv-sig-sec" data-tour="Signature Villas">
          <div className="nv-wrap">
            <p className="nv-eyebrow nv-rv">Signature villas</p>
            <h2 className="nv-h2 nv-rv">Three houses <em>worth the journey</em></h2>
            <span className="nv-rule" aria-hidden="true" />
            <p className="nv-body nv-rv">
              The estate’s most-requested residences, each with its own architecture of
              privacy — and its own reason guests return.
            </p>
          </div>
          {content.signatures.map((s) => {
            const v = content.villas[s.index];
            return (
              <article className="nv-sig" key={s.index}>
                <div className="nv-sig-visual nv-rv">
                  <Img k={s.imgKey} src={img(s.imgKey, roomFallbacks[s.imgKey])} alt={roomAlts[s.imgKey]} />
                </div>
                <div className="nv-sig-text">
                  <p className="nv-sig-num nv-rv">{s.eyebrow}</p>
                  <h3 className="nv-rv">{productName(s.index, v.name)}</h3>
                  <div className="nv-sig-specs nv-rv">
                    <span>{s.rooms}</span>
                    <span>{s.pool}</span>
                  </div>
                  <p className="nv-body nv-rv">{s.detail}</p>
                  <ul className="nv-sig-amenities nv-stagger">
                    {s.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <p className="nv-sig-price nv-rv">
                    <strong>{price(v.rate)}</strong> from / night
                  </p>
                </div>
              </article>
            );
          })}

          {/* discreet comparison */}
          <div className="nv-wrap">
            <p className="nv-eyebrow nv-rv" style={{ marginTop: '2rem' }}>{content.compare.eyebrow}</p>
            <h2 className="nv-h2 nv-rv">{content.compare.title}</h2>
            <span className="nv-rule" aria-hidden="true" />
            <table className="nv-compare nv-rv">
              <thead>
                <tr>
                  <th scope="col"><span className="nv-sr">Detail</span></th>
                  {content.signatures.map((s) => (
                    <th scope="col" key={s.index}>{productName(s.index, content.villas[s.index].name)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.compare.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.values.map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">From rate</th>
                  {content.signatures.map((s) => (
                    <td className="nv-compare-rate" key={s.index}>{price(content.villas[s.index].rate)} / night</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PRIVATE STAFF */}
        <section id="staff" data-tour="Private Staff">
          <div className="nv-wrap">
            <p className="nv-eyebrow nv-rv">{content.staff.eyebrow}</p>
            <h2 className="nv-h2 nv-rv">{content.staff.title}</h2>
            <span className="nv-rule" aria-hidden="true" />
            <p className="nv-body nv-rv">{content.staff.intro}</p>
            <div className="nv-staff-grid nv-stagger">
              {content.staff.members.map((m, i) => (
                <div className="nv-staff-card" key={m.role}>
                  <span className="nv-staff-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{m.role}</h3>
                  <p>{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OCCASIONS */}
        <section id="occasions" className="nv-occ-sec" data-tour="Occasions">
          <div className="nv-wrap">
            <p className="nv-eyebrow nv-rv">{content.occasions.eyebrow}</p>
            <h2 className="nv-h2 nv-rv">{content.occasions.title}</h2>
            <span className="nv-rule" aria-hidden="true" />
            <p className="nv-body nv-rv">{content.occasions.intro}</p>
            <div className="nv-occ-banner nv-rv">
              <Img k="detail" src={img('detail', detailImg)} alt="Sunset deck at Villa Tide with steps down to the private beach, palms against the evening sky" />
            </div>
            <div className="nv-occ-grid nv-stagger">
              {content.occasions.cards.map((c) => (
                <div className="nv-occ-card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.detail}</p>
                  <a className="nv-text-link" href="#enquire">Discuss {c.title.toLowerCase()}</a>
                </div>
              ))}
            </div>
            <p className="nv-occ-note nv-rv">{content.occasions.note}</p>
          </div>
        </section>

        {/* ENQUIRE */}
        <section id="enquire" data-tour="Enquire">
          <div className="nv-wrap">
            <div className="nv-enq-grid">
              <div className="nv-enq-side">
                <p className="nv-eyebrow nv-rv">{content.enquire.eyebrow}</p>
                <h2 className="nv-h2 nv-rv">{content.enquire.title}</h2>
                <span className="nv-rule" aria-hidden="true" />
                <p className="nv-body nv-rv">{content.enquire.intro}</p>
                <div className="nv-contact-line nv-rv">
                  <a href={`mailto:${email}`}>{email}</a><br />
                  <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a><br />
                  <a href={mapsUrl} target="_blank" rel="noreferrer">{content.visit.address}</a>
                </div>
              </div>
              <div className="nv-rv">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="nv-footer">
        <div className="nv-wrap">
          <div className="nv-footer-top">
            <p className="nv-footer-word"><Wordmark name={name} /></p>
            <nav className="nv-footer-links" aria-label="Footer">
              {content.nav.map((n) => (
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
              <a href="#enquire">Enquire</a>
            </nav>
          </div>
          <div className="nv-footer-base">
            <p>{content.footer.line}</p>
            <p>{content.footer.colophon}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
