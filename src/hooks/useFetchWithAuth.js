import { useFetch } from "./useFetch.js";
import { verifyAccessToken } from "../utils/misc/checkAuth.js";

export function useFetchWithAuth(url, options = {}) {
    const { data, error, isLoading, setIsLoading, executeFetch } =  useFetch(url, options);

    const executeFetchWithAuth = async () => {
        setIsLoading(true);
        try {
            const isValidAccess = await verifyAccessToken();
            if (!isValidAccess) {
                return {
                    success: false,
                    data: null,
                    error: 'Tus credenciales no son válidas o han expirado...'
                };
            }

            const data = await executeFetch();
            return {
                success: true,
                data,
                error: null
            };

        } catch (err) {
            console.error('Error en executeFetchWithAuth:', err);
            return { success: false, data: null, error: 'Error inesperado durante la solicitud.' };
        } finally {
            setIsLoading(false);
        }
    };

    // Return both the original fetch handler and the authenticated fetch handler
    return { data, error, isLoading, executeFetch, executeFetchWithAuth };
}