import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Exoplanet } from '../Global/Exoplanet';


const PaginatedTable = (columns: ColumnDef<Exoplanet>[], data: Exoplanet[] | null) =>
{
  const tableInstance = useReactTable<Exoplanet>({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel()
  });

  return tableInstance;
};

export default PaginatedTable;
