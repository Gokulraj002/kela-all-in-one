import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import work1Img from './assets/work-1.webp';
import work2Img from './assets/work-2.webp';
import work3Img from './assets/work-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-portfolio';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,700..900&family=Inter:wght@400;500;600;700&display=swap';

const IMAGES = { hero: heroImg, 'work-1': work1Img, 'work-2': work2Img, 'work-3': work3Img, detail: detailImg };

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   A real space sits between the word masks so headlines never run together. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sm-words ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function disciplineLabel(id) {
  const f = content.filters.find((x) => x.id === id);
  return f ? f.label : id;
}

function fmtOutcome(o) {
  return `${o.prefix}${o.value.toFixed(o.decimals)}${o.suffix}`;
}

/* Outcome numerals: render the final value in JSX (never a hidden leftover),
   animate 0 → value on scroll enter when motion is allowed. */
function paintCount(el) {
  const v = parseFloat(el.dataset.value || '0');
  const d = parseInt(el.dataset.decimals || '0', 10);
  el.textContent = (el.dataset.prefix || '') + v.toFixed(d) + (el.dataset.suffix || '');
}
function bindCountUps(els, sc, trigger, start = 'top 88%') {
  els.forEach((el) => {
    const target = parseFloat(el.dataset.value || '0');
    const d = parseInt(el.dataset.decimals || '0', 10);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    el.textContent = pre + (0).toFixed(d) + suf;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: trigger || el, scroller: sc, start, once: true },
      onUpdate: () => {
        el.textContent = pre + obj.v.toFixed(d) + suf;
      },
    });
  });
}

function Outcome({ o, className = '' }) {
  return (
    <span
      className={`sm-count ${className}`}
      data-value={o.value}
      data-prefix={o.prefix}
      data-suffix={o.suffix}
      data-decimals={o.decimals}
    >
      {fmtOutcome(o)}
    </span>
  );
}

function CaseCard({ c, index }) {
  const { img } = useCustom();
  return (
    <article className="sm-case-card">
      <div className="sm-card-img">
        <Img k={c.imgKey} src={img(c.imgKey, IMAGES[c.imgKey])} alt={c.imgAlt} />
      </div>
      <div className="sm-card-body">
        <div className="sm-card-top">
          <span className="sm-card-num">{String(index + 1).padStart(2, '0')}</span>
          <span className="sm-card-disc">{disciplineLabel(c.discipline)}</span>
        </div>
        <h3 className="sm-card-title">{c.title}</h3>
        <p className="sm-card-meta">
          {c.client} · {c.sector} · {c.year}
        </p>
        <p className="sm-card-outcome">
          <Outcome o={c.outcome} />
          <small>{c.outcome.label}</small>
        </p>
        <div className="sm-card-foot">
          <span>
            <strong>Scope</strong> — {c.scope}
          </span>
          <span>
            <strong>Budget</strong> — {c.budget}
          </span>
        </div>
      </div>
    </article>
  );
}

