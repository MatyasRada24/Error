'use strict';

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

let currentCat = 'hardware';
let currentSubcat = 'cpu';
let currentSeverity = 'all';
let searchQuery = '';
let currentPage = 1;
const PAGE_SIZE = 15;
const $ = id => document.getElementById(id);
let searchTimer;


let worker;
try {
    worker = new Worker('worker.js');
} catch (e) {
    console.warn('Worker failed, using sync fallback', e);
}

if (worker) {
    worker.onerror = function (e) {
        console.warn('Worker failed to load or crashed, using sync fallback', e);
        worker = null;
    };
    worker.postMessage({ type: 'INIT', payload: { errors: ERRORS } });
}


const tbody = $('error-tbody');
const emptyState = $('empty-state');
const resultCount = $('result-count');
const globalSearch = $('global-search');
const searchClear = $('search-clear');
const severityFilter = $('severity-filter');
const errorsTitle = $('errors-title');
const errorsSubtitle = $('errors-subtitle');
const modalOverlay = $('modal-overlay');
const searchResultsInfo = $('search-results-info');
const SUBCATS = {
    cpu: { label: 'CPU Errors', sub: 'Hardware CPU faults, thermal limits, WHEA' },
    gpu: { label: 'GPU Errors', sub: 'TDR crash, Code 43, nvlddmkm, DXGI errors' },
    ram: { label: 'RAM Errors', sub: 'Faulty modules, XMP instability, MEMORY_MANAGEMENT' },
    storage: { label: 'Storage Errors (SSD/HDD)', sub: 'S.M.A.R.T., NTFS errors, INACCESSIBLE_BOOT' },
    bios: { label: 'BIOS / UEFI Errors (HW)', sub: 'POST failure, CMOS, Secure Boot, TPM' },
    psu: { label: 'Power Supply Errors (PSU)', sub: 'Power surge, overcurrent, insufficient power' },
    mobo: { label: 'Motherboard Errors', sub: 'PCIe errors, VRM overheating, short circuits' },
    network: { label: 'Network / NIC Errors', sub: 'Network drivers, DNS, connectivity' },
    windows: { label: 'Windows Errors (BSOD)', sub: 'Stop codes, critical system errors' },
    drivers: { label: 'Driver Errors', sub: 'Driver IRQL, Code 43, compatibility' },
    directx: { label: 'DirectX / OpenGL Errors', sub: 'D3D initialization, DXGI errors' },
    runtime: { label: 'Runtime & Library Errors', sub: '.NET, Visual C++, missing DLL' },
    'sw-bios': { label: 'BIOS / Firmware (SW)', sub: 'Boot loop, UEFI shell, NVRAM, CSM conflicts' },
};

const SEV_LABEL = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const SEV_CSS = { critical: 'sev-critical', high: 'sev-high', medium: 'sev-medium', low: 'sev-low' };
const SEV_DOT = { critical: '\uD83D\uDD34', high: '\uD83D\uDFE0', medium: '\uD83D\uDFE1', low: '\uD83D\uDFE2' };
const CAT_LABEL = { hardware: 'Hardware', software: 'Software' };
var ERRORS_BY_ID = new Map();
ERRORS.forEach(function (e) { ERRORS_BY_ID.set(e.id, e); });

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
function updateCounts() {
    var counts = {};
    ERRORS.forEach(function (e) { counts[e.subcat] = (counts[e.subcat] || 0) + 1; });
    Object.keys(SUBCATS).forEach(function (s) {
        var el = $('count-' + s);
        if (el) el.textContent = counts[s] || 0;
    });
}
var _scoreCache = Object.create(null);
var _scoreCacheQuery = '';
function scoreError(e, q) {
    if (q !== _scoreCacheQuery) {
        _scoreCache = Object.create(null);
        _scoreCacheQuery = q;
    }
    if (_scoreCache[e.id] !== undefined) return _scoreCache[e.id];
    var score = 0;
    var code = e.code.toLowerCase();
    var name = e.name.toLowerCase();
    var desc = e.desc.toLowerCase();
    if (code === q) score += 100;
    else if (code.startsWith(q)) score += 60;
    else if (code.includes(q)) score += 30;
    if (name === q) score += 80;
    else if (name.startsWith(q)) score += 50;
    else if (name.includes(q)) score += 25;
    if (desc.includes(q)) score += 10;
    if (e.fixes.some(function (f) { return f.toLowerCase().includes(q); })) score += 5;
    var sevBoost = { critical: 3, high: 2, medium: 1, low: 0 };
    score += (sevBoost[e.severity] || 0);
    _scoreCache[e.id] = score;
    return score;
}

