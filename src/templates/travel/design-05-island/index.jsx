import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frames ("The Sandbar"): the signature clip replaced by a
   72-frame sequence scrubbed by scroll (Apple-style). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-island';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500&display=swap';

/* Escape imagery: img() keys map hero -> hero.jpg, product-N -> dest-(N+1).jpg. */
const ESCAPE_MEDIA = [
  { key: 'hero', src: heroImg, alt: 'Aerial view of a crescent sandbar ringed by turquoise shallows' },
  { key: 'product-0', src: dest1Img, alt: 'A single leaning palm on an empty beach in soft morning light' },
  { key: 'product-1', src: dest2Img, alt: 'A coral-sand lagoon with impossibly clear turquoise water' },
  { key: 'product-2', src: dest3Img, alt: 'An overwater hammock on stilts above a calm sea' },
];

function TideCard({ escape, index }) {
  const { productName, price, img } = useCustom();
  const media = ESCAPE_MEDIA[index % ESCAPE_MEDIA.length];
  return (
    <article className="sl-tide-card">
      <div className="sl-tide-visual">
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
      </div>
      <div className="sl-tide-body">
        <p className="sl-eyebrow">{escape.tag}</p>
        <h3 className="sl-tide-name">{productName(index, escape.name)}</h3>
        <p className="sl-tide-blurb">{escape.blurb}</p>
        <p className="sl-tide-meta">
          <span>{escape.duration}</span>
          <span className="sl-tide-price">{price(escape.price)}</span>
        </p>
      </div>
    </article>
  );
}

/* TIDE DRIFT — the signature mechanic.
   Unpinned and scroll-linked: the card field translates horizontally at a
   fraction of vertical scroll speed (scrubbed x), while each card rides a
   gentle sine-wave vertical path (rAF ticker), like floating on water.
   Scroll velocity subtly swells the bob amplitude, smoothed per frame.
   Never a marquee — the cards drift once across and rest. Reduced-motion
   renders a calm static grid; mobile keeps the same drift, gentler. */
