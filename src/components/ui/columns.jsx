/* eslint-disable no-unused-vars */
import { labels, priorities, statuses } from "../../data/data";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
// import { taskSchema } from "../../data/schema";
import DataTableColumnHeader from "./data-table-column-header";
import DataTableRowActions from "./data-table-row-actions";
import { Link } from 'react-router-dom';

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer email" />
    ),
    cell: ({ row }) => (
      <Link to="/page-content">
      <Badge className="font-medium" variant={"outline"}>
        {row.getValue("email")}
      </Badge>
      </Link>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "valid_account",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valid / Invalid" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.valid_account
      );
      return (
        <div className="flex space-x-2">
          {label && (
            <Badge variant="outline" className={"font-medium"}>
              {label.label}
            </Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("valid_account")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("active")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
          )}
          <Badge variant="outline" className={"font-medium"}>
            {status.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt");
      const formattedValue = new Date(dateValue).toLocaleDateString();
      return (
        <Badge variant={"outline"} className={"font-medium"}>
          {formattedValue}
        </Badge>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer ID" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className={"font-medium"}>
        {row.getValue("_id")}
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
