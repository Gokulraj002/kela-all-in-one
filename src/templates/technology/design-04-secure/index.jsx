import React, { useEffect, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import f1Img from './assets/feature-1.webp';
import f2Img from './assets/feature-2.webp';
import f3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frame sequence (72 frames). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-04-secure';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="ag-w"><span class="ag-wi">word</span></span> */
function Words({ text }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {i > 0 ? ' ' : null}
          <span className="ag-w" aria-hidden="true">
            <span className="ag-wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

/* Stylized dotted world map (SVG circles from a compact bitmap). */
const MAP_ROWS = [
  '',
  '      ####        #####            ###',
  '    ########      ######    ############   ################',
  '   ##########      ####     ################  ##############',
  '  ###########       ###     #####   ########################',
  '  ############      ##      #####   ########################',
  '   ###########      ##      #####   ######################',
  '    #########               #####   ##################      ##',
  '     ######        ##       #####    ###############',
  '      #####        ###      ######    ############',
  '       ####        ####     ######     #########',
  '        ###         ####    #######     ########      ###  ##',
  '         ###         #####   #######     #######',
  '          ####        #####  #######      #######',
  '          #####       ######  ######       #####            ######',
  '          ######       ###### #####        #####          ########',
  '           #####        #####  ####         ####          ########',
  '           #####        #####   ###          ###           ######',
  '            ####         ####    ##          ##',
  '            ###          ###',
  '             #',
  '',
  '',
  '',
];
const MAP_COLS = 60;
const CELL = 10;
const PULSES = [
  { x: 14, y: 26, d: '0s' },
  { x: 49, y: 24, d: '0.7s' },
  { x: 63, y: 38, d: '0.4s' },
  { x: 71, y: 44, d: '1.4s' },
  { x: 29, y: 58, d: '2.1s' },
  { x: 81, y: 66, d: '1.8s' },
];

function ThreatMap() {
  const dots = [];
  MAP_ROWS.forEach((row, r) => {
    const padded = row.padEnd(MAP_COLS, ' ');
    for (let c = 0; c < MAP_COLS; c += 1) {
      if (padded[c] === '#') dots.push({ x: c * CELL + CELL / 2, y: r * CELL + CELL / 2 });
    }
  });
  return (
    <div className="ag-map-panel">
      <div className="ag-map-label">
        <span>{content.hero.mapLabel}</span>
        <span className="ag-map-live">● LIVE</span>
      </div>
      <div className="ag-map-svgwrap">
        <svg
          className="ag-map-svg"
          viewBox={`0 0 ${MAP_COLS * CELL} ${MAP_ROWS.length * CELL}`}
          role="img"
          aria-label="Stylized dotted world map with live threat markers"
        >
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.7} fill="#8E8E93" opacity={0.42} />
          ))}
        </svg>
        {PULSES.map((p, i) => (
          <span
            key={i}
            className="ag-pulse"
            style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: p.d }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

function ThreatScan({ staticScan }) {
  return (
    <div className={`ag-scan-panel${staticScan ? ' is-static' : ''}`}>
      <div className="ag-scan-bar">
        <span className="ag-scan-title">{content.scan.panelTitle}</span>
        <span className="ag-scan-sweep">
          {content.scan.sweepLabel} <span className="ag-sweep-num">{staticScan ? '4' : '0'}</span>/4
        </span>
      </div>
      <div className="ag-scan-stage">
        <div className="ag-scan-grid">
          {content.scan.threats.map((t, i) => (
            <article
              key={t.id}
              data-row={Math.floor(i / 2)}
              className={`ag-threat${staticScan ? ' is-detected' : ''}`}
            >
              <div className="ag-threat-top">
                <span className="ag-threat-id">{t.id}</span>
                <span className={`ag-sev sev-${t.severity.toLowerCase()}`}>{t.severity}</span>
              </div>
              <h3 className="ag-threat-name">{t.name}</h3>
              <p className="ag-threat-vector">{t.vector}</p>
              <p className="ag-threat-state">
                <span className="ag-state-dormant">{content.scan.stateScanning}</span>
                <span className="ag-state-hit">{content.scan.stateHit}</span>
              </p>
            </article>
          ))}
          {!staticScan && <div className="ag-scanline" aria-hidden="true" />}
        </div>
        {!staticScan && (
          <p className="ag-scan-hint">SCROLL — THE SWEEP IS DRIVEN BY YOU</p>
        )}
      </div>
    </div>
  );
}

export default function Design04Secure() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const [pinned, setPinned] = useState(
    () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(min-width: 768px)').matches
  );
  const staticScan = reduced || !pinned;

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(min-width: 768px)');
    if (!mq) return;
    const upd = () => setPinned(mq.matches);
    upd();
    mq.addEventListener('change', upd);
    return () => mq.removeEventListener('change', upd);
  }, []);

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

      /* HERO entrance — hard cuts, no bounce. */
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo('.ag-status', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .fromTo('.ag-hero-title .ag-wi', { yPercent: 112 }, { yPercent: 0, duration: 0.7, stagger: 0.07 }, 0.1)
        .fromTo('.ag-hero-sub', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .fromTo('.ag-hero-ctas', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, 0.58)
        .fromTo('.ag-map-panel', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.5);

      /* Section reveals — crisp, short, linear-ish. */
      gsap.utils.toArray('.ag-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      /* Opacity-only reveal for the wrapper of the pinned scan panel: any
         transform on an ancestor of a fixed-pinned element becomes its
         containing block and the "pinned" panel drifts with the page. */
      gsap.utils.toArray('.ag-fade').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Detection metrics — count-up on enter. */
      gsap.utils.toArray('.ag-metric-num').forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const dec = parseInt(el.dataset.dec || '0', 10);
        const valEl = el.querySelector('.ag-val');
        const obj = { v: 0 };
        /* the markup carries the final value (reduced motion / no JS);
           start the count from zero only when the animation will run */
        if (valEl) valEl.textContent = (0).toFixed(dec);
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 86%', once: true },
          onUpdate: () => { if (valEl) valEl.textContent = obj.v.toFixed(dec); },
        });
      });

      /* THREAT-SCAN SWEEP — pinned panel; scroll scrubs a red scan line
         top→bottom; each quarter flips a row of threat cards to DETECTED.
         Desktop (≥768px) only; resize-safe via matchMedia. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pinEl = rootRef.current && rootRef.current.querySelector('.ag-scan-pin');
        const panel = pinEl && pinEl.querySelector('.ag-scan-panel');
        if (!panel || panel.classList.contains('is-static')) return undefined;
        const grid = panel.querySelector('.ag-scan-grid');
        const line = panel.querySelector('.ag-scanline');
        const sweepNum = panel.querySelector('.ag-sweep-num');
        const rows = [0, 1, 2, 3].map((r) =>
          Array.from(grid.querySelectorAll(`[data-row="${r}"]`))
        );
        let gridH = grid.offsetHeight;
        pinEl.classList.add('is-live');
        /* The pinned stage is the visible area below the 64px sticky nav;
           scale the panel down on screens too short for all four rows. */
        const fit = () => {
          panel.style.scale = '';
          gridH = grid.offsetHeight;
          const cs = getComputedStyle(pinEl);
          const avail = pinEl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
          const need = panel.offsetHeight;
          if (avail > 0 && need > avail) panel.style.scale = String(Math.max(0.6, avail / need));
        };
        fit();
        gsap.set(line, { y: 0 });
        const st = ScrollTrigger.create({
          trigger: pinEl,
          scroller: sc,
          start: 'top 64px',
          end: '+=250%',
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: fit,
          onUpdate(self) {
            const p = self.progress;
            gsap.set(line, { y: p * gridH });
            rows.forEach((cards, r) => {
              const hit = p * 4 >= r + 1 - 1e-4;
              cards.forEach((c) => c.classList.toggle('is-detected', hit));
            });
            if (sweepNum) {
              const n = p <= 0 ? 0 : Math.min(4, Math.ceil(p * 4));
              if (sweepNum.textContent !== String(n)) sweepNum.textContent = String(n);
            }
          },
        });
        return () => {
          st.kill();
          pinEl.classList.remove('is-live');
          panel.style.scale = '';
        };
      });

      /* Re-measure after imagery settles. */
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, pinned, scroller, rootRef]);

  const featImgs = [
    { src: f1Img, key: 'product-0', alt: 'Security operations center at night, rows of monitors with blurred dashboards under red alert lighting' },
    { src: f2Img, key: 'product-1', alt: 'Extreme macro of a biometric fingerprint scanner glowing red' },
    { src: f3Img, key: 'product-2', alt: 'Fiber optic cables curving through darkness, one strand glowing red' },
  ];

  return (
    <div ref={rootRef} className="tpl-design-04-secure">
      <header className="ag-nav">
        <a className="ag-wordmark" href="#hero">
          <span className="ag-wordmark-dot" aria-hidden="true" />
          {name}
        </a>
        <nav className="ag-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.label} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="ag-nav-cta" href="#cta">Get protected</a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="ag-hero" data-tour="Threat Map">
          <ScrollFrames
            frames={frames}
            alt="Dark server corridor; a thin red scan line sweeps across the racks and the corridor falls dark"
            pinDistance="+=170%"
          >
            <div className="ag-hero-veil" aria-hidden="true" />
            <div className="ag-hero-inner">
              <div className="ag-hero-copy">
                <p className="ag-status">
                  <span className="ag-status-dot" aria-hidden="true" />
                  {content.hero.status}
                  <span className="ag-status-sep" aria-hidden="true">/</span>
                  {content.hero.eventsLabel}
                </p>
                <h1 className="ag-hero-title">
                  <Words text={content.hero.title} />
                </h1>
                <p className="ag-hero-sub">{content.hero.sub}</p>
                <div className="ag-hero-ctas">
                  <a className="ag-btn" href={content.hero.ctaPrimaryHref}>{content.hero.ctaPrimary}</a>
                  <a className="ag-btn ag-btn-ghost" href={content.hero.ctaSecondaryHref}>{content.hero.ctaSecondary}</a>
                </div>
              </div>
              <ThreatMap />
            </div>
          </ScrollFrames>
          {/* Phones: the hero stage is one screen tall, so the map rides
              below it instead of being clipped off the bottom. */}
          <div className="ag-map-mobile">
            <ThreatMap />
          </div>
        </section>

        {/* LIVE THREAT FEED TICKER */}
        <div className="ag-ticker" aria-label="Live threat feed">
          <div className="ag-ticker-track">
            {[...content.ticker, ...content.ticker].map((t, i) => (
              <span className="ag-tick" key={i}>
                <b>●</b> {t} <span className="ag-tick-sep" aria-hidden="true">///</span>
              </span>
            ))}
          </div>
        </div>

        {/* THREAT-SCAN SWEEP */}
        <section id="threats" className="ag-scan ag-sec" data-tour="Live Threat Scan">
          <div className="ag-wrap">
            <div className="ag-scan-head-row">
              <div>
                <p className="ag-eyebrow ag-rv">{content.scan.eyebrow}</p>
                <h2 className="ag-h2 ag-rv">{content.scan.title}</h2>
              </div>
              <p className="ag-body ag-rv">{content.scan.body}</p>
            </div>
            <div className="ag-fade">
              <div className="ag-scan-pin">
                <ThreatScan staticScan={staticScan} />
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM */}
        <section id="platform" className="ag-platform ag-sec" data-tour="The Platform">
          <div className="ag-wrap">
            <p className="ag-eyebrow ag-rv">{content.platform.eyebrow}</p>
            <h2 className="ag-h2 ag-rv">{content.platform.title}</h2>
            <p className="ag-body ag-rv">{content.platform.body}</p>
            <div className="ag-plat-grid ag-rv">
              {content.platform.cards.map((c) => (
                <article className="ag-plat-card" key={c.code}>
                  <p className="ag-plat-code">{c.code}</p>
                  <h3 className="ag-plat-name">{c.name}</h3>
                  <p className="ag-plat-desc">{c.desc}</p>
                  <ul className="ag-specs">
                    {c.specs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="ag-feat-row">
              {content.features.map((f, i) => (
                <figure className="ag-feat ag-rv" key={f.imgKey} style={{ margin: 0 }}>
                  <div className="ag-feat-img">
                    <Img k={featImgs[i].key} src={img(featImgs[i].key, featImgs[i].src)} alt={featImgs[i].alt} />
                  </div>
                  <figcaption>
                    <h3 className="ag-feat-title">{f.title}</h3>
                    <p className="ag-feat-text">{f.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section id="compliance" className="ag-compliance ag-sec" data-tour="Compliance">
          <div className="ag-wrap">
            <p className="ag-eyebrow ag-rv">{content.compliance.eyebrow}</p>
            <h2 className="ag-h2 ag-rv">{content.compliance.title}</h2>
            <p className="ag-body ag-rv">{content.compliance.body}</p>
            <div className="ag-badges ag-rv">
              {content.compliance.badges.map((b) => (
                <div className="ag-badge" key={b}>{b}</div>
              ))}
            </div>
            <p className="ag-comp-note ag-rv"><b>■</b> {content.compliance.note}</p>
          </div>
        </section>

        {/* METRICS */}
        <section id="metrics" className="ag-metrics ag-sec" data-tour="Detection Metrics">
          <div className="ag-wrap">
            <p className="ag-eyebrow ag-rv">{content.metrics.eyebrow}</p>
            <h2 className="ag-h2 ag-rv">{content.metrics.title}</h2>
            <div className="ag-metric-layout">
              <div className="ag-rv">
                {content.metrics.items.map((m) => (
                  <div className="ag-metric" key={m.label}>
                    <p className="ag-metric-num" data-value={m.value} data-dec={m.decimals}>
                      {m.prefix && <span className="ag-pre">{m.prefix}</span>}
                      <span className="ag-val">{Number(m.value).toFixed(Number(m.decimals) || 0)}</span>
                      <span className="ag-suf">{m.suffix}</span>
                    </p>
                    <p className="ag-metric-label">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="ag-metric-visual ag-rv">
                <Img k="detail" src={img('detail', detailImg)} alt="Circuit board macro raked with red light" />
                <p className="ag-metric-cap">{content.metrics.detailCaption}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="ag-cta ag-sec" data-tour="Get Protected">
          <div className="ag-wrap">
            <p className="ag-eyebrow ag-rv">{content.cta.eyebrow}</p>
            <h2 className="ag-cta-title ag-rv">{content.cta.title}</h2>
            <p className="ag-cta-body ag-rv">{content.cta.body}</p>
            <p className="ag-rv"><a className="ag-btn" href={content.cta.buttonHref}>{content.cta.button}</a></p>
            <p className="ag-cta-contact ag-rv">
              Prefer to talk first? — <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        </section>
      </main>

      <footer className="ag-footer">
        <div className="ag-wrap ag-footer-grid">
          <div>
            <a className="ag-wordmark" href="#hero">
              <span className="ag-wordmark-dot" aria-hidden="true" />
              {name}
            </a>
            <p className="ag-footer-tag">{content.brand.tagline}. {content.hero.sub}</p>
          </div>
          <div>
            <p className="ag-footer-h">Navigate</p>
            <nav aria-label="Footer">
              {content.nav.map((n) => (
                <a key={n.label} href={n.href}>{n.label}</a>
              ))}
            </nav>
          </div>
          <div>
            <p className="ag-footer-h">Contact</p>
            <div className="ag-footer-contact">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${content.contact.phone.replace(/[^+\d]/g, '')}`}>{content.contact.phone}</a>
            </div>
          </div>
        </div>
        <div className="ag-wrap ag-footer-base">
          <span>{content.footer.line}</span>
          <span>{content.footer.colophon}</span>
        </div>
      </footer>
    </div>
  );
}
