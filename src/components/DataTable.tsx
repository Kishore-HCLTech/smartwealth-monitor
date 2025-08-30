import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <Input
        placeholder="Search..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4"
      />

      <Table>
        <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <TableHead
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="cursor-pointer select-none"
                >
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === 'asc'  || header.column.getIsSorted() === 'desc' ? <ArrowUpDown size={10}/> : ''}
                </TableHead>
            ))}
            </TableRow>
        ))}
        </TableHeader>


        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div 
        className="flex items-center justify-between mt-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
        </Button>

        <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
        </Button>
      </div>

    </div>
  );
}
