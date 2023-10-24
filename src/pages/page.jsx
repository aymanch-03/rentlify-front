// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable react-refresh/only-export-components */
// import fs from "fs";
// import path from "path";
// // import { Metadata } from "next";
// // import Image from "next/image";
// import { z } from "zod";
// import { texts } from "../data/tasks.json";


// import { columns } from "../components/ui/columns";
// import DataTable from "../components/ui/data-table";
// import UserNav from "../components/ui/user-nav";
// import { taskSchema } from "../data/schema";


// export const metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker built using Tanstack Table.",
// };

// // Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), texts)
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

// export default async function TaskPage() {
//   const tasks = await getTasks();

//   return (
//       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//             <p className="text-muted-foreground">
//               Here's a list of your tasks for this month!
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UserNav />
//           </div>
//         </div>
//         <DataTable data={tasks} columns={columns} />
//       </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
import {promises as fs} from "fs";
import path from "path";
import UserNav from '../components/ui/user-nav';
import DataTable from '../components/ui/data-table';
import { columns } from "../components/ui/columns";
import { texts } from "../data/tasks.json";
import { z } from "zod";
import {taskSchema} from "../data/schema";


async function getTasks() {
  const data = await fs.readFile(
    path.join(texts)
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const TaskPage = async ( ) => {
  // Simulate a database read for tasks.
  // const getTasks = async () => {
  //   try {
  //     const response = await fetch('../data/tasks.json'); // Assuming you have this JSON file in your public folder
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch tasks');
  //     }
  //     const tasks = await response.json();
  //     console.log(tasks)
  //     return tasks;
  //   } catch (error) {
  //     console.error('Error fetching tasks:', error);
  //     return [];
  //   }
  // };

  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const tasksData = await getTasks();
  //     setTasks(tasksData);
  //   };
  //   fetchTasks();
  // }, []);

  

  const tasks = await getTasks();
console.log(tasks);

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
      {/* Replace DataTable with your data table component */}

          <DataTable data={tasks} columns={columns} />
    </div>
  );
};

export default TaskPage;
