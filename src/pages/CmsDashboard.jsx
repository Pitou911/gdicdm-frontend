import { useState, useEffect } from 'react';

const BASE = 'http://localhost:8000/api';

const SECTIONS  = ['Documents', 'Bond Info', 'Education', 'News'];
const LANGUAGES = ['EN', 'KH', 'EN + KH', 'Both'];
const TYPES     = ['PDF', 'VIDEO', 'IMG', 'LINK'];
const STATUSES  = ['published', 'draft'];

const emptyForm = { title: '', type: 'PDF', section: 'Documents', language: 'EN', status: 'published', date: '' };

export default function CmsDashboard() {
    const [rows, setRows]         = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm]         = useState(emptyForm);
    const [editId, setEditId]     = useState(null);
    const [loading, setLoading]   = useState(false);
    const [error, setError]       = useState('');

    // ── fetch all uploads ──────────────────────────────────
    const loadRows = () => {
        fetch(`${BASE}/uploads`)
            .then(r => r.json())
            .then(setRows)
            .catch(() => setError('Failed to load data.'));
    };

    useEffect(() => { loadRows(); }, []);

    // ── open modal ─────────────────────────────────────────
    const openAdd  = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
    const openEdit = (row) => {
        setForm({
            title:    row.title,
            type:     row.type,
            section:  row.section,
            language: row.language,
            status:   row.status,
            date:     row.date,
        });
        setEditId(row.id); // this now carries the prefix e.g. 'doc_1'
        setShowModal(true);
    };

    // ── save (add or edit) ─────────────────────────────────
    const handleSave = async () => {
        setLoading(true);
        const url    = editId ? `${BASE}/uploads/${editId}` : `${BASE}/uploads`;
        const method = editId ? 'PUT' : 'POST';
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error();
            setShowModal(false);
            loadRows();
        } catch {
            setError('Failed to save.');
        } finally {
            setLoading(false);
        }
    };
    // ── publish ───────────────────────────────────────────
    const handlePublish = async (id) => {
        try {
            await fetch(`${BASE}/uploads/${id}/publish`, { method: 'PUT' });
            loadRows();
        } catch {
            setError('Failed to publish.');
        }
    };
    // ── delete ─────────────────────────────────────────────
    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        try {
            await fetch(`${BASE}/uploads/${id}`, { method: 'DELETE' });
            loadRows();
        } catch {
            setError('Failed to delete.');
        }
    };

    // ── status pill ────────────────────────────────────────
    const Pill = ({ status }) => status === 'published'
        ? <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Published</span>
        : <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-blue-3 text-blue-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-blue-2">Draft</span>;

    return (
        <div id="cms-dashboard">

            {/* header */}
            <div className="font-display text-[28px] font-bold text-text mb-1 tracking-[-0.3px]">Dashboard</div>
            <div className="text-[13px] text-text-3 mb-6">Overview of all content - investor.mef.gov.kh</div>

            {/* stats */}
            <div className="grid grid-cols-4 gap-3.5 mb-6">
                {[
                    { val: rows.length,                                          label: 'Total Uploads',    delta: '↑ +4 this month',  color: 'text-[var(--color-green-2)]' },
                    { val: rows.filter(r => r.status === 'published').length,    label: 'Published',        delta: '↑ live items',     color: 'text-[var(--color-green-2)]' },
                    { val: rows.filter(r => r.status === 'draft').length,        label: 'Drafts Pending',   delta: 'Needs review',     color: 'text-[var(--color-amber)]' },
                    { val: rows.filter(r => r.section === 'Education').length,   label: 'Education Items',  delta: '↑ resources',      color: 'text-[var(--color-green-2)]' },
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
                <div className="text-[11px] font-bold tracking-[1px] uppercase text-text-3">Recent Uploads</div>
                <button
                    onClick={openAdd}
                    className="text-[13px] font-semibold px-4.5 py-2 bg-teal text-white rounded-sm cursor-pointer transition-all duration-150 hover:bg-teal-2"
                >
                    + Add New
                </button>
            </div>

            {/* error */}
            {error && <div className="text-[13px] text-red-500 mb-3">{error}</div>}

            {/* table */}
            <table className="w-full border-collapse bg-white rounded-sm overflow-hidden shadow-sm border border-light-2">
                <thead>
                    <tr>
                        {['Title', 'Type', 'Section', 'Language', 'Status', 'Date', 'Actions'].map(h => (
                            <th key={h} className="bg-snow text-text-3 px-3.5 py-2.5 text-left text-[10.5px] font-bold tracking-[1px] uppercase border-b border-light-2">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-10 text-text-3 text-[13px]">No uploads yet.</td>
                        </tr>
                    ) : rows.map(row => (
                        <tr key={row.id} className="group">
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><strong>{row.title}</strong></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><span className="font-mono text-[11px] text-text-3">{row.type}</span></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">{row.section}</td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">{row.language}</td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><Pill status={row.status} /></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow"><span className="font-mono text-[11px] text-text-3">{row.date}</span></td>
                            <td className="px-3.5 py-2.75 border-b border-light text-[13px] text-text align-middle group-hover:bg-snow">
                                <div className="flex gap-1.25 items-center">
                                {row.status === 'draft' ? (
                                    <>
                                        {/* publish button */}
                                        <button
                                            onClick={() => handlePublish(row.id)}
                                            className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-green-2 bg-transparent cursor-pointer text-green-2 rounded-[6px] transition-all duration-150 hover:bg-green-2 hover:text-white"
                                        >
                                            Publish
                                        </button>
                                        {/* delete button */}
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* edit button */}
                                        <button
                                            onClick={() => openEdit(row)}
                                            className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-text-2 hover:text-text"
                                        >
                                            Edit
                                        </button>
                                        {/* delete button */}
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="text-[11.5px] font-semibold px-2.5 py-1.25 border-[1.5px] border-light-2 bg-transparent cursor-pointer text-text-3 rounded-[6px] transition-all duration-150 hover:border-[#ef4444] hover:text-[#ef4444]"
                                        >
                                            Delete
                                        </button>
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
                <div className="fixed inset-0 bg-black/40 z-500 flex items-center justify-center">
                    <div className="bg-white rounded-md) shadow-lg) w-full max-w-130 p-7">

                        {/* modal header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="font-display text-[18px] font-bold text-text">
                                {editId ? 'Edit Upload' : 'Add New Upload'}
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-text-3 hover:text-text text-[20px] leading-none cursor-pointer">✕</button>
                        </div>

                        {/* form fields */}
                        <div className="flex flex-col gap-4">

                            {/* title */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Title</label>
                                <input
                                    className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                    value={form.title}
                                    onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="Enter title..."
                                />
                            </div>

                            {/* type + section */}
                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Type</label>
                                    <select
                                        className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal"
                                        value={form.type}
                                        onChange={e => setForm({ ...form, type: e.target.value })}
                                    >
                                        {TYPES.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Section</label>
                                    <select
                                        className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal"
                                        value={form.section}
                                        onChange={e => setForm({ ...form, section: e.target.value })}
                                    >
                                        {SECTIONS.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* language + status */}
                            <div className="grid grid-cols-2 gap-3.5">
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Language</label>
                                    <select
                                        className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal"
                                        value={form.language}
                                        onChange={e => setForm({ ...form, language: e.target.value })}
                                    >
                                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Status</label>
                                    <select
                                        className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal"
                                        value={form.status}
                                        onChange={e => setForm({ ...form, status: e.target.value })}
                                    >
                                        {STATUSES.map(s => <option key={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* date */}
                            <div>
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Date</label>
                                <input
                                    type="date"
                                    className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] text-text bg-white outline-none rounded-sm transition-all duration-150 focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value })}
                                />
                            </div>

                        </div>

                        {/* modal footer */}
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-[13px] font-semibold px-4.5 py-2.25 border-[1.5px] border-light-2 bg-transparent text-text-3 rounded-sm cursor-pointer transition-all duration-150 hover:border-text-2 hover:text-text"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="text-[13px] font-semibold px-4.5 py-2.25 bg-teal text-white rounded-sm cursor-pointer transition-all duration-150 hover:bg-teal-2 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : editId ? 'Save Changes' : 'Add Upload'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}