import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import room1Img from './assets/room-1.webp';
import room2Img from './assets/room-2.webp';
import room3Img from './assets/room-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frame sequence (replaces the autoplay loop video). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-noir';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`nr-wm ${className}`} aria-label={text}>
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

/* Custom cursor: one rAF loop, lerp 0.15, expands over interactive elements.
   Desktop pointer:fine only; never rendered for reduced-motion or touch. */
function Cursor({ reduced }) {
  const ringRef = useRef(null);
  useEffect(() => {
    if (reduced) return undefined;
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const ring = ringRef.current;
    if (!ring) return undefined;
    const scope = ring.closest('.tpl-design-10-noir');
    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;
    /* One rAF loop that sleeps once the ring has caught up with the pointer,
       so an idle cursor costs nothing while the page scrolls. */
    const tick = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      ring.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onOver = (e) => {
      const t = e.target;
      const hit = t && t.closest && t.closest('a,button,input,select,[role="button"]');
      ring.classList.toggle('is-hover', !!hit);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    if (scope) scope.classList.add('nr-cursor-on');
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (scope) scope.classList.remove('nr-cursor-on');
    };
  }, [reduced]);
  if (reduced) return null;
  return <div ref={ringRef} className="nr-cursor" aria-hidden="true" />;
}

/* Hidden overlay menu: circular clip-path expand from the button, 0.7s power4.inOut. */
function OverlayMenu({ open, onClose }) {
  const menuRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (reduced) {
      el.style.visibility = open ? 'visible' : 'hidden';
      el.style.clipPath = 'none';
      return;
    }
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      gsap.fromTo(
        el,
        { clipPath: 'circle(0% at calc(100% - 3.2rem) 2.6rem)' },
        { clipPath: 'circle(150% at calc(100% - 3.2rem) 2.6rem)', duration: 0.7, ease: 'power4.inOut' }
      );
      gsap.fromTo(
        el.querySelectorAll('.nr-menu-link, .nr-menu-cta, .nr-menu-tag'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.32, ease: 'power3.out', overwrite: 'auto' }
      );
    } else {
      gsap.to(el, {
        clipPath: 'circle(0% at calc(100% - 3.2rem) 2.6rem)',
        duration: 0.7,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(el, { visibility: 'hidden' }),
      });
    }
  }, [open, reduced]);
  return (
    <div ref={menuRef} className="nr-menu" aria-hidden={!open} inert={!open ? true : undefined}>
      <nav className="nr-menu-inner" aria-label="Overlay">
        {content.nav.map((n, i) => (
          <a key={n.href} className="nr-menu-link" href={n.href} onClick={onClose} tabIndex={open ? 0 : -1}>
            <span className="nr-menu-num">{String(i + 1).padStart(2, '0')}</span>
            {n.label}
          </a>
        ))}
        <a className="nr-menu-cta" href="#contact" onClick={onClose} tabIndex={open ? 0 : -1}>
          {content.hero.cta}
        </a>
        <p className="nr-menu-tag">{content.brand.tagline}</p>
      </nav>
    </div>
  );
}

const roomImages = { 'product-0': room1Img, 'product-2': room3Img, 'product-3': detailImg };
const nightImages = { 'product-1': room2Img, detail: detailImg };

function RoomFrame({ room, index }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="nr-frame" aria-label={productName(index, room.name)}>
      <div className="nr-frame-strip">
        <span className="nr-sprockets" aria-hidden="true" />
        <div className="nr-frame-img">
          <Img k={room.imgKey} src={img(room.imgKey, roomImages[room.imgKey])} alt={room.alt} />
          <span className="nr-leak" aria-hidden="true" />
        </div>
        <span className="nr-sprockets" aria-hidden="true" />
      </div>
      <div className="nr-frame-meta">
        <p className="nr-frame-shot">{room.shot}</p>
        <h3 className="nr-frame-name">{productName(index, room.name)}</h3>
        <p className="nr-frame-desc">{room.desc}</p>
        <div className="nr-frame-rate">
          <span className="nr-frame-price">{price(room.price)} / night</span>
          <span className="nr-frame-size">{room.size}</span>
        </div>
      </div>
    </article>
  );
}

