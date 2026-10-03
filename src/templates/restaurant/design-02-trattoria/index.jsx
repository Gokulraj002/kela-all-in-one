import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-scrubbed hero frames (Apple-style): 72 JPGs extracted from the
   signature flame-toss clip. import.meta.glob keeps the export build clean. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-trattoria';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,400&family=Karla:wght@400;500;700&display=swap';

const IMG_BY_KEY = {
  hero: heroImg,
  'product-0': dish1Img,
  'product-1': dish2Img,
  'product-2': dish3Img,
  detail: detailImg,
};
const resolveImg = (imgFn, key, fallback) => imgFn(key, fallback || IMG_BY_KEY[key] || heroImg);

/* ---------- The lazy-susan orbit ring (M2) ---------- */
const ORBIT_COUNT = 6;
const ORBIT_STEP = 360 / ORBIT_COUNT;

/* The centred suggestion. Rendered inside the ring on wider screens and under
   it on phones, where the ring is too small to hold it. */
function OrbitLabel({ dish, name, price, place }) {
  return (
    <div className={`ct-orbit-label is-${place}`} aria-live="polite">
      <p className="ct-orbit-label-kicker">Tonight's suggestion</p>
      <h3 className="ct-orbit-label-name">{name}</h3>
      <p className="ct-orbit-label-note">{dish.note}</p>
      <p className="ct-orbit-label-price">{price(dish.price)}</p>
    </div>
  );
}

/* The active dish lives here, not in the page: the scrubbed rotation only
   re-renders the ring (a whole-page render mid-scroll costs frames). The page
   drives it through setActiveRef. */
