import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    Line, XAxis, YAxis, CartesianGrid,
    BarChart, Bar, Legend, ComposedChart,
} from 'recharts';
import { useState } from 'react';

const today = new Date();
const todayLabel = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const tenorData = [
    { name: '3-Year',  value: 1159.60, pct: 43.44, investors: 14, color: 'var(--color-teal)' },
    { name: '1-Year',  value: 740.90,  pct: 27.76, investors: 17, color: 'var(--color-blue)' },
    { name: '15-Year', value: 468.00,  pct: 17.53, investors: 3,  color: 'var(--color-teal-2)' },
    { name: '2-Year',  value: 172.00,  pct: 6.44,  investors: 4,  color: 'var(--color-teal-3)' },
    { name: '10-Year', value: 75.92,   pct: 2.84,  investors: 4,  color: 'var(--color-blue-2)' },
    { name: '5-Year',  value: 52.80,   pct: 1.98,  investors: 4,  color: 'var(--color-mid)' },
];



const allBiddingData = [
    { year: '2022', bidding: 159900,  offered: 72100   },
    { year: '2023', bidding: 282000,  offered: 238000  },
    { year: '2024', bidding: 379300,  offered: 301300  },
    { year: '2025', bidding: 1467300, offered: 690300  },
    { year: '2026', bidding: 1684120, offered: 1367520, note: 'As of April' },
];
// IssuanceVsCeiling 
const issuanceData = [
    { year: '2022', annual: 1219, issuance: 72,   pct: 6  },
    { year: '2023', annual: 813,  issuance: 238,  pct: 29 },
    { year: '2024', annual: 440,  issuance: 301,  pct: 68 },
    { year: '2025', annual: 500,  issuance: 690,  pct: 138 },
    { year: '2026', annual: 2114, issuance: 1368, pct: 65 },
];

const IssuanceCustomLabel = ({ x, y, width, value }) => (
    <text x={x + width / 2} y={y - 6} textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize={10} fontWeight={700}
        fill="var(--color-text-2)">
        {value.toLocaleString()}
    </text>
);

const PctCustomLabel = ({ x, y, value }) => (
    <text x={x} y={y - 8} textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize={10} fontWeight={700}
        fill="var(--color-teal-3)">
        {value}%
    </text>
);

