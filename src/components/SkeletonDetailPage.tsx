export function SkeletonDetail() {
    return (
        <div className="min-h-screen bg-[#fdf6f0] dark:bg-[#0f0a1a]">

            {/* banner */}
            <div className="h-[420px] md:h-[500px] bg-gradient-to-b from-pink-200/60 via-pink-100/40 to-[#fdf6f0] dark:from-purple-900/40 dark:via-violet-900/20 dark:to-[#0f0a1a] animate-pulse" />

            {/* content */}
            <div className="max-w-6xl mx-auto px-4 -mt-[12rem] pb-12 relative">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    {/* poster */}
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                        <div className="w-[160px] md:w-[200px] h-[240px] md:h-[280px] rounded-2xl bg-pink-200/60 dark:bg-purple-900/40 animate-pulse" />
                        <div className="w-full h-9 rounded-full bg-pink-200/60 dark:bg-purple-900/40 animate-pulse" />
                    </div>

                    {/* info */}
                    <div className="flex flex-col gap-4 flex-1 min-w-0 pt-[8rem]">
                        {/* title */}
                        <div className="h-8 rounded-full bg-pink-200/60 dark:bg-purple-900/40 animate-pulse w-2/3" />
                        <div className="h-4 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse w-1/3" />

                        {/* stats */}
                        <div className="flex gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="w-[80px] h-[80px] rounded-2xl bg-pink-200/60 dark:bg-purple-900/40 animate-pulse" />
                            ))}
                        </div>

                        {/* meta */}
                        <div className="flex flex-wrap gap-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-4 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse" style={{ width: `${60 + i * 20}px` }} />
                            ))}
                        </div>

                        {/* tags */}
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="h-7 w-20 rounded-full bg-pink-200/60 dark:bg-purple-900/40 animate-pulse" />
                            ))}
                        </div>

                        {/* synopsis */}
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="h-3 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse w-full" />
                            <div className="h-3 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse w-full" />
                            <div className="h-3 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse w-5/6" />
                            <div className="h-3 rounded-full bg-pink-100/60 dark:bg-purple-900/30 animate-pulse w-4/6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}