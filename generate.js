'use strict';
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8')
  .replace(/\/\/#\s*sourceMappingURL.*/g, '');
let db;
try {
  db = eval(raw + '\nerrorCodes');
} catch (e) {
  console.error('Failed to eval data.js:', e.message);
  process.exit(1);
}
if (!Array.isArray(db)) { console.error('errorCodes not array'); process.exit(1); }
const errorCodes = db;

const BASE = 'https://errorsfixer.com';
const TODAY = new Date().toISOString().slice(0, 10);

const byId = {};
const byCat = {};
errorCodes.forEach(e => {
  byId[e.id] = e;
  const cat = (e.category && (e.category.en || e.category.cs)) || 'other';
  if (!byCat[cat]) byCat[cat] = [];
  byCat[cat].push(e.id);
});

const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const strip = s => String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

function steps(sol) {
  const out = []; let m, re = /<li>([\s\S]*?)<\/li>/gi, i = 1;
  while ((m = re.exec(sol)) !== null) out.push({
    "@type": "HowToStep", "position": i++, "text": strip(m[1])
  });
  return out;
}

function renderSol(sol) {
  if (!sol) return '<p>Řešení není dostupné.</p>';
  if (sol.trimStart().startsWith('<')) return sol;
  return `<p>${esc(sol)}</p>`;
}

function getRelated(err) {
  const cat = (err.category && (err.category.en || err.category.cs)) || 'other';
  const ids = (byCat[cat] || []).filter(id => id !== err.id).slice(0, 5);
  return ids.map(id => byId[id]).filter(Boolean);
}

function page(err) {
  const { id, code, type } = err;
  const descCs = strip(err.description && (err.description.cs || err.description.en) || '');
  const descEn = strip(err.description && err.description.en || '');
  const catCs = (err.category && (err.category.cs || err.category.en)) || '';
  const catEn = (err.category && (err.category.en || err.category.cs)) || '';
  const solCs = (err.solution && (err.solution.cs || err.solution.en)) || '';
  const solEn = (err.solution && err.solution.en) || '';
  const detCs = strip((err.details && (err.details.cs || err.details.en)) || '');
  const detEn = strip((err.details && err.details.en) || '');
  const related = getRelated(err);

  const url = `${BASE}/error/${id}/`;
  const title = `${code} - Oprava a Řešení | Error Code Explorer`;
  const rawMeta = descCs || descEn;
  const metaBase = rawMeta.slice(0, 145) + (rawMeta.length > 145 ? '…' : '');
  const meta = metaBase;

  const howToSteps = steps(solCs);
  const howTo = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Jak opravit ${code} - krok za krokem`,
    "description": descCs,
    "totalTime": "PT15M",
    "step": howToSteps.length ? howToSteps : [{ "@type": "HowToStep", "position": 1, "text": strip(solCs || solEn) }]
  });

  const article = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${code} - Příčiny, diagnostika a oprava`,
    "description": descCs,
    "url": url,
    "inLanguage": "cs",
    "datePublished": TODAY,
    "dateModified": TODAY,
    "author": { "@type": "Organization", "name": "Error Code Explorer", "url": BASE + "/" },
    "publisher": { "@type": "Organization", "name": "Error Code Explorer", "url": BASE + "/" }
  });

  const bread = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Error Code Explorer", "item": BASE + "/" },
      { "@type": "ListItem", "position": 2, "name": catCs || catEn, "item": `${BASE}/?type=${type}` },
      { "@type": "ListItem", "position": 3, "name": code, "item": url }
    ]
  });

  const faq = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Co je chyba ${code}?`,
        "acceptedAnswer": { "@type": "Answer", "text": descCs || descEn }
      },
      {
        "@type": "Question",
        "name": `Jak opravit ${code}?`,
        "acceptedAnswer": { "@type": "Answer", "text": strip(solCs || solEn).slice(0, 500) }
      },
      ...(detCs ? [{
        "@type": "Question",
        "name": `Jaké jsou technické příčiny chyby ${code}?`,
        "acceptedAnswer": { "@type": "Answer", "text": detCs.slice(0, 500) }
      }] : [])
    ]
  });

  // ── Related errors section ──
  const relatedHtml = related.length > 0 ? `
  <section class="related" aria-label="Podobné chyby">
    <h2>🔗 Podobné chyby ve stejné kategorii</h2>
    <ul class="related-list">
      ${related.map(r => `<li><a href="/error/${r.id}/">${esc(r.code)} <span class="rel-cat">${esc((r.category && (r.category.cs || r.category.en)) || '')}</span></a></li>`).join('\n      ')}
    </ul>
  </section>` : '';

  return `<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(meta)}">
