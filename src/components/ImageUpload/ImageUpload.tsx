function ImageUpload(){
    // TODO!!!
    return (
        <div className="w-full h-40 p-2 bg-white border border-gray-500 rounded-md my-4">
            <input type="file" multiple hidden />
            <p className="text-center font-bold block w-full">Arrastra una imagen o haz click aquí</p>
        </div>
    )
}

export default ImageUpload;