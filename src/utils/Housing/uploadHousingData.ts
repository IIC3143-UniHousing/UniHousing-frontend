const BASE_URL = "http://localhost:3000"//process.env.BASE_URL

const checkHasAllRequiredInfo = (data: any) => {
    if(!data) return false;
    const hasAllMainKeys = (Object.keys(data).length > 0)
    const hasImages = (Object.keys(data.images).length > 0)
    return hasAllMainKeys && hasImages
}

export const uploadHousingData = async (data: any | null) => {
    if(!checkHasAllRequiredInfo(data)) return { success: false, message: "Debe ingresar todos los datos" };
    return {success: true, result: {housingID: 1}}; //Línea de prueba, eliminar cuando se conecte a endpoint

    // try{
    //     const response = await fetch(`${BASE_URL}/api/housing`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     if (response.ok) {
    //         const result = await response.json();
    //         return { success: true, result };
    //     } else {
    //         return { success: false, message: "Error al enviar los datos." };
    //     } 
    // } catch (error) {
    //     const mensajeError = (error as { message?: string })?.message ?? "Error desconocido";
    //     return { success: false, message: mensajeError };
    // }
}