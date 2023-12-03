/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import {
  customerStatuses,
  labels,
  orderStatuses,
  userLabels,
} from "../../data/data";
import { Button } from "./button";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableViewOptions from "./data-table-view-options";
import { Input } from "./input";

function DataTableToolbar({ table, option }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex  items-center gap-2 justify-end">
      <div className="flex sm:flex-row flex-col-reverse flex-1 items-end gap-3 sm:items-center justify-end  space-x-2">
        {option === "customers" && (
          <Input
            placeholder="Filter by emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full"
          />
        )}
        {option === "users" && (
          <Input
            placeholder="Filter by emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full"
          />
        )}
        {/* {option === "orders" && (
          <Input
            placeholder="Filter by Customer email..."
            value={table.getColumn("customer_id")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("customer_id")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full"
          />
        )} */}
        {option === "categories" && (
          <Input
            placeholder="Filter by category name..."
            value={table.getColumn("category_name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn("category_name")
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-full"
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
        <div className="flex gap-1">
          {option === "customers" && table.getColumn("active") && (
            <DataTableFacetedFilter
              column={table.getColumn("active")}
              title="Status"
              options={customerStatuses}
            />
          )}

          {option === "orders" && table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={orderStatuses}
            />
          )}

          {option === "users" && table.getColumn("active") && (
            <DataTableFacetedFilter
              column={table.getColumn("active")}
              title="Status"
              options={customerStatuses}
            />
          )}
          {option === "categories" && table.getColumn("active") && (
            <DataTableFacetedFilter
              column={table.getColumn("active")}
              title="Status"
              options={customerStatuses}
            />
          )}

          {option === "users" && table.getColumn("role") && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title="User Role"
              options={userLabels}
            />
          )}

          {option === "customers" && table.getColumn("valid_account") && (
            <DataTableFacetedFilter
              column={table.getColumn("valid_account")}
              title="Valid / Invalid"
              options={labels}
            />
          )}

          {/* {table.getColumn(
            `${
              option === "users"
                ? "role"
                : option === "customers"
                ? "valid_account"
                : null
            }`
          ) && (
            <DataTableFacetedFilter
              column={table.getColumn(
                `${
                  option === "users"
                    ? "role"
                    : option === "customers"
                    ? "valid_account"
                    : null
                }`
              )}
              title={
                option === "users"
                  ? "User Role"
                  : option === "customers"
                  ? "Valid / Invalid"
                  : null
              }
              options={
                option === "users"
                  ? userLabels
                  : option === "customers"
                  ? labels
                  : null
              }
            />
          )} */}
          {/* {table.getColumn(
            `${option === "users" ? "role" : "valid_account"}`
          ) && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title={option === "users" ? "User Role" : "Valid Account"}
              options={option === "users" ? userLabels : labels}
            />
          )} */}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export default DataTableToolbar;
