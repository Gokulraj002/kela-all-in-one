import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

/* Static fallbacks for the platform upload keys (custom uploads win). */
const FALLBACKS = {
  hero: heroImg,
  'product-0': room1Img,
  'product-1': room2Img,
  'product-2': room3Img,
  detail: detailImg,
};

/* Scroll-driven hero sequence (§3.02 "First tide"): 72 frames scrubbed by scroll.
   Replaces the old autoplaying video; also cuts ~60% of hero media weight. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-beach';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300&family=Inter:wght@400;500&display=swap';

const toISO = (d) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const plusDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISO(d);
};

/* The platform scroll container (.tpl-scope) when it actually scrolls, else
   the window (standalone export). Resolved from the element itself: a child's
   layout effect runs before the template root's ref is attached, so the
   parent's scroller() would still fall back to window at that moment. */
function scrollerFor(el) {
  try {
    const scope = el && el.closest('.tpl-scope');
    if (scope && scope.scrollHeight > scope.clientHeight + 2) return scope;
  } catch (e) { /* window fallback */ }
  return window;
}

/* Signature flow (§3.02): "Tide-wash dissolve".
   NO pin. A tall section maps vertical scroll to image index; a sticky frame
   holds the slides while scrubbed progress picks the active one. Images
   crossfade with a soft horizontal drift (x 40→0) and blur (6px→0), like tide
   washing in. Reduced-motion: all slides stacked, fully visible. */
