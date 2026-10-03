import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import feature1Img from './assets/feature-1.webp';
import feature2Img from './assets/feature-2.webp';
import feature3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence for the hero film (replaces the mp4). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-ai';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`cx-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {/* a real space between the inline-block word masks */}
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

const fmtNum = (v, d) =>
  Number(v)
    .toFixed(d)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* Drifting neural constellation behind the hero copy. rAF-driven,
   killed entirely under reduced-motion. */
function Constellation({ reduced }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return undefined;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let pts = [];
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const seed = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(26, Math.min(64, Math.floor(w / 22)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
        c: Math.random() < 0.62 ? '139,92,246' : '34,211,238',
      }));
    };
    const tick = () => {
      ctx2d.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }
      const link = Math.min(150, Math.max(90, w / 9));
      for (let a = 0; a < pts.length; a += 1) {
        for (let b = a + 1; b < pts.length; b += 1) {
          const dx = pts[a].x - pts[b].x;
          const dy = pts[a].y - pts[b].y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx2d.strokeStyle = `rgba(139,92,246,${(0.13 * (1 - d / link)).toFixed(3)})`;
            ctx2d.lineWidth = 1;
            ctx2d.beginPath();
            ctx2d.moveTo(pts[a].x, pts[a].y);
            ctx2d.lineTo(pts[b].x, pts[b].y);
            ctx2d.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx2d.fillStyle = `rgba(${p.c},0.55)`;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fill();
      }
      raf = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    };
    /* Only animate while the hero is on screen: an always-on O(n²) canvas
       loop steals frame budget from scrolling everywhere else on the page. */
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) start();
            else stop();
          })
        : null;
    if (io) io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);
    seed();
    start();
    const onResize = () => seed();
    window.addEventListener('resize', onResize);
    return () => {
      stop();
      if (io) io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);
  if (reduced) return null;
  return <canvas ref={canvasRef} className="cx-constellation" aria-hidden="true" />;
}

