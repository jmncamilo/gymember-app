import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AccessCodeContext from "../../context/AccessCodeContext.jsx";

export function ProtectedHome() {

    const { isValidCodeAccess } = useContext(AccessCodeContext);

    if(!isValidCodeAccess) {
        return <Navigate to={'/acceso'} replace/>;
    }

    return <Outlet/>;
}