export function SkeletonCarousel() {
    return (
        <div className="relative overflow-hidden py-4 bg-gray-100 dark:bg-[#0f0a1a]">

            {/* fake blurred bg */}
            <div className="absolute inset-0 bg-pink-200/30 dark:bg-purple-900/20 blur-2xl scale-110" />

            {/* fake pastel overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 via-fuchsia-200/10 to-violet-300/20 dark:from-purple-900/60 dark:via-violet-900/50 dark:to-blue-900/60" />

            {/* cards */}
            <div className="overflow-hidden py-4">
                <div className="flex justify-center gap-0">
                    {Array.from({ length: 7 }).map((_, i) => {
                        const isCenter = i === 3
                        return (
                            <div
                                key={i}
                                className={`
                                    flex-shrink-0 py-2
                                    transition-all duration-300
                                    ${isCenter ? 'opacity-100 scale-105' : 'opacity-70 scale-95'}
                                `}
                                style={{ width: '200px' }}
                            >
                                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden">

                                    {/* main card shimmer */}
                                    <div className="absolute inset-0 bg-pink-200/40 dark:bg-purple-900/40 animate-pulse rounded-2xl" />

                                    {/* fake score badge */}
                                    <div className="absolute top-2 left-2 w-12 h-5 bg-black/40 dark:bg-black/60 rounded-md animate-pulse" />

                                    {/* fake title bar at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
                                        <div className="h-3 bg-white/20 rounded-full w-3/4 animate-pulse mb-1" />
                                        <div className="h-3 bg-white/10 rounded-full w-1/2 animate-pulse" />
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}