import React, { useEffect, useLayoutEffect, useState } from 'react';
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

const FONT_ID = 'tpl-font-design-08-spa';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap';

const roomImgs = { 'product-0': room1Img, 'product-1': room2Img, 'product-2': room3Img };

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function parseISO(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function fmtLong(s) {
  try {
    return parseISO(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return s;
  }
}

/* Whisper-quiet sticky booking bar: dates, guests, live night count + total. */
function BookingBar({ arrival, setArrival, checkout, setCheckout, guests, setGuests, nights, total }) {
  const { price } = useCustom();
  return (
    <div className="as-bookbar" role="region" aria-label="Quick booking">
      <label className="as-bb-field">
        <span>Arrive</span>
        <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} aria-label="Arrival date" />
      </label>
      <label className="as-bb-field">
        <span>Leave</span>
        <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} aria-label="Departure date" />
      </label>
      <label className="as-bb-field">
        <span>Guests</span>
        <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} aria-label="Guests">
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <p className="as-bb-summary">
        <strong>{nights > 0 ? `${nights} night${nights === 1 ? '' : 's'}` : 'Choose dates'}</strong>
        <span>{nights > 0 ? price(total) : '—'}</span>
      </p>
      <a className="as-bb-cta" href="#booking">Begin</a>
    </div>
  );
}

