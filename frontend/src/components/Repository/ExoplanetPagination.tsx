import { Exoplanet } from "@/models/DashBoard/Exoplanet";
import PaginatedTable from "@/models/Global/PaginatedTable";
import { ExoplanetsData } from "@/models/Repository/ExoplanetsData";
import { Filters } from "@/models/Repository/Filters";
import { ColumnDef, Table } from "@tanstack/react-table";
import { useMemo } from "react";

interface Props
{
    filters: Filters;
    repoExoplanetsData: ExoplanetsData,
    setRepoExoplanetsDate: (newReg: ExoplanetsData) => void;
}
const ExoplanetPagination: React.FC<Props> = ({ filters, repoExoplanetsData }) =>
{
    if (!repoExoplanetsData.exoplanetsData || repoExoplanetsData.exoplanetsData.length === 0)
    {
        return <div>Cargando datos...</div>;
    }
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



    const table: Table<Exoplanet> = PaginatedTable(tableColumns, repoExoplanetsData);
    return (
        <section>
            <div className="flex flex-wrap w-full">
                {table.getRowModel().rows.map((row) => (
                    <div className="row w-[30%] p-3 mx-1 mb-2 border bg-[ #f5f5f5] rounded-lg shadow-md" key={row.id}>
                        <p className="font-bold">{row.original.hostname}</p>
                        <p>Discovered by: {row.original.discoverymethod}</p>
                        <p>Discovered Telescope: {row.original.disc_telescope}</p>
                        <p className="text-end">Discovered Public Date: {row.original.disc_pubdate}</p>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExoplanetPagination;