import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven signature frames for the hero scrub */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-home';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@400;500;600;700&display=swap';

/* product imgKey → bundled asset, resolved through useCustom uploads */
const PRODUCT_IMAGES = {
  'product-0': product1Img,
  'product-1': product2Img,
  'product-2': product3Img,
  detail: detailImg,
};
const PRODUCT_ALT = {
  0: 'Oatmeal linen armchair with a feather cushion, warm studio light',
  1: 'Handmade stoneware bowls and cups in cream and clay tones',
  2: 'Sunlit bedroom with an oak bed and a hand-loomed wool rug beneath',
  3: 'Warm kitchen detail with oak shelves, stoneware and a small oak side table',
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`hh-wm ${className}`} aria-label={text}>
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

function ProductThumb({ pi, className = '' }) {
  const { img } = useCustom();
  const p = content.products[pi];
  return (
    <span className={`hh-pthumb ${className}`}>
      <Img k={p.imgKey} src={img(p.imgKey, PRODUCT_IMAGES[p.imgKey])} alt={PRODUCT_ALT[pi]} />
    </span>
  );
}

function DockCard({ pi, onAdd }) {
  const { productName, price } = useCustom();
  const p = content.products[pi];
  return (
    <article className="hh-dock-card" key={pi}>
      <ProductThumb pi={pi} className="hh-dock-img" />
      <p className="hh-dock-room">{p.room}</p>
      <p className="hh-eyebrow hh-dock-badge">{p.badge}</p>
      <h3 className="hh-dock-name">{productName(pi, p.name)}</h3>
      <p className="hh-dock-price">{price(p.price)}</p>
      <p className="hh-dock-desc">{p.desc}</p>
      <p className="hh-dock-material">{p.material}</p>
      <button type="button" className="hh-add" onClick={() => onAdd(pi)}>
        Add to basket
      </button>
    </article>
  );
}

/* Pinned "Room Dolly" — desktop + motion only. Slow dolly-zoom into the
   living-room scene (scale 1 → 1.35), transform-origin drifting across
   hotspots; as each hotspot centers, its product card docks at the side. */
function RoomsDolly({ active, setActive, onAdd }) {
  const dolly = content.dolly;
  const hotspots = content.hotspots;
  return (
    <div className="hh-dolly-pin">
      <div className="hh-dolly-stage">
        <div className="hh-scene">
          <div className="hh-scene-img">
            <SceneImg />
          </div>
          {dolly.map((pi, si) => (
            <button
              key={pi}
              type="button"
              className={`hh-hotspot${active === si ? ' is-active' : ''}`}
              style={{ left: `${hotspots[pi].x}%`, top: `${hotspots[pi].y}%` }}
              onClick={() => setActive(si)}
              aria-label={`Shop ${content.products[pi].name}`}
              aria-pressed={active === si}
            >
              <span className="hh-hotspot-ring" aria-hidden="true" />
              <span className="hh-hotspot-dot" aria-hidden="true" />
            </button>
          ))}
        </div>
        <aside className="hh-dock" aria-live="polite" aria-label="Docked product">
          {active < 0 ? (
            <div className="hh-dock-invite">
              <p className="hh-eyebrow">Shop the room</p>
              <h3 className="hh-dock-name">The room comes to you.</h3>
              <p className="hh-dock-desc">
                Keep scrolling — we drift closer to each piece in turn. When one
                takes centre stage, its story docks here.
              </p>
            </div>
          ) : (
            <DockCard pi={dolly[active]} onAdd={onAdd} />
          )}
        </aside>
      </div>
      <div className="hh-dolly-progress" aria-hidden="true">
        <span className="hh-dolly-progress-fill" />
      </div>
    </div>
  );
}

function SceneImg() {
  const { img } = useCustom();
  return (
    <Img
      k="hero"
      src={img('hero', heroImg)}
      alt="Styled living room in warm sunlight — linen armchair, wool rug, oak side table and stoneware on the sideboard"
    />
  );
}

