

export const getExoplanets = async (limit: number | null, fromOrigin: number | null) =>
{
    console.log(limit, fromOrigin)
    const url = `${import.meta.env.VITE_API_URL}Global/getExoplanets${limit ? `?limit=${limit}&fromOrigin=${fromOrigin}`: ''}`;

    const response = await (await fetch(url)).json();

    return response.data;
};

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

export default { getExoplanets, getNumberOfExoplanets, getNumberOfClosestPlanets, getExoplanetsByMonth };