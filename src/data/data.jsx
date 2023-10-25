/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import React from "react";

const labels = [
  {
    value: true,
    label: "Valid",
  },
  {
    value: false,
    label: "Invalid",
  },
];

const statuses = [
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

const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export default function TaskData() {
  return <div>{/* You can use the data definitions here */}</div>;
}

export { labels, priorities, statuses };
