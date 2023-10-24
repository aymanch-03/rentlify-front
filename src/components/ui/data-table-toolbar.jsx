/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
// import { Table } from "@tanstack/react-table";
import { priorities, statuses } from "../../data/data";
import { Button } from "./button";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableViewOptions from "./data-table-view-options";
import { Input } from "./input";

function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={table.getColumn("valid")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("valid")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("identifier") && (
          <DataTableFacetedFilter
            column={table.getColumn("identifier")}
            title="Id"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export default DataTableToolbar;
