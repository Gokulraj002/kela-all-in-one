import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

/* Signature scroll-driven frame sequence (Apple-style): 72 JPG frames
   scrubbed by the pinned ScrollFrames hero. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const scrubFrames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-brutal';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800;900&family=Space+Mono:wght@400;700&display=swap';

/* Fisher-Yates — the ledger shuffle. */
function fisherYates(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`rs-wm ${className}`} aria-label={text}>
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

/* Brand wordmark: honors custom brand names; the slash gets the yellow cut. */
function BrandWord({ name, className }) {
  const parts = String(name).split('/');
  return (
    <span className={className} aria-label={name}>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="rs-slash">/</span>}
          {p}
        </React.Fragment>
      ))}
    </span>
  );
}

export default function Design10Brutal() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  /* ---------- demo cart (manifest drawer) ---------- */
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addToCart = (i) => setCart((c) => ({ ...c, [i]: (c[i] || 0) + 1 }));
  const setQty = (i, q) =>
    setCart((c) => {
      const n = { ...c };
      if (q <= 0) delete n[i];
      else n[i] = q;
      return n;
    });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  /* ---------- ledger state ---------- */
  const [order, setOrder] = useState(() => content.products.map((_, i) => i));
  const [sortMode, setSortMode] = useState('default');
  const [struck, setStruck] = useState(false); // sale prices live after first shuffle
  const [cut, setCut] = useState(0); // hard-cut flash counter
  const lastShuffle = useRef(0);
  const bodyRef = useRef(null);

  const hardCut = useCallback(() => {
    if (!reduced) setCut((c) => c + 1);
  }, [reduced]);

  /* Ledger shuffle: Fisher-Yates, strike prices to sale, hard cut. Debounced. */
  const doShuffle = useCallback(() => {
    const now = performance.now();
    if (now - lastShuffle.current < 1200) return;
    lastShuffle.current = now;
    setOrder((o) => fisherYates(o));
    setSortMode('shuffled');
    setStruck(true);
    if (!reduced) setCut((c) => c + 1);
  }, [reduced]);
  const shuffleRef = useRef(doShuffle);
  useEffect(() => {
    shuffleRef.current = doShuffle;
  }, [doShuffle]);

  const sortBy = (mode) => {
    setSortMode(mode);
    setOrder((o) => {
      if (mode === 'default') return content.products.map((_, i) => i);
      const a = o.slice();
      if (mode === 'price-asc') a.sort((x, y) => content.products[x].price - content.products[y].price);
      else if (mode === 'price-desc') a.sort((x, y) => content.products[y].price - content.products[x].price);
      else if (mode === 'name') a.sort((x, y) => content.products[x].name.localeCompare(content.products[y].name));
      return a;
    });
    hardCut();
  };

  /* Hard-cut blink: 0.1s, nothing eases longer than 0.15s. */
  useEffect(() => {
    if (cut === 0 || reduced || !bodyRef.current) return;
    gsap.fromTo(
      bodyRef.current,
      { opacity: 0.2 },
      { opacity: 1, duration: 0.1, ease: 'none', overwrite: true }
    );
  }, [cut, reduced]);

  const cartTotal = Object.entries(cart).reduce(
    (a, [i, q]) => a + (struck ? content.products[i].sale : content.products[i].price) * q,
    0
  );

  /* ---------- fonts ---------- */
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* ---------- drawer: escape to close ---------- */
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  /* ---------- motion: Ledger Shuffle + hard reveals ---------- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Scroll-velocity shuffle: spikes re-cut the ledger. Debounced 1200ms
         inside doShuffle. Threshold ~2000px/s of scroll velocity. */
      let lastScroll = null;
      let lastT = 0;
      ScrollTrigger.create({
        trigger: '.rs-sec-ledger',
        scroller: sc,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const now = performance.now();
          const s = self.scroll();
          if (lastScroll !== null && lastT > 0) {
            const v = Math.abs(s - lastScroll) / Math.max(1, now - lastT);
            if (v > 2.0 && shuffleRef.current) shuffleRef.current();
          }
          lastScroll = s;
          lastT = now;
        },
      });

      /* Hero: hard snap-in. 0.12s, no easing. */
      gsap.fromTo(
        '.rs-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.12, ease: 'none', stagger: 0.05 }
      );
      gsap.fromTo(
        '.rs-hero .rs-eyebrow, .rs-hero-sub, .rs-hero-cta-row',
        { opacity: 0 },
        { opacity: 1, duration: 0.12, ease: 'none', stagger: 0.06, delay: 0.1 }
      );

      /* Reveals: snap, never ease longer than 0.15s. */
      gsap.utils.toArray('.rs-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
      /* Thick rules draw fast. */
      gsap.utils.toArray('.rs-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 94%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const tickerItems = content.ticker.concat(content.ticker);
  const frames = [
    { key: 'product-0', src: img('product-0', product1Img), alt: 'Utility work jacket laid flat on raw concrete, harsh top light' },
    { key: 'product-1', src: img('product-1', product2Img), alt: 'Steel-toe work boots standing on raw concrete, hard shadows' },
    { key: 'product-2', src: img('product-2', product3Img), alt: 'Stack of sealed cardboard parcels on pallets in the warehouse' },
    { key: 'detail', src: img('detail', detailImg), alt: 'Extreme macro of a barcode label on cardboard, yellow edge' },
  ];

  return (
    <div ref={rootRef} className={`tpl-design-10-brutal${reduced ? ' is-reduced' : ''}`}>
      {/* NAV */}
      <header className="rs-nav">
        <a className="rs-wordmark" href="#hero">
          <BrandWord name={name} className="rs-wordmark-inner" />
        </a>
        <nav className="rs-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button
          className="rs-cartbtn"
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Open manifest, ${cartCount} items`}
        >
          Manifest <span className="rs-cartcount" aria-hidden="true">{cartCount}</span>
        </button>
      </header>

      {/* STOCK TICKER */}
      <div className="rs-ticker" aria-hidden="true">
        <div className="rs-ticker-track">
          {tickerItems.map((t, i) => (
            <React.Fragment key={i}>
              <span>{t}</span>
              <span className="rs-tk-sep">///</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <main>
        {/* HERO — "The belt" — scroll-driven frame sequence */}
        <section id="hero" className="rs-hero" data-tour="The Belt">
          <ScrollFrames
            frames={scrubFrames}
            alt="Parcels moving on a warehouse conveyor under harsh top light, barcodes flashing past"
            pinDistance="+=170%"
          >
            <div className="rs-hero-copy">
              <p className="rs-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="rs-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="rs-hero-sub">{content.hero.sub}</p>
              <div className="rs-hero-cta-row">
                <a className="rs-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <p className="rs-hero-note">{content.hero.note}</p>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* LEDGER — "Ledger Shuffle" */}
        <section id="products" className="rs-sec rs-sec-ledger" data-tour="Stock">
          <div className="rs-wrap">
            <div className="rs-sec-head">
              <p className="rs-eyebrow rs-rv">{content.ledger.eyebrow}</p>
              <h2 className="rs-h2 rs-rv">{content.ledger.title}</h2>
              <span className="rs-rule" aria-hidden="true" />
              <p className="rs-body rs-rv">{content.ledger.note}</p>
            </div>

            <div className="rs-controls rs-rv" role="group" aria-label="Ledger controls">
              <button
                type="button"
                className={`rs-sortbtn${sortMode === 'price-asc' ? ' is-active' : ''}`}
                onClick={() => sortBy('price-asc')}
                aria-pressed={sortMode === 'price-asc'}
              >
                Price ↑
              </button>
              <button
                type="button"
                className={`rs-sortbtn${sortMode === 'price-desc' ? ' is-active' : ''}`}
                onClick={() => sortBy('price-desc')}
                aria-pressed={sortMode === 'price-desc'}
              >
                Price ↓
              </button>
              <button
                type="button"
                className={`rs-sortbtn${sortMode === 'name' ? ' is-active' : ''}`}
                onClick={() => sortBy('name')}
                aria-pressed={sortMode === 'name'}
              >
                Name A–Z
              </button>
              <button
                type="button"
                className={`rs-sortbtn${sortMode === 'default' ? ' is-active' : ''}`}
                onClick={() => sortBy('default')}
                aria-pressed={sortMode === 'default'}
              >
                Reset
              </button>
              <p className="rs-shuffle-tag">
                {struck ? (
                  <span>SALE <b>LIVE</b> — prices struck</span>
                ) : (
                  <span>Shuffle to strike prices</span>
                )}
              </p>
            </div>

            <table className="rs-ledger rs-rv">
              <thead>
                <tr>
                  <th scope="col">№</th>
                  <th scope="col">Item</th>
                  <th scope="col">Sizes</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Price</th>
                  <th scope="col">Take</th>
                </tr>
              </thead>
              <tbody ref={bodyRef}>
                {order.map((pi, ri) => {
                  const p = content.products[pi];
                  return (
                    <tr key={p.sku}>
                      <td data-label="№" className="rs-rownum">{String(ri + 1).padStart(2, '0')}</td>
                      <td data-label="Item">
                        <p className="rs-sku">{p.sku}</p>
                        <h3 className="rs-itemname">{productName(pi, p.name)}</h3>
                        <p className="rs-itemdesc">{p.desc}</p>
                      </td>
                      <td data-label="Sizes">{p.sizes}</td>
                      <td data-label="Stock" className="rs-stock">
                        {p.stock < 30 ? <span className="rs-low">{p.stock} LEFT</span> : <span>{p.stock} IN STOCK</span>}
                      </td>
                      <td data-label="Price" className="rs-pricecell">
                        {struck ? (
                          <span>
                            <span className="rs-price-struck">{price(p.price)}</span>
                            <span className="rs-price-sale">{price(p.sale)}</span>
                          </span>
                        ) : (
                          <span>{price(p.price)}</span>
                        )}
                      </td>
                      <td data-label="Take" className="rs-cell-add">
                        <button type="button" className="rs-addbtn" onClick={() => addToCart(pi)}>
                          + Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="rs-ledger-note">
              Fast scrolls re-cut this table. Reduced-motion readers: the table stays put — sorts still work.
            </p>
          </div>
        </section>

        {/* VISUAL STOCK CHECK */}
        <section id="visual" className="rs-sec rs-sec-visual" data-tour="Stock Check">
          <div className="rs-wrap">
            <div className="rs-sec-head">
              <p className="rs-eyebrow rs-rv">{content.visual.eyebrow}</p>
              <h2 className="rs-h2 rs-rv">{content.visual.title}</h2>
              <span className="rs-rule" aria-hidden="true" />
            </div>
            <div className="rs-frames">
              {frames.map((f, i) => (
                <figure className="rs-frame rs-rv" key={f.key}>
                  <Img k={f.key} src={f.src} alt={f.alt} />
                  <figcaption className="rs-plate">
                    <span className="rs-plate-sku">{content.visual.frames[i].sku}</span>
                    <span>{content.visual.frames[i].label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* SHIPPING MANIFEST */}
        <section id="shipping" className="rs-sec rs-sec-ship" data-tour="No-BS Shipping">
          <div className="rs-wrap">
            <div className="rs-sec-head">
              <p className="rs-eyebrow rs-rv">{content.shipping.eyebrow}</p>
              <h2 className="rs-h2 rs-rv">{content.shipping.title}</h2>
              <span className="rs-rule" aria-hidden="true" style={{ background: 'var(--rs-hi)' }} />
            </div>
            <dl className="rs-manifest">
              {content.shipping.lines.map((l) => (
                <div className="rs-manifest-row rs-rv" key={l.term}>
                  <dt className="rs-manifest-term">{l.term}</dt>
                  <dd className="rs-manifest-text">{l.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="rs-footer" data-tour="Fine Print">
        <div className="rs-wrap">
          <p className="rs-footer-brand"><BrandWord name={name} /></p>
          <div className="rs-footer-grid">
            <div>
              <h3>Contact</h3>
              <p><a href={`mailto:${email}`}>{email}</a></p>
              <p><a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a></p>
              <p>{content.contact.hours}</p>
            </div>
            <div>
              <h3>Unit</h3>
              <p>{content.contact.address}</p>
            </div>
            <div>
              <h3>Policy</h3>
              <p>Demo cart. No checkout, no charge.</p>
              <p>7-day returns. Unworn only.</p>
            </div>
          </div>
          <p className="rs-footer-line">{content.footer.line}</p>
          <p className="rs-footer-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      {/* MANIFEST DRAWER */}
      {drawerOpen && (
        <div className="rs-backdrop" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}
      <aside
        className="rs-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Manifest — demo cart"
        style={{ display: drawerOpen ? 'flex' : 'none' }}
      >
        <div className="rs-drawer-head">
          <h2>Manifest</h2>
          <button type="button" className="rs-drawer-close" onClick={() => setDrawerOpen(false)}>
            Close
          </button>
        </div>
        <div className="rs-drawer-items">
          {cartCount === 0 ? (
            <p className="rs-drawer-empty">Empty. The ledger is right there — go take something.</p>
          ) : (
            Object.entries(cart).map(([i, q]) => {
              const p = content.products[i];
              const unit = struck ? p.sale : p.price;
              return (
                <div className="rs-cartitem" key={p.sku}>
                  <div>
                    <p className="rs-cartitem-name">{productName(Number(i), p.name)}</p>
                    <p className="rs-cartitem-sku">{p.sku}</p>
                  </div>
                  <p className="rs-cartitem-price">{price(unit * q)}</p>
                  <div className="rs-qty">
                    <button type="button" onClick={() => setQty(Number(i), q - 1)} aria-label={`Remove one ${p.name}`}>−</button>
                    <span className="rs-qty-n" aria-live="polite">{q}</span>
                    <button type="button" onClick={() => setQty(Number(i), q + 1)} aria-label={`Add one ${p.name}`}>+</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="rs-drawer-foot">
          <p className="rs-total">
            <span>Total</span>
            <span className="rs-total-n">{price(cartTotal)}</span>
          </p>
          <button type="button" className="rs-checkout" disabled>
            Checkout — demo
          </button>
          <p className="rs-demo-note">Demo cart. No charge. No checkout.</p>
        </div>
      </aside>
    </div>
  );
}
