import { getAccessToken } from "../../utils/auth/auth";
const BASE_URL = "http://localhost:3000"

export const getIfHousingWasRecentlyCreated = async ( id: number ) => {
    const token = getAccessToken();

    console.log(`${BASE_URL}/api/housing/${id}/recent`)

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