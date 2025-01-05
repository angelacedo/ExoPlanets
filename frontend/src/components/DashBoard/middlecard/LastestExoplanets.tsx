import { Exoplanet } from "@/models/Global/Exoplanet";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";

interface Props
{
    data: Exoplanet[] | undefined;
}

const LastExoplanetsTable: React.FC<Props> = ({ data }) =>
{
    const columns = useMemo(
        () => [
            {
                header: 'NAME',
                accessorFn: (row: Exoplanet) => row.hostname
            },
            {
                header: 'DISCOVERED METHOD',
                accessorFn: (row) => row.discoverymethod
            },
            {
                header: 'DISCOVERED PUBLIC DATE',
                accessorFn: (row) => row.disc_pubdate,
            },
            {
                header: 'DISTANCE (LY)',
                accessorFn: (row) => row.sy_dist ? (row.sy_dist * 3.26156).toFixed(2) : "Unknown"
            },
        ],
        []
    );

    const table = useReactTable<Exoplanet>({
        columns,
        data: data || [],
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-[100%] text-left shadow-md rounded-lg bg-cards-color p-3">
            <div className='p-3'>
                <h3 className='font-bold'>Lastest Exoplanets</h3>
            </div>
            <div className="overflow-auto">
                {table.getRowModel().rows.length > 0 ?
                    <>
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr className="border-b border-collapse" key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th className="px-3 text-[var(--generic-text-color-black)]" key={header.id}>
                                                {header.isPlaceholder ? null : String(header.column.columnDef.header)}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, rowIndex) => (
                                    <tr className="border-b border-collapse" key={row.id}>
                                        {row.getVisibleCells().map((cell, cellIndex) => (
                                            <td className={`px-3 font-thin text-[var(--generic-text-color-black)]}`}
                                                data-rowindex={String(rowIndex)}
                                                data-cellindex={String(cellIndex)}
                                                key={cell.id}>
                                                <div className="flex items-center relative">
                                                    {cell.getValue() as JSX.Element}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </> : <p className="p-3">Loading data</p>
                }
            </div>

        </div>
    );
};

export default LastExoplanetsTable;
