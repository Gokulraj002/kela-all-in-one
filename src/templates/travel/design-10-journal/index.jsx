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

/* Signature sequence, per SCROLLFRAMES_GUIDE.md — "Journal" (72 frames)
   scrubbed by scroll instead of an autoplaying video file. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-journal';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`fj-wm ${className}`} aria-label={text}>
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

/* Expedition frames — upload keys follow the travel contract:
   hero → hero.jpg, product-0..2 → dest-1..3.jpg, detail → detail.jpg. */
const frameMedia = [
  { key: 'hero', src: heroImg, alt: 'Wind rippling sand crests on Thar desert dunes at dusk, a lone traveler silhouetted on the ridge line' },
  { key: 'product-0', src: dest1Img, alt: 'Jaisalmer fort glowing gold beneath dramatic monsoon clouds at golden hour' },
  { key: 'product-1', src: dest2Img, alt: 'Ancient monastery on a Spiti cliff edge above a winding mountain road at dawn' },
  { key: 'product-2', src: dest3Img, alt: 'Munnar tea garden terraces layered in morning mist, a distant picker on the ridge' },
  { key: 'detail', src: detailImg, alt: 'Vintage film camera and an open field journal resting on a desert rock in amber light' },
];

function FrameCard({ trek, index, media, frameRef }) {
  const { productName, price, img } = useCustom();
  return (
    <article
      className="fj-frame"
      ref={frameRef ? (el) => { frameRef.current[index] = el; } : undefined}
    >
      <div className="fj-frame-img">
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
        <span className="fj-frame-stamp" aria-hidden="true">
          FRAME {trek.frame}
        </span>
      </div>
      <p className="fj-frame-anno">
        FRAME {trek.frame} — {trek.short}, {trek.exif}
      </p>
      <h3 className="fj-frame-name">{productName(index, trek.name)}</h3>
      <p className="fj-frame-meta">
        <span>{trek.tag}</span>
        <span aria-hidden="true"> · </span>
        <span>{trek.duration}</span>
      </p>
      <p className="fj-frame-blurb">{trek.blurb}</p>
      <div className="fj-frame-foot">
        <p className="fj-frame-price">{price(trek.price)}</p>
        <a className="fj-btn fj-btn-small" href="#contact">
          Reserve a seat
        </a>
      </div>
    </article>
  );
}

