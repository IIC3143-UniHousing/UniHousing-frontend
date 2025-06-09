import type { HousingData } from '../../types';
import { getAccessToken } from "../../utils/auth/auth";


type HousingListApiResponse = {
    housing: HousingData[];
};

export const getAllHousings = async (): Promise<HousingData[]> => {
    const token = getAccessToken();
    const url = `http://localhost:3000/api/housing`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            const data: HousingListApiResponse = await response.json();
            return data.housing;
        }
        throw new Error('Error al obtener las propiedades');

    } catch (error) {
        console.error("Error en getAllHousings:", error);
        throw error;
    }
};