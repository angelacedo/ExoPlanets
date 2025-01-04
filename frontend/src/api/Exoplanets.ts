import { Filters } from "@/models/Repository/Filters";
import { createUrl } from "@/utils/urls";

//Global
export const getExoplanets = async (limit: number | null, fromOrigin: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}Global/getExoplanets${limit ? `?limit=${limit}&fromOrigin=${fromOrigin}` : ''}`;
    const response = await (await fetch(url)).json();

    return response.data;
};

//DashBoard
export const getNumberOfExoplanets = async (year: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}DashBoard/getNumberOfExoplanets${year ? `?year=${year}` : ''}`;
    const response = await (await fetch(url)).json();
    return response.rowCount;
};

export const getNumberOfClosestPlanets = async (distance: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}DashBoard/getNumberOfClosestPlanets${distance ? `?distance=${distance}` : ''}`;
    const response = await (await fetch(url)).json();
    return response.rowCount;
};

export const getExoplanetsByMonth = async () =>
{
    const url = `${import.meta.env.VITE_API_URL}DashBoard/getExoplanetsByMonth`;
    const response = await (await fetch(url)).json();
    return response.data;
};

export const getLastTimeUpdated = async () =>
{
    const url = `${import.meta.env.VITE_API_URL}DashBoard/getLastTimeUpdated`;
    const response = await (await fetch(url)).json();
    return response.data;
};
//Repository
export const getExoplanetsWithFilters = async (limit: number | null, fromOrigin: number | null, filters: Filters) =>
{

    const params = {
        limit,
        fromOrigin,
        filters
    };

    const url = createUrl(`${import.meta.env.VITE_API_URL}Repository/getExoplanetsWithFilters`, params);
    const response = await (await fetch(url)).json();

    return response;
};

export default { getExoplanets, getNumberOfExoplanets, getNumberOfClosestPlanets, getExoplanetsByMonth, getLastTimeUpdated, getExoplanetsWithFilters };