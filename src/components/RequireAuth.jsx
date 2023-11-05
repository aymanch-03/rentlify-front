/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/reducers/userReducers";

const RequireAuth = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useSelector(state => state.user.user);
    const role= useSelector(state => state.user?.user?.role);
    console.log(role);
    const loginUserIfNeeded = () => {
        dispatch(LoginUser({ username: 'your_username', password: 'your_password' }));
    };

    if (role === allowedRoles) {
        return <Outlet />;
    } 
    else if (auth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    } 
    else {
        loginUserIfNeeded(); 
        return <Navigate to="/" state={{ from: location }} replace />;
    }
}


export default RequireAuth;