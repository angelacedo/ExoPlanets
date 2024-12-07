import { Filters } from "@/models/Repository/Filters";

interface Props
{
    filters: Filters,
    setFilters: (newReg: Filters) => void;
}
const ExoplanetRepoFilters: React.FC<Props> = ({ filters, setFilters }) =>
{

    const resetFilters = () =>
    {
        const newfilters: Filters = {
            ...filters,
            checkBoxFilters: (filters.checkBoxFilters ?? []).map((val) =>
            {
                return { ...val, checked: false };
            })
        };
        setFilters(newfilters);
    };

    const checkCheckBoxFilter = (checkBoxIndex: number) =>
    {
        const checkBoxFilters: Filters = {
            ...filters,
            checkBoxFilters: (filters.checkBoxFilters ?? []).map((val, index) =>
                checkBoxIndex === index ? { ...val, checked: !val.checked } : val
            )
        };
        setFilters(checkBoxFilters);
    };
    return (
        <section className="h-[450px] bg-[var(--generic-text-color)] rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-3">
                <legend className="font-bold">Filters</legend>
                <button
                    className="border p-2 font-bold text-xs rounded-md bg-[var(--primary-color)] text-[var(--generic-text-color)]"
                    onClick={() => resetFilters()}>Clear All</button>
            </div>
            <hr />
            <fieldset className="p-3 mt-2">
                <legend className="font-bold">CheckBox Filters</legend>
                <div>
                    {filters.checkBoxFilters && (filters.checkBoxFilters.map((val, checkBoxIndex) =>
                    {
                        return (
                            <label htmlFor={`lbl-${checkBoxIndex}`} key={`flt-${checkBoxIndex}`} className="flex items-center py-2">
                                <input type="checkbox"
                                    checked={val.checked}
                                    onChange={() => checkCheckBoxFilter(checkBoxIndex)}
                                />
                                <span className="ml-2 cursor-pointer" onClick={() => checkCheckBoxFilter(checkBoxIndex)}>{val.title}</span>
                            </label>
                        );
                    }))}
                </div>
            </fieldset>


        </section>
    );
};

export default ExoplanetRepoFilters;