/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/reducers/userReducers";

const RequireAuth = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useSelector(state => state.user.user);

    useEffect(() => {
        // Check authentication on component mount
        if (!auth) {
            // If not authenticated, dispatch login action
            dispatch(LoginUser({ username: 'your_username', password: 'your_password' }));
        }
    }, [auth, dispatch]);

    // If still not authenticated, return null (or a loading indicator)
    if (!auth) {
        const role = useSelector(state => state.user.user.role);
        return null;
    }

    // User is authenticated, check for roles

    if (!allowedRoles || allowedRoles.includes(role)) {
        return <Outlet />;
    }

    // User is authenticated but doesn't have the required role
    return <Navigate to="/" state={{ from: location }} replace />;
}

export default RequireAuth;
