import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

/* product-3 (the fourth drop piece, the neon-rail jacket) falls back to the
   rooftop jacket shot — without it the card rendered an empty, broken image. */
const IMG_FALLBACK = { hero: heroImg, 'product-0': look1Img, 'product-1': look2Img, 'product-2': look3Img, 'product-3': heroImg, detail: detailImg };

/* Fixed drop target: module-level so it never resets mid-session */
const DROP_TARGET = Date.now() + (2 * 24 * 3600 + 13 * 3600 + 42 * 60 + 10) * 1000;

/* Live-feel drop countdown */
function useDropCountdown() {
  const [now, setNow] = useState(() => Date.now());
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [reduced]);
  const ms = Math.max(0, DROP_TARGET - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`;
}

/* The ticking clock lives in its own tiny component: only this <strong>
   re-renders each second, not the whole page (which used to re-render —
   and reconcile every section — once a second while you scrolled). */
function Countdown() {
  const countdown = useDropCountdown();
  return <strong>{countdown}</strong>;
}

function DropCard({ piece, i, productName, price, img }) {
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);
  const name = productName(i, piece.name);
  const sizes = ['S', 'M', 'L', 'XL'];
  return (
    <article className="sd4-dropcard sd4-rv">
      <div className="sd4-dropcard-img sd4-wipe">
        <span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" />
        <Img k={`product-${i}`} src={img(`product-${i}`, IMG_FALLBACK[`product-${i}`])}
          alt={`${name} — ${piece.fit}`} />
        {piece.tag && <span className="sd4-card-tag">{piece.tag}</span>}
      </div>
      <div className="sd4-dropcard-body">
        <div className="sd4-dropcard-row">
          <h3>{name}</h3>
          <span className="sd4-stock">{piece.stock} LEFT</span>
        </div>
        <p className="sd4-fabric">{piece.fabric}</p>
        <p className="sd4-fit">{piece.fit}</p>
        <div className="sd4-sizes" role="group" aria-label={`Size for ${name}`}>
          {sizes.map((s) => (
            <button key={s} type="button" className={size === s ? 'on' : ''}
              onClick={() => setSize(s)} aria-pressed={size === s}>{s}</button>
          ))}
        </div>
        <div className="sd4-dropcard-foot">
          <span className="sd4-price">{price(piece.price)}</span>
          <button type="button" className={`sd4-quickadd${added ? ' added' : ''}`}
            onClick={() => setAdded(true)}>
            {added ? 'ADDED' : 'QUICK ADD +'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function SadakStreet() {
  const { brand, img, price, productName, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;
  const contactEmail = contact.email || content.contact.email;
  /* the platform passes a full profile URL, content.js a @handle */
  const instaRaw = contact.instagram || content.contact.instagram;
  const instaHandle = `@${String(instaRaw).replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').replace(/\/$/, '')}`;
  const instaUrl = `https://instagram.com/${instaHandle.slice(1)}`;

  /* Fonts: Anton + Space Grotesk, unique link id */
  useEffect(() => {
    const id = 'tpl-font-design-04-sadak';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  /* The sticky countdown strip + nav overlays the top of the page; the pinned
     runway parks just below it. Its height is published as --sd4-top so the
     pinned stage can be exactly "visible area minus header". */
  useEffect(() => {
    const root = rootRef.current;
    const bar = root && root.querySelector('.sd4-topbar');
    if (!bar || typeof ResizeObserver === 'undefined') return undefined;
    const publish = () => root.style.setProperty('--sd4-top', `${Math.round(bar.getBoundingClientRect().height)}px`);
    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [rootRef]);

  /* ScrollFrames builds its pin in a child effect, after the triggers below
     were measured. Re-sort + re-measure once everything is mounted and when
     the webfonts land, so triggers sit in document order (viewer + export). */
  useEffect(() => {
    let alive = true;
    const remeasure = () => {
      if (!alive) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const raf = requestAnimationFrame(remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure).catch(() => {});
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // CSS fallback: everything visible, wipes become cuts

      /* HERO ENTRANCE — kinetic slam: wordRise via masks, power4.out, 0.7s total */
      gsap.fromTo('.sd4-hero .sd4-mask > span',
        { yPercent: 112 },
        { yPercent: 0, duration: 0.7, stagger: 0.04, ease: 'power4.out' });
      /* chromatic snap on the final word — split in the brand accent */
      const acc = (rootRef.current && getComputedStyle(rootRef.current).getPropertyValue('--color-accent').trim()) || '#E8442E';
      gsap.fromTo('.sd4-hero .sd4-final',
        { textShadow: `6px 0 0 ${acc}, -6px 0 0 #00e5ff` },
        { textShadow: `0px 0 0 ${acc}, 0px 0 0 #00e5ff`, duration: 0.5, ease: 'power4.out', delay: 0.55, clearProps: 'textShadow' });
      /* CTA pill pop — clearProps hands transform back to the CSS hover */
      gsap.fromTo('.sd4-hero .sd4-cta-pill',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.4, ease: 'back.out(2)', clearProps: 'transform' });

      /* SCROLL REVEALS — fast drapeSettle override: y -20, 0.6s, power2.out.
         clearProps: the drop cards' hover lift is plain CSS afterwards. */
      gsap.utils.toArray('.sd4-rv').forEach((el) => {
        gsap.fromTo(el, { y: -20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'transform',
          scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
        });
      });

      /* WEFT WIPE — hard 6-band reveals, 0.6s */
      gsap.utils.toArray('.sd4-wipe').forEach((wipe) => {
        const bands = wipe.querySelectorAll('.sd4-wipe-band');
        const im = wipe.querySelector('img');
        gsap.set(bands, { scaleX: 1, transformOrigin: 'left center' });
        if (im) gsap.set(im, { opacity: 0 });
        ScrollTrigger.create({
          trigger: wipe, scroller: scroller(), start: 'top 82%', once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(bands, { scaleX: 0, transformOrigin: 'right center', duration: 0.6, stagger: 0.05, ease: 'power3.inOut' });
            if (im) tl.to(im, { opacity: 1, duration: 0.3 }, 0.35);
          },
        });
      });

      /* INK-BLOCK SECTION WIPE — max twice per page: before counters + before stores */
      gsap.utils.toArray('.sd4-blockwipe').forEach((sec) => {
        const panel = sec.querySelector('.sd4-blockwipe-panel');
        ScrollTrigger.create({
          trigger: sec, scroller: scroller(), start: 'top 75%', once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.fromTo(panel, { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.25, ease: 'power3.in' });
            tl.set(panel, { transformOrigin: 'right center' });
            tl.to(panel, { scaleX: 0, duration: 0.25, ease: 'power3.out' });
            tl.fromTo(sec.querySelectorAll('.sd4-rv-in'),
              { y: -20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 0.15);
          },
        });
      });

      /* Stock counters — count up on enter */
      gsap.utils.toArray('.sd4-count-num').forEach((el) => {
        const end = parseFloat(el.dataset.count || '0');
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el, scroller: scroller(), start: 'top 85%', once: true,
          onEnter: () => gsap.to(obj, {
            v: end, duration: 1, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.v); },
          }),
        });
      });

      /* ============ RUNWAY WALK — pinned, ≥768px, 3 depth lanes ============
         Runners travel in stage pixels (measured on every refresh), from just
         past the right edge to just past the left edge, so each lane really
         crosses the whole runway. Speed = distance / duration: the near lane
         covers the most ground in the least time, the far lane the least in
         the most. The mid look stops dead-centre for its name card. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const stage = rootRef.current && rootRef.current.querySelector('.sd4-runway-pin');
        if (!stage) return undefined;
        const q = gsap.utils.selector(stage);
        const W = () => stage.clientWidth;
        const w = (sel) => { const el = q(sel)[0]; return el ? el.offsetWidth : 0; };
        const enter = () => W() + 24;                          // fully off the right edge
        const exit = (sel) => () => -(w(sel) + 48);            // fully off the left edge
        const centre = () => (W() - w('.rw-runner-mid')) / 2;  // mid look, dead centre
        const top = () => {
          const bar = rootRef.current && rootRef.current.querySelector('.sd4-topbar');
          return bar ? Math.round(bar.getBoundingClientRect().height) : 0;
        };

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage, scroller: scroller(),
            /* park under the sticky countdown + nav instead of behind it */
            start: () => `top ${top()}px`,
            end: '+=300%', scrub: 0.8, pin: true,
            anticipatePin: 1, invalidateOnRefresh: true,
            /* refreshPriority → every refresh sorts triggers by page position,
               so this pin is measured after the hero's ScrollFrames pin. */
            refreshPriority: 0,
          },
        });
        /* NEAR lane — fastest, biggest, with ghost smear (30% opacity offset dup) */
        tl.fromTo('.rw-runner-near', { x: enter }, { x: exit('.rw-runner-near'), duration: 0.6 }, 0);
        /* FAR lane — slowest, smallest, slight parallax lag */
        tl.fromTo('.rw-runner-far', { x: enter }, { x: exit('.rw-runner-far'), duration: 0.7 }, 0.3);
        /* MID lane — crosses to centre, PAUSES for its name card, then continues */
        tl.fromTo('.rw-runner-mid', { x: enter }, { x: centre, duration: 0.25 }, 0.15);
        tl.fromTo('.rw-namecard', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.05 }, 0.4);
        tl.to('.rw-namecard', { opacity: 0, y: -12, duration: 0.05 }, 0.55);
        tl.to('.rw-runner-mid', { x: exit('.rw-runner-mid'), duration: 0.25 }, 0.55);
        /* collection-name frame counter-zooms slightly against the motion */
        tl.fromTo('.rw-frame-tag', { scale: 1 }, { scale: 1.06, duration: 1 }, 0);
        return undefined;
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);
  const looks = content.runway.looks;

  /* In-page links (#drop, #lookbook …) glide through the platform's Lenis
     (viewer: .tpl-scope.__lenis, export: window.__lenis) and park below the
     sticky countdown + nav; #hero means the very top. */
  const onAnchor = (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !rootRef.current || !rootRef.current.contains(a)) return;
    const id = a.getAttribute('href').slice(1);
    const el = id && rootRef.current.querySelector(`#${id}`);
    if (!el) return;
    e.preventDefault();
    const sc = scroller();
    const lenis = (sc && sc.__lenis) || window.__lenis;
    const bar = rootRef.current.querySelector('.sd4-topbar');
    const offset = -(bar ? bar.getBoundingClientRect().height : 0);
    const target = id === 'hero' ? 0 : el;
    if (lenis && !reduced) lenis.scrollTo(target, { duration: 1.2, offset: id === 'hero' ? 0 : offset });
    else if (id === 'hero') (sc === window ? window : sc).scrollTo({ top: 0 });
    else el.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={rootRef} className="tpl-design-04-sadak" onClick={onAnchor}>
      {/* COUNTDOWN STRIP + NAV — one sticky stack */}
      <div className="sd4-topbar">
      <div className="sd4-strip" role="status" aria-label="Drop countdown">
        <span className="sd4-strip-blink" /> DROP 07 CLOSES IN&nbsp;
        <Countdown />&nbsp;· NO RESTOCKS
      </div>

      {/* NAV */}
      <nav className="sd4-nav" aria-label="Primary">
        <a className="sd4-wordmark" href="#hero">{brandName}</a>
        <div className="sd4-nav-links">
          {content.nav.map((n) => (
            <a key={n} href={`#${n === 'Drop' ? 'drop' : n === 'Lookbook' ? 'lookbook' : n === 'Codes' ? 'codes' : 'stores'}`}>{n}</a>
          ))}
        </div>
        <a className="sd4-nav-pill" href="#drop">SHOP THE DROP</a>
      </nav>
      </div>

      {/* HERO */}
      <header id="hero" className="sd4-hero" data-tour="The Drop">
        <ScrollFrames frames={frames} alt="Fabric Snap — streetwear fabric snap" pinDistance="+=170%">
        <div className="sd4-hero-shade" aria-hidden="true" />
        <div className="sd4-hero-inner">
          <p className="sd4-eyebrow sd4-rv">{content.hero.eyebrow}</p>
          <h1 className="sd4-hero-title">
            <span className="sd4-mask"><span>{content.hero.titleA}</span></span>
            <span className="sd4-mask"><span className="sd4-final">{content.hero.titleB}</span></span>
          </h1>
          <p className="sd4-hero-sub sd4-rv">{content.hero.sub}</p>
          <div className="sd4-hero-ctas">
            <a className="sd4-cta-pill" href="#drop">{content.hero.cta}</a>
            <a className="sd4-cta-ghost" href="#droplist">{content.hero.altCta}</a>
          </div>
          <div className="sd4-hero-count sd4-rv">
            <span>CLOSES IN</span>
            <Countdown />
          </div>
        </div>
        <div className="sd4-hero-sticker" aria-hidden="true">Nº07</div>
        </ScrollFrames>
      </header>

      {/* TICKER */}
      <div className="sd4-ticker" aria-hidden="true">
        <div className="sd4-ticker-track">
          {[0, 1].map((n) => (
            <span key={n} className="sd4-ticker-run">
              {content.hero.titleB} ✕ DROP 07 LIVE ✕ NO RESTOCKS ✕ BORN ON THE SADAK ✕ COP IT OR CRY ✕&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* THE DROP */}
      <section id="drop" className="sd4-section sd4-drop" data-tour="The Latest Drop">
        <p className="sd4-kicker sd4-rv">{content.drop.kicker}</p>
        <h2 className="sd4-h2 sd4-rv">{content.drop.title}</h2>
        <p className="sd4-lede sd4-rv">{content.drop.line}</p>
        <div className="sd4-dropgrid">
          {content.drop.pieces.map((p, i) => (
            <DropCard key={p.name} piece={p} i={i}
              productName={productName} price={price} img={img} />
          ))}
        </div>
      </section>

      {/* ============ RUNWAY WALK ============ */}
      <section id="runway" className="sd4-runway" data-tour="The Runway">
        <div className="sd4-runway-head sd4-rv">
          <p className="sd4-kicker">{content.runway.kicker}</p>
          <h2 className="sd4-h2">{content.runway.collection}</h2>
          <p className="sd4-lede">{content.runway.note}</p>
        </div>

        {/* Desktop: pinned runway with 3 depth lanes */}
        <div className="sd4-runway-pin">
          <div className="rw-frame" aria-hidden="true">
            <span className="rw-corner tl" /><span className="rw-corner tr" />
            <span className="rw-corner bl" /><span className="rw-corner br" />
          </div>
          <p className="rw-backdrop" aria-hidden="true">{content.runway.collection.split('—').pop().trim()}</p>
          <div className="rw-frame-tag">
            <span>{content.runway.collection}</span>
          </div>

          {/* FAR lane — slow, small */}
          <div className="rw-lane rw-lane-far">
            <figure className="rw-runner rw-runner-far">
              <Img k="product-2" src={img('product-2', look3Img)}
                alt="Look 03 — neon rail bandhgala jacket in a night lane" />
            </figure>
          </div>

          {/* MID lane — center-stage look, pauses at 50% for name card */}
          <div className="rw-lane rw-lane-mid">
            <figure className="rw-runner rw-runner-mid">
              <Img k="product-1" src={img('product-1', look2Img)}
                alt="Look 02 — dhoti-cargo parachute pants in rain" />
            </figure>
          </div>
          <div className="rw-namecard" aria-hidden="true">
            <strong>LOOK 02 — DHOTI CARGO</strong>
            <span>Parachute hems · rain-slick asphalt</span>
          </div>

          {/* NEAR lane — fast, big, ghost smear */}
          <div className="rw-lane rw-lane-near">
            <figure className="rw-runner rw-runner-near">
              <span className="rw-ghost" aria-hidden="true">
                <Img k="product-0" src={img('product-0', look1Img)} alt="" />
              </span>
              <Img k="product-0" src={img('product-0', look1Img)}
                alt="Look 01 — graphic kurta street jacket, snap in wind" />
            </figure>
          </div>

          <p className="rw-hint" aria-hidden="true">SCROLL — THE CITY WALKS PAST YOU</p>
        </div>

        {/* Mobile / reduced-motion: static look grid */}
        <div className="sd4-runway-static">
          {looks.map((l) => (
            <figure key={l.img} className="sd4-lookcard">
              <Img k={l.img} src={img(l.img, IMG_FALLBACK[l.img])} alt={l.name} />
              <figcaption><strong>{l.name}</strong><span>{l.note}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LOOKBOOK */}
      <section id="lookbook" className="sd4-section" data-tour="The Lookbook">
        <p className="sd4-kicker sd4-rv">{content.lookbook.kicker}</p>
        <h2 className="sd4-h2 sd4-rv">{content.lookbook.title}</h2>
        <p className="sd4-lede sd4-rv">{content.lookbook.note}</p>
        <div className="sd4-lookgrid">
          {content.lookbook.shots.map((s) => (
            <figure key={s.img} className="sd4-lookcard sd4-wipe sd4-rv">
              <span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" /><span className="sd4-wipe-band" />
              <Img k={s.img} src={img(s.img, IMG_FALLBACK[s.img])}
                alt={`${brandName} lookbook — ${s.cap}`} />
              <figcaption>{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* COUNTERS */}
      <section className="sd4-section sd4-counters sd4-blockwipe">
        <span className="sd4-blockwipe-panel" aria-hidden="true" />
        <p className="sd4-kicker sd4-rv-in">{content.counters.kicker}</p>
        <div className="sd4-countgrid">
          {content.counters.items.map((c) => (
            <div key={c.label} className="sd4-count sd4-rv-in">
              <strong><span className="sd4-count-num" data-count={c.num}>0</span>{c.suffix}</strong>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FUSION CODES */}
      <section id="codes" className="sd4-section">
        <p className="sd4-kicker sd4-rv">{content.codes.kicker}</p>
        <h2 className="sd4-h2 sd4-rv">{content.codes.title}</h2>
        <div className="sd4-codes">
          {content.codes.items.map((c, i) => (
            <article key={c.code} className={`sd4-code sd4-rv${i === 1 ? ' sd4-code-flip' : ''}`}>
              <span className="sd4-code-num">{c.code}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        <div className="sd4-codes-cta sd4-rv">
          <a className="sd4-cta-pill" href="#drop">Shop the drop</a>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="sd4-section sd4-archive">
        <p className="sd4-kicker sd4-rv">{content.archive.kicker}</p>
        <h2 className="sd4-h2 sd4-h2-outline sd4-rv">{content.archive.title}</h2>
        <p className="sd4-lede sd4-rv">{content.archive.note}</p>
        <ul className="sd4-archlist">
          {content.archive.drops.map((d) => (
            <li key={d.name} className="sd4-rv">
              <span className="sd4-arch-name">{d.name}</span>
              <span className="sd4-arch-stat">{d.stat}</span>
              <span className="sd4-arch-sold">SOLD OUT</span>
            </li>
          ))}
        </ul>
      </section>

      {/* STORES */}
      <section id="stores" className="sd4-section sd4-stores sd4-blockwipe" data-tour="The Stores">
        <span className="sd4-blockwipe-panel" aria-hidden="true" />
        <p className="sd4-kicker sd4-rv-in">{content.stores.kicker}</p>
        <h2 className="sd4-h2 sd4-rv-in">{content.stores.title}</h2>
        <div className="sd4-storegrid">
          {content.stores.shops.map((s) => (
            <article key={s.city} className="sd4-store sd4-rv-in">
              <h3>{s.city}</h3>
              <p className="sd4-store-area">{s.area}</p>
              <p className="sd4-store-hours">{s.hours}</p>
              <a className="sd4-cta-ghost" href="#drop">Shop the drop</a>
            </article>
          ))}
        </div>
      </section>

      {/* DROP LIST */}
      <section id="droplist" className="sd4-section sd4-droplist">
        <p className="sd4-kicker sd4-rv">{content.droplist.kicker}</p>
        <h2 className="sd4-h2 sd4-rv">{content.droplist.title}</h2>
        <p className="sd4-lede sd4-rv">{content.droplist.body}</p>
        <form className="sd4-form sd4-rv" onSubmit={(e) => e.preventDefault()}>
          <label className="sd4-field">
            <span>PHONE / EMAIL</span>
            <input type="text" name="contact" placeholder="you@street.in" required />
          </label>
          <label className="sd4-field">
            <span>CITY</span>
            <select name="city" defaultValue="Mumbai">
              {content.droplist.cities.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <button type="submit" className="sd4-cta-pill">{content.droplist.cta}</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="sd4-footer">
        <p className="sd4-footer-big">{brandName}</p>
        <p className="sd4-footer-line">{content.footer.line}</p>
        <div className="sd4-footer-cols">
          <div>
            <strong>STOCKISTS</strong>
            <span>Mumbai — Bandra West</span>
            <span>New Delhi — Hauz Khas Village</span>
            <span>Bengaluru — Indiranagar</span>
          </div>
          <div>
            <strong>REACH US</strong>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href={instaUrl} target="_blank" rel="noreferrer">{instaHandle}</a>
            <a className="sd4-cta-pill" href="#drop">Shop the drop</a>
          </div>
          <div>
            <strong>THE FINE PRINT</strong>
            {content.footer.links.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>
        <p className="sd4-footer-copy">{content.footer.copy}</p>
      </footer>

      {/* MOBILE TAB BAR */}
      <nav className="sd4-tabbar" aria-label="Mobile">
        <a href="#drop">DROP</a>
        <a href="#lookbook">LOOKBOOK</a>
        <a href="#droplist">PING ME</a>
      </nav>
    </div>
  );
}
