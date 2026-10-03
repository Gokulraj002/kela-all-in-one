import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import product4Img from './assets/product-4.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72-frame sequence scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-eco';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Manrope:wght@400;500;600;700&display=swap';

const productImages = [product1Img, product2Img, product3Img, product4Img];
const productKeys = ['product-0', 'product-1', 'product-2', 'product-3'];

const fmtNum = (n) => Number(n).toLocaleString('en-IN');

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Real spaces sit between the word masks so the line reads (and wraps) as
   text; screen readers get the plain sentence from the visually-hidden copy. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`tt-wm ${className}`}>
      <span className="tt-sr">{text}</span>
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

/* Organic wave divider drawn with scrub. */
function Divider() {
  return (
    <div className="tt-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path d="M0,58 C180,20 320,78 480,52 C640,26 760,80 940,54 C1120,28 1280,74 1440,48" />
      </svg>
    </div>
  );
}

function ProductCard({ index, onAdd }) {
  const { productName, price, img } = useCustom();
  const p = content.products[index];
  return (
    <article className="tt-card">
      <div className="tt-card-img">
        <Img k={productKeys[index]} src={img(productKeys[index], productImages[index])} alt={p.alt} />
        <span className="tt-badge">{p.badge}</span>
      </div>
      <div className="tt-card-body">
        <p className="tt-stage-label">
          <span className="tt-stage-num">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true"> · </span>
          {p.stage}
        </p>
        <h3 className="tt-card-name">{productName(index, p.name)}</h3>
        <p className="tt-card-desc">{p.desc}</p>
        <p className="tt-footprint">{p.footprint}</p>
        <div className="tt-card-row">
          <span className="tt-price">{price(p.price)}</span>
          <button type="button" className="tt-add" onClick={() => onAdd(index)}>
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ open, lines, onClose, onQty }) {
  const { productName, price } = useCustom();
  const closeRef = useRef(null);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus();
  }, [open ]);

  return (
    <div className={`tt-cart-root${open ? ' is-open' : ''}`}>
      <div className="tt-scrim" onClick={onClose} aria-hidden="true" />
      <aside className="tt-cart" role="dialog" aria-modal="true" aria-label="Shopping bag" aria-hidden={!open}>
        <div className="tt-cart-head">
          <h2 className="tt-h3">Your bag</h2>
          <button type="button" ref={closeRef} className="tt-cart-close" onClick={onClose} aria-label="Close bag">
            ×
          </button>
        </div>
        {lines.length === 0 ? (
          <p className="tt-cart-empty">
            Nothing growing here yet. Wander the timeline and pick something honest.
          </p>
        ) : (
          <>
            <ul className="tt-cart-lines">
              {lines.map((l) => (
                <li className="tt-cart-line" key={l.i}>
                  <div className="tt-cart-info">
                    <p className="tt-cart-name">{productName(l.i, l.name)}</p>
                    <p className="tt-cart-price">{price(l.price)} each</p>
                  </div>
                  <div className="tt-cart-qty" role="group" aria-label={`Quantity of ${l.name}`}>
                    <button type="button" onClick={() => onQty(l.i, -1)} aria-label="Decrease quantity">−</button>
                    <span aria-live="polite">{l.qty}</span>
                    <button type="button" onClick={() => onQty(l.i, 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <p className="tt-cart-line-total">{price(l.price * l.qty)}</p>
                </li>
              ))}
            </ul>
            <div className="tt-cart-foot">
              <div className="tt-cart-total">
                <span>Subtotal</span>
                <strong>{price(total)}</strong>
              </div>
              <button type="button" className="tt-cta" onClick={() => {}}>
                Demo checkout
              </button>
              <p className="tt-cart-note">A demonstration — no payment is taken, no order is placed.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default function Design05Eco() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const pinRef = useRef(null);
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram;

  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const lines = Object.entries(cart).map(([i, qty]) => ({ i: Number(i), qty, ...content.products[Number(i)] }));

  const addToBag = (i) => {
    setCart((c) => ({ ...c, [i]: (c[i] || 0) + 1 }));
    setCartOpen(true);
  };
  const changeQty = (i, d) => {
    setCart((c) => {
      const next = { ...c, [i]: (c[i] || 0) + d };
      if (next[i] <= 0) delete next[i];
      return next;
    });
  };

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Escape closes the bag. */
  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cartOpen]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();

      /* Reduced motion: everything static and fully visible; counters final. */
      if (reduced) {
        gsap.utils.toArray('.tt-count').forEach((el) => {
          el.textContent = fmtNum(el.dataset.target) + (el.dataset.suffix || '');
        });
        return;
      }

      /* Hero entrance: frame bloom + masked word-rise headline. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.tt-hero .sf-wrap',
        { clipPath: 'inset(10% 7% 90% 7%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut', clearProps: 'clipPath' },
        0
      )
        .fromTo(
          '.tt-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08 },
          0.35
        )
        .fromTo(
          '.tt-hero-eyebrow, .tt-hero-sub, .tt-hero-ctas',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0.85
        );

      /* Soft rise reveals. */
      gsap.utils.toArray('.tt-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Organic dividers draw themselves on. */
      gsap.utils.toArray('.tt-divider path').forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: p.closest('.tt-divider'), scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Impact counters tick on arrival. */
      gsap.utils.toArray('.tt-count').forEach((el) => {
        const target = Number(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          scroller: sc,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = fmtNum(Math.round(obj.v)) + suffix;
              },
            }),
        });
      });

      /* Growth Timeline — desktop-only pinned scrub (MOTION.md §05).
         The SVG stem draws as you scroll; each product blooms from its node
         (scale + opacity — no scrubbed blur, it stutters), rooted to the stem; paper layers drift at
         0.6x of the stem draw. Mobile gets the stacked left-rail fallback. */
      const pin = pinRef.current;
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const stage = pin.querySelector('.tt-stage');
          const track = pin.querySelector('.tt-track');
          const path = pin.querySelector('.tt-stem-path');
          const dots = gsap.utils.toArray('.tt-node-dot', pin);
          const cards = gsap.utils.toArray('.tt-node .tt-card', pin);
          if (!stage || !track || !path || !cards.length) return undefined;
          const len = path.getTotalLength();
          const n = cards.length;
          /* Track y that puts node i (row centre at (i + 0.5) / n) mid-stage. */
          const yFor = (i) => stage.clientHeight / 2 - (track.offsetHeight * (i + 0.5)) / n;
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.set(dots, { scale: 0 });
          gsap.set(cards, { scale: 0.2, opacity: 0 });

          /* The first product blooms while the stage scrolls into view, so
             the pinned scene never opens empty. */
          const intro = gsap.timeline({
            scrollTrigger: { trigger: pin, scroller: sc, start: 'top bottom', end: 'top 30%', scrub: 0.6, invalidateOnRefresh: true },
          });
          intro
            .to(path, { strokeDashoffset: len * (1 - 0.5 / n), duration: 1, ease: 'none' }, 0)
            .to(dots[0], { scale: 1, duration: 0.3, ease: 'back.out(2.2)' }, 0.2)
            .to(cards[0], { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0.25);

          const span = n - 1;
          const gtl = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${Math.round(stage.clientHeight * span)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          gtl.fromTo(track, { y: () => yFor(0) }, { y: () => yFor(span), duration: span, ease: 'none', immediateRender: true }, 0);
          gtl.fromTo(
            path,
            { strokeDashoffset: len * (1 - 0.5 / n) },
            { strokeDashoffset: 0, duration: span + 0.4, ease: 'none', immediateRender: false },
            0
          );
          gtl.to('.tt-paper-back', { y: -150, duration: span, ease: 'none' }, 0);
          gtl.to('.tt-paper-mid', { y: -90, duration: span, ease: 'none' }, 0); /* 0.6x drift */
          cards.forEach((card, i) => {
            if (i === 0) return;
            const t = Math.max(0, i - 0.45);
            gtl.to(dots[i], { scale: 1, duration: 0.2, ease: 'back.out(2.2)' }, t);
            gtl.to(card, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }, t + 0.05);
          });
          /* On revert (resize below 1024px), clear the hidden states so the
             stacked mobile fallback renders fully visible. */
          return () => {
            gsap.set([track, path, ...dots, ...cards, '.tt-paper-back', '.tt-paper-mid'], { clearProps: 'all' });
          };
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-05-eco">
      <div className="tt-grain" aria-hidden="true" />

      <header className="tt-nav">
        <a className="tt-wordmark" href="#hero">{name}</a>
        <nav className="tt-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button type="button" className="tt-bag" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${count} items`}>
          Bag<span className="tt-bag-count" aria-hidden="true">{count}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (pin +=170%) */}
        <section id="hero" className="tt-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Hands wrapping a parcel in kraft paper in warm morning light, dust motes drifting"
            pinDistance="+=170%"
            stageHeight="var(--tpl-vh, 100svh)"
          >
            <div className="tt-hero-shade" aria-hidden="true" />
            <div className="tt-hero-copy">
              <p className="tt-eyebrow tt-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="tt-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="tt-hero-sub">{content.hero.sub}</p>
              <div className="tt-hero-ctas">
                <a className="tt-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="tt-cta-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
              </div>
            </div>
          </ScrollFrames>
        </section>

        <Divider />

        {/* GROWTH TIMELINE — the collection */}
        <section id="products" className="tt-products" data-tour="The Collection">
          <div className="tt-wrap">
            <p className="tt-eyebrow tt-rv">{content.productsIntro.eyebrow}</p>
            <h2 className="tt-h2 tt-rv">{content.productsIntro.title}</h2>
            <p className="tt-body tt-rv">{content.productsIntro.body}</p>
          </div>

          {/* Pinned scrub scene — desktop */}
          <div className="tt-pin" ref={pinRef}>
            <div className="tt-stage">
              <div className="tt-paper tt-paper-back" aria-hidden="true" />
              <div className="tt-paper tt-paper-mid" aria-hidden="true" />
              <p className="tt-pin-hint" aria-hidden="true">Keep scrolling — the stem is still growing</p>
              {/* The track holds stem + nodes; it glides up through the pinned
                  stage so every product reaches the centre in turn. */}
              <div className="tt-track">
              <svg className="tt-stem" viewBox="0 0 200 1000" preserveAspectRatio="none" aria-hidden="true">
                <path
                  className="tt-stem-path"
                  d="M100,10 C85,150 115,280 100,420 C85,560 115,690 100,820 C90,900 108,950 100,990"
                  fill="none"
                />
                {[125, 375, 625, 875].map((cy) => (
                  <circle key={cy} className="tt-node-dot" cx="100" cy={cy} r="9" />
                ))}
              </svg>
              <div className="tt-nodes">
                {content.products.map((p, i) => (
                  <div className={`tt-node${i % 2 ? ' is-right' : ''}`} key={p.name}>
                    <ProductCard index={i} onAdd={addToBag} />
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>

          {/* Stacked left-rail fallback — mobile / reduced */}
          <div className="tt-stack">
            <ol>
              {content.products.map((p, i) => (
                <li className="tt-stack-item tt-rv" key={p.name}>
                  <span className="tt-stack-dot" aria-hidden="true" />
                  <ProductCard index={i} onAdd={addToBag} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Divider />

        {/* MATERIAL STORIES */}
        <section id="story" className="tt-story" data-tour="Materials">
          <div className="tt-wrap">
            <p className="tt-eyebrow tt-rv">{content.materials.eyebrow}</p>
            <h2 className="tt-h2 tt-rv">{content.materials.title}</h2>
            <p className="tt-body tt-rv">{content.materials.body}</p>
            <div className="tt-story-grid">
              <figure className="tt-story-img tt-rv">
                <Img k="detail" src={img('detail', detailImg)} alt={content.materials.imageAlt} />
                <figcaption>Our refill station, Bengaluru studio</figcaption>
              </figure>
              <ul className="tt-materials">
                {content.materials.items.map((m) => (
                  <li className="tt-material tt-rv" key={m.name}>
                    <h3 className="tt-h3">{m.name}</h3>
                    <p className="tt-body">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* IMPACT + SHIPPING */}
        <section id="impact" className="tt-impact" data-tour="Impact">
          <div className="tt-wrap">
            <p className="tt-eyebrow tt-rv">{content.impact.eyebrow}</p>
            <h2 className="tt-h2 tt-rv">{content.impact.title}</h2>
            <p className="tt-body tt-rv">{content.impact.body}</p>
            <dl className="tt-stats">
              {content.impact.stats.map((s) => (
                <div className="tt-stat tt-rv" key={s.label}>
                  <dt className="tt-stat-label">{s.label}</dt>
                  <dd className="tt-stat-value">
                    <span className="tt-count" data-target={s.value} data-suffix={s.suffix}>
                      {'0' + s.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="tt-wrap tt-shipping">
            <p className="tt-eyebrow tt-rv">{content.shipping.eyebrow}</p>
            <h2 className="tt-h2 tt-rv">{content.shipping.title}</h2>
            <p className="tt-body tt-rv">{content.shipping.body}</p>
            <ul className="tt-ship-points">
              {content.shipping.points.map((pt) => (
                <li className="tt-ship-point tt-rv" key={pt.name}>
                  <h3 className="tt-h3">{pt.name}</h3>
                  <p className="tt-body">{pt.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="tt-contact">
          <div className="tt-wrap tt-rv">
            <p className="tt-eyebrow">Say hello</p>
            <h2 className="tt-h2">Come see the studio.</h2>
            <address className="tt-address">
              {content.contact.address}<br />
              <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a><br />
              <a href={`mailto:${email}`}>{email}</a>
              {instagram && (
                <>
                  <br />
                  <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>
                </>
              )}
            </address>
            <p className="tt-body">{content.contact.hours}</p>
          </div>
        </section>
      </main>

      <footer className="tt-footer">
        <div className="tt-wrap">
          <p className="tt-footer-line">{content.footer.line}</p>
          <p className="tt-colophon">{content.footer.colophon}</p>
          <p className="tt-demo-note">Demonstration storefront — products, cart and checkout are illustrative.</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} lines={lines} onClose={() => setCartOpen(false)} onQty={changeQty} />
    </div>
  );
}
