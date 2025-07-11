import { getAccessToken } from '../auth/auth';
import type { HousingData } from '../../types';


export const updateAvailableHousing = async (
    housing: HousingData,
    newAvailability: boolean
    ): Promise<HousingData> => {
    const token = getAccessToken();
    const url = import.meta.env.VITE_BACKEND_URL + `/api/housing/${housing.id}`;

    const { id, createdAt, updatedAt, owner, ...house } = housing;

    const payload = { ...house };

    payload.available = newAvailability;

    try {
        const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        });

        if (response.ok) {
        const data = await response.json();
        return data.housing;
        }

        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la propiedad');

    } catch (error) {
        console.error("Error in updateHousing:", error);
        throw error;
    }
};