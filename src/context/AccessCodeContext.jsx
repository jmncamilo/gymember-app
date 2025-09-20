import { createContext, useState } from "react";

const AccessCodeContext = createContext();

export const AccessCodeProvider = ({children}) => {
    const [isValidCodeAccess, setValidCodeAccess] = useState(true);

    const accessCodeValue = {
        isValidCodeAccess,
        setValidCodeAccess
    }

    return (
        <AccessCodeContext.Provider value={accessCodeValue}>
            {children}
        </AccessCodeContext.Provider>
    );
}

export default AccessCodeContext;