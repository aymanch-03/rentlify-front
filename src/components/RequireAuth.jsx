/* eslint-disable react/prop-types */
import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading, error } = useSelector((state) => state.user);

  //   const role= useSelector(state => state.user.user.role);

  const auth = React.useMemo(() => user ?? user, [user]);

  console.log(auth);
  // console.log(allowedRoles);

  if (isLoading) return <p>loading...</p>;
  console.log(isLoading);
  if (error) return <p>error</p>;

  if (auth?.role === allowedRoles) {
    return <Outlet />;
  }

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
};
export default RequireAuth;
