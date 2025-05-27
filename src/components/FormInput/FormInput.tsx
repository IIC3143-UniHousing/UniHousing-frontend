type FormInputProps = {
    name: string,
    type?: string,
    title: string,
    value: string | number,
    setValue: (data: string, value: any) => void
}

function FormInput(props: FormInputProps){

    const {name, type = "text", value, setValue, title} = props;

    const handleValueChange = (e: { target: { value: any; }; }) => {
        setValue(name, e.target.value)
    }

    return (
        <div className="block my-5 items-center">
            <label
                htmlFor={name}
                className="font-bold block my-2 sm:text-left text-center text-sm"
            >
                {title}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={title}
                onChange={handleValueChange}
                value={value}
                className="w-full p-2 bg-gray-50 font-normal rounded-md border border-gray-500 placeholder:text-gray-500 placeholder:font-bold"
            />
        </div>
    )
}

export default FormInput;