function OrbitRing({ dishes, imgFn, productName, price, reduced, setActiveRef, brandName }) {
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    setActiveRef.current = (i) => setActive((prev) => (prev === i ? prev : i));
    return () => { setActiveRef.current = null; };
  }, [setActiveRef]);
  const current = dishes[active] || dishes[0];
  const currentName = productName(active, current.name);
  return (
    <>
    <div className={`ct-orbit-stage${reduced ? ' is-static' : ''}`}>
      <span className="ct-orbit-path" aria-hidden="true" />
      <span className="ct-orbit-marker" aria-hidden="true" />
      <div className="ct-orbit-ring">
        {dishes.map((d, i) => {
          const a = ORBIT_STEP * i;
          const name = productName(i, d.name);
          return (
            <article
              key={d.name}
              className={`ct-orbit-card${i === active ? ' is-top' : ''}`}
              style={{
                transform: `translate(-50%, -50%) rotate(${a}deg) translateY(calc(-1 * var(--ct-orbit-r))) rotate(${-a}deg)`,
              }}
              aria-label={name}
            >
              <div className="ct-orbit-card-inner">
                <span className="ct-orbit-img">
                  <Img k={d.img} src={resolveImg(imgFn, d.img)} alt={name} />
                </span>
                <h3 className="ct-orbit-name">{name}</h3>
                <p className="ct-orbit-price">{price(d.price)}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="ct-orbit-center">
        <span className="ct-orbit-center-img">
          <Img k="hero" src={imgFn('hero', heroImg)} alt={`A family table at ${brandName}, laden with dishes`} />
        </span>
        <OrbitLabel key={active} dish={current} name={currentName} price={price} place="inside" />
      </div>
    </div>
    <OrbitLabel key={`b${active}`} dish={current} name={currentName} price={price} place="below" />
    </>
  );
}

export default function Design02Trattoria() {
  const { brand, img, productName, price, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const orbitActiveRef = useRef(null);
  const brandName = brand || content.brand.name;
  const email = (contact && contact.email) || content.visit.email;
  const telHref = `tel:${content.phone.replace(/\s/g, '')}`;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      const sc = scroller();

      /* Hero: pour-wipe in on the scrub stage + word-rise, stagger 0.12 */
      gsap.fromTo(
        '.sf-stage',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power3.inOut', delay: 0.15 }
      );
      gsap.fromTo(
        '.ct-hero-line',
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.7 }
      );
      gsap.fromTo(
        '.ct-hero-eyebrow, .ct-hero-sub, .ct-hero-ctas',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo(
        '.ct-nav',
        { y: -64, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2, clearProps: 'transform' }
      );

      /* House grammar: warm reveals, stagger 0.12. CSS transitions are parked
         while GSAP drives the element (a transform transition would chase
         every frame), and the transform is handed back to the stylesheet once
         it lands so tilts and hover lifts keep working. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.set(el, { transition: 'none' });
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'transform,transition',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* M2 — Lazy-susan orbit. The ring lives in normal flow; scrolling the
         section scrubs rotation 0 → 120deg. Each card's angle carries the
         scrub rotation and it counter-rotates by the same amount to stay
         upright; the centred label crossfades to whichever card is on top.
         (Rotation is applied once, via the card transforms — the ring itself
         is not rotated.) */
      const stage = rootRef.current && rootRef.current.querySelector('.ct-orbit-stage');
      if (stage && !stage.classList.contains('is-static')) {
        const cards = gsap.utils.toArray('.ct-orbit-card', stage);
        const applyRot = (rot) => {
          cards.forEach((card, i) => {
            const a = ORBIT_STEP * i + rot;
            card.style.transform =
              `translate(-50%, -50%) rotate(${a}deg) ` +
              `translateY(calc(-1 * var(--ct-orbit-r))) rotate(${-a}deg)`;
          });
          let best = 0;
          let bestD = 181;
          for (let i = 0; i < ORBIT_COUNT; i++) {
            const a = (((ORBIT_STEP * i + rot) % 360) + 360) % 360;
            const d = Math.min(a, 360 - a);
            if (d < bestD) { bestD = d; best = i; }
          }
          if (orbitActiveRef.current) orbitActiveRef.current(best);
        };
        const proxy = { rot: 0 };
        applyRot(0);
        gsap.to(proxy, {
          rot: 120,
          ease: 'none',
          onUpdate: () => applyRot(proxy.rot),
          scrollTrigger: {
            trigger: stage,
            scroller: sc,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 1,
          },
        });
      }

      /* Chalkboard: dish names draw in with a chalk-like stagger */
      gsap.utils.toArray('.ct-cb-group').forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll('.ct-cb-row'),
          { opacity: 0, y: 20, rotation: () => gsap.utils.random(-1.2, 1.2) },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Gentle parallax drift on editorial images */
      gsap.utils.toArray('.ct-drift').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40 },
          {
            y: -40,
            ease: 'none',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, scroller]);

  return (
    <div ref={rootRef} className="tpl-design-02-trattoria">
      <div className="ct-root">
        {/* ============ NAV ============ */}
        {/* Zero-height sticky dock: the bar overlays the hero instead of
            pushing it below the fold, so nothing shifts when the hero pins. */}
        <div className="ct-nav-dock">
        <nav className="ct-nav" aria-label="Main">
          <div className="ct-wrap ct-nav-inner">
            <a className="ct-wordmark" href="#hero">
              {brandName}
              <span className="ct-wordmark-sub">{content.brand.tagline}</span>
            </a>
            <div className="ct-nav-links">
              {content.nav.map((n) => (
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
            </div>
            <div className="ct-nav-right">
              <a className="ct-phone" href={telHref}>{content.phone}</a>
              <a className="ct-btn ct-btn-solid ct-nav-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
          </div>
        </nav>
        </div>

        {/* ============ HERO (scroll-scrubbed flame-toss frames) ============ */}
        <header id="hero" data-tour="The Family Table" className="ct-hero">
          <ScrollFrames
            frames={frames}
            alt={`A pan hitting open flame in the ${brandName} kitchen, pasta tossed through fire`}
            pinDistance="+=170%"
          >
            <div className="ct-hero-scrim" aria-hidden="true" />
            <div className="ct-hero-content">
              <div className="ct-wrap">
                <p className="ct-hero-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="ct-hero-title">
                  {content.hero.title.map((line) => (
                    <span key={line} className="ct-hero-line">{line}</span>
                  ))}
                </h1>
                <p className="ct-hero-sub">{content.hero.sub}</p>
                <div className="ct-hero-ctas">
                  <a className="ct-btn ct-btn-solid" href={content.hero.ctaHref}>{content.hero.cta}</a>
                  <a className="ct-btn ct-btn-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
                </div>
              </div>
            </div>
          </ScrollFrames>
        </header>

        {/* ============ STORY ============ */}
        <section id="story" data-tour="Our Story" className="ct-section ct-story">
          <div className="ct-wrap ct-story-grid">
            <div className="ct-story-copy">
              <p className="ct-eyebrow rv">{content.story.eyebrow}</p>
              <h2 className="ct-h2 rv">{content.story.title}</h2>
              {content.story.body.map((p, i) => (
                <p key={i} className="ct-body rv">{p}</p>
              ))}
              <blockquote className="ct-quote rv">
                <p>{content.story.quote}</p>
                <cite>{content.story.quoteBy}</cite>
              </blockquote>
            </div>
            <div className="ct-story-media">
              <figure className="ct-tilted rv">
                <span className="ct-drift">
                  <Img k="hero" src={img('hero', heroImg)} alt="The family table, mid-feast — pasta, bread, wine and steam" />
                </span>
                <figcaption>Sunday, 2pm — the table doing what it does best</figcaption>
              </figure>
              <span className="ct-stamp rv" aria-hidden="true">Est. 1998</span>
            </div>
          </div>
        </section>

        {/* ============ DISHES / ORBIT ============ */}
        <section id="dishes" data-tour="The Dishes" className="ct-section ct-dishes">
          <div className="ct-wrap">
            <p className="ct-eyebrow rv">{content.dishes.eyebrow}</p>
            <h2 className="ct-h2 rv">{content.dishes.title}</h2>
            <p className="ct-sub rv">{content.dishes.sub}</p>
          </div>
          <OrbitRing
            dishes={content.dishes.items}
            imgFn={img}
            productName={productName}
            price={price}
            reduced={reduced}
            setActiveRef={orbitActiveRef}
            brandName={brandName}
          />
        </section>

        {/* ============ CHALKBOARD MENU ============ */}
        <section id="menu" data-tour="The Chalkboard" className="ct-section ct-menu">
          <div className="ct-wrap">
            <p className="ct-eyebrow is-chalk rv">{content.menu.eyebrow}</p>
            <h2 className="ct-h2 is-chalk rv">{content.menu.title}</h2>
            <p className="ct-sub is-chalk rv">{content.menu.sub}</p>
            <div className="ct-cb-board">
              {content.menu.groups.map((g) => (
                <div key={g.name} className="ct-cb-group">
                  <h3 className="ct-cb-group-name">{g.name}</h3>
                  {g.items.map((item) => (
                    <div key={item.name} className="ct-cb-row">
                      <span className="ct-cb-dish">
                        <span className="ct-cb-name">{item.name}</span>
                        {item.note && <span className="ct-cb-note">{item.note}</span>}
                      </span>
                      <span className="ct-cb-dots" aria-hidden="true" />
                      <span className="ct-cb-price">{price(item.price)}</span>
                    </div>
                  ))}
                </div>
              ))}
              <p className="ct-cb-foot">Ask about the off-chalk specials — there are always two.</p>
            </div>
          </div>
        </section>

        {/* ============ HANDMADE PASTA ============ */}
        <section id="craft" data-tour="Handmade Pasta" className="ct-section ct-craft">
          <div className="ct-wrap ct-craft-grid">
            <figure className="ct-craft-media ct-tilted rv">
              <span className="ct-drift">
                <Img k="detail" src={img('detail', detailImg)} alt="Flour-dusted hands rolling fresh pasta on a wooden table" />
              </span>
              <figcaption>Seven every morning — flour, eggs, patience</figcaption>
            </figure>
            <div className="ct-craft-copy">
              <p className="ct-eyebrow rv">{content.craft.eyebrow}</p>
              <h2 className="ct-h2 rv">{content.craft.title}</h2>
              {content.craft.body.map((p, i) => (
                <p key={i} className="ct-body rv">{p}</p>
              ))}
              <div className="ct-origin-notes">
                {content.craft.notes.map((n) => (
                  <article key={n.title} className="ct-origin-note rv">
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ SUNDAY TABLE ============ */}
        <section id="sunday" className="ct-section ct-sunday">
          <div className="ct-sunday-flag" aria-hidden="true"><span>Sunday · Sunday · Sunday</span></div>
          <div className="ct-wrap ct-sunday-inner">
            <p className="ct-eyebrow rv">{content.sunday.eyebrow}</p>
            <h2 className="ct-h2 rv">{content.sunday.title}</h2>
            <p className="ct-body rv">{content.sunday.body}</p>
            <ul className="ct-sunday-courses">
              {content.sunday.courses.map((c) => (
                <li key={c} className="rv">{c}</li>
              ))}
            </ul>
            <p className="ct-sunday-price rv">
              <span>{price(content.sunday.price)}</span> {content.sunday.priceNote}
            </p>
            <a className="ct-btn ct-btn-solid rv" href="#visit">Reserve a Sunday seat</a>
          </div>
        </section>

        {/* ============ VISIT ============ */}
        <section id="visit" data-tour="Visit Us" className="ct-section ct-visit">
          <div className="ct-wrap ct-visit-grid">
            <div>
              <p className="ct-eyebrow rv">{content.visit.eyebrow}</p>
              <h2 className="ct-h2 rv">{content.visit.title}</h2>
              <address className="ct-address rv">{content.visit.address}</address>
              <p className="ct-contact-lines rv">
                <a href={telHref}>{content.visit.phone}</a>
                <span aria-hidden="true"> · </span>
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <a className="ct-btn ct-btn-solid rv" href={`mailto:${email}?subject=${encodeURIComponent(`Table booking — ${brandName}`)}`}>
                {content.visit.cta}
              </a>
            </div>
            <div className="ct-hours rv">
              <h3>Hours</h3>
              {content.visit.hours.map((h) => (
                <div key={h.days} className="ct-hours-row">
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="ct-footer">
          <div className="ct-wrap">
            <p className="ct-footer-giant">{brandName}</p>
            <p className="ct-footer-tag">{content.brand.tagline}</p>
            <div className="ct-footer-row">
              <p>{content.visit.address}</p>
              <p>
                <a href={telHref}>{content.visit.phone}</a>
                {' · '}
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>{content.footer.line}</p>
              <p className="ct-colophon">{content.footer.colophon}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
