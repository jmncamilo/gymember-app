import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
    const { autoFetch = false, ...fetchOptions } = options;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(autoFetch);

    const executeFetch = async (overrideOptions = {}) => {
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch(url, {
                ...fetchOptions,
                ...overrideOptions,
                credentials: 'include',
                headers: {
                    ...fetchOptions.headers,
                    ...overrideOptions.headers,
                    'Content-Type': 'application/json'
                }
            });

            // This throws an error if the response is negative when attempting to verify the tokens
            if (!res.ok) throw new Error(`¡Hay un error HTTP! status: ${res.status}`);

            const data = await res.json();
            setData(data);
            return data;

        } catch (err) {
            console.error('useFetch executeFetch error:', err);
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