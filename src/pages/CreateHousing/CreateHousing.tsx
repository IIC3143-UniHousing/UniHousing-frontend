import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../../utils/auth/user";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import SimpleContainer from "../../components/SimpleContainer/SimpleContainer";
import SimpleContainerSeparator from "../../components/SimpleContainer/SimpleContainerSeparator";
// import CustomInput from "../../components/CustomInput/CustomInput";
import TextArea from "../../components/TextArea/TextArea";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import MessageAlert from "../../components/MessageAlert/MessageAlert";
import { CustomInput } from "../../components/Input";

import { uploadHousingData } from "../../utils/Housing/uploadHousingData";

type CreateHousingData = {
    title?: string,
    address?: string,
    price?: number,
    description?: string,
    size?: string,
    rooms?: number,
    bathrooms?: number,
    images?: any[]
}

function CreateHousing(){
    const navigate = useNavigate();
    
    const user = getUser()

    const [formData, setFormData] = useState<CreateHousingData | null>(null)
    const [images, setImages] = useState([])
    const [error, setError] = useState<string | null>(null)
    const [submitClicked, setSubmitClicked] = useState(false)

    useEffect(() => {
        if (!user || user.type != 'propietario') {
            navigate('/', { replace: true });
        }
    }, [user]);

    useEffect(() => {
        const parsed_images: any = []

        if (images.length > 0) {
            Array.from(images).forEach(file => {
                convertToBase64(file).then(base64 => {
                    parsed_images.push(base64)
                });
            });
        }

        setFormData((prev) => ({...prev, "images": parsed_images}))
    }, [images])

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    
    const submitPreventDefault = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    };

    const submitForm = async () => {
        setSubmitClicked(true)
        const result = await uploadHousingData(formData);
        if (result.success) {
            const housingID = result.result?.housing?.id;
            navigate(`/housing/success?id=${housingID}`)
        } else {
            setError(result.message || "")
            setSubmitClicked(false)
        }
    }

    return (
        <main className="my-6">
            <SimpleViewTitle
                title={"Agrega una nueva propiedad"} 
                subtitle={"Rellena los siguientes datos para agregar una propiedad"}
            />
            <SimpleContainer>
                <form action="#" onSubmit={submitPreventDefault}>
                    <SimpleContainerSeparator title="Información básica">
                        <CustomInput 
                            name="title" 
                            label="Nombre de la propiedad"
                            placeholder="Nombre de la propiedad"
                            value={formData?.title || ""} 
                            onChange={handleFormChange}
                        />

                        <CustomInput 
                            name="price" 
                            type="number" 
                            label="Precio de alojamiento"
                            placeholder="Precio de alojamiento"
                            value={formData?.price}
                            onChange={handleFormChange}
                        />

                        <CustomInput 
                            name="address" 
                            label="Dirección"
                            placeholder="Dirección"
                            value={formData?.address || ""} 
                            onChange={handleFormChange}
                        />
                        
                        <TextArea
                            name="description"
                            label="Descripción"
                            placeholder="Descripción"
                            value={formData?.description || ""}
                            onChange={handleFormChange}
                        />
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Información de la propiedad">
                        <CustomInput
                            name="size"
                            type="number"
                            label="Tamaño (en Metros Cuadrados)"
                            placeholder="Tamaño en m²"
                            value={formData?.size || ""}
                            onChange={handleFormChange}
                        />
                        <CustomInput
                            name="rooms"
                            type="number"
                            label="Número de Piezas"
                            placeholder="Número de Piezas"
                            value={formData?.rooms}
                            onChange={handleFormChange}
                        />
                        <CustomInput
                            name="bathrooms"
                            type="number"
                            label="Número de Baños"
                            placeholder="Número de Baños"
                            value={formData?.bathrooms}
                            onChange={handleFormChange}
                        />
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Imágenes de la propiedad">
                        <ImageUpload
                            onFilesSelected={setImages}
                        />
                    </SimpleContainerSeparator>
                    <div className="flex align-center justify-center">
                        <PrimaryButton action={submitForm} disabled={submitClicked} title="Agregar propiedad"/>
                    </div>
                </form>
            </SimpleContainer>
            {error ? (<MessageAlert message={error} setMessage={setError} />) : null}
        </main>
    )
}

export default CreateHousing;