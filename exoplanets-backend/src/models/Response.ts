import { Exoplanet } from "./Exoplanet";

export interface Response
{
    limit: number | null;
    status: number,
    errorMessage: string | null,
    data: Exoplanet[] | null;
    rowCount: number | null
}