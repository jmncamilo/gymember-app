const apiUrl = import.meta.env.VITE_API_URL; // Backend url

export const verifyAccessToken = async () => {
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