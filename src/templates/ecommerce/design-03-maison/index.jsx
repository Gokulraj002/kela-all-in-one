import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import product1Img from './assets/product-1.webp';
import product2Img from './assets/product-2.webp';
import product3Img from './assets/product-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72-frame scrub sequence replaces the autoplay loop. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-maison';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Manrope:wght@300;400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Real spaces sit between the word masks so the line reads (and wraps) as
   text; screen readers get the plain sentence from the visually-hidden copy. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`me-wm ${className}`}>
      <span className="me-sr">{text}</span>
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

/* Editorial spreads for the Veil Unveiling flow.
   spread 0 — single: silk drape (product-1.jpg) → Nuit Silk Gown
   spread 1 — diptych: watch macro + clutch (product-2/3.jpg) → Héritage + Caviar
   spread 2 — single: parfum still life (detail.jpg) → Ambre Parfum */
const SPREADS = [
  {
    key: 'gown',
    eyebrow: 'The Collection — I',
    caption: 'Revealed first, because everything else is measured against it.',
    images: [
      { k: 'product-0', src: product1Img, alt: 'Dark champagne silk draping over a gown form on a black pedestal, champagne rim light' },
    ],
    products: [0],
  },
  {
    key: 'instruments',
    eyebrow: 'The Collection — II',
    caption: 'Instruments of the evening, unveiled as a pair.',
    images: [
      { k: 'product-1', src: product2Img, alt: 'Extreme macro of a luxury watch dial, champagne indices on smoked glass' },
      { k: 'product-2', src: product3Img, alt: 'Black caviar-grain leather clutch with champagne clasp on dark silk' },
    ],
    products: [1, 2],
  },
  {
    key: 'scent',
    eyebrow: 'The Collection — III',
    caption: 'The last thing they remember.',
    images: [
      { k: 'detail', src: detailImg, alt: 'Faceted amber parfum bottle on black marble beside a dark silk ribbon, single light ray' },
    ],
    products: [3],
  },
];

function SpreadCard({ index, onAdd }) {
  const { productName, price } = useCustom();
  const p = content.products[index];
  return (
    <div className="me-piece">
      <p className="me-piece-note">{p.note}</p>
      <h3 className="me-piece-name">{productName(index, p.name)}</h3>
      <p className="me-piece-desc">{p.desc}</p>
      <p className="me-piece-price">{price(p.price)}</p>
      <button type="button" className="me-ghost" onClick={() => onAdd(index)}>
        Add to Private List
      </button>
    </div>
  );
}

