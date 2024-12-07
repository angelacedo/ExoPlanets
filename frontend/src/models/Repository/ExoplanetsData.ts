import { Exoplanet } from "../DashBoard/Exoplanet";

export interface ExoplanetsData {
    exoplanetsData: Exoplanet[] | null;
    actualPage: number;
    nextPage: number | null;
    previousPage: number | null;
    actualMaxRegistry: number;
}