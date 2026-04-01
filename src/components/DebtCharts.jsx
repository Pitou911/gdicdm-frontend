import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine,
    BarChart, Bar, Legend,
} from 'recharts';

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

const debtServiceData = [
    { year: '2025', principal: 380, interest: 240 },
    { year: '2026', principal: 460, interest: 320 },
    { year: '2027', principal: 340, interest: 210 },
    { year: '2028', principal: 560, interest: 320 },
    { year: '2029', principal: 420, interest: 260 },
    { year: '2030', principal: 390, interest: 230 },
];

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
                    <span className="font-semibold text-text">{p.value}{suffix}</span>
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
            {/* header */}
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

                {/* legend */}
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

// ── bar chart ─────────────────────────────────────────────
export function DebtServiceBar() {
    return (
        <div className="bg-white border border-light-2 rounded-md p-6 shadow-sm">
            <div className="mb-1 font-display text-[15px] font-bold text-text">
                Debt Service Schedule
            </div>
            <div className="font-mono text-[10px] text-text-3 mb-5">
                2025–2030 · USD Millions
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={debtServiceData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }} barCategoryGap="35%">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-2)" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />
                    <YAxis
                        tickFormatter={v => `$${v}M`}
                        tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--color-mid)' }}
                        axisLine={false} tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip suffix="M" />} />
                    <Legend
                        iconType="square" iconSize={8}
                        wrapperStyle={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, paddingTop: 12 }}
                    />
                    <Bar dataKey="principal" name="Principal" fill="var(--color-teal)"   radius={[3, 3, 0, 0]} />
                    <Bar dataKey="interest"  name="Interest"  fill="var(--color-teal-3)" radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}