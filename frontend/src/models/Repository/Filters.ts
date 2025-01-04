
export interface Filters
{
    clearButton: boolean;
    searchByText: string | null;
    rangeFilters: RangeFilters[] | null;
    selectFilters: SelectFilters[] | null;
    showFilters: boolean;
    applyChanges: boolean;

}

export interface RangeFilters
{
    title: string,
    value: [number, number],
    minValue: number,
    maxValue: number,
    step: number
}

export interface SelectFilters
{
    title: string,
    options: string[],
    value: string | null
}