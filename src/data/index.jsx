const BASE = 'http://localhost:8000/api';

export async function fetchNews()         { return fetch(`${BASE}/news`).then(r => r.json()); }
export async function fetchFeaturedNews() { return fetch(`${BASE}/news/featured`).then(r => r.json()); }
export async function fetchDocuments()    { return fetch(`${BASE}/documents`).then(r => r.json()); }
export async function fetchResources()    { return fetch(`${BASE}/resources`).then(r => r.json()); }