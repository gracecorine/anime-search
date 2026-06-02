export interface Anime {
    mal_id: number
    title: string
    title_english: string | null
    images: {
        jpg: { image_url: string; large_image_url: string }
        webp: { image_url: string; large_image_url: string }
    }
    trailer: {
        embed_url: string | null
    } | null
    score: number | null
    rank: number | null
    popularity: number | null
    members: number | null
    synopsis: string | null
    status: string | null
    episodes: number | null
    duration: string | null
    rating: string | null
    season: string | null
    year: number | null
    genres: { name: string }[]
    themes: { name: string }[]
    demographics: { name: string }[]
    studios: { name: string }[]
    broadcast: {
        day: string | null
        time: string | null
        timezone: string | null
    } | null
    type: string | null
}

export interface ApiResponse {
    data: Anime[]
    pagination?: {
        last_visible_page: number
        has_next_page: boolean
    }
}
