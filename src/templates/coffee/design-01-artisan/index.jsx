import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import menu1Img from './assets/menu-1.webp';
import menu2Img from './assets/menu-2.webp';
import menu3Img from './assets/menu-3.webp';
import detailImg from './assets/detail.webp';

/* ScrollFrames scrub sequence : 72 WebP frames,
   extracted from the signature espresso-extraction clip. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-artisan';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,SOFT,WONK,wght@0,9..144,0..100,0..1,300..700;1,9..144,0..100,0..1,300..700&family=Manrope:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`eo-wm ${className}`} aria-label={text}>
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

function MenuBoard() {
  const { productName, price } = useCustom();
  const [tab, setTab] = useState(0);
  const panelRef = useRef(null);
  const reduced = useReducedMotion();
  const active = content.menuTabs[tab];

  const select = (i) => {
    if (i === tab) return;
    setTab(i);
    if (!reduced && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
  };

  return (
    <div className="eo-board">
      <div className="eo-tabs" role="tablist" aria-label="Menu categories">
        {content.menuTabs.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === i}
            className={`eo-tab${tab === i ? ' is-active' : ''}`}
            onClick={() => select(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div ref={panelRef} className="eo-panel" role="tabpanel">
        {active.items.map((item, i) => (
          <div className="eo-item" key={item.name}>
            <div className="eo-item-head">
              <h4 className="eo-item-name">{productName(tab * 10 + i, item.name)}</h4>
              <span className="eo-item-dots" aria-hidden="true" />
              <span className="eo-item-price">{price(item.price)}</span>
            </div>
            <p className="eo-item-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* House signatures: the products the house is known for, drawn from the live
   menu board data. Rendered as a pinned horizontal rail (desktop + motion),
   a static grid when reduced-motion, and native swipe on mobile. */
const railPicks = [
  { tab: 0, item: 0, image: menu1Img, imgKey: 'product-0', alt: 'Espresso extracting from a portafilter, rich crema forming' },
  { tab: 0, item: 2, image: menu2Img, imgKey: 'product-1', alt: 'Steamed milk poured into a ceramic cup, latte art mid-swirl' },
  { tab: 3, item: 0, image: menu3Img, imgKey: 'product-2', alt: 'Golden croissants in the pastry case, warm bakery light' },
  { tab: 1, item: 0, image: detailImg, imgKey: 'detail', alt: "Barista's hands tamping ground coffee in a portafilter, shallow depth of field" },
];

function RailCard({ pick, index }) {
  const { productName, price, img } = useCustom();
  const tab = content.menuTabs[pick.tab];
  const item = tab.items[pick.item];
  return (
    <article className={`eo-rail-card${index % 2 ? ' is-alt' : ''}`}>
      <div className="eo-rail-visual">
        <Img k={pick.imgKey} src={img(pick.imgKey, pick.image)} alt={pick.alt} />
      </div>
      <p className="eo-rail-num">{String(index + 1).padStart(2, '0')}</p>
      <p className="eo-eyebrow">{tab.label}</p>
      <h3 className="eo-rail-name">{productName(pick.tab * 10 + pick.item, item.name)}</h3>
      <p className="eo-rail-desc">{item.desc}</p>
      <p className="eo-rail-price">{price(item.price)}</p>
    </article>
  );
}

