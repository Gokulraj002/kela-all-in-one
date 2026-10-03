#!/usr/bin/env node
/* Page-speed check against the PRODUCTION build — run `npm run build` and
   `npx vite preview --port 4173` first. Lighthouse-style mobile profile:
   4x CPU slowdown + 4G network (9 Mbps / 60 ms RTT), cold cache.
   Reports FCP, LCP, CLS, transferred KB by type and request count.
   Usage: node tools/qa/perf.mjs [baseUrl] [path ...]   (DESKTOP=1 for a desktop profile) */
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const base = process.argv[2] || 'http://localhost:4173';
const paths = process.argv.slice(3).length ? process.argv.slice(3) : [
  '/',
  '/category/coffee',
  '/category/jewelry',
  '/category/coffee/design/design-01-artisan',
  '/category/hotel/design/design-01-palace',
  '/category/technology/design/design-02-ai',
  '/category/jewelry/design/design-01-editorial',
];
const MOBILE = process.env.DESKTOP ? null : { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-first-run', '--mute-audio'] });
const rows = [];
for (const p of paths) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport(MOBILE || { width: 1440, height: 900 });
  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 60, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (2 * 1024 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: MOBILE ? 4 : 1 });
  const types = new Map();
  const bytes = {};
  let requests = 0;
  cdp.on('Network.responseReceived', (e) => types.set(e.requestId, ({ Image: 'img', Script: 'js', Stylesheet: 'css', Font: 'font', Document: 'html' })[e.type] || 'other'));
  cdp.on('Network.loadingFinished', (e) => { requests++; const t = types.get(e.requestId) || 'other'; bytes[t] = (bytes[t] || 0) + e.encodedDataLength; });
  await page.evaluateOnNewDocument(() => {
    window.__perf = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__perf.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
  });
  const t0 = Date.now();
  await page.goto(base + p, { waitUntil: 'load', timeout: 120000 });
  const loadMs = Date.now() - t0;
  await new Promise((r) => setTimeout(r, 3000));
  const m = await page.evaluate(() => ({
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    lcp: window.__perf.lcp, cls: window.__perf.cls,
  }));
  const kb = (n) => Math.round((n || 0) / 1024);
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  rows.push({ page: p, FCP_ms: Math.round(m.fcp), LCP_ms: Math.round(m.lcp), CLS: +m.cls.toFixed(3), load_ms: loadMs, KB_total: kb(total), KB_js: kb(bytes.js), KB_img: kb(bytes.img), KB_css: kb(bytes.css), KB_font: kb(bytes.font), requests });
  await ctx.close();
}
await browser.close();
console.table(rows);
console.log(JSON.stringify(rows));
