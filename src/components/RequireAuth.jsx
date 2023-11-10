/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { user, isLoading, error } = useSelector((state) => state.auth);
  if (isLoading) {
    console.log("isloading");
    return <p>loading...</p>;
  }

  if (error) {
    console.log(error);

    return <p>error</p>;
  }
  if (!token) {
    console.log("No Token");
    return <Navigate to="/" />;
  }

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default RequireAuth;
