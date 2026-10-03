import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import menu1Img from './assets/menu-1.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence for the ritual moment (frame-001…frame-072,
   extracted from the signature loop). Zero-padded names sort naturally. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const STEP_IDS = ['method', 'coffee', 'amount', 'grind', 'frequency'];

/* Word-mask split for wordRise headlines (server-safe, JSX-side). */
function Words({ text }) {
  const parts = text.split(' ');
  return (
    <span aria-label={text}>
      {parts.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true"><span className="wi">{w}</span></span>
          {i < parts.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

/* Brand wordmark: last word set in the italic accent, as the original mark. */
function Wordmark({ name }) {
  const i = name.lastIndexOf(' ');
  if (i <= 0) return name;
  return (<>{name.slice(0, i)} <em>{name.slice(i + 1)}</em></>);
}

function priceFor(plan) {
  const coffee = content.builder.coffees.find((c) => c.id === plan.coffee);
  const amount = content.builder.amounts.find((a) => a.id === plan.amount);
  const freq = content.builder.frequencies.find((f) => f.id === plan.frequency);
  const base = (coffee ? coffee.price : 0) * (amount ? amount.mult : 1);
  return Math.round(base * (1 - (freq ? freq.discount : 0)));
}

function firstDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function Design07Subscription() {
  const { brand, price, currency, contact, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const brandName = brand || content.brand.name;

  const [plan, setPlan] = useState({ method: 'filter', coffee: 'chorus', amount: '250', grind: 'whole', frequency: 'fortnightly' });
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [done, setDone] = useState(false);
  /* narrow screens: the ritual film is the only thing in its column, so it
     fills the stage while pinned instead of leaving a blank band below it */
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const panelRef = useRef(null);
  const dirRef = useRef(1);
  const stepRef = useRef(0);
  const priceRef = useRef(null);
  const priceObj = useRef({ v: priceFor({ method: 'filter', coffee: 'chorus', amount: '250', grind: 'whole', frequency: 'fortnightly' }) });
  const priceTween = useRef(null);
  const dateRef = useRef(null);
  const segRefs = useRef([]);
  const quizBarRef = useRef(null);
  const pulseRef = useRef(null);
  const target = useMemo(() => priceFor(plan), [plan]);
  const delivery = useMemo(() => firstDeliveryDate(), []);

  /* ---- fonts (once) ---- */
  useEffect(() => {
    const id = 'tpl-font-design-07-subscription';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  const scrollToId = (id) => {
    const el = rootRef.current && rootRef.current.querySelector('#' + id);
    if (!el) return;
    // The viewer drives .tpl-scope with Lenis — let it own the smooth scroll
    // instead of fighting a native smooth scrollIntoView.
    const sc = scroller();
    const lenis = sc !== window ? sc.__lenis : null;
    if (lenis && !reduced) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  /* ---- directional step change: forward slides left, back slides right.
         Mid-tween changes are cancelled cleanly via overwrite:'auto'. ---- */
  const goStep = (next) => {
    if (next === stepRef.current || next < 0 || next >= STEP_IDS.length) return;
    dirRef.current = next > stepRef.current ? 1 : -1;
    stepRef.current = next;
    setStep(next);
  };

  const choose = (key, value) => {
    setPlan((p) => ({ ...p, [key]: value }));
    const next = stepRef.current + 1;
    if (next < STEP_IDS.length) {
      // small beat, then advance — keeps the funnel moving
      setTimeout(() => goStep(next), reduced ? 0 : 260);
    }
  };

  /* step panel enter animation (directional), killed cleanly on rapid changes */
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (reduced) { gsap.set(panel, { x: 0, opacity: 1 }); return; }
    const tw = gsap.fromTo(
      panel,
      { x: dirRef.current * 56, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' }
    );
    return () => { tw.kill(); };
  }, [step, reduced]);

  /* step progress segments (roastProgress, step-driven) */
  useLayoutEffect(() => {
    if (reduced) {
      segRefs.current.forEach((el, i) => { if (el) gsap.set(el, { scaleX: i <= step ? 1 : 0 }); });
      return;
    }
    segRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i < step) gsap.to(el, { scaleX: 1, duration: 0.2, overwrite: 'auto' });
      else if (i === step) gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      else gsap.to(el, { scaleX: 0, duration: 0.2, overwrite: 'auto' });
    });
  }, [step, reduced]);

  /* live numeric price tween — killed and restarted on every change */
  useLayoutEffect(() => {
    const node = priceRef.current;
    if (!node) return;
    if (reduced) { priceObj.current.v = target; node.textContent = price(target); return; }
    if (priceTween.current) priceTween.current.kill();
    priceTween.current = gsap.to(priceObj.current, {
      v: target,
      duration: 0.5,
      ease: 'power2.out',
      snap: { v: 1 },
      overwrite: true,
      onUpdate: () => { node.textContent = price(Math.round(priceObj.current.v)); },
      onComplete: () => { node.textContent = price(target); },
    });
    return () => { if (priceTween.current) priceTween.current.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);

  /* first-delivery date y-roll on frequency change */
  const freqId = plan.frequency;
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    if (reduced || !dateRef.current) return;
    gsap.fromTo(dateRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  }, [freqId, reduced]);

  /* quiz progress (roastProgress, step-driven) */
  useLayoutEffect(() => {
    if (!quizBarRef.current) return;
    const pct = answers.length / content.quiz.questions.length;
    if (reduced) { gsap.set(quizBarRef.current, { scaleX: pct }); return; }
    gsap.to(quizBarRef.current, { scaleX: pct, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }, [answers.length, reduced]);

  /* ---- 3D tilt on scroll velocity (signature): coffee + plan cards tilt
         with lerped scroll velocity and ease back to flat when idle.
         One rAF loop, paused offscreen; static on reduced-motion and touch. ---- */
  useLayoutEffect(() => {
    if (reduced) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const root = rootRef.current;
    if (!root) return undefined;
    const cards = Array.from(root.querySelectorAll('.lineup-card, .opt'));
    if (!cards.length) return undefined;
    root.classList.add('has-tilt');
    const sc = scroller();
    const getY = () => (sc === window ? window.scrollY : sc.scrollTop);
    const clampRX = gsap.utils.clamp(-10, 10);
    const clampRY = gsap.utils.clamp(-6, 6);
    let last = getY();
    let lv = 0; let cx = 0; let cy = 0; let raf = 0;
    let inView = true;
    const zones = ['#lineup', '#builder'].map((s) => root.querySelector(s)).filter(Boolean);
    const io = new IntersectionObserver((es) => { inView = es.some((e) => e.isIntersecting); }, { threshold: 0 });
    zones.forEach((z) => io.observe(z));
    cards.forEach((el) => gsap.set(el, { transformPerspective: 900 }));
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const y = getY();
      const v = y - last;
      last = y;
      if (!inView || document.hidden) return;
      lv += (v - lv) * 0.12;
      if (Math.abs(lv) < 0.4) lv *= 0.9;
      const tX = clampRX(-lv * 0.09);
      const tY = clampRY(lv * 0.045);
      cx += (tX - cx) * 0.16;
      cy += (tY - cy) * 0.16;
      if (Math.abs(cx) < 0.02 && Math.abs(cy) < 0.02 && Math.abs(lv) < 0.4) {
        if (cx !== 0 || cy !== 0) {
          cx = 0; cy = 0;
          cards.forEach((el) => gsap.set(el, { rotationX: 0, rotationY: 0 }));
        }
        return;
      }
      cards.forEach((el) => gsap.set(el, { rotationX: cx, rotationY: cy }));
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.classList.remove('has-tilt');
      cards.forEach((el) => gsap.set(el, { clearProps: 'transform' }));
    };
  }, [step, reduced, scroller, rootRef]);

  /* ---- scroll motion ---- */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      /* hero wordRise */
      gsap.fromTo('.hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07, delay: 0.15 });
      gsap.fromTo('.hero-fade',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.55 });
      /* house reveals */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 88%', once: true },
        });
      });
      /* image blooms */
      gsap.utils.toArray('.rv-img').forEach((el) => {
        const inner = el.querySelector('img');
        gsap.fromTo(el, { clipPath: 'inset(10% 6% 10% 6% round 24px)' }, {
          clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 85%', once: true },
        });
        if (inner) {
          gsap.fromTo(inner, { scale: 1.12 }, {
            scale: 1, duration: 1.4, ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: scroller(), start: 'top 85%', once: true },
          });
        }
      });
      /* how-it-works dashed connector draw */
      const connector = rootRef.current.querySelector('.how-connector path');
      if (connector) {
        const len = connector.getTotalLength();
        gsap.fromTo(connector, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: { trigger: '.how-grid', scroller: scroller(), start: 'top 75%', once: true },
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* hero CTA card glow pulse — fades a pre-painted glow layer (opacity only,
     no per-frame box-shadow repaint), pauses offscreen */
  useEffect(() => {
    if (reduced || !pulseRef.current) return;
    const el = pulseRef.current;
    const tween = gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1,
      duration: 1.25, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true,
    });
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) tween.play(); else tween.pause(); }, { threshold: 0.2 });
    io.observe(el);
    const onVis = () => { if (document.hidden) tween.pause(); else tween.play(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); tween.kill(); };
  }, [reduced]);

  /* ---- derived view data ---- */
  const coffee = content.builder.coffees.find((c) => c.id === plan.coffee);
  const amount = content.builder.amounts.find((a) => a.id === plan.amount);
  const grind = content.builder.grinds.find((g) => g.id === plan.grind);
  const frequency = content.builder.frequencies.find((f) => f.id === plan.frequency);
  const saving = frequency && frequency.discount > 0
    ? `You save ${price(Math.round(coffee.price * amount.mult * frequency.discount))} every delivery`
    : '';
  const currentCoffeePrice = coffee ? coffee.price : 0;
  const stepDef = [
    { key: 'method', q: 'How do you brew?', hint: 'We will grind to match your brewer.', options: content.builder.methods },
    { key: 'coffee', q: 'Pick your coffee', hint: 'Roasted the day it ships.', options: content.builder.coffees, priced: true },
    { key: 'amount', q: 'How much per delivery?', hint: 'One cup is roughly 16 g of coffee.', options: content.builder.amounts },
    { key: 'grind', q: 'Whole bean or ground?', hint: 'Whole bean stays fresher, longer.', options: content.builder.grinds },
    { key: 'frequency', q: 'How often should it arrive?', hint: 'Pause, skip, or cancel anytime.', options: content.builder.frequencies, tagged: true },
  ][step];

  const quizDone = answers.length === content.quiz.questions.length;
  const quizResult = quizDone ? content.quiz.results[(answers[0] + answers[1] + answers[2]) % 3] : null;
  const email = contact.email || content.contact.email;
  const insta = contact.instagram;

  const pickQuiz = (qi, oi) => {
    const next = [...answers, oi];
    setAnswers(next);
    if (qi < content.quiz.questions.length - 1) setQuizIdx(qi + 1);
  };

  const applyQuiz = () => {
    if (!quizResult) return;
    const match = content.builder.coffees.find((c) => c.label === quizResult.coffee);
    if (match) setPlan((p) => ({ ...p, coffee: match.id }));
    dirRef.current = 1;
    stepRef.current = 1;
    setStep(1);
    scrollToId('builder');
  };

  return (
    <div ref={rootRef} className="tpl-design-07-subscription">
      {/* ---------- nav ---------- */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
            <Wordmark name={brandName} />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); scrollToId(n.href.slice(1)); }}>{n.label}</a>
            ))}
          </nav>
          <button className="btn" type="button" onClick={() => scrollToId('builder')} style={{ padding: '11px 22px', fontSize: '0.9rem' }}>
            {content.hero.cta}
          </button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section id="hero" className="hero" data-tour="The Promise">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow hero-fade">{content.hero.eyebrow}</p>
            <h1 className="hero-title"><Words text={content.hero.title} /></h1>
            <p className="hero-sub hero-fade">{content.hero.sub}</p>
            <div className="hero-ctas hero-fade">
              <button className="btn" type="button" onClick={() => scrollToId('builder')}>{content.hero.cta}</button>
              <button className="btn btn-ghost" type="button" onClick={() => scrollToId('quiz')}>{content.hero.ctaSecondary}</button>
            </div>
            <p className="hero-reassure hero-fade">{content.hero.reassurance}</p>
          </div>
          <div className="hero-media">
            <div className="hero-frame rv-img">
              <Img k="hero" src={heroImg} alt={`A hand lifting a forest-green coffee bag from a ${brandName} subscription box on a sunlit kitchen counter`} eager />
            </div>
            <div className="cta-card">
              <span className="cta-glow" ref={pulseRef} aria-hidden="true" />
              <h3>Your first box ships in 48 hours</h3>
              <p>Fresh roast, tasting card inside, pause anytime.</p>
              <button className="btn" type="button" onClick={() => scrollToId('builder')}>{content.hero.cta}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- how it works ---------- */}
      <section id="how" className="section" data-tour="How It Works">
        <div className="how">
          <div className="wrap how-inner">
            <p className="eyebrow rv">{content.how.eyebrow}</p>
            <h2 className="sec-title rv">{content.how.title}</h2>
            <div className="how-grid">
              <svg className="how-connector" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 24 12 C 340 2, 860 22, 1176 12" fill="none" style={{ stroke: 'var(--color-accent)' }} strokeWidth="3" strokeLinecap="round" />
              </svg>
              {content.how.steps.map((s, i) => (
                <div className="how-card rv" key={s.title}>
                  <span className="how-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- plan builder ---------- */}
      <section id="builder" className="section" data-tour="Build Your Plan" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.builder.eyebrow}</p>
          <h2 className="sec-title rv">{content.builder.title}</h2>
          <p className="sec-sub rv">{content.builder.sub}</p>

          <div className="builder-panel rv">
            <div>
              <div className="stepbar" aria-hidden="true">
                {STEP_IDS.map((id, i) => (
                  <span className="seg" key={id}><i ref={(el) => { segRefs.current[i] = el; }} /></span>
                ))}
              </div>
              <div ref={panelRef}>
                <p className="step-label">Step {step + 1} of {STEP_IDS.length}</p>
                <h3 className="step-q">{stepDef.q}</h3>
                <p className="step-hint">{stepDef.hint}</p>
                <div className="opt-list" role="radiogroup" aria-label={stepDef.q}>
                  {stepDef.options.map((o) => {
                    const sel = plan[stepDef.key] === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        role="radio"
                        aria-checked={sel}
                        className={'opt' + (sel ? ' sel' : '')}
                        onClick={() => choose(stepDef.key, o.id)}
                      >
                        <span className="opt-radio" aria-hidden="true" />
                        <span className="opt-body">
                          <span className="opt-label">
                            {productName(STEP_IDS.indexOf(stepDef.key), o.label)}
                            {o.tag ? <span className="opt-tag">{o.tag}</span> : null}
                            {o.note ? <span className="opt-tag">{o.note}</span> : null}
                          </span>
                          <span className="opt-desc">{o.desc}{o.mult ? ` · ${price(Math.round(currentCoffeePrice * o.mult))} at current coffee` : ''}</span>
                        </span>
                        {o.price != null ? <span className="opt-price">{price(o.price)}</span> : null}
                      </button>
                    );
                  })}
                </div>
                <div className="step-nav">
                  <button type="button" className="step-back" disabled={step === 0} onClick={() => goStep(step - 1)}>
                    ← Back
                  </button>
                  {step < STEP_IDS.length - 1 ? (
                    <button type="button" className="btn btn-ghost" style={{ color: '#F4EFE2', borderColor: 'rgba(244,239,226,0.4)' }} onClick={() => goStep(step + 1)}>
                      Continue
                    </button>
                  ) : null}
                </div>
                <p className="step-reassure">Pause, skip, or cancel anytime — no lock-in, ever.</p>
              </div>
            </div>

            {/* summary */}
            <aside className="summary" aria-live="polite">
              {!done ? (
                <>
                  <h3>{content.builder.summaryTitle}</h3>
                  <dl style={{ margin: 0 }}>
                    <div className="sum-row"><dt>Brew method</dt><dd>{content.builder.methods.find((m) => m.id === plan.method).label}</dd></div>
                    <div className="sum-row"><dt>Coffee</dt><dd>{coffee.label}</dd></div>
                    <div className="sum-row"><dt>Amount</dt><dd>{amount.label}</dd></div>
                    <div className="sum-row"><dt>Grind</dt><dd>{grind.label}</dd></div>
                    <div className="sum-row"><dt>Frequency</dt><dd>{frequency.label}</dd></div>
                  </dl>
                  <div className="sum-total">
                    <span className="sum-price" ref={priceRef}>{price(target)}</span>
                    <span className="per">{content.builder.perDelivery}</span>
                  </div>
                  <p className="sum-save">{saving}</p>
                  <p className="sum-date">{content.builder.firstDelivery}: <strong ref={dateRef}>{delivery}</strong></p>
                  <button className="btn" type="button" onClick={() => setDone(true)}>{content.builder.ctaStart}</button>
                  <ul className="sum-micro">
                    {content.builder.reassurance.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                </>
              ) : (
                <div className="success-card">
                  <h3>{content.builder.success.title}</h3>
                  <p>{content.builder.success.body}</p>
                  <p style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    {coffee.label} · {amount.label} · {frequency.label} — {price(target)} {content.builder.perDelivery}
                  </p>
                  <button className="btn btn-ghost" type="button" onClick={() => setDone(false)}>Adjust plan</button>
                </div>
              )}
            </aside>

            <div className="mobile-bar">
              <div>
                <div className="mb-price">{price(target)}</div>
                <div className="mb-per">{content.builder.perDelivery}</div>
              </div>
              <button className="btn" type="button" onClick={() => { setDone(true); scrollToId('builder'); }}>{content.builder.ctaStart}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- taste quiz ---------- */}
      <section id="quiz" className="section" data-tour="Find Your Match" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.quiz.eyebrow}</p>
          <h2 className="sec-title rv">{content.quiz.title}</h2>
          <p className="sec-sub rv">{content.quiz.sub}</p>
          <div className="quiz-card rv">
            <div className="quiz-frame rv-img">
              <Img k="product-3" src={menu3Img} alt="Pour-over coffee brewing at home in morning light, a glass dripper over a ceramic cup" />
            </div>
            <div>
              {!quizDone ? (
                <>
                  <div className="quiz-progress" aria-hidden="true"><i ref={quizBarRef} style={{ transform: 'scaleX(0)' }} /></div>
                  <h3 className="quiz-q">{content.quiz.questions[quizIdx].q}</h3>
                  <div className="quiz-opts">
                    {content.quiz.questions[quizIdx].options.map((o, oi) => (
                      <button key={o} type="button" className="quiz-opt" onClick={() => pickQuiz(quizIdx, oi)}>{o}</button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="quiz-result">
                  <p className="eyebrow">Your match</p>
                  <h3>{quizResult.coffee}</h3>
                  <p>{quizResult.why}</p>
                  <div className="quiz-actions">
                    <button className="btn" type="button" onClick={applyQuiz}>{content.quiz.apply}</button>
                    <button className="btn btn-ghost" type="button" onClick={() => { setAnswers([]); setQuizIdx(0); }}>{content.quiz.retake}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- lineup ---------- */}
      <section id="lineup" className="section" data-tour="The Lineup" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.lineup.eyebrow}</p>
          <h2 className="sec-title rv">{content.lineup.title}</h2>
          <p className="sec-sub rv">{content.lineup.sub}</p>
          <div className="lineup-grid">
            <div className="lineup-frame rv-img">
              <Img k="product-1" src={menu1Img} alt={`Three ${brandName} coffee bags lined up on a kitchen counter in morning light`} />
            </div>
            <div className="lineup-cards">
              {content.builder.coffees.map((c, i) => (
                <article className="lineup-card rv" key={c.id}>
                  <div>
                    <span className="roast-badge">{c.roast}</span>
                    <h3>{productName(i, c.label)}</h3>
                    <p className="notes">{c.desc}</p>
                    <button
                      type="button" className="btn btn-ghost"
                      style={{ padding: '10px 20px', fontSize: '0.85rem' }}
                      onClick={() => { setPlan((p) => ({ ...p, coffee: c.id })); dirRef.current = 1; stepRef.current = 1; setStep(1); scrollToId('builder'); }}
                    >
                      Choose this coffee
                    </button>
                  </div>
                  <div className="lineup-price">{price(c.price)}<small>per 250 g</small></div>
                </article>
              ))}
              <div className="lineup-card rv" style={{ alignItems: 'center' }}>
                <div>
                  <h3>Freshness, on record</h3>
                  <p className="notes">Beans pouring into the grinder, minutes off roast — this is what your Tuesday looks like.</p>
                </div>
              </div>
              <div data-tour="The Ritual" className="ritual-film-slot">
                <ScrollFrames
                  frames={frames}
                  alt={`Roasted beans cascading into an open bag in morning light — the ${brandName} ritual`}
                  pinDistance={narrow ? '+=90%' : '+=120%'}
                  stageHeight={narrow ? '84svh' : 'clamp(180px, 34vw, 340px)'}
                  className="ritual-film"
                >
                  <p className="ritual-caption">The {brandName} ritual — scroll to pour</p>
                </ScrollFrames>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- proof ---------- */}
      <section id="proof" className="section" data-tour="Proof" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.proof.eyebrow}</p>
          <h2 className="sec-title rv">{content.proof.title}</h2>
          <div className="proof-grid">
            {content.proof.items.map((t) => (
              <article className="proof-card rv" key={t.name}>
                <blockquote>“{t.quote}”</blockquote>
                <cite>{t.name}<span>{t.place}</span></cite>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- faq ---------- */}
      <section id="faq" className="section" data-tour="Questions, Answered" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="eyebrow rv">{content.faq.eyebrow}</p>
          <h2 className="sec-title rv">{content.faq.title}</h2>
          <div className="faq-layout">
            <div className="faq-side rv">
              <div className="box-card">
                <h3>What is in every box</h3>
                <p>Your roast, a tasting card with brew notes for the lot, and a resealable bag that keeps the last cup as fresh as the first.</p>
                <div className="box-frame">
                  <Img k="detail" src={detailImg} alt={`A tasting-notes card tucked into a ${brandName} subscription box beside a coffee bag`} />
                </div>
              </div>
            </div>
            <div className="faq-list">
              {content.faq.items.map((f, i) => (
                <div className={'faq-item rv' + (openFaq === i ? ' open' : '')} key={f.q}>
                  <button type="button" className="faq-q" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {f.q}<span className="plus" aria-hidden="true">+</span>
                  </button>
                  <div className="faq-a" style={{ maxHeight: openFaq === i ? 220 : 0 }} aria-hidden={openFaq !== i}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a className="wordmark" href="#hero" onClick={(e) => { e.preventDefault(); scrollToId('hero'); }}>
                <Wordmark name={brandName} />
              </a>
              <p>{content.footer.gifting}</p>
            </div>
            <div>
              <h4>Talk to us</h4>
              <ul>
                <li><a href={'mailto:' + email}>{email}</a></li>
                <li>{content.contact.phone}</li>
                <li>{content.contact.hours}</li>
                {insta ? <li><a href={insta}>Instagram</a></li> : null}
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                {content.nav.map((n) => (
                  <li key={n.href}><a href={n.href} onClick={(e) => { e.preventDefault(); scrollToId(n.href.slice(1)); }}>{n.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{content.footer.line.replace(content.brand.name, brandName)}</span>
            <span>Prices in {currency === '₹' ? 'INR' : currency}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
