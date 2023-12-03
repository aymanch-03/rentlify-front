/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { Icons } from "../ui/icons";
import { useToast } from "../ui/use-toast";

const RequireCustomerAuth = () => {
  const [cookies] = useCookies(["clientToken"]);
  const { toast } = useToast();
  const token = cookies.clientToken;
  const { error, customer } = useSelector((state) => state.authCustomer);

  if (error) {
    toast({
      variant: "destructive",
      description: "Something went wrong",
    });
    return <Icons.spinner className="animate-spin w-6 h-6" />;
  }
  if (!token) {
    console.log("No token");
    return <Navigate to="/login" />;
  }

  return customer ? <Outlet /> : <Navigate to="/login" />;
};
export default RequireCustomerAuth;