function SignatureRail({ reduced }) {
  if (reduced) {
    return (
      <div className="eo-rail-static" aria-label="House signatures">
        {railPicks.map((p, i) => (
          <RailCard key={p.imgKey} pick={p} index={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="eo-rail-pin">
      <div className="eo-rail-viewport">
        <div className="eo-rail">
          <div className="eo-rail-intro">
            <p className="eo-eyebrow">House signatures</p>
            <h2 className="eo-h2">Four things we're known for.</h2>
            <p className="eo-body">The short list regulars order without looking at the board.</p>
            <p className="eo-rail-hint">
              <span className="eo-hint-scroll">Scroll — the rail moves with you</span>
              <span className="eo-hint-swipe">Swipe — the rail moves with you</span>
            </p>
          </div>
          {railPicks.map((p, i) => (
            <RailCard key={p.imgKey} pick={p} index={i} />
          ))}
          <a className="eo-rail-end" href="#visit">
            <span className="eo-eyebrow">The rest of the board</span>
            <span className="eo-rail-end-title">Chalked fresh every morning.</span>
            <span className="eo-cta">Plan your visit</span>
          </a>
        </div>
      </div>
      <div className="eo-rail-progress" aria-hidden="true">
        <span className="eo-rail-progress-fill" />
      </div>
    </div>
  );
}

export default function Design01Artisan() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;

  const tod = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }, []);
  const todLabel = tod === 'morning' ? 'morning' : tod === 'afternoon' ? 'afternoon' : 'evening';

  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const l = document.createElement('link');
      l.id = FONT_ID;
      l.rel = 'stylesheet';
      l.href = FONT_HREF;
      document.head.appendChild(l);
    }
  }, []);

  /* ScrollFrames builds its hero pin in a child useEffect — after the layout
     effect below created the triggers further down the page (the rail pin
     included). Parent effects run after child effects, so re-sort and
     refresh here: every start/end then includes the hero's pin spacing. */
  useEffect(() => {
    /* …and once more two frames later: ScrollFrames re-creates its pin when
       its stage height settles (a second commit), which appends it after
       the triggers below it. */
    const run = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    run();
    let r2 = 0;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(run); });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: masked word-rise headline, then copy blocks and the
         scrub hint. The scrub hero pins via ScrollFrames — no frame wipe or
         parallax drift on the hero itself. Total <= 2.2s. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
          '.eo-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08 },
          0.15
        )
        .fromTo(
          '.eo-hero-sub, .eo-hero-cta',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.7
        )
        .fromTo(
          '.eo-hero-note',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1 },
          1.0
        )
        .fromTo(
          '.eo-scrub-hint',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.4
        );

      /* Steam-rise reveals: long, generous stagger; left leads, right trails. */
      gsap.utils.toArray('.eo-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.eo-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Pour-wipe on gallery frames. */
      gsap.utils.toArray('.eo-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(12% 8% 88% 8%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });
      /* Hairline rules draw between sections — the zine's page dividers. */
      gsap.utils.toArray('.eo-rule').forEach((rule) => {
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

      /* Mobile bottom quick-bar slides up once, after the hero. */
      gsap.fromTo(
        '.eo-quickbar',
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.eo-hero', scroller: sc, start: 'bottom 65%', once: true },
        }
      );

      /* Signature rail: pin the section, scrub the rail's x-translation, and
         drift each card's inner visual at an alternate speed/direction of the
         rail via containerAnimation. Desktop only — mobile gets native swipe,
         reduced-motion gets a static grid (rendered above). */
      const railPin = rootRef.current && rootRef.current.querySelector('.eo-rail-pin');
      if (railPin) {
        /* gsap.matchMedia (reverted with this context) so a resize across
           768px kills/restores the pin instead of leaving it stuck. */
        const mmRail = gsap.matchMedia();
        mmRail.add('(min-width: 768px)', () => {
        const rail = railPin.querySelector('.eo-rail');
        const viewport = railPin.querySelector('.eo-rail-viewport');
        const fill = railPin.querySelector('.eo-rail-progress-fill');
        const dist = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
        const railTween = gsap.to(rail, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: railPin,
            scroller: sc,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            /* declaring a priority makes every later refresh re-sort triggers by
               page position, so a pin created late (ScrollFrames) can't break order */
            refreshPriority: 0,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (fill) fill.style.transform = `scaleX(${self.progress.toFixed(4)})`;
            },
          },
        });
        gsap.utils.toArray('.eo-rail-card', railPin).forEach((card, i) => {
          const visual = card.querySelector('.eo-rail-visual .a-img');
          if (!visual) return;
          /* Alternate cards drift at 0.8x / 1.2x of the rail's speed. */
          const dir = i % 2 === 0 ? 1 : -1;
          const amt = i % 2 === 0 ? 26 : 40;
          gsap.fromTo(
            visual,
            { x: dir * amt },
            {
              x: dir * -amt,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                scroller: sc,
                containerAnimation: railTween,
                start: 'left right',
                end: 'right left',
                scrub: 0.6,
              },
            }
          );
        });
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.visit.address)}`;

  return (
    <div ref={rootRef} className="tpl-design-01-artisan">
      <header className="eo-nav">
        <a className="eo-wordmark" href="#hero">{name}</a>
        <nav className="eo-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="eo-cta" href="#visit">Visit</a>
      </header>

      <main>
        {/* HERO — pinned scroll-driven frame scrub (ScrollFrames). The signature
            espresso-extraction clip plays frame-by-frame as the visitor
            scrolls; the hero copy overlays the sequence, bottom-left. */}
        <section id="hero" className="eo-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Espresso extraction beginning — first dark drops beading under the portafilter, settling into an even stream"
            pinDistance="+=170%"
          >
            <div className="eo-scrim" aria-hidden="true" />
            <div className="eo-hero-copy">
              <p className="eo-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="eo-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="eo-hero-sub">{content.hero.sub}</p>
              <p className="eo-hero-note">
                <span className="eo-note-label">Today, this {todLabel}</span>
                <span className="eo-note-text">{content.hero.notes[tod]}</span>
              </p>
              <a className="eo-cta eo-hero-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
            </div>
            <p className="eo-scrub-hint" aria-hidden="true">Scroll — the pour plays with you</p>
          </ScrollFrames>
        </section>

        {/* TODAY'S BOARD + HOUSE SIGNATURES RAIL */}
        <section id="menu" className="eo-board-sec" data-tour="Today's Board">
          <div className="eo-wrap">
            <p className="eo-eyebrow eo-rv">Today's board</p>
            <h2 className="eo-h2 eo-rv">Poured, pressed <em>&amp;</em> baked</h2>
            <span className="eo-rule" aria-hidden="true" />
            <div className="eo-rv"><MenuBoard /></div>
          </div>
          <SignatureRail reduced={reduced} />
        </section>

        {/* THE HOUSE / STORY */}
        <section id="story" className="eo-story" data-tour="The House">
          <div className="eo-wrap eo-story-grid">
            <div className="eo-story-text">
              <p className="eo-eyebrow eo-rv">{content.story.eyebrow}</p>
              <h2 className="eo-h2 eo-rv">{content.story.title}</h2>
              <span className="eo-rule" aria-hidden="true" />
              {content.story.body.map((p, i) => (
                <p className="eo-body eo-rv" key={i}>{p}</p>
              ))}
              <blockquote className="eo-quote eo-rv">
                <p>{content.story.barista.note}</p>
                <cite>{content.story.barista.name} — {content.story.barista.role}</cite>
              </blockquote>
            </div>
            <div className="eo-story-img eo-wipe eo-frame">
              <Img k="detail" src={img('detail', detailImg)} alt="Barista's hands tamping ground coffee in a portafilter, shallow depth of field" />
            </div>
          </div>
        </section>

        {/* CRAFT — roast timeline + methods + team */}
        <section id="craft" className="eo-craft" data-tour="Roast & Craft">
          <div className="eo-wrap">
            <p className="eo-eyebrow eo-rv">{content.craft.eyebrow}</p>
            <h2 className="eo-h2 eo-rv">{content.craft.title}</h2>
            <span className="eo-rule" aria-hidden="true" />
            <ol className="eo-timeline eo-stagger">
              {content.craft.stages.map((s) => (
                <li className="eo-stage" key={s.time}>
                  <span className="eo-stage-time">{s.time}</span>
                  <h3 className="eo-stage-title">{s.title}</h3>
                  <p className="eo-stage-text">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="eo-craft-cols">
              <div className="eo-rv">
                <h3 className="eo-h3">Brewed four ways</h3>
                <ul className="eo-methods">
                  {content.craft.methods.map((m) => (
                    <li key={m.name}><strong>{m.name}</strong><span>{m.text}</span></li>
                  ))}
                </ul>
              </div>
              <div className="eo-rv">
                <h3 className="eo-h3">The bar team</h3>
                <ul className="eo-team">
                  {content.craft.team.map((t) => (
                    <li key={t.name}><strong>{t.name}</strong><span>{t.role}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="eo-gallery" data-tour="The Room">
          <div className="eo-wrap">
            <p className="eo-eyebrow eo-rv">{content.gallery.eyebrow}</p>
            <h2 className="eo-h2 eo-rv">{content.gallery.title}</h2>
            <span className="eo-rule" aria-hidden="true" />
            <div className="eo-gallery-grid">
              <figure className="eo-wipe eo-frame eo-rv">
                <Img k="product-2" src={img('product-2', menu3Img)} alt="Golden croissants in the pastry case, warm bakery light" />
                <figcaption>{content.gallery.captions[0]}</figcaption>
              </figure>
              <figure className="eo-wipe eo-frame eo-rv">
                <Img k="detail" src={img('detail', detailImg)} alt="Barista's hands at work on the bar, tamping fresh grounds" />
                <figcaption>{content.gallery.captions[1]}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* VISIT */}
        <section id="visit" className="eo-visit" data-tour="Visit">
          <div className="eo-wrap eo-visit-grid">
            <div>
              <p className="eo-eyebrow eo-rv">{content.visit.eyebrow}</p>
              <h2 className="eo-h2 eo-rv">{content.visit.title}</h2>
              <span className="eo-rule" aria-hidden="true" />
              <address className="eo-address eo-rv">
                {content.visit.address}<br />
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a><br />
                <a href={`mailto:${email}`}>{email}</a>
              </address>
              <p className="eo-body eo-rv">{content.visit.directions}</p>
              <a className="eo-cta eo-rv" href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
            </div>
            <div className="eo-hours eo-rv">
              <h3 className="eo-h3">Hours</h3>
              <ul>
                {content.visit.hours.map((h) => (
                  <li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>
                ))}
              </ul>
              <p className="eo-holiday">{content.visit.holidayNote}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="eo-footer">
        <p className="eo-footer-line">{content.footer.line}</p>
        <p className="eo-colophon">{content.footer.colophon}</p>
      </footer>

      <nav className="eo-quickbar" aria-label="Quick actions">
        <a href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
        <a href="#menu">Menu</a>
      </nav>
    </div>
  );
}
