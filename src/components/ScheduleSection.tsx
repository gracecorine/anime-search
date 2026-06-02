import { useEffect, useState } from 'react'
import { useAnimeStore } from '@stores/animeStore'
import { CalendarHeart } from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const DAYS = ['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays']

const SHORT_DAYS: Record<string, string> = {
    Mondays: 'Mon',
    Tuesdays: 'Tue',
    Wednesdays: 'Wed',
    Thursdays: 'Thu',
    Fridays: 'Fri',
    Saturdays: 'Sat',
    Sundays: 'Sun',
}

const getTodayKey = () => {
    const days = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
    return days[new Date().getDay()]
}

function SkeletonSchedule() {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-200 dark:bg-white/5 animate-pulse">
                    <div className="w-12 h-16 rounded-lg bg-gray-300 dark:bg-white/10 flex-shrink-0" />
                    <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 rounded-full bg-gray-300 dark:bg-white/10 w-2/3" />
                        <div className="h-3 rounded-full bg-gray-300 dark:bg-white/10 w-1/3" />
                        <div className="h-3 rounded-full bg-gray-300 dark:bg-white/10 w-1/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function ScheduleSection() {
    const navigate = useNavigate()
    const { schedule, scheduleLoading, fetchSchedule } = useAnimeStore()
    const [activeDay, setActiveDay] = useState(getTodayKey)

    useEffect(() => {
        fetchSchedule()
    }, [])

    return (
        <div className="px-4 py-6 bg-[#fdf6f0] dark:bg-[#0f0a1a]">
            <h2 className="flex mb-2 text-xl items-center bg-gradient-to-r from-[#c2608a] to-[#e8a0bf] dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                <CalendarHeart size={24} className="text-pink-400 dark:text-purple-400 pr-1" />
                Airing Schedule
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {DAYS.map(day => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`
                            flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold
                            transition-all duration-200
                            ${activeDay === day
                                ? 'bg-pink-300 dark:bg-[#8b5cf6] text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-purple-900/40'
                            }
                        `}
                    >
                        {SHORT_DAYS[day]}
                    </button>
                ))}
            </div>

            {/* List */}
            {scheduleLoading
                ? <SkeletonSchedule />
                : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(schedule[activeDay] ?? []).map(anime => (
                            <div
                                key={anime.mal_id}
                                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 hover:bg-violet-50 dark:hover:bg-purple-900/20 transition-colors cursor-pointer"
                                onClick={() => navigate(`/anime/${anime.mal_id}`)}
                            >
                                <img
                                    src={anime.images.jpg.image_url}
                                    alt={anime.title}
                                    className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                                />
                                <div className="flex flex-col gap-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 line-clamp-1">
                                        {anime.title}
                                    </p>

                                    <div className="flex items-center gap-1 text-xs min-w-0">
                                        <span className="text-gray-500 dark:text-gray-400 flex-shrink-0">
                                            {anime.broadcast?.time ?? '??:??'} JST
                                        </span>
                                        {anime.genres?.length > 0 && (
                                            <>
                                                <span className="text-gray-400 flex-shrink-0">|</span>
                                                <span className="text-[#c2608a] dark:text-violet-300 truncate">
                                                    {anime.genres.map(g => g.name).join(' · ')}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        {anime.score && (
                                            <span className="text-xs text-yellow-500 font-semibold">★ {anime.score}</span>
                                        )}
                                        <span className="text-gray-400 flex-shrink-0 px-1">|</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {anime.episodes ? `? / ${anime.episodes} eps` : 'Ongoing'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(schedule[activeDay] ?? []).length === 0 && (
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6 col-span-2">
                                Nothing airing on this day
                            </p>
                        )}
                    </div>
                )
            }
        </div>
    )
}