function TideDrift() {
  const reduced = useReducedMotion();
  /* Own scope hook: the parent's root ref is attached only AFTER this child's
     layout effect runs (React attaches host refs bottom-up), so the parent's
     scroller() would still resolve to window here. */
  const { rootRef, scroller } = useTplScope();
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const sc = scroller();
    const viewport = rootRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(track.querySelectorAll('.sl-tide-card'));
    if (!cards.length) return;

    const mq = window.matchMedia('(max-width: 767px)');
    let amp = mq.matches ? 8 : 16; /* mobile: same drift, gentler amplitude */
    const onMq = (e) => {
      amp = e.matches ? 8 : 16;
    };
    mq.addEventListener('change', onMq);

    let vel = 0;
    let boost = 1;
    const phases = cards.map((_, i) => i * 1.37 + 0.6);
    const getY = () => (sc === window ? window.scrollY : sc.scrollTop || 0);

    const tick = (time) => {
      const target = 1 + Math.min(1.1, Math.abs(vel) / 2800);
      boost += (target - boost) * 0.05;
      vel *= 0.94; /* decay so the swell settles when scrolling stops */
      const sy = getY();
      for (let i = 0; i < cards.length; i++) {
        const y =
          Math.sin(sy * 0.004 + phases[i]) * amp * boost +
          Math.sin(time * 0.55 + phases[i] * 1.7) * amp * 0.3;
        cards[i].style.transform = `translate3d(0px, ${y.toFixed(2)}px, 0px)`;
      }
    };
    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -Math.max(0, track.scrollWidth - viewport.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: viewport,
          scroller: sc,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            vel = self.getVelocity() || 0;
          },
        },
      });
    }, viewport);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      mq.removeEventListener('change', onMq);
    };
  }, [reduced, scroller, rootRef]);

  if (reduced) {
    return (
      <div className="sl-tide-static" aria-label="Island escapes">
        {content.escapes.items.map((e, i) => (
          <TideCard key={e.name} escape={e} index={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="sl-tide" ref={rootRef} aria-label="Island escapes — scroll to let them drift">
      <div className="sl-tide-track" ref={trackRef}>
        {content.escapes.items.map((e, i) => (
          <TideCard key={e.name} escape={e} index={i} />
        ))}
      </div>
    </div>
  );
}

/* Breathing divider — a hairline that swells and settles, endlessly. */
function Breath() {
  return (
    <span className="sl-breath" aria-hidden="true">
      <i />
    </span>
  );
}

export default function Design05Island() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.plan.email;

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
    if (reduced) return;
    const ctx = gsap.context(() => {
      const sc = scroller();

      /* Hero entrance: fades only — the design's whole motion language. */
      gsap.fromTo(
        '.sl-nav',
        { opacity: 0 },
        { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.1 }
      );
      gsap.fromTo(
        '.sl-hero-copy > *',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out', stagger: 0.14, delay: 0.3 }
      );
      gsap.fromTo(
        '.sl-scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 1.6 }
      );

      /* Fades only, everywhere else. */
      gsap.utils.toArray('.sl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sl-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-05-island">
      <header className="sl-nav">
        <a className="sl-wordmark" href="#hero">
          {name}
        </a>
        <nav className="sl-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence ("The Sandbar") */}
        <section id="hero" className="sl-hero" data-tour="Welcome">
          <ScrollFrames frames={frames} alt={content.hero.videoAlt} pinDistance="+=170%">
            <div className="sl-hero-shade" aria-hidden="true" />
            <div className="sl-hero-copy">
              <p className="sl-eyebrow sl-eyebrow-light">{content.hero.eyebrow}</p>
              <h1 className="sl-hero-title">{content.hero.title}</h1>
              <p className="sl-hero-sub">{content.hero.sub}</p>
              <a className="sl-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <p className="sl-hero-note">{content.hero.note}</p>
            </div>
            <a className="sl-scroll-cue" href="#destinations" aria-label="Scroll to escapes">
              <span />
            </a>
          </ScrollFrames>
        </section>

        {/* ESCAPES — the Tide drift */}
        <section id="destinations" className="sl-escapes" data-tour="Escapes">
          <div className="sl-wrap sl-escapes-head">
            <p className="sl-eyebrow sl-rv">{content.escapes.eyebrow}</p>
            <h2 className="sl-h2 sl-rv">{content.escapes.title}</h2>
            <p className="sl-lede sl-rv">{content.escapes.lede}</p>
          </div>
          <TideDrift />
          <p className="sl-drift-hint sl-rv">{content.escapes.hint}</p>
        </section>

        {/* PHILOSOPHY — slowness */}
        <section id="story" className="sl-slow" data-tour="Slowness">
          <div className="sl-wrap sl-slow-inner">
            <p className="sl-eyebrow sl-rv">{content.story.eyebrow}</p>
            <h2 className="sl-h2 sl-rv">{content.story.title}</h2>
            <Breath />
            {content.story.body.map((p, i) => (
              <p className="sl-body sl-rv" key={i}>
                {p}
              </p>
            ))}
            <figure className="sl-slow-figure sl-rv">
              <Img k="detail" src={img('detail', detailImg)} alt={content.story.imageAlt} />
            </figure>
            <div className="sl-stagger sl-tenets">
              {content.story.tenets.map((t, i) => (
                <div className="sl-tenet" key={t.title}>
                  <p className="sl-tenet-num">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="sl-tenet-title">{t.title}</h3>
                  <p className="sl-tenet-text">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNAL */}
        <section id="journal" className="sl-journal" data-tour="Journal">
          <div className="sl-wrap">
            <p className="sl-eyebrow sl-rv">{content.journal.eyebrow}</p>
            <h2 className="sl-h2 sl-rv">{content.journal.title}</h2>
            <Breath />
            <div className="sl-stagger sl-notes">
              {content.journal.notes.map((n) => (
                <article className="sl-note" key={n.title}>
                  <p className="sl-eyebrow">{n.date}</p>
                  <h3 className="sl-note-title">{n.title}</h3>
                  <p className="sl-note-text">{n.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLAN / CONTACT */}
        <section id="contact" className="sl-plan" data-tour="Plan">
          <div className="sl-wrap sl-plan-inner">
            <p className="sl-eyebrow sl-rv">{content.plan.eyebrow}</p>
            <h2 className="sl-h2 sl-rv">{content.plan.title}</h2>
            <p className="sl-lede sl-rv">{content.plan.body}</p>
            <a className="sl-cta sl-cta-dark sl-rv" href={`mailto:${email}`}>
              {content.plan.cta}
            </a>
            <address className="sl-address sl-rv">
              <a href={`mailto:${email}`}>{email}</a>
              <span aria-hidden="true">·</span>
              <a href={`tel:${content.plan.phone.replace(/\s/g, '')}`}>{content.plan.phone}</a>
            </address>
            <p className="sl-plan-meta sl-rv">
              {content.plan.address} · {content.plan.hours}
            </p>
          </div>
        </section>
      </main>

      <footer className="sl-footer">
        <p className="sl-footer-line">{content.footer.line}</p>
        <p className="sl-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
