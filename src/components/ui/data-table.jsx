/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import DataTablePagination from "./data-table-pagination";
import DataTableToolbar from "./data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
function DataTable({ columns, data, option, isLoading }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} option={option} />
      <main className="whitespace-nowrap w-full rounded-md border ">
        <Table className=" min-w-[800px]">
          <TableHeader className="bg-[#fafafa]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header?.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {/* <Icons.spinner className="mr-2 h-7 w-7 animate-spin text-center" /> */}
                  <div className="">
                    <div className="p-3 border-b flex gap-3">
                      <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="p-3 border-b flex gap-3">
                      <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="p-3 flex gap-3">
                      <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="p-3 flex gap-3">
                      <Skeleton className="h-6 w-full" />
                    </div>
                    <div className="p-3 flex gap-3">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                  // onMouseOver={() => onUserClick(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell?.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Display "No results" message
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
      <DataTablePagination table={table} />
    </div>
  );
}

export default DataTable;
