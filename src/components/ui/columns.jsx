/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
  customerStatuses,
  labels,
  orderStatuses,
  userLabels,
} from "../../data/data";
import DeleteUser from "../Users/deleteBtn";
import DeleteCategory from "../category/deleteCategory";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
import DataTableColumnHeader from "./data-table-column-header";

function getColumns({
  keyOne,
  keyTwo,
  keyThree,
  keyFour,
  keyFive,
  option,
  keyOneTitle,
  keyTwoTitle,
  keyThreeTitle,
  keyFourTitle,
  keyFiveTitle,
  onUserHover,
  path,
}) {
  return [
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
      accessorKey: keyOne,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={keyOneTitle}
          className={"!text-sm"}
        />
      ),
      cell: ({ row }) => (
        <Badge
          className="font-medium"
          variant={"outline"}
          onMouseOver={
            option === "users" || option === "customers" || option === "orders"
              ? () => onUserHover(row)
              : undefined
          }
        >
          <Link to={path}>{row.getValue(keyOne)}</Link>
        </Badge>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    option === "users" || option === "customers" || option === "categories"
      ? {
          // id: keyFive,
          accessorKey: keyTwo,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyTwoTitle} />
          ),
          cell: ({ row }) => {
            const cellValue = row.getValue(keyTwo);
            return (
              <Badge variant="outline" className="font-medium">
                {cellValue}
              </Badge>
            );
          },
        }
      : option === "orders"
      ? {
          accessorKey: keyTwo,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyTwoTitle} />
          ),
          cell: ({ row }) => {
            const cellValue = row.getValue(keyTwo);

            return (
              <Badge variant="outline" className="font-medium">
                {cellValue.email}
              </Badge>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
          enableSorting: false,
          enableHiding: false,
        }
      : null,
    option === "orders"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = orderStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeStyles}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
          enableSorting: false,
          enableHiding: false,
        }
      : option === "customers"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const label = labels.find(
              (label) => label.value === row.original.valid_account
            );
            return (
              <div className="flex space-x-2">
                {label && (
                  <Badge
                    variant="outline"
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
                <span className="max-w-[500px] truncate font-medium">
                  {row.getValue(keyThree)}
                </span>
              </div>
            );
          },
        }
      : option === "users"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const label = userLabels.find(
              (label) => label.value === row.original.role
            );
            return (
              <div className="flex space-x-2">
                {label && (
                  <Badge
                    variant="outline"
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
                {/* <span className="max-w-[500px] truncate font-medium">
                  {row.getValue(keyThree)}
                </span> */}
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
          enableSorting: true,
          enableHiding: true,
        }
      : option === "categories"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
        }
      : null,
    option === "orders"
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const dateValue = row.getValue(keyFour);
            const formattedValue = new Date(dateValue).toLocaleDateString();
            return (
              <Badge variant={"outline"} className={"font-medium"}>
                {formattedValue}
              </Badge>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === "customers"
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyFour)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === "users"
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyFour)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          enableSorting: true,
          enableHiding: true,
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === "categories"
      ? {
          accessorKey: keyFour,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyFourTitle} />
          ),
          cell: ({ row }) => {
            const dateValue = row.getValue(keyFour);
            const formattedValue = new Date(dateValue).toLocaleDateString();
            return (
              <Badge variant={"outline"} className={"font-medium"}>
                {formattedValue}
              </Badge>
            );
          },
          enableSorting: true,
          enableHiding: true,
        }
      : null,
    {
      accessorKey: keyFive,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={keyFiveTitle} />
      ),
      cell: ({ row }) => {
        if (option === "users" || option === "customers") {
          const dateValue = row.getValue(keyFive);
          const formattedValue = new Date(dateValue).toLocaleDateString();
          return (
            <Badge variant={"outline"} className={"font-medium"}>
              {formattedValue}
            </Badge>
          );
        } else if (option === "orders") {
          console.log(row.getValue(keyFive)?.total_with_fees);
          return (
            <p className="font-medium">{`${new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(row.getValue(keyFive).total_with_fees)} MAD`}</p>
          );
        }

        return null;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "actions",
      cell: ({ row }) => {
        if (option === "users") {
          return <DeleteUser id={row.getValue(keyOne)} row={row} />;
        } else if (option === "categories") {
          return <DeleteCategory id={row.getValue(keyOne)} row={row} />;
        }
      },
    },
  ];
}
// <DeleteUser id={row.getValue(keyFive)} row={row} />
export default getColumns;
