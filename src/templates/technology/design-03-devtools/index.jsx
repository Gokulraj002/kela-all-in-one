import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import f1Img from './assets/feature-1.webp';
import f2Img from './assets/feature-2.webp';
import f3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence (replaces the autoplay hero mp4). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-devtools';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap';

/* CLI binary name, e.g. `kelatech` (same slug the content's commands use). */
const CLI_NAME = content.hero.terminal.cmd.split(' ').pop();

const PANEL_IMGS = { 'product-0': f1Img, 'product-1': f2Img, 'product-2': f3Img, detail: detailImg };

/* Resolve the scroll container from an element inside the template. A child
   component's layout effect runs before the parent's root ref is attached,
   so the parent's scroller() would still answer `window` there. */
const scrollerFor = (el) => {
  try {
    const scope = el && el.closest('.tpl-scope');
    if (scope && scope.scrollHeight > scope.clientHeight + 2) return scope;
  } catch {
    /* window fallback */
  }
  return window;
};

/* ---------------- hero terminal: `$ npm i -g <cli>` typed on load ---------------- */
function HeroTerminal({ reduced }) {
  const { brand } = useCustom();
  const brandName = brand || content.brand.name;
  const termRef = useRef(null);
  const cmdRef = useRef(null);
  const caretRef = useRef(null);
  const t = content.hero.terminal;

  useLayoutEffect(() => {
    const term = termRef.current;
    if (!term || reduced) return;
    term.classList.add('is-live');
    const steps = term.querySelectorAll('.sk-term-step');
    const cmd = cmdRef.current;
    const caret = caretRef.current;
    const placeCaret = (host) => {
      if (caret && host) host.appendChild(caret);
    };
    const tl = gsap.timeline({ delay: 0.35 });
    tl.call(() => {
      steps[0].classList.add('is-shown');
      cmd.textContent = '';
      placeCaret(cmd);
    });
    const o = { n: 0 };
    tl.to(o, {
      n: t.cmd.length,
      duration: 1.15,
      ease: 'none',
      onUpdate: () => {
        cmd.textContent = t.cmd.slice(0, Math.round(o.n));
        placeCaret(cmd);
      },
    });
    steps.forEach((s, i) => {
      if (i === 0) return;
      tl.call(() => s.classList.add('is-shown'), null, '+=0.22');
    });
    tl.call(() => placeCaret(steps[steps.length - 1]));
    return () => {
      tl.kill();
      term.classList.remove('is-live');
      cmd.textContent = t.cmd;
      placeCaret(cmd);
    };
  }, [reduced, t.cmd]);

  return (
    <div className="sk-term" ref={termRef} role="img" aria-label={`Terminal showing ${brandName} installation`}>
      <div className="sk-term-bar" aria-hidden="true">
        <span className="sk-term-dot" />
        <span className="sk-term-dot" />
        <span className="sk-term-dot" />
        <span className="sk-term-title">{t.title}</span>
      </div>
      <div className="sk-term-body">
        <p className="sk-term-step sk-term-line">
          <span className="sk-term-prompt">$</span>
          <span className="sk-term-cmd" ref={cmdRef}>
            {t.cmd}
            <span className="sk-caret" ref={caretRef} aria-hidden="true" />
          </span>
        </p>
        {t.lines.map((l, i) =>
          l.tone === 'cmd' ? (
            <p key={i} className="sk-term-step sk-term-line">
              <span className="sk-term-prompt">$</span>
              <span className="sk-term-cmd">{l.text}</span>
            </p>
          ) : (
            <p key={i} className={`sk-term-step sk-term-line sk-term-line--${l.tone}`}>
              {l.text}
            </p>
          )
        )}
      </div>
    </div>
  );
}

/* ---------------- signature scroll mechanic: TERMINAL TYPER ----------------
   Pinned on desktop (≥768px, motion allowed). Scroll progress types the four
   commands character-by-character; each completed command prints its output
   and activates its feature panel. Static full transcript otherwise. */
