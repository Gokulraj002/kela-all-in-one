import React, { useEffect, useLayoutEffect, useState } from 'react';
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

/* Scroll-scrub hero: dosa-on-tawa frame sequence, played by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-street';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700&display=swap';

const IMG_BY_KEY = { hero: heroImg, 'product-0': dish1Img, 'product-1': dish2Img, 'product-2': dish3Img, detail: detailImg };
const resolveImg = (imgFn, key, fallback) => imgFn(key, fallback || IMG_BY_KEY[key] || heroImg);

function SpiceMeter({ level, reduced }) {
  return (
    <div className="chw-meter" aria-label={`Spice level ${level} of 5`}>
      <span className="chw-meter-label">Spice</span>
      <span className="chw-meter-bar">
        {[0, 1, 2, 3, 4].map((i) => (
          <span className="chw-meter-seg" key={i} aria-hidden="true">
            {i < level && (
              <span className={`chw-meter-fill${reduced ? ' is-lit' : ''}`} />
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

function CraveCard({ item, index, imgFn, productName, price, reduced }) {
  const [added, setAdded] = useState(false);
  const name = item.combo ? item.name : productName(index, item.name);
  return (
    <article className="chw-card" data-slam>
      {item.img && (
        <div className="chw-card-media">
          <div className="chw-card-badges">
            {item.legend && <span className="chw-sticker is-chili">Legend</span>}
          </div>
          <Img k={item.img} src={resolveImg(imgFn, item.img)} alt={name} />
        </div>
      )}
      {!item.img && item.legend && (
        <div className="chw-card-badges is-standalone">
          <span className="chw-sticker is-chili">Legend</span>
        </div>
      )}
      <div className="chw-card-body">
        <h3 className="chw-card-name">{name}</h3>
        <p className="chw-card-desc">{item.desc}</p>
        <SpiceMeter level={item.spice} reduced={reduced} />
        <div className="chw-card-foot">
          <span className="chw-price">{price(item.price)}</span>
          <button
            type="button"
            className={`chw-quickadd${added ? ' is-added' : ''}`}
            onClick={() => {
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
            }}
            aria-label={`Quick add ${name}`}
          >
            {added ? 'Added' : 'Quick-add'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Design04Street() {
  const { brand, img, productName, price, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;
  const email = (contact && contact.email) || content.visit.email;

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

      /* Elements GSAP moves here also carry CSS hover transitions: park the
         transition while the tween runs (it would chase every frame) and hand
         the transform back to the stylesheet afterwards so hovers work. */
      gsap.set('.chw-hero-ctas > *, .chw-nav .chw-order-pill, .rv', { transition: 'none' });

      /* Hero: kinetic headline slam (0.6s) + order pill pop (back.out(2)) */
      gsap.fromTo(
        '.chw-hero-line',
        { x: -90, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.chw-hero-eyebrow',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.chw-hero-ctas > *',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.55, clearProps: 'transform,transition' }
      );
      gsap.fromTo(
        '.chw-nav .chw-order-pill',
        { scale: 0, rotation: 8 },
        { scale: 1, rotation: 1.5, duration: 0.6, delay: 0.45, ease: 'back.out(2)', clearProps: 'transform,transition' }
      );

      /* House grammar: fast loud reveals */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform,transition',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      /* M4 — Direction-slam cards.
         A direction tracker on the wall records ScrollTrigger self.direction
         (1 = scrolling down, -1 = scrolling up). Each card slams in from the
         side the user is moving toward: down → from the right with overshoot,
         up → from the left. Spice meters fill as their card lands. */
      const dirRef = { current: 1 };
      ScrollTrigger.create({
        trigger: '.chw-wall',
        scroller: sc,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => { dirRef.current = self.direction; },
      });

      gsap.utils.toArray('.chw-wall [data-slam]').forEach((card) => {
        const segs = card.querySelectorAll('.chw-meter-fill');
        const slam = () => {
          const fromX = dirRef.current >= 0 ? 140 : -140;
          gsap.fromTo(
            card,
            { x: fromX, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.55,
              ease: 'back.out(1.4)',
              overwrite: 'auto',
              onStart: () => {
                gsap.fromTo(
                  segs,
                  { scaleX: 0 },
                  {
                    scaleX: 1,
                    duration: 0.45,
                    delay: 0.15,
                    stagger: 0.05,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  }
                );
              },
            }
          );
        };
        ScrollTrigger.create({
          trigger: card,
          scroller: sc,
          start: 'top 92%',
          onEnter: slam,
          onEnterBack: slam,
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-04-street">
      <div className="chw-root">
        {/* ============ NAV ============ */}
        {/* Zero-height sticky dock: the bar overlays the hero instead of
            pushing it down, so the hero's lower edge (CTAs) is never below
            the fold at load and nothing shifts when the hero pins. */}
        <div className="chw-nav-dock">
        <nav className="chw-nav" aria-label="Main">
          <div className="chw-wrap chw-nav-inner">
            <a className="chw-wordmark" href="#hero">{brandName}</a>
            <div className="chw-nav-links">
              {content.nav.map((n) => (
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
            </div>
            <a className="chw-order-pill" href={content.hero.ctaHref}>Order now</a>
          </div>
        </nav>
        </div>

        {/* ============ HERO — scroll-scrub frames ============ */}
        <header id="hero" data-tour="Hot. Fast. Gone." className="chw-hero">
          <ScrollFrames
            frames={frames}
            alt="Dosa batter hitting a screaming-hot tawa, steam exploding, frame by frame as you scroll"
            pinDistance="+=170%"
          >
            <div className="chw-hero-scrim" aria-hidden="true" />
            <div className="chw-hero-content">
              <div className="chw-wrap">
                <p className="chw-hero-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="chw-hero-title">
                  {content.hero.title.map((line, i) => (
                    <span key={line} className={`chw-hero-line${i === 1 ? ' is-chili' : ''}`}>{line}</span>
                  ))}
                </h1>
                <p className="chw-hero-sub">{content.hero.sub}</p>
                <div className="chw-hero-ctas">
                  <a className="chw-btn chw-btn-solid" href={content.hero.ctaHref}>{content.hero.cta}</a>
                  <a className="chw-btn chw-btn-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
                </div>
              </div>
            </div>
          </ScrollFrames>
        </header>

        {/* ============ CRAVINGS WALL ============ */}
        <section id="menu" data-tour="The Cravings Wall" className="chw-section chw-cravings">
          <div className="chw-wrap">
            <div className="chw-cravings-head">
              <div>
                <p className="chw-eyebrow rv">{content.cravings.eyebrow}</p>
                <h2 className="chw-h2 rv">{content.cravings.title}</h2>
                <p className="chw-sub rv">{content.cravings.sub}</p>
              </div>
            </div>
            <div className="chw-wall">
              {content.cravings.items.slice(0, 5).map((item, i) => (
                <CraveCard
                  key={item.name}
                  item={item}
                  index={i}
                  imgFn={img}
                  productName={productName}
                  price={price}
                  reduced={reduced}
                />
              ))}
              <div className="chw-combo-band" data-slam>
                <div>
                  <strong>{content.cravings.items[5].name}</strong>
                  <p>{content.cravings.items[5].desc}</p>
                </div>
                <span className="chw-price">{price(content.cravings.items[5].price)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LEGENDS ============ */}
        <section id="story" data-tour="Legends of the Chowk" className="chw-section chw-legends">
          <div className="chw-wrap">
            <p className="chw-eyebrow rv">{content.legends.eyebrow}</p>
            <h2 className="chw-h2 rv">Legends <span className="is-chili">of the Chowk</span></h2>
            <p className="chw-sub rv">{content.legends.sub}</p>
            <div>
              {content.legends.items.map((leg, i) => (
                <div key={leg.title} className={`chw-legend-row rv${i % 2 === 1 ? ' is-flip' : ''}`}>
                  <div className="chw-legend-media">
                    <Img k={leg.img} src={resolveImg(img, leg.img)} alt={leg.title} />
                  </div>
                  <div>
                    <p className="chw-legend-kicker">{leg.since}</p>
                    <h3 className="chw-legend-title">{leg.title}</h3>
                    <p className="chw-legend-body">{leg.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ LOCATIONS ============ */}
        <section id="visit" data-tour="Find the Cart" className="chw-section chw-locations">
          <div className="chw-wrap">
            <p className="chw-eyebrow rv">{content.locations.eyebrow}</p>
            <h2 className="chw-h2 rv">Find <span className="is-chili">the Cart</span></h2>
            <p className="chw-sub rv">{content.locations.sub}</p>
            <div className="chw-loc-grid">
              {content.locations.items.map((loc) => (
                <article className="chw-loc rv" key={loc.name}>
                  <h3 className="chw-loc-name">{loc.name}</h3>
                  <p className="chw-loc-area">{loc.area}</p>
                  <span className="chw-loc-hours">{loc.days} · {loc.time}</span>
                  <p className="chw-loc-note">{loc.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ ORDER ============ */}
        <section id="reserve" data-tour="Order Loud" className="chw-section chw-order-sec">
          <div className="chw-wrap">
            <p className="chw-eyebrow rv">{content.order.eyebrow}</p>
            <h2 className="chw-h2 rv">Order <span className="is-chili">Loud</span></h2>
            <p className="chw-sub rv">{content.order.sub}</p>
            <div className="chw-combos">
              {content.order.combos.map((c) => (
                <article className="chw-combo rv" key={c.name}>
                  <h3 className="chw-combo-name">{c.name}</h3>
                  <p className="chw-combo-desc">{c.desc}</p>
                  <span className="chw-price">{price(c.price)}</span>
                </article>
              ))}
            </div>
            <div className="chw-steps">
              {content.order.steps.map((s) => (
                <div className="chw-step rv" key={s.n}>
                  <span className="chw-step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="chw-order-cta rv">
              <a className="chw-btn chw-btn-solid" href={`mailto:${email}?subject=${encodeURIComponent(`${brandName} order`)}`}>{content.order.cta}</a>
              <p className="chw-order-note">{content.order.note}</p>
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="chw-footer">
          <div className="chw-wrap">
            <p className="chw-footer-giant">{brandName}<span className="is-chili">.</span></p>
            <div className="chw-footer-stickers">
              <span className="chw-sticker is-chili">Spice level: maximum</span>
              <span className="chw-sticker is-paper">Open till 2 AM</span>
              <span className="chw-sticker is-ink">Cash &amp; UPI</span>
            </div>
            <div className="chw-footer-row">
              <p>{content.visit.address}</p>
              <p>
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
                {' · '}
                <a href={`mailto:${email}`}>{email}</a>
              </p>
              <p>{content.footer.line}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
