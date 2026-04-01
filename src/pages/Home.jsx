import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { useLanguage } from '../context/LanguageContext';
import ResourceCard from '../components/ResourceCard';
import NewsCard from '../components/NewsCard';
import { fetchDocuments, fetchNews } from '../data/index';
import { PortfolioDonut, DebtGDPLine, DebtServiceBar } from '../components/DebtCharts';

export default function Home() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchDocuments().then(docs => setDocuments(docs.slice(0, 3)));
        fetchNews().then(items => setNews(items.slice(0, 3)));
    }, []);

    return (
        <>
            <div className='relative overflow-hidden min-h-140 flex items-center bg-[linear-gradient(160deg,var(--color-teal)_0%,var(--color-teal-2)_40%,var(--color-blue)_100%)]'>
                <div className='absolute -top-30 -right-20 w-125 h-125 rounded-full bg-white/5 pointer-events-none'></div>
                <div className='absolute -bottom-20 -left-50 w-75 h-75 rounded-full bg-white/4 pointer-events-none'></div>
                <div className='absolute inset-0 opacity-40 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[28px_28px]'></div>
                <div className='relative z-2 max-w-325 mx-auto px-8 py-20 grid grid-cols-[1fr_380px] gap-16 items-center w-full'>
                    <div>
                        <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-[20px] mb-5.5 border border-white/20'>
                            <span className='w-1.5 h-1.5 rounded-full bg-teal-3 animate-pulse'></span> Official Public Debt Portal · Kingdom of Cambodia
                        </div>
                        <div className='text-[52px] font-bold text-white leading-[1.1] tracking-[-1px] mb-4.5'>
                            Cambodia's Public Debt
                            <em id='h-heroSub2' className='not-italic text-white/75 font-light block text-[44px]'>{t('heroSub2')}</em>
                        </div>
                        <p className='text-[15.5px] text-white/70 leading-[1.75] max-w-110 mb-9' id='h-heroSub'>
                            {t('heroSub')}
                        </p>
                        <div className='flex gap-3 flex-wrap'>
                            <Link to="/debt" className='px-7 py-3 bg-white text-teal font-bold text-[14px] rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-150 hover:bg-teal-4 hover:shadow-(--shadow-md) inline-block'>
                                {t('heroBtn1')}
                            </Link>
                            <Link to="/bonds" className='px-6 py-2.75 bg-white/10 text-white font-semibold text-[14px] border border-white/25 rounded-sm transition-all duration-150 hover:bg-white/20 inline-block'>
                                {t('heroBtn2')}
                            </Link>
                        </div>
                    </div>
                    <div className='bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-(--radius-lg) overflow-hidden'>
                        <div className='px-5 py-3.5 border-b border-white/10 text-[11px] font-semibold text-white/60 tracking-[0.5px] flex items-center gap-2 before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full before:bg-teal-3 before:animate-pulse before:inline-block'>
                            Live Statistics · Q1 2026
                        </div>
                        <StatCard value="$12.4B" label="Total External Debt" subLabel="As of 19 March 2026" />
                        <StatCard value="31.2%" label="Debt-to-GDP Ratio" subLabel="FY 2026 · IMF Methodology" />
                        <StatCard value="Mar 2026" label="Next Bond Issuance" subLabel="Series 7 · Indicative" />
                    </div>
                </div>
            </div>

            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-325 mx-auto px-8 grid grid-cols-3'>
                    <div className='flex items-center gap-4 px-8 py-6 border-r border-gray-200'>
                        <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>📊</div>
                        <div>
                            <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>156</div>
                            <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi1')}</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 px-8 py-6 border-r border-gray-200'>
                        <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>🏦</div>
                        <div>
                            <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>24</div>
                            <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi2')}</div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 px-8 py-6'>
                        <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>🌏</div>
                        <div>
                            <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>23</div>
                            <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi3')}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white py-13'>
                <div className='max-w-325 mx-auto px-8'>
                    <div className='flex items-end justify-between mb-9 gap-5 flex-wrap'>
                        <div>
                            <div className='eyebrow flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600'>Debt Statistics</div>
                            <div className='text-[36px] font-bold text-gray-900 leading-[1.15] tracking-[-0.5px]'>
                                Key <em className='not-italic text-teal-600'>Indicators</em>
                            </div>
                        </div>
                        <Link to='/debt' className='flex items-center gap-1.5 text-[13.5px] font-semibold text-teal-600 whitespace-nowrap cursor-pointer transition-all hover:gap-2.5'>
                            {t('linkDebtData')}
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <PortfolioDonut />
                        <DebtGDPLine />
                        <DebtServiceBar />
                    </div>
                </div>
            </div>

            <div className='py-18 bg-light'>
                <div className='max-w-325 mx-auto px-8'>
                    <div className='flex items-end justify-between mb-9 gap-5 flex-wrap'>
                        <div>
                            <div className='eyebrow flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600'>Publications</div>
                            <div className='text-[36px] font-bold text-gray-900 leading-[1.15] tracking-[-0.5px]'>
                                <em className='not-italic text-teal-600'>Latest</em> Documents
                            </div>
                        </div>
                        <Link to="/documents" className='flex items-center gap-1.5 text-[13.5px] font-semibold text-teal-600 whitespace-nowrap cursor-pointer transition-all hover:gap-2.5'>
                            {t('linkDocLibrary')}
                        </Link>
                    </div>

                    {documents.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {documents.map((d, i) => (
                                <ResourceCard
                                    key={i}
                                    id={d.id}
                                    type={d.type}
                                    title={d.title}
                                    meta={d.meta}
                                    linkText={d.linkText}
                                    fileUrl={d.fileUrl}
                                    streamUrl={d.streamUrl}
                                    coverUrl={d.coverUrl}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-10 text-text-3 text-[13px]'>
                            Loading documents...
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-linear-to-br from-blue to-blue-2 relative overflow-hidden rounded-none before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_80%_50%,rgba(255,255,255,0.06),transparent_60%)]">
                <div className="max-w-325 mx-auto px-8 py-14 grid grid-cols-[1fr_auto] items-center gap-10 relative z-10">
                    <div>
                        <div className="eyebrow flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/75">
                            {t('kpiEducation')}
                        </div>
                        <h2 className="font-display text-[36px] font-bold text-white mb-2.5 tracking-[-0.3px]">
                            {t('eduTitle')}
                        </h2>
                        <p className="text-[14px] text-white/65 max-w-120 leading-[1.75]">
                            {t('eduSub')}
                        </p>
                        <Link to="/education" className="mt-4 inline-block px-7 py-3.25 bg-white text-blue font-bold text-[13.5px] rounded-sm cursor-pointer whitespace-nowrap transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-teal-4 hover:text-teal">
                            {t('eduBtn')}
                        </Link>
                    </div>
                </div>
            </div>

            <div className='py-18 bg-white'>
                <div className='max-w-325 mx-auto px-8'>
                    <div className='flex items-end justify-between mb-9 gap-5 flex-wrap'>
                        <div>
                            <div className='eyebrow flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600'>Updates</div>
                            <div className='text-[36px] font-bold text-gray-900 leading-[1.15] tracking-[-0.5px]'>
                                News &amp; <em className='not-italic text-teal-600'>Announcements</em>
                            </div>
                        </div>
                        <Link to="/news" className='flex items-center gap-1.5 text-[13.5px] font-semibold text-teal-600 whitespace-nowrap cursor-pointer transition-all hover:gap-2.5'>
                            {t('linkNewsRoom')}
                        </Link>
                    </div>

                    {news.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {news.map((n, i) => (
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
                        <div className='text-center py-10 text-text-3 text-[13px]'>
                            Loading news...
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}