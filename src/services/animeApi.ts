import { api } from "@services/api";
import type { ApiResponse, Anime } from "@models/anime";
const defaultParams = { sfw: true }

export const searchAnimeApi = (query: string, page: number = 1, signal?: AbortSignal) => {
    return api.get<ApiResponse>('/anime', {
        params: {
            q: query,
            limit: 12,
            page,
            sfw: true,
            order_by: 'popularity',
            sort: 'asc',
        },
        signal,
    })
}

export const getTrendingApi = (signal?: AbortSignal) => {
    return api.get<ApiResponse>("/top/anime", {
        params: { limit: 25, ...defaultParams },
        signal,
    });
};

export const getScheduleApi = (signal?: AbortSignal) => {
    return api.get<ApiResponse>("/seasons/now", {
        params: {
            order_by: 'popularity',
            sort: 'asc',
            ...defaultParams
        },
        signal,
    });
};

export const getAnimeDetailApi = (id: number, signal?: AbortSignal) => {
    return api.get<{ data: Anime }>(`/anime/${id}/full`, { signal })
}