/* ---- Neural pulse network geometry (viewBox 800x600) ---- */
const NODES = [
  { x: 90, y: 470 },
  { x: 215, y: 335 },
  { x: 185, y: 155 },
  { x: 365, y: 95 },
  { x: 545, y: 175 },
  { x: 665, y: 305 },
  { x: 560, y: 455 },
  { x: 380, y: 515 },
];
const ROUTE_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
];
const AMBIENT_EDGES = [
  [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [1, 4],
];
const FEATURE_IMAGES = [feature1Img, feature2Img, feature3Img];
const FEATURE_ALTS = [
  'Server racks glowing violet and blue in a dark data hall',
  'Extreme macro of a chip with violet and cyan light tracing its circuits',
  'A dark research lab lit by violet equipment glow',
];

export default function Design02Ai() {
  const { brand, img, price, productName, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const sales = content.contact.sales;

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
      const root = rootRef.current;
      if (!root || reduced) return;

      /* Hero entrance: 0.5s black hold, then a slow cinematic reveal. */
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } });
      intro
        .to('.cx-veil', { opacity: 0, duration: 1.2, delay: 0.5, ease: 'power2.inOut' })
        .set('.cx-veil', { display: 'none' })
        .fromTo('.sf-stage', { scale: 1.08 }, { scale: 1, duration: 7, ease: 'none' }, 0.4)
        .fromTo(
          '.cx-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.09, ease: 'power3.out' },
          0.75
        )
        .fromTo(
          '.cx-hero-eyebrow, .cx-hero-sub, .cx-hero-ctas, .cx-hero-meta, .cx-scroll-cue',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 },
          1.1
        );

      /* Slow cinematic reveals. */
      gsap.utils.toArray('.cx-rv', root).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.cx-stagger', root).forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      gsap.utils.toArray('.cx-rule', root).forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Metric count-ups. */
      gsap.utils.toArray('.cx-metric-num', root).forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { v: 0 };
        el.textContent = fmtNum(0, decimals); /* markup holds the final figure (reduced motion) */
        ScrollTrigger.create({
          trigger: el,
          scroller: sc,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: target,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = fmtNum(obj.v, decimals);
              },
            }),
        });
      });

      /* NEURAL PULSE — pinned scrubbed network (desktop), static below 768px. */
      const pinEl = root.querySelector('.cx-pulse-pin');
      const wrapEl = root.querySelector('.cx-pulse-wrap');
      if (pinEl && wrapEl) {
        const pulseEl = wrapEl.querySelector('.cx-pulse');
        const nodeEls = Array.from(wrapEl.querySelectorAll('.cx-node'));
        const edgeEls = Array.from(wrapEl.querySelectorAll('.cx-edge-route'));
        const cardEls = Array.from(wrapEl.querySelectorAll('.cx-card'));
        const fillEl = wrapEl.querySelector('.cx-progress-fill');
        const labelEl = wrapEl.querySelector('.cx-progress-num');
        const SEG = NODES.length - 1;

        const setPulse = (p) => {
          const prog = Math.min(1, Math.max(0, p));
          const f = prog * SEG;
          let i = Math.floor(f);
          let t = f - i;
          if (prog >= 1) {
            i = SEG - 1;
            t = 1;
          }
          const a = NODES[i];
          const b = NODES[i + 1];
          const x = a.x + (b.x - a.x) * t;
          const y = a.y + (b.y - a.y) * t;
          if (pulseEl) pulseEl.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
          const reachedIdx = prog >= 1 ? SEG : t > 0.02 ? i + 1 : i;
          nodeEls.forEach((el, idx) => el.classList.toggle('is-lit', idx <= reachedIdx));
          edgeEls.forEach((el, j) =>
            el.classList.toggle('is-live', j < i || (j === i && t > 0.02))
          );
          const cardIdx = Math.min(3, Math.floor(reachedIdx / 2));
          cardEls.forEach((el, k) => el.classList.toggle('is-active', k === cardIdx));
          if (fillEl) fillEl.style.transform = `scaleX(${prog.toFixed(4)})`;
          if (labelEl) labelEl.textContent = `${String(Math.round(prog * 100)).padStart(2, '0')}%`;
        };
        setPulse(0);

        /* gsap.matchMedia (reverted with this context) so a resize across
           768px kills/restores the pin instead of leaving it stuck. */
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          /* The pinned stage is exactly one visible screen tall: if the
             network + cards can't fit (short laptop screens), scale the
             whole composition down instead of letting it hang off-screen. */
          const fitEl = pinEl.querySelector('.cx-pulse-fit');
          pinEl.classList.add('is-live');
          const fit = () => {
            if (!fitEl) return;
            fitEl.style.scale = '';
            const avail = pinEl.clientHeight;
            const need = fitEl.offsetHeight;
            if (avail > 0 && need > avail) fitEl.style.scale = String(Math.max(0.6, avail / need));
          };
          fit();
          if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit).catch(() => {});
          const st = ScrollTrigger.create({
            trigger: pinEl,
            scroller: sc,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 0.8,
            onRefresh: fit,
            onUpdate: (self) => setPulse(self.progress),
          });
          return () => {
            st.kill();
            pinEl.classList.remove('is-live');
            if (fitEl) fitEl.style.scale = '';
          };
        });
        mm.add('(max-width: 767.98px)', () => {
          wrapEl.classList.add('is-static');
          setPulse(1);
          return () => wrapEl.classList.remove('is-static');
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-02-ai">
      <header className="cx-nav">
        <a className="cx-wordmark" href="#hero">
          {name}
          <span className="cx-wordmark-dot" aria-hidden="true" />
        </a>
        <nav className="cx-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="cx-btn cx-btn-small" href="#contact">
          Get API key
        </a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="cx-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Light pulse traveling through fiber threads"
            pinDistance="+=170%"
          >
            <div className="cx-hero-shade" aria-hidden="true" />
            <Constellation reduced={reduced} />
            {!reduced && <div className="cx-veil" aria-hidden="true" />}
          <div className="cx-hero-copy">
            <p className="cx-eyebrow cx-hero-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="cx-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="cx-hero-sub">{content.hero.sub}</p>
            <div className="cx-hero-ctas">
              <a className="cx-btn cx-btn-primary" href={content.hero.ctaPrimaryHref}>
                {content.hero.ctaPrimary}
              </a>
              <a className="cx-btn cx-btn-ghost" href={content.hero.ctaSecondaryHref}>
                {content.hero.ctaSecondary}
              </a>
            </div>
            <dl className="cx-hero-meta">
              {content.hero.meta.map((m) => (
                <div key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <a className="cx-scroll-cue" href="#capabilities" aria-label="Scroll to capabilities">
            <span aria-hidden="true" />
          </a>
          </ScrollFrames>
        </section>

        {/* NEURAL PULSE — capability section */}
        <section id="capabilities" className="cx-pulse-sec" data-tour="The Neural Pulse">
          <div className="cx-pulse-pin">
            <div className="cx-pulse-fit">
            <div className="cx-wrap">
              <p className="cx-eyebrow">{content.pulse.eyebrow}</p>
              <h2 className="cx-h2">{content.pulse.title}</h2>
              <p className="cx-lede">{content.pulse.body}</p>
            </div>
            <div className={`cx-pulse-wrap${reduced ? ' is-static' : ''}`}>
              <div className="cx-wrap cx-pulse-stage">
                <svg
                  className="cx-net"
                  viewBox="0 0 800 600"
                  role="img"
                  aria-label="Neural network diagram: a pulse travels through eight nodes, lighting each capability"
                >
                  <g className="cx-edges-ambient" aria-hidden="true">
                    {AMBIENT_EDGES.map(([a, b], j) => (
                      <line
                        key={j}
                        x1={NODES[a].x}
                        y1={NODES[a].y}
                        x2={NODES[b].x}
                        y2={NODES[b].y}
                      />
                    ))}
                  </g>
                  <g className="cx-edges-route" aria-hidden="true">
                    {ROUTE_EDGES.map(([a, b], j) => (
                      <line
                        key={j}
                        className="cx-edge-route"
                        x1={NODES[a].x}
                        y1={NODES[a].y}
                        x2={NODES[b].x}
                        y2={NODES[b].y}
                      />
                    ))}
                  </g>
                  <g className="cx-nodes" aria-hidden="true">
                    {NODES.map((n, i) => (
                      <g key={i} className="cx-node">
                        <circle className="cx-node-halo" cx={n.x} cy={n.y} r="26" />
                        <circle className="cx-node-core" cx={n.x} cy={n.y} r="7" />
                      </g>
                    ))}
                  </g>
                  <g
                    className="cx-pulse"
                    transform={`translate(${NODES[0].x} ${NODES[0].y})`}
                    aria-hidden="true"
                  >
                    <circle className="cx-pulse-aura" r="16" />
                    <circle className="cx-pulse-core" r="7" />
                  </g>
                </svg>
                <div className="cx-cards">
                  {content.capabilities.map((c, i) => (
                    <article key={c.id} className="cx-card" aria-label={c.title}>
                      <p className="cx-card-tag">{c.tag}</p>
                      <h3 className="cx-card-title">{c.title}</h3>
                      <p className="cx-card-desc">{c.desc}</p>
                      <p className="cx-card-stat">
                        <strong>{c.stat.value}</strong>
                        <span>{c.stat.label}</span>
                      </p>
                      <span className="cx-card-index" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </article>
                  ))}
                </div>
              </div>
              <div className="cx-wrap cx-progress" aria-hidden="true">
                <span className="cx-progress-track">
                  <span className="cx-progress-fill" />
                </span>
                <span className="cx-progress-label">
                  SIGNAL <span className="cx-progress-num">00%</span>
                </span>
              </div>
              <p className="cx-pulse-hint" aria-hidden="true">
                {content.pulse.hint}
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* MODELS */}
        <section id="models" className="cx-models" data-tour="Model Lineup">
          <div className="cx-wrap">
            <p className="cx-eyebrow cx-rv">{content.models.eyebrow}</p>
            <h2 className="cx-h2 cx-rv">{content.models.title}</h2>
            <p className="cx-lede cx-rv">{content.models.body}</p>
            <span className="cx-rule" aria-hidden="true" />
            <div className="cx-model-grid cx-stagger">
              {content.models.items.map((m, i) => (
                <article key={m.id} className={`cx-model${m.featured ? ' is-featured' : ''}`}>
                  <div className="cx-model-visual">
                    <Img k={`product-${i}`} src={img(`product-${i}`, FEATURE_IMAGES[i])} alt={FEATURE_ALTS[i]} />
                    <span className="cx-model-badge">{m.badge}</span>
                  </div>
                  <div className="cx-model-body">
                    <h3 className="cx-model-name">{productName(i, m.name)}</h3>
                    <p className="cx-model-desc">{m.desc}</p>
                    <ul className="cx-model-specs">
                      <li>
                        <span>Context</span>
                        <strong>{m.context}</strong>
                      </li>
                      <li>
                        <span>Max output</span>
                        <strong>{m.output}</strong>
                      </li>
                      <li>
                        <span>Modalities</span>
                        <strong>{m.modes}</strong>
                      </li>
                    </ul>
                    <div className="cx-model-price">
                      <div>
                        <span className="cx-price-label">Input</span>
                        <strong>{price(m.input)}</strong>
                      </div>
                      <div>
                        <span className="cx-price-label">Output</span>
                        <strong>{price(m.outputPrice)}</strong>
                      </div>
                      <span className="cx-price-unit">{m.unit}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section id="metrics" className="cx-metrics">
          <div className="cx-wrap">
            <p className="cx-eyebrow cx-rv">{content.metrics.eyebrow}</p>
            <div className="cx-metric-grid cx-stagger">
              {content.metrics.items.map((m) => (
                <div className="cx-metric" key={m.label}>
                  <p className="cx-metric-value">
                    <span
                      className="cx-metric-num"
                      data-target={m.target}
                      data-decimals={m.decimals}
                    >
                      {fmtNum(m.target, m.decimals)}
                    </span>
                    <span className="cx-metric-suffix">{m.suffix}</span>
                  </p>
                  <p className="cx-metric-label">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH */}
        <section id="research" className="cx-research" data-tour="Research Notes">
          <div className="cx-wrap cx-research-grid">
            <div>
              <p className="cx-eyebrow cx-rv">{content.research.eyebrow}</p>
              <h2 className="cx-h2 cx-rv">{content.research.title}</h2>
              <p className="cx-lede cx-rv">{content.research.body}</p>
              <ol className="cx-papers cx-stagger">
                {content.research.papers.map((p, i) => (
                  <li className="cx-paper" key={p.title}>
                    <span className="cx-paper-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="cx-paper-title">{p.title}</h3>
                      <p className="cx-paper-venue">
                        {p.venue} · {p.year}
                      </p>
                      <p className="cx-paper-abstract">{p.abstract}</p>
                      <a className="cx-paper-link" href="#research">
                        Read paper
                      </a>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="cx-research-fig cx-rv">
              <Img
                k="detail"
                src={img('detail', detailImg)}
                alt="Fiber-optic cable ends glowing violet and cyan against black"
              />
              <figcaption>The bench where Nano was distilled.</figcaption>
            </figure>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cx-cta">
          <div className="cx-wrap cx-cta-grid">
            <div>
              <p className="cx-eyebrow cx-rv">{content.cta.eyebrow}</p>
              <h2 className="cx-h2 cx-cta-title cx-rv">{content.cta.title}</h2>
              <p className="cx-lede cx-rv">{content.cta.body}</p>
              <div className="cx-hero-ctas cx-rv">
                <a className="cx-btn cx-btn-primary" href={`mailto:${email}?subject=API key request`}>
                  {content.cta.primary}
                </a>
                <a className="cx-btn cx-btn-ghost" href={`mailto:${sales}`}>
                  {content.cta.secondary}
                </a>
              </div>
              <p className="cx-cta-mail cx-rv">
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>
            <div className="cx-code cx-rv">
              <div className="cx-code-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <pre>{content.cta.code.join('\n')}</pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="cx-footer">
        <div className="cx-wrap cx-footer-grid">
          <a className="cx-wordmark" href="#hero">
            {name}
            <span className="cx-wordmark-dot" aria-hidden="true" />
          </a>
          <nav className="cx-footer-nav" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="cx-footer-contact">
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </div>
        <div className="cx-wrap cx-footer-base">
          <p>{content.footer.line}</p>
          <p>{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
