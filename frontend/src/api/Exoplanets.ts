

export const getExoplanets = async (limit: number) =>
{
    const url = `${import.meta.env.VITE_API_URL}getExoplanets?limit=${limit}`;
    console.log(url)
    const response = await (await fetch(url)).json();
    return response.data;
};

export const getNumberOfExoplanets = async (year: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}getNumberOfExoplanets${year ? `?year=${year}` : ''}`;
    const response = await (await fetch(url)).json();
    return response.rowCount;
};

export const getNumberOfClosestPlanets = async (distance: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}getNumberOfClosestPlanets${distance ? `?distance=${distance}` : ''}`;
    const response = await (await fetch(url)).json();
    return response.rowCount;
};

export const getExoplanetsByMonth = async (year: number | null) =>
{
    const url = `${import.meta.env.VITE_API_URL}getExoplanetsByMonth${year ? `?year=${year}` : ''}`;
    const response = await (await fetch(url)).json();
    return response.data;
};

export default { getExoplanets, getNumberOfExoplanets, getNumberOfClosestPlanets, getExoplanetsByMonth };