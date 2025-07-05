import DashboardContent from "../../components/DashboardContent/DashboardContent";
import type { HousingData } from "../../types";

function DashboardHousingAvailable({info, setAvailable}: {info: HousingData, setAvailable: any}){
    return(
        <DashboardContent title="Editar disponibilidad" info="Edita si quieres que la propiedad aparezca o no disponible para ser arrendada">
            <div className="flex items-center gap-2.5">
                <label htmlFor="toggle-availability" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            id="toggle-availability"
                            type="checkbox"
                            className="sr-only peer"
                            checked={!!info?.available}
                            readOnly
                            onClick={() => setAvailable(info)}
                        />
                        <div className="block w-14 h-8 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition"></div>
                        <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                    </div>
                </label>
                <span className={`font-medium text-sm ${info?.available ? 'text-blue-600' : 'text-gray-500'}`}>
                    La propiedad {info?.available ? 'está disponible' : 'no está disponible'}
                </span>
            </div>
        </DashboardContent>
    )
}

export default DashboardHousingAvailable;