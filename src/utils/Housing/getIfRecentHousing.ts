import { getAccessToken } from "../../utils/auth/auth";
const BASE_URL = import.meta.env.VITE_BACKEND_URL

export const getIfHousingWasRecentlyCreated = async ( id: number ) => {
    const token = getAccessToken();

    try {
        const response = await fetch(`${BASE_URL}/api/housing/${id}/recent`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const data = await response.json();
        return data.isRecent;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}