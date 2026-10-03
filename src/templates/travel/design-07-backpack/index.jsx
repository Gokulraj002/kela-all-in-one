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

/* "Night Train" film frames, scrubbed by scroll (see VIDEO_PLAN.md). */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-07-backpack';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Inter:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`bt-wm ${className}`} aria-label={text}>
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

/* Each route image is mapped to its upload key; the 4th ticket reuses the
   hero key so a custom hero upload also refreshes the board. */
const routeMedia = [
  { src: dest2Img, key: 'product-1', alt: 'A lone traveler silhouetted on Hampi boulders at sunset' },
  { src: dest3Img, key: 'product-2', alt: 'A wooden canoe drifting through Kerala backwaters at dawn' },
  { src: dest1Img, key: 'product-0', alt: 'A motorbike rider seen from behind climbing a Himalayan switchback road' },
  { src: heroImg, key: 'hero', alt: 'Mountain hostel terrace at sunrise, backpacks lined up under prayer flags' },
];

function TicketCard({ route, index }) {
  const { productName, price, img } = useCustom();
  const media = routeMedia[index % routeMedia.length];
  return (
    <article className="bt-ticket" aria-label={`${productName(index, route.name)} — ${price(route.price)}`}>
      <div className="bt-ticket-visual">
        <span className="bt-ticket-tag">{route.tag}</span>
        <Img k={media.key} src={img(media.key, media.src)} alt={media.alt} />
      </div>
      <div className="bt-ticket-body">
        <h3 className="bt-ticket-name">{productName(index, route.name)}</h3>
        <p className="bt-ticket-blurb">{route.blurb}</p>
        <div className="bt-ticket-meta">
          <span className="bt-chip is-teal">{route.duration}</span>
          <span className="bt-chip">{route.group}</span>
        </div>
      </div>
      <div className="bt-perf" aria-hidden="true" />
      <div className="bt-stub">
        <span className="bt-stub-admit" aria-hidden="true">Admit</span>
        <div className="bt-stub-main">
          <p className="bt-stub-price">
            {price(route.price)}
            <small>All-in · no fine print</small>
          </p>
        </div>
        <a className="bt-stub-cta" href="#visit">Grab this seat</a>
      </div>
      <div className="bt-stamp" aria-hidden="true">
        <span className="bt-stamp-price">{price(route.price)}</span>
        <span className="bt-stamp-sub">All-in</span>
      </div>
    </article>
  );
}