<meta name="keywords" content="${esc(code)}, oprava ${esc(code)}, jak opravit ${esc(code)}, ${esc(code)} fix, ${esc(catCs)}, ${esc(catEn)}, chybový kód PC, Error Code Explorer">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
<meta name="author" content="Error Code Explorer">
<meta name="theme-color" content="#0b0f1a">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="cs" href="${url}">
<link rel="alternate" hreflang="en" href="${url}?lang=en">
<link rel="alternate" hreflang="x-default" href="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(meta)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:image" content="${BASE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="cs_CZ">
<meta property="og:site_name" content="Error Code Explorer">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(meta)}">
<meta name="twitter:image" content="${BASE}/og-image.png">
<link rel="icon" type="image/png" href="/favicon.png?v=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet"></noscript>
<script type="application/ld+json">${howTo}</script>
<script type="application/ld+json">${article}</script>
<script type="application/ld+json">${bread}</script>
<script type="application/ld+json">${faq}</script>
<style>
/* ── Critical CSS ── */
:root {
  --bg: #0b0f1a;
  --bg2: #0f172a;
  --card: rgba(23,32,53,0.85);
  --border: rgba(148,163,184,0.13);
  --accent: #38bdf8;
  --accent-glow: rgba(56,189,248,0.18);
  --text: #f8fafc;
  --muted: #94a3b8;
  --hw: #f97316;
  --sw: #8b5cf6;
  --green: #22c55e;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Outfit','Segoe UI',system-ui,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.75;min-height:100vh}
.wrap{max-width:860px;margin:0 auto;padding:1.5rem 1.2rem 4rem}

/* ── Nav ── */
.site-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;padding:.75rem 1rem;background:var(--card);border:1px solid var(--border);border-radius:14px;backdrop-filter:blur(8px)}
.logo{display:inline-flex;align-items:center;gap:.5rem;color:var(--accent);text-decoration:none;font-weight:800;font-size:1.05rem}
.back{color:var(--muted);text-decoration:none;font-size:.88rem;transition:color .2s;padding:.3rem .7rem;border-radius:8px;border:1px solid var(--border)}
.back:hover{color:var(--accent);border-color:var(--accent)}

/* ── Breadcrumb ── */
.breadcrumb{display:flex;flex-wrap:wrap;align-items:center;gap:.3rem;font-size:.8rem;color:var(--muted);margin-bottom:1.2rem;list-style:none}
.breadcrumb a{color:var(--muted);text-decoration:none;transition:color .15s}
.breadcrumb a:hover{color:var(--accent)}
.breadcrumb li+li::before{content:"›";margin-right:.3rem}

/* ── Badge & Category ── */
.meta-row{display:flex;align-items:center;gap:.6rem;margin-bottom:.8rem;flex-wrap:wrap}
.badge{display:inline-block;font-size:.68rem;font-weight:800;padding:.25rem .7rem;border-radius:50px;text-transform:uppercase;letter-spacing:.06em}
.badge.hardware{background:rgba(249,115,22,.18);color:var(--hw)}
.badge.software{background:rgba(139,92,246,.18);color:var(--sw)}
.cat{font-size:.83rem;color:var(--muted);background:rgba(255,255,255,.05);padding:.2rem .6rem;border-radius:6px}

