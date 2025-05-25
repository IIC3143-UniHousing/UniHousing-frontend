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
        <div className="w-full min-h-40 p-2 bg-white border border-gray-500 rounded-md my-4">
            <input type="file" accept="image/*" multiple hidden onChange={handleInputFileSelect} ref={filesInput}/>
            <div 
                className="w-full h-40 cursor-pointer grid place-items-center" 
                onDrop={handleDrop} 
                onDragOver={(e) => {e.preventDefault()}}
                onClick={clickFileInput}
            >
                <img src={image_icon} alt="Imagen" className="w-20" />
                <p className="font-bold text-center">Haz click aquí o mueve una imagen</p>
            </div>
            <ul>
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