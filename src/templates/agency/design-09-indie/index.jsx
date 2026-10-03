import React, { useEffect, useLayoutEffect } from 'react';
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

/* Scroll-driven desk-band frame sequence (72 frames). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-indie';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap';

/* Project image map: 6 projects, 5 generated plates (reused where the
   story calls for the same kind of shot). */
const projectShots = [
  { img: work1Img, key: 'work-1' },
  { img: work2Img, key: 'work-2' },
  { img: work3Img, key: 'work-3' },
  { img: work2Img, key: 'work-4' },
  { img: work1Img, key: 'work-5' },
  { img: detailImg, key: 'work-6' },
];

/* Hand-drawn wavy underline — SVG path draws via dashoffset (0.8s). */
function Squiggle() {
  return (
    <svg className="jp-squig" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path
        d="M2 5 C 14 2, 24 7, 36 4 S 58 2, 70 5 S 88 7, 98 4"
        pathLength="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function KeyLine({ children }) {
  return (
    <span className="jp-key">
      {children}
      <Squiggle />
    </span>
  );
}

function JournalEntry({ entry, index }) {
  return (
    <article className="jp-entry">
      <header className="jp-entry-head jp-rv">
        <p className="jp-entry-date">{entry.date}</p>
        <h3 className="jp-entry-title">{entry.title}</h3>
      </header>
      <div className="jp-prose">
        {entry.paragraphs.map((p, i) => {
          const isKey = p.includes(entry.keyLine);
          const body = isKey ? (
            <>
              {p.split(entry.keyLine)[0]}
              <KeyLine>{entry.keyLine}</KeyLine>
              {p.split(entry.keyLine)[1]}
            </>
          ) : (
            p
          );
          const showMargin = i === entry.marginAfter;
          return (
            <div className="jp-pwrap jp-rv" key={i}>
              <p>{body}</p>
              {showMargin && (
                <aside className={`jp-margin is-${entry.marginSide}`} aria-label="Margin note">
                  {entry.margin}
                  {entry.marginPhoto && (
                    <div className="jp-margin-photo">
                      <Img k="note-photo" src={detailImg} alt={entry.marginPhotoAlt} />
                    </div>
                  )}
                </aside>
              )}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function JunePark() {
  const { rootRef, scroller } = useTplScope();
  const { brand, img, contact } = useCustom();
  const reduced = useReducedMotion();

  const name = brand || content.brand;
  /* The site speaks as one person (June, in the copy). The studio name is the
     Kela brand, so the greeting only follows the brand when it has been
     customised to a different (personal) name. */
  const firstName = brand && brand !== content.brand ? brand.split(' ')[0] : content.hero.name || name.split(' ')[0];
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
      /* Reduced motion: final states only, no scroll choreography. */
      if (reduced) {
        gsap.set('.jp-squig path', { strokeDashoffset: 0 });
        return;
      }

      /* Hero — portrait fades in (1.2s), name rises gently, pill pulses once. */
      gsap.fromTo(
        '.jp-portrait-frame',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'sine.inOut' }
      );
      gsap.fromTo(
        '.jp-hero-intro > *:not(.jp-pill)',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'sine.out', stagger: 0.12, delay: 0.2 }
      );
      gsap.fromTo(
        '.jp-name',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'sine.out', delay: 0.35 }
      );
      gsap.fromTo(
        '.jp-pill',
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'sine.out',
          delay: 0.55,
          onComplete: () => {
            /* single pulse, then rest */
            gsap.to('.jp-pill', {
              scale: 1.07,
              duration: 0.45,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 1,
            });
          },
        }
      );

      /* Slow sine reveals across sections. */
      gsap.utils.toArray('.jp-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%' },
          }
        );
      });

      /* M9 — margin notes fade/slide in from the margin as their paragraph enters. */
      gsap.utils.toArray('.jp-margin').forEach((el) => {
        const x = el.classList.contains('is-left') ? -28 : 28;
        gsap.fromTo(
          el,
          { opacity: 0, x },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: el.closest('.jp-pwrap') || el,
              scroller: sc,
              start: 'top 85%',
            },
          }
        );
      });

      /* Wavy underlines draw under key lines (0.8s). */
      gsap.utils.toArray('.jp-squig path').forEach((p) => {
        gsap.fromTo(
          p,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'sine.out',
            scrollTrigger: {
              trigger: p.closest('.jp-key'),
              scroller: sc,
              start: 'top 88%',
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-09-indie">
      {/* ---------- nav ---------- */}
      <nav className="jp-nav" aria-label="Primary">
        <div className="jp-nav-inner">
          <a href="#top" className="jp-wordmark">
            {name}
          </a>
          <div className="jp-nav-links">
            {content.nav.links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <a className="jp-nav-cta" href={content.nav.cta.href}>
            {content.nav.cta.label}
          </a>
        </div>
      </nav>

      {/* ---------- hero ---------- */}
      <header className="jp-hero" id="top" data-tour="Hello">
        <div className="jp-wrap">
          <div className="jp-hero-grid">
            <div className="jp-hero-intro">
              <span className="jp-pill">
                <span className="jp-pill-dot" aria-hidden="true" />
                {content.hero.availability}
              </span>
              <p className="jp-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="jp-h1">
                <span className="jp-name">I&rsquo;m {firstName}.</span> I make warm,
                hand-finished brands and websites.
              </h1>
              <p className="jp-statement">{content.hero.statement}</p>
              <div className="jp-hero-ctas">
                <a className="jp-btn" href={`mailto:${email}`}>
                  {content.hero.primaryCta.label}
                </a>
                <a className="jp-link-arrow" href={content.hero.secondaryCta.href}>
                  {content.hero.secondaryCta.label} &darr;
                </a>
              </div>
            </div>
            <figure className="jp-portrait">
              <div className="jp-portrait-frame">
                <Img
                  k="hero"
                  src={img('hero', heroImg)}
                  alt={content.hero.portraitAlt}
                  eager
                />
              </div>
              <figcaption className="jp-portrait-caption">
                {content.hero.portraitCaption}
              </figcaption>
            </figure>
          </div>
          <div className="jp-deskband" data-tour="Morning desk">
            {/* The band is sized by CSS (aspect-ratio on the stage) and sits
                centred in a full-height pinned wrap, so while it scrubs it is
                presented mid-screen instead of parked under the nav with an
                empty screen below it. */}
            <ScrollFrames
              frames={frames}
              alt="Morning desk with rising steam, frame by frame"
              pinDistance="+=170%"
              stageHeight="auto"
            >
              <span className="jp-deskband-caption" aria-hidden="true">
                A quiet morning at the desk
              </span>
            </ScrollFrames>
          </div>
        </div>
      </header>

      {/* ---------- selected work ---------- */}
      <section className="jp-section jp-work" id="work" data-tour="Selected work" aria-labelledby="work-h">
        <div className="jp-wrap">
          <div className="jp-work-head jp-rv">
            <p className="jp-eyebrow">{content.work.eyebrow}</p>
            <h2 className="jp-h2" id="work-h">{content.work.heading}</h2>
            <p className="jp-lede">{content.work.intro}</p>
          </div>
          <div>
            {content.work.projects.map((p, i) => {
              const shot = projectShots[i];
              return (
                <article
                  key={p.id}
                  className={`jp-project jp-rv${i % 2 ? ' is-flip' : ''}`}
                >
                  <div className="jp-proj-img">
                    <Img k={shot.key} src={img(shot.key, shot.img)} alt={p.alt} />
                  </div>
                  <div className="jp-proj-copy">
                    <p className="jp-proj-meta">
                      <span className="jp-proj-kind">{p.kind}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{p.year}</span>
                    </p>
                    <h3 className="jp-proj-name">{p.name}</h3>
                    <p className="jp-proj-note">{p.note}</p>
                    <blockquote className="jp-proj-learned">
                      <strong>What I learned</strong>
                      {p.learned}
                    </blockquote>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- how I work ---------- */}
      <section className="jp-section jp-how" id="how" data-tour="How I work" aria-labelledby="how-h">
        <div className="jp-wrap">
          <div className="jp-rv">
            <p className="jp-eyebrow">{content.how.eyebrow}</p>
            <h2 className="jp-h2" id="how-h">{content.how.heading}</h2>
            <p className="jp-lede">{content.how.intro}</p>
          </div>
          <div className="jp-steps">
            {content.how.steps.map((s, i) => (
              <div className="jp-step jp-rv" key={s.title}>
                <span className="jp-step-num" aria-hidden="true">
                  {['i.', 'ii.', 'iii.'][i]}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="jp-do-dont">
            <div className="jp-list-card is-do jp-rv">
              <h3>{content.how.doList.title}</h3>
              <ul>
                {content.how.doList.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="jp-list-card is-dont jp-rv">
              <h3>{content.how.dontList.title}</h3>
              <ul>
                {content.how.dontList.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jp-availability jp-rv">
            <span className="jp-availability-mark" aria-hidden="true">&para;</span>
            <p>{content.how.availability}</p>
          </div>
        </div>
      </section>

      {/* ---------- notes / journal ---------- */}
      <section className="jp-section jp-notes" id="notes" data-tour="Notes" aria-labelledby="notes-h">
        <div className="jp-wrap">
          <div className="jp-notes-head jp-rv">
            <p className="jp-eyebrow">{content.notes.eyebrow}</p>
            <h2 className="jp-h2" id="notes-h">{content.notes.heading}</h2>
            <p className="jp-lede">{content.notes.intro}</p>
          </div>
          {content.notes.entries.map((e, i) => (
            <JournalEntry entry={e} index={i} key={e.id} />
          ))}
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section className="jp-section jp-about" id="about" data-tour="About" aria-labelledby="about-h">
        <div className="jp-wrap">
          <div className="jp-about-grid">
            <div className="jp-about-photo jp-rv">
              <Img k="about" src={img('about', heroImg)} alt={content.about.imageAlt} />
            </div>
            <div className="jp-about-copy">
              <p className="jp-eyebrow jp-rv">{content.about.eyebrow}</p>
              <h2 className="jp-h2 jp-rv" id="about-h">{content.about.heading}</h2>
              {content.about.paragraphs.map((p, i) => (
                <p className="jp-rv" key={i}>{p}</p>
              ))}
              <ul className="jp-facts jp-rv">
                {content.about.facts.map((f) => (
                  <li key={f.label}>
                    <span className="jp-fact-label">{f.label}</span>
                    <span className="jp-fact-value">{f.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section className="jp-section jp-contact" id="contact" data-tour="Contact" aria-labelledby="contact-h">
        <div className="jp-wrap">
          <p className="jp-eyebrow jp-rv">{content.contact.eyebrow}</p>
          <h2 className="jp-h2 jp-rv" id="contact-h">{content.contact.heading}</h2>
          <p className="jp-lede jp-rv">{content.contact.body}</p>
          <div className="jp-rv">
            <a className="jp-email" href={`mailto:${email}`}>
              {content.contact.emailLabel}
            </a>
          </div>
          <div className="jp-call-card jp-rv">
            <p>{content.contact.calendar}</p>
            <a className="jp-btn" href={content.contact.calendarHref}>
              {content.contact.calendarLabel}
            </a>
          </div>
          <p className="jp-promise jp-rv">{content.contact.promise}</p>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="jp-footer">
        <div className="jp-wrap">
          <div className="jp-footer-inner">
            <span className="jp-footer-word">{name}</span>
            <span className="jp-footer-line">{content.footer.line}</span>
            <div className="jp-footer-socials">
              {content.footer.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <p className="jp-copy">
            &copy; 2026 {name} &middot; Independent designer &middot; All work my own
          </p>
        </div>
      </footer>
    </div>
  );
}
