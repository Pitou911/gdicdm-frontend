import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import { useLanguage } from '../context/LanguageContext'
import ResourceCard from '../components/ResourceCard';
import NewsCard from '../components/NewsCard';

export default function Home() {
    const { t } = useLanguage();
  return (
    <>
        <div className='relative overflow-hidden min-h-140 flex items-center bg-[linear-gradient(160deg,var(--color-teal)_0%,var(--color-teal-2)_40%,var(--color-blue)_100%)]'>
            <div className='absolute -top-30 -right-20 w-125 h-125 rounded-full bg-white/5 pointer-events-none'></div>
            <div className='absolute -bottom-20 -left-50 w-75 h-75 rounded-full bg-white/4 pointer-events-none'></div>
            <div className='absolute inset-0 opacity-40 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[28px_28px]'></div>
            <div className='relative z-2 max-w-325 mx-auto px-8 py-20 grid grid-cols-[1fr_380px] gap-16 items-center w-full'>
                <div>
                    <div className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-[20px] mb-5.5 border border-white/20 fu'>
                        <span className='w-1.5 h-1.5 rounded-full bg-teal-3 animate-pulse'></span> Official Public Debt Portal · Kingdom of Cambodia
                    </div>
                    <div className='text-[52px] font-bold text-white leading-[1.1] tracking-[-1px] mb-4.5 fu fu1'>
                        Cambodia's Public Debt
                        <em id='h-heroSub2' className='not-italic text-white/75 font-light block text-[44px]'>{t('heroSub2')}</em>
                    </div>
                    <p className='text-[15.5px] text-white/70 leading-[1.75] max-w-110 mb-9 fu fu2' id='h-heroSub'>
                        {t('heroSub')}
                    </p>
                    <div className='flex gap-3 flew wrap fu fu3'>
                        <Link to="/debt" className='px-7 py-3 bg-white text-teal font-bold text-[14px] rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-150 hover:bg-teal-4 hover:shadow-(--shadow-md)' style={{display: 'inline-block'}}>
                            {t('heroBtn1')}
                        </Link>
                        <Link to="/bonds" className='px-6 py-2.75 bg-white/10 text-white font-semibold text-[14px] border border-white/25 rounded-sm transition-all duration-150 hover:bg-white/20' style={{display: 'inline-block'}}>
                            {t('heroBtn2')}
                        </Link>
                    </div>
                </div>
                <div className='bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-(--radius-lg) overflow-hidden fu fu2'>
                    <div className='px-5 py-3.5 border-b border-white/10 text-[11px] font-semibold text-white/60 tracking-[0.5px] flex items-center gap-2 before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full  before:bg-teal-3 before:animate-pulse before:inline-block'>
                        Live Statistics · Q1 2026
                    </div>
                    <StatCard value="$12.4B" label="Total External Debt" subLabel="As of 19 March 2026" />
                    <StatCard value="31.2%" label="Debt-to-GDP Ratio" subLabel="FY 2026 · IMF Methodology" />
                    <StatCard value="Mar 2026" label="Next Bond Issuance" subLabel="Series 7 · Indicative" />
                </div>
            </div>
        </div>

        {/* KPIs */}
        <div className='bg-while border-b border-gray-200'>
            <div className='max-w-325 mx-auto px-8 grid grid-cols-3'>
                <div className='flex items-center gap-4 px-8 py-6 border-r border-gray-200 last:border-r-0'>
                    <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>📊</div>
                    <div>
                        <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>156</div>
                        <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi1')}</div>
                    </div>
                </div>
                <div className='flex items-center gap-4 px-8 py-6 border-r border-gray-200 last:border-r-0'>
                    <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>🏦</div>
                    <div>
                        <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>24</div>
                        <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi2')}</div>
                    </div>
                </div>
                <div className='flex items-center gap-4 px-8 py-6 border-r border-gray-200 last:border-r-0'>
                    <div className='w-11 h-11 bg-teal-100 rounded-lg flex items-center justify-center text-[20px] shrink-0'>🌏</div>
                    <div>
                        <div className='text-[28px] font-display font-bold text-teal-600 leading-none tracking-[-0.5px]'>23</div>
                        <div className='text-xs text-gray-500 mt-0.5 font-normal'>{t('kpi3')}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Charts */}
        <div className='bg-white py-13'>
            <div className='max-w-325 mx-auto px-8'>
                <div className='flex items-end justify-between mb-9 gap-5 flex-wrap'>
                    <div>
                        <div className='eyebrow flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600'>Debt Statistics</div>
                        <span className='w-4 h-0.5 bg-teal-600 rounded'></span>
                        <div className='text-[36px] font-bold text-gray-900 leading-[1.15] tracking-[-0.5px]'>
                            Key <em className='not-italic text-teal-600'>Indicators</em>
                        </div>
                    </div>
                    <Link to='/debt' className='flex items-center gap-1.5 text-[13.5px] font-semibold text-teal-600 whitespace-nowrap cursor-pointer transition-all hover:gap-2.5'>
                        {t('linkDebtData')}
                        <span className='transition-transform group-hover:translate-x-1'>→</span>
                    </Link>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='bg-white border border-gray-200 rounded-xl p-7 shadow transition-shadow hover:shadow-lg'>
                        <div className='text-[15px] font-display text-gray-900 mb-1'>Portfolio by Creditor</div>
                        <div className='font-mono text-[10px] text-gray-500 mb-5'>Q1 2026 · Total USD 12.4B</div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
                            <svg width='110' height='110' viewBox="0 0 110 110" style={{flexShrink: 1}}>
                                <circle cx='55' cy='55' r='45' fill='none' stroke='var(--color-light-2)' strokeWidth='18'/>
                                <circle cx="55" cy="55" r="40" fill="none" stroke="var(--color-teal)" strokeWidth="18" strokeDasharray="98 153" strokeDashoffset="0" transform="rotate(-90 55 55)" />
                                <circle cx="55" cy="55" r="40" fill="none" stroke="var(--color-blue)" strokeWidth="18" strokeDasharray="93 158" strokeDashoffset="-98" transform="rotate(-90 55 55)" />
                                <circle cx="55" cy="55" r="40" fill="none" stroke="var(--color-teal-3)" strokeWidth="18" strokeDasharray="60 191" strokeDashoffset="-191" transform="rotate(-90 55 55)" />
                                <text x="55" y="51" textAnchor="middle" fontFamily="Sora,sans-serif" fontSize="15" fontWeight="700" fill="#1e293b">
                                    39%
                                </text>
                                <text x="55" y="65" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="8" fill="#94a3b8">
                                    Multi.
                                </text>
                            </svg>
                            <div style={{flex: 1}}>
                                <div className='flex items-center gap-2 mb-2 text-[13px] text-(--text2)'>
                                    <div className='w-2.5 h-2.5 rounded-[3px] shrink-0 bg-teal'></div>Multilateral<span className='ml-auto font-mono text-[11.5px] font-semibold text-(--text)'>39%</span>
                                </div>
                                <div className='flex items-center gap-2 mb-2 text-[13px] text-(--text2)'>
                                    <div className='w-2.5 h-2.5 rounded-[3px] shrink-0 bg-blue'></div>Bilateral<span className='ml-auto font-mono text-[11.5px] font-semibold text-(--text)'>37%</span>
                                </div>
                                <div className='flex items-center gap-2 mb-2 text-[13px] text-(--text2)'>
                                    <div className='w-2.5 h-2.5 rounded-[3px] shrink-0 bg-teal-3'></div>Commercial<span className='ml-auto font-mono text-[11.5px] font-semibold text-(--text)'>24%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-7 shadow transition-shadow hover:shadow-lg'>
                        <div className='text-[15px] font-display text-gray-900 mb-1'>Debt-to-GDB Trend</div>
                        <div className='font-mono text-[10px] text-gray-500 mb-5'>2022 - 2026</div>
                        <svg width='100%' height='140' viewBox='0 0 280 140' preserveAspectRatio='none' className='block'>
                            <defs>
                                <linearGradient id='g1' x1='0' y1='0' x2='0' y2='1'>
                                    <stop offset='0%' stopColor='var(--color-teal)' stopOpacity='0.15' />
                                    <stop offset='100%' stopColor='var(--color-teal)' stopOpacity='0' />
                                </linearGradient>
                            </defs>
                            <line x1="0" y1="28" x2="280" y2="28" stroke="var(--color-light-2)" strokeWidth="1" />
                            <line x1="0" y1="68" x2="280" y2="68" stroke="var(--color-light-2)" strokeWidth="1" />
                            <line x1="0" y1="108" x2="280" y2="108" stroke="var(--color-light-2)" strokeWidth="1" />
                            <path d="M0,115 L70,90 L140,72 L210,79 L280,66" fill="none" stroke="var(--color-teal-4)" strokeWidth="1" strokeDasharray="3,3" />
                            <path d="M0,115 L70,90 L140,72 L210,79 L280,66 L280,140 L0,140Z" fill="url(#g1)" />
                            <path d="M0,115 L70,90 L140,72 L210,79 L280,66" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="0" cy="115" r="4" fill="var(--color-white)" stroke="var(--color-teal)" strokeWidth="2.5" />
                            <circle cx="70" cy="90" r="4" fill="var(--color-white)" stroke="var(--color-teal)" strokeWidth="2.5" />
                            <circle cx="140" cy="72" r="4" fill="var(--color-white)" stroke="var(--color-teal)" strokeWidth="2.5" />
                            <circle cx="210" cy="79" r="4" fill="var(--color-white)" stroke="var(--color-teal)" strokeWidth="2.5" />
                            <circle cx="280" cy="66" r="5" fill="var(--color-teal)" />
                            <text x="0" y="135" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--color-mid)">2022</text>
                            <text x="70" y="135" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--color-mid)">2023</text>
                            <text x="140" y="135" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--color-mid)">2024</text>
                            <text x="210" y="135" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--color-mid)">2025</text>
                            <text x="280" y="135" textAnchor="end" fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--color-mid)">2026</text>
                            <text x="6" y="109" fontFamily="JetBrains Mono,monospace" fontSize="8.5" fill="var(--color-text-2)">29.8%</text>
                            <text x="256" y="60" fontFamily="JetBrains Mono,monospace" fontSize="8.5" fill="var(--color-teal)" fontWeight="500">31.2%</text>
                        </svg>
                    </div>
                    <div className='bg-white border border-gray-200 rounded-xl p-7 shadow transition-shadow hover:shadow-lg'>
                        <div className='text-[15px] font-display text-gray-900 mb-1'>
                            Debt Service Schedule
                        </div>
                        <div className='font-mono text-[10px] text-gray-500 mb-5'>
                            2026 - 2030 · USD Millions
                        </div>
                        <div className="flex items-end gap-2 h-32.5">

                            <div className="flex-1 flex flex-col items-center gap-1.25 h-full">
                                <div className="font-mono text-[10px] text-text-3">620</div>
                                <div className="flex-1 w-full bg-light rounded-[4px] flex items-end overflow-hidden">
                                <div className="w-full bg-linear-to-b from-teal-2 to-teal rounded-[4px] transition-[height] duration-800" style={{ height: '62%' }}></div>
                                </div>
                                <div className="font-mono text-[10px] text-text-3">2025</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1.25 h-full">
                                <div className="font-mono text-[10px] text-text-3">780</div>
                                <div className="flex-1 w-full bg-light rounded-[4px] flex items-end overflow-hidden">
                                <div className="w-full bg-linear-to-b from-teal-2 to-teal rounded-[4px] transition-[height] duration-800" style={{ height: '78%' }}></div>
                                </div>
                                <div className="font-mono text-[10px] text-text-3">2026</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1.25 h-full">
                                <div className="font-mono text-[10px] text-text-3">550</div>
                                <div className="flex-1 w-full bg-light rounded-[4px] flex items-end overflow-hidden">
                                <div className="w-full bg-linear-to-b from-teal-2 to-teal rounded-[4px] transition-[height] duration-800" style={{ height: '55%' }}></div>
                                </div>
                                <div className="font-mono text-[10px] text-text-3">2027</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1.25 h-full">
                                <div className="font-mono text-[10px] text-text-3">880</div>
                                <div className="flex-1 w-full bg-light rounded-[4px] flex items-end overflow-hidden">
                                <div className="w-full bg-linear-to-b from-teal-2 to-teal rounded-[4px] transition-[height] duration-800" style={{ height: '88%' }}></div>
                                </div>
                                <div className="font-mono text-[10px] text-text-3">2028</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center gap-1.25 h-full">
                                <div className="font-mono text-[10px] text-text-3">680</div>
                                <div className="flex-1 w-full bg-light rounded-[4px] flex items-end overflow-hidden">
                                <div className="w-full bg-linear-to-b from-teal-2 to-teal rounded-[4px] transition-[height] duration-800" style={{ height: '68%' }}></div>
                                </div>
                                <div className="font-mono text-[10px] text-text-3">2029</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Doc */}
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
                        <span className='transition-transform group-hover:translate-x-1'>→</span>
                    </Link>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <ResourceCard type="📄 Debt Bulletin" title="Cambodia Public Debt Bulletin — Q3 2024" meta="Sept 2024 · 2.4 MB" linkText="⬇ Download" />
                    <ResourceCard type="📄 Statistical" title="Annual External Debt Statistics Report 2023" meta="Dec 2023 · 4.1 MB" linkText="⬇ Download" />
                    <ResourceCard type="📄 Bond Info" title="Government Bond Series 6 — Prospectus 2025" meta="Jan 2025 · 1.8 MB" linkText="⬇ Download" />
                </div>
            </div>
        </div>

        {/* Education */}
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
                    <Link
                        to="/education"
                        className="mt-4 inline-block px-7 py-3.25 bg-white text-blue font-bold text-[13.5px] rounded-sm cursor-pointer whitespace-nowrap transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-teal-4 hover:text-teal"
                    >
                        {t('eduBtn')}
                    </Link>
                </div>
            </div>
        </div>

        {/* News */}
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
                        <span className='transition-transform group-hover:translate-x-1'>→</span>
                    </Link>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <NewsCard icon="🏛" category="Announcement" title="Government Bond Series 6 Subscription Now Open" date="15 January 2025" />
                    <NewsCard icon="📊" category="Report" title="Q3 2024 Public Debt Bulletin Released" date="20 October 2024" />
                    <NewsCard icon="🌏" category="Event" title="GDICDM Participates in ADB Regional Debt Forum, Manila" date="5 September 2024" />  
                </div>
            </div>
        </div>
    </>
  )
}
