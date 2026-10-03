import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const IMG_SRC = {
  hero: heroImg,
  'product-0': look1Img,
  'product-1': look2Img,
  'product-2': look3Img,
  detail: detailImg,
};

const FONT_ID = 'tpl-font-design-10-avant';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap';

export default function ParadoxAtelier() {
  const { brand, productName, price, contact, currency } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mat, setMat] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', city: '', note: '' });
  const needleRef = useRef(null);
  const threadPathRef = useRef(null);
  const blackoutRef = useRef(null);
  const cursorRef = useRef(null);

  const brandName = brand || content.brand.name;
  const contactEmail = contact.email || content.contact.email;
  const contactPhone = content.contact.phone;

  /* Fonts — injected once, never removed */
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      // the webfont changes text heights: re-measure every trigger once it lands
      l.addEventListener('load', () => {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
      });
      document.head.appendChild(l);
    }
  }, []);

  const goTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const root = rootRef.current;
    const el = root && root.querySelector('#' + id);
    if (!el) return;
    const sc = scroller();
    const lenis = sc && sc.__lenis;
    if (lenis && !reduced) {
      lenis.scrollTo(el, { offset: id === 'hero' ? 0 : -72 });
      return;
    }
    if (sc === window) {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    } else {
      const r = el.getBoundingClientRect();
      const sr = sc.getBoundingClientRect();
      sc.scrollTo({
        top: sc.scrollTop + r.top - sr.top - 72,
        behavior: reduced ? 'auto' : 'smooth',
      });
    }
  };

  /* ---- GSAP: signature motion + threadPath mechanic ---- */
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const sc = scroller();

      /* HERO — weftWipe (inverted), wordRise headline, light-bar sweep */
      gsap.fromTo(
        '.pa-hero__wipe',
        { xPercent: 0 },
        { xPercent: 101, duration: 1.6, ease: 'expo.out', delay: 0.15 }
      );
      gsap.fromTo(
        '.pa-hero .rv-mask > span',
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.55 }
      );
      gsap.fromTo(
        '.pa-hero__fade',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'sine.out', stagger: 0.1, delay: 1.1 }
      );
      gsap.fromTo(
        '.pa-hero__lightbar',
        { opacity: 0, xPercent: -30 },
        { opacity: 1, xPercent: 30, duration: 0.5, ease: 'power2.in', delay: 0.7,
          onComplete: () => gsap.to('.pa-hero__lightbar', { opacity: 0, duration: 0.5 }) }
      );

      /* MANIFESTO — drapeSettle with alternating x-offsets, single light flash */
      gsap.utils.toArray('.pa-manifesto .pa-frag').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -48 : 48, y: 18 },
          {
            opacity: 1, x: 0, y: 0, duration: 1.1,
            ease: i % 2 === 0 ? 'expo.out' : 'sine.inOut',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 82%' },
          }
        );
      });
      ScrollTrigger.create({
        trigger: '.pa-manifesto',
        scroller: sc,
        start: 'top 70%',
        once: true,
        onEnter: () =>
          gsap.fromTo(
            '.pa-flash',
            { opacity: 0 },
            { opacity: 0.08, duration: 0.075, yoyo: true, repeat: 1, ease: 'power1.inOut' }
          ),
      });

      /* THREADPATH — pinned stitched collection (desktop only) */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const path = threadPathRef.current;
        const frames = gsap.utils.toArray('.thread-stage');
        if (!path || !frames.length) return;
        const L = path.getTotalLength();
        const thresholds = frames.map((_, i) => (i * 2 + 1) / 10);
        const settled = new Set();
        const inners = frames.map((f) => f.querySelector('.thread-stage__img'));

        path.style.strokeDasharray = String(L);
        path.style.strokeDashoffset = String(L);
        gsap.set(inners, { y: 30, scale: 1.14 });

        const placeNeedle = (p) => {
          const len = Math.max(0, Math.min(L, L * p));
          const pos = path.getPointAtLength(len);
          const n = needleRef.current;
          if (n) {
            n.style.left = pos.x + '%';
            n.style.top = pos.y + '%';
          }
        };
        placeNeedle(0);

        ScrollTrigger.create({
          trigger: '.pa-thread',
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          scroller: sc,
          onUpdate: (self) => {
            const p = self.progress;
            /* draw the thread + ride the needle */
            path.style.strokeDashoffset = String(L * (1 - p));
            placeNeedle(p);
            /* stitch each frame's border in as the head reaches it */
            frames.forEach((f, i) => {
              if (p >= thresholds[i]) {
                if (!settled.has(i)) {
                  settled.add(i);
                  f.classList.add('is-active');
                  if (inners[i])
                    gsap.fromTo(
                      inners[i],
                      { y: 30, scale: 1.14 },
                      { y: 0, scale: 1.06, duration: 0.7, ease: 'expo.out', overwrite: 'auto' }
                    );
                }
              } else {
                settled.delete(i);
                f.classList.remove('is-active');
                if (inners[i]) gsap.set(inners[i], { y: 30, scale: 1.14 });
              }
            });
          },
        });
        return () => {};
      });

      /* LOOKS — running order rows, hard foldUnfold entrances */
      gsap.utils.toArray('.pa-row').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%' },
          }
        );
      });

      /* PROCESS — drapeSettle reveals + detail foldUnfold */
      gsap.utils.toArray('.pa-process .rv').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? 48 : -48 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 85%' },
          }
        );
      });
      gsap.fromTo(
        '.pa-detail__frame',
        { scaleY: 0 },
        {
          scaleY: 1, transformOrigin: 'top', duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.pa-detail__frame', scroller: sc, start: 'top 80%' },
        }
      );

      /* VIEWINGS — stark entrances */
      gsap.utils.toArray('.pa-viewing .rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'sine.inOut',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 85%' },
          }
        );
      });

      /* THEATRICAL BLACKOUTS — instant to black, 0.2s fade out (max two) */
      const blackout = () => {
        const b = blackoutRef.current;
        if (!b) return;
        gsap.timeline().set(b, { opacity: 1 }).to(b, { opacity: 0, duration: 0.2, ease: 'power1.in' });
      };
      ['#collection', '#visit'].forEach((sel) => {
        ScrollTrigger.create({
          trigger: sel,
          scroller: sc,
          start: 'top 88%',
          onEnter: blackout,
        });
      });

      ScrollTrigger.refresh();
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* ---- Needle-ring cursor: single rAF loop, fine pointers only ---- */
  useEffect(() => {
    if (reduced) return;
    const fine =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    const el = cursorRef.current;
    if (!el) return;
    el.style.display = 'block';
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0, running = true, idle = false;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      // the follow loop sleeps once the ring has caught up; wake it on movement
      if (idle && running) { idle = false; raf = requestAnimationFrame(tick); }
    };
    const onHot = (e) => {
      const t = e.target.closest && e.target.closest('a, button, .thread-stage, .pa-mat');
      el.classList.toggle('is-hot', !!t);
    };
    function tick() {
      if (!running) return;
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) { idle = true; return; }
      raf = requestAnimationFrame(tick);
    }
    const onVis = () => {
      running = !document.hidden;
      if (running) { idle = false; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); }
      else cancelAnimationFrame(raf);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onHot, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHot);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [reduced]);

  const renderStrike = (frag) => {
    const parts = frag.text.split(frag.strike);
    if (parts.length < 2) return frag.text;
    return (
      <>
        {parts[0]}
        <mark className="pa-strike">{frag.strike}</mark>
        {parts.slice(1).join(frag.strike)}
      </>
    );
  };

  const submitForm = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={rootRef} className="tpl-design-10-avant">
      <div ref={cursorRef} className="pa-cursor" aria-hidden="true">
        <span className="pa-cursor__ring" />
        <span className="pa-cursor__dot" />
      </div>
      <div ref={blackoutRef} className="pa-blackout" aria-hidden="true" />
      <div className="pa-flash" aria-hidden="true" />

      {/* NAV — minimal avant-garde: overlay menu, viewing CTA always present */}
      <header className="pa-nav">
        <button type="button" className="pa-wordmark" onClick={goTo('hero')} aria-label={brandName + ' — back to top'}>
          {brandName}
        </button>
        <nav className="pa-nav__links" aria-label="Sections">
          {[
            ['story', 'Manifesto'],
            ['collection', 'Collection'],
            ['gallery', 'Looks'],
            ['craft', 'Process'],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={goTo(id)} className="pa-mono pa-nav__link">
              {label}
            </button>
          ))}
        </nav>
        <div className="pa-nav__right">
          <button type="button" onClick={goTo('visit')} className="pa-cta pa-cta--nav">
            Request a viewing
          </button>
          <button
            type="button"
            className={`pa-burger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* OVERLAY MENU */}
      <div className={`pa-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="pa-menu__links">
          {[
            ['hero', 'The Show', '00'],
            ['story', 'Manifesto', '01'],
            ['collection', 'The Stitched Collection', '02'],
            ['gallery', 'Running Order', '03'],
            ['craft', 'Process', '04'],
            ['visit', 'Private Viewings', '05'],
          ].map(([id, label, no]) => (
            <button key={id} type="button" onClick={goTo(id)} className="pa-menu__link" tabIndex={menuOpen ? 0 : -1}>
              <span className="pa-mono pa-menu__no">{no}</span>
              <span className="pa-menu__label">{label}</span>
            </button>
          ))}
        </nav>
        <div className="pa-menu__foot">
          <button type="button" onClick={goTo('visit')} className="pa-cta" tabIndex={menuOpen ? 0 : -1}>
            Request a viewing
          </button>
          <p className="pa-mono">{contactEmail}</p>
        </div>
      </div>

      {/* HERO — scroll-driven wind-machine frame sequence (pinned scrub) */}
      <section id="hero" data-tour="The Show" className="pa-hero">
        <ScrollFrames frames={frames} alt="Wind Machine — fabric in a wind machine" pinDistance="+=170%" stageHeight="var(--tpl-vh, 100svh)">
          <div className="pa-hero__shade" aria-hidden="true" />
          <div className="pa-hero__wipe" aria-hidden="true" />
          <div className="pa-hero__lightbar" aria-hidden="true" />
          <div className="pa-hero__inner">
          <p className="pa-mono pa-hero__eyebrow pa-hero__fade">{content.hero.eyebrow}</p>
          <h1 className="pa-hero__title">
            <span className="rv-mask"><span>Beautiful</span></span>{' '}
            <span className="rv-mask"><span>is <em>boring.</em></span></span>
          </h1>
          <p className="pa-hero__sub pa-hero__fade">{content.hero.sub}</p>
          <div className="pa-hero__ctas pa-hero__fade">
            <button type="button" onClick={goTo('visit')} className="pa-cta pa-cta--hero">
              {content.hero.cta}
            </button>
            <button type="button" onClick={goTo('story')} className="pa-ghost">
              {content.hero.cta2}
            </button>
          </div>
        </div>
        <p className="pa-mono pa-hero__scroll pa-hero__fade">SCROLL — THE THREAD PULLS</p>
        </ScrollFrames>
      </section>

      {/* MANIFESTO */}
      <section id="story" data-tour="Manifesto" className="pa-manifesto">
        <p className="pa-mono pa-sec-label">{content.manifesto.label}</p>
        <div className="pa-frags">
          {content.manifesto.fragments.map((frag, i) => (
            <p key={i} className="pa-frag">
              <span className="pa-mono pa-frag__no">§{i + 1}</span>
              {renderStrike(frag)}
            </p>
          ))}
        </div>
        <p className="pa-mono pa-manifesto__colophon">{content.manifesto.colophon}</p>
      </section>

      {/* STITCHED COLLECTION — threadPath mechanic */}
      <section id="collection" data-tour="The Stitched Collection" className="pa-thread">
        <div className="pa-thread__pin">
          <div className="pa-thread__head">
            <p className="pa-mono pa-sec-label">{content.collection.label}</p>
            <p className="pa-mono pa-thread__note">{content.collection.note}</p>
          </div>
          <svg
            className="pa-thread__svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={threadPathRef}
              className="pa-thread__path"
              d="M -5,46 C 3,46 5,46 12,46 C 19,46 22,31 31,31 C 40,31 42,52 50,52 C 58,52 61,33 70,33 C 79,33 81,48 89,48 C 96,48 99,48 105,48"
              vectorEffect="non-scaling-stroke"
              style={reduced ? { strokeDasharray: 'none', strokeDashoffset: 0 } : undefined}
            />
          </svg>
          <div
            ref={needleRef}
            className="pa-thread__needle"
            style={reduced ? { left: '100%', top: '48%' } : undefined}
            aria-hidden="true"
          >
            <span />
          </div>
          <div className="pa-thread__frames">
            {content.collection.looks.map((look, i) => (
              <figure
                key={look.code}
                className={`thread-stage pa-frame-${i + 1}${reduced ? ' is-active' : ''}`}
              >
                <svg className="stitch" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="1.5" y="1.5" width="97" height="97" pathLength="100" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="thread-stage__img">
                  <Img k={look.img} src={IMG_SRC[look.img]} alt={look.alt} />
                </div>
                <figcaption className="thread-stage__cap">
                  <span className="pa-mono">LOOK {look.no} · {look.code}</span>
                  <span className="pa-frame__name">{productName(i, look.name)}</span>
                  <span className="pa-mono pa-frame__meta">{look.fabric}</span>
                  <span className="pa-mono pa-frame__price">{price(look.price)}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKS — running order */}
      <section id="gallery" data-tour="Running Order" className="pa-looks">
        <div className="pa-looks__head">
          <p className="pa-mono pa-sec-label">{content.looks.label}</p>
          <h2 className="pa-h2">{content.looks.title}</h2>
        </div>
        <div className="pa-rows">
          {content.looks.rows.map((row, i) => (
            <article key={row.code} className="pa-row">
              <span className="pa-mono pa-row__no">{row.no}</span>
              <div className="pa-row__main">
                <h3 className="pa-row__name">{productName(i, row.name)}</h3>
                <p className="pa-mono pa-row__fabric">{row.fabric} · {row.code}</p>
              </div>
              <span className="pa-mono pa-row__price">{price(row.price)}</span>
              <button type="button" onClick={goTo('visit')} className="pa-row__ask">
                Enquire
              </button>
            </article>
          ))}
        </div>
        <p className="pa-mono pa-looks__note">{content.looks.note}</p>
      </section>

      {/* PROCESS */}
      <section id="craft" data-tour="Process" className="pa-process">
        <p className="pa-mono pa-sec-label">{content.process.label}</p>
        <h2 className="pa-h2 rv">{content.process.title}</h2>
        <p className="pa-lede rv">{content.process.body}</p>
        <div className="pa-process__grid">
          <div className="pa-mats rv" role="tablist" aria-label="Material experiments">
            {content.process.materials.map((m, i) => (
              <button
                key={m.code}
                type="button"
                role="tab"
                aria-selected={mat === i}
                className={`pa-mat${mat === i ? ' is-on' : ''}`}
                onClick={() => setMat(i)}
              >
                <span className="pa-mono pa-mat__code">{m.code}</span>
                <span className="pa-mat__name">{m.name}</span>
              </button>
            ))}
          </div>
          <div className="pa-matstory rv" key={mat}>
            <p className="pa-mono pa-matstory__code">{content.process.materials[mat].code}</p>
            <p className="pa-matstory__name">{content.process.materials[mat].name}</p>
            <p className="pa-matstory__text">{content.process.materials[mat].story}</p>
          </div>
          <figure className="pa-detail rv">
            <div className="pa-detail__frame">
              <Img
                k="detail"
                src={detailImg}
                alt="Macro of burnt and bonded black mesh over acid-dyed fabric with a crimson basting stitch looping across raw edges"
              />
            </div>
            <figcaption className="pa-mono">MAT-01 — BURNT MESH, HELD TO LIGHT</figcaption>
          </figure>
        </div>
        <div className="pa-journal">
          {content.process.journal.map((j) => (
            <div key={j.week} className="pa-journal__row rv">
              <span className="pa-mono pa-journal__week">{j.week}</span>
              <span className="pa-journal__note">{j.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVATE VIEWINGS */}
      <section id="visit" data-tour="Private Viewings" className="pa-viewing">
        <p className="pa-mono pa-sec-label">{content.viewing.label}</p>
        <h2 className="pa-h2 rv">{content.viewing.title}</h2>
        <p className="pa-lede rv">{content.viewing.body}</p>
        <div className="pa-steps">
          {content.viewing.steps.map((s) => (
            <div key={s.no} className="pa-step rv">
              <span className="pa-mono pa-step__no">{s.no}</span>
              <h3 className="pa-step__name">{s.name}</h3>
              <p className="pa-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="pa-formwrap rv">
          {sent ? (
            <p className="pa-form__done">{content.viewing.form.done}</p>
          ) : (
            <form className="pa-form" onSubmit={submitForm}>
              <label className="pa-field">
                <span className="pa-mono">{content.viewing.form.nameLabel}</span>
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" autoComplete="name"
                />
              </label>
              <label className="pa-field">
                <span className="pa-mono">{content.viewing.form.emailLabel}</span>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com" autoComplete="email"
                />
              </label>
              <label className="pa-field">
                <span className="pa-mono">{content.viewing.form.cityLabel}</span>
                <input
                  type="text" required value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Mumbai" autoComplete="address-level2"
                />
              </label>
              <label className="pa-field pa-field--wide">
                <span className="pa-mono">{content.viewing.form.noteLabel}</span>
                <textarea
                  rows="3" value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Look 03 — the crimson cut."
                />
              </label>
              <button type="submit" className="pa-cta pa-cta--form">
                {content.viewing.form.submit}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="pa-footer">
        <p className="pa-footer__frag">{content.footer.fragment}</p>
        <div className="pa-footer__grid">
          <div>
            <p className="pa-mono pa-sec-label">ATELIER</p>
            <p className="pa-footer__brand">{brandName}</p>
            <p className="pa-mono">{content.contact.address}</p>
            <p className="pa-mono">{content.contact.hours}</p>
          </div>
          <div>
            <p className="pa-mono pa-sec-label">WRITE</p>
            <p className="pa-mono"><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
            <p className="pa-mono">{contactPhone}</p>
            <p className="pa-mono">{content.contact.instagram}</p>
          </div>
          <div>
            <p className="pa-mono pa-sec-label">CREDITS</p>
            {content.footer.credits.map((c) => (
              <p key={c} className="pa-mono pa-footer__credit">{c}</p>
            ))}
          </div>
        </div>
        <p className="pa-mono pa-footer__line">{content.footer.line} · Prices in {currency}</p>
      </footer>
    </div>
  );
}
