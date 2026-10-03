import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import s1bImg from './assets/series-1b.webp';
import s1cImg from './assets/series-1c.webp';
import s2bImg from './assets/series-2b.webp';
import s2cImg from './assets/series-2c.webp';
import s3bImg from './assets/series-3b.webp';
import s3cImg from './assets/series-3c.webp';
import s4bImg from './assets/series-4b.webp';
import s4cImg from './assets/series-4c.webp';

/* Scroll-driven hero frames: 10s living-still portrait as 72 JPG frames */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const sfFrames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-photo';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@300;400;600;700&display=swap';

/* key → default asset; useCustom's img() lets uploads override per key */
const IMG_MAP = {
  s1a: heroImg, s1b: s1bImg, s1c: s1cImg,
  s2a: work1Img, s2b: s2bImg, s2c: s2cImg,
  s3a: work2Img, s3b: s3bImg, s3c: s3cImg,
  s4a: work3Img, s4b: s4bImg, s4c: s4cImg,
  detail: detailImg,
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   A real space sits between the word masks (a margin indented wrapped lines). */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`hl-wm ${className}`} aria-label={text}>
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

/* Flat list of every frame, in series order — drives the lightbox. */
function useAllFrames() {
  const { img } = useCustom();
  return useMemo(() => {
    const list = [];
    content.series.forEach((s) => {
      s.frames.forEach((f, i) => {
        list.push({
          key: f.key,
          src: img(f.key, IMG_MAP[f.key]),
          caption: f.caption,
          tech: f.tech,
          alt: f.alt,
          series: s.title,
          frameNo: String(i + 1).padStart(2, '0'),
        });
      });
    });
    return list;
  }, [img]);
}

function Lightbox({ frames, index, onClose, onNav }) {
  const frame = frames[index];
  const boxRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    /* Hold the page still behind the lightbox: wheel/touch scrolling is
       swallowed on the overlay before it reaches the smooth-scroll driver
       (viewer panel or window). Stopping the driver instead clipped the
       panel and threw the page behind back to the top while open. */
    const box = boxRef.current;
    const block = (e) => { e.preventDefault(); e.stopPropagation(); };
    if (box) {
      box.addEventListener('wheel', block, { passive: false });
      box.addEventListener('touchmove', block, { passive: false });
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (box) {
        box.removeEventListener('wheel', block);
        box.removeEventListener('touchmove', block);
      }
    };
  }, [onClose, onNav]);

  if (!frame) return null;
  return (
    <div ref={boxRef} className="hl-lightbox" data-lenis-prevent role="dialog" aria-modal="true" aria-label={`${frame.series} — frame ${frame.frameNo}`} onClick={onClose}>
      <button className="hl-lightbox-btn hl-lightbox-close" onClick={onClose} aria-label="Close">Close</button>
      <button
        className="hl-lightbox-btn hl-lightbox-prev"
        aria-label="Previous frame"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
      >
        Prev
      </button>
      <figure className="hl-lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <div className="hl-lightbox-media">
          <img src={frame.src} alt={frame.alt} />
        </div>
        <figcaption>
          <p className="hl-lightbox-cap">{frame.series} · {frame.frameNo} — {frame.caption}</p>
          <p className="hl-lightbox-tech">{frame.tech}</p>
        </figcaption>
      </figure>
      <button
        className="hl-lightbox-btn hl-lightbox-next"
        aria-label="Next frame"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
      >
        Next
      </button>
    </div>
  );
}