/* Mobile / tablet: static scene, tappable hotspots, dock panel below. */
function RoomsStatic({ active, setActive, onAdd, reduced }) {
  const dolly = content.dolly;
  const hotspots = content.hotspots;
  return (
    <div className="hh-rooms-static">
      <div className="hh-scene">
        <div className="hh-scene-img">
          <SceneImg />
        </div>
        {!reduced &&
          dolly.map((pi, si) => (
            <button
              key={pi}
              type="button"
              className={`hh-hotspot${active === si ? ' is-active' : ''}`}
              style={{ left: `${hotspots[pi].x}%`, top: `${hotspots[pi].y}%` }}
              onClick={() => setActive(si)}
              aria-label={`Shop ${content.products[pi].name}`}
              aria-pressed={active === si}
            >
              <span className="hh-hotspot-ring" aria-hidden="true" />
              <span className="hh-hotspot-dot" aria-hidden="true" />
            </button>
          ))}
      </div>
      {reduced ? (
        <div className="hh-static-grid">
          {content.products.map((p, pi) => (
            <ProductLine key={p.name} pi={pi} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="hh-rooms-dock-mobile">
          {active < 0 ? (
            <p className="hh-dock-desc">Tap a marker in the room to meet each piece.</p>
          ) : (
            <DockCard pi={dolly[active]} onAdd={onAdd} />
          )}
        </div>
      )}
    </div>
  );
}

function ProductLine({ pi, onAdd }) {
  const { productName, price } = useCustom();
  const p = content.products[pi];
  return (
    <article className="hh-pline">
      <ProductThumb pi={pi} className="hh-pline-img" />
      <div className="hh-pline-body">
        <p className="hh-eyebrow">{p.badge}</p>
        <h3 className="hh-pline-name">{productName(pi, p.name)}</h3>
        <p className="hh-pline-desc">{p.desc}</p>
        <p className="hh-pline-price">{price(p.price)}</p>
        <button type="button" className="hh-add" onClick={() => onAdd(pi)}>
          Add to basket
        </button>
      </div>
    </article>
  );
}

function Materials() {
  const { img } = useCustom();
  const [mat, setMat] = useState(0);
  const active = content.materials[mat];
  const swatchClass = ['is-linen', 'is-clay', 'is-wool', 'is-oak'][mat];
  return (
    <div className="hh-mats-grid">
      <div className="hh-mats-copy">
        <div className="hh-swatches" role="tablist" aria-label="Materials">
          {content.materials.map((m, i) => (
            <button
              key={m.name}
              type="button"
              role="tab"
              aria-selected={mat === i}
              className={`hh-swatch sw-${i}${mat === i ? ' is-active' : ''}`}
              onClick={() => setMat(i)}
            >
              <span className="hh-swatch-chip" aria-hidden="true" />
              <span className="hh-swatch-label">{m.name}</span>
            </button>
          ))}
        </div>
        <div className="hh-mat-detail" key={mat} role="tabpanel">
          <p className="hh-eyebrow">{active.tone}</p>
          <h3 className="hh-h3">{active.name}</h3>
          <p className="hh-body">{active.story}</p>
          <p className="hh-mat-products">
            <span className="hh-mat-products-label">Lives in</span> {active.products}
          </p>
        </div>
      </div>
      <figure className={`hh-mats-img hh-wipe ${swatchClass}`}>
        <Img
          k="detail"
          src={img('detail', detailImg)}
          alt="Close-up of handmade stoneware ceramics beside folded natural linen on an oak surface, raking golden light"
        />
        <figcaption>From the workshops — clay, linen and oak, mid-making.</figcaption>
      </figure>
    </div>
  );
}

export default function Design08Home() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  /* Demo cart state */
  const [cart, setCart] = useState([]); // [{ pi, qty }]
  const [cartOpen, setCartOpen] = useState(false);
  const addToCart = (pi) =>
    setCart((prev) => {
      const found = prev.find((l) => l.pi === pi);
      if (found) return prev.map((l) => (l.pi === pi ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { pi, qty: 1 }];
    });
  const bumpQty = (pi, d) =>
    setCart((prev) =>
      prev
        .map((l) => (l.pi === pi ? { ...l, qty: l.qty + d } : l))
        .filter((l) => l.qty > 0)
    );
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cart.reduce((n, l) => n + l.qty * content.products[l.pi].price, 0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* "Room Dolly" scroll state: index into content.dolly, -1 = invite */
  const [active, setActive] = useState(-1);

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
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: stage settles, masked word-rise, copy lifts. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hh-hero .sf-stage', { scale: 0.965, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power4.out', clearProps: 'transform,opacity' }, 0)
        .fromTo('.hh-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 }, 0.35)
        .fromTo('.hh-hero-sub, .hh-hero-ctas', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.9);

      /* Warm reveals. */
      gsap.utils.toArray('.hh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.hh-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Wipe on the materials workshop image. */
      gsap.utils.toArray('.hh-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Room Dolly — desktop only. Pinned: slow dolly-zoom into the room
         (scale 1 → 1.35), transform-origin drifting across hotspots; each
         hotspot centers in turn and its card docks at the side panel. */
      const pin = rootRef.current && rootRef.current.querySelector('.hh-dolly-pin');
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const scene = pin.querySelector('.hh-scene-img');
          const fill = pin.querySelector('.hh-dolly-progress-fill');
          const stops = [{ x: 50, y: 42 }, ...content.dolly.map((pi) => content.hotspots[pi])];
          const tl2 = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: '+=320%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                if (fill) fill.style.transform = `scaleX(${self.progress.toFixed(4)})`;
                const p = self.progress;
                const seg = p < 0.07 ? -1 : Math.min(3, Math.floor((p - 0.07) / 0.2325));
                setActive((prev) => (prev === seg ? prev : seg));
              },
            },
          });
          tl2.to(scene, { scale: 1.35, duration: 5 }, 0);
          stops.forEach((o, i) => {
            tl2.to(scene, { transformOrigin: `${o.x}% ${o.y}%`, duration: 1 }, i);
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-08-home">
      <header className="hh-nav">
        <a className="hh-wordmark" href="#hero">{name}</a>
        <nav className="hh-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button type="button" className="hh-cart-btn" onClick={() => setCartOpen(true)} aria-label={`Open basket, ${cartCount} items`}>
          <span className="hh-cart-label">Basket</span>
          <span className="hh-cart-count" aria-hidden="true">{cartCount}</span>
        </button>
      </header>

      <main>
        {/* HERO — "The light" signature scroll-scrub */}
        <section id="hero" className="hh-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Sunlight drifting across a styled living room — a slow push past ceramics and linen, settling on the armchair"
            pinDistance="+=170%"
          >
            <span className="hh-hero-shade" aria-hidden="true" />
            <div className="hh-hero-copy">
              <p className="hh-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hh-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="hh-hero-sub">{content.hero.sub}</p>
              <div className="hh-hero-ctas">
                <a className="hh-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="hh-cta-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* THE ROOMS — Room Dolly scroll product flow */}
        <section id="products" className="hh-rooms" data-tour="The Rooms">
          <div className="hh-wrap">
            <p className="hh-eyebrow hh-rv">Shop the room</p>
            <h2 className="hh-h2 hh-rv">Drift through the room. Take what you love.</h2>
            <p className="hh-body hh-rv hh-rooms-lede">
              Four pieces, one sunlit room. Every marker is a piece you can
              bring home — keep scrolling and the room comes to you.
            </p>
          </div>
          {reduced ? (
            <div className="hh-wrap">
              <RoomsStatic active={-1} setActive={() => {}} onAdd={addToCart} reduced />
            </div>
          ) : (
            <>
              <div className="hh-dolly-desktop">
                <RoomsDolly active={active} setActive={setActive} onAdd={addToCart} />
              </div>
              <div className="hh-dolly-touch hh-wrap">
                <RoomsStatic active={active} setActive={setActive} onAdd={addToCart} reduced={false} />
              </div>
            </>
          )}
        </section>

        {/* MATERIALS */}
        <section id="craft" className="hh-mats" data-tour="Materials">
          <div className="hh-wrap">
            <p className="hh-eyebrow hh-rv">The materials</p>
            <h2 className="hh-h2 hh-rv">Four honest materials. Nothing to hide.</h2>
            <p className="hh-body hh-rv">
              We work with few materials and know each one deeply. Choose one —
              see where it lives in the collection.
            </p>
            <span className="hh-rule" aria-hidden="true" />
            <div className="hh-rv">
              <Materials />
            </div>
          </div>
        </section>

        {/* ROOM GUIDES */}
        <section id="gallery" className="hh-guides" data-tour="Room Guides">
          <div className="hh-wrap">
            <p className="hh-eyebrow hh-rv">Room guides</p>
            <h2 className="hh-h2 hh-rv">Styled rooms, shoppable pieces.</h2>
            <div className="hh-guides-grid hh-stagger">
              {content.guides.map((g) => (
                <article className="hh-guide" key={g.title}>
                  <div className="hh-guide-img">
                    <Img
                      k={g.imgKey}
                      src={img(g.imgKey, PRODUCT_IMAGES[g.imgKey] || heroImg)}
                      alt={g.alt}
                    />
                  </div>
                  <h3 className="hh-h3">{g.title}</h3>
                  <p className="hh-body">{g.body}</p>
                  <div className="hh-guide-product">
                    <ProductThumb pi={g.product} className="hh-guide-thumb" />
                    <div>
                      <p className="hh-guide-pname">{productName(g.product, content.products[g.product].name)}</p>
                      <p className="hh-guide-pprice">{price(content.products[g.product].price)}</p>
                    </div>
                    <button type="button" className="hh-add hh-add-sm" onClick={() => addToCart(g.product)}>
                      Add
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY & CARE + CONTACT */}
        <section id="contact" className="hh-delivery" data-tour="Delivery & Care">
          <div className="hh-wrap">
            <p className="hh-eyebrow hh-rv">{content.delivery.eyebrow}</p>
            <h2 className="hh-h2 hh-rv">{content.delivery.title}</h2>
            <span className="hh-rule" aria-hidden="true" />
            <div className="hh-delivery-grid hh-stagger">
              {content.delivery.items.map((d) => (
                <div className="hh-delivery-item" key={d.title}>
                  <h3 className="hh-h3">{d.title}</h3>
                  <p className="hh-body">{d.text}</p>
                </div>
              ))}
            </div>
            <div className="hh-visit hh-rv">
              <div>
                <h3 className="hh-h3">Visit the studio</h3>
                <address className="hh-address">
                  {content.contact.address}
                  <br />
                  <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </address>
                <p className="hh-body">{content.contact.note}</p>
              </div>
              <div className="hh-hours">
                <p className="hh-eyebrow">Hours</p>
                <p className="hh-h3">{content.contact.hours}</p>
                <p className="hh-body">Walk-ins welcome. Dogs welcome-er.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="hh-footer">
        <p className="hh-footer-brand">{name}</p>
        <p className="hh-footer-line">{content.footer.line}</p>
        <p className="hh-colophon">{content.footer.colophon}</p>
      </footer>

      {/* DEMO CART DRAWER */}
      <div
        className={`hh-cart-veil${cartOpen ? ' is-open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`hh-cart${cartOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping basket"
        aria-hidden={!cartOpen}
        inert={!cartOpen ? true : undefined}
      >
        <div className="hh-cart-head">
          <h2 className="hh-h3">Your basket</h2>
          <span className="hh-cart-demo">Demo — no checkout</span>
          <button type="button" className="hh-cart-close" onClick={() => setCartOpen(false)} aria-label="Close basket">
            ×
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="hh-cart-empty">
            Empty for now. Drift through the room above — when a piece takes
            centre stage, add it to the basket.
          </p>
        ) : (
          <>
            <ul className="hh-cart-lines">
              {cart.map((l) => {
                const p = content.products[l.pi];
                return (
                  <li className="hh-cart-line" key={l.pi}>
                    <ProductThumb pi={l.pi} className="hh-cart-thumb" />
                    <div className="hh-cart-line-body">
                      <p className="hh-cart-line-name">{productName(l.pi, p.name)}</p>
                      <p className="hh-cart-line-price">{price(p.price)}</p>
                      <div className="hh-qty">
                        <button type="button" onClick={() => bumpQty(l.pi, -1)} aria-label={`Remove one ${p.name}`}>−</button>
                        <span>{l.qty}</span>
                        <button type="button" onClick={() => bumpQty(l.pi, 1)} aria-label={`Add one ${p.name}`}>+</button>
                      </div>
                    </div>
                    <p className="hh-cart-line-total">{price(p.price * l.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="hh-cart-foot">
              <div className="hh-cart-subtotal">
                <span>Subtotal</span>
                <span>{price(cartTotal)}</span>
              </div>
              <button type="button" className="hh-cta hh-cart-checkout" onClick={() => setCartOpen(false)}>
                Demo checkout
              </button>
              <p className="hh-cart-note">A demonstration basket — no payment is taken.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
