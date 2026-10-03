import React, { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCustom, Img, ScrollFrames, useReducedMotion, useTplScope } from '../../_shared';
import { content } from './content.js';
import './styles.css';
import heroImg from './assets/hero.webp';
import feature1Img from './assets/feature-1.webp';
import feature2Img from './assets/feature-2.webp';
import feature3Img from './assets/feature-3.webp';
import detailImg from './assets/detail.webp';

/* Scroll-driven hero frame sequence (72 frames): coral and sunshine
   paper shapes drifting upward in warm sunlight, replacing the old
   autoplay hero loop. */
const frameMods = import.meta.glob('./assets/frames/*.webp', { eager: true, as: 'url' });
const frames = Object.keys(frameMods).sort().map((k) => frameMods[k]);

gsap.registerPlugin(ScrollTrigger);

const FONT_ID = 'tpl-font-design-06-consumer';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap';

/* Server-safe word-mask headline: <span class="w"><span class="wi">word</span></span> */
function Words({ text, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={`pip-wm ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          {/* a real space between the inline-block word masks */}
          {i > 0 ? ' ' : null}
          <span className="w" aria-hidden="true">
            <span className="wi">{w}</span>
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

function StoreBadges({ tone = 'dark', name }) {
  return (
    <div className={`pip-badges pip-badges-${tone}`} aria-label={`Download ${name}`}>
      {content.hero.badges.map((b) => (
        <a key={b.store} className="pip-badge" href="#download">
          <span className={`pip-badge-icon pip-badge-icon-${b.icon}`} aria-hidden="true">
            {b.icon === 'play' ? <span className="pip-play-tri" aria-hidden="true" /> : null}
          </span>
          <span className="pip-badge-text">
            <small>{b.kicker}</small>
            <strong>{b.store}</strong>
          </span>
        </a>
      ))}
    </div>
  );
}

/* CSS-built phone frame; children render the screen. */
function PhoneShell({ children, className = '' }) {
  return (
    <div className={`pip-phone ${className}`}>
      <span className="pip-phone-notch" aria-hidden="true" />
      <div className="pip-phone-screen">{children}</div>
    </div>
  );
}

/* Hero phone: a friendly mini home screen, pure CSS. */
function HomeScreen({ name }) {
  return (
    <div className="pip-mini">
      <div className="pip-mini-bar">
        <span className="pip-brand-dot pip-brand-dot-sm" aria-hidden="true" />
        <span className="pip-mini-name">{name}</span>
        <span className="pip-mini-avatar" aria-hidden="true">A</span>
      </div>
      <p className="pip-mini-hello">Good morning, Anaya</p>
      <div className="pip-mini-balance">
        <small>Total balance</small>
        <strong>₹84,230</strong>
        <span className="pip-mini-trend">+4.2% this month</span>
      </div>
      <div className="pip-ring pip-ring-sm" style={{ '--p': 72 }}>
        <span>
          <strong>72%</strong>
          <small>of budget left</small>
        </span>
      </div>
      <ul className="pip-hbars" aria-hidden="true">
        <li><span>Food</span><i style={{ '--w': '64%' }} /></li>
        <li><span>Fun</span><i style={{ '--w': '38%' }} /></li>
        <li><span>Travel</span><i style={{ '--w': '52%' }} /></li>
      </ul>
    </div>
  );
}

/* The four assembling app screens — each a small styled card with a CSS-drawn viz. */
function ScreenViz({ id, data }) {
  if (id === 'budgets') {
    return (
      <div className="pip-scr">
        <div className="pip-scr-top"><span className="pip-scr-dot pip-scr-dot-coral" /><strong>Smart budgets</strong></div>
        <div className="pip-ring" style={{ '--p': 76 }}>
          <span><strong>{data.ringLabel}</strong><small>{data.ringSub}</small></span>
        </div>
        <ul className="pip-hbars" aria-hidden="true">
          {data.bars.map((b) => (
            <li key={b.label}><span>{b.label}</span><i style={{ '--w': `${b.w}%` }} /></li>
          ))}
        </ul>
      </div>
    );
  }
  if (id === 'insights') {
    return (
      <div className="pip-scr">
        <div className="pip-scr-top"><span className="pip-scr-dot pip-scr-dot-sun" /><strong>Instant insights</strong></div>
        <p className="pip-scr-label">This week</p>
        <div className="pip-vbars" aria-hidden="true">
          {data.bars.map((h, i) => (
            <i key={i} style={{ '--h': `${h}%` }} />
          ))}
        </div>
        <svg className="pip-spark" viewBox="0 0 100 36" aria-hidden="true">
          <polyline points="0,30 15,26 30,28 45,18 60,21 75,10 90,13" fill="none" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <p className="pip-scr-pill">{data.pill}</p>
      </div>
    );
  }
  if (id === 'wallets') {
    return (
      <div className="pip-scr">
        <div className="pip-scr-top"><span className="pip-scr-dot pip-scr-dot-teal" /><strong>Shared wallets</strong></div>
        <p className="pip-scr-wallet">{data.title}</p>
        <div className="pip-avatars" aria-hidden="true">
          {data.members.map((m) => (
            <span key={m} className="pip-avatar">{m}</span>
          ))}
        </div>
        <ul className="pip-split">
          {data.rows.map((r) => (
            <li key={r.text}><span>{r.text}</span><strong>{r.amt}</strong></li>
          ))}
        </ul>
        <span className="pip-scr-btn">Settle up</span>
      </div>
    );
  }
  /* rewards */
  return (
    <div className="pip-scr">
      <div className="pip-scr-top"><span className="pip-scr-dot pip-scr-dot-coral" /><strong>Rewards</strong></div>
      <p className="pip-scr-points"><strong>{data.points}</strong><span>pts</span></p>
      <p className="pip-scr-label">{data.tier}</p>
      <div className="pip-progress" aria-hidden="true"><i style={{ '--w': `${data.progress}%` }} /></div>
      <div className="pip-confetti" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <i key={i} className={`pip-confetti-${i % 4}`} />
        ))}
      </div>
      <span className="pip-scr-btn pip-scr-btn-sun">Redeem</span>
    </div>
  );
}

export default function Design06Consumer() {
  const { brand, img, contact, productName, price } = useCustom();
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

      /* Hero entrance: masked word-rise headline over the frame scrub. */
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.pip-hero-title .wi', { yPercent: 115 }, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07 }, 0.15)
        .fromTo('.pip-hero-eyebrow, .pip-hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.5)
        .fromTo('.pip-hero .pip-badges', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .fromTo('.pip-hero-rating', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.0);

      /* The phone + photo stage follows the pinned frame scrub, so its
         entrance plays when it scrolls into view (it used to run on load,
         off-screen): phone springs up with a soft overshoot, stickers pop
         in one by one, then a gentle idle float. */
      const stl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.pip-hero-stage', scroller: sc, start: 'top 85%', once: true },
      });
      stl.fromTo('.pip-hero-phone', { opacity: 0, y: 90, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.4)' }, 0)
        .fromTo(
          '.pip-sticker',
          { opacity: 0, scale: 0, rotation: (i, el) => parseFloat(el.dataset.tilt || '0') - 14 },
          {
            opacity: 1, scale: 1, rotation: (i, el) => parseFloat(el.dataset.tilt || '0'),
            duration: 0.7, ease: 'back.out(2.2)', stagger: 0.12,
          },
          0.45
        )
        .fromTo('.pip-hero-photo', { opacity: 0, y: 40, rotation: 10 }, { opacity: 1, y: 0, rotation: 6, duration: 1, ease: 'back.out(1.6)' }, 0.5)
        .to('.pip-hero-phone', { y: -12, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 1.2);

      /* Generic scroll reveals. */
      gsap.utils.toArray('.pip-rv').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, scroller: sc, start: 'top 88%', once: true },
          }
        );
      });
      gsap.utils.toArray('.pip-stagger').forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, scroller: sc, start: 'top 85%', once: true },
          }
        );
      });

      /* SPRING ASSEMBLY: desktop only (matchMedia, resize-safe). Each app
         screen springs into the phone frame with back.out(1.7) as its
         matching description scrolls into view, fanning into a deck.
         The phone column is sticky so the assembly stays visible. */
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px)', () => {
        const descs = gsap.utils.toArray('.pip-feat');
        const fan = [
          { rotation: -7, x: -16, y: 10 },
          { rotation: 4, x: 12, y: -6 },
          { rotation: -3, x: -8, y: 14 },
          { rotation: 8, x: 14, y: -10 },
        ];
        gsap.utils.toArray('.pip-screen').forEach((screen, i) => {
          const desc = descs[i];
          if (!desc || !fan[i]) return;
          gsap.fromTo(
            screen,
            { opacity: 0, y: 190, x: 0, rotation: 22, scale: 0.9 },
            {
              opacity: 1, y: fan[i].y, x: fan[i].x, rotation: fan[i].rotation, scale: 1,
              duration: 0.85, ease: 'back.out(1.7)',
              scrollTrigger: { trigger: desc, scroller: sc, start: 'top 72%', toggleActions: 'play none none reverse' },
            }
          );
        });
        descs.forEach((desc) => {
          ScrollTrigger.create({
            trigger: desc, scroller: sc, start: 'top 65%', end: 'bottom 40%',
            onToggle: (self) => desc.classList.toggle('is-active', self.isActive),
          });
        });
        return () => {
          descs.forEach((d) => d.classList.remove('is-active'));
        };
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced, scroller, rootRef]);

  return (
    <div ref={rootRef} className={`tpl-design-06-consumer${reduced ? ' pip-reduced' : ''}`}>
      {/* Zero-height sticky dock: the floating pill stays pinned to the top of
          the scroll area (the viewer's .tpl-scope or the window) without
          position: fixed, which would escape the viewer and cover its toolbar. */}
      <div className="pip-nav-dock">
        <header className="pip-nav">
          <a className="pip-brand" href="#hero">
            <span className="pip-brand-dot" aria-hidden="true" />
            {name}
          </a>
          <nav className="pip-links" aria-label="Primary">
            {content.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <a className="pip-btn pip-btn-small" href="#download">
            <span className="pip-cta-long">Get {name} free</span>
            <span className="pip-cta-short">Get the app</span>
          </a>
        </header>
      </div>

      <main>
        {/* HERO — scroll-scrubbed frame sequence.
            The pin stage (100svh) carries the frame canvas + the headline
            copy. The hero phone + photo stage is taller than a viewport, so
            it follows in normal flow right after the pin, still inside #hero
            so anchors, tour stops and entrance animations keep working. */}
        <section id="hero" className="pip-hero" data-tour={`Meet ${name}`}>
          <div className="pip-scrub" data-tour="Scrub the sunrise">
            <ScrollFrames
              frames={frames}
              alt="Coral and sunshine paper shapes drifting upward in warm sunlight"
              pinDistance="+=170%"
            >
              <div className="pip-hero-veil" aria-hidden="true" />
              <div className="pip-wrap pip-hero-inner">
                <p className="pip-eyebrow pip-hero-eyebrow">{content.hero.eyebrow}</p>
                <h1 className="pip-hero-title">
                  <Words text={content.hero.title} />
                </h1>
                <p className="pip-hero-sub">{content.hero.sub}</p>
                <StoreBadges name={name} />
                <p className="pip-hero-rating">
                  <span className="pip-stars" aria-hidden="true">★★★★★</span>
                  <span className="pip-sr">Rated 5 out of 5. </span>
                  {content.hero.rating}
                </p>
              </div>
            </ScrollFrames>
          </div>
          <div className="pip-hero-stage-wrap">
            <div className="pip-wrap pip-hero-stage">
              <div className="pip-hero-phone">
                <PhoneShell>
                  <HomeScreen name={name} />
                </PhoneShell>
                <span className="pip-sticker pip-sticker-a" data-tilt="-6">{content.hero.stickers[0]}</span>
                <span className="pip-sticker pip-sticker-b" data-tilt="5">{content.hero.stickers[1]}</span>
                <span className="pip-sticker pip-sticker-c" data-tilt="-4">{content.hero.stickers[2]}</span>
              </div>
              <figure className="pip-hero-photo">
                <Img k="hero" src={img('hero', heroImg)} alt="Hand holding a phone in warm sunlight with a soft golden bokeh" />
                <figcaption>{content.hero.photoCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* FEATURES — spring assembly */}
        <section id="features" className="pip-features" data-tour="Features">
          <div className="pip-wrap pip-panel">
            <p className="pip-eyebrow pip-rv">{content.featuresMeta.eyebrow}</p>
            <h2 className="pip-h2 pip-rv">{content.featuresMeta.title}</h2>
            <p className="pip-lede pip-rv">{content.featuresMeta.lede}</p>
            <div className="pip-asm">
              <div className="pip-asm-stage">
                <div className="pip-asm-phone">
                  <PhoneShell className="pip-asm-frame">
                    <div className="pip-asm-backdrop" aria-hidden="true">
                      <span className="pip-brand-dot pip-brand-dot-lg" />
                      <p>{name}</p>
                    </div>
                  </PhoneShell>
                  {/* Decorative previews: each mirrors the feature copy beside it,
                      so they stay out of the accessibility tree. Screens not yet
                      assembled wait (invisible) until their description arrives. */}
                  {content.features.map((f, i) => (
                    <div key={f.id} className={`pip-screen pip-screen-${i}`} aria-hidden="true">
                      <ScreenViz id={f.id} data={f.screen} />
                    </div>
                  ))}
                </div>
                <p className="pip-asm-hint" aria-hidden="true">Scroll — watch {name} assemble</p>
              </div>
              <div className="pip-asm-feats">
                {content.features.map((f, i) => (
                  <article key={f.id} className="pip-feat">
                    <span className="pip-feat-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="pip-h3">{f.title}</h3>
                    <p>{f.desc}</p>
                    <ul className="pip-feat-points">
                      {f.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* STORIES — reviews wall */}
        <section id="stories" className="pip-stories" data-tour="Stories">
          <div className="pip-wrap">
            <p className="pip-eyebrow pip-rv">{content.stories.eyebrow}</p>
            <h2 className="pip-h2 pip-rv">{content.stories.title}</h2>
            <div className="pip-reviews pip-stagger">
              {content.reviews.map((r) => (
                <figure className="pip-review" key={r.name}>
                  <div className="pip-stars" role="img" aria-label={`${r.stars} out of 5 stars`}>★★★★★</div>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption>
                    <strong>{r.name}</strong>
                    <span>{r.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <figure className="pip-banner pip-rv">
              <Img k="product-0" src={img('product-0', feature1Img)} alt="Friends around a picnic table in a sunny park looking at a phone together, faces turned away" />
              <figcaption>{content.stories.caption}</figcaption>
            </figure>
          </div>
        </section>

        {/* PLAYFUL STATS BAND */}
        <section className="pip-band" aria-label={`${name} in numbers`}>
          <div className="pip-wrap pip-band-grid">
            <div className="pip-band-img pip-rv">
              <Img k="product-1" src={img('product-1', feature2Img)} alt="Colourful abstract app screens floating in a warm studio" />
            </div>
            <div className="pip-band-copy">
              <h2 className="pip-h2 pip-rv">{content.band.title}</h2>
              <p className="pip-body pip-rv">{content.band.body}</p>
              <dl className="pip-stats pip-stagger">
                {content.band.stats.map((s) => (
                  <div key={s.label}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="steps" className="pip-steps" data-tour="How it works">
          <div className="pip-wrap pip-steps-grid">
            <div>
              <p className="pip-eyebrow pip-rv">{content.steps.eyebrow}</p>
              <h2 className="pip-h2 pip-rv">{content.steps.title}</h2>
              <ol className="pip-step-list pip-stagger">
                {content.steps.items.map((s, i) => (
                  <li key={s.title}>
                    <span className="pip-step-num" aria-hidden="true">{i + 1}</span>
                    <div>
                      <h3 className="pip-h3">{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="pip-steps-photo pip-rv">
              <Img k="product-2" src={img('product-2', feature3Img)} alt="A cup of coffee with latte art and a phone on a sunlit wooden table" />
              <figcaption>Small moments, smart money.</figcaption>
            </figure>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="pip-pricing" data-tour="Pricing">
          <div className="pip-wrap">
            <p className="pip-eyebrow pip-rv">{content.pricing.eyebrow}</p>
            <h2 className="pip-h2 pip-rv">{content.pricing.title}</h2>
            <div className="pip-tiers pip-stagger">
              {content.pricing.tiers.map((t, i) => (
                <article className={`pip-tier${t.hot ? ' is-hot' : ''}`} key={t.name}>
                  {t.hot ? <span className="pip-tier-flag">Most loved</span> : null}
                  <h3 className="pip-h3">{productName(i, t.name)}</h3>
                  <p className="pip-tier-price">
                    {t.price === 0 ? 'Free' : price(t.price)}
                    <span>{t.period}</span>
                  </p>
                  <p className="pip-tier-blurb">{t.blurb}</p>
                  <ul>
                    {t.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <a className={`pip-btn${t.hot ? '' : ' pip-btn-ghost'}`} href="#download">{t.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DOWNLOAD */}
        <section id="download" className="pip-download" data-tour={`Get ${name}`}>
          <div className="pip-wrap">
            <div className="pip-dl-panel pip-rv">
              <div className="pip-dl-copy">
                <h2 className="pip-h2">{content.download.title}</h2>
                <p className="pip-body">{content.download.sub}</p>
                <StoreBadges tone="light" name={name} />
                <p className="pip-dl-note">{content.download.note}</p>
                <p className="pip-dl-mail">
                  Questions? <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
              <figure className="pip-dl-photo">
                <Img k="detail" src={img('detail', detailImg)} alt="Close-up of a phone screen catching warm golden sunlight" />
              </figure>
            </div>
          </div>
        </section>
      </main>

      <footer className="pip-footer">
        <div className="pip-wrap">
          <div className="pip-foot-grid">
            <div className="pip-foot-brand">
              <a className="pip-brand pip-brand-light" href="#hero">
                <span className="pip-brand-dot" aria-hidden="true" />
                {name}
              </a>
              <p>{content.brand.tagline}</p>
              <p><a href={`mailto:${email}`}>{email}</a></p>
            </div>
            {content.footer.cols.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}><a href={l.href}>{l.label}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <p className="pip-foot-line">{content.footer.line}</p>
        </div>
      </footer>
    </div>
  );
}
