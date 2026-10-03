import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastHost } from './lib/toast.jsx';
import Home from './pages/Home.jsx';
import { loadCategory, loadViewer } from './lib/routes.js';

// The landing page ships with the main bundle (5 KB, no extra round trip);
// the category page and the viewer are their own chunks, prefetched when a
// link to them is hovered (see lib/routes.js).
const Category = lazy(loadCategory);
const Viewer = lazy(loadViewer);

const isViewerPath = (p) => p.startsWith('/category/') && p.includes('/design/');

// Smooth scrolling for the library pages. The viewer runs its own instance on
// the template's scroll container, so the window one stops while it is open.
function useLibrarySmoothScroll() {
  const inViewer = isViewerPath(useLocation().pathname);
  useEffect(() => {
    if (inViewer) return undefined;
    // Loaded after first paint so it never delays the initial render.
    let stop = null;
    let cancelled = false;
    import('./templates/_shared/smoothScroll.js').then((m) => { if (!cancelled) stop = m.startSmoothScroll(window); });
    return () => { cancelled = true; if (stop) stop(); };
  }, [inViewer]);
}

const scrollToCategories = () => {
  const el = document.getElementById('categories');
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

function Topbar() {
  const loc = useLocation();
  const nav = useNavigate();
  if (isViewerPath(loc.pathname)) return null;
  const goCats = (e) => {
    e.preventDefault();
    if (loc.pathname !== '/') { nav('/'); setTimeout(scrollToCategories, 350); }
    else scrollToCategories();
  };
  return (
    <header className="topbar">
      <Link className="wordmark" to="/"><i>◇</i> ATELIER</Link>
      <nav className="topnav">
        <Link to="/">Library</Link>
        <Link to="/category/jewelry" onMouseEnter={loadCategory}>Jewelry</Link>
        <Link to="/category/coffee" onMouseEnter={loadCategory}>Coffee</Link>
        <a href="#categories" onClick={goCats}>Categories</a>
      </nav>
      <span style={{ fontSize: '.6rem', letterSpacing: '.24em', color: 'var(--ink-faint)' }}>10 INDUSTRIES · 100 EXPERIENCES</span>
    </header>
  );
}

function Footer() {
  const loc = useLocation();
  if (loc.pathname.includes('/design/')) return null;
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="wordmark"><i>◇</i> ATELIER</div>
        <p>A premium website experience library — ten industries, ten art-directed websites each. Explore, customize, export.</p>
        <p style={{ fontSize: '.75rem', color: 'var(--ink-faint)' }}>© 2026 Atelier · Concept imagery generated for design purposes</p>
      </div>
    </footer>
  );
}

export default function App() {
  useLibrarySmoothScroll();
  return (
    <>
      <Topbar />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/category/:slug/design/:id" element={<Viewer />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastHost />
    </>
  );
}
