export default function ResourceCard({ id, type, typeIcon, title, meta, linkText, onClick, fileUrl, streamUrl }) {
    let typeColor = 'var(--color-teal)';
    let tagBg     = 'var(--color-teal-4)';
    let tagColor  = 'var(--color-teal)';

    if (type.includes('Guide') || type.includes('Beginner')) {
        typeColor = 'var(--color-green-2)';
        tagBg     = 'var(--color-green-3)';
        tagColor  = 'var(--color-green-2)';
    } else if (type.includes('Video') || type.includes('min')) {
        typeColor = '#059669';
        tagBg     = 'var(--color-green-3)';
        tagColor  = 'var(--color-green-2)';
    } else if (type.includes('Infographic')) {
        typeColor = '#7c3aed';
        tagBg     = '#f3e8ff';
        tagColor  = '#7c3aed';
    } else if (type.includes('External')) {
        typeColor = 'var(--color-blue-2)';
        tagBg     = 'var(--color-blue-3)';
        tagColor  = 'var(--color-blue-2)';
    }

    const isTag = !['Debt Bulletin', 'Statistical', 'Legal', 'Bond Info'].some(t => type.includes(t));

    const isLink     = type.includes('External') || (fileUrl && fileUrl.startsWith('http') && !fileUrl.includes('/storage/'));
    const hasFile    = fileUrl && fileUrl.includes('/storage/');
    const isVideo    = type.includes('Video');
    const actionHref = isLink    ? fileUrl
                     : isVideo   ? streamUrl
                     : hasFile   ? `http://localhost:8000/api/cms/education/${id}/stream`
                     : null;

    const handleAction = async (e) => {
        e.stopPropagation();
        if (!actionHref) { onClick?.(); return; }

        if (isLink) {
            window.open(actionHref, '_blank', 'noopener noreferrer');
        } else if (isVideo) {
            // open video stream in new tab — browser plays it natively
            window.open(actionHref, '_blank', 'noopener noreferrer');
        } else if (hasFile) {
            try {
                const res      = await fetch(actionHref);
                const blob     = await res.blob();
                const url      = URL.createObjectURL(blob);
                const a        = document.createElement('a');
                const filename = fileUrl.split('/').pop();
                a.href         = url;
                a.download     = filename || title;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch {
                window.open(actionHref, '_blank');
            }
        }
    };

    return (
        <div
            className="bg-white border border-light-2 rounded-sm p-6 flex flex-col gap-2.5 cursor-pointer transition-all duration-200 shadow-(--shadow-sm) hover:border-teal-3 hover:shadow-(--shadow-lg) hover:-translate-y-0.5"
            onClick={onClick}
        >
            {/* rc-type */}
            <div
                className="text-[11px] font-bold tracking-[1px] uppercase flex items-center gap-1.5"
                style={{ color: typeColor }}
            >
                {typeIcon} {type.replace(/[📄🎬🖼🔗]/g, '').trim()}
            </div>

            {/* rc-title */}
            <div className="font-display text-[15.5px] font-semibold text-text leading-[1.4]">
                {title}
            </div>

            {/* rc-foot */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-light">
                {isTag ? (
                    <span
                        className="text-[10px] font-semibold px-2 py-0.75 rounded-[4px]"
                        style={{ background: tagBg, color: tagColor }}
                    >
                        {meta}
                    </span>
                ) : (
                    <span className="font-mono text-[10.5px] text-text-3">{meta}</span>
                )}

                {/* action button */}
                <span
                    onClick={handleAction}
                    className="text-[12.5px] font-semibold cursor-pointer flex items-center gap-1.25 transition-colors duration-150 hover:opacity-80"
                    style={{ color: typeColor }}
                >
                    {linkText}
                </span>
            </div>
        </div>
    );
}