import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import work1Img from './assets/work-1.webp';
import work2Img from './assets/work-2.webp';
import work3Img from './assets/work-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-05-swiss';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@500;600;700&display=swap';

const IMAGES = { 'work-1': work1Img, 'work-2': work2Img, 'work-3': work3Img, detail: detailImg };

/* ScrollFrames scrub sequence: 72 JPG frames, extracted from the signature
   trimmer-cut clip. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* M5 — Grid-line reveal system.
   - 12-col hairline grid draws first (scaleY, staggered by column)
   - content snaps in with hard rectangular clip wipes aligned to grid
   - index rows: number counts in, rule draws, title slides 12px
   - everything power2.out, ≤ 0.7s; hover invert 0.15s (CSS)
   - no other motion exists in this design
   - reduced motion: static final states (initial states are set by GSAP,
     never by CSS, so nothing is ever hidden) */

function WorkRow({ project, img }) {
  return (
    <article className="ns-row">
      <span className="ns-row-rule" aria-hidden="true" />
      <span className="ns-num ns-num-val" data-n={project.n}>{project.n}</span>
      <span className="ns-thumb">
        <Img k={project.img} src={img(project.img, IMAGES[project.img])} alt={project.alt} />
      </span>
      <h3 className="ns-row-title">{project.client}</h3>
      <span className="ns-row-disc">{project.discipline}</span>
      <span className="ns-row-year">{project.year}</span>
    </article>
  );
}

