/* KELA — one brand across every vertical.

   Single source of truth: change a name or colour here and the platform
   viewer, the static jewelry sites and every exported project follow.

   Colour system: each vertical owns one brand colour, used as the design's
   accent (--color-accent). Every colour comes in two tones so it stays
   readable everywhere — `onLight` for light pages, `onDark` for dark pages —
   and both pass WCAG AA (≥ 4.5:1) against white/ivory and near-black.
   A design's own ink and background colours are kept, so its art direction
   and legibility survive the rebrand. */
export const KELA = {
  name: 'Kela',
  verticals: {
    jewelry:    { name: 'Kela Jewels',  colour: 'Antique Gold',  onLight: '#7E5E1B', onDark: '#D9B65E', domain: 'kelajewels.in',  instagram: 'kelajewels' },
    coffee:     { name: 'Kela Cafe',    colour: 'Roast Caramel', onLight: '#8A4A22', onDark: '#D9A06C', domain: 'kelacafe.in',    instagram: 'kelacafe' },
    ecommerce:  { name: 'Kela Store',   colour: 'Marigold',      onLight: '#A8490A', onDark: '#F4A04E', domain: 'kelastore.in',   instagram: 'kelastore' },
    fashion:    { name: 'Kela Fashion', colour: 'Kumkum',        onLight: '#A01C3A', onDark: '#EE7A90', domain: 'kelafashion.in', instagram: 'kelafashion' },
    technology: { name: 'Kela Tech',    colour: 'Indigo',        onLight: '#3346C4', onDark: '#97A2FF', domain: 'kelatech.in',    instagram: 'kelatech' },
    agency:     { name: 'Kela Studio',  colour: 'Vermilion',     onLight: '#B8341C', onDark: '#FF7E5F', domain: 'kelastudio.in',  instagram: 'kelastudio' },
    hotel:      { name: 'Kela Hotels',  colour: 'Banana Leaf',   onLight: '#2B6446', onDark: '#86CDA3', domain: 'kelahotels.in',  instagram: 'kelahotels' },
    restaurant: { name: 'Kela Kitchen', colour: 'Turmeric',      onLight: '#8F5C00', onDark: '#F2BB4A', domain: 'kelakitchen.in', instagram: 'kelakitchen' },
    realestate: { name: 'Kela Estates', colour: 'Peacock Teal',  onLight: '#18646B', onDark: '#67C7CE', domain: 'kelaestates.in', instagram: 'kelaestates' },
    travel:     { name: 'Kela Travels', colour: 'Monsoon Blue',  onLight: '#1D5E99', onDark: '#7DB9F0', domain: 'kelatravels.in', instagram: 'kelatravels' },
  },
};

export function brandFor(category) {
  return KELA.verticals[category] || null;
}

// Relative luminance of a #rgb / #rrggbb / rgb() / rgba() colour; null when
// the value is not a colour or is fully transparent.
function luminance(colour) {
  const s = String(colour || '').trim();
  let rgb = null;
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(s);
  if (hex) {
    const h = hex[1].length === 3 ? hex[1].split('').map((c) => c + c).join('') : hex[1];
    rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  } else {
    const fn = /^rgba?\(([^)]+)\)$/i.exec(s);
    if (fn) {
      const p = fn[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
      if (p.length >= 3 && !(p.length > 3 && p[3] === 0)) rgb = p.slice(0, 3);
    }
  }
  if (!rgb) return null;
  const lin = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
}

/* The brand colour tone that reads on a page with this background colour. */
export function brandAccent(category, background) {
  const v = brandFor(category);
  if (!v) return null;
  const l = luminance(background);
  return l !== null && l < 0.2 ? v.onDark : v.onLight;
}

/* Default customisation for a vertical: the Kela name, contact details and
   brand colour. Explicit user customisation is spread over it by callers. */
export function brandDefaults(category, background) {
  const v = brandFor(category);
  if (!v) return {};
  return {
    brandName: v.name,
    accentColor: brandAccent(category, background),
    contactEmail: `hello@${v.domain}`,
    instagramUrl: `https://instagram.com/${v.instagram}`,
  };
}

/* Template tokens are declared on the template's root class, which also sits
   on the template's own root element — so values set only on the outer
   wrapper never reach the page. These rules re-assert the customised tokens
   on the wrapper, the template root (direct child — its class does not always
   match the design id) and any element carrying a tpl-design-* class. */
export function customTokensCss(designId, custom, category) {
  const decl = [];
  // Both tones of the brand colour, for sections whose background differs from
  // the page (e.g. a dark band on a light page): var(--brand-on-dark).
  const v = brandFor(category);
  if (v) decl.push(`--brand-on-light: ${v.onLight};`, `--brand-on-dark: ${v.onDark};`);
  if (custom.primaryColor) decl.push(`--color-primary: ${custom.primaryColor} !important;`);
  if (custom.accentColor) decl.push(`--color-accent: ${custom.accentColor} !important;`);
  if (custom.fontPair) {
    const [d, b] = custom.fontPair.split('|');
    if (d) decl.push(`--font-display: '${d}', serif !important;`);
    if (b) decl.push(`--font-body: '${b}', sans-serif !important;`);
  }
  if (!decl.length) return '';
  const s = `.tpl-scope.tpl-${designId}`;
  return `${s}, ${s} > *, ${s} [class*="tpl-design-"] { ${decl.join(' ')} }`;
}
