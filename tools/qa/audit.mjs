#!/usr/bin/env node
/* ATELIER page audit — headless Chrome QA for every page (dev server must be running).

   Usage (from the project root):
     node tools/qa/audit.mjs                         # everything (platform + 100 designs)
     node tools/qa/audit.mjs --cat coffee,hotel      # only these categories' designs
     node tools/qa/audit.mjs --design design-01-artisan[,jewelry--design-01-editorial]
     node tools/qa/audit.mjs --platform              # home + category pages only
     node tools/qa/audit.mjs --mobile                # 390x844 touch viewport instead of 1440x900
     node tools/qa/audit.mjs --shots                 # save viewport screenshots per scroll step
     node tools/qa/audit.mjs --concurrency 4
   Env: BASE (default http://localhost:5173), OUT (report dir), CHROME (browser binary).

   Output: <OUT>/<desktop|mobile>/<id>.json (+ shots/<id>/NN-y<scroll>.jpg) and an issue
   list on stdout. Exit code 1 when any page has an [error].

   Issue codes (level):
     PAGE_ERROR / CONSOLE_ERROR / HTTP_ERROR  (error) runtime problems
     WRONG_SCROLLER      (error) ScrollTrigger bound to window while the page scrolls in .tpl-scope
     PIN_DRIFT           (error) a pinned element moves while it should be pinned
     FRAMES_STATIC       (error) ScrollFrames canvas does not change while scrubbing
     FRAMES_BLANK        (error) ScrollFrames canvas has nothing drawn
     STAGE_TOO_TALL      (warn)  pinned stage taller than the visible scroll area
     BLANK_VIEWPORT      (error) a full viewport with no visible text/image/media
     STUCK_HIDDEN        (error) content left invisible by an animation that never played
     FIXED_UNDER_TOOLBAR (error) a template position:fixed layer starts above the viewer stage
                                 (hidden under the toolbar) — use top: var(--tpl-top, 0px)
     H_OVERFLOW          (warn)  page wider than its viewport (sideways wobble)
     BROKEN_IMG          (error) image failed to load
     JANK                (warn)  long frames while scrolling (noisy on a busy machine)
*/
import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const BASE = process.env.BASE || 'http://localhost:5173';
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const MOBILE = flag('mobile');
const SHOTS = flag('shots');
const CONC = Number(opt('concurrency', 4));
const VIEW = MOBILE ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { width: 1440, height: 900, deviceScaleFactor: 1 };
const OUT = path.join(process.env.OUT || path.join(here, 'report'), MOBILE ? 'mobile' : 'desktop');
fs.mkdirSync(OUT, { recursive: true });
const sleep = (t) => new Promise((r) => setTimeout(r, t));

