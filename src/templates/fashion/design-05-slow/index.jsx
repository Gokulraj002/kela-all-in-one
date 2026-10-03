import React, { useEffect, useLayoutEffect } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope } from '../../_shared';
import { ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1Img from './assets/look-1.webp';
import look2Img from './assets/look-2.webp';
import look3Img from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-scrub frame sequence for the craft section ("The Vat"). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

/* Mitti — design-05-slow · Sustainable slow fashion, earthy editorial.
   Signature motion: swatchAccordion — a pinned dye journey (Indigo →
   Madder → Turmeric → Undyed). The active swatch-band's detail blooms via
   transform-only scaleY while inactive bands compress to thread-thin strips. */

function words(text) {
  return text.split(' ').map((w, i) => (
    <span className="mtt-wmask" key={i}>
      <span className="mtt-wword">{w}</span>
      {i < text.split(' ').length - 1 ? ' ' : ''}
    </span>
  ));
}

export default function MittiSlow() {
  const { brand, colors, fonts, contact, productName, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();

  const brandName = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const insta = contact.instagram || null;

  /* Live customizer overrides: brand colors / font pair rewrite scope tokens. */
  const customVars = {};
  if (colors.primary) customVars['--color-primary'] = colors.primary;
  if (colors.accent) customVars['--color-accent'] = colors.accent;
  if (fonts) {
    const parts = fonts.split('|');
    if (parts[0]) customVars['--font-display'] = `'${parts[0]}', serif`;
    if (parts[1]) customVars['--font-body'] = `'${parts[1]}', sans-serif`;
  }

  /* Template fonts — Fraunces (display) + Work Sans (body). */
  useEffect(() => {
    const id = 'tpl-font-design-05-slow';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';
    document.head.appendChild(link);
  }, []);

  /* The pinned "Vat" frames (ScrollFrames) build their pin in a child effect,
     after the triggers below were measured. Re-sort + re-measure once
     everything is mounted and when the webfonts land (viewer + export). */
  useEffect(() => {
    let alive = true;
    const remeasure = () => {
      if (!alive) return;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    const raf = requestAnimationFrame(remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure).catch(() => {});
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return; // CSS .mtt-reduced fallback: everything fully visible.
      const sc = scroller();

      /* Hero: cotton-field image fades in over 2s (opacity only); headline
         wordRise stagger 0.1; sub copy drapeSettles at 1.2s. */
      gsap.fromTo(
        '.mtt-hero-media',
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'sine.out' }
      );
      gsap.fromTo(
        '.mtt-hero .mtt-wword',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
      );
      gsap.fromTo(
        '.mtt-hero-sub, .mtt-hero-ctas, .mtt-hero-cap',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.3, ease: 'sine.out', stagger: 0.18, delay: 1.2 }
      );

      /* Scroll reveals: drapeSettle, 1.3s sine.out — dye spreading in water. */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'sine.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* The Vat frames fade in on their stage only. The pinned ScrollFrames
         wrapper itself must never carry a transform (a y-reveal on it made the
         pinned film drift ~10px while it was supposed to hold still). */
      gsap.utils.toArray('.mtt-craft-frames .sf-stage').forEach((stage) => {
        gsap.fromTo(
          stage,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.3,
            ease: 'sine.out',
            scrollTrigger: { trigger: stage, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Watercolor-bleed dividers bloom between process and collection. */
      gsap.utils.toArray('.mtt-bleed').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'sine.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Impact counters tick up on entry (snap: 1, 1.5s). */
      gsap.utils.toArray('.mtt-stat-num').forEach((el) => {
        const final = parseFloat(el.dataset.value || '0');
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          scroller: sc,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: final,
              duration: 1.5,
              ease: 'sine.out',
              snap: { v: 1 },
              onUpdate: () => {
                el.textContent = Math.round(obj.v).toLocaleString('en-IN');
              },
            });
          },
        });
      });

      /* ── Signature: swatchAccordion ──────────────────────────────
         Pinned dye journey (≥768px). 4 swatch-bands; scrub progress maps to
         per-band weights with smooth crossfades at segment boundaries.
         Transform-only: band scaleY (compress to thread-thin strips) and
         detail scaleY (origin top). A dye-bloom dot on the side rail tracks
         the active stage. Mobile / reduced-motion: all bands fully expanded. */
      const mmAcc = gsap.matchMedia();
      mmAcc.add('(min-width: 768px)', () => {
        const pin = rootRef.current && rootRef.current.querySelector('.mtt-acc-pin');
        const acc = pin && pin.querySelector('.mtt-acc');
        if (!pin || !acc) return undefined;
        const bands = gsap.utils.toArray('.mtt-band', pin);
        const details = bands.map((b) => b.querySelector('.mtt-band-detail'));
        const dot = pin.querySelector('.mtt-rail-dot');
        const rail = pin.querySelector('.mtt-rail');
        const railLabel = pin.querySelector('.mtt-rail-stage');
        const names = bands.map((b) => b.dataset.name || '');
        const GAP = 10;
        let lastActive = -1;
        const clamp01 = (v) => Math.min(1, Math.max(0, v));

        /* Bands become an absolutely stacked deck (see .mtt-acc.is-live):
           each keeps its natural open height H[i]; layout() folds them with
           scaleY and places them with translateY so the deck stays tight and
           centred — transforms only, no layout work per scrub tick. */
        acc.classList.add('is-live');
        let H = [];
        let padTop = 0;
        let usable = 0;
        let railH = 0;
        const measure = () => {
          H = bands.map((b) => b.offsetHeight);
          const cs = getComputedStyle(acc);
          padTop = parseFloat(cs.paddingTop) || 0;
          usable = acc.clientHeight - padTop - (parseFloat(cs.paddingBottom) || 0);
          railH = rail ? rail.clientHeight : 0;
        };
        /* The dot glides on a transform (y), not `top`. */
        const setDotY = dot ? gsap.quickSetter(dot, 'y', 'px') : null;

        const layout = (progress) => {
          /* seg 0..(n-1): band i is fully open at seg === i, with smooth
             crossfades at the half-segments. */
          const seg = progress * (bands.length - 1);
          /* each band holds fully open for a beat around its stage, then folds */
          const weights = bands.map((_, i) => clamp01(1 - Math.max(0, Math.abs(seg - i) - 0.18) / 0.72));
          const scales = weights.map((w) => 0.07 + 0.93 * w);
          const total = scales.reduce((sum, s, i) => sum + s * H[i], 0) + GAP * (bands.length - 1);
          let y = padTop + Math.max(0, (usable - total) / 2);
          bands.forEach((band, i) => {
            band.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scaleY(${scales[i].toFixed(4)})`;
            band.style.setProperty('--mtt-open', clamp01((weights[i] - 0.15) / 0.45).toFixed(3));
            y += scales[i] * H[i] + GAP;
            if (details[i]) {
              const dw = clamp01((weights[i] - 0.55) / 0.45);
              const eased = 1 - Math.pow(1 - dw, 3);
              details[i].style.transform = `scaleY(${eased.toFixed(4)})`;
              /* fade with the fold so half-folded copy never reads as squashed letters */
              details[i].style.opacity = clamp01((scales[i] * eased - 0.78) / 0.2).toFixed(3);
            }
          });
          /* Side rail: dye-bloom dot glides down the rail; label follows. */
          const idxF = Math.min(bands.length - 1, Math.max(0, seg));
          if (dot) {
            setDotY((idxF / (bands.length - 1)) * railH);
            const active = Math.min(bands.length - 1, Math.max(0, Math.round(idxF)));
            if (active !== lastActive) {
              lastActive = active;
              gsap.fromTo(dot, { scale: 1.9 }, { scale: 1, duration: 0.6, ease: 'sine.out', overwrite: 'auto' });
              if (railLabel && names[active]) railLabel.textContent = names[active];
            }
          }
        };

        measure();
        layout(0);
        const st = ScrollTrigger.create({
          trigger: pin,
          scroller: sc,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          /* refreshPriority → every refresh sorts triggers by page position,
             so pins are always measured top-to-bottom. */
          refreshPriority: 0,
          onRefresh: (self) => { measure(); layout(self.progress); },
          onUpdate: (self) => layout(self.progress),
        });
        return () => {
          st.kill();
          acc.classList.remove('is-live');
          bands.forEach((band, i) => {
            band.style.transform = '';
            band.style.removeProperty('--mtt-open');
            if (details[i]) { details[i].style.transform = ''; details[i].style.opacity = ''; }
          });
          if (dot) gsap.set(dot, { clearProps: 'transform' });
          if (railLabel && names[0]) railLabel.textContent = names[0];
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const bands = content.journey.bands;

  /* In-page links glide through the platform's Lenis (viewer:
     .tpl-scope.__lenis, export: window.__lenis) with the wheel's easing;
     #hero means the very top. */
  const onAnchor = (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || !rootRef.current || !rootRef.current.contains(a)) return;
    const id = a.getAttribute('href').slice(1);
    const el = id && rootRef.current.querySelector(`#${id}`);
    if (!el) return;
    e.preventDefault();
    const sc = scroller();
    const lenis = (sc && sc.__lenis) || window.__lenis;
    const target = id === 'hero' ? 0 : el;
    if (lenis && !reduced) lenis.scrollTo(target, { duration: 1.4 });
    else if (id === 'hero') sc.scrollTo({ top: 0 });
    else el.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={rootRef} className={`tpl-design-05-slow ${reduced ? 'mtt-reduced' : ''}`} style={customVars} onClick={onAnchor}>
      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="mtt-nav" aria-label="Primary">
        <a className="mtt-wordmark" href="#hero">{brandName}</a>
        <div className="mtt-nav-links">
          {content.nav.map((n, i) => {
            const hrefs = ['#story', '#products', '#gallery', '#craft', '#visit'];
            return <a key={n} href={hrefs[i]}>{n}</a>;
          })}
        </div>
        <a className="mtt-nav-cta" href="#products">{content.hero.cta}</a>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <header id="hero" data-tour="Field & First Light" className="mtt-hero">
        <div className="mtt-hero-media">
          <Img k="hero" src={heroImg} alt="Model in a natural indigo-dyed handloom saree standing in a cotton field at golden hour" eager />
        </div>
        <div className="mtt-hero-shade" aria-hidden="true" />
        <div className="mtt-hero-copy">
          <p className="mtt-eyebrow">{content.hero.eyebrow}</p>
          <h1 className="mtt-hero-title">{words(content.hero.title)}</h1>
          <p className="mtt-hero-sub">{content.hero.sub}</p>
          <div className="mtt-hero-ctas">
            <a className="mtt-btn mtt-btn-solid" href="#products">{content.hero.cta}</a>
            <a className="mtt-btn mtt-btn-ghost" href="#story">Follow the dye</a>
          </div>
          <p className="mtt-hero-cap">Field note — {content.hero.caption}</p>
        </div>
      </header>

      {/* ── Dye journey: swatchAccordion ─────────────────── */}
      <section id="story" data-tour="The Dye Journey" className="mtt-journey">
        <div className="mtt-sec-head rv">
          <p className="mtt-eyebrow">{content.journey.eyebrow}</p>
          <h2>{content.journey.title}</h2>
          <p className="mtt-lede">{content.journey.body}</p>
        </div>
        <div className="mtt-acc-pin">
          <div className="mtt-acc">
            <div className="mtt-rail" aria-hidden="true">
              <span className="mtt-rail-line" />
              <span className="mtt-rail-dot" />
            </div>
            <p className="mtt-rail-stage" aria-live="polite">{bands[0].name}</p>
            {bands.map((b, i) => (
              <article className="mtt-band" data-name={b.name} key={b.key}>
                <div
                  className={`mtt-band-head ${b.key === 'turmeric' || b.key === 'undyed' ? 'is-light' : ''}`}
                  style={{ backgroundColor: b.swatch }}
                >
                  <span className="mtt-band-num">0{i + 1}</span>
                  <span className="mtt-band-name">{b.name}</span>
                  <span className="mtt-band-days">{b.days}</span>
                </div>
                <div className="mtt-band-detail">
                  <div className="mtt-band-inner">
                    <p className="mtt-band-source">{b.source}</p>
                    <p className="mtt-band-shade">{b.shade}</p>
                    <p className="mtt-band-notes">{b.notes}</p>
                    <dl className="mtt-band-meta">
                      <div><dt>Process</dt><dd>{b.days}</dd></div>
                      <div><dt>Water</dt><dd>{b.water}</dd></div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="mtt-bleed" aria-hidden="true" />

      {/* ── Collection ──────────────────────────────────── */}
      <section id="products" data-tour="The Collection" className="mtt-collection">
        <div className="mtt-sec-head rv">
          <p className="mtt-eyebrow">Chapter two — wear</p>
          <h2>Timeless pieces, honest numbers</h2>
          <p className="mtt-lede">
            Eight pieces, each with its dye, its days on the loom, its maker —
            and exactly where your money goes.
          </p>
        </div>
        <div className="mtt-grid">
          {content.products.map((p, i) => {
            const keys = ['product-0', 'product-1', 'product-2', 'product-3'];
            const srcs = [look1Img, look2Img, look3Img, detailImg];
            const k = keys[i % 4];
            const src = srcs[i % 4];
            return (
              <article className="mtt-card rv" key={p.name}>
                <div className="mtt-card-img">
                  <Img k={k} src={src} alt={`${p.name} — ${p.desc}`} />
                  <span className="mtt-card-dye">{p.dye}</span>
                </div>
                <div className="mtt-card-body">
                  <div className="mtt-card-top">
                    <h3>{productName(i, p.name)}</h3>
                    <p className="mtt-price">{price(p.price)}</p>
                  </div>
                  <p className="mtt-card-desc">{p.desc}</p>
                  <p className="mtt-card-meta">{p.fabric} · {p.days} · {p.maker}</p>
                  <dl className="mtt-cost">
                    <div><dt>Materials</dt><dd>{price(p.cost.materials)}</dd></div>
                    <div><dt>Artisan wages</dt><dd>{price(p.cost.wages)}</dd></div>
                    <div><dt>Dye &amp; process</dt><dd>{price(p.cost.dye)}</dd></div>
                    <div><dt>Studio</dt><dd>{price(p.cost.studio)}</dd></div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Artisans ────────────────────────────────────── */}
      <section id="gallery" data-tour="The Makers" className="mtt-makers">
        <div className="mtt-sec-head rv">
          <p className="mtt-eyebrow">Chapter three — hands</p>
          <h2>The makers are the brand</h2>
          <p className="mtt-lede">Portraits from the dye and loom villages. Names, wages, words — no anonymity.</p>
        </div>
        <div className="mtt-maker-row">
          {content.artisans.map((a) => {
            const srcMap = { 'product-0': look1Img, 'product-1': look2Img, 'product-2': look3Img };
            return (
              <article className="mtt-maker rv" key={a.name}>
                <div className="mtt-maker-img">
                  <Img k={a.img} src={srcMap[a.img]} alt={`Portrait of ${a.name}, ${a.role}`} />
                </div>
                <h3>{a.name}</h3>
                <p className="mtt-maker-role">{a.role}</p>
                <blockquote className="mtt-maker-quote">“{a.quote}”</blockquote>
                <p className="mtt-maker-wage">{a.wage}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Craft: "The Vat" — scroll-scrubbed dye frames ────── */}
      <section id="craft" data-tour="The Vat" className="mtt-craft">
        <div className="mtt-craft-copy rv">
          <p className="mtt-eyebrow">{content.craft.eyebrow}</p>
          <h2>{content.craft.title}</h2>
          <p className="mtt-lede">{content.craft.body}</p>
          <p className="mtt-field-cap">Field note — {content.craft.caption}</p>
        </div>
        <ScrollFrames
          frames={frames}
          alt="The Vat — indigo dyeing vat"
          pinDistance="+=120%"
          stageHeight="90svh"
          className="mtt-craft-frames"
        >
          <p className="mtt-craft-hint">Scroll — the yarn dips green, rises indigo blue</p>
        </ScrollFrames>
      </section>

      {/* ── Impact / footprint ──────────────────────────── */}
      <section id="visit" data-tour="Our Footprint" className="mtt-impact">
        <div className="mtt-sec-head rv">
          <p className="mtt-eyebrow">{content.impact.eyebrow}</p>
          <h2>{content.impact.title}</h2>
          <p className="mtt-lede">{content.impact.body}</p>
        </div>
        <div className="mtt-stats">
          {content.impact.stats.map((s) => (
            <div className="mtt-stat rv" key={s.label}>
              <p className="mtt-stat-num" data-value={s.value}>
                {s.value.toLocaleString('en-IN')}
              </p>
              <p className="mtt-stat-suffix">{s.suffix}</p>
              <p className="mtt-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mtt-impact-cta rv">
          <a className="mtt-btn mtt-btn-solid" href="#products">{content.impact.cta}</a>
          <p className="mtt-impact-note">{content.impact.note}</p>
          <p className="mtt-contact">
            <a href={`mailto:${email}`}>{email}</a> · {content.contact.address} · {content.contact.hours}
          </p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="mtt-footer">
        <p className="mtt-footer-brand">{brandName}</p>
        <p className="mtt-footer-line">{content.footer.line}</p>
        <nav className="mtt-footer-links" aria-label="Footer">
          {content.footer.links.map((l) =>
            l === 'Instagram' && insta ? (
              <a key={l} href={insta} target="_blank" rel="noreferrer">{l}</a>
            ) : (
              <a key={l} href="#visit">{l}</a>
            )
          )}
        </nav>
      </footer>
    </div>
  );
}
