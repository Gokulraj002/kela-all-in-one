import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-drop';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap';

const FALLBACKS = {
  hero: heroImg,
  'product-0': product1Img,
  'product-1': product2Img,
  'product-2': product3Img,
  detail: detailImg,
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Real spaces sit between the word masks so the line reads (and wraps) as
   text; screen readers get the plain sentence from the visually-hidden copy. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`dp-wm ${className}`}>
      <span className="dp-sr">{text}</span>
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

/* Seconds left until local midnight — a real interval, ticking every second. */
function timeToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    h: Math.floor(diff / 3.6e6),
    m: Math.floor((diff % 3.6e6) / 6e4),
    s: Math.floor((diff % 6e4) / 1e3),
  };
}

function useCountdown() {
  const [t, setT] = useState(timeToMidnight);
  useEffect(() => {
    const id = setInterval(() => setT(timeToMidnight()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function Ticker() {
  const seq = [...content.ticker, ...content.ticker];
  return (
    <div className="dp-ticker" aria-label="Drop announcements">
      <div className="dp-ticker-track">
        {[0, 1].map((dup) => (
          <div className="dp-ticker-seq" key={dup} aria-hidden={dup === 1}>
            {seq.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ index, product, onAdd }) {
  const { productName, price, img } = useCustom();
  const [size, setSize] = useState(null);
  const [warn, setWarn] = useState(false);
  const name = productName(index, product.name);

  const add = () => {
    if (!size) {
      setWarn(true);
      return;
    }
    onAdd(index, size);
    setWarn(false);
  };

  return (
    <article className="dp-card" data-index={index}>
      <span className="dp-stamp" aria-label={`Stamp: ${product.badge}`}>
        {product.badge}
      </span>
      <div className="dp-card-img">
        <Img k={product.imgKey} src={img(product.imgKey, FALLBACKS[product.imgKey])} alt={product.alt} />
      </div>
      <div className="dp-card-body">
        <p className="dp-card-num">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="dp-card-name">{name}</h3>
        <p className="dp-card-desc">{product.desc}</p>
        <div className="dp-price-zone">
          <p className="dp-msrp">
            <span className="dp-msrp-val">{price(product.msrp)}</span>
            <span className="dp-msrp-slash" aria-hidden="true" />
          </p>
          <p className="dp-price">{price(product.price)}</p>
        </div>
        <div className="dp-sizes" role="group" aria-label={`Sizes for ${name}`}>
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`dp-size${size === s ? ' is-on' : ''}`}
              aria-pressed={size === s}
              onClick={() => {
                setSize(s);
                setWarn(false);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {warn && (
          <p className="dp-warn" role="alert">
            Pick a size first.
          </p>
        )}
        <button type="button" className="dp-add" onClick={add}>
          ADD TO CART
        </button>
      </div>
    </article>
  );
}

function CartDrawer({ open, items, onClose, onRemove }) {
  const { price } = useCustom();
  const total = items.reduce((a, it) => a + it.price * it.qty, 0);
  return (
    <div className={`dp-drawer-wrap${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <div className="dp-scrim" onClick={onClose} />
      <aside className="dp-drawer" role="dialog" aria-label="Your cart">
        <div className="dp-drawer-head">
          <h2 className="dp-drawer-title">CART ({items.reduce((a, it) => a + it.qty, 0)})</h2>
          <button type="button" className="dp-drawer-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>
        {items.length === 0 ? (
          <p className="dp-drawer-empty">Empty. The drop waits for no one.</p>
        ) : (
          <>
            <ul className="dp-drawer-list">
              {items.map((it) => (
                <li className="dp-drawer-item" key={it.key}>
                  <div>
                    <p className="dp-drawer-name">{it.name}</p>
                    <p className="dp-drawer-meta">
                      Size {it.size} · Qty {it.qty}
                    </p>
                  </div>
                  <div className="dp-drawer-right">
                    <p className="dp-drawer-line">{price(it.price * it.qty)}</p>
                    <button
                      type="button"
                      className="dp-drawer-remove"
                      onClick={() => onRemove(it.key)}
                      aria-label={`Remove ${it.name}, size ${it.size}`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="dp-drawer-foot">
              <p className="dp-drawer-total">
                <span>Total</span>
                <span>{price(total)}</span>
              </p>
              <button type="button" className="dp-checkout" onClick={() => {}}>
                CHECKOUT — DEMO ONLY
              </button>
              <p className="dp-demo-note">Demo cart. No payment, no order, no regrets.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function Restock() {
  const { img, contact } = useCustom();
  const email = contact.email || content.contact.email;
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      setError('Enter a valid email to get the alert.');
      return;
    }
    setError('');
    setDone(true);
  };

  return (
    <section id="restock" className="dp-restock" data-tour="Restock Alerts">
      <div className="dp-wrap dp-restock-grid">
        <div className="dp-restock-copy">
          <p className="dp-eyebrow dp-eyebrow-ink dp-rv">{content.restock.eyebrow}</p>
          <h2 className="dp-h2 dp-h2-ink dp-rv">{content.restock.title}</h2>
          <span className="dp-rule dp-rule-ink" aria-hidden="true" />
          <p className="dp-body dp-rv">{content.restock.body}</p>
          {done ? (
            <p className="dp-restock-done dp-rv" role="status">
              {content.restock.success}
            </p>
          ) : (
            <form className="dp-restock-form dp-rv" onSubmit={submit} noValidate>
              <label className="dp-sr" htmlFor="dp-restock-email">
                Email for restock alerts
              </label>
              <input
                id="dp-restock-email"
                type="email"
                className="dp-restock-input"
                placeholder={content.restock.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="email"
              />
              <button type="submit" className="dp-restock-btn">
                {content.restock.cta}
              </button>
              {error && (
                <p className="dp-warn dp-warn-ink" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="dp-restock-contact dp-rv">
            Drop desk: <a href={`mailto:${email}`}>{email}</a> · {content.contact.hours}
          </p>
        </div>
        <figure className="dp-restock-img dp-rv">
          <Img k="detail" src={img('detail', detailImg)} alt={content.restock.sideAlt} />
          <figcaption className="dp-restock-cap">The unboxing, Volume 04.</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default function Design04Drop() {
  const { brand, contact, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram;
  const t = useCountdown();
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((a, it) => a + it.qty, 0);

  const addToCart = (index, size) => {
    const p = content.products[index];
    const key = `${index}__${size}`;
    setCart((prev) => {
      const found = prev.find((it) => it.key === key);
      if (found) {
        return prev.map((it) => (it.key === key ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { key, index, name: productName(index, p.name), size, price: p.price, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (key) => setCart((prev) => prev.filter((it) => it.key !== key));

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

      /* Hero entrance: masked word-rise headline, stamp slam, countdown band up. */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.dp-hero-title .wi', { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, 0.1)
        .fromTo(
          '.dp-hero-eyebrow, .dp-hero-sub',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.45
        )
        .fromTo(
          '.dp-hero-stamp',
          { scale: 2.4, opacity: 0, rotation: -20 },
          { scale: 1, opacity: 1, rotation: -8, duration: 0.55, ease: 'back.out(2.2)' },
          0.7
        )
        .fromTo('.dp-count-band', { yPercent: 32, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.8);

      /* DROP CASCADE (MOTION.md §04): each product falls from above as you
         scroll — scrubbed yPercent from -130 with back.out(1.4) so it
         overshoots and settles, with a slight rotation. As it lands, the
         price zone fades up and the volt slash strikes the MSRP. */
      gsap.utils.toArray('.dp-card').forEach((card, i) => {
        const zone = card.querySelector('.dp-price-zone');
        const slash = card.querySelector('.dp-msrp-slash');
        const ctl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            scroller: sc,
            start: 'top 108%',
            end: 'top 42%',
            scrub: 1,
          },
        });
        ctl.fromTo(
          card,
          { yPercent: -130, rotation: i % 2 ? 6 : -6 },
          { yPercent: 0, rotation: 0, duration: 0.6, ease: 'back.out(1.4)' },
          0
        );
        ctl.fromTo(zone, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.55);
        ctl.fromTo(slash, { scaleX: 0 }, { scaleX: 1, duration: 0.1, ease: 'power2.in' }, 0.6);
      });

      /* Hard rules draw between zones. */
      gsap.utils.toArray('.dp-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 94%', once: true },
          }
        );
      });

      /* Generic kinetic reveals. */
      gsap.utils.toArray('.dp-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-04-drop${reduced ? ' dp-reduced' : ''}`}>
      <Ticker />

      {/* NAV */}
      <header className="dp-nav">
        <a className="dp-wordmark" href="#hero">
          {name}
        </a>
        <nav className="dp-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="dp-cartbtn"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${cartCount} items`}
        >
          CART <span className="dp-cartcount">{cartCount}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence replaces the looping hero video */}
        <section id="hero" className="dp-hero" data-tour="The Drop Zone">
          <ScrollFrames
            frames={frames}
            alt="Shoebox lid lifting as tissue paper explodes upward in slow motion, dust hanging in hard light, a sneaker with a volt-orange tag revealed in the box"
            pinDistance="+=170%"
            stageHeight="var(--tpl-vh, 100svh)"
          >
            <div className="dp-hero-scrim" aria-hidden="true" />
            <div className="dp-hero-inner dp-wrap">
              <span className="dp-hero-stamp" aria-hidden="true">
                LIVE
              </span>
              <p className="dp-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="dp-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="dp-hero-sub">{content.hero.sub}</p>
            </div>
          </ScrollFrames>
        </section>

        {/* COUNTDOWN BAND */}
        <section className="dp-count-band" aria-label="Drop countdown">
          <div className="dp-wrap dp-count-grid">
            <div>
              <p className="dp-count-label">{content.hero.countdownLabel}</p>
              <p className="dp-count-digits" aria-hidden="true">
                <span className="dp-digit">{pad(t.h)}</span>
                <span className="dp-sep">:</span>
                <span className="dp-digit">{pad(t.m)}</span>
                <span className="dp-sep">:</span>
                <span className="dp-digit">{pad(t.s)}</span>
              </p>
              <p className="dp-sr">The drop closes at midnight, local time.</p>
              <p className="dp-count-note">{content.hero.midnightNote}</p>
            </div>
            <a className="dp-count-cta dp-pulse" href={content.hero.ctaHref}>
              {content.hero.cta}
            </a>
          </div>
        </section>

        {/* THE DROP — cascade lineup */}
        <section id="products" className="dp-products" data-tour="The Drop">
          <div className="dp-wrap">
            <p className="dp-eyebrow dp-rv">The lineup · 4 pieces</p>
            <h2 className="dp-h2 dp-rv">Catch them falling.</h2>
            <span className="dp-rule" aria-hidden="true" />
            <div className="dp-grid">
              {content.products.map((p, i) => (
                <ProductCard key={p.name} index={i} product={p} onAdd={addToCart} />
              ))}
            </div>
          </div>
        </section>

        {/* SIZE GUIDE + FAQ */}
        <section id="guide" className="dp-guide" data-tour="Size Guide">
          <div className="dp-wrap">
            <p className="dp-eyebrow dp-rv">{content.guide.eyebrow}</p>
            <h2 className="dp-h2 dp-rv">{content.guide.title}</h2>
            <span className="dp-rule" aria-hidden="true" />
            <div className="dp-guide-grid">
              <div className="dp-rv">
                <p className="dp-body">{content.guide.body}</p>
                <table className="dp-sizechart">
                  <caption className="dp-sr">Size chart for drop apparel</caption>
                  <thead>
                    <tr>
                      <th scope="col">Size</th>
                      <th scope="col">Chest</th>
                      <th scope="col">Length</th>
                      <th scope="col">Waist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.guide.rows.map((r) => (
                      <tr key={r.size}>
                        <th scope="row">{r.size}</th>
                        <td>{r.chest}</td>
                        <td>{r.length}</td>
                        <td>{r.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="dp-guide-note">{content.guide.note}</p>
              </div>
              <div className="dp-faq dp-rv">
                {content.guide.faqs.map((f) => (
                  <details className="dp-faq-item" key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RESTOCK + FOOTER */}
        <Restock />
      </main>

      <footer className="dp-footer">
        <div className="dp-wrap">
          <p className="dp-footer-word">{name}</p>
          <span className="dp-rule dp-rule-bone" aria-hidden="true" />
          <div className="dp-footer-grid">
            <div>
              <p className="dp-footer-line">{content.footer.line}</p>
              <p className="dp-footer-demo">{content.footer.demo}</p>
            </div>
            <div>
              <p className="dp-footer-h">Contact</p>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
                <br />
                {content.contact.phone}
                <br />
                {content.contact.address}
                {instagram && (
                  <>
                    <br />
                    <a href={instagram} target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                  </>
                )}
              </p>
            </div>
            <div>
              <p className="dp-footer-h">Navigate</p>
              <nav aria-label="Footer">
                {content.nav.map((n) => (
                  <a key={n.href} href={n.href}>
                    {n.label}
                    <br />
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <p className="dp-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
    </div>
  );
}
