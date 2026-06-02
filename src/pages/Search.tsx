import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, X } from 'lucide-react'
import { useAnimeStore } from '@stores/animeStore'
import { Pagination } from '@components/common/Pagination'

function SkeletonCard() {
    return (
        <div className="rounded-2xl overflow-hidden bg-pink-100/60 dark:bg-purple-900/20 animate-pulse">
            <div className="h-[220px] bg-pink-200/60 dark:bg-purple-900/40" />
            <div className="p-3 flex flex-col gap-2">
                <div className="h-3 rounded-full bg-pink-200/60 dark:bg-purple-900/40 w-3/4" />
                <div className="h-3 rounded-full bg-pink-200/60 dark:bg-purple-900/40 w-1/2" />
            </div>
        </div>
    )
}

export default function SearchPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const { searchResults, searchLoading, searchPage, searchHasNext, searchAnime, searchLastPage } = useAnimeStore()

    const urlQuery = searchParams.get('q') ?? ''
    const urlPage = Number(searchParams.get('page') ?? '1')
    const [input, setInput] = useState(urlQuery)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // re-fetch whenever url params change
    useEffect(() => {
        if (urlQuery) {
            searchAnime(urlQuery, urlPage)
        } else {
            searchAnime('')
        }
    }, [urlQuery, urlPage])

    // cleanup debounce
    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setInput(val)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            if (val.trim()) {
                setSearchParams({ q: val, page: '1' })
            } else {
                setSearchParams({})
            }
        }, 500)
    }

    const handleClear = () => {
        setInput('')
        setSearchParams({})
    }

    const handlePageChange = (page: number) => {
        setSearchParams({ q: urlQuery, page: String(page) })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="min-h-screen bg-[#fdf6f0] dark:bg-[#0f0a1a] px-4 py-6 max-w-6xl mx-auto">

            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#c2608a] to-[#e8a0bf] dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
                Browse Anime
            </h1>

            {/* search input */}
            <div className="relative mb-6">
                <SearchIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 dark:text-violet-400"
                />
                <input
                    value={input}
                    onChange={handleChange}
                    placeholder="Search by name or genre..."
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white dark:bg-white/5 border border-pink-200 dark:border-purple-900/40 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-violet-500 transition-all text-sm"
                />
                {input && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* results */}
            {searchLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : searchResults.length > 0 ? (
                <>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                        Results for "<span className="font-semibold text-gray-600 dark:text-gray-300">{urlQuery}</span>"
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {searchResults.map((anime, index) => (
                            <div
                                key={`${anime.mal_id}-${index}`}
                                onClick={() => navigate(`/anime/${anime.mal_id}`)}
                                className="rounded-2xl overflow-hidden cursor-pointer group bg-white dark:bg-white/5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                            >
                                <div className="relative h-[220px] overflow-hidden">
                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {anime.score && (
                                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                                            <span className="text-yellow-400">★</span> {anime.score}
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug">
                                        {anime.title_english ?? anime.title}
                                    </p>
                                    {anime.genres?.length > 0 && (
                                        <p className="text-xs text-violet-400 dark:text-violet-300 truncate mt-1">
                                            {anime.genres.map(g => g.name).join(' · ')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={searchPage}
                        lastPage={searchLastPage}
                        hasNext={searchHasNext}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : urlQuery && !searchLoading ? (
                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="text-sm">No results for "<span className="font-semibold">{urlQuery}</span>"</p>
                </div>
            ) : (
                <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                    <p className="text-4xl mb-3">✨</p>
                    <p className="text-sm">Start typing to search anime</p>
                </div>
            )}
        </div>
    )
}