import { Exoplanet } from "@/models/DashBoard/Exoplanet";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props
{
    data: Exoplanet[];
}

const LastExoplanetsTable: React.FC<Props> = ({ data }) =>
{
    const [onHoverRow, setOnHoverRow] = useState<number | null>(null);
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
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-[100%] text-left shadow-md rounded-lg bg-cards-color">
            <div className='p-6'>
                <h3 className='font-bold'>Discovered Exoplanets by month</h3>
            </div>
            <div className="overflow-auto">
                {table.getRowModel().rows.length > 0 ?
                    <>
                        <table className="w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr className="border-b border-collapse" key={headerGroup.id}>
                                        {headerGroup.headers.map((header, index) => (
                                            <th className="p-3 text-[var(--primary-color)]" key={header.id}>
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
                                            <td className={`p-4 ${cellIndex == 0 ? "font-bold" : "font-thin text-[var(--primary-color)]"}`}
                                                data-rowindex={String(rowIndex)}
                                                data-cellindex={String(cellIndex)}
                                                key={cell.id}>
                                                <div className="flex items-center relative">
                                                    {cell.getValue() as JSX.Element}
                                                    {cellIndex === 1 &&
                                                        <>
                                                            <IoMdInformationCircleOutline
                                                                size={17}
                                                                className="ml-2 min-w-[17px]"
                                                                cursor="pointer"
                                                                color="var(--info-color)"
                                                                onMouseOver={() => setOnHoverRow(rowIndex)}
                                                            />

                                                            {onHoverRow === rowIndex ? (
                                                                <div className="absolute w-40 p-1 bg-white rounded-lg border border-gray-400 shadow-lg z-10"
                                                                    onMouseOut={() => setOnHoverRow(null)}>
                                                                    <p>Esta es la caja emergente con más información.</p>
                                                                </div>
                                                            ) : null}
                                                        </>

                                                    }

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
