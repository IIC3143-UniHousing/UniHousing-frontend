import { getAccessToken } from "../../utils/auth/auth";

export const getIfHousingWasRecentlyCreated = async ( id: number ) => {
    const token = getAccessToken();

    console.log(`${import.meta.env.VITE_BASE_URL}/api/housing/${id}/recent`)

    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/housing/${id}/recent`, {
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