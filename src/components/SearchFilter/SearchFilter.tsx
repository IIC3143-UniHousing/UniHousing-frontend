/*
Filtro por:
Rango de precios,
Ubicación geográfica,
Cantidad de habitaciones,
Servicios incluidos: (lavadoras, wifi),
tipo de propiedad
*/
import { useState } from "react";

type SearchFilterProps = {
    onFilterChange: (filters: Filters) => void;
};

type Filters = {
    priceMin: number | null;
    priceMax: number | null;
    location: string;
    rooms: number | null;
    services: {
        wifi: boolean;
        washer: boolean;
    };
    propertyType: string;
};

const SearchFilter = ({onFilterChange}) => {
    const [filters, setFilters] = useState<Filters>({
        priceMin: null,
        priceMax: null,
        location: "",
        rooms: null,
        services: {
            wifi: false,
            washer: false
        },
        propertyType: "",
    });

    const handleChange = (field: keyof Filters, value: any) => {
        const updatedFilters = {
            ...filters,
            [field]: value
        };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleServiceChange = (service: keyof filters["services"]) => {
        const updatedServices = {
            ...filters.services,
            [service]: !filters.services[service],
        };
        const updatedFilters = {
            ...filters,
            [service]: updatedServices,
        };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div>
            <div className="flex flex-col">
                <label className="font-medium">Precio mínimo</label>
                <input
                    type="number"
                    className="border p-2 rounded"
                    value={filters.priceMin ?? ""}
                    onChange={(e) => handleChange("priceMin", Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Precio máximo</label>
                <input
                    type="number"
                    className="border p-2 rounded"
                    value={filters.priceMax ?? ""}
                    onChange={(e) => handleChange("priceMax", Number(e.target.value))}
                />
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Comuna</label>
                <input
                    type="string"
                    className="border p-2 rounded"
                    value={filters.location ?? ""}
                    onChange={(e) => handleChange("location", e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="font-medium">Habitaciones</label>
                <select
                    className="border p-2 rouded"
                    value={filters.rooms ?? ""}
                    onChange={(e) => handleChange("rooms", Number(e.target.value))}
                >
                <option value="">Seleccionar</option>
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                        {num} + habitaciones
                    </option>
                ))}
                </select>
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Servicios Incluidos</label>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={filters.services.wifi}
                        onChange={() => handleServiceChange("wifi")}
                    />
                    <span>wifi</span>
                </label>
                <label className="inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={filters.services.washer}
                        onChange={() => handleServiceChange("washer")}
                    />
                    <span>washer</span>
                </label>
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Tipo de Propiedad</label>
                <select
                    className="border p-2 rounded"
                    value={filters.propertyType}
                    onChange={(e) => handleChange("propertyType", e.target.value)}
                >
                <option value="">Seleccionar</option>
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="residencia">Residencia</option>
                </select>
            </div>
        </div>
    );

};

export default SearchFilter;