function getFiltered() {
    var list = ERRORS;
    if (searchQuery) {
        var q = searchQuery.toLowerCase();
        list = list.filter(function (e) {
            return e.code.toLowerCase().includes(q) ||
                e.name.toLowerCase().includes(q) ||
                e.desc.toLowerCase().includes(q) ||
                e.fixes.some(function (f) { return f.toLowerCase().includes(q); });
        });
        list = list.slice().sort(function (a, b) {
            return scoreError(b, q) - scoreError(a, q);
        });
    } else {
        list = list.filter(function (e) { return e.subcat === currentSubcat; });
    }

    if (currentSeverity !== 'all') {
        list = list.filter(function (e) { return e.severity === currentSeverity; });
    }
    return list;
}


function getFilteredAsync() {
    if (!worker) return Promise.resolve({
        pageList: getFiltered().slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
        total: getFiltered().length,
        totalPages: Math.ceil(getFiltered().length / PAGE_SIZE)
    });

    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            console.warn('Worker timed out, using sync fallback');
            resolve({
                pageList: getFiltered().slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
                total: getFiltered().length,
                totalPages: Math.ceil(getFiltered().length / PAGE_SIZE)
            });
        }, 1000);

        const handler = (e) => {
            if (e.data.type === 'FILTER_RESULTS') {
                clearTimeout(timeout);
                worker.removeEventListener('message', handler);
                resolve(e.data.payload);
            }
        };
        worker.addEventListener('message', handler);
        worker.postMessage({
            type: 'FILTER',
            payload: {
                searchQuery,
                currentSubcat,
                currentSeverity,
                pageSize: PAGE_SIZE,
                currentPage
            }
        });
    });
}

function showSkeletons(count) {
    var cols = 5;
    var html = '';
    for (var i = 0; i < count; i++) {
        var widths = ['55%', '72%', '88%', '65%', '48%'];
        var delay = (i * 80) + 'ms';
        html += '<tr class="skeleton-row" style="animation-delay:' + delay + '">';
        for (var c = 0; c < cols; c++) {
            html += '<td><span class="skel" style="width:' + widths[c] + '"></span></td>';
        }
        html += '</tr>';
    }
    tbody.innerHTML = html;
}

var _renderRafId = null;
function renderTable() {
    if (_renderRafId) return;
    showSkeletons(Math.min(PAGE_SIZE, 8));
    var table = $('error-table');
    emptyState.style.display = 'none';
    table.style.display = 'table';

    getFilteredAsync().then(results => {
        _renderRafId = requestAnimationFrame(function () {
            _renderRafId = null;
            _renderTableNow(results);
        });
    });
}

function _renderTableNow(results) {
    const { pageList, total, totalPages } = results;
    const table = $('error-table');
    tbody.innerHTML = '';

    resultCount.textContent = total + ' errors';

    if (!total) {
        table.style.display = 'none';
        renderPagination(0, 0);

        if (searchQuery) {
            emptyState.innerHTML =
                '<svg class="empty-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="52" cy="52" r="36" stroke="var(--accent)" stroke-width="3" stroke-dasharray="6 4" opacity="0.4"/>' +
                '<line x1="79" y1="79" x2="104" y2="104" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" opacity="0.5"/>' +
                '<circle cx="52" cy="52" r="22" fill="var(--accent-glow)"/>' +
                '<text x="52" y="58" text-anchor="middle" font-size="22" fill="var(--accent)" opacity="0.7">?</text>' +
                '</svg>' +
                '<h3>No results for &ldquo;' + escHtml(searchQuery) + '&rdquo;</h3>' +
                '<p>This error code might not be in our database yet.</p>' +
                '<button class="empty-report-btn" id="empty-report-btn">&#43; Report Missing Code</button>';
            var btn = document.getElementById('empty-report-btn');
            if (btn) btn.addEventListener('click', openReport);
        } else {
            emptyState.innerHTML =
                '<div class="empty-icon">🔎</div>' +
                '<h3>No results found</h3>' +
                '<p>Try a different keyword or filter.</p>';
        }
        emptyState.style.display = 'flex';
        return;
    }
    emptyState.style.display = 'none';
    table.style.display = 'table';

    const frag = document.createDocumentFragment();
    pageList.forEach(function (err) {
        const tr = document.createElement('tr');
        const descShort = err.desc.length > 90 ? err.desc.substring(0, 90) + '...' : err.desc;
        const fixText = err.fixes[0] || '-';
        tr.innerHTML = '<td><span class="code-cell">' + escHtml(err.code) + '</span></td>' +
            '<td><strong>' + escHtml(err.name) + '</strong></td>' +
            '<td><span class="severity-badge ' + SEV_CSS[err.severity] + '">' + SEV_LABEL[err.severity] + '</span></td>' +
            '<td style="max-width:280px;font-size:.84rem;">' + escHtml(descShort) + '</td>' +
            '<td><span class="fix-preview">' + escHtml(fixText) + '</span></td>';
        tr.addEventListener('click', (function (e) { return function () { openModal(e); }; })(err));
        frag.appendChild(tr);
    });
    tbody.appendChild(frag);
    renderPagination(totalPages, total);
}


