import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import work1Img from './assets/work-1.webp';
import work2Img from './assets/work-2.webp';
import work3Img from './assets/work-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frames (replaces the old autoplay video hero). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-10-playground';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Unbounded:wdth,wght@62..125,200..900&family=Space+Grotesk:wght@400;500;600;700&display=swap';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const SKETCH_IMGS = { 'work-1': work1Img, 'work-2': work2Img, 'work-3': work3Img };

/* ---------------- Overlay nav ---------------- */
function NavOverlay({ open, onClose, brand, reduced }) {
  const rootRef = useRef(null);
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || reduced) return;
    const tl = gsap.timeline({ paused: true });
    tl.set(el, { visibility: 'visible' })
      .fromTo(
        el,
        { clipPath: 'circle(0px at calc(100% - 3rem) 3rem)' },
        { clipPath: 'circle(150% at calc(100% - 3rem) 3rem)', duration: 0.7, ease: 'power4.inOut' }
      )
      .fromTo(
        el.querySelectorAll('.pt-overlay-links a'),
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 },
        '-=0.25'
      );
    tlRef.current = tl;
    tl.eventCallback('onReverseComplete', () => {
      gsap.set(el, { clearProps: 'visibility,clipPath' });
    });
    return () => tl.kill();
  }, [reduced]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.6).reverse();
  }, [open ]);

  return (
    <div ref={rootRef} className={`pt-overlay${open ? ' is-open' : ''}`} aria-hidden={!open}>
      <nav className="pt-overlay-links" aria-label="Overlay">
        {content.nav.map((n) => (
          <a key={n.href} href={n.href} onClick={onClose} tabIndex={open ? 0 : -1}>
            {n.label}
          </a>
        ))}
      </nav>
      <p className="pt-overlay-tag">{brand} — interaction is the content</p>
    </div>
  );
}

