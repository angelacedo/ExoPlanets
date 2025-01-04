import { Exoplanet } from "@/models/Global/Exoplanet";
import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { Filters } from "@/models/Repository/Filters";
import PaginatedTable from "@/models/Repository/PaginatedTable";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props
{
    filters: Filters;
    setInfoExoplanetsData: React.Dispatch<React.SetStateAction<ExoplanetsData>>,
    infoExoplanetsData: ExoplanetsData,
    className?: string;

}
const ExoplanetPagination: React.FC<Props> = ({ filters, setInfoExoplanetsData, infoExoplanetsData, className }) =>
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
            setInfoExoplanetsData(prevState => ({
                ...prevState,
                isLoading: true,
                actualPage: newPage
            })
            );
    };
    const changeRepoExoplanetsRowsPerPage = (registriesPerPage: number | null) =>
    {
        console.log(registriesPerPage);
        if (registriesPerPage)
            setInfoExoplanetsData(prevState => ({
                ...prevState,
                registriesPerPage: registriesPerPage
            })
            );
    };

    const table: Table<Exoplanet> = PaginatedTable(tableColumns, infoExoplanetsData.exoplanetsData);
    return (
        <section className={`mt-8 ${className}`} style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
                {table.getRowModel().rows.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                        <div key={row.id} className="rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105" style={{ background: 'var(--bg-color-top-card)' }}>
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold" style={{ color: 'var(--generic-text-color)' }}>{row.original.pl_name}</h3>
                                    <p className="text-sm opacity-75" style={{ color: 'var(--generic-text-color)' }}>{new Date(row.original.disc_pubdate).toLocaleDateString()}</p>
                                </div>
                                <h4 className="mb-2" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Discovered by:</span> {row.original.discoverymethod}</h4>
                                <h4 className="mb-1" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Number of Stars:</span> {row.original.sy_snum}</h4>
                                <h4 className="mb-1" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Mass (M🜨):</span> {row.original.pl_bmasse}</h4>
                                <h4 className="mb-1" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Orbital Eccentricity:</span> {row.original.pl_orbeccen}</h4>
                                <h4 className="mb-1" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Orbital Period (Days):</span> {row.original.pl_orbper}</h4>
                                <h4 className="mb-1" style={{ color: 'var(--generic-text-color)' }}><span className="font-semibold">Distance (LY):</span> {row.original.sy_dist}</h4>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center" style={{ color: 'var(--generic-text-color-black)' }}>No data found</p>
                )}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-6">
                {infoExoplanetsData.actualPage - 2 >= 1 && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage - 2 >= 1 ? infoExoplanetsData.actualPage - 2 : null)}
                    >
                        <MdKeyboardDoubleArrowLeft style={{ color: 'var(--generic-text-color-black)' }} />
                    </div>
                )}
                {infoExoplanetsData.actualPage - 1 >= 1 && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage - 1 >= 1 ? infoExoplanetsData.actualPage - 1 : null)}
                    >
                        <MdKeyboardArrowLeft style={{ color: 'var(--generic-text-color-black)' }} />
                    </div>
                )}

                {infoExoplanetsData.numberOfPages != 0 && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(1)}
                    >
                        <p style={{ color: 'var(--generic-text-color-black)' }}>1</p>
                    </div>
                )}

                {infoExoplanetsData.actualPage != infoExoplanetsData.numberOfPages && infoExoplanetsData.actualPage != 1 ? (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                    >
                        <p style={{ color: 'var(--generic-text-color-black)' }}>{infoExoplanetsData.actualPage}</p>
                    </div>
                ) : null}

                {(infoExoplanetsData.numberOfPages != 0) && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.numberOfPages)}
                    >
                        <p style={{ color: 'var(--generic-text-color-black)' }}>{infoExoplanetsData.numberOfPages}</p>
                    </div>
                )}

                {infoExoplanetsData.actualPage + 1 <= infoExoplanetsData.numberOfPages! && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage + 1 <= infoExoplanetsData.numberOfPages! ? infoExoplanetsData.actualPage + 1 : null)}
                    >
                        <MdKeyboardArrowRight style={{ color: 'var(--generic-text-color-black)' }} />
                    </div>
                )}

                {infoExoplanetsData.actualPage + 2 <= infoExoplanetsData.numberOfPages! && (
                    <div
                        className="w-10 h-10 flex justify-center items-center rounded-full m-1 cursor-pointer transition-colors duration-300"
                        style={{ border: '1px solid var(--info-color)' }}
                        onClick={() => changeRepoExoplanetsPage(infoExoplanetsData.actualPage + 2 <= infoExoplanetsData.numberOfPages! ? infoExoplanetsData.actualPage + 2 : null)}
                    >
                        <MdKeyboardDoubleArrowRight style={{ color: 'var(--generic-text-color-black)' }} />
                    </div>
                )}
            </div>

            <div className="flex justify-center items-center mt-4">
                <p className="m-1 mt-1" style={{ color: 'var(--generic-text-color-black)' }}>Rows per page</p>
                <select
                    name="Rows per page"
                    className="h-10 mt-1 rounded-md px-2 py-1 focus:outline-none focus:ring-2"
                    style={{ color: 'var(--generic-text-color-black)', borderColor: 'var(--info-color)' }}
                    onChange={(e) => changeRepoExoplanetsRowsPerPage(Number(e.currentTarget.value))}
                >
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </section>
    );
};

export default ExoplanetPagination;