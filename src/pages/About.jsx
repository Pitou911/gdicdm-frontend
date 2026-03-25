export default function About() {
    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg="ABOUT">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Institution</div>
                        <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">About <em className="not-italic text-white/75 font-light">GDICDM</em></div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-13">
                <div className="max-w-325 mx-auto px-8">
                    <div className="grid grid-cols-[1fr_320px] gap-14 items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Our Mandate</div>
                            <div className="text-[36px] mb-0 font-bold text-gray-900 leading-[1.15] tracking-[-0.5px]">
                                General Department of <br/> International Cooperation <br/> and <em className='not-italic text-teal-600'>Debt Management</em>
                            </div>
                            <div className="w-10 h-0.75 bg-linear-to-r from-teal to-teal-3 rounded-xs my-3.5 mb-6"></div>
                            <div className="[&_p]:text-[15px] [&_p]:leading-[1.9] [&_p]:text-text-2 [&_p]:mb-4.5 [&_strong]:text-text [&_strong]:font-semibold">
                                <p>The General Department of International Cooperation and Debt Management (GDICDM) is the principle government authority responsible for managing Cambodia's public debt and international financial cooperation. Established under the Ministry of Economy and Finance, GDICDM plays a central role in Cambodia's fiscal management framework.</p>
                                <p>GDICDM is mandated to formulate and implement the government's <strong>debt management strategy</strong>, ensuring that Cambodia's borrowing remains sustainable, transparent, and aligned with national development priorities.</p>
                                <p>In International cooperation, GDICDM coordinates with multilateral institutions including the <strong>Asian Development Bank, World Bank, and IMF</strong>, as well as bilateral partners, to mobilise concessional financing for Cambodia's development programmes.</p>
                            </div>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4 mt-10 grid-wrap">
                                <div className="bg-white border border-light-2 rounded-sm p-6.5 shadow-(--shadow-sm)">
                                    <div className="text-[36px] font-bold text-teal opacity-30 leading-none mb-3">01</div><div className="font-display text-[16px] font-bold text-text mb-2">Public Debt Management</div><div className="text-[13px] text-text-3 leading-[1.7]">Formulating Cambodia's medium-term debt strategy, monitoring sustainability, and reporting to the National Assembly.</div>
                                </div>
                                <div className="bg-white border border-light-2 rounded-sm p-6.5 shadow-(--shadow-sm)">
                                    <div className="text-[36px] font-bold text-teal opacity-30 leading-none mb-3">02</div><div className="font-display text-[16px] font-bold text-text mb-2">International Cooperation</div><div className="text-[13px] text-text-3 leading-[1.7]">Coordinating with multilateral and bilateral partners, negotiating concessional loan terms, managing disbursements.</div>
                                </div>
                                <div className="bg-white border border-light-2 rounded-sm p-6.5 shadow-(--shadow-sm)">
                                    <div className="text-[36px] font-bold text-teal opacity-30 leading-none mb-3">03</div><div className="font-display text-[16px] font-bold text-text mb-2">Market Development</div><div className="text-[13px] text-text-3 leading-[1.7]">Developing Cambodia's domestic government securities market and promoting retail investor participation.</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-light-2 rounded-sm p-5.5 mb-3 shadow-(--shadow-sm)">
                        <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">
                            Quick Facts
                        </div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">🏛 <span>Under Ministry of Economy and Finance</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📅 <span>Established under Sub-decree No. 160</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">🌏 <span>23 international partner organisations</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 items-start leading-normal">💼 <span>ADB Technical Assistance (ongoing)</span></div>
                        </div>

                        <div className="bg-white border border-light-2 rounded-sm p-5.5 mb-3 shadow-(--shadow-sm)">
                        <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">
                            Contact
                        </div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📍 <span>Ministry of Economy and Finance, Phnom Penh</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📞 <span>+855 23 123 456</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📧 <span>gdicdm@mef.gov.kh</span></div>
                        <div className="flex gap-2.5 text-[13.5px] text-text-2 items-start leading-normal">🕐 <span>Mon-Fri, 08:00-17:00 ICT</span></div>
                        </div>

                        <div className="rounded-sm p-5.5 mb-3 bg-linear-to-br from-teal to-blue">
                        <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-white/60 mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Annual Report
                        </div>
                        <div className="font-display text-[19px] font-bold text-white mb-1.5 tracking-[-0.3px]">
                            2023 Annual Report
                        </div>
                        <div className="text-[12.5px] text-white/55 mb-4">
                            Cambodia External Debt Statistics · Full Year
                        </div>
                        <button className="w-full px-7 py-3.25 bg-white text-blue font-bold text-[13.5px] rounded-sm cursor-pointer whitespace-nowrap transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-teal-4 hover:text-teal">
                            ⬇ Download PDF
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}