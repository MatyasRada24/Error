let ERRORS = [];
let _scoreCache = Object.create(null);
let _scoreCacheQuery = '';

function scoreError(e, q) {
    if (q !== _scoreCacheQuery) {
        _scoreCache = Object.create(null);
        _scoreCacheQuery = q;
    }
    if (_scoreCache[e.id] !== undefined) return _scoreCache[e.id];
    let score = 0;
    const code = e.code.toLowerCase();
    const name = e.name.toLowerCase();
    const desc = e.desc.toLowerCase();
    if (code === q) score += 100;
    else if (code.startsWith(q)) score += 60;
    else if (code.includes(q)) score += 30;
    if (name === q) score += 80;
    else if (name.startsWith(q)) score += 50;
    else if (name.includes(q)) score += 25;
    if (desc.includes(q)) score += 10;
    if (e.fixes.some(f => f.toLowerCase().includes(q))) score += 5;
    const sevBoost = { critical: 3, high: 2, medium: 1, low: 0 };
    score += (sevBoost[e.severity] || 0);
    _scoreCache[e.id] = score;
    return score;
}

self.onmessage = function(e) {
    const { type, payload } = e.data;
    if (type === 'INIT') {
        ERRORS = payload.errors;
    } else if (type === 'FILTER') {
        const { searchQuery, currentSubcat, currentSeverity, pageSize, currentPage } = payload;
        let list = ERRORS;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(err => 
                err.code.toLowerCase().includes(q) ||
                err.name.toLowerCase().includes(q) ||
                err.desc.toLowerCase().includes(q) ||
                err.fixes.some(f => f.toLowerCase().includes(q))
            );
            list = list.slice().sort((a, b) => scoreError(b, q) - scoreError(a, q));
        } else {
            list = list.filter(err => err.subcat === currentSubcat);
        }
        if (currentSeverity !== 'all') {
            list = list.filter(err => err.severity === currentSeverity);
        }
        
        const total = list.length;
        const totalPages = Math.ceil(total / pageSize);
        const pageList = list.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        
        self.postMessage({
            type: 'FILTER_RESULTS',
            payload: { pageList, total, totalPages }
        });
    } else if (type === 'DROPDOWN') {
        const q = payload.query.toLowerCase();
        const scored = ERRORS
            .filter(err => err.code.toLowerCase().includes(q) || err.name.toLowerCase().includes(q) || err.desc.toLowerCase().includes(q))
            .map(err => ({ e: err, s: scoreError(err, q) }))
            .sort((a, b) => b.s - a.s)
            .slice(0, 25);
            
        self.postMessage({
            type: 'DROPDOWN_RESULTS',
            payload: { results: scored, total: scored.length, query: payload.query }
        });
    }
};
