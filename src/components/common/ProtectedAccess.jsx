import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";
import { Loader } from "../loader/Loader.jsx";

export function ProtectedAccess() {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) return <Loader />;

    if (!isAuth) return <Navigate to={'/login'} replace />;

    return <Outlet />;
}