function renderPagination(totalPages, total) {
    const container = $('pagination');
    if (!container) return;
    container.innerHTML = '';
    if (totalPages <= 1) return;

    const wrap = document.createElement('div');
    wrap.className = 'pagination-inner';


    const prev = document.createElement('button');
    prev.className = 'page-btn' + (currentPage === 1 ? ' disabled' : '');
    prev.disabled = currentPage === 1;
    prev.textContent = '\u2190 Previous';
    prev.addEventListener('click', function () {
        if (currentPage > 1) { currentPage--; renderTable(); }
    });
    wrap.appendChild(prev);


    var maxBtns = 7;
    var startP = Math.max(1, currentPage - Math.floor(maxBtns / 2));
    var endP = Math.min(totalPages, startP + maxBtns - 1);
    if (endP - startP < maxBtns - 1) startP = Math.max(1, endP - maxBtns + 1);

    if (startP > 1) {
        var b1 = document.createElement('button');
        b1.className = 'page-btn'; b1.textContent = '1';
        b1.addEventListener('click', function () { currentPage = 1; renderTable(); });
        wrap.appendChild(b1);
        if (startP > 2) {
            var d1 = document.createElement('span');
            d1.className = 'page-ellipsis'; d1.textContent = '...';
            wrap.appendChild(d1);
        }
    }
    for (var i = startP; i <= endP; i++) {
        (function (p) {
            var btn = document.createElement('button');
            btn.className = 'page-btn' + (p === currentPage ? ' active' : '');
            btn.textContent = String(p);
            btn.addEventListener('click', function () { currentPage = p; renderTable(); });
            wrap.appendChild(btn);
        })(i);
    }
    if (endP < totalPages) {
        if (endP < totalPages - 1) {
            var d2 = document.createElement('span');
            d2.className = 'page-ellipsis'; d2.textContent = '...';
            wrap.appendChild(d2);
        }
        var bLast = document.createElement('button');
        bLast.className = 'page-btn'; bLast.textContent = String(totalPages);
        bLast.addEventListener('click', function () { currentPage = totalPages; renderTable(); });
        wrap.appendChild(bLast);
    }


    var next = document.createElement('button');
    next.className = 'page-btn' + (currentPage === totalPages ? ' disabled' : '');
    next.disabled = currentPage === totalPages;
    next.textContent = 'Next \u2192';
    next.addEventListener('click', function () {
        if (currentPage < totalPages) { currentPage++; renderTable(); }
    });
    wrap.appendChild(next);


    var info = document.createElement('span');
    info.className = 'page-info';
    var from = (currentPage - 1) * PAGE_SIZE + 1;
    var to = Math.min(currentPage * PAGE_SIZE, total);
    info.textContent = from + '\u2013' + to + ' of ' + total;
    wrap.appendChild(info);

    container.appendChild(wrap);
}

function updateHeader() {
    var info = SUBCATS[currentSubcat] || {};
    errorsTitle.textContent = info.label || currentSubcat;
    errorsSubtitle.textContent = info.sub || '';
}

var WIN_VER_LABEL = {
    'win10': 'Windows 10',
    'win11': 'Windows 11',
    'win10-11': 'Windows 10 / 11',
    'win7': 'Windows 7',
    'win-all': 'All Windows'
};

function highlightMatch(text, q) {
    if (!q) return escHtml(text);
    var escaped = escHtml(text);
    var escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return escaped.replace(new RegExp('(' + escapedQ + ')', 'gi'), '<mark class="hl">$1</mark>');
}