export default function Design07Backpack() {
  const { brand, img, contact, price } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = (contact && contact.email) || content.visit.email;
  const phone = (contact && contact.phone) || content.visit.phone;
  const heroPoster = img('hero', heroImg);

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
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: clip-wipe frame, masked word-rise, sticker pop. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.bt-hero-frame',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.bt-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.35
        )
        .fromTo(
          '.bt-hero-sub, .bt-hero-ctas, .bt-hero-price',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          0.8
        )
        .fromTo(
          '.bt-hero .bt-eyebrow',
          { opacity: 0, scale: 0.6, rotation: -8 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)' },
          0.55
        );

      /* Gentle parallax on the hero frame only. */
      gsap.to('.bt-hero-frame', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.bt-hero', scroller: sc, start: 'top top', end: 'bottom top', scrub: true },
      });

      /* Standard reveals. */
      gsap.utils.toArray('.bt-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.bt-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.14,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* ============ SIGNATURE: the ticket-deal ============
         Four perforated ticket stubs start as a fanned stack (rotated,
         overlapping). A scrub timeline deals each card to its grid slot and
         punches the price stamp down as it lands. Scrolling back re-stacks
         them. Default CSS is the final (dealt) state, so reduced-motion and
         no-JS get a static grid with stamps visible. */
      const grid = rootRef.current && rootRef.current.querySelector('.bt-ticket-grid');
      if (grid) {
        const cards = gsap.utils.toArray('.bt-ticket', grid);
        const stamps = cards.map((c) => c.querySelector('.bt-stamp'));
        const rots = [-9, 6, -5, 8];
        const dealOrder = [3, 2, 1, 0]; /* top of the stack deals first */

        const setStack = () => {
          const anchor = cards[0].getBoundingClientRect();
          cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            gsap.set(card, {
              x: anchor.left - r.left + (i === 0 ? 0 : (i % 2 ? 14 : -14)),
              y: anchor.top - r.top + (i === 0 ? 0 : i * 9),
              rotation: rots[i],
              zIndex: 10 + i,
            });
            gsap.set(stamps[i], { scale: 0, opacity: 0, rotation: -26, transformOrigin: '50% 50%' });
          });
        };
        const clearStack = () => {
          cards.forEach((card, i) => {
            gsap.set(card, { clearProps: 'transform,zIndex' });
            gsap.set(stamps[i], { clearProps: 'transform,opacity' });
          });
        };
        const buildTimeline = (scrollTriggerVars) => {
          const deal = gsap.timeline({ scrollTrigger: scrollTriggerVars });
          dealOrder.forEach((ci, k) => {
            const at = k * 1.35;
            deal.to(cards[ci], { x: 0, y: 0, rotation: 0, duration: 1, ease: 'power2.inOut' }, at);
            /* the stamp punch: slams from oversized down onto the stub */
            deal.fromTo(
              stamps[ci],
              { scale: 2.6, opacity: 0, rotation: -26 },
              { scale: 1, opacity: 1, rotation: -10, duration: 0.3, ease: 'power4.in' },
              at + 0.92
            );
          });
          return deal;
        };

        const mm = gsap.matchMedia();
        /* Desktop: pin the deal zone and scrub the deal. */
        mm.add('(min-width: 768px)', () => {
          setStack();
          const deal = buildTimeline({
            trigger: '.bt-deal-pin',
            scroller: sc,
            start: 'top top',
            end: '+=2600',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
          return () => {
            if (deal.scrollTrigger) deal.scrollTrigger.kill();
            deal.kill();
            clearStack();
          };
        });
        /* Mobile: the same deal, scrubbed through the section without a pin. */
        mm.add('(max-width: 767px)', () => {
          setStack();
          const deal = buildTimeline({
            trigger: '.bt-ticket-grid',
            scroller: sc,
            start: 'top 78%',
            end: 'bottom 62%',
            scrub: 1,
          });
          return () => {
            if (deal.scrollTrigger) deal.scrollTrigger.kill();
            deal.kill();
            clearStack();
          };
        });
      }
    }, rootRef);
    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className="tpl-design-07-backpack">
      <header className="bt-nav">
        <div className="bt-wrap bt-nav-in">
          <a className="bt-wordmark" href="#hero">
            Bunk <em>&amp;</em> Trail
          </a>
          <nav className="bt-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} className="bt-sticker-link" href={n.href}>
                {n.label}
              </a>
            ))}
            <a className="bt-sticker-link is-cta" href="#visit">Plan it</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO — still image, big Archivo headline, price-honest subhead */}
        <section id="hero" className="bt-hero" data-tour="Welcome">
          <div className="bt-hero-frame">
            <Img k="hero" src={heroPoster} eager alt="Mountain hostel terrace at sunrise — prayer flags overhead, backpacks lined up along a stone wall" />
          </div>
          <div className="bt-hero-veil" aria-hidden="true" />
          <div className="bt-hero-copy">
            <p className="bt-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="bt-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="bt-hero-sub">{content.hero.sub}</p>
            <div className="bt-hero-ctas">
              <a className="bt-btn" href={content.hero.ctaHref}>{content.hero.cta}</a>
              <a className="bt-btn is-ghost" href={content.hero.secondaryHref}>{content.hero.secondary}</a>
            </div>
            <p className="bt-hero-price">
              <strong>from ₹5,499</strong>
              <span>Every trip priced all-in. What you see is what you pay.</span>
            </p>
          </div>
        </section>

        {/* ROUTES — the signature ticket-stub deal */}
        <section id="destinations" className="bt-sec bt-routes" data-tour="Ticket Deals">
          <div className="bt-wrap">
            <p className="bt-eyebrow bt-rv">{content.routes.eyebrow}</p>
            <h2 className="bt-h2 bt-rv">{content.routes.title}</h2>
            <p className="bt-lede bt-rv">{content.routes.intro}</p>
          </div>
          <div className="bt-deal-pin">
            <div className="bt-wrap">
              <p className="bt-deal-hint bt-rv">{content.routes.hint}</p>
              <div className="bt-ticket-grid">
                {content.routes.items.map((route, i) => (
                  <TicketCard key={route.name} route={route} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NIGHT TRAIN — mid-page film: the train ride, scrubbed frame by frame */}
        <section id="story" className="bt-sec bt-film" data-tour="Night Train">
          <div className="bt-film-scrub">
            <ScrollFrames
              frames={frames}
              alt="Looking out of a night-train window — platform lights smearing past, then dark countryside with scattered village lights"
              pinDistance="+=170%"
              stageHeight="80svh"
            >
              <div className="bt-film-veil" aria-hidden="true" />
              <div className="bt-film-copy">
                <p className="bt-eyebrow">{content.story.eyebrow}</p>
                <h2 className="bt-h2">{content.story.title}</h2>
                <p className="bt-film-note">{content.story.filmNote}</p>
              </div>
            </ScrollFrames>
          </div>
          <div className="bt-wrap bt-film-text">
            {content.story.body.map((p, i) => (
              <p className="bt-lede bt-rv" key={i}>{p}</p>
            ))}
            <ul className="bt-rituals bt-stagger">
              {content.story.rituals.map((r) => (
                <li className="bt-ritual" key={r.title}>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CREW & BUNKS */}
        <section id="gallery" className="bt-sec bt-crew" data-tour="Crew & Bunks">
          <div className="bt-wrap">
            <p className="bt-eyebrow bt-rv">{content.crew.eyebrow}</p>
            <h2 className="bt-h2 bt-rv">{content.crew.title}</h2>
            <p className="bt-lede bt-rv">{content.crew.intro}</p>
            <div className="bt-crew-grid">
              <div className="bt-board bt-rv">
                <h3>Departures looking for crew</h3>
                <p>Pinned fresh every Monday. When the bunks fill, the card comes down.</p>
                <ul className="bt-crew-list">
                  {content.crew.items.map((c) => (
                    <li className="bt-crew-card" key={c.route}>
                      <p className="bt-crew-route">{c.route}</p>
                      <p className="bt-crew-dates">{c.dates}</p>
                      <p className="bt-crew-note">{c.note}</p>
                      <span className="bt-crew-spots">
                        {c.spots} {c.spots === 1 ? 'bunk' : 'bunks'} open
                      </span>
                    </li>
                  ))}
                </ul>
                <a className="bt-btn" href={content.crew.ctaHref}>{content.crew.cta}</a>
              </div>
              <div className="bt-bunks bt-rv">
                <div className="bt-bunk-visual">
                  <Img k="detail" src={img('detail', detailImg)} alt="A packed backpack on a hostel bunk with fairy lights glowing warm at night" />
                </div>
                <h3 className="bt-bunks-title">{content.crew.bunksTitle}</h3>
                <p>{content.crew.bunksIntro}</p>
                <ul className="bt-hostel-list bt-stagger">
                  {content.crew.hostels.map((h) => (
                    <li className="bt-hostel" key={h.name}>
                      <p className="bt-hostel-name">{h.name}</p>
                      <p className="bt-hostel-city">{h.city}</p>
                      <p className="bt-hostel-note">{h.note}</p>
                      <p className="bt-hostel-price">
                        {price(h.price)}
                        <small>{content.crew.perNight}</small>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* VISIT / PLAN */}
        <section id="visit" className="bt-sec bt-visit" data-tour="Plan It">
          <div className="bt-wrap">
            <p className="bt-eyebrow bt-rv">{content.visit.eyebrow}</p>
            <h2 className="bt-h2 bt-rv">{content.visit.title}</h2>
            <ol className="bt-steps bt-stagger">
              {content.visit.steps.map((s, i) => (
                <li className="bt-step" key={s.title}>
                  <span className="bt-step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="bt-contact bt-rv">
              <div>
                <h3>{content.visit.contactTitle}</h3>
                <p>{content.visit.note}</p>
                <div className="bt-contact-links">
                  <a href={`mailto:${email}`}>{email}</a>
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </div>
                <address>{content.visit.address}</address>
              </div>
              <div>
                <p className="bt-lede" style={{ margin: 0 }}>
                  {name} runs October to March, when the mountains behave and the
                  backwaters are at their greenest. Tell us which ticket caught your
                  eye and we will hold your bunk for 48 hours — no deposit, no
                  pressure, just a pencil on the board.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bt-footer">
        <div className="bt-wrap bt-footer-in">
          <p className="bt-footer-line">
            Bunk <em>&amp;</em> Trail — go far, spend little.
          </p>
          <p className="bt-colophon">{content.footer.colophon}</p>
        </div>
      </footer>
    </div>
  );
}
