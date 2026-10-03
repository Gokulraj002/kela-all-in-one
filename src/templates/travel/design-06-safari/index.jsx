import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero sequence: 72 frames scrubbed by scroll (Apple-style). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-safari';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400..800;1,400..700&family=Inter:wght@400;500;600&display=swap';

/* Deterministic pseudo-random for the SVG grass blades (stable across renders). */
const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`dt-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Bold nav with a sighting-ticker strip. */
function Ticker() {
  const items = [...content.ticker, ...content.ticker];
  return (
    <div className="dt-ticker" aria-label="Latest sightings">
      <span className="dt-ticker-dot" aria-hidden="true" />
      <div className="dt-ticker-mask">
        <div className="dt-ticker-track">
          {items.map((t, i) => (
            <span className="dt-ticker-item" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- Diorama silhouette layers (inline SVG, palette-graded) --- */
function Hills() {
  return (
    <svg className="dt-svg" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path
        d="M0,300 L0,215 Q140,150 300,196 T620,178 T940,206 T1260,170 T1600,200 L1600,300 Z"
        fill="#2A251D"
      />
      <path
        d="M0,300 L0,250 Q220,205 430,240 T860,228 T1300,246 T1600,232 L1600,300 Z"
        fill="#211D16"
      />
    </svg>
  );
}

function Acacia({ x, y, s, tone }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={tone}>
      <polygon points="-9,0 9,0 4,-72 -4,-72" />
      <polygon points="-4,-72 30,-96 24,-100 -8,-78" />
      <ellipse cx="0" cy="-98" rx="112" ry="20" />
      <ellipse cx="-64" cy="-90" rx="58" ry="14" />
      <ellipse cx="66" cy="-92" rx="62" ry="15" />
      <ellipse cx="6" cy="-108" rx="70" ry="13" />
    </g>
  );
}

function Acacias() {
  return (
    <svg className="dt-svg" viewBox="0 0 1600 340" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <Acacia x={180} y={330} s={1.15} tone="#242B1C" />
      <Acacia x={760} y={336} s={0.8} tone="#20261A" />
      <Acacia x={1240} y={330} s={1.35} tone="#262C1E" />
      <Acacia x={1520} y={338} s={0.7} tone="#20261A" />
    </svg>
  );
}

function Grass() {
  const W = 1600;
  const H = 260;
  const N = 72;
  const blades = [];
  for (let i = 0; i < N; i++) {
    const x = (i / (N - 1)) * W + (rnd(i) - 0.5) * 22;
    const h = 80 + rnd(i + 100) * 165;
    const lean = (rnd(i + 200) - 0.5) * 54;
    blades.push(
      `M ${x.toFixed(1)} ${H} C ${(x - 11).toFixed(1)} ${(H - h * 0.55).toFixed(1)}, ` +
        `${(x + lean * 0.4).toFixed(1)} ${(H - h * 0.82).toFixed(1)}, ${(x + lean).toFixed(1)} ${(H - h).toFixed(1)}`
    );
  }
  return (
    <svg className="dt-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <rect x="0" y={H - 34} width={W} height="34" fill="#14110C" />
      {blades.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={i % 3 === 0 ? '#1B1712' : '#12100C'}
          strokeWidth={5 + rnd(i + 300) * 4}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* One safari card — unfolds from the grass line on desktop scrub. */
function SafariCard({ item, index }) {
  const { productName, price } = useCustom();
  return (
    <article className={`dt-card dt-card-${index}`}>
      <p className="dt-card-time">{item.time}</p>
      <p className="dt-card-tag">{item.tag}</p>
      <h3 className="dt-card-name">{productName(index, item.name)}</h3>
      <p className="dt-card-blurb">{item.blurb}</p>
      <p className="dt-card-meta">{item.duration}</p>
      <p className="dt-card-price">{price(item.price)}</p>
      <a className="dt-card-cta" href="#contact">
        Reserve this drive
      </a>
    </article>
  );
}

/* Signature mechanic: pinned dawn-to-dusk diorama (desktop, motion OK).
   Mobile gets a static dawn sky + stacked cards via CSS; the scrub timeline
   only exists inside the ≥768px matchMedia branch. */
function Diorama() {
  const chapters = content.safaris.chapters;

  return (
    <div className="dt-dio-pin">
      <div className="dt-dio-stage">
        <div className="dt-skies">
          <div className="dt-sky dt-sky-dawn" aria-hidden="true" />
          <div className="dt-sky dt-sky-noon" aria-hidden="true" />
          <div className="dt-sky dt-sky-dusk" aria-hidden="true" />
          <div className="dt-sun" aria-hidden="true" />
          <div className="dt-layer dt-hills" aria-hidden="true">
            <Hills />
          </div>
          <div className="dt-layer dt-acacias" aria-hidden="true">
            <Acacias />
          </div>
          <div className="dt-layer dt-grass" aria-hidden="true">
            <Grass />
          </div>
        </div>

        <div className="dt-chapter" aria-live="polite">
          <p className="dt-chapter-time">{chapters[0].time}</p>
          <p className="dt-chapter-name">{chapters[0].name}</p>
          <p className="dt-chapter-cap">{chapters[0].caption}</p>
          <div className="dt-dots" aria-hidden="true">
            {chapters.map((c, i) => (
              <span key={c.time} className={`dt-dot${i === 0 ? ' is-on' : ''}`} />
            ))}
          </div>
        </div>

        <div className="dt-daybar" aria-hidden="true">
          <span className="dt-daybar-fill" />
          <span className="dt-daybar-label">dawn</span>
          <span className="dt-daybar-label">noon</span>
          <span className="dt-daybar-label">dusk</span>
        </div>

        <div className="dt-cards">
          {content.safaris.items.map((s, i) => (
            <SafariCard key={s.name} item={s} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Reduced-motion: no pin, no scrub — a static dawn sky and a plain grid. */
function SafariStatic() {
  return (
    <div className="dt-dio-static">
      <div className="dt-skies dt-skies-static" aria-hidden="true">
        <div className="dt-sky dt-sky-dawn" />
        <div className="dt-sun dt-sun-static" />
        <div className="dt-layer dt-hills">
          <Hills />
        </div>
        <div className="dt-layer dt-acacias">
          <Acacias />
        </div>
        <div className="dt-layer dt-grass">
          <Grass />
        </div>
      </div>
      <div className="dt-cards-static">
        {content.safaris.items.map((s, i) => (
          <SafariCard key={s.name} item={s} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Design06Safari() {
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

      /* Hero entrance: clip-wipe the frame, masked word-rise headline,
         then sub / CTA / note. Total <= 2.2s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.dt-hero .sf-stage',
        { clipPath: 'inset(6% 4% 94% 4%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.dt-hero-title .wi',
          { yPercent: 112 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 },
          0.3
        )
        .fromTo(
          '.dt-hero-sub, .dt-hero-cta',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.9
        )
        .fromTo('.dt-hero-note', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 1.25);

      /* Gentle parallax on the hero media only. */
      gsap.to('.dt-hero .sf-stage', {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: '.dt-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: true },
      });

      /* Slow dust-drift reveals. */
      gsap.utils.toArray('.dt-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.dt-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Clip-wipe on framed images. */
      gsap.utils.toArray('.dt-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.25,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.dt-rule').forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: rule, scroller: sc, start: 'top 92%', once: true },
          }
        );
      });

      /* Signature mechanic — dawn-to-dusk scrub. Desktop only: a resize
         across 768px kills/restores the pin instead of leaving it stuck. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.dt-dio-pin');
        if (!pin) return;

        gsap.set('.dt-card', { scaleY: 0, transformOrigin: '50% 100%' });
        gsap.set('.dt-sky-noon, .dt-sky-dusk', { opacity: 0 });

        const chapters = content.safaris.chapters;
        let lastIdx = -1;
        const timeEl = pin.querySelector('.dt-chapter-time');
        const nameEl = pin.querySelector('.dt-chapter-name');
        const capEl = pin.querySelector('.dt-chapter-cap');
        const dots = pin.querySelectorAll('.dt-dot');
        const setChapter = (p) => {
          const idx = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
          if (idx === lastIdx) return;
          lastIdx = idx;
          const ch = chapters[idx];
          if (timeEl) timeEl.textContent = ch.time;
          if (nameEl) nameEl.textContent = ch.name;
          if (capEl) capEl.textContent = ch.caption;
          dots.forEach((d, i) => d.classList.toggle('is-on', i === idx));
        };

        const dio = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top top',
            end: '+=300%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setChapter(self.progress),
          },
        });

        /* Sky: dawn holds, noon crosses at 0.85–1.15, dusk takes over 1.85–2.15. */
        dio
          .to('.dt-sky-noon', { opacity: 1, duration: 0.3 }, 0.85)
          .to('.dt-sky-noon', { opacity: 0, duration: 0.3 }, 1.85)
          .to('.dt-sky-dusk', { opacity: 1, duration: 0.3 }, 1.85);

        /* Sun: dawn low-right → noon high → dusk low-left, warming as it falls. */
        dio
          .to(
            '.dt-sun',
            {
              left: '50%',
              top: '15%',
              scale: 0.72,
              backgroundColor: '#FFF6DE',
              boxShadow: '0 0 130px 60px rgba(255,246,222,.38)',
              duration: 0.32,
              ease: 'power1.inOut',
            },
            0.83
          )
          .to(
            '.dt-sun',
            {
              left: '26%',
              top: '52%',
              scale: 1.35,
              backgroundColor: '#E8762E',
              boxShadow: '0 0 210px 110px rgba(232,118,46,.55)',
              duration: 0.32,
              ease: 'power1.inOut',
            },
            1.83
          );

        /* 3-depth parallax: hills drift least, grass rushes past. */
        dio
          .to('.dt-hills', { x: 70, duration: 3 }, 0)
          .to('.dt-acacias', { x: -150, duration: 3 }, 0)
          .to('.dt-grass', { x: -320, y: 26, duration: 3 }, 0);

        /* Safari cards unfold from the grass line as their chapter arrives. */
        content.safaris.items.forEach((s, i) => {
          dio.fromTo(
            `.dt-card-${i}`,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.24, ease: 'power3.out', transformOrigin: '50% 100%' },
            i + 0.26
          );
          if (i < content.safaris.items.length - 1) {
            dio.to(`.dt-card-${i}`, { scaleY: 0, duration: 0.18, ease: 'power3.in' }, i + 0.8);
          }
        });

        /* Day progress hairline. */
        dio.fromTo('.dt-daybar-fill', { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0);
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const grounds = [
    { src: dest1Img, k: 'product-0', alt: 'Wildebeest herds surging across the Mara river at golden hour, spray and dust in the air', ...content.grounds[0] },
    { src: dest2Img, k: 'product-1', alt: 'A tiger’s intense gaze through tall dry grass in Ranthambore, at eye level', ...content.grounds[1] },
    { src: dest3Img, k: 'product-2', alt: 'A lone giraffe silhouetted beneath a flat-topped acacia against a huge setting sun', ...content.grounds[2] },
  ];

  return (
    <div ref={rootRef} className="tpl-design-06-safari">
      <header className="dt-header">
        <Ticker />
        <div className="dt-nav">
          <a className="dt-wordmark" href="#hero">
            {name}
            <span className="dt-wordmark-tag">{content.brand.tag}</span>
          </a>
          <nav className="dt-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="dt-cta" href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence ("First Light") */}
        <section id="hero" className="dt-hero" data-tour="First Light">
          <ScrollFrames
            frames={frames}
            alt="Elephant herd silhouettes crossing the savanna at dawn, dust hanging golden in the light"
            pinDistance="+=170%"
          >
            <div className="dt-hero-shade" aria-hidden="true" />
            <div className="dt-hero-copy">
              <p className="dt-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="dt-hero-title">
                <Words text={content.hero.titleA} />
                <br />
                <Words text={content.hero.titleB} className="dt-title-gold" />
              </h1>
              <p className="dt-hero-sub">{content.hero.sub}</p>
              <div className="dt-hero-cta-row">
                <a className="dt-cta dt-hero-cta" href={content.hero.ctaHref}>
                  {content.hero.cta}
                </a>
                <a className="dt-ghost" href="#safaris">
                  Watch the day unfold
                </a>
              </div>
              <p className="dt-hero-note">
                <span className="dt-note-dot" aria-hidden="true" />
                {content.hero.note}
              </p>
            </div>
          </ScrollFrames>
        </section>

        {/* SAFARIS — the dawn-to-dusk diorama */}
        <section id="safaris" className="dt-safaris" data-tour="The Day, Scrubbed">
          <div className="dt-wrap">
            <p className="dt-eyebrow dt-rv">{content.safaris.eyebrow}</p>
            <h2 className="dt-h2 dt-rv">
              <Words text={content.safaris.title} />
            </h2>
            <span className="dt-rule" aria-hidden="true" />
            <p className="dt-lede dt-rv">{content.safaris.intro}</p>
          </div>
          {reduced ? <SafariStatic /> : <Diorama />}
        </section>

        {/* THE GROUNDS — triptych */}
        <section id="grounds" className="dt-grounds">
          <div className="dt-wrap">
            <p className="dt-eyebrow dt-rv">The grounds</p>
            <h2 className="dt-h2 dt-rv">Two continents. One standard.</h2>
            <span className="dt-rule" aria-hidden="true" />
          </div>
          <div className="dt-trio dt-stagger">
            {grounds.map((g) => (
              <figure className="dt-trio-item" key={g.place}>
                <div className="dt-wipe dt-frame">
                  <Img k={g.k} src={img(g.k, g.src)} alt={g.alt} />
                </div>
                <figcaption>
                  <strong>{g.place}</strong>
                  <span>{g.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FIELD NOTES / ETHOS */}
        <section id="story" className="dt-story" data-tour="Field Notes">
          <div className="dt-wrap dt-story-grid">
            <div className="dt-story-text">
              <p className="dt-eyebrow dt-rv">{content.story.eyebrow}</p>
              <h2 className="dt-h2 dt-rv">
                <Words text={content.story.title} />
              </h2>
              <span className="dt-rule" aria-hidden="true" />
              {content.story.body.map((p, i) => (
                <p className="dt-body dt-rv" key={i}>
                  {p}
                </p>
              ))}
              <blockquote className="dt-quote dt-rv">
                <p>“{content.story.quote.text}”</p>
                <cite>
                  {content.story.quote.name} — {content.story.quote.role}
                </cite>
              </blockquote>
              <div className="dt-stats dt-stagger">
                {content.story.stats.map((s) => (
                  <div className="dt-stat" key={s.label}>
                    <span className="dt-stat-n">{s.n}</span>
                    <span className="dt-stat-l">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="dt-story-img dt-wipe dt-frame dt-rv">
              <Img
                k="detail"
                src={img('detail', detailImg)}
                alt="Macro of an elephant’s eye, the savanna reflected in it, dawn light on the wrinkled skin"
              />
            </div>
          </div>
        </section>

        {/* GUIDES */}
        <section id="guides" className="dt-guides" data-tour="The Guides">
          <div className="dt-wrap">
            <p className="dt-eyebrow dt-rv">{content.guides.eyebrow}</p>
            <h2 className="dt-h2 dt-rv">
              <Words text={content.guides.title} />
            </h2>
            <span className="dt-rule" aria-hidden="true" />
            <p className="dt-lede dt-rv">{content.guides.intro}</p>
            <div className="dt-guide-grid dt-stagger">
              {content.guides.list.map((g) => (
                <article className="dt-guide" key={g.name}>
                  <span className="dt-guide-mark" aria-hidden="true">
                    {g.initials}
                  </span>
                  <h3 className="dt-guide-name">{g.name}</h3>
                  <p className="dt-guide-role">{g.role}</p>
                  <p className="dt-guide-detail">{g.detail}</p>
                  <p className="dt-guide-drives">{g.drives}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PLAN / CONTACT */}
        <section id="contact" className="dt-contact" data-tour="Plan Your Safari">
          <div className="dt-wrap dt-contact-grid">
            <div>
              <p className="dt-eyebrow dt-rv">{content.contact.eyebrow}</p>
              <h2 className="dt-h2 dt-rv">
                <Words text={content.contact.title} />
              </h2>
              <span className="dt-rule" aria-hidden="true" />
              <p className="dt-body dt-rv">{content.contact.body}</p>
              <p className="dt-departs dt-rv">{content.contact.departs}</p>
            </div>
            <div className="dt-contact-card dt-rv">
              <p className="dt-contact-label">Write to us</p>
              <a className="dt-contact-email" href={`mailto:${email}`}>
                {email}
              </a>
              <p className="dt-contact-label">Call</p>
              <a className="dt-contact-phone" href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
                {content.contact.phone}
              </a>
              <p className="dt-contact-label">Bases</p>
              <p className="dt-contact-bases">{content.contact.bases}</p>
              <a className="dt-cta" href={`mailto:${email}?subject=Safari%20enquiry`}>
                Start planning
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="dt-footer">
        <div className="dt-wrap dt-footer-grid">
          <p className="dt-footer-word">{name}</p>
          <nav className="dt-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="dt-wrap">
          <p className="dt-footer-line">{content.footer.line}</p>
          <p className="dt-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
