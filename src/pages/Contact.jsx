export default function Contact(){
    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg="CONTACT">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Get in Touch</div>
                        <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]"><em className="not-italic text-white/75 font-light">Contact</em> GDICDM</div>
                        <div className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">For enquiries about publications, data, bond investment, or media relations.</div>
                    </div>
                </div>
            </div>
            <div className="py-18 bg-snow">
                <div className="max-w-325 mx-auto px-8">
                    <div className="grid grid-cols-[1fr_320px] gap-15">
                        <div>
                            <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Send a Message</div>
                            <div className="font-display text-[28px] font-bold text-text leading-[1.15] tracking-[-0.5px] mb-7">Contact <em className="not-italic text-teal">Form</em></div>
                            <div className="grid grid-cols-2 gap-3.5 mb-4.5">
                                <div className="mb-4.5"><label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Full Name</label><input className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] font-body text-text bg-white outline-none transition-all duration-150 rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]" type="text" placeholder="Your full name"/></div>
                                <div className="mb-4.5"><label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Email Address</label><input className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] font-body text-text bg-white outline-none transition-all duration-150 rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]" type="email" placeholder="Your email address"/></div>
                            </div>
                            <div className="mb-4.5">
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Subject</label>
                                <select className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] font-body text-text bg-white outline-none transition-all duration-150 rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)]">
                                    <option>General Inquiry</option>
                                    <option>Document Request</option>
                                    <option>Bond Investment</option>
                                    <option>Media / Press</option>
                                    <option>Technical / Data</option>
                                </select>
                            </div>
                            <div className="mb-4.5">
                                <label className="block text-[11.5px] font-bold tracking-[0.5px] text-text-2 mb-1.5">Message</label>
                                <textarea className="w-full border-[1.5px] border-light-2 px-3.5 py-2.5 text-[14px] font-body text-text bg-white outline-none transition-all duration-150 rounded-sm focus:border-teal focus:shadow-[0_0_0_3px_rgba(0,109,110,0.08)] resize-y min-h-30" style={{ height: '150px' }} placeholder="Your message to GDICDM..."></textarea>
                            </div>
                            <button className="w-full py-3.25 bg-linear-to-br from-teal to-teal-2 text-white text-[14px] font-bold border-none rounded-sm cursor-pointer transition-all duration-150 shadow-[0_4px_12px_rgba(0,109,110,0.3)] hover:shadow-[0_6px_20px_rgba(0,109,110,0.4)] hover:-translate-y-px">Send Message →</button>
                        </div>
                        <div>
                            <div className="bg-white border border-light-2 rounded-sm p-5.5 mb-3 shadow-sm">
                                <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">Office Address</div>
                                <div className="text-[14px] text-text-2 leading-[1.9]">
                                    Street 92, Sangkat Wat Phnom<br/>KHan Daun Penh<br/>Phnom Penh 12202<br/>Kingdom of Cambodia
                                </div>
                            </div>
                            <div className="bg-white border border-light-2 rounded-sm p-5.5 mb-3 shadow-sm">
                                <div className="flex items-center gap-1.5 text-[10.5px] font-bold tracking-[1.5px] uppercase text-teal mb-3 before:content-[''] before:w-3 before:h-0.5 before:bg-teal before:rounded-[1px]">Contact Details</div>
                                <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📞<span className="text-text-2" >+855 23 430 000</span></div>
                                <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">📠<span className="text-text-2" >+855 23 430 001</span></div>
                                <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">✉<span className="text-text-2" >gdicdm@mef.gov.kh</span></div>
                                <div className="flex gap-2.5 text-[13.5px] text-text-2 mb-2.25 items-start leading-normal">🕐<span className="text-text-2" >Mon–Fri 08:00–17:00 ICT</span></div>
                            </div>
                            <div className="bg-white border-light-2 rounded-sm p-5.5 mb-3 shadow-sm" style={{ background: 'var(--teal4)', borderColor: 'var(--teal3)' }}>
                                <div className="text-[13px] text-teal leading-[1.75]">
                                    <strong>Response time:</strong> We aim to respond within 3 business days. For urgent bond matters, contact your authorised primary dealer directly.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}