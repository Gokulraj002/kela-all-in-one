import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Signature frames: the morning-rush clip as a scroll-driven sequence —
   the ScrollFrames scrub below replaces the old autoplay video. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-urban';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,900;1,9..144,900&family=Space+Grotesk:wght@400;500;700&display=swap';

/* Server-safe word-mask headline */
function Words({ text, className = '', accentLast = false }) {
  const words = text.split(' ');
  return (
    <span className={`rh-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className={`wi${accentLast && i === words.length - 1 ? ' is-accent' : ''}`}>{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Seamless specials ticker. Driven by the template's single shared marquee
   rAF loop (see Design04Urban): this component only renders the track and
   flags hover state via dataset for the loop to read. */
function Ticker() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const halves = reduced ? [0] : [0, 1];
  const setHover = (v) => {
    if (trackRef.current) trackRef.current.dataset.hover = v ? '1' : '0';
  };

  return (
    <div
      className="rh-ticker"
      role="marquee"
      aria-label="Today's specials"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={trackRef}
        data-marquee="ticker"
        data-speed="70"
        data-dir="-1"
        className={`rh-ticker-track${reduced ? ' is-static' : ''}`}
      >
        {halves.map((h) => (
          <div className="rh-ticker-half" key={h} aria-hidden={h === 1}>
            {content.ticker.map((s, i) => (
              <span className="rh-ticker-item" key={i}>
                <span className="rh-ticker-dot" aria-hidden="true" />
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderSection() {
  const reduced = useReducedMotion();
  const [slot, setSlot] = useState(0);
  const noteRef = useRef(null);
  const pick = (i) => {
    setSlot(i);
    if (!reduced && noteRef.current) {
      gsap.fromTo(noteRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };
  return (
    <section id="order" data-tour="Order Ahead" className="rh-section rh-order">
      <div className="rh-wipe" aria-hidden="true" />
      <div className="rh-wrap">
        <p className="rh-eyebrow rv">{content.order.eyebrow}</p>
        <h2 className="rh-h2 rv">{content.order.title}</h2>
        <p className="rh-sub rv">{content.order.sub}</p>
        <div className="rh-steps">
          {content.order.steps.map((s, i) => (
            <div className="rh-step rv" key={s.n}>
              <span className="rh-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i === 1 && (
                <div className="rh-slots" role="group" aria-label="Pickup time">
                  {content.order.slots.map((t, j) => (
                    <button
                      key={t}
                      className={`rh-slot${slot === j ? ' is-active' : ''}`}
                      aria-pressed={slot === j}
                      onClick={() => pick(j)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="rh-order-note rv" ref={noteRef}>
          Pickup <strong>{content.order.slots[slot]}</strong> · {content.order.note}
        </p>
        <a className="rh-btn rh-btn-solid rv" href="#menu">Start an Order</a>
      </div>
    </section>
  );
}

function LocationsSection() {
  const reduced = useReducedMotion();
  const { contact } = useCustom();
  const [active, setActive] = useState(0);
  const panelRef = useRef(null);
  const loc = content.locations.list[active];
  const phone = contact.phone || loc.phone;
  const switchLoc = (i) => {
    if (i === active) return;
    setActive(i);
    if (!reduced && panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { x: 28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  };
  return (
    <section id="locations" data-tour="Locations" className="rh-section rh-locations">
      <div className="rh-wipe" aria-hidden="true" />
      <div className="rh-wrap">
        <p className="rh-eyebrow rv">{content.locations.eyebrow}</p>
        <h2 className="rh-h2 rv">{content.locations.title}</h2>
        <div className="rh-loc-tabs" role="tablist" aria-label="Locations">
          {content.locations.list.map((l, i) => (
            <button
              key={l.name}
              role="tab"
              aria-selected={active === i}
              className={`rh-loc-tab${active === i ? ' is-active' : ''}`}
              onClick={() => switchLoc(i)}
            >
              {l.name}
              <span>{l.area}</span>
            </button>
          ))}
        </div>
        <div className="rh-loc-panel rv" ref={panelRef} role="tabpanel">
          <div className="rh-loc-info">
            <h3>{loc.name} — {loc.area}</h3>
            <p>{loc.address}</p>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </div>
          <dl className="rh-hours">
            {loc.hours.map(([d, h]) => (
              <div className="rh-hour-row" key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const { productName, price } = useCustom();
  const reduced = useReducedMotion();
  const [cat, setCat] = useState('Hot');
  const [added, setAdded] = useState([]);
  const listRef = useRef(null);
  const key = (c, i) => `${c}-${i}`;
  const choose = (c) => {
    if (c === cat) return;
    setCat(c);
    if (!reduced && listRef.current) {
      gsap.fromTo(listRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
    }
  };
  const toggleAdd = (k) => {
    setAdded((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));
  };
  const shots = [
    { src: menu1Img, k: 'product-0', alt: 'Iced cold brew with milk swirling in a condensation-covered to-go cup' },
    { src: menu2Img, k: 'product-1', alt: 'Twin streams of espresso with golden crema pouring into a glass' },
    { src: menu3Img, k: 'product-2', alt: 'Egg and cheese croissant sandwich in a kraft paper sleeve, steam rising' },
  ];
  return (
    <section id="menu" data-tour="The Menu" className="rh-section rh-menu">
      <div className="rh-wrap">
        <p className="rh-eyebrow rv">{content.menu.eyebrow}</p>
        <h2 className="rh-h2 rv">{content.menu.title}</h2>
        <p className="rh-sub rv">{content.menu.sub}</p>
        <div className="rh-shots">
          {shots.map((s) => (
            <div className="rh-shot rv-img" key={s.k}>
              <Img k={s.k} src={s.src} alt={s.alt} />
            </div>
          ))}
        </div>
        <div className="rh-cats" role="group" aria-label="Menu filter">
          {content.menu.cats.map((c) => (
            <button
              key={c}
              className={`rh-cat${cat === c ? ' is-active' : ''}`}
              aria-pressed={cat === c}
              onClick={() => choose(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="rh-rows" ref={listRef}>
          {content.menu.items[cat].map((item, i) => {
            const k = key(cat, i);
            const isAdded = added.includes(k);
            return (
              <div className="rh-row" key={item.name}>
                <div className="rh-row-main">
                  <h3>{productName(i, item.name)}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="rh-row-price">{price(item.price)}</span>
                <button
                  className={`rh-add${isAdded ? ' is-added' : ''}`}
                  aria-pressed={isAdded}
                  aria-label={`${isAdded ? 'Remove' : 'Add'} ${item.name} to order`}
                  onClick={() => toggleAdd(k)}
                >
                  <span>{isAdded ? 'Added' : 'Add'}</span>
                </button>
              </div>
            );
          })}
        </div>
        <a className="rh-btn rh-btn-solid rv" href="#order">Order Ahead — Skip the Queue</a>
      </div>
    </section>
  );
}

/* Scroll-velocity-accelerated menu marquee. Content duplicated exactly 2x
   for a seamless modulo-half wrap; the template's single shared rAF loop
   (in Design04Urban) multiplies its speed with lerped scroll velocity and
   follows scroll direction. Reduced motion: a static wrapped grid. */
function MenuFlow() {
  const { productName, price } = useCustom();
  const reduced = useReducedMotion();
  const halves = reduced ? [0] : [0, 1];
  const items = [];
  content.menu.cats.forEach((c, ci) => {
    content.menu.items[c].forEach((it, i) => items.push({ cat: c, idx: `${ci}-${i}`, ...it }));
  });
  return (
    <section id="menu-flow" data-tour="Menu in Motion" className="rh-section rh-flow">
      <div className="rh-wrap">
        <p className="rh-eyebrow rv">{content.flow.eyebrow}</p>
        <h2 className="rh-h2 rv">{content.flow.title}</h2>
        <p className="rh-sub rv">{content.flow.sub}</p>
      </div>
      <div className="rh-flow-view" role="marquee" aria-label="Menu items in motion">
        <div
          data-marquee="flow"
          data-speed="90"
          data-dir="-1"
          data-vel="1"
          className={`rh-flow-track${reduced ? ' is-static' : ''}`}
        >
          {halves.map((h) => (
            <div className="rh-flow-half" key={h} aria-hidden={h === 1}>
              {items.map((it) => (
                <article className="rh-flow-card" key={it.idx}>
                  <p className="rh-flow-cat">{it.cat}</p>
                  <h3>{productName(it.idx, it.name)}</h3>
                  <p className="rh-flow-desc">{it.desc}</p>
                  <span className="rh-flow-price">{price(it.price)}</span>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="rh-flow-hint rv">{content.flow.hint}</p>
    </section>
  );
}

export default function Design04Urban() {
  const { brand, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const pillRef = useRef(null);
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = contact.phone || content.contact.phone;

  /* (Signature motion now comes from the ScrollFrames hero scrub below.) */

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* The template's ONE rAF loop. Drives every [data-marquee] track: the
     specials ticker (constant speed, pauses on hover) and the menu flow —
     a scroll-velocity-accelerated marquee whose speed multiplies with
     lerped scroll velocity, whose direction follows the scroll direction,
     and which eases back to base speed when idle. Pauses offscreen and
     when the tab is hidden. */
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;
    const tracks = Array.from(root.querySelectorAll('[data-marquee]')).map((el) => ({
      el,
      speed: parseFloat(el.dataset.speed || '70'),
      velBoost: el.dataset.vel === '1',
      x: 0,
      visible: true,
      lastDir: parseFloat(el.dataset.dir || '-1'),
      boost: 0,
    }));
    if (!tracks.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const t = tracks.find((x) => x.el === e.target);
        if (t) t.visible = e.isIntersecting;
      });
    }, { threshold: 0 });
    tracks.forEach((t) => io.observe(t.el));

    /* Scroll-velocity source for the boosted track. getVelocity() only
       updates while scrolling, so the value decays toward 0 when scroll
       events stop — that's the ease-back-to-base. */
    let rawVel = 0;
    let lastScrollT = 0;
    const flowEl = root.querySelector('.rh-flow');
    const velST = flowEl
      ? ScrollTrigger.create({
          trigger: flowEl,
          scroller: scroller(),
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            rawVel = self.getVelocity();
            lastScrollT = performance.now();
          },
        })
      : null;

    /* Runs on gsap.ticker — the same clock that drives Lenis and the
       scrubbed triggers, so the marquees never fight the scroll for frames. */
    let last = performance.now();
    const step = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!document.hidden) {
        if (now - lastScrollT > 90) rawVel *= Math.exp(-dt * 4);
        for (const t of tracks) {
          if (!t.visible || t.el.dataset.hover === '1') continue;
          let sp = t.speed;
          if (t.velBoost) {
            t.boost += (rawVel - t.boost) * (1 - Math.exp(-dt * 5));
            if (Math.abs(t.boost) > 60) t.lastDir = t.boost > 0 ? 1 : -1;
            sp = t.speed + Math.min(520, Math.abs(t.boost) * 0.32);
          }
          t.x += t.lastDir * sp * dt;
          const half = t.el.scrollWidth / 2;
          if (half > 0) {
            if (t.x <= -half) t.x += half;
            else if (t.x > 0) t.x -= half;
          }
          t.el.style.transform = `translate3d(${t.x.toFixed(1)}px, 0, 0)`;
        }
      }
    };
    gsap.ticker.add(step);
    return () => {
      gsap.ticker.remove(step);
      io.disconnect();
      if (velST) velST.kill();
    };
  }, [reduced, scroller, rootRef]);

  /* ScrollFrames builds its pin in a child useEffect — after the layout
     effect below created the triggers further down the page. Parent effects
     run after child effects, so re-sort and refresh here: every start/end
     then includes the pin spacing. */
  useEffect(() => {
    /* …and once more two frames later: ScrollFrames re-creates its pin when
       its stage height settles (a second commit), which appends it after
       the triggers below it. */
    const run = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    run();
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(run); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: kinetic word slam (0.7s) + diagonal hard wipe on the
         scrub canvas + CTA pill pop. No slow fades near the hero. */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(
        '.rh-hero .sf-canvas',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.7, ease: 'power3.inOut' },
        0
      )
        .fromTo(
          '.rh-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.7, stagger: 0.04 },
          0.05
        )
        .fromTo(
          '.rh-hero-sub, .rh-hero-eyebrow',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.45
        )
        .fromTo(
          '.rh-hero-ctas',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
          0.55
        )
        .fromTo(
          '.rh-badge',
          { opacity: 0, rotate: 8, scale: 0.8 },
          { opacity: 1, rotate: -2, scale: 1, duration: 0.4, ease: 'back.out(2.5)' },
          0.7
        );

      /* Fast snap reveals everywhere else (order/locations are driven by
         the color-block wipe timeline below — never double-animate). */
      gsap.utils.toArray('.rv').forEach((el) => {
        if (el.closest('.rh-order, .rh-locations')) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hard clip reveals on menu shots */
      gsap.utils.toArray('.rv-img').forEach((el, i) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.7,
            ease: 'power3.inOut',
            delay: i * 0.08,
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Full-bleed color-block wipes — at most two per page (order, locations).
         Reduced motion: they become cuts (no overlay animation). */
      gsap.utils.toArray('.rh-wipe').forEach((wipe) => {
        const section = wipe.closest('section');
        const contentEls = section.querySelectorAll('.rh-wrap > *');
        const wt = gsap.timeline({
          scrollTrigger: { trigger: section, scroller: sc, start: 'top 75%', once: true },
        });
        wt.fromTo(
          wipe,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.25, ease: 'power3.inOut' }
        )
          .fromTo(
            contentEls,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05 },
            0.2
          )
          .to(wipe, { scaleX: 0, transformOrigin: 'right center', duration: 0.25, ease: 'power3.inOut' }, 0.28);
      });

      /* Sticky order pill pulse — stops after first tap */
      const pulse = gsap.to('.rh-pill', {
        scale: 1.04,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
      const stop = () => pulse.kill();
      const pill = pillRef.current;
      if (pill) pill.addEventListener('click', stop, { once: true });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-04-urban">
      {/* Nav */}
      <header className="rh-nav">
        <a className="rh-wordmark" href="#hero">{name}</a>
        <nav className="rh-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a ref={pillRef} className="rh-pill" href="#order">Order Ahead</a>
      </header>

      {/* Hero — signature scrub: the morning rush, frame by frame */}
      <section id="hero" data-tour="Hero" className="rh-hero">
        <ScrollFrames
          frames={frames}
          alt="Barista pulling espresso at the machine during the morning rush"
          pinDistance="+=170%"
        >
          <div className="rh-hero-veil" aria-hidden="true" />
          <div className="rh-hero-copy">
            <p className="rh-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="rh-hero-title">
              <Words text={content.hero.title} accentLast />
            </h1>
            <p className="rh-hero-sub">{content.hero.sub}</p>
            <div className="rh-hero-ctas">
              <a className="rh-btn rh-btn-solid" href="#order">{content.hero.cta}</a>
              <a className="rh-btn rh-btn-ghost" href="#locations">{content.hero.ctaSecondary}</a>
            </div>
          </div>
          <span className="rh-badge">{content.hero.badge}</span>
          <p className="rh-scrub-hint" aria-hidden="true">Scroll — the rush plays frame by frame</p>
        </ScrollFrames>
      </section>

      <Ticker />

      <OrderSection />
      <LocationsSection />
      <MenuSection />
      <MenuFlow />

      {/* Daily rhythm */}
      <section id="rhythm" data-tour="Daily Rhythm" className="rh-section rh-rhythm">
        <div className="rh-wrap">
          <p className="rh-eyebrow rv">{content.rhythm.eyebrow}</p>
          <h2 className="rh-h2 rv">{content.rhythm.title}</h2>
          <div className="rh-rhythm-grid">
            {content.rhythm.slots.map((s) => (
              <div className="rh-rhythm-card rv" key={s.time}>
                <span className="rh-rhythm-time">{s.time}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The city */}
      <section id="city" data-tour="The City" className="rh-section rh-city">
        <div className="rh-wrap rh-city-grid">
          <div className="rh-city-media rv-img">
            <Img k="detail" src={detailImg} alt={`${name} storefront glowing on a rainy street at rush hour, commuters passing`} />
          </div>
          <div>
            <p className="rh-eyebrow rv">{content.city.eyebrow}</p>
            <h2 className="rh-h2 rv">{content.city.title}</h2>
            <p className="rh-sub rv">{content.city.body}</p>
            <ul className="rh-city-notes">
              {content.city.notes.map((n) => (
                <li className="rv" key={n}>{n}</li>
              ))}
            </ul>
            <p className="rh-loyalty rv">{content.city.loyalty}</p>
            <a className="rh-btn rh-btn-solid rv" href="#order">Order Ahead</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="rh-footer">
        <div className="rh-wrap">
          <p className="rh-foot-word">{name}</p>
          <div className="rh-foot-locs">
            {content.locations.list.map((l) => (
              <div key={l.name}>
                <h4>{l.name} — {l.area}</h4>
                <p>{l.address}</p>
                {l.hours.map(([d, h]) => (
                  <p key={d} className="rh-foot-hours">{d}: {h}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="rh-foot-contact">
            <a href={`mailto:${email}`}>{email}</a> · <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </p>
          <p className="rh-foot-line">{content.footer.line}</p>
          <p className="rh-foot-note">{content.footer.note}</p>
        </div>
      </footer>

      {/* Mobile bottom tab bar */}
      <nav className="rh-tabbar" aria-label="Quick actions">
        <a href="#menu"><span>Menu</span></a>
        <a href="#order" className="is-primary"><span>Order</span></a>
        <a href="#locations"><span>Locations</span></a>
      </nav>
    </div>
  );
}
