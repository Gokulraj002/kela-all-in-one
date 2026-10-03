import React, { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { categoryBySlug, designsFor } from '../data/library.js';
import { store } from '../lib/store.js';
import { toast } from '../lib/toast.jsx';
import { CustomProvider, scopeVars } from '../templates/_shared/CustomContext.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startSmoothScroll } from '../templates/_shared/smoothScroll.js';
import { brandDefaults, customTokensCss } from '../templates/_shared/brand.js';

gsap.registerPlugin(ScrollTrigger);
// Native templates scroll inside .tpl-scope, not the window. ScrollTrigger's
// default for non-body scrollers is transform pinning, which is applied after
// the browser has already painted the scroll — pinned sections visibly shake.
// Fixed pinning stays put (.viewer has no transformed ancestors to break it).
ScrollTrigger.defaults({ pinType: 'fixed' });

const FONT_PAIRS = ['Fraunces|Manrope', 'Playfair Display|Manrope', 'DM Serif Display|Inter', 'Cormorant Garamond|Manrope', 'Bodoni Moda|Plus Jakarta Sans', 'Libre Baskerville|Instrument Sans', 'Fraunces|Space Grotesk'];
const STATIC_SECTIONS = [['hero', 'Hero'], ['collections', 'Collections'], ['products', 'Creations'], ['craftsmanship', 'Craft'], ['story', 'Maison'], ['contact', 'Contact']];

/* ---------- image downscale ---------- */
function downscale(file, maxDim) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * s), h = Math.round(img.height * s);
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ dataURL: cv.toDataURL('image/jpeg', 0.85), w, h });
    };
    img.onerror = reject; img.src = url;
  });
}
function downloadBlob(blob, name) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
}

/* Page colour of a static template inside its iframe (body, else html). */
function staticBackground(frame) {
  try {
    const d = frame.contentDocument;
    const pick = (el) => { const c = el && getComputedStyle(el).backgroundColor; return c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c) ? c : null; };
    return pick(d.body) || pick(d.documentElement);
  } catch (e) { return null; }
}

