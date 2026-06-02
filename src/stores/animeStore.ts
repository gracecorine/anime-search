import { create } from 'zustand'
import type { Anime } from '@models/anime'
import { searchAnimeApi, getTrendingApi, getScheduleApi, getAnimeDetailApi } from '@services/animeApi'

const fetchLocks = {
    trending: false,
    schedule: false,
    detail: false,
    search: false,
}

const dedup = (anime: Anime[]) =>
    anime.filter((a, index, self) =>
        index === self.findIndex(b => b.mal_id === a.mal_id)
    )

interface AnimeStore {
    trending: Anime[]
    searchResults: Anime[]
    schedule: Record<string, Anime[]>

    trendingLoading: boolean
    searchLoading: boolean
    scheduleLoading: boolean

    trendingLoaded: boolean
    scheduleLoaded: boolean

    searchPage: number
    searchHasNext: boolean
    searchQuery: string
    searchLastPage: number

    fetchTrending: () => Promise<void>
    fetchSchedule: () => Promise<void>
    searchAnime: (query: string, page?: number) => Promise<void>

    animeDetail: Anime | null
    detailLoading: boolean
    fetchAnimeDetail: (id: number) => Promise<void>
}

export const useAnimeStore = create<AnimeStore>((set) => ({
    trending: [],
    searchResults: [],
    schedule: {},

    trendingLoading: false,
    searchLoading: false,
    scheduleLoading: false,

    trendingLoaded: false,
    scheduleLoaded: false,

    searchPage: 1,
    searchHasNext: false,
    searchQuery: '',
    searchLastPage: 1,

    animeDetail: null,
    detailLoading: false,

    fetchTrending: async () => {
        if (fetchLocks.trending) return
        fetchLocks.trending = true
        set({ trendingLoading: true })
        try {
            const { data } = await getTrendingApi()
            set({ trending: dedup(data.data), trendingLoaded: true })
        } catch (err) {
            console.error(err)
            fetchLocks.trending = false // reset on error so it can retry
        } finally {
            set({ trendingLoading: false })
        }
    },

    fetchSchedule: async () => {
        if (fetchLocks.schedule) return
        fetchLocks.schedule = true
        set({ scheduleLoading: true })
        try {
            const { data } = await getScheduleApi()
            const grouped = dedup(data.data)
                .filter(anime => anime.status !== 'Finished Airing')
                .reduce((acc, anime) => {
                    const day = anime.broadcast?.day ?? 'Unknown'
                    if (!acc[day]) acc[day] = []
                    acc[day].push(anime)
                    return acc
                }, {} as Record<string, Anime[]>)
            set({ schedule: grouped, scheduleLoaded: true })
        } catch (err) {
            console.error(err)
            fetchLocks.schedule = false
        } finally {
            set({ scheduleLoading: false })
        }
    },

    fetchAnimeDetail: async (id) => {
        if (fetchLocks.detail) return
        fetchLocks.detail = true
        set({ detailLoading: true, animeDetail: null })
        try {
            const { data } = await getAnimeDetailApi(id)
            set({ animeDetail: data.data })
        } catch (err) {
            console.error(err)
            fetchLocks.detail = false
        } finally {
            set({ detailLoading: false })
            fetchLocks.detail = false // reset so different anime can be fetched
        }
    },

    searchAnime: async (query, page = 1) => {
        if (!query.trim()) {
            set({ searchResults: [], searchPage: 1, searchHasNext: false })
            return
        }
        if (fetchLocks.detail) return
        fetchLocks.detail = true
        set({ searchLoading: true })
        try {
            const { data } = await searchAnimeApi(query, page)
            set({
                searchResults: data.data,
                searchPage: page,
                searchHasNext: data.pagination?.has_next_page ?? false,
                searchQuery: query,
                searchLastPage: data.pagination?.last_visible_page
            })
        } catch (err) {
            console.error(err)
            fetchLocks.detail = false
        } finally {
            set({ searchLoading: false })
            fetchLocks.detail = false
        }
    },
}))