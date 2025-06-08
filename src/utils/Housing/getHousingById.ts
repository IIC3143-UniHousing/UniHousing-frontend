import type { HousingData } from '../../types';

type ApiResponse = {
    housing: HousingData;
};

export const getHousingById = async (id: string): Promise<HousingData> => {
    try {
        const response = await fetch(`http://localhost:3000/api/housing/${id}`); // Asegúrate que el puerto es el correcto
        if (!response.ok) {
        throw new Error("Propiedad no encontrada");
        }
        const data: ApiResponse = await response.json();
        return data.housing;
    } catch (error) {
        console.error(error);
        throw error;
    }
};