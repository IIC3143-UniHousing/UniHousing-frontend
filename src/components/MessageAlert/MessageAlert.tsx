import PrimaryButton from "../PrimaryButton/PrimaryButton";

function MessageAlert({message, setMessage}: {message: string, setMessage: any}){

    const handleCloseMessage = () => {
        setMessage(null)
    }

    return(
        <div className="w-full h-full fixed top-0 bg-black/75 left-0 grid place-items-center">
            <div className="p-2 w-8/10 max-w-[500px] bg-white  rounded-2xl">
                <p className="my-5 font-bold text-center">{message}</p>
                <div className="w-fit m-auto">
                    <PrimaryButton title="Cerrar" action={handleCloseMessage} />
                </div>
            </div>
        </div>
    )
}

export default MessageAlert;