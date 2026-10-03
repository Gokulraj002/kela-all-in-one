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

/* Scroll-driven hero frame sequence (72 frames). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-flagship';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Real spaces sit between the word masks so the line reads (and wraps) as
   text; screen readers get the plain sentence from the visually-hidden copy. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`fl-wm ${className}`}>
      <span className="fl-sr">{text}</span>
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

/* The four pedestals of the gallery walk. */
const STATIONS = [
  {
    image: product1Img,
    key: 'product-0',
    alt: 'Sculpted cognac-leather handbag on a round limestone pedestal under a museum spotlight',
  },
  {
    image: product2Img,
    key: 'product-1',
    alt: 'Silk twill scarf in bronze and ivory draped in soft folds, museum product photography',
  },
  {
    image: product3Img,
    key: 'product-2',
    alt: 'Hand-thrown stoneware vessel with a crackle glaze, extreme macro, on a stone pedestal',
  },
  {
    image: heroImg,
    key: 'hero',
    alt: 'Folded bronze cashmere throw on a limestone pedestal in a sunlit gallery',
  },
];

function Station({ index, onAdd }) {
  const { productName, price, img } = useCustom();
  const p = content.products[index];
  const s = STATIONS[index];
  return (
    <article className="fl-station" aria-label={`Piece ${p.no} — ${p.name}`}>
      <div className="fl-pedestal">
        <Img k={s.key} src={img(s.key, s.image)} alt={s.alt} />
      </div>
      <div className="fl-plate">
        <p className="fl-no">Nº {p.no}</p>
        <h3 className="fl-pname">{productName(index, p.name)}</h3>
        <p className="fl-pdetail">{p.detail}</p>
        <p className="fl-pdesc">{p.desc}</p>
        <div className="fl-plate-row">
          <span className="fl-pprice">{price(p.price)}</span>
          <button type="button" className="fl-add" onClick={() => onAdd(index)}>
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ open, lines, onClose, onRemove }) {
  const { productName, price } = useCustom();
  const closeRef = useRef(null);
  const subtotal = lines.reduce((sum, l) => sum + content.products[l.index].price * l.qty, 0);

  useEffect(() => {
    if (open && closeRef.current) closeRef.current.focus();
  }, [open ]);

  return (
    <>
      <div
        className={`fl-veil${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fl-cart${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!open}
      >
        <div className="fl-cart-head">
          <p className="fl-eyebrow">Your bag</p>
          <button type="button" ref={closeRef} className="fl-cart-close" onClick={onClose} aria-label="Close bag">
            Close
          </button>
        </div>
        {lines.length === 0 ? (
          <p className="fl-cart-empty">Your bag is empty. The gallery awaits.</p>
        ) : (
          <>
            <ul className="fl-cart-lines">
              {lines.map((l) => {
                const p = content.products[l.index];
                return (
                  <li key={l.index} className="fl-cart-line">
                    <div>
                      <p className="fl-cart-no">Nº {p.no}</p>
                      <p className="fl-cart-name">{productName(l.index, p.name)}</p>
                      <p className="fl-cart-qty">Qty {l.qty}</p>
                    </div>
                    <div className="fl-cart-right">
                      <p className="fl-cart-price">{price(p.price * l.qty)}</p>
                      <button
                        type="button"
                        className="fl-cart-remove"
                        onClick={() => onRemove(l.index)}
                        aria-label={`Remove ${p.name} from bag`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="fl-cart-foot">
              <div className="fl-cart-total">
                <span>Subtotal</span>
                <span>{price(subtotal)}</span>
              </div>
              <p className="fl-cart-note">Demo bag — checkout isn&apos;t wired up.</p>
              <button type="button" className="fl-btn fl-cart-cta" disabled>
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default function Design01Flagship() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  const [bag, setBag] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const addToBag = (i) => {
    setBag((b) => [...b, i]);
    setCartOpen(true);
  };
  const removeLine = (i) => setBag((b) => b.filter((x) => x !== i));
  const lines = content.products
    .map((p, i) => ({ index: i, qty: bag.filter((x) => x === i).length }))
    .filter((l) => l.qty > 0);

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
      if (reduced) return;

      /* Hero entrance: masked word-rise headline, then the quiet details. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.fl-hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
        .fromTo(
          '.fl-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.07 },
          0.35
        )
        .fromTo(
          '.fl-hero-sub, .fl-hero-cta, .fl-hero-scroll',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.95
        );

      /* The pinned ScrollFrames hero scrubs its own frames; no parallax needed. */

      /* Long, unhurried reveals. */
      gsap.utils.toArray('.fl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      /* Hairline rules draw themselves. */
      gsap.utils.toArray('.fl-rule').forEach((rule) => {
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

      /* GALLERY WALK — the pinned pedestal walk (MOTION.md §01).
         The wall scrubs horizontally, pausing at each pedestal under the
         center spotlight while its museum label plate fades in.
         Desktop only (min-width: 1024px); mobile + reduced-motion get the
         calm stacked walk rendered below. */
      const pin = rootRef.current && rootRef.current.querySelector('.fl-walk-pin');
      if (pin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const wall = pin.querySelector('.fl-wall');
          const stations = gsap.utils.toArray('.fl-station', pin);
          const spot = pin.querySelector('.fl-spot');
          const counter = pin.querySelector('.fl-count-num');
          if (!wall || stations.length === 0) return undefined;

          gsap.set(pin.querySelectorAll('.fl-plate'), { opacity: 0, y: 24 });
          const offsetFor = (i) => {
            const st = stations[i];
            return st.offsetLeft - (pin.clientWidth - st.offsetWidth) / 2;
          };

          /* Counter follows the playhead in BOTH directions (call() fires the
             station's own number when scrubbing backwards past it). */
          let shown = -1;
          const syncCounter = () => {
            if (!counter) return;
            const t = walk.time();
            let idx = 0;
            stations.forEach((_, i) => {
              const at = walk.labels[`st${i}`];
              if (at !== undefined && t >= at) idx = i;
            });
            if (idx !== shown) {
              shown = idx;
              counter.textContent = content.products[idx].no;
            }
          };
          const walk = gsap.timeline({
            onUpdate: syncCounter,
            scrollTrigger: {
              trigger: pin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${Math.round(stations.length * 1.35 * pin.offsetHeight)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              /* Refresh after the pinned hero above (its spacer pushes this
                 section down). Any refreshPriority also makes ScrollTrigger
                 sort by document position on every refresh. */
              refreshPriority: -1,
            },
          });

          stations.forEach((st, i) => {
            const plate = st.querySelector('.fl-plate');
            if (i === 0) {
              walk.addLabel('st0', 0);
              walk.fromTo(
                plate,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                0.15
              );
            } else {
              const prevPlate = stations[i - 1].querySelector('.fl-plate');
              walk.to(prevPlate, { opacity: 0, y: 12, duration: 0.35, ease: 'power2.in' }, '>');
              walk.to(wall, { x: () => -offsetFor(i), duration: 1.15, ease: 'power2.inOut' }, '<+0.1');
              walk.addLabel(`st${i}`, '<+0.95');
              walk.fromTo(
                plate,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
                '<+1.5'
              );
            }
            /* Hold — the wall rests under the spotlight, the plate legible. */
            walk.to({}, { duration: 1.05 });
          });

          /* The spotlight breathes, quietly. */
          if (spot) {
            gsap.to(spot, { opacity: 0.75, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          }
          return undefined;
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const walkStations = (keyPrefix) =>
    content.products.map((p, i) => <Station key={`${keyPrefix}-${i}`} index={i} onAdd={addToBag} />);

  return (
    <div ref={rootRef} className="tpl-design-01-flagship">
      <header className="fl-nav">
        <a className="fl-wordmark" href="#hero">{name}</a>
        <nav className="fl-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="fl-bag"
          onClick={() => setCartOpen(true)}
          aria-label={`Open shopping bag, ${bag.length} item${bag.length === 1 ? '' : 's'}`}
        >
          Bag
          <span className="fl-bag-count" aria-hidden="true">{bag.length}</span>
        </button>
      </header>

      <main>
        {/* HERO — scroll-scrubbed frame sequence replaces the autoplay loop */}
        <section id="hero" className="fl-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Slow dolly-in on a cashmere throw resting on a stone pedestal in a sunlit gallery, a silk cloth drifting past"
            pinDistance="+=170%"
            stageHeight="var(--tpl-vh, 100svh)"
          >
            <div className="fl-hero-scrim" aria-hidden="true" />
            <div className="fl-hero-copy">
              <p className="fl-eyebrow fl-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="fl-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="fl-hero-sub">{content.hero.sub}</p>
              <a className="fl-btn fl-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <p className="fl-hero-scroll" aria-hidden="true">
              <span>Scroll</span>
            </p>
          </ScrollFrames>
        </section>

        {/* THE LINEUP — gallery walk */}
        <section id="products" className="fl-products" data-tour="The Lineup">
          <div className="fl-wrap fl-walk-head">
            <p className="fl-eyebrow fl-rv">The lineup</p>
            <h2 className="fl-h2 fl-rv">One product per room.</h2>
            <span className="fl-rule" aria-hidden="true" />
            <p className="fl-body fl-rv">
              Walk the gallery wall. Each piece holds under the spotlight
              while its label is read — the way a museum asks you to look.
            </p>
          </div>
          {reduced ? (
            <div className="fl-walk is-static" aria-label="The lineup">
              {walkStations('static')}
            </div>
          ) : (
            <div className="fl-walk">
              <div className="fl-walk-pin">
                <div className="fl-spot" aria-hidden="true" />
                <p className="fl-counter" aria-hidden="true">
                  <span className="fl-count-label">Nº</span>
                  <span className="fl-count-num">01</span>
                  <span className="fl-count-total">/ 04</span>
                </p>
                <div className="fl-wall" aria-label="The lineup">
                  {walkStations('walk')}
                </div>
                <p className="fl-walk-hint" aria-hidden="true">Scroll — the wall moves with you</p>
              </div>
            </div>
          )}
        </section>

        {/* CRAFT */}
        <section id="craft" className="fl-craft" data-tour="Craft">
          <div className="fl-wrap">
            <p className="fl-eyebrow fl-rv">{content.craft.eyebrow}</p>
            <h2 className="fl-h2 fl-rv">{content.craft.title}</h2>
            <span className="fl-rule" aria-hidden="true" />
            <div className="fl-craft-cols">
              {content.craft.body.map((p, i) => (
                <p className="fl-body fl-rv" key={i}>{p}</p>
              ))}
            </div>
            <figure className="fl-craft-fig fl-rv">
              <Img k="detail" src={img('detail', detailImg)} alt="The packaging ritual — bone gift box, bronze ribbon, tissue paper, wax seal and a blank card on a stone table" />
              <figcaption>Every piece, wrapped by hand</figcaption>
            </figure>
            <ol className="fl-craft-points">
              {content.craft.points.map((pt, i) => (
                <li className="fl-rv" key={pt.title}>
                  <span className="fl-point-no">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{pt.title}</h3>
                    <p>{pt.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SHIPPING & CARE */}
        <section id="care" className="fl-care" data-tour="Shipping & Care">
          <div className="fl-wrap">
            <p className="fl-eyebrow fl-rv">{content.care.eyebrow}</p>
            <h2 className="fl-h2 fl-rv">{content.care.title}</h2>
            <span className="fl-rule" aria-hidden="true" />
            <ul className="fl-care-grid">
              {content.care.items.map((item, i) => (
                <li className="fl-rv" key={item.title}>
                  <span className="fl-point-no">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <div className="fl-visit fl-rv">
              <p className="fl-eyebrow">The flagship</p>
              <address>
                {content.contact.address}
                <br />
                {content.contact.hours}
                <br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
            </div>
          </div>
        </section>
      </main>

      <footer className="fl-footer">
        <p className="fl-footer-name">{name}</p>
        <p className="fl-footer-line">{content.footer.line}</p>
        <p className="fl-colophon">{content.footer.colophon}</p>
      </footer>

      <CartDrawer open={cartOpen} lines={lines} onClose={() => setCartOpen(false)} onRemove={removeLine} />
    </div>
  );
}
