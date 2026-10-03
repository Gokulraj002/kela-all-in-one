/* The Collective Edit — design-07-boutique · index.jsx
   Multi-designer boutique, gallery curation.
   Signature mechanic: mirrorColumns — pinned designer rails drifting in
   opposite directions around a static centre column of designer names. */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

const FONT_ID = 'tpl-font-design-07-boutique';

/* Rack tiles: 6 tiles per rail, one per spotlighted designer. */
const TILE_IMAGES = [
  { k: 'product-0', src: look1Img, alt: 'Silk kurtas and an organza dupatta on a brushed-brass designer rail' },
  { k: 'product-1', src: look2Img, alt: 'Pinned muslin toile on a dress form beside a designer rail' },
  { k: 'product-2', src: look3Img, alt: 'Draped ivory silk look with a rani pink organza layer on a model' },
  { k: 'detail', src: detailImg, alt: 'Tailor’s chalk marks and atelier tools on pale oak' },
  { k: 'hero', src: heroImg, alt: 'Gallery-white boutique interior with garment rails in warm window light' },
  { k: 'product-0', src: look1Img, alt: 'Curated garments on a designer rail in warm gallery light' },
];

const PRODUCT_IMAGES = [
  { k: 'product-0', src: look1Img, alt: 'Silk kurtas and organza pieces on a designer rail' },
  { k: 'product-1', src: look2Img, alt: 'Muslin toile with chalk marks on a dress form' },
  { k: 'product-2', src: look3Img, alt: 'Draped silk look with rani pink organza layer' },
  { k: 'detail', src: detailImg, alt: 'Atelier chalk and tools, close study' },
];

/* The platform passes a full Instagram URL, content.js a @handle — show both as @handle. */
const toHandle = (v) =>
  String(v || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/\/+$/, '');

function WordRise({ text, className }) {
  const words = String(text).split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="ce-w" aria-hidden="true">
            <span className="ce-wi">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

function AppointmentSheet({ onClose, slots, contact }) {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState(slots[0] ? slots[0].name : '');
  const sheetRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (reduced || !sheetRef.current) return undefined;
    const tw = gsap.fromTo(
      sheetRef.current,
      { y: '100%', opacity: 0.4 },
      { y: '0%', opacity: 1, duration: 0.5, ease: 'power4.out', clearProps: 'transform' }
    );
    return () => tw.kill();
  }, [reduced]);

  const subject = encodeURIComponent(`Styling appointment — ${interest}${name ? ` (${name})` : ''}`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to book: ${interest}\nName: ${name || '—'}\n\nPlease suggest a time.\n`
  );
  const email = contact.email || content.contact.email;
  const instaHandle = toHandle(contact.instagram);
  const instaUrl = instaHandle ? `https://instagram.com/${instaHandle}` : null;

  return (
    <div className="ce-sheet-wrap" role="dialog" aria-modal="true" aria-label="Book a styling appointment">
      <button className="ce-sheet-scrim" aria-label="Close" onClick={onClose} />
      <div ref={sheetRef} className="ce-sheet">
        <div className="ce-sheet-head">
          <p className="ce-eyebrow">Appointments</p>
          <h3 className="ce-sheet-title">Book a styling appointment</h3>
          <button className="ce-sheet-close" onClick={onClose} aria-label="Close appointment form">×</button>
        </div>
        <label className="ce-field">
          <span>Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aisha Sharma" autoComplete="name" />
        </label>
        <label className="ce-field">
          <span>Appointment type</span>
          <select value={interest} onChange={(e) => setInterest(e.target.value)}>
            {slots.map((s) => (
              <option key={s.name} value={s.name}>{s.name} — {s.detail}</option>
            ))}
          </select>
        </label>
        <div className="ce-sheet-actions">
          <a className="ce-btn ce-btn-primary" href={`mailto:${email}?subject=${subject}&body=${body}`}>
            Request via email
          </a>
          {instaUrl && (
            <a className="ce-btn ce-btn-ghost" href={instaUrl} target="_blank" rel="noreferrer">
              DM us on Instagram
            </a>
          )}
        </div>
        <p className="ce-sheet-note">
          Prefer to talk first? Write to {email}
          {instaHandle ? ` or find us at @${instaHandle}` : ''} — the rails will be cleared for you.
        </p>
      </div>
    </div>
  );
}

