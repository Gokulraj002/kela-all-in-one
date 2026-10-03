import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72 frames scrubbed by scroll (Apple-style). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-rail';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sl-wm ${className}`} aria-label={text}>
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

/* Journey cards: product-0..2 + hero keys, one use each. */
const journeyMedia = [
  {
    key: 'hero',
    src: heroImg,
    alt: 'Aerial view of a green-and-cream Pullman train gliding through misty highland moors at dawn',
  },
  {
    key: 'product-0',
    src: dest1Img,
    alt: 'The Darjeeling toy train, a small red-and-green steam locomotive, curving through tea gardens in morning mist',
  },
  {
    key: 'product-1',
    src: dest2Img,
    alt: 'A luxury houseboat deck on the Kerala backwaters at dawn, still water and palm trees',
  },
  {
    key: 'product-2',
    src: dest3Img,
    alt: 'A deep-red vintage train crossing a grand stone viaduct through green hills',
  },
];

function JourneyCard({ journey, index, media }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="sl-card">
      <div className="sl-card-visual">
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
        <span className="sl-card-tag">{journey.tag}</span>
      </div>
      <div className="sl-card-copy">
        <p className="sl-card-num">{String(index + 1).padStart(2, '0')} / 04</p>
        <h3 className="sl-card-name">{productName(index, journey.name)}</h3>
        <p className="sl-card-dur">{journey.duration}</p>
        <p className="sl-card-blurb">{journey.blurb}</p>
        <div className="sl-card-foot">
          <p className="sl-card-price">
            <span className="sl-card-from">from</span> {price(journey.price)}
          </p>
          <a className="sl-link" href="#contact">Reserve</a>
        </div>
      </div>
    </article>
  );
}

/* Signature mechanic: the window journey. Desktop pins a brass-framed window
   while the landscape (scenery layer at 0.4x, cards at 1x) scrolls past behind
   it. Mobile gets a horizontal snap-swipe; reduced-motion gets a static list. */
function WindowJourney({ reduced }) {
  if (reduced) {
    return (
      <div className="sl-static">
        {content.journeys.items.map((j, i) => (
          <JourneyCard key={j.name} journey={j} index={i} media={journeyMedia[i]} />
        ))}
      </div>
    );
  }
  return (
    <div className="sl-pin">
      <div className="sl-winwrap">
        <div className="sl-scenery" aria-hidden="true">
          <span className="sl-sun" />
          <svg className="sl-mtn" viewBox="0 0 2400 320" preserveAspectRatio="none">
            <path
              d="M0 320 L0 240 L140 150 L260 230 L420 110 L560 210 L700 170 L860 260 L1020 130 L1180 230 L1360 160 L1520 250 L1700 120 L1880 220 L2040 180 L2220 260 L2400 190 L2400 320 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            />
            <path
              d="M0 320 L0 280 L200 200 L380 270 L600 190 L820 280 L1080 210 L1300 290 L1560 200 L1800 280 L2060 220 L2400 280 L2400 320 Z"
              fill="currentColor"
              opacity="0.18"
            />
          </svg>
          <div className="sl-hills" />
        </div>
        <div className="sl-track">
          <div className="sl-lead">
            <p className="sl-eyebrow">{content.journeys.eyebrow}</p>
            <h2 className="sl-h2">
              <Words text={content.journeys.title} />
            </h2>
            <p className="sl-body">{content.journeys.lede}</p>
            <p className="sl-hint" aria-hidden="true">{content.journeys.hint}</p>
          </div>
          {content.journeys.items.map((j, i) => (
            <JourneyCard key={j.name} journey={j} index={i} media={journeyMedia[i]} />
          ))}
          <div className="sl-end">
            <p className="sl-eyebrow">The line continues</p>
            <p className="sl-end-title">New departures chalked every season.</p>
            <a className="sl-btn" href="#contact">Plan your journey</a>
          </div>
        </div>
        <div className="sl-frame" aria-hidden="true">
          <span className="sl-mullion sl-mv" />
          <span className="sl-mullion sl-mh" />
          <span className="sl-speed" />
          <span className="sl-vignette" />
        </div>
        <p className="sl-milepost" aria-hidden="true">
          <span className="sl-mile-label">Mile</span>
          <span className="sl-mile-num">000</span>
        </p>
      </div>
    </div>
  );
}

