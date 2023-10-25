import axios from "axios";
import { useEffect, useState } from "react";
// import { z } from "zod";
import { columns } from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserNav from "../components/ui/user-nav";
// import { taskSchema } from "../data/schema";
// import texts from "../data/tasks.json";

const TaskPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/customers")
      .then((response) => {
        const { data } = response.data;
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(customers);
  return (
    <div className="container h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of your customers!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div className="">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
};

export default TaskPage;
