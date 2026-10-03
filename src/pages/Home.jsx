import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories.js';
import { brandFor } from '../templates/_shared/brand.js';
import { loadCategory } from '../lib/routes.js';

const HERO_SLIDES = [
  { img: '/platform/hero-jewelry.webp', label: 'Jewelry' },
  { img: '/platform/hero-coffee.webp', label: 'Coffee' },
  { img: '/platform/hero-fashion.webp', label: 'Fashion' },
  { img: '/platform/hero-tech.webp', label: 'Technology' },
  { img: '/platform/hero-travel.webp', label: 'Travel' },
];

function Hero() {
  const [idx, setIdx] = useState(0);
  // Cinematic entrance (ivory mask draws up, copy rises) runs in CSS — see
  // .hhero-mask / .hhero-content in atelier.css — so the landing page needs no
  // animation library.

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section className="hhero">
      {HERO_SLIDES.map((s, i) => (
        <div key={s.img} className={`hhero-slide ${i === idx && !reduced ? 'on' : i === 0 && reduced ? 'on' : ''}`}>
          {/* Slides advance in order, so only the current and the next image need
              to exist: first paint fetches 2 images instead of 5. */}
          {i <= idx + 1 && (
            <img src={s.img} alt={`${s.label} — premium website experience`}
              fetchPriority={i === 0 ? 'high' : 'low'} decoding={i === 0 ? 'sync' : 'async'} />
          )}
        </div>
      ))}
      <div className="hhero-veil" />
      <div className="hhero-mask" />
      <div className="hhero-content">
        <p className="eyebrow">The Website Experience Library</p>
        <h1>THE WEB,<br /><em>REIMAGINED.</em></h1>
        <p className="hhero-sub">Explore distinctive digital experiences across the world's most recognizable industries — ten industries, ten art-directed websites each, every one downloadable.</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link className="btn btn-solid" to="#categories" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('categories');
            if (window.__lenis && el) window.__lenis.scrollTo(el, { duration: 1.4 });
            else el?.scrollIntoView({ behavior: 'smooth' });
          }}>Explore experiences</Link>
          <Link className="btn" style={{ borderColor: 'rgba(255,253,248,.5)', color: '#FFFDF8' }} to="/category/jewelry">Enter Jewelry →</Link>
        </div>
      </div>
      <div className="hhero-ind">
        {HERO_SLIDES.map((s, i) => (
          <button key={s.label} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)}>{s.label}</button>
        ))}
      </div>
    </section>
  );
}

function CategoryShowcase() {
  const nav = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const els = gridRef.current?.querySelectorAll('.cat-card');
    if (!els) return undefined;
    // Cards rise in as they enter (CSS transition on .cat-card.is-in).
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return undefined; }
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { threshold: 0.1 });
    els.forEach((el) => { el.classList.add('will-rise'); io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="categories">
      <div className="sec-head">
        <p className="eyebrow">Industries</p>
        <h2>Ten worlds, <em>one library.</em></h2>
        <p className="sec-sub">Each industry is its own visual language — its own palettes, typography, motion and rituals. Step inside one.</p>
      </div>
      <div className="cat-grid" ref={gridRef}>
        {CATEGORIES.map((c) => {
          const live = c.status === 'live';
          const building = c.status === 'building';
          return (
            <div
              key={c.slug}
              className={`cat-card ${live ? '' : 'soon'}`}
              onClick={() => live && nav(`/category/${c.slug}`)}
              onMouseEnter={() => live && loadCategory()}
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && live && nav(`/category/${c.slug}`)}
              aria-label={`${brandFor(c.slug)?.name || c.name} (${c.name}) — ${live ? '10 experiences' : c.status}`}
            >
              <img src={`/platform/cat-${c.slug}-card.webp`} alt={`${c.name} industry preview`} loading="lazy" decoding="async" />
              <div className="veil" />
              <span className="cat-count">{live ? '10 experiences' : building ? 'In production' : 'Coming soon'}</span>
              <div className="cat-meta">
                <span className="num">{c.num} — {c.name}</span>
                <h3>{brandFor(c.slug)?.name || c.name}</h3>
                <p>{c.tagline}</p>
              </div>
              {live && <span className="go">→</span>}
              {!live && <div className="cat-soon">{building ? 'In production' : 'Coming soon'}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="sec-head">
          <p className="eyebrow">The standard</p>
          <h2>Not templates. <em>Experiences.</em></h2>
          <p className="sec-sub">Every design is a complete website with its own layout, typography, photography and motion personality. Open one fullscreen, customize it with your brand, and download it as a standalone site.</p>
        </div>
      </section>
    </main>
  );
}