/* ================= VIEWER ================= */
export default function Viewer() {
  const { slug, id } = useParams();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const cat = categoryBySlug(slug);
  const designs = designsFor(slug);
  const design = designs.find((d) => d.id === id);
  const compareIds = (params.get('compare') || '').split(',').filter(Boolean);

  const ckey = `${slug}:${id}`;
  const [custom, setCustomState] = useState(() => store.custom(ckey) || {});
  // Kela brand defaults (name, contact, brand colour toned for the design's
  // background) sit under whatever the user customised.
  const [pageBg, setPageBg] = useState(null);
  const brandBase = useMemo(() => brandDefaults(slug, pageBg), [slug, pageBg]);
  const effective = useMemo(() => ({ ...brandBase, ...custom }), [brandBase, custom]);
  const [panel, setPanel] = useState(null); // custom | upload | source
  const [dlOpen, setDlOpen] = useState(false);
  const [favs, setFavs] = useState(store.favs());
  const [loading, setLoading] = useState(true);
  const [presenting, setPresenting] = useState(false);
  const frameRef = useRef(null);
  const scopeRef = useRef(null);
  const rootRef = useRef(null);

  const save = useCallback((c) => { setCustomState(c); store.setCustom(ckey, c); }, [ckey]);
  const patch = useCallback((p) => save({ ...custom, ...p }), [custom, save]);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 8000); return () => clearTimeout(t); }, [id]);

  /* ----- native font loading ----- */
  useEffect(() => {
    if (!design || design.kind === 'static' || !custom.fontPair) return;
    const [d, b] = custom.fontPair.split('|');
    const href = `https://fonts.googleapis.com/css2?family=${d.replace(/ /g, '+')}:wght@300;400;500;600&family=${b.replace(/ /g, '+')}:wght@300;400;500;600;700&display=swap`;
    let link = document.getElementById('atelier-font-override');
    if (!link) { link = document.createElement('link'); link.id = 'atelier-font-override'; link.rel = 'stylesheet'; document.head.appendChild(link); }
    link.href = href;
  }, [custom.fontPair, design]);

  if (!design) return <main className="section"><h2>Design not found</h2></main>;

  const isStatic = design.kind === 'static';
  const fav = favs.includes(ckey);

  /* ----- static bridge ----- */
  const applyStatic = (c) => {
    // upload panel stores flat product-N keys; the static contract wants a products map
    const products = {};
    Object.keys(c.images || {}).forEach((k) => {
      const m = k.match(/^product-(\d+)$/);
      if (m && c.images[k]) products[m[1]] = c.images[k];
    });
    const apply = () => {
      try {
        const w = frameRef.current?.contentWindow;
        if (w && typeof w.applyCustomization === 'function') {
          w.applyCustomization({
            brandName: c.brandName, primaryColor: c.primaryColor, accentColor: c.accentColor,
            fontPair: c.fontPair, currency: c.currency, contactEmail: c.contactEmail,
            instagramUrl: c.instagramUrl, productNames: c.productNames,
            logoImage: c.images?.logo, heroImage: c.images?.hero,
            productImages: Object.keys(products).length ? products : undefined,
          });
          return;
        }
      } catch (e) { /* file:// fallback below */ }
      try {
        const u = new URL(design.src, window.location.href);
        if (c.brandName) u.searchParams.set('brand', c.brandName);
        if (c.primaryColor) u.searchParams.set('primary', c.primaryColor);
        if (c.accentColor) u.searchParams.set('accent', c.accentColor);
        if (frameRef.current.src !== u.href) frameRef.current.src = u.href;
      } catch (e2) { toast('Live preview needs the app served over HTTP'); }
    };
    if (frameRef.current?.contentWindow) apply();
  };
  const pushCustom = (c) => { save(c); if (isStatic) setTimeout(() => applyStatic({ ...brandBase, ...c }), 60); else toast('Preview updated'); };

  /* ----- compare ----- */
  if (compareIds.length > 0) {
    const list = compareIds.map((cid) => designs.find((d) => d.id === cid)).filter(Boolean);
    return (
      <div className="viewer" ref={rootRef}>
        <div className="vbar">
          <button className="vbtn" onClick={() => nav(`/category/${slug}`)}>← Back</button>
          <div className="vtitle"><strong>Compare designs</strong></div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '1.4rem', display: 'grid', gridTemplateColumns: `repeat(${list.length}, minmax(280px, 1fr))`, gap: '1.4rem', background: 'var(--bg)' }}>
          {list.map((d) => (
            <div key={d.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
              <div style={{ aspectRatio: '16/11', overflow: 'hidden', background: '#eee' }}>
                {d.src ? (
                  <iframe src={d.src} title={d.name} style={{ width: '200%', height: '200%', border: 'none', transform: 'scale(.5)', transformOrigin: 'top left', pointerEvents: 'none' }} loading="lazy" />
                ) : (
                  // Native React designs have no standalone page to frame — show their preview.
                  <img src={d.thumb} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} loading="lazy" />
                )}
              </div>
              <div style={{ padding: '1.2rem' }}>
                <div style={{ fontSize: '.6rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.6rem' }}>Design {d.num} · {d.tag}</div>
                <h4 style={{ fontFamily: 'var(--fd)', fontSize: '1.25rem', marginBottom: '.8rem' }}>{d.name}</h4>
                <dl className="spec">
                  <dt>Style</dt><dd>{d.style}</dd><dt>Animation</dt><dd>{d.animation}</dd>
                  <dt>Typography</dt><dd>{d.typography}</dd><dt>Layout</dt><dd>{d.layout}</dd><dt>Mood</dt><dd>{d.mood}</dd>
                </dl>
                <button className="btn btn-solid btn-sm" style={{ width: '100%', marginTop: '1rem' }} onClick={() => nav(`/category/${slug}/design/${d.id}`)}>Open design</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ----- presentation ----- */
  const startPresent = () => {
    if (isStatic) {
      try { if (!frameRef.current.contentWindow.document) throw 0; }
      catch (e) { toast('Presentation needs the app served over HTTP'); return; }
    }
    setPresenting(true); setPanel(null);
  };

  return (
    <div className="viewer" ref={rootRef}>
      <div className="vbar">
        <button className="vbtn" onClick={() => nav(`/category/${slug}`)}>← <span>Designs</span></button>
        <div className="vtitle"><span>{design.num}</span><strong>{design.name}</strong></div>
        <div className="vtools">
          <button className="vbtn" onClick={() => rootRef.current?.requestFullscreen?.()}>Experience</button>
          <button className={`vbtn ${presenting ? 'on' : ''}`} onClick={() => presenting ? setPresenting(false) : startPresent()}>Present</button>
          <button className={`vbtn ${panel === 'custom' ? 'on' : ''}`} onClick={() => setPanel(panel === 'custom' ? null : 'custom')}>Customize</button>
          <button className={`vbtn ${panel === 'upload' ? 'on' : ''}`} onClick={() => setPanel(panel === 'upload' ? null : 'upload')}>Upload</button>
          <button className={`vbtn ${panel === 'source' ? 'on' : ''}`} onClick={() => setPanel(panel === 'source' ? null : 'source')}>Source</button>
          <button className="vbtn vbtn-accent" onClick={() => setDlOpen(!dlOpen)}>Download ▾</button>
          <button className={`vbtn ${fav ? 'on' : ''}`} style={{ fontSize: '.95rem' }} onClick={() => { setFavs(store.toggleFav(ckey)); }}>♡</button>
        </div>
      </div>

      <div className="vstage">
        {isStatic ? (
          <iframe ref={frameRef} src={design.src} title={design.name} allow="fullscreen"
            onLoad={() => {
              setLoading(false);
              const bg = staticBackground(frameRef.current);
              setPageBg(bg);
              setTimeout(() => applyStatic({ ...brandDefaults(slug, bg), ...custom }), 400);
            }} />
        ) : (
          <NativeStage design={design} category={slug} custom={effective} scopeRef={scopeRef} onReady={() => setLoading(false)} onBackground={setPageBg} />
        )}
        <div className={`vloading ${!loading ? 'gone' : ''}`}><div className="shimmer" /><span>Preparing the experience…</span></div>
      </div>

      {panel === 'custom' && <CustomizePanel design={design} custom={custom} defaults={brandBase} onPatch={pushCustom} onClose={() => setPanel(null)} isStatic={isStatic} frameRef={frameRef} />}
      {panel === 'upload' && <UploadPanel custom={custom} onPatch={pushCustom} onClose={() => setPanel(null)} />}
      {panel === 'source' && <SourceModal design={design} onClose={() => setPanel(null)} />}
      {dlOpen && <DownloadMenu design={design} slug={slug} custom={effective} onClose={() => setDlOpen(false)} isStatic={isStatic} />}
      {presenting && <PresentBar design={design} isStatic={isStatic} frameRef={frameRef} scopeRef={scopeRef} onExit={() => setPresenting(false)} />}
    </div>
  );
}

/* ---------- native template stage ---------- */
function NativeStage({ design, category, custom, scopeRef, onReady, onBackground }) {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    let alive = true;
    design.component().then((m) => { if (alive) { setComp(() => m.default); onReady(); } });
    return () => { alive = false; };
  }, [design]);
  useEffect(() => { const t = setTimeout(onReady, 6000); return () => clearTimeout(t); }, []);
  // The scroll area sits below the toolbar and is shorter than the window, so
  // 100vh sections overflow it and top: 0 fixed headers land under the toolbar.
  // Templates size full-screen/pinned stages with height: var(--tpl-vh, 100svh)
  // and anchor fixed layers with top: var(--tpl-top, 0px); exports fall back to
  // the real viewport.
  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;
    const setVh = () => {
      el.style.setProperty('--tpl-vh', `${el.clientHeight}px`);
      el.style.setProperty('--tpl-top', `${Math.round(el.getBoundingClientRect().top)}px`);
    };
    setVh();
    const ro = new ResizeObserver(setVh);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scopeRef]);
  // Templates create their triggers before late layout settles (pins added by
  // child components, images, webfonts, panel resizes). Re-measure whenever the
  // content height or the scroll viewport changes so reveals and pins fire at
  // the right scroll positions.
  useEffect(() => {
    const el = scopeRef.current;
    if (!Comp || !el) return;
    let t = 0;
    let last = '';
    const refresh = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const content = el.firstElementChild;
        const sig = `${el.clientWidth}x${el.clientHeight}:${content ? content.offsetHeight : 0}`;
        if (sig === last) return;
        last = sig;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      }, 200);
    };
    refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    const ro = new ResizeObserver(refresh);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    const stopSmooth = startSmoothScroll(el);
    return () => { clearTimeout(t); ro.disconnect(); stopSmooth(); };
  }, [Comp, scopeRef]);
  // Tone the brand colour for this design's page colour before first paint.
  useLayoutEffect(() => {
    const root = scopeRef.current?.firstElementChild;
    if (!Comp || !root) return;
    const cs = getComputedStyle(root);
    onBackground(cs.getPropertyValue('--color-background').trim() || cs.backgroundColor);
  }, [Comp, scopeRef, onBackground]);
  const tokensCss = customTokensCss(design.id, custom, category);
  return (
    <>
      {/* beside the scope, not inside it: the scope's first child must stay the template root */}
      {tokensCss && <style>{tokensCss}</style>}
      <div ref={scopeRef} className={`tpl-scope tpl-${design.id}`} style={scopeVars(custom)}>
        <CustomProvider value={custom}>
          <Suspense fallback={null}>{Comp ? <Comp /> : null}</Suspense>
        </CustomProvider>
      </div>
    </>
  );
}

