import React, { useEffect, useLayoutEffect, useState } from 'react';
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

/* Signature sequence: 72 JPG frames of the nib macro, scrubbed by scroll. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-02-brand';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   A real space sits between the word masks so headlines never run together. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`mm-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <span className="w" aria-hidden="true">
            <span className="wi" dangerouslySetInnerHTML={{ __html: w }} />
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

const caseShots = [
  { key: 'work-3', img: work3Img, alt: 'Packaging system lineup for Terra & Thyme — paper bags and boxes with abstract marks and ochre detail bands' },
  { key: 'work-2', img: work2Img, alt: 'Bronze wayfinding plaque for Northline Rail mounted on warm travertine stone' },
  { key: 'work-1', img: work1Img, alt: 'Logo construction grid for Aurelia Press — letterform drawn with compass circles and ochre guide lines' },
  { key: 'detail', img: detailImg, alt: 'Hands drawing the Kaveri Bank letterform with a brass-nibbed dip pen, ink pooling on cream paper' },
  { key: 'hero', img: heroImg, alt: 'Identity flat-lay for Studio Clay — letterpress cards, embossed envelope, construction sketches and a wax seal' },
];

const phaseCollages = [
  { key: 'detail', img: detailImg, alt: 'Discovery notes — hand-sketched interview observations and touchpoint sketches', cap: 'Touchpoint audit', capNote: '47 touchpoints mapped' },
  { key: 'work-1', img: work1Img, alt: 'Define — positioning statement and naming shortlists beside a construction grid', cap: 'Creative platform', capNote: 'One sentence, signed' },
  { key: 'work-2', img: work2Img, alt: 'Design — wayfinding mockup tested at platform scale', cap: 'Territories in situ', capNote: 'Tested in real contexts' },
  { key: 'work-3', img: work3Img, alt: 'Deliver — finished packaging system and guidelines book', cap: 'Guidelines book', capNote: 'Written for humans' },
];

/* Wordmark: the brand name with its last word set in the italic accent
   (the house "amp" treatment), e.g. Kela <em>Studio</em>. */
function Wordmark({ name }) {
  const parts = String(name).trim().split(/\s+/);
  const last = parts.length > 1 ? parts.pop() : '';
  return (
    <>
      {parts.join(' ')}
      {last && (
        <>
          {' '}
          <span className="mm-amp">{last}</span>
        </>
      )}
    </>
  );
}

