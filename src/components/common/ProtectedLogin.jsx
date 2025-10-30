import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";
import { Loader } from "../loader/Loader.jsx";

export function ProtectedLogin() {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) return <Loader />;

    if (isAuth) return <Navigate to="/acceso" replace />;

    return <Outlet />;
}