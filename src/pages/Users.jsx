import axios from "axios";
import { useEffect, useState } from "react";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserDialog from "../components/Users/addUserDialog";
import UpdateUserDialog from"../components/Users/updateUserDialog";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/v1/users")
      .then((response) => {
        const { data } = response.data;
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);
  const columns = getColumns({
    keyOne: "email",
    keyOneTitle: "User email",
    keyTwo: "role",
    keyTwoTitle: "User Role",
    keyThree: "active",
    keyThreeTitle: "Status",
    keyFour: "createdAt",
    keyFive: "_id",
    keyFiveTitle: "User ID",
    option: "users",
  });

  return (
    <div className="container h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">USERS</h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of all users!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserDialog/>
          <UpdateUserDialog/>
        </div>
      </div>
      <div className="">
        <DataTable
          data={users}
          columns={columns}
          isLoading={isLoading}
          option={"customers"}
        />
      </div>
    </div>
  );
};

export default UserPage;