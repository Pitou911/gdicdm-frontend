import { useState } from 'react';
import ResourceCard from '../components/ResourceCard';

export default function Documents(){
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Debt Bulletin', 'Statistical', 'Legal', 'Bond Info'];

    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg='DOCS'>
                <div className='max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10'>
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Document Library</div>
                        <div className='font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]'>Official <em className='not-italic text-white/75 font-light'>Publications</em></div>
                        <div className='text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]'>Debt bulletin, statistical reports, legal instruments, and bond documentation.</div>   
                    </div>
                    <div className='font-mono text-[11px] text-white/30 text-right leading-loose'>
                        <strong className='text-white/85 text-[15px] block font-semibold'>156</strong>documents available
                    </div>
                </div>
            </div>
            <div className='bg-white border-b border-light-2 sticky top-16 z-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
                <div className='max-w-325 mx-auto px-8 flex items-center overflow-x-auto'>
                    {tabs.map(tab => (
                        <div
                            key={tab}
                            className={`px-4 py-3.75 text-[13px] font-medium text-text-3 cursor-pointer whitespace-nowrap border-b-2 border-transparent -mb-px transition-all duration-150 hover:text-text ${activeTab === tab ? 'font-semibold text-teal border-teal' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                    <div className='ml-auto py-2 shrink-0'>
                        <input className='border-[1.5px] border-light-2 px-3.5 py-2 text-[13px] font-body outline-none text-text bg-snow rounded-sm w-55 transition-[border-color] duration-150 focus:border-teal placeholder:text-text-3' type='text' placeholder='Search documents...'/>
                    </div>
                </div>
            </div>
            <div className='py-18 bg-snow'>
                <div className='max-w-325 mx-auto px-8'>
                    <div className='grid grid-cols-3 gap-4'>
                        <ResourceCard type="📄 Debt Bulletin" title="Cambodia Public Debt Bulletin - Q3 2024" meta="Sept 2024 · 2.4 MB" linkText="⬇ Download"/>
                        <ResourceCard type="📄 Debt Bulletin" title="Cambodia Public Debt Bulletin — Q2 2024" meta="Jun 2024 · 2.2 MB" linkText="⬇ Download" />
                        <ResourceCard type="📄 Debt Bulletin" title="Cambodia Public Debt Bulletin — Q1 2024" meta="Mar 2024 · 2.1 MB" linkText="⬇ Download" />
                        <ResourceCard type="📄 Statistical" title="Annual External Debt Statistics Report 2023" meta="Dec 2023 · 4.1 MB" linkText="⬇ Download" />
                        <ResourceCard type="📄 Legal" title="Law on Public Debt Management (2023 Amendment)" meta="2023 · 1.2 MB" linkText="⬇ Download" />
                        <ResourceCard type="📄 Bond Info" title="Government Bond Series 6 — Prospectus 2025" meta="Jan 2025 · 1.8 MB" linkText="⬇ Download" />
                    </div>
                </div>
            </div>
        </>
    )
}