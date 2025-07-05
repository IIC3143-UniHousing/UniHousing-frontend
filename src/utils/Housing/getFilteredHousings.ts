import type { HousingData, Filter } from "../../types";


export function filterHousing(housingData: HousingData[], filters: Filter): HousingData[] {
    return housingData.filter(res => {
        if (filters.priceMin && res.price < filters.priceMin) return false;
        if (filters.priceMax && res.price > filters.priceMax) return false;
        if (filters.rooms) {
            if (filters.rooms === 5 && res.rooms < 5) return false;
            if (filters.rooms !== 5 && res.rooms !== filters.rooms) return false;
        }
        return true;
    });
};