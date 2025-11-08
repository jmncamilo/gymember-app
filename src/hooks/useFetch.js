import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
    const apiUrl = import.meta.env.VITE_API_URL; // Backend url
    const { autoFetch = false, ...fetchOptions } = options;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(autoFetch);

    const executeFetch = async (overrideOptions = {}) => {
        console.log('Requested endpoint:', apiUrl + url) // Testing CJ
        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch(apiUrl + url, {
                ...fetchOptions,
                ...overrideOptions,
                credentials: 'include',
                headers: {
                    ...fetchOptions.headers,
                    ...overrideOptions.headers,
                    'Content-Type': 'application/json'
                }
            });

            // This handles only error status 400 which is the validation error in the backend architecture
            if (res.status === 400) {
                const data = await res.json();
                throw new Error(`${data.message}`);
            }

            // This throws an error if the response is negative when attempting to verify the tokens
            if (!res.ok) {
                console.log(`¡Error HTTP detectado! Status: ${res.status}`);
                throw new Error('Ocurrió un error al procesar la solicitud. Vuelve a intentarlo.');
            }

            const data = await res.json();
            setData(data);
            return data;

        } catch (err) {
            console.log('useFetch executeFetch error:', err);
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const abortController = new AbortController();
        if (autoFetch && url) {
            executeFetch({ signal: abortController.signal })
                .catch(err => {
                    if (err.name !== 'AbortError') console.error('useFetch autoFetch error:', err);
                });
        }
        return () => abortController.abort();
    }, [url, autoFetch]);

    return { data, error, isLoading, setIsLoading, executeFetch };
}