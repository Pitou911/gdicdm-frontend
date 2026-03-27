const BASE = 'http://localhost:8000/api';

export async function fetchNews() {
    const [news, uploads] = await Promise.all([
        fetch(`${BASE}/news`).then(r => r.json()),
        fetch(`${BASE}/uploads/published`).then(r => r.json()),
    ]);

    const uploadedNews = uploads
        .filter(u => u.section === 'News')
        .map(u => ({
            id:       u.id,
            icon:     '📋',
            category: u.type || 'Announcement',
            title:    u.title,
            date:     u.date || '',
        }));

    return [...news, ...uploadedNews];
}

export async function fetchFeaturedNews() {
    return fetch(`${BASE}/news/featured`).then(r => r.json());
}

export async function fetchDocuments() {
    const [documents, uploads] = await Promise.all([
        fetch(`${BASE}/documents`).then(r => r.json()),
        fetch(`${BASE}/uploads/published`).then(r => r.json()),
    ]);

    const sectionTypeMap = {
        'Documents':   '📄 Debt Bulletin',
        'Bond Info':   '📄 Bond Info',
        'Statistical': '📄 Statistical',
        'Legal':       '📄 Legal',
    };

    const uploadedDocs = uploads
        .filter(u => u.section === 'Documents' || u.section === 'Bond Info')
        .map(u => ({
            id:       u.id,
            type:     sectionTypeMap[u.section] || '📄 Debt Bulletin',
            title:    u.title,
            meta:     u.date || '',
            linkText: '⬇ Download',
            fileUrl:  u.file_url || null,
        }));

    return [...documents, ...uploadedDocs];
}

export async function fetchResources() {
    const [resources, uploads] = await Promise.all([
        fetch(`${BASE}/resources`).then(r => r.json()),
        fetch(`${BASE}/uploads/published`).then(r => r.json()),
    ]);

    const typeMap = {
        'PDF':   '📄 PDF Guide',
        'VIDEO': '🎬 Video',
        'IMG':   '🖼 Infographic',
        'LINK':  '🔗 External',
    };

    const uploadedResources = uploads
        .filter(u => u.section === 'Education')
        .map(u => ({
            id:       u.id,
            type:     typeMap[u.type] || u.type,
            title:    u.title,
            meta:     u.language || '',
            linkText: u.type === 'LINK' ? '↗ Open' : '⬇ Download',
            fileUrl:  u.file_url || null,
        }));

    return [...resources, ...uploadedResources];
}