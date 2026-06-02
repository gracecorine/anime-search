export function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden animate-pulse">
            {/* image placeholder */}
            <div className="h-[100px] bg-pink-100" />
            {/* text placeholders */}
            <div className="p-3 space-y-2">
                <div className="h-3 bg-pink-100 rounded-full w-3/4" />
                <div className="h-3 bg-pink-100 rounded-full w-1/2" />
            </div>
        </div>
    )
}