export default function Design10Journal() {
  const { brand, contact, img } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* Signature mechanic refs: film-strip rewind. */
  const pinRef = useRef(null);
  const stripRef = useRef(null);
  const frameEls = useRef([]);
  const counterRef = useRef(null);
  const chapterRef = useRef(null);
  const dirRef = useRef(null);
  const leakRef = useRef(null);
  const lastChapter = useRef(content.expeditions.items[0].chapter);

  useLayoutEffect(() => {
    let onRefreshInit = null;
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* HERO entrance: gate-open clip wipe on the pinned frame stage, masked word-rise
         headline, mono annotations fading up. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.fj-hero .sf-stage',
        { clipPath: 'inset(10% 6% 90% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.fj-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 },
          0.35
        )
        .fromTo(
          '.fj-hero-sub, .fj-hero-cta-row',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.9
        )
        .fromTo(
          '.fj-hero-anno',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.1 },
          1.1
        )
        .fromTo('.fj-nav', { yPercent: -120 }, { yPercent: 0, duration: 0.7, ease: 'power3.out' }, 0.15);

      /* Generic reveals. */
      gsap.utils.toArray('.fj-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Section headline word-rises. */
      gsap.utils.toArray('.fj-sec-title').forEach((title) => {
        gsap.fromTo(
          title.querySelectorAll('.wi'),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.8,
            ease: 'power4.out',
            stagger: 0.07,
            scrollTrigger: { trigger: title, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Clip-wipe frames. */
      gsap.utils.toArray('.fj-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Amber hairline rules draw. */
      gsap.utils.toArray('.fj-rule').forEach((rule) => {
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

      /* ============ SIGNATURE: FILM-STRIP REWIND ============
         Pinned viewport; scrubbing down advances the strip, scrubbing up
         rewinds it. The frame counter ticks with progress, the HUD names
         the travel direction, and each chapter crossing fires exactly one
         amber light-leak flash. */
      const pin = pinRef.current;
      const strip = stripRef.current;
      if (pin && strip) {
        const items = content.expeditions.items;
        const n = items.length;
        const frames = frameEls.current.filter(Boolean);
        const viewport = pin.querySelector('.fj-viewport');

        /* Equalize frame heights and pad the strip so the first and last
           frames center exactly in the viewport — scrub progress then maps
           1:1 to frame centers. Re-run at the start of every refresh
           (resize, font load) via refreshInit. */
        const equalize = () => {
          gsap.set(frames, { clearProps: 'minHeight' });
          gsap.set(strip, { clearProps: 'paddingTop,paddingBottom' });
          const maxH = Math.max(...frames.map((f) => f.offsetHeight));
          const pad = Math.max(24, (viewport.clientHeight - maxH) / 2);
          gsap.set(frames, { minHeight: maxH });
          gsap.set(strip, { paddingTop: pad, paddingBottom: pad });
        };
        equalize();
        onRefreshInit = () => equalize();
        ScrollTrigger.addEventListener('refreshInit', onRefreshInit);

        const renderStrip = (p, direction) => {
          const t = p * (n - 1);
          const active = Math.max(0, Math.min(n - 1, Math.round(t)));
          frames.forEach((f, i) => {
            gsap.set(f, { opacity: i === active ? 1 : 0.35 });
          });
          if (counterRef.current) counterRef.current.textContent = `FRAME ${items[active].frame}`;
          if (dirRef.current) dirRef.current.textContent = direction >= 0 ? 'ADVANCE ▸' : '◂ REWIND';
          const ch = items[active].chapter;
          if (chapterRef.current) chapterRef.current.textContent = content.expeditions.chapters[ch];
          if (ch !== lastChapter.current) {
            lastChapter.current = ch;
            /* Exactly one tasteful flash per chapter crossing. */
            if (leakRef.current) {
              gsap.fromTo(
                leakRef.current,
                { opacity: 0 },
                { opacity: 0.55, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.inOut', overwrite: 'auto' }
              );
            }
          }
        };

        renderStrip(0, 1);
        gsap.to(strip, {
          y: () => -(strip.scrollHeight - viewport.clientHeight),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => renderStrip(self.progress, self.direction),
          },
        });
        /* Re-measure once webfonts land (frame heights shift). */
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
        }
      }
    }, rootRef);
    return () => {
      if (onRefreshInit) ScrollTrigger.removeEventListener('refreshInit', onRefreshInit);
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}`;

  return (
    <div ref={rootRef} className={`tpl-design-10-journal${reduced ? ' fj-reduced' : ''}`}>
      <header className="fj-nav">
        <a className="fj-wordmark" href="#hero">
          {name}
          <span className="fj-wordmark-dot" aria-hidden="true">
            ●
          </span>
          <span className="fj-wordmark-rec">REC</span>
        </a>
        <nav className="fj-links" aria-label="Primary">
          {content.nav.map((nv) => (
            <a key={nv.href} href={nv.href}>
              {nv.label}
            </a>
          ))}
        </nav>
        <a className="fj-btn fj-btn-nav" href="#contact">
          Commission
        </a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="fj-hero" data-tour="The Journal">
          <ScrollFrames
            frames={frames}
            alt="Desert dunes with wind rippling the sand crests; a lone traveler walks the ridge line as the wind erases the footprints"
            pinDistance="+=170%"
          >
            <div className="fj-hero-shade" aria-hidden="true" />
            <div className="fj-grain" aria-hidden="true" />
            <span className="fj-hero-anno is-tl" aria-hidden="true">
              {content.hero.annotations.tl}
            </span>
            <span className="fj-hero-anno is-tr" aria-hidden="true">
              {content.hero.annotations.tr}
            </span>
            <span className="fj-hero-anno is-bl" aria-hidden="true">
              {content.hero.annotations.bl}
            </span>
            <span className="fj-hero-anno is-br" aria-hidden="true">
              {content.hero.annotations.br}
            </span>
            <div className="fj-hero-copy">
              <p className="fj-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="fj-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="fj-hero-sub">{content.hero.sub}</p>
              <div className="fj-hero-cta-row">
                <a className="fj-btn" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="fj-link" href={content.hero.secondaryHref}>
                  {content.hero.secondary}
                </a>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* EXPEDITIONS — THE FILM STRIP */}
        <section id="destinations" className="fj-expeditions" data-tour="Expeditions">
          <div className="fj-wrap fj-exp-head">
            <p className="fj-eyebrow fj-rv">{content.expeditions.eyebrow}</p>
            <h2 className="fj-h2 fj-sec-title">
              <Words text={content.expeditions.title} />
            </h2>
            <span className="fj-rule" aria-hidden="true" />
            <p className="fj-body fj-rv">{content.expeditions.intro}</p>
          </div>

          {reduced ? (
            /* Reduced-motion: static stacked frames, counter reads final state. */
            <div className="fj-strip-static fj-wrap" aria-label="Expedition frames">
              <p className="fj-static-counter">FRAME 004 — 024 · 5 FRAMES · STATIC REEL</p>
              {content.expeditions.items.map((t, i) => (
                <FrameCard key={t.frame} trek={t} index={i} media={frameMedia[i]} />
              ))}
            </div>
          ) : (
            <div ref={pinRef} className="fj-strip-pin">
              <div className="fj-viewport">
                <span className="fj-sprocket is-left" aria-hidden="true" />
                <span className="fj-sprocket is-right" aria-hidden="true" />
                <div ref={stripRef} className="fj-strip">
                  {content.expeditions.items.map((t, i) => (
                    <FrameCard key={t.frame} trek={t} index={i} media={frameMedia[i]} frameRef={frameEls} />
                  ))}
                </div>
                <div ref={leakRef} className="fj-leak" aria-hidden="true" />
                <div className="fj-grain is-viewport" aria-hidden="true" />
                <div className="fj-hud" aria-hidden="true">
                  <div className="fj-hud-top">
                    <p className="fj-hud-counter" ref={counterRef}>
                      FRAME 004
                    </p>
                    <p className="fj-hud-chapter" ref={chapterRef}>
                      {content.expeditions.chapters[0]}
                    </p>
                  </div>
                  <p className="fj-hud-dir" ref={dirRef}>
                    ADVANCE ▸
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* PROCESS */}
        <section id="craft" className="fj-process" data-tour="The Process">
          <div className="fj-wrap">
            <p className="fj-eyebrow fj-rv">{content.craft.eyebrow}</p>
            <h2 className="fj-h2 fj-sec-title">
              <Words text={content.craft.title} />
            </h2>
            <span className="fj-rule" aria-hidden="true" />
            <p className="fj-body fj-rv">{content.craft.intro}</p>
            <div className="fj-process-grid">
              <ol className="fj-steps">
                {content.craft.steps.map((s) => (
                  <li className="fj-step fj-rv" key={s.n}>
                    <span className="fj-step-n">{s.n}</span>
                    <div>
                      <h3 className="fj-step-title">{s.title}</h3>
                      <p className="fj-step-text">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="fj-wipe fj-frame-inline fj-rv">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Vintage film camera and an open field journal resting on a desert rock in amber light"
                />
                <figcaption className="fj-caption">
                  FRAME 024 — the kit. M6, 35mm, and the notebook that started it all.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PHOTOGRAPHER */}
        <section id="story" className="fj-story" data-tour="The Photographer">
          <div className="fj-wrap">
            <p className="fj-eyebrow fj-rv">{content.story.eyebrow}</p>
            <h2 className="fj-h2 fj-sec-title">
              <Words text={content.story.title} />
            </h2>
            <span className="fj-rule" aria-hidden="true" />
            <div className="fj-story-grid">
              <div>
                {content.story.body.map((p, i) => (
                  <p className="fj-body fj-rv" key={i}>
                    {p}
                  </p>
                ))}
                <blockquote className="fj-quote fj-rv">
                  <p>{content.story.quote.text}</p>
                  <cite>{content.story.quote.by}</cite>
                </blockquote>
              </div>
              <dl className="fj-stats">
                {content.story.stats.map((s) => (
                  <div className="fj-stat fj-rv" key={s.label}>
                    <dt className="fj-stat-value">{s.value}</dt>
                    <dd className="fj-stat-label">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CONTACT / COMMISSION */}
        <section id="contact" className="fj-contact" data-tour="Commission">
          <div className="fj-wrap">
            <p className="fj-eyebrow fj-rv">{content.contact.eyebrow}</p>
            <h2 className="fj-h2 fj-sec-title">
              <Words text={content.contact.title} />
            </h2>
            <span className="fj-rule" aria-hidden="true" />
            <p className="fj-body fj-rv">{content.contact.body}</p>
            <div className="fj-contact-grid">
              <address className="fj-address fj-rv">
                {content.contact.address}
                <br />
                <a href={mapsUrl} target="_blank" rel="noreferrer">
                  Find the darkroom
                </a>
                <br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                <br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <div className="fj-contact-cta fj-rv">
                <p className="fj-contact-hours">{content.contact.hours}</p>
                <a className="fj-btn fj-btn-big" href={`mailto:${email}?subject=Fieldnotes%20commission`}>
                  {content.contact.cta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fj-footer">
        <div className="fj-wrap fj-footer-inner">
          <p className="fj-wordmark fj-footer-word">{name}</p>
          <p className="fj-footer-tag">{content.brand.tagline}</p>
          <nav className="fj-footer-links" aria-label="Footer">
            {content.nav.map((nv) => (
              <a key={nv.href} href={nv.href}>
                {nv.label}
              </a>
            ))}
          </nav>
          <p className="fj-footer-line">{content.footer.line}</p>
          <p className="fj-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
