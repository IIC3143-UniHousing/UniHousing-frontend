import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { deleteHousing } from "../../utils/Housing/deleteHousing";

function DashboardHousingDelete({id}: {id: number}){
    const navigate = useNavigate();

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [housingDeleted, setHousingDeleted] = useState(false)

    const handleDeleteHousing = async () => {
        try{
            await deleteHousing(id);
            setHousingDeleted(true)
            setShowDeleteDialog(false)
        }catch(err){
            alert('Error: No se pudo eliminar la propiedad');
        }
    }

    const handleCloseMessage = () => {
        setShowDeleteDialog(false)
    }

    const goToHomepage = () => {
        navigate(`/`, {replace: true})
    }

    return(
        <DashboardContent title="Eliminar Propiedad" info="Si deseas eliminar la propiedad puedes hacer click aquí, pero cuidado, no puedes revertir esta acción">
            <PrimaryButton title="Eliminar Propiedad" action={() => {setShowDeleteDialog(true)}} />
            {showDeleteDialog ? (
                <div className="w-full h-full fixed top-0 bg-black/75 left-0 grid place-items-center">
                <div className="p-2 w-8/10 max-w-[500px] bg-white rounded-2xl">
                    <p className="my-5 font-bold text-center">¿Estás seguro que quieres eliminar la propiedad?</p>
                    <div className="w-fit m-auto sm:flex align-center gap-3 ">
                        <PrimaryButton title="Eliminar" action={handleDeleteHousing} />
                        <PrimaryButton title="Cerrar" action={handleCloseMessage} />
                    </div>
                </div>
            </div>
            ) : null}

            {housingDeleted ? (
                <div className="w-full h-full fixed top-0 bg-black/75 left-0 grid place-items-center">
                <div className="p-2 w-8/10 max-w-[500px] bg-white rounded-2xl">
                    <p className="my-5 font-bold text-center">La propiedad ha sido eliminada</p>
                    <div className="w-fit m-auto sm:flex align-center gap-3 ">
                        <PrimaryButton title="Ir a inicio" action={goToHomepage} />
                    </div>
                </div>
            </div>
            ) : null}
        </DashboardContent>
    )
}

export default DashboardHousingDelete;