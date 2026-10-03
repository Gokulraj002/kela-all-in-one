import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dish1Img from './assets/dish-1.webp';
import dish2Img from './assets/dish-2.webp';
import dish3Img from './assets/dish-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven frame sequence for the hero glaze pour (72 frames). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-08-patisserie';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@300;400;500;600;700&display=swap';

const IMG_BY_KEY = {
  hero: heroImg,
  'product-0': dish1Img,
  'product-1': dish2Img,
  'product-2': dish3Img,
  detail: detailImg,
};

/* Server-safe word-mask headline */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`bb-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </span>
  );
}

function Eyebrow({ children }) {
  return <p className="bb-eyebrow bb-rv">{children}</p>;
}

function Nav() {
  const { brand } = useCustom();
  return (
    <header className="bb-nav">
      <a className="bb-wordmark" href="#hero" aria-label={`${brand || content.brand.name} — home`}>
        {brand || content.brand.name}
      </a>
      <nav className="bb-nav-links" aria-label="Primary">
        {content.nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <a className="bb-btn bb-btn-small" href={content.hero.ctaHref}>
        {content.hero.cta}
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="bb-hero" id="hero" data-tour="The Mirror Glaze">
      <ScrollFrames
        frames={frames}
        alt="Mirror glaze pouring over a pistachio entremet, settling into a perfect reflection"
        pinDistance="+=170%"
        className="bb-hero-frames"
      >
        <div className="bb-hero-scrim" aria-hidden="true" />
        <div className="bb-hero-copy">
          <p className="bb-eyebrow bb-hero-eyebrow">{content.hero.eyebrow}</p>
          <h1 className="bb-hero-title">
            <Words text={content.hero.title} className="bb-hero-words" />
          </h1>
          <p className="bb-hero-sub">{content.hero.sub}</p>
          <div className="bb-hero-ctas">
            <a className="bb-btn" href={content.hero.ctaHref}>
              {content.hero.cta}
            </a>
            <a className="bb-btn bb-btn-ghost" href={content.hero.secondaryCtaHref}>
              {content.hero.secondaryCta}
            </a>
          </div>
        </div>
        <p className="bb-hero-est">{content.brand.est}</p>
      </ScrollFrames>
    </section>
  );
}

function Craft() {
  const { img } = useCustom();
  return (
    <section className="bb-section bb-craft" id="craft" data-tour="The Craft">
      <div className="bb-craft-grid">
        <div className="bb-craft-copy">
          <Eyebrow>{content.craft.eyebrow}</Eyebrow>
          <h2 className="bb-title bb-rv">{content.craft.title}</h2>
          {content.craft.body.map((p, i) => (
            <p className="bb-body bb-rv" key={i}>
              {p}
            </p>
          ))}
          <dl className="bb-stats">
            {content.craft.stats.map((s) => (
              <div className="bb-stat bb-rv" key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="bb-craft-visual">
          <Img
            k="detail"
            src={img('detail', detailImg)}
            alt="Hands folding laminated pastry dough, thin golden butter layers visible between the sheets"
            className="bb-craft-img"
          />
          <figcaption>Fold three of five — the lamination bench, 6:10 am</figcaption>
        </figure>
      </div>
    </section>
  );
}

function CaseItem({ item, index }) {
  const { productName, price, img } = useCustom();
  return (
    <article className="bb-item">
      <div className="bb-item-visual">
        <Img
          k={item.image}
          src={img(item.image, IMG_BY_KEY[item.image])}
          alt={`${productName(index, item.name)} — patisserie photograph`}
        />
      </div>
      <div className="bb-item-copy">
        <div className="bb-item-head">
          <h4>{productName(index, item.name)}</h4>
          <span className="bb-item-price">{price(item.price)}</span>
        </div>
        <p>{item.desc}</p>
        <p className="bb-item-note">{item.note}</p>
      </div>
    </article>
  );
}

function GlassCase() {
  return (
    <section className="bb-section bb-case" id="case" data-tour="The Glass Case">
      <div className="bb-section-head">
        <Eyebrow>The case</Eyebrow>
        <h2 className="bb-title bb-rv">Three shelves, filled by the hour</h2>
        <p className="bb-body bb-rv bb-lede">
          Our glass case is filled tier by tier as the morning unfolds. Scroll on —
          the shelf nearest you blooms forward with its bake-time note.
        </p>
      </div>
      <div className="bb-case-stage">
        {content.tiers.map((tier, ti) => (
          <div className="bb-tier" key={tier.id} data-tier={tier.id}>
            <div className="bb-tier-glass">
              <span className="bb-flag">
                {tier.flag}
              </span>
              <div className="bb-tier-head">
                <p className="bb-tier-kicker">Tier {['One', 'Two', 'Three'][ti]}</p>
                <h3>{tier.name}</h3>
                <p className="bb-tier-caption">{tier.caption}</p>
              </div>
              <div className="bb-tier-items">
                {tier.items.map((item, ii) => (
                  <CaseItem key={item.name} item={item} index={ti * 2 + ii} />
                ))}
              </div>
              <div className="bb-shelf" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      <p className="bb-case-foot bb-rv">When a tray is gone, it is gone — pre-ordering holds yours.</p>
    </section>
  );
}

function Schedule() {
  return (
    <section className="bb-section bb-schedule" id="schedule" data-tour="Bake Schedule">
      <div className="bb-section-head">
        <Eyebrow>{content.schedule.eyebrow}</Eyebrow>
        <h2 className="bb-title bb-rv">{content.schedule.title}</h2>
        <p className="bb-body bb-rv bb-lede">{content.schedule.note}</p>
      </div>
      <ol className="bb-sched-list">
        {content.schedule.items.map((s) => (
          <li className="bb-sched-item" key={s.time}>
            <span className="bb-sched-dot" aria-hidden="true" />
            <span className="bb-sched-time">{s.time}</span>
            <div className="bb-sched-copy">
              <h4>{s.name}</h4>
              <p>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Cakes() {
  const { contact, brand } = useCustom();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;
  return (
    <section className="bb-section bb-cakes" id="cakes" data-tour="Custom Cakes">
      <div className="bb-cakes-grid">
        <div className="bb-cakes-copy">
          <Eyebrow>{content.cakes.eyebrow}</Eyebrow>
          <h2 className="bb-title bb-rv">{content.cakes.title}</h2>
          {content.cakes.body.map((p, i) => (
            <p className="bb-body bb-rv" key={i}>
              {p}
            </p>
          ))}
          <a
            className="bb-btn bb-rv"
            href={`mailto:${email}?subject=${encodeURIComponent(`Custom cake enquiry — ${name}`)}`}
          >
            {content.cakes.cta}
          </a>
        </div>
        <aside className="bb-cakes-card bb-rv" aria-label="Commission notes">
          <h3>Good to know</h3>
          <ul>
            {content.cakes.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="bb-cakes-fine">
            A few commissions each week — the dawn shift is small, and so is our oven.
          </p>
        </aside>
      </div>
    </section>
  );
}

function Visit() {
  const { contact, brand } = useCustom();
  const name = brand || content.brand.name;
  const email = contact.email || content.visit.email;
  return (
    <section className="bb-section bb-visit" id="visit" data-tour="Visit">
      <div className="bb-visit-grid">
        <div>
          <Eyebrow>{content.visit.eyebrow}</Eyebrow>
          <h2 className="bb-title bb-rv">{content.visit.title}</h2>
          <address className="bb-address bb-rv">
            {content.visit.address}
            <br />
            <a href={`tel:${content.visit.phone.replace(/\s/g, '')}`}>{content.visit.phone}</a>
            <br />
            <a href={`mailto:${email}`}>{email}</a>
          </address>
          <a
            className="bb-btn bb-rv"
            href={`mailto:${email}?subject=${encodeURIComponent(`Morning pre-order — ${name}`)}`}
          >
            Pre-order for morning
          </a>
        </div>
        <div className="bb-hours bb-rv">
          <h3>Hours</h3>
          <ul>
            {content.visit.hours.map((h) => (
              <li key={h.days}>
                <span>{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="bb-visit-note">{content.visit.note}</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { brand, contact } = useCustom();
  const name = brand || content.brand.name;
  const insta = contact.instagram;
  return (
    <footer className="bb-footer">
      <p className="bb-footer-wordmark">{name}</p>
      <p className="bb-footer-line">{content.footer.line}</p>
      <p className="bb-footer-credit">{content.footer.credit}</p>
      <nav className="bb-footer-nav" aria-label="Footer">
        {content.nav.slice(0, 4).map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
        {insta && (
          <a href={insta} target="_blank" rel="noreferrer">
            Instagram
          </a>
        )}
      </nav>
    </footer>
  );
}

export default function Design08Patisserie() {
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();

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
    let mmRef = null;
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return; // static final state; CSS keeps everything visible

      const mm = gsap.matchMedia();

      /* Hero entrance: the frame sequence fades in like morning light, Marcellus rises gently. */
      gsap.fromTo(
        '.bb-hero .sf-stage',
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'sine.out' }
      );
      gsap.fromTo(
        '.bb-hero-eyebrow',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.bb-hero-words .wi',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.15, delay: 0.45, stagger: 0.06, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.bb-hero-sub, .bb-hero-ctas, .bb-hero-est',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.9, stagger: 0.12, ease: 'power3.out' }
      );

      /* House grammar: soft reveals, a plate set down. */
      gsap.utils.toArray('.bb-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Craft image: a slow cloche-lift wipe. */
      gsap.fromTo(
        '.bb-craft-visual',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.bb-craft-visual', scroller: sc, start: 'top 80%', once: true },
        }
      );

      /* M8 — The glass case: three tiers with Z-depth bloom. Desktop tilts
         the case in perspective (rotationX 8 -> 0, scrubbed); the tier nearest
         viewport-center blooms forward (z 0 -> 60, scale 1.08) while the
         others recede, and its bake-time flag pops. Mobile: flat shelves,
         bloom only. */
      const tiers = gsap.utils.toArray('.bb-tier');
      const bloomTimeline = (tier, useZ) => {
        const flag = tier.querySelector('.bb-flag');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: tier,
            scroller: sc,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: 0.8,
          },
        });
        tl.fromTo(
          tier,
          { z: 0, scale: 1, autoAlpha: 0.55 },
          { z: useZ ? 60 : 0, scale: useZ ? 1.08 : 1.06, autoAlpha: 1, duration: 1, ease: 'sine.inOut' },
          0
        );
        if (flag) {
          tl.fromTo(
            flag,
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2)' },
            0.55
          );
        }
        tl.to(tier, { z: 0, scale: 1, autoAlpha: 0.55, duration: 1, ease: 'sine.inOut' }, 1);
        if (flag) {
          tl.to(flag, { scale: 0, autoAlpha: 0, duration: 0.35 }, 1.55);
        }
        return tl;
      };

      mm.add('(min-width: 768px)', () => {
        const stage = rootRef.current && rootRef.current.querySelector('.bb-case-stage');
        if (stage) {
          gsap.set(stage, { transformPerspective: 1400 });
          gsap.fromTo(
            stage,
            { rotationX: 8 },
            {
              rotationX: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                scroller: sc,
                start: 'top 85%',
                end: 'bottom 55%',
                scrub: 0.6,
              },
            }
          );
        }
        tiers.forEach((tier) => {
          gsap.set(tier, { transformPerspective: 1200 });
          bloomTimeline(tier, true);
        });
      });

      mm.add('(max-width: 767px)', () => {
        tiers.forEach((tier) => bloomTimeline(tier, false));
      });

      /* Bake schedule: items check in with a soft pop. */
      gsap.utils.toArray('.bb-sched-item').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96, y: 14 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: 'back.out(1.5)',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 90%', once: true },
          }
        );
      });
      mmRef = mm;
    }, rootRef);
    return () => {
      if (mmRef) mmRef.revert();
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-08-patisserie">
      <Nav />
      <main>
        <Hero />
        <Craft />
        <GlassCase />
        <Schedule />
        <Cakes />
        <Visit />
      </main>
      <Footer />
    </div>
  );
}