export default function Design05Swiss() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
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

      /* Hero: the grid draws first, staggered by column — then the one line
         and the cut sequence snap in with hard rectangular wipes. */
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      heroTl
        .fromTo('.ns-gline', { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.05 }, 0)
        .fromTo(
          '.ns-hero-title',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.7 },
          0.55
        )
        .fromTo(
          '.ns-hero-media',
          { clipPath: 'inset(0 100% 0 0)' },
          /* clearProps: nothing left on the pinned frame once the wipe is done */
          { clipPath: 'inset(0 0% 0 0)', duration: 0.7, clearProps: 'clipPath' },
          0.8
        );

      /* Section dividers: black rules draw left → right. */
      gsap.utils.toArray('.ns-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      /* Content blocks: hard rectangular clip wipes, aligned to the grid. */
      gsap.utils.toArray('.ns-wipe').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power2.out', clearProps: 'clipPath',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Index rows: number counts in, rule draws, title slides 12px. */
      gsap.utils.toArray('.ns-row').forEach((row) => {
        const num = row.querySelector('.ns-num-val');
        const rule = row.querySelector('.ns-row-rule');
        const title = row.querySelector('.ns-row-title');
        const target = parseInt(num.dataset.n, 10);
        const counter = { v: 0 };
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, scroller: sc, start: 'top 90%', once: true },
        });
        tl.to(counter, {
          v: target, duration: 0.6, ease: 'power2.out',
          onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(2, '0'); },
        }, 0)
          .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0)
          .fromTo(title, { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-05-swiss">
      <header className="ns-nav">
        <div className="ns-nav-inner">
          <a className="ns-wordmark" href="#hero">{name}</a>
          <nav className="ns-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                <span className="ns-idx">{n.n}</span>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="ns-email" href={`mailto:${email}`}>{email}</a>
        </div>
      </header>

      <div className="ns-page">
        <div className="ns-grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span className="ns-gline" key={i} />
          ))}
        </div>

        <main className="ns-main">
          {/* HERO — grid, one line, one image */}
          <section id="hero" className="ns-hero" data-tour={name}>
            <p className="ns-hero-meta">
              <span>{content.hero.eyebrow}</span>
            </p>
            <h1 className="ns-hero-title">{content.hero.title}</h1>
            <dl className="ns-hero-facts">
              {content.hero.meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {/* HERO FILM — pinned scroll-driven frame scrub (ScrollFrames). The
                signature trimmer-cut clip plays frame-by-frame as the visitor
                scrolls. className="ns-hero-media" keeps the M5 intro wipe
                targeting and the media's grid position. */}
            <ScrollFrames
              frames={frames}
              alt="Trimmer blade cutting paper, frame by frame"
              pinDistance="+=170%"
              className="ns-hero-media"
            >
              <p className="ns-scrub-hint" aria-hidden="true">Scroll — the cut, frame by frame</p>
            </ScrollFrames>
            <p className="ns-caption">
              <span>The cut — paper, blade, grid.</span>
              <span>Scroll — 72 frames</span>
            </p>
          </section>

          {/* 01 — WORK INDEX */}
          <section id="work" className="ns-sec" data-tour="Index">
            <div className="ns-sec-head">
              <p className="ns-eyebrow">{content.work.eyebrow}</p>
              <h2 className="ns-h2">{content.work.title}</h2>
              <p className="ns-sub">{content.work.note}</p>
              <span className="ns-rule" aria-hidden="true" />
            </div>
            <div className="ns-index">
              {content.work.projects.map((p) => (
                <WorkRow key={p.n} project={p} img={img} />
              ))}
            </div>
          </section>

          {/* 02 — CAPABILITIES */}
          <section id="capabilities" className="ns-sec" data-tour="Capabilities">
            <div className="ns-sec-head">
              <p className="ns-eyebrow">{content.capabilities.eyebrow}</p>
              <h2 className="ns-h2">{content.capabilities.title}</h2>
              <span className="ns-rule" aria-hidden="true" />
            </div>
            <div className="ns-cap-grid ns-wipe">
              {content.capabilities.columns.map((col) => (
                <div className="ns-cap-col" key={col.label}>
                  <p className="ns-cap-label">{col.label}</p>
                  <ul className="ns-cap-list">
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="ns-note ns-wipe">{content.capabilities.note}</p>
          </section>

          {/* 03 — STUDIO FACTS */}
          <section id="studio" className="ns-sec" data-tour="Studio">
            <div className="ns-sec-head">
              <p className="ns-eyebrow">{content.studio.eyebrow}</p>
              <h2 className="ns-h2">{content.studio.title}</h2>
              <span className="ns-rule" aria-hidden="true" />
            </div>
            <dl className="ns-facts ns-wipe">
              {content.studio.facts.map(([k, v]) => (
                <div className="ns-fact" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 04 — JOURNAL */}
          <section id="journal" className="ns-sec" data-tour="Journal">
            <div className="ns-sec-head">
              <p className="ns-eyebrow">{content.journal.eyebrow}</p>
              <h2 className="ns-h2">{content.journal.title}</h2>
              <span className="ns-rule" aria-hidden="true" />
            </div>
            <div className="ns-journal-grid">
              {content.journal.notes.map((note) => (
                <article className="ns-jnote ns-wipe" key={note.n}>
                  <span className="ns-num">{note.n}</span>
                  <p className="ns-jdate">{note.date}</p>
                  <h3 className="ns-jtitle">{note.title}</h3>
                  <p className="ns-jtext">{note.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 05 — CONTACT */}
          <section id="contact" className="ns-sec" data-tour="Contact">
            <div className="ns-sec-head">
              <p className="ns-eyebrow">{content.contact.eyebrow}</p>
              <h2 className="ns-h2">{content.contact.title}</h2>
              <span className="ns-rule" aria-hidden="true" />
            </div>
            <a className="ns-contact-mail ns-wipe" href={`mailto:${email}`}>{email}</a>
            <div className="ns-contact-grid ns-wipe">
              <div className="ns-contact-block">
                <h3>Address</h3>
                <address>
                  {content.contact.address.map((line) => (
                    <span key={line}>{line}<br /></span>
                  ))}
                </address>
              </div>
              <div className="ns-contact-block">
                <h3>Hours</h3>
                <ul className="ns-hours">
                  {content.contact.hours.map(([d, t]) => (
                    <li key={d}><span>{d}</span><span>{t}</span></li>
                  ))}
                </ul>
                <p><a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a></p>
              </div>
              <div className="ns-contact-block">
                <h3>New projects</h3>
                <p>{content.contact.note}</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="ns-footer">
          <p>{content.footer.line}</p>
          {content.footer.colophon.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </footer>
      </div>
    </div>
  );
}
