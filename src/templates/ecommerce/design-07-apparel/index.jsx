import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-apparel';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..800;1,6..96,400..800&family=Inter:wght@400;500;600;700&display=swap';

const ASSETS = {
  hero: heroImg,
  'product-0': product1Img,
  'product-1': product2Img,
  'product-2': product3Img,
  detail: detailImg,
};

/* Signature frames — the hero loop as a scroll-driven frame sequence. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Server-safe word-mask headline */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`av-wm ${className}`} aria-label={text}>
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

/* Shoppable tag: pulsing dot + popover product card. */
function ShopTag({ look, tag, tagIdx, openId, onToggle, onAdd }) {
  const { productName, price } = useCustom();
  const product = content.products[tag.product];
  const id = `${look.folio}-${tagIdx}`;
  const open = openId === id;
  return (
    <div className={`av-tag${open ? ' is-open' : ''}`} style={{ left: `${tag.x}%`, top: `${tag.y}%` }}>
      <button
        type="button"
        className="av-tag-dot"
        aria-expanded={open}
        aria-label={`${open ? 'Close' : 'Shop'} ${productName(tag.product, product.name)} — ${price(product.price)}`}
        onClick={() => onToggle(open ? null : id)}
      >
        {open ? '–' : '+'}
      </button>
      {open && (
        <div className="av-tag-card" role="dialog" aria-label={productName(tag.product, product.name)}>
          <p className="av-tag-label">{tag.label}</p>
          <p className="av-tag-name">{productName(tag.product, product.name)}</p>
          <p className="av-tag-price">{price(product.price)}</p>
          <button type="button" className="av-tag-add" onClick={() => onAdd(tag.product)}>
            Add to bag
          </button>
        </div>
      )}
    </div>
  );
}

/* One full-bleed folio page (pinned desktop turn). */
function LookPage({ look, p, img, openId, onToggleTag, onAdd }) {
  return (
    <article className="av-page" data-p={p} aria-label={`Look ${look.folio} — ${look.title}`}>
      <div className="av-page-inner">
        <Img k={look.imgKey} src={img(look.imgKey, ASSETS[look.imgKey])} alt={look.alt} />
      </div>
      <div className="av-page-scrim" aria-hidden="true" />
      <div className="av-edge" aria-hidden="true" />
      <div className="av-page-copy">
        <p className="av-folio" aria-hidden="true">{look.folio}</p>
        <h3 className="av-page-title">{look.title}</h3>
        <p className="av-page-quote">{look.quote}</p>
        <p className="av-page-cite">{look.cite}</p>
      </div>
      {look.tags.map((t, ti) => (
        <ShopTag key={ti} look={look} tag={t} tagIdx={ti} openId={openId} onToggle={onToggleTag} onAdd={onAdd} />
      ))}
    </article>
  );
}

