import { useState } from 'react';
import ResourceCard from '../components/ResourceCard';

const resources = [
    { type: "📄 PDF Guide", title: "Introduction to Government Bonds for Retail Investors", meta: "Beginner", linkText: "⬇ Download" },
    { type: "🎬 Video", title: "What is Public Debt? — Explained Simply in Khmer", meta: "12 min", linkText: "▶ Watch" },
    { type: "🖼 Infographic", title: "Cambodia's Debt Portfolio — Visual Overview 2024", meta: "Infographic", linkText: "🔍 View" },
    { type: "📄 PDF Guide", title: "How to Buy Government Bonds — Step by Step", meta: "Investor Guide", linkText: "⬇ Download" },
    { type: "🔗 External", title: "ADB Cambodia Country Page — Economic Overview", meta: "ADB", linkText: "↗ Open" },
    { type: "🎬 Video", title: "Understanding Treasury Bills — Short-term Investments", meta: "8 min", linkText: "▶ Watch" },
];

const TAB_MAP = {
    'All Resources': null,
    '📄 PDF Guides': '📄 PDF Guide',
    '🎬 Videos': '🎬 Video',
    '🖼 Infographics': '🖼 Infographic',
    '🔗 Links': '🔗 External',
};

export default function Education(){
    const [activeTab, setActiveTab] = useState('All Resources');
    const [search, setSearch] = useState('');
    const tabs = ['All Resources', '📄 PDF Guides', '🎬 Videos', '🖼 Infographics', '🔗 Links'];

    const filtered = resources.filter(r => {
        const matchesTab = activeTab === 'All Resources' || r.type === TAB_MAP[activeTab];
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <>
            {/* page header */}
            <div className="bg-linear-to-br from-green to-green-2 pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className='max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10'>
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-[rgba(255,255,255,0.6)] before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">
                            Learning Resources
                        </div>
                        <div className='font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]'>
                            Education <em className='not-italic text-white/75 font-light'>Centre</em>
                        </div>
                        <div className='text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]'>
                            Free guides, videos, and infographics on public debt and investment.
                        </div>
                    </div>
                    <div className='font-mono text-[11px] text-white/30 text-right leading-loose'>
                        <strong className='text-white/85 text-[15px] block font-semibold'>{filtered.length}</strong>
                        resources available
                    </div>
                </div>
            </div>

            {/* fbar */}
            <div className='bg-white border-b border-light-2 sticky top-16 z-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
                <div className='max-w-325 mx-auto px-8 flex items-center overflow-x-auto'>
                    {tabs.map(tab => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3.75 text-[13px] cursor-pointer whitespace-nowrap border-b-2 -mb-px transition-all duration-150
                                ${activeTab === tab
                                    ? 'font-semibold text-teal border-teal'
                                    : 'font-medium text-text-3 border-transparent hover:text-text'
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                    <div className='ml-auto py-2 shrink-0'>
                        <input
                            className='border-[1.5px] border-light-2 px-3.5 py-2 text-[13px] font-body outline-none text-text bg-snow rounded-sm w-55 transition-[border-color] duration-150 focus:border-teal placeholder:text-text-3'
                            type='text'
                            placeholder='Search resources...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* resources grid */}
            <div className='py-18 bg-snow'>
                <div className='max-w-325 mx-auto px-8'>
                    {filtered.length > 0 ? (
                        <div className='grid grid-cols-3 gap-4'>
                            {filtered.map((r, i) => (
                                <ResourceCard key={i} type={r.type} title={r.title} meta={r.meta} linkText={r.linkText} />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-16 text-text-3'>
                            <div className='text-[32px] mb-3'>📭</div>
                            <div className='text-[15px] font-semibold text-text-2 mb-1'>No resources found</div>
                            <div className='text-[13px]'>Try adjusting your search or filter.</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}