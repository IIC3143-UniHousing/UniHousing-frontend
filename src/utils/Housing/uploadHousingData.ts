import { getAccessToken } from "../../utils/auth/auth";
import { getUser } from "../auth/user";
const BASE_URL = "http://localhost:3000"

const checkHasAllRequiredInfo = (data: any) => {
    if(!data) return false;
    const hasAllMainKeys = (Object.keys(data).length > 0)
    const hasImages = (Object.keys(data.images).length > 0)
    return hasAllMainKeys && hasImages
}

export const uploadHousingData = async (data: any | null) => {
    if(!checkHasAllRequiredInfo(data)) return { success: false, message: "Debe ingresar todos los datos" };
    //return {success: true, result: {housingID: 1}}; //Línea de prueba, eliminar cuando se conecte a endpoint

    const token = getAccessToken();

    if (!token) {
        return { success: false, message: "Usuario no autenticado" };
    }

    const user = getUser(); 
    data.ownerId = user?.id;

    try{
        const response = await fetch(`${BASE_URL}/api/housing`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, result };
        } else {
            return { success: false, message: "Error al enviar los datos." };
        } 
    } catch (error) {
        const mensajeError = (error as { message?: string })?.message ?? "Error desconocido";
        return { success: false, message: mensajeError };
    }
}