/* ── Hero ── */
h1{font-size:clamp(1.9rem,5vw,2.8rem);font-weight:800;margin:.4rem 0 1rem;line-height:1.15;letter-spacing:-.02em}
.lead{color:#cbd5e1;font-size:1.05rem;margin-bottom:2rem;max-width:700px;line-height:1.8}

/* ── Cards ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:18px;padding:1.6rem 1.8rem;margin-bottom:1.5rem;position:relative;overflow:hidden}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),transparent)}
.card h2{font-size:1.05rem;font-weight:700;color:var(--accent);margin-bottom:1rem;display:flex;align-items:center;gap:.5rem}

/* ── Solution steps ── */
ol.sol-steps{padding-left:1.5rem;color:#e2e8f0}
ol.sol-steps li{margin-bottom:.9rem;padding-left:.2rem}
ol.sol-steps strong{color:var(--text)}
ol.sol-steps code{background:rgba(56,189,248,.12);color:var(--accent);padding:.1em .4em;border-radius:4px;font-size:.87em;font-family:monospace}
ol.sol-steps a{color:var(--accent);text-underline-offset:2px}

/* ── Technical details ── */
.muted{color:var(--muted);font-size:.9rem;line-height:1.9}

/* ── CTA ── */
.cta-row{display:flex;flex-wrap:wrap;gap:1rem;margin:1.5rem 0}
.cta{display:inline-flex;align-items:center;gap:.6rem;background:var(--accent);color:#0b0f1a;font-weight:700;font-size:.97rem;padding:.85rem 2rem;border-radius:12px;text-decoration:none;transition:transform .15s,box-shadow .15s}
.cta:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(56,189,248,.3)}
.cta-secondary{background:transparent;color:var(--accent);border:1px solid var(--accent);padding:.8rem 1.6rem;border-radius:12px;text-decoration:none;font-weight:600;font-size:.95rem;transition:background .15s}
.cta-secondary:hover{background:var(--accent-glow)}

/* ── English section ── */
.en-block{border-top:1px solid var(--border);padding-top:1.2rem;margin-top:1.2rem}
.en-label{font-size:.72rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.7rem;display:flex;align-items:center;gap:.4rem}

/* ── Related ── */
.related h2{font-size:1rem;color:var(--text);margin-bottom:1rem;font-weight:700}
.related-list{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.related-list a{display:flex;align-items:center;justify-content:space-between;padding:.6rem 1rem;background:rgba(255,255,255,.03);border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--accent);font-weight:600;font-size:.9rem;transition:background .15s,border-color .15s}
.related-list a:hover{background:var(--accent-glow);border-color:var(--accent)}
.rel-cat{color:var(--muted);font-weight:400;font-size:.8rem}

/* ── Footer ── */
footer{margin-top:3rem;padding-top:1.5rem;border-top:1px solid var(--border);color:#475569;font-size:.82rem;text-align:center}
footer a{color:var(--accent);text-decoration:none}
footer p{margin-bottom:.4rem}

/* ── Mobile ── */
@media(max-width:600px){
  .site-nav{flex-wrap:wrap;gap:.5rem}
  h1{font-size:1.8rem}
  .card{padding:1.2rem}
  .cta{padding:.75rem 1.4rem;font-size:.9rem}
}
</style>
</head>
<body>
<div class="wrap">

  <nav class="site-nav" aria-label="Navigace">
    <a class="logo" href="/">⚡ Error Code Explorer</a>
    <a class="back" href="/">← Zpět na databázi</a>
  </nav>

  <nav aria-label="Drobková navigace">
    <ol class="breadcrumb">
      <li><a href="/">Error Code Explorer</a></li>
      <li><a href="/?type=${type}">${esc(catCs || catEn)}</a></li>
      <li aria-current="page">${esc(code)}</li>
    </ol>
  </nav>

  <header>
    <div class="meta-row">
      <span class="badge ${type}">${type.toUpperCase()}</span>
      <span class="cat">${esc(catCs)}</span>
    </div>
    <h1>${esc(code)}</h1>
    <p class="lead">${esc(descCs || descEn)}</p>
  </header>

  <main>
    <div class="card">
      <h2>🔧 Řešení krok za krokem</h2>
      ${renderSol(solCs)}
    </div>

    ${detCs ? `<div class="card">
      <h2>🔬 Technické detaily (Deep Dive)</h2>
      <p class="muted">${esc(detCs)}</p>
    </div>` : ''}

    <div class="cta-row">
      <a class="cta" href="/?code=${id}">▶ Otevřít interaktivní průvodce</a>
      <a class="cta-secondary" href="/">← Prohledat celou databázi</a>
    </div>

    ${descEn || solEn ? `<div class="card" lang="en">
      <div class="en-block">
        <div class="en-label">🇬🇧 English version</div>
        <h2 style="color:#f8fafc;font-size:1rem;margin-bottom:.6rem">${esc(code)} – Fix Guide</h2>
        ${descEn ? `<p class="muted" style="margin-bottom:.9rem">${esc(descEn)}</p>` : ''}
        ${solEn ? renderSol(solEn) : ''}
        ${detEn ? `<p class="muted" style="margin-top:.8rem;font-size:.85rem">${esc(detEn)}</p>` : ''}
      </div>
    </div>` : ''}

    ${relatedHtml}
  </main>

  <footer>
    <p>© 2026 <a href="/">Error Code Explorer</a> — Databáze chybových kódů PC</p>
    <p><a href="/sitemap.xml">Sitemap</a> · <a href="/?type=all">Všechny chyby</a> · <a href="/?type=hardware">Hardware</a> · <a href="/?type=software">Software</a></p>
  </footer>

</div>
</body>
</html>`;
}

let count = 0;
const sitemapUrls = [];

errorCodes.forEach(err => {
  const dir = path.join(__dirname, 'error', err.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(err), 'utf8');
  sitemapUrls.push(err.id);
  count++;
  if (count % 30 === 0) process.stdout.write(`${count}...`);
});

console.log(`\n✅ Generated ${count} static error pages in /error/`);

// ── Regenerate sitemap.xml ────────────────────────────────────────────────────
// Priority assignment: popular errors (gpu-43, cpu-whea, disk-smart, etc.) get 0.9
const HIGH_PRIORITY = new Set([
  'gpu-43', 'cpu-whea', 'gpu-tdr', 'disk-smart', 'ram-irql', 'win-bootmgr',
  'win-bsod-critical', 'net-dns', 'drv-gpu-driver-crash', 'win-update-error',
  'win-page-fault', 'disk-bad-sectors', 'ram-xmp', 'bios-secure-boot',
  'win-inaccessible-boot', 'win-0x80070643', 'win-0xc0000225'
]);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>${BASE}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="cs"        href="${BASE}/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="${BASE}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="zh"        href="${BASE}/?lang=zh"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>
    <image:image>
      <image:loc>${BASE}/og-image.png</image:loc>
      <image:title>Error Code Explorer – Databáze chybových kódů PC</image:title>
    </image:image>
  </url>

${sitemapUrls.map(id => `  <url>
    <loc>${BASE}/error/${id}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${HIGH_PRIORITY.has(id) ? '0.9' : '0.8'}</priority>
    <xhtml:link rel="alternate" hreflang="cs"        href="${BASE}/error/${id}/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="${BASE}/error/${id}/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/error/${id}/"/>
  </url>`).join('\n')}

</urlset>
`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log(`✅ sitemap.xml updated with ${count + 1} URLs`);
