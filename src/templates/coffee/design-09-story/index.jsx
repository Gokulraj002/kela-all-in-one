import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const IMG = { hero: heroImg, 'product-0': menu1Img, 'product-1': menu2Img, 'product-2': menu3Img, detail: detailImg };

/* Chapter-transition film ("Origin drift") as scroll-scrubbed frames —
   72 stills from the estate drift, advanced frame by frame as the reader scrolls. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

function Words({ text }) {
  const parts = text.split(' ');
  return (
    <span className="t9-hero-title" aria-label={text}>
      {parts.map((w, i) => (
        <span className="w" key={i} aria-hidden="true">
          <span className="wi">{w}</span>{i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

export default function Design09Story() {
  const { brand, price, productName, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const pinRef = useRef(null);
  const barRef = useRef(null);
  const dotsRef = useRef([]);
  const railRef = useRef(null);
  const railCardRefs = useRef([]);
  const stRef = useRef(null);
  const hintRef = useRef(null);
  const diagramRef = useRef(null);

  const brandName = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram || content.contact.instagram;
  /* contact.instagram may be a full profile URL (platform default) or a @handle */
  const igHandle = String(instagram).replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').replace(/\/+$/, '');
  const igHref = 'https://instagram.com/' + igHandle;

  const [methodId, setMethodId] = useState(content.processDiagram.methods[0].id);
  const method = content.processDiagram.methods.find((m) => m.id === methodId);
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  /* fonts */
  useEffect(() => {
    const id = 'tpl-font-design-09-story';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Instrument+Sans:wght@400;500;600&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const scrollToEl = (sel) => {
    const el = rootRef.current && rootRef.current.querySelector(sel);
    if (!el) return;
    // The viewer drives .tpl-scope with Lenis — let it own the smooth scroll.
    const sc = scroller();
    const lenis = sc !== window ? sc.__lenis : null;
    if (lenis && !reduced) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const goChapter = (i) => {
    const st = stRef.current;
    if (!st) { scrollToEl('#story'); return; }
    const n = content.chapters.length;
    const target = st.start + ((i + 0.5) / n) * (st.end - st.start);
    const sc = scroller();
    const lenis = sc !== window ? sc.__lenis : null;
    if (lenis && !reduced) lenis.scrollTo(target);
    else if (sc === window) window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    else sc.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  };

  /* motion */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* hero entrance */
      if (!reduced) {
        gsap.fromTo('.t9-hero-title .wi', { yPercent: 115 }, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.09, delay: 0.2 });
        gsap.fromTo('.t9-hero-eyebrow, .t9-hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15, delay: 0.55 });
        gsap.fromTo('.t9-hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.95 });
        gsap.to('.t9-hero-cta', { scale: 1.06, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1, delay: 1.9 });
        gsap.fromTo('.t9-hero-media img', { scale: 1.09 }, { scale: 1, duration: 2.4, ease: 'power2.out' });
        /* scroll hint: pause the CSS loop offscreen */
        const hint = hintRef.current;
        if (hint) {
          ScrollTrigger.create({
            trigger: '.t9-hero', scroller: scroller(), start: 'top bottom', end: 'bottom top',
            onToggle: (self) => hint.classList.toggle('is-paused', !self.isActive),
          });
        }
      }

      /* house reveals for everything outside the pin */
      if (!reduced) {
        gsap.utils.toArray('.t9-section .rv, .t9-footer .rv, .t9-interlude .rv').forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 36 }, {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%', once: true },
          });
        });
        gsap.utils.toArray('.t9-farmer, .t9-lot').forEach((el) => {
          gsap.fromTo(el.querySelectorAll('img'), { scale: 1.12 }, {
            scale: 1, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 85%', once: true },
          });
        });
      }

      /* pinned chapters — desktop only, ONE pinned ScrollTrigger.
         The origin-lots rail rides the SAME timeline: each chapter tweens the
         rail to its lot, so products flow as the story scrolls. */
      if (!reduced) {
        /* gsap.matchMedia (reverted with this context) so a resize across
           1024px kills/restores the pin instead of leaving it stuck. */
        const mmCh = gsap.matchMedia();
        mmCh.add('(min-width: 1024px)', () => {
        const chapters = gsap.utils.toArray('.t9-chapter');
        const frames = gsap.utils.toArray('.t9-frame');
        const n = chapters.length;
        /* which lot the rail features per chapter (3 lots across 5 chapters) */
        const LOT_AT_CHAPTER = [0, 1, 1, 2, 2];
        const railTrack = railRef.current;
        const railStep = () => {
          const cs = railCardRefs.current;
          return cs[1] && cs[0] ? (cs[1].offsetLeft - cs[0].offsetLeft) : 256;
        };
        if (railTrack) gsap.set(railTrack, { x: 0 });
        /* Hidden (crossfaded-out) chapters leave the accessibility tree too. */
        const syncHidden = () => {
          chapters.forEach((ch) => {
            const hid = ch.style.visibility === 'hidden';
            if (ch.__t9Hidden === hid) return;
            ch.__t9Hidden = hid;
            if (hid) ch.setAttribute('aria-hidden', 'true'); else ch.removeAttribute('aria-hidden');
          });
        };
        /* A chapter taller than the visible stage (the process chapter carries
           the method diagram) is scaled down to fit, never clipped. */
        const fitChapters = () => {
          chapters.forEach((ch) => {
            const inner = ch.querySelector('.t9-chapter-inner');
            if (!inner) return;
            inner.style.transform = '';
            const cs = getComputedStyle(ch);
            const avail = ch.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
            const h = inner.offsetHeight;
            if (avail > 0 && h > avail) inner.style.transform = 'scale(' + Math.max(0.62, avail / h).toFixed(3) + ')';
          });
        };
        const tl = gsap.timeline({ onUpdate: syncHidden });
        chapters.forEach((ch, i) => {
          /* chapter 01 is already on stage when the pin begins (no blank
             text/media column while the story scrolls into view) */
          if (i > 0) {
            tl.fromTo(ch, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i)
              .fromTo(frames[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.inOut' }, i);
          }
          if (railTrack) {
            tl.to(railTrack, {
              x: () => -(railStep() * LOT_AT_CHAPTER[i]),
              duration: 0.5, ease: 'power2.inOut',
            }, i);
          }
          if (i < n - 1) {
            /* the next frame crossfades in ON TOP (later in the DOM) at i + 1;
               this one only drops out once covered — never a dark gap between */
            tl.to(ch, { autoAlpha: 0, y: -70, duration: 0.45, ease: 'power2.in' }, i + 0.62)
              .to(frames[i], { autoAlpha: 0, duration: 0.05, ease: 'none' }, i + 1.5);
          }
        });
        const fill = barRef.current ? barRef.current.querySelector('.t9-progress-fill') : null;
        const st = ScrollTrigger.create({
          trigger: pinRef.current,
          scroller: scroller(),
          start: 'top top',
          end: '+=' + n * 100 + '%',
          pin: true,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
          onRefresh: fitChapters,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.floor(self.progress * n));
            dotsRef.current.forEach((d, di) => { if (d) d.classList.toggle('is-active', di === idx); });
            const lotIdx = LOT_AT_CHAPTER[idx];
            railCardRefs.current.forEach((d, di) => { if (d) d.classList.toggle('is-active', di === lotIdx); });
            if (fill) fill.style.transform = 'scaleX(' + self.progress + ')';
          },
          onToggle: (self) => { if (barRef.current) barRef.current.classList.toggle('is-live', self.isActive); },
        });
        stRef.current = st;
        syncHidden();
        fitChapters();
        return () => {
          stRef.current = null;
          chapters.forEach((ch) => {
            ch.removeAttribute('aria-hidden'); delete ch.__t9Hidden;
            const inner = ch.querySelector('.t9-chapter-inner');
            if (inner) inner.style.transform = '';
          });
        };
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller]);

  /* process diagram transitions (state-driven) */
  useEffect(() => {
    if (reduced || !diagramRef.current) return undefined;
    const t1 = gsap.fromTo(diagramRef.current.querySelectorAll('.t9-diagram-desc, .t9-diagram-notes'),
      { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 });
    const t2 = gsap.fromTo(diagramRef.current.querySelectorAll('.t9-flavor-fill'),
      { scaleX: 0 },
      { scaleX: (i, el) => parseFloat(el.dataset.v || '0'), duration: 0.6, ease: 'power3.out', stagger: 0.05 });
    return () => { t1.kill(); t2.kill(); };
  }, [methodId, reduced]);

  return (
    <div ref={rootRef} className={'tpl-design-09-story' + (reduced ? ' is-reduced' : '')}>
      <div ref={barRef} className="t9-progress" aria-hidden="true"><div className="t9-progress-fill" /></div>

      <nav className="t9-nav" aria-label="Primary">
        <span className="t9-brand">{brandName}</span>
        <ul className="t9-nav-links">
          {content.nav.map((n) => (<li key={n.href}><a href={n.href}>{n.label}</a></li>))}
        </ul>
        <a className="t9-nav-cta" href="#epilogue">Join the journey</a>
      </nav>

      <header id="hero" className="t9-hero" data-tour="Prologue">
        <div className="t9-hero-media">
          <Img k="hero" src={IMG.hero} alt="Terraced coffee estate in the Western Ghats at dawn, mist over the hills" eager />
          <div className="t9-hero-veil" aria-hidden="true" />
        </div>
        <div className="t9-hero-inner">
          <p className="t9-eyebrow t9-hero-eyebrow">{content.hero.eyebrow}</p>
          <Words text={content.hero.title} />
          <p className="t9-hero-sub">{content.hero.sub}</p>
          <button type="button" className="t9-btn t9-hero-cta" onClick={() => scrollToEl('#story')}>{content.hero.cta}</button>
        </div>
        <div ref={hintRef} className="t9-scroll-hint" aria-hidden="true">
          <span>{content.hero.scrollHint}</span><span className="t9-line" />
        </div>
      </header>

      <section id="story" className="t9-story" data-tour="The Story" aria-label="The five chapters">
        <div ref={pinRef} className="t9-pin">
          <div className="t9-story-dots" role="navigation" aria-label="Chapters">
            {content.chapters.map((c, i) => (
              <button
                key={c.id} type="button" ref={(el) => { dotsRef.current[i] = el; }}
                className={'t9-dot' + (i === 0 ? ' is-active' : '')}
                onClick={() => goChapter(i)} aria-label={'Go to chapter ' + c.num + ': ' + c.title}
              ><span>{c.title}</span></button>
            ))}
          </div>

          <div className="t9-pin-grid">
            <div className="t9-media-col" aria-hidden="true">
              {content.chapters.map((c, i) => (
                <figure key={c.id} className={'t9-frame' + (i === 0 ? ' is-first' : '')}>
                  <Img k={c.img} src={IMG[c.img]} alt={c.caption || c.title} />
                  <div className="t9-frame-tint" style={{ background: c.tint }} />
                  <figcaption>{c.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="t9-text-col">
              {content.chapters.map((c, i) => (
                <article key={c.id} className={'t9-chapter' + (i === 0 ? ' is-first' : '')} aria-label={c.label + ': ' + c.title}>
                  <div className="t9-chapter-inner">
                    <figure className="t9-mobile-art">
                      <Img k={c.img} src={IMG[c.img]} alt={c.alt} />
                    </figure>
                    <p className="t9-chapter-num">{c.num}</p>
                    <p className="t9-chapter-label">{c.label}</p>
                    <h2 className="t9-chapter-title">{c.title}</h2>
                    <div className="t9-chapter-body">
                      {c.body.map((p, pi) => (<p key={pi}>{p}</p>))}
                    </div>
                    <blockquote className="t9-quote">
                      <p>{c.quote.text}</p>
                      <cite>{c.quote.by}</cite>
                    </blockquote>
                    <dl className="t9-data">
                      {c.data.map((d) => (<div key={d.k}><dt>{d.k}</dt><dd>{d.v}</dd></div>))}
                    </dl>

                    {c.id === 'process' && (
                      <div ref={diagramRef} className="t9-diagram">
                        <p className="t9-eyebrow">{content.processDiagram.eyebrow}</p>
                        <div className="t9-diagram-tabs" role="tablist" aria-label="Processing methods">
                          {content.processDiagram.methods.map((m) => (
                            <button
                              key={m.id} type="button" role="tab" aria-selected={m.id === methodId}
                              className={'t9-diagram-tab' + (m.id === methodId ? ' is-active' : '')}
                              onClick={() => setMethodId(m.id)}
                            >{m.name}</button>
                          ))}
                        </div>
                        <p className="t9-diagram-tag">{method.tag}</p>
                        <p className="t9-diagram-desc">{method.desc}</p>
                        <div className="t9-flavor-bars">
                          {method.bars.map((b) => (
                            <div className="t9-flavor-row" key={b.label}>
                              <span>{b.label}</span>
                              <div className="t9-flavor-track">
                                <div className="t9-flavor-fill" data-v={b.v} style={{ transform: 'scaleX(' + b.v + ')' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="t9-diagram-notes">{method.notes}</p>
                      </div>
                    )}

                    {i < content.chapters.length - 1 ? (
                      <button type="button" className="t9-next" onClick={() => goChapter(i + 1)}>
                        Continue to chapter {content.chapters[i + 1].num} — {content.chapters[i + 1].title}
                      </button>
                    ) : (
                      <button type="button" className="t9-next" onClick={() => scrollToEl('#people')}>
                        Meet the people
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* origin-lots rail — scrubbed by the same chapter timeline (see motion) */}
          <div className="t9-rail" aria-label="Origin lots, following the chapters">
            <div className="t9-rail-track" ref={railRef}>
              {content.lots.items.map((lot, i) => (
                <button
                  key={lot.name}
                  type="button"
                  ref={(el) => { railCardRefs.current[i] = el; }}
                  className={'t9-rail-card' + (i === 0 ? ' is-active' : '')}
                  onClick={() => scrollToEl('#lots')}
                  aria-label={lot.name + ' — see the lots'}
                >
                  <span className="t9-rail-num">Lot {String(i + 1).padStart(2, '0')}</span>
                  <span className="t9-rail-name">{productName(i, lot.name)}</span>
                  <span className="t9-rail-meta">{lot.process} · {price(lot.price)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- chapter-transition film ("Origin drift") — scroll-scrubbed frames ---------- */}
      <section className="t9-interlude" data-tour="Interlude" aria-label="Interlude film">
        <ScrollFrames
          frames={frames}
          alt="Slow aerial drift over the terraced coffee estate, morning mist moving through the valley"
          pinDistance="+=170%"
        >
          <div className="t9-interlude-veil" aria-hidden="true" />
          <div className="t9-interlude-cap rv">
            <p className="t9-eyebrow">Interlude</p>
            <p className="t9-interlude-line">The valley, holding its breath between chapters.</p>
          </div>
        </ScrollFrames>
      </section>

      <section id="people" className="t9-section" data-tour="The People">
        <div className="t9-section-head rv">
          <p className="t9-eyebrow">{content.people.eyebrow}</p>
          <h2 className="t9-section-title">{content.people.title}</h2>
        </div>
        <div className="t9-farmers">
          {content.people.farmers.map((f) => (
            <article key={f.name} className="t9-farmer rv">
              <span className="t9-farmer-mark" aria-hidden="true">“</span>
              <blockquote>{f.quote}</blockquote>
              <p className="t9-farmer-name">{f.name}</p>
              <p className="t9-farmer-role">{f.role}</p>
              <p className="t9-farmer-detail">{f.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="t9-lots-wrap">
        <section id="lots" className="t9-section" data-tour="Taste the Story">
          <div className="t9-section-head rv">
            <p className="t9-eyebrow">{content.lots.eyebrow}</p>
            <h2 className="t9-section-title">{content.lots.title}</h2>
            <p className="t9-section-sub">{content.lots.sub}</p>
          </div>
          <div className="t9-lots">
            {content.lots.items.map((lot, i) => (
              <article key={lot.name} className="t9-lot rv">
                <span className="t9-lot-img"><Img k={lot.img} src={IMG[lot.img]} alt={lot.alt} /></span>
                <div className="t9-lot-body">
                  <p className="t9-lot-process">{lot.process}</p>
                  <h3 className="t9-lot-name">{productName(i, lot.name)}</h3>
                  <p className="t9-lot-origin">{lot.origin}</p>
                  <p className="t9-lot-notes">{lot.notes}</p>
                  <div className="t9-lot-foot">
                    <span className="t9-lot-price">{price(lot.price)}<span className="t9-lot-unit">{content.lots.unit}</span></span>
                    <a className="t9-lot-btn" href={'mailto:' + email + '?subject=' + encodeURIComponent('Order: ' + lot.name)}>{content.lots.cta}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section id="glossary" className="t9-section" data-tour="Field Notes">
        <div className="t9-section-head rv">
          <p className="t9-eyebrow">{content.glossary.eyebrow}</p>
          <h2 className="t9-section-title">{content.glossary.title}</h2>
        </div>
        <dl className="t9-glossary">
          {content.glossary.terms.map((t) => (
            <div key={t.term} className="t9-term rv"><dt>{t.term}</dt><dd>{t.def}</dd></div>
          ))}
        </dl>
      </section>

      <section id="epilogue" className="t9-epilogue" data-tour="Epilogue">
        <div className="t9-section">
          <div className="rv">
            <p className="t9-eyebrow">{content.epilogue.eyebrow}</p>
            <h2 className="t9-section-title">{content.epilogue.title}</h2>
            <p className="t9-epi-body">{content.epilogue.body}</p>
            {subscribed ? (
              <p className="t9-news-success">{content.epilogue.success}</p>
            ) : (
              <form className="t9-news" onSubmit={(e) => { e.preventDefault(); if (newsEmail.trim()) setSubscribed(true); }}>
                <input type="email" required value={newsEmail} onChange={(e) => setNewsEmail(e.target.value)} placeholder={content.epilogue.placeholder} aria-label={content.epilogue.placeholder} />
                <button type="submit">{content.epilogue.button}</button>
              </form>
            )}
            <p className="t9-news-note">{content.epilogue.note}</p>
          </div>
        </div>
      </section>

      <footer className="t9-footer">
        <div className="t9-footer-grid rv">
          <div>
            <p className="t9-footer-brand">{brandName}</p>
            <p className="t9-section-sub" style={{ color: 'var(--color-sand)', fontSize: '0.9rem' }}>{content.brand.tagline}</p>
          </div>
          <div className="t9-footer-contact">
            <a href={'mailto:' + email}>{email}</a><br />
            <a href={igHref}>@{igHandle}</a><br />
            {content.contact.address}
          </div>
        </div>
        <div className="t9-footer-base">
          <span>{content.footer.line}</span>
          <span>{content.footer.credits}</span>
        </div>
      </footer>
    </div>
  );
}
