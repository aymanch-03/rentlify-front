// {
// import { z } from "zod";
// import { columns } from "../components/ui/columns";
// import DataTable from "../components/ui/data-table";
// import UserNav from "../components/ui/user-nav";
// import { taskSchema } from "../data/schema";
// import texts from "../data/tasks.json";

// async function getTasks() {
//   const tasks = JSON.parse(texts.toString());
//   return z.array(taskSchema).parse(tasks);
// }
// console.log(getTasks());

// const TaskPage = async () => {
//   const tasks = await getTasks();

//   return (
//     <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//       <div className="flex items-center justify-between space-y-2">
//         <div>
//           <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//           <p className="text-muted-foreground">
//             Here s a list of your tasks for this month!
//           </p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <UserNav />
//         </div>
//       </div>
//       {/* Replace DataTable with your data table component */}

//       <DataTable data={tasks} columns={columns} />
//     </div>
//   );
// };

// export default TaskPage;
// }

import { useEffect, useState } from "react";
import { z } from "zod";
import { columns } from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserNav from "../components/ui/user-nav";
import { taskSchema } from "../data/schema";
import texts from "../data/tasks.json";

async function getTasks() {
  const tasks = JSON.parse(texts.toString());
  return z.array(taskSchema).parse(tasks);
}

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tasksData = await getTasks();
      setTasks(tasksData);
    }

    fetchData();
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here s a list of your tasks for this month!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};

export default TaskPage;
