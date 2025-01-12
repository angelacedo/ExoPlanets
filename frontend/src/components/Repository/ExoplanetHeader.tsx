import { Filters } from "@/models/Repository/Filters";
import React from "react";
import { IoFilter, IoSearch } from "react-icons/io5";

interface ExoplanetHeaderProps
{
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const ExoplanetHeader: React.FC<ExoplanetHeaderProps> = ({ filters, setFilters }) =>
{
    const [searchText, setSearchText] = React.useState<string | null>(null);
    return (
        <div className="flex justify-between">

            <button className="flex justify-center items-center border p-3 border-[var(--secondary-color)] rounded-[40px] transition" onClick={() => setFilters({ ...filters, showFilters: !filters.showFilters })}><IoFilter className="mr-2 " />Filters</button>

            <div className="flex items-center border p-3 border-[var(--secondary-color)] rounded-[40px]">
                <input className="bg-transparent" type="text" name="search" placeholder="Search..." onChange={(e) => setSearchText(e.currentTarget.value)} />
                <IoSearch className="cursor-pointer" onClick={() => setFilters({ ...filters, searchByText: searchText ? searchText : null, applyChanges: true })}/>
            </div>


        </div>
    );
};


export default ExoplanetHeader;