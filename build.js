const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.js');
const indexFile = path.join(__dirname, 'index.html');
const sitemapFile = path.join(__dirname, 'sitemap.xml');
const errorDir = path.join(__dirname, 'error');

// 1. Load data
console.log('Loading data.js...');
const dataContent = fs.readFileSync(dataFile, 'utf8');
// Extract the ERRORS array from the data.js file
let ERRORS = [];
try {
    // A simple trick to execute the script and get the ERRORS variable
    const scriptContext = dataContent.replace('const ERRORS =', 'global.ERRORS =');
    eval(scriptContext);
    ERRORS = global.ERRORS;
} catch (err) {
    console.error('Failed to parse data.js:', err);
    process.exit(1);
}

console.log(`Loaded ${ERRORS.length} errors.`);

// 2. Read index.html
const indexHtml = fs.readFileSync(indexFile, 'utf8');

// Ensure error directory exists
if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir);
}

// Helper to escape HTML
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

const CAT_LABEL = { hardware: 'Hardware', software: 'Software' };
const SUBCATS = {
    cpu: { label: 'CPU Errors' },
    gpu: { label: 'GPU Errors' },
    ram: { label: 'RAM Errors' },
    storage: { label: 'Storage Errors (SSD/HDD)' },
    bios: { label: 'BIOS / UEFI Errors (HW)' },
    psu: { label: 'Power Supply Errors (PSU)' },
    mobo: { label: 'Motherboard Errors' },
    network: { label: 'Network / NIC Errors' },
    windows: { label: 'Windows Errors (BSOD)' },
    drivers: { label: 'Driver Errors' },
    directx: { label: 'DirectX / OpenGL Errors' },
    runtime: { label: 'Runtime & Library Errors' },
    'sw-bios': { label: 'BIOS / Firmware (SW)' },
};

// 3. Generate individual HTML files for each error
console.log('Generating static HTML pages for errors...');
ERRORS.forEach(error => {
    // Generate clean URL friendly code
    const cleanCode = encodeURIComponent(error.code);
    
    // Create specific title and description
    const title = `${error.code} - ${error.name} | ErrorFixer`;
    const desc = error.desc;
    const url = `https://errorsfixer.com/error/${cleanCode}`;
    
    let html = indexHtml;
    
    // removed base tag injection since index.html has <base href="/" />
    
    // Update Meta tags
    html = html.replace(/<title>.*?<\/title>/, `<title>${escHtml(title)}</title>`);
    html = html.replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escHtml(desc)}" />`);
    
    // Update OG tags
    html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escHtml(title)}" />`);
    html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escHtml(desc)}" />`);
    html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escHtml(url)}" />`);
    
    // Update Twitter tags
    html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escHtml(title)}" />`);
    html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escHtml(desc)}" />`);
    
    // Update Canonical URL
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);

    // Inject a script to open this error automatically on load
    const initScript = `
    <script>
      window.PRELOAD_ERROR = ${JSON.stringify(error)};
    </script>
    `;
    html = html.replace('</body>', `${initScript}</body>`);
    
    const outputPath = path.join(errorDir, `${cleanCode}.html`);
    fs.writeFileSync(outputPath, html, 'utf8');
});

console.log('Generated all static pages.');

// 4. Generate dynamic sitemap.xml
console.log('Generating sitemap.xml...');
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://errorsfixer.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

// Add categories
Object.keys(SUBCATS).forEach(subcat => {
    sitemapContent += `
  <url>
    <loc>https://errorsfixer.com/?cat=${subcat}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});

// Add individual error pages
ERRORS.forEach(error => {
    const cleanCode = encodeURIComponent(error.code);
    sitemapContent += `
  <url>
    <loc>https://errorsfixer.com/error/${cleanCode}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
});

sitemapContent += `\n</urlset>`;

fs.writeFileSync(sitemapFile, sitemapContent, 'utf8');
console.log('sitemap.xml updated successfully.');

console.log('Build completed successfully!');
