import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import heroImg from './assets/hero.webp';
import look1 from './assets/look-1.webp';
import look2 from './assets/look-2.webp';
import look3 from './assets/look-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: 72-frame shuttle sequence scrubbed by scroll (Apple-style) */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_IMAGES = { hero: heroImg, 'look-1': look1, 'look-2': look2, 'look-3': look3, detail: detailImg };
const CHAPTER_KEYS = { hero: 'hero', 'look-1': 'product-0', 'look-2': 'product-1', 'look-3': 'product-2', detail: 'detail' };
const PRODUCT_IMAGES = [look1, look2, look3, heroImg];
const PRODUCT_KEYS = ['product-0', 'product-1', 'product-2', 'product-3'];
const PRODUCT_ALTS = [
  'Kanchipuram silk saree in indigo with gold zari temple border, draped in temple light',
  'Banarasi brocade saree in maroon with gold zari, folded on teak wood',
  'Hands lowering yarn into turmeric and madder dye vats in a sunlit courtyard',
  'Weaver at a wooden pit loom, indigo warp threads in window light',
];
const CHAPTER_ALTS = {
  hero: 'Weaver at a wooden pit loom in Kanchipuram, warm window light on indigo warp',
  'look-3': 'Hands of a dyer lowering yarn into turmeric and madder dye vats',
  detail: 'Macro of gold zari buttis woven into deep indigo silk',
  'look-1': 'Kanchipuram silk saree in indigo and gold, draped in temple light',
};

const THREAD_D = 'M0,20 C120,6 240,34 360,20 C480,6 600,34 720,20 C840,6 960,34 1080,20 C1140,14 1170,22 1200,18';

function ThreadDivider() {
  return (
    <div className="vh-divider" aria-hidden="true">
      <svg className="vh-divider-svg" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path className="draw-path" d={THREAD_D} fill="none" />
        <circle className="vh-shuttle" cx="1194" cy="18" r="5" />
      </svg>
    </div>
  );
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.3-.9.9-1.1 2.2-.2 3.9a11.6 11.6 0 0 0 4.5 4.2c1.7.8 2.4.9 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.1-.4-.2z" />
    </svg>
  );
}

function Words({ text }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span className="vh-w" key={i} aria-hidden="true">
          <span className="vh-wi">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}

