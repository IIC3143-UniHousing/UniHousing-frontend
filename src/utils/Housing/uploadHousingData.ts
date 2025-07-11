import { getAccessToken } from "../../utils/auth/auth";
import { getUser } from "../auth/user";
const BASE_URL = import.meta.env.VITE_BACKEND_URL

type UploadSuccess = { success: true; result?: any };
type UploadError = { success: false; message?: string };
type UploadResult = UploadSuccess | UploadError;

const checkHasAllRequiredInfo = (data: any) => {
    if(!data) return false;
    const hasAllMainKeys = (Object.keys(data).length > 0)
    const hasImages = (Object.keys(data.images).length > 0)
    return hasAllMainKeys && hasImages
}

const checkFloatValues = (value: number) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0;
} 

const checkIntegerValues = (value: number) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 && Number.isInteger(number);
} 

const checkStringValues = (value: string, minValue = 5) => {
    if(!(value.length > minValue)) return false
    return true
}

const checkHasValidInfo = (data: any) => {
    if(!checkHasAllRequiredInfo(data)) return { success: false, message: "Debe ingresar todos los datos" };

    const validations = [
        {check: checkStringValues(data.title),              failMessage: "Nombre de la propiedad debe ser de más de 5 letras"},
        {check: checkIntegerValues(data.price),             failMessage: "Precio debe ser un número mayor a cero y sin decimales"},
        {check: checkStringValues(data.address),            failMessage: "Dirección de la propiedad debe ser de más de 5 letras"},
        {check: checkStringValues(data.description, 15),    failMessage: "Descripción de la propiedad debe ser de más de 15 letras"},
        {check: checkFloatValues(data.size),                failMessage: "Tamaño de la propiedad debe ser un número mayor a cero"},
        {check: checkIntegerValues(data.rooms),             failMessage: "Número de piezas debe ser un número mayor a cero y sin decimales"},
        {check: checkIntegerValues(data.bathrooms),         failMessage: "Número de baños debe ser un número mayor a cero y sin decimales"},
    ]

    for (const {check, failMessage} of validations) {
        if(!check){
            return {success: false, message: failMessage}
        }
    }

    return {success: true}
}

export const uploadHousingData = async (data: any | null) : Promise<UploadResult> => {
    const hasValidInfo = checkHasValidInfo(data);
    if(!(hasValidInfo.success)) return hasValidInfo;

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