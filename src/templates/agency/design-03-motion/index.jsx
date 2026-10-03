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

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-03-motion';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Anton&family=Manrope:wght@400;500;600;700;800&display=swap';

const IMGS = { hero: heroImg, 'work-1': work1Img, 'work-2': work2Img, 'work-3': work3Img, detail: detailImg };

/* Hero frame sequence: 72 stills of the projector beam, scrubbed by scroll
   (Apple-style). Replaces the old autoplay video hero. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Frame counter in 00:00:00:00 (HH:MM:SS:FF) at 24fps */
function fmtTC(frames) {
  const f = Math.max(0, Math.floor(frames));
  const p = (n) => String(n).padStart(2, '0');
  return `${p(Math.floor(f / 1382400))}:${p(Math.floor(f / 57600) % 60)}:${p(Math.floor(f / 24) % 60)}:${p(f % 24)}`;
}

/* Server-safe word-mask headline. A real space sits between the word masks
   so headlines never run together. */
function Words({ text, accentWords = [], className = '' }) {
  return (
    <span className={`fh-wm ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className={`wi${accentWords.includes(w.replace(/[.,]/g, '')) ? ' accent-word' : ''}`}>{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Wordmark: the brand name with its last word in amber, e.g. KELA <em>STUDIO</em>. */
function Wordmark({ name }) {
  const parts = String(name).trim().split(/\s+/);
  const last = parts.length > 1 ? parts.pop() : '';
  return (
    <>
      {parts.join(' ')}
      {last && <>{' '}<em>{last}</em></>}
    </>
  );
}

/* One film row. Hovering the thumbnail ticks a running timecode (motion only). */
function FilmCard({ film, index, src }) {
  const tcRef = useRef(null);
  const tick = useRef(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  const startTick = () => {
    if (reduced || !tcRef.current || tick.current) return;
    frame.current = Math.floor(Math.random() * 240);
    const cb = () => {
      frame.current = (frame.current + 1) % 240;
      if (tcRef.current) tcRef.current.textContent = `TC ${fmtTC(frame.current)}`;
    };
    tick.current = cb;
    gsap.ticker.add(cb);
  };
  const stopTick = () => {
    if (tick.current) {
      gsap.ticker.remove(tick.current);
      tick.current = null;
    }
    if (tcRef.current) tcRef.current.textContent = 'TC 00:00:00:00';
  };
  useEffect(() => () => stopTick(), []);

  return (
    <li className="fh-film fh-rv">
      <a className="fh-film-link" href="#contact" onMouseEnter={startTick} onMouseLeave={stopTick} onFocus={startTick} onBlur={stopTick}
         aria-label={`${film.title} — ${film.discipline} for ${film.client}. Request a treatment.`}>
        <div className="fh-film-thumb">
          <Img k={film.imgKey} src={src} alt={film.alt} />
          <span className="fh-film-tc" ref={tcRef} aria-hidden="true">TC 00:00:00:00</span>
        </div>
        <div className="fh-film-info">
          <span className="fh-film-index">{String(index + 1).padStart(2, '0')} / {film.discipline}</span>
          <h3 className="fh-film-title">{film.title}</h3>
          <p className="fh-film-logline">{film.logline}</p>
          <ul className="fh-film-credits">
            <li>Client <strong>{film.client}</strong></li>
            <li>Dir. <strong>{film.director}</strong></li>
            <li><strong>{film.year}</strong></li>
            <li>Runtime <strong>{film.runtime}</strong></li>
          </ul>
        </div>
        <span className="fh-film-arrow" aria-hidden="true">→</span>
      </a>
    </li>
  );
}

/* Treatment request: composes a real email in the visitor's mail app — never a dead form. */
function TreatmentForm({ email }) {
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState(content.contact.budgetBands[1]);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const subject = `Treatment request — ${fd.get('type')} (${fd.get('budget')})`;
    const body = [
      `Name: ${fd.get('name')}`,
      `Company: ${fd.get('company') || '—'}`,
      `Email: ${fd.get('email')}`,
      `Project: ${fd.get('type')}`,
      `Budget: ${fd.get('budget')}`,
      `Timeline: ${fd.get('timeline') || '—'}`,
      '',
      `The brief:`,
      `${fd.get('message')}`,
    ].join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="fh-form" onSubmit={onSubmit}>
      <div className="fh-field-row">
        <div className="fh-field">
          <label htmlFor="fh-name">Your name</label>
          <input id="fh-name" name="name" type="text" required autoComplete="name" placeholder="Ava Chen" />
        </div>
        <div className="fh-field">
          <label htmlFor="fh-company">Company</label>
          <input id="fh-company" name="company" type="text" autoComplete="organization" placeholder="Halcyon Pictures" />
        </div>
      </div>
      <div className="fh-field">
        <label htmlFor="fh-email">Work email</label>
        <input id="fh-email" name="email" type="email" required autoComplete="email" placeholder="ava@halcyon.pictures" />
      </div>
      <div className="fh-field-row">
        <div className="fh-field">
          <label htmlFor="fh-type">Project type</label>
          <select id="fh-type" name="type" defaultValue={content.contact.projectTypes[0]}>
            {content.contact.projectTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="fh-field">
          <label htmlFor="fh-timeline">Timeline</label>
          <input id="fh-timeline" name="timeline" type="text" placeholder="e.g. On air by March" />
        </div>
      </div>
      <div className="fh-field">
        <label id="fh-budget-label">Budget band</label>
        <div className="fh-chips" role="radiogroup" aria-labelledby="fh-budget-label">
          {content.contact.budgetBands.map((b) => (
            <label className="fh-chip" key={b}>
              <input type="radio" name="budget" value={b} checked={budget === b} onChange={() => setBudget(b)} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="fh-field">
        <label htmlFor="fh-message">The brief</label>
        <textarea id="fh-message" name="message" required
          placeholder="What’s the film? Who’s it for? What should the audience feel in the first ten seconds?" />
      </div>
      {sent
        ? <p className="fh-sent" role="status">{content.contact.sentNote}</p>
        : <button className="fh-cta" type="submit">{content.contact.submit}</button>}
      <p className="fh-form-note">No newsletters, no follow-up sequences. A director replies, or nobody does.</p>
    </form>
  );
}

export default function Design03Motion() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;

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

      /* HERO: 0.5s black hold, then the beam stage fades in over 1.8s; title rises. */
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.fh-hero .sf-stage', { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.inOut' }, 0.5)
        .fromTo('.fh-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 }, 1.0)
        .fromTo(
          '.fh-hero-sub, .fh-hero-ctas, .fh-hero-meta',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          1.5
        );

      /* House reveals */
      gsap.utils.toArray('.fh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.fh-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.fh-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.9, ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* M3 — SHOWREEL SCRUB. Pinned letterboxed frame ≥1024px: scroll scrubs
         5 stills (crossfade + scale 1.08→1 settle), a running HH:MM:SS:FF frame
         counter, and the letterbox bars widen 8%→14%. Mobile + reduced motion
         get the stacked stills instead (rendered below). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.fh-reel-pin');
        if (!pin) return;
        const stills = gsap.utils.toArray('.fh-still', pin);
        const tcNode = pin.querySelector('.fh-tc');
        const capNode = pin.querySelector('.fh-still-cap');
        const barTop = pin.querySelector('.fh-bar--top');
        const barBot = pin.querySelector('.fh-bar--bot');
        if (!stills.length) return;

        gsap.set(stills, { opacity: 0, scale: 1.08 });
        gsap.set(stills[0], { opacity: 1, scale: 1 });

        const TOTAL_FRAMES = stills.length * 48; /* 5 stills × 2s @ 24fps */
        let lastIdx = 0;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=320%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (tcNode) tcNode.textContent = fmtTC(self.progress * TOTAL_FRAMES);
              const idx = Math.min(stills.length - 1, Math.floor(self.progress * stills.length));
              if (idx !== lastIdx) {
                lastIdx = idx;
                if (capNode) capNode.textContent = content.films[idx].title;
              }
            },
          },
        });
        stills.forEach((s, i) => {
          if (i === 0) return;
          tl.to(stills[i - 1], { opacity: 0, duration: 1, ease: 'power2.inOut' }, i);
          tl.fromTo(s, { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }, i);
        });
        /* Letterbox widens 8% → 14%: the bars are 14% tall in CSS and scale
           from 8/14 — a compositor-only transform instead of a height tween
           that re-laid-out the frame on every scrubbed frame. */
        const barFrom = 8 / 14;
        tl.fromTo([barTop, barBot], { scaleY: barFrom }, { scaleY: 1, duration: stills.length, ease: 'none' }, 0);
      });

      /* Two fade-to-black dips, 0.6s each — entering the reel, entering contact. */
      [['.fh-reel', '.fh-dip-1'], ['.fh-contact', '.fh-dip-2']].forEach(([trigSel, dipSel]) => {
        const dip = rootRef.current && rootRef.current.querySelector(dipSel);
        if (!dip) return;
        gsap.timeline({
          scrollTrigger: { trigger: trigSel, scroller: sc, start: 'top 72%', once: true },
        })
          /* a deep dip, never a full blackout: the page stays readable */
          .to(dip, { opacity: 0.85, duration: 0.6, ease: 'power2.inOut' })
          .to(dip, { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const reelStills = content.films.map((f) => ({ ...f, src: img(f.imgKey, IMGS[f.imgKey]) }));

  return (
    <div ref={rootRef} className={`tpl-design-03-motion${reduced ? ' is-reduced' : ''}`}>
      {/* Zero-height sticky layer: keeps the overlay nav and the fade-to-black
          dips pinned to the visible scroll area (the viewer scrolls inside a
          panel, so position: fixed would sit on top of its toolbar). */}
      <div className="fh-topbar">
        <div className="fh-dip fh-dip-1" aria-hidden="true" />
        <div className="fh-dip fh-dip-2" aria-hidden="true" />

        <header className="fh-nav">
          <a className="fh-wordmark" href="#hero"><Wordmark name={name} /></a>
          <nav className="fh-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="fh-cta" href={content.reelCta.href}>{content.reelCta.label}</a>
        </header>
      </div>

      <main>
        {/* HERO — scroll-driven frame sequence ("the beam"), pinned +170% */}
        <section id="hero" className="fh-hero" data-tour="Welcome">
          <ScrollFrames frames={frames} alt="Projector beam drifting through haze, frame by frame" pinDistance="+=170%">
            <div className="fh-hero-bar fh-hero-bar--top" aria-hidden="true" />
            <div className="fh-hero-bar fh-hero-bar--bot" aria-hidden="true" />
            <div className="fh-hero-shade" aria-hidden="true" />
            <div className="fh-hero-copy">
              <p className="fh-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="fh-hero-title">
                <Words text={content.hero.title} accentWords={['MOVING']} />
              </h1>
              <p className="fh-hero-sub">{content.hero.sub}</p>
              <div className="fh-hero-ctas">
                <a className="fh-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="fh-cta fh-cta--ghost" href={content.hero.secondaryCtaHref}>{content.hero.secondaryCta}</a>
              </div>
              <ul className="fh-hero-meta">
                {content.hero.meta.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>
          </ScrollFrames>
        </section>

        {/* SHOWREEL — M3 */}
        <section id="reel" className="fh-reel" data-tour="Showreel" aria-label="Showreel">
          <div className="fh-wrap fh-reel-head">
            <p className="fh-eyebrow fh-rv">{content.reel.eyebrow}</p>
            <h2 className="fh-reel-title fh-rv">{content.reel.title}</h2>
            <p className="fh-reel-note fh-rv">{content.reel.note}</p>
          </div>

          <div className="fh-reel-pin">
            <div className="fh-frame" role="img"
              aria-label="Showreel: five film stills scrubbed by scrolling, with a running frame counter">
              {reelStills.map((s) => (
                <figure className="fh-still" key={s.imgKey} aria-hidden="true">
                  <Img k={s.imgKey} src={s.src} alt="" />
                </figure>
              ))}
              <div className="fh-bar fh-bar--top" aria-hidden="true" />
              <div className="fh-bar fh-bar--bot" aria-hidden="true" />
              <span className="fh-scrub-hint" aria-hidden="true">Scroll to scrub</span>
              <span className="fh-still-cap">{content.films[0].title}</span>
              <span className="fh-tc">00:00:00:00</span>
            </div>
          </div>

          <div className="fh-reel-stack" aria-label="Showreel stills">
            {reelStills.map((s, i) => (
              <figure className="fh-rv" key={s.imgKey}>
                <Img k={s.imgKey} src={s.src} alt={s.alt} />
                <figcaption className="fh-stack-cap">
                  <strong>{s.title}</strong>
                  <span>{String(i + 1).padStart(2, '0')} / 05 · {s.runtime}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* SELECTED FILMS */}
        <section id="films" className="fh-sec" data-tour="Selected Films">
          <div className="fh-wrap">
            <div className="fh-films-head">
              <div>
                <p className="fh-eyebrow fh-rv">Selected films</p>
                <h2 className="fh-h2 fh-rv"><Words text="TITLE CARDS, EARNED." /></h2>
              </div>
              <p className="fh-body fh-rv">Five recent commissions. Every frame below shipped to a screen — broadcast, cinema or stream.</p>
            </div>
            <ul className="fh-film-list">
              {content.films.map((f, i) => (
                <FilmCard key={f.title} film={f} index={i} src={img(f.imgKey, IMGS[f.imgKey])} />
              ))}
            </ul>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="fh-sec fh-caps" data-tour="Capabilities">
          <div className="fh-wrap">
            <p className="fh-eyebrow fh-rv">Capabilities</p>
            <h2 className="fh-h2 fh-rv"><Words text="WHAT THE BUILDING DOES." /></h2>
            <hr className="fh-rule" aria-hidden="true" />
            <ul className="fh-caps-grid fh-stagger">
              {content.capabilities.map((c, i) => (
                <li className="fh-cap" key={c.name}>
                  <span className="fh-cap-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="fh-cap-name">{c.name}</h3>
                  <p className="fh-cap-text">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DIRECTORS */}
        <section id="directors" className="fh-sec" data-tour="Directors">
          <div className="fh-wrap">
            <p className="fh-eyebrow fh-rv">The studio</p>
            <h2 className="fh-h2 fh-rv"><Words text="DIRECTORS ON THE ROSTER." /></h2>
            <ul className="fh-dir-list">
              {content.directors.map((d) => (
                <li className="fh-dir fh-rv" key={d.name}>
                  <div>
                    <h3 className="fh-dir-name">{d.name}</h3>
                    <span className="fh-dir-role">{d.role}</span>
                  </div>
                  <p className="fh-dir-note">{d.note}</p>
                </li>
              ))}
            </ul>
            <div className="fh-kit fh-rv">
              <h3>The kit</h3>
              <p>{content.kit}</p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="fh-sec fh-process" data-tour="Process">
          <div className="fh-wrap">
            <p className="fh-eyebrow fh-rv">Process</p>
            <h2 className="fh-h2 fh-rv"><Words text="FROM BRIEF TO BROADCAST." /></h2>
            <ol className="fh-steps fh-stagger">
              {content.process.map((p, i) => (
                <li className="fh-step" key={p.name}>
                  <span className="fh-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="fh-step-name">{p.name}</h3>
                  <p className="fh-step-text">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="fh-sec fh-contact" data-tour="Contact">
          <div className="fh-wrap">
            <p className="fh-eyebrow fh-rv">{content.contact.eyebrow}</p>
            <h2 className="fh-h2 fh-rv"><Words text={content.contact.title} /></h2>
            <hr className="fh-rule" aria-hidden="true" />
            <div className="fh-contact-grid">
              <div className="fh-rv">
                <p className="fh-body">{content.contact.text}</p>
                <ul className="fh-contact-lines">
                  <li>
                    <span className="fh-contact-label">Email</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li>
                    <span className="fh-contact-label">Phone</span>
                    <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
                  </li>
                  <li>
                    <span className="fh-contact-label">Studio</span>
                    <span className="fh-body" style={{ margin: 0 }}>{content.brand.location}</span>
                  </li>
                </ul>
              </div>
              <div className="fh-rv">
                <TreatmentForm email={email} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fh-footer">
        <div className="fh-wrap">
          <div className="fh-footer-top">
            <a className="fh-wordmark" href="#hero"><Wordmark name={name} /></a>
            <nav className="fh-footer-links" aria-label="Footer">
              {content.nav.map((n) => (
                <a key={n.href} href={n.href}>{n.label}</a>
              ))}
              <a href={content.reelCta.href}>{content.reelCta.label}</a>
            </nav>
          </div>
          <p className="fh-footer-line">{content.footer.line}</p>
          <p className="fh-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