/* ------------------------------------------------------------------ in-page helpers */
const PAGE_HELPERS = () => {
  window.__audit = {
    effOpacity(el, stop) {
      if (getComputedStyle(el).visibility === 'hidden') return 0;
      let o = 1;
      for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.display === 'none') return 0;
        o *= parseFloat(cs.opacity);
        if (e === stop) break;
      }
      return o;
    },
    hasOwnText(el) {
      for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim().length > 0) return true;
      return false;
    },
    isContent(el) {
      const tag = el.tagName;
      if (tag === 'IMG') return el.complete && el.naturalWidth > 0;
      if (tag === 'CANVAS' || tag === 'VIDEO' || tag === 'PICTURE') return true;
      if (el instanceof SVGElement && tag.toLowerCase() !== 'svg') return true;
      const cs = getComputedStyle(el);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
      if (this.hasOwnText(el)) {
        const m = cs.color.match(/rgba?\(([^)]+)\)/);
        const a = m ? (m[1].split(',')[3] !== undefined ? parseFloat(m[1].split(',')[3]) : 1) : 1;
        return a > 0.1;
      }
      return false;
    },
    opaqueBg(el) {
      const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!m) return false;
      const p = m[1].split(',').map(Number);
      return (p[3] === undefined ? 1 : p[3]) >= 0.95;
    },
    desc(el) {
      const cls = (el.className && el.className.baseVal !== undefined) ? el.className.baseVal : el.className;
      const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      return `${el.tagName.toLowerCase()}${cls ? '.' + String(cls).trim().split(/\s+/).join('.') : ''}${t ? ` "${t}"` : ''}`.slice(0, 110);
    },
    // How many points of a grid over the viewport show real content.
    contentPoints(rect, stop) {
      let hits = 0, total = 0;
      const cols = 6, rows = 4;
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = rect.left + rect.width * (i + 0.5) / cols;
        const y = rect.top + rect.height * (j + 0.5) / rows;
        total++;
        for (const e of document.elementsFromPoint(x, y)) {
          if (e === document.documentElement || e === document.body) break;
          const o = this.effOpacity(e, stop);
          if (this.isContent(e) && o > 0.15) { hits++; break; }
          if (this.opaqueBg(e) && o > 0.9) break;
        }
      }
      // The grid can fall entirely on padding/gaps around content; a screen is
      // only blank when no visible text or media intersects it at all.
      if (hits === 0) {
        for (const el of stop.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.width < 8 || r.height < 8 || r.bottom < rect.top + 20 || r.top > rect.bottom - 20) continue;
          if (r.right < rect.left || r.left > rect.right) continue;
          if (this.isContent(el) && this.effOpacity(el, stop) > 0.15) { hits = 1; break; }
        }
      }
      return { hits, total };
    },
    stuck(rect, root) {
      const out = [];
      for (const el of root.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.width < 24 || r.height < 12) continue;
        const visH = Math.min(r.bottom, rect.bottom) - Math.max(r.top, rect.top);
        const visW = Math.min(r.right, rect.right) - Math.max(r.left, rect.left);
        if (visH < 40 || visW < 24) continue;
        const tag = el.tagName;
        const media = tag === 'IMG' || tag === 'CANVAS' || tag === 'VIDEO' || tag === 'PICTURE';
        if (!media && !this.hasOwnText(el)) continue;
        if (this.effOpacity(el, root) >= 0.05) continue;
        // closed menus, drawers, modals and cursor followers live in fixed layers
        let overlay = false;
        for (let e = el; e && e !== root; e = e.parentElement) {
          if (getComputedStyle(e).position === 'fixed' || e.getAttribute('aria-hidden') === 'true' || e.hasAttribute('hidden') || e.tagName === 'DIALOG') { overlay = true; break; }
        }
        if (overlay) continue;
        // Hidden by an animation, not by design CSS (hover affordances, inactive slides):
        // the element that zeroes the opacity must carry it inline — where GSAP writes.
        let animated = false;
        for (let e = el; e && e !== root.parentElement; e = e.parentElement) {
          const cs = getComputedStyle(e);
          if (parseFloat(cs.opacity) < 0.05 || (e === el && cs.visibility === 'hidden')) {
            if (e.style.opacity !== '' || e.style.visibility !== '') { animated = true; break; }
          }
        }
        if (!animated && !window.__auditStatic) continue;
        out.push(this.desc(el));
        if (out.length > 12) break;
      }
      return out;
    },
    fixedAbove(scope) {
      const top0 = scope.getBoundingClientRect().top;
      if (top0 < 2) return [];
      const out = [];
      for (const el of scope.querySelectorAll('*')) {
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') continue;
        if (el.closest('.pin-spacer')) continue; // ScrollTrigger pins place themselves
        const r = el.getBoundingClientRect();
        if (r.width < 40 || r.height < 4) continue;
        if (r.top >= top0 - 1) continue; // inside the stage
        if (r.bottom <= 0) continue; // parked off-screen (hidden header)
        if (cs.pointerEvents === 'none' && r.width < 160 && r.height < 160) continue; // cursor followers
        if (this.effOpacity(el, scope) < 0.05) continue; // closed overlay
        out.push(this.desc(el));
        if (out.length > 8) break;
      }
      return out;
    },
    canvasSig(cv) {
      try {
        const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
        let h = 0, alpha = 0;
        for (let i = 0; i < d.length; i += 4 * 997) { h = (h * 31 + d[i] + d[i + 1] * 3 + d[i + 2] * 7) | 0; alpha += d[i + 3]; }
        return { h, alpha };
      } catch (e) { return { h: 'err', alpha: -1 }; }
    },
    // never hangs: background tabs get no animation frames
    raf2() { return new Promise((r) => { requestAnimationFrame(() => requestAnimationFrame(r)); setTimeout(r, 400); }); },
    raf1() { return new Promise((r) => { requestAnimationFrame(r); setTimeout(r, 400); }); },
  };
};

