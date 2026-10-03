import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import detailImg from './assets/detail.webp';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';

/* Scroll-driven hero frames (Apple-style): the 10s tower-ascent clip,
   extracted to 72 JPGs, played frame-by-frame by ScrollFrames. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-business';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`md-wm ${className}`} aria-label={text}>
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

/* Express booking widget — dates/guests with live night count and rate math. */
function BookingWidget() {
  const { price, img, brand } = useCustom();
  const name = brand || content.brand.name;
  const [confirmed, setConfirmed] = useState(false);
  const fmtDay = (d) => d.toISOString().slice(0, 10);
  const [defaults] = useState(() => {
    const now = new Date();
    const ci = new Date(now);
    ci.setDate(ci.getDate() + 7);
    const co = new Date(ci);
    co.setDate(co.getDate() + 3);
    return { ci: fmtDay(ci), co: fmtDay(co) };
  });
  const [checkin, setCheckin] = useState(defaults.ci);
  const [checkout, setCheckout] = useState(defaults.co);
  const [guests, setGuests] = useState(1);

  const nights = useMemo(() => {
    const a = new Date(`${checkin}T12:00:00`);
    const b = new Date(`${checkout}T12:00:00`);
    const n = Math.round((b - a) / 86400000);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [checkin, checkout]);
  const perNight = content.booking.baseRate;
  const total = nights * perNight;

  return (
    <div className="md-book">
      <div className="md-book-visual md-rv">
        <Img
          k="detail"
          src={img('detail', detailImg)}
          alt={`A ${name} key card resting on the front desk, ready for express check-in`}
        />
        <p className="md-book-visual-note">{content.booking.detailNote}</p>
      </div>
      <form
        className="md-book-form md-rv"
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmed(true);
        }}
      >
        {!confirmed ? (
          <>
            <div className="md-book-fields">
              <label className="md-field">
                <span>Check-in</span>
                <input
                  type="date"
                  value={checkin}
                  min={defaults.ci}
                  onChange={(e) => setCheckin(e.target.value)}
                  required
                />
              </label>
              <label className="md-field">
                <span>Check-out</span>
                <input
                  type="date"
                  value={checkout}
                  min={checkin}
                  onChange={(e) => setCheckout(e.target.value)}
                  required
                />
              </label>
              <label className="md-field">
                <span>Guests</span>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {content.booking.guests.map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="md-book-math" aria-live="polite">
              <span>
                {nights} {nights === 1 ? 'night' : 'nights'} · {price(perNight)} per night
              </span>
              <strong>{price(total)}</strong>
            </div>
            <p className="md-book-note">{content.booking.rateNote}</p>
            <button className="md-btn md-btn-primary md-book-cta" type="submit">
              Check availability
            </button>
          </>
        ) : (
          <div className="md-book-done" role="status">
            <p className="md-book-done-title">Request received</p>
            <p className="md-book-done-text">
              {nights} {nights === 1 ? 'night' : 'nights'} from {checkin} for {guests}{' '}
              {guests === 1 ? 'guest' : 'guests'} — {price(total)}. Our reservations desk confirms
              within ten minutes at express check-in. This is a demo booking.
            </p>
            <button className="md-btn md-btn-ghost" type="button" onClick={() => setConfirmed(false)}>
              Change dates
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default function Design07Business() {
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
      if (reduced) return;

      /* Hero: scroll-frames canvas settles, masked word-rise headline, fast
         utility reveals at 0.7s. Instrument-fast, per MOTION.md §4. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.md-hero .sf-canvas',
        { scale: 1.06, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 1.4 },
        0
      )
        .fromTo(
          '.md-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.07 },
          0.2
        )
        .fromTo(
          '.md-hero-sub, .md-hero-ctas, .md-hero-stats',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          0.55
        );

      /* Standard reveals: 0.7s, once. */
      gsap.utils.toArray('.md-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.md-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.09,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Counting stat ticks — numbers tween with snap, per MOTION.md §4. */
      gsap.utils.toArray('.md-count').forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          scroller: sc,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 1.1,
              ease: 'power2.out',
              snap: { v: 1 },
              onUpdate: () => {
                el.textContent = `${Math.round(obj.v)}${suffix}`;
              },
            }),
        });
      });

      /* §3.07 Split-flap board: per room row entering viewport, the top flap
         half flips in (rotateX 90 → 0) with a soft scale pulse. ≤0.5s each. */
      gsap.utils.toArray('.md-row').forEach((row) => {
        const top = row.querySelector('.md-flap-top');
        const flip = gsap.timeline({
          scrollTrigger: { trigger: row, scroller: sc, start: 'top 86%', once: true },
        });
        if (top) {
          flip.fromTo(
            top,
            { rotationX: 90 },
            { rotationX: 0, duration: 0.42, ease: 'power2.out', transformPerspective: 520 },
            0
          );
        }
        flip.fromTo(row, { scale: 1.025 }, { scale: 1, duration: 0.48, ease: 'power2.out' }, 0);
      });

      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.md-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Mobile quick-bar slides up once, after the hero. */
      gsap.fromTo(
        '.md-quickbar',
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.md-hero', scroller: sc, start: 'bottom 70%', once: true },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-07-business">
      {/* Utility strip */}
      <div className="md-utility">
        <span>{content.utility.note}</span>
        <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.utility.phone}</a>
      </div>

      {/* Nav — confident utility bar */}
      <header className="md-nav">
        <a className="md-wordmark" href="#hero">
          {name}
        </a>
        <nav className="md-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="md-nav-ctas">
          <a className="md-btn md-btn-ghost" href={content.hero.secondary.href}>
            {content.hero.secondary.label}
          </a>
          <a className="md-btn md-btn-primary" href={content.hero.ctaHref}>
            {content.hero.cta}
          </a>
        </div>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (scroll plays the tower ascent) */}
        <section id="hero" className="md-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt={`The ${name} tower at blue hour, windows lighting up across the steel and glass facade`}
            pinDistance="+=170%"
          >
            <div className="md-hero-shade" aria-hidden="true" />
            <div className="md-hero-copy">
            <p className="md-eyebrow md-eyebrow-light">{content.hero.eyebrow}</p>
            <h1 className="md-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="md-hero-sub">{content.hero.sub}</p>
            <div className="md-hero-ctas">
              <a className="md-btn md-btn-primary" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <a className="md-btn md-btn-outline" href={content.hero.secondary.href}>
                {content.hero.secondary.label}
              </a>
            </div>
            <dl className="md-hero-stats md-stagger">
              {content.hero.stats.map((s) => (
                <div className="md-stat" key={s.label}>
                  <dd className="md-stat-value">
                    <span className="md-count" data-value={s.value} data-suffix={s.suffix}>
                      {s.value}
                      {s.suffix}
                    </span>
                  </dd>
                  <dt className="md-stat-label">{s.label}</dt>
                </div>
              ))}
            </dl>
            </div>
          </ScrollFrames>
        </section>

        {/* EXPRESS BOOKING */}
        <section id="booking" className="md-booking" data-tour="Book in 30 Seconds">
          <div className="md-wrap">
            <p className="md-eyebrow md-rv">{content.booking.eyebrow}</p>
            <h2 className="md-h2 md-rv">{content.booking.title}</h2>
            <p className="md-lead md-rv">{content.booking.sub}</p>
            <span className="md-rule" aria-hidden="true" />
            <BookingWidget />
          </div>
        </section>

        {/* ROOMS — split-flap board index */}
        <section id="rooms" className="md-rooms" data-tour="Room Index">
          <div className="md-wrap">
            <p className="md-eyebrow md-rv">{content.rooms.eyebrow}</p>
            <h2 className="md-h2 md-rv">{content.rooms.title}</h2>
            <div className="md-rooms-head md-rv">
              <p className="md-board-note">{content.rooms.boardNote}</p>
              <figure className="md-rooms-visual">
                <Img
                  k="product-0"
                  src={img('product-0', room1Img)}
                  alt="Essential Business Room: crisp bed, full-height work desk with task lamp beside the window"
                />
              </figure>
            </div>
            <ol className="md-board" aria-label="Room index">
              {content.rooms.items.map((r, i) => (
                <li className="md-row" key={r.code}>
                  <div className="md-flap">
                    <div className="md-flap-top">
                      <span className="md-code">{r.code}</span>
                      <span className="md-fname">{productName(i, r.name)}</span>
                    </div>
                    <div className="md-flap-bot">
                      <span className="md-frate">{price(r.price)}</span>
                      <span className="md-fstatus">Available</span>
                    </div>
                  </div>
                  <div className="md-row-body">
                    <p className="md-row-meta">
                      {r.size} · {r.meta}
                    </p>
                    <p className="md-row-desc">{r.desc}</p>
                    <a className="md-row-cta" href="#booking">
                      Select dates
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="md-work" data-tour="Work & Meetings">
          <div className="md-wrap">
            <p className="md-eyebrow md-rv">{content.work.eyebrow}</p>
            <h2 className="md-h2 md-rv">{content.work.title}</h2>
            <p className="md-lead md-rv">{content.work.body}</p>
            <span className="md-rule" aria-hidden="true" />
            <div className="md-work-grid">
              <div className="md-work-visual md-rv">
                <Img
                  k="product-1"
                  src={img('product-1', room2Img)}
                  alt="Boardroom 12: long conference table, ergonomic chairs, city view at blue hour"
                />
              </div>
              <div>
                <ul className="md-meet-list md-stagger">
                  {content.work.rooms.map((m) => (
                    <li className="md-meet" key={m.name}>
                      <strong>{m.name}</strong>
                      <span>{m.capacity}</span>
                      <span className="md-meet-floor">{m.floor}</span>
                    </li>
                  ))}
                </ul>
                <a className="md-btn md-btn-ghost md-rv" href={content.work.cta.href}>
                  {content.work.cta.label}
                </a>
              </div>
            </div>
            <dl className="md-proof md-stagger">
              {content.work.stats.map((s) => (
                <div className="md-stat md-stat-dark" key={s.label}>
                  <dd className="md-stat-value">
                    <span className="md-count" data-value={s.value} data-suffix={s.suffix}>
                      {s.value}
                      {s.suffix}
                    </span>
                  </dd>
                  <dt className="md-stat-label">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* DINING */}
        <section id="dining" className="md-dining" data-tour="All-Day Dining">
          <div className="md-wrap md-dining-grid">
            <div>
              <p className="md-eyebrow md-rv">{content.dining.eyebrow}</p>
              <h2 className="md-h2 md-rv">{content.dining.title}</h2>
              <span className="md-rule" aria-hidden="true" />
              <ul className="md-dine-list md-stagger">
                {content.dining.points.map((d) => (
                  <li className="md-dine" key={d.name}>
                    <div className="md-dine-head">
                      <h3>{d.name}</h3>
                      <span className="md-dine-time">{d.time}</span>
                    </div>
                    <p>{d.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="md-dining-visual md-rv">
              <Img
                k="product-2"
                src={img('product-2', room3Img)}
                alt="The Daybreak Counter breakfast spread: glass and steel stations with fruit, hot dishes and coffee"
              />
              <figcaption>Breakfast, engineered for the 7:40 flight.</figcaption>
            </figure>
          </div>
        </section>

        {/* LOCATION */}
        <section id="visit" className="md-visit" data-tour="Getting Here">
          <div className="md-wrap">
            <p className="md-eyebrow md-rv">{content.visit.eyebrow}</p>
            <h2 className="md-h2 md-rv">{content.visit.title}</h2>
            <span className="md-rule" aria-hidden="true" />
            <div className="md-visit-grid">
              <ul className="md-times md-stagger">
                {content.visit.times.map((t) => (
                  <li className="md-time" key={t.place}>
                    <strong>{t.time}</strong>
                    <span className="md-time-place">{t.place}</span>
                    <span className="md-time-note">{t.note}</span>
                  </li>
                ))}
              </ul>
              <address className="md-address md-rv">
                <p className="md-address-line">{content.visit.address}</p>
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
                <a href={`mailto:${email}`}>{email}</a>
                <a className="md-btn md-btn-primary" href={mapsUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </address>
            </div>
          </div>
        </section>
      </main>

      <footer className="md-footer">
        <div className="md-wrap md-footer-in">
          <a className="md-wordmark md-wordmark-foot" href="#hero">
            {name}
          </a>
          <nav className="md-foot-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="md-footer-line">{content.footer.line}</p>
          <p className="md-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      <nav className="md-quickbar" aria-label="Quick actions">
        <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>Call</a>
        <a className="md-quickbar-book" href="#booking">
          Book now
        </a>
      </nav>
    </div>
  );
}
