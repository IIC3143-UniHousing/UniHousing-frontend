import type { HousingData } from '../../types';
import { getAccessToken } from "../../utils/auth/auth";

type ApiResponse = {
    housing: HousingData;
};

export const getHousingById = async (id: string): Promise<HousingData> => {
    const token = getAccessToken();

    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/housing/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });
        if (response.ok) {
            const data: ApiResponse = await response.json();
            return data.housing;
        }else{
            const message = await response.json()
            const error: any = new Error(message.message);
            error.status = response.status;
            throw error;
        }
    } catch (error) {
        console.error({error});
        throw error;
    }
};