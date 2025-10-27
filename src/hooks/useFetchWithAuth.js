import { useFetch } from "./useFetch.js";

export function useFetchWithAuth(url, options = {}) {
    const apiUrl = import.meta.env.VITE_API_URL; // Backend url
    const { data, error, isLoading, setIsLoading, executeFetch } =  useFetch(url, options);

    // TODO: modularize function because it is created again in every render...
    const verifyAccessToken = async () => {
        try {
            const res = await fetch(`${apiUrl}/token/access`);
            if (res.status === 401) {
                // Fetching to the endpoint that handles refresh token
                const refreshRes = await fetch(`${apiUrl}/token/refresh`);
                const data = await refreshRes.json();
                return data.success === true;
            }
            return res.ok;
        } catch (err) {
            console.error('Error ejecutando verifyAccessToken', err);
            return false;
        }
    }

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