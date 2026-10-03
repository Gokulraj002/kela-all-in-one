import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

/* Scroll-driven frame sequence for the ritual film (replaces the mp4). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-vintage';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Manrope:wght@400;500;600;700&display=swap';

/* Resolve the platform scroller from an element inside the template — the
   same rule as useTplScope, but usable from child components whose layout
   effects run before the parent's rootRef is attached. */
function scrollerFor(el) {
  try {
    const scope = el && el.closest('.tpl-scope');
    if (scope && scope.scrollHeight > scope.clientHeight + 2) return scope;
  } catch { /* window fallback */ }
  return window;
}

/* Server-safe word-mask headline (real spaces between the word masks). */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ck-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Framed print image with a sepia vignette overlay that eases out on arrival
   (opacity on the overlay only — the image `filter` itself is never animated). */
function Print({ k, src, alt, className = '' }) {
  return (
    <figure className={`ck-print ${className}`}>
      <span className="ck-print-frame">
        <Img k={k} src={src} alt={alt} />
        <span className="ck-vig" aria-hidden="true" />
      </span>
    </figure>
  );
}

/* Scrubbable decade timeline. Desktop (≥1024px): the photo panel is pinned
   beside the decades via sticky positioning and crossfades per active decade.
   Mobile: decades stack, each with its own framed print inline. */
function Timeline() {
  const reduced = useReducedMotion();
  const { brand } = useCustom();
  const name = brand || content.brand.name;
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const photosRef = useRef([]);
  const capRef = useRef(null);
  const decades = content.history.decades;
  const photos = [
    { src: heroImg, k: 'hero' },
    { src: menu1Img, k: 'product-0' },
    { src: menu2Img, k: 'product-1' },
  ];
  const mobileSrc = { 0: heroImg, 1: menu1Img, 2: menu2Img };
  const mobileKey = { 0: 'hero', 1: 'product-0', 2: 'product-1' };
  const mobileAlt = {
    0: 'Wood-panelled vintage café interior with the brass espresso machine',
    1: 'Classic cappuccino in a gold-rimmed vintage cup and saucer',
    2: 'Sachertorte slice on a floral plate over a lace doily',
  };

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;
    const cards = Array.from(wrap.querySelectorAll('.ck-decade'));
    cards.forEach((c, i) => c.classList.toggle('is-active', i === 0));
    let current = 0;
    const show = (i) => {
      if (i === current) return;
      current = i;
      cards.forEach((c, j) => c.classList.toggle('is-active', j === i));
      photosRef.current.forEach((p, j) => {
        if (!p) return;
        /* inactive photos are visually hidden — hide them from AT too */
        if (j === decades[i].photo) p.removeAttribute('aria-hidden');
        else p.setAttribute('aria-hidden', 'true');
        gsap.to(p, { opacity: j === decades[i].photo ? 1 : 0, duration: 0.6, ease: 'sine.inOut', overwrite: 'auto' });
      });
      if (capRef.current) {
        gsap.fromTo(capRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'sine.inOut' });
        capRef.current.textContent = decades[i].caption;
      }
    };
    const st = ScrollTrigger.create({
      trigger: wrap,
      scroller: scrollerFor(wrap),
      start: 'top 70%',
      end: 'bottom 55%',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
        show(Math.min(decades.length - 1, Math.floor(p * decades.length)));
      },
    });
    return () => st.kill();
  }, [reduced, decades]);

  return (
    <div className="ck-tl-grid" ref={wrapRef}>
      <div className="ck-tl-left">
        <div className="ck-tl-spine" aria-hidden="true">
          <span className="ck-tl-fill" ref={fillRef} style={reduced ? { transform: 'scaleY(1)' } : undefined} />
        </div>
        <div className="ck-decades">
          {decades.map((d, i) => (
            <article className={`ck-decade${reduced ? ' is-active' : ''}`} key={d.year}>
              <span className="ck-decade-dot" aria-hidden="true" />
              <p className="ck-decade-era">{d.decade} · {d.year}</p>
              <h3>{d.title}</h3>
              <p className="ck-decade-body">{d.body}</p>
              {[0, 1, 2].includes(d.photo) && i < 3 && (
                <Print
                  k={mobileKey[d.photo]}
                  src={mobileSrc[d.photo]}
                  alt={mobileAlt[d.photo]}
                  className="ck-decade-img"
                />
              )}
            </article>
          ))}
        </div>
      </div>
      <aside className="ck-tl-photo" aria-label="Decade photographs">
        <div className="ck-photo-stack">
          {photos.map((p, i) => (
            <span
              key={p.k}
              ref={(el) => { photosRef.current[i] = el; }}
              className="ck-photo"
              aria-hidden={i === 0 ? undefined : 'true'}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Img k={p.k} src={p.src} alt={decades.find((d) => d.photo === i)?.caption || `${name} photograph`} />
              <span className="ck-vig" aria-hidden="true" />
            </span>
          ))}
        </div>
        <p className="ck-photo-cap" ref={capRef}>{decades[0].caption}</p>
      </aside>
    </div>
  );
}

