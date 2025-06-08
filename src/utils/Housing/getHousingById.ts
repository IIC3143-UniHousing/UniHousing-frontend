import axios from "axios";

export const getHousingById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/housing/detail/${id}`);
    return response.data;
};