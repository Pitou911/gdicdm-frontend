import { useState, useEffect } from 'react';
import { fetchCmsAll } from '../data/index';

const BASE = 'http://localhost:8000/api';

const DOC_TYPES  = ['Debt Bulletin', 'Statistical', 'Legal', 'Bond Info'];
const EDU_TYPES  = ['PDF', 'VIDEO', 'IMG', 'LINK'];
const NEWS_CATS  = ['Announcement', 'Report', 'Event', 'Press'];
const LANGUAGES  = ['EN', 'KH', 'EN + KH', 'Both'];
const STATUSES   = ['published', 'draft'];
const SECTIONS   = ['Documents', 'Education', 'News'];

const emptyForm = { title: '', section: 'Documents', type: 'Debt Bulletin', language: 'EN', status: 'draft', date: '', description: '' };

export default function CmsDashboard() {
    const [rows, setRows]           = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm]           = useState(emptyForm);
    const [editId, setEditId]       = useState(null);
    const [file, setFile]           = useState(null);
    const [link, setLink]           = useState('');
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState('');

    const loadRows = () => {
        fetchCmsAll().then(setRows).catch(() => setError('Failed to load.'));
    };

    useEffect(() => { loadRows(); }, []);

    // ── section change resets type ──────────────────────
    const handleSectionChange = (section) => {
        const defaultType = section === 'Documents' ? 'Debt Bulletin' : section === 'Education' ? 'PDF' : 'Announcement';
        setForm({ ...form, section, type: defaultType });
        setFile(null);
        setLink('');
    };

    const openAdd  = () => { setForm(emptyForm); setEditId(null); setFile(null); setLink(''); setShowModal(true); };
    const openEdit = (row) => {
        setForm({ title: row.title, section: row.section, type: row.type, language: row.language || 'EN', status: row.status, date: row.date || '', description: row.description || '' });
        setEditId(row.id);
        setFile(null);
        setLink('');
        setShowModal(true);
    };

    // ── resolve endpoint by section ─────────────────────
    const getEndpoint = (section, id = null) => {
        const base = section === 'Documents' ? `${BASE}/cms/documents`
                   : section === 'Education' ? `${BASE}/cms/education`
                   : `${BASE}/cms/news`;
        return id ? `${base}/${id}` : base;
    };

    const getPublishEndpoint = (id) => {
        const [prefix, realId] = id.split('_');
        const base = prefix === 'doc'  ? `${BASE}/cms/documents`
                   : prefix === 'edu'  ? `${BASE}/cms/education`
                   : `${BASE}/cms/news`;
        return `${base}/${realId}/publish`;
    };

    const getDeleteEndpoint = (id) => {
        const [prefix, realId] = id.split('_');
        const base = prefix === 'doc'  ? `${BASE}/cms/documents`
                   : prefix === 'edu'  ? `${BASE}/cms/education`
                   : `${BASE}/cms/news`;
        return `${base}/${realId}`;
    };

    // ── save ────────────────────────────────────────────
    const handleSave = async () => {
        setLoading(true);
        const isEdit   = !!editId;
        const realId   = isEdit ? editId.split('_')[1] : null;
        const endpoint = getEndpoint(form.section, realId);

        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (form.section === 'News') {
                if (file) fd.append('image', file);
            } else {
                if (form.type === 'LINK') fd.append('file_url', link);
                else if (file) fd.append('file', file);
            }

            const res = await fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd });
            if (!res.ok) throw new Error();
            setShowModal(false);
            setFile(null);
            setLink('');
            loadRows();
        } catch {
            setError('Failed to save.');
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async (id) => {
        try {
            await fetch(getPublishEndpoint(id), { method: 'PUT' });
            loadRows();
        } catch { setError('Failed to publish.'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await fetch(getDeleteEndpoint(id), { method: 'DELETE' });
            loadRows();
        } catch { setError('Failed to delete.'); }
    };

    const Pill = ({ status }) => status === 'published'
        ? <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-green-3)] text-[var(--color-green-2)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-green-2)]">Published</span>
        : <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-blue-3)] text-[var(--color-blue-2)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-blue-2)]">Draft</span>;

    // ── type options based on section ───────────────────
    const typeOptions = form.section === 'Documents' ? DOC_TYPES : form.section === 'Education' ? EDU_TYPES : NEWS_CATS;

    return (
        <div id="cms-dashboard">

            {/* header */}
            <div className="font-[var(--font-display)] text-[28px] font-bold text-[var(--color-text)] mb-1 tracking-[-0.3px]">Dashboard</div>
            <div className="text-[13px] text-[var(--color-text-3)] mb-6">Overview of all content - investor.mef.gov.kh</div>

            {/* stats */}
            <div className="grid grid-cols-4 gap-[14px] mb-6">
                {[
                    { val: rows.length,                                        label: 'Total Items',    delta: 'across all sections', color: 'text-[var(--color-green-2)]' },
                    { val: rows.filter(r => r.status === 'published').length,  label: 'Published',      delta: '↑ live items',        color: 'text-[var(--color-green-2)]' },
                    { val: rows.filter(r => r.status === 'draft').length,      label: 'Drafts Pending', delta: 'Needs review',        color: 'text-[var(--color-amber)]' },
                    { val: rows.filter(r => r.section === 'News').length,      label: 'News Articles',  delta: 'total articles',      color: 'text-[var(--color-green-2)]' },
                ].map((s, i) => (
                    <div key={i} className="bg-white border border-[var(--color-light-2)] rounded-[var(--radius-sm)] p-5 shadow-[var(--shadow-sm)]">
                        <div className="font-[var(--font-display)] text-[34px] font-bold text-[var(--color-text)] leading-none mb-1 tracking-[-0.5px]">{s.val}</div>
                        <div className="text-[12px] font-medium text-[var(--color-text-3)]">{s.label}</div>
                        <div className={`font-mono text-[10.5px] mt-1 ${s.color}`}>{s.delta}</div>
                    </div>
                ))}
            </div>

            {/* toolbar */}
            <div className="flex items-center justify-between mb-[10px]">
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-[var(--color-text-3)]">All Content</div>
                <button onClick={openAdd} className="text-[13px] font-semibold px-[18px] py-2 bg-[var(--color-teal)] text-white rounded-[var(--radius-sm)] cursor-pointer transition-all duration-150 hover:bg-[var(--color-teal-2)]">
                    + Add New
                </button>
            </div>

            {error && <div className="text-[13px] text-red-500 mb-3">{error}</div>}

            {/* table */}
            <table className="w-full border-collapse bg-white rounded-[var(--radius-sm)] overflow-hidden shadow-[var(--shadow-sm)] border border-[var(--color-light-2)]">
                <thead>
                    <tr>
                        {['Title', 'Type', 'Section', 'Language', 'Status', 'Date', 'Actions'].map(h => (
                            <th key={h} className="bg-[var(--color-snow)] text-[var(--color-text-3)] px-[14px] py-[10px] text-left text-[10.5px] font-bold tracking-[1px] uppercase border-b border-[var(--color-light-2)]">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr><td colSpan={7} className="text-center py-10 text-[var(--color-text-3)] text-[13px]">No content yet.</td></tr>
                    ) : rows.map(row => (
                        <tr key={row.id} className="group">
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]"><strong>{row.title}</strong></td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]"><span className="font-mono text-[11px] text-[var(--color-text-3)]">{row.type}</span></td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]">{row.section}</td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]">{row.language || '—'}</td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]"><Pill status={row.status} /></td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]"><span className="font-mono text-[11px] text-[var(--color-text-3)]">{row.date || '—'}</span></td>
                            <td className="px-[14px] py-[11px] border-b border-[var(--color-light)] text-[13px] text-[var(--color-text)] align-middle group-hover:bg-[var(--color-snow)]">
                                <div className="flex gap-[5px] items-center">
                                    {row.status === 'draft' ? (
                                        <>
                                            <button onClick={() => handlePublish(row.id)} className="text-[11.5px] font-semibold px-[10px] py-[5px] border-[1.5px] border-[var(--color-green-2)] bg-transparent cursor-pointer text-[var(--color-green-2)] rounded-[6px] transition-all duration-150 hover:bg-[var(--color-green-2)] hover:text-white">Publish</button>
                                            <button onClick={() => handleDelete(row.id)} className="text-[11.5px] font-semibold px-[10px] py-[5px] border-[1.5px] border-[var(--color-light-2)] bg-transparent cursor-pointer text-[var(--color-text-3)] rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]">Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => openEdit(row)} className="text-[11.5px] font-semibold px-[10px] py-[5px] border-[1.5px] border-[var(--color-light-2)] bg-transparent cursor-pointer text-[var(--color-text-3)] rounded-[6px] transition-all duration-150 hover:border-[var(--color-text-2)] hover:text-[var(--color-text)]">Edit</button>
                                            <button onClick={() => handleDelete(row.id)} className="text-[11.5px] font-semibold px-[10px] py-[5px] border-[1.5px] border-[var(--color-light-2)] bg-transparent cursor-pointer text-[var(--color-text-3)] rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]">Delete</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-[500] flex items-center justify-center">
                    <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] w-full max-w-[540px] p-7 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">
                            <div className="font-[var(--font-display)] text-[18px] font-bold text-[var(--color-text)]">{editId ? 'Edit Item' : 'Add New Item'}</div>
                            <button onClick={() => setShowModal(false)} className="text-[var(--color-text-3)] hover:text-[var(--color-text)] text-[20px] leading-none cursor-pointer">✕</button>
                        </div>

                        <div className="flex flex-col gap-4">

                            {/* section */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Section</label>
                                <select className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)]"
                                    value={form.section} onChange={e => handleSectionChange(e.target.value)}>
                                    {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* type */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">
                                    {form.section === 'News' ? 'Category' : 'Type'}
                                </label>
                                <select className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)]"
                                    value={form.type} onChange={e => { setForm({ ...form, type: e.target.value }); setFile(null); setLink(''); }}>
                                    {typeOptions.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>

                            {/* title */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Title</label>
                                <input className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)] focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Enter title..." />
                            </div>

                            {/* description — news only */}
                            {form.section === 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Description</label>
                                    <textarea className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)] resize-y min-h-[100px]"
                                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Enter news description..." />
                                </div>
                            )}

                            {/* file upload — documents (PDF only) */}
                            {form.section === 'Documents' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Upload PDF</label>
                                    <div className={`border-2 border-dashed rounded-[var(--radius-sm)] p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-[var(--color-teal)] bg-[var(--color-teal-4)]' : 'border-[var(--color-light-2)] bg-[var(--color-snow)] hover:border-[var(--color-teal-3)] hover:bg-[var(--color-teal-4)]'}`}
                                        onClick={() => document.getElementById('file-doc').click()}>
                                        <div className="text-[28px] mb-1">📄</div>
                                        <div className="text-[13px] font-semibold text-[var(--color-text-2)]">{file ? file.name : 'Click to upload PDF'}</div>
                                        <div className="font-mono text-[10.5px] text-[var(--color-text-3)] mt-1">.pdf files only</div>
                                        <input id="file-doc" type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* file upload — education (conditional by type) */}
                            {form.section === 'Education' && form.type === 'PDF' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Upload PDF</label>
                                    <div className={`border-2 border-dashed rounded-[var(--radius-sm)] p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-[var(--color-teal)] bg-[var(--color-teal-4)]' : 'border-[var(--color-light-2)] bg-[var(--color-snow)] hover:border-[var(--color-teal-3)] hover:bg-[var(--color-teal-4)]'}`}
                                        onClick={() => document.getElementById('file-edu-pdf').click()}>
                                        <div className="text-[28px] mb-1">📄</div>
                                        <div className="text-[13px] font-semibold text-[var(--color-text-2)]">{file ? file.name : 'Click to upload PDF'}</div>
                                        <div className="font-mono text-[10.5px] text-[var(--color-text-3)] mt-1">.pdf files only</div>
                                        <input id="file-edu-pdf" type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {form.section === 'Education' && form.type === 'IMG' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Upload Image</label>
                                    <div className={`border-2 border-dashed rounded-[var(--radius-sm)] p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-[var(--color-teal)] bg-[var(--color-teal-4)]' : 'border-[var(--color-light-2)] bg-[var(--color-snow)] hover:border-[var(--color-teal-3)] hover:bg-[var(--color-teal-4)]'}`}
                                        onClick={() => document.getElementById('file-edu-img').click()}>
                                        {file
                                            ? <img src={URL.createObjectURL(file)} className="max-h-[100px] mx-auto rounded mb-2 object-cover" />
                                            : <div className="text-[28px] mb-1">🖼️</div>
                                        }
                                        <div className="text-[13px] font-semibold text-[var(--color-text-2)]">{file ? file.name : 'Click to upload Image'}</div>
                                        <div className="font-mono text-[10.5px] text-[var(--color-text-3)] mt-1">.jpg, .png files only</div>
                                        <input id="file-edu-img" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {form.section === 'Education' && form.type === 'VIDEO' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Upload Video</label>
                                    <div className={`border-2 border-dashed rounded-[var(--radius-sm)] p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-[var(--color-teal)] bg-[var(--color-teal-4)]' : 'border-[var(--color-light-2)] bg-[var(--color-snow)] hover:border-[var(--color-teal-3)] hover:bg-[var(--color-teal-4)]'}`}
                                        onClick={() => document.getElementById('file-edu-video').click()}>
                                        <div className="text-[28px] mb-1">🎬</div>
                                        <div className="text-[13px] font-semibold text-[var(--color-text-2)]">{file ? file.name : 'Click to upload Video'}</div>
                                        <div className="font-mono text-[10.5px] text-[var(--color-text-3)] mt-1">.mp4 files only</div>
                                        <input id="file-edu-video" type="file" accept=".mp4" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {form.section === 'Education' && form.type === 'LINK' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">External URL</label>
                                    <input className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)] focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                        value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
                                </div>
                            )}

                            {/* image upload — news only */}
                            {form.section === 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Cover Image</label>
                                    <div className={`border-2 border-dashed rounded-[var(--radius-sm)] p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-[var(--color-teal)] bg-[var(--color-teal-4)]' : 'border-[var(--color-light-2)] bg-[var(--color-snow)] hover:border-[var(--color-teal-3)] hover:bg-[var(--color-teal-4)]'}`}
                                        onClick={() => document.getElementById('file-news-img').click()}>
                                        {file
                                            ? <img src={URL.createObjectURL(file)} className="max-h-[100px] mx-auto rounded mb-2 object-cover" />
                                            : <div className="text-[28px] mb-1">🖼️</div>
                                        }
                                        <div className="text-[13px] font-semibold text-[var(--color-text-2)]">{file ? file.name : 'Click to upload cover image'}</div>
                                        <div className="font-mono text-[10.5px] text-[var(--color-text-3)] mt-1">.jpg, .png files only</div>
                                        <input id="file-news-img" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* language — not for news */}
                            {form.section !== 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Language</label>
                                    <select className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)]"
                                        value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
                                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                            )}

                            {/* status + date */}
                            <div className="grid grid-cols-2 gap-[14px]">
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Status</label>
                                    <select className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)]"
                                        value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-[var(--color-text-2)] mb-[6px]">Date</label>
                                    <input type="date" className="w-full border-[1.5px] border-[var(--color-light-2)] px-[14px] py-[10px] text-[14px] text-[var(--color-text)] bg-white outline-none rounded-[var(--radius-sm)] focus:border-[var(--color-teal)] focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                        value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                            </div>

                        </div>

                        {/* footer */}
                        <div className="flex justify-end gap-[8px] mt-6">
                            <button onClick={() => setShowModal(false)} className="text-[13px] font-semibold px-[18px] py-[9px] border-[1.5px] border-[var(--color-light-2)] bg-transparent text-[var(--color-text-3)] rounded-[var(--radius-sm)] cursor-pointer transition-all duration-150 hover:border-[var(--color-text-2)] hover:text-[var(--color-text)]">Cancel</button>
                            <button onClick={handleSave} disabled={loading} className="text-[13px] font-semibold px-[18px] py-[9px] bg-[var(--color-teal)] text-white rounded-[var(--radius-sm)] cursor-pointer transition-all duration-150 hover:bg-[var(--color-teal-2)] disabled:opacity-50">
                                {loading ? 'Saving...' : editId ? 'Save Changes' : 'Add Item'}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}