function CaseCard({ c, index }) {
  const { img } = useCustom();
  const shot = caseShots[index % caseShots.length];
  return (
    <article className="mm-case mm-rv">
      <div className="mm-case-media">
        <Img k={shot.key} src={img(shot.key, shot.img)} alt={shot.alt} loading="lazy" />
        <span className="mm-case-grid" aria-hidden="true" />
        <span className="mm-seal" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="mm-case-body">
        <p className="mm-case-meta">
          <span>{c.sector}</span>
          <span>{c.year}</span>
          <span>{c.timeline}</span>
        </p>
        <h3 className="mm-case-client">{c.client}</h3>
        <p className="mm-case-blurb">{c.blurb}</p>
        <dl className="mm-case-facts">
          <div className="mm-case-facts-li">
            <dt className="mm-fact-k">Scope</dt>
            <dd className="mm-fact-v">{c.scope}</dd>
          </div>
          <div className="mm-case-facts-li">
            <dt className="mm-fact-k">Delivered</dt>
            <dd className="mm-fact-v">{c.deliverables.join(' · ')}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

function ProcessSection() {
  const { img } = useCustom();
  return (
    <section id="process" className="mm-process" data-tour="The Method">
      <div className="mm-wrap">
        <p className="mm-eyebrow mm-rv">{content.process.eyebrow}</p>
        <h2 className="mm-h2 mm-rv">
          <Words text={content.process.title} />
        </h2>
        <p className="mm-lede mm-rv">{content.process.intro}</p>
        <div className="mm-spine-wrap">
          <div className="mm-spine" aria-hidden="true">
            <span className="mm-spine-fill" />
          </div>
          {content.process.phases.map((p, i) => {
            const col = phaseCollages[i];
            return (
              <div className="mm-phase" key={p.id}>
                <span className="mm-node" aria-hidden="true">{i + 1}</span>
                <div className="mm-phase-grid">
                  <div className="mm-phase-copy">
                    <p className="mm-phase-num">{p.num}</p>
                    <h3 className="mm-phase-name">{p.name}</h3>
                    <p className="mm-phase-dur">{p.duration}</p>
                    <p className="mm-phase-text">{p.text}</p>
                    <ul className="mm-outputs">
                      {p.outputs.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                  <figure className="mm-collage">
                    <Img k={col.key} src={img(col.key, col.img)} alt={col.alt} loading="lazy" />
                    <figcaption>
                      <strong>{col.cap}</strong>
                      <span>{col.capNote}</span>
                    </figcaption>
                  </figure>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { contact } = useCustom();
  const email = contact.email || content.contact.email;
  const L = content.contact.formLabels;
  const [f, setF] = useState({ name: '', email: '', company: '', budget: content.contact.budgets[1], message: '' });
  const set = (k) => (e) => setF((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Discovery call — ${f.company || f.name || 'new project'}`);
    const body = encodeURIComponent(
      `Name: ${f.name}\nCompany: ${f.company}\nBudget band: ${f.budget}\nReply to: ${f.email}\n\n${f.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="mm-form" onSubmit={submit}>
      <div className="mm-field">
        <label htmlFor="mm-name">{L.name}</label>
        <input id="mm-name" name="name" type="text" autoComplete="name" required value={f.name} onChange={set('name')} />
      </div>
      <div className="mm-field">
        <label htmlFor="mm-email">{L.email}</label>
        <input id="mm-email" name="email" type="email" autoComplete="email" required value={f.email} onChange={set('email')} />
      </div>
      <div className="mm-field">
        <label htmlFor="mm-company">{L.company}</label>
        <input id="mm-company" name="company" type="text" autoComplete="organization" value={f.company} onChange={set('company')} />
      </div>
      <div className="mm-field">
        <label htmlFor="mm-budget">{L.budget}</label>
        <select id="mm-budget" name="budget" value={f.budget} onChange={set('budget')}>
          {content.contact.budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="mm-field">
        <label htmlFor="mm-message">{L.message}</label>
        <textarea id="mm-message" name="message" required value={f.message} onChange={set('message')} />
      </div>
      <button className="mm-cta" type="submit">{L.submit}</button>
      <p className="mm-form-note">{L.note}</p>
    </form>
  );
}

export default function Design02Brand() {
  const { brand, contact } = useCustom();
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

      /* Hero: slow word-mask rise (stagger 0.09), then sub + actions.
         Methodical, unhurried. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
          '.mm-hero-title .wi',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.0, ease: 'power4.out', stagger: 0.09 },
          0.3
        )
        .fromTo(
          '.mm-hero .mm-eyebrow',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.15
        )
        .fromTo(
          '.mm-hero-sub, .mm-hero-actions',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.14 },
          0.9
        );

      /* House grammar: block reveals, staggers, hairline rule draws. */
      gsap.utils.toArray('.mm-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.mm-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      gsap.utils.toArray('.mm-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* M2 — process spine scrub. The spine draws (scaleY) across the whole
         method while each phase's collage slides in from alternating sides
         and its copy rises. Each phase is scrubbed by its OWN position, so a
         phase is fully developed by the time it reaches the upper half of the
         screen — never faded out while it is being read. Small numeric scrub
         smooths wheel steps. All visible under reduced motion (skipped above). */
      const phases = gsap.utils.toArray('.mm-phase');
      if (phases.length) {
        gsap.fromTo(
          '.mm-spine-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.mm-spine-wrap',
              scroller: sc,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
          }
        );
        phases.forEach((phase, i) => {
          const collage = phase.querySelector('.mm-collage');
          const copy = phase.querySelector('.mm-phase-copy');
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: phase,
              scroller: sc,
              start: 'top bottom',
              end: 'top 58%',
              scrub: 0.6,
            },
          });
          tl.fromTo(
            collage,
            { x: i % 2 === 0 ? 110 : -110, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out', duration: 1 },
            0
          ).fromTo(
            copy,
            { opacity: 0, y: 44 },
            { opacity: 1, y: 0, ease: 'power2.out', duration: 0.85 },
            0.15
          );
        });

        /* Node activation as each phase crosses mid-viewport. */
        phases.forEach((phase) => {
          ScrollTrigger.create({
            trigger: phase,
            scroller: sc,
            start: 'top 65%',
            end: 'bottom 35%',
            onToggle: (self) => phase.classList.toggle('is-active', self.isActive),
          });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-02-brand">
      <header className="mm-nav">
        <a className="mm-wordmark" href="#hero">
          <Wordmark name={name} />
        </a>
        <nav className="mm-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="mm-cta" href={content.hero.ctaHref}>Book a discovery call</a>
      </header>

      <main>
        {/* HERO — manifesto + letterforms frame sequence, scrubbed by scroll */}
        <section id="hero" className="mm-hero" data-tour="Manifesto">
          <ScrollFrames
            frames={frames}
            alt="Macro of a nib drawing letterforms, frame by frame"
            pinDistance="+=170%"
            className="mm-hero-frames"
          >
            <div className="mm-hero-scrim" aria-hidden="true" />
            <div className="mm-hero-copy">
              <p className="mm-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="mm-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="mm-hero-sub">{content.hero.sub}</p>
              <div className="mm-hero-actions">
                <a className="mm-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="mm-cta mm-cta--ghost" href={content.hero.secondaryCtaHref}>{content.hero.secondaryCta}</a>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* SELECTED IDENTITIES */}
        <section id="work" data-tour="Selected Identities">
          <div className="mm-wrap">
            <p className="mm-eyebrow mm-rv">{content.work.eyebrow}</p>
            <h2 className="mm-h2 mm-rv">
              <Words text={content.work.title} />
            </h2>
            <p className="mm-lede mm-rv">{content.work.intro}</p>
            <hr className="mm-rule" />
            <div className="mm-cases">
              {content.work.cases.map((c, i) => (
                <CaseCard key={c.id} c={c} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS — M2 spine */}
        <ProcessSection />

        {/* CAPABILITIES */}
        <section id="capabilities" data-tour="Capabilities">
          <div className="mm-wrap">
            <p className="mm-eyebrow mm-rv">{content.capabilities.eyebrow}</p>
            <h2 className="mm-h2 mm-rv">
              <Words text={content.capabilities.title} />
            </h2>
            <p className="mm-lede mm-rv">{content.capabilities.intro}</p>
            <div className="mm-caps mm-stagger">
              {content.capabilities.items.map((cap, i) => (
                <article className="mm-cap" key={cap.name}>
                  <span className="mm-cap-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mm-cap-name">{cap.name}</h3>
                  <p className="mm-cap-text">{cap.text}</p>
                  <p className="mm-cap-proof">{cap.proof}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* STUDIO */}
        <section id="studio" className="mm-studio" data-tour="The Studio">
          <div className="mm-wrap">
            <p className="mm-eyebrow mm-rv">{content.studio.eyebrow}</p>
            <h2 className="mm-h2 mm-rv">
              <Words text={content.studio.title} />
            </h2>
            <p className="mm-lede mm-rv">{content.studio.philosophy}</p>
            <div className="mm-facts mm-stagger">
              {content.studio.facts.map((f) => (
                <div className="mm-fact" key={f.label}>
                  <span className="mm-fact-v">{f.value}</span>
                  <span className="mm-fact-k">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="mm-principals mm-stagger">
              {content.studio.principals.map((p) => (
                <div className="mm-principal" key={p.name}>
                  <h3 className="mm-principal-name">{p.name}</h3>
                  <p className="mm-principal-role">{p.role}</p>
                  <p className="mm-principal-note">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT — discovery call booking */}
        <section id="contact" data-tour="Book a Call">
          <div className="mm-wrap">
            <p className="mm-eyebrow mm-rv">{content.contact.eyebrow}</p>
            <h2 className="mm-h2 mm-rv">
              <Words text={content.contact.title} />
            </h2>
            <div className="mm-contact-grid">
              <div className="mm-rv">
                <p className="mm-lede">{content.contact.text}</p>
                <ul className="mm-contact-lines">
                  <li>
                    <span className="mm-line-k">Email</span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li>
                    <span className="mm-line-k">Phone</span>
                    <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
                  </li>
                  <li>
                    <span className="mm-line-k">Studio</span>
                    <address>{content.contact.address}<br />{content.contact.hours}</address>
                  </li>
                </ul>
              </div>
              <div className="mm-rv">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mm-footer">
        <div className="mm-wrap">
          <div className="mm-footer-grid">
            <div>
              <p className="mm-wordmark"><Wordmark name={name} /></p>
              <p>{content.footer.line}</p>
            </div>
            <nav aria-label="Footer">
              <h3>Studio</h3>
              <ul>
                {content.nav.map((n) => (
                  <li key={n.href}><a href={n.href}>{n.label}</a></li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Social">
              <h3>Elsewhere</h3>
              <ul>
                {content.footer.socials.map((s) => (
                  <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mm-colophon">
            <span>{content.footer.colophon}</span>
            <span>© 2026 {name}. All marks shown are client work.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
