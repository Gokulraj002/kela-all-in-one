import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence (replaces the hero loop): 72 frames. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-honeymoon';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Italiana&family=Montserrat:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`hy-wm ${className}`} aria-label={text}>
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

/* Diptych media: product-0..2 + detail keys, one use each. The "near" panel
   is the same scene reframed — a closer pull from the same escape. */
const escapeMedia = [
  {
    key: 'product-0',
    src: dest1Img,
    wideAlt: 'A curving Maldives sandbank at low tide in blush dawn light, a couple a small distant silhouette from behind',
    nearAlt: 'A closer pull of the same sandbank — rippled wet sand holding the pink sky',
  },
  {
    key: 'product-1',
    src: dest2Img,
    wideAlt: 'A Santorini cave suite plunge pool at blue hour, white curved architecture and a lit lantern, caldera beyond',
    nearAlt: 'A closer pull of the same suite — the lantern’s warm glow against the curved white wall',
  },
  {
    key: 'product-2',
    src: dest3Img,
    wideAlt: 'A Bali jungle villa infinity pool in morning mist, frangipani blossoms on still water',
    nearAlt: 'A closer pull of the same pool — blossoms drifting on the pearl-pink surface',
  },
];

/* One destination diptych: the wide frame + the intimate reframe. Captions
   rise "like breath" when the pin timeline reaches them (desktop motion). */
function Duet({ escape, media, index }) {
  const { productName, price, img } = useCustom();
  const src = img(media.key, media.src);
  return (
    <figure className={`hy-duet${index === 0 ? ' is-base' : ''}`} data-duet={index}>
      <div className="hy-duet-imgs">
        <div className="hy-frame hy-duet-wide">
          <Img k={media.key} src={src} alt={media.wideAlt} />
        </div>
        <div className="hy-frame hy-duet-near">
          <Img k={media.key} src={src} alt={media.nearAlt} />
        </div>
      </div>
      <figcaption className="hy-duet-cap">
        <p className="hy-cap-line hy-duet-num">
          {String(index + 1).padStart(2, '0')} · {escape.place} — {escape.tag}
        </p>
        <h3 className="hy-cap-line hy-duet-name">{productName(index, escape.name)}</h3>
        <p className="hy-cap-line hy-duet-blurb">{escape.blurb}</p>
        <p className="hy-cap-line hy-duet-meta">
          <span>{escape.duration}</span>
          <span aria-hidden="true"> · </span>
          <span>from {price(escape.price)}</span>
        </p>
        <a className="hy-cap-line hy-link" href="#contact">
          Plan this escape
        </a>
      </figcaption>
    </figure>
  );
}

