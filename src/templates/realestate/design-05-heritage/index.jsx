import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence (Apple-style) for the ritual section. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-heritage';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap';

/* Asset map: Img keys resolve through useCustom's img() so the
   Customize/Upload panels keep working. */
const ASSETS = {
  hero: heroImg,
  'product-0': listing1Img,
  'product-1': listing2Img,
  'product-2': listing3Img,
  detail: detailImg,
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`ll-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

function Seal({ size = 120, className = '' }) {
  return (
    <span className={`ll-seal ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <span className="ll-seal-mono">L&middot;L</span>
      <span className="ll-seal-est">EST&middot;2018</span>
    </span>
  );
}

/* Crest-like wordmark for the nav: small seal + letterpress wordmark. */
function Crest({ name }) {
  return (
    <a className="ll-crest" href="#hero" aria-label={`${name} — home`}>
      <span className="ll-crest-seal" aria-hidden="true">
        <span className="ll-crest-mono">L&middot;L</span>
      </span>
      <span className="ll-crest-words">
        <span className="ll-crest-name">{name}</span>
        <span className="ll-crest-sub">Heritage Restoration</span>
      </span>
    </a>
  );
}

/* One chapter of the pinned wipe: archival sepia (before) over restored
   color (after). The wipe is pure transform: the sepia mask slides left
   while its inner image counter-slides so the photo itself never moves —
   no clip-path repaint of a filtered full-frame image on every frame. */
function WipeLayer({ chapter }) {
  const { img } = useCustom();
  return (
    <div className="ll-wipe-layer">
      <div className="ll-wipe-after">
        <Img k={chapter.imgKey} src={img(chapter.imgKey, ASSETS[chapter.imgKey])} alt={chapter.alt} />
      </div>
      <div className="ll-wipe-before" aria-hidden="true">
        <div className="ll-wipe-before-inner">
          <Img k={chapter.imgKey} src={img(chapter.imgKey, ASSETS[chapter.imgKey])} alt="" />
        </div>
      </div>
      <div className="ll-wipe-handle" aria-hidden="true">
        <span className="ll-wipe-line" />
        <span className="ll-wipe-grip">
          <span className="ll-wipe-chev ll-wipe-chev-l" />
          <span className="ll-wipe-chev ll-wipe-chev-r" />
        </span>
      </div>
      <p className="ll-wipe-date ll-wipe-date-before">
        <strong>{chapter.before}</strong> &middot; as found
      </p>
      <p className="ll-wipe-date ll-wipe-date-after">
        <strong>{chapter.after}</strong> &middot; restored
      </p>
      <div className="ll-wipe-cap">
        <p className="ll-wipe-num">
          Chapter {chapter.num} <span aria-hidden="true">&middot;</span> III
        </p>
        <h3 className="ll-wipe-title">{chapter.title}</h3>
        <p className="ll-wipe-text">{chapter.caption}</p>
      </div>
    </div>
  );
}

