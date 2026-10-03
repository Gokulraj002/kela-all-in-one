import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import dest1Img from './assets/dest-1.webp';
import dest2Img from './assets/dest-2.webp';
import dest3Img from './assets/dest-3.webp';
import detailImg from './assets/detail.webp';

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-01-luxury';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap';

/* Scroll-driven hero sequence — Apple-style frame scrub (replaces the old signature loop clip).
   Frames are eager-loaded URLs so frame 0 paints immediately (no blank flash). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`mg-wm ${className}`} aria-label={text}>
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

/* The 4 waypoint cards. Same DOM drives the desktop pinned route mechanic
   and the mobile / reduced-motion stacked layout (pure CSS switch). */
const cardVisuals = [
  { key: 'product-0', src: dest1Img, alt: 'Amalfi cliffside villa infinity pool at dusk, empty, glowing windows' },
  { key: 'product-1', src: dest2Img, alt: 'Private Kyoto ryokan garden, maple leaves and stone lantern in morning mist' },
  { key: 'product-2', src: dest3Img, alt: 'Swiss alpine chalet terrace at blue hour, snow peaks behind' },
  { key: 'hero', src: heroImg, alt: 'Private yacht anchored off limestone cliffs at golden hour' },
];

function WaypointCard({ dest, index }) {
  const { productName, price, img } = useCustom();
  const visual = cardVisuals[index];
  return (
    <div className="mg-wp-slot" data-index={index}>
      <span className="mg-wp-dot" aria-hidden="true">
        <span className="mg-wp-num">{String(index + 1).padStart(2, '0')}</span>
      </span>
      <span className="mg-wp-ring" aria-hidden="true" />
      <div className="mg-card-pos">
        <article className="mg-card">
          <div className="mg-card-img">
            <Img k={visual.key} src={img(visual.key, visual.src)} alt={visual.alt} />
          </div>
          <div className="mg-card-body">
            <p className="mg-card-top">
              <span className="mg-card-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="mg-card-tag">{dest.tag}</span>
            </p>
            <h3 className="mg-card-name">{productName(index, dest.name)}</h3>
            <p className="mg-card-dur">{dest.duration}</p>
            <p className="mg-card-blurb">{dest.blurb}</p>
            <div className="mg-card-foot">
              <span className="mg-card-price">{price(dest.price)}</span>
              <a className="mg-card-enquire" href="#contact">Enquire</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Design01Luxury() {
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

      /* ——— Hero entrance: masked word-rise, then sub / CTAs / note. ≤2.2s. ——— */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.mg-hero-title .wi',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 },
        0.2
      )
        .fromTo(
          '.mg-hero-eyebrow',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          0
        )
        .fromTo(
          '.mg-hero-sub, .mg-hero-ctas',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.8
        )
        .fromTo(
          '.mg-hero-note',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.25
        )
        .fromTo(
          '.mg-hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.5
        );

      /* Nav gains its backdrop after the hero. */
      ScrollTrigger.create({
        trigger: '.mg-hero',
        scroller: sc,
        start: 'bottom 78%',
        onEnter: () => rootRef.current && rootRef.current.querySelector('.mg-nav').classList.add('is-scrolled'),
        onLeaveBack: () => rootRef.current && rootRef.current.querySelector('.mg-nav').classList.remove('is-scrolled'),
      });

      /* Champagne reveals: long, quiet stagger. */
      gsap.utils.toArray('.mg-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.mg-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.16,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 86%', once: true },
          }
        );
      });

      /* Clip-wipe frames on editorial images. */
      gsap.utils.toArray('.mg-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 90% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 84%', once: true },
          }
        );
      });

      /* Hairline rules draw themselves. */
      gsap.utils.toArray('.mg-rule').forEach((rule) => {
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

      /* ——— SIGNATURE: The Grand Itinerary ———
         Pinned on desktop (≥768px, resize-safe via matchMedia). An SVG route
         line draws across the viewport on scroll-scrub while the four
         destination cards dock sequentially at waypoints along the path —
         each scales 0.8→1 and fades in as the drawn line reaches it. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const stage = rootRef.current && rootRef.current.querySelector('.mg-itin-stage');
        const draw = stage && stage.querySelector('.mg-route-draw');
        if (!stage || !draw) return;
        const glow = stage.querySelector('.mg-route-glow');
        const lines = glow ? [draw, glow] : [draw];
        const L = draw.getTotalLength();
        const fracs = [0.07, 0.36, 0.64, 0.9];
        gsap.set(lines, { strokeDasharray: L, strokeDashoffset: L });

        /* Place each waypoint slot at its fraction along the true path
           length (percentages of the 5:7 map box = viewBox units). Cards dock
           on the outer side of their waypoint, away from the route. */
        const slots = gsap.utils.toArray('.mg-wp-slot', stage);
        slots.forEach((slot, i) => {
          const pt = draw.getPointAtLength(L * fracs[i]);
          gsap.set(slot, { left: `${(pt.x / 1000) * 100}%`, top: `${(pt.y / 1400) * 100}%` });
          slot.dataset.side = pt.x > 500 ? 'right' : 'left';
        });

        const legLabel = stage.querySelector('.mg-leg-label');
        const legFill = stage.querySelector('.mg-leg-fill');
        const leg = stage.querySelector('.mg-leg');

        /* Keep every docked card fully inside the pinned stage (clear of the
           leg indicator). Re-measured on every ScrollTrigger refresh, so
           resizes and late webfonts never leave a card hanging off-screen. */
        const nav = rootRef.current && rootRef.current.querySelector('.mg-nav');
        const fitCards = () => {
          const sr = stage.getBoundingClientRect();
          const pad = 24;
          /* the sticky nav overlays the top of the pinned stage */
          const top = sr.top + Math.max(pad, (nav ? nav.offsetHeight : 0) + 16);
          const bottom = sr.bottom - (leg ? leg.offsetHeight + 48 : 72);
          slots.forEach((slot) => {
            const pos = slot.querySelector('.mg-card-pos');
            if (!pos) return;
            gsap.set(pos, { x: 0, y: 0 });
            const r = pos.getBoundingClientRect();
            let dx = 0;
            let dy = 0;
            if (r.left < sr.left + pad) dx = sr.left + pad - r.left;
            else if (r.right > sr.right - pad) dx = sr.right - pad - r.right;
            if (r.top < top) dy = top - r.top;
            else if (r.bottom > bottom) dy = Math.max(top - r.top, bottom - r.bottom);
            gsap.set(pos, { x: Math.round(dx), y: Math.round(dy) });
          });
        };
        const names = content.destinations.map((d) => d.name.toUpperCase());

        let itin = null;
        itin = gsap.timeline({
          scrollTrigger: {
            trigger: '.mg-itin-pin',
            scroller: sc,
            start: 'top top',
            end: '+=280%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              fitCards();
              sync();
            },
          },
        });
        fitCards();

        /* The route draws itself over the whole pin; the leg bar fills with it.
           Both live on the scrubbed timeline, so they glide with the line
           instead of jumping to the raw scroll position. */
        let lastLeg = -1;
        const cards = slots.map((slot) => slot.querySelector('.mg-card'));
        /* Cards that are not docked are invisible (autoAlpha), so they also
           leave the accessibility tree and the tab order until they return. */
        const syncHidden = () => {
          slots.forEach((slot, i) => {
            const hidden = !cards[i] || gsap.getProperty(cards[i], 'opacity') < 0.02;
            if (hidden) slot.setAttribute('aria-hidden', 'true');
            else slot.removeAttribute('aria-hidden');
          });
        };
        itin.to(lines, { strokeDashoffset: 0, duration: 4, ease: 'none' }, 0);
        if (legFill) itin.fromTo(legFill, { scaleX: 0 }, { scaleX: 1, duration: 4, ease: 'none' }, 0);
        /* Leg label + hidden states follow the timeline's rendered time. A
           refresh re-renders the timeline with events suppressed, so sync is
           also run after every refresh. */
        function sync() {
          if (!itin) return;
          const p = Math.min(1, itin.time() / 4);
          let idx = 0;
          fracs.forEach((f, i) => {
            if (p >= f) idx = i;
          });
          if (idx !== lastLeg && legLabel) {
            lastLeg = idx;
            legLabel.textContent = `LEG ${String(idx + 1).padStart(2, '0')} / 04 — ${names[idx]}`;
          }
          syncHidden();
        }
        itin.eventCallback('onUpdate', sync);
        ScrollTrigger.addEventListener('refresh', sync);

        /* Each card docks as the line reaches its waypoint. */
        slots.forEach((slot, i) => {
          const card = slot.querySelector('.mg-card');
          const ring = slot.querySelector('.mg-wp-ring');
          const dot = slot.querySelector('.mg-wp-dot');
          const t = Math.max(0.04, fracs[i] * 4 - 0.12);
          itin.fromTo(
            card,
            { autoAlpha: 0, scale: 0.8, y: 28 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: 'power2.out' },
            t
          );
          itin.fromTo(
            ring,
            { opacity: 0.85, scale: 0.35 },
            { opacity: 0, scale: 2.6, duration: 1, ease: 'power2.out' },
            t
          );
          itin.fromTo(dot, { scale: 0.5 }, { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, t);
          /* Hand-off: as the line leaves for the next waypoint, this card
             settles back into its dot, so the stage never piles up. */
          if (i < slots.length - 1) {
            const next = Math.max(0.04, fracs[i + 1] * 4 - 0.12);
            itin.to(card, { autoAlpha: 0, scale: 0.9, y: -18, duration: 0.4, ease: 'power2.in' }, next - 0.3);
          }
        });
        sync();
        return () => {
          ScrollTrigger.removeEventListener('refresh', sync);
          slots.forEach((slot) => slot.removeAttribute('aria-hidden'));
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Journey enquiry — ${fd.get('where') || 'somewhere'}`);
    const body = encodeURIComponent(
      `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nWhen: ${fd.get('when')}\nWhere the mind is: ${fd.get('where')}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={rootRef} className={`tpl-design-01-luxury${reduced ? ' is-reduced' : ''}`}>
      <div className="mg-navdock">
        <header className="mg-nav">
          <a className="mg-wordmark" href="#hero" aria-label={`${name} — home`}>
            {name}
            <span className="mg-wordmark-est">{content.brand.est}</span>
          </a>
          <nav className="mg-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="mg-cta" href="#contact">Enquire</a>
        </header>
      </div>

      <main>
        {/* HERO — scroll-driven frame sequence (replaces the signature loop).
            ScrollFrames pins its own stage for +=170% scroll; the shade, copy
            and scroll cue ride inside its overlay, bottom-aligned as before. */}
        <section id="hero" className="mg-hero" data-tour="Welcome">
          <ScrollFrames
            frames={frames}
            alt="Aerial drift toward a private yacht anchored off limestone cliffs at golden hour"
            pinDistance="+=170%"
          >
            <div className="mg-hero-shade" aria-hidden="true" />
            <div className="mg-hero-copy">
              <p className="mg-hero-eyebrow">{content.hero.eyebrow}</p>
              <h1 className="mg-hero-title">
                <Words text={content.hero.title} />
              </h1>
              <p className="mg-hero-sub">{content.hero.sub}</p>
              <div className="mg-hero-ctas">
                <a className="mg-cta mg-cta-solid" href={content.hero.ctaHref}>{content.hero.cta}</a>
                <a className="mg-cta mg-cta-ghost" href="#contact">Enquire</a>
              </div>
              <p className="mg-hero-note">{content.hero.note}</p>
            </div>
            <p className="mg-hero-scroll" aria-hidden="true">
              <span>Scroll</span>
              <span className="mg-scroll-line" />
            </p>
          </ScrollFrames>
        </section>

        {/* THE GRAND ITINERARY — signature scroll mechanic */}
        <section id="destinations" className="mg-itin" data-tour="The Grand Itinerary">
          <div className="mg-wrap">
            <p className="mg-eyebrow mg-rv">{content.itinerary.eyebrow}</p>
            <h2 className="mg-h2 mg-rv">{content.itinerary.title}</h2>
            <p className="mg-lede mg-rv">{content.itinerary.body}</p>
          </div>
          <div className="mg-itin-pin">
            <div className="mg-itin-stage">
              {/* The map box has the route's exact 5:7 aspect, so waypoint
                  percentages land on the drawn line at every viewport size. */}
              <div className="mg-itin-map">
                <svg className="mg-route-svg" viewBox="0 0 1000 1400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <path
                    className="mg-route-track"
                    d="M 170 1310 C 430 1250, 620 1300, 700 1120 C 780 940, 480 900, 380 740 C 280 580, 480 480, 660 430 C 800 395, 860 280, 795 150"
                    fill="none"
                  />
                  <path
                    className="mg-route-glow"
                    d="M 170 1310 C 430 1250, 620 1300, 700 1120 C 780 940, 480 900, 380 740 C 280 580, 480 480, 660 430 C 800 395, 860 280, 795 150"
                    fill="none"
                  />
                  <path
                    className="mg-route-draw"
                    d="M 170 1310 C 430 1250, 620 1300, 700 1120 C 780 940, 480 900, 380 740 C 280 580, 480 480, 660 430 C 800 395, 860 280, 795 150"
                    fill="none"
                  />
                </svg>
                {content.destinations.map((d, i) => (
                  <WaypointCard key={d.name} dest={d} index={i} />
                ))}
              </div>
              <div className="mg-leg" aria-hidden="true">
                <p className="mg-leg-label">LEG 01 / 04</p>
                <span className="mg-leg-bar"><span className="mg-leg-fill" /></span>
              </div>
            </div>
          </div>
          <div className="mg-wrap mg-itin-foot">
            <span className="mg-rule" aria-hidden="true" />
            <p className="mg-body mg-rv">{content.itinerary.footNote}</p>
            <a className="mg-cta mg-cta-ghost mg-rv" href="#contact">{content.itinerary.footCta}</a>
          </div>
        </section>

        {/* PHILOSOPHY / CRAFT */}
        <section id="craft" className="mg-craft" data-tour="The Philosophy">
          <div className="mg-wrap mg-craft-grid">
            <div className="mg-craft-text">
              <p className="mg-eyebrow mg-rv">{content.craft.eyebrow}</p>
              <h2 className="mg-h2 mg-rv">{content.craft.title}</h2>
              <span className="mg-rule" aria-hidden="true" />
              {content.craft.body.map((p, i) => (
                <p className="mg-body mg-rv" key={i}>{p}</p>
              ))}
              <ol className="mg-pillars mg-stagger">
                {content.craft.pillars.map((p, i) => (
                  <li className="mg-pillar" key={p.title}>
                    <span className="mg-pillar-num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="mg-pillar-title">{p.title}</h3>
                      <p className="mg-pillar-text">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mg-craft-visual">
              <figure className="mg-wipe mg-frame">
                <Img k="detail" src={img('detail', detailImg)} alt="Champagne coupe on a yacht deck railing, sea bokeh behind" />
                <figcaption>Golden hour, somewhere off the limestone coast.</figcaption>
              </figure>
              <ul className="mg-stats mg-stagger" aria-label="The house in numbers">
                <li><strong>40</strong><span>journeys a year</span></li>
                <li><strong>12</strong><span>years of quiet practice</span></li>
                <li><strong>01</strong><span>designer per journey</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* GUEST WORDS */}
        <section id="story" className="mg-story" data-tour="Guest Words">
          <div className="mg-wrap">
            <p className="mg-eyebrow mg-rv">{content.story.eyebrow}</p>
            <h2 className="mg-h2 mg-rv">{content.story.title}</h2>
            <span className="mg-rule mg-rule-dark" aria-hidden="true" />
            <div className="mg-quotes mg-stagger">
              {content.story.quotes.map((q) => (
                <blockquote className="mg-quote" key={q.name}>
                  <p className="mg-quote-text">{q.text}</p>
                  <cite className="mg-quote-cite">
                    <span className="mg-quote-name">{q.name}</span>
                    <span className="mg-quote-route">{q.route}</span>
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ENQUIRE / CONTACT */}
        <section id="contact" className="mg-contact" data-tour="Enquire">
          <div className="mg-wrap mg-contact-grid">
            <div>
              <p className="mg-eyebrow mg-rv">{content.contact.eyebrow}</p>
              <h2 className="mg-h2 mg-rv">{content.contact.title}</h2>
              <span className="mg-rule" aria-hidden="true" />
              <p className="mg-body mg-rv">{content.contact.body}</p>
              <address className="mg-address mg-rv">
                <a href={`mailto:${email}`}>{email}</a>
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phone}</a>
              </address>
              <p className="mg-fine mg-rv">Replies within one day. Discretion assured.</p>
            </div>
            <form className="mg-form mg-rv" onSubmit={onSubmit} aria-label="Request a consultation">
              <label className="mg-field">
                <span>{content.contact.fields.name}</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label className="mg-field">
                <span>{content.contact.fields.email}</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <div className="mg-field-row">
                <label className="mg-field">
                  <span>{content.contact.fields.when}</span>
                  <input name="when" type="text" placeholder="e.g. late November" />
                </label>
                <label className="mg-field">
                  <span>{content.contact.fields.where}</span>
                  <input name="where" type="text" placeholder="e.g. the Amalfi coast" />
                </label>
              </div>
              <button className="mg-cta mg-cta-solid mg-form-send" type="submit">
                {content.contact.fields.send}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="mg-footer">
        <div className="mg-wrap mg-footer-grid">
          <p className="mg-footer-word">{name}</p>
          <nav className="mg-footer-links" aria-label="Footer">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
            <a href="#contact">Enquire</a>
          </nav>
        </div>
        <div className="mg-wrap">
          <span className="mg-rule" aria-hidden="true" />
          <p className="mg-footer-line">{content.footer.line}</p>
          <p className="mg-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
