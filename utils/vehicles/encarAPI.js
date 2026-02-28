import { api } from "../api";

export const getEncarVehicles = async (page = 1, perPage = 20, sort = '', filters = {}) => {
    try {
        const start = (page - 1) * perPage;
        const { car_type = 'Y', category = 'car', lang = 'en', ...restFilters } = filters;

        const params = {
            draw: page,
            start: start,
            length: perPage,
            sort: sort,
            car_type,
            category,
            lang,
            ...restFilters
        };

        const res = await api.get('/encar/live', { params });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch Encar vehicles:", error);
        return {
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
        };
    }
};

export const getEncarFilterOptions = async (params = {}) => {
    try {
        const { category = 'car', ...rest } = params;
        const res = await api.get('/encar/filter-options', { params: { category, ...rest } });
        return res.data;
    } catch (error) {
        console.error("Failed to fetch Encar filter options:", error);
        return {
            manufacturers: [],
            modelGroups: [],
            models: [],
            badgeGroups: [],
            badges: [],
            badgeDetails: []
        };
    }
};
