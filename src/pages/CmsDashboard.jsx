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
    const [preview, setPreview]     = useState(null);
    const [form, setForm]           = useState(emptyForm);
    const [editId, setEditId]       = useState(null);
    const [file, setFile]           = useState(null);
    const [cover, setCover]         = useState(null);
    const [link, setLink]           = useState('');
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState('');

    const loadRows = () => {
        fetchCmsAll().then(setRows).catch(() => setError('Failed to load.'));
    };

    useEffect(() => { loadRows(); }, []);

    const handleSectionChange = (section) => {
        const defaultType = section === 'Documents' ? 'Debt Bulletin' : section === 'Education' ? 'PDF' : 'Announcement';
        setForm({ ...form, section, type: defaultType });
        setFile(null);
        setLink('');
        setCover(null);
    };

    const openAdd = () => {
        setForm(emptyForm);
        setEditId(null);
        setFile(null);
        setLink('');
        setCover(null);
        setShowModal(true);
    };

    const openEdit = (row) => {
        setForm({
            title:       row.title       || '',
            section:     row.section     || 'Documents',
            type:        row.type        || 'Debt Bulletin',
            language:    row.language    || 'EN',
            status:      row.status      || 'draft',
            date:        row.date        || '',
            description: row.description || '',
        });
        setEditId(row.id);
        setFile(null);
        setLink('');
        setCover(null);
        setShowModal(true);
    };

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

    const handleSave = async () => {
        setLoading(true);
        const isEdit   = !!editId;
        const realId   = isEdit ? editId.split('_')[1] : null;
        const endpoint = getEndpoint(form.section, realId);

        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));

            if (form.section === 'News') {
                if (file)  fd.append('image', file);
                if (cover) fd.append('cover', cover);
            } else {
                if (form.type === 'LINK') fd.append('file_url', link);
                else if (file) fd.append('file', file);
                if (cover) fd.append('cover', cover);
            }

            const res = await fetch(endpoint, { method: 'POST', headers: { 'Accept': 'application/json' }, body: fd });
            if (!res.ok) throw new Error();
            setShowModal(false);
            setFile(null);
            setLink('');
            setCover(null);
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
        ? <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Published</span>
        : <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-blue-3 text-blue-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-blue-2">Draft</span>;

    const typeOptions = form.section === 'Documents' ? DOC_TYPES : form.section === 'Education' ? EDU_TYPES : NEWS_CATS;

    return (
        <div id="cms-dashboard">

            {/* header */}
            <div className="font-display text-[28px] font-bold text-text mb-1 tracking-[-0.3px]">Dashboard</div>
            <div className="text-[13px] text-text-3 mb-6">Overview of all content - investor.mef.gov.kh</div>

            {/* stats */}
            <div className="grid grid-cols-4 gap-3.5 mb-6">
                {[
                    { val: rows.length,                                       label: 'Total Items',    delta: 'across all sections', color: 'text-green-2' },
                    { val: rows.filter(r => r.status === 'published').length, label: 'Published',      delta: '↑ live items',        color: 'text-green-2' },
                    { val: rows.filter(r => r.status === 'draft').length,     label: 'Drafts Pending', delta: 'Needs review',        color: 'text-amber' },
                    { val: rows.filter(r => r.section === 'News').length,     label: 'News Articles',  delta: 'total articles',      color: 'text-green-2' },
                ].map((s, i) => (
                    <div key={i} className="bg-white border border-light-2 rounded-sm p-5 shadow-sm">
                        <div className="font-display text-[34px] font-bold text-text leading-none mb-1 tracking-[-0.5px]">{s.val}</div>
                        <div className="text-[12px] font-medium text-text-3">{s.label}</div>
                        <div className={`font-mono text-[10.5px] mt-1 ${s.color}`}>{s.delta}</div>
                    </div>
                ))}
            </div>

            {/* toolbar */}
            <div className="flex items-center justify-between mb-2.5">
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-text-3">All Content</div>
                <button onClick={openAdd} className="text-[13px] font-semibold px-4.5 py-2 bg-teal text-white rounded-sm cursor-pointer transition-all duration-150 hover:bg-teal-2">
                    + Add New
                </button>
            </div>

            {error && <div className="text-[13px] text-red-500 mb-3">{error}</div>}

            {/* table */}
            <table className="w-full border-collapse bg-white rounded-sm overflow-hidden shadow-sm border border-light-2">
                <thead>
                    <tr>
                        {['Title', 'Type', 'Section', 'Language', 'Status', 'Date', 'Actions'].map(h => (
                            <th key={h} className="bg-snow text-text-3 px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[1px] uppercase border-b border-light-2">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr><td colSpan={7} className="text-center py-10 text-text-3 text-[13px]">No content yet.</td></tr>
                    ) : rows.map(row => (
                        <tr key={row.id} className="group">
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><strong>{row.title}</strong></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><span className="font-mono text-[11px] text-text-3">{row.type}</span></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">{row.section}</td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">{row.language || '—'}</td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><Pill status={row.status} /></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><span className="font-mono text-[11px] text-text-3">{row.date || '—'}</span></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                                <div className="flex gap-1.25 items-center">
                                    {row.status === 'draft' ? (
                                        <>
                                            <button onClick={() => openEdit(row)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                            <button onClick={() => setPreview(row)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-blue-2 hover:text-blue-2">Preview</button>
                                            <button onClick={() => handlePublish(row.id)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-green-2 bg-transparent cursor-pointer text-green-2 rounded-[6px] transition-all duration-150 hover:bg-green-2 hover:text-white">Publish</button>
                                            <button onClick={() => handleDelete(row.id)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]">Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => openEdit(row)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text">Edit</button>
                                            <button onClick={() => handleDelete(row.id)} className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]">Delete</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* add/edit modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 z-[500] flex items-center justify-center">
                    <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] w-full max-w-[540px] p-7 max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between mb-6">
                            <div className="font-display text-[18px] font-bold text-text">{editId ? 'Edit Item' : 'Add New Item'}</div>
                            <button onClick={() => setShowModal(false)} className="text-text-3 hover:text-text text-[20px] leading-none cursor-pointer">✕</button>
                        </div>

                        <div className="flex flex-col gap-4">

                            {/* section */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Section</label>
                                <select className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal"
                                    value={form.section} onChange={e => handleSectionChange(e.target.value)}>
                                    {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                </select>
                            </div>

                            {/* type / category */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">
                                    {form.section === 'News' ? 'Category' : 'Type'}
                                </label>
                                <select className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal"
                                    value={form.type} onChange={e => { setForm({ ...form, type: e.target.value }); setFile(null); setLink(''); }}>
                                    {typeOptions.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>

                            {/* title */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Title</label>
                                <input className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Enter title..." />
                            </div>

                            {/* description — news only */}
                            {form.section === 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Description</label>
                                    <textarea className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal resize-y min-h-25"
                                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Enter news description..." />
                                </div>
                            )}

                            {/* file — documents PDF */}
                            {form.section === 'Documents' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Upload PDF</label>
                                    <div className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-doc').click()}>
                                        <div className="text-[28px] mb-1">📄</div>
                                        <div className="text-[13px] font-semibold text-text-2">{file ? file.name : 'Click to upload PDF'}</div>
                                        <div className="font-mono text-[10.5px] text-text-3 mt-1">.pdf files only</div>
                                        <input id="file-doc" type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* file — education PDF */}
                            {form.section === 'Education' && form.type === 'PDF' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Upload PDF</label>
                                    <div className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-edu-pdf').click()}>
                                        <div className="text-[28px] mb-1">📄</div>
                                        <div className="text-[13px] font-semibold text-text-2">{file ? file.name : 'Click to upload PDF'}</div>
                                        <div className="font-mono text-[10.5px] text-text-3 mt-1">.pdf files only</div>
                                        <input id="file-edu-pdf" type="file" accept=".pdf" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* file — education IMG */}
                            {form.section === 'Education' && form.type === 'IMG' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Upload Image</label>
                                    <div className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-edu-img').click()}>
                                        {file
                                            ? <img src={URL.createObjectURL(file)} className="max-h-25 mx-auto rounded mb-2 object-cover" />
                                            : <div className="text-[28px] mb-1">🖼️</div>
                                        }
                                        <div className="text-[13px] font-semibold text-text-2">{file ? file.name : 'Click to upload Image'}</div>
                                        <div className="font-mono text-[10.5px] text-text-3 mt-1">.jpg, .png files only</div>
                                        <input id="file-edu-img" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* file — education VIDEO */}
                            {form.section === 'Education' && form.type === 'VIDEO' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Upload Video</label>
                                    <div className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-edu-video').click()}>
                                        <div className="text-[28px] mb-1">🎬</div>
                                        <div className="text-[13px] font-semibold text-text-2">{file ? file.name : 'Click to upload Video'}</div>
                                        <div className="font-mono text-[10.5px] text-text-3 mt-1">.mp4 files only</div>
                                        <input id="file-edu-video" type="file" accept=".mp4" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* link — education LINK */}
                            {form.section === 'Education' && form.type === 'LINK' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">External URL</label>
                                    <input className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                        value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
                                </div>
                            )}

                            {/* cover image — news (this is the main image for news) */}
                            {form.section === 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">
                                        Cover Image <span className="font-normal text-text-3">(shown on news card)</span>
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-all duration-150 ${file ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-news-img').click()}
                                    >
                                        {file
                                            ? <img src={URL.createObjectURL(file)} className="max-h-25 mx-auto rounded mb-2 object-cover" />
                                            : <div className="text-[28px] mb-1">🖼️</div>
                                        }
                                        <div className="text-[13px] font-semibold text-text-2">{file ? file.name : 'Click to upload cover image'}</div>
                                        <div className="font-mono text-[10.5px] text-text-3 mt-1">.jpg, .png files only</div>
                                        <input id="file-news-img" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            )}

                            {/* cover image — documents and education */}
                            {form.section !== 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">
                                        Cover Image <span className="font-normal text-text-3">(optional — shown on card)</span>
                                    </label>
                                    <div
                                        className={`border-2 border-dashed rounded-sm p-5 text-center cursor-pointer transition-all duration-150 ${cover ? 'border-teal bg-teal-4' : 'border-light-2 bg-snow hover:border-teal-3 hover:bg-teal-4'}`}
                                        onClick={() => document.getElementById('file-cover').click()}
                                    >
                                        {cover ? (
                                            <div className="relative">
                                                <img
                                                    src={URL.createObjectURL(cover)}
                                                    alt="cover preview"
                                                    className="max-h-[140px] mx-auto rounded-[4px] object-cover mb-2"
                                                />
                                                <div className="text-[12px] font-semibold text-teal">{cover.name}</div>
                                                <button
                                                    onClick={e => { e.stopPropagation(); setCover(null); }}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-black/40 text-white rounded-full text-[12px] flex items-center justify-center hover:bg-black/60"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="text-[24px] mb-1">🖼️</div>
                                                <div className="text-[13px] font-semibold text-text-2">Click to upload cover image</div>
                                                <div className="font-mono text-[10.5px] text-text-3 mt-1">.jpg, .png files only</div>
                                            </>
                                        )}
                                        <input
                                            id="file-cover"
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            className="hidden"
                                            onChange={e => setCover(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* language — not for news */}
                            {form.section !== 'News' && (
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Language</label>
                                    <select className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal"
                                        value={form.language} onChange={e => setForm({ ...form, language: e.target.value })}>
                                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                            )}

                            {/* status + date */}
                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Status</label>
                                    <select className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal"
                                        value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Date</label>
                                    <input type="date" className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                        value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                            </div>

                        </div>

                        {/* footer */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setShowModal(false)} className="text-[13px] font-semibold px-4.5 py-2.25 border-[1.5px] border-light-2 bg-transparent text-text-3 rounded-sm cursor-pointer transition-all duration-150 hover:border-text-2 hover:text-text">Cancel</button>
                            <button onClick={handleSave} disabled={loading} className="text-[13px] font-semibold px-4.5 py-2.25 bg-teal text-white rounded-sm cursor-pointer transition-all duration-150 hover:bg-teal-2 disabled:opacity-50">
                                {loading ? 'Saving...' : editId ? 'Save Changes' : 'Add Item'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* preview modal */}
            {preview && (
                <div className="fixed inset-0 bg-black/40 z-[500] flex items-center justify-center">
                    <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] w-full max-w-[640px] max-h-[90vh] overflow-y-auto">

                        <div className="flex items-center justify-between px-7 py-5 border-b border-light-2">
                            <div className="flex items-center gap-3">
                                <div className="font-display text-[18px] font-bold text-text">Preview</div>
                                <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-blue-3 text-blue-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-blue-2">Draft</span>
                            </div>
                            <button onClick={() => setPreview(null)} className="text-text-3 hover:text-text text-[20px] leading-none cursor-pointer">✕</button>
                        </div>

                        <div className="p-7">

                            {/* cover / image preview */}
                            {(preview.image_url || preview.cover_url) && (
                                <div className="rounded-sm overflow-hidden mb-5 shadow-sm">
                                    <img
                                        src={`http://localhost:8000${preview.image_url || preview.cover_url}`}
                                        alt={preview.title}
                                        className="w-full h-[220px] object-cover"
                                    />
                                </div>
                            )}

                            {/* badges */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10.5px] font-bold tracking-[1px] uppercase px-2.25 py-0.75 rounded-[4px] bg-teal-4 text-teal">{preview.section}</span>
                                <span className="text-[10.5px] font-bold tracking-[1px] uppercase px-2.25 py-0.75 rounded-[4px] bg-light text-text-3">{preview.type}</span>
                            </div>

                            {/* title */}
                            <h2 className="font-display text-[22px] font-bold text-text leading-[1.3] tracking-[-0.3px] mb-3">
                                {preview.title}
                            </h2>

                            {/* description */}
                            {preview.description && (
                                <p className="text-[14px] text-text-2 leading-[1.85] mb-4">
                                    {preview.description}
                                </p>
                            )}

                            {/* meta */}
                            <div className="flex items-center gap-4 pt-4 border-t border-light-2">
                                {preview.date && (
                                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-3">
                                        📅 {preview.date}
                                    </div>
                                )}
                                {preview.language && (
                                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-3">
                                        🌐 {preview.language}
                                    </div>
                                )}
                                {preview.file_url && (
                                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-teal">
                                        📎 File attached
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* preview footer */}
                        <div className="flex justify-end gap-2 px-7 py-5 border-t border-light-2">
                            <button
                                onClick={() => { setPreview(null); openEdit(preview); }}
                                className="text-[13px] font-semibold px-4.5 py-2.25 border-[1.5px] border-light-2 bg-transparent text-text-3 rounded-sm cursor-pointer transition-all duration-150 hover:border-text-2 hover:text-text"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => { handlePublish(preview.id); setPreview(null); }}
                                className="text-[13px] font-semibold px-4.5 py-2.25 bg-teal text-white rounded-sm cursor-pointer transition-all duration-150 hover:bg-teal-2"
                            >
                                Publish Now
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}