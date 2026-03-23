export default function StatCard({ value, label, subLabel}) {
    return (
        <div className="px-5 py-4 border-b border-white/10 last:border-b-0">
            <div className="font-display text-[32px] text-white leading-none mb-1 tracking-[-1px]">{value}</div>
            <div className="text-[11px] font-medium text-white/55 tracking-[0.3px]">{label}</div>
            <div className="font-mono text-[10px] text-white/30 mt-0.75">{subLabel}</div>
        </div>
    )    
}