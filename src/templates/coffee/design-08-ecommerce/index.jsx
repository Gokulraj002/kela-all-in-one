import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';

/* signature frame sequence ("The pour"): 72 extracted frames, scrubbed by scroll */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FB = { hero: heroImg, 'product-1': menu1Img, 'product-2': menu2Img };

function priceInBucket(p, id) {
  if (id === 'lt600') return p.price < 600;
  if (id === 'mid') return p.price >= 600 && p.price <= 1500;
  if (id === 'gt1500') return p.price > 1500;
  return true;
}

function matches(p, f) {
  if (f.category && p.category !== f.category) return false;
  if (f.roast.length && !(p.roast && f.roast.includes(p.roast))) return false;
  if (f.taste.length && !f.taste.some((t) => p.tastes.includes(t))) return false;
  if (f.origin.length && !(p.origin && f.origin.includes(p.origin))) return false;
  if (f.price.length && !f.price.some((id) => priceInBucket(p, id))) return false;
  if (f.q) {
    const q = f.q.toLowerCase();
    const hay = (p.name + ' ' + p.origin + ' ' + p.process + ' ' + p.tastes.join(' ')).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" /></svg>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.9-9.8-9.2C.6 8.6 2.4 5 5.8 5c2 0 3.4 1.1 4.2 2.6h4C14.8 6.1 16.2 5 18.2 5c3.4 0 5.2 3.6 3.6 6.8C19.5 16.1 12 21 12 21z" transform="scale(0.92) translate(1,0)" /></svg>
  );
}

/* Brand wordmark: last word set in the italic accent, as the original mark. */
function Wordmark({ name }) {
  const i = name.lastIndexOf(' ');
  if (i <= 0) return name;
  return (<>{name.slice(0, i)} <em>{name.slice(i + 1)}</em></>);
}

/* facet key → its option list in content.filters (content uses plural list
   names; price buckets filter by their `test` id, see priceInBucket). */
function facetOptions(key) {
  const f = content.filters;
  if (key === 'price') return (f.prices || []).map((o) => ({ v: o.test || o.id, l: o.label }));
  const list = f[key] || f[key + 's'] || [];
  return list.map((v) => ({ v, l: v }));
}

const EMPTY_F = { roast: [], taste: [], origin: [], price: [], category: null, q: '', sort: 'featured' };