/* Static side-by-side before/after pairs: reduced-motion and mobile. */
function WipeStatic() {
  const { img } = useCustom();
  return (
    <div className="ll-wipe-static" aria-label="Before and after comparisons">
      {content.compare.chapters.map((c) => (
        <figure className="ll-pair" key={c.num}>
          <div className="ll-pair-sides">
            <div className="ll-pair-side">
              <div className="ll-frame is-sepia">
                <Img
                  k={c.imgKey}
                  src={img(c.imgKey, ASSETS[c.imgKey])}
                  alt={`${c.title} before restoration, archival sepia view`}
                />
              </div>
              <p className="ll-pair-label">
                <strong>{c.before}</strong> &middot; as found
              </p>
            </div>
            <div className="ll-pair-side">
              <div className="ll-frame">
                <Img
                  k={c.imgKey}
                  src={img(c.imgKey, ASSETS[c.imgKey])}
                  alt={`${c.title} after restoration, full color`}
                />
              </div>
              <p className="ll-pair-label">
                <strong>{c.after}</strong> &middot; restored
              </p>
            </div>
          </div>
          <figcaption className="ll-pair-cap">
            <p className="ll-wipe-num">Chapter {c.num} &middot; {c.title}</p>
            <p>{c.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Restoration enquiry form: composes a mailto so it works with no backend. */
function EnquireForm({ email }) {
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Restoration enquiry — ${fd.get('house') || 'a heritage house'}`);
    const body = encodeURIComponent(
      `Name: ${fd.get('name')}\nPhone: ${fd.get('phone')}\nHouse: ${fd.get('house')}\n\n${fd.get('story')}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };
  if (sent) {
    return (
      <p className="ll-form-done" role="status">
        Your enquiry is on its way &mdash; we answer every letter within a week.
      </p>
    );
  }
  return (
    <form className="ll-form" onSubmit={submit}>
      <label className="ll-field">
        <span>Your name</span>
        <input name="name" required autoComplete="name" placeholder="A. Krishnan" />
      </label>
      <label className="ll-field">
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="+91 98XXX XXXXX" />
      </label>
      <label className="ll-field">
        <span>The house</span>
        <input name="house" placeholder="e.g. 1920s bungalow, Chamarajpet" />
      </label>
      <label className="ll-field ll-field-wide">
        <span>A little of its history</span>
        <textarea name="story" rows={4} placeholder="When was it built? Who lived there? What does it need?" />
      </label>
      <button className="ll-cta ll-cta-solid" type="submit">
        {content.enquire.cta}
      </button>
    </form>
  );
}

export default function Design05Heritage() {
  const { brand, img, contact, price, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.enquire.email;
  const heroPoster = img('hero', heroImg);
  const phoneHref = `tel:${content.enquire.phone.replace(/[\s-]/g, '')}`;

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
    /* The sticky nav's height, for layers that must stay clear of it while a
       section is pinned (wipe stage, ritual film note). */
    const root = rootRef.current;
    const navEl = root && root.querySelector('.ll-nav');
    const setNavH = () => { if (navEl) root.style.setProperty('--ll-nav-h', `${navEl.offsetHeight}px`); };
    setNavH();
    const navRO = typeof ResizeObserver !== 'undefined' && navEl ? new ResizeObserver(setNavH) : null;
    if (navRO) navRO.observe(navEl);

    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: archival frame opens, masked word-rise, then the
         ledger note. Weighted and slow, like the category asks. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.ll-hero-frame',
        { clipPath: 'inset(8% 6% 92% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.ll-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 },
          0.35
        )
        .fromTo(
          '.ll-hero-sub, .ll-hero-cta',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 },
          1.0
        )
        .fromTo(
          '.ll-hero-note',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.5
        );

      /* Slow drift on the hero image as the page opens. */
      gsap.to('.ll-hero-drift', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.ll-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });

      /* Ledger reveals: long, unhurried. */
      gsap.utils.toArray('.ll-rv').forEach((el) => {
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
      gsap.utils.toArray('.ll-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Letterpress rules draw across the page. */
      gsap.utils.toArray('.ll-rule').forEach((rule) => {
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

      /* Image frames open like album pages. */
      gsap.utils.toArray('.ll-frame-open').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 84%', once: true },
          }
        );
      });

      /* BEFORE/AFTER WIPE SCRUB — desktop only (>=768px); mobile and
         reduced-motion get static side-by-side pairs. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = root && root.querySelector('.ll-wipe-pin');
        if (!pin) return undefined;
        /* Pinned under the sticky nav: its height (--ll-nav-h) is kept clear
           at the top of the pinned frame so the chapter caption never hides. */
        pin.classList.add('is-pinned');
        const layers = gsap.utils.toArray('.ll-wipe-layer', pin);
        const chapters = content.compare.chapters.length;
        const STEP = 1.25;
        /* Initial state lives outside the scrubbed timeline: a zero-duration
           set at time 0 is not rendered while the playhead sits at 0, which
           left every chapter hidden (an empty maroon stage) until the scrub
           moved. Chapter I is visible from the moment the stage arrives. */
        gsap.set(layers[0], { autoAlpha: 1 });
        gsap.set(layers.slice(1), { autoAlpha: 0 });
        /* Only the chapter on screen is exposed to assistive tech; the
           stacked, faded-out chapters are aria-hidden. */
        let shown = -1;
        const expose = (idx) => {
          if (idx === shown) return;
          shown = idx;
          layers.forEach((l, k) => l.setAttribute('aria-hidden', String(k !== idx)));
        };
        expose(0);
        const wtl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: () => expose(Math.min(layers.length - 1, Math.max(0, Math.floor(wtl.time() / STEP)))),
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: () => `+=${chapters * 110}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        layers.forEach((layer, i) => {
          const at = i * STEP;
          const before = layer.querySelector('.ll-wipe-before');
          const beforeInner = layer.querySelector('.ll-wipe-before-inner');
          const handle = layer.querySelector('.ll-wipe-handle');
          const cap = layer.querySelector('.ll-wipe-cap');
          if (i > 0) {
            wtl.set(layer, { autoAlpha: 1 }, at);
            wtl.to(layers[i - 1], { autoAlpha: 0, duration: 0.18 }, at);
          }
          /* The wipe: archival sepia recedes right-to-left as the brass
             handle sweeps across, revealing restored color beneath. */
          wtl.fromTo(before, { xPercent: 0 }, { xPercent: -100, duration: 1 }, at);
          wtl.fromTo(beforeInner, { xPercent: 0 }, { xPercent: 100, duration: 1 }, at);
          wtl.fromTo(handle, { xPercent: 100 }, { xPercent: 0, duration: 1 }, at);
          /* Chapter I's caption is already set when the stage arrives (it
             titles the frame before any scrolling); later chapters' captions
             rise in as their wipe completes. */
          if (i > 0) {
            wtl.fromTo(
              cap,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.28 },
              at + 0.72
            );
          }
        });
        /* Hold on the last restored chapter before the pin releases. */
        wtl.to({}, { duration: 0.35 });
        return () => {
          pin.classList.remove('is-pinned');
          layers.forEach((l) => l.removeAttribute('aria-hidden'));
        };
      });
    }, rootRef);
    return () => {
      if (navRO) navRO.disconnect();
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-05-heritage">
      <header className="ll-nav">
        <Crest name={name} />
        <nav className="ll-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="ll-cta ll-cta-small" href="#enquire">
          Enquire
        </a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="ll-hero" data-tour="Welcome">
          <div className="ll-hero-frame">
            <div className="ll-hero-drift">
              <Img
                k="hero"
                src={heroPoster}
                eager
                alt="Restored heritage facade in Malleshwaram in late-afternoon sun — carved stone columns, arched teak shutters, warm light on limewash"
                className="ll-hero-img"
              />
            </div>
            <div className="ll-hero-scrim" aria-hidden="true" />
          </div>
          <div className="ll-hero-copy">
            <p className="ll-eyebrow ll-eyebrow-light ll-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="ll-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="ll-hero-sub">{content.hero.sub}</p>
            <a className="ll-cta ll-hero-cta" href={content.hero.ctaHref}>
              {content.hero.cta}
            </a>
            <p className="ll-hero-note">{content.hero.ledgerNote}</p>
          </div>
        </section>

        {/* RESTORATIONS */}
        <section id="restorations" className="ll-section ll-restorations" data-tour="Restorations">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.restorations.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.restorations.title}</h2>
            <span className="ll-rule" aria-hidden="true" />
            <p className="ll-lede ll-rv">{content.restorations.sub}</p>
            <div className="ll-projects ll-stagger">
              {content.restorations.projects.map((p, i) => (
                <article className="ll-project" key={p.name}>
                  <div className="ll-frame ll-frame-open ll-project-img">
                    <Img
                      k={p.imgKey}
                      src={img(p.imgKey, ASSETS[p.imgKey])}
                      alt={`${p.name}, ${p.location} — restored ${['colonnade', 'courtyard', 'interior'][i]}`}
                    />
                    <span className="ll-project-seal" aria-hidden="true">
                      {p.restored}
                    </span>
                  </div>
                  <div className="ll-project-body">
                    <p className="ll-project-dates">
                      Built {p.built} &middot; Restored {p.restored}
                    </p>
                    <h3 className="ll-h3">{productName(i, p.name)}</h3>
                    <p className="ll-project-loc">{p.location}</p>
                    <p className="ll-body">{p.desc}</p>
                    <p className="ll-project-price">
                      <span className="ll-price-label">Restoration commission</span>
                      <span className="ll-price">{price(p.price)}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER WIPE */}
        <section id="compare" className="ll-section ll-compare" data-tour="Before & After">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.compare.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.compare.title}</h2>
            <span className="ll-rule" aria-hidden="true" />
            <p className="ll-lede ll-rv">{content.compare.sub}</p>
          </div>
          {reduced ? (
            <div className="ll-wrap">
              <WipeStatic />
            </div>
          ) : (
            <>
              <div className="ll-wipe-pin">
                <div className="ll-wipe-stage">
                  {content.compare.chapters.map((c) => (
                    <WipeLayer key={c.num} chapter={c} />
                  ))}
                </div>
                <p className="ll-wipe-hint" aria-hidden="true">
                  Keep scrolling &mdash; the handle wipes sepia into color
                </p>
              </div>
              <div className="ll-wrap">
                <WipeStatic />
              </div>
            </>
          )}
        </section>

        {/* CRAFT & MATERIALS */}
        <section id="craft" className="ll-section ll-craft" data-tour="Craft & Materials">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.craft.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.craft.title}</h2>
            <span className="ll-rule" aria-hidden="true" />
            <p className="ll-lede ll-rv">{content.craft.sub}</p>
            <div className="ll-materials ll-stagger">
              {content.craft.materials.map((m) => (
                <article className="ll-mat" key={m.name}>
                  <p className="ll-mat-num">{m.num}</p>
                  <h3 className="ll-h3">{m.name}</h3>
                  <p className="ll-mat-origin">{m.origin}</p>
                  <p className="ll-body">{m.text}</p>
                </article>
              ))}
            </div>
            <div className="ll-craftsmen-head ll-rv">
              <h3 className="ll-h3">{content.craft.craftsmenTitle}</h3>
              <p className="ll-body">{content.craft.craftsmenSub}</p>
            </div>
            <div className="ll-craftsmen ll-stagger">
              <div className="ll-frame ll-frame-open ll-craft-img">
                <Img
                  k="detail"
                  src={img('detail', detailImg)}
                  alt="Craftsman hands repointing lime mortar between old bricks, carved stone detail in warm side-light"
                />
              </div>
              {content.craft.craftsmen.map((c) => (
                <article className="ll-craftsman" key={c.name}>
                  <h4 className="ll-craftsman-name">{c.name}</h4>
                  <p className="ll-craftsman-role">{c.craft}</p>
                  <p className="ll-craftsman-years">{c.years}</p>
                  <p className="ll-body">{c.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* THE RITUAL — scroll-driven frame sequence (pinned scrub). */}
        <section id="ritual" className="ll-section ll-ritual" data-tour="The Ritual">
          <div className="ll-wrap">
            <p className="ll-eyebrow ll-rv">{content.ritual.eyebrow}</p>
            <h2 className="ll-h2 ll-rv">{content.ritual.title}</h2>
            <span className="ll-rule" aria-hidden="true" />
            <p className="ll-lede ll-rv">{content.ritual.body}</p>
          </div>
          {/* THE RITUAL — scroll-driven frame sequence (pinned scrub). */}
          <div className="ll-film-frame">
            <ScrollFrames
              frames={frames}
              alt="Craftsman hands repointing lime mortar, then a slow pull-back along a restored colonnade to the facade in late-afternoon sun"
              pinDistance="+=120%"
              stageHeight="92svh"
            >
              <p className="ll-film-note">{content.ritual.filmNote}</p>
              <p className="ll-film-caption">{content.ritual.filmCaption}</p>
              <p className="ll-scrub-hint" aria-hidden="true">
                Keep scrolling &mdash; the ritual unfolds frame by frame
              </p>
            </ScrollFrames>
          </div>
        </section>

        {/* JOURNAL */}
        <section id="journal" className="ll-section ll-journal" data-tour="Journal">
          <div className="ll-wrap ll-journal-grid">
            <div>
              <p className="ll-eyebrow ll-rv">{content.journal.eyebrow}</p>
              <h2 className="ll-h2 ll-rv">{content.journal.title}</h2>
              <span className="ll-rule" aria-hidden="true" />
            </div>
            <div className="ll-entries ll-stagger">
              {content.journal.entries.map((e) => (
                <article className="ll-entry" key={e.title}>
                  <p className="ll-entry-date">{e.date}</p>
                  <h3 className="ll-h3">{e.title}</h3>
                  <p className="ll-body">{e.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ENQUIRE */}
        <section id="enquire" className="ll-section ll-enquire" data-tour="Enquire">
          <div className="ll-wrap">
            <div className="ll-enquire-grid">
              <div>
                <p className="ll-eyebrow ll-eyebrow-light ll-rv">{content.enquire.eyebrow}</p>
                <h2 className="ll-h2 ll-h2-light ll-rv">{content.enquire.title}</h2>
                <span className="ll-rule ll-rule-light" aria-hidden="true" />
                <p className="ll-lede ll-lede-light ll-rv">{content.enquire.body}</p>
                <address className="ll-address ll-rv">
                  {content.enquire.address}
                  <br />
                  <a href={phoneHref}>{content.enquire.phone}</a>
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </address>
                <p className="ll-hours ll-rv">{content.enquire.hours}</p>
                <Seal className="ll-rv" />
              </div>
              <div className="ll-rv">
                <EnquireForm email={email} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ll-footer">
        <div className="ll-wrap">
          <p className="ll-footer-line">{content.footer.line}</p>
          <p className="ll-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
