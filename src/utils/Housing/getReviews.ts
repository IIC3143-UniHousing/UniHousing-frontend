import { getAccessToken } from "../auth/auth";

export const listReviews = async (housingId: string) => {
    const token = getAccessToken();
    const res = await fetch(`http://localhost:3000/api/reviews?housingId=${housingId}`, {
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
