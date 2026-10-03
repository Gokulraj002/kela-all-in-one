import React, { createContext, useContext, useMemo } from 'react';

/* Customization context: the platform injects the user's brand/colors/
   imagery; templates read it via useCustom(). Outside the platform
   (standalone export) sensible defaults apply. */
const CustomContext = createContext(null);

export function CustomProvider({ value, children }) {
  return <CustomContext.Provider value={value || {}}>{children}</CustomContext.Provider>;
}

function fmtPrice(n, currency) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: currency === '₹' ? 'INR' : currency === '$' ? 'USD' : currency === '€' ? 'EUR' : 'GBP',
      maximumFractionDigits: 0,
    }).format(n);
  } catch (e) { return (currency || '₹') + ' ' + Number(n).toLocaleString('en-IN'); }
}

export function useCustom() {
  const c = useContext(CustomContext) || {};
  return useMemo(() => ({
    brand: c.brandName || null,               // override; else template default
    colors: { primary: c.primaryColor || null, accent: c.accentColor || null },
    fonts: c.fontPair || null,                // "Display|Body"
    currency: c.currency || '₹',
    contact: { email: c.contactEmail || null, instagram: c.instagramUrl || null },
    // image resolution: custom upload dataURL wins, else template default
    img: (key, fallback) => (c.images && c.images[key]) || fallback,
    productName: (i, fallback) => (c.productNames && c.productNames[i]) || fallback,
    price: (n) => fmtPrice(n, c.currency || '₹'),
    raw: c,
  }), [c]);
}

export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(!!(mq && mq.matches));
    if (!mq) return;
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return reduced;
}

/* Scope style vars for font overrides: platform sets these on .tpl-scope */
export function scopeVars(custom) {
  const vars = {};
  if (custom.primaryColor) vars['--color-primary'] = custom.primaryColor;
  if (custom.accentColor) vars['--color-accent'] = custom.accentColor;
  if (custom.fontPair) {
    const [d, b] = custom.fontPair.split('|');
    if (d) vars['--font-display'] = `'${d}', serif`;
    if (b) vars['--font-body'] = `'${b}', sans-serif`;
  }
  return vars;
}