function Guestbook() {
  const reduced = useReducedMotion();
  const fine = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  /* Gentle 3D tilt toward the pointer. Driven through GSAP (not inline
     style writes) so it composes with the reveal tween and the card's
     resting rotation, and eases back flat when the pointer leaves. */
  const tilt = (e) => {
    if (reduced || !fine) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -2;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 2;
    gsap.to(el, { rotationX: rx, rotationY: ry, transformPerspective: 800, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };
  const untilt = (e) => {
    if (reduced || !fine) return;
    gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  };
  return (
    <div className="ck-guest-grid">
      {content.guestbook.entries.map((g) => (
        <blockquote
          className="ck-guest-card rv"
          key={g.name}
          onPointerMove={tilt}
          onPointerLeave={untilt}
        >
          <p className="ck-guest-quote">“{g.quote}”</p>
          <footer>
            <cite>{g.name}</cite>
            <span>{g.detail}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

/* Reservation styled as a printed ticket */
function ReserveTicket() {
  const { contact, brand } = useCustom();
  const name = brand || content.brand.name;
  const [done, setDone] = useState(null);
  const [form, setForm] = useState({ date: '', party: '2', name: '', phone: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.name.trim() || !form.phone.trim()) return;
    const n = Math.floor(1000 + Math.random() * 9000);
    setDone({ no: `CK-${n}`, ...form });
  };
  const phone = contact.phone || content.contact.phone;
  return (
    <div className="ck-ticket rv">
      {!done ? (
        <form className="ck-ticket-main" onSubmit={submit}>
          <p className="ck-ticket-head">Table Reservation</p>
          <div className="ck-field-row">
            <label className="ck-field">
              <span>Date</span>
              <input type="date" required value={form.date} onChange={set('date')} />
            </label>
            <label className="ck-field">
              <span>Party</span>
              <select value={form.party} onChange={set('party')}>
                {['1', '2', '3', '4', '5', '6+'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="ck-field">
            <span>Name</span>
            <input type="text" required placeholder="Your name" value={form.name} onChange={set('name')} autoComplete="name" />
          </label>
          <label className="ck-field">
            <span>Phone</span>
            <input type="tel" required placeholder="+91 …" value={form.phone} onChange={set('phone')} autoComplete="tel" />
          </label>
          <button type="submit" className="ck-ticket-btn">
            <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
              <rect x="2" y="2" width="196" height="56" pathLength="100" className="ck-dash" />
            </svg>
            <span>Hold My Table</span>
          </button>
          <p className="ck-ticket-fine">Prefer to call? <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
        </form>
      ) : (
        <div className="ck-ticket-main ck-ticket-done">
          <p className="ck-ticket-head">Table Held</p>
          <p className="ck-done-no">{done.no}</p>
          <dl>
            <div><dt>Date</dt><dd>{done.date}</dd></div>
            <div><dt>Party</dt><dd>{done.party}</dd></div>
            <div><dt>Name</dt><dd>{done.name}</dd></div>
          </dl>
          <p className="ck-done-note">{content.reserve.success}</p>
          <button type="button" className="ck-link" onClick={() => setDone(null)}>Make another reservation</button>
        </div>
      )}
      <div className="ck-ticket-stub" aria-hidden="true">
        <span className="ck-stub-seal">{name.charAt(0)}</span>
        <span className="ck-stub-text">{content.reserve.stub}</span>
        <span className="ck-stub-no">{done ? done.no : '№ ————'}</span>
      </div>
    </div>
  );
}

/* Framed print per menu classic (image subjects verified against assets). */
const STACK_IMG = [
  { src: menu1Img, k: 'product-0', alt: 'Classic cappuccino in a gold-rimmed vintage cup and saucer' },
  { src: heroImg, k: 'hero', alt: 'The wood-panelled room where filter coffee has poured since 1962' },
  { src: menu2Img, k: 'product-1', alt: 'Sachertorte slice on a floral plate over a lace doily' },
  { src: detailImg, k: 'detail', alt: 'The aged wooden house sign hanging by chains near the door' },
  { src: menu3Img, k: 'product-2', alt: 'The 1962 brass lever espresso machine, gauge and copper pipework gleaming' },
];

/* Sticky stacking deck of the menu classics. Desktop (≥768px): each card
   sticks in place while the next slides over it; a scrub timeline scales the
   covered card down slightly for depth. Deliberately distinct from the
   history timeline's sticky photo panel (that one crossfades photos in a
   pinned aside; this one stacks whole cards). Mobile / reduced motion: a
   graceful static stack with every card visible. */
function StackDeck() {
  const { productName, price } = useCustom();
  const reduced = useReducedMotion();
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduced) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const cards = Array.from(stage.querySelectorAll('.ck-stack-card'));
      const sc = scrollerFor(stage);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            scroller: sc,
            start: 'top bottom',
            end: 'top 15rem',
            scrub: 0.5,
          },
        });
      });
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      id="signatures"
      data-tour="House Signatures"
      className={`ck-section ck-signatures${reduced ? ' is-reduced' : ''}`}
    >
      <div className="ck-wrap ck-narrow">
        <p className="ck-eyebrow rv">{content.signatures.eyebrow}</p>
        <h2 className="ck-h2 rv">{content.signatures.title}</h2>
        <p className="ck-lede rv">{content.signatures.sub}</p>
      </div>
      <div className="ck-stack" ref={stageRef}>
        {content.menu.items.map((item, i) => {
          const im = STACK_IMG[i % STACK_IMG.length];
          return (
            <article
              className="ck-stack-card"
              key={item.name}
              aria-label={`${item.name} — on the menu since ${item.since}`}
            >
              <div className="ck-stack-inner">
                <div className="ck-stack-media">
                  <Img k={im.k} src={im.src} alt={im.alt} />
                  <span className="ck-vig" aria-hidden="true" />
                </div>
                <div className="ck-stack-copy">
                  <p className="ck-stack-no">№ {i + 1}</p>
                  <p className="ck-decade-era">on the menu since {item.since}</p>
                  <h3>{productName(i, item.name)}</h3>
                  <p className="ck-stack-desc">{item.desc}</p>
                  <p className="ck-price">{price(item.price)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* The Ritual — the signature film moment, mid-page (never the hero).
   The mp4 is replaced by a scroll-driven frame sequence: the stage pins
   while the visitor scrubs through the 72 extraction frames. The sepia
   vignette rides along as the overlay child. Reduced motion renders the
   first frame as a static print. */
function Ritual() {
  const alt = 'Brass lever pulled down in one smooth draw, espresso ribboning into a vintage cup';
  return (
    <section id="ritual" data-tour="The Ritual" className="ck-section ck-ritual">
      <div className="ck-wrap ck-narrow">
        <p className="ck-eyebrow rv">{content.ritual.eyebrow}</p>
        <h2 className="ck-h2 rv">{content.ritual.title}</h2>
        <p className="ck-lede rv">{content.ritual.body}</p>
      </div>
      <div className="ck-wrap">
        <div className="ck-ritual-film">
          <ScrollFrames frames={frames} alt={alt} pinDistance="+=170%" stageHeight="clamp(220px, 42.86vw, 72svh)">
            <span className="ck-vig" aria-hidden="true" />
          </ScrollFrames>
        </div>
        <p className="ck-ritual-note rv">{content.ritual.note}</p>
      </div>
    </section>
  );
}

export default function Design05Vintage() {
  const { brand, productName, price, contact } = useCustom();
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

  /* Expose the sticky crest-nav height as --ck-nav-h so the pinned ritual
     film can sit just below it instead of under it. */
  useLayoutEffect(() => {
    const root = rootRef.current;
    const nav = root && root.querySelector('.ck-nav');
    if (!nav) return undefined;
    const set = () => root.style.setProperty('--ck-nav-h', `${Math.round(nav.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(nav);
    return () => ro.disconnect();
  }, [rootRef]);

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

      /* Hero: sepia interior fades in over 2s, the since-line letterpress-
         stamps in, headline word-rises at a stately pace. */
      const tl = gsap.timeline();
      tl.fromTo('.ck-hero-media', { opacity: 0 }, { opacity: 1, duration: 2, ease: 'sine.out' }, 0)
        .fromTo(
          '.ck-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 },
          0.3
        )
        .fromTo(
          '.ck-since',
          { opacity: 0, y: 1 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'sine.out' },
          0.8
        )
        .fromTo('.ck-hero-sub', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'sine.out' }, 1.1)
        .fromTo('.ck-hero-cta', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'sine.out' }, 1.4);

      /* Long, slow reveals — everything arrives like a memory surfacing. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Sepia vignette eases out as each print arrives (overlay opacity only). */
      gsap.utils.toArray('.ck-print, .ck-photo').forEach((el) => {
        const vig = el.querySelector('.ck-vig');
        if (!vig) return;
        gsap.fromTo(
          vig,
          { opacity: 0.85 },
          {
            opacity: 0.25,
            duration: 1.5,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 85%', once: true },
          }
        );
        /* .ck-photo opacity belongs to the Timeline crossfade — never fade it here. */
        if (el.classList.contains('ck-photo')) return;
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.6,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-05-vintage">
      {/* Crest nav */}
      <header className="ck-nav">
        <a className="ck-crest" href="#hero" aria-label={`${name} — home`}>
          <span className="ck-crest-mark">{name.charAt(0)}</span>
          <span className="ck-crest-name">{name}</span>
          <span className="ck-crest-sub">EST. 1962</span>
        </a>
        <nav className="ck-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="ck-ticket-link" href="#reserve">Reserve a Table</a>
      </header>

      {/* Hero */}
      <section id="hero" data-tour="Since 1962" className="ck-hero">
        <div className="ck-wrap ck-hero-inner">
          <p className="ck-since">{content.hero.since}</p>
          <h1 className="ck-hero-title">
            <Words text={content.hero.title} />
          </h1>
          <p className="ck-hero-sub">{content.hero.sub}</p>
          <a className="ck-hero-cta" href="#reserve">{content.hero.cta}</a>
        </div>
        <div className="ck-hero-media">
          <Img k="hero" src={heroImg} alt="Wood-panelled vintage café interior with the brass espresso machine, warm tungsten light" eager />
          <span className="ck-vig" aria-hidden="true" />
        </div>
      </section>

      {/* History timeline */}
      <section id="history" data-tour="Our History" className="ck-section ck-history">
        <div className="ck-wrap">
          <p className="ck-eyebrow rv">{content.history.eyebrow}</p>
          <h2 className="ck-h2 rv">{content.history.title}</h2>
          <p className="ck-lede rv">{content.history.sub}</p>
          <Timeline />
        </div>
      </section>

      {/* Classic menu */}
      <section id="menu" data-tour="The Classics" className="ck-section ck-menu">
        <div className="ck-wrap ck-narrow">
          <p className="ck-eyebrow rv">{content.menu.eyebrow}</p>
          <h2 className="ck-h2 rv">{content.menu.title}</h2>
          <p className="ck-lede rv">{content.menu.sub}</p>
          <div className="ck-classics">
            {content.menu.items.map((item, i) => (
              <div className="ck-classic rv" key={item.name}>
                <div className="ck-classic-head">
                  <h3>{productName(i, item.name)}</h3>
                  <span className="ck-dots" aria-hidden="true" />
                  <span className="ck-price">{price(item.price)}</span>
                </div>
                <p className="ck-classic-desc">{item.desc}</p>
                <p className="ck-since-note">on the menu since {item.since}</p>
              </div>
            ))}
          </div>
          <div className="ck-menu-prints">
            <Print k="product-0" src={menu1Img} alt="Classic cappuccino in a gold-rimmed vintage cup and saucer" />
            <Print k="product-1" src={menu2Img} alt="Sachertorte slice on a floral plate over a lace doily" />
          </div>
        </div>
      </section>

      {/* House signatures: sticky stacking deck */}
      <StackDeck />

      {/* The ritual: signature film moment */}
      <Ritual />

      {/* Craft */}
      <section id="craft" data-tour="The Craft" className="ck-section ck-craft">
        <div className="ck-wrap ck-craft-grid">
          <Print k="product-2" src={menu3Img} alt="The brass lever espresso machine, polished and gleaming" />
          <div>
            <p className="ck-eyebrow rv">{content.craft.eyebrow}</p>
            <h2 className="ck-h2 rv">{content.craft.title}</h2>
            <p className="ck-body rv">{content.craft.body}</p>
            <ul className="ck-craft-list">
              {content.craft.points.map((p) => (
                <li className="rv" key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <section id="guestbook" data-tour="Guestbook" className="ck-section ck-guestbook">
        <div className="ck-wrap">
          <p className="ck-eyebrow rv">{content.guestbook.eyebrow}</p>
          <h2 className="ck-h2 rv">{content.guestbook.title}</h2>
          <Guestbook />
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" data-tour="Reserve a Table" className="ck-section ck-reserve">
        <div className="ck-wrap ck-narrow">
          <p className="ck-eyebrow rv">{content.reserve.eyebrow}</p>
          <h2 className="ck-h2 rv">{content.reserve.title}</h2>
          <p className="ck-lede rv">{content.reserve.sub}</p>
          <ReserveTicket />
          <p className="ck-hours rv">{content.contact.hours} · {content.contact.address}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="ck-footer">
        <div className="ck-wrap">
          <p className="ck-foot-crest">{name}</p>
          <p className="ck-foot-line">{content.footer.line}</p>
          <p className="ck-foot-note">{content.footer.note}</p>
          <p className="ck-foot-contact">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <nav className="ck-foot-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
