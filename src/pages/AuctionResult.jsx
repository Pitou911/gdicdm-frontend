import { useState, useMemo, useEffect } from 'react';
import { fetchAuctionResults } from '../data/index';

const TENORS    = ['All', '1Y', '2Y', '3Y', '5Y', '10Y', '15Y'];
const CURRENCIES = ['All', 'KHR', 'USD'];
const STATUSES  = ['All', 'settled', 'pending'];

export default function AuctionResult() {
    const [search, setSearch]       = useState('');
    const [tenor, setTenor]         = useState('All');
    const [currency, setCurrency]   = useState('All');
    const [status, setStatus]       = useState('All');
    const [sortKey, setSortKey]     = useState('date');
    const [sortDir, setSortDir]     = useState('desc');

    const [allResults, setAllResults] = useState([]);

    useEffect(() => {
        fetchAuctionResults().then(data => {
            setAllResults(data.map(r => ({
                id: r.id,
                date: r.auction_date,
                dateLabel: r.date_label,
                currency: r.currency,
                tenor: r.tenor,
                title: r.title,
                offered: Number(r.offered),
                bidding: Number(r.bidding),
                accepted: Number(r.accepted),
                coupon: Number(r.coupon),
                coverRatio: Number(r.cover_ratio),
                investors: r.investors,
                status: r.status,
            })))
        });
    }, []);
    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    };

    const SortIcon = ({ col }) => (
        <span className={`ml-1 text-[9px] ${sortKey === col ? 'text-white' : 'text-white/40'}`}>
            {sortKey === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
        </span>
    );

    const filtered = useMemo(() => {
        return allResults
            .filter(r => {
                const matchSearch   = r.title.toLowerCase().includes(search.toLowerCase()) ||
                                      r.dateLabel.toLowerCase().includes(search.toLowerCase());
                const matchTenor    = tenor    === 'All' || r.title.includes(`_${tenor}_`);
                const matchCurrency = currency === 'All' || r.currency === currency;
                const matchStatus   = status   === 'All' || r.status === status;
                return matchSearch && matchTenor && matchCurrency && matchStatus;
            })
            .sort((a, b) => {
                let va = a[sortKey], vb = b[sortKey];
                if (sortKey === 'date') { va = new Date(a.date); vb = new Date(b.date); }
                if (sortDir === 'asc') return va > vb ? 1 : -1;
                return va < vb ? 1 : -1;
            });
    }, [allResults, search, tenor, currency, status, sortKey, sortDir]);


    const CurrencyBadge = ({ currency }) => currency === 'USD'
        ? <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] bg-blue-3 text-blue-2">USD</span>
        : <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] bg-teal-4 text-teal">KHR</span>;

    const StatusBadge = ({ status }) => status === 'settled'
        ? <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-green-3 text-green-2 before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-green-2">Settled</span>
        : <span className="inline-flex items-center gap-1.25 text-[11px] font-semibold px-2.25 py-0.75 rounded-[20px] bg-amber-3 text-amber before:content-[''] before:w-1.25 before:h-1.25 before:rounded-full before:bg-amber">Pending</span>;

    return (
        <>
            {/* page header */}
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className="max-w-325 mx-auto px-8 grid grid-cols-[1fr_auto] items-end gap-10 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">
                            Bond Market
                        </div>
                        <h1 className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">
                            Auction <em className="not-italic text-white/75 font-light">Results</em>
                        </h1>
                        <p className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">
                            Official government bond auction results including offered, bidding, accepted amounts and coupon rates.
                        </p>
                    </div>
                    <div className="font-mono text-[11px] text-white/30 text-right leading-loose">
                        <strong className="text-white/85 text-[15px] block font-semibold">{filtered.length}</strong>
                        results found
                    </div>
                </div>
            </div>

            <div className="py-16 bg-snow">
                <div className="max-w-325 mx-auto px-8">

                    {/* filter bar */}
                    <div className="bg-white border border-light-2 rounded-md p-4 shadow-sm mb-6 flex items-center gap-3 flex-wrap">

                        {/* search */}
                        <input
                            className="border-[1.5px] border-light-2 px-3.5 py-2 text-[13px] font-body outline-none text-text bg-snow rounded-sm w-55 transition-[border-color] duration-150 focus:border-teal placeholder:text-text-3"
                            placeholder="Search by title or date..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        <div className="w-px h-6 bg-light-2" />

                        {/* tenor filter */}
                        <div className="flex items-center gap-1 flex-wrap">
                            <span className="font-mono text-[10px] text-text-3 mr-1">Tenor:</span>
                            {TENORS.map(t => (
                                <button key={t} onClick={() => setTenor(t)}
                                    className={`font-mono text-[10.5px] font-semibold px-2.25 py-1 rounded-[6px] cursor-pointer transition-all duration-150
                                        ${tenor === t ? 'bg-teal text-white' : 'bg-light text-text-3 hover:bg-light-2'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-light-2" />

                        {/* currency filter */}
                        <div className="flex items-center gap-1">
                            <span className="font-mono text-[10px] text-text-3 mr-1">Currency:</span>
                            {CURRENCIES.map(c => (
                                <button key={c} onClick={() => setCurrency(c)}
                                    className={`font-mono text-[10.5px] font-semibold px-2.25 py-1 rounded-[6px] cursor-pointer transition-all duration-150
                                        ${currency === c ? 'bg-teal text-white' : 'bg-light text-text-3 hover:bg-light-2'}`}>
                                    {c}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-light-2" />

                        {/* status filter */}
                        <div className="flex items-center gap-1">
                            <span className="font-mono text-[10px] text-text-3 mr-1">Status:</span>
                            {STATUSES.map(s => (
                                <button key={s} onClick={() => setStatus(s)}
                                    className={`font-mono text-[10.5px] font-semibold px-2.25 py-1 rounded-[6px] cursor-pointer transition-all duration-150 capitalize
                                        ${status === s ? 'bg-teal text-white' : 'bg-light text-text-3 hover:bg-light-2'}`}>
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* clear */}
                        {(search || tenor !== 'All' || currency !== 'All' || status !== 'All') && (
                            <button
                                onClick={() => { setSearch(''); setTenor('All'); setCurrency('All'); setStatus('All'); }}
                                className="ml-auto font-mono text-[10.5px] text-text-3 hover:text-text transition-colors duration-150 cursor-pointer"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>

                    {/* table */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-16 text-text-3">
                            <div className="text-[32px] mb-3">📭</div>
                            <div className="text-[15px] font-semibold text-text-2 mb-1">No results found</div>
                            <div className="text-[13px]">Try adjusting your filters.</div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-md border border-light-2 overflow-hidden shadow-sm">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        {[
                                            { key: 'date',       label: 'Auction Date' },
                                            { key: 'title',      label: 'Title' },
                                            { key: 'currency',   label: 'CCY' },
                                            { key: 'tenor',      label: 'Tenor' },
                                            { key: 'offered',    label: 'Offered (B)' },
                                            { key: 'bidding',    label: 'Bidding (B)' },
                                            { key: 'accepted',   label: 'Accepted (B)' },
                                            { key: 'coverRatio', label: 'Cover Ratio' },
                                            { key: 'coupon',     label: 'Coupon %' },
                                            { key: 'investors',  label: 'Investors' },
                                            { key: 'status',     label: 'Status' },
                                        ].map(col => (
                                            <th
                                                key={col.key}
                                                onClick={() => handleSort(col.key)}
                                                className="bg-teal text-white/85 px-4 py-3.25 text-left text-[10.5px] font-bold tracking-[0.8px] uppercase cursor-pointer hover:bg-teal-2 transition-colors duration-150 whitespace-nowrap"
                                            >
                                                {col.label}<SortIcon col={col.key} />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((r, i) => (
                                        <tr key={r.id} className="group border-b border-light last:border-b-0 hover:bg-snow transition-colors duration-150">

                                            {/* date */}
                                            <td className="px-4 py-3 align-middle whitespace-nowrap">
                                                <div className="font-mono text-[12px] font-semibold text-text">{r.dateLabel}</div>
                                            </td>

                                            {/* title */}
                                            <td className="px-4 py-3 align-middle">
                                                <div className="font-mono text-[11.5px] font-bold text-teal tracking-[0.3px]">
                                                    {r.title}
                                                </div>
                                            </td>

                                            {/* currency */}
                                            <td className="px-4 py-3 align-middle">
                                                <CurrencyBadge currency={r.currency} />
                                            </td>

                                            {/* tenor */}
                                            <td className="px-4 py-3 align-middle">
                                                <span className="font-mono text-[11px] font-semibold text-text-2">
                                                    {r.tenor}Y
                                                </span>
                                            </td>

                                            {/* offered */}
                                            <td className="px-4 py-3 align-middle">
                                                <span className="font-mono text-[12px] text-text">
                                                    {r.offered.toFixed(2)}
                                                </span>
                                            </td>

                                            {/* bidding */}
                                            <td className="px-4 py-3 align-middle">
                                                <span className="font-mono text-[12px] text-text">
                                                    {r.bidding.toFixed(2)}
                                                </span>
                                            </td>

                                            {/* accepted */}
                                            <td className="px-4 py-3 align-middle">
                                                <span className="font-mono text-[12px] text-text">
                                                    {r.accepted.toFixed(2)}
                                                </span>
                                            </td>

                                            {/* cover ratio */}
                                            <td className="px-4 py-3 align-middle">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono text-[12px] font-semibold text-text">
                                                        {r.coverRatio.toFixed(2)}x
                                                    </span>
                                                    {/* mini bar */}
                                                    <div className="w-10 h-1.25 bg-light-2 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-teal"
                                                            style={{ width: `${Math.min((r.coverRatio / 3) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* coupon */}
                                            <td className="px-4 py-3 align-middle">
                                                <span className="font-mono text-[12px] font-semibold text-teal">
                                                    {r.coupon.toFixed(2)}%
                                                </span>
                                            </td>

                                            {/* investors */}
                                            <td className="px-4 py-3 align-middle text-center">
                                                <span className="font-mono text-[12px] text-text-2">
                                                    {r.investors}
                                                </span>
                                            </td>

                                            {/* status */}
                                            <td className="px-4 py-3 align-middle">
                                                <StatusBadge status={r.status} />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* summary footer */}
                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {[
                            { label: 'Total Offered',  val: `${filtered.reduce((s, r) => s + r.offered,  0).toFixed(2)} B` },
                            { label: 'Total Bidding',  val: `${filtered.reduce((s, r) => s + r.bidding,  0).toFixed(2)} B` },
                            { label: 'Total Accepted', val: `${filtered.reduce((s, r) => s + r.accepted, 0).toFixed(2)} B` },
                            { label: 'Avg Cover Ratio', val: `${(filtered.reduce((s, r) => s + r.coverRatio, 0) / (filtered.length || 1)).toFixed(2)}x` },
                        ].map((s, i) => (
                            <div key={i} className="bg-white border border-light-2 rounded-sm px-4 py-3 shadow-sm">
                                <div className="font-mono text-[9.5px] font-bold tracking-[1px] uppercase text-text-3 mb-1">{s.label}</div>
                                <div className="font-display text-[18px] font-bold text-teal leading-none">{s.val}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}