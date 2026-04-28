import { useState, useCallback } from 'react';

function Field({ label, hint, value, onChange, prefix, suffix, step = 'any', min = '0' }) {
    return (
        <div>
            <label className="block text-[12px] font-semibold text-text-3 uppercase tracking-[0.8px] mb-1.5">{label}</label>
            {hint && <p className="text-[11.5px] text-text-3 mb-2 leading-relaxed">{hint}</p>}
            <div className="flex items-center border border-light-2 rounded-sm bg-white overflow-hidden focus-within:border-teal focus-within:ring-2 focus-within:ring-teal/10 transition-all">
                {prefix && <span className="px-3 text-[13px] text-text-3 bg-light border-r border-light-2 select-none">{prefix}</span>}
                <input
                    type="number"
                    min={min}
                    step={step}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="flex-1 px-3 py-2.5 text-[14px] text-text outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                {suffix && <span className="px-3 text-[13px] text-text-3 bg-light border-l border-light-2 select-none">{suffix}</span>}
            </div>
        </div>
    );
}

function ResultRow({ label, value, sub, highlight }) {
    return (
        <div className={`flex items-center justify-between py-3 border-b border-light-2 last:border-0 ${highlight ? 'bg-teal-4 -mx-5 px-5 rounded-sm' : ''}`}>
            <span className={`text-[13px] ${highlight ? 'font-semibold text-teal' : 'text-text-3'}`}>{label}</span>
            <div className="text-right">
                <span className={`font-mono text-[14px] block ${highlight ? 'font-bold text-teal' : 'font-medium text-text'}`}>{value}</span>
                {sub && <span className="font-mono text-[11px] text-text-3">{sub}</span>}
            </div>
        </div>
    );
}

// Trims trailing zeros up to maxDecimals
function fmt(n, maxDecimals = 4) {
    if (!isFinite(n)) return '—';
    return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
}

// KHR: whole numbers only
function fmtKHR(n) {
    if (!isFinite(n)) return '—';
    return Math.round(n).toLocaleString('en-US');
}

