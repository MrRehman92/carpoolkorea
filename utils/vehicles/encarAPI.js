import { api } from "../api";

export const getEncarVehicles = async (page = 1, perPage = 20, sort = '') => {
    try {
        const start = (page - 1) * perPage;

        const params = {
            draw: page,
            start: start,
            length: perPage,
            sort: sort,
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
