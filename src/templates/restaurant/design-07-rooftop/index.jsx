import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

/* Signature sequence: scroll-driven frames ("Golden pour" — hero background). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

/* Word-mask split for wordRise headlines (JSX-side). */
function Words({ text }) {
  const parts = text.split(' ');
  return (
    <span aria-label={text}>
      {parts.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true"><span className="wi">{w}</span></span>
          {i < parts.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

const DISH_IMGS = [
  { img: dish1Img, k: 'product-0', alt: 'Burrata with heirloom tomatoes and basil on a dark plate in dusk light' },
  { img: dish2Img, k: 'product-1', alt: 'Tuna tartare served in crisp sesame cones on dark slate' },
  { img: dish3Img, k: 'product-2', alt: 'Molten chocolate fondant with a restrained dusting of gold' },
];

export default function Design07Rooftop() {
  const { brand, price, currency, contact, productName, img } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const insta = contact.instagram;

  /* ---- fonts (once) ---- */
  useEffect(() => {
    const id = 'tpl-font-design-07-rooftop';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Italiana&family=Jost:wght@300;400;500;600&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const scrollToId = (id) => {
    const el = rootRef.current && rootRef.current.querySelector('#' + id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  /* ---- reserve form state ---- */
  const [rsv, setRsv] = useState({ name: '', date: '', guests: '2 guests', slot: content.reserve.slots[2] });
  const [sent, setSent] = useState(false);

  /* ---- scroll motion ---- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // final state; nothing hidden in CSS
      const sc = scroller();
      const coarse = window.matchMedia('(pointer: coarse)').matches;

      {/* hero: warm edge-light wipe over the scrub sequence */}
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.sf-stage',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power4.inOut' });
      tl.fromTo('.hero-edge',
        { left: '0%', opacity: 1 },
        { left: '100%', duration: 1.6, ease: 'power4.inOut' }, 0.1);
      tl.to('.hero-edge', { opacity: 0, duration: 0.4 }, '-=0.4');

      /* hero headline word-rise, stagger 0.08 */
      gsap.fromTo('.hero-title .wi',
        { yPercent: 112 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.08, delay: 0.7 });
      gsap.fromTo('.hero-fade',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 1.15 });

      /* house reveals */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });

      /* golden-hour band: champagne rule draws across on entry */
      gsap.utils.toArray('.gold-rule').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, {
          scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 82%', once: true },
        });
      });

      /* M7 — Focus-pull ascent: each card rises from below a "horizon"
         while finding focus — y, blur, scale scrubbed per card. */
      const rise = coarse ? 60 : 120;
      const soft = coarse ? 'blur(4px)' : 'blur(8px)';
      gsap.utils.toArray('.fp-card').forEach((el) => {
        gsap.fromTo(el,
          { y: rise, filter: soft, scale: 1.04 },
          {
            y: 0, filter: 'blur(0px)', scale: 1, ease: 'none',
            scrollTrigger: {
              trigger: el, scroller: sc,
              start: 'top 96%', end: 'top 52%', scrub: 0.6,
            },
          });
      });

      /* the view: slow inner drift on the skyline feature */
      const vimg = rootRef.current.querySelector('.view-img .a-img img, .view-img img');
      if (vimg) {
        gsap.fromTo(vimg, { yPercent: -8 }, {
          yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: '.view-media', scroller: sc, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={'tpl-design-07-rooftop' + (reduced ? ' is-reduced' : '')}>
      {/* ---------- nav ---------- */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
            {brandName}
          </a>
          <nav className="nav-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); scrollToId(n.href.slice(1)); }}>{n.label}</a>
            ))}
          </nav>
          <button className="btn" type="button" onClick={() => scrollToId('reserve')}>
            Reserve golden hour
          </button>
        </div>
      </header>

      {/* ---------- hero: scroll-scrubbed "Golden pour" sequence ---------- */}
      <section id="hero" className="hero" data-tour="Golden Hour">
        <ScrollFrames
          frames={frames}
          alt="Amber cocktail pouring over large ice at golden hour, city bokeh breathing behind"
          pinDistance="+=170%"
        >
          <span className="hero-edge" aria-hidden="true" />
          <span className="hero-scrim" aria-hidden="true" />
          <div className="wrap hero-content">
            <p className="eyebrow hero-fade">{content.hero.eyebrow}</p>
            <h1 className="hero-title"><Words text={content.hero.title} /></h1>
            <p className="hero-sub hero-fade">{content.hero.sub}</p>
            <div className="hero-ctas hero-fade">
              <button className="btn" type="button" onClick={() => scrollToId('reserve')}>{content.hero.cta}</button>
              <button className="btn btn-ghost" type="button" onClick={() => scrollToId('menu')}>See the sips</button>
            </div>
            <p className="hero-note hero-fade">{content.hero.note}</p>
          </div>
          <span className="hero-time" aria-hidden="true">5 — 7 PM</span>
        </ScrollFrames>
      </section>

      {/* ---------- the golden hour ---------- */}
      <section id="story" className="section hour" data-tour="The Golden Hour Ritual">
        <div className="wrap">
          <div className="hour-head">
            <p className="eyebrow rv">{content.hour.eyebrow}</p>
            <div className="hour-title-row">
              <h2 className="sec-title rv">{content.hour.title}</h2>
              <span className="hour-time rv">{content.hour.time}</span>
            </div>
            <span className="gold-rule" aria-hidden="true" />
            {content.hour.body.map((p, i) => (
              <p className="hour-body rv" key={i}>{p}</p>
            ))}
          </div>
          <div className="ritual-grid">
            {content.hour.rituals.map((r, i) => (
              <article className="ritual-card rv" key={r.title}>
                <span className="ritual-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sips & plates ---------- */}
      <section id="menu" className="section" data-tour="Sips & Plates">
        <div className="wrap">
          <p className="eyebrow rv">{content.menu.eyebrow}</p>
          <h2 className="sec-title rv">{content.menu.title}</h2>
          <p className="sec-sub rv">{content.menu.sub}</p>

          <div className="sip-grid">
            {content.cocktails.map((c, i) => (
              <article className="fp-card sip-card" key={c.name}>
                <div className="fp-inner">
                  <span className="sip-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {c.tag ? <span className="sip-tag">{c.tag}</span> : null}
                  <h3>{productName(i, c.name)}</h3>
                  <p className="sip-specs">{c.specs}</p>
                  <span className="sip-price">{price(c.price)}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="plates-head">
            <h3 className="plates-title rv">Small plates, golden hours</h3>
            <p className="plates-note rv">Made for sharing between sips — out of the kitchen until midnight.</p>
          </div>
          <div className="plate-grid">
            {DISH_IMGS.map((d, i) => {
              const p = content.plates[i];
              return (
                <article className="fp-card plate-card" key={p.name}>
                  <div className="fp-inner">
                    <div className="plate-frame">
                      <Img k={d.k} src={img(d.k, d.img)} alt={d.alt} />
                    </div>
                    <div className="plate-body">
                      <h3>{productName(8 + i, p.name)}</h3>
                      <p>{p.desc}</p>
                      <span className="sip-price">{price(p.price)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
            <article className="fp-card plate-card plate-board" key={content.plates[3].name}>
              <div className="fp-inner">
                <div className="plate-body board-body">
                  <span className="sip-tag">For the table</span>
                  <h3>{productName(11, content.plates[3].name)}</h3>
                  <p>{content.plates[3].desc}</p>
                  <span className="sip-price">{price(content.plates[3].price)}</span>
                  <p className="board-note">Served five to midnight · add a bottle of champagne, {price(6500)}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- the view ---------- */}
      <section id="gallery" className="section view" data-tour="The View">
        <div className="view-media">
          <div className="view-img">
            <Img k="detail" src={img('detail', detailImg)} alt="Bartender pouring an amber cocktail backlit by golden hour, city bokeh glowing behind" />
          </div>
          <span className="hero-scrim" aria-hidden="true" />
        </div>
        <div className="wrap view-content">
          <p className="eyebrow rv">{content.view.eyebrow}</p>
          <h2 className="sec-title rv">{content.view.title}</h2>
          {content.view.body.map((p, i) => (
            <p className="view-body rv" key={i}>{p}</p>
          ))}
          <div className="view-stats">
            {content.view.stats.map((s) => (
              <div className="view-stat rv" key={s.label}>
                <span className="view-value">{s.value}</span>
                <span className="view-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- private skies ---------- */}
      <section id="craft" className="section" data-tour="Private Skies">
        <div className="wrap">
          <p className="eyebrow rv">{content.events.eyebrow}</p>
          <h2 className="sec-title rv">{content.events.title}</h2>
          <p className="sec-sub rv">{content.events.body}</p>
          <div className="event-grid">
            {content.events.items.map((e) => (
              <article className="event-card rv" key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <span className="event-price">from {price(e.price)}</span>
              </article>
            ))}
          </div>
          <p className="events-note rv">{content.events.note}</p>
        </div>
      </section>

      {/* ---------- reserve ---------- */}
      <section id="reserve" className="section reserve" data-tour="Reserve">
        <div className="wrap reserve-grid">
          <div>
            <p className="eyebrow rv">{content.reserve.eyebrow}</p>
            <h2 className="sec-title rv">{content.reserve.title}</h2>
            <p className="sec-sub rv">{content.reserve.body}</p>
            <ul className="reserve-hours rv">
              {content.contact.hours.map((h) => (
                <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
              ))}
            </ul>
          </div>
          <div className="reserve-panel rv">
            {!sent ? (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                aria-label="Reserve a table"
              >
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text" required placeholder="Your name"
                    value={rsv.name} onChange={(e) => setRsv({ ...rsv, name: e.target.value })}
                  />
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Date</span>
                    <input
                      type="date" required
                      value={rsv.date} onChange={(e) => setRsv({ ...rsv, date: e.target.value })}
                    />
                  </label>
                  <label className="field">
                    <span>Guests</span>
                    <select value={rsv.guests} onChange={(e) => setRsv({ ...rsv, guests: e.target.value })}>
                      {['2 guests', '3 – 4 guests', '5 – 8 guests', '9+ guests (events)'].map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <span className="field">
                  <span>Arrival</span>
                  <div className="slot-row" role="radiogroup" aria-label="Arrival time">
                    {content.reserve.slots.map((s) => (
                      <button
                        key={s} type="button" role="radio" aria-checked={rsv.slot === s}
                        className={'slot' + (rsv.slot === s ? ' sel' : '')}
                        onClick={() => setRsv({ ...rsv, slot: s })}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </span>
                <button className="btn btn-block" type="submit">Hold the light</button>
                <p className="reserve-micro">No card required · confirmed within the hour</p>
              </form>
            ) : (
              <div className="reserve-done" aria-live="polite">
                <span className="gold-rule" aria-hidden="true" style={{ transform: 'scaleX(1)' }} />
                <h3>{content.reserve.successTitle}</h3>
                <p>{content.reserve.successBody}</p>
                <p className="reserve-echo">{rsv.name}{rsv.name ? ' · ' : ''}{rsv.guests} · {rsv.slot}</p>
                <button className="btn btn-ghost" type="button" onClick={() => setSent(false)}>Change request</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <span className="wordmark">{brandName}</span>
              <p className="footer-tag">{content.brand.tagline}</p>
            </div>
            <div>
              <h4>Find us</h4>
              <address>
                {content.contact.address.map((l) => <span key={l}>{l}</span>)}
                <a href={'tel:' + content.contact.phone.replace(/\s/g, '')}>{content.contact.phone}</a>
              </address>
            </div>
            <div>
              <h4>Write to us</h4>
              <ul>
                <li><a href={'mailto:' + email}>{email}</a></li>
                {insta ? <li><a href={insta}>Instagram</a></li> : null}
                <li>Prices in {currency === '₹' ? 'INR' : currency}</li>
              </ul>
            </div>
          </div>
          <span className="gold-rule" aria-hidden="true" style={{ transform: 'scaleX(1)' }} />
          <div className="footer-bottom">
            <span>{content.footer.line.replace(content.brand.name, brandName)}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
