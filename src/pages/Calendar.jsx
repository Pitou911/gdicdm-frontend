import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const TENORS = ['1Y', '2Y', '3Y', '5Y', '10Y', '15Y'];

const events = [
    { date: '2026-01-28', label: '28 Jan', month: 'January',   tenors: ['1Y', '3Y', '15Y'] },
    { date: '2026-02-25', label: '25 Feb', month: 'February',  tenors: ['1Y', '3Y', '10Y'] },
    { date: '2026-03-18', label: '18 Mar', month: 'March',     tenors: ['2Y', '5Y', '10Y'] },
    { date: '2026-04-22', label: '22 Apr', month: 'April',     tenors: ['2Y', '5Y', '15Y'] },
    { date: '2026-05-20', label: '20 May', month: 'May',       tenors: ['1Y', '3Y', '15Y'] },
    { date: '2026-06-24', label: '24 Jun', month: 'June',      tenors: ['1Y', '3Y', '10Y'] },
    { date: '2026-07-22', label: '22 Jul', month: 'July',      tenors: ['2Y', '5Y', '15Y'] },
    { date: '2026-08-19', label: '19 Aug', month: 'August',    tenors: ['2Y', '5Y', '10Y'] },
    { date: '2026-09-16', label: '16 Sep', month: 'September', tenors: ['1Y', '3Y', '15Y'] },
    { date: '2026-10-21', label: '21 Oct', month: 'October',   tenors: ['1Y', '3Y', '10Y'] },
    { date: '2026-11-11', label: '11 Nov', month: 'November',  tenors: ['2Y', '5Y', '15Y'] },
    { date: '2026-12-09', label: '9 Dec',  month: 'December',  tenors: ['2Y', '5Y', '10Y'] },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const isPast   = (dateStr) => new Date(dateStr) < today;
const isToday  = (dateStr) => new Date(dateStr).toDateString() === today.toDateString();
const isUpcoming = (dateStr) => {
    const d = new Date(dateStr);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
};

export default function Calendar() {
    const { t } = useLanguage();

    const nextEvent = events.find(e => !isPast(e.date));

    return (
        <>
            {/* page header */}
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[60px] after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Bond Issuance
                        </div>
                        <h1 className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">
                            Auction <em className="not-italic text-white/75 font-light">Calendar</em>
                        </h1>
                        <p className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">
                            Scheduled government bond auction dates and available tenors for 2026.
                        </p>
                    </div>
                    {nextEvent && (
                        <div className="font-mono text-[11px] text-white/30 text-right leading-loose">
                            <div className="text-white/50 text-[10px] font-bold tracking-[1px] uppercase mb-1">Next Auction</div>
                            <strong className="text-white/85 text-[18px] block font-semibold tracking-[-0.3px]">{nextEvent.label}</strong>
                            <span className="text-white/40">{nextEvent.tenors.join(' · ')}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* legend + summary bar */}
            <div className="bg-white border-b border-light-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="max-w-325 mx-auto px-8 py-3 flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-1.5 text-[12px] text-text-3">
                        <div className="w-3 h-3 rounded-[3px] bg-light-2"></div>
                        Closed
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-text-3">
                        <div className="w-3 h-3 rounded-[3px] bg-teal-4 border border-teal-3"></div>
                        Upcoming (30 days)
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-text-3">
                        <div className="w-3 h-3 rounded-[3px] bg-teal"></div>
                        Available
                    </div>
                    <div className="ml-auto font-mono text-[11px] text-text-3">
                        {events.filter(e => !isPast(e.date)).length} auctions remaining in 2026
                    </div>
                </div>
            </div>

            {/* main content */}
            <div className="py-16 bg-snow">
                <div className="max-w-325 mx-auto px-8">

                    {/* table */}
                    <div className="bg-white rounded-md border border-light-2 overflow-hidden shadow-sm)">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="bg-teal text-white/85 px-6 py-3.5 text-left text-[11px] font-bold tracking-[1px] uppercase w-40">
                                        Date
                                    </th>
                                    <th className="bg-teal text-white/85 px-6 py-3.5 text-left text-[11px] font-bold tracking-[1px] uppercase w-30">
                                        Month
                                    </th>
                                    {TENORS.map(t => (
                                        <th key={t} className="bg-teal text-white/85 px-4 py-3.5 text-center text-[11px] font-bold tracking-[1px] uppercase">
                                            {t}
                                        </th>
                                    ))}
                                    <th className="bg-teal text-white/85 px-6 py-3.5 text-left text-[11px] font-bold tracking-[1px] uppercase">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((ev, i) => {
                                    const past     = isPast(ev.date);
                                    const today_   = isToday(ev.date);
                                    const upcoming = isUpcoming(ev.date);

                                    return (
                                        <tr key={i} className={`group border-b border-light last:border-b-0 transition-colors duration-150
                                            ${past ? 'opacity-50' : 'hover:bg-[var(--color-snow)]'}`}
                                        >
                                            {/* date */}
                                            <td className="px-6 py-4 align-middle">
                                                <div className={`font-[var(--font-display)] text-[18px] font-bold tracking-[-0.3px] ${past ? 'text-[var(--color-mid)]' : 'text-[var(--color-text)]'}`}>
                                                    {ev.label}
                                                </div>
                                                {today_ && (
                                                    <div className="font-mono text-[9px] font-bold tracking-[1px] uppercase text-[var(--color-teal)] mt-0.5">Today</div>
                                                )}
                                            </td>

                                            {/* month */}
                                            <td className="px-6 py-4 align-middle">
                                                <div className={`text-[13px] font-medium ${past ? 'text-[var(--color-mid)]' : 'text-[var(--color-text-2)]'}`}>
                                                    {ev.month}
                                                </div>
                                            </td>

                                            {/* tenor cells */}
                                            {TENORS.map(tenor => {
                                                const active = ev.tenors.includes(tenor);
                                                return (
                                                    <td key={tenor} className="px-4 py-4 align-middle text-center">
                                                        {active ? (
                                                            <div className={`inline-flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] text-[11px] font-bold transition-all duration-150
                                                                ${past
                                                                    ? 'bg-[var(--color-light)] text-[var(--color-mid)]'
                                                                    : upcoming
                                                                        ? 'bg-[var(--color-teal-4)] text-[var(--color-teal)] border border-[var(--color-teal-3)] shadow-[0_0_0_2px_rgba(0,109,110,0.1)]'
                                                                        : 'bg-[var(--color-teal)] text-white shadow-[0_2px_6px_rgba(0,109,110,0.25)]'
                                                                }`}
                                                            >
                                                                {tenor}
                                                            </div>
                                                        ) : (
                                                            <div className="inline-flex items-center justify-center w-9 h-9">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-light-2)]"></div>
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}

                                            {/* status */}
                                            <td className="px-6 py-4 align-middle">
                                                {past ? (
                                                    <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-light)] text-[var(--color-mid)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-mid)]">
                                                        Closed
                                                    </span>
                                                ) : today_ ? (
                                                    <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-amber-3)] text-[var(--color-amber)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-amber)]">
                                                        Today
                                                    </span>
                                                ) : upcoming ? (
                                                    <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-teal-4)] text-[var(--color-teal)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-teal)]">
                                                        Upcoming
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-green-3)] text-[var(--color-green-2)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-green-2)]">
                                                        Scheduled
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* bottom note */}
                    <div className="mt-6 flex items-start gap-3 bg-[var(--color-blue-3)] border border-[var(--color-blue-2)]/20 rounded-[var(--radius-sm)] px-5 py-4">
                        <div className="text-[18px] shrink-0">ℹ️</div>
                        <div>
                            <div className="text-[13px] font-semibold text-[var(--color-blue-2)] mb-[3px]">Important Notice</div>
                            <div className="text-[12.5px] text-[var(--color-text-2)] leading-[1.7]">
                                Auction dates and tenors are indicative and subject to change. Final terms will be announced via official MEF circulars at least 5 business days prior to each auction date. Contact your authorized dealer for subscription details.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}