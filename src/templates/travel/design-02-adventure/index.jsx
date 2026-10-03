import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

const FONT_ID = 'tpl-font-design-02-adventure';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`rl-wm ${className}`} aria-label={text}>
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

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const fmtAlt = (m) => `${Math.round(m).toLocaleString('en-IN')}M`;

/* Trek card images: product-0..2 + detail keys, one use each. */
const cardMedia = [
  { key: 'product-2', src: dest3Img, alt: 'Patagonia granite towers under storm light, low sun striking the rock hot orange' },
  { key: 'detail', src: detailImg, alt: 'Worn hiking boot, ice axe and coiled rope resting on dark basalt rock' },
  { key: 'product-1', src: dest2Img, alt: 'Switchback dirt road climbing a stark Ladakh mountain pass' },
  { key: 'product-0', src: dest1Img, alt: 'The Everest base camp trail winding through grey moraine, tiny trekker silhouettes far ahead' },
];

function TrekCard({ trek, index, media }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="rl-trek-card" data-idx={index}>
      <div className="rl-trek-visual rl-frame">
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
        <span className="rl-trek-tag">{trek.tag}</span>
      </div>
      <div className="rl-trek-copy">
        <p className="rl-trek-num">{String(index + 1).padStart(2, '0')} / 04</p>
        <h3 className="rl-trek-name">{productName(index, trek.name)}</h3>
        <p className="rl-trek-meta">
          <span>{trek.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{fmtAlt(trek.altitude)}</span>
          <span aria-hidden="true">·</span>
          <span>{trek.group}</span>
        </p>
        <p className="rl-trek-blurb">{trek.blurb}</p>
        <div className="rl-trek-foot">
          <p className="rl-trek-price">{price(trek.price)}</p>
          <a className="rl-btn rl-btn-small" href="#visit">Book</a>
        </div>
      </div>
    </article>
  );
}