function PlanForm() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();
  const formRef = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    if (!reduced && formRef.current) {
      gsap.fromTo(
        '.sl-plan-done',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  };
  if (sent) {
    return (
      <div className="sl-plan-done" role="status">
        <p className="sl-eyebrow">Request received</p>
        <h3 className="sl-h3">The travel desk has your note.</h3>
        <p className="sl-body">
          We reply within a day — usually with a timetable attached and a strong
          opinion about window seats.
        </p>
      </div>
    );
  }
  return (
    <form ref={formRef} className="sl-plan-form" onSubmit={submit}>
      <label className="sl-field">
        <span>Name</span>
        <input type="text" name="name" autoComplete="name" required placeholder="Your full name" />
      </label>
      <label className="sl-field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
      </label>
      <div className="sl-field-row">
        <label className="sl-field">
          <span>Journey</span>
          <select name="journey" defaultValue={content.journeys.items[0].name}>
            {content.journeys.items.map((j) => (
              <option key={j.name} value={j.name}>{j.name}</option>
            ))}
          </select>
        </label>
        <label className="sl-field">
          <span>Travellers</span>
          <select name="travellers" defaultValue="2">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </label>
      </div>
      <label className="sl-field">
        <span>Anything we should know</span>
        <textarea name="notes" rows="4" placeholder="Anniversaries, window-seat allegiances, tea preferences…" />
      </label>
      <button type="submit" className="sl-btn sl-btn-brass">Send to the travel desk</button>
    </form>
  );
}

