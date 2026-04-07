import { useState, useEffect } from 'react';
import { fetchAuctionCalendar } from '../data/index';

const TENORS = ['1Y', '2Y', '3Y', '5Y', '10Y', '15Y'];

const today = new Date();
today.setHours(0, 0, 0, 0);

const isPast     = (dateStr) => new Date(dateStr) < today;
const isToday    = (dateStr) => new Date(dateStr).toDateString() === today.toDateString();
const isUpcoming = (dateStr) => {
    const d    = new Date(dateStr);
    const diff = (d - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
};

export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAuctionCalendar().then(data => {
            setEvents(data.map(e => ({
                id:     e.id,
                date:   e.auction_date,
                label:  e.date_label,
                month:  e.month,
                tenors: e.tenors,
            })));
        });
    }, []);

    const nextEvent = events.find(e => !isPast(e.date));

    return (
        <>
            {/* page header */}
            <div className="bg-linear-to-br from-[var(--color-teal)] to-[var(--color-blue)] pt-[52px] pb-[44px] relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[60px] after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className="max-w-[1300px] mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Bond Issuance
                        </div>
                        <h1 className="font-[var(--font-display)] text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">
                            Auction <em className="not-italic text-white/75 font-light">Calendar</em>
                        </h1>
                        <p className="text-[14px] text-white/60 mt-2.5 max-w-[440px] leading-[1.7]">
                            Scheduled government bond auction dates and available tenors for {new Date().getFullYear()}.
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

            {/* legend bar */}
            <div className="bg-white border-b border-[var(--color-light-2)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="max-w-[1300px] mx-auto px-8 py-3 flex items-center gap-6 flex-wrap">
                    <div className="flex items-center gap-[6px] text-[12px] text-[var(--color-text-3)]">
                        <div className="w-3 h-3 rounded-[3px] bg-[var(--color-light-2)]"></div>Closed
                    </div>
                    <div className="flex items-center gap-[6px] text-[12px] text-[var(--color-text-3)]">
                        <div className="w-3 h-3 rounded-[3px] bg-[var(--color-teal-4)] border border-[var(--color-teal-3)]"></div>Upcoming (30 days)
                    </div>
                    <div className="flex items-center gap-[6px] text-[12px] text-[var(--color-text-3)]">
                        <div className="w-3 h-3 rounded-[3px] bg-[var(--color-teal)]"></div>Scheduled
                    </div>
                    <div className="ml-auto font-mono text-[11px] text-[var(--color-text-3)]">
                        {events.filter(e => !isPast(e.date)).length} auctions remaining
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="py-16 bg-[var(--color-snow)]">
                <div className="max-w-[1300px] mx-auto px-8">
                    {events.length === 0 ? (
                        <div className="text-center py-16 text-[var(--color-text-3)]">
                            <div className="text-[32px] mb-3">📅</div>
                            <div className="text-[15px] font-semibold text-[var(--color-text-2)] mb-1">No auction dates yet</div>
                            <div className="text-[13px]">Dates will appear here once added via the CMS.</div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[var(--radius-md)] border border-[var(--color-light-2)] overflow-hidden shadow-[var(--shadow-sm)]">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="bg-[var(--color-teal)] text-white/85 px-6 py-[14px] text-left text-[11px] font-bold tracking-[1px] uppercase w-[140px]">Date</th>
                                        <th className="bg-[var(--color-teal)] text-white/85 px-6 py-[14px] text-left text-[11px] font-bold tracking-[1px] uppercase w-[120px]">Month</th>
                                        {TENORS.map(t => (
                                            <th key={t} className="bg-[var(--color-teal)] text-white/85 px-4 py-[14px] text-center text-[11px] font-bold tracking-[1px] uppercase">{t}</th>
                                        ))}
                                        <th className="bg-[var(--color-teal)] text-white/85 px-6 py-[14px] text-left text-[11px] font-bold tracking-[1px] uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((ev, i) => {
                                        const past     = isPast(ev.date);
                                        const today_   = isToday(ev.date);
                                        const upcoming = isUpcoming(ev.date);

                                        return (
                                            <tr key={ev.id} className={`border-b border-[var(--color-light)] last:border-b-0 transition-colors duration-150 ${past ? 'opacity-50' : 'hover:bg-[var(--color-snow)]'}`}>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className={`font-[var(--font-display)] text-[18px] font-bold tracking-[-0.3px] ${past ? 'text-[var(--color-mid)]' : 'text-[var(--color-text)]'}`}>
                                                        {ev.label}
                                                    </div>
                                                    {today_ && <div className="font-mono text-[9px] font-bold tracking-[1px] uppercase text-[var(--color-teal)] mt-0.5">Today</div>}
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <div className={`text-[13px] font-medium ${past ? 'text-[var(--color-mid)]' : 'text-[var(--color-text-2)]'}`}>{ev.month}</div>
                                                </td>
                                                {TENORS.map(tenor => {
                                                    const active = ev.tenors.includes(tenor);
                                                    return (
                                                        <td key={tenor} className="px-4 py-4 align-middle text-center">
                                                            {active ? (
                                                                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] text-[11px] font-bold transition-all duration-150
                                                                    ${past ? 'bg-[var(--color-light)] text-[var(--color-mid)]'
                                                                           : upcoming ? 'bg-[var(--color-teal-4)] text-[var(--color-teal)] border border-[var(--color-teal-3)] shadow-[0_0_0_2px_rgba(0,109,110,0.1)]'
                                                                           : 'bg-[var(--color-teal)] text-white shadow-[0_2px_6px_rgba(0,109,110,0.25)]'}`}>
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
                                                <td className="px-6 py-4 align-middle">
                                                    {past ? (
                                                        <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-light)] text-[var(--color-mid)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-mid)]">Closed</span>
                                                    ) : today_ ? (
                                                        <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-amber-3)] text-[var(--color-amber)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-amber)]">Today</span>
                                                    ) : upcoming ? (
                                                        <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-teal-4)] text-[var(--color-teal)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-teal)]">Upcoming</span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-[5px] text-[11px] font-semibold px-[9px] py-[3px] rounded-[20px] bg-[var(--color-green-3)] text-[var(--color-green-2)] before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[var(--color-green-2)]">Scheduled</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* info notice */}
                    <div className="mt-6 flex items-start gap-3 bg-[var(--color-blue-3)] border border-[var(--color-blue-2)]/20 rounded-[var(--radius-sm)] px-5 py-4">
                        <div className="text-[18px] shrink-0">ℹ️</div>
                        <div>
                            <div className="text-[13px] font-semibold text-[var(--color-blue-2)] mb-[3px]">Important Notice</div>
                            <div className="text-[12.5px] text-[var(--color-text-2)] leading-[1.7]">
                                Auction dates and tenors are indicative and subject to change. Final terms will be announced via official MEF circulars at least 5 business days prior to each auction date.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}