function Booking() {
  const { productName, price } = useCustom();
  const rooms = content.rooms.items;
  const [roomIdx, setRoomIdx] = useState(0);
  const iso = (d) => d.toISOString().slice(0, 10);
  const [ci, setCi] = useState(() => iso(new Date(Date.now() + 7 * 86400000)));
  const [co, setCo] = useState(() => iso(new Date(Date.now() + 8 * 86400000)));
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);
  const nights = Math.max(0, Math.round((new Date(co) - new Date(ci)) / 86400000));
  const perNight = rooms[roomIdx].price;
  const total = nights * perNight;
  const L = content.contact.labels;
  return (
    <div className="nr-book-form">
      {done ? (
        <div className="nr-book-confirm" role="status">
          <p>{L.reserved}</p>
          <p className="nr-mono">
            {productName(roomIdx, rooms[roomIdx].name)} — {nights} {L.nights.toLowerCase()} — {price(total)}
          </p>
          <p className="nr-mono">{content.contact.confirm}</p>
        </div>
      ) : (
        <>
          <div className="nr-field">
            <label htmlFor="nr-room">{L.room}</label>
            <select id="nr-room" value={roomIdx} onChange={(e) => setRoomIdx(Number(e.target.value))}>
              {rooms.map((r, i) => (
                <option key={r.name} value={i}>
                  {productName(i, r.name)} — {price(r.price)}
                </option>
              ))}
            </select>
          </div>
          <div className="nr-field-row">
            <div className="nr-field">
              <label htmlFor="nr-ci">{L.checkin}</label>
              <input id="nr-ci" type="date" value={ci} onChange={(e) => setCi(e.target.value)} />
            </div>
            <div className="nr-field">
              <label htmlFor="nr-co">{L.checkout}</label>
              <input id="nr-co" type="date" value={co} min={ci} onChange={(e) => setCo(e.target.value)} />
            </div>
          </div>
          <div className="nr-field">
            <label htmlFor="nr-guests">{L.guests}</label>
            <select id="nr-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {[1, 2, 3, 4].map((g) => (
                <option key={g} value={g}>
                  {g} {g === 1 ? 'guest' : 'guests'}
                </option>
              ))}
            </select>
          </div>
          <div className="nr-book-math" aria-live="polite">
            <div className="nr-mrow">
              <span>{L.nights}</span>
              <span>{nights > 0 ? nights : '—'}</span>
            </div>
            <div className="nr-mrow">
              <span>{L.perNight}</span>
              <span>{price(perNight)}</span>
            </div>
            <div className="nr-mrow nr-total">
              <span>{L.total}</span>
              <span>{nights > 0 ? price(total) : '—'}</span>
            </div>
          </div>
          <button type="button" className="nr-btn nr-btn-solid" disabled={nights <= 0} onClick={() => setDone(true)}>
            {L.reserve}
          </button>
          <p className="nr-book-demo">{content.contact.demo}</p>
        </>
      )}
    </div>
  );
}