function TideGallery({ reduced }) {
  const { img } = useCustom();
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const secRef = useRef(null);
  const slides = content.tide.slides;
  const count = slides.length;

  useLayoutEffect(() => {
    const sec = secRef.current;
    if (!sec || reduced) return undefined;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sec,
        scroller: scrollerFor(sec),
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const i = Math.min(count - 1, Math.max(0, Math.floor(self.progress * count)));
          if (i !== idxRef.current) {
            idxRef.current = i;
            setIdx(i);
          }
        },
      });
    }, sec);
    return () => ctx.revert();
  }, [reduced, count]);

  if (reduced) {
    return (
      <section id="gallery" className="nk-tide-sec" data-tour="The Tide">
        <div className="nk-wrap nk-tide-head">
          <p className="nk-eyebrow">{content.tide.eyebrow}</p>
          <h2 className="nk-h2">{content.tide.title}</h2>
        </div>
        <div className="nk-tide-static">
          {slides.map((s, i) => (
            <figure className="nk-tide-static-fig" key={s.key}>
              <Img k={s.key} src={img(s.key, FALLBACKS[s.key])} alt={s.alt} className="nk-tide-static-img" />
              <figcaption>
                <span className="nk-tide-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{s.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="nk-tide-sec" data-tour="The Tide">
      <div className="nk-wrap nk-tide-head">
        <p className="nk-eyebrow nk-rv">{content.tide.eyebrow}</p>
        <h2 className="nk-h2 nk-rv">{content.tide.title}</h2>
        <p className="nk-hint nk-rv">{content.tide.hint}</p>
      </div>
      <div ref={secRef} className="nk-tide" style={{ height: `${count * 120}vh` }}>
        <div className="nk-tide-sticky">
          {slides.map((s, i) => (
            <figure
              key={s.key}
              className={`nk-tide-slide${i === idx ? ' is-active' : ''}`}
              aria-hidden={i === idx ? undefined : true}
            >
              <Img k={s.key} src={img(s.key, FALLBACKS[s.key])} alt={s.alt} className="nk-tide-img" />
              <figcaption className="nk-tide-cap">
                <span className="nk-tide-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{s.caption}</span>
              </figcaption>
            </figure>
          ))}
          <p className="nk-tide-count" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}

function BookingBar() {
  const { productName, price } = useCustom();
  const [roomIdx, setRoomIdx] = useState(0);
  const [checkIn, setCheckIn] = useState(() => plusDays(7));
  const [checkOut, setCheckOut] = useState(() => plusDays(10));
  const [guests, setGuests] = useState(2);
  const today = useMemo(() => toISO(new Date()), []);

  const nights = Math.max(0, Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86400000));
  const room = content.rooms.items[roomIdx];
  const total = nights * room.price;
  const minOut = useMemo(() => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + 1);
    return toISO(d);
  }, [checkIn]);

  return (
    <section id="booking" className="nk-booking" data-tour="Check Availability">
      <div className="nk-wrap nk-booking-grid">
        <div>
          <p className="nk-eyebrow nk-rv">{content.booking.eyebrow}</p>
          <h2 className="nk-h2 nk-rv">{content.booking.title}</h2>
          <p className="nk-body nk-rv">{content.booking.note}</p>
        </div>
        <form className="nk-book nk-rv" onSubmit={(e) => e.preventDefault()}>
          <div className="nk-book-row">
            <label className="nk-field">
              <span>{content.booking.fields.room}</span>
              <select value={roomIdx} onChange={(e) => setRoomIdx(Number(e.target.value))}>
                {content.rooms.items.map((r, i) => (
                  <option key={r.name} value={i}>{productName(i, r.name)} — {price(r.price)}</option>
                ))}
              </select>
            </label>
            <label className="nk-field">
              <span>{content.booking.fields.guests}</span>
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4].map((g) => (
                  <option key={g} value={g}>{g} {g === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="nk-book-row">
            <label className="nk-field">
              <span>{content.booking.fields.checkIn}</span>
              <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} />
            </label>
            <label className="nk-field">
              <span>{content.booking.fields.checkOut}</span>
              <input type="date" value={checkOut} min={minOut} onChange={(e) => setCheckOut(e.target.value)} />
            </label>
          </div>
          <div className="nk-book-summary" aria-live="polite">
            {nights > 0 ? (
              <>
                <p className="nk-sum-line">
                  {nights} {nights === 1 ? 'night' : 'nights'} × {price(room.price)} <span className="nk-muted">/ night</span>
                </p>
                <p className="nk-muted">Breakfast &amp; taxes included · {guests} {guests === 1 ? 'guest' : 'guests'}</p>
                <p className="nk-total">
                  <span>Total</span>
                  <span>{price(total)}</span>
                </p>
              </>
            ) : (
              <p className="nk-muted">Choose your dates to see the total.</p>
            )}
          </div>
          <button type="submit" className="nk-cta">{content.booking.cta}</button>
        </form>
      </div>
    </section>
  );
}

export default function Design02Beach() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;

  /* Season-aware hero note (key interaction #2): derived from the month. */
  const season = useMemo(() => {
    const m = new Date().getMonth();
    if (m >= 9 || m <= 1) return content.seasons[0];
    if (m >= 2 && m <= 4) return content.seasons[1];
    return content.seasons[2];
  }, []);

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

      /* 02 beach grammar: opacity only, durations ≥ 1.4s, sine.out.
         Hero: one single 1.8s fade. */
      gsap.fromTo('.nk-hero-inner', { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'sine.out' });
      gsap.fromTo('.nk-hero-cue', { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'sine.out', delay: 1.6 });

      gsap.utils.toArray('.nk-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-02-beach">
      <header className="nk-nav">
        <a className="nk-wordmark" href="#hero">{name}</a>
        <nav className="nk-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="nk-avail" href={content.hero.ctaHref}>{content.hero.cta}</a>
      </header>

      <main>
        {/* HERO — pale dawn beach, scroll-driven frame sequence */}
        <section id="hero" className="nk-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Pale dawn beach — a gentle wave washes over wet sand toward the camera, foam dissolving"
            pinDistance="+=170%"
          >
            <span className="nk-hero-veil" aria-hidden="true" />
            <div className="nk-hero-inner">
              <p className="nk-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="nk-hero-title">{content.hero.title}</h1>
              <p className="nk-hero-sub">{content.hero.sub}</p>
              <p className="nk-season">{season.note}</p>
              <a className="nk-cta nk-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <a className="nk-hero-cue" href="#gallery" aria-label="Scroll to the tide">drift down</a>
          </ScrollFrames>
        </section>

        {/* SIGNATURE — tide-wash dissolve */}
        <TideGallery reduced={reduced} />

        {/* THE RETREAT — philosophy of slowness */}
        <section id="story" className="nk-story" data-tour="The Retreat">
          <div className="nk-wrap nk-story-col">
            <p className="nk-eyebrow nk-rv">{content.story.eyebrow}</p>
            <h2 className="nk-h2 nk-rv">{content.story.title}</h2>
            {content.story.body.map((p, i) => (
              <p className="nk-body nk-rv" key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ROOMS — 3 airy room types with rates */}
        <section id="rooms" className="nk-rooms" data-tour="Rooms">
          <div className="nk-wrap">
            <p className="nk-eyebrow nk-rv">{content.rooms.eyebrow}</p>
            <h2 className="nk-h2 nk-rv">{content.rooms.title}</h2>
            <div className="nk-room-grid">
              {content.rooms.items.map((r, i) => (
                <article className="nk-room nk-rv" key={r.name}>
                  <div className="nk-room-visual">
                    <Img k={r.imgKey} src={img(r.imgKey, FALLBACKS[r.imgKey])} alt={r.alt} className="nk-room-img" />
                  </div>
                  <p className="nk-room-num">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="nk-h3">{productName(i, r.name)}</h3>
                  <p className="nk-room-meta">{r.size} · {price(r.price)} / night</p>
                  <p className="nk-body">{r.desc}</p>
                </article>
              ))}
            </div>
            <p className="nk-note nk-rv">{content.rooms.note}</p>
          </div>
        </section>

        {/* SLOW DAYS — experiences */}
        <section id="experiences" className="nk-days" data-tour="Slow Days">
          <div className="nk-wrap">
            <p className="nk-eyebrow nk-rv">{content.experiences.eyebrow}</p>
            <h2 className="nk-h2 nk-rv">{content.experiences.title}</h2>
            <ul className="nk-day-list">
              {content.experiences.items.map((d) => (
                <li className="nk-day nk-rv" key={d.name}>
                  <span className="nk-day-time">{d.time}</span>
                  <div>
                    <h3 className="nk-h3">{d.name}</h3>
                    <p className="nk-body">{d.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUIET BOOKING BAR */}
        <BookingBar />

        {/* PRACTICAL — seasons, getting there */}
        <section id="visit" className="nk-visit" data-tour="Visit">
          <div className="nk-wrap">
            <p className="nk-eyebrow nk-rv">{content.visit.eyebrow}</p>
            <h2 className="nk-h2 nk-rv">{content.visit.title}</h2>
            <div className="nk-visit-grid">
              <div>
                <h3 className="nk-h3 nk-rv">Seasons</h3>
                <ul className="nk-season-list">
                  {content.visit.seasons.map((s) => (
                    <li className="nk-rv" key={s.name}>
                      <p className="nk-season-name">{s.name} <span className="nk-muted">· {s.when}</span></p>
                      <p className="nk-body">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="nk-h3 nk-rv">{content.visit.gettingThere.title}</h3>
                <p className="nk-body nk-rv">{content.visit.gettingThere.body}</p>
                <dl className="nk-house nk-rv">
                  {content.visit.house.map((h) => (
                    <div className="nk-house-row" key={h.k}>
                      <dt>{h.k}</dt>
                      <dd>{h.k === 'Write to us' ? <a href={`mailto:${email}`}>{email}</a> : h.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="nk-body nk-rv">
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  <span className="nk-muted"> · </span>
                  <a href={`https://instagram.com/${content.contact.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">{content.contact.instagram}</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="nk-footer">
        <div className="nk-wrap nk-footer-in">
          <p className="nk-wordmark">{name}</p>
          <p className="nk-footer-line">{content.footer.line}</p>
          <p className="nk-colophon">{content.footer.colophon} — {content.brand.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
