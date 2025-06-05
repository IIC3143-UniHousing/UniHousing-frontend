const BASE_URL = "http://localhost:3000"//process.env.BASE_URL

export const sendConfirmMailToken = async (token: string) => {
    return { success: false, result: "expired" };
    // try{
    //     const response = await fetch(`${BASE_URL}/api/users/confirm-mail/confirm`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({token}),
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

export const requestConfirmMailToken = async (token: string) => {
    return { success: true };
    // try{
    //     const response = await fetch(`${BASE_URL}/api/users/confirm-mail/request`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({token}),
    //     });

    //     if (response.ok) {
    //         return { success: true };
    //     } else {
    //         return { success: false};
    //     } 
    // } catch (error) {
    //     const mensajeError = (error as { message?: string })?.message ?? "Error desconocido";
    //     return { success: false, message: mensajeError };
    // }
}