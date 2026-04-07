const BASE = 'http://localhost:8000/api';

// ── public pages ──────────────────────────────────────────

export async function fetchDocuments() {
    const [seeded, cms] = await Promise.all([
        fetch(`${BASE}/documents`).then(r => r.json()),
        fetch(`${BASE}/cms/documents/published`).then(r => r.json()),
    ]);

    const typeMap = {
        'Debt Bulletin': '📄 Debt Bulletin',
        'Statistical':   '📄 Statistical',
        'Legal':         '📄 Legal',
        'Bond Info':     '📄 Bond Info',
    };

    const cmsFormatted = cms.map(d => ({
        id:        d.id,
        type:      typeMap[d.type] || '📄 Debt Bulletin',
        title:     d.title,
        meta:      d.date || '',
        linkText:  '⬇ Download',
        fileUrl:   d.file_url,
        coverUrl:  d.cover_url ? `http://localhost:8000${d.cover_url}` : null,
    }));
    return [...seeded, ...cmsFormatted];
}

export async function fetchResources() {
    const [seeded, cms] = await Promise.all([
        fetch(`${BASE}/resources`).then(r => r.json()),
        fetch(`${BASE}/cms/education/published`).then(r => r.json()),
    ]);

    const typeMap = {
        'PDF':   '📄 PDF Guide',
        'VIDEO': '🎬 Video',
        'IMG':   '🖼 Infographic',
        'LINK':  '🔗 External',
    };

    const cmsFormatted = cms.map(e => ({
        id:        e.id,
        type:      typeMap[e.type] || e.type,
        title:     e.title,
        meta:      e.language || '',
        linkText:  e.type === 'LINK' ? '↗ Open' : e.type === 'VIDEO' ? '▶ Play' : '⬇ Download',
        fileUrl:   e.file_url,
        streamUrl: e.type === 'VIDEO' && e.file_url ? `http://localhost:8000/api/cms/education/${e.id}/stream` : null,
        coverUrl:  e.cover_url ? `http://localhost:8000${e.cover_url}` : null,
    }));

    return [...seeded, ...cmsFormatted];
}

export async function fetchNews() {
    const [seeded, cms] = await Promise.all([
        fetch(`${BASE}/news`).then(r => r.json()),
        fetch(`${BASE}/cms/news/published`).then(r => r.json()),
    ]);

    const cmsFormatted = cms.map(n => ({
        id:          n.id,
        category:    n.category,
        title:       n.title,
        description: n.description,
        image_url:   n.image_url   ? `http://localhost:8000${n.image_url}`   : null,
        cover_url:   n.cover_url   ? `http://localhost:8000${n.cover_url}`   : null,
        date:        n.date || '',
    }));

    return [...seeded, ...cmsFormatted];
}

export async function fetchFeaturedNews() {
    return fetch(`${BASE}/news/featured`).then(r => r.json());
}

// ── cms dashboard ─────────────────────────────────────────
export async function fetchCmsAll()  { return fetch(`${BASE}/cms`).then(r => r.json()); }

export async function fetchAuctionResults(){
    return fetch(`${BASE}/auction-results`).then(r => r.json());
}
export async function fetchAuctionCalendar() {
    return fetch(`${BASE}/auction-calendar`).then(r => r.json());
}