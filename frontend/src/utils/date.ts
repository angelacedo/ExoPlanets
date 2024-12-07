import { ExoplanetByMonth } from "@/models/DashBoard/Exoplanet";

export const getMonthName = (monthNumber: number) =>
{
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return monthNames[monthNumber - 1];
};

export const filterYearFromDiscoveredExoplanets = (data: ExoplanetByMonth[] | null | undefined, year: number) =>
{
    let filteredExoplanetByMonth = data ? data.filter(((val: ExoplanetByMonth) => val.year == year)) : null;
    return filteredExoplanetByMonth;
};

export const getYearsFromDiscoveredExoplanets = (data: ExoplanetByMonth[] | null | undefined, year: number) =>
{
    let years = data ? Array.from(new Set(data.map(item => item.year))) : null;
    return years ? years.sort().reverse() : [year];
};