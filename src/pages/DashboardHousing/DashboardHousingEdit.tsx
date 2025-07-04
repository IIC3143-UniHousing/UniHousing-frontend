import { useState, useEffect, type ChangeEvent } from "react";

import DashboardContent from "../../components/DashboardContent/DashboardContent";
import SimpleContainerSeparator from "../../components/SimpleContainer/SimpleContainerSeparator";
import { CustomInput } from "../../components/Input";
import TextArea from "../../components/TextArea/TextArea";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import MessageAlert from "../../components/MessageAlert/MessageAlert";

import type { HousingData } from "../../types";

function DashboardHousingEdit({info, sendInfo}: {info: HousingData, sendInfo: any}){
        const [formData, setFormData] = useState<HousingData>(info)
        const [images, setImages] = useState(formData?.images)
        const [error, setError] = useState<string | null>(null)

        useEffect(() => {
            if (info) {
                setFormData(info);
                setImages(info.images || []);
            }
        }, [info]);

    
        useEffect(() => {
            const handleImages = async () => {
                // No hagas nada si está vacío
                if (!images || images.length === 0) return;

                const parsed_images = await Promise.all(
                    images.map(async (file) => {
                        if (typeof file === "string") {
                            return file; // Ya es base64
                        } else {
                            return await convertToBase64(file);
                        }
                    })
                );

                setFormData((prev) => ({ ...prev, images: parsed_images }));
            };

            handleImages();
        }, [images, info]);

    
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
            try {
                const result = await sendInfo(formData);
                if (result.success) {
                    setError("Información actualizada");
                } else {
                    setError(result.message || "Error desconocido al actualizar");
                }
            } catch (err: any) {
                console.error("Error en submitForm:", err);
                setError(err?.message || "Error desconocido al actualizar");
            }
        }

    if (!formData || !formData.title) {
        return (
            <DashboardContent title="Editar información de propiedad">
                <div className="p-6 text-center">Cargando información...</div>
            </DashboardContent>
        )
    }


    return(
        <DashboardContent title="Editar información de propiedad">
            <form className="mt-2" action="#" onSubmit={submitPreventDefault}>
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
                        label="Tamaño"
                        placeholder="Tamaño"
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
                            prevImages={images}
                            onFilesSelected={setImages}
                        />
                </SimpleContainerSeparator>
                <div className="flex align-center justify-center">
                    <PrimaryButton action={submitForm} title="Editar propiedad"/>
                </div>
            </form>
            {error ? (<MessageAlert message={error} setMessage={setError} />) : null}
        </DashboardContent>
    )
}

export default DashboardHousingEdit;