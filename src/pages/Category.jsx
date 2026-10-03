import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryBySlug, designsFor } from '../data/library.js';
import { store } from '../lib/store.js';
import { toast } from '../lib/toast.jsx';
import { brandFor } from '../templates/_shared/brand.js';
import { prefetchDesign } from '../lib/routes.js';

function DesignCard({ d, cat, fav, onFav, onCompare, compared }) {
  const nav = useNavigate();
  const thumb = d.kind === 'static' ? d.src.replace('/index.html', '/thumb.webp') : (d.thumb || '');
  const open = () => { store.pushRecent(cat.slug + ':' + d.id); nav(`/category/${cat.slug}/design/${d.id}`); };
  return (
    <article className="card" onMouseEnter={() => prefetchDesign(d)} onFocus={() => prefetchDesign(d)}>
      <div className="card-media" onClick={open}>
        {thumb && <img src={thumb} alt={`${d.name} — ${d.style}`} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
        <span className="card-num">Design {d.num}</span>
        <span className="card-tag">{d.tag}</span>
        <button className={`card-fav ${fav ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); onFav(d.id); }} title="Save to favorites">{fav ? '♥' : '♡'}</button>
      </div>
      <div className="card-body">
        <h3>{d.name}</h3>
        <p className="card-blurb">{d.blurb}</p>
        <dl className="spec">
          <dt>Style</dt><dd>{d.style}</dd>
          <dt>Animation</dt><dd>{d.animation}</dd>
          <dt>Typography</dt><dd>{d.typography}</dd>
          <dt>Layout</dt><dd>{d.layout}</dd>
          <dt>Mood</dt><dd>{d.mood}</dd>
        </dl>
        <button className="card-open" onClick={open}>Open design →</button>
        <button className="vbtn" style={{ width: '100%', marginTop: '.6rem' }} onClick={() => onCompare(d.id)}>
          {compared ? '✓ In compare' : '+ Compare'}
        </button>
      </div>
    </article>
  );
}

export default function Category() {
  const { slug } = useParams();
  const nav = useNavigate();
  const cat = categoryBySlug(slug);
  const designs = useMemo(() => designsFor(slug), [slug]);
  const [favs, setFavs] = useState(store.favs());
  const [recent, setRecent] = useState(store.recent());
  const [compare, setCompare] = useState([]);

  useEffect(() => { window.scrollTo(0, 0); setRecent(store.recent()); }, [slug]);

  if (!cat) return <main className="section"><h2>Unknown category</h2></main>;

  if (cat.status !== 'live') {
    return (
      <main className="section" style={{ textAlign: 'center', padding: '12vh 2rem' }}>
        <p className="eyebrow">{cat.num} — {cat.tagline}</p>
        <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', margin: '1rem 0' }}>{cat.name}</h2>
        <p style={{ opacity: 0.65, maxWidth: '36rem', margin: '0 auto 2rem' }}>
          This collection is on the loom — ten new website experiences are being crafted right now.
        </p>
        <button className="vbtn primary" onClick={() => nav('/')}>Back to the library</button>
      </main>
    );
  }

  const toggleFav = (id) => { setFavs(store.toggleFav(slug + ':' + id)); toast(favs.includes(slug + ':' + id) ? 'Removed from favorites' : 'Saved to favorites ♡'); };
  const toggleCompare = (id) => {
    setCompare((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id);
      if (c.length >= 3) { toast('You can compare up to 3 designs'); return c; }
      return [...c, id];
    });
  };

  const favDesigns = designs.filter((d) => favs.includes(slug + ':' + d.id));
  const recentDesigns = recent.map((r) => { const [cs, id] = r.split(':'); return cs === slug ? designs.find((d) => d.id === id) : null; }).filter(Boolean);

  return (
    <main style={{ paddingTop: '4.5rem' }}>
      <section className="hhero" style={{ minHeight: '62svh' }}>
        <div className="hhero-slide on"><img src={`/platform/cat-${slug}.webp`} alt={`${cat.name}`} fetchPriority="high" /></div>
        <div className="hhero-veil" />
        <div className="hhero-content">
          <p className="eyebrow">{cat.num} — {cat.name}</p>
          <h1>{brandFor(slug)?.name || cat.name}</h1>
          <p className="hhero-sub">{cat.tagline}. Ten completely different website designs — pick a direction.</p>
        </div>
      </section>

      <section className="section" id="designs">
        <div className="sec-head">
          <p className="eyebrow">The collection</p>
          <h2>Ten <em>directions.</em></h2>
        </div>
        {designs.length === 0 && (
          <p className="sec-sub" style={{ fontStyle: 'italic' }}>This category is in production — ten designs are being art-directed now. The Jewelry library is live today.</p>
        )}
        <div className="grid">
          {designs.map((d) => (
            <DesignCard key={d.id} d={d} cat={cat} fav={favs.includes(slug + ':' + d.id)} onFav={toggleFav} onCompare={toggleCompare} compared={compare.includes(d.id)} />
          ))}
        </div>
      </section>

      {recentDesigns.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="sec-head"><p className="eyebrow">Your trail</p><h2>Recently <em>explored.</em></h2></div>
          <div className="grid">
            {recentDesigns.slice(0, 4).map((d) => (
              <DesignCard key={'r' + d.id} d={d} cat={cat} fav={favs.includes(slug + ':' + d.id)} onFav={toggleFav} onCompare={toggleCompare} compared={compare.includes(d.id)} />
            ))}
          </div>
        </section>
      )}

      {favDesigns.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="sec-head"><p className="eyebrow">Saved</p><h2>My <em>favorites.</em></h2></div>
          <div className="grid">
            {favDesigns.map((d) => (
              <DesignCard key={'f' + d.id} d={d} cat={cat} fav onFav={toggleFav} onCompare={toggleCompare} compared={compare.includes(d.id)} />
            ))}
          </div>
        </section>
      )}

      {compare.length > 0 && (
        <div className="compare-tray">
          <span style={{ fontSize: '.66rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)' }}>Compare {compare.length}/3</span>
          {compare.map((id) => {
            const d = designs.find((x) => x.id === id);
            return <span key={id} className="tchip">{d?.name} <button onClick={() => toggleCompare(id)}>✕</button></span>;
          })}
          <button className="btn btn-solid btn-sm" onClick={() => nav(`/category/${slug}/design/${compare[0]}?compare=${compare.join(',')}`)}>Compare</button>
          <button className="vbtn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => setCompare([])}>✕</button>
        </div>
      )}
    </main>
  );
}