export default function VastraHeritage() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const lookbookRef = useRef(null);
  const [cluster, setCluster] = useState(0);
  const custom = useCustom();
  const { brand, productName, price, contact } = custom;

  const brandName = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const phone = content.contact.phone;
  /* the platform passes a full profile URL, content.js a @handle */
  const instaRaw = contact.instagram || content.contact.instagram;
  const instaHandle = `@${String(instaRaw).replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^@/, '').replace(/\/$/, '')}`;
  const instaUrl = `https://instagram.com/${instaHandle.slice(1)}`;
  const wa = (msg) => `https://wa.me/${content.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

  /* Fonts: Rozha One + Mukta, injected once */
  useEffect(() => {
    const id = 'tpl-font-design-01-heritage';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Rozha+One&family=Mukta:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  /* ScrollFrames builds its pin in a child effect, i.e. after the triggers
     below were measured. Re-sort + re-measure once everything is mounted and
     again when the webfonts land, so every trigger sits in document order —
     in the viewer and in the standalone export alike. */
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

  /* Motion */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return; // static fully-visible chapters; CSS handles the rest

      /* — house reveals: drapeSettle — (clearProps hands transform back to
         CSS afterwards, so hover lifts never fight a GSAP-written transform) */
      gsap.utils.toArray('.rv').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: -28 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', clearProps: 'transform',
          scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.rv-stagger').forEach((group) => {
        gsap.fromTo(group.children, { opacity: 0, y: -28 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12, clearProps: 'transform',
          scrollTrigger: { trigger: group, scroller: sc, start: 'top 88%', once: true },
        });
      });

      /* — hero: canvas foldUnfold, wordRise headline, thread draw — */
      gsap.fromTo('#hero .sf-canvas',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power4.inOut',
          scrollTrigger: { trigger: '#hero', scroller: sc, start: 'top 90%', once: true } });
      gsap.fromTo('.vh-wi', { yPercent: 115 }, {
        yPercent: 0, duration: 1.0, ease: 'power4.out', stagger: 0.09, delay: 0.55,
        scrollTrigger: { trigger: '#hero', scroller: sc, start: 'top 80%', once: true },
      });
      const heroThread = document.querySelector('.vh-hero-thread path');
      if (heroThread) {
        const len = heroThread.getTotalLength();
        gsap.set(heroThread, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(heroThread, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: 0.9,
          scrollTrigger: { trigger: '#hero', scroller: sc, start: 'top 80%', once: true } });
      }

      /* — image unfolds (gallery frames) — */
      gsap.utils.toArray('.rv-img').forEach((frame) => {
        const inner = frame.querySelector('.a-img');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
        });
        tl.fromTo(frame, { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 0);
        if (inner) tl.fromTo(inner, { y: '-6%' }, { y: '0%', duration: 1.2, ease: 'power4.inOut' }, 0);
      });

      /* — woven divider threads draw once per entry — */
      gsap.utils.toArray('.vh-divider .draw-path').forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut',
          scrollTrigger: { trigger: path.closest('.vh-divider'), scroller: sc, start: 'top 92%', once: true } });
      });

      /* — hemSway on the hero image only, paused offscreen. It moves the
         canvas inside the clipped stage, so the headline and CTAs stay
         perfectly still while the hero is pinned. — */
      const swayEl = rootRef.current && rootRef.current.querySelector('#hero .sf-canvas');
      if (swayEl) {
        gsap.set(swayEl, { scale: 1.04, transformOrigin: '50% 50%' }); /* headroom for hem sway */
        const tw = gsap.to(swayEl, { x: 8, rotation: 0.35, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut', force3D: true });
        ScrollTrigger.create({
          trigger: '#hero', scroller: sc, start: 'top bottom', end: 'bottom top',
          onToggle: (s) => { if (s.isActive) tw.play(); else tw.pause(); },
        });
      }

      /* — signature: pageturnLookbook (pinned ≥768px) — */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const book = lookbookRef.current;
        if (!book) return undefined;
        const pages = gsap.utils.toArray('.vh-page', book);
        const N = pages.length;
        const dots = gsap.utils.toArray('.vh-dot', book);
        const threadPaths = gsap.utils.toArray('.vh-page-thread path', book);
        const lens = threadPaths.map((p) => p.getTotalLength());
        threadPaths.forEach((p, i) => gsap.set(p, { strokeDasharray: lens[i], strokeDashoffset: lens[i] }));
        book.classList.add('is-live');

        const render = (p) => {
          pages.forEach((page, i) => {
            const out = Math.min(Math.max(p - i, 0), 1);      // corner-sweep wipe during [i, i+1]
            const inn = i === 0 ? 1 : Math.min(Math.max(p - (i - 1), 0), 1); // fold unfold during [i-1, i]
            const visible = p > i - 1 && p < i + 1;
            const inner = page.querySelector('.vh-page-inner');
            page.style.visibility = visible ? 'visible' : 'hidden';
            page.style.zIndex = String(10 + i);
            const activeIdx = Math.min(N - 1, Math.max(0, Math.round(p)));
            page.style.pointerEvents = i === activeIdx ? 'auto' : 'none';
            if (visible) {
              if (out > 0 && out < 1) {
                // fabric page-turn: collapse toward the top-right corner, slanted lead edge
                const X = (100 * (1 - out)).toFixed(2);
                const Y = Math.max(0, 100 * (1 - out) - 14).toFixed(2);
                page.style.clipPath = `polygon(0% 0%, ${X}% 0%, ${Y}% 100%, 0% 100%)`;
                if (inner) inner.style.transform = '';
              } else if (out >= 1) {
                page.style.clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
              } else if (inn < 1) {
                page.style.clipPath = `inset(${(100 * (1 - inn)).toFixed(2)}% 0% 0% 0%)`;
                if (inner) inner.style.transform = `translateY(${((1 - inn) * 6).toFixed(2)}%)`;
              } else {
                page.style.clipPath = 'inset(0% 0% 0% 0%)';
                if (inner) inner.style.transform = '';
              }
            }
            // weft thread draws along the page foot as its chapter arrives
            const drawn = i === 0 ? 1 : Math.min(Math.max(p - i + 1, 0), 1);
            threadPaths[i].style.strokeDashoffset = String(lens[i] * (1 - drawn));
          });
          const ai = Math.min(N - 1, Math.max(0, Math.floor(p + 0.5)));
          dots.forEach((d, i) => d.classList.toggle('is-active', i <= ai));
        };

        ScrollTrigger.create({
          trigger: book, start: 'top top', end: '+=300%',
          pin: true, scrub: 0.6, scroller: sc,
          /* Declaring a refreshPriority makes every ScrollTrigger.refresh()
             sort triggers by page position first, so this pin is always
             measured after the hero's ScrollFrames pin above it. */
          refreshPriority: 0,
          onUpdate: (self) => render(self.progress * (N - 1)),
        });
        render(0);
        return () => {
          book.classList.remove('is-live');
          pages.forEach((page) => {
            page.style.clipPath = ''; page.style.visibility = '';
            page.style.zIndex = ''; page.style.pointerEvents = '';
            const inner = page.querySelector('.vh-page-inner');
            if (inner) inner.style.transform = '';
          });
          threadPaths.forEach((p) => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
        };
      });

    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  /* In-page links glide through the platform's Lenis instance (viewer:
     .tpl-scope.__lenis, export: window.__lenis) so they share the same
     easing as wheel scrolling; plain scrollIntoView is the fallback. */
  const scrollTo = (e, hash) => {
    e.preventDefault();
    const t = rootRef.current && rootRef.current.querySelector(hash);
    if (!t) return;
    const sc = scroller();
    const lenis = (sc && sc.__lenis) || window.__lenis;
    if (lenis && !reduced) lenis.scrollTo(t, { duration: 1.4 });
    else t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  const activeCluster = content.clusters[cluster];

  return (
    <div ref={rootRef} className="tpl-design-01-heritage">
      {/* ————— NAV ————— */}
      <nav className="vh-nav" aria-label="Primary">
        <a href="#hero" className="vh-wordmark" onClick={(e) => scrollTo(e, '#hero')}>
          {brandName}
          <span className="vh-wordmark-since">{content.brand.since}</span>
        </a>
        <div className="vh-nav-links">
          {content.nav.map((n, i) => {
            const href = ['#story', '#craft', '#collection', '#weavers'][i];
            return (
              <a key={n} href={href} onClick={(e) => scrollTo(e, href)}>{n}</a>
            );
          })}
        </div>
        <a className="vh-btn vh-btn-wa" href={wa('Namaste! I would like to enquire about a handloom saree.')} target="_blank" rel="noreferrer">
          <WaIcon /> <span>Enquire on WhatsApp</span>
        </a>
      </nav>

      {/* ————— HERO ————— */}
      <header className="vh-hero" id="hero" data-tour="The Loom">
        <ScrollFrames frames={frames} alt="The Shuttle — handloom shuttle in motion" pinDistance="+=170%">
          <div className="vh-hero-shade" aria-hidden="true" />
          <div className="vh-grain" aria-hidden="true" />
          <div className="vh-hero-copy">
          <p className="vh-eyebrow">{content.hero.eyebrow}</p>
          <h1 className="vh-title rv-mask" aria-label={content.hero.title}>
            <Words text={content.hero.title} />
          </h1>
          <svg className="vh-hero-thread" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true">
            <path d={THREAD_D} fill="none" transform="scale(0.5,0.6)" />
          </svg>
          <p className="vh-sub">{content.hero.sub}</p>
          <div className="vh-cta-row">
            <a href="#collection" className="vh-btn vh-btn-solid" onClick={(e) => scrollTo(e, '#collection')}>{content.hero.cta}</a>
            <a className="vh-btn vh-btn-ghost" href={wa('Namaste! I would like to enquire about a handloom saree.')} target="_blank" rel="noreferrer">
              <WaIcon /> <span>{content.hero.cta2}</span>
            </a>
          </div>
        </div>
        </ScrollFrames>
      </header>

      {/* ————— CLUSTERS ————— */}
      <section className="vh-section vh-clusters" id="story" data-tour="Craft Clusters">
        <div className="vh-wrap">
          <p className="vh-eyebrow rv">The craft clusters</p>
          <h2 className="vh-h2 rv">Three looms, three signatures.<br />Every one GI-tagged.</h2>
          <p className="vh-lede rv">We buy at the loom shed, not the wholesale mandi. Tap a cluster to read its weave signature — motif, zari and the price of honesty.</p>
          <div className="vh-cluster-tabs rv-stagger" role="tablist" aria-label="Craft clusters">
            {content.clusters.map((c, i) => (
              <button
                key={c.name} role="tab" aria-selected={cluster === i}
                className={`vh-cluster-tab${cluster === i ? ' is-active' : ''}`}
                onClick={() => setCluster(i)}
              >
                <span className="vh-cluster-name">{c.name}</span>
                <span className="vh-cluster-gi">{c.gi}</span>
              </button>
            ))}
          </div>
          <div className="vh-cluster-panel" key={cluster} role="tabpanel">
            <div className="vh-cluster-detail rv-img">
              <Img k={['product-0', 'product-1', 'product-2'][cluster]} src={[look1, look2, look3][cluster]} alt={`${activeCluster.name} weave detail`} />
            </div>
            <div className="vh-cluster-facts">
              <p className="vh-cluster-blurb">{activeCluster.blurb}</p>
              <dl>
                <div><dt>Signature motif</dt><dd>{activeCluster.motif}</dd></div>
                <div><dt>Zari</dt><dd>{activeCluster.zari}</dd></div>
                <div><dt>Looms</dt><dd>{activeCluster.looms}</dd></div>
                <div><dt>Price band</dt><dd className="vh-price-band">{activeCluster.priceBand}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <ThreadDivider />

      {/* ————— CRAFT CHAPTERS · pageturnLookbook ————— */}
      <section className="vh-lookbook" id="craft" data-tour="Craft Chapters" ref={lookbookRef}>
        <div className="vh-lookbook-head vh-wrap">
          <p className="vh-eyebrow vh-eyebrow-light">The craft documentary</p>
          <h2 className="vh-h2 vh-h2-light">From vat to drape,<br />in four chapters.</h2>
          <div className="vh-dots" aria-hidden="true">
            {content.chapters.map((ch, i) => (
              <span key={i} className={`vh-dot${i === 0 ? ' is-active' : ''}`}>
                <i /><em>{ch.step.replace('Chapter ', '').split(' · ')[1] || ch.step}</em>
              </span>
            ))}
          </div>
        </div>
        <div className="vh-pages vh-wrap">
          {content.chapters.map((ch, i) => (
            <article className="vh-page" key={i}>
              <div className="vh-page-media">
                <div className="vh-page-inner">
                  <Img k={CHAPTER_KEYS[ch.img]} src={CHAPTER_IMAGES[ch.img]} alt={CHAPTER_ALTS[ch.img]} />
                </div>
                <p className="vh-caption">{ch.caption}</p>
              </div>
              <div className="vh-page-copy">
                <p className="vh-eyebrow vh-eyebrow-light">{ch.step}</p>
                <h3 className="vh-h3">{ch.title}</h3>
                <p className="vh-body-light">{ch.body}</p>
                <div className="vh-stats">
                  {ch.stats.map((s) => (
                    <div key={s.l}><strong>{s.v}</strong><span>{s.l}</span></div>
                  ))}
                </div>
                <svg className="vh-page-thread" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
                  <path d={THREAD_D} fill="none" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ThreadDivider />

      {/* ————— COLLECTION ————— */}
      <section className="vh-section vh-collection" id="collection" data-tour="The Collection">
        <div className="vh-wrap">
          <p className="vh-eyebrow rv">The collection</p>
          <h2 className="vh-h2 rv">Sarees with papers,<br />not just promises.</h2>
          <p className="vh-lede rv">Every piece carries its GI tag, Silk Mark number and zari purity on the card — the way a collector expects.</p>
          <div className="vh-product-grid">
            {content.products.map((p, i) => (
              <article className="vh-card rv" key={p.name}>
                <div className="vh-card-media rv-img">
                  <Img k={PRODUCT_KEYS[i]} src={PRODUCT_IMAGES[i]} alt={PRODUCT_ALTS[i]} />
                </div>
                <div className="vh-badges">
                  {p.badges.map((b) => <span key={b}>{b}</span>)}
                </div>
                <h3 className="vh-card-name">{productName(i, p.name)}</h3>
                <p className="vh-card-fabric">{p.fabric}</p>
                <p className="vh-card-desc">{p.desc}</p>
                <div className="vh-card-foot">
                  {p.price ? (
                    <span className="vh-card-price">{price(p.price)}</span>
                  ) : (
                    <span className="vh-card-price vh-card-price-note">Priced per weave</span>
                  )}
                  <a className="vh-enquire" href={wa(`Namaste! I am interested in the ${p.name} (${p.price ? price(p.price) : 'commission'}). Is it available?`)} target="_blank" rel="noreferrer">
                    <WaIcon /> <span>Enquire</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ————— WEAVERS ————— */}
      <section className="vh-section vh-weavers" id="weavers" data-tour="The Weavers">
        <div className="vh-wrap vh-weavers-grid">
          <div className="vh-weavers-side">
            <p className="vh-eyebrow rv">The makers</p>
            <h2 className="vh-h2 rv">The merchandise<br />never outranks<br />the maker.</h2>
            <div className="vh-weavers-img rv-img">
              <Img k="detail" src={detailImg} alt="Macro of gold zari buttis woven into indigo silk on the loom" />
              <p className="vh-caption vh-caption-dark">Zari under the lens · Banaras · 2024</p>
            </div>
          </div>
          <div className="vh-weaver-rows rv-stagger">
            {content.weavers.map((w) => (
              <article className="vh-weaver-row" key={w.name}>
                <div className="vh-weaver-id">
                  <span className="vh-weaver-mark" aria-hidden="true">{w.name.charAt(0)}</span>
                  <div>
                    <h3>{w.name}</h3>
                    <p>{w.village} · {w.craft}</p>
                  </div>
                </div>
                <p className="vh-weaver-years">{w.years}</p>
                <blockquote>“{w.quote}”</blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ThreadDivider />

      {/* ————— VISIT ————— */}
      <section className="vh-section vh-visit" id="visit" data-tour="Visit Us">
        <div className="vh-wrap vh-visit-grid">
          <div>
            <p className="vh-eyebrow rv">Visit</p>
            <h2 className="vh-h2 rv">{content.visit.title}</h2>
            <p className="vh-lede rv">{content.visit.body}</p>
            <dl className="vh-visit-facts rv">
              <div><dt>Find us</dt><dd>{content.visit.address}</dd></div>
              <div><dt>Hours</dt><dd>{content.visit.hours}</dd></div>
              <div><dt>Good to know</dt><dd>{content.visit.note}</dd></div>
            </dl>
          </div>
          <aside className="vh-visit-card rv">
            <h3>Talk to the house</h3>
            <p>Questions on drape, blouse fabric, shipping to Dubai — the loom answers fastest on WhatsApp.</p>
            <a className="vh-btn vh-btn-wa vh-btn-large" href={wa('Namaste! I would like to enquire about a handloom saree.')} target="_blank" rel="noreferrer">
              <WaIcon /> <span>Enquire on WhatsApp</span>
            </a>
            <ul className="vh-visit-contact">
              <li><span>Write</span><a href={`mailto:${email}`}>{email}</a></li>
              <li><span>Call</span><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
              <li><span>Follow</span><a href={instaUrl} target="_blank" rel="noreferrer">{instaHandle}</a></li>
            </ul>
          </aside>
        </div>
      </section>

      {/* ————— FOOTER ————— */}
      <footer className="vh-footer">
        <div className="vh-wrap">
          <p className="vh-footer-word">{brandName}</p>
          <p className="vh-footer-tag">{content.brand.tagline} · {content.brand.since}</p>
          <ul className="vh-footer-credits">
            {content.footer.credits.map((c) => <li key={c}>{c}</li>)}
          </ul>
          <p className="vh-footer-line">{content.footer.line}</p>
        </div>
      </footer>

      {/* ————— sticky mobile enquiry ————— */}
      <a className="vh-wa-float" href={wa('Namaste! I would like to enquire about a handloom saree.')} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp">
        <WaIcon />
      </a>
    </div>
  );
}