function openModal(err) {
    $('modal-badge').textContent = (CAT_LABEL[err.cat] || err.cat) + ' \u203a ' + (SUBCATS[err.subcat] ? SUBCATS[err.subcat].label : err.subcat);
    $('modal-code').textContent = err.code;
    $('modal-title').textContent = err.name;
    var sev = $('modal-severity');
    sev.textContent = SEV_DOT[err.severity] + ' ' + SEV_LABEL[err.severity];
    sev.className = 'modal-severity severity-badge ' + SEV_CSS[err.severity];
    $('modal-cat').textContent = err.id;

    var winTagEl = $('modal-win-ver');
    if (err.winver && WIN_VER_LABEL[err.winver]) {
        winTagEl.textContent = '\uD83D\uDDA5\uFE0F ' + WIN_VER_LABEL[err.winver];
        winTagEl.style.display = 'inline-flex';
    } else if (err.subcat === 'windows' || err.subcat === 'drivers') {
        winTagEl.textContent = '\uD83D\uDDA5\uFE0F Windows 10 / 11';
        winTagEl.style.display = 'inline-flex';
    } else {
        winTagEl.style.display = 'none';
    }

    $('modal-desc').textContent = err.desc;
    $('modal-causes').innerHTML = err.causes.map(function (c) { return '<li>' + escHtml(c) + '</li>'; }).join('');
    $('modal-fixes').innerHTML = err.fixes.map(function (f) { return '<li>' + escHtml(f) + '</li>'; }).join('');

    var cmdSec = $('modal-cmd-section');
    if (err.cmds && err.cmds.length) {
        cmdSec.style.display = 'block';
        $('modal-cmds').innerHTML = err.cmds.map(function (c, i) {
            return '<div class="cmd-row">' +
                '<div class="cmd-block" id="cmd-text-' + i + '">' + escHtml(c) + '</div>' +
                '<button class="cmd-copy-btn" data-cmd="' + escHtml(c) + '" data-idx="' + i + '" aria-label="Copy command" title="Copy">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">' +
                '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
                '<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>' +
                '</svg>' +
                '</button>' +
                '</div>';
        }).join('');
        $('modal-cmds').querySelectorAll('.cmd-copy-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var text = btn.dataset.cmd;
                navigator.clipboard.writeText(text).then(function () {
                    btn.classList.add('copied');
                    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>';
                    setTimeout(function () {
                        btn.classList.remove('copied');
                        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>';
                    }, 1800);
                }).catch(function () {
                    var ta = document.createElement('textarea');
                    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
                    document.body.appendChild(ta); ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    btn.classList.add('copied');
                    setTimeout(function () { btn.classList.remove('copied'); }, 1800);
                });
            });
        });
    } else {
        cmdSec.style.display = 'none';
    }

    var SEV_WEIGHT = { critical: 4, high: 3, medium: 2, low: 1 };
    var related = ERRORS
        .filter(function (e) { return e.subcat === err.subcat && e.id !== err.id; })
        .sort(function (a, b) { return (SEV_WEIGHT[b.severity] || 0) - (SEV_WEIGHT[a.severity] || 0); })
        .slice(0, 4);
    var relSec = $('modal-related-section');
    var relList = $('modal-related-list');
    if (related.length) {
        relList.innerHTML = related.map(function (r) {
            return '<div class="related-item" data-id="' + r.id + '">' +
                '<span class="related-code">' + escHtml(r.code) + '</span>' +
                '<span class="related-name">' + escHtml(r.name) + '</span>' +
                '<span class="severity-badge ' + SEV_CSS[r.severity] + ' related-sev">' + SEV_LABEL[r.severity] + '</span>' +
                '</div>';
        }).join('');
        relList.querySelectorAll('.related-item').forEach(function (el) {
            el.addEventListener('click', function () {
                var target = ERRORS_BY_ID.get(el.dataset.id);
                if (target) openModal(target);
            });
        });
        relSec.style.display = 'block';
    } else {
        relSec.style.display = 'none';
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var modalEl = $('modal');
    if (modalEl) modalEl.scrollTop = 0;

    if (!window.history.state || window.history.state.code !== err.code) {
        window.history.pushState({ code: err.code }, '', '/error/' + encodeURIComponent(err.code));
    }
    updateSEOMeta(err);
}

function updateCanonical(url) {
    var link = document.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
    }
    link.href = url;
}

var SEO_DEFAULTS = {
    title: 'ErrorFixer - PC Error Database | BSOD, CPU, GPU, BIOS, Windows',
    description: 'ErrorFixer - a comprehensive database of 300+ PC error codes. Fix BSODs, GPU crashes, CPU faults, DirectX, BIOS problems, and Windows errors step-by-step.',
    keywords: 'PC error codes, BSOD fix, WHEA error, nvlddmkm, DPC_WATCHDOG_VIOLATION, IRQL_NOT_LESS_OR_EQUAL, CPU error, GPU error code 43, BIOS error, Windows blue screen, DirectX error, DXGI error, RAM error, SSD error, SMART error',
    canonical: 'https://errorsfixer.com/',
    ogTitle: 'ErrorFixer - Database of 300+ PC Error Codes',
    ogDesc: 'Find and fix error codes for CPU, GPU, RAM, BIOS, DirectX, and Windows. 300+ errors with detailed step-by-step guides.',
    ogUrl: 'https://errorsfixer.com/'
};

function setMeta(name, content, prop) {
    var sel = prop ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]';
    var el = document.querySelector(sel);
    if (el) el.setAttribute('content', content);
}

