import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <footer className="bg-text text-white/50 pt-14 pb-7">
            <div className="max-w-325 mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-9">
                <div>
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7.5 h-7.5 bg-transparent rounded-[7px] flex items-center justify-center text-[14px]"><img src="/mef_logo.png" alt="GDI Logo" className="h-6" /></div>
                        <div className="font-display text-[15px] font-bold text-white">GDICDM</div>
                    </div>
                    <div className="text-[12.5px] leading-[1.75] text-white/30 mb-3">
                        General Department of International Cooperation and Debt Management, Ministry of Economy and Finance, Kingdom of Cambodia.
                    </div>
                    <div className="font-mono text-[10px] text-white/15">
                        investor.mef.gov.kh
                    </div>
                </div>
                <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-teal-3 mb-3.5">Navigate</div>
                    <Link to='/debt' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">Debt Data</Link>
                    <Link to='/documents' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">Documents</Link>
                    <Link to='/education' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">Education</Link>
                    <Link to='/bonds' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">Bonds &amp; T-Bills</Link>
                </div>
                <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-teal-3 mb-3.5">Information</div>
                    <Link to='/about' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">About Us</Link>
                    <Link to='/contact' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">Contact</Link>
                    <Link to='/news' className="block text-[13px] text-white/35 mb-2 cursor-pointer transition-colors duration-150 hover:text-white/80">News &amp; Announcements</Link>
                </div>
                <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-teal-3 mb-3.5">Contact</div>
                    <div className="text-[13px] text-white/35 mb-2">📞 (855) 11 720 222</div>
                    <div className="text-[13px] text-white/35 mb-2">💬 t.me/governmentsecuritieskh</div>
                    <div className="text-[13px] text-white/35 mb-2">📧 dgs.gidcdm@mef.gov.kh</div>
                    <div className="text-[13px] text-white/35 mb-2">🌐 gdicdm.mef.gov.kh</div>
                    <div className="text-[13px] text-white/35 mb-2">📍 Street 92, Phnom Penh, 1202</div>
                </div>
            </div>
            <div className="max-w-325 mx-auto px-8 py-5 border-t border-white/10 flex flex-col md:flex-row items-left justify-between gap-4 text-[11px] text-white/30">
                <span>© 2025 Ministry of Economy and Finance, Kingdom of Cambodia. All rights reserved.</span>
                <span>ADB Technical Assistance Project</span>
            </div>
        </footer>
    )
}