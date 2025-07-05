import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import NotFound from "../NotFound/NotFound";
// import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { getUser } from "../../utils/auth/user";
import { getHousingById } from "../../utils/Housing/getHousingById";

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
            console.log(housingInfo)
            console.log(user)
            // navigate(`/`, {replace: true})
        }
    }, [housingInfo]);

    if(notFound){
        return (<NotFound />)
    }

    return (
        <main className="my-6">
            <SimpleViewTitle
                title={"Editar Propiedad"} 
                subtitle={`Edita ${housingInfo?.title}`}
            />
        </main>
    )
}

export default DashboardHousing;