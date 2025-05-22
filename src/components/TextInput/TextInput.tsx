type TextInputProps = {
    name: string,
    title: string
}

function TextInput(props: TextInputProps){

    const {name, title} = props;

    return (
        <div className="block my-5 items-center">
            <label
                htmlFor={name}
                className="font-bold block my-2 sm:text-left text-center text-sm"
            >
                {title}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                placeholder={title}
                className="w-full p-2 bg-gray-50 font-normal rounded-md border border-gray-500 placeholder:text-gray-500 placeholder:font-bold"
            />
        </div>
    )
}

export default TextInput;