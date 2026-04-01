import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine,
    BarChart, Bar, Legend,
} from 'recharts';
import { useState } from 'react';

// ── data ─────────────────────────────────────────────────
const portfolioData = [
    { name: 'Multilateral', value: 39, color: 'var(--color-teal)' },
    { name: 'Bilateral',    value: 37, color: 'var(--color-blue)' },
    { name: 'Commercial',   value: 24, color: 'var(--color-teal-3)' },
];

const gdpData = [
    { year: '2020', ratio: 27.4 },
    { year: '2021', ratio: 28.9 },
    { year: '2022', ratio: 29.8 },
    { year: '2023', ratio: 30.1 },
    { year: '2024', ratio: 30.8 },
    { year: '2025', ratio: 31.0 },
    { year: '2026', ratio: 31.2 },
];

const allBiddingData = [
    { year: '2022', bidding: 159900,  offered: 72100   },
    { year: '2023', bidding: 282000,  offered: 238000  },
    { year: '2024', bidding: 379300,  offered: 301300  },
    { year: '2025', bidding: 1467300, offered: 690300  },
    { year: '2026', bidding: 1684120, offered: 1367520, note: 'As of April' },
];

// ── formatters ────────────────────────────────────────────
const formatUnit = (v) => {
    if (v >= 1000000) return `${(v / 1000000).toFixed(2)}M`;
    if (v >= 1000)    return `${(v / 1000).toFixed(1)}K`;
    return v.toLocaleString();
};

// ── custom tooltip ────────────────────────────────────────
const ChartTooltip = ({ active, payload, label, suffix = '' }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-light-2 rounded-sm px-3 py-2 shadow-md text-[12px]">
            {label && <div className="font-mono text-[10.5px] text-text-3 mb-1">{label}</div>}
            {payload.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }}></div>
                    <span className="text-text-2">{p.name}:</span>
                    <span className="font-semibold text-text">{p.value.toLocaleString()}{suffix}</span>
                </div>
            ))}
        </div>
    );
};

// ── donut chart ───────────────────────────────────────────
const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return percent > 0.08 ? (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
            fontFamily="JetBrains Mono, monospace" fontSize={11} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    ) : null;
};

