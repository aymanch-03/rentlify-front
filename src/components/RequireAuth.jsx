/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DashboardSkeleton from "./Dashboard/DashboardSkeleton";
import { Icons } from "./ui/icons";
import { useToast } from "./ui/use-toast";

const RequireAuth = ({ allowedRoles }) => {
  const [cookies] = useCookies(["token"]);
  const { toast } = useToast();
  const token = cookies.token;
  const { user, isLoading, error } = useSelector((state) => state.auth);
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    toast({
      variant: "destructive",
      description: "Something went wrong",
    });
    return <Icons.spinner className="animate-spin w-6 h-6" />;
  }
  if (!token) {
    return <Navigate to="/" />;
  }

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default RequireAuth;
