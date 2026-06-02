import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { useAnimeStore } from '@stores/animeStore'
import { SkeletonCarousel } from '@components/SkeletonCarousel'
import { useNavigate } from 'react-router-dom'
import type { Anime } from '@models/anime'

export function AnimeCarousel() {
    const { trending, trendingLoading, fetchTrending } = useAnimeStore()
    const navigate = useNavigate()

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [bgImage, setBgImage] = useState('')
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: true,
    })

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        const index = emblaApi.selectedScrollSnap()
        setSelectedIndex(index)
        setBgImage(trending[index]?.images.jpg.image_url ?? '')
    }, [emblaApi, trending])

    const handleClickDetail = (index: number, anime: Anime) => {
        if (index === selectedIndex) {
            navigate(`/anime/${anime.mal_id}`)
        } else {
            emblaApi?.scrollTo(index)
        }
    }

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
        onSelect()
        return () => { emblaApi.off('select', onSelect) }
    }, [emblaApi, onSelect])

    useEffect(() => {
        fetchTrending()
    }, [])

    // set bg once trending loads
    useEffect(() => {
        if (trending.length > 0 && !bgImage) {
            setBgImage(trending[0].images.jpg.image_url)
        }
    }, [trending])

    if (trendingLoading) return <SkeletonCarousel />

    return (
        <div className="relative overflow-hidden py-4 bg-gray-100 dark:bg-[#0f0a1a]">

            {/* blurred bg — only one, handles both modes via Tailwind */}
            {bgImage && (
                <div
                    className="
                        absolute inset-0
                        bg-cover bg-center
                        scale-110 blur-2xl
                        brightness-75 dark:brightness-[0.1]
                        saturate-150
                        transition-all duration-500
                        pointer-events-none
                    "
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
            )}

            {/* color overlay */}
            <div
                className="
                    absolute inset-0
                    from-pink-300/20 via-fuchsia-200/10 to-violet-300/20
                    dark:from-purple-900/60 dark:via-violet-900/50 dark:to-blue-900/60
                    bg-gradient-to-br
                    pointer-events-none
                "
            />

            {/* embla */}
            <div className="overflow-hidden py-4" ref={emblaRef}>
                <div className="flex">
                    {trending.map((anime, index) => (
                        <div
                            key={anime.mal_id}
                            className="flex-shrink-0 py-2"
                            style={{ width: '200px' }}
                            onClick={() => handleClickDetail(index, anime)}
                        >
                            <div
                                className={`
                                    transition-all duration-300
                                    ${index === selectedIndex
                                        ? 'opacity-100 scale-105'
                                        : 'opacity-70 scale-95 hover:opacity-90 hover:scale-100'
                                    }
                                `}
                            >
                                <div
                                    className="
                                        relative w-full h-[280px]
                                        rounded-2xl overflow-hidden
                                        cursor-pointer group
                                        [backface-visibility:hidden]
                                        [transform:translate3d(0,0,0)]
                                    "
                                >
                                    {!loadedImages[anime.mal_id] && (
                                        <div className="absolute inset-0 bg-pink-200/20 animate-pulse rounded-2xl" />
                                    )}

                                    <img
                                        src={anime.images.jpg.image_url}
                                        alt={anime.title}
                                        onLoad={() =>
                                            setLoadedImages(prev => ({
                                                ...prev,
                                                [anime.mal_id]: true,
                                            }))
                                        }
                                        className={`
                                            w-full h-full object-cover rounded-2xl
                                            group-hover:scale-105
                                            transition-all duration-500
                                            ${loadedImages[anime.mal_id] ? 'opacity-100' : 'opacity-0'}
                                        `}
                                        draggable={false}
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                                        <p className="text-white text-sm font-medium line-clamp-2">
                                            {anime.title}
                                        </p>
                                    </div>

                                    {anime.score && (
                                        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
                                            <span className="text-yellow-400">★</span> {anime.score}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}