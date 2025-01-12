import { Exoplanet } from "@/models/Global/Exoplanet";
import { DiscoveringMethod } from "@/models/Global/ExoplanetDiscMethod";
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
                accessorFn: (row) =>
                {
                    switch (row.discoverymethod)
                    {
                        case DiscoveringMethod.AST:
                            return <p className="text-red-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.ETV:
                            return <p className="text-blue-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.DKIN:
                            return <p className="text-pink-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.IMA:
                            return <p className="text-purple-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.IMA:
                            return <p className="text-brown-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.MICRO:
                            return <p className="text-black-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.OBM:
                            return <p className="text-orange-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.PTV:
                            return <p className="text-brown-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.PUL:
                            return <p className="text-grey-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.PUL:
                            return <p className="text-amber-900">{row.discoverymethod}</p>;
                        case DiscoveringMethod.RV:
                            return <p className="text-cyan-500">{row.discoverymethod}</p>;
                        case DiscoveringMethod.TTV:
                            return <p className="text-indigo-800">{row.discoverymethod}</p>;
                        case DiscoveringMethod.TRAN:
                            return <p className="text-green-800">{row.discoverymethod}</p>;

                    }
                }
            },
            {
                header: 'DISCOVERED PUBLIC DATE',
                accessorFn: (row) => new Date(row.disc_pubdate).toDateString(),
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
        <div className="w-[100%] text-left shadow-md rounded-lg bg-[var(--generic-text-color)] px-3 md:px-0 pt-1">
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
                                            <th className="p-2 text-[var(--generic-text-color-black)]" key={header.id}>
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
                                            <td className={`p-2 text-[var(--generic-text-color-black)] ${[0, 1, 2].includes(cellIndex) ? 'font-bold' : 'font-thin'}`}
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
