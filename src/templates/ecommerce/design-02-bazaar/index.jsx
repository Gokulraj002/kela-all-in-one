import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

/* Signature scroll-driven frame sequence (72 JPG frames, scrubbed by the
   pinned hero instead of the old autoplay loop). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map(k => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-bazaar';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Work+Sans:wght@400;500;600;700&display=swap';

/* Canonical image per customization key (BUILDER_GUIDE mapping). */
const PRODUCT_IMAGES = {
  'product-0': product1Img,
  'product-1': product2Img,
  'product-2': product3Img,
};

/* Stall Conveyor tuning (MOTION.md §02). */
const BASE_SPEED = 70; // px/s idle drift
const VEL_FACTOR = 0.12; // scroll-velocity → extra px/s
const MAX_SPEED = 520; // px/s hard cap

function mod(n, m) {
  return ((n % m) + m) % m;
}

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Real spaces sit between the word masks so the line reads (and wraps) as
   text; screen readers get the plain sentence from the visually-hidden copy. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`gb-wm ${className}`}>
      <span className="gb-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {i > 0 ? ' ' : null}
            <span className="w">
              <span className="wi">{w}</span>
            </span>
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}

/* Hand-drawn divider — squiggly SVG rule, never an emoji. */
function Squiggle({ className = '' }) {
  return (
    <svg className={`gb-squiggle ${className}`} viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M2 14 C 40 6, 70 20, 110 12 S 180 6, 220 14 S 290 20, 330 10 S 400 6, 440 14 S 510 20, 550 12 S 620 6, 660 14 S 730 20, 770 10 S 840 6, 880 14 S 950 20, 990 12 S 1060 6, 1100 14 S 1170 20, 1198 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
    </svg>
  );
}

/* Resolve the scroll container from an element, the same way useTplScope
   does. Child components need this: their layout effects run before the
   parent's rootRef is attached, so the parent's scroller() would still
   return window there. */
function scrollerFor(el, fallback) {
  try {
    const scope = el && el.closest('.tpl-scope');
    if (scope && scope.scrollHeight > scope.clientHeight + 2) return scope;
  } catch {
    /* fall through */
  }
  return fallback ? fallback() : window;
}