/* ------------------------------------------------------------------ targets */
async function listTargets(browser) {
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const data = await page.evaluate(async () => {
    const lib = await import('/src/data/library.js');
    return lib.CATEGORIES.map((c) => ({ slug: c.slug, designs: lib.designsFor(c.slug).map((d) => ({ id: d.id, kind: d.kind, src: d.src })) }));
  });
  await page.close();
  const cats = (opt('cat', '') || '').split(',').filter(Boolean);
  const ids = (opt('design', '') || '').split(',').filter(Boolean);
  const onlyPlatform = flag('platform');
  const targets = [];
  if (ids.includes('home')) targets.push({ id: 'home', kind: 'platform', url: BASE + '/' });
  for (const c of data) if (ids.includes(`category-${c.slug}`)) targets.push({ id: `category-${c.slug}`, kind: 'platform', url: `${BASE}/category/${c.slug}` });
  if (onlyPlatform || (!cats.length && !ids.length)) {
    targets.push({ id: 'home', kind: 'platform', url: BASE + '/' });
    for (const c of data) targets.push({ id: `category-${c.slug}`, kind: 'platform', url: `${BASE}/category/${c.slug}` });
  }
  if (!onlyPlatform) {
    for (const c of data) for (const d of c.designs) {
      if (cats.length && !cats.includes(c.slug)) continue;
      if (ids.length && !ids.includes(d.id) && !ids.includes(`${c.slug}--${d.id}`)) continue;
      if (d.kind === 'static') targets.push({ id: `${c.slug}--${d.id}`, cat: c.slug, kind: 'static', url: new URL(d.src, BASE + '/').href });
      else targets.push({ id: d.id, cat: c.slug, kind: 'native', url: `${BASE}/category/${c.slug}/design/${d.id}` });
    }
  }
  return targets;
}

