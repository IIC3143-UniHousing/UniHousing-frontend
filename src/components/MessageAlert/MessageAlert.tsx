function MessageAlert({message}: {message: string}){
    return(
        <dialog>
            {message}
        </dialog>
    )
}

export default MessageAlert;