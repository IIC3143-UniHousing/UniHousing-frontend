import { useState, useEffect } from "react";

import close_icon from "../../assets/images/close_icon.svg"

function ImageUploadFile({image, removeImage}: {image: any, removeImage: any}){
    const [imagePreview, setImagePreview] = useState<any>()

    useEffect(() => {
        const imageUrl = URL.createObjectURL(image);
        setImagePreview(imageUrl)
        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [image]);


    return (
        <li className="w-full p-2 my-2 bg-gray-50 border border-gray-300 rounded-md relative">
            <button onClick={removeImage} className="absolute right-0 apperance-none grid place-items-center bg-red-500 w-7 h-7 p-1 mx-3 rounded-md">
                <img src={close_icon} alt="Borrar" className="block w-auto h-4" />
            </button>
            <div className="mt-10 sm:mt-0 sm:grid sm:grid-cols-[120px_auto] sm:gap-3 ">
                <img src={imagePreview} alt="image" className="w-full sm:w-[120px] sm:h-[80px]"/>
                <p className="font-semibold text-left flex align-center leading-[80px] overflow-hidden text-ellipsis">{image.name}</p>
            </div>
        </li>
    )
}

export default ImageUploadFile;