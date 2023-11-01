/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const role = auth.role;
    const accesToken = auth.accessToken;
    console.log(accesToken);

    if (role === allowedRoles) {
        return <Outlet />;
    } 
    else if (auth?.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } 
    else {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
} 

export default RequireAuth;