export default function BondCalculator() {
    const [faceValue,    setFaceValue]    = useState('1000');
    const [couponRate,   setCouponRate]   = useState('5');
    const [marketYield,  setMarketYield]  = useState('6');
    const [years,        setYears]        = useState('10');
    const [frequency,    setFrequency]    = useState('1');
    const [currency,     setCurrency]     = useState('USD');
    const [exchangeRate, setExchangeRate] = useState('4100');

    const isKHR = currency === 'KHR';
    const rate  = parseFloat(exchangeRate) || 4100;
    const sym   = isKHR ? '៛' : '$';

    const handleCurrencySwitch = (c) => {
        const r = parseFloat(exchangeRate) || 4100;
        const v = parseFloat(faceValue)    || 0;
        if (c === 'KHR' && currency === 'USD') setFaceValue(String(Math.round(v * r)));
        if (c === 'USD' && currency === 'KHR') setFaceValue(fmt(v / r));
        setCurrency(c);
    };

    const calculate = useCallback(() => {
        const F = parseFloat(faceValue)   || 0;
        const c = parseFloat(couponRate)  / 100;
        const y = parseFloat(marketYield) / 100;
        const T = parseFloat(years)       || 0;
        const m = parseInt(frequency)     || 1;

        const n = T * m;
        const r = y / m;
        const C = (F * c) / m;

        if (n === 0 || r === 0 || F === 0) return null;

        const pvCoupons    = C * (1 - Math.pow(1 + r, -n)) / r;
        const pvFace       = F / Math.pow(1 + r, n);
        const price        = pvCoupons + pvFace;
        const totalCoup    = C * n;
        const totalReturn  = totalCoup + F - price;
        const currentYield = (C * m) / price * 100;
        const priceVsPar   = ((price - F) / F) * 100;
        const status = Math.abs(priceVsPar) < 0.01
            ? 'At Par'
            : price > F
                ? `Premium (+${fmt(priceVsPar)}%)`
                : `Discount (${fmt(priceVsPar)}%)`;

        return { price, pvCoupons, pvFace, totalCoup, totalReturn, currentYield, C, n, m, status, F };
    }, [faceValue, couponRate, marketYield, years, frequency]);

    const result = calculate();
    const freqLabel = { '1': 'Annual', '2': 'Semi-annual', '4': 'Quarterly', '12': 'Monthly' };

    // Primary display + cross-currency sub-label
    function display(val) {
        if (!isFinite(val)) return { primary: '—', secondary: null };
        if (isKHR) {
            return {
                primary:   `៛${fmtKHR(val)}`,
                secondary: `≈ $${fmt(val / rate)}`,
            };
        }
        return {
            primary:   `$${fmt(val)}`,
            secondary: `≈ ៛${fmtKHR(val * rate)}`,
        };
    }

    return (
        <>
            {/* Hero */}
            <div className="bg-linear-to-br from-teal to-blue pt-13 pb-11 relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-15 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.08))]">
                <div className="max-w-325 mx-auto px-8 relative z-10">
                    <div className="flex items-center gap-2 mb-2.5 text-[11.5px] font-bold tracking-[1.5px] uppercase text-white/60 before:content-[''] before:w-4 before:h-0.5 before:bg-white/60 before:rounded-[1px]">Investor Tools</div>
                    <div className="font-display text-[48px] font-bold text-white leading-[1.05] tracking-[-1px]">Bond Price <em className="not-italic text-white/75 font-light">Calculator</em></div>
                    <div className="text-[14px] text-white/60 mt-2.5 max-w-110 leading-[1.7]">Estimate the fair price of a government bond based on coupon rate, market yield, and maturity.</div>
                </div>
            </div>

            {/* Content */}
            <div className="py-18 bg-snow">
                <div className="max-w-325 mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">

                        {/* Inputs */}
                        <div className="bg-white border border-light-2 rounded-sm p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                            <div className="flex items-center justify-between mb-1">
                                <h2 className="text-[15px] font-bold text-text">Bond Parameters</h2>
                                {/* Currency toggle */}
                                <div className="flex bg-light rounded-sm p-0.75 gap-0.5">
                                    {['USD', 'KHR'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => handleCurrencySwitch(c)}
                                            className={`font-mono text-[11px] font-semibold px-2.5 py-1 cursor-pointer rounded-[6px] transition-all duration-150
                                                ${currency === c ? 'bg-white text-teal shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-text-3'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[13px] text-text-3 mb-7 leading-relaxed">Enter the bond details below. The price will update automatically.</p>

                            {/* Exchange rate — shown only in KHR mode */}
                            {isKHR && (
                                <div className="mb-5 flex items-center gap-2 p-3 bg-snow border border-light-2 rounded-sm">
                                    <span className="text-[12px] text-text-3 font-semibold whitespace-nowrap">Exchange Rate: 1 USD =</span>
                                    <input
                                        type="number"
                                        min="1"
                                        step="1"
                                        value={exchangeRate}
                                        onChange={e => setExchangeRate(e.target.value)}
                                        className="flex-1 px-2 py-1 text-[13px] font-mono text-text border border-light-2 rounded-sm outline-none bg-white focus:border-teal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="text-[12px] text-text-3 font-semibold">KHR</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Field
                                    label="Face Value (Par)"
                                    hint="The amount repaid at maturity."
                                    value={faceValue}
                                    onChange={setFaceValue}
                                    prefix={sym}
                                    step={isKHR ? '100000' : '100'}
                                />
                                <Field
                                    label="Annual Coupon Rate"
                                    hint="The stated interest rate on the bond."
                                    value={couponRate}
                                    onChange={setCouponRate}
                                    suffix="%"
                                    step="0.01"
                                />
                                <Field
                                    label="Market Yield (Discount Rate)"
                                    hint="Current required rate of return."
                                    value={marketYield}
                                    onChange={setMarketYield}
                                    suffix="%"
                                    step="0.01"
                                />
                                <Field
                                    label="Years to Maturity"
                                    hint="Remaining life of the bond."
                                    value={years}
                                    onChange={setYears}
                                    suffix="yrs"
                                    step="1"
                                    min="1"
                                />
                            </div>

                            {/* Frequency selector */}
                            <div className="mt-5">
                                <label className="block text-[12px] font-semibold text-text-3 uppercase tracking-[0.8px] mb-2">Coupon Frequency</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[['1','Annual'],['2','Semi-ann.'],['4','Quarterly'],['12','Monthly']].map(([v, lbl]) => (
                                        <button
                                            key={v}
                                            onClick={() => setFrequency(v)}
                                            className={`text-[12px] font-semibold py-2 rounded-sm border transition-all cursor-pointer
                                                ${frequency === v
                                                    ? 'bg-teal text-white border-teal shadow-[0_2px_8px_rgba(0,109,110,0.25)]'
                                                    : 'bg-white text-text-3 border-light-2 hover:border-teal/40 hover:text-text'}`}
                                        >
                                            {lbl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Formula reminder */}
                            <div className="mt-7 p-4 bg-snow rounded-sm border border-light-2">
                                <p className="text-[11.5px] font-semibold text-text-3 uppercase tracking-[0.8px] mb-2">Formula</p>
                                <p className="font-mono text-[12px] text-text leading-relaxed">
                                    P = (C / r) × [1 − 1/(1+r)ⁿ] + F / (1+r)ⁿ
                                </p>
                                <p className="text-[11px] text-text-3 mt-2 leading-relaxed">
                                    C = coupon/period &nbsp;·&nbsp; r = yield/period &nbsp;·&nbsp; n = total periods &nbsp;·&nbsp; F = face value
                                </p>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="sticky top-22">
                            <div className="bg-white border border-light-2 rounded-sm p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                <p className="text-[11.5px] font-semibold text-text-3 uppercase tracking-[0.8px] mb-4">
                                    Calculation Results
                                    <span className="ml-2 font-mono text-teal normal-case tracking-normal">{currency}</span>
                                </p>

                                {result ? (
                                    <>
                                        {(() => {
                                            const d = display(result.price);
                                            return <ResultRow label="Bond Price" value={d.primary} sub={d.secondary} highlight />;
                                        })()}

                                        <div className="mt-1">
                                            {[
                                                ['PV of Coupons',      result.pvCoupons],
                                                ['PV of Face Value',   result.pvFace],
                                                ['Coupon / Period',    result.C],
                                                ['Total Coupon Income',result.totalCoup],
                                                ['Total Return',       result.totalReturn],
                                            ].map(([label, val]) => {
                                                const d = display(val);
                                                return <ResultRow key={label} label={label} value={d.primary} sub={d.secondary} />;
                                            })}
                                            <ResultRow label="Total Periods"  value={`${result.n} (${freqLabel[String(result.m)]})`} />
                                            <ResultRow label="Current Yield"  value={`${fmt(result.currentYield)}%`} />
                                        </div>

                                        <div className={`mt-4 px-4 py-3 rounded-sm text-[12.5px] font-semibold text-center
                                            ${result.price < result.F ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                            : result.price > result.F ? 'bg-teal-4 text-teal border border-teal/20'
                                            : 'bg-light text-text border border-light-2'}`}>
                                            {result.status}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-[13px] text-text-3 text-center py-8">Enter valid inputs to see results.</p>
                                )}
                            </div>

                            {/* Explanation card */}
                            {result && (
                                <div className="mt-4 bg-white border border-light-2 rounded-sm p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                                    <p className="text-[11.5px] font-semibold text-text-3 uppercase tracking-[0.8px] mb-3">What This Means</p>
                                    <p className="text-[12.5px] text-text leading-relaxed">
                                        {result.price < result.F
                                            ? `The bond is priced below par because the market yield (${marketYield}%) is higher than the coupon rate (${couponRate}%). Investors demand a discount to achieve the market return.`
                                            : result.price > result.F
                                            ? `The bond is priced above par because the market yield (${marketYield}%) is lower than the coupon rate (${couponRate}%). Investors pay a premium for the above-market coupon.`
                                            : `The bond is priced at par because the market yield equals the coupon rate.`}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
