/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { CheckIcon, Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import { CircleIcon } from "lucide-react";
import React from "react";

const labels = [
  {
    value: true,
    label: "Valid",
    badgeStyles: "bg-green-200 border-green-200",
  },
  {
    value: false,
    label: "Invalid",
    badgeStyles: "bg-slate-200 border-slate-200",
  },
];
const userLabels = [
  {
    value: "admin",
    label: "Admin",
    badgeStyles: "bg-green-300 border-green-300",
  },
  {
    value: "manager",
    label: "Manager",
    badgeStyles: "bg-green-100 border-green-100",
  },
];

const customerStatuses = [
  {
    value: true,
    label: "Active",
    icon: CheckIcon,
    color: "text-green-500",
  },
  {
    value: false,
    label: "Inactive",
    icon: Cross2Icon,
    color: "text-red-500",
  },
];
const orderStatuses = [
  {
    value: "Shipped",
    label: "Shipped",
    icon: CheckIcon,
    color: "text-blue-500",
    badgeStyles: "bg-blue-200 border-blue-200",
  },
  {
    value: "Open",
    label: "Open",
    icon: CircleIcon,
    color: "text-yellow-500",
    badgeStyles: "bg-yellow-200 border-yellow-200",
  },
  {
    value: "Closed",
    label: "Closed",
    icon: CheckIcon,
    color: "text-slate-500",
    badgeStyles: "bg-slate-200 border-slate-200",
  },
  {
    value: "Paid",
    label: "Paid",
    icon: CheckIcon,
    color: "text-green-500",
    badgeStyles: "bg-green-200 border-green-200",
  },
  {
    value: "Canceled",
    label: "Canceled",
    icon: Cross1Icon,
    color: "text-red-500",
    badgeStyles: "bg-red-200 border-red-200",
  },
];

export { customerStatuses, labels, orderStatuses, userLabels };
