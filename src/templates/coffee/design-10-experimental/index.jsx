import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Signature sequence, per SCROLLFRAMES_GUIDE.md — "Emulsion" (72 frames)
   scrubbed by scroll instead of an autoplaying video file. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const IMG = { hero: heroImg, 'product-0': menu2Img, 'product-1': menu1Img, 'product-2': detailImg, detail: menu3Img };
const R_RADII = [32, 46, 60, 74];

function Words({ text, className }) {
  const parts = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {parts.map((w, i) => (
        <span className="w" key={i} aria-hidden="true">
          <span className="wi">{w}</span>{i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

function FlavorRings({ rings, code, ringsRef, reduced }) {
  return (
    <svg ref={ringsRef} className="lab-rings" viewBox="0 0 190 190" role="img" aria-label={'Flavor profile for ' + code}>
      {rings.map((r, i) => {
        const rad = R_RADII[i];
        const c = 2 * Math.PI * rad;
        return (
          <g key={r.label}>
            <circle className="ring-bg" cx="95" cy="95" r={rad} />
            <circle
              className="ring-fg" cx="95" cy="95" r={rad}
              data-c={c} data-v={r.v}
              strokeDasharray={c} strokeDashoffset={reduced ? c * (1 - r.v) : c}
            />
            <text x="95" y={95 - rad - 5} textAnchor="middle">{r.label}</text>
          </g>
        );
      })}
      <text className="ring-center" x="95" y="99" textAnchor="middle">{code}</text>
    </svg>
  );
}

export default function Design10Experimental() {
  const { brand, price, productName, contact, img } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();

  const brandName = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const instagram = contact.instagram || content.contact.instagram;
  /* contact.instagram may be a full profile URL (platform default) or a @handle */
  const igHandle = String(instagram).replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').replace(/\/+$/, '');
  const igHref = 'https://instagram.com/' + igHandle;
  /* wordmark: first word in caps, the rest in the accent — the original lab mark */
  const markSplit = brandName.indexOf(' ');
  const markHead = (markSplit > 0 ? brandName.slice(0, markSplit) : brandName).toUpperCase();
  const markTail = markSplit > 0 ? brandName.slice(markSplit + 1) : '';

  const cursorRef = useRef(null);
  const flashRef = useRef(null);
  const overlayRef = useRef(null);
  const menuBtnRef = useRef(null);
  const navPos = useRef({ x: 0, y: 0 });
  const artRef = useRef(null);
  const ringsRef = useRef(null);
  const stepPanelRef = useRef(null);
  const prevStep = useRef(0);

  const [navOpen, setNavOpen] = useState(false);
  const [methodId, setMethodId] = useState(content.experiment.methods[0].id);
  const method = content.experiment.methods.find((m) => m.id === methodId);

  /* booking state */
  const [sessionId, setSessionId] = useState(content.sessions.types[0].id);
  const [step, setStep] = useState(0);
  const [dateIdx, setDateIdx] = useState(null);
  const [slot, setSlot] = useState(null);
  const [bkName, setBkName] = useState('');
  const [bkEmail, setBkEmail] = useState('');
  const [booked, setBooked] = useState(false);
  const session = content.sessions.types.find((t) => t.id === sessionId);

  const [dates] = useState(() => {
    const dows = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i);
      return { dow: dows[d.getDay()], day: d.getDate(), mon: mons[d.getMonth()] };
    });
  });

  /* fonts */
  useEffect(() => {
    const id = 'tpl-font-design-10-experimental';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Instrument+Sans:wght@400;500;600&display=swap';
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

  /* custom cursor — desktop only, single rAF loop, paused when hidden.
     The same loop also drives the velocity-fling on the experiment menu rows
     (signature): rows lag scroll velocity with x-offset + rotation, then
     spring back when scroll settles. */
  useEffect(() => {
    if (reduced) return undefined;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return undefined;
    const root = rootRef.current;
    const cur = cursorRef.current;
    if (!root || !cur) return undefined;
    root.classList.add('has-cursor');
    let x = -100; let y = -100; let tx = -100; let ty = -100;
    let raf = 0; let running = true;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      const t = e.target;
      cur.classList.toggle('is-hover', !!(t.closest && t.closest('a,button,input,[role="tab"]')));
    };
    /* --- velocity fling setup --- */
    const rows = Array.from(root.querySelectorAll('.lab-menu-row'));
    const sc = scroller();
    const getY = () => (sc === window ? window.scrollY : sc.scrollTop);
    const clampFX = gsap.utils.clamp(-64, 64);
    const clampFR = gsap.utils.clamp(-5, 5);
    let lastY = getY();
    let lv = 0;
    let flingArmed = false;
    let menuInView = false;
    const applied = rows.map(() => ({ x: 0, r: 0 }));
    rows.forEach((el) => { el.style.willChange = 'transform'; });
    const menuEl = root.querySelector('.lab-menu');
    const mio = menuEl
      ? new IntersectionObserver((es) => { menuInView = es.some((e) => e.isIntersecting); }, { threshold: 0.05 })
      : null;
    if (mio && menuEl) mio.observe(menuEl);
    const armST = ScrollTrigger.create({
      trigger: '.lab-menu', scroller: scroller(), start: 'top 90%', once: true,
      onEnter: () => { flingArmed = true; },
    });
    const flingTick = () => {
      const sy = getY();
      const v = sy - lastY;
      lastY = sy;
      if (!flingArmed || !menuInView || !rows.length) return;
      lv += (v - lv) * 0.14;
      if (Math.abs(lv) < 0.5) lv *= 0.9;
      const tX = clampFX(lv * 0.55);
      const tR = clampFR(lv * 0.09);
      rows.forEach((el, i) => {
        if (gsap.isTweening(el)) return; // let the entrance reveal finish first
        const st8 = applied[i];
        const rate = Math.abs(tX) > Math.abs(st8.x) ? 0.22 : 0.09; // fast attack, soft spring-back
        st8.x += (tX - st8.x) * rate;
        st8.r += (tR - st8.r) * rate;
        if (Math.abs(st8.x) < 0.05 && Math.abs(st8.r) < 0.05 && Math.abs(lv) < 0.5) {
          if (st8.x !== 0 || st8.r !== 0) { st8.x = 0; st8.r = 0; el.style.transform = ''; }
          return;
        }
        el.style.transform = 'translate3d(' + st8.x.toFixed(2) + 'px,0,0) rotate(' + st8.r.toFixed(2) + 'deg)';
      });
    };
    const loop = () => {
      if (!running) return;
      x += (tx - x) * 0.15; y += (ty - y) * 0.15;
      cur.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      flingTick();
      raf = requestAnimationFrame(loop);
    };
    const onVis = () => {
      running = !document.hidden;
      if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(loop);
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('visibilitychange', onVis);
      if (mio) mio.disconnect();
      armST.kill();
      rows.forEach((el) => { el.style.transform = ''; el.style.willChange = ''; });
      root.classList.remove('has-cursor');
    };
  }, [reduced, scroller]);

  /* overlay nav open/close */
  const openNav = () => {
    const r = menuBtnRef.current.getBoundingClientRect();
    navPos.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    setNavOpen(true);
  };
  useEffect(() => {
    const ov = overlayRef.current;
    if (!ov) return undefined;
    const ovr = ov.getBoundingClientRect();
    const x = navPos.current.x - ovr.left;
    const y = navPos.current.y - ovr.top;
    let tw;
    if (navOpen) {
      gsap.set(ov, { visibility: 'visible' });
      if (reduced) tw = gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      else tw = gsap.fromTo(ov, { clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }, { clipPath: 'circle(150vmax at ' + x + 'px ' + y + 'px)', duration: 0.7, ease: 'power4.inOut' });
    } else {
      if (reduced) tw = gsap.to(ov, { opacity: 0, duration: 0.25, onComplete: () => gsap.set(ov, { visibility: 'hidden' }) });
      else tw = gsap.to(ov, { clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)', duration: 0.6, ease: 'power4.inOut', onComplete: () => gsap.set(ov, { visibility: 'hidden' }) });
    }
    return () => { if (tw) tw.kill(); };
  }, [navOpen, reduced]);

  /* main motion */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!reduced) {
        /* hero: inverted pour wipe + kinetic wordRise + grain.
           Targets the ScrollFrames stage (the scrubbed "Emulsion" sequence). */
        gsap.fromTo('.lab-hero .sf-stage', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut' });
        gsap.fromTo('.lab-hero-title .wi', { yPercent: 115 }, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12, delay: 0.7 });
        gsap.fromTo('.lab-hero .lab-eyebrow, .lab-hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.12, delay: 1.1 });
        gsap.fromTo('.lab-hero-ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', delay: 1.5 });
        gsap.fromTo('.lab-grain', { opacity: 0 }, { opacity: 0.5, duration: 2, ease: 'sine.out', delay: 0.4 });
        /* ambient drift on the hero stage — pauses offscreen.
           Animates the ScrollFrames stage (inside the pin), never the pin itself. */
        const drift = gsap.to('.lab-hero .sf-stage', { yPercent: 4, duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        ScrollTrigger.create({
          trigger: '.lab-hero', scroller: scroller(), start: 'top bottom', end: 'bottom top',
          onToggle: (self) => { if (self.isActive) drift.play(); else drift.pause(); },
        });

        /* reveals with alternating lab-asymmetry offsets */
        gsap.utils.toArray('.lab-rv, .lab-rv-l, .lab-rv-r').forEach((el) => {
          const x = el.classList.contains('lab-rv-l') ? -48 : (el.classList.contains('lab-rv-r') ? 48 : 0);
          gsap.fromTo(el, { opacity: 0, x, y: x === 0 ? 36 : 0 },
            { opacity: 1, x: 0, y: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%', once: true } });
        });

        /* manifesto: invert flash EXACTLY once, then wordRise */
        ScrollTrigger.create({
          trigger: '.lab-manifesto', scroller: scroller(), start: 'top 75%', once: true,
          onEnter: () => {
            const fl = flashRef.current;
            gsap.fromTo(fl, { opacity: 0 }, { opacity: 0.08, duration: 0.075, yoyo: true, repeat: 1, onComplete: () => gsap.set(fl, { opacity: 0 }) });
            gsap.fromTo('.lab-manifesto .wi', { yPercent: 115 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.06, delay: 0.15 });
          },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller]);

  /* method picker transition: liquid wipe + data rise + flavor-ring redraw */
  useEffect(() => {
    if (reduced) return undefined;
    const art = artRef.current;
    const tweens = [];
    if (art) {
      tweens.push(gsap.fromTo(art, { clipPath: 'inset(55% 6% 55% 6%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' }));
      tweens.push(gsap.fromTo(art.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 1.1, ease: 'power2.out' }));
    }
    tweens.push(gsap.fromTo(rootRef.current.querySelectorAll('.lab-method-meta'),
      { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07, delay: 0.25 }));
    const circles = ringsRef.current ? ringsRef.current.querySelectorAll('.ring-fg') : [];
    circles.forEach((c, i) => {
      const C = parseFloat(c.dataset.c); const v = parseFloat(c.dataset.v);
      tweens.push(gsap.fromTo(c, { strokeDashoffset: C }, { strokeDashoffset: C * (1 - v), duration: 1.2, ease: 'power2.inOut', delay: 0.2 + i * 0.08 }));
    });
    return () => tweens.forEach((t) => t.kill());
  }, [methodId, reduced]);

  /* booking stepper transitions */
  useEffect(() => {
    if (reduced || !stepPanelRef.current) { prevStep.current = step; return undefined; }
    const dir = step >= prevStep.current ? 1 : -1;
    prevStep.current = step;
    const tw = gsap.fromTo(stepPanelRef.current, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
    return () => tw.kill();
  }, [step, reduced]);

  const sel = method;
  const canNext1 = dateIdx !== null && slot !== null;
  const canConfirm = bkName.trim() !== '' && /.+@.+\..+/.test(bkEmail);

  return (
    <div ref={rootRef} className="tpl-design-10-experimental">
      <div ref={cursorRef} className="lab-cursor" aria-hidden="true" />
      <div className="lab-grain" aria-hidden="true" />
      <div ref={flashRef} className="lab-flash" aria-hidden="true" />

      <nav className="lab-nav" aria-label="Primary">
        <a className="lab-wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToEl('#hero'); }}>{markHead}{markTail ? <> <em>{markTail}</em></> : null}</a>
        <span className="lab-nav-protocol">{content.nav.protocol}</span>
        <div className="lab-nav-right">
          <button type="button" className="lab-book" onClick={() => scrollToEl('#sessions')}>{content.nav.book}</button>
          <button ref={menuBtnRef} type="button" className="lab-menu-btn" onClick={openNav} aria-label="Open menu" aria-expanded={navOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div ref={overlayRef} className="lab-overlay" aria-hidden={!navOpen}>
        <button type="button" className="lab-overlay-close" onClick={() => setNavOpen(false)} aria-label="Close menu">Close</button>
        <ul className="lab-overlay-links">
          {content.nav.links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={(e) => { e.preventDefault(); setNavOpen(false); scrollToEl(l.href); }} tabIndex={navOpen ? 0 : -1}>{l.label}</a></li>
          ))}
        </ul>
        <p className="lab-overlay-meta">{content.footer.credits}</p>
      </div>

      <header id="hero" className="lab-hero" data-tour="The Experiment">
        <ScrollFrames
          frames={frames}
          alt="A drop of coffee blooming in dark water, persimmon light raking across the emulsion"
          pinDistance="+=170%"
        >
          <div className="lab-hero-veil" aria-hidden="true" />
          <span className="lab-batch-tag" aria-hidden="true">Series 09 — Batch 047/050 — Live</span>
          <div className="lab-hero-inner">
          <p className="lab-eyebrow">{content.hero.eyebrow}</p>
          <Words text={content.hero.title} className="lab-hero-title" />
          <p className="lab-hero-sub">{content.hero.sub}</p>
          <div className="lab-hero-ctas">
            <button type="button" className="lab-book" onClick={() => scrollToEl('#sessions')}>{content.hero.cta}</button>
            <button type="button" className="lab-ghost" onClick={() => scrollToEl('#experiment')}>{content.hero.secondary}</button>
          </div>
        </div>
        </ScrollFrames>
      </header>

      <section id="experiment" className="lab-section" data-tour="The Protocol">
        <div className="lab-section-head">
          <p className="lab-eyebrow lab-rv">{content.experiment.eyebrow}</p>
          <h2 className="lab-section-title lab-rv-l">Four methods. <em>Zero routine.</em></h2>
          <p className="lab-section-sub lab-rv">{content.experiment.sub}</p>
        </div>

        <div className="lab-tabs lab-rv" role="tablist" aria-label="Brewing methods">
          {content.experiment.methods.map((m) => (
            <button
              key={m.id} type="button" role="tab" aria-selected={m.id === methodId}
              className={'lab-tab' + (m.id === methodId ? ' is-active' : '')}
              onClick={() => setMethodId(m.id)}
            >
              <span className="lab-tab-code">{m.code} · {m.batch}</span>
              <span className="lab-tab-name">{m.name}</span>
            </button>
          ))}
        </div>

        <div className="lab-panel">
          <figure ref={artRef} className="lab-art">
            <Img k={sel.img} src={IMG[sel.img]} alt={sel.alt} />
            <figcaption>{sel.batch} · Fig. {sel.code}</figcaption>
          </figure>
          <div>
            <p className="lab-method-code lab-method-meta">{sel.code} — {sel.batch}</p>
            <h3 className="lab-method-name lab-method-meta">{sel.name}</h3>
            <p className="lab-method-desc lab-method-meta">{sel.desc}</p>
            <dl className="lab-specs lab-method-meta">
              <div className="lab-spec"><dt>Temp</dt><dd>{sel.temp}</dd></div>
              <div className="lab-spec"><dt>Time</dt><dd>{sel.time}</dd></div>
              <div className="lab-spec"><dt>Ratio</dt><dd>{sel.ratio}</dd></div>
            </dl>
            <div className="lab-rings-wrap lab-method-meta">
              <FlavorRings rings={sel.rings} code={sel.code} ringsRef={ringsRef} reduced={reduced} />
              <p className="lab-method-note">{sel.note}</p>
            </div>
          </div>
        </div>

        <div className="lab-menu">
          <h3 className="lab-section-title lab-rv" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', margin: '3rem 0 1rem' }}>{content.experiment.menuTitle}</h3>
          {content.experiment.menu.map((item, i) => (
            <div key={item.name} className="lab-menu-row lab-rv">
              <span className="lab-menu-batch">{item.batch}</span>
              <div>
                <h4 className="lab-menu-name">{productName(i, item.name)}</h4>
                <p className="lab-menu-desc">{item.desc}</p>
              </div>
              <span className="lab-menu-price">{price(item.price)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="sensory" className="lab-section" data-tour="Sensory Language">
        <div className="lab-section-head">
          <p className="lab-eyebrow lab-rv">{content.sensory.eyebrow}</p>
          <h2 className="lab-section-title lab-rv-r">We describe flavour <em>the way it arrives.</em></h2>
        </div>
        <div className="lab-sensory-grid">
          <div>
            {content.sensory.cards.map((c) => (
              <article key={c.title} className="lab-sense-card lab-rv">
                <p className="lab-sense-label">{c.label}</p>
                <h3 className="lab-sense-title">{c.title}</h3>
                <p className="lab-sense-body">{c.body}</p>
              </article>
            ))}
          </div>
          <figure className="lab-sense-fig lab-rv-r">
            <Img k={content.sensory.img} src={IMG[content.sensory.img]} alt={content.sensory.alt} />
            <figcaption>{content.sensory.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section id="sessions" className="lab-section" data-tour="Sessions">
        <div className="lab-section-head">
          <p className="lab-eyebrow lab-rv">{content.sessions.eyebrow}</p>
          <h2 className="lab-section-title lab-rv-l">Book a seat <em>at the bench.</em></h2>
          <p className="lab-section-sub lab-rv">{content.sessions.sub}</p>
        </div>

        <div className="lab-types">
          {content.sessions.types.map((t, i) => (
            <button
              key={t.id} type="button"
              className={'lab-type lab-rv' + (t.id === sessionId ? ' is-selected' : '')}
              onClick={() => { setSessionId(t.id); scrollToEl('#booker'); }}
              aria-pressed={t.id === sessionId}
            >
              <p className="lab-type-dur">{t.dur}</p>
              <h3 className="lab-type-name">{productName(i + 4, t.name)}</h3>
              <p className="lab-type-desc">{t.desc}</p>
              <span className="lab-type-price">{price(t.price)}</span>
            </button>
          ))}
        </div>

        <div id="booker" className="lab-booker lab-rv">
          {booked ? (
            <div>
              <h3 className="lab-success-title">{content.sessions.successTitle}</h3>
              <p className="lab-success-body">{content.sessions.successBody}</p>
              <p className="lab-summary" style={{ marginTop: '1.5rem' }}>
                <strong>{session.name}</strong> · {dates[dateIdx] ? dates[dateIdx].dow + ' ' + dates[dateIdx].day + ' ' + dates[dateIdx].mon : ''} · {slot} · {price(session.price)}
              </p>
            </div>
          ) : (
            <React.Fragment>
              <div className="lab-steps" aria-label="Booking steps">
                {content.sessions.steps.map((s, i) => (
                  <span key={s} className={'lab-step' + (i === step ? ' is-on' : '')}>{'0' + (i + 1)} · {s}</span>
                ))}
              </div>
              <div ref={stepPanelRef} className="lab-step-panel">
                {step === 0 && (
                  <div>
                    <p className="lab-summary">Choose your session:</p>
                    <div className="lab-slot-grid">
                      {content.sessions.types.map((t) => (
                        <button key={t.id} type="button" className={'lab-slot' + (t.id === sessionId ? ' is-selected' : '')} onClick={() => setSessionId(t.id)}>
                          {t.name} · {price(t.price)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <p className="lab-summary">Pick a day, then a bench time:</p>
                    <div className="lab-date-grid" role="group" aria-label="Dates">
                      {dates.map((d, i) => (
                        <button key={i} type="button" className={'lab-date' + (dateIdx === i ? ' is-selected' : '')} onClick={() => setDateIdx(i)}>
                          <small>{d.dow}</small><strong>{d.day}</strong><small>{d.mon}</small>
                        </button>
                      ))}
                    </div>
                    <div className="lab-slot-grid" role="group" aria-label="Times">
                      {content.sessions.slots.map((s) => (
                        <button key={s} type="button" className={'lab-slot' + (slot === s ? ' is-selected' : '')} onClick={() => setSlot(s)}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <p className="lab-summary">
                      <strong>{session.name}</strong> · {dates[dateIdx] ? dates[dateIdx].dow + ' ' + dates[dateIdx].day + ' ' + dates[dateIdx].mon : ''} · {slot} · {price(session.price)}
                    </p>
                    <label className="lab-field"><span>{content.sessions.nameLabel}</span>
                      <input value={bkName} onChange={(e) => setBkName(e.target.value)} placeholder="Ada Lovelace" autoComplete="name" />
                    </label>
                    <label className="lab-field"><span>{content.sessions.emailLabel}</span>
                      <input type="email" value={bkEmail} onChange={(e) => setBkEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
                    </label>
                  </div>
                )}
              </div>
              <div className="lab-booker-nav">
                {step > 0 && <button type="button" className="lab-ghost" onClick={() => setStep(step - 1)}>{content.sessions.back}</button>}
                {step < 2 && (
                  <button type="button" className="lab-book" disabled={step === 1 && !canNext1} style={step === 1 && !canNext1 ? { opacity: 0.4 } : undefined} onClick={() => setStep(step + 1)}>
                    {step === 0 ? 'Choose date & time' : 'Your details'}
                  </button>
                )}
                {step === 2 && (
                  <button type="button" className="lab-book" disabled={!canConfirm} style={!canConfirm ? { opacity: 0.4 } : undefined} onClick={() => setBooked(true)}>
                    {content.sessions.confirm} · {price(session.price)}
                  </button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>

        <div className="lab-faq">
          <h3 className="lab-section-title lab-rv" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>{content.sessions.faqTitle}</h3>
          {content.sessions.faq.map((f) => (
            <div key={f.q} className="lab-faq-item lab-rv">
              <h4 className="lab-faq-q">{f.q}</h4>
              <p className="lab-faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="manifesto" className="lab-section lab-manifesto" data-tour="Manifesto">
        <p className="lab-eyebrow">The manifesto · v9.3</p>
        <h2 className="lab-section-title" aria-label={content.manifesto.lines.join(' ')}>
          {content.manifesto.lines.map((line, i) => (
            <span key={i} style={{ display: 'block', overflow: 'hidden' }} aria-hidden="true">
              <Words text={line} className="" />
            </span>
          ))}
        </h2>
        <p className="lab-manifesto-sign">{content.manifesto.sign}</p>
      </section>

      <footer className="lab-footer">
        <div className="lab-footer-grid lab-rv">
          <div>
            <p className="lab-footer-frag">{content.footer.fragment}</p>
            <p className="lab-nav-protocol">{brandName}</p>
          </div>
          <div className="lab-footer-contact">
            <a href={'mailto:' + email}>{email}</a><br />
            <a href={igHref}>@{igHandle}</a><br />
            {content.contact.address} · {content.contact.hours}
          </div>
        </div>
        <div className="lab-footer-base">
          <span>{content.footer.line}</span>
          <span>{content.footer.credits}</span>
        </div>
      </footer>
    </div>
  );
}
