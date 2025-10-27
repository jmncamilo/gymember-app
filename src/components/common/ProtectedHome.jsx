import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AccessCodeContext from "../../context/AccessCodeContext.jsx";

export function ProtectedHome() {
    // La idea es que con un useEffect dispare la validación del código de acceso, con un token ya generado con un claim boolean

    const { isValidCodeAccess } = useContext(AccessCodeContext);

    if(!isValidCodeAccess) {
        return <Navigate to={'/acceso'} replace/>;
    }

    return <Outlet/>;
}