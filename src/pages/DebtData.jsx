export default function DebtData() {
    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg="DATA">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Statistics</div>
                        <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">Public Debt <em className="not-italic text-white/75 font-light">Dashboard</em></div>
                        <div className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">Quarterly figures updated from MEF and international financial institutions.</div>
                    </div>
                    <div className="font-mono text-[11px] text-white/30 text-right leading-loose">
                        Last updated<strong className="text-white/85 text-[15px] block font-semibold">Q3 2024</strong>30 September 2024
                    </div>
                </div>
            </div>
            <div className="py-18 bg-snow">
                <div className="max-w-425 mx-auto px-8">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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
        </>
    )
}