export default function Design03Maison() {
  const { brand, contact, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  /* Private client list — the maison's demo cart. */
  const [list, setList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addToList = (i) => {
    setList((prev) => {
      const found = prev.find((it) => it.i === i);
      if (found) return prev.map((it) => (it.i === i ? { ...it, qty: it.qty + 1 } : it));
      return [...prev, { i, qty: 1 }];
    });
    setDrawerOpen(true);
  };
  const removeFromList = (i) => setList((prev) => prev.filter((it) => it.i !== i));
  const count = useMemo(() => list.reduce((n, it) => n + it.qty, 0), [list]);
  const total = useMemo(
    () => list.reduce((n, it) => n + content.products[it.i].price * it.qty, 0),
    [list]
  );

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

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

      /* Hero entrance: letterbox bars breathe open, masked word-rise headline,
         then the quiet copy. Total <= 2.4s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.me-nav', { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.2)
        .fromTo(
          '.me-hero .me-bar',
          { scaleY: 0 },
          { scaleY: 1, duration: 1.6, ease: 'power4.inOut' },
          0
        )
        .fromTo(
          '.me-hero-title .wi',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.25, ease: 'power4.out', stagger: 0.1 },
          0.35
        )
        .fromTo(
          '.me-hero-eyebrow, .me-hero-sub',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.14 },
          0.9
        )
        .fromTo(
          '.me-hero-ctas, .me-hero-hint',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1.2
        );

      /* Silent reveals for the editorial sections. */
      gsap.utils.toArray('.me-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      /* Champagne hairlines draw on in the static sections. */
      gsap.utils.toArray('.me-draw').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      const mm = gsap.matchMedia();

      /* VEIL UNVEILING — pinned full-bleed, one spread per third of the pin.
         A dark scrim lifts via clip-path inset() scrub; a champagne hairline
         draws on; the letterbox bars breathe in/out at each crossing. */
      mm.add('(min-width: 1024px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.me-veil-pin');
        if (!pin) return;
        const spreads = gsap.utils.toArray('.me-spread', pin);
        const bars = pin.querySelectorAll('.me-veil-bar');
        const vtl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          /* Spreads are stacked layers that cross-fade: hide the faded ones
             from assistive tech and the tab order. Synced on every render of
             the scrubbed timeline (not on scroll — the scrub lags behind). */
          onUpdate: () => syncHidden(),
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: () => `+=${pin.offsetHeight * 3}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => syncHidden(),
          },
        });
        function syncHidden() {
          spreads.forEach((sp) => {
            const off = Number(gsap.getProperty(sp, 'opacity')) < 0.5;
            if (sp.inert !== off) {
              sp.inert = off;
              sp.setAttribute('aria-hidden', off ? 'true' : 'false');
            }
          });
        }
        spreads.forEach((sp, i) => {
          const t = i;
          const scrim = sp.querySelector('.me-veil-scrim');
          const inner = sp.querySelectorAll('.me-spread-inner > *');
          const line = sp.querySelector('.me-hairline');
          const media = sp.querySelector('.me-spread-media');
          /* The veil lifts upward (transform only — no clip-path repaint).
             The first veil lifts while the section scrolls in (below), so
             the pinned stage never opens on an empty black screen; later
             veils start lifting during the cross-fade into their spread. */
          if (i > 0) vtl.fromTo(scrim, { scaleY: 1 }, { scaleY: 0, duration: 0.42 }, t - 0.1);
          if (media) vtl.fromTo(media, { scale: 1.04 }, { scale: 1.13, duration: 1, ease: 'none' }, t);
          const lead = i === 0 ? 0 : 0.12;
          if (line) vtl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, t + lead);
          if (inner.length)
            vtl.fromTo(
              inner,
              { opacity: 0, y: 34 },
              { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
              t + lead + 0.02
            );
          if (i < spreads.length - 1) {
            vtl.to(sp, { opacity: 0, duration: 0.14, ease: 'power1.in' }, t + 0.86);
            vtl.fromTo(
              spreads[i + 1],
              { opacity: 0 },
              { opacity: 1, duration: 0.14, ease: 'power1.out' },
              t + 0.86
            );
          }
        });
        /* First veil: lifts as the stage scrolls up into view. */
        const firstScrim = spreads[0] && spreads[0].querySelector('.me-veil-scrim');
        if (firstScrim) {
          gsap.fromTo(
            firstScrim,
            { scaleY: 1 },
            {
              scaleY: 0,
              ease: 'power2.inOut',
              scrollTrigger: { trigger: pin, scroller: sc, start: 'top 85%', end: 'top 10%', scrub: 0.6 },
            }
          );
        }
        /* Letterbox breathe at the two crossings. */
        vtl
          .to(bars, { scaleY: 2.4, duration: 0.12 }, 0.93)
          .to(bars, { scaleY: 1, duration: 0.2 }, 1.14)
          .to(bars, { scaleY: 2.4, duration: 0.12 }, 1.93)
          .to(bars, { scaleY: 1, duration: 0.2 }, 2.14);
        syncHidden();
        return () => {
          spreads.forEach((sp) => {
            sp.inert = false;
            sp.removeAttribute('aria-hidden');
          });
        };
      });

      /* Mobile: stacked spreads, the scrim simply fades away. */
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray('.me-spread', rootRef.current).forEach((sp) => {
          const scrim = sp.querySelector('.me-veil-scrim');
          if (scrim) {
            gsap.fromTo(
              scrim,
              { opacity: 1 },
              {
                opacity: 0,
                duration: 1.4,
                ease: 'power2.out',
                scrollTrigger: { trigger: sp, scroller: sc, start: 'top 72%', once: true },
              }
            );
          }
          const inner = sp.querySelector('.me-spread-inner');
          if (inner) {
            gsap.fromTo(
              inner,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: sp, scroller: sc, start: 'top 72%', once: true },
              }
            );
          }
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-03-maison${reduced ? ' is-static' : ''}`}>
      {/* ---------- nav ---------- */}
      <header className="me-nav">
        <a className="me-wordmark" href="#hero">
          {name}
        </a>
        <nav className="me-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="me-list-btn"
          onClick={() => setDrawerOpen(true)}
          aria-label={`Open your private list, ${count} items`}
        >
          Private List
          <span className="me-list-count" aria-hidden="true">
            {count}
          </span>
        </button>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section id="hero" className="me-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Dark silk slowly draping over a luxury object in near darkness, champagne rim light breathing across the fabric"
            pinDistance="+=170%"
            stageHeight="var(--tpl-vh, 100svh)"
          >
            <span className="me-bar me-bar-top" aria-hidden="true" />
            <span className="me-bar me-bar-bottom" aria-hidden="true" />
            <div className="me-hero-copy">
            <p className="me-eyebrow me-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="me-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="me-hero-sub">{content.hero.sub}</p>
            <div className="me-hero-ctas">
              <a className="me-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <a className="me-textlink" href={content.hero.ctaSecondaryHref}>
                {content.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <p className="me-hero-hint">{content.hero.hint}</p>
          </ScrollFrames>
        </section>

        {/* ---------- veil unveiling ---------- */}
        <section id="products" className="me-veil" data-tour="The Collection" aria-label="The Collection">
          <div className="me-veil-pin">
            {SPREADS.map((sp, si) => (
              <article className={`me-spread me-spread-${si}`} key={sp.key} aria-label={sp.eyebrow}>
                <div className={`me-spread-media${sp.images.length > 1 ? ' is-duo' : ''}`}>
                  {sp.images.map((im) => (
                    <Img key={im.k} k={im.k} src={im.src} alt={im.alt} className="me-spread-img" />
                  ))}
                </div>
                <div className="me-veil-scrim" aria-hidden="true" />
                <div className="me-spread-inner">
                  <p className="me-eyebrow">{sp.eyebrow}</p>
                  <span className="me-hairline" aria-hidden="true" />
                  <div className="me-pieces">
                    {sp.products.map((pi) => (
                      <SpreadCard key={pi} index={pi} onAdd={addToList} />
                    ))}
                  </div>
                  <p className="me-spread-caption">{sp.caption}</p>
                </div>
              </article>
            ))}
            <span className="me-veil-bar me-veil-bar-top" aria-hidden="true" />
            <span className="me-veil-bar me-veil-bar-bottom" aria-hidden="true" />
          </div>
        </section>

        {/* ---------- atelier story ---------- */}
        <section id="story" className="me-story me-section" data-tour="Atelier">
          <div className="me-wrap">
            <p className="me-eyebrow me-rv">{content.story.eyebrow}</p>
            <h2 className="me-h2 me-rv">
              <em>An atelier,</em> not a store.
            </h2>
            <span className="me-draw" aria-hidden="true" />
            <div className="me-story-grid">
              <div className="me-story-text">
                {content.story.body.map((p, i) => (
                  <p className="me-body me-rv" key={i}>
                    {p}
                  </p>
                ))}
                <blockquote className="me-quote me-rv">
                  <p>{content.story.quote}</p>
                  <cite>{content.story.quoteBy}</cite>
                </blockquote>
              </div>
              <figure className="me-story-fig me-rv">
                <span className="me-frame">
                  <Img
                    k="detail"
                    src={detailImg}
                    alt="Ambre Parfum still life — faceted amber bottle on black marble at the atelier table, midnight"
                  />
                </span>
                <figcaption>{content.story.figureCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- concierge ---------- */}
        <section id="contact" className="me-concierge me-section" data-tour="Concierge">
          <div className="me-wrap me-center">
            <p className="me-eyebrow me-rv">{content.contact.eyebrow}</p>
            <h2 className="me-h2 me-rv">
              <em>At your service,</em> privately.
            </h2>
            <span className="me-draw" aria-hidden="true" />
            <p className="me-body me-rv me-lede">{content.contact.body}</p>
          </div>
          <div className="me-wrap">
            <div className="me-promise">
              {content.promise.map((pr) => (
                <div className="me-promise-item me-rv" key={pr.title}>
                  <h3>{pr.title}</h3>
                  <p>{pr.text}</p>
                </div>
              ))}
            </div>
            <div className="me-contact-grid">
              <address className="me-address me-rv">
                {content.contact.address}
                <br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <div className="me-hours me-rv">
                <p>{content.contact.hours}</p>
                <a className="me-cta" href={`mailto:${email}`}>
                  {content.contact.cta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="me-footer">
        <p className="me-footer-word">{name}</p>
        <p className="me-footer-line">{content.footer.line}</p>
        <p className="me-colophon">{content.footer.colophon}</p>
      </footer>

      {/* ---------- private client list (demo cart) ---------- */}
      <div className={`me-scrim2${drawerOpen ? ' is-open' : ''}`} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside
        className={`me-drawer${drawerOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your private list"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className="me-drawer-head">
          <div>
            <p className="me-eyebrow">{name}</p>
            <h2 className="me-drawer-title">Private List</h2>
          </div>
          <button type="button" className="me-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close private list">
            ×
          </button>
        </div>
        {list.length === 0 ? (
          <p className="me-drawer-empty">
            Your list is empty. The collection is unveiled above — add a piece when it speaks to you.
          </p>
        ) : (
          <>
            <ul className="me-drawer-items">
              {list.map((it) => {
                const p = content.products[it.i];
                return (
                  <li className="me-drawer-item" key={it.i}>
                    <div>
                      <p className="me-drawer-name">{p.name}</p>
                      <p className="me-drawer-meta">
                        Qty {it.qty} · {price(p.price * it.qty)}
                      </p>
                    </div>
                    <button type="button" className="me-drawer-remove" onClick={() => removeFromList(it.i)} aria-label={`Remove ${p.name} from your list`}>
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="me-drawer-foot">
              <p className="me-drawer-total">
                <span>Total</span>
                <span>{price(total)}</span>
              </p>
              <button type="button" className="me-cta me-drawer-cta" onClick={() => setDrawerOpen(false)}>
                Request private viewing
              </button>
              <p className="me-drawer-note">Demonstration list — no checkout. The concierge confirms everything by hand.</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