/* Stacked fallback (mobile + reduced motion): looks as editorial cards. */
function LookStack({ img, openId, onToggleTag, onAdd }) {
  return (
    <div className="av-wrap av-stack">
      {content.looks.map((look) => (
        <article className="av-stack-page" key={look.folio} aria-label={`Look ${look.folio} — ${look.title}`}>
          <div className="av-stack-media">
            <Img k={look.imgKey} src={img(look.imgKey, ASSETS[look.imgKey])} alt={look.alt} />
            {look.tags.map((t, ti) => (
              <ShopTag key={ti} look={look} tag={t} tagIdx={ti} openId={openId} onToggle={onToggleTag} onAdd={onAdd} />
            ))}
          </div>
          <div className="av-stack-copy">
            <p className="av-folio" aria-hidden="true">{look.folio}</p>
            <h3 className="av-page-title">{look.title}</h3>
            <p className="av-page-quote">{look.quote}</p>
            <p className="av-page-cite">{look.cite}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProductCard({ product, index, onAdd, added }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="av-card av-rv">
      <div className="av-card-media">
        {product.badge && <span className="av-card-badge">{product.badge}</span>}
        <Img k={product.imgKey} src={img(product.imgKey, ASSETS[product.imgKey])} alt={product.alt} />
      </div>
      <p className="av-card-no">Nº {String(index + 1).padStart(2, '0')}</p>
      <h3 className="av-card-name">{productName(index, product.name)}</h3>
      <p className="av-card-fabric">{product.fabric}</p>
      <p className="av-card-desc">{product.desc}</p>
      <div className="av-card-foot">
        <span className="av-card-price">{price(product.price)}</span>
        <button type="button" className={`av-add${added ? ' is-added' : ''}`} onClick={() => onAdd(index)}>
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </article>
  );
}

function CartDrawer({ open, items, onClose, onRemove }) {
  const { productName, price, img } = useCustom();
  const total = items.reduce((s, it) => s + content.products[it.i].price * it.qty, 0);
  const count = items.reduce((s, it) => s + it.qty, 0);

  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);

  return (
    <>
      <div className={`av-scrim${open ? ' is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`av-drawer${open ? ' is-open' : ''}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="av-drawer-head">
          <h2 className="av-drawer-title">Your bag{count > 0 ? ` (${count})` : ''}</h2>
          <button type="button" className="av-drawer-close" onClick={onClose} aria-label="Close bag">
            ×
          </button>
        </div>
        <div className="av-drawer-body">
          {items.length === 0 ? (
            <p className="av-drawer-empty">Your bag is empty — the folio awaits.</p>
          ) : (
            items.map((it) => {
              const p = content.products[it.i];
              return (
                <div className="av-cart-item" key={it.i}>
                  <div className="av-cart-thumb">
                    <Img k={p.imgKey} src={img(p.imgKey, ASSETS[p.imgKey])} alt={p.alt} />
                  </div>
                  <div>
                    <p className="av-cart-name">{productName(it.i, p.name)}</p>
                    <p className="av-cart-qty">Qty {it.qty}</p>
                    <button type="button" className="av-cart-remove" onClick={() => onRemove(it.i)}>
                      Remove
                    </button>
                  </div>
                  <span className="av-cart-price">{price(p.price * it.qty)}</span>
                </div>
              );
            })
          )}
        </div>
        {items.length > 0 && (
          <div className="av-drawer-foot">
            <div className="av-total">
              <span>Total</span>
              <strong>{price(total)}</strong>
            </div>
            <button type="button" className="av-checkout">
              Checkout
            </button>
            <p className="av-demo-note">Demo checkout — no payment is taken.</p>
          </div>
        )}
      </aside>
    </>
  );
}

export default function Design07Apparel() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  const [wide, setWide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openTag, setOpenTag] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [folio, setFolio] = useState(0);
  const folioRef = useRef(0);

  const pinned = wide && !reduced;
  const bagCount = cart.reduce((s, it) => s + it.qty, 0);

  /* Fonts (once, never removed). */
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Desktop gate for the pinned page turn. */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const fn = () => setWide(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const addToBag = (i) => {
    setCart((c) => {
      const ex = c.find((it) => it.i === i);
      if (ex) return c.map((it) => (it.i === i ? { ...it, qty: it.qty + 1 } : it));
      return [...c, { i, qty: 1 }];
    });
    setAddedId(i);
    window.setTimeout(() => setAddedId((cur) => (cur === i ? null : cur)), 1400);
  };
  const removeFromBag = (i) => setCart((c) => c.filter((it) => it.i !== i));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();

      /* Nav solidifies once the hero scrolls under. */
      ScrollTrigger.create({
        trigger: '.av-hero',
        scroller: sc,
        start: 'top -64px',
        onEnter: () => setScrolled(true),
        onLeaveBack: () => setScrolled(false),
      });

      if (reduced) return;

      /* Hero entrance: masked word-rise + copy drift. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.av-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07, ease: 'power4.out' }, 0.15)
        .fromTo('.av-hero-eyebrow, .av-hero-sub, .av-hero-ctas', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.6);

      /* No canvas drift: the pinned frame-scrub carries the hero motion (a
         drift inside the pinned stage opened a blank band above the frames). */

      /* Editorial reveals. */
      gsap.utils.toArray('.av-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true } }
        );
      });
      gsap.utils.toArray('.av-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.inOut', scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true } }
        );
      });

      /* ── Lookbook Turn: pinned, scrubbed page wipe with skewY + edge shadow.
         Mobile/reduced render the stacked fallback instead (see `pinned`). ── */
      if (!pinned) return;
      const pin = rootRef.current && rootRef.current.querySelector('.av-turn-pin');
      const pages = pin ? Array.from(pin.querySelectorAll('.av-page')) : [];
      if (!pin || pages.length < 2) return;

      gsap.set(pages[0], { clipPath: 'inset(0% 0% 0% 0%)' });

      const turn = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pin,
          scroller: sc,
          start: 'top top',
          end: () => `+=${(pages.length - 1) * 120}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(pages.length - 1, Math.floor(self.progress * pages.length));
            if (folioRef.current !== idx) {
              folioRef.current = idx;
              setFolio(idx);
            }
          },
        },
      });

      /* Page 0 copy + tags land with the pin. */
      turn
        .fromTo('.av-page[data-p="0"] .av-page-copy > *', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, 0.02)
        .fromTo('.av-page[data-p="0"] .av-tag', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2.2)' }, 0.25);

      pages.forEach((page, i) => {
        if (i === 0) return;
        const pos = i - 1;
        const inner = page.querySelector('.av-page-inner');
        const edge = page.querySelector('.av-edge');
        const copyKids = page.querySelectorAll('.av-page-copy > *');
        const tags = page.querySelectorAll('.av-tag');
        /* The turn: wipe from the right with a skew, edge shadow trailing. */
        turn.fromTo(page, { clipPath: 'inset(0% 0% 0% 100%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, pos);
        if (inner) turn.fromTo(inner, { skewY: 6, scale: 1.07 }, { skewY: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, pos);
        if (edge) turn.fromTo(edge, { opacity: 0.85 }, { opacity: 0, duration: 0.7, ease: 'power2.out' }, pos + 0.15);
        if (copyKids.length)
          turn.fromTo(copyKids, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.09, ease: 'power2.out' }, pos + 0.52);
        /* …then the shoppable tags pop with stagger once the page lands. */
        if (tags.length)
          turn.fromTo(tags, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2.2)' }, pos + 0.64);
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, pinned, scroller, rootRef]);

  const looks = content.looks;
  const s = content.sections;

  return (
    <div ref={rootRef} className="tpl-design-07-apparel">
      <header className={`av-nav${scrolled ? ' is-scrolled' : ''}`}>
        <a className="av-wordmark" href="#hero">
          {name}
          <small>{content.brand.tagline}</small>
        </a>
        <nav className="av-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button type="button" className="av-bag" onClick={() => setDrawerOpen(true)} aria-label={`Open bag, ${bagCount} items`}>
          Bag <span className="av-bag-count">{bagCount}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="av-hero" data-tour="Cover">
          <ScrollFrames
            frames={frames}
            alt="Slow dolly along the atelier garment rack, fabrics swaying in soft window light"
            pinDistance="+=170%"
          >
            <div className="av-hero-scrim" aria-hidden="true" />
            <div className="av-hero-copy">
              <p className="av-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="av-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="av-hero-sub">{content.hero.sub}</p>
              <div className="av-hero-ctas">
                <a className="av-btn" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="av-btn av-btn--ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
              </div>
            </div>
            <span className="av-scroll-hint" aria-hidden="true">Scroll — turn the pages</span>
          </ScrollFrames>
        </section>

        {/* LOOKBOOK */}
        <section id="products" className="av-turn" data-tour="The Lookbook">
          <div className="av-wrap av-turn-intro">
            <p className="av-eyebrow av-rv">Autumn — Winter 2026</p>
            <h2 className="av-h2 av-rv">
              The folio, <em>four looks.</em>
            </h2>
            <p className="av-lede av-rv">
              Turn the pages with your scroll. Every look is shoppable — tap a tag to add the piece to your bag.
            </p>
            <span className="av-rule" aria-hidden="true" />
          </div>

          {pinned ? (
            <div className="av-turn-pin">
              {looks.map((look, i) => (
                <LookPage key={look.folio} look={look} p={i} img={img} openId={openTag} onToggleTag={setOpenTag} onAdd={addToBag} />
              ))}
              <div className="av-folio-count" aria-hidden="true">
                <span className="av-now">{String(folio + 1).padStart(2, '0')}</span>
                <span className="av-of">/ {String(looks.length).padStart(2, '0')}</span>
              </div>
            </div>
          ) : (
            <LookStack img={img} openId={openTag} onToggleTag={setOpenTag} onAdd={addToBag} />
          )}

          {/* THE INDEX — product lineup */}
          <div className="av-wrap av-section av-index">
            <div className="av-index-head">
              <p className="av-eyebrow av-rv" style={{ color: 'var(--brand-on-dark, #c98f8f)' }}>{s.index.eyebrow}</p>
              <h2 className="av-h2 av-rv" style={{ color: 'var(--color-page-text)' }}>
                Four pieces. <em style={{ color: 'var(--brand-on-dark, #c98f8f)' }}>Nothing else on the rail.</em>
              </h2>
              <p className="av-lede av-rv" style={{ color: 'rgba(237,232,223,0.72)' }}>{s.index.body}</p>
            </div>
            <div className="av-index-grid">
              {content.products.map((p, i) => (
                <ProductCard key={p.name} product={p} index={i} onAdd={addToBag} added={addedId === i} />
              ))}
            </div>
          </div>
        </section>

        {/* ATELIER STORY */}
        <section id="story" className="av-section av-story" data-tour="The Atelier">
          <div className="av-wrap av-story-grid">
            <div className="av-story-img av-rv">
              <figure style={{ margin: 0 }}>
                <Img k="hero" src={img('hero', heroImg)} alt="Atelier portrait in soft window light — the house muse in tailored wool" />
                <figcaption>Cut in Kala Ghoda — the house muse</figcaption>
              </figure>
            </div>
            <div className="av-story-body">
              <p className="av-eyebrow av-rv">{s.story.eyebrow}</p>
              <h2 className="av-h2 av-rv">{s.story.title}</h2>
              <span className="av-rule av-rv" aria-hidden="true" />
              {s.story.body.map((p, i) => (
                <p className="av-rv" key={i}>{p}</p>
              ))}
              <blockquote className="av-quote av-rv">
                {s.story.quote}
                <cite>{s.story.cite}</cite>
              </blockquote>
              <div className="av-stats av-rv">
                {s.story.stats.map((st) => (
                  <div key={st.label}>
                    <p className="av-stat-value">{st.value}</p>
                    <p className="av-stat-label">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SIZE & SHIPPING */}
        <section id="craft" className="av-section av-craft" data-tour="Size & Shipping">
          <div className="av-wrap">
            <p className="av-eyebrow av-rv">{s.craft.eyebrow}</p>
            <h2 className="av-h2 av-rv">{s.craft.title}</h2>
            <div className="av-craft-grid">
              <div className="av-rv">
                <h3 className="av-h3">Size guide</h3>
                <p className="av-fit-note">{s.craft.fitNote}</p>
                <table className="av-size-table">
                  <thead>
                    <tr>
                      <th scope="col">Size</th>
                      <th scope="col">Chest</th>
                      <th scope="col">Waist</th>
                      <th scope="col">Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.craft.sizes.map((r) => (
                      <tr key={r.size}>
                        <td>{r.size}</td>
                        <td>{r.chest}″</td>
                        <td>{r.waist}″</td>
                        <td>{r.shoulder}″</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="av-size-unit">All measurements in inches, garment — not body.</p>
              </div>
              <div className="av-rv">
                <h3 className="av-h3">Shipping &amp; promises</h3>
                <ul className="av-ship-list">
                  {s.craft.shipping.map((sh) => (
                    <li key={sh.title}>
                      <h4 className="av-ship-title">{sh.title}</h4>
                      <p className="av-ship-text">{sh.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="av-footer">
        <div className="av-wrap">
          <div className="av-footer-grid">
            <div>
              <p className="av-footer-brand">{name}</p>
              <p className="av-footer-tag">{content.brand.tagline} Eleven tailors, one cutting table, and repairs for life.</p>
            </div>
            <div>
              <p className="av-footer-h">Visit</p>
              <address>
                {content.contact.address}
                <br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
                <br />
                {content.contact.hours}
              </address>
            </div>
            <div>
              <p className="av-footer-h">Folio</p>
              <ul className="av-footer-links">
                {content.nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#hero">Back to the cover</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="av-footer-base">
            <p>{content.footer.line}</p>
            <p>{content.footer.colophon}</p>
          </div>
        </div>
      </footer>

      <CartDrawer open={drawerOpen} items={cart} onClose={() => setDrawerOpen(false)} onRemove={removeFromBag} />
    </div>
  );
}
