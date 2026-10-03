import React, { useEffect, useLayoutEffect } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1 from './assets/look-1.webp';
import look2 from './assets/look-2.webp';
import detailImg from './assets/detail.webp';
import clothImg from './assets/look-3.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const PRODUCT_IMAGES = [look1, look2, heroImg, detailImg];
const PRODUCT_KEYS = ['product-0', 'product-1', 'product-2', 'product-3'];

export default function KoraMinimal() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const custom = useCustom();
  const { brand, img, productName, price, contact } = custom;

  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram || content.contact.instagram;

  const rootStyle = {};
  if (custom.colors.primary) rootStyle['--color-primary'] = custom.colors.primary;
  if (custom.colors.accent) rootStyle['--color-accent'] = custom.colors.accent;
  if (custom.fonts) {
    const [d, b] = custom.fonts.split('|');
    if (d) rootStyle['--font-display'] = `'${d}', sans-serif`;
    if (b) rootStyle['--font-body'] = `'${b}', sans-serif`;
  }

  /* Fonts: Archivo (display) + Inter (body) — one link, never removed. */
  useEffect(() => {
    const id = 'tpl-font-design-02-minimal';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600&family=Inter:wght@300;400;500&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  /* ScrollFrames builds its pin in a child effect, after the triggers below
     were measured. Re-sort + re-measure once everything is mounted and when
     the webfonts land, so triggers sit in document order (viewer + export). */
  useEffect(() => {
    let alive = true;
    const remeasure = () => {
      if (!alive) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const raf = requestAnimationFrame(remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure).catch(() => {});
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);

      /* Hero entrance: the scrub stage fades in, headline follows —
         opacity only. */
      gsap.fromTo(
        q('.kora-hero-scrub'),
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'sine.out' }
      );
      gsap.fromTo(
        q('.kora-hero-copy > *'),
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.8, stagger: 0.15, ease: 'sine.out' }
      );

      /* Reduced motion: no scroll choreography at all — every piece is
         simply there; pleats render open. */
      if (reduced) return;

      /* Scroll reveals: drapeSettle, long — 1.4s sine.out, no stagger.
         Pieces arrive one at a time, centered, never in cascades. */
      q('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'sine.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%' },
          }
        );
      });

      /* hemSway retired with the looping video: the hero is now a
         scroll-scrubbed frame sequence, so motion is reader-driven. */

      const mm = gsap.matchMedia();

      /* pleatUnfold — pinned pleat wall, ≥768px only. Four folded cards
         (scaleY 0.08, origin center) unfold sequentially; the fold line
         stays visible as a hairline seam. The first pleat opens while the
         wall rises into view, so the pinned screen never starts as four
         empty strips; the other three open on the pinned scrub. */
      mm.add('(min-width: 768px)', () => {
        const cards = q('.pleat-card');
        if (!cards.length) return;
        gsap.set(cards, { scaleY: 0.08 });
        gsap.to(cards[0], {
          scaleY: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.pleat-wall',
            scroller: scroller(),
            start: 'top 95%',
            end: 'top top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.pleat-wall',
            scroller: scroller(),
            start: 'top top',
            end: '+=220%',
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            /* refreshPriority → every refresh sorts triggers by page position,
               so this pin is always measured after the hero pin above it. */
            refreshPriority: 0,
          },
        });
        cards.slice(1).forEach((card, i) => {
          tl.to(card, { scaleY: 1, duration: 1, ease: 'power4.inOut' }, i * 1.2);
        });
        /* a short hold with the full wall open before the pin releases */
        tl.to({}, { duration: 0.6 });
      });

      /* Mobile: pleats render fully open in a static stack with reveals. */
      mm.add('(max-width: 767px)', () => {
        q('.pleat-card').forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.4,
              ease: 'sine.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 90%' },
            }
          );
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* In-page links glide through the platform's Lenis (viewer:
     .tpl-scope.__lenis, export: window.__lenis) with the wheel's easing;
     #hero means the very top. */
  const onAnchor = (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !rootRef.current || !rootRef.current.contains(a)) return;
    const id = a.getAttribute('href').slice(1);
    const el = id && rootRef.current.querySelector(`#${id}`);
    if (!el) return;
    e.preventDefault();
    const sc = scroller();
    const lenis = (sc && sc.__lenis) || window.__lenis;
    const target = id === 'hero' ? 0 : el;
    if (lenis && !reduced) lenis.scrollTo(target, { duration: 1.4 });
    else if (id === 'hero') sc.scrollTo({ top: 0 });
    else el.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={rootRef} className="tpl-design-02-minimal" style={rootStyle} onClick={onAnchor}>
      {/* ————— Nav: whisper-minimal ————— */}
      <nav className="kora-nav" aria-label="Primary">
        <a className="kora-wordmark" href="#hero">
          {name}
        </a>
        <div className="kora-nav-links">
          {content.nav.map((item) => (
            <a key={item} href={`#${navAnchor(item)}`}>
              {item}
            </a>
          ))}
        </div>
        <span className="kora-bag">Bag (0)</span>
      </nav>

      {/* ————— Hero: "Still Air" (scroll-scrubbed frames) ————— */}
      <header id="hero" className="kora-hero" data-tour="The Quiet">
        <div className="kora-hero-scrub" data-tour="Still Air">
          <ScrollFrames
            frames={frames}
            alt="Still Air — fabric folding in still air"
            pinDistance="+=170%"
          >
            <div className="kora-hero-copy">
              <p className="kora-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="kora-title">{content.hero.title}</h1>
              <p className="kora-sub">{content.hero.sub}</p>
              <a className="kora-cta" href={`mailto:${email}`}>
                {content.hero.cta}
              </a>
            </div>
          </ScrollFrames>
        </div>
      </header>

      {/* ————— Philosophy ————— */}
      <section id="story" className="kora-philosophy" data-tour="Philosophy">
        <div className="kora-column">
          <p className="kora-eyebrow rv">{content.philosophy.eyebrow}</p>
          <h2 className="kora-h2 rv">{content.philosophy.title}</h2>
          <p className="kora-body rv">{content.philosophy.body}</p>
        </div>
      </section>

      {/* ————— Collection: pleat wall ————— */}
      <section id="collection" className="kora-collection" data-tour="The Collection">
        <div className="kora-section-head">
          <p className="kora-eyebrow rv">{content.collection.eyebrow}</p>
          <h2 className="kora-h2 rv">{content.collection.title}</h2>
          <p className="kora-note rv">{content.collection.note}</p>
        </div>
        <div className="pleat-wall">
          {content.products.map((p, i) => (
            <article className="pleat-card" key={p.name}>
              <span className="pleat-seam" aria-hidden="true" />
              <figure className="pleat-figure">
                <Img
                  k={PRODUCT_KEYS[i]}
                  src={img(PRODUCT_KEYS[i], PRODUCT_IMAGES[i])}
                  alt={`${p.name} — ${p.fabric}`}
                />
              </figure>
              <div className="pleat-meta">
                <h3 className="pleat-name">{productName(i, p.name)}</h3>
                <p className="pleat-price">{price(p.price)}</p>
                <p className="pleat-fabric">{p.fabric}</p>
                <p className="pleat-fit">{p.fit}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ————— Fabric ————— */}
      <section id="craft" className="kora-fabric" data-tour="The Fabric">
        <div className="kora-fabric-inner">
          <figure className="kora-fabric-figure rv">
            <Img
              k="detail"
              src={img('detail', clothImg)}
              alt="Close-up of raw undyed kora cotton weave"
            />
          </figure>
          <div className="kora-fabric-copy">
            <p className="kora-eyebrow rv">{content.fabric.eyebrow}</p>
            <h2 className="kora-h2 rv">{content.fabric.title}</h2>
            <p className="kora-body rv">{content.fabric.body}</p>
            <dl className="kora-specs rv">
              {content.fabric.specs.map((s) => (
                <div className="kora-spec" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ————— Visit ————— */}
      <section id="visit" className="kora-visit" data-tour="Visit">
        <div className="kora-column">
          <p className="kora-eyebrow rv">{content.visit.eyebrow}</p>
          <h2 className="kora-h2 rv">{content.visit.title}</h2>
          <p className="kora-body rv">{content.visit.body}</p>
          <address className="kora-address rv">
            <span>{content.contact.address}</span>
            <span>{content.contact.hours}</span>
            <span>{content.contact.phone}</span>
          </address>
          <div className="rv">
            <a className="kora-cta kora-cta-clay" href={`mailto:${email}`}>
              {content.visit.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ————— Footer ————— */}
      <footer className="kora-footer">
        <div className="kora-footer-inner">
          <span className="kora-wordmark kora-wordmark-sm">{name}</span>
          <span className="kora-footer-note">{content.footer.note}</span>
          <a className="kora-footer-link" href={instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <span className="kora-footer-line">{content.footer.line}</span>
        </div>
      </footer>
    </div>
  );
}

function navAnchor(label) {
  const map = { Philosophy: 'story', Collection: 'collection', Fabric: 'craft', Visit: 'visit' };
  return map[label] || 'hero';
}
