export interface Filters
{
    clearButton: boolean;
    selectFilters: SelectFilters[] | null;
    checkBoxFilters: CheckBoxFilters[] | null;
}

export interface SelectFilters
{
    title: string,
    options: string[];
}


export interface CheckBoxFilters
{
    title: string,
    checked: boolean;
}