/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import React from "react";

const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

const statuses = [
  // {
  //   value: "backlog",
  //   label: "Backlog",
  //   icon: QuestionMarkCircledIcon,
  // },
  {
    value: "active",
    label: "Active",
    icon: CircleIcon,
  },
  // {
  //   value: "in progress",
  //   label: "In Progress",
  //   icon: StopwatchIcon,
  // },
  // {
  //   value: "done",
  //   label: "Done",
  //   icon: CheckCircledIcon,
  // },
  {
    value: "inactive",
    label: "Inactive",
    icon: CrossCircledIcon,
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
