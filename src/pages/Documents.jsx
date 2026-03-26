import { useState } from 'react';
import ResourceCard from '../components/ResourceCard';

const resources = [
    { type: "📄 Debt Bulletin", title: "Cambodia Public Debt Bulletin - Q3 2024", meta: "Sept 2024 · 2.4 MB", linkText: "⬇ Download" },
    { type: "📄 Debt Bulletin", title: "Cambodia Public Debt Bulletin — Q2 2024", meta: "Jun 2024 · 2.2 MB", linkText: "⬇ Download" },
    { type: "📄 Debt Bulletin", title: "Cambodia Public Debt Bulletin — Q1 2024", meta: "Mar 2024 · 2.1 MB", linkText: "⬇ Download" },
    { type: "📄 Statistical", title: "Annual External Debt Statistics Report 2023", meta: "Dec 2023 · 4.1 MB", linkText: "⬇ Download" },
    { type: "📄 Legal", title: "Law on Public Debt Management (2023 Amendment)", meta: "2023 · 1.2 MB", linkText: "⬇ Download" },
    { type: "📄 Bond Info", title: "Government Bond Series 6 — Prospectus 2025", meta: "Jan 2025 · 1.8 MB", linkText: "⬇ Download" },
];

const TAB_MAP = {
    'All': null,
    'Debt Bulletin': '📄 Debt Bulletin',
    'Statistical': '📄 Statistical',
    'Legal': '📄 Legal',
    'Bond Info': '📄 Bond Info',
};

export default function Documents(){
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');
    const tabs = ['All', 'Debt Bulletin', 'Statistical', 'Legal', 'Bond Info'];

    const filtered = resources.filter(r => {
        const matchesTab = activeTab === 'All' || r.type === TAB_MAP[activeTab];
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className='max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10'>
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-[rgba(255,255,255,0.6)] before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Document Library
                        </div>
                        <div className='font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]'>
                            Official <em className='not-italic text-white/75 font-light'>Publications</em>
                        </div>
                        <div className='text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]'>
                            Debt bulletin, statistical reports, legal instruments, and bond documentation.
                        </div>
                    </div>
                    <div className='font-mono text-[11px] text-white/30 text-right leading-loose'>
                        <strong className='text-white/85 text-[15px] block font-semibold'>{filtered.length}</strong>
                        documents available
                    </div>
                </div>
            </div>
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
                            placeholder='Search documents...'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
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
                            <div className='text-[15px] font-semibold text-text-2 mb-1'>No documents found</div>
                            <div className='text-[13px]'>Try adjusting your search or filter.</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}