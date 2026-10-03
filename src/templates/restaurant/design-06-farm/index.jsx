import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCustom, Img, useReducedMotion, useTplScope, ScrollFrames } from '../../_shared';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';
import { content } from './content.js';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

/* Hero frame sequence — scrubbed by scroll (Apple-style, replaces the old autoplay loop) */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const SEASON_ANGLES = [0, 90, 180, 270];
const PLATE_IMGS = [dish1Img, dish2Img, dish3Img];

function LeafMark() {
  return (
    <svg className="s6-leaf" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21c-5 0-8-3.5-8-9 0-4 2.5-7.5 8-9.5C17.5 4.5 20 8 20 12c0 5.5-3 9-8 9Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M12 21V8M12 12l-3.5-3M12 15l3.5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function SoilAndStem() {
  const { brand, contact, productName, price } = useCustom();
  const reduced = useReducedMotion();
  const { rootRef, scroller } = useTplScope();
  const dialRef = useRef(null);
  const seasonIdxRef = useRef(0);
  const [seasonIdx, setSeasonIdx] = useState(0);

  const brandName = brand || content.brand.name;
  const seasons = content.seasons.list;
  const activeSeason = seasons[seasonIdx];

  /* Fonts (once, never removed) */
  useEffect(() => {
    const id = 'tpl-font-design-06-farm';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href =
        'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Nunito+Sans:wght@400;600;700&display=swap';
      document.head.appendChild(l);
    }
  }, []);

  /* Season-dial scroll mechanic + reveals */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return; // static final state; CSS + tabs handle seasons

      /* generic honest reveals */
      gsap.utils.toArray('.s6-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* hero: headline rises like a sprout over the scrubbed frame sequence */
      gsap.fromTo(
        '.s6-hero-rise',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', stagger: 0.12, delay: 0.25 }
      );

      /* M6 — Season dial: scroll rotates the wheel 90° per season;
         the menu below obeys, crossfading between seasonal sets. */
      const setRot = gsap.quickSetter(dialRef.current, 'rotation');
      ScrollTrigger.create({
        trigger: '.s6-seasons',
        scroller: sc,
        start: 'top 62%',
        end: 'bottom 45%',
        scrub: 0.6,
        onUpdate: (self) => {
          const p = Math.min(1, Math.max(0, self.progress));
          setRot(-p * 270);
          const idx = Math.min(3, Math.max(0, Math.round(p * 3)));
          if (idx !== seasonIdxRef.current) {
            seasonIdxRef.current = idx;
            setSeasonIdx(idx);
          }
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const chooseSeason = (i) => {
    seasonIdxRef.current = i;
    setSeasonIdx(i);
  };

  const email = contact.email || content.visit.email;

  return (
    <div ref={rootRef} className={`tpl-design-06-farm${reduced ? ' s6-reduced' : ''}`}>
      {/* ---------- nav ---------- */}
      <nav className="s6-nav" aria-label="Primary">
        <a className="s6-brand" href="#hero">
          <LeafMark />
          {brandName}
        </a>
        <ul className="s6-links">
          {content.nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
        <a className="s6-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
      </nav>

      {/* ---------- hero: scroll-scrubbed harvest sequence ---------- */}
      <ScrollFrames
        frames={frames}
        alt="Hands pulling carrots from dark soil at dawn, played frame by frame as you scroll"
        pinDistance="+=170%"
      >
        <header id="hero" className="s6-hero" data-tour="The Harvest">
          <div className="s6-hero-veil" aria-hidden="true" />
          <div className="s6-hero-inner">
            <span className="s6-eyebrow s6-hero-rise">{content.hero.eyebrow}</span>
            <h1 className="s6-hero-rise">{content.hero.title}</h1>
            <p className="s6-hero-sub s6-hero-rise">{content.hero.sub}</p>
            <div className="s6-hero-actions s6-hero-rise">
              <a className="s6-cta" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="s6-ghost" href={content.hero.secondaryHref}>{content.hero.secondary}</a>
            </div>
            <p className="s6-hero-note s6-hero-rise">{content.hero.note}</p>
          </div>
        </header>
      </ScrollFrames>

      {/* ---------- our farm ---------- */}
      <section id="story" className="s6-section" data-tour="Our Farm" aria-label="Our farm">
        <div className="s6-wrap">
          <p className="s6-kicker s6-rv">{content.story.eyebrow}</p>
          <h2 className="s6-h2 s6-rv">{content.story.title}</h2>
          {content.story.body.map((p, i) => (
            <p key={i} className="s6-lede s6-rv">{p}</p>
          ))}
          <div className="s6-story-grid">
            <div className="s6-growers">
              {content.story.growers.map((g, i) => (
                <div key={i} className="s6-grower s6-rv">
                  <h3>{g.name}</h3>
                  <p className="s6-grower-role">{g.role} · {g.rows}</p>
                  <blockquote>&ldquo;{g.quote}&rdquo;</blockquote>
                </div>
              ))}
            </div>
            <div className="s6-farm-panel s6-rv">
              <Img k="detail" src={detailImg} alt="Wooden crate of just-picked greens in morning light" />
              <div className="s6-notebook">
                <h3>{content.story.panel.title}</h3>
                <ul>
                  {content.story.panel.lines.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- the seasons (M6) ---------- */}
      <section id="seasons" className="s6-section s6-seasons" data-tour="The Season Dial" aria-label="The season dial">
        <div className="s6-wrap">
          <p className="s6-kicker s6-rv">{content.seasons.eyebrow}</p>
          <h2 className="s6-h2 s6-rv">{content.seasons.title}</h2>
          <p className="s6-lede s6-rv">{content.seasons.intro}</p>

          <div className="s6-dial-zone">
            <div className="s6-dial-col">
              <div className="s6-dial-frame" role="img" aria-label={`Season dial, currently ${activeSeason.label}`}>
                <div className="s6-needle" aria-hidden="true" />
                <div
                  className="s6-dial"
                  ref={dialRef}
                  style={reduced ? { transform: `rotate(${-seasonIdx * 90}deg)` } : undefined}
                >
                  <svg viewBox="0 0 400 400" aria-hidden="true">
                    <circle cx="200" cy="200" r="192" fill="none" className="s6-dial-ring" strokeWidth="2.5" />
                    <circle cx="200" cy="200" r="150" fill="none" className="s6-dial-ring" strokeWidth="1" opacity="0.5" />
                    <circle cx="200" cy="200" r="112" className="s6-dial-core" strokeWidth="1" opacity="0.6" />
                    {Array.from({ length: 36 }).map((_, i) => {
                      const a = (i * 10 * Math.PI) / 180;
                      const big = i % 9 === 0;
                      const r1 = big ? 178 : 184;
                      const r2 = 190;
                      return (
                        <line
                          key={i}
                          x1={200 + r1 * Math.sin(a)}
                          y1={200 - r1 * Math.cos(a)}
                          x2={200 + r2 * Math.sin(a)}
                          y2={200 - r2 * Math.cos(a)}
                          className="s6-dial-tick"
                          strokeWidth={big ? 2.5 : 1.2}
                          opacity={big ? 0.9 : 0.55}
                        />
                      );
                    })}
                    {seasons.map((s, i) => (
                      <g key={s.id} transform={`rotate(${SEASON_ANGLES[i]} 200 200)`}>
                        <text
                          x="200"
                          y="58"
                          transform={`rotate(${-SEASON_ANGLES[i]} 200 58)`}
                          className={`s6-dial-season${i === seasonIdx ? ' is-active' : ''}`}
                        >
                          {s.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
              <p className="s6-dial-caption" aria-live="polite">
                {activeSeason.label} · {activeSeason.months} — {activeSeason.fieldNote}
              </p>
              <div className="s6-tabs" role="tablist" aria-label="Choose a season">
                {seasons.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === seasonIdx}
                    className={`s6-tab${i === seasonIdx ? ' is-active' : ''}`}
                    onClick={() => chooseSeason(i)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="s6-menus">
              {seasons.map((s, si) => (
                <div
                  key={s.id}
                  className={`s6-season${si === seasonIdx ? ' is-active' : ''}`}
                  aria-hidden={si !== seasonIdx}
                >
                  <div className="s6-season-head">
                    <h3>{s.label} menu</h3>
                    <span>{s.months}</span>
                  </div>
                  {s.dishes.map((d, di) => (
                    <div key={di} className="s6-dish" style={{ '--i': di }}>
                      <h4 className="s6-dish-name">{productName(si * 4 + di, d.name)}</h4>
                      <p className="s6-dish-price">{price(d.price)}</p>
                      <p className="s6-dish-desc">{d.desc}</p>
                      <p className="s6-dish-note">{d.note}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- today's harvest ---------- */}
      <section id="menu" className="s6-section" data-tour="Today's Harvest" aria-label="Today's harvest menu">
        <div className="s6-wrap">
          <p className="s6-kicker s6-rv">{content.harvest.eyebrow}</p>
          <h2 className="s6-h2 s6-rv">{content.harvest.title}</h2>
          <p className="s6-lede s6-rv">{content.harvest.intro}</p>

          <div className="s6-plates">
            {content.harvest.plates.map((p, i) => (
              <article key={i} className="s6-plate s6-rv">
                <div className="s6-plate-media">
                  <Img k={p.key} src={PLATE_IMGS[i]} alt={p.imgAlt} />
                </div>
                <div className="s6-plate-body">
                  <h3>{productName(16 + i, p.name)}</h3>
                  <p className="s6-plate-price">{price(p.price)}</p>
                  <p>{p.desc}</p>
                  <p className="s6-plate-note">{p.note}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="s6-board s6-rv">
            <div>
              <h3>Also on the board</h3>
              <ul>
                {content.harvest.board.map((b, i) => (
                  <li key={i}>
                    <span>{b.item}</span>
                    <span>{price(b.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Good to know</h3>
              <p style={{ margin: 0 }}>{content.harvest.footnote}</p>
            </div>
            <p className="s6-board-foot">
              The chalkboard is rewritten every morning at seven. What the farm didn&rsquo;t grow, the kitchen doesn&rsquo;t serve.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- supper club ---------- */}
      <section id="reserve" className="s6-section s6-club" data-tour="Supper Club" aria-label="Supper club">
        <div className="s6-wrap">
          <p className="s6-kicker s6-rv">{content.club.eyebrow}</p>
          <h2 className="s6-h2 s6-rv">{content.club.title}</h2>
          {content.club.body.map((p, i) => (
            <p key={i} className="s6-lede s6-rv">{p}</p>
          ))}
          <div className="s6-club-grid">
            <div className="s6-dates">
              {content.club.dates.map((d, i) => (
                <div key={i} className="s6-date s6-rv">
                  <span className="s6-date-day">{d.day}</span>
                  <span className="s6-date-date">{d.date}</span>
                  <p className="s6-date-note">{d.note}</p>
                </div>
              ))}
            </div>
            <div className="s6-rv">
              <div className="s6-club-price">
                <strong>{price(content.club.price)}</strong>
                <span>{content.club.priceNote}</span>
              </div>
              <a className="s6-cta" href={`mailto:${email}?subject=Supper%20club%20booking`}>{content.club.cta}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- visit ---------- */}
      <section id="visit" className="s6-section" data-tour="Find Us" aria-label="Visit us">
        <div className="s6-wrap">
          <p className="s6-kicker s6-rv">{content.visit.eyebrow}</p>
          <h2 className="s6-h2 s6-rv">{content.visit.title}</h2>
          <div className="s6-visit-grid">
            <div className="s6-rv">
              <address>{content.visit.address}</address>
              <div className="s6-contact">
                <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              <p className="s6-visit-note">{content.visit.note}</p>
            </div>
            <ul className="s6-hours s6-rv">
              {content.visit.hours.map((h, i) => (
                <li key={i}>
                  <span>{h.days}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="s6-footer">
        <div className="s6-footer-inner">
          <a className="s6-brand" href="#hero">
            <LeafMark />
            {brandName}
          </a>
          <p>{content.footer.line}</p>
          <p>{content.footer.credit}</p>
        </div>
      </footer>
    </div>
  );
}
