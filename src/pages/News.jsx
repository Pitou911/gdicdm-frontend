import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { fetchNews, fetchFeaturedNews } from '../data/index';
import { useNavigate } from 'react-router-dom';


const TAB_MAP = {
    'All': null,
    'Announcements': 'Announcement',
    'Reports': 'Report',
    'Events': 'Event',
    'Press': 'Press',
};

export default function News(){
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');
    const tabs = ['All', 'Announcements', 'Reports', 'Events', 'Press'];
    const [news, setNews]             = useState([]);
    const [featuredNews, setFeaturedNews] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetchNews().then(setNews);
        fetchFeaturedNews().then(setFeaturedNews);
    }, []);
    const filtered = news.filter(n => {
        const matchesTab = activeTab === 'All' || n.category === TAB_MAP[activeTab];
        const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className='max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10'>
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Media
                        </div>
                        <div className='font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]'>
                            News &amp; <em className='not-italic text-white/75 font-light'>Announcements</em>
                        </div>
                    </div>
                    <div className='font-mono text-[11px] text-white/30 text-right leading-loose'>
                        <strong className='text-white/85 text-[15px] block font-semibold'>{filtered.length}</strong>
                        articles available
                    </div>
                </div>
            </div>

            {/* featured section — only render when featuredNews is loaded */}
            {featuredNews && (
                <div className="bg-linear-to-br from-teal to-blue relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,255,255,0.07),transparent_60%)]">
                    <div className='max-w-325 mx-auto px-8 py-13 grid grid-cols-[1fr_340px] gap-14 items-center relative z-10'>
                        <div>
                            <div className='inline-flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-semibold px-3 py-1.25 rounded-[20px] mb-4 border border-white/20'>
                                {featuredNews.chip}
                            </div>
                            <div className='font-display text-[32px] font-bold text-white leading-[1.2] mb-3.5 tracking-[-0.5px]'>
                                {featuredNews.title}
                            </div>
                            <p className='text-[14px] text-white/65 leading-[1.8] mb-5'>
                                {featuredNews.excerpt}
                            </p>
                            <div className='font-mono text-[10.5px] text-white/35'>{featuredNews.date}</div>
                            <button className='px-6 py-2.75 bg-white/10 text-white font-semibold text-[13px] border border-white/25 rounded-sm transition-all duration-150 hover:bg-white/20 inline-block mt-5'>
                                {featuredNews.link_text}
                            </button>
                        </div>
                        <div className='h-65 bg-white/10 rounded-sm border border-white/15 flex items-center justify-center text-[64px] backdrop-blur-[10px]'>
                            {featuredNews.icon}
                        </div>
                    </div>
                </div>
            )}

            <div className='py-18 bg-snow'>
                <div className='max-w-325 mx-auto px-8'>
                    <div className='flex items-center overflow-x-auto mb-7 border-b border-light-2'>
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
                                placeholder='Search news...'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    {filtered.length > 0 ? (
                        <div className='grid grid-cols-3 gap-4'>
                            {filtered.map((n, i) => (
                                <NewsCard
                                    key={i}
                                    icon={n.icon}
                                    category={n.category}
                                    title={n.title}
                                    date={n.date}
                                    imageUrl={n.image_url}
                                    description={n.description}
                                    onClick={() => navigate(`/news/${n.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-16 text-text-3'>
                            <div className='text-[32px] mb-3'>📭</div>
                            <div className='text-[15px] font-semibold text-text-2 mb-1'>No articles found</div>
                            <div className='text-[13px]'>Try adjusting your search or filter.</div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}