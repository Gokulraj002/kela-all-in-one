#!/usr/bin/env node
/* ATELIER — export a native React template as a standalone Vite project zip.
   Usage: node tools/export-template.mjs coffee design-01-artisan
   Output: public/downloads/<id>-source.zip
   The zip contains a complete runnable project: npm install && npm run dev
*/
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [category, designId] = process.argv.slice(2);
if (!category || !designId) { console.error('usage: export-template.mjs <category> <design-id>'); process.exit(1); }

const tplDir = join(root, 'src', 'templates', category, designId);
if (!existsSync(tplDir)) { console.error('template not found:', tplDir); process.exit(1); }

// 1. contract check: no platform imports
const bad = [];
const walk = (d) => {
  for (const e of readdirEntries(d)) {
    const p = join(d, e.name);
    if (e.dir) { if (e.name !== 'assets' && e.name !== 'node_modules') walk(p); continue; }
    if (/\.(jsx?|css)$/.test(e.name)) {
      const s = readFileSync(p, 'utf8');
      if (/from\s+['"]\.\.\/\.\.\/(pages|lib|data|components)\//.test(s)) bad.push(p);
      if (/:root\s*{/.test(s) && e.name.endsWith('.css')) bad.push(p + ' (:root write)');
    }
  }
};
import { readdirSync } from 'fs';
function readdirEntries(d) { return readdirSync(d, { withFileTypes: true }).map((e) => ({ name: e.name, dir: e.isDirectory() })); }
walk(tplDir);
if (bad.length) { console.error('CONTRACT VIOLATIONS:\n' + bad.join('\n')); process.exit(1); }

// 2. stage a standalone project
const stage = join(root, '.export-stage', `${category}-${designId}`);
rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });
execSync(`cp -r "${tplDir}" "${join(stage, 'template')}"`);
execSync(`cp -r "${join(root, 'src', 'templates', '_shared')}" "${join(stage, '_shared')}"`);
// drop tool-generated junk (e.g. media .thumbnails folders) from the export
for (const dot of ['.thumbnails', '.DS_Store']) {
  execSync(`find "${join(stage, 'template')}" "${join(stage, '_shared')}" -name "${dot}" -exec rm -rf {} + 2>/dev/null || true`);
}

// rewrite _shared imports: ../../_shared/X (or legacy ../../../_shared/X) -> ../_shared/X
execSync(`grep -rl "\\.\\./\\.\\./_shared" "${join(stage, 'template')}" | xargs -r perl -pi -e 's|\\.\\./\\.\\./\\.\\./_shared|../_shared|g; s|\\.\\./\\.\\./_shared|../_shared|g'`);

// Kela brand defaults, toned for this design's page colour (from its CSS tokens).
const { brandDefaults } = await import(join(root, 'src', 'templates', '_shared', 'brand.js'));
const cssText = readdirEntries(tplDir).filter((e) => !e.dir && e.name.endsWith('.css'))
  .map((e) => readFileSync(join(tplDir, e.name), 'utf8')).join('\n');
const bgMatch = /--color-background:\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]*\))/.exec(cssText);
const brandCustom = brandDefaults(category, bgMatch ? bgMatch[1] : null);

const meta = JSON.parse(execSync(`node -e "
  import('${join(stage, 'template', 'meta.js')}').then(m => console.log(JSON.stringify(m.meta)))"`, { encoding: 'utf8' }).trim());

writeFileSync(join(stage, 'package.json'), JSON.stringify({
  name: `${category}-${designId}`, private: true, version: '1.0.0', type: 'module',
  scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
  dependencies: { react: '^18.3.1', 'react-dom': '^18.3.1', gsap: '^3.12.5', lenis: '^1.3.0' },
  devDependencies: { vite: '^5.4.0', '@vitejs/plugin-react': '^4.3.0' },
}, null, 2));

writeFileSync(join(stage, 'vite.config.js'),
  `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });\n`);

writeFileSync(join(stage, 'index.html'),
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="UTF-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n<link rel="icon" href="data:," />\n<title>${brandCustom.brandName || meta.name}</title>\n</head>\n<body>\n<div id="root"></div>\n<script type="module" src="/src/main.jsx"></script>\n</body>\n</html>\n`);

mkdirSync(join(stage, 'src'), { recursive: true });
// Brand, colours, contact details and imagery: src/custom.json (Kela defaults).
writeFileSync(join(stage, 'src', 'custom.json'), JSON.stringify(brandCustom, null, 2) + '\n');
writeFileSync(join(stage, 'src', 'main.jsx'), [
  "import React from 'react';",
  "import ReactDOM from 'react-dom/client';",
  "import Template from '../template/index.jsx';",
  "import { CustomProvider, scopeVars } from '../_shared/CustomContext.jsx';",
  "import { customTokensCss } from '../_shared/brand.js';",
  "import { startSmoothScroll } from '../_shared/smoothScroll.js';",
  "// Brand name, colours (primaryColor/accentColor), fontPair, currency, contactEmail,",
  "// instagramUrl, images and productNames — edit this file to re-brand the site.",
  "import custom from './custom.json';",
  "",
  "// The template declares its colour tokens on its own root, so customised values",
  "// are re-asserted there.",
  `const tokens = customTokensCss('${designId}', custom, '${category}');`,
  "if (tokens) {",
  "  const style = document.createElement('style');",
  "  style.textContent = tokens;",
  "  document.head.appendChild(style);",
  "}",
  "",
  "ReactDOM.createRoot(document.getElementById('root')).render(",
  "  <React.StrictMode>",
  `    <div className="tpl-scope tpl-${designId}" style={scopeVars(custom)}>`,
  "      <CustomProvider value={custom}><Template /></CustomProvider>",
  "    </div>",
  "  </React.StrictMode>",
  ");",
  "",
  "// Inertial wheel scrolling keeps scrubbed and pinned sections in lockstep with the scroll.",
  "startSmoothScroll();",
  "",
].join('\n'));

const readme = existsSync(join(tplDir, 'README.md')) ? readFileSync(join(tplDir, 'README.md'), 'utf8') : '';
writeFileSync(join(stage, 'README.md'),
  `# ${brandCustom.brandName || meta.name} — ${meta.tag || category} website\n\n${readme}\n\n## Run standalone\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Brand it\n\nEdit \`src/custom.json\` — brandName, primaryColor, accentColor,\nfontPair ("Display|Body"), currency, contactEmail, instagramUrl, images, productNames.\n`);

// 3. zip it
mkdirSync(join(root, 'public', 'downloads'), { recursive: true });
const out = join(root, 'public', 'downloads', `${designId}-source.zip`);
// zip -r updates in place: delete any previous archive first, otherwise
// files removed from the template (e.g. old hero-loop.mp4) persist as ghosts.
rmSync(out, { force: true });
execSync(`cd "${stage}" && zip -qr "${out}" . -x "node_modules/*"`);
console.log('wrote', out, (await import('fs')).statSync(out).size, 'bytes');
