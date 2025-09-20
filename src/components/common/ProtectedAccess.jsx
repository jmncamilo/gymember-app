import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

export function ProtectedAccess() {
    // let isAuth = true;

    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        return <Navigate to={'/login'} replace/>;
    }

    return <Outlet/>;
}