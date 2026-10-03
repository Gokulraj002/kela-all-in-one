import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import work1Img from './assets/work-1.webp';
import work2Img from './assets/work-2.webp';
import work3Img from './assets/work-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero: the wheatpaste wall plays frame-by-frame while pinned. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-maximal';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Work+Sans:wght@400;500;600;700&display=swap';

const workImgs = {
  hero: heroImg,
  'work-1': work1Img,
  'work-2': work2Img,
  'work-3': work3Img,
  detail: detailImg,
};

const stickerPos = [
  { top: '7%', left: '5%' },
  { top: '5%', right: '6%' },
  { bottom: '9%', left: '44%' },
];

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   A real space sits between the word masks so headlines never run together. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`l6-wm ${className}`} aria-label={text}>
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

function Sticker({ text, rot, tone, pos, pop = true }) {
  return (
    <div
      className={`l6-sticker${pop ? ' l6-pop' : ''} tone-${tone}`}
      data-rot={rot}
      style={pos}
      aria-hidden="true"
    >
      <div className="l6-kick">
        <span className="l6-sticker-body">{text}</span>
      </div>
    </div>
  );
}

function CaseCard({ c }) {
  const { img } = useCustom();
  return (
    <article
      className="l6-piece"
      data-rot={c.rot}
      style={{ top: c.top, left: c.left, width: `${c.w}%`, zIndex: c.z, '--rot': `${c.rot * 0.5}deg` }}
    >
      <div className="l6-kick">
        <figure className={`l6-card tone-${c.tone}${c.magenta ? ' is-magenta' : ''}`}>
          {c.img ? (
            <div className="l6-card-media">
              <Img k={c.img} src={img(c.img, workImgs[c.img])} alt={c.alt} />
            </div>
          ) : (
            <div className="l6-card-media l6-typecard">
              <span>{c.big}</span>
            </div>
          )}
          <figcaption className="l6-card-cap">
            <p className="l6-card-kind">
              {c.kind} — {c.year}
            </p>
            <h3 className="l6-card-title">{c.title}</h3>
            <p className="l6-card-client">{c.client}</p>
            <p className="l6-card-blurb">{c.blurb}</p>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export default function Design06Maximal() {
  const { brand, img, contact } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
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
    const ctx = gsap.context(() => {
      const sc = scroller();
      const root = rootRef.current;
      if (!root) return;

      /* Crew marquee: constant 40px/s, decorative. Duration from measured width. */
      const track = root.querySelector('.l6-marquee-track');
      if (track) {
        const half = track.scrollWidth / 2;
        if (half > 0) track.style.setProperty('--mq-dur', `${(half / 40).toFixed(2)}s`);
      }

      if (reduced) return;

      /* ---- Scroll-velocity rotation kick: one rAF loop for the template ----
         Feeds from hero + avalanche ScrollTrigger velocity, capped at ±8deg,
         applied to .l6-kick layers, decays to rest. Paused offscreen. */
      let kick = 0;
      let kickTarget = 0;
      let running = false;
      let heroIn = true;
      let workIn = false;
      const applyKick = (val) => {
        root.querySelectorAll('.l6-kick').forEach((el) => {
          el.style.transform = val ? `rotate(${val.toFixed(2)}deg)` : '';
        });
      };
      const tick = () => {
        kick += (kickTarget - kick) * 0.14;
        kickTarget *= 0.93;
        if (Math.abs(kick) < 0.03 && Math.abs(kickTarget) < 0.03) {
          if (kick !== 0) {
            kick = 0;
            applyKick(0);
          }
        } else {
          applyKick(kick);
        }
      };
      /* gsap.ticker runs in the same frame as the viewer's smooth scroll,
         so the kick never lags a frame behind the scroll position. */
      const syncLoop = () => {
        const want = (heroIn || workIn) && !document.hidden;
        if (want && !running) {
          running = true;
          gsap.ticker.add(tick);
        } else if (!want && running) {
          running = false;
          gsap.ticker.remove(tick);
          kick = 0;
          kickTarget = 0;
          applyKick(0);
        }
      };
      const pushVel = (v) => {
        kickTarget = Math.max(-8, Math.min(8, v / 200));
      };
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.target.classList.contains('l6-hero')) heroIn = e.isIntersecting;
            if (e.target.classList.contains('l6-work')) workIn = e.isIntersecting;
          });
          syncLoop();
        },
        { threshold: 0.05 }
      );
      const heroSec = root.querySelector('.l6-hero');
      const workSec = root.querySelector('.l6-work');
      if (heroSec) io.observe(heroSec);
      if (workSec) io.observe(workSec);
      document.addEventListener('visibilitychange', syncLoop);
      syncLoop();

      /* Hero entrance: type first, then the collage pops with rotation —
         the one allowed back.out(1.4) overshoot, single and subtle. */
      const intro = gsap.timeline({ defaults: { ease: 'back.out(1.4)' } });
      intro
        .fromTo(
          '.l6-hero-title .wi',
          { yPercent: 115 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.1
        )
        .fromTo(
          '.l6-hero-frame',
          { scale: 0.85, rotation: -8 },
          { scale: 1, rotation: -2, duration: 1 },
          0.2
        )
        .fromTo(
          '.l6-sticker',
          { scale: 0.8, rotation: (i, el) => (parseFloat(el.dataset.rot) || 0) * 1.5 },
          {
            scale: 1,
            rotation: (i, el) => parseFloat(el.dataset.rot) || 0,
            duration: 0.9,
            stagger: 0.12,
          },
          0.5
        )
        .fromTo(
          /* the CTA's wrapper moves, so the button's own tilt + hover
             transition never fight the tween */
          '.l6-hero-eyebrow, .l6-hero-sub, .l6-hero-cta-wrap',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
          0.7
        );

      /* Hero scroll velocity also feeds the kick. */
      ScrollTrigger.create({
        trigger: '.l6-hero',
        scroller: sc,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => pushVel(self.getVelocity() / 200),
      });

      /* ---- M6 collage avalanche ----
         Tall field; one scrubbed timeline tumbles each poster in with its own
         rotation (±4deg), scale 0.9→1 and x-drift, expo.out, staggered by
         scroll position. Desktop only — mobile gets a stacked reveal. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const pieces = gsap.utils.toArray('.l6-piece', root);
        if (!pieces.length) return undefined;
        /* Velocity feed for the kick while the wall is on screen. */
        ScrollTrigger.create({
          trigger: '.l6-avalanche',
          scroller: sc,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => pushVel(self.getVelocity() / 200),
        });
        /* Each poster lands on its own scroll window (tied to where it sits
           in the field), so every poster on screen has fully landed — a
           single timeline left posters that were already in view half faded. */
        pieces.forEach((el, i) => {
          const rot = parseFloat(el.dataset.rot || 0);
          const drift = (i % 2 === 0 ? -1 : 1) * 70;
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.9, x: drift, rotation: rot - 7 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              rotation: rot,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: el,
                scroller: sc,
                start: 'top 98%',
                end: 'top 62%',
                scrub: 0.8,
              },
            }
          );
        });
        return undefined;
      });
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.l6-piece', root).forEach((el) => {
          const rot = parseFloat(el.dataset.rot || 0) * 0.4;
          gsap.fromTo(
            el,
            { opacity: 0, y: 40, rotation: rot },
            {
              opacity: 1,
              y: 0,
              rotation: rot,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
            }
          );
        });
      });

      /* House grammar: block rises + stagger groups. */
      gsap.utils.toArray('.l6-rv', root).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.l6-stagger', root).forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      return () => {
        io.disconnect();
        document.removeEventListener('visibilitychange', syncLoop);
        if (running) gsap.ticker.remove(tick);
      };
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-06-maximal${reduced ? ' is-reduced' : ''}`}>
      {/* STICKER NAV */}
      <header className="l6-nav">
        <a className="l6-wordmark" href="#hero">
          {name}
        </a>
        <nav className="l6-links" aria-label="Primary">
          {content.nav.map((n, i) => (
            <a key={n.href} href={n.href} className={`l6-navlink tone-${i % 2 ? 'ink' : 'paper'}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HERO — wheatpaste wall, scrubbed by scroll */}
        <section id="hero" className="l6-hero" data-tour="Collage Hero">
          <ScrollFrames
            frames={frames}
            alt="Wheatpaste posters layering up, frame by frame"
            pinDistance="+=170%"
          >
            <div className="l6-hero-field">
              <div className="l6-hero-copy">
                <p className="l6-eyebrow l6-hero-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="l6-hero-title">
                  <Words text={content.hero.title} />
                  <br />
                  <span className="l6-hl">
                    <Words text={content.hero.titleAccent} />
                  </span>
                </h1>
                <p className="l6-hero-sub">{content.hero.sub}</p>
                <div className="l6-hero-cta-wrap">
                  <a className="l6-cta l6-hero-cta" href={content.hero.ctaHref}>
                    {content.hero.cta}
                  </a>
                </div>
              </div>
              <div className="l6-hero-frame" aria-label="Studio work">
                <Img
                  k="hero"
                  src={heroPoster}
                  eager
                  alt="Wall of layered wheatpasted posters with torn curling edges, acid yellow and magenta fragments"
                  className="l6-hero-media"
                />
                <span className="l6-tape l6-tape-a" aria-hidden="true" />
                <span className="l6-tape l6-tape-b" aria-hidden="true" />
              </div>
              {content.hero.stickers.map((s, i) => (
                <Sticker
                  key={s.text}
                  text={s.text}
                  rot={s.rot}
                  tone={i === 0 ? 'magenta' : s.tone}
                  pos={stickerPos[i]}
                />
              ))}
              <p className="l6-scroll-hint" aria-hidden="true">
                Scroll — the wall builds itself
              </p>
            </div>
          </ScrollFrames>
        </section>

        {/* WORK — M6 collage avalanche */}
        <section id="work" className="l6-work l6-sec" data-tour="The Work Wall">
          <div className="l6-sec-head">
            <p className="l6-eyebrow l6-rv">Selected noise</p>
            <h2 className="l6-h2 l6-rv">
              The work <span className="l6-hl">wall</span>
            </h2>
            <p className="l6-lede l6-rv">
              Posters, covers, merch and mayhem. Scroll and watch the layers land —
              every one placed, none of it random.
            </p>
          </div>
          <div className="l6-avalanche">
            {content.cases.map((c) => (
              <CaseCard key={c.id} c={c} />
            ))}
          </div>
        </section>

        {/* CREW */}
        <section id="crew" className="l6-crew l6-sec" data-tour="The Crew">
          <div className="l6-sec-head">
            <p className="l6-eyebrow l6-rv">The collective</p>
            <h2 className="l6-h2 l6-rv">
              Six humans, <span className="l6-hl">zero chill</span>
            </h2>
          </div>
          <div className="l6-marquee" aria-label="Crew names">
            <div className="l6-marquee-track">
              {[0, 1].map((copy) => (
                <div className="l6-marquee-run" key={copy} aria-hidden={copy === 1}>
                  {content.crew.map((m) => (
                    <span className="l6-marquee-name" key={m.name}>
                      {m.name}
                      <span className="l6-marquee-dot" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <ul className="l6-crew-grid l6-stagger">
            {content.crew.map((m, i) => (
              <li key={m.name} className={`l6-crew-card tone-${['acid', 'ink', 'paper'][i % 3]}`}>
                <span className="l6-crew-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="l6-crew-name">{m.name}</h3>
                <p className="l6-crew-role">{m.role}</p>
                <p className="l6-crew-note">{m.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* SERVICES — shouted list */}
        <section id="services" className="l6-services l6-sec" data-tour="Shouted Services">
          <div className="l6-sec-head">
            <p className="l6-eyebrow l6-rv">What we do</p>
            <h2 className="l6-h2 l6-rv">
              Shouted <span className="l6-hl">services</span>
            </h2>
          </div>
          <ul className="l6-svc-list l6-stagger">
            {content.services.map((s, i) => (
              <li key={s.name} className="l6-svc-row">
                <span className="l6-svc-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="l6-svc-text">
                  <h3 className="l6-svc-name">{s.name}</h3>
                  <p className="l6-svc-desc">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* MANIFESTO */}
        <section id="manifesto" className="l6-manifesto l6-sec" data-tour="Manifesto">
          <p className="l6-eyebrow l6-eyebrow-inv l6-rv">The manifesto</p>
          <ul className="l6-mani-list l6-stagger">
            {content.manifesto.map((line) => (
              <li key={line} className="l6-mani-line">
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* CONTACT — big email */}
        <section id="contact" className="l6-contact l6-sec" data-tour="Shout It">
          <p className="l6-eyebrow l6-rv">{content.contact.eyebrow}</p>
          <h2 className="l6-h2 l6-rv">{content.contact.title}</h2>
          <a className="l6-bigmail l6-rv" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="l6-contact-grid">
            <div className="l6-rv">
              <h3 className="l6-h3">Find us</h3>
              <p>
                {content.contact.address}
                <br />
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>
                  {content.contact.phone}
                </a>
                <br />
                {content.contact.hours}
              </p>
            </div>
            <div className="l6-rv">
              <h3 className="l6-h3">Follow the noise</h3>
              <ul className="l6-socials">
                {content.contact.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="l6-rv">
              <h3 className="l6-h3">The fine print</h3>
              <p>{content.contact.note}</p>
              <a className="l6-cta l6-cta-magenta" href={`mailto:${email}`}>
                Start a project
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="l6-footer">
        <p className="l6-footer-line">{content.footer.line}</p>
        <p className="l6-colophon">{content.footer.colophon}</p>
      </footer>
    </div>
  );
}
