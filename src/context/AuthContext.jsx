import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuth, setAuth] = useState(true);

    const authContextValue = {
        isAuth,
        setAuth
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;