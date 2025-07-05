type PrimaryButtonProps = {
    title: string,
    disabled?: boolean,
    action: () => void
}

function PrimaryButton(props: PrimaryButtonProps){
    const {title, disabled = false, action} = props;

    return (
        <button
            onClick={action}
            disabled={disabled}
            className={`
                w-full
                px-3 
                box-border
                mt-4 
                ${disabled ? "bg-gray-200" : "bg-[#3B82F6]"}
                text-white
                ${disabled ? "" : "hover:bg-[#2563EB]"} 
                ${disabled ? "" : "active:bg-white"}
                ${disabled ? "" : "active:text-[#2563EB]"}
                ${disabled ? "" : "active:border"}
                ${disabled ? "" : "active:border-[#2563EB]"}
                py-2
                rounded-md
                font-medium
            `}
        >
            {title}
        </button>
    )
}

export default PrimaryButton;