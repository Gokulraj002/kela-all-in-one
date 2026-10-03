import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence for the signature pour (replaces the old autoplay clip). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-scandi';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Instrument+Sans:ital,wght@0,300..700;1,300..700&display=swap';

/* One shared 4s sine rAF loop drives every breathing divider on the page.
   Max one loop per template; paused per-divider offscreen and on document.hidden. */
const breathRegistry = new Set();
let breathRaf = null;
let breathT0 = 0;
function breathTick(t) {
  if (!breathT0) breathT0 = t;
  const s = 1 + 0.15 * Math.sin(((t - breathT0) / 4000) * Math.PI * 2);
  breathRegistry.forEach((rec) => {
    if (rec.visible && !document.hidden && rec.dot) {
      rec.dot.style.transform = `scale(${s.toFixed(4)})`;
    }
  });
  breathRaf = requestAnimationFrame(breathTick);
}
function breathRegister(rec) {
  breathRegistry.add(rec);
  if (!breathRaf) {
    breathT0 = 0;
    breathRaf = requestAnimationFrame(breathTick);
  }
}
function breathUnregister(rec) {
  breathRegistry.delete(rec);
  if (breathRegistry.size === 0 && breathRaf) {
    cancelAnimationFrame(breathRaf);
    breathRaf = null;
  }
}

function Breather({ reduced }) {
  const ref = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    if (reduced || !ref.current) return undefined;
    const rec = { dot: dotRef.current, visible: true };
    const io = new IntersectionObserver(
      ([entry]) => {
        rec.visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(ref.current);
    breathRegister(rec);
    return () => {
      io.disconnect();
      breathUnregister(rec);
    };
  }, [reduced]);
  return (
    <div ref={ref} className="fj-breath" aria-hidden="true">
      <span className="fj-breath-line" />
      <span ref={dotRef} className="fj-breath-dot" />
      <span className="fj-breath-line" />
    </div>
  );
}

/* Menu by moment, as a calm horizontal snap carousel. One whisper-thin
   progress hairline + moment dots track the swipe (rAF-throttled scroll
   listener, direct DOM writes — no re-renders mid-swipe). Reduced-motion
   renders every moment stacked and fully visible. */
const momentMedia = [
  { src: menu2Img, key: 'product-1', alt: 'Slow pour-over brewing in a glass dripper, steam rising' },
  { src: menu1Img, key: 'product-0', alt: 'Cardamom bun on a handmade ceramic plate' },
  { src: detailImg, key: 'detail', alt: 'Handmade ceramic cup of coffee on linen in window light' },
];