function updateSEOMeta(err) {
    var url = 'https://errorsfixer.com/error/' + encodeURIComponent(err.code);
    var title = err.code + ': ' + err.name + ' — Fix & Solution | ErrorFixer';
    var desc = 'How to fix ' + err.code + ': ' + err.desc.substring(0, 140) +
        ' Causes: ' + err.causes.slice(0, 2).join(', ') + '. Fix: ' + err.fixes[0] + '.';
    var keywords = err.code + ', ' + err.name + ', fix ' + err.code + ', ' +
        err.causes.slice(0, 3).join(', ') + ', ' + (SUBCATS[err.subcat] ? SUBCATS[err.subcat].label : err.subcat) + ' error';

    /* Basic */
    document.title = title;
    setMeta('description', desc);
    setMeta('keywords', keywords);
    updateCanonical(url);

    /* Open Graph */
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', url, true);
    setMeta('og:type', 'article', true);

    /* Twitter Card */
    setMeta('twitter:title', title);
    setMeta('twitter:description', desc);

    /* JSON-LD HowTo structured data */
    var existing = document.getElementById('seo-error-jsonld');
    if (existing) existing.remove();

    var stepsJson = err.fixes.map(function (fix, i) {
        return '{"@type":"HowToStep","position":' + (i + 1) + ',"name":' + JSON.stringify(fix) + ',"text":' + JSON.stringify(fix) + '}';
    }).join(',');

    var causesText = err.causes.join('; ');
    var cmdsText = err.cmds && err.cmds.length ? ' Diagnostic commands: ' + err.cmds.join(', ') + '.' : '';

    var ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.id = 'seo-error-jsonld';
    ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': 'How to fix ' + err.code + ': ' + err.name,
        'description': err.desc + ' Common causes: ' + causesText + '.' + cmdsText,
        'url': url,
        'inLanguage': 'en',
        'totalTime': 'PT15M',
        'supply': err.cmds && err.cmds.length ? [{'@type': 'HowToSupply', 'name': 'Windows Command Prompt (Admin)'}] : [],
        'step': err.fixes.map(function (fix, i) {
            return {'@type': 'HowToStep', 'position': i + 1, 'name': fix, 'text': fix};
        })
    });
    document.head.appendChild(ld);

    /* Breadcrumb JSON-LD */
    var existingBc = document.getElementById('seo-error-breadcrumb');
    if (existingBc) existingBc.remove();
    var catLabel = SUBCATS[err.subcat] ? SUBCATS[err.subcat].label : err.subcat;
    var bc = document.createElement('script');
    bc.type = 'application/ld+json';
    bc.id = 'seo-error-breadcrumb';
    bc.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'ErrorFixer', 'item': 'https://errorsfixer.com/'},
            {'@type': 'ListItem', 'position': 2, 'name': catLabel, 'item': 'https://errorsfixer.com/?cat=' + err.subcat},
            {'@type': 'ListItem', 'position': 3, 'name': err.code, 'item': url}
        ]
    });
    document.head.appendChild(bc);
}

function resetSEOMeta() {
    document.title = SEO_DEFAULTS.title;
    setMeta('description', SEO_DEFAULTS.description);
    setMeta('keywords', SEO_DEFAULTS.keywords);
    updateCanonical(SEO_DEFAULTS.canonical);
    setMeta('og:title', SEO_DEFAULTS.ogTitle, true);
    setMeta('og:description', SEO_DEFAULTS.ogDesc, true);
    setMeta('og:url', SEO_DEFAULTS.ogUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:title', SEO_DEFAULTS.ogTitle);
    setMeta('twitter:description', SEO_DEFAULTS.ogDesc);
    var ld = document.getElementById('seo-error-jsonld');
    if (ld) ld.remove();
    var bc = document.getElementById('seo-error-breadcrumb');
    if (bc) bc.remove();
}

function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    if (window.location.pathname.includes('/error/') || window.location.search.includes('code=')) {
        window.history.pushState(null, '', '/');
    }
    resetSEOMeta();
}

function switchSubcat(subcat, parent) {
    document.querySelectorAll('.subcat-card').forEach(function (c) { c.classList.remove('active'); });
    var card = document.querySelector('.subcat-card[data-subcat="' + subcat + '"]');
    if (card) card.classList.add('active');
    currentSubcat = subcat;
    currentPage = 1;
    if (parent) {
        document.querySelectorAll('.cat-tab').forEach(function (b) { b.classList.remove('active'); });
        var catTab = document.querySelector('.cat-tab[data-cat="' + parent + '"]');
        if (catTab) catTab.classList.add('active');
        currentCat = parent;
        $('hardware-grid').classList.toggle('hidden', currentCat !== 'hardware');
        $('software-grid').classList.toggle('hidden', currentCat !== 'software');
    }
    updateHeader();
    renderTable();
}

document.querySelectorAll('.cat-tab').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.cat-tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentCat = btn.dataset.cat;
        currentPage = 1;
        $('hardware-grid').classList.toggle('hidden', currentCat !== 'hardware');
        $('software-grid').classList.toggle('hidden', currentCat !== 'software');
        var first = document.querySelector('.subcat-card[data-parent="' + currentCat + '"]');
        if (first) { first.click(); }
    });
});

