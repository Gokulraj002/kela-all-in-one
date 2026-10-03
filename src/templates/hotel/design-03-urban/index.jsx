import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import room1Img from './assets/room-1.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

/* Hero film: scroll-scrubbed frame sequence (replaces the autoplay mp4). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

const FONT_ID = 'tpl-font-design-03-urban';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap';

const IMAGE_DEFAULTS = {
  hero: heroImg,
  'product-0': room1Img,
  'product-2': room3Img,
  detail: detailImg,
};

const ROOM_ALTS = {
  a: 'Design-led hotel bedroom with board-formed concrete walls, brass wall lights and a black steel bed, dusk light',
  b: 'Hotel bedroom corner with concrete wall and brass reading light, crisp high-contrast detail',
  c: 'Tall industrial window beside a concrete bedroom wall, city dusk beyond the glass',
  d: 'Crisp white bedding and black steel bed frame against a raw concrete wall',
  e: 'Brass wall sconce glowing against board-formed concrete in a boutique hotel room',
};

/* Two-letter monogram from the (customisable) brand name, e.g. "Kela Hotels" → "KH". */
const initials = (n) =>
  String(n || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`gh-wm ${className}`} aria-label={text}>
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

/* Booking widget: dates + guests + room, live night count and per-night math. */
function BookingBar() {
  const { price, productName, brand } = useCustom();
  const mono = initials(brand || content.brand.name) || 'KH';
  const iso = (d) => d.toISOString().slice(0, 10);
  const [ci, setCi] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return iso(d);
  });
  const [co, setCo] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 9);
    return iso(d);
  });
  const [guests, setGuests] = useState('2');
  const [roomIdx, setRoomIdx] = useState(0);
  const [held, setHeld] = useState(null);
  const [checking, setChecking] = useState(false);

  const room = content.rooms.items[roomIdx];
  const diff = Math.round((new Date(co) - new Date(ci)) / 86400000);
  const nights = Number.isFinite(diff) && diff > 0 ? diff : 1;
  const total = nights * room.price;

  const check = () => {
    if (checking) return;
    setChecking(true);
    setHeld(null);
    window.setTimeout(() => {
      setChecking(false);
      setHeld(`${mono}-${String(Math.floor(100000 + Math.random() * 900000))}`);
    }, 600);
  };

  return (
    <section id="booking" className="gh-booking" data-tour="Book Direct">
      <div className="gh-wrap gh-booking-grid">
        <div className="gh-booking-copy">
          <p className="gh-eyebrow gh-eyebrow--light">{content.booking.eyebrow}</p>
          <h2 className="gh-h2 gh-h2--light">{content.booking.title}</h2>
          <p className="gh-body gh-body--light">{content.booking.note}</p>
        </div>
        <div className="gh-booking-panel">
          <div className="gh-field">
            <label htmlFor="gh-ci">Check-in</label>
            <input id="gh-ci" type="date" value={ci} onChange={(e) => setCi(e.target.value)} />
          </div>
          <div className="gh-field">
            <label htmlFor="gh-co">Check-out</label>
            <input id="gh-co" type="date" value={co} onChange={(e) => setCo(e.target.value)} />
          </div>
          <div className="gh-field">
            <label htmlFor="gh-guests">Guests</label>
            <select id="gh-guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
              {['1', '2', '3', '4'].map((g) => (
                <option key={g} value={g}>
                  {g} {g === '1' ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
          <div className="gh-field">
            <label htmlFor="gh-room">Room</label>
            <select id="gh-room" value={roomIdx} onChange={(e) => setRoomIdx(Number(e.target.value))}>
              {content.rooms.items.map((r, i) => (
                <option key={r.name} value={i}>
                  {productName(i, r.name)} — {price(r.price)}
                </option>
              ))}
            </select>
          </div>
          <div className="gh-booking-math" aria-live="polite">
            <span>
              {price(room.price)} / night × {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
            <strong>{price(total)}</strong>
          </div>
          <button type="button" className="gh-btn gh-btn--accent" onClick={check} disabled={checking}>
            {checking ? 'Checking…' : held ? 'Held — reserve now' : 'Check availability'}
          </button>
          {held && (
            <p className="gh-held">
              Held for 15 minutes — ref <strong>{held}</strong>. Demo checkout; no payment taken.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function RoomCard({ room, index }) {
  const { img, productName, price } = useCustom();
  const num = String(index + 1).padStart(2, '0');
  return (
    <article className="gh-room" aria-label={`${productName(index, room.name)} — ${price(room.price)} per night`}>
      <div className="gh-room-visual">
        <Img
          k={room.imgKey}
          src={img(room.imgKey, IMAGE_DEFAULTS[room.imgKey] || room1Img)}
          alt={ROOM_ALTS[room.crop] || `Room photograph for ${productName(index, room.name)}`}
          className={`crop-${room.crop}`}
        />
        {room.tag && <span className="gh-room-tag">{room.tag}</span>}
        <span className="gh-room-num" aria-hidden="true">{num}</span>
      </div>
      <div className="gh-room-body">
        <div className="gh-room-head">
          <h3 className="gh-room-name">{productName(index, room.name)}</h3>
          <p className="gh-room-size">{room.size}</p>
        </div>
        <p className="gh-room-desc">{room.desc}</p>
        <div className="gh-room-foot">
          <p className="gh-room-price">
            {price(room.price)}
            <span> / night</span>
          </p>
          <a className="gh-room-book" href="#booking">
            Book
          </a>
        </div>
      </div>
    </article>
  );
}

function DrinkList() {
  const { price } = useCustom();
  return (
    <ul className="gh-drinks gh-stagger">
      {content.rooftop.drinks.map((d) => (
        <li key={d.name} className="gh-drink">
          <div>
            <h4>{d.name}</h4>
            <p>{d.note}</p>
          </div>
          <span className="gh-drink-price">{price(d.price)}</span>
        </li>
      ))}
    </ul>
  );
}

function SpaceList() {
  const { price } = useCustom();
  return (
    <ul className="gh-spaces gh-stagger">
      {content.work.spaces.map((s) => (
        <li key={s.name} className="gh-space">
          <div className="gh-space-head">
            <h3>{s.name}</h3>
            <span className="gh-space-spec">{s.spec}</span>
          </div>
          <p>{s.desc}</p>
          <p className="gh-space-price">{s.price === 0 ? s.unit : `${price(s.price)} ${s.unit}`}</p>
        </li>
      ))}
    </ul>
  );
}

function NeighborhoodTabs() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState(0);
  const panelRef = useRef(null);
  const active = content.neighborhood.tabs[tab];

  const select = (i) => {
    if (i === tab) return;
    setTab(i);
    if (!reduced && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  return (
    <div className="gh-tabs">
      <div className="gh-tabrow" role="tablist" aria-label="Neighborhood categories">
        {content.neighborhood.tabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === i}
            className={`gh-tab${tab === i ? ' is-active' : ''}`}
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div ref={panelRef} className="gh-tabpanel" role="tabpanel">
        {active.spots.map((s) => (
          <div className="gh-spot" key={s.name}>
            <div>
              <h4 className="gh-spot-name">{s.name}</h4>
              <p className="gh-spot-note">{s.note}</p>
            </div>
            <span className="gh-spot-walk">{s.walk}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Design03Urban() {
  const { brand, img, contact } = useCustom();
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
      if (reduced) return;

      /* Hero: headline slams in — word-rise, stagger 0.04, power4.out, 0.7s. */
      gsap.fromTo(
        '.gh-hero-title .wi',
        { yPercent: 115 },
        { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.04, delay: 0.15 }
      );
      gsap.fromTo(
        '.gh-hero-eyebrow, .gh-hero-sub, .gh-hero-cta, .gh-hero-stats',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.55 }
      );

      /* Nav hardens once the hero scrolls away. */
      ScrollTrigger.create({
        trigger: '.gh-hero',
        scroller: sc,
        start: 'bottom 72px',
        /* stay hardened for the rest of the page (the default end,
           'bottom top', left only a 72px window where the class applied) */
        end: 'max',
        toggleClass: { targets: '.gh-nav', className: 'is-scrolled' },
      });

      /* Fast reveals — urban is the fast design: 0.6s everywhere. */
      gsap.utils.toArray('.gh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });
      gsap.utils.toArray('.gh-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hairline rules snap in. */
      gsap.utils.toArray('.gh-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Signature §3.03 — spotlight grid. As the grid travels through the
         viewport, scrubbed scroll moves the spotlight from room to room:
         active room scale 1→1.02, the rest dim to 0.55 opacity + 0.6
         saturation, mono index label tracks "0X / 06". Hover overrides to
         full via CSS; reduced-motion keeps every card full. */
      const cards = gsap.utils.toArray('.gh-room', rootRef.current);
      const readout = rootRef.current && rootRef.current.querySelector('.gh-spot-num');
      if (cards.length === 6) {
        ScrollTrigger.create({
          trigger: '.gh-rooms-grid',
          scroller: sc,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.4,
          onUpdate: (self) => {
            const idx = Math.min(5, Math.floor(self.progress * 6));
            cards.forEach((c, i) => {
              c.classList.toggle('is-spot', i === idx);
              c.classList.toggle('is-dim', i !== idx);
            });
            if (readout) readout.textContent = `${String(idx + 1).padStart(2, '0')} / 06`;
          },
          onLeaveBack: () => {
            cards.forEach((c) => c.classList.remove('is-spot', 'is-dim'));
            if (readout) readout.textContent = '01 / 06';
          },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.facts[2].value)}`;

  return (
    <div ref={rootRef} className="tpl-design-03-urban">
      {/* NAV — sharp top bar, mono labels, sticky Book pill. Zero-height
          sticky shell: overlays the hero, stays inside the scroll area. */}
      <div className="gh-navshell">
        <header className="gh-nav">
          <a className="gh-wordmark" href="#hero">
            <span className="gh-wordmark-box" aria-hidden="true">
              {initials(name)}
            </span>
            {name}
          </a>
          <nav className="gh-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="gh-book-pill" href="#booking">
            Book
          </a>
        </header>
      </div>

      <main>
        {/* HERO — scroll-scrubbed film; overlay (eyebrow/headline/CTA/shade) kept as-is */}
        <section id="hero" className="gh-hero" data-tour="The House">
          <ScrollFrames
            frames={frames}
            alt="Rooftop terrace at dusk, city lights flickering on across the skyline"
            pinDistance="+=170%"
          >
            <span className="gh-hero-shade" aria-hidden="true" />
            <div className="gh-hero-copy">
            <p className="gh-eyebrow gh-eyebrow--accent gh-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="gh-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="gh-hero-sub">{content.hero.sub}</p>
            <a className="gh-btn gh-btn--accent gh-hero-cta" href={content.hero.ctaHref}>
              {content.hero.cta}
            </a>
            <dl className="gh-hero-stats">
              {content.hero.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            </div>
          </ScrollFrames>
        </section>

        <BookingBar />

        {/* ROOMS — signature spotlight grid */}
        <section id="rooms" className="gh-rooms" data-tour="Six Rooms">
          <div className="gh-wrap">
            <div className="gh-sec-head gh-rv">
              <div>
                <p className="gh-eyebrow">{content.rooms.eyebrow}</p>
                <h2 className="gh-h2">{content.rooms.title}</h2>
              </div>
              <p className="gh-spot-index">
                <span className="gh-spot-num" aria-live="polite">
                  01 / 06
                </span>
                <span className="gh-spot-hint">Scroll moves the spotlight</span>
              </p>
            </div>
            <span className="gh-rule" aria-hidden="true" />
            <p className="gh-lede gh-rv">{content.rooms.intro}</p>
            <div className="gh-rooms-grid">
              {content.rooms.items.map((r, i) => (
                <RoomCard key={r.name} room={r} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ROOFTOP — bar/restaurant */}
        <section id="dining" className="gh-rooftop" data-tour="The Rooftop">
          <div className="gh-wrap gh-rooftop-grid">
            <div>
              <p className="gh-eyebrow gh-eyebrow--accent gh-rv">{content.rooftop.eyebrow}</p>
              <h2 className="gh-h2 gh-h2--light gh-rv">{content.rooftop.title}</h2>
              <span className="gh-rule gh-rule--light" aria-hidden="true" />
              <p className="gh-lede gh-lede--light gh-rv">{content.rooftop.intro}</p>
              <p className="gh-hours gh-rv">{content.rooftop.hours}</p>
              <DrinkList />
            </div>
            <figure className="gh-rooftop-fig gh-rv">
              <Img
                k="product-2"
                src={img('product-2', room3Img)}
                alt="Amber cocktail with an orange twist on a rooftop bar ledge, city lights blurred behind"
              />
              <figcaption>Floor 18, blue hour</figcaption>
            </figure>
          </div>
        </section>

        {/* NEIGHBORHOOD — tabbed guide */}
        <section id="experiences" className="gh-hood" data-tour="The Neighborhood">
          <div className="gh-wrap">
            <p className="gh-eyebrow gh-rv">{content.neighborhood.eyebrow}</p>
            <h2 className="gh-h2 gh-rv">{content.neighborhood.title}</h2>
            <span className="gh-rule" aria-hidden="true" />
            <p className="gh-lede gh-rv">{content.neighborhood.intro}</p>
            <div className="gh-rv">
              <NeighborhoodTabs />
            </div>
          </div>
        </section>

        {/* WORK — meeting/study spaces */}
        <section id="work" className="gh-work" data-tour="Work Here">
          <div className="gh-wrap">
            <p className="gh-eyebrow gh-rv">{content.work.eyebrow}</p>
            <h2 className="gh-h2 gh-rv">{content.work.title}</h2>
            <span className="gh-rule" aria-hidden="true" />
            <p className="gh-lede gh-rv">{content.work.intro}</p>
            <div className="gh-work-grid">
              <figure className="gh-work-fig gh-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Black and burnt-orange geometric metal sculpture against a concrete wall in the hotel lobby"
                />
                <figcaption>The lobby, built for lingering</figcaption>
              </figure>
              <SpaceList />
            </div>
          </div>
        </section>

        {/* PRACTICAL */}
        <section id="visit" className="gh-visit" data-tour="Practical">
          <div className="gh-wrap gh-visit-grid">
            <div>
              <p className="gh-eyebrow gh-rv">{content.visit.eyebrow}</p>
              <h2 className="gh-h2 gh-rv">{content.visit.title}</h2>
              <span className="gh-rule" aria-hidden="true" />
              <dl className="gh-facts gh-stagger">
                {content.visit.facts.map((f) => (
                  <div key={f.label} className="gh-fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="gh-contact gh-rv">
              <h3 className="gh-h3">Talk to a human</h3>
              <p>
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
              </p>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p className="gh-insta">{content.visit.instagram}</p>
              <a className="gh-btn gh-btn--ink" href={mapsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="gh-footer">
        <div className="gh-wrap">
          <p className="gh-footer-word">{name}</p>
          <nav className="gh-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a href="#booking">Book</a>
          </nav>
          <p className="gh-footer-line">{content.footer.line}</p>
          <p className="gh-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
