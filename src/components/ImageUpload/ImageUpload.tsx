import { useEffect, useState, useRef } from "react";
import ImageUploadFile from "./ImageUploadFile";

import image_icon from "../../assets/images/image_icon.svg"

// Basado en https://medium.com/@dprincecoder/creating-a-drag-and-drop-file-upload-component-in-react-a-step-by-step-guide-4d93b6cc21e0
function ImageUpload({onFilesSelected} : {onFilesSelected: any}){
    const [images, setImages] = useState<any>([])

    const filesInput = useRef<HTMLInputElement | null>(null)

    useEffect(() =>{
        onFilesSelected(images)
    }, [images, onFilesSelected])

    const checkIfImage = (file: any) => {
        const isImage = file?.type?.startsWith("image/");
        console.log(isImage)
        if (isImage) return true
        return false
    }

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }

    const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any; }; }) => {
        e.preventDefault()
        const droppedFiles = e.dataTransfer.files;
        addImagesToList(droppedFiles)
    }

    const handleInputFileSelect = (e: { preventDefault: () => void; target: { files: any; }; }) => {
        e.preventDefault()
        const droppedFiles = e.target.files;
        addImagesToList(droppedFiles)
    }


    const addImagesToList = (files: any) => {
        if(files.length > 0){
            const newFiles = Array.from(files).filter(file => checkIfImage(file))
            setImages((prev: any) => [...prev, ...newFiles]);
        }
    }

    const handleRemoveFile = (index: number) => {
        setImages((prev: any) => prev.filter((_: any, image_index: number) => image_index != index))   
    }

    const clickFileInput = () => {
        filesInput.current?.click()
    }
    
    return (
        <div className={`
            w-full
            min-h-40
            border
            rounded-md
            my-4
            text-left
            border-gray-300
            bg-white
            hover: border
            hover:border-blue-500
            hover:bg-blue-50
        `}>
            <input type="file" accept="image/*" multiple hidden onChange={handleInputFileSelect} ref={filesInput}/>
            <div 
                className="
                    w-full
                    h-40
                    p-4
                    cursor-pointer
                    grid
                    place-items-center
                "
                onDrop={handleDrop} 
                onDragOver={handleDragOver}
                onClick={clickFileInput}
            >
                <img src={image_icon} alt="Imagen" className="w-18" />
                <div className="text-center">
                    <p className="font-semibold">Subir Imágenes</p>
                    <p className="text-sm text-gray-500">Haz click aquí o arrastra un archivo para subir.</p>
                </div>
            </div>
            <ul className="p-4">
                {
                    images.map((image: any, index: number) => {
                        return <ImageUploadFile image={image} removeImage={() => handleRemoveFile(index)} key={index} />
                    })
                }
            </ul>
        </div>
    )
}

export default ImageUpload;