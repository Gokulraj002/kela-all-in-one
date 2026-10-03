import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72 extracted JPG frames scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-lodge';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ld-wm ${className}`} aria-label={text}>
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

function toISO(d) {
  return d.toISOString().slice(0, 10);
}

function BookingBar({ season }) {
  const { price, productName } = useCustom();
  const seasonInfo = content.seasons[season];
  const [checkin, setCheckin] = useState(() => toISO(new Date(Date.now() + 7 * 86400000)));
  const [checkout, setCheckout] = useState(() => toISO(new Date(Date.now() + 10 * 86400000)));
  const [guests, setGuests] = useState('2');
  const [roomIdx, setRoomIdx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  const nights = Math.max(0, Math.round((new Date(checkout) - new Date(checkin)) / 86400000));
  const room = content.rooms[roomIdx];
  const perNight = Math.round(room.price * seasonInfo.multiplier);
  const total = nights * perNight;
  const valid = nights > 0;

  const submit = (e) => {
    e.preventDefault();
    if (valid) setConfirmed(true);
  };

  return (
    <div className="ld-booking-card ld-rv">
      <form className="ld-booking-form" onSubmit={submit}>
        <label className="ld-field">
          <span>{content.booking.checkinLabel}</span>
          <input type="date" value={checkin} onChange={(e) => { setCheckin(e.target.value); setConfirmed(false); }} />
        </label>
        <label className="ld-field">
          <span>{content.booking.checkoutLabel}</span>
          <input type="date" value={checkout} onChange={(e) => { setCheckout(e.target.value); setConfirmed(false); }} />
        </label>
        <label className="ld-field">
          <span>{content.booking.roomsLabel}</span>
          <select value={roomIdx} onChange={(e) => { setRoomIdx(Number(e.target.value)); setConfirmed(false); }}>
            {content.rooms.map((r, i) => (
              <option key={r.name} value={i}>{productName(i, r.name)}</option>
            ))}
          </select>
        </label>
        <label className="ld-field">
          <span>{content.booking.guestsLabel}</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            {['1', '2', '3', '4', '5', '6'].map((g) => (
              <option key={g} value={g}>{g} {Number(g) === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </label>
        <button className="ld-cta" type="submit">{content.booking.cta}</button>
      </form>
      <div className="ld-booking-summary" aria-live="polite">
        {valid ? (
          <>
            <p className="ld-booking-line">
              <strong>{nights} {nights === 1 ? 'night' : content.booking.nightsLabel}</strong>
              <span> · {productName(roomIdx, room.name)} · {guests} {Number(guests) === 1 ? 'guest' : 'guests'}</span>
            </p>
            <p className="ld-booking-rates">
              {price(perNight)} <span>{content.booking.perNight} ({seasonInfo.rateNote})</span>
            </p>
            <p className="ld-booking-total">{content.booking.total}: <strong>{price(total)}</strong></p>
            {confirmed && <p className="ld-booking-ok">{content.booking.confirmed}</p>}
          </>
        ) : (
          <p className="ld-booking-line">Pick a check-out date after your check-in to see your total.</p>
        )}
      </div>
    </div>
  );
}

function SeasonSwitcher({ season, setSeason }) {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const active = content.seasons[season];

  const select = (s) => {
    if (s === season) return;
    setSeason(s);
    if (!reduced && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <div className="ld-season ld-rv">
      <div className="ld-season-tabs" role="tablist" aria-label="Season">
        {Object.entries(content.seasons).map(([key, s]) => (
          <button
            key={key}
            role="tab"
            aria-selected={season === key}
            className={`ld-season-tab${season === key ? ' is-active' : ''}`}
            onClick={() => select(key)}
          >
            <span className="ld-season-name">{s.label}</span>
            <span className="ld-season-months">{s.months}</span>
          </button>
        ))}
      </div>
      <div ref={panelRef} className="ld-season-panel" role="tabpanel">
        <h3 className="ld-h3">{active.headline}</h3>
        {active.body.map((p, i) => (
          <p className="ld-body" key={i}>{p}</p>
        ))}
        <ul className="ld-season-notes">
          {active.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RoomCard({ room, index, imgSrc, season }) {
  const { productName, price, img } = useCustom();
  const mult = content.seasons[season] ? content.seasons[season].multiplier : 1;
  const seasonal = Math.round(room.price * mult);
  return (
    <article className="ld-room-card" data-room={index}>
      <div className="ld-room-inner">
      <div className="ld-room-visual">
        <Img k={room.imgKey} src={img(room.imgKey, imgSrc)} alt={room.alt} />
      </div>
      <div className="ld-room-body">
        <p className="ld-room-meta">{room.size} · {room.sleeps}</p>
        <h3 className="ld-room-name">{productName(index, room.name)}</h3>
        <p className="ld-room-desc">{room.desc}</p>
        <p className="ld-room-price">
          {price(seasonal)} <span>{content.booking.perNight}{mult > 1 ? ` · ${content.seasons[season].rateNote.toLowerCase()}` : ''}</span>
        </p>
        <a className="ld-room-cta" href="#booking">Check availability</a>
      </div>
      </div>
    </article>
  );
}

const roomImgs = [room1Img, room2Img, room3Img];

export default function Design04Lodge() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [season, setSeason] = useState('winter');
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

  /* Fraunces + Manrope, injected once with a unique id. */
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

      /* Hero: canvas glow-in (opacity, 2s) as frame 0 paints, then masked
         word-rise headline and the fireside note. */
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo('.ld-hero .sf-canvas', { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
        .fromTo('.ld-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.09 }, 0.35)
        .fromTo('.ld-hero-sub, .ld-hero-cta', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.14 }, 0.9)
        .fromTo('.ld-hero-note', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2 }, 1.35);

      /* Warm unhurried reveals — 1.2s power2.out, per MOTION.md §4 lodge. */
      gsap.utils.toArray('.ld-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.ld-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Ember hairline rules draw between sections. */
      gsap.utils.toArray('.ld-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* SIGNATURE — §3.04 "Hearth fan". Room cards start stacked like
         firewood (rotated ±8°, overlapping); a scrubbed timeline fans them
         into an arc (rotation → 0, x spread, y settle) as the section
         scrolls through. Scrub 1, no pin. Desktop only; reduced-motion
         renders the fanned final state (pure CSS, below). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const cards = gsap.utils.toArray('.ld-room-card');
        const wide = window.matchMedia('(min-width: 1200px)').matches;
        const spread = wide ? 400 : 310;
        /* Stacked-like-firewood offsets (x, y, rotation) → fanned arc. */
        const stack = [
          { x: -22, y: 30, r: -8 },
          { x: 16, y: 6, r: 7 },
          { x: -10, y: -22, r: -5 },
        ];
        const fan = [
          { x: -spread, y: 0, r: 0 },
          { x: 0, y: 0, r: 0 },
          { x: spread, y: 0, r: 0 },
        ];
        const fanTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.ld-rooms-stage',
            scroller: sc,
            start: 'top 90%',
            end: 'top 25%',
            scrub: 1,
          },
        });
        cards.forEach((card, i) => {
          fanTl.fromTo(
            card,
            { x: stack[i].x, y: stack[i].y, rotation: stack[i].r },
            { x: fan[i].x, y: fan[i].y, rotation: fan[i].r, ease: 'none' },
            0
          );
        });
        return () => {};
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-04-lodge">
      <header className="ld-nav">
        <a className="ld-wordmark" href="#hero">{name}</a>
        <nav className="ld-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="ld-cta" href="#booking">{content.hero.cta}</a>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (ScrollFrames, pinned) */}
        <section id="hero" className="ld-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Stone fireplace flames rising, embers pulsing as snow falls past the window behind"
            pinDistance="+=170%"
          >
            <div className="ld-hero-shade" aria-hidden="true" />
            <div className="ld-hero-copy">
              <p className="ld-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="ld-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="ld-hero-sub">{content.hero.sub}</p>
              <a className="ld-cta ld-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <p className="ld-hero-note">{content.hero.note}</p>
            </div>
          </ScrollFrames>
        </section>

        {/* BOOKING BAR */}
        <section id="booking" className="ld-booking" data-tour="Check Availability">
          <div className="ld-wrap">
            <p className="ld-eyebrow ld-rv">{content.booking.eyebrow}</p>
            <h2 className="ld-h2 ld-rv">{content.booking.title}</h2>
            <span className="ld-rule" aria-hidden="true" />
            <BookingBar season={season} />
            <p className="ld-booking-hint ld-rv">{content.booking.seasonalNote} Use the winter / summer switcher below to feel the difference.</p>
          </div>
        </section>

        {/* FIRESIDE SEASONAL NOTE */}
        <section id="fireside" className="ld-fireside" data-tour="Fireside Note">
          <div className="ld-wrap">
            <p className="ld-eyebrow ld-rv">A note from the fireside</p>
            <h2 className="ld-h2 ld-rv">Two mountains, one lodge.</h2>
            <span className="ld-rule" aria-hidden="true" />
            <SeasonSwitcher season={season} setSeason={setSeason} />
          </div>
        </section>

        {/* ROOMS — hearth fan */}
        <section id="rooms" className="ld-rooms" data-tour="Rooms">
          <div className="ld-wrap">
            <p className="ld-eyebrow ld-rv">Stay</p>
            <h2 className="ld-h2 ld-rv">Rooms of timber &amp; wool.</h2>
            <span className="ld-rule" aria-hidden="true" />
            <p className="ld-body ld-rooms-lede ld-rv">Scroll — the woodpile fans out.</p>
          </div>
          <div className="ld-rooms-stage" aria-label="Our rooms">
            {content.rooms.map((room, i) => (
              <RoomCard key={room.name} room={room} index={i} imgSrc={roomImgs[i]} season={season} />
            ))}
          </div>
        </section>

        {/* MOUNTAIN DAYS */}
        <section id="days" className="ld-days" data-tour="Mountain Days">
          <div className="ld-wrap">
            <p className="ld-eyebrow ld-rv">{content.days.eyebrow}</p>
            <h2 className="ld-h2 ld-rv">{content.days.title}</h2>
            <span className="ld-rule" aria-hidden="true" />
            <div className="ld-days-grid ld-stagger">
              {content.days.items.map((d) => (
                <article className="ld-day-card" key={d.title}>
                  <div className="ld-day-visual">
                    <Img k={d.imgKey} src={img(d.imgKey, d.imgKey === 'hero' ? heroImg : d.imgKey === 'detail' ? detailImg : room3Img)} alt={d.alt} />
                  </div>
                  <h3 className="ld-h3">{d.title}</h3>
                  <p className="ld-body">{d.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MOUNTAIN KITCHEN */}
        <section id="kitchen" className="ld-kitchen" data-tour="Mountain Kitchen">
          <div className="ld-wrap ld-kitchen-grid">
            <div className="ld-kitchen-text">
              <p className="ld-eyebrow ld-rv">{content.kitchen.eyebrow}</p>
              <h2 className="ld-h2 ld-rv">{content.kitchen.title}</h2>
              <span className="ld-rule" aria-hidden="true" />
              {content.kitchen.body.map((p, i) => (
                <p className="ld-body ld-rv" key={i}>{p}</p>
              ))}
              <ul className="ld-kitchen-notes ld-stagger">
                {content.kitchen.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
            <figure className="ld-kitchen-img ld-rv">
              <Img k="detail" src={img('detail', detailImg)} alt={content.kitchen.alt} />
            </figure>
          </div>
        </section>

        {/* GETTING THERE */}
        <section id="visit" className="ld-visit" data-tour="Getting There">
          <div className="ld-wrap">
            <p className="ld-eyebrow ld-rv">{content.visit.eyebrow}</p>
            <h2 className="ld-h2 ld-rv">{content.visit.title}</h2>
            <span className="ld-rule" aria-hidden="true" />
            <p className="ld-body ld-rv">{content.visit.body}</p>
            <ol className="ld-steps ld-stagger">
              {content.visit.steps.map((s) => (
                <li key={s.label}>
                  <strong>{s.label}</strong>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
            <div className="ld-visit-grid">
              <address className="ld-address ld-rv">
                {content.visit.address}<br />
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a><br />
                <a href={`mailto:${email}`}>{email}</a><br />
                <span className="ld-checkin">{content.visit.checkin}</span>
              </address>
              <a className="ld-cta ld-rv" href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="ld-footer">
        <p className="ld-wordmark ld-footer-mark">{name}</p>
        <p className="ld-footer-line">{content.footer.line}</p>
        <p className="ld-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
