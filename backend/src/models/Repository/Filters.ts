import { PlanetType } from "./ExoplanetType";


export interface Filters
{
    clearButton: boolean;
    searchByText: string | null;
    rangeFilters: RangeFilters[] | null;
    checkBoxFilters: CheckBoxFilters[] | null;
    selectFilters: SelectFilters[] | null;
    applyChanges: boolean;
    showFilters: boolean;
}


export interface RangeFilters
{
    title: string,
    value: [number, number],
    minValue: number,
    maxValue: number,
    step: number,
    allowNullValues: boolean
}


export interface CheckBoxFilters
{
    title: string,
    checked: boolean;
}

export interface SelectFilters
{
    title: string,
    options: string[],
    value: PlanetType
}