export default function Design08Ecommerce() {
  const { brand, price, currency, contact, productName, img } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;

  const [filters, setFilters] = useState(EMPTY_F);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [addedId, setAddedId] = useState(null);
  const [qv, setQv] = useState(null); // { product, rect }
  const [cartOpen, setCartOpen] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [openFacet, setOpenFacet] = useState(null);
  /* ≤1100px the pour film sits alone above the grid: it fills the stage while
     pinned (no blank band below it) and pins for a shorter stretch */
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 1100px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1100px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const gridRef = useRef(null);
  const countRef = useRef(null);
  const overlayRef = useRef(null);
  const boxRef = useRef(null);
  const slotRef = useRef(null);
  const flyRef = useRef(null);
  const infoRef = useRef(null);
  const drawerRef = useRef(null);
  const scrimRef = useRef(null);
  const mdrawerRef = useRef(null);
  const cfStageRef = useRef(null);
  const cfTrackRef = useRef(null);
  const cfDots = useRef([]);
  const cfNowRef = useRef(null);
  const qvState = useRef(null);
  qvState.current = qv;

  const filterKey = JSON.stringify(filters);

  /* signature sequence, per VIDEO_PLAN.md — the PRODUCT-section side film ("The pour").
     Replaces the old autoplay video: the 72-frame sequence scrubs as the visitor
     scrolls the shelf, pinned beside the product grid. */

  /* discovery rail: the crowd's highest-rated products, spun by the coverflow */
  const featured = useMemo(
    () => [...content.products].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  );

  /* ---- fonts (once) ---- */
  useEffect(() => {
    const id = 'tpl-font-design-08-ecommerce';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Inter:wght@400;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const scrollToId = (id) => {
    const el = rootRef.current && rootRef.current.querySelector('#' + id);
    if (!el) return;
    // The viewer drives .tpl-scope with Lenis — let it own the smooth scroll.
    const sc = scroller();
    const lenis = sc !== window ? sc.__lenis : null;
    if (lenis && !reduced) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  /* ---- derived: filtered + sorted products ---- */
  const visible = useMemo(() => {
    const list = content.products.filter((p) => matches(p, filters));
    const s = [...list];
    if (filters.sort === 'low') s.sort((a, b) => a.price - b.price);
    if (filters.sort === 'high') s.sort((a, b) => b.price - a.price);
    if (filters.sort === 'rating') s.sort((a, b) => b.rating - a.rating);
    return s;
  }, [filters]);

  const countFor = (facetKey, value) => {
    const f = { ...filters };
    if (facetKey === 'roast') f.roast = [];
    if (facetKey === 'taste') f.taste = [];
    if (facetKey === 'origin') f.origin = [];
    if (facetKey === 'price') f.price = [];
    const test = facetKey === 'price'
      ? (p) => priceInBucket(p, value)
      : facetKey === 'taste'
        ? (p) => p.tastes.includes(value)
        : (p) => p[facetKey] === value;
    return content.products.filter((p) => matches(p, f) && test(p)).length;
  };

  /* ---- filter change: FLIP-lite re-flow under 0.6s ---- */
  const changeFilters = (updater) => {
    if (reduced || !gridRef.current) { setFilters(updater); return; }
    const items = gridRef.current.querySelectorAll('.card');
    gsap.to(items, {
      opacity: 0, scale: 0.96, y: 8, duration: 0.22, ease: 'power2.in', stagger: 0.012,
      overwrite: 'auto', onComplete: () => setFilters(updater),
    });
  };
  const toggleArr = (key, value) => {
    changeFilters((f) => {
      const arr = f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value];
      return { ...f, [key]: arr };
    });
  };

  /* grid enter after each filter commit (skipped on first mount — batch handles it) */
  const firstGrid = useRef(true);
  useLayoutEffect(() => {
    if (firstGrid.current) { firstGrid.current = false; return; }
    const grid = gridRef.current;
    if (!grid || reduced) return;
    const items = grid.querySelectorAll('.card');
    if (!items.length) return;
    gsap.fromTo(items,
      { opacity: 0, scale: 0.96, y: 14 },
      { opacity: 1, scale: 1, y: 0, duration: 0.34, ease: 'power2.out', stagger: 0.03, overwrite: 'auto', clearProps: 'transform' });
  }, [filterKey, reduced]);

  /* ---- cart ---- */
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartLines = Object.entries(cart)
    .map(([id, qty]) => ({ product: content.products.find((p) => p.id === id), qty }))
    .filter((l) => l.product);
  const subtotal = cartLines.reduce((a, l) => a + l.product.price * l.qty, 0);

  const addToCart = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setAddedId(id);
    setTimeout(() => setAddedId((cur) => (cur === id ? null : cur)), 900);
    if (!reduced && countRef.current) {
      gsap.fromTo(countRef.current, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: 'back.out(3)', overwrite: 'auto' });
    }
  };

  const toggleWish = (id, el) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    if (!reduced && el) {
      gsap.fromTo(el, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: 'back.out(3)', overwrite: 'auto' });
    }
  };

  /* cart drawer open/close */
  useLayoutEffect(() => {
    if (!cartOpen) return;
    if (reduced) return;
    gsap.fromTo(drawerRef.current, { x: 0, xPercent: 105 }, { xPercent: 0, duration: 0.45, ease: 'power4.out' });
    gsap.fromTo(scrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
  }, [cartOpen, reduced]);

  const closeCart = () => {
    if (reduced || !drawerRef.current) { setCartOpen(false); return; }
    gsap.to(drawerRef.current, { xPercent: 105, duration: 0.35, ease: 'power3.in', overwrite: 'auto' });
    gsap.to(scrimRef.current, { opacity: 0, duration: 0.25, overwrite: 'auto', onComplete: () => setCartOpen(false) });
  };

  /* ---- quick-view FLIP ---- */
  const openQvAt = (p, rect) => setQv({ product: p, rect });
  const openQv = (p, evt) => {
    const cardEl = evt.currentTarget.closest('.card');
    const mediaEl = cardEl && cardEl.querySelector('.pimg');
    const r = mediaEl ? mediaEl.getBoundingClientRect() : null;
    const rect = r
      ? { left: r.left, top: r.top, width: r.width, height: r.height }
      : { left: window.innerWidth / 2 - 140, top: window.innerHeight / 2 - 140, width: 280, height: 280 };
    openQvAt(p, rect);
  };
  const openQvFromCard = (p, cardEl) => {
    const mediaEl = cardEl && cardEl.querySelector('.cf-media');
    const r = mediaEl ? mediaEl.getBoundingClientRect() : null;
    const rect = r
      ? { left: r.left, top: r.top, width: r.width, height: r.height }
      : { left: window.innerWidth / 2 - 140, top: window.innerHeight / 2 - 140, width: 280, height: 280 };
    openQvAt(p, rect);
  };

  useLayoutEffect(() => {
    if (!qv) return;
    if (reduced) return; // static modal, image already in slot
    const fly = flyRef.current, slot = slotRef.current;
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(boxRef.current, { opacity: 0, scale: 0.96, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 });
    if (fly && slot) {
      const s = slot.getBoundingClientRect();
      gsap.to(fly, {
        left: s.left, top: s.top, width: s.width, height: s.height,
        duration: 0.5, ease: 'power3.inOut', delay: 0.05,
      });
    }
    if (infoRef.current) {
      gsap.fromTo(infoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.4 });
    }
  }, [qv, reduced]);

  const closeQv = () => {
    const cur = qvState.current;
    if (reduced || !cur || !flyRef.current) { setQv(null); return; }
    const fly = flyRef.current, r = cur.rect;
    gsap.to(fly, {
      left: r.left, top: r.top, width: r.width, height: r.height,
      duration: 0.5, ease: 'power3.inOut', overwrite: 'auto',
    });
    gsap.to(infoRef.current, { opacity: 0, y: 12, duration: 0.25, ease: 'power2.in', overwrite: 'auto' });
    gsap.to(boxRef.current, { opacity: 0, scale: 0.97, duration: 0.3, delay: 0.2, ease: 'power2.in', overwrite: 'auto' });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, delay: 0.25, ease: 'power2.in', overwrite: 'auto',
      onComplete: () => setQv(null),
    });
  };

  /* mobile filter drawer */
  useLayoutEffect(() => {
    if (!mOpen || reduced || !mdrawerRef.current) return;
    gsap.fromTo(mdrawerRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power4.out' });
  }, [mOpen, reduced]);

  /* escape closes overlays */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (qvState.current) closeQv();
      else if (cartOpen) closeCart();
      else if (mOpen) setMOpen(false);
      setOpenFacet(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartOpen, mOpen]);

  /* ---- scroll motion ---- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      /* hero: image bloom + fast promo rise */
      gsap.fromTo('.hero-frame', { clipPath: 'inset(8% 5% 8% 5% round 20px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1, ease: 'power4.inOut',
      });
      gsap.fromTo('.hero-copy > *', { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.2,
      });
      /* house reveals */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%', once: true },
        });
      });
      /* product grid: batched reveals (initial mount) */
      gsap.set('.card', { opacity: 0 });
      ScrollTrigger.batch('.card', {
        scroller: scroller(),
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.05, overwrite: 'auto' }),
      });

      /* ---- coverflow discovery rail (signature): scrub-driven, pinned on desktop.
             Centered card faces forward at full scale; neighbors rotateY + shrink
             with distance from center. Mobile/reduced-motion get native swipe/static. ---- */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const stage = cfStageRef.current;
        const track = cfTrackRef.current;
        const cards = track ? Array.from(track.querySelectorAll('.cf-card')) : [];
        const n = cards.length;
        if (!stage || n < 2) return undefined;
        gsap.set(cards, { xPercent: -50, yPercent: -50, transformPerspective: 1400 });
        const place = (a) => {
          cards.forEach((el, i) => {
            const d = i - a;
            const ad = Math.abs(d);
            gsap.set(el, {
              x: d * 300,
              rotationY: gsap.utils.clamp(-64, 64, -d * 44),
              scale: 1 - Math.min(ad * 0.13, 0.42),
              zIndex: 100 - Math.round(ad * 10),
              opacity: 1 - Math.min(ad * 0.28, 0.72),
            });
          });
          const idx = Math.max(0, Math.min(n - 1, Math.round(a)));
          cfDots.current.forEach((dt, di) => { if (dt) dt.classList.toggle('on', di === idx); });
          if (cfNowRef.current && featured[idx]) cfNowRef.current.textContent = featured[idx].name;
        };
        place(0);
        const st = ScrollTrigger.create({
          trigger: stage,
          scroller: scroller(),
          start: 'top top',
          end: '+=' + n * 75 + '%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => place(self.progress * (n - 1)),
        });
        return () => { st.kill(); gsap.set(cards, { clearProps: 'transform,opacity,zIndex' }); };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef, featured]);

  const email = contact.email || content.contact.email;
  const activeFilterCount = filters.roast.length + filters.taste.length + filters.origin.length + filters.price.length;

  const pickCategory = (id) => {
    changeFilters((f) => ({ ...f, category: f.category === id ? null : id }));
    scrollToId('shelf');
  };

  const facetBtn = (key, label) => (
    <div className="facet facet-desktop" key={key}>
      <button
        type="button"
        className={filters[key].length ? 'active' : ''}
        aria-expanded={openFacet === key}
        onClick={() => setOpenFacet(openFacet === key ? null : key)}
      >
        {label}{filters[key].length ? <span className="n">{filters[key].length}</span> : null}
      </button>
      {openFacet === key ? (
        <div className="facet-menu" role="menu">
          {facetOptions(key).map((o) => (
            <button
              key={o.v} type="button" role="menuitemcheckbox" aria-checked={filters[key].includes(o.v)}
              className={filters[key].includes(o.v) ? 'sel' : ''}
              onClick={() => toggleArr(key, o.v)}
            >
              {o.l}<span className="count">{countFor(key, o.v)}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  const prodImg = (p) => img(p.img, FB[p.img]);

  return (
    <div ref={rootRef} className={'tpl-design-08-ecommerce' + (reduced ? ' is-reduced' : '')}>
      {/* ---------- nav ---------- */}
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
            <Wordmark name={brandName} />
          </a>
          <nav className="cat-links" aria-label="Categories">
            {content.nav.categories.map((c) => (
              <button key={c.id} type="button" onClick={() => pickCategory(c.id)}>{c.label}</button>
            ))}
          </nav>
          <label className="search">
            <span className="sr-only" style={{ position: 'absolute', left: -9999 }}>Search products</span>
            <input
              type="search" placeholder="Search the shelf…" aria-label="Search products"
              value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            />
          </label>
          <button className="cart-btn" type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
            Cart <span className="cart-count" ref={countRef}>{cartCount}</span>
          </button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section id="hero" className="hero" data-tour="Featured Collection">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hero-title">{content.hero.title.replace('up to 20% off.', '')}<em>up to 20% off.</em></h1>
              <p className="hero-sub">{content.hero.sub}</p>
              <div className="hero-ctas">
                <button className="btn btn-dark" type="button" onClick={() => { changeFilters((f) => ({ ...f, category: 'beans' })); scrollToId('shelf'); }}>{content.hero.cta}</button>
                <button className="btn btn-outline" type="button" onClick={() => scrollToId('shelf')}>{content.hero.ctaSecondary}</button>
              </div>
              <p className="hero-note">{content.hero.note}</p>
            </div>
            <div className="hero-frame">
              <Img k="hero" src={heroImg} alt={`A styled wooden shelf of ${brandName} coffee products — bags, bean jars, grinder and cups`} eager />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- categories ---------- */}
      <section id="categories" className="section" data-tour="Shop by Category" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.categories.eyebrow}</p>
          <h2 className="sec-title rv">{content.categories.title}</h2>
          <div className="tiles">
            {content.categories.tiles.map((t) => (
              <button className="tile rv" key={t.id} type="button" onClick={() => pickCategory(t.id)} aria-pressed={filters.category === t.id}>
                {t.img
                  ? <span className="tile-img"><Img k={t.img} src={FB[t.img]} alt={t.alt} /></span>
                  : <span className="tile-accent" aria-hidden="true">S</span>}
                <span className="tile-body" style={{ display: 'block' }}>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- coverflow discovery rail ---------- */}
      <section id="discover" className="cf" data-tour="Discover" aria-label="Discovery rail">
        <div className="wrap cf-head">
          <p className="eyebrow rv">The discovery rail</p>
          <h2 className="sec-title rv">Spun into the light by other brewers</h2>
          <p className="sec-sub rv">Scroll to turn the shelf — the highest-rated bags, gear, and gifts, front and center.</p>
        </div>
        <div className="cf-stage" ref={cfStageRef}>
          <div className="cf-track" ref={cfTrackRef}>
            {featured.map((p) => (
              <article className="cf-card" key={p.id} aria-label={p.name}>
                <div className="cf-media">
                  <Img k={p.img} src={FB[p.img]} alt={p.name} style={{ objectPosition: p.pos }} />
                  {p.badge ? <span className="flag">{p.badge}</span> : null}
                  <button
                    type="button" className="cf-view"
                    aria-label={'Quick view ' + p.name}
                    onClick={(e) => openQvFromCard(p, e.currentTarget.closest('.cf-card'))}
                  >
                    Quick view
                  </button>
                </div>
                <div className="cf-body">
                  <h3>{productName(content.products.indexOf(p), p.name)}</h3>
                  <p className="cf-meta">{[p.origin, p.process].filter(Boolean).join(' · ') || p.category}</p>
                  <div className="cf-foot">
                    <span className="cf-price">{price(p.price)}</span>
                    <button
                      type="button"
                      className={'qa-btn' + (addedId === p.id ? ' added' : '')}
                      onClick={() => addToCart(p.id)}
                    >
                      {addedId === p.id ? 'Added' : 'Quick add'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cf-ui" aria-hidden="true">
            <p className="cf-now" ref={cfNowRef}>{featured[0] ? featured[0].name : ''}</p>
            <div className="cf-dots">
              {featured.map((p, i) => (
                <span key={p.id} ref={(el) => { cfDots.current[i] = el; }} className={i === 0 ? 'on' : ''} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- filter toolbar ---------- */}
      <div className="toolbar">
        <div className="wrap toolbar-inner">
          {facetBtn('roast', 'Roast')}
          {facetBtn('taste', 'Taste')}
          {facetBtn('origin', 'Origin')}
          {facetBtn('price', 'Price')}
          <button className="btn btn-outline filters-toggle" type="button" onClick={() => setMOpen(true)} style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
            Filters{activeFilterCount ? ` (${activeFilterCount})` : ''}
          </button>
          {activeFilterCount ? <button className="clear-btn" type="button" onClick={() => changeFilters(() => ({ ...EMPTY_F, q: filters.q, sort: filters.sort }))}>{content.filters.clear}</button> : null}
          <span className="spacer" />
          <label className="sr-only" style={{ position: 'absolute', left: -9999 }} htmlFor="sortsel">Sort products</label>
          <select id="sortsel" className="sortsel" value={filters.sort} onChange={(e) => changeFilters((f) => ({ ...f, sort: e.target.value }))} aria-label="Sort products">
            {content.filters.sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {/* ---------- product grid ---------- */}
      <section id="shelf" className="section" data-tour={`The ${brandName} Shelf`} style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="shelf-layout">
            <div className="shelf-main">
              <p className="result-line" aria-live="polite">
                <strong>{visible.length}</strong> {content.filters.results}
                {filters.category ? ` in ${content.nav.categories.find((c) => c.id === filters.category).label}` : ''}
                {filters.q ? ` matching “${filters.q}”` : ''}
              </p>
              <div className="grid" ref={gridRef}>
            {visible.map((p, i) => (
              <article className="card" key={p.id}>
                <div className="card-media">
                  {p.badge ? <span className="flag">{p.badge}</span> : null}
                  <button
                    className={'wish' + (wishlist.includes(p.id) ? ' loved' : '')}
                    type="button" aria-label={wishlist.includes(p.id) ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
                    aria-pressed={wishlist.includes(p.id)}
                    onClick={(e) => toggleWish(p.id, e.currentTarget)}
                  ><Heart /></button>
                  <Img k={p.img} src={FB[p.img]} alt={p.name} className="pimg" style={{ objectPosition: p.pos }} />
                  <div className="quickbar">
                    <button
                      className={'qa-btn' + (addedId === p.id ? ' added' : '')}
                      type="button" onClick={() => addToCart(p.id)}
                    >
                      {addedId === p.id ? 'Added' : 'Quick add'}
                    </button>
                    <button className="qv-btn" type="button" onClick={(e) => openQv(p, e)}>Quick view</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-badges">
                    {p.roast ? <span className="taste"><span className="roastdot" aria-hidden="true">● </span>{p.roast} roast</span> : null}
                    {p.tastes.slice(0, 2).map((t) => <span className="taste" key={t}>{t}</span>)}
                  </div>
                  <h3 className="card-name">{productName(i, p.name)}</h3>
                  <p className="card-meta">{[p.origin, p.process].filter(Boolean).join(' · ') || p.category}</p>
                  <div className="card-foot">
                    <span className="card-price">{price(p.price)}</span>
                    <span className="card-rating"><Star />{p.rating.toFixed(1)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visible.length === 0 ? (
            <p className="sec-sub" style={{ marginTop: 32 }}>Nothing on this shelf matches — try clearing a filter or two.</p>
          ) : null}
            </div>
            {/* ---------- product-section side film ("The pour"): scroll-scrubbed ---------- */}
            <aside className="side-film" aria-label="Brew film" data-tour="The Pour">
              <div className="side-film-frame">
                <ScrollFrames
                  frames={frames}
                  alt="Kettle stream hitting fresh coffee grounds, the bloom rising"
                  pinDistance={narrow ? '+=90%' : '+=250%'}
                  stageHeight={narrow ? '80svh' : '400px'}
                />
              </div>
              <p className="side-film-cap"><strong>The pour.</strong> Bloom rising, ninety seconds to a better morning.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- reviews ---------- */}
      <section id="reviews" className="section" data-tour="Loved by Brewers" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.reviews.eyebrow}</p>
          <h2 className="sec-title rv">{content.reviews.title}</h2>
          <div className="rev-grid">
            {content.reviews.items.map((r) => (
              <article className="rev-card rv" key={r.name}>
                <div className="stars" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></div>
                <blockquote>“{r.quote}”</blockquote>
                <cite>{r.name}<span>{r.product}</span></cite>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- guides ---------- */}
      <section id="guides" className="section" data-tour="Brew Guides" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.guides.eyebrow}</p>
          <h2 className="sec-title rv">{content.guides.title}</h2>
          <div className="guide-grid">
            {content.guides.items.map((g, i) => (
              <article className="guide-card rv" key={g.title}>
                <span className="guide-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{g.title}</h3>
                <p>{g.body}</p>
              </article>
            ))}
          </div>
          <div className="assure">
            {content.assurances.map((a) => (
              <div className="assure-card rv" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a className="wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
                <Wordmark name={brandName} />
              </a>
              <p>{content.brand.tagline}. {content.contact.address}.</p>
              <p><a href={'mailto:' + email}>{email}</a><br />{content.contact.phone}</p>
            </div>
            <div>
              <h4>Shop</h4>
              <ul>{content.nav.categories.map((c) => (
                <li key={c.id}><button type="button" onClick={() => pickCategory(c.id)}>{c.label}</button></li>
              ))}</ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><button type="button" onClick={() => scrollToId('guides')}>Brew guides</button></li>
                <li><button type="button" onClick={() => scrollToId('reviews')}>Reviews</button></li>
                <li><button type="button" onClick={() => setCartOpen(true)}>Your cart</button></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul>
                <li>{content.contact.address}</li>
                <li>Open daily, 9am – 9pm</li>
              </ul>
            </div>
          </div>
          <div className="footer-ship">
            <span>{content.footer.shipping}</span>
            <span>{content.footer.line.replace(content.brand.name, brandName)} · Prices in {currency === '₹' ? 'INR' : currency}</span>
          </div>
        </div>
      </footer>

      {/* ---------- quick-view modal ---------- */}
      {qv ? (
        <div className="qv-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-label={`Quick view: ${qv.product.name}`}
          onClick={(e) => { if (e.target === overlayRef.current) closeQv(); }}>
          <div className="qv-box" ref={boxRef}>
            <button className="qv-close" type="button" onClick={closeQv} aria-label="Close quick view">×</button>
            <div className="qv-media">
              <div className="qv-slot" ref={slotRef}>
                {reduced ? <Img k={qv.product.img} src={FB[qv.product.img]} alt={qv.product.name} style={{ width: '100%', height: '100%' }} /> : null}
              </div>
            </div>
            <div className="qv-info" ref={infoRef}>
              <div className="card-badges">
                {qv.product.roast ? <span className="taste"><span className="roastdot" aria-hidden="true">● </span>{qv.product.roast} roast</span> : null}
                {qv.product.tastes.map((t) => <span className="taste" key={t}>{t}</span>)}
              </div>
              <h3>{productName(content.products.indexOf(qv.product), qv.product.name)}</h3>
              <p className="desc">
                {qv.product.category === 'beans'
                  ? `A ${qv.product.roast.toLowerCase()}-roast, ${qv.product.process.toLowerCase()}-process lot from ${qv.product.origin}. Roasted this week, shipped with its roast date on the bag.`
                  : qv.product.category === 'equipment'
                    ? 'Built for daily ritual: solid construction, precise control, and a footprint that fits a real kitchen counter.'
                    : 'A ready-to-give set from the shelf — packed in kraft, finished with a tasting card.'}
              </p>
              <dl className="qv-specs" style={{ margin: 0 }}>
                {qv.product.origin ? <div><dt>Origin</dt><dd>{qv.product.origin}</dd></div> : null}
                {qv.product.process ? <div><dt>Process</dt><dd>{qv.product.process}</dd></div> : null}
                <div><dt>Rating</dt><dd>{qv.product.rating.toFixed(1)} / 5</dd></div>
                <div><dt>Shipping</dt><dd>Free over {price(499)}</dd></div>
              </dl>
              <div className="qv-price">{price(qv.product.price)}</div>
              <div className="qv-actions">
                <button className="btn" type="button" onClick={() => { addToCart(qv.product.id); closeQv(); }}>Add to cart</button>
                <button className="btn btn-outline" type="button" onClick={closeQv}>Keep browsing</button>
              </div>
            </div>
          </div>
          {!reduced ? (
            <span className="qv-fly" ref={flyRef} aria-hidden="true"
              style={{ left: qv.rect.left, top: qv.rect.top, width: qv.rect.width, height: qv.rect.height }}>
              <img src={prodImg(qv.product)} alt="" />
            </span>
          ) : null}
        </div>
      ) : null}

      {/* ---------- cart drawer ---------- */}
      {cartOpen ? (
        <>
          <div className="cart-scrim" ref={scrimRef} onClick={closeCart} aria-hidden="true" />
          <aside className="cart-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Shopping cart">
            <div className="cart-head">
              <h3>Your cart</h3>
              <button className="qv-close" type="button" onClick={closeCart} aria-label="Close cart" style={{ position: 'static' }}>×</button>
            </div>
            <div className="cart-items">
              {cartLines.length === 0 ? (
                <p className="cart-empty">Your cart is empty. The shelf, however, is full.</p>
              ) : cartLines.map(({ product: p, qty }) => (
                <div className="cart-item" key={p.id}>
                  <span className="cart-thumb"><Img k={p.img} src={FB[p.img]} alt={p.name} /></span>
                  <div className="ci-body">
                    <p className="ci-name">{productName(content.products.indexOf(p), p.name)}</p>
                    <p className="ci-price">{price(p.price)} each</p>
                  </div>
                  <div className="qty">
                    <button type="button" aria-label={`Remove one ${p.name}`}
                      onClick={() => setCart((c) => { const n = { ...c }; if (n[p.id] <= 1) delete n[p.id]; else n[p.id] -= 1; return n; })}>−</button>
                    <span>{qty}</span>
                    <button type="button" aria-label={`Add one ${p.name}`} onClick={() => addToCart(p.id)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            {cartLines.length ? (
              <div className="cart-foot">
                <div className="cart-total"><span>Subtotal</span><span>{price(subtotal)}</span></div>
                <button className="btn" type="button" onClick={() => {}}>Checkout</button>
                <p className="cart-note">Demo checkout — no payment is processed.</p>
              </div>
            ) : null}
          </aside>
        </>
      ) : null}

      {/* ---------- mobile filter drawer ---------- */}
      {mOpen ? (
        <>
          <div className="mdrawer-scrim" onClick={() => setMOpen(false)} aria-hidden="true" />
          <div className="mdrawer" ref={mdrawerRef} role="dialog" aria-modal="true" aria-label="Filters">
            <h3>Filters</h3>
            <p className="sec-sub" style={{ marginBottom: 8 }}>{visible.length} products</p>
            {['roast', 'taste', 'origin', 'price'].map((key) => (
              <div className="mfacet" key={key}>
                <h4>{key}</h4>
                <div className="mchips">
                  {facetOptions(key).map((o) => (
                    <button
                      key={o.v} type="button" className={'mchip' + (filters[key].includes(o.v) ? ' sel' : '')}
                      aria-pressed={filters[key].includes(o.v)}
                      onClick={() => toggleArr(key, o.v)}
                    >{o.l}</button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <button className="btn" type="button" style={{ flex: 1 }} onClick={() => setMOpen(false)}>Show {visible.length} products</button>
              {activeFilterCount ? <button className="btn btn-outline" type="button" onClick={() => changeFilters(() => ({ ...EMPTY_F, q: filters.q, sort: filters.sort }))}>Clear</button> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