document.querySelectorAll('.subcat-card').forEach(function (card) {
    card.addEventListener('click', function () {
        document.querySelectorAll('.subcat-card').forEach(function (c) { c.classList.remove('active'); });
        card.classList.add('active');
        currentSubcat = card.dataset.subcat;
        currentPage = 1;
        updateHeader();
        renderTable();
        $('errors-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

document.querySelectorAll('.footer-cat-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        switchSubcat(link.dataset.subcat, link.dataset.parent);
        $('categories').scrollIntoView({ behavior: 'smooth' });
    });
});
var searchDropdown = (function () {
    var el = document.createElement('div');
    el.id = 'search-dropdown';
    el.className = 'search-dropdown';
    el.style.display = 'none';
    var box = $('hero-inline-box');
    if (box && box.parentNode) box.parentNode.insertBefore(el, box.nextSibling);
    return el;
})();

function renderDropdown(query) {
    if (!query || query.length < 2) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
    }

    if (!worker) {
        const q = query.toLowerCase();
        const scored = ERRORS
            .filter(e => e.code.toLowerCase().includes(q) || e.name.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q))
            .map(e => ({ e, s: scoreError(e, q) }))
            .sort((a, b) => b.s - a.s)
            .slice(0, 25);
        _renderDropdownUI(scored, scored.length, q);
        return;
    }

    const handler = (e) => {
        if (e.data.type === 'DROPDOWN_RESULTS') {
            worker.removeEventListener('message', handler);
            _renderDropdownUI(e.data.payload.results, e.data.payload.total, e.data.payload.query);
        }
    };
    worker.addEventListener('message', handler);
    worker.postMessage({ type: 'DROPDOWN', payload: { query } });
}

function _renderDropdownUI(scored, totalCount, q) {
    if (!scored.length) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
    }

    var countLabel = '<div class="sd-header">' +
        (totalCount > 25
            ? 'Top 25 of ' + totalCount + ' results'
            : totalCount + ' result' + (totalCount !== 1 ? 's' : '')) +
        ' &mdash; scroll for more' +
        '</div>';

    var html = countLabel + scored.map(function (item) {
        var err = item.e;
        var sevClass = SEV_CSS[err.severity] || '';
        var hlCode = highlightMatch(err.code, q);
        var hlName = highlightMatch(err.name, q);
        return '<div class="sd-item" tabindex="0" data-id="' + err.id + '">' +
            '<div class="sd-main">' +
            '<span class="sd-code">' + hlCode + '</span>' +
            '<span class="sd-name">' + hlName + '</span>' +
            '</div>' +
            '<span class="sd-sev severity-badge ' + sevClass + '">' + (SEV_LABEL[err.severity] || '') + '</span>' +
            '</div>';
    }).join('');
    searchDropdown.innerHTML = html;
    searchDropdown.style.display = 'block';


    searchDropdown.querySelectorAll('.sd-item').forEach(function (item) {
        item.addEventListener('mousedown', function (ev) {
            ev.preventDefault();
            var id = item.dataset.id;
            var err = ERRORS_BY_ID.get(id);
            if (err) {
                searchDropdown.style.display = 'none';
                searchDropdown.innerHTML = '';
                globalSearch.value = err.code;
                searchQuery = err.code;
                searchClear.style.display = 'block';
                currentPage = 1;
                searchResultsInfo.style.display = 'block';
                getFilteredAsync().then(results => {
                    searchResultsInfo.style.display = 'block';
                    searchResultsInfo.textContent = 'Found ' + results.total + ' results for "' + err.code + '"';
                    renderTable();
                });

                openModal(err);
            }
        });
    });
}



document.addEventListener('click', function (e) {
    if (!searchDropdown.contains(e.target) && e.target !== globalSearch) {
        searchDropdown.style.display = 'none';
    }
});

globalSearch.addEventListener('focus', function () {
    if (globalSearch.value.trim().length >= 2) renderDropdown(globalSearch.value.trim());
});

globalSearch.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
        return;
    }
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        var items = searchDropdown.querySelectorAll('.sd-item');
        if (items.length) items[0].focus();
    }
});

searchDropdown.addEventListener('keydown', function (e) {
    var items = Array.from(searchDropdown.querySelectorAll('.sd-item'));
    var idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < items.length - 1) items[idx + 1].focus();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) items[idx - 1].focus();
        else globalSearch.focus();
    } else if (e.key === 'Enter' && idx >= 0) {
        items[idx].dispatchEvent(new MouseEvent('mousedown'));
    }
});
globalSearch.addEventListener('input', function () {
    clearTimeout(searchTimer);
    var rawVal = globalSearch.value.trim();
    renderDropdown(rawVal);
    searchTimer = setTimeout(function () {
        searchQuery = rawVal;
        currentPage = 1;
        searchClear.style.display = searchQuery ? 'block' : 'none';

        if (searchQuery) {
            getFilteredAsync().then(results => {
                searchResultsInfo.style.display = 'block';
                searchResultsInfo.textContent = 'Found ' + results.total + ' results for "' + searchQuery + '"';
                renderTable();
            });
        } else {
            searchResultsInfo.style.display = 'none';
            renderTable();
        }
    }, 200);
});


