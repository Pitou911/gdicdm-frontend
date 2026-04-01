import { DebtServiceBar, IssuanceVsCeiling, PortfolioDonut } from "../components/DebtCharts";

const now = new Date();

const quarter = Math.floor(now.getMonth() / 3) + 1;
const year = now.getFullYear();

const formattedDate = now.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
export default function DebtData() {
    return (
        <>
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]" data-bg="DATA">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">Statistics</div>
                        <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">Public Debt <em className="not-italic text-white/75 font-light">Dashboard</em></div>
                        <div className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">Quarterly figures updated from MEF and international financial institutions.</div>
                    </div>
                    <div className="font-mono text-[11px] text-white/30 text-right leading-loose">
                        Last updated
                        <strong className="text-white/85 text-[15px] block font-semibold">
                            {`Q${quarter} ${year}`}
                        </strong>
                        {formattedDate}
                    </div>
                </div>
            </div>
            <div className="py-18 bg-snow">
                <div className="max-w-325 mx-auto px-8">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        <PortfolioDonut />
                        <IssuanceVsCeiling />
                        <DebtServiceBar />
                    </div>
                </div>
            </div>
        </>
    )
}