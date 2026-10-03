import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72 frames replace the old hero video (Apple-style
   scrub through a pinned section — see ScrollFrames in ../../_shared). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-palace';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap';

/* image-key → bundled fallback (platform uploads win via img()) */
const SUITE_FALLBACK = {
  'product-0': room1Img,
  'product-1': room2Img,
  'product-2': room3Img,
  'product-3': detailImg,
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = String(text).split(' ');
  return (
    <span className={`pal-wm ${className}`} aria-label={text}>
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

const isoDay = (d) => d.toISOString().slice(0, 10);

/* Booking defaults, computed once at module load (not during render). */
const BOOK_TODAY = isoDay(new Date());
const BOOK_CI = isoDay(new Date(Date.now() + 7 * 864e5));
const BOOK_CO = isoDay(new Date(Date.now() + 9 * 864e5));

/* Sticky booking bar: dates + guests, live night-count and rate math.
   Desktop: sticky under the nav. Mobile: fixed bottom compact bar. */
function BookingBar() {
  const { price, contact, brand } = useCustom();
  const email = contact.email || content.visit.email;
  const name = brand || content.brand.name;
  const [ci, setCi] = useState(BOOK_CI);
  const [co, setCo] = useState(BOOK_CO);
  const [guests, setGuests] = useState(2);

  const nights = Math.max(0, Math.round((new Date(co) - new Date(ci)) / 864e5));
  const base = Math.min(...content.suites.rooms.map((r) => r.price));
  const mailto =
    `mailto:${email}?subject=${encodeURIComponent(`Reservation request — ${name}`)}` +
    `&body=${encodeURIComponent(`Check-in: ${ci}\nCheck-out: ${co}\nGuests: ${guests}\nNights: ${nights}\nEstimated from: ${price(base * Math.max(nights, 1))}`)}`;

  return (
    <div id="booking" className="pal-bookbar" role="region" aria-label="Check availability">
      <div className="pal-bookbar-full">
        <p className="pal-bookbar-title">{content.booking.title}</p>
        <label className="pal-field">
          <span>Check-in</span>
          <input type="date" value={ci} min={BOOK_TODAY} onChange={(e) => setCi(e.target.value)} />
        </label>
        <label className="pal-field">
          <span>Check-out</span>
          <input type="date" value={co} min={ci} onChange={(e) => setCo(e.target.value)} />
        </label>
        <label className="pal-field">
          <span>Guests</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map((g) => (
              <option key={g} value={g}>{g} {g === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </label>
        <p className="pal-bookbar-rate" aria-live="polite">
          {nights > 0 ? (
            <>
              <span className="pal-rate-line">{price(base)} <em>×</em> {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span className="pal-rate-total">{price(base * nights)}</span>
              <span className="pal-rate-note">from · incl. breakfast</span>
            </>
          ) : (
            <span className="pal-rate-note">Choose dates to see your rate</span>
          )}
        </p>
        <a className="pal-cta pal-bookbar-cta" href={mailto}>Reserve</a>
      </div>
      <div className="pal-bookbar-compact">
        <p className="pal-compact-rate">
          {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'} · from ${price(base * nights)}` : name}
        </p>
        <a className="pal-cta pal-compact-cta" href={mailto}>Reserve</a>
      </div>
    </div>
  );
}

export default function Design01Palace() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

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

      /* HERO — §4 01 palace: frame-canvas slow scale 1.08→1 over 2.5s,
         gold rule draw, masked word-rise headline. */
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('.sf-canvas', { scale: 1.08 }, { scale: 1, duration: 2.5, ease: 'power2.out' }, 0)
        .fromTo('.pal-rule-hero', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, 0.5)
        .fromTo(
          '.pal-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.07 },
          0.55
        )
        .fromTo(
          '.pal-hero-eyebrow, .pal-hero-sub, .pal-hero-cta',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.13 },
          1.05
        );

      /* (hero parallax drift removed: the hero is now a pinned ScrollFrames
         scrub — the pin owns its scroll behavior) */

      /* Light-first reveals: slow opacity + gentle y drift. Nothing pops. */
      gsap.utils.toArray('.pal-rv').forEach((el) => {
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
      gsap.utils.toArray('.pal-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Gold hairline rules draw between sections — the palace's dividers. */
      gsap.utils.toArray('.pal-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Curtain-wipe on framed images (legend, dining). */
      gsap.utils.toArray('.pal-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(6% 4% 94% 4%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* SIGNATURE §3.01 — "Grand curtain reveal".
         Pinned section; suites revealed one by one by a theatrical
         double-curtain clip-path wipe: top + bottom panels retract
         symmetrically (inset(0 0 50% 0) → inset(0 0 100% 0) and
         inset(50% 0 0 0) → inset(100% 0 0 0)), scrubbed across the pin.
         Suite name rises masked beneath. Desktop ≥768px only, resize-safe
         via gsap.matchMedia; mobile/reduced get the stacked static layout. */
      const curtain = rootRef.current && rootRef.current.querySelector('.pal-curtain');
      if (curtain) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const slides = gsap.utils.toArray('.pal-slide', curtain);
          curtain.classList.add('is-theatre');

          /* Suites stack in the stage. Suite 1 waits on top with its curtains
             closed; the later suites wait beneath it (fully rendered, simply
             covered) and each is lifted to the top when its turn comes. */
          /* curtains rest just parted — a sliver of the suite shows through */
          const CLOSED_TOP = 'inset(0% 0% 56% 0%)';
          const CLOSED_BOT = 'inset(56% 0% 0% 0%)';
          slides.forEach((s, i) => {
            gsap.set(s, { zIndex: i === 0 ? 2 : 1 });
            gsap.set(s.querySelector('.pal-pan-top'), { clipPath: CLOSED_TOP });
            gsap.set(s.querySelector('.pal-pan-bot'), { clipPath: CLOSED_BOT });
          });
          /* only the suite on stage hides its copy until the curtains part */
          gsap.set(slides[0].querySelectorAll('.pal-slide-name .wi'), { yPercent: 110 });
          gsap.set(slides[0].querySelectorAll('.pal-slide-fade'), { opacity: 0, y: 26 });

          const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            scrollTrigger: {
              trigger: curtain,
              scroller: sc,
              start: 'top top',
              end: () => `+=${slides.length * 120}%`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          slides.forEach((s, i) => {
            const pos = i;
            if (i > 0) {
              /* lift this suite above the previous one, copy hidden behind
                 its still-closed curtains */
              tl.set(s, { zIndex: i + 2 }, pos);
              tl.set(s.querySelectorAll('.pal-slide-name .wi'), { yPercent: 110 }, pos);
              tl.set(s.querySelectorAll('.pal-slide-fade'), { opacity: 0, y: 26 }, pos);
            }
            tl.fromTo(
              s.querySelector('.pal-pan-top'),
              { clipPath: CLOSED_TOP },
              { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.45 },
              pos
            );
            tl.fromTo(
              s.querySelector('.pal-pan-bot'),
              { clipPath: CLOSED_BOT },
              { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.45 },
              pos
            );
            tl.to(
              s.querySelectorAll('.pal-slide-name .wi'),
              { yPercent: 0, duration: 0.4, ease: 'power3.out', stagger: 0.05 },
              pos + 0.42
            );
            tl.to(
              s.querySelectorAll('.pal-slide-fade'),
              { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.08 },
              pos + 0.58
            );
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-01-palace">
      {/* NAV — centered crest monogram, serif links, gold Reserve CTA.
          Zero-height sticky shell: overlays the hero and stays inside the
          scroll area (a fixed bar would sit over the viewer toolbar). */}
      <div className="pal-navshell">
        <header className="pal-nav">
          <a className="pal-crest" href="#hero" aria-label={`${name} — home`}>
            <span className="pal-crest-mono"><span className="pal-crest-letters">{content.brand.monogram}</span></span>
          </a>
          <a className="pal-wordmark" href="#hero">{name}</a>
          <nav className="pal-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="pal-cta pal-nav-cta" href="#booking">Reserve</a>
        </header>
      </div>

      <main>
        {/* HERO — scroll-driven frame sequence (replaces the hero loop mp4).
            ScrollFrames pins the stage for +=170% of scroll; the frame
            sequence scrubs as the visitor scrolls (Apple-style). */}
        <ScrollFrames
          frames={frames}
          alt="Palace façade at golden hour — fountain in the foreground, warm haze, water catching the light"
          pinDistance="+=170%"
        >
          <section id="hero" className="pal-hero" data-tour="Welcome">
            <div className="pal-hero-scrim" aria-hidden="true" />
            <div className="pal-hero-copy">
              <p className="pal-eyebrow pal-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="pal-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <span className="pal-rule pal-rule-hero" aria-hidden="true" />
              <p className="pal-hero-sub">{content.hero.sub}</p>
              <a className="pal-cta pal-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
          </section>
        </ScrollFrames>

        {/* STICKY BOOKING BAR */}
        <BookingBar />

        {/* LEGEND — three beats */}
        <section id="legend" className="pal-legend" data-tour="The Legend">
          <div className="pal-wrap">
            <p className="pal-eyebrow pal-rv">{content.legend.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.legend.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <div className="pal-legend-grid">
              <div className="pal-wipe pal-frame">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Carved sandstone jharokha arch — sunlight streaming through latticework onto marble"
                />
              </div>
              <ol className="pal-beats pal-stagger">
                {content.legend.beats.map((b) => (
                  <li className="pal-beat" key={b.year}>
                    <span className="pal-beat-year">{b.year}</span>
                    <h3 className="pal-beat-title">{b.title}</h3>
                    <p className="pal-body">{b.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SUITES — grand curtain reveal */}
        <section id="suites" className="pal-suites" data-tour="The Suites">
          <div className="pal-wrap pal-suites-head">
            <p className="pal-eyebrow pal-rv">{content.suites.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.suites.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <p className="pal-body pal-rv pal-curtain-note">{content.suites.hint}</p>
          </div>
          <div className="pal-curtain">
            <div className="pal-curtain-stage">
              {content.suites.rooms.map((r, i) => (
                <article className="pal-slide" key={r.name} aria-label={productName(i, r.name)}>
                  <div className="pal-slide-img">
                    <Img k={r.imgKey} src={img(r.imgKey, SUITE_FALLBACK[r.imgKey])} alt={r.alt} />
                  </div>
                  <div className="pal-pan pal-pan-top" aria-hidden="true" />
                  <div className="pal-pan pal-pan-bot" aria-hidden="true" />
                  <div className="pal-slide-scrim" aria-hidden="true" />
                  <div className="pal-slide-copy">
                    <p className="pal-slide-num pal-slide-fade">{String(i + 1).padStart(2, '0')} / {String(content.suites.rooms.length).padStart(2, '0')}</p>
                    <h3 className="pal-slide-name">
                      <Words text={productName(i, r.name)} />
                    </h3>
                    <p className="pal-slide-meta pal-slide-fade">{r.size} · {r.wing}</p>
                    <p className="pal-slide-desc pal-slide-fade">{r.desc}</p>
                    <p className="pal-slide-rate pal-slide-fade">
                      <span className="pal-rate-from">From</span> {price(r.price)} <span className="pal-rate-per">per night</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DINING */}
        <section id="dining" className="pal-dining" data-tour="Dining">
          <div className="pal-wrap">
            <p className="pal-eyebrow pal-rv">{content.dining.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.dining.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <div className="pal-dining-grid">
              <div className="pal-wipe pal-frame">
                <Img
                  k="product-2"
                  src={img('product-2', room3Img)}
                  alt="Candlelit durbar hall restaurant — long tables on brass, mirrored pillars in warm glow"
                />
              </div>
              <ul className="pal-dine-list pal-stagger">
                {content.dining.restaurants.map((d) => (
                  <li className="pal-dine" key={d.name}>
                    <div className="pal-dine-head">
                      <h3 className="pal-h3">{d.name}</h3>
                      <p className="pal-dine-cuisine">{d.cuisine} · {d.time}</p>
                    </div>
                    <p className="pal-body">{d.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="pal-rv"><a className="pal-cta pal-cta-ghost" href={`mailto:${email}?subject=${encodeURIComponent(`Table reservation — ${name}`)}`}>{content.dining.cta}</a></p>
          </div>
        </section>

        {/* EXPERIENCES */}
        <section id="experiences" className="pal-experiences" data-tour="Experiences">
          <div className="pal-wrap">
            <p className="pal-eyebrow pal-rv">{content.experiences.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.experiences.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <ol className="pal-exp-list pal-stagger">
              {content.experiences.items.map((x, i) => (
                <li className="pal-exp" key={x.name}>
                  <span className="pal-exp-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="pal-h3">{x.name}</h3>
                  <p className="pal-body">{x.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WEDDINGS TEASER */}
        <section id="weddings" className="pal-weddings" data-tour="Weddings">
          <div className="pal-wrap pal-weddings-inner">
            <p className="pal-eyebrow pal-rv">{content.weddings.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.weddings.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <p className="pal-body pal-rv pal-weddings-text">{content.weddings.text}</p>
            <p className="pal-weddings-stat pal-rv">{content.weddings.stat}</p>
            <p className="pal-rv">
              <a className="pal-cta" href={`mailto:${email}?subject=${encodeURIComponent(`Wedding enquiry — ${name}`)}`}>{content.weddings.cta}</a>
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="pal-testimonials" data-tour="Guest Book">
          <div className="pal-wrap">
            <p className="pal-eyebrow pal-rv">{content.testimonials.eyebrow}</p>
            <h2 className="pal-h2 pal-rv">{content.testimonials.title}</h2>
            <span className="pal-rule" aria-hidden="true" />
            <div className="pal-quotes pal-stagger">
              {content.testimonials.quotes.map((q) => (
                <figure className="pal-quote" key={q.name}>
                  <blockquote className="pal-quote-text">“{q.text}”</blockquote>
                  <figcaption className="pal-quote-who">
                    <span className="pal-quote-name">{q.name}</span>
                    <span className="pal-quote-detail">{q.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTICAL / LOCATION */}
        <section id="visit" className="pal-visit" data-tour="Getting Here">
          <div className="pal-wrap pal-visit-grid">
            <div>
              <p className="pal-eyebrow pal-rv">{content.visit.eyebrow}</p>
              <h2 className="pal-h2 pal-rv">{content.visit.title}</h2>
              <span className="pal-rule" aria-hidden="true" />
              <address className="pal-address pal-rv">
                {content.visit.address}<br />
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a><br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <p className="pal-body pal-rv">{content.visit.directions}</p>
              <p className="pal-rv"><a className="pal-cta pal-cta-ghost" href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a></p>
            </div>
            <div className="pal-practical pal-rv">
              <h3 className="pal-h3">Good to know</h3>
              <ul className="pal-practical-list">
                <li><span>Check-in</span><span>{content.visit.checkin}</span></li>
                <li><span>Check-out</span><span>{content.visit.checkout}</span></li>
                <li><span>Suites</span><span>42 suites &amp; chambers</span></li>
                <li><span>Dining</span><span>3 restaurants</span></li>
                <li><span>Airport</span><span>25 min · Buick on request</span></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="pal-footer">
        <div className="pal-wrap pal-footer-inner">
          <a className="pal-crest pal-crest-sm" href="#hero" aria-label={`${name} — home`}>
            <span className="pal-crest-mono"><span className="pal-crest-letters">{content.brand.monogram}</span></span>
          </a>
          <p className="pal-footer-name">{name}</p>
          <nav className="pal-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <p className="pal-footer-line">{content.footer.line}</p>
          <p className="pal-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
