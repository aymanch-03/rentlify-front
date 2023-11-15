/* eslint-disable no-unused-vars */
import ExpandedStats from "../components/Dashboard/ExpandedStats";
import Stats from "../components/Dashboard/Stats";
import { useSidebar } from "../context/SidebarProvider";
import Layout from "../layouts/OfficeLayout";

const stats = [
  {
    name: "Total Revenue",
    value: "58,778.00 MAD",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Total Profit",
    value: "32,654.00 MAD",
    change: "+2.02%",
    changeType: "positive",
  },
  {
    name: "Total Customers",
    value: "392",
    change: "+1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "30,156.00 MAD",
    change: "-10.18%",
    changeType: "negative",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const { sidebar } = useSidebar();

  return (
    <>
      <Stats stats={stats} classNames={classNames} />
      <ExpandedStats />
    </>
  );
}
