import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { ListUsers } from "../redux/reducers/userSlice";
import UserDialog from "../components/Users/addUserDialog";
import { useState } from "react";

const UserPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);

  // console.log(data);

  useEffect(() => {
    dispatch(ListUsers());
  }, [dispatch]);

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

  const [userId, setUserId] = useState(null)
  
  const getUserId = (row) => {
    const user = row.original._id
    setUserId(user);

  };
  
  return (
    <div className="container h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Users Management
          </h2>
          <p className="text-muted-foreground">
            {"Here's"} a list of all users!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserDialog />
        </div>
      </div>
      <div className="">
        {data && (
          <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            option={"customers"}
            onUserClick={getUserId}
            path={`/users/${userId}`}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
