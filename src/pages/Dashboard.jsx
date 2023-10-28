/* eslint-disable no-unused-vars */
// import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";

import Stats from "../components/Dashboard/Stats";
// import Sidebar from "../components/ui/Sidebar";

const stats = [
  {
    name: "Total Revenue",
    value: "$58,778.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Number of Sales",
    value: "8",
    change: "+12.02%",
    changeType: "positive",
  },
  {
    name: "Total of Customers",
    value: "392",
    change: "+1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "$30,156.00",
    change: "-10.18%",
    changeType: "negative",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  return (
    <main className="">
      {/* <Sidebar /> */}
      <Stats stats={stats} classNames={classNames} />
    </main>
  );
}
