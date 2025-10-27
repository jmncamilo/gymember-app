import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

export function ProtectedAccess() {
    // La idea es que con un useEffect se dispare la validación de middleware token en el back mediante useFetch (custom hook)

    const { isAuth } = useContext(AuthContext);

    if(!isAuth) {
        return <Navigate to={'/login'} replace/>;
    }

    return <Outlet/>;
}