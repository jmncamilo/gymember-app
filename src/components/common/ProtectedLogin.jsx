import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

export function ProtectedLogin() {
    // let isAuth = true;

    const { isAuth } = useContext(AuthContext);

    if(isAuth) {
        return <Navigate to={'/acceso'} replace/>;
    }

    return <Outlet/>;
}