function GearChecklist() {
  const [checked, setChecked] = useState(() => new Set());
  const toggle = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  return (
    <ul className="rl-gear-list">
      {content.gear.items.map((item, i) => {
        const on = checked.has(i);
        return (
          <li key={item}>
            <button
              type="button"
              role="checkbox"
              aria-checked={on}
              className={`rl-gear-item${on ? ' is-on' : ''}`}
              onClick={() => toggle(i)}
            >
              <span className="rl-gear-box" aria-hidden="true" />
              <span>{item}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function Design02Adventure() {
  const { brand, img, contact, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
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

  /* Ascent meter refs */
  const pinRef = useRef(null);
  const cardsRef = useRef(null);
  const meterValueRef = useRef(null);
  const needleRef = useRef(null);
  const bgRef = useRef(null);
  const checkRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* HERO entrance: hard clip-wipe frame + kinetic word slam. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      /* The wipe runs on the canvas itself (inside the pinned stage), never
         on an ancestor of the pin. */
      tl.fromTo(
        '.rl-hero .sf-canvas',
        { clipPath: 'inset(6% 4% 94% 4%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.1,
          ease: 'power4.inOut',
          clearProps: 'clipPath',
        },
        0
      )
        .fromTo(
          '.rl-hero-title .wi',
          { yPercent: 120, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 0.75, ease: 'power4.out', stagger: 0.06 },
          0.35
        )
        .fromTo(
          '.rl-hero-sub, .rl-hero-cta-row, .rl-hero-meter',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.8
        )
        .fromTo('.rl-nav', { yPercent: -110 }, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.2);

      /* Reveals. */
      gsap.utils.toArray('.rl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Section headline slams (word-rise). */
      gsap.utils.toArray('.rl-sec-title .wi').forEach((word) => {
        gsap.fromTo(
          word,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: 'power4.out',
            scrollTrigger: { trigger: word.closest('.rl-sec-title'), scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Clip-wipe frames. */
      gsap.utils.toArray('.rl-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(8% 6% 92% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Orange hairline rules draw. */
      gsap.utils.toArray('.rl-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Departure rows stagger. */
      gsap.utils.toArray('.rl-dep-row').forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 5) * 0.06,
            scrollTrigger: { trigger: row, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* ============ SIGNATURE: THE ASCENT METER ============
         Pinned altimeter climb (desktop). Cards pass through a fixed
         viewport window one at a time — the entering card rises dim and
         desaturated, the active card is crisp and full-colour, others fade.
         Everything is transform / opacity / a colour-matrix filter: no
         per-frame blur or layout writes, so the climb stays at 60fps.
         A proxy tween carries the progress, so the cards, needle and
         readout ease together with the scrub instead of jumping. */
      const pin = pinRef.current;
      const cards = cardsRef.current ? Array.from(cardsRef.current.querySelectorAll('.rl-trek-card')) : [];
      const n = cards.length;
      const { meterStart, meterEnd } = content.treks;
      const ariaState = cards.map(() => null);
      let lastActive = -1;
      let lastAlt = '';

      const renderMeter = (p, bgMax) => {
        const alt = fmtAlt(lerp(meterStart, meterEnd, p));
        if (alt !== lastAlt && meterValueRef.current) {
          lastAlt = alt;
          meterValueRef.current.textContent = alt;
        }
        if (needleRef.current) gsap.set(needleRef.current, { y: 0, yPercent: (1 - p) * 100 });
        if (bgRef.current) gsap.set(bgRef.current, { opacity: p * bgMax });
      };

      const renderAscent = (p) => {
        const t = p * (n - 1);
        const active = Math.round(t);
        cards.forEach((card, i) => {
          const d = t - i;
          const vis = clamp01(1 - Math.abs(d) * 1.45);
          gsap.set(card, {
            opacity: vis,
            scale: 0.9 + vis * 0.1,
            /* explicit px zero: a remount (StrictMode, HMR) can otherwise leave
               the previous percent offset parsed into y, doubling the shift */
            y: 0,
            yPercent: gsap.utils.clamp(-70, 70, -d * 22),
            filter: `saturate(${(0.35 + vis * 0.65).toFixed(3)})`,
            zIndex: 20 - Math.abs(i - active),
            pointerEvents: vis > 0.5 ? 'auto' : 'none',
          });
          const hidden = vis < 0.5;
          if (ariaState[i] !== hidden) {
            ariaState[i] = hidden;
            card.setAttribute('aria-hidden', hidden ? 'true' : 'false');
          }
        });
        renderMeter(p, 0.72);
        if (checkRef.current && active !== lastActive) {
          lastActive = active;
          const trek = content.treks.items[active];
          checkRef.current.textContent = `CHECKPOINT ${String(active + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')} — ${trek.tag.toUpperCase()}`;
        }
      };

      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const climb = { p: 0 };
        const draw = () => renderAscent(climb.p);
        ariaState.fill(null);
        lastActive = -1;
        lastAlt = '';
        renderAscent(0);
        gsap.to(climb, {
          p: 1,
          ease: 'none',
          onUpdate: draw,
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        /* A refresh re-renders tweens with callbacks suppressed — redraw. */
        ScrollTrigger.addEventListener('refresh', draw);
        return () => ScrollTrigger.removeEventListener('refresh', draw);
      });
      /* Mobile: stacked cards, meter climbs alongside them (no pin). */
      mm.add('(max-width: 767px)', () => {
        renderAscentMobileInit();
        const climb = { p: 0 };
        const draw = () => renderMeter(climb.p, 0.5);
        gsap.to(climb, {
          p: 1,
          ease: 'none',
          onUpdate: draw,
          scrollTrigger: {
            trigger: cardsRef.current,
            scroller: sc,
            start: 'top 78%',
            end: 'bottom 42%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        ScrollTrigger.addEventListener('refresh', draw);
        return () => ScrollTrigger.removeEventListener('refresh', draw);
      });

      function renderAscentMobileInit() {
        ariaState.fill(null);
        lastActive = -1;
        cards.forEach((card) => {
          gsap.set(card, { clearProps: 'all' });
          card.setAttribute('aria-hidden', 'false');
        });
        lastAlt = fmtAlt(meterStart);
        if (meterValueRef.current) meterValueRef.current.textContent = lastAlt;
        if (needleRef.current) gsap.set(needleRef.current, { y: 0, yPercent: 100 });
        if (bgRef.current) gsap.set(bgRef.current, { opacity: 0 });
        if (checkRef.current) checkRef.current.textContent = `4 TREKS · ${fmtAlt(meterStart)} — ${fmtAlt(meterEnd)}`;
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}`;

  return (
    <div ref={rootRef} className={`tpl-design-02-adventure${reduced ? ' rl-reduced' : ''}`}>
      <div className="rl-navdock">
        <header className="rl-nav">
          <a className="rl-wordmark" href="#hero">{name}</a>
          <nav className="rl-links" aria-label="Primary">
            {content.nav.map((nv) => (
              <a key={nv.href} href={nv.href}>{nv.label}</a>
            ))}
          </nav>
          <a className="rl-btn rl-btn-nav" href="#visit">Book a seat</a>
        </header>
      </div>

      <main>
        {/* HERO */}
        {/* The copy and meter ride inside the frame stage's overlay, so the
            whole hero pins together while the ridgeline scrubs behind it. */}
        <section id="hero" className="rl-hero" data-tour="The Ridgeline">
          <ScrollFrames
            frames={frames}
            alt="Drone push over a knife-edge Himalayan ridgeline, prayer flags snapping in the foreground, clouds boiling below"
            pinDistance="+=170%"
            className="rl-hero-frames"
          >
            <div className="rl-hero-shade" aria-hidden="true" />
            <div className="rl-hero-copy">
              <p className="rl-eyebrow rl-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="rl-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="rl-hero-sub">{content.hero.sub}</p>
              <div className="rl-hero-cta-row">
                <a className="rl-btn" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="rl-link" href={content.hero.secondaryHref}>{content.hero.secondary}</a>
              </div>
            </div>
            <div className="rl-hero-meter" aria-hidden="true">
              <span className="rl-hero-meter-label">{content.hero.meter.label}</span>
              <span className="rl-hero-meter-value">{content.hero.meter.value}</span>
            </div>
          </ScrollFrames>
        </section>

        {/* TREKS — THE ASCENT METER */}
        <section id="destinations" className="rl-ascent" data-tour="The Ascent">
          <div className="rl-wrap rl-ascent-head">
            <p className="rl-eyebrow rl-rv">{content.treks.eyebrow}</p>
            <h2 className="rl-h2 rl-sec-title">
              <Words text={content.treks.title} />
            </h2>
            <span className="rl-rule" aria-hidden="true" />
            <p className="rl-body rl-rv">{content.treks.intro}</p>
          </div>
          <div ref={pinRef} className="rl-ascent-pin">
            <div className="rl-ascent-bg" ref={bgRef} aria-hidden="true" />
            <div className="rl-ascent-body rl-wrap">
              <aside className="rl-meter" aria-label="Altitude meter">
                <p className="rl-meter-caption">ALT</p>
                <p className="rl-meter-value" ref={meterValueRef}>
                  {reduced ? fmtAlt(content.treks.meterEnd) : fmtAlt(content.treks.meterStart)}
                </p>
                <div className="rl-meter-track" aria-hidden="true">
                  <span className="rl-meter-needle" ref={needleRef} />
                  {[5364, 4900, 4200, 3500, 2800].map((m) => (
                    <span className="rl-meter-tick" key={m} style={{ top: `${(1 - (m - 2800) / (5364 - 2800)) * 100}%` }}>
                      <i>{m.toLocaleString('en-IN')}</i>
                    </span>
                  ))}
                </div>
                <p className="rl-meter-check" ref={checkRef}>
                  {reduced ? `SUMMIT — ${fmtAlt(content.treks.meterEnd)}` : 'CHECKPOINT 01 / 04'}
                </p>
              </aside>
              <div className="rl-stage">
                <span className="rl-gate rl-gate-tl" aria-hidden="true" />
                <span className="rl-gate rl-gate-tr" aria-hidden="true" />
                <span className="rl-gate rl-gate-bl" aria-hidden="true" />
                <span className="rl-gate rl-gate-br" aria-hidden="true" />
                <div className="rl-trek-list" ref={cardsRef}>
                  {content.treks.items.map((trek, i) => (
                    <TrekCard key={trek.name} trek={trek} index={i} media={cardMedia[i]} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ETHOS */}
        <section id="story" className="rl-story" data-tour="Expedition Ethos">
          <div className="rl-wrap">
            <p className="rl-eyebrow rl-rv">{content.story.eyebrow}</p>
            <h2 className="rl-h2 rl-sec-title">
              <Words text={content.story.title} />
            </h2>
            <span className="rl-rule" aria-hidden="true" />
            <div className="rl-story-grid">
              <div>
                {content.story.body.map((p, i) => (
                  <p className="rl-body rl-rv" key={i}>{p}</p>
                ))}
              </div>
              <figure className="rl-wipe rl-frame rl-rv">
                <Img k="detail" src={img('detail', detailImg)} alt="Worn hiking boot, ice axe and coiled rope on dark basalt rock" />
                <figcaption className="rl-caption">Kit that has seen 5,000 metres. Twice.</figcaption>
              </figure>
            </div>
            <dl className="rl-stats">
              {content.story.stats.map((s) => (
                <div className="rl-stat rl-rv" key={s.label}>
                  <dt className="rl-stat-value">{s.value}</dt>
                  <dd className="rl-stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* DEPARTURES */}
        <section id="visit" className="rl-visit" data-tour="Departures">
          <div className="rl-wrap">
            <p className="rl-eyebrow rl-rv">{content.departures.eyebrow}</p>
            <h2 className="rl-h2 rl-sec-title">
              <Words text={content.departures.title} />
            </h2>
            <span className="rl-rule" aria-hidden="true" />
            <p className="rl-body rl-rv">{content.departures.note}</p>
            <div className="rl-dep-table" role="table" aria-label="Expedition departures">
              {content.departures.rows.map((r, i) => (
                <div className="rl-dep-row" role="row" key={`${r.date}-${i}`}>
                  <span className="rl-dep-date" role="cell">{r.date}</span>
                  <span className="rl-dep-trek" role="cell">{productName(100 + i, r.trek)}</span>
                  <span className="rl-dep-days" role="cell">{r.days}</span>
                  <span className={`rl-dep-status is-${r.status}`} role="cell">{r.seats}</span>
                  <a className="rl-dep-book" href="#contact" role="cell" aria-label={`Book ${r.trek} departing ${r.date}`}>Book</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEAR */}
        <section id="craft" className="rl-gear" data-tour="Kit List">
          <div className="rl-wrap">
            <p className="rl-eyebrow rl-rv">{content.gear.eyebrow}</p>
            <h2 className="rl-h2 rl-sec-title">
              <Words text={content.gear.title} />
            </h2>
            <span className="rl-rule" aria-hidden="true" />
            <p className="rl-body rl-rv">{content.gear.note}</p>
            <div className="rl-rv"><GearChecklist /></div>
          </div>
        </section>

        {/* BASECAMP / CONTACT */}
        <section id="contact" className="rl-contact" data-tour="Basecamp">
          <div className="rl-wrap">
            <p className="rl-eyebrow rl-rv">{content.contact.eyebrow}</p>
            <h2 className="rl-h2 rl-sec-title">
              <Words text={content.contact.title} />
            </h2>
            <span className="rl-rule" aria-hidden="true" />
            <p className="rl-body rl-rv">{content.contact.body}</p>
            <div className="rl-contact-grid">
              <address className="rl-address rl-rv">
                {content.contact.address}<br />
                <a href={mapsUrl} target="_blank" rel="noreferrer">Find us on the map</a><br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a><br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <div className="rl-contact-cta rl-rv">
                <p className="rl-contact-hours">{content.contact.hours}</p>
                <a className="rl-btn rl-btn-big" href={`mailto:${email}?subject=Booking%20a%20seat`}>Book a seat</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="rl-footer">
        <div className="rl-wrap rl-footer-inner">
          <p className="rl-wordmark rl-footer-word">{name}</p>
          <p className="rl-footer-line">{content.footer.line}</p>
          <nav className="rl-footer-links" aria-label="Footer">
            {content.nav.map((nv) => (
              <a key={nv.href} href={nv.href}>{nv.label}</a>
            ))}
          </nav>
          <p className="rl-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