searchClear.addEventListener('click', function () {
    globalSearch.value = '';
    searchQuery = '';
    currentPage = 1;
    searchClear.style.display = 'none';
    searchResultsInfo.style.display = 'none';
    searchDropdown.style.display = 'none';
    searchDropdown.innerHTML = '';
    renderTable();
});

severityFilter.addEventListener('change', function () {
    currentSeverity = severityFilter.value;
    currentPage = 1;
    renderTable();
});

$('modal-close').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function (e) { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeReport(); } });
var themeToggle = $('theme-toggle');
var iconMoon = $('icon-moon');
var iconSun = $('icon-sun');
themeToggle.addEventListener('click', function () {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
    iconMoon.style.display = isLight ? 'block' : 'none';
    iconSun.style.display = isLight ? 'none' : 'block';
});

var reportOverlay = $('report-overlay');
var reportClose = $('report-close');
var reportForm = $('report-form');
var reportMsg = $('report-msg');
var reportSubmit = $('report-submit');
var footerBtn = $('footer-report-btn');

function openReport() {
    reportOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    reportMsg.style.display = 'none';
    reportForm.reset();
}
function closeReport() {
    reportOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (footerBtn) footerBtn.addEventListener('click', openReport);
if (reportClose) reportClose.addEventListener('click', closeReport);
if (reportOverlay) reportOverlay.addEventListener('click', function (e) { if (e.target === reportOverlay) closeReport(); });

if (reportForm) {
    reportForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var code = $('rep-code').value.trim();
        var desc = $('rep-desc').value.trim();
        if (!code || !desc) {
            showReportMsg('error', '\u26A0 Please fill in the required fields: Error code and Description.');
            return;
        }
        reportSubmit.disabled = true;
        var btnText = reportSubmit.querySelector('span');
        var originalText = btnText.textContent;
        btnText.textContent = 'Sending...';

        fetch('https://formspree.io/f/mjglkbrw', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Error code': code,
                'Category': $('rep-cat').value || 'Not specified',
                'Error description': desc,
                'Solution': $('rep-fix').value || 'Not specified',
                '_subject': 'ErrorFixer: New report - ' + code
            })
        }).then(function (res) {
            if (res.ok) {
                showReportMsg('success', '\u2713 Report sent! Thank you for contributing to the database.');
                reportForm.reset();
                setTimeout(closeReport, 2500);
            } else {
                showReportMsg('error', '\u2717 Failed to send. Please try again or check your connection.');
            }
        }).catch(function () {
            showReportMsg('error', '\u2717 Connection error. Please try again later.');
        }).finally(function () {
            reportSubmit.disabled = false;
            btnText.textContent = originalText;
        });
    });
}

function showReportMsg(type, text) {
    reportMsg.className = 'report-msg ' + type;
    reportMsg.textContent = text;
    reportMsg.style.display = 'block';
}

$('hamburger').addEventListener('click', function () {
    $('main-nav').classList.toggle('mobile-open');
});

    $('main-nav').addEventListener('click', function (e) {
    if (e.target.classList.contains('nav-link')) {
        $('main-nav').classList.remove('mobile-open');
    }
});

function animateCounter(el, target, dur) {
    dur = dur || 1400;
    var step = target / (dur / 16);
    var val = 0;
    var t = setInterval(function () {
        val += step;
        if (val >= target) { el.textContent = target; clearInterval(t); return; }
        el.textContent = Math.floor(val);
    }, 16);
}

function initParticles() {
    var canvas = $('particleCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W = canvas.width = innerWidth;
    var H = canvas.height = innerHeight;
    var pts = Array.from({ length: 55 }, function () {
        return {
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.4 + 0.4,
            vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
            a: Math.random() * .45 + .1
        };
    });
    window.addEventListener('resize', function () { W = canvas.width = innerWidth; H = canvas.height = innerHeight; });
    var LINK = 110;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < pts.length; i++) {
            var p = pts[i];
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
            ctx.fillStyle = 'rgba(59,130,246,' + p.a + ')'; ctx.fill();
            p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
            for (var j = i + 1; j < pts.length; j++) {
                var dx = p.x - pts[j].x, dy = p.y - pts[j].y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < LINK) {
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = 'rgba(59,130,246,' + (.07 * (1 - d / LINK)) + ')';
                    ctx.lineWidth = .5; ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

function observeCounters(selector) {
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.querySelectorAll('[data-target]').forEach(function (el) { animateCounter(el, +el.dataset.target); });
                obs.unobserve(e.target);
            }
        });
    }, { threshold: .3 });
    document.querySelectorAll(selector).forEach(function (el) { obs.observe(el); });
}