export function PortfolioDonut() {
    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Portfolio by Creditor
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-5">
                Q1 2026 · Total USD 12.4B
            </div>
            <div className="flex items-center gap-6">
                <div className="w-40 h-40 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={portfolioData}
                                cx="50%" cy="50%"
                                innerRadius={42} outerRadius={75}
                                dataKey="value"
                                labelLine={false}
                                label={renderCustomLabel}
                                strokeWidth={2}
                                stroke="white"
                            >
                                {portfolioData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<ChartTooltip suffix="%" />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    {portfolioData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-[3px] shrink-0" style={{ background: d.color }}></div>
                            <span className="text-[13px] text-text-2 flex-1">{d.name}</span>
                            <span className="font-mono text-[12px] font-semibold text-text">{d.value}%</span>
                        </div>
                    ))}
                    <div className="pt-2 mt-1 border-t border-light-2">
                        <div className="font-mono text-[10px] text-text-3">
                            Concessional loans account for 76% of total external debt
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── line chart ────────────────────────────────────────────
export function DebtGDPLine() {
    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Debt-to-GDP Trend
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-5">
                2020–2026 · IMF Methodology
            </div>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={gdpData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-2)" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />
                    <YAxis
                        domain={[25, 34]}
                        tickFormatter={v => `${v}%`}
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip suffix="%" />} />
                    <ReferenceLine
                        y={31.2} stroke="var(--color-teal-3)"
                        strokeDasharray="4 4" strokeWidth={1.5}
                        label={{ value: 'Current 31.2%', position: 'insideTopRight', fontSize: 9, fill: 'var(--color-teal)', fontFamily: 'JetBrains Mono, monospace' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="ratio"
                        name="Debt/GDP"
                        stroke="var(--color-teal)"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: 'white', stroke: 'var(--color-teal)', strokeWidth: 2.5 }}
                        activeDot={{ r: 6, fill: 'var(--color-teal)' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// ── bar chart — bidding vs offered ────────────────────────
export function DebtServiceBar() {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', '2022', '2023', '2024', '2025', '2026'];

    const chartData = activeFilter === 'All'
        ? allBiddingData
        : allBiddingData.filter(d => d.year === activeFilter);

    const selectedRow = activeFilter !== 'All'
        ? allBiddingData.find(d => d.year === activeFilter)
        : null;

    const coverageRatio = selectedRow
        ? ((selectedRow.bidding / selectedRow.offered) * 100).toFixed(1)
        : null;

    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">

            {/* header */}
            <div className="flex items-start justify-between gap-4 mb-1">
                <div>
                    <div className="font-display text-[15px] font-bold text-text">
                        Bidding vs Offered
                    </div>
                    <div className="font-mono text-[10px] text-text-3 mt-0.5">
                        {activeFilter === 'All'
                            ? '2022–2026 · All Years'
                            : activeFilter === '2026'
                                ? `${activeFilter} · As of April`
                                : `${activeFilter} · Full Year`
                        }
                    </div>
                </div>

                {/* coverage badge */}
                {coverageRatio && (
                    <div className="text-right shrink-0">
                        <div className="font-display text-[20px] font-bold text-teal leading-none">
                            {coverageRatio}%
                        </div>
                        <div className="font-mono text-[9px] text-text-3 mt-0.5">
                            Coverage Ratio
                        </div>
                    </div>
                )}
            </div>

            {/* year filter tabs */}
            <div className="flex items-center gap-0.75 flex-wrap mb-5 mt-3">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`font-mono text-[10.5px] font-semibold px-2.5 py-1 rounded-[6px] cursor-pointer transition-all duration-150
                            ${activeFilter === f
                                ? 'bg-teal text-white'
                                : 'bg-light text-text-3 hover:bg-light-2 hover:text-text'
                            }`}
                    >
                        {f === '2026' ? '2026 *' : f}
                    </button>
                ))}
            </div>

            {/* chart */}
            <ResponsiveContainer width="100%" height={activeFilter === 'All' ? 200 : 160}>
                <BarChart
                    data={chartData}
                    margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
                    barCategoryGap={activeFilter === 'All' ? '35%' : '55%'}
                    barGap={4}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-2)" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                        hide={activeFilter !== 'All'}
                    />
                    <YAxis
                        tickFormatter={formatUnit}
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                        iconType="square" iconSize={8}
                        wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, paddingTop: 10 }}
                    />
                    <Bar dataKey="bidding" name="Bidding" fill="var(--color-teal)"   radius={[3, 3, 0, 0]} />
                    <Bar dataKey="offered" name="Offered" fill="var(--color-teal-3)" radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>

            {/* single year stat breakdown */}
            {selectedRow && (
                <div className="mt-4 pt-4 border-t border-light-2 grid grid-cols-2 gap-3">
                    <div className="bg-teal-4 rounded-sm px-4 py-3">
                        <div className="font-mono text-[9px] font-bold tracking-[1px] uppercase text-teal mb-1">
                            Bidding
                        </div>
                        <div className="font-display text-[18px] font-bold text-teal leading-none">
                            {selectedRow.bidding.toLocaleString()}
                        </div>
                        <div className="font-mono text-[9px] text-teal/60 mt-0.5">units</div>
                    </div>
                    <div className="bg-light rounded-sm px-4 py-3">
                        <div className="font-mono text-[9px] font-bold tracking-[1px] uppercase text-text-3 mb-1">
                            Offered
                        </div>
                        <div className="font-display text-[18px] font-bold text-text leading-none">
                            {selectedRow.offered.toLocaleString()}
                        </div>
                        <div className="font-mono text-[9px] text-text-3/60 mt-0.5">units</div>
                    </div>
                </div>
            )}

            {/* 2026 note */}
            {(activeFilter === 'All' || activeFilter === '2026') && (
                <div className="mt-3 font-mono text-[9.5px] text-text-3">
                    * 2026 data as of April
                </div>
            )}
        </div>
    );
}