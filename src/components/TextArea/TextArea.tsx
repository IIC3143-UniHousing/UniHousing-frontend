type TextAreaProps = {
    name: string,
    title: string,
    value: string,
    setValue: (data: string, value: any) => void
}

function TextArea(props: TextAreaProps){
    const {name, title, value, setValue} = props;

    const handleValueChange = (e: { target: { value: any; }; }) => {
        setValue(name, e.target.value)
    }

    return (
        <div className="block my-5 items-start"> {/* sm:grid sm:grid-cols-[200px_auto] sm:gap-3 */}
            <label
                htmlFor={name}
                className="font-bold block my-2 sm:text-left text-center sm:pt-2 text-sm"
            >
                {title}
            </label>
            <textarea
                name={name}
                id={name}
                placeholder={title}
                onChange={handleValueChange}
                value={value}
                className="w-full min-h-40 p-2 field-sizing-content bg-gray-50 font-normal rounded-md border border-gray-500 placeholder:text-gray-500 placeholder:font-bold"
            ></textarea>
        </div>
    )
}

export default TextArea;