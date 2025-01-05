import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { Filters } from "@/models/Repository/Filters";
import ReactSlider from 'react-slider';
interface Props
{
    filters: Filters,
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    className?: string;
    setInfoExoplanetsData: React.Dispatch<React.SetStateAction<ExoplanetsData>>;
}
const ExoplanetRepoFilters: React.FC<Props> = ({ filters, setFilters, className, setInfoExoplanetsData }) =>
{

    const resetFilters = () =>
    {
        const newfilters: Filters = {
            ...filters,
            rangeFilters: (filters.rangeFilters ?? []).map((val) =>
            {
                return { ...val, value: [val.minValue, val.maxValue], allowNullValues: false };
            }),
            selectFilters: (filters.selectFilters ?? []).map((val) =>
            {
                return { ...val, value: val.options[0] };
            }),
            applyChanges: true
        };
        setFilters(newfilters);


    };
    const checkRangeFilter = (rangeIndex: number, newValues: number[]) =>
    {
        const rangeFilters: Filters = {
            ...filters,
            rangeFilters: (filters.rangeFilters ?? []).map((val, index) =>
                rangeIndex === index ? { ...val, value: [newValues[0], newValues[1]] } : val
            )
        };
        setFilters(rangeFilters);
    };
    const checkBoxNullFilter = (rangeIndex: number): void =>
    {
        const rangeFilters: Filters = {
            ...filters,
            rangeFilters: (filters.rangeFilters ?? []).map((val, index) =>
                rangeIndex === index ? { ...val, allowNullValues: !val.allowNullValues } : val
            )
        };
        setFilters(rangeFilters);
    };
    const checkSelectFilter = (selectIndex: number, newValue: string) =>
    {
        const selectFilters: Filters = {
            ...filters,
            selectFilters: (filters.selectFilters ?? []).map((val, index) =>
                selectIndex === index ? { ...val, value: newValue } : val
            )
        };
        setFilters(selectFilters);
    };
    function applyChanges(): void
    {
        setInfoExoplanetsData(prevState => ({ ...prevState, isLoading: true }));
        setFilters({ ...filters, applyChanges: true });

    }


    return (
        <section className={className}>
            <div className="rounded-lg shadow-lg p-3 mt-2">
                <button
                    className="w-full mb-3"
                    onClick={() => resetFilters()}>Clear All</button>
                <div>
                    {filters.rangeFilters && (filters.rangeFilters.map((val, rangeFilters) =>
                        <div className="mx-center my-2 flex items-center" key={`flt-${rangeFilters}`}>
                            <label htmlFor={`lbl-${rangeFilters}`} className="flex items-center w-[70%]">
                                <span className="my-2 w-[35%] font-bold">{val.title}</span>
                                <ReactSlider
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"

                                    value={[val.value[0], val.value[1]]}
                                    min={val.minValue}
                                    max={val.maxValue}
                                    ariaLabel={['Lower thumb', 'Upper thumb']}
                                    ariaValuetext={state => `Thumb value ${state.valueNow}`}
                                    renderThumb={(props, state) => <div {...props} className="thumb-with-value">
                                        <div className="value-label">{state.valueNow}</div>
                                    </div>}
                                    pearling
                                    step={val.step}
                                    minDistance={val.step}
                                    onChange={(newValues) => checkRangeFilter(rangeFilters, newValues)}
                                />
                            </label>
                            <label htmlFor={`lbl-${rangeFilters}`} className="flex items-center w-[30%]">
                                <span className="my-2 font-bold">N/A</span>
                                <input type="checkbox" className="ml-2" onChange={() => checkBoxNullFilter(rangeFilters)} checked={val.allowNullValues} />
                            </label>

                        </div>

                    ))}

                </div>

                <div>
                    {filters.selectFilters && (filters.selectFilters.map((val, selectIndex) =>
                        <>
                            <span className="mr-2 cursor-pointer font-bold" >{val.title}</span>
                            <label htmlFor={`lbl-${selectIndex}`} key={`flt-${selectIndex}`} className="flex items-center py-2">
                                <select name={val.title}
                                    defaultValue={val.value ?? 0}
                                    className="w-[85%]"
                                    onChange={(e) => checkSelectFilter(selectIndex, e.currentTarget.value)}>
                                    {val.options.map((option) => <option value={option}>{option}</option>)}
                                </select>
                            </label>
                        </>
                    ))}
                </div>

                <button
                    className="w-full"
                    onClick={() => applyChanges()}>Apply Changes</button>
            </div>

        </section>
    );
};

export default ExoplanetRepoFilters;