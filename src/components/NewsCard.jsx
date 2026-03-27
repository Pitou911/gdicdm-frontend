export default function NewsCard({ icon, category, title, date, imageUrl, description, onClick }) {
    return (
        <div
            className="bg-white border border-light-2 rounded-sm overflow-hidden cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-teal-3"
            onClick={onClick}
        >
            {/* nc-img — show uploaded image or fallback gradient */}
            {imageUrl ? (
                <div className="h-37.5 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <div className="h-37.5 bg-linear-to-br from-teal to-blue flex items-center justify-center text-[38px] relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/2 after:bg-[linear-gradient(transparent,rgba(0,0,0,0.2))]">
                    {icon}
                </div>
            )}

            {/* nc-body */}
            <div className="p-5">
                {/* nc-cat */}
                <div className="text-[10.5px] font-bold tracking-[1px] uppercase text-teal mb-2">
                    {category}
                </div>

                {/* nc-title */}
                <div className="font-display text-[15px] font-semibold text-text leading-[1.35] mb-2">
                    {title}
                </div>

                {/* description — only shown if provided */}
                {description && (
                    <p className="text-[12.5px] text-text-3 leading-[1.6] mb-2 line-clamp-2">
                        {description}
                    </p>
                )}

                {/* nc-date */}
                <div className="font-mono text-[10.5px] text-text-3">
                    {date}
                </div>
            </div>
        </div>
    );
}