export function IssuanceVsCeiling() {
    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">

            {/* header */}
            <div className="mb-1 font-display text-[15px] font-bold text-text text-center">
                Issuance VS Annual Ceiling
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-5 text-center">
                Billion KHR · 2022–2026
            </div>

            <ResponsiveContainer width="100%" height={320}>
                <ComposedChart
                    data={issuanceData}
                    margin={{ top: 24, right: 24, left: 0, bottom: 0 }}
                    barCategoryGap="30%"
                    barGap={4}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-2)" vertical={false} />

                    {/* left axis — Billion KHR */}
                    <YAxis
                        yAxisId="left"
                        tickFormatter={v => v.toLocaleString()}
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                        label={{ value: 'Billion KHR', angle: -90, position: 'insideLeft', offset: 14, style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fill: 'var(--color-text-3)' } }}
                    />

                    {/* right axis — % */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={v => `${v}%`}
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                        domain={[0, 160]}
                        hide
                    />

                    <XAxis
                        dataKey="year"
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />

                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (!active || !payload?.length) return null;
                            return (
                                <div className="bg-white border border-light-2 rounded-sm px-3 py-2 shadow-md text-[12px]">
                                    <div className="font-bold text-text mb-1">{label}</div>
                                    {payload.map((p, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ background: p.color }}></div>
                                            <span className="text-text-2">{p.name}:</span>
                                            <span className="font-semibold text-text">
                                                {p.name === '(%)' ? `${p.value}%` : p.value.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />

                    <Legend
                        iconType="square" iconSize={8}
                        wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, paddingTop: 12 }}
                    />

                    {/* annual ceiling bar */}
                    <Bar
                        yAxisId="left"
                        dataKey="annual"
                        name="Annual"
                        fill="var(--color-green-2)"
                        radius={[3, 3, 0, 0]}
                        label={<IssuanceCustomLabel />}
                    />

                    {/* issuance bar */}
                    <Bar
                        yAxisId="left"
                        dataKey="issuance"
                        name="Issuance"
                        fill="var(--color-teal-3)"
                        radius={[3, 3, 0, 0]}
                        label={<IssuanceCustomLabel />}
                    />

                    {/* % line */}
                    <Line
                        yAxisId="right"
                        type="linear"
                        dataKey="pct"
                        name="(%)"
                        stroke="var(--color-teal-4)"
                        strokeWidth={2}
                        strokeDasharray="5 4"
                        dot={{ r: 4, fill: 'var(--color-teal-3)', stroke: 'white', strokeWidth: 1.5 }}
                        activeDot={{ r: 6 }}
                        label={<PctCustomLabel />}
                    />

                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}
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


export function PortfolioDonut() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">

            {/* header */}
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Offered Amount by Tenor
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-4">
                Billion KHR · As of {todayLabel}
            </div>

            {/* donut + legend row */}
            <div className="flex items-center gap-5">

                <div className="w-37.5 h-37.5 shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={tenorData}
                                cx="50%" cy="50%"
                                innerRadius={0}
                                outerRadius={72}
                                dataKey="value"
                                labelLine={false}
                                strokeWidth={2}
                                stroke="white"
                                onMouseEnter={(_, i) => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {tenorData.map((entry, i) => (
                                    <Cell
                                        key={i}
                                        fill={entry.color}
                                        opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-white border border-light-2 rounded-sm px-3 py-2 shadow-md text-[12px]">
                                            <div className="font-semibold text-text mb-1">{d.name}</div>
                                            <div className="font-mono text-text-2">{d.value.toLocaleString()} B KHR</div>
                                            <div className="font-mono text-teal">{d.pct}%</div>
                                            <div className="font-mono text-text-3">{d.investors} investors</div>
                                        </div>
                                    );
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* legend */}
                <div className="flex flex-col gap-1.5 flex-1">
                    {tenorData.map((d, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-2 cursor-pointer transition-opacity duration-150 ${activeIndex !== null && activeIndex !== i ? 'opacity-40' : ''}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="w-2 h-2 rounded-xs shrink-0" style={{ background: d.color }}></div>
                            <span className="text-[12px] text-text-2 flex-1">{d.name}</span>
                            <span className="font-mono text-[10.5px] font-semibold text-text">{d.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6 tenor boxes */}
            <div className="grid grid-cols-3 gap-2 mt-5">
                {tenorData.map((d, i) => (
                    <div
                        key={i}
                        className={`rounded-sm px-3 py-2.5 border transition-all duration-150 cursor-pointer ${activeIndex === i ? 'border-transparent shadow-[0_0_0_2px_rgba(0,109,110,0.2)]' : 'border-light-2'}`}
                        style={{ background: activeIndex === i ? `color-mix(in srgb, ${d.color} 10%, white)` : 'var(--color-snow)' }}
                        onMouseEnter={() => setActiveIndex(i)}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        {/* tenor label */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <div className="w-2 h-2 rounded-xs shrink-0" style={{ background: d.color }}></div>
                            <div className="font-mono text-[9px] font-bold tracking-[0.5px] uppercase text-text-3">
                                {d.name}
                            </div>
                        </div>

                        {/* amount */}
                        <div className="font-display text-[14px] font-bold leading-none" style={{ color: d.color }}>
                            {d.value.toLocaleString()}
                        </div>
                        <div className="font-mono text-[8.5px] text-text-3 mt-0.5 mb-2">B KHR</div>

                        {/* divider */}
                        <div className="border-t border-light-2 pt-1.5 flex items-center justify-between">
                            <div className="font-mono text-[9px] text-text-3">
                                {d.investors} investors
                            </div>
                            <div className="font-mono text-[9px] font-semibold" style={{ color: d.color }}>
                                {d.pct}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

// add these two new exports at the bottom of DebtCharts.jsx

export function PortfolioDonutSimple() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Offered Amount by Tenor
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-4">
                Billion KHR · As of {todayLabel}
            </div>

            <div className="flex items-center gap-5">
                {/* pie */}
                <div className="w-37.5 h-37.5 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={tenorData}
                                cx="50%" cy="50%"
                                innerRadius={0}
                                outerRadius={72}
                                dataKey="value"
                                labelLine={false}
                                strokeWidth={2}
                                stroke="white"
                                onMouseEnter={(_, i) => setActiveIndex(i)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                {tenorData.map((entry, i) => (
                                    <Cell
                                        key={i}
                                        fill={entry.color}
                                        opacity={activeIndex === null || activeIndex === i ? 1 : 0.4}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    const d = payload[0].payload;
                                    return (
                                        <div className="bg-white border border-light-2 rounded-sm px-3 py-2 shadow-md text-[12px]">
                                            <div className="font-semibold text-text mb-1">{d.name}</div>
                                            <div className="font-mono text-text-2">{d.value.toLocaleString()} B KHR</div>
                                            <div className="font-mono text-teal">{d.pct}%</div>
                                        </div>
                                    );
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* legend only — no boxes */}
                <div className="flex flex-col gap-1.5 flex-1">
                    {tenorData.map((d, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-2 cursor-pointer transition-opacity duration-150 ${activeIndex !== null && activeIndex !== i ? 'opacity-40' : ''}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="w-2 h-2 rounded-xs shrink-0" style={{ background: d.color }}></div>
                            <span className="text-[12px] text-text-2 flex-1">{d.name}</span>
                            <span className="font-mono text-[10.5px] font-semibold text-text">{d.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function DebtServiceBarSimple() {
    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Bidding vs Offered
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-5">
                2022–2026 · All Years · * 2026 as of April
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <BarChart
                    data={allBiddingData}
                    margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
                    barCategoryGap="35%"
                    barGap={4}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-2)" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
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
        </div>
    );
}