function MomentPanel({ m, index }) {
  const { productName, price, img } = useCustom();
  const media = momentMedia[index];
  return (
    <div className="fj-car-panel-inner">
      <div className="fj-car-img">
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
      </div>
      <div>
        <p className="fj-eyebrow fj-car-panel-eyebrow">{m.label}</p>
        <p className="fj-car-note">{m.note}</p>
        <ul className="fj-dishes">
          {m.items.map((item, i) => (
            <li key={item.name}>
              <div className="fj-dish-head">
                <h4>{productName(index * 10 + i, item.name)}</h4>
                <span className="fj-dish-price">{price(item.price)}</span>
              </div>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MomentCarousel({ reduced }) {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (reduced) return undefined;
    const track = trackRef.current;
    const fill = fillRef.current;
    const root = rootRef.current;
    if (!track || !fill || !root) return undefined;
    let raf = 0;
    const sync = () => {
      raf = 0;
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 0;
      fill.style.transform = `scaleX(${p.toFixed(4)})`;
      const idx = Math.min(content.moments.length - 1, Math.round(p * (content.moments.length - 1)));
      root.querySelectorAll('.fj-car-dot, .fj-car-tab').forEach((el) => {
        el.classList.toggle('is-active', Number(el.dataset.i) === idx);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(sync);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    sync();
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="fj-moments-static">
        {content.moments.map((m, i) => (
          <section className="fj-car-static-panel" aria-label={m.label} key={m.id}>
            <MomentPanel m={m} index={i} />
          </section>
        ))}
      </div>
    );
  }

  const goTo = (i) => {
    const track = trackRef.current;
    const panel = track && track.children[i];
    if (panel) panel.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div ref={rootRef} className="fj-car">
      <div className="fj-car-tabs" aria-label="Menu by moment">
        {content.moments.map((m, i) => (
          <button
            key={m.id}
            data-i={i}
            className={`fj-car-tab${i === 0 ? ' is-active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Show the ${m.label} menu`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div ref={trackRef} className="fj-car-track">
        {content.moments.map((m, i) => (
          <section className="fj-car-panel" aria-label={m.label} key={m.id}>
            <MomentPanel m={m} index={i} />
          </section>
        ))}
      </div>
      <div className="fj-car-meta" aria-hidden="true">
        <div className="fj-car-dots">
          {content.moments.map((m, i) => (
            <span key={m.id} data-i={i} className={`fj-car-dot${i === 0 ? ' is-active' : ''}`} />
          ))}
        </div>
        <div className="fj-car-progress">
          <span ref={fillRef} className="fj-car-progress-fill" />
        </div>
      </div>
    </div>
  );
}

function RoomGallery({ reduced }) {
  const { img } = useCustom();
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (reduced) return undefined;
    const el = wrapRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (el) io.observe(el);
    const id = setInterval(() => {
      if (!pausedRef.current && !document.hidden) {
        setActive((a) => (a === 0 ? 1 : 0));
      }
    }, 6000);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className="fj-gallery">
      <div className={`fj-slide${active === 0 ? ' is-active' : ''}`}>
        <Img k="hero" src={img('hero', heroImg)} alt="Pale birch interior of the café in soft daylight, empty and serene" />
      </div>
      <div className={`fj-slide${active === 1 ? ' is-active' : ''}`}>
        <Img k="detail" src={img('detail', detailImg)} alt="Ceramic cup on a linen cloth beside a bright window" />
      </div>
    </div>
  );
}

export default function Design03Scandi() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;

  /* Daylight-aware hero tint, computed once on load. CSS-only transition. */
  const tint = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 5 && h < 9) return 'rgba(94, 122, 140, 0.10)';
    if (h >= 9 && h < 16) return 'rgba(255, 255, 255, 0)';
    if (h >= 16 && h < 20) return 'rgba(185, 154, 107, 0.12)';
    return 'rgba(51, 56, 59, 0.10)';
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
      /* Hero: a single 1.6s opacity fade on the scrub stage; headline fades 0.6s later.
         No mask, no wipe, no rise. */
      gsap.fromTo('.sf-stage', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'sine.out' });
      gsap.fromTo(
        '.fj-hero-copy > *',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'sine.out', stagger: 0.15, delay: 0.6 }
      );
      /* Opacity-only steamRise: long, barely-there fades. Nothing moves. */
      gsap.utils.toArray('.fj-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-03-scandi">
      <header className="fj-nav">
        <a className="fj-wordmark" href="#hero">{name}</a>
        <nav className="fj-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — pinned scroll-driven frame scrub (ScrollFrames). The signature
            gooseneck pour-over clip plays frame-by-frame as the visitor scrolls;
            the hero copy overlays the sequence, bottom-center. */}
        <section id="hero" className="fj-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="A gooseneck kettle pouring a slow spiral over a coffee dripper, utterly calm"
            pinDistance="+=170%"
          >
            <span className="fj-tint" style={{ background: tint }} aria-hidden="true" />
            <div className="fj-hero-copy">
              <p className="fj-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="fj-hero-title">{content.hero.title}</h1>
              <p className="fj-lede">{content.hero.sub}</p>
              <a className="fj-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <p className="fj-scrub-hint" aria-hidden="true">Scroll — the pour plays frame by frame</p>
          </ScrollFrames>
        </section>

        {/* RITUAL */}
        <section id="story" className="fj-section" data-tour="The Fika Ritual">
          <div className="fj-narrow">
            <p className="fj-eyebrow fj-rv">{content.ritual.eyebrow}</p>
            <h2 className="fj-h2 fj-rv">{content.ritual.title}</h2>
            {content.ritual.body.map((p, i) => (
              <p className="fj-body fj-rv" key={i}>{p}</p>
            ))}
            <div className="fj-ritual-img fj-rv">
              <Img k="product-2" src={img('product-2', menu3Img)} alt="Open rye sandwich on a ceramic plate in soft window light" />
            </div>
            <ul className="fj-times">
              {content.ritual.points.map((pt) => (
                <li className="fj-rv" key={pt.time}>
                  <span className="fj-time">{pt.time}</span>
                  <span>{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Breather reduced={reduced} />

        {/* MENU BY MOMENT */}
        <section id="menu" className="fj-section" data-tour="Menu by Moment">
          <div className="fj-narrow">
            <p className="fj-eyebrow fj-rv">The menu</p>
            <h2 className="fj-h2 fj-rv">Ordered by the hour, not the category.</h2>
            <div className="fj-rv"><MomentCarousel reduced={reduced} /></div>
          </div>
        </section>

        <Breather reduced={reduced} />

        {/* DAYLIGHT & SEASONS */}
        <section id="craft" className="fj-section fj-panel" data-tour="Daylight & Seasons">
          <div className="fj-narrow">
            <p className="fj-eyebrow fj-rv">{content.seasons.eyebrow}</p>
            <h2 className="fj-h2 fj-rv">{content.seasons.title}</h2>
            <ul className="fj-seasons">
              {content.seasons.lines.map((s) => (
                <li className="fj-rv" key={s.season}>
                  <span className="fj-season">{s.season}</span>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="fj-seasonal fj-rv">{content.seasons.seasonal}</p>
          </div>
        </section>

        <Breather reduced={reduced} />

        {/* THE ROOM */}
        <section id="gallery" className="fj-section" data-tour="The Room">
          <div className="fj-narrow">
            <p className="fj-eyebrow fj-rv">{content.room.eyebrow}</p>
            <h2 className="fj-h2 fj-rv">{content.room.title}</h2>
            <div className="fj-rv"><RoomGallery reduced={reduced} /></div>
            <ul className="fj-materials fj-rv">
              {content.room.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="fj-note fj-rv">{content.room.note}</p>
          </div>
        </section>

        <Breather reduced={reduced} />

        {/* VISIT */}
        <section id="visit" className="fj-section" data-tour="Visit">
          <div className="fj-narrow fj-visit">
            <p className="fj-eyebrow fj-rv">{content.visit.eyebrow}</p>
            <h2 className="fj-h2 fj-rv">{content.visit.title}</h2>
            <address className="fj-address fj-rv">
              {content.visit.address}<br />
              <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a><br />
              <a href={`mailto:${email}`}>{email}</a>
            </address>
            <ul className="fj-hours fj-rv">
              {content.visit.hours.map((h) => (
                <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
              ))}
            </ul>
            <p className="fj-note fj-rv">{content.visit.note}</p>
          </div>
        </section>
      </main>

      <footer className="fj-footer">
        <p className="fj-footer-line">{content.footer.line}</p>
        <p className="fj-whisper">{content.footer.whisper}</p>
      </footer>
    </div>
  );
}
