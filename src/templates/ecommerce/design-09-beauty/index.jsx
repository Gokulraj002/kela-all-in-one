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

/* Hero scrub sequence: 72 extracted frames, scroll-driven (replaces the looping hero video). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-beauty';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap';

const FALLBACK = {
  hero: heroImg,
  'product-0': product1Img,
  'product-1': product2Img,
  'product-2': product3Img,
  detail: detailImg,
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`pt-wm ${className}`} aria-label={text}>
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

/* The three Formula Dissolve stages: each pairs a packshot with the
   ingredient macro that dissolves into it on scroll. */
const STAGES = [
  {
    product: 0,
    packKey: 'hero',
    macroKey: 'product-1',
    macroClass: 'pt-macro-a',
    packAlt:
      'Rose Renewal Serum — a frosted glass dropper bottle of pale rose serum on blush silk, petals drifting in soft light',
    macroAlt:
      'The serum formula up close — damask rose petals, rosehip berries and golden botanical oil on sand linen',
  },
  {
    product: 1,
    packKey: 'product-0',
    macroKey: 'detail',
    macroClass: 'pt-macro-b',
    packAlt:
      'Cloud Whip Moisturiser — an extreme macro of whipped ivory cream swirled into soft, glossy peaks',
    macroAlt:
      'The moisture layer up close — a golden dewy droplet beading on a blush rose petal',
  },
  {
    product: 2,
    packKey: 'product-2',
    macroKey: 'product-1',
    macroClass: 'pt-macro-c',
    packAlt:
      'The {brand} shelf — frosted glass bottles and ceramic jars in blush and sand tones on travertine stone',
    macroAlt:
      'The cleansing formula up close — golden botanical oil, rose petals and chamomile on sand linen',
  },
];

function ShadeFinder({ shade, setShade }) {
  const active = content.shades[shade];
  return (
    <div className="pt-shades">
      <div className="pt-shade-swatches" role="radiogroup" aria-label="Choose a lip tint shade">
        {content.shades.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="radio"
            aria-checked={shade === i}
            aria-label={s.name}
            className={`pt-swatch${shade === i ? ' is-active' : ''}`}
            style={{ '--sw': s.hex }}
            onClick={() => setShade(i)}
          />
        ))}
      </div>
      <p className="pt-shade-name">{active.name}</p>
      <p className="pt-shade-note">{active.note}</p>
    </div>
  );
}

