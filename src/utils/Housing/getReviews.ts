import { getAccessToken } from "../auth/auth";

export const listReviews = async (housingId: string) => {
    const token = getAccessToken();
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/reviews?housingId=${housingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Error fetching reviews");
    const data = await res.json();
    return data.reviews;
};
