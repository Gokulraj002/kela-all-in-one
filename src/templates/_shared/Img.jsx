import React, { useState } from 'react';
import { useCustom } from './CustomContext';

/* Img: resolves custom uploads, shows skeleton while loading,
   elegant fallback (tone + brand initial) on error. Never a broken icon. */
export function Img({ k, src, alt = '', className = '', eager = false, style }) {
  const { img, brand } = useCustom();
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const finalSrc = k ? img(k, src) : src;
  const initial = (brand || 'A').charAt(0).toUpperCase();
  return (
    <span className={`a-img ${loaded ? 'is-loaded' : ''} ${broken ? 'is-broken' : ''} ${className}`} style={style}>
      {!broken && (
        <img
          src={finalSrc} alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding={eager ? 'auto' : 'async'}
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
        />
      )}
      {broken && <span className="a-img-ph" aria-hidden="true">{initial}</span>}
    </span>
  );
}