export default function Design08Spa() {
  const { brand, img, price, contact, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  /* Google Fonts — one family pair, injected once, never removed. */
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Booking state lives here so the sticky bar and the booking section stay in sync. */
  const [programIdx, setProgramIdx] = useState(1);
  const [arrival, setArrival] = useState(() => toISODate(new Date(Date.now() + 21 * 864e5)));
  const [checkout, setCheckout] = useState(() => toISODate(new Date(Date.now() + 26 * 864e5)));
  const [guests, setGuests] = useState(2);
  const [requested, setRequested] = useState(false);

  const program = content.programs[programIdx];
  const nights = Math.max(0, Math.round((parseISO(checkout) - parseISO(arrival)) / 864e5));
  const extraGuests = Math.max(0, guests - 2);
  const total = program.price + extraGuests * content.booking.perGuestExtra;
  const perNight = Math.round(program.price / program.days);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero: 2s fade, one line of copy. The slowest entrance. */
      const tl = gsap.timeline({ defaults: { ease: 'sine.out' } });
      tl.fromTo('.as-hero .sf-canvas', { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
        .fromTo(
          '.as-hero-eyebrow, .as-hero-title, .as-hero-cta',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.35 },
          0.4
        )
        .fromTo('.as-nav', { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.8);

      /* Slowest reveals in the category: 1.5s, opacity-led. */
      gsap.utils.toArray('.as-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.as-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'sine.out',
            stagger: 0.18,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* §3.08 — Breath gallery: program images scale with scroll direction.
         Scrolling down = inhale (scale 1 → 1.04, 1.2s sine);
         scrolling up = exhale (back to 1). Direction comes from the
         ScrollTrigger onUpdate (never raw scroll listeners). When idle, a
         6s ambient sine loop breathes quietly; it pauses offscreen. */
      const gallery = rootRef.current && rootRef.current.querySelector('.as-breath');
      if (gallery) {
        const breathImgs = gsap.utils.toArray('.as-breath-img', gallery);
        let ambient = null;
        let idleTimer = null;
        const stopAmbient = () => {
          if (ambient) {
            ambient.kill();
            ambient = null;
          }
        };
        const startAmbient = () => {
          stopAmbient();
          ambient = gsap.to(breathImgs, {
            scale: 1.02,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          });
        };
        /* One tween per direction change (not per scroll event), and the
           idle timer only restarts the ambient loop once scrolling stops. */
        let lastDir = 0;
        const breathe = (dir) => {
          if (idleTimer) clearTimeout(idleTimer);
          idleTimer = setTimeout(() => {
            lastDir = 0;
            startAmbient();
          }, 2200);
          if (dir === lastDir) return;
          lastDir = dir;
          stopAmbient();
          gsap.to(breathImgs, {
            scale: dir > 0 ? 1.04 : 1,
            duration: 1.2,
            ease: 'sine.inOut',
            overwrite: 'auto',
          });
        };
        ScrollTrigger.create({
          trigger: gallery,
          scroller: sc,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            if (self.direction !== 0) breathe(self.direction);
          },
          onToggle: (self) => {
            if (self.isActive) startAmbient();
            else {
              stopAmbient();
              lastDir = 0;
              if (idleTimer) clearTimeout(idleTimer);
              gsap.set(breathImgs, { scale: 1 });
            }
          },
        });
        /* never leave a pending timer behind after unmount */
        return () => {
          if (idleTimer) clearTimeout(idleTimer);
          stopAmbient();
        };
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-08-spa">
      {/* NAV — whisper-quiet, centered */}
      <header className="as-nav">
        <a className="as-wordmark" href="#hero">{name}</a>
        <nav className="as-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="as-nav-cta" href="#booking">Begin</a>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="as-hero" data-tour="Stillness">
          <ScrollFrames
            frames={frames}
            alt="Infinity pool at dawn, its surface perfectly still and mirroring the pale sky"
            pinDistance="+=170%"
          >
            <div className="as-hero-copy">
              <p className="as-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="as-hero-title">{content.hero.title}</h1>
              <a className="as-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
          </ScrollFrames>
        </section>

        {/* THE PAUSE */}
        <section id="story" className="as-pause" data-tour="The Pause">
          <div className="as-wrap as-narrow">
            <p className="as-eyebrow as-rv">{content.pause.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.pause.title}</h2>
            <div className="as-pause-img as-rv">
              <Img k="detail" src={img('detail', detailImg)} alt="Water ripples in macro, concentric rings expanding across a pale pool surface" />
            </div>
            {content.pause.body.map((p, i) => (
              <p className="as-body as-rv" key={i}>{p}</p>
            ))}
            <ul className="as-principles as-stagger">
              {content.pause.principles.map((pr) => (
                <li key={pr.title}>
                  <h3>{pr.title}</h3>
                  <p>{pr.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROGRAMS — breath gallery + program selector */}
        <section id="programs" className="as-programs" data-tour="Programs">
          <div className="as-wrap">
            <p className="as-eyebrow as-rv">Programs</p>
            <h2 className="as-h2 as-rv">Three ways to slow down.</h2>
            <p className="as-lede as-rv">Scroll, and the images breathe with you. Down is an inhale; up, an exhale.</p>
            <div className="as-breath as-stagger">
              {content.programs.map((p, i) => (
                <article className="as-program" key={p.id}>
                  <div className="as-breath-frame">
                    <div className="as-breath-img">
                      <Img
                        k={content.programImages[i].imgKey}
                        src={img(content.programImages[i].imgKey, roomImgs[content.programImages[i].imgKey])}
                        alt={content.programImages[i].alt}
                      />
                    </div>
                  </div>
                  <p className="as-program-days">{p.days} days</p>
                  <h3 className="as-program-name">{productName(i, p.name)}</h3>
                  <p className="as-program-tag">{p.tagline}</p>
                  <p className="as-program-price">{price(p.price)} <span>· {price(perNightFor(p))} / night</span></p>
                  <button
                    type="button"
                    className={`as-program-choose${programIdx === i ? ' is-active' : ''}`}
                    onClick={() => setProgramIdx(i)}
                    aria-pressed={programIdx === i}
                  >
                    {programIdx === i ? 'Chosen' : 'Choose this pace'}
                  </button>
                </article>
              ))}
            </div>

            {/* Program detail: the selector with its rhythm */}
            <div className="as-detail as-rv" key={program.id} aria-live="polite">
              <div className="as-detail-head">
                <div>
                  <p className="as-eyebrow">Your program</p>
                  <h3 className="as-h3">{productName(programIdx, program.name)} — {program.days} days</h3>
                  <p className="as-body">{program.desc}</p>
                </div>
                <p className="as-detail-rate">{price(program.price)}<span>{price(Math.round(program.price / program.days))} per night · for two</span></p>
              </div>
              <div className="as-detail-cols">
                <div>
                  <h4 className="as-h4">Included</h4>
                  <ul className="as-includes">
                    {program.includes.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="as-h4">The rhythm</h4>
                  <ul className="as-rhythm">
                    {program.rhythm.map((r) => (
                      <li key={r.t}><span>{r.t}</span><span>{r.label}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THERAPIES */}
        <section id="therapies" className="as-therapies" data-tour="Therapies">
          <div className="as-wrap as-narrow">
            <p className="as-eyebrow as-rv">{content.therapies.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.therapies.title}</h2>
            <p className="as-lede as-rv">{content.therapies.note}</p>
            <ul className="as-menu as-stagger">
              {content.therapies.items.map((t, i) => (
                <li className="as-menu-item" key={t.name}>
                  <div className="as-menu-head">
                    <h3>{productName(10 + i, t.name)}</h3>
                    <span className="as-menu-dots" aria-hidden="true" />
                    <span className="as-menu-price">{price(t.price)}</span>
                  </div>
                  <p className="as-menu-meta">{t.duration}</p>
                  <p className="as-menu-desc">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* THE SPACE */}
        <section id="space" className="as-space" data-tour="The Space">
          <div className="as-wrap">
            <p className="as-eyebrow as-rv">{content.space.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.space.title}</h2>
            <p className="as-lede as-rv">{content.space.intro}</p>
            <div className="as-space-imgs as-rv">
              <div className="as-space-img as-space-img-wide">
                <Img k="product-1" src={img('product-1', room2Img)} alt="Open-air meditation pavilion among green garden planting at dawn" />
              </div>
              <div className="as-space-img">
                <Img k="product-3" src={img('product-3', detailImg)} alt={content.space.gardenAlt} />
              </div>
            </div>
            <ul className="as-space-grid as-stagger">
              {content.space.blocks.map((b) => (
                <li key={b.title}>
                  <h3 className="as-h3">{b.title}</h3>
                  <p className="as-body">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* A DAY HERE — deep stone interlude */}
        <section id="day" className="as-day" data-tour="A Day Here">
          <div className="as-wrap as-narrow">
            <p className="as-eyebrow as-rv">{content.day.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.day.title}</h2>
            <ol className="as-schedule as-stagger">
              {content.day.schedule.map((s) => (
                <li key={s.time}>
                  <span className="as-sched-time">{s.time}</span>
                  <span className="as-sched-body">
                    <strong>{s.label}</strong>
                    <span>{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="as-booking" data-tour="Begin">
          <div className="as-wrap as-narrow">
            <p className="as-eyebrow as-rv">{content.booking.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.booking.title}</h2>
            <p className="as-lede as-rv">{content.booking.body}</p>
            <div className="as-book-widget as-rv">
              <div className="as-bw-row">
                <label>
                  <span>Program</span>
                  <select value={programIdx} onChange={(e) => setProgramIdx(Number(e.target.value))}>
                    {content.programs.map((p, i) => (
                      <option key={p.id} value={i}>{p.name} — {p.days} days</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Arrive</span>
                  <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} />
                </label>
                <label>
                  <span>Leave</span>
                  <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                </label>
                <label>
                  <span>Guests</span>
                  <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>
              </div>
              <dl className="as-bw-summary">
                <div>
                  <dt>{productName(programIdx, program.name)} · {program.days} days</dt>
                  <dd>{price(program.price)}</dd>
                </div>
                <div>
                  <dt>{nights} night{nights === 1 ? '' : 's'} · {fmtLong(arrival)} → {fmtLong(checkout)}</dt>
                  <dd>{price(perNight)} / night</dd>
                </div>
                {extraGuests > 0 && (
                  <div>
                    <dt>{extraGuests} additional guest{extraGuests === 1 ? '' : 's'}</dt>
                    <dd>{price(extraGuests * content.booking.perGuestExtra)}</dd>
                  </div>
                )}
                <div className="as-bw-total">
                  <dt>Estimated total</dt>
                  <dd>{price(total)}</dd>
                </div>
              </dl>
              <p className="as-bw-note">{content.booking.extraNote}</p>
              {!requested ? (
                <button type="button" className="as-bw-cta" onClick={() => setRequested(true)}>
                  {content.booking.submit}
                </button>
              ) : (
                <p className="as-bw-done" role="status">{content.booking.confirmNote}</p>
              )}
            </div>
          </div>
        </section>

        {/* PRACTICAL / VISIT */}
        <section id="visit" className="as-visit">
          <div className="as-wrap">
            <p className="as-eyebrow as-rv">{content.practical.eyebrow}</p>
            <h2 className="as-h2 as-rv">{content.practical.title}</h2>
            <ul className="as-practical-grid as-stagger">
              {content.practical.items.map((it) => (
                <li key={it.title}>
                  <h3 className="as-h3">{it.title}</h3>
                  <p className="as-body">{it.text}</p>
                </li>
              ))}
            </ul>
            <address className="as-address as-rv">
              {content.contact.address}<br />
              <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a><br />
              <a href={`mailto:${email}`}>{email}</a><br />
              <a href={mapsUrl} target="_blank" rel="noreferrer">Find us on the map</a>
            </address>
          </div>
        </section>
      </main>

      <footer className="as-footer">
        <p className="as-footer-brand">{name}</p>
        <p className="as-footer-tag">{content.brand.tagline}</p>
        <p className="as-footer-line">{content.footer.line}</p>
        <p className="as-footer-colophon">{content.footer.colophon}</p>
      </footer>

      <BookingBar
        arrival={arrival}
        setArrival={setArrival}
        checkout={checkout}
        setCheckout={setCheckout}
        guests={guests}
        setGuests={setGuests}
        nights={nights}
        total={total}
      />
    </div>
  );
}

function perNightFor(p) {
  return Math.round(p.price / p.days);
}
