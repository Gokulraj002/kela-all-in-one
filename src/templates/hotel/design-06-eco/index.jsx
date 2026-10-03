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

/* Scroll-driven hero frames (replaces the old autoplay loop). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-eco';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap';

const roomImgs = [room1Img, room2Img, room3Img];

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`vn-wm ${className}`} aria-label={text}>
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

/* Foreground leaf silhouettes for the canopy-descent parallax. Decorative. */
function LeafCluster({ className }) {
  return (
    <svg className={className} viewBox="0 0 220 260" fill="currentColor" aria-hidden="true" focusable="false">
      <g>
        <path d="M70 8 C118 62 122 168 70 244 C20 168 24 62 70 8 Z" />
        <path d="M70 30 L70 220" stroke="#f4f2e9" strokeOpacity="0.22" strokeWidth="3" />
        <path d="M70 84 L104 104 M70 128 L110 146 M70 84 L36 104 M70 128 L30 146" stroke="#f4f2e9" strokeOpacity="0.16" strokeWidth="2.5" />
      </g>
      <g transform="rotate(28 165 120)">
        <path d="M165 40 C198 78 200 150 165 200 C130 150 132 78 165 40 Z" />
        <path d="M165 56 L165 184" stroke="#f4f2e9" strokeOpacity="0.18" strokeWidth="2.5" />
      </g>
      <g transform="rotate(-24 40 150)">
        <path d="M40 80 C68 112 70 168 40 210 C12 168 14 112 40 80 Z" />
        <path d="M40 94 L40 196" stroke="#f4f2e9" strokeOpacity="0.18" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

function fmtDay(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/* Booking widget — dates, guests, room, live night count + rate math. Demo reserve. */
function BookingWidget() {
  const { productName, price } = useCustom();
  const [ci, setCi] = useState(() => fmtDay(14));
  const [co, setCo] = useState(() => fmtDay(17));
  const [guests, setGuests] = useState('2');
  const [roomIdx, setRoomIdx] = useState(0);
  const [done, setDone] = useState(false);

  const nights = Math.max(0, Math.round((new Date(`${co}T12:00:00`) - new Date(`${ci}T12:00:00`)) / 86400000));
  const room = content.rooms[roomIdx];
  const total = nights * room.price;

  return (
    <section id="booking" className="vn-booking" aria-label="Book your stay">
      <div className="vn-wrap">
        <div className="vn-booking-card">
          <div className="vn-booking-head">
            <div>
              <p className="vn-eyebrow">{content.booking.eyebrow}</p>
              <h2>{content.booking.title}</h2>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <div className="vn-booking-grid">
              <div className="vn-field">
                <label htmlFor="vn-ci">Check-in</label>
                <input id="vn-ci" type="date" value={ci} min={fmtDay(0)} onChange={(e) => { setCi(e.target.value); setDone(false); }} required />
              </div>
              <div className="vn-field">
                <label htmlFor="vn-co">Check-out</label>
                <input id="vn-co" type="date" value={co} min={ci} onChange={(e) => { setCo(e.target.value); setDone(false); }} required />
              </div>
              <div className="vn-field">
                <label htmlFor="vn-room">Room</label>
                <select id="vn-room" value={roomIdx} onChange={(e) => { setRoomIdx(Number(e.target.value)); setDone(false); }}>
                  {content.rooms.map((r, i) => (
                    <option key={r.name} value={i}>{productName(i, r.name)}</option>
                  ))}
                </select>
              </div>
              <div className="vn-field">
                <label htmlFor="vn-guests">Guests</label>
                <select id="vn-guests" value={guests} onChange={(e) => { setGuests(e.target.value); setDone(false); }}>
                  {['1', '2', '3', '4'].map((g) => (
                    <option key={g} value={g}>{g} {g === '1' ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="vn-booking-foot">
              <p className="vn-rate-line">
                <strong>{nights > 0 ? price(total) : '—'}</strong>
                <span>{nights > 0 ? `${price(room.price)} × ${nights} night${nights === 1 ? '' : 's'} · ${productName(roomIdx, room.name)} · ${guests} guest${guests === '1' ? '' : 's'}` : 'Choose your dates to see the rate'}</span>
              </p>
              <button type="submit" className="vn-cta" disabled={nights <= 0}>{content.booking.cta}</button>
            </div>
          </form>
          {done && nights > 0 && (
            <p className="vn-booking-confirm" role="status">
              {content.booking.confirm} — {productName(roomIdx, room.name)}, {nights} night{nights === 1 ? '' : 's'}, {price(total)}.
            </p>
          )}
          <p className="vn-booking-note">{content.booking.note}</p>
        </div>
      </div>
    </section>
  );
}

export default function Design06Eco() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
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

      /* Nav: quiet at top, frosted once scrolled — keyed to the scroll
         position so it stays frosted at the very bottom too. */
      const navEl = rootRef.current && rootRef.current.querySelector('.vn-nav');
      const setNav = (self) => navEl && navEl.classList.toggle('is-scrolled', self.scroll() > 70);
      ScrollTrigger.create({ scroller: sc, start: 0, end: 'max', onUpdate: setNav, onRefresh: setNav });

      /* Hero entrance: masked word-rise + light-arriving reveals. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.vn-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 1.0, stagger: 0.07 }, 0.15)
        .fromTo(
          '#hero .vn-eyebrow, .vn-hero-sub, .vn-hero-actions',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
          0.55
        )
        .fromTo('.vn-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.1);

      /* Hero mist drift: slow x yoyo (24s), paused when the hero is offscreen. */
      const mistA = gsap.to('.vn-mist-a', { xPercent: 14, duration: 24, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      const mistB = gsap.to('.vn-mist-b', { xPercent: -11, duration: 31, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: -9 });
      ScrollTrigger.create({
        trigger: '#hero',
        scroller: sc,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) {
            mistA.play();
            mistB.play();
          } else {
            mistA.pause();
            mistB.pause();
          }
        },
      });

      /* Gentle reveal grammar — light arriving, 1.1s, never popping. */
      gsap.utils.toArray('.vn-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.vn-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      gsap.utils.toArray('.vn-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Impact counters: tween on enter. Final values already in markup. */
      gsap.utils.toArray('.vn-stat-num').forEach((el) => {
        const valEl = el.querySelector('.vn-stat-val');
        if (!valEl) return;
        const target = parseFloat(el.dataset.count || '0');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          onUpdate: () => {
            valEl.textContent = Math.round(obj.v).toLocaleString('en-IN');
          },
        });
      });

      /* Signature §3.06 — "Canopy descent": three layers scrubbed at
         1.4x / 1.0x / 0.6x scroll speed via yPercent. No pin — pure
         scroll-speed differential, like descending through canopy. */
      const descent = gsap.timeline({
        scrollTrigger: {
          trigger: '.vn-stage',
          scroller: sc,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      descent
        .fromTo('.vn-layer-fg', { yPercent: -10 }, { yPercent: 10, ease: 'none' }, 0)
        .fromTo('.vn-layer-mid', { yPercent: -7 }, { yPercent: 7, ease: 'none' }, 0)
        .fromTo('.vn-layer-bg', { yPercent: -4 }, { yPercent: 4, ease: 'none' }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-06-eco">
      {/* Zero-height sticky shell: the nav overlays the hero and stays inside
          the scroll area (a fixed nav would sit over the viewer toolbar). */}
      <div className="vn-navshell">
        <header className="vn-nav">
          <a className="vn-wordmark" href="#hero">{name}</a>
          <nav className="vn-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="vn-nav-actions">
            <button className="vn-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-label="Menu">
              Menu
            </button>
            <a className="vn-cta" href="#booking">Stay with us</a>
          </div>
        </header>
        <nav className={`vn-mobile-menu${menuOpen ? ' is-open' : ''}`} aria-label="Mobile">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>
          ))}
        </nav>
      </div>

      <main>
        {/* HERO — scroll-driven canopy frames (replaces the autoplay loop) */}
        <section id="hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Jungle canopy with mist threading between the trees, drifting apart and re-gathering in a seamless loop"
            pinDistance="+=170%"
          >
            <div className="vn-hero-scrim" aria-hidden="true" />
            <div className="vn-mist" aria-hidden="true">
              <div className="vn-mist-a" />
              <div className="vn-mist-b" />
            </div>
            <div className="vn-hero-copy">
              <p className="vn-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="vn-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="vn-hero-sub">{content.hero.sub}</p>
              <div className="vn-hero-actions">
                <a className="vn-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="vn-cta-ghost" href={content.hero.secondaryHref}>{content.hero.secondary}</a>
              </div>
            </div>
            <p className="vn-scroll-hint" aria-hidden="true">Descend</p>
          </ScrollFrames>
        </section>

        <BookingWidget />

        {/* THE PROMISE */}
        <section id="story" className="vn-section" data-tour="The Promise">
          <div className="vn-wrap">
            <div className="vn-promise-grid">
              <div>
                <p className="vn-eyebrow vn-rv">{content.promise.eyebrow}</p>
                <h2 className="vn-h2 vn-rv">{content.promise.title}</h2>
                <span className="vn-rule" aria-hidden="true" />
                {content.promise.body.map((p, i) => (
                  <p className="vn-body vn-rv" key={i}>{p}</p>
                ))}
              </div>
              <div className="vn-stats vn-stagger" role="list" aria-label="Impact numbers">
                {content.promise.stats.map((s) => (
                  <div className="vn-stat" role="listitem" key={s.label}>
                    <p className="vn-stat-num" data-count={s.value}>
                      <span className="vn-stat-val">{s.value.toLocaleString('en-IN')}</span>
                      <em>{s.suffix}</em>
                    </p>
                    <p className="vn-stat-label">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CANOPY STAYS */}
        <section id="rooms" className="vn-section vn-rooms" data-tour="Canopy Stays">
          <div className="vn-wrap">
            <div className="vn-section-head">
              <p className="vn-eyebrow vn-rv">Canopy stays</p>
              <h2 className="vn-h2 vn-rv">Three rooms, three heights.</h2>
              <span className="vn-rule" aria-hidden="true" />
              <p className="vn-body vn-rv">
                The forest is vertical — so are we. Each room sits at the layer the forest gave it,
                and the scroll down this page descends with you: foreground leaves sweep past fastest,
                the mist behind barely moves.
              </p>
            </div>
          </div>
          <div className="vn-wrap">
            <div className="vn-stage">
              <div className="vn-layer vn-layer-bg" aria-hidden="true">
                <div className="vn-bg-blob b1" />
                <div className="vn-bg-blob b2" />
                <div className="vn-bg-blob b3" />
              </div>
              <div className="vn-layer vn-layer-mid">
                <div className="vn-cards">
                  {content.rooms.map((room, i) => (
                    <article className="vn-card" key={room.name}>
                      <div className="vn-card-inner vn-rv">
                        <div className="vn-card-visual">
                          <Img k={room.imgKey} src={img(room.imgKey, roomImgs[i])} alt={room.alt} />
                        </div>
                        <div className="vn-card-body">
                          <span className="vn-height-pill">{room.height}</span>
                          <h3 className="vn-h3">{productName(i, room.name)}</h3>
                          <p className="vn-card-meta"><span>{room.size}</span><span>{room.sleeps}</span></p>
                          <p className="vn-card-desc">{room.desc}</p>
                          <div className="vn-card-foot">
                            <p className="vn-card-price"><strong>{price(room.price)}</strong>per night</p>
                            <a className="vn-card-link" href="#booking">Reserve this room</a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="vn-layer vn-layer-fg" aria-hidden="true">
                <LeafCluster className="vn-fg-leaf l1" />
                <LeafCluster className="vn-fg-leaf l2" />
                <LeafCluster className="vn-fg-leaf l3" />
              </div>
            </div>
          </div>
        </section>

        {/* THE FOREST */}
        <section id="experiences" className="vn-section" data-tour="The Forest">
          <div className="vn-wrap">
            <div className="vn-exp-grid">
              <div className="vn-exp-visual vn-rv">
                <Img
                  k={content.experiences.imageKey}
                  src={img(content.experiences.imageKey, room3Img)}
                  alt={content.experiences.imageAlt}
                />
              </div>
              <div>
                <p className="vn-eyebrow vn-rv">{content.experiences.eyebrow}</p>
                <h2 className="vn-h2 vn-rv">{content.experiences.title}</h2>
                <span className="vn-rule" aria-hidden="true" />
                <p className="vn-body vn-rv">{content.experiences.body}</p>
                <ul className="vn-exp-list vn-stagger">
                  {content.experiences.items.map((x) => (
                    <li className="vn-exp-item" key={x.name}>
                      <p className="vn-exp-when">{x.when}</p>
                      <h3>{x.name}</h3>
                      <p>{x.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DINING */}
        <section id="dining" className="vn-section vn-dining">
          <div className="vn-wrap">
            <div className="vn-dining-grid">
              <div>
                <p className="vn-eyebrow vn-rv">{content.dining.eyebrow}</p>
                <h2 className="vn-h2 vn-rv">{content.dining.title}</h2>
                <span className="vn-rule" aria-hidden="true" />
                {content.dining.body.map((p, i) => (
                  <p className="vn-body vn-rv" key={i}>{p}</p>
                ))}
                <ul className="vn-menu-list vn-stagger">
                  {content.dining.menu.map((m) => (
                    <li className="vn-menu-item" key={m.name}>
                      <div className="vn-menu-head">
                        <span className="vn-menu-name">{m.name}</span>
                        <span className="vn-menu-dots" aria-hidden="true" />
                        <span className="vn-menu-price">{m.price === 0 ? 'Included' : price(m.price)}</span>
                      </div>
                      <p className="vn-menu-detail">{m.detail}</p>
                    </li>
                  ))}
                </ul>
                <p className="vn-dining-note vn-rv">{content.dining.note}</p>
              </div>
              <div className="vn-dining-visual vn-rv">
                <Img
                  k={content.dining.imageKey}
                  src={img(content.dining.imageKey, detailImg)}
                  alt={content.dining.imageAlt}
                />
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT REPORT */}
        <section id="impact" className="vn-section" data-tour="Impact Report">
          <div className="vn-wrap">
            <div className="vn-impact-grid">
              <div>
                <p className="vn-eyebrow vn-rv">{content.impact.eyebrow}</p>
                <h2 className="vn-h2 vn-rv">{content.impact.title}</h2>
                <span className="vn-rule" aria-hidden="true" />
                <p className="vn-body vn-rv">{content.impact.body}</p>
                <p className="vn-impact-note vn-rv">{content.impact.note}</p>
              </div>
              <dl className="vn-report vn-rv">
                <div className="vn-report-head">
                  <strong>{name}</strong>
                  <span>Season report</span>
                </div>
                {content.impact.rows.map((r) => (
                  <div className="vn-report-row" key={r.k}>
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer className="vn-footer">
        <div className="vn-wrap">
          <div className="vn-footer-grid">
            <div>
              <p className="vn-footer-brand">{name}</p>
              <p className="vn-footer-tag">{content.brand.tagline}. Twelve rooms in living rainforest, Coorg.</p>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {content.nav.map((n) => (
                  <li key={n.href}><a href={n.href}>{n.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Find us</h4>
              <address>
                {content.contact.address}<br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a><br />
                <a href={`mailto:${email}`}>{email}</a><br />
                <a href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
              </address>
            </div>
          </div>
          <div className="vn-footer-base">
            <p>{content.footer.line}</p>
            <p>{content.footer.colophon}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
