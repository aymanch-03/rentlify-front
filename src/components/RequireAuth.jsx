/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { user, isLoading, error } = useSelector((state) => state.user);

  if (isLoading) {
    console.log("isloading");
    return <p>loading...</p>;
  }

  if (error) {
    console.log("error");

    return <p>error</p>;
  }
  if (!token) {
    console.log("no token");
    return <Navigate to="/" />;
  }

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default RequireAuth;