export default function Design09Rail() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = contact.phone || content.contact.phone;

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

      /* Hero entrance: window-blind clip wipe, masked word-rise headline. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sl-hero .sf-stage',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.sl-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 },
          0.4
        )
        .fromTo(
          '.sl-hero-copy .sl-eyebrow, .sl-hero-sub, .sl-hero-cta',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.8
        )
        .fromTo('.sl-ticker', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.2);

      /* The scroll scrub IS the hero motion now — the old gentle parallax is
         retired so it never fights the ScrollFrames pin. */

      /* Timetable-precision reveals. */
      gsap.utils.toArray('.sl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sl-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sl-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(8% 6% 92% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sl-rule').forEach((rule) => {
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

      /* Signature: the window journey. The brass frame stays pinned while the
         scenery (0.4x) and the destination cards (1x) scroll past behind it —
         like looking out of a moving carriage window. Desktop only; mobile
         gets native snap-swipe, reduced-motion gets a static list. */
      const pin = rootRef.current && rootRef.current.querySelector('.sl-pin');
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const wrap = pin.querySelector('.sl-winwrap');
          const track = pin.querySelector('.sl-track');
          const scenery = pin.querySelector('.sl-scenery');
          const mileNum = pin.querySelector('.sl-mile-num');
          const speed = pin.querySelector('.sl-speed');
          const setSpeed = gsap.quickSetter(speed, 'opacity');
          const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
          gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${dist()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (mileNum) {
                  mileNum.textContent = String(Math.round(self.progress * 480)).padStart(3, '0');
                }
                /* Speed lines fade in with scroll velocity — the blur of a fast line. */
                setSpeed(Math.min(0.55, Math.abs(self.getVelocity()) / 4500));
              },
            },
          });
          /* The passing landscape moves slower than the cards — parallax sells the journey. */
          gsap.to(scenery, {
            x: () => -dist() * 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${dist()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const ticks = [...content.hero.ticker, ...content.hero.ticker];

  return (
    <div ref={rootRef} className="tpl-design-09-rail">
      <header className="sl-nav">
        <a className="sl-wordmark" href="#hero">
          <span className="sl-wordmark-name">{name}</span>
          <span className="sl-wordmark-line">{content.brand.line}</span>
        </a>
        <nav className="sl-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="sl-btn sl-btn-brass sl-nav-cta" href="#contact">Reserve</a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="sl-hero" data-tour="Departures">
          <ScrollFrames
            frames={frames}
            alt="Aerial tracking shot of a luxury green-and-cream train gliding through misty highland moors at dawn"
            pinDistance="+=170%"
          >
          <div className="sl-hero-shade" aria-hidden="true" />
          <div className="sl-hero-copy">
            <p className="sl-eyebrow sl-eyebrow-light">{content.hero.eyebrow}</p>
            <h1 className="sl-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="sl-hero-sub">{content.hero.sub}</p>
            <a className="sl-btn sl-btn-brass sl-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
          </div>
          <div className="sl-ticker" aria-hidden="true">
            <div className="sl-ticker-track">
              {ticks.map((t, i) => (
                <span key={i} className="sl-ticker-item">{t}</span>
              ))}
            </div>
          </div>
          </ScrollFrames>
        </section>

        {/* JOURNEYS — the window journey */}
        <section id="journeys" className="sl-journeys" data-tour="Journeys">
          <WindowJourney reduced={reduced} />
        </section>

        {/* TIMETABLE */}
        <section id="timetable" className="sl-table" data-tour="Timetable">
          <div className="sl-wrap">
            <p className="sl-eyebrow sl-eyebrow-light sl-rv">{content.timetable.eyebrow}</p>
            <h2 className="sl-h2 sl-h2-light sl-rv">
              <Words text={content.timetable.title} />
            </h2>
            <span className="sl-rule sl-rule-light" aria-hidden="true" />
            <div className="sl-board sl-rv" role="table" aria-label="Departure timetable">
              <div className="sl-board-head" role="row">
                <span role="columnheader">Route</span>
                <span role="columnheader">Departs</span>
                <span role="columnheader">Duration</span>
                <span role="columnheader">From</span>
                <span role="columnheader">Status</span>
              </div>
              <div className="sl-stagger">
                {content.timetable.rows.map((r) => (
                  <div className="sl-board-row" role="row" key={r.route}>
                    <span className="sl-board-route" role="cell">{productName(content.journeys.items.findIndex((j) => j.name === r.route), r.route)}</span>
                    <span role="cell">{r.day}</span>
                    <span role="cell">{r.duration}</span>
                    <span role="cell">{price(r.from)}</span>
                    <span role="cell"><span className="sl-status">{r.status}</span></span>
                  </div>
                ))}
              </div>
            </div>
            <p className="sl-note sl-rv">{content.timetable.note}</p>
          </div>
        </section>

        {/* OBSERVATION DECK */}
        <section id="observation" className="sl-deck" data-tour="Observation Deck">
          <figure className="sl-deck-fig sl-wipe">
            <Img
              k="detail"
              src={img('detail', detailImg)}
              alt="Macro of polished brass train fittings and a Pullman cabin table set with morning tea"
            />
            <figcaption>{content.deck.caption}</figcaption>
          </figure>
          <div className="sl-deck-copy">
            <p className="sl-eyebrow sl-rv">{content.deck.eyebrow}</p>
            <blockquote className="sl-quote sl-rv">
              <p>{content.deck.quote}</p>
            </blockquote>
            <a className="sl-btn sl-rv" href="#berths">See the berths</a>
          </div>
        </section>

        {/* BERTHS */}
        <section id="berths" className="sl-berths" data-tour="Berths">
          <div className="sl-wrap">
            <p className="sl-eyebrow sl-rv">{content.berths.eyebrow}</p>
            <h2 className="sl-h2 sl-rv">
              <Words text={content.berths.title} />
            </h2>
            <span className="sl-rule" aria-hidden="true" />
            <div className="sl-berth-grid sl-stagger">
              {content.berths.classes.map((b, i) => (
                <article className="sl-berth" key={b.name}>
                  <p className="sl-berth-num">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="sl-h3">{productName(10 + i, b.name)}</h3>
                  <p className="sl-body">{b.blurb}</p>
                  <ul className="sl-perks">
                    {b.perks.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="sl-berth-price">
                    <span className="sl-card-from">from</span> {price(b.price)}
                  </p>
                  <a className="sl-link" href="#contact">Reserve this berth</a>
                </article>
              ))}
            </div>
            <p className="sl-note sl-rv">{content.berths.note}</p>
          </div>
        </section>

        {/* PLAN / CONTACT */}
        <section id="contact" className="sl-contact" data-tour="Plan Your Journey">
          <div className="sl-wrap sl-contact-grid">
            <div>
              <p className="sl-eyebrow sl-rv">{content.contact.eyebrow}</p>
              <h2 className="sl-h2 sl-rv">
                <Words text={content.contact.title} />
              </h2>
              <span className="sl-rule" aria-hidden="true" />
              <p className="sl-body sl-rv">{content.contact.body}</p>
              <address className="sl-address sl-rv">
                {content.contact.address}
                <br />
                <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
            </div>
            <div className="sl-rv">
              <PlanForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="sl-footer">
        <p className="sl-footer-word">{name}</p>
        <nav className="sl-footer-links" aria-label="Footer">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <p className="sl-footer-line">{content.footer.line}</p>
        <p className="sl-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