function TerminalTyper({ reduced }) {
  const steps = content.typer.steps;
  const { img } = useCustom();
  const secRef = useRef(null);
  const pinRef = useRef(null);
  const caretRef = useRef(null);
  const cmdRefs = useRef([]);
  const promptRefs = useRef([]);
  const outRefs = useRef([]);
  const panelRefs = useRef([]);

  /* Char budget per step: command chars (typed) + output chars (pause while
     the output "prints") + a reading pause before the next command. */
  const budgets = useMemo(
    () =>
      steps.map((s) => {
        const cmdLen = s.cmd.length;
        const outLen = s.output.reduce((n, l) => n + l.length, 0);
        const pause = 30;
        return { cmdLen, total: cmdLen + outLen + pause };
      }),
    [steps]
  );
  const total = useMemo(() => budgets.reduce((n, b) => n + b.total, 0), [budgets]);

  useLayoutEffect(() => {
    const sec = secRef.current;
    if (!sec || reduced) return;

    const renderTyped = (typed) => {
      const caret = caretRef.current;
      let consumed = 0;
      let caretPlaced = false;
      steps.forEach((s, i) => {
        const b = budgets[i];
        const c = Math.min(Math.max(typed - consumed, 0), b.total);
        consumed += b.total;
        const cmdShown = Math.min(c, b.cmdLen);
        const complete = c >= b.cmdLen;
        const cmdEl = cmdRefs.current[i];
        if (cmdEl) {
          cmdEl.textContent = s.cmd.slice(0, cmdShown);
          if (!complete && !caretPlaced && caret) {
            cmdEl.appendChild(caret);
            caretPlaced = true;
          }
        }
        const promptLine = promptRefs.current[i];
        if (promptLine) promptLine.classList.toggle('is-on', c > 0);
        const outEl = outRefs.current[i];
        if (outEl) {
          outEl.classList.toggle('is-on', complete);
          if (complete && !caretPlaced && caret) {
            outEl.appendChild(caret);
            caretPlaced = true;
          }
        }
        const panel = panelRefs.current[i];
        if (panel) panel.classList.toggle('is-active', complete);
      });
      if (!caretPlaced && caret) {
        const body = sec.querySelector('.sk-term-body');
        if (body) body.appendChild(caret);
      }
    };

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const pin = pinRef.current;
      const fitEl = pin && pin.querySelector('.sk-typer-fit');
      sec.classList.add('is-live');
      renderTyped(0);
      /* The pinned stage is one visible screen (--tpl-vh) under the sticky
         nav; scale the terminal + panels down on screens too short for them. */
      const fit = () => {
        if (!pin || !fitEl) return;
        fitEl.style.scale = '';
        const cs = getComputedStyle(pin);
        const avail = pin.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const need = fitEl.offsetHeight;
        if (avail > 0 && need > avail) fitEl.style.scale = String(Math.max(0.6, avail / need));
      };
      fit();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit).catch(() => {});
      const sc = scrollerFor(sec);
      const st = ScrollTrigger.create({
        trigger: pin,
        scroller: sc,
        start: 'top top',
        end: '+=300%',
        pin: true,
        invalidateOnRefresh: true,
        onRefresh: fit,
      });
      /* Typing starts while the terminal scrolls into view (not only once it
         pins), so the stage never arrives as an empty black box; it finishes
         with the pin. */
      const state = { p: 0 };
      const typing = gsap.to(state, {
        p: 1,
        ease: 'none',
        onUpdate: () => renderTyped(Math.round(state.p * total)),
        scrollTrigger: {
          trigger: pin,
          scroller: sc,
          start: 'top 65%',
          end: () => st.end,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        typing.scrollTrigger && typing.scrollTrigger.kill();
        typing.kill();
        st.kill();
        if (fitEl) fitEl.style.scale = '';
        renderTyped(total);
        sec.classList.remove('is-live');
      };
    });
    return () => mm.revert();
  }, [reduced, steps, budgets, total]);

  return (
    <section id="features" className="sk-typer" data-tour="Live Demo" ref={secRef}>
      <div className="sk-typer-head">
        <p className="sk-eyebrow sk-rv">{content.typer.eyebrow}</p>
        <h2 className="sk-h2 sk-rv">{content.typer.title}</h2>
        <p className="sk-typer-hint sk-rv" aria-hidden="true">
          {content.typer.hint}
        </p>
      </div>
      <div className="sk-typer-pin" ref={pinRef}>
        <div className="sk-typer-fit">
        <div className="sk-term sk-typer-term">
          <div className="sk-term-bar" aria-hidden="true">
            <span className="sk-term-dot" />
            <span className="sk-term-dot" />
            <span className="sk-term-dot" />
            <span className="sk-term-title">{CLI_NAME} — live demo</span>
          </div>
          <div className="sk-term-body">
            {steps.map((s, i) => (
              <React.Fragment key={s.cmd}>
                <p className="sk-term-line sk-tty-promptline" ref={(el) => { promptRefs.current[i] = el; }}>
                  <span className="sk-term-prompt">$</span>
                  <span className="sk-term-cmd" ref={(el) => { cmdRefs.current[i] = el; }}>
                    {s.cmd}
                  </span>
                </p>
                <div className="sk-tty-out" ref={(el) => { outRefs.current[i] = el; }}>
                  {s.output.map((line, j) => (
                    <p key={j} className={line.trimStart().startsWith('✓') ? 'sk-ok' : ''}>
                      {line}
                    </p>
                  ))}
                  {i === steps.length - 1 && <span className="sk-caret" ref={caretRef} aria-hidden="true" />}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="sk-feats">
          {steps.map((s, i) => (
            <article className="sk-feat" key={s.cmd} ref={(el) => { panelRefs.current[i] = el; }}>
              <div className="sk-feat-img">
                <Img
                  k={s.panel.imgKey}
                  src={img(s.panel.imgKey, PANEL_IMGS[s.panel.imgKey])}
                  alt={s.panel.alt}
                />
              </div>
              <div className="sk-feat-body">
                <p className="sk-feat-kicker">{s.panel.kicker}</p>
                <h3>{s.panel.title}</h3>
                <p>{s.panel.body}</p>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- page ---------------- */
export default function Design03Devtools() {
  const { brand, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.footer.contact.email;

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* ScrollFrames builds its hero pin in a child useEffect — after the layout
     effect below created the pins/triggers further down the page. Parent
     effects run after child effects, so re-sort and refresh here (and once
     more two frames later, when ScrollFrames re-creates its pin after its
     stage height settles): every start/end then includes the hero's pin
     spacing instead of waiting for the viewer's debounced refresh. */
  useEffect(() => {
    if (reduced) return undefined;
    const run = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    run();
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(run); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: copy rises, terminal frame settles. Crisp, ≤1.4s. */
      gsap.fromTo(
        '.sk-hero-copy > *',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09 }
      );
      gsap.fromTo(
        '.sk-hero .sk-term',
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.25 }
      );

      /* Standard reveals. */
      gsap.utils.toArray('.sk-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-03-devtools">
      {/* DOCS-STYLE NAV */}
      <header className="sk-nav">
        <div className="sk-nav-inner">
          <a className="sk-wordmark" href="#hero" aria-label={`${name} home`}>
            <span className="sk-mark" aria-hidden="true">
              {'>_'}
            </span>
            {name}
          </a>
          <nav className="sk-nav-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.label} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="sk-nav-right">
            <a className="sk-gh" href={content.github.href} aria-label={`Star ${name} on GitHub`}>
              <span className="sk-gh-label">{content.github.label}</span>
              <span className="sk-stars">★ {content.github.stars}</span>
            </a>
            <a className="sk-btn" href="#cta">
              Get started
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence */}
        <section id="hero" className="sk-hero" data-tour="Command Line">
          <div className="sk-hero-scrub" data-tour="Scrub the Frames">
            <ScrollFrames
              frames={frames}
              alt="Backlit keyboard in darkness, hands typing in a steady rhythm"
              pinDistance="+=170%"
              className="sk-hero-sf"
            >
              <div className="sk-hero-veil" aria-hidden="true" />
              <div className="sk-hero-copy">
                <p className="sk-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="sk-hero-title">
                  From commit to production in <span className="sk-hl">43 seconds.</span>
                </h1>
                <p className="sk-hero-sub">{content.hero.sub}</p>
                <div className="sk-hero-ctas">
                  <a className="sk-btn" href={content.hero.ctaPrimaryHref}>
                    {content.hero.ctaPrimary}
                  </a>
                  <a className="sk-btn sk-btn--ghost" href={content.hero.ctaSecondaryHref}>
                    {content.hero.ctaSecondary}
                  </a>
                </div>
              </div>
            </ScrollFrames>
          </div>
          <div className="sk-hero-below">
            <HeroTerminal reduced={reduced} />
          </div>
          <div className="sk-stats">
            <div className="sk-stats-inner">
              {content.hero.stats.map((s) => (
                <div className="sk-stat" key={s.label}>
                  <div className="sk-stat-value">{s.value}</div>
                  <div className="sk-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICKSTART — light docs section with sidebar */}
        <section id="quickstart" className="sk-docs sk-sec" data-tour="Quickstart">
          <div className="sk-wrap">
            <div className="sk-docs-grid">
              <aside className="sk-toc" aria-label="On this page">
                <p className="sk-toc-title">On this page</p>
                {content.quickstart.steps.map((s) => (
                  <a key={s.id} href={`#qs-${s.id}`}>
                    {s.title}
                  </a>
                ))}
                <a href="#features">The workflow</a>
                <a href="#api">API reference</a>
              </aside>
              <div>
                <p className="sk-eyebrow sk-rv">{content.quickstart.eyebrow}</p>
                <h2 className="sk-h2 sk-rv">{content.quickstart.title}</h2>
                <p className="sk-lede sk-rv">{content.quickstart.body}</p>
                <div className="sk-steps">
                  {content.quickstart.steps.map((s) => (
                    <article className="sk-step sk-rv" id={`qs-${s.id}`} key={s.id}>
                      <div>
                        <span className="sk-step-num">{s.num}</span>
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                      </div>
                      <div className="sk-code">
                        <div className="sk-code-head">
                          <span>bash</span>
                        </div>
                        <pre>
                          {s.code.map((line, i) => (
                            <span
                              key={i}
                              className={
                                line.trimStart().startsWith('#')
                                  ? 'sk-cl-comment'
                                  : line.trimStart().startsWith('✓')
                                    ? 'sk-cl-ok'
                                    : undefined
                              }
                            >
                              {line}
                              {'\n'}
                            </span>
                          ))}
                        </pre>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TERMINAL TYPER — signature scroll mechanic */}
        <TerminalTyper reduced={reduced} />

        {/* API REFERENCE TEASER */}
        <section id="api" className="sk-docs sk-sec" data-tour="API Reference">
          <div className="sk-wrap">
            <div className="sk-docs-grid">
              <aside className="sk-toc" aria-label="API contents">
                <p className="sk-toc-title">Reference</p>
                <a href="#api">Endpoints</a>
                <a href="#api">Authentication</a>
                <a href="#api">Webhooks</a>
                <a href="#api">Rate limits</a>
              </aside>
              <div>
                <p className="sk-eyebrow sk-rv">{content.api.eyebrow}</p>
                <h2 className="sk-h2 sk-rv">{content.api.title}</h2>
                <p className="sk-lede sk-rv">{content.api.body}</p>
                <div className="sk-api-table sk-rv">
                  {content.api.endpoints.map((e) => (
                    <div className="sk-api-row" key={`${e.method} ${e.path}`}>
                      <span className={`sk-method sk-method--${e.method.toLowerCase()}`}>{e.method}</span>
                      <span>
                        <span className="sk-api-path">{e.path}</span>
                        <span className="sk-api-desc">{e.desc}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="sk-api-note sk-rv">
                  <a href="#api">{content.api.note}</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHANGELOG */}
        <section id="changelog" className="sk-docs sk-sec" data-tour="Changelog" style={{ paddingTop: 0 }}>
          <div className="sk-wrap">
            <div className="sk-docs-grid">
              <aside className="sk-toc" aria-label="Versions">
                <p className="sk-toc-title">Versions</p>
                {content.changelog.entries.map((e) => (
                  <a key={e.version} href={`#log-${e.version}`}>
                    {e.version}
                  </a>
                ))}
              </aside>
              <div>
                <p className="sk-eyebrow sk-rv">{content.changelog.eyebrow}</p>
                <h2 className="sk-h2 sk-rv">{content.changelog.title}</h2>
                <div className="sk-log">
                  {content.changelog.entries.map((e) => (
                    <article className="sk-entry sk-rv" id={`log-${e.version}`} key={e.version}>
                      <div className="sk-entry-head">
                        <span className="sk-entry-ver">{e.version}</span>
                        <span className="sk-entry-tag">{e.tag}</span>
                        <span className="sk-entry-date">{e.date}</span>
                      </div>
                      <ul>
                        {e.items.map((item, i) => (
                          <li key={i}>
                            {item.split('`').map((part, j) =>
                              j % 2 === 1 ? <code key={j}>{part}</code> : <span key={j}>{part}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="sk-cta sk-sec" data-tour="Get Started">
          <div className="sk-wrap">
            <p className="sk-eyebrow sk-rv sk-eyebrow--amber">{content.cta.eyebrow}</p>
            <h2 className="sk-h2 sk-rv">{content.cta.title}</h2>
            <div className="sk-rv">
              <span className="sk-cta-code">
                <span className="sk-term-prompt">$</span>
                {content.cta.code}
              </span>
            </div>
            <div className="sk-cta-actions sk-rv">
              <a className="sk-btn" href="#quickstart">
                {content.cta.button}
              </a>
            </div>
            <p className="sk-cta-note sk-rv">{content.cta.note}</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="sk-footer">
        <div className="sk-footer-inner">
          <div className="sk-footer-grid">
            <div>
              <a className="sk-wordmark" href="#hero" aria-label={`${name} home`}>
                <span className="sk-mark" aria-hidden="true">
                  {'>_'}
                </span>
                {name}
              </a>
              <p className="sk-footer-tag">{content.footer.tagline}</p>
              <div className="sk-footer-contact">
                <a href={`mailto:${email}`}>{email}</a>
                <a href={`https://${content.footer.contact.github}`}>{content.footer.contact.github}</a>
              </div>
            </div>
            {content.footer.cols.map((col) => (
              <div className="sk-footer-col" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#hero">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="sk-footer-base">
            <span>{content.footer.line}</span>
            <span className="sk-footer-status">All systems operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