/* ------------------------------------------------------------------ one page */
async function auditOne(browser, t) {
  const issues = [];
  const add = (level, code, detail) => issues.push({ level, code, detail });
  const page = await browser.newPage();
  await page.setViewport(VIEW);
  await page.evaluateOnNewDocument(PAGE_HELPERS);
  if (t.kind === 'static') await page.evaluateOnNewDocument(() => { window.__auditStatic = true; });
  const consoleErrs = new Set();
  page.on('console', (m) => { if (m.type() === 'error') consoleErrs.add(m.text().slice(0, 240)); });
  page.on('pageerror', (e) => add('error', 'PAGE_ERROR', String(e.message || e).slice(0, 240)));
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url())) add('error', 'HTTP_ERROR', `${r.status()} ${r.url().replace(BASE, '')}`); });
  page.on('requestfailed', (r) => { const u = r.url(); if (!/^data:|favicon|fonts\.g/.test(u)) add('error', 'HTTP_ERROR', `failed ${u.replace(BASE, '')} ${r.failure()?.errorText || ''}`); });

  const result = { id: t.id, kind: t.kind, url: t.url, viewport: MOBILE ? 'mobile' : 'desktop' };
  try {
    await page.goto(t.url, { waitUntil: 'load', timeout: 60000 });
    if (t.kind === 'native') await page.waitForSelector('.tpl-scope > *', { timeout: 30000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await sleep(2200);

    const info = await page.evaluate(async (kind) => {
      const scope = kind === 'native' ? document.querySelector('.tpl-scope') : null;
      window.__sc = scope || document.scrollingElement;
      let ST = window.ScrollTrigger || null;
      if (!ST) {
        const u = performance.getEntriesByType('resource').map((e) => e.name).find((n) => /gsap_ScrollTrigger|\/ScrollTrigger\.js/.test(n));
        if (u) { try { ST = (await import(u)).ScrollTrigger; } catch (e) { /* none */ } }
      }
      window.__ST = ST;
      const sc = window.__sc;
      return { hasST: !!ST, scrollH: sc.scrollHeight, clientH: sc.clientHeight, clientW: sc.clientWidth, scrollW: sc.scrollWidth, lenis: !!(scope && scope.__lenis) };
    }, t.kind);
    Object.assign(result, info);
    if (info.scrollW > info.clientW + 1) add('warn', 'H_OVERFLOW', `content ${info.scrollW}px wide in a ${info.clientW}px viewport`);

    const scrollTo = (y) => page.evaluate(async (y) => {
      if (!window.__sc || !window.__sc.isConnected) window.__sc = document.querySelector('.tpl-scope') || document.scrollingElement;
      const sc = window.__sc;
      if (sc.__lenis) sc.__lenis.scrollTo(y, { immediate: true, force: true });
      else sc.scrollTop = y;
      await window.__audit.raf2();
    }, y);

    /* ---- fixed layers hidden under the viewer toolbar ---- */
    if (t.kind === 'native') {
      const above = new Set(await page.evaluate(() => window.__audit.fixedAbove(document.querySelector('.tpl-scope'))));
      await scrollTo(Math.round(info.clientH * 2.5));
      await sleep(700);
      for (const d of await page.evaluate(() => window.__audit.fixedAbove(document.querySelector('.tpl-scope')))) above.add(d);
      await scrollTo(0);
      if (above.size) add('error', 'FIXED_UNDER_TOOLBAR', [...above].slice(0, 6).join(' | '));
    }

    /* ---- ScrollTrigger checks ---- */
    if (info.hasST) {
      const trig = await page.evaluate(() => {
        const ST = window.__ST, sc = window.__sc;
        const scopeScrolls = sc !== document.scrollingElement && sc.scrollHeight > sc.clientHeight + 2;
        const wrong = [], pins = [];
        window.__pinEls = [];
        ST.getAll().forEach((s) => {
          const d = s.trigger ? window.__audit.desc(s.trigger) : '(no trigger)';
          if (scopeScrolls && s.scroller === window) wrong.push(d);
          if (s.pin && s.end > s.start) {
            // track the element: ScrollTrigger.sort()/refresh reorders getAll()
            const i = window.__pinEls.push(s.pin) - 1;
            pins.push({ i, d: window.__audit.desc(s.pin), start: s.start, end: s.end, sf: !!(s.pin.classList && s.pin.classList.contains('sf-wrap')) });
          }
        });
        return { count: ST.getAll().length, wrong, pins };
      });
      result.triggers = trig.count;
      if (trig.wrong.length) add('error', 'WRONG_SCROLLER', `${trig.wrong.length} trigger(s) bound to window: ${[...new Set(trig.wrong)].slice(0, 6).join(' | ')}`);

      result.pins = [];
      for (const p of trig.pins) {
        const tops = [];
        const sigs = [];
        for (const f of [0.04, 0.3, 0.55, 0.8, 0.96]) {
          await scrollTo(p.start + (p.end - p.start) * f);
          await sleep(p.sf ? 650 : 120);
          const m = await page.evaluate((i) => {
            const pin = window.__pinEls[i];
            if (!pin || !pin.isConnected) return null;
            const sc = window.__sc;
            const top0 = sc === document.scrollingElement ? 0 : sc.getBoundingClientRect().top;
            const r = pin.getBoundingClientRect();
            const cv = pin.querySelector && pin.querySelector('.sf-canvas');
            return { top: Math.round(r.top - top0), h: Math.round(r.height), vh: sc === document.scrollingElement ? innerHeight : sc.clientHeight, sig: cv ? window.__audit.canvasSig(cv) : null };
          }, p.i);
          if (!m) break;
          tops.push(m.top);
          if (m.sig) sigs.push(m.sig);
          if (p.sf && m.h > m.vh + 2 && f === 0.3) add('warn', 'STAGE_TOO_TALL', `${p.d}: stage ${m.h}px vs visible ${m.vh}px`);
        }
        const drift = tops.length ? Math.max(...tops) - Math.min(...tops) : 0;
        result.pins.push({ pin: p.d, tops, drift });
        if (drift > 3) add('error', 'PIN_DRIFT', `${p.d}: pinned top moved ${tops.join(' → ')} px`);
        if (p.sf && sigs.length) {
          const distinct = new Set(sigs.map((s) => s.h)).size;
          if (sigs.every((s) => s.alpha === 0)) add('error', 'FRAMES_BLANK', `${p.d}: canvas never drawn`);
          else if (distinct < 3) add('error', 'FRAMES_STATIC', `${p.d}: only ${distinct} distinct frame(s) while scrubbing`);
        }
      }
    }

    /* ---- smoothness: scripted scroll, frame times ---- */
    const jank = await page.evaluate(async () => {
      const sc = window.__sc;
      const dist = Math.min(sc.scrollHeight - sc.clientHeight, 2600);
      const lens = sc.__lenis;
      const go = (y) => (lens ? lens.scrollTo(y, { immediate: true, force: true }) : (sc.scrollTop = y));
      go(0);
      await window.__audit.raf2();
      const deltas = [];
      let last = performance.now();
      for (let k = 0; k < 150; k++) {
        go(dist * (k / 149));
        await window.__audit.raf1();
        const now = performance.now(); deltas.push(now - last); last = now;
      }
      deltas.sort((a, b) => a - b);
      return { p50: +deltas[Math.floor(deltas.length * 0.5)].toFixed(1), p95: +deltas[Math.floor(deltas.length * 0.95)].toFixed(1), long: deltas.filter((d) => d > 50).length };
    });
    result.frames = jank;
    if (jank.long > 8 || jank.p95 > 50) add('warn', 'JANK', `p95 frame ${jank.p95}ms, ${jank.long} frames >50ms while scrolling`);

    /* ---- reveal pass: walk down slowly so every trigger fires ---- */
    const vh = info.clientH;
    const maxY = Math.max(0, info.scrollH - vh);
    for (let y = 0; y <= maxY + 1; y += Math.round(vh * 0.45)) { await scrollTo(Math.min(y, maxY)); await sleep(260); }
    await scrollTo(maxY); await sleep(900);

    /* ---- inspection pass: blank viewports + stuck content (+ shots) ---- */
    const shotDir = path.join(OUT, 'shots', t.id);
    if (SHOTS) { fs.rmSync(shotDir, { recursive: true, force: true }); fs.mkdirSync(shotDir, { recursive: true }); }
    const blanks = [], stuck = new Map(), lows = [];
    let step = 0;
    const maxY2 = Math.max(0, (await page.evaluate(() => window.__sc.scrollHeight)) - vh);
    for (let y = 0; y <= maxY2 + 1; y += Math.round(vh * 0.85)) {
      const yy = Math.min(y, maxY2);
      await scrollTo(yy); await sleep(700);
      const inspect = () => page.evaluate(() => {
        const sc = window.__sc;
        const root = sc === document.scrollingElement ? document.body : sc;
        const rect = sc === document.scrollingElement ? { left: 0, top: 0, right: innerWidth, bottom: innerHeight, width: innerWidth, height: innerHeight } : sc.getBoundingClientRect().toJSON();
        return { cp: window.__audit.contentPoints(rect, root), stuck: window.__audit.stuck(rect, root), rect, sx: window.scrollX, sy: window.scrollY };
      });
      let r = await inspect();
      // a busy machine can catch a reveal mid-flight: confirm before reporting
      if (r.cp.hits === 0 || r.stuck.length) {
        await sleep(1500);
        const again = await inspect();
        r = { ...again, stuck: again.stuck.filter((d) => r.stuck.includes(d)) };
      }
      if (r.cp.hits === 0) blanks.push(yy);
      else if (r.cp.hits <= 2) lows.push(yy);
      for (const s of r.stuck) if (!stuck.has(s)) stuck.set(s, yy);
      if (SHOTS && r.rect.width >= 1 && r.rect.height >= 1) {
        const c = r.rect;
        await page.screenshot({ path: path.join(shotDir, `${String(step).padStart(2, '0')}-y${yy}.jpg`), type: 'jpeg', quality: 55, clip: { x: c.left + r.sx, y: c.top + r.sy, width: Math.min(c.width, VIEW.width), height: Math.min(c.height, VIEW.height), scale: MOBILE ? 0.5 : 0.6 } });
      }
      step++;
      if (yy >= maxY2) break;
    }
    if (blanks.length) add('error', 'BLANK_VIEWPORT', `no visible content at scroll ${blanks.join(', ')} (of ${maxY2})`);
    if (lows.length) result.lowContentAt = lows;
    if (stuck.size) add('error', 'STUCK_HIDDEN', [...stuck].slice(0, 10).map(([d, y]) => `${d} @${y}`).join(' | '));

    const broken = await page.evaluate(() => {
      const root = window.__sc === document.scrollingElement ? document : window.__sc;
      return [...root.querySelectorAll('img')].filter((im) => im.getAttribute('src') && im.complete && im.naturalWidth === 0 && getComputedStyle(im).display !== 'none' && im.getBoundingClientRect().width > 0).map((im) => im.getAttribute('src').slice(-80));
    });
    if (broken.length) add('error', 'BROKEN_IMG', broken.slice(0, 8).join(' | '));
  } catch (e) {
    add('error', 'AUDIT_FAILED', String(e.message || e).slice(0, 300));
  }
  // 'Failed to load resource' duplicates HTTP_ERROR, which carries the URL
  for (const c of consoleErrs) if (!/Download the React DevTools|Failed to load resource/.test(c)) add('error', 'CONSOLE_ERROR', c);
  const seen = new Set();
  result.issues = issues.filter((i) => { const k = i.code + i.detail; if (seen.has(k)) return false; seen.add(k); return true; });
  fs.writeFileSync(path.join(OUT, `${t.id}.json`), JSON.stringify(result, null, 2));
  await page.close();
  return result;
}

/* ------------------------------------------------------------------ main */
// Each worker owns a whole browser with a single tab: Chrome pauses
// requestAnimationFrame in background tabs, which would freeze GSAP.
const launch = () => puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 120000,
  args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--no-first-run', '--no-default-browser-check', '--mute-audio'],
});
const lister = await launch();
const targets = await listTargets(lister);
await lister.close();
console.log(`auditing ${targets.length} page(s) @ ${MOBILE ? 'mobile 390x844' : 'desktop 1440x900'} → ${OUT}`);
const results = [];
let next = 0;
await Promise.all(Array.from({ length: Math.min(CONC, targets.length) }, async () => {
  const browser = await launch();
  while (next < targets.length) {
    const t = targets[next++];
    const r = await auditOne(browser, t);
    results.push(r);
    const errs = r.issues.filter((i) => i.level === 'error').length;
    console.log(`${errs ? 'FAIL' : r.issues.length ? 'WARN' : 'PASS'}  ${t.id}`);
    for (const i of r.issues) console.log(`      [${i.level}] ${i.code}: ${i.detail}`);
  }
  await browser.close();
}));
const failing = results.filter((r) => r.issues.some((i) => i.level === 'error')).map((r) => r.id);
const errTotal = results.reduce((a, r) => a + r.issues.filter((i) => i.level === 'error').length, 0);
console.log(`\n${results.length} pages, ${failing.length} failing, ${errTotal} error issue(s)`);
if (failing.length) console.log('failing: ' + failing.join(', '));
process.exit(failing.length ? 1 : 0);