export default function Design10Noir() {
  const { brand, img, contact, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.lines.find((l) => l.k === 'Email').v;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Escape closes the overlay menu. */
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero: light-shaft gradient sweep + masked word-rise headline. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.nr-shaft', { xPercent: -160 }, { xPercent: 560, duration: 3, ease: 'power2.inOut' }, 0.3)
        .fromTo(
          '.nr-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 },
          0.35
        )
        .fromTo(
          '.nr-hero .nr-eyebrow, .nr-hero-sub, .nr-hero-cryptic, .nr-hero-ctas',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
          0.8
        );

      /* Slow reveals: light arriving, nothing pops. */
      gsap.utils.toArray('.nr-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.nr-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      gsap.utils.toArray('.nr-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Invert flash — exactly once, at the manifesto (0.15s total, 8%). */
      const manifesto = rootRef.current && rootRef.current.querySelector('.nr-manifesto');
      if (manifesto) {
        ScrollTrigger.create({
          trigger: manifesto,
          scroller: sc,
          start: 'top 72%',
          once: true,
          onEnter: () => {
            gsap
              .timeline()
              .to('.nr-invertflash', { autoAlpha: 0.08, duration: 0.075, ease: 'none' })
              .to('.nr-invertflash', { autoAlpha: 0, duration: 0.075, ease: 'none' });
          },
        });
      }

      /* Persistent booking bar: on once the hero is behind, and it steps
         aside when the booking section itself arrives (without an explicit
         end it switched off again as soon as the hero left the screen). */
      const bookbar = rootRef.current && rootRef.current.querySelector('.nr-bookbar');
      if (bookbar) {
        ScrollTrigger.create({
          trigger: '.nr-hero',
          scroller: sc,
          start: 'bottom 55%',
          endTrigger: '#contact',
          end: 'top 85%',
          onToggle: (self) => bookbar.classList.toggle('is-on', self.isActive),
        });
      }

      /* Signature: Filmstrip noir — pinned vertical strip, frames advance
         with the scroll; each entering frame gets a light-leak sweep.
         Desktop only; mobile and reduced-motion get stacked frames. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.nr-strip-pin');
        if (!pin) return undefined;
        const track = pin.querySelector('.nr-strip-track');
        /* The pinned stage is exactly the visible scroll area (CSS .is-pinned)
           and the strip travels only its own overflow — no empty tail after
           the last reel. */
        pin.classList.add('is-pinned');
        const dist = () => Math.max(0, track.scrollHeight - pin.clientHeight);
        const frameEls = gsap.utils.toArray('.nr-frame', pin);
        const leaks = frameEls.map((f) => f.querySelector('.nr-leak'));
        const played = frameEls.map(() => false);
        const playLeak = (i) => {
          if (played[i] || !leaks[i]) return;
          played[i] = true;
          gsap.fromTo(leaks[i], { xPercent: -140 }, { xPercent: 140, duration: 0.6, ease: 'power2.inOut' });
        };
        /* Light-leak sweep as each reel enters, read from the strip's own
           (scrubbed) position — containerAnimation only works horizontally. */
        const sweepEntering = () => {
          const travelled = -(Number(gsap.getProperty(track, 'y')) || 0);
          const edge = pin.clientHeight * 0.55;
          frameEls.forEach((f, i) => {
            if (!played[i] && f.offsetTop - travelled < edge) playLeak(i);
          });
        };
        gsap.to(track, {
          y: () => -dist(),
          ease: 'none',
          onUpdate: sweepEntering,
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        /* the first reel is already in frame as the strip arrives */
        ScrollTrigger.create({
          trigger: pin,
          scroller: sc,
          start: 'top 55%',
          once: true,
          onEnter: () => playLeak(0),
        });
        return () => pin.classList.remove('is-pinned');
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const visit = content.visit;
  const lowestRate = Math.min(...content.rooms.items.map((r) => r.price));

  return (
    <div ref={rootRef} className="tpl-design-10-noir">
      <Cursor reduced={reduced} />
      <div className="nr-grain" aria-hidden="true" />
      <div className="nr-invertflash" aria-hidden="true" />

      {/* Zero-height sticky shell keeps the nav inside the scroll area. */}
      <div className="nr-navshell">
        <header className="nr-nav">
          <a className="nr-wordmark" href="#hero">
            <em>{name}</em>
          </a>
          <button type="button" className="nr-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-controls="nr-overlay-menu">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </header>
      </div>
      <div id="nr-overlay-menu">
        <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      <main>
        {/* HERO — scroll-driven frame sequence, pinned scrub */}
        <section id="hero" className="nr-hero" data-tour="The Lobby">
          <ScrollFrames frames={frames} alt={content.hero.videoAlt} pinDistance="+=170%">
            <div className="nr-hero-veil" aria-hidden="true" />
            <div className="nr-shaft" aria-hidden="true" />
            <div className="nr-hero-copy">
              <p className="nr-eyebrow">
                <span className="nr-tc">{content.hero.eyebrow}</span>
              </p>
              <h1 className="nr-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="nr-hero-sub">{content.hero.sub}</p>
              <p className="nr-hero-cryptic">{content.hero.cryptic}</p>
              <div className="nr-hero-ctas">
                <a className="nr-btn nr-btn-solid" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="nr-btn" href={content.hero.altCtaHref}>
                  {content.hero.altCta}
                </a>
              </div>
            </div>
            <span className="nr-hero-scroll" aria-hidden="true">Scroll</span>
          </ScrollFrames>
        </section>

        {/* THE CONCEPT */}
        <section id="story" className="nr-sec" data-tour="The Concept">
          <div className="nr-wrap nr-story-grid">
            <div>
              <p className="nr-eyebrow nr-rv">{content.story.eyebrow}</p>
              <h2 className="nr-h2 nr-rv">
                A hotel, <em>treated like a film.</em>
              </h2>
              <span className="nr-rule" aria-hidden="true" />
              {content.story.body.map((p, i) => (
                <p className="nr-body nr-rv" key={i}>
                  {p}
                </p>
              ))}
            </div>
            <ol className="nr-manifesto nr-stagger">
              {content.story.manifesto.map((m) => (
                <li key={m.n}>
                  <span className="nr-mn">{m.n}.</span>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ROOMS — filmstrip noir */}
        <section id="rooms" className="nr-sec" data-tour="The Rooms" style={{ paddingBottom: 0 }}>
          <div className="nr-wrap nr-strip-head">
            <p className="nr-eyebrow nr-rv">{content.rooms.eyebrow}</p>
            <h2 className="nr-h2 nr-rv">
              Sleep <em>in the frame.</em>
            </h2>
            <p className="nr-strip-hint nr-rv">{content.rooms.hint}</p>
          </div>
          <div className="nr-strip-pin">
            <div className="nr-strip-track">
              {content.rooms.items.map((room, i) => (
                <RoomFrame key={room.name} room={room} index={i} />
              ))}
            </div>
          </div>
          <p className="nr-strip-note">{content.rooms.note}</p>
        </section>

        {/* THE NIGHT */}
        <section id="dining" className="nr-sec" data-tour="The Night">
          <div className="nr-wrap">
            <p className="nr-eyebrow nr-rv">{content.night.eyebrow}</p>
            <h2 className="nr-h2 nr-rv">
              After 22:00, <em>the reel changes.</em>
            </h2>
            <div className="nr-night-grid nr-stagger">
              {content.night.items.map((n) => (
                <article className="nr-night-card" key={n.name}>
                  {n.textOnly ? (
                    <div className="nr-night-textonly" aria-hidden="true">
                      <span className="nr-big">23–02</span>
                      <p>
                        Broth
                        <br />
                        Toast
                        <br />
                        Black coffee
                        <br />
                        One chocolate dessert
                      </p>
                    </div>
                  ) : (
                    <div className="nr-night-img">
                      <Img k={n.imgKey} src={img(n.imgKey, nightImages[n.imgKey])} alt={n.alt} />
                    </div>
                  )}
                  <p className="nr-night-hours">{n.hours}</p>
                  <h3 className="nr-night-name">{n.name}</h3>
                  <p className="nr-night-desc">{n.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SCREENINGS */}
        <section id="experiences" className="nr-sec nr-screen" data-tour="Screenings">
          <div className="nr-wrap">
            <p className="nr-eyebrow nr-rv">{content.screenings.eyebrow}</p>
            <h2 className="nr-h2 nr-rv">
              The courtyard <em>screen.</em>
            </h2>
            <p className="nr-lede nr-rv">{content.screenings.body}</p>
            <ul className="nr-events nr-stagger">
              {content.screenings.events.map((e) => (
                <li key={e.name}>
                  <h3 className="nr-event-name">{e.name}</h3>
                  <span className="nr-event-when">{e.when}</span>
                  <p className="nr-event-desc">{e.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* PRACTICAL — in mono */}
        <section id="visit" className="nr-sec" data-tour="Practical">
          <div className="nr-wrap">
            <p className="nr-eyebrow nr-rv">{content.visit.eyebrow}</p>
            <h2 className="nr-h2 nr-rv">
              The fine print, <em>in plain type.</em>
            </h2>
            <dl className="nr-practical nr-stagger">
              {visit.lines.map((l) => (
                <div className="nr-practical-row" key={l.k}>
                  <dt>{l.k}</dt>
                  <dd>
                    {l.k === 'Email' ? <a href={`mailto:${email}`}>{email}</a> : l.k === 'Phone' ? <a href={`tel:${l.v.replace(/\s/g, '')}`}>{l.v}</a> : l.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* BOOK A NIGHT */}
        <section id="contact" className="nr-sec nr-book" data-tour="Book a Night">
          <div className="nr-wrap">
            <p className="nr-eyebrow nr-rv">{content.contact.eyebrow}</p>
            <h2 className="nr-h2 nr-rv">
              Book <em>a night.</em>
            </h2>
            <div className="nr-book-grid">
              <div>
                <p className="nr-lede nr-rv">{content.contact.body}</p>
                <p className="nr-body nr-rv">
                  Nights from <span className="nr-frame-price">{price(lowestRate)}</span>. Check-in 15:00, check-out 12:00 — the doors lock at 02:00.
                </p>
              </div>
              <div className="nr-rv">
                <Booking />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="nr-footer">
        <div className="nr-wrap">
          <p className="nr-footer-word nr-rv">
            {name.includes(' ') ? (
              <>
                {name.slice(0, name.lastIndexOf(' '))} <em>{name.slice(name.lastIndexOf(' ') + 1)}</em>
              </>
            ) : (
              <em>{name}</em>
            )}
          </p>
          <p className="nr-footer-line">{content.footer.line}</p>
          <p className="nr-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      <aside className="nr-bookbar" aria-label="Quick booking">
        <span className="nr-bb-rate">
          From <strong>{price(lowestRate)}</strong> / night
        </span>
        <a className="nr-btn nr-btn-solid" href="#contact">
          {content.hero.cta}
        </a>
      </aside>
    </div>
  );
}
