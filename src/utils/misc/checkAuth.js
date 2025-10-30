import { getOptions } from "./fetchOptions.js";
const apiUrl = import.meta.env.VITE_API_URL; // Backend url

export const verifyAccessToken = async () => {
    try {
        const res = await fetch(`${apiUrl}/master/token/access`, getOptions);
        if (res.status === 401) {
            // Fetching to the endpoint that handles refresh token
            const refreshRes = await fetch(`${apiUrl}/auth/token/refresh`, getOptions);
            const data = await refreshRes.json();
            return data.success === true;
        }
        return res.ok;
    } catch (err) {
        console.error('Error ejecutando verifyAccessToken', err); // Testing
        return false;
    }
}