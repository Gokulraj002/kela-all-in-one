import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72-frame sequence, scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-tech';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

/* Product imagery: key maps to the platform upload keys
   (product-0 → product-1.jpg, product-1 → product-2.jpg,
    product-2 → product-3.jpg, detail → detail.jpg). */
const CELL_IMAGES = [
  { src: product1Img, key: 'product-0', alt: 'Aria wireless over-ear headphones, matte black studio shot with cyan edge light' },
  { src: product2Img, key: 'product-1', alt: 'Pulse smartwatch in titanium, macro of the glowing AMOLED display' },
  { src: detailImg, key: 'detail', alt: 'Volt 65W charger power stage, macro of the GaN circuit board with cyan status LEDs' },
  { src: product3Img, key: 'product-2', alt: 'Orbit mechanical keyboard, angled close-up of graphite keycaps with a cyan accent key' },
];

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`vs-wm ${className}`} aria-label={text}>
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

/* HUD callout block: crosshair marker + SVG leader line + mono spec lines.
   The leader draws from the label corner to the crosshair point in % space. */
function ScanCell({ p, index, image, added, onAdd }) {
  const { productName, price, img } = useCustom();
  const c = p.callout;
  return (
    <article className="vs-cell" data-index={index}>
      <div className="vs-frame">
        <Img k={image.key} src={img(image.key, image.src)} alt={image.alt} className="vs-frame-img" />
        <svg className="vs-leader" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={`14,10 40,10 ${c.x},${c.y}`} pathLength="100" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="vs-xhair" style={{ left: `${c.x}%`, top: `${c.y}%` }} aria-hidden="true" />
        <div className="vs-callout" aria-hidden="true">
          <span className="vs-callout-tag">{p.tag}</span>
          {c.lines.map((l) => (
            <span key={l} className="vs-callout-line">{l}</span>
          ))}
        </div>
        <span className="vs-corner tl" aria-hidden="true" />
        <span className="vs-corner tr" aria-hidden="true" />
        <span className="vs-corner bl" aria-hidden="true" />
        <span className="vs-corner br" aria-hidden="true" />
      </div>
      <div className="vs-cell-info">
        <p className="vs-cell-num">{p.tag} / {p.badge}</p>
        <h3 className="vs-cell-name">{productName(index, p.name)}</h3>
        <p className="vs-cell-desc">{p.desc}</p>
        <ul className="vs-cellspecs">
          {p.specs.map(([k, v]) => (
            <li key={k}><span>{k}</span><span>{v}</span></li>
          ))}
        </ul>
        <div className="vs-cell-buy">
          <p className="vs-cell-price">{price(p.price)}</p>
          <button
            type="button"
            className={`vs-add${added ? ' is-added' : ''}`}
            onClick={() => onAdd(index)}
            aria-label={`Add ${productName(index, p.name)} to cart`}
          >
            {added ? 'ADDED' : 'ADD +'}
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }) {
  const { productName, price } = useCustom();
  const count = items.reduce((n, it) => n + it.qty, 0);
  const total = items.reduce((n, it) => n + content.products[it.idx].price * it.qty, 0);
  return (
    <>
      <div
        className={`vs-scrim${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`vs-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
        inert={!open}
      >
        <div className="vs-drawer-head">
          <p className="vs-drawer-title">{content.cart.title} <span>[{count}]</span></p>
          <button type="button" className="vs-drawer-close" onClick={onClose} aria-label="Close cart">
            {'\u00D7'}
          </button>
        </div>
        {items.length === 0 ? (
          <p className="vs-drawer-empty">{content.cart.empty}</p>
        ) : (
          <ul className="vs-drawer-list">
            {items.map((it) => {
              const p = content.products[it.idx];
              return (
                <li key={it.idx} className="vs-drawer-item">
                  <div>
                    <p className="vs-drawer-name">{productName(it.idx, p.name)}</p>
                    <p className="vs-drawer-unit">{price(p.price)} / unit</p>
                  </div>
                  <div className="vs-drawer-qty">
                    <button type="button" onClick={() => onDec(it.idx)} aria-label="Decrease quantity">{'\u2212'}</button>
                    <span>{it.qty}</span>
                    <button type="button" onClick={() => onInc(it.idx)} aria-label="Increase quantity">+</button>
                  </div>
                  <p className="vs-drawer-line">{price(p.price * it.qty)}</p>
                  <button type="button" className="vs-drawer-rm" onClick={() => onRemove(it.idx)} aria-label={`Remove ${productName(it.idx, p.name)}`}>
                    {'\u00D7'}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className="vs-drawer-foot">
          <div className="vs-drawer-total">
            <span>TOTAL</span>
            <span>{price(total)}</span>
          </div>
          <button type="button" className="vs-btn vs-drawer-checkout" disabled={items.length === 0}>
            {content.cart.checkout}
          </button>
          <p className="vs-drawer-note">{content.cart.demoNote}</p>
        </div>
      </aside>
    </>
  );
}

export default function Design06Tech() {
  const { brand, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addedIdx, setAddedIdx] = useState(null);
  const count = cart.reduce((n, it) => n + it.qty, 0);
  const timerRef = useRef(null);

  /* Fonts: injected once, never removed. */
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Escape closes the cart drawer. */
  useEffect(() => {
    if (!drawerOpen) return;
    const fn = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [drawerOpen]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const addToCart = (idx) => {
    setCart((c) => {
      const found = c.find((it) => it.idx === idx);
      if (found) return c.map((it) => (it.idx === idx ? { ...it, qty: it.qty + 1 } : it));
      return [...c, { idx, qty: 1 }];
    });
    setAddedIdx(idx);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAddedIdx(null), 900);
  };
  const changeQty = (idx, d) => {
    setCart((c) =>
      c
        .map((it) => (it.idx === idx ? { ...it, qty: it.qty + d } : it))
        .filter((it) => it.qty > 0)
    );
  };
  const removeItem = (idx) => setCart((c) => c.filter((it) => it.idx !== idx));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: scan-wipe frame reveal, masked word-rise headline,
         HUD corners lock on. Total <= 2.2s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.vs-hero .sf-canvas, .vs-hero .sf-static-img',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.vs-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out' },
          0.35
        )
        .fromTo(
          '.vs-hero-copy .vs-eyebrow, .vs-hero-sub, .vs-hero-ctas',
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.8
        )
        .fromTo(
          '.vs-hero .vs-corner',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.06 },
          0.9
        )
        .fromTo(
          '.vs-hero-readout, .vs-scrollhint',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.1
        );

      /* Parallax drift removed: the pinned frame-scrub now carries hero motion. */

      /* Section reveals. */
      gsap.utils.toArray('.vs-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      /* Product cells: reveal their contents, not the cell itself — the cell's
         own opacity is the CSS scan-dim state (with its own transition). */
      const track = rootRef.current && rootRef.current.querySelector('.vs-track');
      if (track) {
        gsap.fromTo(
          track.querySelectorAll('.vs-cell > *'),
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.08,
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: track, scroller: sc, start: 'top 86%', once: true },
          }
        );
      }
      gsap.utils.toArray('.vs-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.vs-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* BLUEPRINT SCAN — desktop-only pin (MOTION.md §06). A vertical
         scan-line sweeps the product lineup with scrub; as it crosses each
         product the HUD callouts pop and the readout panel updates.
         matchMedia reverts cleanly on resize below 1024px. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const stage = rootRef.current && rootRef.current.querySelector('.vs-stage');
        if (!stage) return;
        const line = stage.querySelector('.vs-scanline');
        const lane = stage.querySelector('.vs-trackwrap');
        const cells = gsap.utils.toArray('.vs-cell', stage);
        const blocks = gsap.utils.toArray('.vs-readout-block', stage);
        const pct = stage.querySelector('.vs-scan-pct');
        const unit = stage.querySelector('.vs-scan-unit');
        let last = -1;
        const setActive = (i) => {
          if (i === last) return;
          last = i;
          cells.forEach((c, k) => c.classList.toggle('is-active', k === i));
          blocks.forEach((b, k) => b.classList.toggle('is-on', k === i));
        };
        setActive(0);
        /* Transform-only sweep (no layout per frame). */
        gsap.fromTo(
          line,
          { x: 0 },
          {
            x: () => (lane ? lane.clientWidth : 0),
            ease: 'none',
            scrollTrigger: {
              trigger: '.vs-pinwrap',
              scroller: sc,
              start: 'top top',
              end: '+=220%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const i = Math.min(cells.length - 1, Math.floor(self.progress * cells.length));
                setActive(i);
                if (pct) pct.textContent = String(Math.round(self.progress * 100)).padStart(3, '0');
                if (unit) unit.textContent = `0${i + 1}/04`;
              },
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-06-tech${reduced ? ' is-reduced' : ''}`}>
      {/* NAV */}
      <header className="vs-nav">
        <a className="vs-wordmark" href="#hero" aria-label={`${name} — home`}>
          {name}
        </a>
        <nav className="vs-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="vs-cartbtn"
          onClick={() => setDrawerOpen(true)}
          aria-label={`Open cart, ${count} items`}
        >
          CART <span className="vs-cartcount">{count}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (pin +=170%) */}
        <section id="hero" className="vs-hero" data-tour="Ignition">
          <ScrollFrames
            frames={frames}
            alt="A gadget rotating on a dark turntable, cyan edge light tracing it; macro push across circuit detail"
            pinDistance="+=170%"
          >
          <span className="vs-corner tl" aria-hidden="true" />
          <span className="vs-corner tr" aria-hidden="true" />
          <span className="vs-corner bl" aria-hidden="true" />
          <span className="vs-corner br" aria-hidden="true" />
          <p className="vs-hero-readout">{content.hero.readout}</p>
          <div className="vs-hero-copy">
            <p className="vs-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="vs-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="vs-hero-sub">{content.hero.sub}</p>
            <div className="vs-hero-ctas">
              <a className="vs-btn" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="vs-btn is-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
            </div>
          </div>
          <p className="vs-scrollhint" aria-hidden="true">{content.hero.scrollHint}</p>
          </ScrollFrames>
        </section>

        {/* BLUEPRINT SCAN — product lineup */}
        <section id="products" className="vs-scan" data-tour="The Lineup">
          <div className="vs-wrap">
            <p className="vs-eyebrow vs-rv">{content.scan.eyebrow}</p>
            <h2 className="vs-h2 vs-rv">{content.scan.title}</h2>
            <p className="vs-body vs-rv">{content.scan.body}</p>
            <span className="vs-rule" aria-hidden="true" />
          </div>
          <div className="vs-pinwrap">
            <div className="vs-stage">
              <div className="vs-trackwrap">
                <div className="vs-track">
                  {content.products.map((p, i) => (
                    <ScanCell
                      key={p.tag}
                      p={p}
                      index={i}
                      image={CELL_IMAGES[i]}
                      added={addedIdx === i}
                      onAdd={addToCart}
                    />
                  ))}
                </div>
                <div className="vs-scanline" aria-hidden="true">
                  <span className="vs-scanline-tick top" />
                  <span className="vs-scanline-tick bottom" />
                </div>
              </div>
            <div className="vs-readout" aria-live="polite">
              <div className="vs-readout-meta">
                <span>READOUT</span>
                <span>UNIT <span className="vs-scan-unit">01/04</span></span>
                <span>SCAN <span className="vs-scan-pct">000</span>%</span>
              </div>
              {content.products.map((p, i) => (
                <div key={p.tag} className="vs-readout-block">
                  <p className="vs-readout-tag">{p.tag}</p>
                  <p className="vs-readout-name">{productName(i, p.name)}</p>
                  <dl className="vs-readout-specs">
                    {p.specs.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="vs-readout-price">{price(p.price)}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* SPEC COMPARISON */}
        <section id="specs" className="vs-compare" data-tour="Spec Matrix">
          <div className="vs-wrap">
            <p className="vs-eyebrow vs-rv">{content.compare.eyebrow}</p>
            <h2 className="vs-h2 vs-rv">{content.compare.title}</h2>
            <span className="vs-rule" aria-hidden="true" />
            <div className="vs-tablewrap vs-rv">
              <table className="vs-table">
                <caption className="vs-table-cap">{content.compare.note}</caption>
                <thead>
                  <tr>
                    <th scope="col">SPEC</th>
                    {content.products.map((p, i) => (
                      <th key={p.tag} scope="col">
                        <span className="vs-th-tag">{p.tag}</span>
                        <span className="vs-th-name">{productName(i, p.name)}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.compare.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WARRANTY / SUPPORT */}
        <section id="support" className="vs-support" data-tour="Support">
          <div className="vs-wrap">
            <p className="vs-eyebrow vs-rv">{content.support.eyebrow}</p>
            <h2 className="vs-h2 vs-rv">{content.support.title}</h2>
            <span className="vs-rule" aria-hidden="true" />
            <div className="vs-support-grid vs-stagger">
              {content.support.items.map((s, i) => (
                <div key={s.title} className="vs-support-card">
                  <p className="vs-support-num">0{i + 1}</p>
                  <h3 className="vs-h3">{s.title}</h3>
                  <p className="vs-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="vs-footer">
        <div className="vs-wrap vs-footer-grid">
          <div>
            <p className="vs-wordmark">{name}</p>
            <p className="vs-footer-line">{content.footer.line}</p>
          </div>
          <address className="vs-footer-contact">
            <a href={`mailto:${email}`}>{email}</a>
            <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
            <span>{content.contact.address}</span>
          </address>
        </div>
        <div className="vs-wrap">
          <p className="vs-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      <CartDrawer
        open={drawerOpen}
        items={cart}
        onClose={() => setDrawerOpen(false)}
        onInc={(i) => changeQty(i, 1)}
        onDec={(i) => changeQty(i, -1)}
        onRemove={removeItem}
      />
    </div>
  );
}
