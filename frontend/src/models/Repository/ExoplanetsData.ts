import { Exoplanet } from "../Global/Exoplanet";

export interface ExoplanetsData {
    exoplanetsData: Exoplanet[] | null;
    actualPage: number,
    numberOfPages: number | null;
    registriesPerPage: number;
    isLoading: boolean;
}