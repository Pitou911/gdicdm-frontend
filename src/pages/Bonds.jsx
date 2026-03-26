import { useState } from "react";

export default function Bonds() {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        if (openFaq === index) {
            setOpenFaq(null);
        }else{
            setOpenFaq(index);
        }
    };

    const faqs = [
        {q: 'What is a government bond?', a: 'A government bond is a debt instrument issued by the Royal Government of Cambodia. When you buy a bond, you lend money to the government for a fixed period and receive regular interest payments plus your principal at maturity.'},
        {q: 'What is the minimum investment amount?', a: 'The minimum invest is KHR 1,000,000 (approximately USD 250) for both government bonds and treasury bills. There is no maximum limit for retail investors.'},
        {q: 'Who are the authorised primary dealers?', a: 'Primary dealers are commercial banks authorised by MEF to sell government securities. Currently authorised dealers include ACLEDA Bank, ABA Bank, Canadia Bank, Vattanac Bank, Prince Bank, and Maybank Cambodia.' },
        {q: 'Can bonds be traded before maturity?', a: 'Yes. Government bonds listed on the Cambodia Securities Exchange (CSX) can be traded in the secondary market before maturity, subject to market conditions and CSX trading hours.'}
    ];

    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg="BONDS">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">Capital Markets</div>
                        <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">Bonds &amp; <em className="not-italic text-white/75 font-light">T-Bills</em></div>
                        <div className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">Government securities financing Cambodia's national budget and developing the domestic capital market.</div>
                    </div>
                </div>
            </div>
            <div className="py-18 bg-white">
                <div className="max-w-325 mx-auto px-8">
                    <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Current Issuance</div>
                    <div className="font-display text-[36px] font-bold text-text leading-[1.15] tracking-[-0.5px] mb-6">Active <em className="not-italic text-teal">Securities</em></div>
                    <table className="w-full border-collapse bg-white rounded-sm overflow-hidden shadow-sm border border-light-2 mb-14">
                        <thead>
                            <tr><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Instrument</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Issue Date</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Maturity</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Coupon</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Amount</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Currency</th><th className="bg-teal text-white/85 px-4.5 py-3.25 text-left text-[11px] font-bold tracking-[1px] uppercase">Status</th></tr>
                        </thead>
                        <tbody>
                            <tr className="group"><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><strong>Government Bond Series 6</strong></td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Jan 2025</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Jan 2030</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">5.50%</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR 400B</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><span className="pill pill-open">Open</span></td></tr>
                            <tr className="group"><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><strong>Government Bond Series 5</strong></td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Mar 2025</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Mar 2029</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">5.25%</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR 350B</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><span className="pill pill-trading">Trading</span></td></tr>
                            <tr className="group"><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><strong>Government Bond Series 4</strong></td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Jun 2025</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Jun 2028</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">5.00%</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR 300B</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><span className="pill pill-trading">Trading</span></td></tr>
                            <tr className="group"><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><strong>T-Bill 91-day Series 12</strong></td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Dec 2025</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">Mar 2025</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">2.80%</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR 80B</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0">KHR</td><td className="px-4.5 py-3.5 border-b border-light text-[13.5px] text-text group-hover:bg-teal-4 last:border-b-0"><span className="pill pill-open">Open</span></td></tr>
                        </tbody>
                    </table>

                    <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Investment Guide</div>
                    <div className="font-display text-[36px] font-bold text-text leading-[1.15] tracking-[-0.5px] mb-6">How to <em className="not-italic text-teal">Invest</em></div>
                    <div className="grid grid-cols-4 gap-4 mb-14">
                        <div className="bg-white border border-light-2 rounded-sm p-7 shadow-(--shadow-sm) relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.75 before:bg-linear-to-r before:from-teal before:to-teal-3"><div className="font-display text-[48px] font-bold text-teal opacity-15 leading-none mb-3">01</div><div className="font-display text-[16px] font-bold text-text mb-2">Open Account</div><div className="text-[13px] text-text-3 leading-[1.7]">Open an investment account with an authorised primary dealer bank. Bring your national ID and proof of address.</div></div>
                        <div className="bg-white border border-light-2 rounded-sm p-7 shadow-(--shadow-sm) relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.75 before:bg-linear-to-r before:from-teal before:to-teal-3"><div className="font-display text-[48px] font-bold text-teal opacity-15 leading-none mb-3">02</div><div className="font-display text-[16px] font-bold text-text mb-2">Choose Security</div><div className="text-[13px] text-text-3 leading-[1.7]">Select government bonds (5-year) or treasury bills (91, 182, or 364-day) based on your investment horizon.</div></div>
                        <div className="bg-white border border-light-2 rounded-sm p-7 shadow-(--shadow-sm) relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.75 before:bg-linear-to-r before:from-teal before:to-teal-3"><div className="font-display text-[48px] font-bold text-teal opacity-15 leading-none mb-3">03</div><div className="font-display text-[16px] font-bold text-text mb-2">Place Order</div><div className="text-[13px] text-text-3 leading-[1.7]">Instruct your dealer to place a subscription during the open period. Minimum investment: KHR 1,000,000.</div></div>
                        <div className="bg-white border border-light-2 rounded-sm p-7 shadow-(--shadow-sm) relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.75 before:bg-linear-to-r before:from-teal before:to-teal-3"><div className="font-display text-[48px] font-bold text-teal opacity-15 leading-none mb-3">04</div><div className="font-display text-[16px] font-bold text-text mb-2">Receive Bond</div><div className="text-[13px] text-text-3 leading-[1.7]">Bond is electronically registered. Interest paid semi-annually. Principle returned at maturity.</div></div>
                    </div>
                    <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">FAQ</div>
                    <div className="font-display text-[36px] font-bold text-text leading-[1.15] tracking-[-0.5px] mb-6">Common <em className="not-italic text-teal">Questions</em></div>
                    <div className="mb-12 max-w-200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-light">
                                <div className="flex items-center justify-between py-4.5 cursor-pointer gap-5" onClick={() => toggleFaq(index)}>
                                    <div className="text-[16px] font-semibold text-text">{faq.q}</div>
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[16px] shrink-0 font-bold transition-all duration-200 ${openFaq === index ? 'bg-teal text-white' : 'bg-light text-text-2'}`}>{openFaq === index ? '-' : '+'}</div>
                                </div>
                                {openFaq === index && (
                                    <div className="pb-4.5 text-[14px] text-text-3 leading-[1.8] max-w-165">
                                    {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-teal-600 before:content-[''] before:w-4 before:h-0.5 before:bg-teal before:rounded-[1px]">Primary Dealers</div>
                    <div className="font-display text-[36px] font-bold text-text leading-[1.15] tracking-[-0.5px] mb-6">Authorised <em className="not-italic text-teal">Banks</em></div>
                    <div className="grid grid-cols-3 gap-3">
                        {['ACLEDA Bank', 'ABA Bank', 'Canadia Bank', 'Vattanac Bank', 'Prince Bank', 'Maybank Cambodia'].map(bank =>(
                            <div key={bank} className="bg-white border border-light-2 rounded-sm p-4.5 flex items-center gap-3.5 shadow-sm transition-all duration-150 hover:border-teal-3 hover:shadow-(--shadow-md)">
                                <div>
                                    <div className="font-bold text-[13.5px] text-text">{bank}</div>
                                    <div className="text-[11px] text-text-3 mt-0.5">Primary Dealer</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}