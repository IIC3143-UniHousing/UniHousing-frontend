import { getAccessToken } from "./auth";
import { getUser } from "./user";
import type { OwnerData } from "../../types";


export const getUserData = async (): Promise<OwnerData> => {
    const token = getAccessToken();
    console.log("Token enviado:", token); 

    const res = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Error al obtener perfil:', res.status, errorText);
        throw new Error("No se pudo obtener el perfil");
    }
    return await res.json();   
};


export const updateUserData = async (payload: { name: string; email: string}) => {
    const token = getAccessToken();
    const user = getUser();

    const res = await fetch("http://localhost:3000/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      auth0Id: user?.auth0Id,
      ...payload,
    }),
  });

  if (!res.ok) throw new Error("Error al actualizar perfil");
  return await res.json();
};