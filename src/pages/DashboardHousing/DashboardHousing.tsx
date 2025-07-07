import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import NotFound from "../NotFound/NotFound";
import DashboardHousingAvailable from "./DashboardHousingAvailable";
import DashboardHousingEdit from "./DashboardHousingEdit";
import DashboardHousingDelete from "./DashboardHousingDelete";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { getUser } from "../../utils/auth/user";
import { getHousingById } from "../../utils/Housing/getHousingById";
import { updateAvailableHousing } from "../../utils/Housing/updateAvailableHousing";
import { updateHousingData } from "../../utils/Housing/updateHousing";

import type { HousingData } from "../../types";

function DashboardHousing(){
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser()

    const [housingInfo, setHousingInfo] = useState<HousingData | null>(null)
    const [notFound, setNotFound] = useState<boolean>(false)

    useEffect(() => {
        if(!id || !user || !(user.type == 'propietario')){
            navigate(`/`, {replace: true})
            return;
        }

        const fetchHousingData = async () => {
             try {
                const housingData = await getHousingById(id);
                setHousingInfo(housingData);
            } catch (e: any) {
                console.error(e);
                if(e.status == 404) setNotFound(true)
            }
        };

        fetchHousingData()
    }, [id]);

    useEffect(() => {
        if(housingInfo && housingInfo?.owner.id != user.id){
            navigate(`/`, {replace: true})
        }
    }, [housingInfo]);

    const goToHousingPage = () => {
        navigate(`/housing/${id}`, {replace: true})
    };

    const handleToggleAvailability = async (housingToToggle: HousingData) => {
        try {
            await updateAvailableHousing(housingToToggle, !housingToToggle.available);
            setHousingInfo({...housingInfo!, available: !housingInfo?.available})
        } catch (error) {
            alert('Error: No se pudo actualizar la propiedad');
        }
    };

    const handleUpdateHousingInfo = async (housing: HousingData) => {
        try {
            const result = await updateHousingData(housing, Number(id!));
            if (!result.success) {
                throw new Error(result.message || "Error desconocido");
            }
            setHousingInfo({ ...housing });
            return result;
        } catch (error) {
            // alert(`Error: ${(error as Error).message}`);
            throw error;
        }
    };

    if(notFound){
        return (<NotFound />)
    }

    return (
        <main className="my-6">
            <SimpleViewTitle
                title={"Editar Propiedad"}
            />
            
            <section
                className="
                    sm:grid
                    sm:items-center
                    sm:grid-cols-[auto_200px]
                    sm:p-4
                    p-2
                    m-auto
                    w-85/100
                    max-w-6xl
                    border
                    rounded-md
                    my-10
                    text-left
                    border-gray-300
                    bg-white
                "
            >
                <div>
                    <h2 className="text-2xl font-semibold mb-2 text-[#1F2937]">{housingInfo?.title}</h2>
                    <p className="text-md text-gray-600">{housingInfo?.address}</p>
                </div>
                <PrimaryButton title="Ver página" action={goToHousingPage} />
            </section>

            <DashboardHousingAvailable info={housingInfo!} setAvailable={handleToggleAvailability}/>
            <DashboardHousingEdit info={housingInfo!} sendInfo={handleUpdateHousingInfo} />
            <DashboardHousingDelete id={Number(id!)} />
        </main>
    )
}

export default DashboardHousing;