function useIsNarrow() {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const fn = (e) => setNarrow(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return narrow;
}

function StallCard({ p, onAdd, copy = false }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="gb-card">
      <div className="gb-card-img">
        <Img k={p.imgKey} src={img(p.imgKey, PRODUCT_IMAGES[p.imgKey])} alt={p.alt} />
        <span className="gb-sticker gb-sticker-cat">
          <span className="gb-sticker-in">{p.cat}</span>
        </span>
        {p.badge && (
          <span className="gb-sticker gb-sticker-promo">
            <span className="gb-sticker-in">{p.badge}</span>
          </span>
        )}
      </div>
      <div className="gb-card-body">
        <h3 className="gb-card-name">{productName(p.idx, p.name)}</h3>
        <p className="gb-card-desc">{p.desc}</p>
        <div className="gb-card-foot">
          <span className="gb-card-price">{price(p.price)}</span>
          <button type="button" className="gb-add" onClick={() => onAdd(p.idx)} tabIndex={copy ? -1 : undefined} aria-label={`Add ${p.name} to cart`}>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

/* Stall Conveyor — MOTION.md §02.
   Two diagonal rows of stall cards drift in OPPOSITE directions.
   speed = base + scroll-velocity × factor, driven by an rAF loop reading
   ScrollTrigger onUpdate deltas (getVelocity). Cards tilt with the plane
   via CSS rotation on the row wrappers + per-card rotation. */
function StallConveyor({ items, onAdd, scroller }) {
  const convRef = useRef(null);
  const tracksRef = useRef([]);

  const rowItems = useMemo(() => {
    const half = Math.ceil(items.length / 2);
    const rows = [items.slice(0, half), items.slice(half)];
    /* Pad each row's set to at least 3 cards so the wrap reads dense. */
    return rows.map((row) => {
      const min = Math.max(3, row.length);
      const out = [];
      while (out.length < min) out.push(...row);
      return out.slice(0, min);
    });
  }, [items]);

  useLayoutEffect(() => {
    const tracks = tracksRef.current.filter(Boolean);
    const root = convRef.current;
    if (!tracks.length || !root) return;
    const sc = scrollerFor(root, scroller);

    tracks.forEach((t) => {
      t.style.transform = '';
    });
    const state = tracks.map((el, i) => ({
      el,
      set: el.querySelector('.gb-conv-set'),
      setW: 0,
      pos: 0,
      speed: i === 0 ? -BASE_SPEED : BASE_SPEED,
      dir: i === 0 ? -1 : 1,
    }));
    const measure = () => state.forEach((s) => {
      s.setW = s.set ? s.set.offsetWidth : 0;
    });
    measure();

    /* Scroll-velocity boost: decays back to base drift when scrolling stops. */
    let boost = 0;
    let raf = 0;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(0.06, (now - last) / 1000);
      last = now;
      boost *= 0.96;
      const mag = Math.min(MAX_SPEED, BASE_SPEED + boost);
      state.forEach((s) => {
        const target = s.dir < 0 ? -mag : mag;
        s.speed += (target - s.speed) * 0.08;
        s.pos += s.speed * dt;
        if (s.setW > 0) {
          const m = mod(s.pos, s.setW);
          const x = s.dir < 0 ? -m : -s.setW + m;
          s.el.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
        }
      });
    };
    const tick = (now) => {
      step(now);
      raf = requestAnimationFrame(tick);
    };
    /* Only drift while the lanes are on screen — no style writes off-screen. */
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    /* Cards drifting in from outside the clipped lane are never "near the
       viewport" for native lazy-loading, so they would arrive blank. Once
       the lanes come on screen, load every lane image. */
    let warmed = false;
    const warm = () => {
      if (warmed) return;
      warmed = true;
      root.querySelectorAll('img[loading="lazy"]').forEach((im) => {
        im.loading = 'eager';
      });
    };
    /* Paint the first position right away. */
    step(last);

    const st = ScrollTrigger.create({
      trigger: root,
      scroller: sc,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        if (self.isActive) {
          warm();
          start();
        } else stop();
      },
      onUpdate: (self) => {
        const v = (self.getVelocity && self.getVelocity()) || 0;
        boost = Math.min(MAX_SPEED - BASE_SPEED, Math.abs(v) * VEL_FACTOR);
      },
    });
    if (st.isActive) {
      warm();
      start();
    }
    const warmSt = ScrollTrigger.create({
      trigger: root,
      scroller: sc,
      start: 'top bottom+=900',
      once: true,
      onEnter: warm,
    });
    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    /* Sticker pops on (re)mount — cards drift, stickers bounce in. */
    const pops = gsap.fromTo(
      root.querySelectorAll('.gb-sticker-in'),
      { scale: 0 },
      {
        scale: 1,
        duration: 0.55,
        ease: 'back.out(2.2)',
        stagger: 0.05,
        delay: 0.15,
        overwrite: 'auto',
        scrollTrigger: { trigger: root, scroller: sc, start: 'top 85%', once: true },
      }
    );

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
      st.kill();
      warmSt.kill();
      if (pops) {
        if (pops.scrollTrigger) pops.scrollTrigger.kill();
        pops.kill();
        gsap.set(root.querySelectorAll('.gb-sticker-in'), { clearProps: 'transform' });
      }
    };
  }, [items, scroller]);

  return (
    <div ref={convRef} className="gb-conv" role="region" aria-label="Product stalls">
      {rowItems.map((row, r) => (
        <div key={r} className={`gb-row gb-row-${r + 1}`}>
          <div
            className="gb-track"
            ref={(el) => {
              tracksRef.current[r] = el;
            }}
          >
            {/* Four copies: the lane wraps by one set width, and the strip
                must still reach the right edge of wide screens when it is
                shifted by a full set (two copies left a bare gap there). */}
            {[0, 1, 2, 3].map((copy) => (
              <div key={copy} className="gb-conv-set" aria-hidden={copy > 0 || undefined}>
                {row.map((p, i) => (
                  <StallCard key={`${p.idx}-${i}`} p={p} onAdd={onAdd} copy={copy > 0} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Static grid fallback: reduced-motion and mobile (<768px). */
function StallGrid({ items, onAdd }) {
  return (
    <div className="gb-grid" role="region" aria-label="Product stalls">
      {items.map((p) => (
        <StallCard key={p.idx} p={p} onAdd={onAdd} />
      ))}
    </div>
  );
}

function CartDrawer({ open, cart, onClose, onRemove }) {
  const { price, productName } = useCustom();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    if (closeRef.current) closeRef.current.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const subtotal = cart.reduce((s, i) => s + content.products[i].price, 0);

  return (
    <div className={`gb-cartwrap${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="gb-cart-overlay" onClick={onClose} />
      <aside className="gb-cart" role="dialog" aria-label="Shopping cart" aria-modal="true">
        <div className="gb-cart-head">
          <h2 className="gb-cart-title">Your basket</h2>
          <button ref={closeRef} type="button" className="gb-cart-close" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="gb-cart-empty">Your basket is empty. The stalls are full — go wander.</p>
        ) : (
          <>
            <ul className="gb-cart-items">
              {cart.map((idx, n) => (
                <li key={n} className="gb-cart-item">
                  <span className="gb-cart-item-name">{productName(idx, content.products[idx].name)}</span>
                  <span className="gb-cart-item-price">{price(content.products[idx].price)}</span>
                  <button type="button" className="gb-cart-remove" onClick={() => onRemove(n)} aria-label={`Remove ${content.products[idx].name} from cart`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="gb-cart-foot">
              <div className="gb-cart-total">
                <span>Subtotal</span>
                <span>{price(subtotal)}</span>
              </div>
              <button type="button" className="gb-cart-checkout">
                Checkout
              </button>
              <p className="gb-cart-demo">Demo cart — no payment is taken.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default function Design02Bazaar() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const narrow = useIsNarrow();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const items = useMemo(
    () => (cat === 'All' ? content.products : content.products.filter((p) => p.cat === cat)),
    [cat]
  );

  const addToCart = (idx) => setCart((c) => [...c, idx]);
  const removeFromCart = (n) => setCart((c) => c.filter((_, i) => i !== n));

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

      /* Hero entrance: masked word-rise + media settle, <= 2.2s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.gb-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 }, 0.15)
        .fromTo('.gb-hero-eyebrow, .gb-hero-sub, .gb-hero-ctas', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.5)
        .fromTo('.gb-hero-sticker', { scale: 0, rotation: -18 }, { scale: 1, rotation: 8, duration: 0.7, ease: 'back.out(1.8)' }, 0.9);

      /* Scroll reveals. */
      gsap.utils.toArray('.gb-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.gb-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      /* Squiggle dividers draw themselves in. */
      gsap.utils.toArray('.gb-squiggle path').forEach((path) => {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: path, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const showConveyor = !reduced && !narrow;
  const tickerItems = [...content.ticker, ...content.ticker, ...content.ticker];

  return (
    <div ref={rootRef} className="tpl-design-02-bazaar">
      {/* Festival ticker */}
      <div className="gb-ticker" aria-label="Announcements">
        <div className="gb-ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="gb-ticker-set" aria-hidden={copy === 1}>
              {tickerItems.map((t, i) => (
                <span key={i} className="gb-ticker-item">
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Nav with cart affordance */}
      <header className="gb-nav">
        <a className="gb-wordmark" href="#hero">{name}</a>
        <nav className="gb-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="gb-cartbtn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${cart.length} items`}
        >
          <span aria-hidden="true">Basket</span>
          <span className="gb-cart-count" aria-live="polite">{cart.length}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="gb-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Slow lateral pan across colorful market stalls, fabrics fluttering, brass goods catching golden light"
            pinDistance="+=170%"
            stageHeight="var(--tpl-vh, 100svh)"
          >
            <div className="gb-hero-scrim" aria-hidden="true" />
            <div className="gb-hero-copy">
            <p className="gb-hero-eyebrow gb-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="gb-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="gb-hero-sub">{content.hero.sub}</p>
            <div className="gb-hero-ctas">
              <a className="gb-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="gb-cta gb-cta-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
            </div>
          </div>
          <span className="gb-hero-sticker" aria-hidden="true">
            <span className="gb-hero-sticker-in">New stalls every Friday</span>
          </span>
          </ScrollFrames>
        </section>

        <Squiggle />

        {/* THE STALLS — Stall Conveyor */}
        <section id="products" className="gb-stalls" data-tour="The Stalls">
          <div className="gb-wrap">
            <p className="gb-eyebrow gb-rv">{content.stalls.eyebrow}</p>
            <h2 className="gb-h2 gb-rv">{content.stalls.title}</h2>
            <p className="gb-lede gb-rv">{content.stalls.body}</p>
            <div className="gb-chips gb-rv" role="group" aria-label="Filter by craft">
              {content.categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`gb-chip${cat === c ? ' is-active' : ''}`}
                  aria-pressed={cat === c}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {showConveyor ? (
            <StallConveyor key={cat} items={items} onAdd={addToCart} scroller={scroller} />
          ) : (
            <div className="gb-wrap">
              <StallGrid items={items} onAdd={addToCart} />
            </div>
          )}
          <p className="gb-conv-hint">{showConveyor ? 'Scroll \u2014 the lanes move with you' : 'Two lanes, six stalls'}</p>
        </section>

        <Squiggle />

        {/* SELLER STORIES */}
        <section id="story" className="gb-story" data-tour="Meet the Sellers">
          <div className="gb-wrap">
            <p className="gb-eyebrow gb-rv">{content.story.eyebrow}</p>
            <h2 className="gb-h2 gb-rv">{content.story.title}</h2>
            {content.story.body.map((p, i) => (
              <p className="gb-body gb-rv" key={i}>{p}</p>
            ))}
          </div>
          <div className="gb-wrap gb-sellers gb-stagger">
            {content.story.sellers.map((s) => (
              <blockquote className="gb-seller" key={s.name}>
                <p className="gb-seller-quote">{s.quote}</p>
                <cite className="gb-seller-cite">
                  <strong>{s.name}</strong>
                  <span>{s.craft}</span>
                </cite>
              </blockquote>
            ))}
          </div>
          <figure className="gb-wrap gb-story-fig gb-rv">
            <div className="gb-story-img">
              <Img k="detail" src={img('detail', detailImg)} alt={content.story.imageAlt} />
            </div>
            <figcaption>Every sale lands in the maker’s hands — no middlemen.</figcaption>
          </figure>
        </section>

        <Squiggle />

        {/* FESTIVAL / SHIPPING STRIP */}
        <section id="delivery" className="gb-delivery" data-tour="Festival Delivery">
          <div className="gb-wrap">
            <p className="gb-eyebrow gb-rv gb-eyebrow-inv">{content.delivery.eyebrow}</p>
            <h2 className="gb-h2 gb-rv gb-h2-inv">{content.delivery.title}</h2>
            <ul className="gb-delivery-list gb-stagger">
              {content.delivery.items.map((d) => (
                <li className="gb-delivery-item" key={d.title}>
                  <h3 className="gb-delivery-name">{d.title}</h3>
                  <p className="gb-delivery-text">{d.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER + CONTACT */}
      <footer id="contact" className="gb-footer">
        <div className="gb-wrap gb-footer-grid">
          <div>
            <p className="gb-footer-word">{name}</p>
            <p className="gb-footer-tag">{content.brand.tagline}.</p>
            <p className="gb-footer-line">{content.footer.line}</p>
          </div>
          <address className="gb-footer-contact">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
            <span>{content.contact.address}</span>
            <span>{content.contact.hours}</span>
          </address>
        </div>
        <p className="gb-colophon">{content.footer.colophon}</p>
      </footer>

      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  );
}
