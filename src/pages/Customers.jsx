// import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import UserNav from "../components/ui/user-nav";
import { listCustomers } from "../redux/reducers/listcustomersReducer";

const CustomerPage = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const customers = useSelector((state) => state.customers.data); // Access customer data from Redux store
  const isLoading = useSelector((state) => state.customers.loading); // Access loading state from Redux store

  useEffect(() => {
    // Fetch customer data when the component mounts
    dispatch(listCustomers());
  }, [dispatch]);

  const columns = getColumns({
    keyOne: "email",
    keyOneTitle: "Customer email",
    keyTwo: "valid_account",
    keyTwoTitle: "Valid / Invalid",
    keyThree: "active",
    keyThreeTitle: "Status",
    keyFour: "createdAt",
    keyFourTitle: "Created At",
    keyFive: "_id",
    keyFiveTitle: "Customer ID",
    option: "customers",
  });
  return (
    <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
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
        <DataTable
          data={customers}
          columns={columns}
          option={"customers"}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CustomerPage;
