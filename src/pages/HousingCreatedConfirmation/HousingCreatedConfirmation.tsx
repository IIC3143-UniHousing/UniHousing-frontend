import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

function HousingCreatedConfirmation(){
    const params = new URLSearchParams(useLocation().search)
    const housingID = params.get('id')
    const navigate = useNavigate();

    useEffect(() => {
        console.log('housingID', housingID); 
        if (!housingID) {
            navigate('/', { replace: true });
        }
    }, [housingID, navigate]);

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