/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
// import { Table } from "@tanstack/react-table";
import { customerStatuses } from "../../data/data";
import { Button } from "./button";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableViewOptions from "./data-table-view-options";
import { Input } from "./input";

function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-end">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("active") && (
          <DataTableFacetedFilter
            column={table.getColumn("active")}
            title="Status"
            options={customerStatuses}
          />
        )}
        {/* {table.getColumn("valid_account") && (
          <DataTableFacetedFilter
            column={table.getColumn("valid_account")}
            title="Valid / Invalid"
            options={labels}
          />
        )} */}
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