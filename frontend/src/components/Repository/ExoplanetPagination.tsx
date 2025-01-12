import { Exoplanet } from "@/models/Global/Exoplanet";
import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { Filters } from "@/models/Repository/Filters";
import PaginatedTable from "@/models/Repository/PaginatedTable";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaWeight } from "react-icons/fa";
import { FaMagnifyingGlass, FaRuler, FaStar } from "react-icons/fa6";
import { GiOrbital } from "react-icons/gi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Loader from "../Loader";

interface Props
{
    setFilters: React.Dispatch<React.SetStateAction<Filters>>,
    setInfoExoplanetsData: React.Dispatch<React.SetStateAction<ExoplanetsData>>,
    infoExoplanetsData: ExoplanetsData,
    className?: string;

}
const ExoplanetPagination: React.FC<Props> = ({ setFilters, setInfoExoplanetsData, infoExoplanetsData, className }) =>
{

    const tableColumns = useMemo<ColumnDef<Exoplanet>[]>(
        () => [
            {
                header: 'ID del Objeto',
                accessorKey: 'objectid',
            },
            {
                header: 'Nombre del Planeta',
                accessorKey: 'pl_name',
            },
            {
                header: 'Letra del Planeta',
                accessorKey: 'pl_letter',
            },
            {
                header: 'ID del Anfitrión',
                accessorKey: 'hostid',
            },
            {
                header: 'Nombre del Anfitrión',
                accessorKey: 'hostname',
            },
            {
                header: 'Fecha de Publicación',
                accessorKey: 'disc_pubdate',
                cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString(),
            },
            {
                header: 'Año de Descubrimiento',
                accessorKey: 'disc_year',
            },
            {
                header: 'Método de Descubrimiento',
                accessorKey: 'disc_method',
            },
            {
                header: 'Localización de Descubrimiento',
                accessorKey: 'disc_locale',
            },
            {
                header: 'Instalación de Descubrimiento',
                accessorKey: 'disc_facility',
            },
            {
                header: 'Instrumento de Descubrimiento',
                accessorKey: 'disc_instrument',
            },
            {
                header: 'Telescopio de Descubrimiento',
                accessorKey: 'disc_telescope',
            },
            {
                header: 'RA (Ascensión Recta)',
                accessorKey: 'ra',
            },
            {
                header: 'Dec (Declinación)',
                accessorKey: 'dec',
            },
            {
                header: 'Distancia del Sistema (LY)',
                accessorKey: 'sy_dist',
            },
        ],
        []
    );

    const changeRepoExoplanetsPage = (newPage: number | null) =>
    {
        if (newPage)
        {
            setInfoExoplanetsData(prevState => ({
                ...prevState,
                isLoading: true,
                actualPage: newPage
            }));

            setFilters(prevState => ({ ...prevState, applyChanges: true }));
        }

    };
    const changeRepoExoplanetsRowsPerPage = (registriesPerPage: number | null) =>
    {
        if (registriesPerPage)
        {
            setInfoExoplanetsData(prevState => ({
                ...prevState,
                registriesPerPage: registriesPerPage,
                actualPage: 1,
                isLoading: true
            }));

            setFilters(prevState => ({ ...prevState, applyChanges: true }));
        }
    };

    const table: Table<Exoplanet> = PaginatedTable(tableColumns, infoExoplanetsData.exoplanetsData);
    return (
        <section className={`mt-8 ${className}`} style={{ backgroundColor: 'var(--bg-color)' }}>

            {!infoExoplanetsData.isLoading ?
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <div key={row.id} className="rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out lg:hover:shadow-xl lg:hover:scale-105 bg-[var(--secondary-color)] mx-auto w-[60%] sm:mx-0 sm:w-auto sm:max-w-[370px]">
                                    <div className="p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-md font-bold text-[--generic-text-color-black]">{row.original.pl_name}</h3>
                                            <p className="text-xs opacity-75 text-[--generic-text-color-black]">{new Date(row.original.disc_pubdate).toLocaleDateString()}</p>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="p-2">
                                                <FaMagnifyingGlass className="h-3 w-3 text-grey-100" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold">Discovery by</h4>
                                                <p className="font-thin">{row.original.discoverymethod}</p>
                                            </div>
                                        </div>
                                        <div className={`my-2 border-t border-grey`} />
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="flex items-start space-x-2">
                                                    <FaStar className="h-4 w-4 text-yellow-500 mt-1" />
                                                    <div>
                                                        <p className="font-bold">Nº of Stars</p>
                                                        <p className="font-thin">{row.original.sy_snum}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start space-x-2">
                                                    <GiOrbital className="h-4 w-4 text-green-500 mt-1" />
                                                    <div>
                                                        <p className="font-bold">Orb. Eccen</p>
                                                        <p className="font-thin">{row.original.pl_orbeccen}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start space-x-2">
                                                    <FaRuler className="h-4 w-4 text-orange-500 mt-1" />
                                                    <div>
                                                        <p className="font-bold">Distance (LY)</p>
                                                        <p className="font-thin">{row.original.sy_dist}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-start space-x-2">
                                                    <FaWeight className="h-4 w-4 text-red-500 mt-1" />
                                                    <div>
                                                        <p className="font-bold">Mass (M⊕)</p>
                                                        <p className="font-thin">{row.original.pl_masse ? parseFloat(row.original.pl_masse.toFixed(5)) : 'Unknown'} </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start space-x-2">
                                                    <BsCalendarDate className="h-4 w-4 text-purple-500 mt-1" />
                                                    <div>
                                                        <p className="font-bold">Orb. Period</p>
                                                        <p className="font-thin">{row.original.pl_orbper ? parseFloat(row.original.pl_orbper.toFixed(2)) : 'Unknown'} days</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-[--generic-text-color-black]">No data found</p>
                        )}
                    </div>

                    <div className="flex justify-center items-center mt-6">
                        {infoExoplanetsData.actualPage - 2 >= 1 && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                                onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage - 2 >= 1 ? infoExoplanetsData.actualPage - 2 : null)}
                            >
                                <MdKeyboardDoubleArrowLeft className="text-[--generic-text-color-black]" />
                            </div>
                        )}
                        {infoExoplanetsData.actualPage - 1 >= 1 && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                                onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage - 1 >= 1 ? infoExoplanetsData.actualPage - 1 : null)}
                            >
                                <MdKeyboardArrowLeft className="text-[--generic-text-color-black]" />
                            </div>
                        )}

                        {(infoExoplanetsData.numberOfPages != 0 && infoExoplanetsData.numberOfPages != 1) && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"
                                onClick={() => changeRepoExoplanetsPage(1)}
                            >
                                <p className="text-[--generic-text-color-black]">1</p>
                            </div>
                        )}

                        {(infoExoplanetsData.numberOfPages != 0 && infoExoplanetsData.numberOfPages == 1) && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"
                                onClick={() => changeRepoExoplanetsPage(1)}
                            >
                                <p className="text-[--generic-text-color-black]">1</p>
                            </div>
                        )}

                        {![1, infoExoplanetsData.numberOfPages].includes(infoExoplanetsData.actualPage) && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                            >
                                <p className="text-[--generic-text-color-black]">{infoExoplanetsData.actualPage}</p>
                            </div>
                        )}

                        {infoExoplanetsData.numberOfPages && !([0, 1].includes(infoExoplanetsData.numberOfPages)) && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                                onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.numberOfPages)}
                            >
                                <p className="p-2 text-[--generic-text-color-black]">{infoExoplanetsData.numberOfPages}</p>
                            </div>
                        )}

                        {infoExoplanetsData.actualPage + 1 <= infoExoplanetsData.numberOfPages! && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                                onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage + 1 <= infoExoplanetsData.numberOfPages! ? infoExoplanetsData.actualPage + 1 : null)}
                            >
                                <MdKeyboardArrowRight className="text-[--generic-text-color-black]" />
                            </div>
                        )}

                        {infoExoplanetsData.actualPage + 2 <= infoExoplanetsData.numberOfPages! && (
                            <div
                                className="w-10 h-10 flex justify-center items-center m-1 cursor-pointer transition-colors duration-300 hover:bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] rounded-lg"

                                onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage + 2 <= infoExoplanetsData.numberOfPages! ? infoExoplanetsData.actualPage + 2 : null)}
                            >
                                <MdKeyboardDoubleArrowRight className="text-[--generic-text-color-black]" />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <p className="m-1 mt-1 text-[--generic-text-color-black]">Registries</p>
                        <select
                            name="Registries"
                            className="h-10 mt-1 rounded-md px-2 py-1 focus:outline-none focus:ring-2 border-2 border-[var(--secondary-color)]"
                            onChange={(e) => changeRepoExoplanetsRowsPerPage(Number(e.currentTarget.value))}
                            defaultValue={infoExoplanetsData.registriesPerPage}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                : Loader(infoExoplanetsData.isLoading, 50, { margin: "0 auto", display: "block" })}
        </section>
    );
};

export default ExoplanetPagination;;