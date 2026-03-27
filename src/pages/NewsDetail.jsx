import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE = 'http://localhost:8000/api';

export default function NewsDetail() {
    const { id }       = useParams();
    const navigate     = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        // try cms_news first, then fall back to seeded news
        fetch(`${BASE}/cms/news/${id}`)
            .then(r => {
                if (!r.ok) throw new Error();
                return r.json();
            })
            .then(data => { setArticle(data); setLoading(false); })
            .catch(() => {
                fetch(`${BASE}/news/${id}`)
                    .then(r => r.json())
                    .then(data => { setArticle(data); setLoading(false); })
                    .catch(() => { setError('Article not found.'); setLoading(false); });
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-snow flex items-center justify-center">
            <div className="font-mono text-[13px] text-text-3">Loading...</div>
        </div>
    );

    if (error || !article) return (
        <div className="min-h-screen bg-snow flex flex-col items-center justify-center gap-3">
            <div className="text-[32px]">📭</div>
            <div className="font-display text-[20px] font-bold text-text">Article not found</div>
            <button onClick={() => navigate('/news')} className="text-[13px] font-semibold text-teal cursor-pointer hover:underline">← Back to News</button>
        </div>
    );

    const imageUrl = article.image_url ? `http://localhost:8000${article.image_url}` : null;

    return (
        <>
            {/* page header */}
            <div className="bg-linear-to-br from-teal to-blue relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.07),transparent_60%)]">
                <div className="max-w-325 mx-auto px-8 py-13 relative z-10">

                    {/* back button */}
                    <button
                        onClick={() => navigate('/news')}
                        className="inline-flex items-center gap-2 text-white/60 text-[13px] font-medium hover:text-white transition-colors duration-150 mb-6 cursor-pointer"
                    >
                        ← Back to News
                    </button>

                    

                    {/* title */}
                    <h1 className="font-display text-[40px] font-bold text-white leading-[1.15] tracking-[-0.8px] max-w-190 mb-4">
                        {article.title}
                    </h1>

                    {/* date */}
                    <div className="font-mono text-[11px] text-white/40">
                        {article.date}
                    </div>

                </div>
            </div>

            {/* article body */}
            <div className="bg-snow py-16">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_320px] gap-14 items-start">

                    {/* main content */}
                    <div>

                        {/* cover image */}
                        {imageUrl && (
                            <div className="rounded-md overflow-hidden mb-8 shadow-md">
                                <img
                                    src={imageUrl}
                                    alt={article.title}
                                    className="w-full h-100 object-cover"
                                />
                            </div>
                        )}

                        {/* description / body */}
                        <div className="bg-white rounded-md border border-light-2 p-8 shadow-sm">
                            <div className="w-10 h-0.75 bg-linear-to-r from-teal to-teal-3 rounded-xs mb-6" />
                            <p className="text-[15px] leading-[1.9] text-text-2 whitespace-pre-line">
                                {article.description || article.excerpt || 'No description available.'}
                            </p>
                        </div>

                    </div>

                    {/* sidebar */}
                    <div className="flex flex-col gap-3">

                        {/* article info */}
                        <div className="bg-white border border-light-2 rounded-sm p-5.5 shadow-sm">
                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">
                                Article Info
                            </div>
                            <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">
                                📅 <span>{article.date || '—'}</span>
                            </div>
                            <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">
                                🏷 <span>{article.category || '—'}</span>
                            </div>
                            <div className="flex gap-2.5 text-[13.5px] text-text-2 items-start leading-normal">
                                🏛 <span>Ministry of Economy and Finance</span>
                            </div>
                        </div>

                        {/* share */}
                        <div className="bg-white border border-light-2 rounded-sm p-5.5 shadow-sm">
                            <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">
                                Share
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { label: 'Facebook', emoji: '📘' },
                                    { label: 'Twitter',  emoji: '🐦' },
                                    { label: 'Copy Link', emoji: '🔗' },
                                ].map(s => (
                                    <button
                                        key={s.label}
                                        onClick={() => s.label === 'Copy Link' && navigator.clipboard.writeText(window.location.href)}
                                        className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 border-[1.5px] border-light-2 rounded-[6px] text-text-3 cursor-pointer transition-all duration-150 hover:border-teal hover:text-teal"
                                    >
                                        {s.emoji} {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* back button */}
                        <button
                            onClick={() => navigate('/news')}
                            className="w-full py-3.25 bg-linear-to-br from-teal to-teal-2 text-white text-[13.5px] font-bold rounded-sm cursor-pointer transition-all duration-150 shadow-[0_4px_12px_rgba(0,109,110,0.3)] hover:shadow-[0_6px_20px_rgba(0,109,110,0.4)] hover:-translate-y-px"
                        >
                            ← Back to All News
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}