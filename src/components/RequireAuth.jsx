/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { LoginUser } from "../redux/reducers/userReducers";
import React from "react";

const RequireAuth = ({ allowedRoles }) => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading, error } = useSelector((state) => state.user);

  // const role= useSelector(state => state.user.user.role);

  const auth = React.useMemo(() => (user ? user : ""), [user]);

  console.log(auth);
  console.log(allowedRoles);

  // const loginUserIfNeeded = () => {
  //     dispatch(LoginUser({ username: 'your_username', password: 'your_password' }));
  // };

  if (isLoading) return <p>loading...</p>;

  if (error) return <p>error</p>;

  if (auth?.role.toLowerCase() === allowedRoles.toLowerCase()) {
    return <Outlet />;
  }

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }
};
export default RequireAuth;
