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

/* Scroll-driven build sequence: 72 frames scrubbed by scroll (replaces the
   autoplay loop). Zero-padded names sort into playback order. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-digital';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap';

const CASE_IMAGES = {
  hero: heroImg,
  'work-1': work1Img,
  'work-2': work2Img,
  'work-3': work3Img,
  detail: detailImg,
};

function fmt(m) {
  return `${m.prefix || ''}${Number(m.value).toFixed(m.decimals || 0)}${m.suffix || ''}`;
}

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   A real space sits between the word masks so headlines never run together. */
function Words({ text, accentLast = false }) {
  const words = String(text).split(' ');
  return (
    <span className="id08-wm" aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className={`wi${accentLast && i === words.length - 1 ? ' accent' : ''}`}>{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function countUpEl(el) {
  const target = parseFloat(el.dataset.value);
  const dec = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const obj = { v: 0 };
  gsap.to(obj, {
    v: target,
    duration: 1.2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${prefix}${obj.v.toFixed(dec)}${suffix}`;
    },
    onComplete: () => {
      el.textContent = `${prefix}${target.toFixed(dec)}${suffix}`;
    },
  });
}

function AuditForm() {
  const { contact } = useCustom();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState(content.contact.budgets[1]);
  const [metric, setMetric] = useState('');
  const to = contact.email || content.contact.email;

  const submit = (e) => {
    e.preventDefault();
    const subject = `Audit request — ${company || 'new product'}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Budget: ${budget}`,
      '',
      'The metric that matters:',
      metric,
    ].join('\n');
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="id08-form" onSubmit={submit}>
      <h3>Request your audit</h3>
      <div className="id08-field">
        <label htmlFor="id08-f-name">Name</label>
        <input id="id08-f-name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </div>
      <div className="id08-field">
        <label htmlFor="id08-f-company">Company</label>
        <input id="id08-f-company" value={company} onChange={(e) => setCompany(e.target.value)} required autoComplete="organization" />
      </div>
      <div className="id08-field">
        <label htmlFor="id08-f-email">Work email</label>
        <input id="id08-f-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>
      <div className="id08-field">
        <label htmlFor="id08-f-budget">Budget band</label>
        <select id="id08-f-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
          {content.contact.budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="id08-field">
        <label htmlFor="id08-f-metric">The metric that matters</label>
        <textarea
          id="id08-f-metric"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          placeholder="e.g. onboarding completion, stuck at 28%"
          required
        />
      </div>
      <button className="id08-cta" type="submit">
        Book the audit <span className="id08-arrow" aria-hidden="true">→</span>
      </button>
      <p className="id08-form-note">{content.contact.formNote}</p>
    </form>
  );
}

export default function Design08Digital() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const activeRef = useRef(-1);
  const railNumRef = useRef(null);
  const railClientRef = useRef(null);
  const refreshTimer = useRef(0);
  /* Opening/closing a case row changes the page height: re-measure every
     trigger once it settles, or reveals further down keep stale start
     positions (some ended up below the bottom of the page and never fired). */
  const queueRefresh = () => {
    clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => ScrollTrigger.refresh(), 150);
  };
  useEffect(() => () => clearTimeout(refreshTimer.current), []);

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* M8 activate: expand row, collapse previous, countUp its metrics,
     crossfade the sticky rail's giant index number. */
  const activate = (i, instant = false, fromScroll = false) => {
    const root = rootRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll('.id08-case'));
    if (i === activeRef.current && !instant) {
      /* Toggle closed */
      const row = rows[i];
      if (row) {
        row.classList.remove('is-active');
        gsap.to(row.querySelector('.id08-case-body'), { height: 0, duration: 0.45, ease: 'power3.inOut', onComplete: queueRefresh });
      }
      activeRef.current = -1;
      return;
    }
    const prev = activeRef.current;
    if (prev >= 0 && rows[prev] && prev !== i) {
      rows[prev].classList.remove('is-active');
      /* While scrolling down, the row being left sits ABOVE the reading line:
         collapsing it would yank everything below up under the reader (and
         shift every trigger), so it stays open. Rows below the new active row
         (scrolling back up) and click toggles still compress to one line. */
      if (!(fromScroll && prev < i)) {
        gsap.to(rows[prev].querySelector('.id08-case-body'), {
          height: 0,
          duration: 0.45,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: queueRefresh,
        });
      }
    }
    activeRef.current = i;
    const row = rows[i];
    const c = content.work.cases[i];
    if (!row || !c) return;
    row.classList.add('is-active');
    const body = row.querySelector('.id08-case-body');
    if (instant) {
      gsap.set(body, { height: 'auto' });
      row.querySelectorAll('[data-count]').forEach((el) => {
        el.textContent = fmt(content.work.cases[i].metrics[+el.dataset.idx]);
      });
      if (railNumRef.current) {
        railNumRef.current.innerHTML = `${c.num}<span class="of"> / ${String(content.work.cases.length).padStart(2, '0')}</span>`;
      }
      if (railClientRef.current) railClientRef.current.textContent = `${c.client} — ${c.sector}`;
    } else {
      gsap.to(body, { height: 'auto', duration: 0.55, ease: 'power3.inOut', overwrite: 'auto', onComplete: queueRefresh });
      row.querySelectorAll('[data-count]').forEach((el) => setTimeout(() => countUpEl(el), 150));
      if (railNumRef.current) {
        gsap.to(railNumRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.22,
          ease: 'power2.in',
          overwrite: 'auto',
          onComplete: () => {
            railNumRef.current.innerHTML = `${c.num}<span class="of"> / ${String(content.work.cases.length).padStart(2, '0')}</span>`;
            if (railClientRef.current) railClientRef.current.textContent = `${c.client} — ${c.sector}`;
            gsap.fromTo(
              railNumRef.current,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' }
            );
          },
        });
      }
    }
  };
  const activateRef = useRef(activate);
  activateRef.current = activate;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();

      if (reduced) {
        /* Final states only: all case rows expanded statically, metrics at final values. */
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const m = content.work.cases.flatMap((c) => c.metrics)[+el.dataset.gidx];
          if (m) el.textContent = fmt(m);
        });
        gsap.utils.toArray('.id08-metric-val').forEach((el) => {
          const m = content.outcomes.metrics[+el.dataset.idx];
          if (m) el.textContent = fmt(m);
        });
        return;
      }

      /* Hero entrance: masked word-rise, frame hard-wipe, metric band countUp on load. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.id08-hero-title .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
        0
      )
        .fromTo(
          '.id08-hero-frame',
          { clipPath: 'inset(8% 6% 92% 6%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
          0.15
        )
        .fromTo(
          '.id08-hero-sub, .id08-hero-actions, .id08-hero-caption',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.7
        )
        .add(() => {
          gsap.utils.toArray('.id08-metric-val').forEach((el, i) => {
            setTimeout(() => countUpEl(el), i * 120);
          });
        }, 0.9);

      /* Default reveals. */
      gsap.utils.toArray('.id08-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.id08-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* M8: active-zone tracking — the row crossing the active band expands. */
      activateRef.current(0, true);
      gsap.utils.toArray('.id08-case').forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          scroller: sc,
          start: 'top 62%',
          end: 'bottom 38%',
          onToggle: (self) => {
            if (self.isActive && activeRef.current !== i) activateRef.current(i, false, true);
          },
          /* Scrolling back above the first case resets the rail to 01
             (it kept showing the last case reached further down). */
          onLeaveBack: i === 0
            ? () => { if (activeRef.current !== 0) activateRef.current(0, false, false); }
            : undefined,
        });
      });

      /* Capability cells: borders draw on scroll. */
      gsap.utils.toArray('.id08-cap').forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { borderColor: 'rgba(223,228,234,0)' },
          {
            borderColor: '#DFE4EA',
            duration: 0.8,
            ease: 'power2.out',
            delay: (i % 4) * 0.12,
            scrollTrigger: { trigger: cell, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      /* Section hairline rules draw. */
      gsap.utils.toArray('.id08-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const toggleCase = (i) => {
    if (reduced) return;
    activateRef.current(i);
  };

  const gidx = { n: 0 };
  const bandTotal = String(content.work.cases.length).padStart(2, '0');

  return (
    <div ref={rootRef} className={`tpl-design-08-digital${reduced ? ' is-reduced' : ''}`}>
      <header className="id08-nav">
        <a className="id08-wordmark" href="#hero">
          {/* house style: the accent slash joins the words of the name */}
          {name.split(' ').map((w, i) => (
            <React.Fragment key={i}>
              {i > 0 && <em>/</em>}
              {w}
            </React.Fragment>
          ))}
        </a>
        <nav className="id08-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="id08-cta" href="#contact">Book an audit</a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="id08-hero" data-tour={name}>
          <div className="id08-hero-grid">
            <div className="id08-hero-copy">
              <p className="id08-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="id08-hero-title">
                <Words text={content.hero.title} accentLast />
              </h1>
              <p className="id08-hero-sub">{content.hero.sub}</p>
              <div className="id08-hero-actions">
                <a className="id08-cta" href={content.hero.ctaHref}>
                  {content.hero.cta} <span className="id08-arrow" aria-hidden="true">→</span>
                </a>
                <a className="id08-cta id08-cta-ghost" href={content.hero.secondaryHref}>
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div>
              <ScrollFrames
                frames={frames}
                className="id08-hero-frame"
                alt="Stylus drawing interfaces onto devices, frame by frame"
                pinDistance="+=170%"
                stageHeight="100%"
              >
                <span className="id08-frame-tag" aria-hidden="true">
                  <span className="dot" /> The build — scroll to play
                </span>
              </ScrollFrames>
              <div className="id08-hero-caption">
                <span>Device lineup · studio light</span>
                <span>Off-white / graphite / electric blue</span>
              </div>
            </div>
          </div>

          {/* OUTCOMES BAND */}
          <section id="outcomes" className="id08-band" data-tour="Outcomes" aria-label="Outcomes">
            <div className="id08-band-head">
              <p className="id08-eyebrow" style={{ marginBottom: '0.5rem' }}>{content.outcomes.eyebrow}</p>
              <p className="id08-body" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                {content.outcomes.title}
              </p>
              <p className="id08-body" style={{ fontSize: '0.8rem' }}>{content.outcomes.note}</p>
            </div>
            {content.outcomes.metrics.map((m, i) => (
              <div className="id08-metric" key={m.label}>
                <p
                  className="id08-metric-val id08-num"
                  data-value={m.value}
                  data-decimals={m.decimals}
                  data-prefix={m.prefix}
                  data-suffix={m.suffix}
                  data-idx={i}
                >
                  {fmt(m)}
                </p>
                <p className="id08-metric-label">{m.label}</p>
              </div>
            ))}
          </section>
        </section>

        {/* CASE STUDIES — M8 spec-sheet accordion rail */}
        <section id="work" className="id08-sec" data-tour="Case Studies">
          <div className="id08-wrap">
            <div className="id08-sec-head">
              <div>
                <p className="id08-eyebrow id08-rv">{content.work.eyebrow}</p>
                <h2 className="id08-h2 id08-rv">{content.work.title}</h2>
              </div>
              <p className="id08-sec-note id08-rv">{content.work.note}</p>
            </div>
            <div className="id08-work-grid">
              <aside className="id08-rail" aria-hidden="true">
                <p className="id08-rail-label">Active case</p>
                <p className="id08-rail-num" ref={railNumRef}>
                  01<span className="of"> / {bandTotal}</span>
                </p>
                <p className="id08-rail-client" ref={railClientRef}>
                  {content.work.cases[0].client} — {content.work.cases[0].sector}
                </p>
              </aside>
              <div className="id08-cases">
                {content.work.cases.map((c, i) => (
                  <article className={`id08-case${i === 0 && reduced ? ' is-active' : ''}`} key={c.num}>
                    <button
                      className="id08-case-head"
                      onClick={() => toggleCase(i)}
                      aria-expanded={reduced ? true : undefined}
                      aria-controls={`id08-case-body-${i}`}
                    >
                      <span className="id08-case-num">{c.num}</span>
                      <p className="id08-case-client">
                        {c.client}
                        <small>{c.sector} · {c.year}</small>
                      </p>
                      <p className="id08-case-headline id08-num">{c.headline}</p>
                      <span className="id08-case-chev" aria-hidden="true">+</span>
                    </button>
                    <div className="id08-case-body" id={`id08-case-body-${i}`}>
                      <div className="id08-case-inner">
                        <div>
                          <div className="id08-case-metrics">
                            {c.metrics.map((m) => {
                              const gi = gidx.n++;
                              return (
                                <div className="id08-cm" key={m.label}>
                                  <p
                                    className="id08-cm-val id08-num"
                                    data-count
                                    data-gidx={gi}
                                    data-idx={c.metrics.indexOf(m)}
                                    data-value={m.value}
                                    data-decimals={m.decimals}
                                    data-prefix={m.prefix}
                                    data-suffix={m.suffix}
                                  >
                                    {fmt(m)}
                                  </p>
                                  <p className="id08-cm-label">{m.label}</p>
                                </div>
                              );
                            })}
                          </div>
                          <p className="id08-case-summary">{c.summary}</p>
                          <table className="id08-spec">
                            <tbody>
                              <tr>
                                <th scope="row">Timeline</th>
                                <td>{c.timeline}</td>
                              </tr>
                              <tr>
                                <th scope="row">Stack</th>
                                <td>{c.stack}</td>
                              </tr>
                              <tr>
                                <th scope="row">Engagement</th>
                                <td>{c.sector} · {c.year}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <figure className="id08-case-img">
                          <Img k={c.imgKey} src={img(c.imgKey, CASE_IMAGES[c.imgKey])} alt={c.alt} />
                          <figcaption>{c.client} — {c.sector}</figcaption>
                        </figure>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="id08-caps id08-sec" data-tour="Capabilities">
          <div className="id08-wrap">
            <div className="id08-sec-head">
              <div>
                <p className="id08-eyebrow id08-rv">{content.capabilities.eyebrow}</p>
                <h2 className="id08-h2 id08-rv">{content.capabilities.title}</h2>
              </div>
            </div>
          </div>
          <div className="id08-wrap">
            <div className="id08-cap-grid">
              {content.capabilities.cells.map((cap) => (
                <div className="id08-cap" key={cap.num}>
                  <p className="id08-cap-num">{cap.num}</p>
                  <h3>{cap.name}</h3>
                  <p className="id08-cap-proof">{cap.proof}</p>
                  <ul>
                    {cap.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="id08-sec" data-tour="Process">
          <div className="id08-wrap">
            <div className="id08-sec-head">
              <div>
                <p className="id08-eyebrow id08-rv">{content.process.eyebrow}</p>
                <h2 className="id08-h2 id08-rv">{content.process.title}</h2>
              </div>
              <p className="id08-sec-note id08-rv">{content.process.note}</p>
            </div>
            <div className="id08-sprints id08-stagger">
              {content.process.sprints.map((s) => (
                <div className="id08-sprint" key={s.num}>
                  <p className="id08-sprint-time">{s.num} · {s.time}</p>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="id08-sprint-deliv">
                    <span>Deliverables</span>
                    <ul>
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="id08-testis id08-sec" data-tour="Testimonials">
          <div className="id08-wrap">
            <p className="id08-eyebrow id08-rv">{content.testimonials.eyebrow}</p>
            <h2 className="id08-h2 id08-rv">{content.testimonials.title}</h2>
            <div className="id08-testi-grid id08-stagger" style={{ marginTop: '2.5rem' }}>
              {content.testimonials.quotes.map((q) => (
                <div className="id08-testi" key={q.name}>
                  <blockquote>“{q.text}”</blockquote>
                  <footer>
                    <cite>{q.name}</cite>
                    <span className="role">{q.role}</span>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="id08-sec" data-tour="Book an Audit">
          <div className="id08-wrap">
            <div className="id08-contact-grid">
              <div>
                <p className="id08-eyebrow id08-rv">{content.contact.eyebrow}</p>
                <h2 className="id08-h2 id08-rv">{content.contact.title}</h2>
                <p className="id08-body id08-rv" style={{ marginTop: '1rem' }}>{content.contact.body}</p>
                <dl className="id08-contact-lines id08-rv">
                  <div className="id08-line">
                    <dt>Email</dt>
                    <dd><a href={`mailto:${email}`}>{email}</a></dd>
                  </div>
                  <div className="id08-line">
                    <dt>Phone</dt>
                    <dd>{content.brand.phone}</dd>
                  </div>
                  <div className="id08-line">
                    <dt>Studio</dt>
                    <dd>{content.contact.address}</dd>
                  </div>
                  <div className="id08-line">
                    <dt>Hours</dt>
                    <dd>{content.brand.hours}</dd>
                  </div>
                </dl>
              </div>
              <div className="id08-rv">
                <AuditForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="id08-footer">
        <div className="id08-footer-grid">
          <div>
            <p className="id08-footer-line">{content.footer.line}</p>
            <p className="id08-colophon">{content.footer.colophon}</p>
          </div>
          <nav className="id08-footer-links" aria-label="Social">
            {content.footer.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