export default function Design07Boutique() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const { brand, contact, productName, price } = useCustom();
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(2);
  const [edit, setEdit] = useState('all');
  const [filtered, setFiltered] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeRef = useRef(0);
  const cardRef = useRef(null);

  const brandName = brand || content.brand.name;
  const contactEmail = contact.email || content.contact.email;
  const contactInsta = toHandle(contact.instagram || content.contact.instagram);
  const designers = content.designers.list;
  const products = content.collection.products.filter((p) => edit === 'all' || p.edit === edit);

  /* Fonts: load once, never remove. */
  useEffect(() => {
    if (document.getElementById(FONT_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_ID;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Marcellus&family=Outfit:wght@300;400;500;600&display=swap';
    // the webfont changes text heights: re-measure every trigger once it lands
    link.addEventListener('load', () => {
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    });
    document.head.appendChild(link);
  }, []);

  /* Pause the hero glow pulse when offscreen. */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('is-paused', !entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // CSS fallbacks only: everything visible, rails static.

      /* Hero entrance: promise headline wordRise, index card drapeSettle. */
      gsap.from('.ce-hero .ce-wi', {
        yPercent: 120, duration: 1.1, ease: 'power3.out', stagger: 0.07, delay: 0.15,
      });
      gsap.from('.ce-index-card', { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', delay: 0.55 });

      /* Standard reveals: drapeSettle. */
      gsap.utils.toArray('.ce-designers .rv, .ce-edit .rv, .ce-film .rv, .ce-styling .rv, .ce-visit .rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
        });
      });

      /* pleatStagger on product rows (alternating 2° folds). */
      const cards = gsap.utils.toArray('.ce-pcard');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 26, rotation: (i) => (i % 2 === 0 ? -2 : 2) },
          {
            opacity: 1, y: 0, rotation: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: '.ce-grid', scroller: scroller(), start: 'top 85%' },
          });
      }

      /* foldUnfold on the atelier-detail macro. */
      gsap.utils.toArray('.ce-fold').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 85%' },
          });
      });

      /* weftWipe: rack → atelier transition (bands 4, 1s). */
      gsap.fromTo('.ce-weft i',
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.25, ease: 'power2.inOut', stagger: 0.12,
          scrollTrigger: { trigger: '.ce-weft', scroller: scroller(), start: 'top 88%' },
        });

      /* Signature: mirrorColumns — one pinned stage, one ScrollTrigger. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const stage = '.ce-mirror-stage';
        const left = '.ce-rail-left';
        const right = '.ce-rail-right';
        gsap.set(right, { y: '-40%' }); // pre-offset so the downward drift never gaps
        const nav = rootRef.current && rootRef.current.querySelector('.ce-nav');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            scroller: scroller(),
            // pin just below the sticky nav so the rails are never tucked under it
            start: () => `top ${nav ? nav.offsetHeight : 0}px`,
            end: '+=280%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const i = Math.min(designers.length - 1, Math.max(0, Math.round(self.progress * (designers.length - 1))));
              if (activeRef.current !== i) { activeRef.current = i; setActive(i); }
            },
          },
        });
        tl.to(left, { y: '-40%', ease: 'none' }, 0);
        tl.to(right, { y: '0%', ease: 'none' }, 0);
      });
    }, rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, scroller]);

  const sel = designers[selected];

  return (
    <div ref={rootRef} className={`tpl-design-07-boutique${reduced ? ' is-reduced' : ''}`}>
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="ce-nav">
        <a className="ce-brand" href="#hero">
          <span className="ce-brand-mark" aria-hidden="true">{(brandName || 'K').charAt(0).toUpperCase()}</span>
          <span className="ce-brand-name">{brandName}</span>
        </a>
        <nav className="ce-nav-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button className="ce-btn ce-btn-primary ce-nav-cta" onClick={() => setSheetOpen(true)}>
          {content.styling.cta}
        </button>
      </header>

      {/* ── Hero: current exhibition ────────────────────── */}
      <section id="hero" data-tour="Current Exhibition" className="ce-hero">
        <div className="ce-hero-copy">
          <p className="ce-eyebrow">{content.hero.eyebrow}</p>
          <p className="ce-hero-exhibition">{content.hero.exhibition}</p>
          <p className="ce-hero-dates">{content.hero.dates}</p>
          <h1 className="ce-hero-title">
            <WordRise text={content.hero.title} className="ce-hero-words" />
          </h1>
          <p className="ce-hero-sub">{content.hero.sub}</p>
          <div className="ce-hero-ctas">
            <button className="ce-btn ce-btn-primary" onClick={() => setSheetOpen(true)}>
              {content.hero.cta}
            </button>
            <a className="ce-btn ce-btn-ghost" href="#collection">{content.hero.ctaSecondary}</a>
          </div>
        </div>
        <div className="ce-hero-media">
          <Img k="hero" src={heroImg} eager alt="Gallery-white boutique interior, garment rails in warm window light" className="ce-hero-img" />
          <aside ref={cardRef} className="ce-index-card" aria-label="Designer index">
            <p className="ce-index-kicker">The index</p>
            <p className="ce-index-line"><strong>12</strong> designer rooms · <strong>3</strong> rails</p>
            <ul>
              {designers.slice(0, 3).map((d) => (
                <li key={d.name}><span>{d.name}</span><em>{d.aesthetic}</em></li>
              ))}
            </ul>
            <a href="#designers" className="ce-index-link">Walk the rails</a>
          </aside>
        </div>
      </section>

      {/* ── Designers: mirrorColumns ────────────────────── */}
      <section id="designers" data-tour="The Designers" className="ce-designers">
        <div className="ce-sec-head rv">
          <p className="ce-eyebrow">{content.designers.eyebrow}</p>
          <h2 className="ce-sec-title">{content.designers.title}</h2>
          <p className="ce-sec-intro">{content.designers.intro}</p>
        </div>

        <div className="ce-mirror-stage" aria-label="Designer rails, scroll to drift">
          <div className="ce-rail ce-rail-left" aria-hidden="false">
            {designers.map((d, i) => (
              <figure key={`l-${d.name}`} className={`ce-tile${active === i ? ' is-active' : ''}`}>
                <Img k={TILE_IMAGES[i].k} src={TILE_IMAGES[i].src} alt={TILE_IMAGES[i].alt} className="ce-tile-img" />
                <figcaption><span>{d.name}</span><em>{d.aesthetic}</em></figcaption>
              </figure>
            ))}
          </div>

          <div className="ce-names" role="list" aria-label="Designer names">
            {designers.map((d, i) => (
              <button
                key={d.name}
                role="listitem"
                className={`ce-name${active === i ? ' is-active' : ''}${selected === i ? ' is-selected' : ''}`}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span className="ce-name-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="ce-name-text">{d.name}</span>
              </button>
            ))}
          </div>

          <div className="ce-rail ce-rail-right" aria-hidden="true">
            {[...designers].reverse().map((d, i) => {
              const ti = (designers.length - 1 - i) % TILE_IMAGES.length;
              return (
                <figure key={`r-${d.name}`} className="ce-tile">
                  <Img k={TILE_IMAGES[ti].k} src={TILE_IMAGES[ti].src} alt={TILE_IMAGES[ti].alt} className="ce-tile-img" />
                  <figcaption><span>{d.name}</span><em>{d.aesthetic}</em></figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="ce-explorer rv" aria-live="polite">
          <div className="ce-explorer-main">
            <p className="ce-eyebrow">In the room</p>
            <h3 className="ce-explorer-name" key={sel.name}>{sel.name}</h3>
            <p className="ce-explorer-aesthetic">{sel.aesthetic}</p>
            <p className="ce-explorer-sig">{sel.signature}</p>
            <blockquote className="ce-explorer-philo">“{sel.philosophy}”</blockquote>
            <p className="ce-explorer-price">
              <span>Price band</span>
              <strong>{price(sel.priceLow)} – {price(sel.priceHigh)}</strong>
            </p>
          </div>
          <div className="ce-explorer-badge" key={`badge-${sel.name}`} aria-hidden="true">
            <svg viewBox="0 0 48 48" className="ce-check">
              <circle cx="24" cy="24" r="22" />
              <path d="M15 24.5 21.5 31 33 17.5" />
            </svg>
            <span>Curator’s<br />selection</span>
          </div>
        </div>
        <p className="ce-note rv">{content.designers.note}</p>
      </section>

      {/* weftWipe divider: rack → atelier */}
      <div className="ce-weft" aria-hidden="true"><i /><i /><i /><i /></div>

      {/* ── The Edit: curated looks ─────────────────────── */}
      <section id="collection" data-tour="The Edit" className="ce-edit">
        <div className="ce-sec-head rv">
          <p className="ce-eyebrow">{content.collection.eyebrow}</p>
          <h2 className="ce-sec-title">{content.collection.title}</h2>
          <p className="ce-sec-intro">{content.collection.intro}</p>
        </div>
        <div className="ce-filters rv" role="group" aria-label="Filter by edit">
          {content.collection.edits.map((e) => (
            <button
              key={e.id}
              className={`ce-chip${edit === e.id ? ' is-on' : ''}`}
              aria-pressed={edit === e.id}
              onClick={() => { setFiltered(true); setEdit(e.id); }}
            >
              {e.label}
            </button>
          ))}
        </div>
        <div key={edit} className={`ce-grid${filtered ? ' is-settled' : ''}`}>
          {products.map((p, i) => {
            const im = PRODUCT_IMAGES[i % PRODUCT_IMAGES.length];
            return (
              <article key={p.name} className="ce-pcard">
                <div className="ce-pcard-media">
                  <Img k={im.k} src={im.src} alt={`${productName(i, p.name)} — ${im.alt}`} className="ce-pcard-img" />
                  {p.pick && <span className="ce-pick">Curator’s pick</span>}
                </div>
                <div className="ce-pcard-body">
                  <p className="ce-pcard-designer">{p.designer}</p>
                  <h3 className="ce-pcard-name">{productName(i, p.name)}</h3>
                  <p className="ce-pcard-fabric">{p.fabric}</p>
                  <p className="ce-pcard-price">{price(p.price)}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Atelier film: "The Rail" — scroll-driven frames ─────────── */}
      <section id="film" data-tour="Atelier Film" className="ce-film">
        <ScrollFrames frames={frames} alt="The Rail — garment rail drift" pinDistance="+=150%" stageHeight="var(--tpl-vh, 100svh)">
          <div className="ce-film-scrim" aria-hidden="true" />
          <div className="ce-film-copy rv">
            <p className="ce-eyebrow">{content.film.eyebrow}</p>
            <h2 className="ce-sec-title">{content.film.title}</h2>
            <p className="ce-sec-intro">{content.film.body}</p>
            <p className="ce-note">{content.film.note}</p>
          </div>
        </ScrollFrames>
        <figure className="ce-fold ce-film-macro rv">
          <Img k="detail" src={detailImg} alt="Macro study: tailor’s chalk marks, pinned muslin and brass shears" className="ce-macro-img" />
          <figcaption>Object study — chalk, muslin, brass</figcaption>
        </figure>
      </section>

      {/* ── Styling appointments ─────────────────────────── */}
      <section id="styling" data-tour="Styling Appointments" className="ce-styling">
        <div className="ce-sec-head rv">
          <p className="ce-eyebrow">{content.styling.eyebrow}</p>
          <h2 className="ce-sec-title">{content.styling.title}</h2>
          <p className="ce-sec-intro">{content.styling.intro}</p>
        </div>
        <div className="ce-slots">
          {content.styling.slots.map((s, i) => (
            <article key={s.name} className={`ce-slot rv${i === 0 ? ' is-featured' : ''}`}>
              <p className="ce-slot-name">{s.name}</p>
              <p className="ce-slot-detail">{s.detail}</p>
              <p className="ce-slot-desc">{s.desc}</p>
            </article>
          ))}
        </div>
        <div className="ce-styling-cta rv">
          <button className="ce-btn ce-btn-primary ce-btn-large" onClick={() => setSheetOpen(true)}>
            {content.styling.cta}
          </button>
          <p className="ce-note">Or write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a> — we reply within a day.</p>
        </div>
      </section>

      {/* ── Visit ────────────────────────────────────────── */}
      <section id="visit" data-tour="Visit" className="ce-visit">
        <div className="ce-visit-inner rv">
          <p className="ce-eyebrow">{content.visit.eyebrow}</p>
          <h2 className="ce-sec-title">{content.visit.title}</h2>
          <div className="ce-visit-grid">
            <div>
              <p className="ce-visit-k">Address</p>
              <p className="ce-visit-v">{content.visit.address}</p>
            </div>
            <div>
              <p className="ce-visit-k">Hours</p>
              <p className="ce-visit-v">{content.visit.hours}</p>
            </div>
            <div>
              <p className="ce-visit-k">Contact</p>
              <p className="ce-visit-v">
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                {contactInsta && (<><br /><span>@{contactInsta}</span></>)}
              </p>
            </div>
          </div>
          <p className="ce-note">{content.visit.note}</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="ce-footer">
        <div className="ce-footer-top">
          <div>
            <p className="ce-brand-name">{brandName}</p>
            <p className="ce-footer-line">{content.footer.line}</p>
          </div>
          <div>
            <p className="ce-footer-k">Designers</p>
            <p className="ce-footer-line">{content.footer.designersNote}</p>
          </div>
          <div>
            <p className="ce-footer-k">Press</p>
            <p className="ce-footer-line">{content.footer.press}</p>
          </div>
        </div>
        <p className="ce-copyright">{content.footer.copyright}</p>
      </footer>

      {sheetOpen && (
        <AppointmentSheet
          onClose={() => setSheetOpen(false)}
          slots={content.styling.slots}
          contact={{ email: contactEmail, instagram: contactInsta }}
        />
      )}
    </div>
  );
}
