import { createContext, useEffect, useState } from "react";
import { verifyAccessToken } from "../utils/misc/checkAuth.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verify auth tokens (refresh and access)
        const verifyAuth = async () => {
            setIsLoading(true);
            try {
                const isValidAccess = await verifyAccessToken();
                if (isValidAccess) {
                    setAuth(true);
                    return;
                }
                const revalidation = await verifyAccessToken();
                setAuth(revalidation === true);
            } catch (err) {
                setAuth(false);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth().catch(err => console.error("Error verificando autenticación global:", err));
    }, []);

    const authContextValue = {
        isAuth,
        setAuth,
        isLoading
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;