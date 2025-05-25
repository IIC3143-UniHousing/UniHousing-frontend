import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";
import SimpleContainer from "../../components/SimpleContainer/SimpleContainer";
import SimpleContainerSeparator from "../../components/SimpleContainer/SimpleContainerSeparator";
import FormInput from "../../components/FormInput/FormInput";
import TextArea from "../../components/TextArea/TextArea";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import MessageAlert from "../../components/MessageAlert/MessageAlert";

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

    const [data, setData] = useState<CreateHousingData | null>(null)
    const [images, setImages] = useState([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const parsed_images: any = []

        if (images.length > 0) {
            Array.from(images).forEach(file => {
                convertToBase64(file).then(base64 => {
                    parsed_images.push(base64)
                });
            });
        }

        handleFormChange("images", parsed_images)
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

    const handleFormChange = (name: string, value: any) => {
        setData({
            ...data,
            [name]: value
        })
    }

    const submitForm = async () => {
        const result = await uploadHousingData(data);
        if (result.success) {
            const housingID = result.result?.housingID
            navigate(`/housing/success?id=${housingID}`)
        } else {
            setError(result.message || "")
        }
    }

    return (
        <main>
            <SimpleViewTitle
                title={"Agrega una nueva propiedad"} 
                subtitle={"Rellena los siguientes datos para agregar una propiedad"}
            />
            <SimpleContainer>
                <form action="#" onSubmit={submitPreventDefault}>
                    <SimpleContainerSeparator title="Información básica">
                        <FormInput name="title" title="Nombre de la propiedad" value={data?.title || ""} setValue={handleFormChange}/>
                        <FormInput name="price" type="number" title="Precio de alojamiento" value={data?.price || 0} setValue={handleFormChange}/>
                        <FormInput name="address" title="Dirección" value={data?.address || ""} setValue={handleFormChange} />
                        <TextArea name="description" title="Descripción" value={data?.description || ""} setValue={handleFormChange}/>
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Información de la propiedad">
                        <FormInput name="size" type="number" title="Tamaño" value={data?.size || ""} setValue={handleFormChange} />
                        <FormInput name="rooms" type="number" title="Número de Piezas"  value={data?.rooms || 0} setValue={handleFormChange}/>
                        <FormInput name="bathrooms" type="number" title="Número de Baños" value={data?.bathrooms || 0} setValue={handleFormChange}/>
                    </SimpleContainerSeparator>
                    <SimpleContainerSeparator title="Imágenes de la propiedad">
                        <ImageUpload onFilesSelected={setImages} />
                    </SimpleContainerSeparator>
                    <div className="flex align-center justify-center">
                        <PrimaryButton action={submitForm} title="Agregar propiedad"/>
                    </div>
                </form>
            </SimpleContainer>
            {error ? (<MessageAlert message={error} setMessage={setError} />) : null}
        </main>
    )
}

export default CreateHousing;