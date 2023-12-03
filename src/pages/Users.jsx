import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserDialog from "../components/Users/addUserDialog";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { ListUsers } from "../redux/reducers/userSlice";

const UserPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.user.isLoading);


  useEffect(() => {
    dispatch(ListUsers());
  }, [dispatch]);

  const [userId, setUserId] = useState("");

  const getUserId = (row) => {
    const user = row.original._id;
    setUserId(user);
  };
  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "User Id",
    keyTwo: "email",
    keyTwoTitle: "Email Adress",
    keyThree: "role",
    keyThreeTitle: "User Role",
    keyFour: "active",
    keyFourTitle: "Status",
    keyFive: "createdAt",
    keyFiveTitle: "Created at",
    option: "users",
    onUserHover: getUserId,
    path: `${userId}`,
  });

  return (
    <div className="container h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-start justify-between space-y-2">
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
            option={"users"}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
