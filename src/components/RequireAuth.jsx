/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const auth = window.localStorage.getItem("token");
  console.log(auth);
  const data = useSelector((state) => state.userLogin?.user);

  if (data?.user?.role === allowedRoles || auth === data?.accessToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default RequireAuth;
