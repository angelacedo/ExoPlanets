import { Exoplanet } from "./Exoplanet";

export interface Response
{

    status: number,
    errorMessage: string | null,
    data: Exoplanet[] | Date | null,
    rowCount?: number | null,
    limit?: number | null;
    rowCountWithoutFilters?: number | null,
    lastTimeUpdated?: string | null
}