function SeriesBlock({ series, onOpen }) {
  return (
    <article className="hl-series" aria-label={`Series ${series.num}: ${series.title}`}>
      <div className="hl-series-head hl-rv">
        <span className="hl-series-num">{series.num}</span>
        <h3 className="hl-series-title">{series.title}</h3>
      </div>
      <p className="hl-series-note hl-rv">{series.note}</p>
      <div className="hl-strip">
        <div className="hl-strip-track">
          {series.frames.map((f, i) => (
            <button
              key={f.key}
              type="button"
              className="hl-frame"
              onClick={() => onOpen(f.key)}
              aria-label={`Open frame ${i + 1} of ${series.title}: ${f.caption}`}
            >
              <span className="hl-frame-media hl-develop">
                <Img k={f.key} src={IMG_MAP[f.key]} alt={f.alt} />
              </span>
              <span className="hl-cap">
                <span className="hl-cap-text">{f.caption}</span>
                <span className="hl-cap-tech">{f.tech}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}

function BookingForm() {
  const { contact } = useCustom();
  const f = content.contact.fields;
  const email = contact.email || content.contact.email;
  const [values, setValues] = useState({ name: '', email: '', date: '', usage: f.usageOptions[0], budget: f.budgetOptions[1], notes: '' });
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = `Shoot inquiry — ${values.name || 'new client'} · ${values.date || 'date TBD'}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      `Shoot date: ${values.date}`,
      `Usage: ${values.usage}`,
      `Budget: ${values.budget}`,
      '',
      values.notes,
    ].join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="hl-form hl-rv" onSubmit={submit}>
      <div className="hl-field">
        <label htmlFor="hl-f-name">{f.name}</label>
        <input id="hl-f-name" type="text" value={values.name} onChange={set('name')} required autoComplete="name" />
      </div>
      <div className="hl-field">
        <label htmlFor="hl-f-email">{f.email}</label>
        <input id="hl-f-email" type="email" value={values.email} onChange={set('email')} required autoComplete="email" />
      </div>
      <div className="hl-field">
        <label htmlFor="hl-f-date">{f.date}</label>
        <input id="hl-f-date" type="date" value={values.date} onChange={set('date')} />
      </div>
      <div className="hl-field">
        <label htmlFor="hl-f-usage">{f.usage}</label>
        <select id="hl-f-usage" value={values.usage} onChange={set('usage')}>
          {f.usageOptions.map((o) => (<option key={o}>{o}</option>))}
        </select>
      </div>
      <div className="hl-field">
        <label htmlFor="hl-f-budget">{f.budget}</label>
        <select id="hl-f-budget" value={values.budget} onChange={set('budget')}>
          {f.budgetOptions.map((o) => (<option key={o}>{o}</option>))}
        </select>
      </div>
      <div className="hl-field is-wide">
        <label htmlFor="hl-f-notes">{f.notes}</label>
        <textarea id="hl-f-notes" value={values.notes} onChange={set('notes')} />
      </div>
      <button type="submit" className="hl-cta">{f.submit}</button>
      <p className="hl-form-hint">{f.hint}</p>
    </form>
  );
}

export default function Design07Photo() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;
  const frames = useAllFrames();
  const [lightbox, setLightbox] = useState(-1);

  const openFrame = (key) => {
    const i = frames.findIndex((fr) => fr.key === key);
    if (i >= 0) setLightbox(i);
  };
  const navFrame = (d) => setLightbox((i) => (i + d + frames.length) % frames.length);

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

      /* Hero is now a scroll-driven frame sequence (ScrollFrames) — the old
         darkroom blur-develop on the hero video is retired; the frame scrub
         gives the developing feel on its own. */
      /* M7 darkroom develop: each frame rises out of darkness — dim and
         desaturated to full exposure — once, as it enters. It used to be a
         scrubbed blur(16px) on every frame, which re-rasterised several large
         blurred images on every scroll tick (heavy jank); brightness/grayscale
         plus opacity is a cheap GPU filter and plays once, off the scroll. */
      gsap.utils.toArray('.hl-develop').forEach((el) => {
        if (el.closest('.hl-hero')) return;
        gsap.fromTo(
          el,
          { opacity: 0.35, filter: 'brightness(0.35) grayscale(1)' },
          {
            opacity: 1,
            filter: 'brightness(1) grayscale(0)',
            duration: 1.6,
            ease: 'power2.out',
            clearProps: 'filter,opacity',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });

      /* Hero entrance: word-mask title, then the quiet copy. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hl-nav', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
        .fromTo('.hl-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.09 }, 0.35)
        .fromTo('.hl-hero-sub, .hl-hero-meta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.14 }, 0.9)
        .fromTo('.hl-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.4);

      /* Captions fade in once the frame above them has developed. */
      gsap.utils.toArray('.hl-cap').forEach((cap) => {
        gsap.fromTo(
          cap,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: cap, scroller: sc, start: 'top 62%', once: true },
          }
        );
      });

      /* House reveals: section heads, rows, steps, crew. */
      gsap.utils.toArray('.hl-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.hl-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-07-photo">
      <header className="hl-nav">
        <a className="hl-wordmark" href="#hero">{name}</a>
        <nav className="hl-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="hl-cta" href="#contact">{content.hero.cta}</a>
      </header>

      <main>
        {/* HERO — one perfect frame, now a scroll-driven frame sequence */}
        <section id="hero" className="hl-hero" data-tour="Welcome">
          <ScrollFrames
            frames={sfFrames}
            alt="Living-still portrait breathing, frame by frame"
            pinDistance="+=170%"
          >
            <div className="hl-hero-scrim" aria-hidden="true" />
            <div className="hl-hero-copy">
              <p className="hl-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="hl-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="hl-hero-sub">{content.hero.sub}</p>
              <div className="hl-hero-meta">
                <a className="hl-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <span className="hl-frame-note">{content.hero.frameNote}</span>
              </div>
            </div>
            <span className="hl-scroll-hint" aria-hidden="true">Scroll</span>
          </ScrollFrames>
        </section>

        {/* SERIES — photo essays as filmstrips */}
        <section id="series" className="hl-section" data-tour="Selected Series">
          <div className="hl-section-head">
            <p className="hl-eyebrow hl-rv">Selected series</p>
            <h2 className="hl-h2 hl-rv">Four bodies of work</h2>
            <span className="hl-rule" aria-hidden="true" />
            <p className="hl-body hl-rv">Each series is a contact sheet we refused to throw away. Scroll the strip; tap any frame to hold it still.</p>
          </div>
          {content.series.map((s) => (
            <SeriesBlock key={s.id} series={s} onOpen={openFrame} />
          ))}
        </section>

        {/* COMMISSIONS — client work index */}
        <section id="commissions" className="hl-section hl-commissions" data-tour="Commissions">
          <div className="hl-section-head">
            <p className="hl-eyebrow hl-rv">Selected commissions</p>
            <h2 className="hl-h2 hl-rv">Work that shipped</h2>
            <p className="hl-body hl-rv">Campaigns, editorials and lookbooks. The frames below are from the delivered sets.</p>
          </div>
          <div className="hl-index hl-stagger">
            {content.commissions.map((c, i) => (
              <button
                key={c.client}
                type="button"
                className="hl-index-row"
                onClick={() => openFrame(c.thumb)}
                aria-label={`View a frame from ${c.client} — ${c.title}`}
              >
                <span className="hl-index-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hl-index-thumb hl-develop">
                  <Img k={c.thumb} src={IMG_MAP[c.thumb]} alt={c.thumbAlt} />
                </span>
                <span className="hl-index-main">
                  <span className="hl-index-client">{c.client} · {c.year}</span>
                  <span className="hl-index-title">{c.title}</span>
                  <span className="hl-index-note">{c.note}</span>
                </span>
                <span className="hl-index-meta">{c.usage}</span>
              </button>
            ))}
          </div>
        </section>

        {/* PROCESS — brief to deliver */}
        <section id="process" className="hl-section" data-tour="Process">
          <div className="hl-section-head">
            <p className="hl-eyebrow hl-rv">Process</p>
            <h2 className="hl-h2 hl-rv">Film to final</h2>
          </div>
          <ol className="hl-process hl-stagger">
            {content.process.map((p) => (
              <li className="hl-step" key={p.step}>
                <span className="hl-step-num">{p.step}</span>
                <h3 className="hl-step-title">{p.title}</h3>
                <p className="hl-step-text">{p.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* STUDIO — photographers + darkroom */}
        <section id="studio" className="hl-section hl-studio" data-tour="Studio">
          <div className="hl-section-head">
            <p className="hl-eyebrow hl-rv">{content.studio.eyebrow}</p>
            <h2 className="hl-h2 hl-rv">{content.studio.title}</h2>
            <p className="hl-body hl-rv">{content.studio.text}</p>
          </div>
          <div className="hl-studio-grid">
            <ul className="hl-crew hl-stagger">
              {content.studio.photographers.map((p) => (
                <li key={p.name}>
                  <h3 className="hl-crew-name">{p.name}</h3>
                  <p className="hl-crew-role">{p.role}</p>
                  <p className="hl-crew-note">{p.note}</p>
                </li>
              ))}
            </ul>
            <figure className="hl-darkroom hl-rv">
              <div className="hl-darkroom-media hl-develop">
                <Img k="detail" src={img('detail', detailImg)} alt={content.studio.darkroom.alt} />
              </div>
              <figcaption>
                <h3 className="hl-darkroom-title">{content.studio.darkroom.caption}</h3>
                <p className="hl-darkroom-text">{content.studio.darkroom.text}</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CONTACT — booking inquiry */}
        <section id="contact" className="hl-section" data-tour="Book a Shoot">
          <div className="hl-contact-grid">
            <div>
              <p className="hl-eyebrow hl-rv">{content.contact.eyebrow}</p>
              <h2 className="hl-h2 hl-rv">{content.contact.title}</h2>
              <p className="hl-body hl-rv">{content.contact.text}</p>
              <div className="hl-contact-lines hl-rv">
                <p><a href={`mailto:${email}`}>{email}</a></p>
                <p><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></p>
                <p>{content.brand.city} · {content.brand.est}</p>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>
      </main>

      <footer className="hl-footer">
        <p className="hl-footer-line">{content.footer.line}</p>
        <p className="hl-colophon">{content.footer.colophon}</p>
      </footer>

      {lightbox >= 0 && (
        <Lightbox frames={frames} index={lightbox} onClose={() => setLightbox(-1)} onNav={navFrame} />
      )}
    </div>
  );
}