function CartDrawer({ open, items, onClose, onBrowse }) {
  const { productName, price } = useCustom();
  const subtotal = items.reduce((sum, i) => sum + content.products[i.idx].price * i.qty, 0);
  const count = items.reduce((n, i) => n + i.qty, 0);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`pt-scrim${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`pt-cart${open ? ' is-open' : ''}`}
        aria-label={content.cart.title}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="pt-cart-head">
          <h2 className="pt-cart-title">
            {content.cart.title}
            <span className="pt-cart-n">{count}</span>
          </h2>
          <button type="button" className="pt-cart-close" onClick={onClose} aria-label="Close bag">
            ×
          </button>
        </div>
        {items.length === 0 ? (
          <div className="pt-cart-empty">
            <p>{content.cart.empty}</p>
            <button
              type="button"
              className="pt-btn"
              onClick={() => {
                onClose();
                onBrowse();
              }}
            >
              {content.cart.browse}
            </button>
          </div>
        ) : (
          <>
            <ul className="pt-cart-items">
              {items.map((i) => {
                const p = content.products[i.idx];
                return (
                  <li key={i.key} className="pt-cart-item">
                    <div className="pt-cart-item-info">
                      <p className="pt-cart-item-name">{productName(i.idx, p.name)}</p>
                      {i.shade && <p className="pt-cart-item-shade">{i.shade}</p>}
                      <p className="pt-cart-item-size">{p.size}</p>
                    </div>
                    <p className="pt-cart-item-qty" aria-label={`Quantity ${i.qty}`}>
                      × {i.qty}
                    </p>
                    <p className="pt-cart-item-price">{price(p.price * i.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="pt-cart-foot">
              <div className="pt-cart-total">
                <span>Subtotal</span>
                <strong>{price(subtotal)}</strong>
              </div>
              <button type="button" className="pt-btn pt-cart-checkout">
                {content.cart.checkout}
              </button>
              <p className="pt-cart-demo">{content.cart.demoNote}</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default function Design09Beauty() {
  const { brand, img, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram || content.contact.instagram;

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedKey, setAddedKey] = useState(null);
  const [shade, setShade] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const addTimer = useRef(null);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  const addToCart = (idx, shadeName = null) => {
    const key = shadeName ? `${idx}::${shadeName}` : `${idx}`;
    setCart((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { key, idx, shade: shadeName, qty: 1 }];
    });
    setAddedKey(key);
    window.clearTimeout(addTimer.current);
    addTimer.current = window.setTimeout(() => setAddedKey(null), 1400);
  };

  useEffect(
    () => () => {
      window.clearTimeout(addTimer.current);
    },
    []
  );

  /* Fonts: Cormorant Garamond + Jost, injected once, never removed. */
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

      /* Hero entrance: masked word-rise, soft copy fade, gentle media drift. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.pt-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.07 },
        0.2
      )
        .fromTo(
          '.pt-nav',
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.8, clearProps: 'opacity,transform' },
          0.4
        )
        .fromTo(
          '.pt-hero-eyebrow, .pt-hero-sub, .pt-hero-ctas, .pt-hero-note',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0.7
        )
        .fromTo('.pt-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.5);

      /* Dewy reveals: soft, unhurried. */
      gsap.utils.toArray('.pt-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.pt-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      /* Hairline rules draw softly between sections. */
      gsap.utils.toArray('.pt-rule').forEach((rule) => {
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

      const mm = gsap.matchMedia();

      /* Formula Dissolve — desktop pinned scrub. Three stages; per stage the
         ingredient macro (opacity + scale 1.06→1) cross-dissolves into the
         packshot. Soft, slow, no hard cuts. Transform/opacity only — no
         scrubbed blur filters, so scrubbing stays smooth. */
      mm.add('(min-width: 1024px)', () => {
        const wrap = rootRef.current && rootRef.current.querySelector('.pt-dis-wrap');
        if (!wrap) return undefined;
        const stages = gsap.utils.toArray('.pt-stage', wrap);
        const dots = gsap.utils.toArray('.pt-dot', wrap);
        const dissolve = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: wrap,
            scroller: sc,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(stages.length - 1, Math.floor(self.progress * stages.length));
              dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
            },
          },
        });
        stages.forEach((st, k) => {
          const pos = k;
          const macro = st.querySelector('.pt-macro');
          const pack = st.querySelector('.pt-pack');
          const text = st.querySelector('.pt-stage-text');
          if (k > 0) {
            dissolve.to(stages[k - 1], { autoAlpha: 0, y: -40, duration: 0.18 }, pos);
            dissolve.fromTo(st, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.18 }, pos);
          } else {
            /* Stage 1 must be visible the moment the pin engages (progress 0). */
            dissolve.set(st, { autoAlpha: 1 }, 0);
          }
          const d0 = pos + (k > 0 ? 0.18 : 0.06);
          dissolve.fromTo(
            macro,
            { opacity: 0.92, scale: 1.06 },
            { opacity: 0, scale: 1, duration: 0.56 },
            d0
          );
          dissolve.fromTo(
            pack,
            { opacity: 0.35, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.56 },
            d0
          );
          dissolve.fromTo(text, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.3 }, d0 + 0.08);
          if (k < stages.length - 1) {
            dissolve.to(text, { autoAlpha: 0, y: -30, duration: 0.16 }, pos + 0.84);
          }
        });
        return undefined;
      });

      /* Mobile: each stage's macro gently crossfades as the card scrolls by. */
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.pt-stage', rootRef.current).forEach((st) => {
          const macro = st.querySelector('.pt-macro');
          const pack = st.querySelector('.pt-pack');
          gsap.fromTo(
            macro,
            { opacity: 0.9, scale: 1.06 },
            {
              opacity: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: st, scroller: sc, start: 'top 78%', end: 'top 30%', scrub: 0.6 },
            }
          );
          gsap.fromTo(
            pack,
            { opacity: 0.45 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: st, scroller: sc, start: 'top 78%', end: 'top 30%', scrub: 0.6 },
            }
          );
        });
        return undefined;
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const tint = content.products[3];
  const tintKey = `3::${content.shades[shade].name}`;

  return (
    <div ref={rootRef} className={`tpl-design-09-beauty${reduced ? ' is-reduced' : ''}`}>
      {/* NAV */}
      <header className="pt-nav">
        <a className="pt-wordmark" href="#hero">
          {name}
        </a>
        <nav className="pt-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="pt-bag"
          onClick={() => setCartOpen(true)}
          aria-label={`Open bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
        >
          Bag
          <span className="pt-bag-count" aria-hidden="true">
            {cartCount}
          </span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence replaces the looping hero video */}
        <section id="hero" className="pt-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Extreme macro of pale rose cream swirling as a golden serum drop falls and blooms through it, settling to a glossy sheen"
            pinDistance="+=170%"
          >
            <div className="pt-hero-veil" aria-hidden="true" />
            <div className="pt-hero-copy">
              <p className="pt-eyebrow pt-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="pt-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="pt-hero-sub">{content.hero.sub}</p>
              <div className="pt-hero-ctas">
                <a className="pt-btn" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="pt-btn pt-btn-ghost" href={content.hero.ctaSecondaryHref}>
                  {content.hero.ctaSecondary}
                </a>
              </div>
              <p className="pt-hero-note">{content.hero.note}</p>
            </div>
            <a className="pt-scroll-cue" href="#products" aria-label="Scroll to the formulas">
              <span />
            </a>
          </ScrollFrames>
        </section>

        {/* FORMULA DISSOLVE */}
        <section id="products" className="pt-products" data-tour="The Formulas">
          <div className="pt-wrap pt-sec-head">
            <p className="pt-eyebrow pt-rv">{content.formulasHead.eyebrow}</p>
            <h2 className="pt-h2 pt-rv">{content.formulasHead.title}</h2>
            <span className="pt-rule" aria-hidden="true" />
            <p className="pt-lede pt-rv">{content.formulasHead.intro}</p>
          </div>

          <div className="pt-dis-wrap">
            <div className="pt-dis-pin">
              {STAGES.map((s, k) => {
                const p = content.products[s.product];
                const key = `${s.product}`;
                return (
                  <article key={s.product} className="pt-stage" aria-label={`${p.name} — formula ${k + 1} of 3`}>
                    <div className="pt-stage-visual">
                      <div className="pt-pack">
                        <Img k={s.packKey} src={img(s.packKey, FALLBACK[s.packKey])} alt={s.packAlt.replace('{brand}', name)} />
                      </div>
                      <div className={`pt-macro ${s.macroClass}`} aria-hidden="true">
                        <Img
                          k={s.macroKey}
                          src={img(s.macroKey, FALLBACK[s.macroKey])}
                          alt=""
                        />
                      </div>
                      <p className="pt-stage-num">
                        0{k + 1} <span>/ 03</span>
                      </p>
                      {p.badge && <p className="pt-badge">{p.badge}</p>}
                    </div>
                    <div className="pt-stage-text">
                      <p className="pt-eyebrow">Formula 0{k + 1}</p>
                      <h3 className="pt-stage-name">{productName(s.product, p.name)}</h3>
                      <p className="pt-stage-size">{p.size}</p>
                      <p className="pt-stage-desc">{p.desc}</p>
                      <ul className="pt-formula-chips" aria-label="Key ingredients">
                        {p.formula.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <div className="pt-stage-buy">
                        <p className="pt-price">{price(p.price)}</p>
                        <button
                          type="button"
                          className={`pt-btn${addedKey === key ? ' is-added' : ''}`}
                          onClick={() => addToCart(s.product)}
                        >
                          {addedKey === key ? 'Added to bag' : 'Add to bag'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              <div className="pt-dis-dots" aria-hidden="true">
                {STAGES.map((s, i) => (
                  <span key={s.product} className={`pt-dot${i === 0 ? ' is-active' : ''}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Fourth product: Petal Lip Tint + shade finder */}
          <div className="pt-wrap">
            <aside className="pt-tint pt-rv" aria-label="Petal Lip Tint with shade finder">
              <div className="pt-tint-visual" aria-hidden="true">
                <span className="pt-tint-disc" style={{ '--sw': content.shades[shade].hex }} />
                <span className="pt-tint-halo" />
              </div>
              <div className="pt-tint-text">
                <p className="pt-eyebrow">Formula 04 · {tint.badge}</p>
                <h3 className="pt-stage-name">{productName(3, tint.name)}</h3>
                <p className="pt-stage-size">{tint.size}</p>
                <p className="pt-stage-desc">{tint.desc}</p>
                <ShadeFinder shade={shade} setShade={setShade} />
                <div className="pt-stage-buy">
                  <p className="pt-price">{price(tint.price)}</p>
                  <button
                    type="button"
                    className={`pt-btn${addedKey === tintKey ? ' is-added' : ''}`}
                    onClick={() => addToCart(3, content.shades[shade].name)}
                  >
                    {addedKey === tintKey ? 'Added to bag' : `Add ${content.shades[shade].name} to bag`}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* INGREDIENT STORIES */}
        <section id="story" className="pt-story" data-tour="Ingredients">
          <div className="pt-wrap">
            <div className="pt-story-grid">
              <div className="pt-story-text">
                <p className="pt-eyebrow pt-rv">{content.story.eyebrow}</p>
                <h2 className="pt-h2 pt-rv">{content.story.title}</h2>
                <span className="pt-rule" aria-hidden="true" />
                {content.story.body.map((para, i) => (
                  <p className="pt-body pt-rv" key={i}>
                    {para}
                  </p>
                ))}
              </div>
              <figure className="pt-story-img pt-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Extreme macro of a golden serum droplet beading on a dewy blush rose petal, refracting soft morning light"
                />
                <figcaption>A single drop, at 10× magnification</figcaption>
              </figure>
            </div>
            <ul className="pt-ingredients pt-stagger">
              {content.story.ingredients.map((ing) => (
                <li key={ing.name} className="pt-ingredient">
                  <h3 className="pt-ingredient-name">{ing.name}</h3>
                  <p className="pt-ingredient-note">{ing.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RITUAL GUIDE */}
        <section id="ritual" className="pt-ritual" data-tour="The Ritual">
          <div className="pt-wrap">
            <p className="pt-eyebrow pt-rv">{content.ritual.eyebrow}</p>
            <h2 className="pt-h2 pt-rv">{content.ritual.title}</h2>
            <span className="pt-rule" aria-hidden="true" />
            <ol className="pt-steps pt-stagger">
              {content.ritual.steps.map((s) => (
                <li key={s.num} className="pt-step">
                  <span className="pt-step-num">{s.num}</span>
                  <h3 className="pt-step-title">{s.title}</h3>
                  <p className="pt-step-product">{s.product}</p>
                  <p className="pt-step-text">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="pt-reviews" data-tour="Reviews">
          <div className="pt-wrap">
            <p className="pt-eyebrow pt-rv">{content.reviews.eyebrow}</p>
            <h2 className="pt-h2 pt-rv">{content.reviews.title}</h2>
            <span className="pt-rule" aria-hidden="true" />
            <div className="pt-review-grid pt-stagger">
              {content.reviews.items.map((r) => (
                <figure key={r.name} className="pt-review">
                  <div className="pt-stars" aria-label="Rated 5 out of 5">
                    ★★★★★
                  </div>
                  <blockquote>
                    <p>“{r.quote}”</p>
                  </blockquote>
                  <figcaption>
                    {r.name} <span>· {r.place}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <ul className="pt-assurances pt-rv">
              {content.reviews.assurances.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="pt-footer" data-tour="Contact">
        <div className="pt-wrap">
          <div className="pt-news pt-rv">
            <div>
              <h2 className="pt-h2">{content.newsletter.title}</h2>
              <p className="pt-body">{content.newsletter.sub}</p>
            </div>
            {subscribed ? (
              <p className="pt-news-thanks">{content.newsletter.thanks}</p>
            ) : (
              <form
                className="pt-news-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <label className="pt-news-label" htmlFor="pt-news-email">
                  Email address
                </label>
                <div className="pt-news-row">
                  <input
                    id="pt-news-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="pt-news-input"
                  />
                  <button type="submit" className="pt-btn">
                    {content.newsletter.cta}
                  </button>
                </div>
              </form>
            )}
          </div>
          <span className="pt-rule" aria-hidden="true" />
          <div className="pt-foot-grid">
            <div>
              <p className="pt-wordmark pt-foot-word">{name}</p>
              <p className="pt-foot-tag">{content.brand.tagline}</p>
            </div>
            <address className="pt-foot-contact">
              {content.contact.address}
              <br />
              <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
              <br />
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a
                href={`https://instagram.com/${instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
              >
                {instagram}
              </a>
            </address>
            <nav className="pt-foot-nav" aria-label="Footer">
              {content.nav.map((n) => (
                <a key={n.href} href={n.href}>
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="pt-foot-line">{content.footer.line}</p>
          <p className="pt-foot-colophon">{content.footer.colophon}</p>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onBrowse={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }}
      />
    </div>
  );
}
