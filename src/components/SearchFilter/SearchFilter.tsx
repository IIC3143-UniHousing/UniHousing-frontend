import type { Filter } from '../../types'
import { CustomSelect } from '../customSelect';
import { CustomInput } from '../Input';
type SearchFilterProps = {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
};


const SearchFilter = ({ filters, setFilters }: SearchFilterProps) => {
    return (
        <div>
            <label className="font-medium">Precio</label>
            <div className="flex flex-row gap-1">
                <CustomInput
                    placeholder='Mínimo'
                    type="number"
                    className="border p-2 rounded"
                    value={filters.priceMin ?? ""}
                    onChange={(e) =>{
                        const value = e.target.value;
                        setFilters(f => ({ ...f, priceMin: value === "" ? undefined: Number(value)}))}}
                />
                <CustomInput
                    placeholder='Máximo'
                    type="number"
                    className="border p-2 rounded"
                    value={filters.priceMax ?? ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFilters(f => ({ ...f, priceMax: value === "" ? undefined: Number(value)}))}}
                />
            </div>
            <div className="flex flex-col">
                <label className="font-medium">Habitaciones</label>
                <CustomSelect
                    className="border p-2 rouded"
                    value={filters.rooms ?? ""}
                    onChange={(e) => setFilters(f => ({ ...f, rooms: Number(e.target.value)}))}
                >
                <option value="">Seleccionar</option>
                {[1, 2, 3, 4, 5].map((num) => {
                    const label = num < 5 ? `${num} habitaciones` : `${num} + habitaciones`;
                    return (
                    <option key={num} value={num}>
                        {label}
                    </option>
                )})}
                </CustomSelect>
            </div>
        </div>
    );

};

export default SearchFilter;