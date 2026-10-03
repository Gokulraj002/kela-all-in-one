import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import listing1Img from './assets/listing-1.webp';
import listing2Img from './assets/listing-2.webp';
import listing3Img from './assets/listing-3.webp';
import detailImg from './assets/detail.webp';

const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-09-trust';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&family=Public+Sans:wght@400;500;600;700&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span>.
   Each word is an inline-block mask, so a real space is rendered between
   the word spans. */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`sh-wm ${className}`} aria-label={text}>
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

const imgForKey = {
  hero: heroImg,
  'product-0': listing1Img,
  'product-1': listing2Img,
  'product-2': listing3Img,
  detail: detailImg,
};

export default function Design09Trust() {
  const { brand, img, price, contact, productName } = useCustom();
  const { rootRef, scroller } = useTplScope();
  const reduced = useReducedMotion();
  const name = brand || content.brand.name;
  const email = contact.email || content.contact.email;
  const fmt = useCallback((v) => price(Math.round(v)), [price]);

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
    /* Sticky nav height, kept clear at the top of the pinned ledger. */
    const root = rootRef.current;
    const navEl = root && root.querySelector('.sh-nav');
    const setNavH = () => { if (navEl) root.style.setProperty('--sh-nav-h', `${navEl.offsetHeight}px`); };
    setNavH();
    const navRO = typeof ResizeObserver !== 'undefined' && navEl ? new ResizeObserver(setNavH) : null;
    if (navRO) navRO.observe(navEl);

    const ctx = gsap.context(() => {
      const sc = scroller();
      if (reduced) return;

      /* Hero entrance: masked word-rise + frame wipe, then sub/badges/CTA. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.sh-hero-frame',
        { clipPath: 'inset(8% 6% 8% 6%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          '.sh-hero-title .wi',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 },
          0.2
        )
        .fromTo(
          '.sh-hero-sub, .sh-hero-badges, .sh-hero-ctas',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
          0.75
        );

      /* Gentle reveals for everything marked .sh-rv. */
      gsap.utils.toArray('.sh-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });

      /* Hairline rules draw between sections. */
      gsap.utils.toArray('.sh-rule').forEach((rule) => {
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

      /* Image wipe reveals. */
      gsap.utils.toArray('.sh-wipe').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(10% 6% 10% 6%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.15,
            ease: 'power4.inOut',
            scrollTrigger: { trigger: frame, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* Mobile bottom quick-bar slides up once, after the hero. */
      gsap.fromTo(
        '.sh-quickbar',
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.sh-hero', scroller: sc, start: 'bottom 60%', once: true },
        }
      );

      /* ——— Signature mechanic: transparent pricing ledger ———
         Pinned at >=768px. Scroll stacks the cost lines: each arriving line
         grows its bar and counts its number up; the running total pins at
         the top and accumulates; ends with the per-sqft figure and the
         "no hidden charges" seal. Below 768px / reduced-motion, the ledger
         renders statically with final numbers (no animation needed). */
      const ledgerPin = rootRef.current && rootRef.current.querySelector('.sh-ledger-pin');
      if (ledgerPin) {
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', () => {
          const lineEls = gsap.utils.toArray('.sh-line', ledgerPin);
          const totalEl = ledgerPin.querySelector('.sh-ledger-total-value');
          const finalEl = ledgerPin.querySelector('.sh-ledger-final');
          const scrollBox = ledgerPin.querySelector('.sh-ledger-scroll');
          const track = ledgerPin.querySelector('.sh-ledger-track');
          if (!lineEls.length) return undefined;
          /* Pinned layout: the ledger fills the visible scroll area under the
             sticky nav; its lines run on an inner track that slides up so
             the arriving line (and finally the seal) is always in view. */
          ledgerPin.classList.add('is-pinned');

          const state = lineEls.map((line) => ({
            line,
            amt: parseFloat(line.dataset.amount || '0'),
            amtEl: line.querySelector('.sh-line-amt'),
            fill: line.querySelector('.sh-line-fill'),
          }));
          const cum = [0];
          state.forEach((s) => cum.push(cum[cum.length - 1] + s.amt));

          /* Zero the ledger before the scrub builds it back up. */
          gsap.set(
            state.map((s) => s.fill),
            { scaleX: 0 }
          );
          gsap.set(
            state.map((s) => s.line),
            { opacity: 0.14 }
          );
          state.forEach((s) => {
            if (s.amtEl) s.amtEl.textContent = fmt(0);
          });
          if (totalEl) totalEl.textContent = fmt(0);
          gsap.set(finalEl, { opacity: 0, y: 44 });

          /* How far the track must slide so line i (or, for i = n, the
             closing seal) sits fully inside the visible ledger window. */
          const lift = (i) => {
            if (!scrollBox || !track) return 0;
            const target = i >= state.length ? track : state[i].line;
            const bottom = i >= state.length ? track.scrollHeight : target.offsetTop + target.offsetHeight;
            return -Math.max(0, bottom - scrollBox.clientHeight + 8);
          };

          /* Every tween has explicit from/to values, so the refreshes the
             viewer triggers can never re-record a mid-scrub state. */
          const o = { v: 0 };
          const seg = 1.8;
          const ltl = gsap.timeline({
            defaults: { immediateRender: false },
            scrollTrigger: {
              trigger: ledgerPin,
              scroller: sc,
              start: 'top top',
              end: () => `+=${Math.round(state.length * 60 + 110)}%`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          state.forEach((s, i) => {
            const pos = i * seg;
            const from = cum[i];
            const to = cum[i + 1];
            if (track && i > 0) {
              ltl.fromTo(track, { y: () => lift(i - 1) }, { y: () => lift(i), duration: 0.6, ease: 'power2.inOut' }, pos - 0.1);
            }
            ltl.fromTo(s.line, { opacity: 0.14 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, pos);
            ltl.fromTo(
              s.fill,
              { scaleX: 0 },
              { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
              pos + 0.25
            );
            ltl.fromTo(
              o,
              { v: from },
              {
                v: to,
                duration: 1.2,
                ease: 'power2.inOut',
                onUpdate: () => {
                  const p = to === from ? 1 : (o.v - from) / (to - from);
                  if (s.amtEl) s.amtEl.textContent = fmt(s.amt * Math.min(1, Math.max(0, p)));
                  if (totalEl) totalEl.textContent = fmt(o.v);
                },
              },
              pos + 0.25
            );
          });
          const fpos = state.length * seg;
          if (track) {
            ltl.fromTo(track, { y: () => lift(state.length - 1) }, { y: () => lift(state.length), duration: 0.7, ease: 'power2.inOut' }, fpos);
          }
          ltl.fromTo(finalEl, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, fpos + 0.35);
          /* Rest on the finished ledger and its seal before the pin releases. */
          ltl.to({}, { duration: 0.6 });
          /* The closing sum is exposed to assistive tech once it is shown. */
          let sealShown = null;
          const syncSeal = () => {
            const on = ltl.time() >= fpos + 0.35;
            if (on === sealShown || !finalEl) return;
            sealShown = on;
            finalEl.setAttribute('aria-hidden', String(!on));
          };
          ltl.eventCallback('onUpdate', syncSeal);
          syncSeal();
          return () => {
            ledgerPin.classList.remove('is-pinned');
            if (finalEl) finalEl.removeAttribute('aria-hidden');
          };
        });
      }
    }, rootRef);
    return () => {
      if (navRO) navRO.disconnect();
      ctx.revert();
    };
  }, [reduced, scroller, rootRef, fmt]);

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(content.contact.address)}`;
  const telHref = `tel:${content.contact.phone.replace(/[\s-]/g, '')}`;
  const maxLine = Math.max(...content.pricing.lines.map((l) => l.amount));

  return (
    <div ref={rootRef} className="tpl-design-09-trust">
      <header className="sh-nav">
        <a className="sh-wordmark" href="#hero">{name}</a>
        <nav className="sh-links" aria-label="Primary">
          {content.nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <a className="sh-cta" href={content.cta.href}>{content.cta.label}</a>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="sh-hero" data-tour="Welcome">
          <div className="sh-hero-frame">
            <Img k="hero" src={img('hero', heroImg)} eager alt="Sahaj Enclave II apartment block in bright daylight — white upper floors over a brick base, with bicycles parked at the entrance" className="sh-hero-img" />
          </div>
          <div className="sh-hero-copy">
            <p className="sh-eyebrow">{content.hero.eyebrow}</p>
            <h1 className="sh-hero-title">
              <Words text={content.hero.title} />
            </h1>
            <p className="sh-hero-sub">{content.hero.sub}</p>
            <ul className="sh-hero-badges" aria-label="Assurances">
              {content.hero.badges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="sh-hero-ctas">
              <a className="sh-cta sh-cta-solid" href={content.cta.href}>{content.cta.label}</a>
              <a className="sh-cta sh-cta-ghost" href="#homes">View the homes</a>
            </div>
          </div>
        </section>

        {/* HOMES */}
        <section id="homes" className="sh-homes" data-tour="Homes">
          <div className="sh-wrap">
            <p className="sh-eyebrow sh-rv">{content.homes.eyebrow}</p>
            <h2 className="sh-h2 sh-rv">{content.homes.title}</h2>
            <span className="sh-rule" aria-hidden="true" />
            <p className="sh-lede sh-rv">{content.homes.note}</p>
            <div className="sh-home-grid">
              {content.homes.items.map((h, i) => (
                <article className="sh-home-card sh-rv" key={h.name}>
                  <div className="sh-home-img sh-wipe">
                    <Img k={h.imgKey} src={img(h.imgKey, imgForKey[h.imgKey])} alt={h.alt} />
                  </div>
                  <div className="sh-home-body">
                    <p className="sh-home-status">{h.status}</p>
                    <h3 className="sh-h3">{productName(i, h.name)}</h3>
                    <p className="sh-home-meta">{h.area} · {h.config}</p>
                    <p className="sh-home-price">{price(h.price)}</p>
                    <a className="sh-textlink" href="#pricing">See what it is made of</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TRANSPARENT PRICING LEDGER — signature scroll mechanic */}
        <section id="pricing" className="sh-pricing" data-tour="Cost Breakup">
          <div className="sh-wrap">
            <p className="sh-eyebrow sh-rv">{content.pricing.eyebrow}</p>
            <h2 className="sh-h2 sh-rv">{content.pricing.title}</h2>
            <span className="sh-rule" aria-hidden="true" />
            <p className="sh-lede sh-rv">{content.pricing.intro}</p>
          </div>
          <div className="sh-ledger-pin">
            <div className="sh-ledger">
              <div className="sh-ledger-total" aria-live="polite">
                <span className="sh-ledger-total-label">Running total · per sqft</span>
                <span className="sh-ledger-total-value">{fmt(content.pricing.perSqft)}</span>
              </div>
              {/* window + track: plain blocks in the static ledger; when the
                  ledger is pinned the track slides inside the window */}
              <div className="sh-ledger-scroll">
                <div className="sh-ledger-track">
                  <ol className="sh-ledger-lines">
                    {content.pricing.lines.map((l, i) => (
                      <li
                        className="sh-line"
                        key={l.name}
                        data-amount={l.amount}
                        style={{ '--w': `${Math.round((l.amount / maxLine) * 100)}%` }}
                      >
                        <div className="sh-line-head">
                          <span className="sh-line-index">{String(i + 1).padStart(2, '0')}</span>
                          <div className="sh-line-namewrap">
                            <h3 className="sh-line-name">{l.name}</h3>
                            <p className="sh-line-note">{l.note}</p>
                          </div>
                          <span className="sh-line-share">{Math.round((l.amount / content.pricing.perSqft) * 100)}%</span>
                          <span className="sh-line-amt">{fmt(l.amount)}</span>
                        </div>
                        <div className="sh-line-bar" aria-hidden="true">
                          <span className="sh-line-fill" />
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="sh-ledger-final">
                    <div className="sh-ledger-final-sum">
                      <p className="sh-ledger-final-label">All-in, per square foot</p>
                      <p className="sh-ledger-final-value">{fmt(content.pricing.perSqft)}</p>
                      <p className="sh-ledger-footnote">{content.pricing.footnote}</p>
                    </div>
                    <div className="sh-seal" role="img" aria-label={content.pricing.seal}>
                      <span className="sh-seal-inner">{content.pricing.seal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="sh-ledger-hint">Scroll — the ledger builds itself</p>
          </div>
        </section>

        {/* CONSTRUCTION PROGRESS */}
        <section id="progress" className="sh-progress" data-tour="Construction">
          <div className="sh-wrap">
            <p className="sh-eyebrow sh-rv">{content.progress.eyebrow}</p>
            <h2 className="sh-h2 sh-rv">{content.progress.title}</h2>
            <span className="sh-rule" aria-hidden="true" />
            <p className="sh-lede sh-rv">{content.progress.intro}</p>
            <div className="sh-progress-grid">
              <figure className="sh-progress-img sh-wipe sh-rv">
                <Img k="product-1" src={img('product-1', listing2Img)} alt="Sahaj Enclave II structure rising — concrete frame, brick infill and scaffolding under a blue sky" />
                <figcaption>1 October 2026 · structure and brickwork</figcaption>
              </figure>
              <div className="sh-progress-side">
                <div className="sh-progress-meter sh-rv">
                  <p className="sh-progress-meter-label">{content.progress.overallLabel}</p>
                  <div className="sh-progress-meter-bar" aria-hidden="true">
                    <span style={{ width: `${content.progress.overall}%` }} />
                  </div>
                </div>
                <ol className="sh-milestones">
                  {content.progress.milestones.map((m) => (
                    <li
                      key={m.when}
                      className={`sh-milestone${m.done ? ' is-done' : ''}${m.current ? ' is-current' : ''}`}
                    >
                      <span className="sh-milestone-when">{m.when}</span>
                      <span className="sh-milestone-what">{m.what}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="sh-quality sh-rv">
              <div className="sh-quality-img">
                <Img k="detail" src={img('detail', detailImg)} alt="Close-up of a solid wooden main door handle in warm sunlight" />
              </div>
              <div className="sh-quality-body">
                <h3 className="sh-h3">{content.progress.quality.title}</h3>
                <p className="sh-body">{content.progress.quality.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* THE HANDOVER — signature story, scrubbed by scroll */}
        <section id="story" className="sh-film" data-tour="The Handover">
          <div className="sh-wrap">
            <p className="sh-eyebrow sh-rv">{content.film.eyebrow}</p>
            <h2 className="sh-h2 sh-rv">{content.film.title}</h2>
            <span className="sh-rule" aria-hidden="true" />
          </div>
          <ScrollFrames
            frames={frames}
            alt="Hands exchanging house keys over a doorway, then a slow pull-back into a sunlit living room with a child's drawing on the wall"
            pinDistance="+=120%"
            stageHeight="92svh"
            className="sh-film-scrub"
          >
            <div className="sh-film-overlay">
              <p className="sh-film-caption">{content.film.caption}</p>
            </div>
          </ScrollFrames>
        </section>

        {/* RESIDENT VOICES */}
        <section id="voices" className="sh-voices" data-tour="Resident Voices">
          <div className="sh-wrap">
            <p className="sh-eyebrow sh-rv">{content.voices.eyebrow}</p>
            <h2 className="sh-h2 sh-rv">{content.voices.title}</h2>
            <span className="sh-rule" aria-hidden="true" />
            <p className="sh-lede sh-rv">{content.voices.intro}</p>
            <figure className="sh-voices-img sh-wipe sh-rv">
              <Img k="product-2" src={img('product-2', listing3Img)} alt="Green community courtyard at Sahaj Enclave in late-afternoon light, children playing as soft silhouettes" />
            </figure>
            <div className="sh-voice-grid">
              {content.voices.quotes.map((q) => (
                <blockquote className="sh-voice sh-rv" key={q.name}>
                  <p className="sh-voice-text">{q.text}</p>
                  <footer>
                    <cite className="sh-voice-name">{q.name}</cite>
                    <span className="sh-voice-detail">{q.detail}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* CONTACT + FOOTER */}
      <footer className="sh-footer">
        <div className="sh-wrap">
          <p className="sh-eyebrow sh-rv">{content.contact.eyebrow}</p>
          <h2 className="sh-h2 sh-rv">{content.contact.title}</h2>
          <span className="sh-rule" aria-hidden="true" />
          <div className="sh-contact-grid">
            <address className="sh-address sh-rv">
              {content.contact.address}<br />
              <a href={telHref}>{content.contact.phone}</a><br />
              <a href={`mailto:${email}`}>{email}</a>
            </address>
            <div className="sh-contact-side sh-rv">
              <p className="sh-body">{content.contact.hours}</p>
              <p className="sh-rera">{content.contact.rera}</p>
              <a className="sh-cta sh-cta-solid" href={mapsUrl} target="_blank" rel="noreferrer">Get directions</a>
            </div>
          </div>
          <div className="sh-footer-base">
            <p className="sh-footer-line">{content.footer.line}</p>
            <p className="sh-colophon">{content.footer.colophon}</p>
          </div>
        </div>
      </footer>

      <nav className="sh-quickbar" aria-label="Quick actions">
        <a href="#pricing">{content.cta.label}</a>
        <a href={telHref}>Call the site office</a>
      </nav>
    </div>
  );
}