/* ---------- customize panel ---------- */
function CustomizePanel({ design, custom, defaults = {}, onPatch, onClose, isStatic, frameRef }) {
  const [productNames, setProductNames] = useState(custom.productNames || []);
  useEffect(() => {
    if (!isStatic || productNames.length) return;
    try {
      const tc = frameRef.current?.contentWindow?.TEMPLATE_CONTENT;
      if (tc?.products) setProductNames(tc.products.map((p) => p.name));
    } catch (e) { /* ignore */ }
  }, []);
  const set = (k, v) => onPatch({ ...custom, [k]: v });
  return (
    <aside className="panel">
      <div className="panel-head"><h3>Customize template</h3><button className="panel-x" onClick={onClose}>✕</button></div>
      <div className="panel-body">
        <label className="fld"><span>Brand name</span><input value={custom.brandName || ''} onChange={(e) => set('brandName', e.target.value)} placeholder={defaults.brandName || 'Your brand'} /></label>
        <div className="fld-row">
          <label className="fld"><span>Primary color</span><input type="color" value={custom.primaryColor || design.colors?.primary || '#35312C'} onChange={(e) => set('primaryColor', e.target.value)} /></label>
          <label className="fld"><span>Accent color</span><input type="color" value={custom.accentColor || defaults.accentColor || design.colors?.accent || '#A9884B'} onChange={(e) => set('accentColor', e.target.value)} /></label>
        </div>
        <label className="fld"><span>Font pairing</span>
          <select value={custom.fontPair || design.fontPair} onChange={(e) => set('fontPair', e.target.value)}>
            {FONT_PAIRS.map((p) => <option key={p} value={p}>{p.replace('|', ' + ')}</option>)}
          </select>
        </label>
        <div className="fld-row">
          <label className="fld"><span>Currency</span>
            <select value={custom.currency || '₹'} onChange={(e) => set('currency', e.target.value)}>
              {['₹', '$', '€', '£'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="fld"><span>Contact email</span><input type="email" value={custom.contactEmail || ''} onChange={(e) => set('contactEmail', e.target.value)} placeholder={defaults.contactEmail || 'hello@brand.com'} /></label>
        </div>
        <label className="fld"><span>Instagram URL</span><input type="url" value={custom.instagramUrl || ''} onChange={(e) => set('instagramUrl', e.target.value)} placeholder={defaults.instagramUrl || 'https://instagram.com/…'} /></label>
        {isStatic && productNames.length > 0 && (
          <div className="fld"><span>Product names</span>
            {productNames.map((n, i) => (
              <input key={i} value={(custom.productNames || [])[i] ?? n} style={{ marginBottom: '.5rem' }}
                onChange={(e) => { const arr = [...((custom.productNames || productNames))]; arr[i] = e.target.value; set('productNames', arr); }} />
            ))}
          </div>
        )}
        <p className="panel-note">Changes apply instantly and are saved on this device as your customized copy.</p>
        <div style={{ display: 'flex', gap: '.8rem' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => { store.delCustom(`${design.id}`); onPatch({}); toast('Customization reset'); }}>Reset</button>
        </div>
      </div>
    </aside>
  );
}

/* ---------- upload panel ---------- */
const ZONES = [
  { key: 'logo', label: 'Logo', max: 800 },
  { key: 'hero', label: 'Hero image', max: 1600 },
  { key: 'product-0', label: 'Product 1 image', max: 1200 },
  { key: 'product-1', label: 'Product 2 image', max: 1200 },
  { key: 'product-2', label: 'Product 3 image', max: 1200 },
  { key: 'product-3', label: 'Product 4 image', max: 1200 },
  { key: 'detail', label: 'Detail image', max: 1200 },
];
function UploadPanel({ custom, onPatch, onClose }) {
  const [tick, setTick] = useState(0);
  const images = custom.images || {};
  const handle = async (file, z) => {
    if (!file || !/^image\//.test(file.type)) { toast('Please choose an image file'); return; }
    try {
      const { dataURL, w, h } = await downscale(file, z.max);
      const next = { ...custom, images: { ...images, [z.key]: dataURL, [z.key + '_name']: file.name } };
      onPatch(next); setTick((t) => t + 1);
      toast(`${z.label} updated — ${w}×${h}`);
    } catch (e) { toast('Could not read that image'); }
  };
  const remove = (z) => {
    const imgs = { ...images }; delete imgs[z.key]; delete imgs[z.key + '_name'];
    onPatch({ ...custom, images: imgs }); setTick((t) => t + 1);
    toast(z.label + ' restored');
  };
  return (
    <aside className="panel">
      <div className="panel-head"><h3>Your imagery</h3><button className="panel-x" onClick={onClose}>✕</button></div>
      <div className="panel-body" key={tick}>
        <p className="panel-note">Drop an image to replace the demo asset in the live preview. PNG, JPG or WEBP.</p>
        {ZONES.map((z) => (
          <DropZone key={z.key} z={z} cur={images[z.key]} name={images[z.key + '_name']} onFile={(f) => handle(f, z)} onRemove={() => remove(z)} />
        ))}
      </div>
    </aside>
  );
}
function DropZone({ z, cur, name, onFile, onRemove }) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  return (
    <div className={`dz ${over ? 'over' : ''}`}
      onClick={() => input.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); onFile(e.dataTransfer.files?.[0]); }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.6rem' }}>
        <strong style={{ fontSize: '.7rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{z.label}</strong>
      </div>
      {cur ? <img src={cur} alt="" /> : <div className="dz-hint">Drop your image here<br />or click to browse</div>}
      <div className="dz-meta">
        {cur ? <><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '55%' }}>{name}</span>
          <span className="dz-btns"><button onClick={(e) => { e.stopPropagation(); input.current?.click(); }}>Replace</button>
          <button onClick={(e) => { e.stopPropagation(); onRemove(); }}>Remove</button></span></>
          : <span>Demo asset in use</span>}
      </div>
      <input ref={input} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => onFile(e.target.files?.[0])} />
    </div>
  );
}

/* ---------- source modal ---------- */
const SRC_FILES = ['index.html', 'styles.css', 'main.js', 'content.js', 'README.md'];
function SourceModal({ design, onClose }) {
  const [tab, setTab] = useState(0);
  const [code, setCode] = useState('Loading…');
  useEffect(() => {
    if (design.kind !== 'static') { setCode('Native React template — download the source .zip for the full project.'); return; }
    setCode('Loading…');
    const base = design.src.replace('/index.html', '');
    fetch(`${base}/${SRC_FILES[tab]}`).then((r) => { if (!r.ok) throw 0; return r.text(); })
      .then(setCode).catch(() => setCode('Source is available when the app is served over HTTP.'));
  }, [tab, design]);
  const copy = () => {
    (navigator.clipboard?.writeText(code) || Promise.reject()).then(() => toast('Code copied'), () => toast('Copy failed'));
  };
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head"><h3>Template source</h3><button className="panel-x" onClick={onClose}>✕</button></div>
        <div style={{ display: 'flex', gap: '.4rem', padding: '1rem 1.6rem 0', flexWrap: 'wrap' }}>
          {design.kind === 'static' && SRC_FILES.map((f, i) => (
            <button key={f} className={`vbtn ${i === tab ? 'on' : ''}`} onClick={() => setTab(i)}>{f}</button>
          ))}
        </div>
        <pre style={{ margin: '1.1rem 1.6rem', background: '#211D19', color: '#EDE6D8', borderRadius: 8, padding: '1.4rem', overflow: 'auto', flex: 1, minHeight: 280, fontSize: '.78rem', lineHeight: 1.6 }}>
          <code style={{ fontFamily: 'ui-monospace,Menlo,Consolas,monospace', whiteSpace: 'pre' }}>{code}</code>
        </pre>
        <div style={{ display: 'flex', gap: '.8rem', padding: '1.2rem 1.6rem', borderTop: '1px solid var(--line-soft)' }}>
          <button className="btn btn-ghost btn-sm" onClick={copy}>Copy code</button>
          <button className="btn btn-solid btn-sm" onClick={() => { if (design.kind === 'static') downloadBlob(new Blob([code], { type: 'text/plain' }), `${design.id}-${SRC_FILES[tab]}`); }}>Download file</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- download menu ---------- */
const STATIC_FILES = ['index.html', 'styles.css', 'main.js', 'content.js', 'README.md'];
const STATIC_IMGS = ['assets/images/hero.webp', 'assets/images/product-1.webp', 'assets/images/product-2.webp', 'assets/images/product-3.webp', 'assets/images/craft.webp'];

async function getJSZip() {
  const { default: JSZip } = await import('jszip');
  return JSZip;
}

function DownloadMenu({ design, slug, custom, onClose, isStatic }) {
  const zipUrl = (kind) => `/downloads/${design.id}-${kind}.zip`;
  const go = (url, label) => {
    const a = document.createElement('a'); a.href = url; a.download = url.split('/').pop();
    document.body.appendChild(a); a.click(); a.remove();
    toast('Downloading ' + label); onClose();
  };
  /* static templates: build source/assets zips on demand (needs HTTP) */
  const buildStaticZip = async (kind) => {
    onClose(); toast('Preparing ' + design.name + '…');
    try {
      const JSZip = await getJSZip();
      const zip = new JSZip();
      const base = design.src.replace('/index.html', '');
      const get = async (p, bin) => {
        const r = await fetch(`${base}/${p}`); if (!r.ok) throw new Error(p);
        return bin ? r.arrayBuffer() : r.text();
      };
      if (kind === 'source') {
        for (const f of STATIC_FILES) zip.file(f, await get(f));
        for (const p of STATIC_IMGS) { try { zip.file(p, await get(p, true)); } catch (e) { /* optional */ } }
      } else {
        for (const p of STATIC_IMGS) { try { zip.file('assets/images/' + p.split('/').pop(), await get(p, true)); } catch (e) { /* optional */ } }
        try {
          const win = {}; (new Function('window', await get('content.js')))(win);
          zip.file('content.json', JSON.stringify(win.TEMPLATE_CONTENT, null, 2));
        } catch (e) { /* skip */ }
        zip.file('fonts.txt', 'Fonts load from Google Fonts (see index.html <link>).\nCheck the Google Fonts license before redistributing font files.\n');
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(blob, `${design.id}-${kind}.zip`);
      toast('Downloading ' + design.name + ` — ${kind}.zip`);
    } catch (e) { toast('Download needs the app served over HTTP'); }
  };
  const customExport = async () => {
    onClose();
    if (!custom || !Object.keys(custom).length) { toast('Customize something first — then export your version'); return; }
    toast('Building your customized website…');
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      if (isStatic) {
        const base = design.src.replace('/index.html', '');
        const files = ['index.html', 'styles.css', 'main.js', 'content.js', 'README.md'];
        const texts = {};
        for (const f of files) { const r = await fetch(`${base}/${f}`); if (!r.ok) throw 0; texts[f] = await r.text(); }
        // content.js — evaluate with stubbed window, mutate, re-serialize
        try {
          const win = {}; (new Function('window', texts['content.js']))(win);
          const obj = win.TEMPLATE_CONTENT;
          if (custom.brandName) obj.brand.name = custom.brandName;
          if (custom.contactEmail) obj.contact.email = custom.contactEmail;
          if (custom.instagramUrl) obj.contact.instagram = custom.instagramUrl;
          if (custom.currency) obj.products.forEach((p) => { p.currency = custom.currency; });
          if (custom.productNames) custom.productNames.forEach((n, i) => { if (obj.products[i] && n) obj.products[i].name = n; });
          texts['content.js'] = 'window.TEMPLATE_CONTENT = ' + JSON.stringify(obj, null, 2) + ';\n';
        } catch (e) { /* keep original */ }
        // styles.css — rewrite tokens
        let css = texts['styles.css'];
        const rep = (t, v) => { if (v) css = css.replace(new RegExp('(' + t + '\\s*:\\s*)[^;]+(;?)'), '$1' + v + '$2'); };
        rep('--color-primary', custom.primaryColor); rep('--color-accent', custom.accentColor);
        if (custom.fontPair) {
          const [d, b] = custom.fontPair.split('|');
          css = css.replace(/(--font-display\s*:\s*)[^;]+(;?)/, `$1'${d}', Georgia, serif$2`);
          css = css.replace(/(--font-body\s*:\s*)[^;]+(;?)/, `$1'${b}', system-ui, sans-serif$2`);
        }
        texts['styles.css'] = css;
        Object.keys(texts).forEach((f) => zip.file(f, texts[f]));
        const imgs = ['assets/images/hero.webp', 'assets/images/product-1.webp', 'assets/images/product-2.webp', 'assets/images/product-3.webp', 'assets/images/craft.webp'];
        for (let i = 0; i < imgs.length; i++) {
          const key = i === 0 ? 'hero' : `product-${i - 1}`;
          const dataURL = custom.images?.[key];
          const buf = dataURL ? await (await fetch(dataURL)).arrayBuffer() : await (await fetch(`${base}/${imgs[i]}`)).arrayBuffer();
          zip.file(imgs[i], buf);
        }
      } else {
        // native: fetch prebuilt source zip, inject custom.json
        const r = await fetch(zipUrl('source')); if (!r.ok) throw 0;
        const srcZip = await JSZip.loadAsync(await r.blob());
        srcZip.file('src/custom.json', JSON.stringify(custom, null, 2));
        const blob = await srcZip.generateAsync({ type: 'blob' });
        downloadBlob(blob, `${design.id}-customized.zip`);
        toast('Your customized website is downloading');
        return;
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(blob, `${design.id}-customized.zip`);
      toast('Your customized website is downloading');
    } catch (e) { toast('Export failed — the app may need to be served over HTTP'); }
  };
  return (
    <div className="menu">
      {isStatic ? (
        <>
          <button onClick={() => buildStaticZip('source')}>Download source <span>.zip — complete standalone website</span></button>
          <button onClick={() => buildStaticZip('assets')}>Download assets <span>.zip — images, logos, content</span></button>
        </>
      ) : (
        <button onClick={() => go(zipUrl('source'), design.name + ' — source.zip')}>Download source <span>.zip — complete standalone website</span></button>
      )}
      <button onClick={customExport}>Download customized <span>.zip — with your brand & imagery</span></button>
      {isStatic && <button onClick={() => go(design.src.replace('/index.html', '/README.md'), 'README.md')}>Download README <span>setup & customization guide</span></button>}
    </div>
  );
}

/* ---------- presentation bar ---------- */
function PresentBar({ design, isStatic, frameRef, scopeRef, onExit }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stops = useMemo(() => {
    if (isStatic) return STATIC_SECTIONS;
    try {
      const els = scopeRef.current?.querySelectorAll('[data-tour]');
      if (els?.length) return [...els].map((el) => [el, el.getAttribute('data-tour')]);
    } catch (e) {}
    return [['hero', 'Hero']];
  }, []);
  const goto = useCallback((i) => {
    const n = stops.length; const j = ((i % n) + n) % n; setIdx(j);
    try {
      if (isStatic) {
        const el = frameRef.current.contentWindow.document.getElementById(stops[j][0]);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else {
        const lenis = scopeRef.current?.__lenis;
        if (lenis && stops[j][0]?.nodeType === 1) lenis.scrollTo(stops[j][0], { duration: 1.6 });
        else stops[j][0]?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      }
    } catch (e) {}
  }, [stops, isStatic, frameRef, scopeRef]);
  useEffect(() => { goto(0); }, []);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => goto(idx + 1), 6500);
    return () => clearTimeout(t);
  }, [idx, playing, goto]);
  return (
    <div className="compare-tray" style={{ zIndex: 130 }}>
      <span style={{ fontSize: '.66rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.8)', minWidth: 110 }}>{stops[idx]?.[1]}</span>
      <button className="vbtn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => goto(idx - 1)}>‹</button>
      <button className="vbtn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => setPlaying(!playing)}>{playing ? '❚❚' : '▶'}</button>
      <button className="vbtn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={() => goto(idx + 1)}>›</button>
      <button className="vbtn" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} onClick={onExit}>✕ Exit</button>
    </div>
  );
}
