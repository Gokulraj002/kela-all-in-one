import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import feat1Img from './assets/feature-1.webp';
import feat2Img from './assets/feature-2.webp';
import feat3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-opensource';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,700;0,800;1,400&family=IBM+Plex+Mono:wght@400;500;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`cf-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {/* a real space between the inline-block word masks */}
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
            <span className="wi" style={{ display: 'inline-block' }}>{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.5 7.1.7-5.3 4.7 1.6 7L12 17.7 5.7 21.4l1.6-7L2 9.7l7.1-.7L12 2.5z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="6" cy="5" r="2.2" />
      <circle cx="6" cy="19" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <path d="M6 7.2v9.6M18 9.2c0 4-4 4.5-8.5 4.8" />
    </svg>
  );
}

/* 48 contributor tiles — deterministic initials + tone pattern. */
const TILE_INITIALS = [
  'AK', 'MJ', 'RS', 'TP', 'LN', 'QD', 'BW', 'ZX', 'VC', 'KP', 'OM', 'NG',
  'FY', 'UE', 'IR', 'OW', 'AT', 'SD', 'FG', 'KL', 'CV', 'BN', 'MQ', 'PL',
  'OK', 'IJ', 'UH', 'YG', 'TR', 'EW', 'QS', 'DF', 'GH', 'LP', 'ZN', 'VX',
  'KM', 'JR', 'ST', 'PW', 'DX', 'HN', 'CB', 'AE', 'OZ', 'YK', 'TW', 'QB',
];
const TILE_TONES = ['t-purple', 't-green', 't-paper', 't-purple2', 't-green2', 't-inktile'];
const tiles = TILE_INITIALS.map((initials, i) => ({
  initials,
  tone: TILE_TONES[(i * 5 + (i % 3)) % TILE_TONES.length],
  commits: ((i * 37) % 180) + 3,
}));

const FEATURES = [
  { key: 'product-0', src: feat1Img, alt: 'Community members seen from behind watching a glowing purple-and-green presentation at a community meetup' },
  { key: 'product-1', src: feat2Img, alt: 'Two laptops on a wooden desk with softly blurred purple and green code glowing on their screens' },
  { key: 'product-2', src: feat3Img, alt: 'A community mural wall painted with purple, green and gold handprints and flowing shapes' },
];

