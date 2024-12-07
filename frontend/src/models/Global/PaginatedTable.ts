import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Exoplanet } from '../DashBoard/Exoplanet';
import { ExoplanetsData } from '../Repository/ExoplanetsData';


const PaginatedTable = (columns: ColumnDef<Exoplanet>[], data: ExoplanetsData) =>
{

  const tableRows = useMemo(() => data.exoplanetsData ?? [], []);
  const tableInstance = useReactTable<Exoplanet>({
    columns,
    data: tableRows,
    getCoreRowModel: getCoreRowModel()
  });

  return tableInstance;
};

export default PaginatedTable;
