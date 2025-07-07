import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { getUser } from "../../utils/auth/user";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { getIfHousingWasRecentlyCreated } from "../../utils/Housing/getIfRecentHousing";

function HousingCreatedConfirmation(){
    const params = new URLSearchParams(useLocation().search)
    const housingID = params.get('id')
    const navigate = useNavigate();

    const user = getUser()

    useEffect(() => {
        if (!housingID || !user || user.type != 'propietario') {
            navigate('/', { replace: true });
        }
        const fetchHousingData = async () => {
            const isRecent = await getIfHousingWasRecentlyCreated(Number(housingID));
            if(!isRecent){
                navigate('/', { replace: true });
            }
        }

        fetchHousingData()
    }, [housingID]);

    const goToPropertyPage = () => {
        navigate(`/housing/${housingID}`)
    }
    
    if (!housingID) return null;

    return(
        <main className="w-full h-screen grid place-items-center">
            <div>
                <SimpleViewTitle
                    title={"¡Felicidades! Tu propiedad ya fue agregada"} 
                    subtitle={"Los estudiantes podrán revisar la información de tu propiedad"}
                />
                <div className="w-fit my-5 mx-auto">
                    <PrimaryButton title="Revisar propiedad" action={goToPropertyPage} />
                </div>
                    
            </div>
        </main>
    )
}

export default HousingCreatedConfirmation;