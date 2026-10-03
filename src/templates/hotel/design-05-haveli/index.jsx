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

gsap.registerPlugin(ScrollTrigger);

/* Scroll-driven frame sequence replacing the signature hero loop.
   Sorted keys give playback order (frame-001 … frame-072). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

const FONT_ID = 'tpl-font-design-05-haveli';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Rozha+One&family=Mada:wght@400;500;600;700&display=swap';

const ROOM_ASSETS = { 'product-0': room1Img, 'product-1': room2Img, 'product-2': room3Img };
const PANEL_ASSETS = {
  hero: heroImg,
  'product-0': room1Img,
  'product-1': room2Img,
  'product-2': room3Img,
  detail: detailImg,
};

function addDays(d, n) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}
function iso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/* Two-letter crest monogram from the (customisable) brand name, e.g. "Kela Hotels" → "KH". */
const initials = (n) =>
  String(n || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* Server-safe word-mask headline */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sh-wm ${className}`} aria-label={text}>
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

/* Ornate pattern divider — drawn via SVG dashoffset on scroll */
function PatternRule() {
  return (
    <div className="sh-rule" aria-hidden="true">
      <svg viewBox="0 0 640 46" preserveAspectRatio="xMidYMid meet">
        <line x1="8" y1="23" x2="252" y2="23" pathLength="1" />
        <line x1="388" y1="23" x2="632" y2="23" pathLength="1" />
        <path d="M320 6 L337 23 L320 40 L303 23 Z" pathLength="1" />
        <path d="M320 14 L329 23 L320 32 L311 23 Z" pathLength="1" />
        <circle className="sh-rule-dot" cx="272" cy="23" r="3" />
        <circle className="sh-rule-dot" cx="368" cy="23" r="3" />
        <circle className="sh-rule-dot" cx="320" cy="23" r="2.4" />
      </svg>
    </div>
  );
}

/* Booking defaults computed once per page load */
const TODAY_ISO = iso(new Date());
const DEFAULT_CI = iso(addDays(new Date(), 7));
const DEFAULT_CO = iso(addDays(new Date(), 9));

/* Booking widget: dates, guests, suite — live night count + rate math */
function BookingBar({ rooms, suiteIdx, setSuiteIdx }) {
  const { productName, price } = useCustom();
  const [ci, setCi] = useState(DEFAULT_CI);
  const [co, setCo] = useState(DEFAULT_CO);
  const [guests, setGuests] = useState(2);
  /* The receipt is only shown while the inputs still match the moment of
     confirmation — any change invalidates it, with no effect needed. */
  const [receipt, setReceipt] = useState(null);

  const rawNights = Math.round((new Date(co) - new Date(ci)) / 86400000);
  const nights = Number.isFinite(rawNights) ? Math.max(0, rawNights) : 0;
  const room = rooms[suiteIdx] || rooms[0];
  const total = nights * room.price;
  const bookingKey = `${ci}|${co}|${suiteIdx}|${guests}`;
  const showReceipt = receipt && receipt.key === bookingKey && receipt.nights > 0;

  return (
    <div className="sh-book-card sh-rv">
      <h2 className="sh-book-title">{content.booking.title}</h2>
      <p className="sh-book-note">{content.booking.note}</p>
      <div className="sh-book-fields">
        <div className="sh-field">
          <label htmlFor="sh-ci">Check-in</label>
          <input id="sh-ci" type="date" value={ci} min={TODAY_ISO} onChange={(e) => setCi(e.target.value)} />
        </div>
        <div className="sh-field">
          <label htmlFor="sh-co">Check-out</label>
          <input id="sh-co" type="date" value={co} min={ci} onChange={(e) => setCo(e.target.value)} />
        </div>
        <div className="sh-field">
          <label htmlFor="sh-suite">Suite</label>
          <select id="sh-suite" value={suiteIdx} onChange={(e) => setSuiteIdx(Number(e.target.value))}>
            {rooms.map((r, i) => (
              <option key={r.name} value={i}>
                {productName(i, r.name)} — {price(r.price)}
              </option>
            ))}
          </select>
        </div>
        <div className="sh-field">
          <label htmlFor="sh-guests">Guests</label>
          <select id="sh-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>
                {g} {g === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="sh-book-summary">
        <div>
          <p className="sh-book-math">
            <strong>
              {nights} {nights === 1 ? 'night' : 'nights'}
            </strong>{' '}
            × {price(room.price)} per night · {productName(suiteIdx, room.name)} · {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'}
          </p>
          <p className="sh-book-total">
            {price(total)} <small>total, taxes included</small>
          </p>
        </div>
        <button
          type="button"
          className="sh-btn sh-btn-solid"
          onClick={() =>
            setReceipt({
              key: bookingKey,
              nights,
              total,
              roomName: productName(suiteIdx, room.name),
            })
          }
          disabled={nights < 1}
        >
          Reserve
        </button>
      </div>
      {showReceipt && (
        <p className="sh-book-confirm" role="status">
          {content.booking.confirm} — {receipt.nights} {receipt.nights === 1 ? 'night' : 'nights'} in{' '}
          {receipt.roomName}, {price(receipt.total)}.
        </p>
      )}
    </div>
  );
}

export default function Design05Haveli() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;

  const [beat, setBeat] = useState(0);
  const [suiteIdx, setSuiteIdx] = useState(0);
  const panCapRef = useRef(null);
  const panFillRef = useRef(null);

  /* Fonts (unchanged) */

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

      /* Hero (ornate-slow): courtyard fade 2s + arch mask scale-in,
         masked word-rise title, gentle settle of the inner media. */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(
          '.sh-hero-arch',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 2, ease: 'power2.inOut' },
          0
        )
        .fromTo(
          '.sh-hero .sf-canvas',
          { scale: 1.12 },
          { scale: 1.02, duration: 2, ease: 'power2.inOut' },
          0
        )
        .fromTo(
          '.sh-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 },
          0.5
        )
        .fromTo(
          '.sh-hero-eyebrow, .sh-hero-sub, .sh-hero-ctas',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 },
          1
        )
        .fromTo('.sh-scrollcue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.8);

      /* Light-arrival reveals: slow opacity + gentle y drift. */
      gsap.utils.toArray('.sh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sh-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Pattern dividers draw via SVG dashoffset. */
      gsap.utils.toArray('.sh-rule').forEach((rule) => {
        gsap.to(rule.querySelectorAll('line, path'), {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
          stagger: 0.08,
          scrollTrigger: { trigger: rule, scroller: sc, start: 'top 90%', once: true },
        });
      });

      /* Scrubbable history timeline — no pin (the pan owns the template's
         single pin); the scrub drives the active beat. */
      ScrollTrigger.create({
        trigger: '.sh-story',
        scroller: sc,
        start: 'top 70%',
        end: 'bottom 55%',
        scrub: 0.6,
        onUpdate: (self) => {
          const i = Math.min(content.story.beats.length - 1, Math.floor(self.progress * content.story.beats.length));
          setBeat(i);
        },
      });

      /* Signature §3.05 — Jharokha window pan: the arch mask stays fixed
         while the 300vw strip pans behind it, scrubbed through a desktop
         pin. Mobile gets native swipe (CSS); reduced-motion gets a static
         stack (rendered + CSS). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.sh-pan-pin');
        if (!pin) return;
        const strip = pin.querySelector('.sh-pan-strip');
        const win = pin.querySelector('.sh-pan-window');
        if (!strip || !win) return;
        const dist = () => Math.max(0, strip.scrollWidth - win.clientWidth);
        const caps = content.pan.panels.map((p) => p.cap);
        /* pin just below the sticky nav so the arch crown is never covered */
        const nav = rootRef.current.querySelector('.sh-nav');
        const navH = () => (nav ? nav.offsetHeight : 0);
        gsap.to(strip, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: () => `top ${navH()}px`,
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (panFillRef.current) panFillRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
              if (panCapRef.current) {
                const i = Math.min(caps.length - 1, Math.round(self.progress * (caps.length - 1)));
                if (panCapRef.current.textContent !== caps[i]) panCapRef.current.textContent = caps[i];
              }
            },
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;
  const beatCount = content.story.beats.length;

  return (
    <div ref={rootRef} className={`tpl-design-05-haveli${reduced ? ' is-reduced' : ''}`}>
      {/* NAV — ornate serif, centered crest */}
      <header className="sh-nav">
        <div className="sh-nav-inner">
          <nav className="sh-nav-links is-left" aria-label="Primary">
            {content.nav.slice(0, 2).map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="sh-crest" href="#hero" aria-label={`${name} — home`}>
            <span className="sh-crest-arch" aria-hidden="true">
              {initials(name)}
            </span>
            <span className="sh-crest-name">{name}</span>
          </a>
          <nav className="sh-nav-links is-right" aria-label="Primary continued">
            {content.nav.slice(2).map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a className="sh-btn sh-btn-solid sh-nav-cta" href="#booking">
              Reserve
            </a>
          </nav>
        </div>
        <nav className="sh-nav-strip" aria-label="Sections">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — frescoed courtyard in an arch mask, scroll-scrubbed frames */}
        <section id="hero" className="sh-hero" data-tour="Welcome">
          <ScrollFrames frames={frames} alt={content.hero.videoAlt} pinDistance="+=170%">
            <div className="sh-hero-arch">
              <div className="sh-hero-scrim" aria-hidden="true" />
              <div className="sh-hero-copy">
                <p className="sh-eyebrow sh-hero-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="sh-hero-title">
                  <Words text={content.hero.title} />
                </h1>
                <p className="sh-hero-sub">{content.hero.sub}</p>
                <div className="sh-hero-ctas">
                  <a className="sh-btn sh-btn-solid" href={content.hero.ctaHref}>
                    {content.hero.cta}
                  </a>
                  <a className="sh-btn sh-btn-ghost" href={content.hero.secondaryHref}>
                    {content.hero.secondary}
                  </a>
                </div>
              </div>
            </div>
            <a className="sh-scrollcue" href="#booking" aria-label="Scroll to booking">
              <span>Scroll</span>
              <span className="sh-cue-line" aria-hidden="true" />
            </a>
          </ScrollFrames>
        </section>

        {/* BOOKING BAR */}
        <section id="booking" className="sh-booking" aria-label="Booking">
          <div className="sh-wrap">
            <BookingBar rooms={content.rooms} suiteIdx={suiteIdx} setSuiteIdx={setSuiteIdx} />
          </div>
        </section>

        <PatternRule />

        {/* THE STORY — 200 years in 4 beats, scrubbable timeline */}
        <section id="story" className="sh-section sh-story" data-tour="The Story">
          <div className="sh-wrap">
            <div className="sh-section-head">
              <p className="sh-eyebrow sh-rv">{content.story.eyebrow}</p>
              <h2 className="sh-h2 sh-rv">{content.story.title}</h2>
              <p className="sh-body sh-story-intro sh-rv">{content.story.intro}</p>
            </div>
            <div className="sh-tl">
              <div className="sh-tl-rail" aria-hidden="true">
                <div className="sh-tl-fill" style={{ transform: `scaleX(${beat / (beatCount - 1)})` }} />
                <div className="sh-tl-knob" style={{ left: `${(beat / (beatCount - 1)) * 100}%` }} />
              </div>
              <ol className="sh-beats sh-stagger">
                {content.story.beats.map((b, i) => (
                  <li key={b.year}>
                    <button
                      type="button"
                      className={`sh-beat${i === beat ? ' is-active' : ''}`}
                      aria-current={i === beat ? 'true' : undefined}
                      onClick={() => setBeat(i)}
                    >
                      <span className="sh-beat-year">{b.year}</span>
                      <span className="sh-beat-title">{b.title}</span>
                      <span className="sh-beat-text">{b.text}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <PatternRule />

        {/* COURTYARDS & ROOMS — jharokha window pan + suites */}
        <section id="rooms" className="sh-section sh-rooms" data-tour="Courtyards & Rooms">
          <div className="sh-wrap">
            <div className="sh-section-head">
              <p className="sh-eyebrow sh-rv">{content.pan.eyebrow}</p>
              <h2 className="sh-h2 sh-rv">{content.pan.title}</h2>
            </div>
          </div>
          <div className="sh-pan-pin">
            <div className="sh-pan-window" role="region" aria-label="Courtyard panorama — scroll to pan">
              <div className="sh-pan-strip">
                {content.pan.panels.map((p) => (
                  <figure key={p.imgKey}>
                    <Img k={p.imgKey} src={img(p.imgKey, PANEL_ASSETS[p.imgKey])} alt={p.alt} />
                    <figcaption className="sh-pan-cap">{p.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <p className="sh-pan-livecap" ref={panCapRef} aria-live="polite">
              {content.pan.panels[0].cap}
            </p>
            <div className="sh-pan-progress" aria-hidden="true">
              <div className="sh-pan-fill" ref={panFillRef} />
            </div>
            <p className="sh-pan-hint">{content.pan.hint}</p>
          </div>
          <div className="sh-wrap">
            <div className="sh-room-grid sh-stagger">
              {content.rooms.map((r, i) => (
                <article className="sh-room-card" key={r.name}>
                  <div className="sh-room-media">
                    <Img k={r.imgKey} src={img(r.imgKey, ROOM_ASSETS[r.imgKey])} alt={r.alt} />
                  </div>
                  <div className="sh-room-body">
                    <div className="sh-room-top">
                      <h3 className="sh-room-name">{productName(i, r.name)}</h3>
                      <p className="sh-room-price">
                        {price(r.price)}
                        <small>per night</small>
                      </p>
                    </div>
                    <p className="sh-room-size">{r.size}</p>
                    <p className="sh-room-desc">{r.desc}</p>
                    <ul className="sh-room-perks">
                      {r.perks.map((perk) => (
                        <li key={perk}>{perk}</li>
                      ))}
                    </ul>
                    <a
                      className="sh-room-cta"
                      href="#booking"
                      onClick={() => setSuiteIdx(i)}
                    >
                      Reserve this suite
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FRESCO ART — the painted walls, deep terracotta */}
        <section id="fresco" className="sh-section sh-fresco" data-tour="Fresco Art">
          <div className="sh-wrap">
            <div className="sh-fresco-grid">
              <div className="sh-fresco-media sh-rv">
                <Img k="product-1" src={img('product-1', room2Img)} alt={content.fresco.imgAlt} />
              </div>
              <div>
                <p className="sh-eyebrow sh-rv">{content.fresco.eyebrow}</p>
                <h2 className="sh-h2 sh-rv">{content.fresco.title}</h2>
                {content.fresco.body.map((p, i) => (
                  <p className="sh-body sh-rv" key={i}>
                    {p}
                  </p>
                ))}
                <div className="sh-motifs sh-stagger">
                  {content.fresco.motifs.map((m) => (
                    <div className="sh-motif" key={m.title}>
                      <h3 className="sh-motif-title">{m.title}</h3>
                      <p className="sh-motif-text">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sh-stats sh-stagger">
              {content.fresco.stats.map((s) => (
                <div className="sh-stat" key={s.label}>
                  <p className="sh-stat-value">{s.value}</p>
                  <p className="sh-stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PatternRule />

        {/* EXPERIENCES — heritage walks, folk music */}
        <section id="experiences" className="sh-section sh-experiences" data-tour="Experiences">
          <div className="sh-wrap">
            <div className="sh-section-head">
              <p className="sh-eyebrow sh-rv">{content.experiences.eyebrow}</p>
              <h2 className="sh-h2 sh-rv">{content.experiences.title}</h2>
            </div>
            <div className="sh-exp-grid sh-stagger">
              {content.experiences.items.map((e) => (
                <article className="sh-exp-card" key={e.name}>
                  {e.imgKey && (
                    <div className="sh-exp-media">
                      <Img k={e.imgKey} src={img(e.imgKey, PANEL_ASSETS[e.imgKey])} alt={e.imgAlt} />
                    </div>
                  )}
                  <div className="sh-exp-body">
                    <h3 className="sh-exp-name">{e.name}</h3>
                    <p className="sh-exp-meta">{e.meta}</p>
                    <p className="sh-exp-desc">{e.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PatternRule />

        {/* PRACTICAL */}
        <section id="visit" className="sh-section sh-visit" data-tour="Practical">
          <div className="sh-wrap">
            <div className="sh-visit-grid">
              <div>
                <p className="sh-eyebrow sh-rv">{content.visit.eyebrow}</p>
                <h2 className="sh-h2 sh-rv">{content.visit.title}</h2>
                <p className="sh-checkin sh-rv">{content.visit.checkin}</p>
                <address className="sh-address sh-rv">
                  {content.visit.address}
                  <br />
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </address>
                <p className="sh-visit-note sh-rv">{content.visit.note}</p>
                <div className="sh-visit-cta sh-rv">
                  <a className="sh-btn sh-btn-outline" href={mapsUrl} target="_blank" rel="noreferrer">
                    Get directions
                  </a>
                </div>
              </div>
              <div className="sh-routes sh-rv">
                <h3 className="sh-h3">Getting here</h3>
                {content.visit.routes.map((r) => (
                  <div className="sh-route" key={r.from}>
                    <span className="sh-route-from">{r.from}</span>
                    <span className="sh-route-detail">{r.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="sh-footer">
        <div className="sh-wrap">
          <div className="sh-footer-crest">
            <span className="sh-crest-arch" aria-hidden="true">
              {initials(name)}
            </span>
            <span className="sh-footer-name">{name}</span>
            <p className="sh-footer-tag">{content.brand.tagline}</p>
          </div>
          <nav className="sh-footer-nav" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="sh-footer-contact">
            <a href={`mailto:${email}`}>{email}</a> · <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </p>
          <p className="sh-footer-line">{content.footer.line}</p>
          <p className="sh-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
