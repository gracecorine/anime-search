import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Play, Star, TrendingUp, Users, Tv, Clapperboard, Clock, CalendarDays, AlarmClock, ShieldCheck, Film } from 'lucide-react'
import { useAnimeStore } from '@stores/animeStore';
import { SkeletonDetail } from '@components/SkeletonDetailPage';

function TrailerModal({ embedUrl, onClose }: { embedUrl: string; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
        </div>
    )
}

function Tag({ label }: { label: string }) {
    return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-100 dark:bg-violet-900/40 text-[#c2608a] dark:text-violet-300">
            {label}
        </span>
    )
}

function StatBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center gap-1 bg-white dark:bg-white/5 rounded-2xl px-4 py-3 min-w-[80px]">
            <span className="text-[#c2608a] dark:text-violet-300">{icon}</span>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">{value}</span>
            <span className="text-xs text-gray-400">{label}</span>
        </div>
    )
}

export default function AnimeDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { animeDetail, detailLoading, fetchAnimeDetail } = useAnimeStore()
    const [showTrailer, setShowTrailer] = useState(false)

    useEffect(() => {
        if (!id) return
        fetchAnimeDetail(Number(id))
    }, [id])

    if (detailLoading) return <SkeletonDetail />
    if (!animeDetail) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0] dark:bg-[#0f0a1a]">
            <button
                onClick={() => navigate(-1)}
                className="absolute top-[70px] left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-800 dark:text-white text-sm font-semibold backdrop-blur-sm transition-colors"
            >
                <ArrowLeft size={16} /> Back
            </button>
            <p className="text-gray-400">Anime not found.</p>
        </div>
    )


    const allTags = [
        ...animeDetail.genres,
        ...animeDetail.themes,
        ...animeDetail.demographics,
    ]

    return (
        <div className="min-h-screen bg-[#fdf6f0] dark:bg-[#0f0a1a] max-w-6xl mx-auto">

            {/* blurred hero banner */}
            <div className="relative h-[420px] md:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 blur-[2px] brightness-90 dark:brightness-[0.3] saturate-150"
                    style={{ backgroundImage: `url(${animeDetail.images.jpg.large_image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b 
                    from-pink-200/20 
                    via-pink-100/30 
                    via-60%
                    to-[#fdf6f0]
                    dark:from-purple-900/40
                    dark:via-violet-900/20
                    dark:via-60%
                    dark:to-[#0f0a1a]" 
                />

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 text-gray-800 dark:text-white text-sm font-semibold backdrop-blur-sm transition-colors"
                >
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            {/* content */}
            <div className="max-w-6xl mx-auto px-4 -mt-[12rem] pb-12 relative">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    {/* poster */}
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                        <img
                            src={animeDetail.images.jpg.large_image_url}
                            alt={animeDetail.title}
                            className="w-[160px] md:w-[200px] rounded-2xl shadow-2xl object-cover ring-4 ring-white/50 dark:ring-purple-900/50"
                        />
                        {animeDetail.trailer?.embed_url && (
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full
                                    bg-gradient-to-r from-[#c2608a] to-[#e8a0bf]
                                    hover:from-[#b05078] hover:to-[#d990af]

                                    dark:from-violet-600 dark:to-purple-500
                                    dark:hover:from-violet-500 dark:hover:to-purple-400

                                    text-white text-sm font-semibold
                                    transition-all w-full justify-center shadow-lg
                                "
                            >
                                <Play size={14} fill="white" /> Watch Trailer
                            </button>
                        )}
                    </div>

                    {/* info */}
                    <div className="flex flex-col gap-4 flex-1 min-w-0">

                        {/* title */}
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 leading-tight">
                                {animeDetail.title_english ?? animeDetail.title}
                            </h1>
                            {animeDetail.title_english && (
                                <p className="text-sm mt-1 text-gray-800 dark:text-gray-200 [text-shadow:0_1px_3px_rgba(255,255,255,0.8)] dark:[text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                                    {animeDetail.title}
                                </p>
                            )}
                        </div>

                        {/* stats */}
                        <div className="flex flex-wrap gap-2">
                            {animeDetail.score && (
                                <StatBadge icon={<Star size={14} />} label="Score" value={animeDetail.score} />
                            )}
                            {animeDetail.rank && (
                                <StatBadge icon={<TrendingUp size={14} />} label="Rank" value={`#${animeDetail.rank}`} />
                            )}
                            {animeDetail.members && (
                                <StatBadge icon={<Users size={14} />} label="Members" value={animeDetail.members.toLocaleString()} />
                            )}
                        </div>

                        {/* meta info */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                            {animeDetail.status && (
                                <span className="flex items-center gap-1">
                                    <Tv size={14} className="text-[#c2608a] dark:text-violet-400" /> {animeDetail.status}
                                </span>
                            )}
                            {animeDetail.episodes && animeDetail?.type !== 'Movie' && (
                                <span className="flex items-center gap-1">
                                    <Clapperboard size={14} className="text-[#c2608a] dark:text-violet-400" /> {animeDetail.episodes} eps
                                </span>
                            )}
                            {animeDetail.duration && (
                                <span className="flex items-center gap-1">
                                    <Clock size={14} className="text-[#c2608a] dark:text-violet-400" /> {animeDetail.duration}
                                </span>
                            )}
                            {animeDetail.season && animeDetail.year && (
                                <span className="flex items-center gap-1">
                                    <CalendarDays size={14} className="text-[#c2608a] dark:text-violet-400" />
                                    {animeDetail.season.charAt(0).toUpperCase() + animeDetail.season.slice(1)} {animeDetail.year}
                                </span>
                            )}
                            {animeDetail.broadcast?.day && animeDetail.broadcast?.time && (
                                <span className="flex items-center gap-1">
                                    <AlarmClock size={14} className="text-[#c2608a] dark:text-violet-400" />
                                    {animeDetail.broadcast.day} {animeDetail.broadcast.time} JST
                                </span>
                            )}
                            {animeDetail.rating && (
                                <span className="flex items-center gap-1">
                                    <ShieldCheck size={14} className="text-[#c2608a] dark:text-violet-400" /> {animeDetail.rating}
                                </span>
                            )}
                            {animeDetail.studios?.length > 0 && (
                                <span className="flex items-center gap-1">
                                    <Film size={14} className="text-[#c2608a] dark:text-violet-400" />
                                    {animeDetail.studios.map(s => s.name).join(', ')}
                                </span>
                            )}
                        </div>

                        {/* tags */}
                        {allTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {allTags.map(tag => <Tag key={tag.name} label={tag.name} />)}
                            </div>
                        )}

                        {/* synopsis */}
                        {animeDetail.synopsis && (
                            <div>
                                <h2 className="text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                                    Synopsis
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {animeDetail.synopsis}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* trailer modal */}
            {showTrailer && animeDetail.trailer?.embed_url && (
                <TrailerModal
                    embedUrl={animeDetail.trailer.embed_url}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </div>
    )
}