export default function Design09Opensource() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  /* lower-case org handle shown on the showcase cards, e.g. "kelatech" */
  const orgSlug = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'org';

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

      /* Hero entrance: masked word-rise + warm copy fade. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.cf-hero-title .wi', { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.1 }, 0.15)
        .fromTo('.cf-hero-eyebrow, .cf-hero-sub, .cf-hero-ctas, .cf-hero-badges',
          { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.7);

      /* Gentle hero drift on scroll out (small numeric scrub = smoothed).
         Starts once the frame scrub releases the pin ('bottom bottom'), so
         the copy stays fully legible while the frames play. */
      gsap.to('.cf-hero-copy', {
        yPercent: 10, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: '.cf-hero', scroller: sc, start: 'bottom bottom', end: 'bottom top', scrub: 0.6 },
      });

      /* Warm rises. */
      gsap.utils.toArray('.cf-rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });

      /* Signature: contribution fill. Desktop pin, scrub-driven tile-flip wave
         (left→right, top→bottom), commit counter, progress bar. Static full
         mosaic everywhere else (no pin, no scrub). */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.cf-pin');
        if (!pin) return undefined;
        const pinTiles = gsap.utils.toArray('.cf-tile', pin);
        const fill = pin.querySelector('.cf-progress-fill');
        const num = pin.querySelector('.cf-commit-num');
        const inner = pin.querySelector('.cf-wall-inner');
        const nav = rootRef.current.querySelector('.cf-nav');
        const navH = () => (nav ? nav.offsetHeight : 0);
        const vh = () => (sc === window ? window.innerHeight : sc.clientHeight);
        const counter = { v: 0 };
        const step = 0.16;
        const total = 1 + (pinTiles.length - 1) * step;
        /* Pinned stage = one visible screen under the sticky nav; scale the
           wall down on screens too short for it. */
        const setNavVar = () => pin.style.setProperty('--cf-nav-h', `${navH()}px`);
        const fit = () => {
          if (!inner) return;
          inner.style.scale = '';
          const cs = getComputedStyle(pin);
          const avail = pin.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
          const need = inner.offsetHeight;
          if (avail > 0 && need > avail) inner.style.scale = String(Math.max(0.6, avail / need));
        };
        pin.classList.add('is-live');
        setNavVar();
        fit();
        ScrollTrigger.create({
          trigger: pin,
          scroller: sc,
          start: () => `top ${navH()}px`,
          end: '+=250%',
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setNavVar,
          onRefresh: fit,
        });
        /* The fill starts while the wall scrolls into view (not only once it
           pins), so the mosaic is never an empty block on screen, and it
           completes exactly as the pin releases. */
        const wallTl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            scroller: sc,
            start: 'top 70%',
            end: () => `+=${0.7 * vh() - navH() + 2.5 * vh()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        wallTl.fromTo(pinTiles,
          { rotationY: 90, opacity: 0 },
          { rotationY: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: { each: step, from: 'start' } },
          0);
        wallTl.to(fill, { scaleX: 1, duration: total, ease: 'none' }, 0);
        wallTl.to(counter, {
          v: content.wall.commits, duration: total, ease: 'none',
          onUpdate: () => { if (num) num.textContent = Math.round(counter.v).toLocaleString('en-US'); },
        }, 0);
        return () => {
          pin.classList.remove('is-live');
          pin.style.removeProperty('--cf-nav-h');
          if (inner) inner.style.scale = '';
        };
      });

      /* Stat count-ups. */
      gsap.utils.toArray('.cf-stat-num').forEach((el) => {
        const target = parseInt(el.dataset.value, 10) || 0;
        const suffix = el.dataset.suffix || '';
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US') + suffix; },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-09-opensource">
      <header className="cf-nav">
        <div className="cf-nav-inner">
          <a className="cf-wordmark" href="#hero"><span className="cf-mark" aria-hidden="true" />{name}</a>
          <nav className="cf-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.label} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="cf-btn" href="#contact"><StarIcon />Star<span className="cf-count">{content.github.stars}</span></a>
        </div>
      </header>

      <main>
        {/* HERO — scroll-driven frame sequence (was autoplay video) */}
        <section id="hero" className="cf-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Diverse collaborators' hands placing purple and green sticky notes around laptops on a sunlit wooden table"
            pinDistance="+=170%"
          >
            <div className="cf-hero-copy">
              <p className="cf-eyebrow cf-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="cf-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="cf-hero-sub">{content.hero.sub}</p>
              <div className="cf-hero-ctas">
                <a className="cf-btn" href="#contact"><StarIcon />{content.hero.starCta}<span className="cf-count">{content.github.stars}</span></a>
                <a className="cf-btn is-ghost" href="#contact"><ForkIcon />{content.hero.forkCta}<span className="cf-count">{content.github.forks}</span></a>
              </div>
              <div className="cf-hero-badges">
                <span><i aria-hidden="true" />Monthly releases</span>
                <span><i aria-hidden="true" />PRs reviewed in 48h</span>
                <span><i aria-hidden="true" />Good first issues labeled</span>
              </div>
            </div>
          </ScrollFrames>
        </section>

        {/* CONTRIBUTION WALL — signature pinned scroll mechanic */}
        <section id="story" className="cf-wall" data-tour="The Community">
          <div className="cf-pin">
            <div className="cf-wall-inner">
              <p className="cf-eyebrow">{content.wall.eyebrow}</p>
              <div className="cf-wall-head">
                <h2 className="cf-h2">{content.wall.title}</h2>
                <div className="cf-commit">
                  <div className="cf-commit-num">{content.wall.commits.toLocaleString('en-US')}</div>
                  <div className="cf-commit-label">{content.wall.commitLabel}</div>
                </div>
              </div>
              <div className="cf-progress" aria-hidden="true"><span className="cf-progress-fill" /></div>
              <div className="cf-mosaic" role="img" aria-label={`Mosaic of ${tiles.length} contributor avatars representing ${content.wall.commits.toLocaleString('en-US')} commits`}>
                {tiles.map((t) => (
                  <div key={t.initials} className={`cf-tile ${t.tone}`} title={`${t.initials} — ${t.commits} commits`}>
                    {t.initials}
                  </div>
                ))}
              </div>
              <div className="cf-wall-foot">
                <div className="cf-legend">
                  {content.wall.legend.map((l) => (
                    <span key={l.label}><span className={`cf-swatch ${l.swatch}`} aria-hidden="true" />{l.label}</span>
                  ))}
                </div>
                <p className="cf-wall-hint">{content.wall.hint}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="products" className="cf-section" data-tour={`Why ${name}`}>
          <div className="cf-wrap">
            <p className="cf-eyebrow cf-rv">{content.features.eyebrow}</p>
            <h2 className="cf-h2 cf-rv">{content.features.title}</h2>
            <div className="cf-feat-grid">
              {content.features.items.map((f, i) => (
                <article className="cf-feat cf-rv" key={f.title}>
                  <div className="cf-feat-img">
                    <Img k={FEATURES[i].key} src={img(FEATURES[i].key, FEATURES[i].src)} alt={FEATURES[i].alt} />
                  </div>
                  <div className="cf-feat-body">
                    <span className="cf-feat-num">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                    <span className="cf-feat-cap">{f.caption}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="gallery" className="cf-showcase cf-section" data-tour="Showcase">
          <div className="cf-wrap">
            <p className="cf-eyebrow cf-rv">{content.showcase.eyebrow}</p>
            <h2 className="cf-h2 cf-rv">{content.showcase.title}</h2>
            <p className="cf-lede cf-rv">{content.showcase.body}</p>
            <div className="cf-show-grid">
              {content.showcase.projects.map((p) => (
                <article className={`cf-card cf-rv tone-${p.tone}`} key={p.name}>
                  <div className="cf-card-top">
                    <span className="cf-card-stars"><StarIcon />{p.stars}</span>
                    <span>{orgSlug}</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="cf-tags">
                    {p.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>
                </article>
              ))}
            </div>
            <div className="cf-show-more cf-rv">
              <a className="cf-btn is-ghost" href="#contact">{content.showcase.moreCta}</a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="cf-stats cf-section" aria-label="Project statistics">
          <div className="cf-wrap">
            <p className="cf-eyebrow cf-rv">{content.stats.eyebrow}</p>
            <div className="cf-stat-row">
              {content.stats.items.map((s) => (
                <div className="cf-stat cf-rv" key={s.label}>
                  <div className="cf-stat-num" data-value={s.value} data-suffix={s.suffix || ''}>
                    {s.display}{s.suffix || ''}
                  </div>
                  <div className="cf-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DOCS TEASER */}
        <section id="craft" className="cf-section" data-tour="Docs">
          <div className="cf-wrap">
            <p className="cf-eyebrow cf-rv">{content.docs.eyebrow}</p>
            <h2 className="cf-h2 cf-rv">{content.docs.title}</h2>
            <div className="cf-docs-grid">
              <div className="cf-docs-img cf-rv">
                <Img k="detail" src={img('detail', detailImg)} alt="Macro of layered purple and green sticky notes on warm paper, like a planning wall" />
              </div>
              <div className="cf-rv">
                <p className="cf-lede">{content.docs.body}</p>
                <ol className="cf-steps">
                  {content.docs.steps.map((s, i) => (
                    <li className="cf-step" key={s.cmd}>
                      <span className="cf-step-num">{String(i + 1).padStart(2, '0')}</span>
                      <code>{s.cmd}</code>
                      <span className="cf-step-note">{s.note}</span>
                    </li>
                  ))}
                </ol>
                <a className="cf-btn" href="#contact">{content.docs.cta}</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="cf-cta cf-section" data-tour="Get Involved">
          <div className="cf-wrap cf-cta-inner">
            <p className="cf-eyebrow cf-rv">{content.cta.eyebrow}</p>
            <h2 className="cf-h2 cf-rv">{content.cta.title}</h2>
            <p className="cf-rv">{content.cta.body}</p>
            <div className="cf-rv">
              <a className="cf-btn is-paper" href={`mailto:${email}`}><StarIcon />{content.cta.starCta}<span className="cf-count">{content.github.stars}</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="cf-footer">
        <div className="cf-wrap">
          <div className="cf-foot-grid">
            <div className="cf-foot-brand">
              <a className="cf-wordmark" href="#hero"><span className="cf-mark" aria-hidden="true" />{name}</a>
              <p>{content.brand.tagline}. {content.footer.line}</p>
              <a className="cf-foot-mail" href={`mailto:${email}`}>{email}</a>
            </div>
            {content.footer.columns.map((c) => (
              <div className="cf-foot-col" key={c.head}>
                <h4>{c.head}</h4>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}><a href="#hero">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="cf-foot-base">
            <span>© 2026 {name} contributors</span>
            <span>{content.footer.colophon}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
