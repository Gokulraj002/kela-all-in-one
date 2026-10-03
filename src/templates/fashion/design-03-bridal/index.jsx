import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1 from './assets/look-1.webp';
import look2 from './assets/look-2.webp';
import look3 from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_IMGS = [look2, heroImg, look1, look3];
const CHAPTER_KEYS = ['product-1', 'hero', 'product-0', 'product-2'];
const PIECE_IMGS = { 'product-0': look1, 'product-1': look2, 'product-2': look3 };
const FONT_ID = 'tpl-font-design-03-bridal';

function useNextDays(n) {
  return useMemo(() => {
    const out = [];
    const now = new Date();
    for (let i = 1; i <= n; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      out.push({
        label: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        day: d.getDate(),
        month: d.toLocaleDateString('en-IN', { month: 'short' }),
        full: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }),
      });
    }
    return out;
  }, [n]);
}

export default function NoorBridal() {
  const { brand, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;
  const email = (contact && contact.email) || content.contact.email;

  const heroRef = useRef(null);
  const wrapRef = useRef(null);
  const pinRef = useRef(null);
  const totalRef = useRef(null);

  /* ---------- trousseau builder state ---------- */
  const [shortlist, setShortlist] = useState([]);
  const [preview, setPreview] = useState(null);
  const pieces = content.trousseau.pieces;
  const total = shortlist.reduce((s, i) => s + pieces[i].price, 0);

  const togglePiece = (i) => {
    setShortlist((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    setPreview(i);
  };

  const waText = useMemo(() => {
    const lines = shortlist.map(
      (i) => `- ${productName(i, pieces[i].name)} (${pieces[i].ceremony}) — ${price(pieces[i].price)}`
    );
    return encodeURIComponent(
      `Hello ${brandName}, I would like to enquire about my trousseau shortlist:\n${lines.join('\n')}\nTotal: ${price(total)}`
    );
  }, [shortlist, total, productName, price, pieces, brandName]);

  /* ---------- appointment scheduler state ---------- */
  const days = useNextDays(7);
  const [apptType, setApptType] = useState(0);
  const [apptDay, setApptDay] = useState(0);
  const [apptSlot, setApptSlot] = useState(1);
  const [apptName, setApptName] = useState('');
  const [apptPhone, setApptPhone] = useState('');
  const [apptRef, setApptRef] = useState(null);

  const confirmAppt = () => {
    if (!apptName.trim() || !apptPhone.trim()) return;
    setApptRef(`KF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  };

  /* ---------- fonts ---------- */
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Jost:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap';
    document.head.appendChild(link);
  }, []);

  /* ---------- price tween ---------- */
  useEffect(() => {
    const el = totalRef.current;
    if (!el) return;
    if (reduced) {
      el.textContent = price(total);
      el.dataset.v = String(total);
      return;
    }
    const obj = { v: parseFloat(el.dataset.v || '0') };
    gsap.to(obj, {
      v: total,
      duration: 0.6,
      ease: 'power2.out',
      snap: { v: 1 },
      onUpdate: () => {
        el.textContent = price(Math.round(obj.v));
      },
    });
    el.dataset.v = String(total);
  }, [total, reduced, price]);

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

  /* ---------- motion ---------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      /* scroll reveals — drapeSettle */
      gsap.utils.toArray('.nb-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
          }
        );
      });

      /* hero entrance: overlay foldUnfold + wordRise + shimmer prep */
      gsap.fromTo(
        '.nb-hero',
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', clearProps: 'transform' }
      );
      gsap.to('.nb-hero .nb-word', { y: 0, yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
      gsap.to(['.nb-hero-sub', '.nb-hero-ctas', '.nb-hero-note'], {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.9,
      });
      gsap.to('.nb-hero-eyebrow', { opacity: 1, duration: 0.8, delay: 0.2 });
      gsap.delayedCall(1.6, () => {
        const last = document.querySelector('.nb-hero .nb-word--last');
        if (last) last.classList.add('nb-shimmer');
      });

      /* embroidery macro: foldUnfold with long inner drift */
      gsap.utils.toArray('.nb-macro').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.12 },
          {
            scale: 1,
            y: '4%',
            duration: 2.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 85%' },
          }
        );
      });

      /* gold dust pauses offscreen */
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          scroller: scroller(),
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (s) => heroRef.current.classList.toggle('is-paused', !s.isActive),
        });
      }

      /* colorChapters — pinned ≥768px */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = pinRef.current;
        const wrap = wrapRef.current;
        if (!pin || !wrap) return undefined;
        const n = content.chapters.length;
        const imgs = gsap.utils.toArray('.nb-chapter-img', pin);
        const panels = gsap.utils.toArray('.nb-chapter-panel', pin);
        const fills = gsap.utils.toArray('.nb-thread-fill', pin);
        const tint = pin.querySelector('.nb-tint');
        const weft = pin.querySelector('.nb-weft');
        const dupatta = pin.querySelector('.nb-dupatta');
        gsap.set(imgs, { opacity: 0 });
        gsap.set(imgs[0], { opacity: 1 });
        gsap.set(panels, { opacity: 0, y: 40 });
        gsap.set(panels[0], { opacity: 1, y: 0 });
        gsap.set(fills, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(fills[0], { scaleX: 1 });

        /* Only the active chapter is exposed; the stacked, faded-out layers
           are aria-hidden so screen readers (and QA) skip the invisible ones. */
        let shown = -1;
        const expose = (progress) => {
          const idx = Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1))));
          if (idx === shown) return;
          shown = idx;
          panels.forEach((el, i) => el.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
          imgs.forEach((el, i) => el.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
        };
        expose(0);

        /* The pinned scene is its own trigger: it locks when ITS top reaches
           the top of the scroll area (the section head scrolls away first),
           so the full-height scene never sits half below the fold. */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: '+=350%',
            scrub: 1,
            pin,
            scroller: scroller(),
            anticipatePin: 1,
            invalidateOnRefresh: true,
            /* refreshPriority → every refresh sorts triggers by page position,
               so this pin is measured after the hero's ScrollFrames pin. */
            refreshPriority: 0,
            onUpdate: (self) => expose(self.progress),
          },
        });
        content.chapters.forEach((c, i) => {
          if (i === 0) return;
          const at = i - 1;
          tl.to(tint, { backgroundColor: c.tint, duration: 1, ease: 'none' }, at);
          tl.to(imgs[i - 1], { opacity: 0, duration: 0.6, ease: 'none' }, at);
          tl.to(imgs[i], { opacity: 1, duration: 0.6, ease: 'none' }, at);
          tl.to(panels[i - 1], { opacity: 0, y: -30, duration: 0.5, ease: 'none' }, at);
          tl.fromTo(panels[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, ease: 'none' }, at + 0.1);
          tl.to(fills[i], { scaleX: 1, duration: 0.5, ease: 'none' }, at);
          /* chapter page-turn: full-viewport weftWipe */
          tl.fromTo(weft, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.28, ease: 'power2.in' }, at);
          tl.to(weft, { scaleX: 0, transformOrigin: 'right center', duration: 0.28, ease: 'power2.out' }, at + 0.28);
        });
        /* dupatta edge drifts through frame across the whole pin */
        tl.fromTo(dupatta, { x: '-32vw', opacity: 0.75 }, { x: '32vw', opacity: 0.15, duration: n - 1, ease: 'none' }, 0);
        return () => {
          panels.forEach((el) => el.removeAttribute('aria-hidden'));
          imgs.forEach((el) => el.removeAttribute('aria-hidden'));
        };
      });
      return () => {
        mm.revert();
      };
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* In-page jumps glide through the platform's Lenis (viewer: .tpl-scope.__lenis,
     export: window.__lenis) so they share the wheel's easing. */
  const scrollTo = (id) => {
    const el = rootRef.current && rootRef.current.querySelector(`#${id}`);
    if (!el) return;
    const sc = scroller();
    const lenis = (sc && sc.__lenis) || window.__lenis;
    /* #hero lives inside the pinned frame stage: "home" means the very top */
    const target = id === 'hero' ? 0 : el;
    if (lenis && !reduced) lenis.scrollTo(target, { duration: 1.4 });
    else if (id === 'hero') sc.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const titleWords = content.hero.title.split(' ');
  const dust = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: `${(i * 83 + 7) % 100}%`,
        top: `${(i * 47 + 11) % 100}%`,
        delay: `${(i * 0.7) % 4}s`,
        dur: `${3 + ((i * 13) % 3)}s`,
      })),
    []
  );

  return (
    <div ref={rootRef} className={`tpl-design-03-bridal${reduced ? ' nb-reduced' : ''}`}>
      {/* ============ NAV ============ */}
      <header className="nb-nav">
        <button type="button" className="nb-wordmark" onClick={() => scrollTo('hero')} aria-label={`${brandName} — home`}>
          <span className="nb-wordmark-name">{brandName}</span>
          <span className="nb-wordmark-est">{content.brand.est}</span>
        </button>
        <nav className="nb-nav-links" aria-label="Sections">
          {content.nav.map((label, i) => (
            <button key={label} type="button" onClick={() => scrollTo(['collection', 'products', 'craft', 'story'][i])}>
              {label}
            </button>
          ))}
        </nav>
        <button type="button" className="nb-cta nb-cta--gold" onClick={() => scrollTo('visit')}>
          Book Appointment
        </button>
      </header>

      {/* ============ HERO — scroll-scrubbed twirl ============ */}
      <ScrollFrames
        frames={frames}
        alt="The Twirl — bridal lehenga twirl"
        pinDistance="+=170%"
        className="nb-hero-scrub"
      >
        <section id="hero" data-tour="The Twirl" className="nb-hero" ref={heroRef}>
          <div className="nb-hero-veil" aria-hidden="true" />
          <div className="nb-dust" aria-hidden="true">
            {dust.map((d, i) => (
              <span key={i} style={{ left: d.left, top: d.top, animationDelay: d.delay, animationDuration: d.dur }} />
            ))}
          </div>
          <div className="nb-hero-inner">
          <p className="nb-hero-eyebrow">{content.hero.eyebrow}</p>
          <h1 className="nb-hero-title" aria-label={content.hero.title}>
            {titleWords.map((w, i) => (
              <span className="nb-wmask" key={i} aria-hidden="true">
                <span className={`nb-word${i === titleWords.length - 1 ? ' nb-word--last' : ''}`}>{w}</span>
                {i < titleWords.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>
          <p className="nb-hero-sub">{content.hero.sub}</p>
          <div className="nb-hero-ctas">
            <button type="button" className="nb-cta nb-cta--gold nb-cta--lg" onClick={() => scrollTo('visit')}>
              {content.hero.ctaPrimary}
            </button>
            <button type="button" className="nb-cta nb-cta--ghost nb-cta--lg" onClick={() => scrollTo('products')}>
              {content.hero.ctaSecondary}
            </button>
          </div>
          <p className="nb-hero-note">{content.hero.note}</p>
        </div>
        </section>
      </ScrollFrames>

      {/* ============ COLOR CHAPTERS ============ */}
      <section id="collection" data-tour="The Bridal Edit" className="nb-chapters" ref={wrapRef}>
        <div className="nb-chapters-head nb-rv">
          <p className="nb-eyebrow">The Bridal Edit</p>
          <h2 className="nb-h2">Four ceremonies, four colours</h2>
          <p className="nb-lede">Scroll — the room itself changes colour as each ceremony arrives.</p>
        </div>

        {!reduced && (
          <div className="nb-chapters-pin" ref={pinRef}>
            <div className="nb-tint" aria-hidden="true" />
            <div className="nb-weft" aria-hidden="true" />
            <div className="nb-chapter-media">
              {content.chapters.map((c, i) => (
                <figure className="nb-chapter-img" key={c.key}>
                  <Img k={CHAPTER_KEYS[i]} src={CHAPTER_IMGS[i]} alt={`${c.title} — ${c.fabric}`} />
                </figure>
              ))}
              <div className="nb-dupatta" aria-hidden="true" />
            </div>
            <div className="nb-chapter-copy">
              {content.chapters.map((c) => (
                <div className="nb-chapter-panel" key={c.key}>
                  <p className="nb-chapter-ceremony">{c.ceremony}</p>
                  <h3 className="nb-chapter-title">{c.title}</h3>
                  <p className="nb-chapter-body">{c.copy}</p>
                  <p className="nb-chapter-meta">
                    {c.fabric} · {c.hours} hours of handwork
                  </p>
                  <p className="nb-chapter-price">from {price(c.price)}</p>
                </div>
              ))}
            </div>
            <div className="nb-threads" aria-hidden="true">
              {content.chapters.map((c) => (
                <span className="nb-thread-dot" key={c.key} title={c.name}>
                  <span className="nb-thread-fill" />
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="nb-chapters-stack">
          {content.chapters.map((c, i) => (
            <article className="nb-chapter-card nb-rv" key={c.key} style={{ '--nb-tint': c.tint }}>
              <div className="nb-chapter-card-img">
                <Img k={CHAPTER_KEYS[i]} src={CHAPTER_IMGS[i]} alt={`${c.title} — ${c.fabric}`} />
              </div>
              <div className="nb-chapter-card-body">
                <p className="nb-chapter-ceremony">{c.ceremony}</p>
                <h3 className="nb-chapter-title">{c.title}</h3>
                <p className="nb-chapter-body">{c.copy}</p>
                <p className="nb-chapter-meta">
                  {c.fabric} · {c.hours} hours of handwork
                </p>
                <p className="nb-chapter-price">from {price(c.price)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ TROUSSEAU BUILDER ============ */}
      <section id="products" data-tour="Trousseau Builder" className="nb-trousseau">
        <div className="nb-section-head nb-rv">
          <p className="nb-eyebrow">{content.trousseau.title}</p>
          <h2 className="nb-h2">Build it ceremony by ceremony</h2>
          <p className="nb-lede">{content.trousseau.sub}</p>
        </div>
        <div className="nb-trousseau-grid">
          <div className="nb-trousseau-list nb-rv">
            {pieces.map((p, i) => {
              const active = shortlist.includes(i);
              return (
                <button
                  key={p.ceremony}
                  type="button"
                  className={`nb-piece${active ? ' is-active' : ''}`}
                  onClick={() => togglePiece(i)}
                  aria-pressed={active}
                >
                  <span className="nb-piece-ceremony">{p.ceremony}</span>
                  <span className="nb-piece-name">{productName(i, p.name)}</span>
                  <span className="nb-piece-fabric">{p.fabric}</span>
                  <span className="nb-piece-foot">
                    <span className="nb-piece-price">{price(p.price)}</span>
                    <span className="nb-piece-toggle">{active ? 'In your shortlist' : 'Add to shortlist'}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <aside className="nb-shortlist nb-rv" aria-live="polite">
            <div className="nb-shortlist-preview">
              {preview === null ? (
                <div className="nb-shortlist-empty">
                  <p>{content.trousseau.empty}</p>
                </div>
              ) : (
                <div className="nb-preview-swap" key={pieces[preview].key + preview}>
                  <Img
                    k={pieces[preview].key}
                    src={PIECE_IMGS[pieces[preview].key]}
                    alt={`${productName(preview, pieces[preview].name)} — ${pieces[preview].fabric}`}
                  />
                </div>
              )}
            </div>
            <div className="nb-shortlist-body">
              <p className="nb-shortlist-title">Your shortlist</p>
              {shortlist.length === 0 ? (
                <p className="nb-shortlist-none">Nothing chosen yet.</p>
              ) : (
                <ul className="nb-shortlist-items">
                  {shortlist.map((i) => (
                    <li key={i}>
                      <span>{productName(i, pieces[i].name)}</span>
                      <span>{price(pieces[i].price)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="nb-shortlist-total">
                Total <span ref={totalRef} data-v="0">{price(0)}</span>
              </p>
              <a
                className={`nb-cta nb-cta--gold nb-cta--block${shortlist.length === 0 ? ' is-disabled' : ''}`}
                href={shortlist.length === 0 ? undefined : `https://wa.me/${content.contact.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                aria-disabled={shortlist.length === 0}
              >
                {content.trousseau.cta}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ CRAFT ============ */}
      <section id="craft" data-tour="Craft" className="nb-craft">
        <div className="nb-craft-grid">
          <div className="nb-craft-media nb-rv">
            <div className="nb-macro">
              <Img
                k="detail"
                src={detailImg}
                alt="Karigar hands stitching gold dabka into maroon silk on a wooden adda frame"
              />
            </div>
          </div>
          <div className="nb-craft-body">
            <p className="nb-eyebrow nb-rv">{content.craft.eyebrow}</p>
            <h2 className="nb-h2 nb-rv">{content.craft.title}</h2>
            <p className="nb-body nb-rv">{content.craft.body}</p>
            <blockquote className="nb-quote nb-rv">
              <p>“{content.craft.quote}”</p>
              <cite>— {content.craft.quoteBy}</cite>
            </blockquote>
            <ul className="nb-swatches nb-rv">
              {content.craft.swatches.map((s) => (
                <li key={s.name} className="nb-swatch" tabIndex={0} aria-label={`${s.name}: ${s.note}`}>
                  <span className="nb-swatch-dot" aria-hidden="true" />
                  <span className="nb-swatch-name">{s.name}</span>
                  <span className="nb-swatch-note">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ APPOINTMENTS ============ */}
      <section id="visit" data-tour="Appointments" className="nb-visit">
        <div className="nb-section-head nb-rv">
          <p className="nb-eyebrow">{content.visit.eyebrow}</p>
          <h2 className="nb-h2">{content.visit.title}</h2>
          <p className="nb-lede">{content.visit.body}</p>
        </div>

        <div className="nb-appt nb-rv">
          {apptRef ? (
            <div className="nb-appt-done" role="status">
              <p className="nb-eyebrow">Confirmed</p>
              <h3 className="nb-h3">{content.visit.confirmTitle}</h3>
              <p className="nb-body">{content.visit.confirmBody}</p>
              <dl className="nb-appt-summary">
                <div>
                  <dt>Reference</dt>
                  <dd>{apptRef}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>
                    {content.visit.types[apptType].name} · {content.visit.types[apptType].mins} min
                  </dd>
                </div>
                <div>
                  <dt>When</dt>
                  <dd>
                    {days[apptDay].full} · {content.visit.slots[apptSlot]}
                  </dd>
                </div>
              </dl>
              <button type="button" className="nb-cta nb-cta--ghost" onClick={() => setApptRef(null)}>
                Book another hour
              </button>
            </div>
          ) : (
            <div className="nb-appt-form">
              <div className="nb-appt-step">
                <p className="nb-appt-label">1 · Choose your hour</p>
                <div className="nb-appt-types">
                  {content.visit.types.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      className={`nb-appt-type${apptType === i ? ' is-active' : ''}`}
                      onClick={() => setApptType(i)}
                      aria-pressed={apptType === i}
                    >
                      <span className="nb-appt-type-name">{t.name}</span>
                      <span className="nb-appt-type-note">
                        {t.note} · {t.mins} min
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="nb-appt-step">
                <p className="nb-appt-label">2 · Pick a day</p>
                <div className="nb-appt-days">
                  {days.map((d, i) => (
                    <button
                      key={d.full}
                      type="button"
                      className={`nb-appt-day${apptDay === i ? ' is-active' : ''}`}
                      onClick={() => setApptDay(i)}
                      aria-pressed={apptDay === i}
                      aria-label={d.full}
                    >
                      <span className="nb-appt-day-w">{d.label}</span>
                      <span className="nb-appt-day-n">{d.day}</span>
                      <span className="nb-appt-day-m">{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="nb-appt-step">
                <p className="nb-appt-label">3 · Pick a time</p>
                <div className="nb-appt-slots">
                  {content.visit.slots.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      className={`nb-appt-slot${apptSlot === i ? ' is-active' : ''}`}
                      onClick={() => setApptSlot(i)}
                      aria-pressed={apptSlot === i}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="nb-appt-step">
                <p className="nb-appt-label">4 · Your details</p>
                <div className="nb-appt-fields">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={apptName}
                      onChange={(e) => setApptName(e.target.value)}
                      placeholder="The bride's name"
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input
                      type="tel"
                      value={apptPhone}
                      onChange={(e) => setApptPhone(e.target.value)}
                      placeholder="+91 …"
                      autoComplete="tel"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="nb-cta nb-cta--gold nb-cta--lg"
                  onClick={confirmAppt}
                  disabled={!apptName.trim() || !apptPhone.trim()}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="nb-faq nb-rv">
          {content.visit.faq.map((f) => (
            <details key={f.q} className="nb-faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ ATELIER ============ */}
      <section id="story" data-tour="The Atelier" className="nb-atelier">
        <div className="nb-atelier-inner nb-rv">
          <div className="nb-seal" aria-hidden="true">
            <span>{brandName}</span>
          </div>
          <p className="nb-eyebrow">{content.atelier.eyebrow}</p>
          <h2 className="nb-h2">{content.atelier.title}</h2>
          <p className="nb-lede">{content.atelier.body}</p>
          <ul className="nb-atelier-notes">
            {content.atelier.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="nb-footer">
        <div className="nb-footer-grid">
          <div>
            <p className="nb-wordmark-name">{brandName}</p>
            <p className="nb-footer-line">{content.footer.line}</p>
            <p className="nb-footer-note">{content.footer.note}</p>
          </div>
          <div>
            <p className="nb-footer-head">Visit</p>
            <p>{content.contact.address}</p>
            <p>{content.contact.hours}</p>
          </div>
          <div>
            <p className="nb-footer-head">Write to us</p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>{content.contact.phone}</p>
          </div>
        </div>
        <p className="nb-footer-copy">
          © 2026 {brandName} · {content.brand.est}
        </p>
      </footer>

      {/* ============ MOBILE STICKY BAR ============ */}
      <div className="nb-mobile-bar">
        <button type="button" className="nb-cta nb-cta--gold nb-cta--block" onClick={() => scrollTo('visit')}>
          Book Appointment
        </button>
      </div>
    </div>
  );
}
