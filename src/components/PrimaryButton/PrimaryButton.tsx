type PrimaryButtonProps = {
    title: string,
    action: () => void
}

function PrimaryButton(props: PrimaryButtonProps){
    const {title, action} = props;

    return (
        <button onClick={action} className="py-2 px-5 bg-teal-400 rounded-xl border border-teal-600 text-white font-bold hover:bg-teal-600 active:bg-white active:text-teal-400">{title}</button>
    )
}

export default PrimaryButton;