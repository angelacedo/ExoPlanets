import { Exoplanet } from "./Exoplanet";

export interface Response
{
    status: number,
    errorMessage: string | null,
    data: Exoplanet[] | null;
    rowCount: number | null
}