document.addEventListener('DOMContentLoaded', function () {
    var hwCount = ERRORS.filter(function (e) { return e.cat === 'hardware'; }).length;
    var swCount = ERRORS.filter(function (e) { return e.cat === 'software'; }).length;
    document.querySelectorAll('.stat-value').forEach(function (el) {
        var label = el.nextElementSibling ? el.nextElementSibling.textContent : '';
        if (label.indexOf('Hardware') !== -1) { el.dataset.target = hwCount; el.textContent = hwCount; }
        if (label.indexOf('Software') !== -1) { el.dataset.target = swCount; el.textContent = swCount; }
        if (label.indexOf('CPU') !== -1) { var v = ERRORS.filter(function (e) { return e.subcat === 'cpu'; }).length; el.dataset.target = v; el.textContent = v; }
        if (label.indexOf('GPU') !== -1) { var v2 = ERRORS.filter(function (e) { return e.subcat === 'gpu'; }).length; el.dataset.target = v2; el.textContent = v2; }
    });

    updateCounts();
    updateHeader();
    renderTable();
    setTimeout(initParticles, 100);
    observeCounters('#stats');
    renderTrendingCards();
    function checkUrlForError() {
        var path = window.location.pathname;
        var code = null;
        if (path.includes('/error/')) {
            code = decodeURIComponent(path.split('/error/')[1].split('?')[0].split('#')[0]);
        } else {
            code = new URLSearchParams(window.location.search).get('code');
        }
        if (code) {
            var err = ERRORS.find(function (e) { return e.code === code || e.id === code; });
            if (err) openModal(err);
        }
    }
    checkUrlForError();
});

window.addEventListener('popstate', function (e) {
    var path = window.location.pathname;
    var code = null;
    if (path.includes('/error/')) {
        code = decodeURIComponent(path.split('/error/')[1].split('?')[0].split('#')[0]);
    } else {
        code = new URLSearchParams(window.location.search).get('code');
    }

    if (code) {
        var err = ERRORS.find(function (er) { return er.code === code || er.id === code; });
        if (err) openModal(err);
    } else {
        closeModal();
    }
});
var TREND_CODES = [
    'WHEA_UNCORRECTABLE_ERROR',
    'nvlddmkm',
    'DPC_WATCHDOG_VIOLATION',
    'VIDEO_TDR_FAILURE',
];

var SUBCAT_LABEL = {
    cpu: 'Processor (CPU)', gpu: 'Graphics Card (GPU)', ram: 'RAM Memory',
    storage: 'Storage (SSD/HDD)', bios: 'BIOS / UEFI', psu: 'Power Supply (PSU)',
    mobo: 'Motherboard', network: 'Network / NIC', windows: 'Windows / BSOD',
    drivers: 'Drivers', directx: 'DirectX / OpenGL', runtime: 'Runtime & Libraries',
    'sw-bios': 'BIOS / Firmware (SW)'
};

function renderTrendingCards() {
    var container = document.getElementById('hero-trends-cards');
    if (!container) return;

    var found = [];
    TREND_CODES.forEach(function (q) {
        if (found.length >= 10) return;
        var lq = q.toLowerCase();
        var match = ERRORS.find(function (e) {
            return e.code.toLowerCase().includes(lq) || e.name.toLowerCase().includes(lq);
        });
        if (match && !found.some(function (x) { return x.id === match.id; })) {
            found.push(match);
        }
    });

    var frag = document.createDocumentFragment();
    found.forEach(function (err) {
        var isHW = err.cat === 'hardware';
        var descShort = err.desc.length > 110 ? err.desc.substring(0, 110) + '...' : err.desc;
        var fixShort = err.fixes[0] ? (err.fixes[0].length > 120 ? err.fixes[0].substring(0, 120) + '...' : err.fixes[0]) : '';
        var subcatLabel = SUBCAT_LABEL[err.subcat] || err.subcat;

        var card = document.createElement('div');
        card.className = 'hcard';
        card.innerHTML =
            '<div class="hcard-top">' +
            '<span class="hcard-badge ' + (isHW ? 'hw' : 'sw') + '">' + (isHW ? 'Hardware' : 'Software') + '</span>' +
            '<span class="hcard-subcat">' + escHtml(subcatLabel) + '</span>' +
            '</div>' +
            '<div class="hcard-body">' +
            '<div class="hcard-title">' + escHtml(err.name) + '</div>' +
            '<div class="hcard-desc-box"><strong>General Description:</strong> ' + escHtml(descShort) + '</div>' +
            '<div class="hcard-tags">' +
            '<span class="hcard-tag severity-badge ' + SEV_CSS[err.severity] + '">' + SEV_LABEL[err.severity] + '</span>' +
            '<span class="hcard-tag">' + escHtml(err.code) + '</span>' +
            '</div>' +
            (fixShort ? '<div class="hcard-solution"><div class="hcard-solution-title">&#128295; Possible solution:</div><div class="hcard-solution-text">' + escHtml(fixShort) + '</div></div>' : '') +
            '</div>' +
            '<div class="hcard-footer">' +
            '<button class="hcard-btn">View detailed solution &#8594;</button>' +
            '</div>';

        card.addEventListener('click', function () { openModal(err); });
        frag.appendChild(card);
    });

    container.appendChild(frag);
}
