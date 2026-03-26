export default function NewsCard({ icon, category, title, date, onClick}){
    return (
        <div className="bg-white border border-light-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 shadow-2xl hover:shadow-(--shadow-md) hover:-translate-y-0.5 hover:border-teal-3" onClick={onClick}>
            <div className="h-37.5 bg-linear-to-br from-teal to-blue flex items-center justify-center text-[38px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/2 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.2))]">{icon}</div>
            <div className="p-5">
                <div className="text-[10.5px] font-bold tracking-[1px] uppercase text-teal mb-2">{category}</div>
                <div className="font-display) text-[15px] text-text leading-[1.35] mb-2">{title}</div>
                <div className="font-mono text-[10.5px] text-text-3">{date}</div>
            </div>
        </div>
    );
}