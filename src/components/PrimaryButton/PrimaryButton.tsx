type PrimaryButtonProps = {
    title: string,
    action: () => void
}

function PrimaryButton(props: PrimaryButtonProps){
    const {title, action} = props;

    return (
        <button
            onClick={action}
            className="
                w-full
                px-3 
                box-border
                mt-4 
                bg-[#3B82F6]
                text-white
                hover:bg-[#2563EB] 
                active:bg-white
                active:text-[#2563EB]
                active:border
                active:border-[#2563EB]
                py-2
                rounded-md
                font-medium
            "
        >
            {title}
        </button>
    )
}

export default PrimaryButton;