export default function Design03Honeymoon() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  /* Desktop pin mode: ≥768px and full motion. Mobile + reduced-motion get
     the same diptychs as a calm static stack. */
  const [pinMode, setPinMode] = useState(
    () =>
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(min-width: 768px)').matches
  );
  const pinActive = pinMode && !reduced;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Gate the pin to desktop widths (resize-safe via gsap.matchMedia). */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      setPinMode(true);
      return () => setPinMode(false);
    });
    return () => mm.revert();
  }, []);

  /* General motion: slow hero entrance, hushed reveals, hairline rules. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* The slow fade-in runs on the canvas inside the frame stage — never on
         the pinned wrapper itself, whose box ScrollTrigger measures. */
      const tl = gsap.timeline({ defaults: { ease: 'sine.out' } });
      tl.fromTo(
        '.hy-hero .sf-canvas',
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 2.6, clearProps: 'transform' },
        0
      )
        .fromTo(
          '.hy-hero-title .wi',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.8, stagger: 0.16 },
          0.5
        )
        .fromTo(
          '.hy-hero-eyebrow, .hy-hero-sub, .hy-hero-ctas',
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 1.8, stagger: 0.22 },
          1.1
        );

      /* Breath-slow reveals. */
      gsap.utils.toArray('.hy-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.hy-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.8,
            ease: 'sine.out',
            stagger: 0.28,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      /* Hairline rules draw themselves — the journal's page dividers. */
      gsap.utils.toArray('.hy-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'sine.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* Signature mechanic — "Slow dissolve duets". A pinned full-bleed stage
     where each destination diptych irises open over the last through a soft
     circular mask, on scroll-scrub. Captions rise like breath. Nothing
     snappy: sine easings, scrub smoothing, long holds. */
  useLayoutEffect(() => {
    if (!pinActive) return;
    const ctx = gsap.context(() => {
      const sc = scroller();
      const stage = rootRef.current && rootRef.current.querySelector('.hy-duet-stage');
      if (!stage) return;
      const duets = gsap.utils.toArray('.hy-duet', stage);
      const dots = gsap.utils.toArray('.hy-dot', stage);
      if (duets.length < 2) return;

      /* Incoming duets hide behind a soft circular iris (radial-gradient
         mask driven by the --iris CSS var). Masks are applied here in JS so
         the static fallback never hides content. */
      duets.forEach((d, i) => {
        if (i === 0) return;
        gsap.set(d, { '--iris': '0%' });
        const m =
          'radial-gradient(circle at 50% 54%, #000 calc(var(--iris) - 12%), transparent var(--iris))';
        d.style.webkitMaskImage = m;
        d.style.maskImage = m;
      });

      const setActive = (idx) => {
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === idx));
      };

      const tl = gsap.timeline({
        defaults: { ease: 'sine.inOut' },
        scrollTrigger: {
          trigger: stage,
          scroller: sc,
          start: 'top top',
          end: '+=280%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setActive(p < 0.34 ? 0 : p < 0.72 ? 1 : 2);
          },
        },
      });

      const cap = (i) => `.hy-duet[data-duet="${i}"] .hy-cap-line`;
      const imgs = (i) => `.hy-duet[data-duet="${i}"] .hy-duet-imgs img`;

      /* Duet 1 breathes in as the pin settles. */
      tl.fromTo(
        cap(0),
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.24, ease: 'sine.out' },
        0
      );
      /* Duet 2 irises open over duet 1. */
      tl.to(duets[1], { '--iris': '150%', duration: 2 }, 1.2);
      tl.fromTo(imgs(1), { scale: 1.09 }, { scale: 1, duration: 2 }, 1.2);
      tl.to(cap(0), { y: -44, opacity: 0, duration: 0.9, ease: 'sine.in' }, 1.2);
      tl.fromTo(
        cap(1),
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.24, ease: 'sine.out' },
        2.4
      );
      /* Duet 3 irises open over duet 2. */
      tl.to(duets[2], { '--iris': '150%', duration: 2 }, 4);
      tl.fromTo(imgs(2), { scale: 1.09 }, { scale: 1, duration: 2 }, 4);
      tl.to(cap(1), { y: -44, opacity: 0, duration: 0.9, ease: 'sine.in' }, 4);
      tl.fromTo(
        cap(2),
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.24, ease: 'sine.out' },
        5.2
      );
      /* A held breath at the end. */
      tl.to({}, { duration: 0.8 });
    }, rootRef);
    return () => ctx.revert();
  }, [pinActive, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-03-honeymoon">
      <header className="hy-nav">
        <a className="hy-wordmark" href="#hero">
          {name}
        </a>
        <nav className="hy-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence, pinned scrub */}
        <section id="hero" className="hy-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="An overwater villa at dusk — lanterns warming along the deck, the whole scene doubled in the still lagoon"
            pinDistance="+=170%"
            className="hy-hero-frames"
          >
            <div className="hy-hero-scrim" aria-hidden="true" />
            <div className="hy-hero-copy">
              <p className="hy-eyebrow hy-eyebrow-light hy-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hy-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="hy-hero-sub">{content.hero.sub}</p>
              <div className="hy-hero-ctas">
                <a className="hy-cta" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="hy-cta hy-cta-ghost" href={content.hero.secondaryHref}>
                  {content.hero.secondary}
                </a>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* ESCAPES — the slow dissolve duets */}
        <section id="escapes" className="hy-escapes" data-tour="The Escapes">
          <div className="hy-wrap hy-escapes-head">
            <p className="hy-eyebrow hy-rv">{content.escapes.eyebrow}</p>
            <h2 className="hy-h2 hy-rv">{content.escapes.title}</h2>
            <span className="hy-rule" aria-hidden="true" />
            <p className="hy-lede hy-rv">{content.escapes.intro}</p>
          </div>
          <div className={`hy-duet-stage${pinActive ? ' is-pinned' : ''}`}>
            {content.escapes.items.map((escape, i) => (
              <Duet key={escape.name} escape={escape} media={escapeMedia[i]} index={i} />
            ))}
            {pinActive && (
              <div className="hy-duet-progress" aria-hidden="true">
                {content.escapes.items.map((escape, i) => (
                  <span key={escape.name} className={`hy-dot${i === 0 ? ' is-active' : ''}`}>
                    <em>{String(i + 1).padStart(2, '0')}</em>
                    {escape.place}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PHILOSOPHY — slowness */}
        <section id="story" className="hy-story" data-tour="Our Philosophy">
          <div className="hy-wrap">
            <p className="hy-eyebrow hy-rv">{content.story.eyebrow}</p>
            <h2 className="hy-h2 hy-rv">{content.story.title}</h2>
            <span className="hy-rule" aria-hidden="true" />
            <div className="hy-story-grid">
              <div>
                {content.story.body.map((p, i) => (
                  <p className="hy-body hy-rv" key={i}>
                    {p}
                  </p>
                ))}
                <blockquote className="hy-quote hy-rv">
                  <p>“{content.story.quote.text}”</p>
                  <cite>{content.story.quote.by}</cite>
                </blockquote>
              </div>
              <div className="hy-story-side">
                <div className="hy-frame hy-rv">
                  <Img
                    k="detail"
                    src={img('detail', detailImg)}
                    alt="Two champagne coupes catching blush-pink light, rose petals scattered, lantern bokeh behind"
                  />
                </div>
                <ul className="hy-rules-list hy-stagger">
                  {content.story.rules.map((r) => (
                    <li key={r.k}>
                      <strong>{r.k}</strong>
                      <span>{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* LOVE NOTES */}
        <section id="notes" className="hy-notes" data-tour="Love Notes">
          <div className="hy-wrap">
            <p className="hy-eyebrow hy-rv">{content.notes.eyebrow}</p>
            <h2 className="hy-h2 hy-rv">{content.notes.title}</h2>
            <span className="hy-rule" aria-hidden="true" />
            <div className="hy-notes-grid hy-stagger">
              {content.notes.items.map((note) => (
                <figure className="hy-note" key={note.by}>
                  <blockquote>
                    <p>“{note.text}”</p>
                  </blockquote>
                  <figcaption>
                    <span className="hy-note-by">{note.by}</span>
                    <span className="hy-note-trip">{note.trip}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PLAN / CONTACT */}
        <section id="contact" className="hy-contact" data-tour="Plan With Us">
          <div className="hy-wrap hy-contact-inner">
            <p className="hy-eyebrow hy-rv">{content.contact.eyebrow}</p>
            <h2 className="hy-h2 hy-rv">{content.contact.title}</h2>
            <span className="hy-rule" aria-hidden="true" />
            <p className="hy-lede hy-rv">{content.contact.body}</p>
            <a className="hy-cta hy-rv" href={`mailto:${email}`}>
              {content.contact.cta}
            </a>
            <div className="hy-contact-cols">
              <address className="hy-address hy-rv">
                <a href={`mailto:${email}`}>{email}</a>
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                <span>{content.contact.studio}</span>
                <span>{content.contact.hours}</span>
              </address>
              <div className="hy-extras hy-rv">
                <h3 className="hy-h3">{content.contact.extrasTitle}</h3>
                <ul>
                  {content.contact.extras.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="hy-footer">
        <p className="hy-footer-word">{name}</p>
        <p className="hy-footer-line">{content.footer.line}</p>
        <p className="hy-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