/* ---------------- M10 kinetic type field ---------------- */
function KineticField({ reduced, scroller }) {
  const sectionRef = useRef(null);
  const fieldRef = useRef(null);
  const charsRef = useRef([]);
  const energyRef = useRef(0.55);
  const [energy, setEnergy] = useState(55);
  const [coarse] = useState(() =>
    typeof window !== 'undefined' &&
    !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
  );
  const lines = coarse ? ['PLAY', 'PROOF'] : content.hero.lines;

  /* The ONE rAF loop: scroll-velocity scatter + pointer repulsion + spring-back. */
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const field = fieldRef.current;
    if (!section || !field) return;

    const fine = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
    const soft = coarse ? 0.5 : 1; // mobile: gentler field
    const chars = charsRef.current
      .filter(Boolean)
      .map((el) => ({ el, x: 0, y: 0, vx: 0, vy: 0, rot: 0, rv: 0, cx: 0, cy: 0, tf: '' }));

    const measure = () => {
      const fr = field.getBoundingClientRect();
      chars.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        c.cx = r.left - fr.left + r.width / 2;
        c.cy = r.top - fr.top + r.height / 2;
      });
    };
    measure();
    let t1;
    if (document.fonts && document.fonts.ready) {
      t1 = setTimeout(() => document.fonts.ready.then(measure).catch(() => {}), 600);
    }
    const onResize = () => { measure(); scEl = scroller(); };
    window.addEventListener('resize', onResize);

    let px = -9999, py = -9999, smx = -9999, smy = -9999;
    const onMove = (e) => {
      const fr = field.getBoundingClientRect();
      px = e.clientX - fr.left;
      py = e.clientY - fr.top;
    };
    if (fine) section.addEventListener('pointermove', onMove);

    /* Resolve the scroll container once (it was re-resolved — with layout
       reads — on every animation frame). Re-check on resize. */
    let scEl = scroller();
    const getY = () => (scEl === window ? window.scrollY || 0 : scEl.scrollTop || 0);
    let lastY = getY();

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => { visible = entries[0] ? entries[0].isIntersecting : true; },
      { threshold: 0.05 }
    );
    io.observe(section);
    const onVis = () => { if (document.hidden) { /* loop skips below */ } };
    document.addEventListener('visibilitychange', onVis);

    const tick = () => {
      if (!visible || document.hidden) { lastY = getY(); return; }
      const y = getY();
      const sv = clamp(y - lastY, -120, 120);
      lastY = y;

      smx += (px - smx) * 0.12; // rAF lerp 0.12
      smy += (py - smy) * 0.12;

      const e = energyRef.current * soft;
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        if (fine && e > 0.01) {
          const dx = c.cx - smx, dy = c.cy - smy;
          const d = Math.hypot(dx, dy) || 1;
          const R = 210 * (0.5 + e);
          if (d < R) {
            const f = ((1 - d / R) * 30 * e) / d;
            c.vx += dx * f * 0.5;
            c.vy += dy * f * 0.5;
          }
        }
        /* Scroll velocity applies scatter force; letters spring back. */
        const sway = i % 2 === 0 ? 1 : -1;
        c.vx += sv * 0.045 * e * sway;
        c.vy += sv * 0.09 * e;
        /* Spring-back toward rest. */
        c.vx += -c.x * 0.075;
        c.vy += -c.y * 0.075;
        c.vx = clamp(c.vx * 0.88, -46, 46);
        c.vy = clamp(c.vy * 0.88, -46, 46);
        c.x += c.vx;
        c.y += c.vy;
        const rt = clamp(c.vx * 0.5, -20, 20);
        c.rv += (rt - c.rot) * 0.18;
        c.rv *= 0.8;
        c.rot += c.rv;
        /* Settle to exact rest so idle letters stop costing style writes. */
        if (Math.abs(c.x) < 0.01 && Math.abs(c.vx) < 0.01) { c.x = 0; c.vx = 0; }
        if (Math.abs(c.y) < 0.01 && Math.abs(c.vy) < 0.01) { c.y = 0; c.vy = 0; }
        if (Math.abs(c.rot) < 0.01 && Math.abs(c.rv) < 0.01) { c.rot = 0; c.rv = 0; }
        const tf = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0) rotate(${c.rot.toFixed(2)}deg)`;
        if (tf !== c.tf) {
          c.tf = tf;
          c.el.style.transform = tf;
        }
      }
    };
    /* gsap.ticker: same frame as the viewer's smooth scroll (Lenis runs on
       the ticker), so the scroll-velocity scatter reads a fresh position. */
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      if (fine) section.removeEventListener('pointermove', onMove);
      clearTimeout(t1);
    };
  }, [reduced, coarse, scroller]);

  const onSlider = (e) => {
    const v = Number(e.target.value);
    setEnergy(v);
    energyRef.current = v / 100;
  };

  let ci = 0;
  let si = 0;

  return (
    <section id="hero" ref={sectionRef} className="pt-hero" data-tour="The Field">
      <ScrollFrames
        frames={frames}
        alt="Chromatic light ribbons drifting, frame by frame"
        pinDistance="+=170%"
      >
      <div ref={fieldRef} className="pt-field">
        <p className="pt-eyebrow pt-hero-eyebrow">{content.hero.eyebrow}</p>
        <h1 className="pt-kinetic" aria-label={content.hero.lines.join(' ')}>
          {lines.map((line, li) => (
            <span className="pt-line" key={li} aria-hidden="true">
              {line.split('').map((ch) => {
                if (ch === ' ') return <span key={`s${li}-${si++}`} className="pt-ch is-space" />;
                const idx = ci++;
                return (
                  <span key={`${li}-${idx}`} className="pt-chw">
                    <span
                      className="pt-ch"
                      ref={(el) => { charsRef.current[idx] = el; }}
                    >
                      {ch}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <p className="pt-hero-sub">{content.hero.sub}</p>
        <p className="pt-hero-hint">{content.hero.hint}</p>
        {!reduced && (
          <div className="pt-energy">
            <span className="pt-end">{content.hero.sliderMin}</span>
            <label htmlFor="pt-energy">{content.hero.sliderLabel}</label>
            <input
              id="pt-energy"
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={onSlider}
              aria-label={content.hero.sliderLabel}
            />
            <span className="pt-end">{content.hero.sliderMax}</span>
          </div>
        )}
      </div>
      <span className="pt-scrollcue" aria-hidden="true">scroll</span>
      </ScrollFrames>
    </section>
  );
}

/* ---------------- Experiments ---------------- */
function LetterStorm({ reduced }) {
  const wordRef = useRef(null);
  const word = 'STORM';
  const enter = () => {
    if (reduced || !wordRef.current) return;
    gsap.to(wordRef.current.querySelectorAll('.pt-sch'), {
      x: () => gsap.utils.random(-70, 70),
      y: () => gsap.utils.random(-50, 50),
      rotation: () => gsap.utils.random(-40, 40),
      duration: 0.5,
      ease: 'expo.out',
      overwrite: 'auto',
    });
  };
  const leave = () => {
    if (reduced || !wordRef.current) return;
    gsap.to(wordRef.current.querySelectorAll('.pt-sch'), {
      x: 0, y: 0, rotation: 0, duration: 0.8, ease: 'expo.out', overwrite: 'auto',
    });
  };
  return (
    <span
      ref={wordRef}
      className="pt-stormword pt-sketch-layer"
      onPointerEnter={reduced ? undefined : enter}
      onPointerLeave={reduced ? undefined : leave}
      role="img"
      aria-label="The word storm, scattering on hover"
    >
      {word.split('').map((ch, i) => (
        <span className="pt-sch" key={i} aria-hidden="true">{ch}</span>
      ))}
    </span>
  );
}

function Puddle({ reduced }) {
  const gridRef = useRef(null);
  const dotsRef = useRef([]);
  const dots = Array.from({ length: 72 });
  const centers = useRef([]);

  useEffect(() => {
    if (reduced || !gridRef.current) return;
    const grid = gridRef.current;
    const measure = () => {
      const gr = grid.getBoundingClientRect();
      centers.current = dotsRef.current.filter(Boolean).map((d) => {
        const r = d.getBoundingClientRect();
        return { x: r.left - gr.left + r.width / 2, y: r.top - gr.top + r.height / 2 };
      });
    };
    measure();
    window.addEventListener('resize', measure);
    const qts = dotsRef.current.filter(Boolean).map((d) => gsap.quickTo(d, 'scale', { duration: 0.35, ease: 'power2.out', overwrite: 'auto' }));
    const onMove = (e) => {
      const gr = grid.getBoundingClientRect();
      const mx = e.clientX - gr.left, my = e.clientY - gr.top;
      centers.current.forEach((c, i) => {
        const d = Math.hypot(c.x - mx, c.y - my);
        qts[i](clamp(1.7 - d / 110, 0.35, 1.7));
      });
    };
    const onLeave = () => qts.forEach((q) => q(0.35));
    grid.addEventListener('pointermove', onMove);
    grid.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('resize', measure);
      grid.removeEventListener('pointermove', onMove);
      grid.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  return (
    <div ref={gridRef} className="pt-puddle pt-sketch-layer" role="img" aria-label="A grid of dots that ripple away from your pointer">
      {dots.map((_, i) => (
        <span key={i} className="pt-dot" ref={(el) => { dotsRef.current[i] = el; }} aria-hidden="true" />
      ))}
    </div>
  );
}

function VelocityLine({ reduced, scroller }) {
  const lineRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    if (reduced || !lineRef.current || !sketchRef.current) return;
    const st = ScrollTrigger.create({
      trigger: sketchRef.current,
      scroller: scroller(),
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = clamp(self.getVelocity() / -55, -32, 32);
        gsap.to(lineRef.current, { skewX: v, x: v * 2.2, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
      },
      onLeave: () => gsap.to(lineRef.current, { skewX: 0, x: 0, duration: 0.7, ease: 'expo.out' }),
      onLeaveBack: () => gsap.to(lineRef.current, { skewX: 0, x: 0, duration: 0.7, ease: 'expo.out' }),
    });
    return () => st.kill();
  }, [reduced, scroller]);

  return (
    <div ref={sketchRef} style={{ width: '100%' }}>
      <p ref={lineRef} className="pt-veloline pt-sketch-layer" aria-label="Scroll fast to skew this headline">
        Scroll speed <em>is</em> the remote
      </p>
    </div>
  );
}

function ChargePad({ reduced }) {
  const padRef = useRef(null);
  const fillRef = useRef(null);
  const tweenRef = useRef(null);

  const burst = (cx, cy, host) => {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('span');
      p.className = 'pt-particle';
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;
      host.appendChild(p);
      const ang = (Math.PI * 2 * i) / 14 + Math.random() * 0.4;
      const dist = gsap.utils.random(70, 170);
      gsap.to(p, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist,
        scale: 0,
        opacity: 0,
        duration: gsap.utils.random(0.6, 1.1),
        ease: 'expo.out',
        onComplete: () => p.remove(),
      });
    }
  };

  const press = (e) => {
    if (reduced || !padRef.current) return;
    e.preventDefault();
    gsap.to(padRef.current, { scale: 1.06, duration: 0.3, overwrite: 'auto' });
    tweenRef.current = gsap.to(fillRef.current, { scale: 1, duration: 1.2, ease: 'power2.in' });
  };
  const release = (e) => {
    if (reduced || !padRef.current || !fillRef.current) return;
    const prog = tweenRef.current ? tweenRef.current.progress() : 0;
    if (tweenRef.current) tweenRef.current.kill();
    const host = padRef.current.parentElement;
    const pr = padRef.current.getBoundingClientRect();
    const hr = host.getBoundingClientRect();
    const cx = pr.left - hr.left + pr.width / 2;
    const cy = pr.top - hr.top + pr.height / 2;
    if (prog > 0.55) {
      burst(cx, cy, host);
      gsap.to(fillRef.current, { scale: 0, duration: 0.25, ease: 'power2.out' });
    } else {
      gsap.to(fillRef.current, { scale: 0, duration: 0.4, ease: 'power2.out' });
    }
    gsap.to(padRef.current, { scale: 1, duration: 0.5, ease: 'expo.out' });
  };

  return (
    <div
      ref={padRef}
      className="pt-chargepad pt-sketch-layer"
      onPointerDown={reduced ? undefined : press}
      onPointerUp={reduced ? undefined : release}
      onPointerCancel={reduced ? undefined : release}
      onPointerLeave={reduced ? undefined : release}
      onContextMenu={(e) => e.preventDefault()}
      role="button"
      tabIndex={reduced ? -1 : 0}
      aria-label="Press and hold to charge, release to detonate"
    >
      <span ref={fillRef} className="pt-chargefill" aria-hidden="true" />
      <span className="pt-chargelabel">Hold me</span>
    </div>
  );
}

function MarqueeDrag({ reduced }) {
  const stripRef = useRef(null);
  const drag = useRef({ on: false, sx: 0, x: 0, last: 0, vel: 0, t: 0 });
  const setX = useRef(null);

  useEffect(() => {
    if (reduced || !stripRef.current) return;
    setX.current = gsap.quickSetter(stripRef.current, 'x', 'px');
  }, [reduced]);

  const down = (e) => {
    if (reduced || !stripRef.current) return;
    gsap.killTweensOf(stripRef.current);
    const d = drag.current;
    d.on = true; d.sx = e.clientX; d.last = e.clientX; d.vel = 0; d.t = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    const d = drag.current;
    if (!d.on || !setX.current) return;
    const now = performance.now();
    const dx = e.clientX - d.last;
    d.vel = dx / Math.max(1, now - d.t);
    d.t = now; d.last = e.clientX;
    d.x += dx;
    setX.current(d.x);
  };
  const up = () => {
    const d = drag.current;
    if (!d.on || !stripRef.current) return;
    d.on = false;
    const target = d.x + d.vel * 320;
    gsap.to(stripRef.current, {
      x: target,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate() { d.x = gsap.getProperty(stripRef.current, 'x'); },
      onComplete: () => {
        gsap.to(stripRef.current, {
          x: 0, duration: 2.2, ease: 'expo.out', overwrite: 'auto',
          onUpdate() { d.x = gsap.getProperty(stripRef.current, 'x'); },
        });
      },
    });
  };

  const phrase = 'DRAG ME · THROW ME · ';
  return (
    <div
      className="pt-marquee pt-sketch-layer"
      onPointerDown={reduced ? undefined : down}
      onPointerMove={reduced ? undefined : move}
      onPointerUp={reduced ? undefined : up}
      onPointerCancel={reduced ? undefined : up}
      role="img"
      aria-label="A draggable sentence"
    >
      <div ref={stripRef} className="pt-marquee-strip" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>{phrase}<span className="pt-sep">✳</span></span>
        ))}
      </div>
    </div>
  );
}

const SKETCHES = { 'exp-1': LetterStorm, 'exp-2': Puddle, 'exp-3': VelocityLine, 'exp-4': ChargePad, 'exp-5': MarqueeDrag };

function ExperimentCard({ exp, reduced, scroller }) {
  const { img } = useCustom();
  const Sketch = SKETCHES[exp.id];
  return (
    <article className="pt-exp pt-rv" id={exp.id}>
      <div className="pt-exp-meta">
        <p className="pt-exp-index">{exp.index}</p>
        <h3 className="pt-exp-title">{exp.title}</h3>
        <p className="pt-exp-tech">{exp.tech}</p>
        <p className="pt-exp-desc">{exp.description}</p>
        {!reduced && (
          <p className="pt-exp-hint"><strong>Try it:</strong> {exp.playHint}</p>
        )}
      </div>
      <div className="pt-exp-sketch">
        {exp.image && (
          <Img k={exp.image} src={img(exp.image, SKETCH_IMGS[exp.image])} alt={exp.alt} />
        )}
        <Sketch reduced={reduced} scroller={scroller} />
      </div>
    </article>
  );
}

/* ---------------- Type tool ---------------- */
function TypeTool({ reduced }) {
  const [weight, setWeight] = useState(700);
  const [width, setWidth] = useState(100);
  const textRef = useRef(null);

  if (reduced) return null; // tool hidden under reduced motion

  const reset = () => {
    setWeight(700);
    setWidth(100);
    if (textRef.current) textRef.current.textContent = content.typeTool.defaultText;
  };

  return (
    <section id="type" className="pt-type" data-tour="Type toy">
      <div className="pt-wrap">
        <p className="pt-eyebrow pt-rv">{content.typeTool.eyebrow}</p>
        <h2 className="pt-h2 pt-rv">{content.typeTool.title}</h2>
        <p className="pt-body pt-rv">{content.typeTool.body}</p>
        <div
          ref={textRef}
          className="pt-type-canvas pt-rv"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          data-placeholder={content.typeTool.defaultText}
          aria-label="Editable type specimen — type to replace the text"
          style={{ fontVariationSettings: `"wght" ${weight}, "wdth" ${width}` }}
        >
          {content.typeTool.defaultText}
        </div>
        <div className="pt-sliders pt-rv">
          <div className="pt-slider-row">
            <span>{content.typeTool.weightLabel}</span>
            <input
              type="range" min="200" max="900" value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              aria-label={content.typeTool.weightLabel}
            />
            <output>{weight}</output>
          </div>
          <div className="pt-slider-row">
            <span>{content.typeTool.widthLabel}</span>
            <input
              type="range" min="62" max="125" value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              aria-label={content.typeTool.widthLabel}
            />
            <output>{width}</output>
          </div>
        </div>
        <button className="pt-type-reset pt-rv" onClick={reset} type="button">
          {content.typeTool.reset}
        </button>
      </div>
    </section>
  );
}

/* ---------------- Contact form ---------------- */
function WeirdForm({ email }) {
  const f = content.contact.fields;
  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') || 'a stranger';
    const sender = fd.get('email') || '';
    const budget = fd.get('budget') || '';
    const brief = fd.get('brief') || '';
    const subject = `Weird brief from ${name}`;
    const body = `${brief}\n\nBudget: ${budget}\n— ${name}${sender ? ` (${sender})` : ''}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <form className="pt-weird-form pt-rv" onSubmit={submit}>
      <div className="pt-field">
        <label htmlFor="pt-f-name">{f.name}</label>
        <input id="pt-f-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="pt-field">
        <label htmlFor="pt-f-email">{f.email}</label>
        <input id="pt-f-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="pt-field">
        <label htmlFor="pt-f-budget">{f.budget}</label>
        <select id="pt-f-budget" name="budget" defaultValue={content.contact.budgets[1]}>
          {content.contact.budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="pt-field">
        <label htmlFor="pt-f-brief">{f.brief}</label>
        <textarea id="pt-f-brief" name="brief" placeholder={content.contact.briefPlaceholder} required />
      </div>
      <button className="pt-submit" type="submit">{content.contact.submit}</button>
      <p className="pt-contact-note">{content.contact.note}</p>
    </form>
  );
}