function ContactForm({ email }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: content.contact.projectTypes[0],
    budget: content.contact.budgetBands[1],
    message: '',
  });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = `Project inquiry — ${form.name || 'new project'} · ${form.budget}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Project type: ${form.type}`,
      `Budget: ${form.budget}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="sm-form" onSubmit={submit}>
      <div className="sm-form-2col">
        <div className="sm-field">
          <label htmlFor="sm-f-name">Your name</label>
          <input id="sm-f-name" className="sm-input" type="text" value={form.name} onChange={set('name')} required autoComplete="name" />
        </div>
        <div className="sm-field">
          <label htmlFor="sm-f-email">Work email</label>
          <input id="sm-f-email" className="sm-input" type="email" value={form.email} onChange={set('email')} required autoComplete="email" />
        </div>
      </div>
      <div className="sm-form-2col">
        <div className="sm-field">
          <label htmlFor="sm-f-company">Company</label>
          <input id="sm-f-company" className="sm-input" type="text" value={form.company} onChange={set('company')} autoComplete="organization" />
        </div>
        <div className="sm-field">
          <label htmlFor="sm-f-type">Project type</label>
          <select id="sm-f-type" className="sm-select" value={form.type} onChange={set('type')}>
            {content.contact.projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <fieldset className="sm-fieldset">
        <legend>Budget</legend>
        <div className="sm-chips" role="radiogroup" aria-label="Budget band">
          {content.contact.budgetBands.map((b) => (
            <label className="sm-chip" key={b}>
              <input type="radio" name="sm-budget" value={b} checked={form.budget === b} onChange={set('budget')} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm-field">
        <label htmlFor="sm-f-msg">What are you building, and what does it need to do?</label>
        <textarea id="sm-f-msg" className="sm-textarea" value={form.message} onChange={set('message')} required />
      </div>
      <button className="sm-cta" type="submit">
        Send the brief
      </button>
      {sent && <p className="sm-form-sent">{content.contact.sentNote}</p>}
      {!sent && <p className="sm-form-note">{content.contact.formNote}</p>}
    </form>
  );
}

export default function Design01Portfolio() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState('all');
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;

  const filtered = content.cases.filter((c) => filter === 'all' || c.discipline === filter);
  const previewKeys = [...new Set(filtered.map((c) => c.imgKey))];
  const previewAltFor = (key) => {
    const c = filtered.find((x) => x.imgKey === key);
    return c ? c.imgAlt : '';
  };
  const filterCount = (id) => (id === 'all' ? content.cases.length : content.cases.filter((c) => c.discipline === id).length);

  const stageRef = useRef(null);
  const listRef = useRef(null);
  const captionRef = useRef(null);
  const activateRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* House motion: hero entrance, word-mask headlines, reveals, wipes,
     rules, and count-ups outside the work index. */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      const globalCounts = gsap.utils
        .toArray('.sm-count', rootRef.current)
        .filter((el) => !el.closest('#work'));

      if (reduced) {
        globalCounts.forEach(paintCount);
        return;
      }

      /* Hero: hard-wipe the pin-up frame, word-rise the case title,
         then outcome, sub, CTAs and meta. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sm-hero-frames',
        { clipPath: 'inset(8% 6% 92% 6%)' },
        /* clearProps: no clip-path left on the pinned hero once it is open */
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut', clearProps: 'clipPath' },
        0
      )
        .fromTo(
          '.sm-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.3
        )
        .fromTo(
          '.sm-hero-eyebrow, .sm-hero-outcome, .sm-hero-sub, .sm-hero-ctas, .sm-hero-meta',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          0.7
        );
      bindCountUps(
        globalCounts.filter((el) => el.closest('.sm-hero')),
        sc,
        '.sm-hero',
        'top 95%'
      );

      /* Default reveals. */
      gsap.utils.toArray('.sm-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.sm-rv-group').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Word-mask section headlines. */
      gsap.utils.toArray('.sm-rv-mask').forEach((h) => {
        gsap.fromTo(
          h.querySelectorAll('.wi'),
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.85,
            ease: 'power4.out',
            stagger: 0.06,
            scrollTrigger: { trigger: h, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hard wipes on image frames. */
      gsap.utils.toArray('.sm-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.1,
            ease: 'power4.inOut',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Red rules draw. */
      gsap.utils.toArray('.sm-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Remaining count-ups (capability proofs carry none; footer none). */
      bindCountUps(
        globalCounts.filter((el) => !el.closest('.sm-hero')),
        sc
      );
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* M1 — scroll-driven work index. Pinned two-column ≥1024px via
     gsap.matchMedia; stacked cards below; static list under reduced motion. */
  useLayoutEffect(() => {
    if (reduced) {
      gsap.utils.toArray('#work .sm-count', rootRef.current).forEach(paintCount);
      return undefined;
    }
    const ctx = gsap.context(() => {
      const sc = scroller();
      const stage = stageRef.current;
      const list = listRef.current;
      if (!stage || !list) return;
      const rows = gsap.utils.toArray('.sm-case-row', list);
      const previews = gsap.utils.toArray('.sm-preview-img', stage);
      const keys = [...new Set(rows.map((r) => r.dataset.img))];
      const caption = captionRef.current;
      let current = -1;

      /* crossfadeSwap: 0.5s opacity crossfade, skipped when the image is unchanged. */
      const setActive = (idx) => {
        if (idx === current || !rows[idx]) return;
        const prevKey = current >= 0 ? rows[current].dataset.img : null;
        const nextKey = rows[idx].dataset.img;
        rows.forEach((r, i) => r.classList.toggle('is-active', i === idx));
        current = idx;
        if (caption) caption.textContent = rows[idx].dataset.caption;
        if (prevKey === nextKey) return;
        const pi = keys.indexOf(prevKey);
        const ni = keys.indexOf(nextKey);
        if (pi >= 0 && previews[pi]) {
          gsap.to(previews[pi], { opacity: 0, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
        }
        if (ni >= 0 && previews[ni]) {
          gsap.fromTo(
            previews[ni],
            { opacity: 0, scale: 1.07 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.inOut', overwrite: 'auto' }
          );
        }
      };
      activateRef.current = setActive;

      /* Index numerals tick as the stage arrives; mobile cards tick per card. */
      bindCountUps(gsap.utils.toArray('.sm-index-stage .sm-count', rootRef.current), sc, stage, 'top 80%');
      gsap.utils.toArray('.sm-index-mobile .sm-count', rootRef.current).forEach((el) => bindCountUps([el], sc, el, 'top 92%'));

      /* Mobile cards reveal. */
      gsap.utils.toArray('.sm-case-card', rootRef.current).forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      /* Active row = the row crossing the stage's vertical center line. */
      const computeActive = (progress) => {
        const dist = Math.max(0, list.offsetHeight - stage.offsetHeight);
        const H = stage.offsetHeight;
        const h = rows[0] ? rows[0].offsetHeight : 1;
        const y = -progress * dist;
        const idx = Math.round((H / 2 - y - h / 2) / h);
        return Math.max(0, Math.min(rows.length - 1, idx));
      };

      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const dist = () => Math.max(0, list.offsetHeight - stage.offsetHeight);
        setActive(computeActive(0));
        if (dist() <= 0) return undefined;
        gsap.fromTo(list, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(list, {
          y: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            scroller: sc,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(computeActive(self.progress)),
          },
        });
        return undefined;
      });
    }, rootRef);
    ScrollTrigger.refresh();
    return () => {
      activateRef.current = null;
      ctx.revert();
    };
  }, [filter, reduced, scroller, rootRef]);

  const hoverActivate = (i) => () => {
    if (activateRef.current) activateRef.current(i);
  };

  return (
    <div ref={rootRef} className="tpl-design-01-portfolio">
      <header className="sm-nav">
        <a className="sm-wordmark" href="#hero">
          {name}
          <span className="sm-dot">.</span>
        </a>
        <nav className="sm-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="sm-cta" href="#contact">
          Start a project
        </a>
      </header>

      <main>
        {/* HERO — latest case, scroll-driven pin-up dolly (frame sequence) */}
        <section id="hero" className="sm-hero" data-tour="Latest Work">
          <ScrollFrames
            frames={frames}
            alt={content.hero.videoAlt}
            pinDistance="+=170%"
            className="sm-hero-frames"
          >
            <div className="sm-hero-scrim" aria-hidden="true" />
            <div className="sm-hero-copy">
              <p className="sm-eyebrow sm-hero-eyebrow">
                <span className="sm-eyebrow-tick" aria-hidden="true" />
                {content.hero.eyebrow}
              </p>
              <h1 className="sm-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="sm-hero-outcome">
                <Outcome o={content.hero.outcome} />
                <span className="sm-hero-outcome-label">{content.hero.outcome.label}</span>
              </p>
              <p className="sm-hero-sub">{content.hero.sub}</p>
              <div className="sm-hero-ctas">
                <a className="sm-cta" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="sm-cta sm-cta-ghost" href={content.hero.secondaryHref}>
                  {content.hero.secondaryCta}
                </a>
              </div>
              <dl className="sm-hero-meta">
                {content.hero.meta.map((m) => (
                  <div key={m.k}>
                    <dt>{m.k}</dt>
                    <dd>{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a className="sm-scroll-hint" href="#work">
              {content.hero.scrollHint}
            </a>
          </ScrollFrames>
        </section>

        {/* WORK — M1 scroll-driven index */}
        <section id="work" className="sm-work" data-tour="Selected Work">
          <div className="sm-wrap sm-work-head">
            <p className="sm-eyebrow sm-rv">
              <span className="sm-eyebrow-tick" aria-hidden="true" />
              {content.work.eyebrow}
            </p>
            <h2 className="sm-h2 sm-rv-mask">
              <Words text={content.work.title} />
            </h2>
            <p className="sm-lede sm-rv">{content.work.lede}</p>
            <div className="sm-filters sm-rv" role="tablist" aria-label="Filter cases by discipline">
              {content.filters.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`sm-filter${filter === f.id ? ' is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span className="sm-filter-count">{filterCount(f.id)}</span>
                </button>
              ))}
            </div>
          </div>

          {reduced ? (
            <div className="sm-index-static" aria-label="Case studies">
              {filtered.map((c, i) => (
                <CaseCard key={c.client} c={c} index={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="sm-index-desktop">
                <div className="sm-index-stage" ref={stageRef}>
                  <div className="sm-index-cols">
                    <div className="sm-index-listcol">
                      <div className="sm-index-list" ref={listRef} role="list" aria-label="Case studies">
                        {filtered.map((c, i) => (
                          <button
                            key={c.client}
                            type="button"
                            role="listitem"
                            className="sm-case-row"
                            data-img={c.imgKey}
                            data-caption={`${c.title} — ${c.sector} · ${c.year}`}
                            onMouseEnter={hoverActivate(i)}
                            onFocus={hoverActivate(i)}
                            onClick={hoverActivate(i)}
                          >
                            <span className="sm-case-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="sm-case-main">
                              <span className="sm-case-title">{c.title}</span>
                              <span className="sm-case-meta">
                                {c.sector} · {c.year} · {c.budget}
                              </span>
                            </span>
                            <span className="sm-case-outcome">
                              <Outcome o={c.outcome} />
                              <small>{c.outcome.label}</small>
                            </span>
                          </button>
                        ))}
                      </div>
                      <span className="sm-index-line" aria-hidden="true" />
                    </div>
                    <div className="sm-index-previewcol">
                      <div className="sm-preview-frame" aria-hidden="true">
                        {previewKeys.map((key) => (
                          <Img
                            key={key}
                            k={key}
                            src={img(key, IMAGES[key])}
                            alt={previewAltFor(key)}
                            className="sm-preview-img"
                          />
                        ))}
                      </div>
                      <p className="sm-preview-caption" ref={captionRef}>
                        {`${filtered[0].title} — ${filtered[0].sector} · ${filtered[0].year}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm-index-mobile" aria-label="Case studies">
                {filtered.map((c, i) => (
                  <CaseCard key={c.client} c={c} index={i} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="sm-caps sm-sec" data-tour="Capabilities">
          <div className="sm-wrap">
            <p className="sm-eyebrow sm-rv">
              <span className="sm-eyebrow-tick" aria-hidden="true" />
              {content.capabilities.eyebrow}
            </p>
            <h2 className="sm-h2 sm-rv-mask">
              <Words text={content.capabilities.title} />
            </h2>
            <p className="sm-lede sm-rv">{content.capabilities.lede}</p>
            <span className="sm-rule" aria-hidden="true" />
            <ol className="sm-caps-list sm-rv-group">
              {content.capabilities.items.map((c, i) => (
                <li className="sm-cap" key={c.title}>
                  <span className="sm-cap-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="sm-cap-title">{c.title}</h3>
                    <p className="sm-cap-proof">{c.proof}</p>
                  </div>
                  <span className="sm-cap-arrow" aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CLIENTS */}
        <section id="clients" className="sm-sec" data-tour="Clients">
          <div className="sm-wrap">
            <p className="sm-eyebrow sm-rv">
              <span className="sm-eyebrow-tick" aria-hidden="true" />
              {content.clients.eyebrow}
            </p>
            <h2 className="sm-h2 sm-rv-mask">
              <Words text={content.clients.title} />
            </h2>
            <ul className="sm-client-list sm-rv-group">
              {content.clients.names.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="sm-clients-note sm-rv">{content.clients.note}</p>
          </div>
        </section>

        {/* STUDIO */}
        <section id="studio" className="sm-sec" data-tour="The Studio">
          <div className="sm-wrap sm-studio-grid">
            <div>
              <p className="sm-eyebrow sm-rv">
                <span className="sm-eyebrow-tick" aria-hidden="true" />
                {content.studio.eyebrow}
              </p>
              <h2 className="sm-h2 sm-rv-mask">
                <Words text={content.studio.title} />
              </h2>
              <span className="sm-rule" aria-hidden="true" />
              <div className="sm-studio-body" style={{ marginTop: 40 }}>
                {content.studio.body.map((p, i) => (
                  <p className="sm-rv" key={i}>
                    {p}
                  </p>
                ))}
              </div>
              <dl className="sm-studio-facts sm-rv-group">
                {content.studio.facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className="sm-studio-fig sm-wipe">
              <Img k="detail" src={img('detail', detailImg)} alt={content.studio.imgAlt} />
              <figcaption>{content.studio.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sm-contact sm-sec" data-tour="Start a Project">
          <div className="sm-wrap sm-contact-grid">
            <div>
              <p className="sm-eyebrow sm-rv">
                <span className="sm-eyebrow-tick" aria-hidden="true" />
                {content.contact.eyebrow}
              </p>
              <h2 className="sm-h2 sm-rv-mask">
                <Words text={content.contact.title} />
              </h2>
              <p className="sm-lede sm-rv">{content.contact.lede}</p>
              <dl className="sm-contact-rows sm-rv-group">
                <div className="sm-contact-row">
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${email}`}>{email}</a>
                  </dd>
                </div>
                <div className="sm-contact-row">
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                  </dd>
                </div>
                {content.contact.addresses.map((a) => (
                  <div className="sm-contact-row" key={a.city}>
                    <dt>{a.city}</dt>
                    <dd>
                      <address>
                        <strong>{a.city} — </strong>
                        {a.lines}
                      </address>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="sm-rv">
              <ContactForm email={email} />
            </div>
          </div>
        </section>
      </main>

      <footer className="sm-footer">
        <div className="sm-wrap">
          <p className="sm-footer-word">
            {name}
            <span className="sm-dot">.</span>
          </p>
          <div className="sm-footer-cols">
            <div>
              <h3>Sitemap</h3>
              <ul>
                {content.nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#capabilities">Capabilities</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Elsewhere</h3>
              <ul>
                {content.footer.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>New business</h3>
              <p>
                <a href={`mailto:${email}`}>{email}</a>
                <br />
                {content.contact.phone}
              </p>
            </div>
          </div>
          <p className="sm-footer-line">{content.footer.line}</p>
          <p className="sm-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
