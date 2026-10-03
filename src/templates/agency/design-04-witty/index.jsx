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

/* ScrollFrames sequence: 72 frames of the headline-card wall, scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-witty';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   The word matching `punch` gets the cobalt punch treatment. A real space
   sits between the word masks so headlines never run together. */
function Words({ text, punch, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`fr-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className={`w${w === punch ? ' fr-punch' : ''}`} aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Renders body text with the punch substring in cobalt + a marker bar
   (the bar draws itself when a tossed card slams in). */
function Punch({ text, punch }) {
  if (!punch || !text.includes(punch)) return <>{text}</>;
  const i = text.indexOf(punch);
  return (
    <>
      {text.slice(0, i)}
      <span className="fr-punch">
        {text.slice(i, i + punch.length)}
        <span className="fr-punch-mark" aria-hidden="true" />
      </span>
      {text.slice(i + punch.length)}
    </>
  );
}

const caseImages = [work1Img, work2Img, work3Img];
const caseKeys = ['work-1', 'work-2', 'work-3'];

export default function Design04Witty() {
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

      /* Hero: the killer line rises through word masks; the cobalt punchline
         word pops last. Total entrance <= 2s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.fr-hero-eyebrow',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1
      )
        .fromTo(
          '.fr-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.2
        )
        .fromTo(
          '.fr-hero-title .fr-punch .wi',
          { scale: 1.18 },
          { scale: 1, duration: 0.3, ease: 'power2.out' },
          1.45
        )
        .fromTo(
          '.fr-hero-cta, .fr-hero-foot, .fr-scroll-cue',
          { opacity: 0, y: 20 },
          /* clearProps hands transform back to CSS so the button's hover
             shift (and the cue's centering) work after the entrance. */
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, clearProps: 'transform' },
          1.0
        );

      /* House reveals: content rises, rules draw. Initial states are set by
         GSAP (fromTo) — never hidden in CSS, so nothing can stick invisible. */
      gsap.utils.toArray('.fr-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.fr-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'transform',
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });
      gsap.utils.toArray('.fr-rule').forEach((rule) => {
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

      /* M4 — Headline toss deck. The 300vh region pins; a 200vh scrub tosses
         each top card off with rotation while the next slams in and its
         cobalt punchline highlight draws. Desktop only — mobile gets a native
         swipe strip (CSS), reduced motion a static list (rendered above). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const deck = rootRef.current && rootRef.current.querySelector('.fr-deck');
        const stage = deck && deck.querySelector('.fr-deck-stage');
        if (!deck || !stage) return;
        const cards = gsap.utils.toArray('.fr-card', stage);
        const marks = gsap.utils.toArray('.fr-punch-mark', stage);
        const count = deck.querySelector('.fr-deck-count');
        const n = cards.length;
        const label = (k) => `LINE ${String(k).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;

        gsap.set(marks, { scaleX: 0, transformOrigin: '0 50%' });
        /* Card 0 starts landed: its punchline marker draws as the deck
           approaches, before the pin takes over. */
        if (marks[0]) {
          gsap.fromTo(
            marks[0],
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: { trigger: deck, scroller: sc, start: 'top 75%', once: true },
            }
          );
        }
        /* Deck peek: cards below the top sit slightly lower and smaller. */
        cards.forEach((c, i) => {
          if (i > 0) gsap.set(c, { y: 14 * i, scale: 1 - 0.015 * i });
        });

        const d = gsap.timeline({
          scrollTrigger: {
            trigger: deck,
            scroller: sc,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (count) count.textContent = label(Math.min(n, Math.floor(self.progress * n) + 1));
            },
          },
        });
        d.to('.fr-deck-hint', { opacity: 0, duration: 0.25 }, 0.05);
        cards.forEach((card, i) => {
          if (i === n - 1) return;
          const dir = i % 2 === 0 ? 1 : -1;
          d.to(
            card,
            {
              x: dir * 160,
              y: -70,
              rotation: dir * (8 + (i % 3) * 2),
              opacity: 0,
              duration: 0.5,
              ease: 'expo.in',
            },
            i
          )
            .fromTo(
              cards[i + 1],
              { scale: 0.94, y: 14 * (i + 1) + 26 },
              { scale: 1, y: 0, duration: 0.5, ease: 'expo.out' },
              i + 0.5
            )
            .fromTo(
              marks[i + 1],
              { scaleX: 0 },
              { scaleX: 1, duration: 0.3, ease: 'power2.out' },
              i + 0.85
            );
        });
        /* A breath at the end so the final card lands before the pin releases. */
        d.to({}, { duration: 0.4 });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const nLines = content.lines.items.length;

  return (
    <div ref={rootRef} className="tpl-design-04-witty">
      <header className="fr-nav">
        <a className="fr-wordmark" href="#hero">
          {name}
          <span className="fr-reg" aria-hidden="true">
            ®
          </span>
        </a>
        <nav className="fr-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="fr-btn fr-btn-small" href="#contact">
          Say hello
        </a>
      </header>

      <main>
        {/* HERO — one killer line, nothing else (well, almost) */}
        <section id="hero" className="fr-hero" data-tour="The Killer Line">
          <ScrollFrames
            frames={frames}
            alt="Wall of headline cards, frame by frame"
            pinDistance="+=170%"
          >
            <span className="fr-hero-veil" aria-hidden="true" />
            <div className="fr-hero-copy">
              <p className="fr-eyebrow fr-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="fr-hero-title">
                <Words text={content.hero.line} punch={content.hero.punch} />
              </h1>
              <a className="fr-btn fr-hero-cta" href={content.hero.ctaHref}>
                {content.hero.cta}
              </a>
              <p className="fr-footnote fr-hero-foot">{content.hero.footnote}</p>
            </div>
            <a className="fr-scroll-cue" href="#lines">
              <span>scroll for the lines</span>
            </a>
          </ScrollFrames>
        </section>

        {/* THE LINES — M4 headline toss deck */}
        <section id="lines" className="fr-lines" data-tour="The Lines">
          <div className="fr-wrap">
            <p className="fr-eyebrow fr-rv">{content.lines.eyebrow}</p>
            <h2 className="fr-h2 fr-rv">
              {content.lines.title}{' '}
              <span className="fr-punch-inline">{content.lines.titlePunch}</span>
            </h2>
            <span className="fr-rule" aria-hidden="true" />
          </div>
          <div className={`fr-deck${reduced ? ' is-static' : ''}`}>
            <div className="fr-deck-stage">
              {content.lines.items.map((l, i) => (
                <article
                  className="fr-card"
                  key={i}
                  aria-label={`Line ${i + 1} of ${nLines}`}
                  /* line 01 sits on top of the deck; later lines peek below it */
                  style={{ zIndex: nLines - i }}
                >
                  <div className="fr-card-inner">
                    <span className="fr-card-pin" aria-hidden="true" />
                    <p className="fr-card-num">
                      Line {String(i + 1).padStart(2, '0')} / {String(nLines).padStart(2, '0')}
                    </p>
                    <p className="fr-card-line">
                      <Punch text={l.text} punch={l.punch} />
                    </p>
                  </div>
                </article>
              ))}
            </div>
            {!reduced && (
              <>
                <p className="fr-deck-count" aria-hidden="true">
                  LINE 01 / {String(nLines).padStart(2, '0')}
                </p>
                <p className="fr-deck-hint" aria-hidden="true">
                  {content.lines.deckHint}
                </p>
              </>
            )}
          </div>
          <div className="fr-wrap">
            <p className="fr-footnote fr-rv">{content.lines.footnote}</p>
          </div>
        </section>

        {/* WORK — cases with honest captions */}
        <section id="work" className="fr-work" data-tour="The Work">
          <div className="fr-wrap">
            <p className="fr-eyebrow fr-rv">{content.work.eyebrow}</p>
            <h2 className="fr-h2 fr-rv">{content.work.title}</h2>
            <p className="fr-lede fr-rv">{content.work.intro}</p>
            <span className="fr-rule" aria-hidden="true" />
            {content.work.cases.map((c, i) =>
              c.noImage ? (
                <article className="fr-case-type fr-rv" key={c.client}>
                  <p className="fr-eyebrow fr-eyebrow-light">
                    {c.client} — {c.discipline}
                  </p>
                  <h3 className="fr-h3">
                    <Punch text={c.title} punch={c.titlePunch} />
                  </h3>
                  <p className="fr-case-line">
                    <strong>Worked:</strong> {c.worked}
                  </p>
                  <p className="fr-case-line">
                    <strong>Flopped:</strong> {c.flopped}
                  </p>
                  <p className="fr-footnote fr-footnote-light">{c.note}</p>
                </article>
              ) : (
                <article className={`fr-case${i % 2 ? ' is-flip' : ''} fr-rv`} key={c.client}>
                  <div className="fr-frame">
                    <Img k={caseKeys[i]} src={img(caseKeys[i], caseImages[i])} alt={c.alt} />
                  </div>
                  <div className="fr-case-copy">
                    <p className="fr-eyebrow">
                      {c.client} — {c.discipline}
                    </p>
                    <h3 className="fr-h3">{c.title}</h3>
                    <p className="fr-case-line">
                      <strong>Worked:</strong> {c.worked}
                    </p>
                    <p className="fr-case-line">
                      <strong>Flopped:</strong> {c.flopped}
                    </p>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* WON'T-DO — the famous anti-list */}
        <section id="wontdo" className="fr-wontdo" data-tour="The Won't-Do List">
          <div className="fr-wrap">
            <p className="fr-eyebrow fr-rv">{content.wontdo.eyebrow}</p>
            <h2 className="fr-h2 fr-rv">{content.wontdo.title}</h2>
            <p className="fr-lede fr-rv">{content.wontdo.intro}</p>
            <span className="fr-rule" aria-hidden="true" />
            <ul className="fr-antilist fr-stagger">
              {content.wontdo.items.map((w, i) => (
                <li className="fr-anti" key={i}>
                  <span className="fr-anti-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="fr-anti-body">
                    <p className="fr-anti-text">{w.text}</p>
                    <p className="fr-anti-why">{w.why}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STUDIO — small, opinionated bios */}
        <section id="studio" className="fr-studio" data-tour="The Studio">
          <div className="fr-wrap">
            <p className="fr-eyebrow fr-rv">{content.studio.eyebrow}</p>
            <h2 className="fr-h2 fr-rv">{content.studio.title}</h2>
            <p className="fr-lede fr-rv">{content.studio.intro}</p>
            <p className="fr-facts fr-rv">{content.studio.facts}</p>
            <span className="fr-rule" aria-hidden="true" />
            <div className="fr-team fr-stagger">
              {content.studio.team.map((t) => (
                <article className="fr-person" key={t.name}>
                  <h3 className="fr-person-name">{t.name}</h3>
                  <p className="fr-person-role">{t.role}</p>
                  <p className="fr-person-flaw">{t.flaw}</p>
                </article>
              ))}
            </div>
            <figure className="fr-detail fr-rv">
              <div className="fr-frame">
                <Img k="detail" src={img('detail', detailImg)} alt={content.studio.detailAlt} />
              </div>
              <figcaption>{content.studio.detailCaption}</figcaption>
            </figure>
          </div>
        </section>

        {/* CONTACT — say hello, we reply fast */}
        <section id="contact" className="fr-contact" data-tour="Say Hello">
          <div className="fr-wrap">
            <p className="fr-eyebrow fr-rv">{content.contact.eyebrow}</p>
            <h2 className="fr-h2 fr-rv">{content.contact.title}</h2>
            <p className="fr-lede fr-rv">{content.contact.promise}</p>
            <div className="fr-rv">
              <a className="fr-btn fr-btn-big" href={`mailto:${email}`}>
                {content.contact.emailLabel}
              </a>
            </div>
            <div className="fr-contact-grid">
              <div className="fr-rv">
                <h3 className="fr-h4">{content.contact.checklistTitle}</h3>
                <ul className="fr-checklist">
                  {content.contact.checklist.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="fr-rv">
                <h3 className="fr-h4">The studio</h3>
                <address className="fr-address">
                  {content.contact.address}
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </address>
                <p className="fr-footnote">{content.contact.walkin}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fr-footer">
        <div className="fr-wrap">
          <p className="fr-footer-word">
            {name}
            <span className="fr-reg" aria-hidden="true">
              ®
            </span>
          </p>
          <nav className="fr-footer-nav" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="fr-footer-line">{content.footer.line}</p>
          <p className="fr-colophon">{content.footer.colophon}</p>
          <p className="fr-colophon">{content.footer.tiny}</p>
        </div>
      </footer>
    </div>
  );
}