/* ---------------- Main component ---------------- */
export default function Design10Playground() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [navOpen, setNavOpen] = useState(false);
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: field fades up, headline wrappers rise. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.pt-hero-eyebrow', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo('.pt-kinetic .pt-chw', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.035 }, 0.2)
        .fromTo('.pt-hero-sub, .pt-hero-hint, .pt-energy', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.9)
        .fromTo('.pt-scrollcue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);

      /* House reveals. */
      gsap.utils.toArray('.pt-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Commercial-proof rows: slight stagger via batch. */
      ScrollTrigger.batch('.pt-case', {
        scroller: sc,
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 }),
      });

    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-10-playground">
      {/* Zero-height sticky layers keep the menu button, the overlay and the
          brandmark pinned to the visible scroll area (the viewer scrolls in a
          panel; position: fixed put them on top of its toolbar). */}
      <div className="pt-topbar">
        <button
          className="pt-navbtn"
          onClick={() => setNavOpen((v) => !v)}
          aria-expanded={navOpen}
          aria-label={navOpen ? 'Close menu' : 'Open menu'}
        >
          {navOpen ? 'CLOSE' : 'MENU'}
        </button>
        <NavOverlay open={navOpen} onClose={() => setNavOpen(false)} brand={name} reduced={reduced} />
      </div>
      <div className="pt-topbar pt-topbar--mark">
        <a className="pt-brandmark" href="#hero" aria-label={`${name} — back to top`}>{name}</a>
      </div>

      <main>
        <KineticField reduced={reduced} scroller={scroller} />

        {/* EXPERIMENTS */}
        <section id="experiments" data-tour="Experiments">
          <div className="pt-wrap pt-exp-head">
            <p className="pt-eyebrow pt-rv">{content.experiments.eyebrow}</p>
            <h2 className="pt-h2 pt-rv">{content.experiments.title}</h2>
            <p className="pt-body pt-rv">{content.experiments.body}</p>
          </div>
          <div className="pt-exp-list">
            {content.experiments.items.map((exp) => (
              <ExperimentCard key={exp.id} exp={exp} reduced={reduced} scroller={scroller} />
            ))}
          </div>
        </section>

        {/* COMMERCIAL PROOF — the footnote */}
        <section id="proof" className="pt-proof" data-tour="The footnote">
          <div className="pt-wrap">
            <div className="pt-proof-head">
              <p className="pt-eyebrow pt-rv">{content.proof.eyebrow}</p>
              <h2 className="pt-h2 pt-rv">{content.proof.title}</h2>
              <p className="pt-body pt-rv">{content.proof.body}</p>
            </div>
            <ul className="pt-cases">
              {content.proof.cases.map((c) => (
                <li className="pt-case" key={c.client}>
                  <span className="pt-case-client">{c.client}</span>
                  <h3 className="pt-case-title">{c.title}</h3>
                  <span className="pt-case-year">{c.year}</span>
                  <span className="pt-case-outcome">{c.outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <TypeTool reduced={reduced} />

        {/* STUDIO */}
        <section id="studio" data-tour="The humans">
          <div className="pt-wrap pt-studio-grid">
            <div>
              <p className="pt-eyebrow pt-rv">{content.studio.eyebrow}</p>
              <h2 className="pt-h2 pt-rv">{content.studio.title}</h2>
              {content.studio.body.map((p, i) => (
                <p className="pt-body pt-rv" key={i}>{p}</p>
              ))}
              <dl className="pt-facts pt-rv">
                {content.studio.facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="pt-studio-figure pt-rv">
              <div className="pt-studio-frame">
                <Img k={content.studio.image} src={img(content.studio.image, detailImg)} alt={content.studio.alt} />
              </div>
              <figcaption>{content.studio.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pt-contact" data-tour="Bring us something weird">
          <div className="pt-wrap pt-contact-grid">
            <div>
              <p className="pt-eyebrow pt-rv">{content.contact.eyebrow}</p>
              <h2 className="pt-h2 pt-rv">{content.contact.title}</h2>
              <p className="pt-body pt-rv">{content.contact.body}</p>
              <a className="pt-contact-email pt-rv" href={`mailto:${email}`}>{email}</a>
            </div>
            <WeirdForm email={email} />
          </div>
        </section>
      </main>

      <footer className="pt-footer">
        <div className="pt-footer-row">
          <p className="pt-footer-line">
            {name.replace('®', '')}<span>®</span> — interaction is the content.
          </p>
          <p className="pt-footer-colophon">{content.footer.colophon}</p>
          <ul className="pt-footer-socials">
            {content.footer.socials.map((s) => (
              <li key={s.label}><a href={s.href}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
