import { getAccessToken } from "../../utils/auth/auth";
import { getUser } from "../auth/user";
const BASE_URL = "http://localhost:3000"

export const deleteHousing = async (id: number) => {
    const token = getAccessToken();
    const user = getUser()

    if (!token || !user || !user.id) {
        throw new Error("Usuario no autenticado")
    }

    const payload = {
        ownerId: user.id
    }

    try{
        const response = await fetch(`${BASE_URL}/api/housing/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok && response.status == 204) {
            return true
        }

        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la propiedad');

    } catch (error) {
        console.error("Error in deleteHousing:", error);
        throw error;
    }
};