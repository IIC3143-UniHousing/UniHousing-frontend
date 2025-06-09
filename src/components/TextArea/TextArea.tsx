type TextAreaProps = {
    name: string,
    label: string,
    placeholder: string,
    value: string,
    onChange: any
}

function TextArea(props: TextAreaProps){
    const {name, label, placeholder, value, onChange} = props;

    return (
        <div className="block my-2 items-start"> {/* sm:grid sm:grid-cols-[200px_auto] sm:gap-3 */}
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-600 mb-1"
            >
                {label}
            </label>
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="
                    w-full
                    min-h-40
                    px-4
                    py-2
                    border
                    border-gray-300
                    rounded-md
                    text-gray-900
                    placeholder-gray-400
                    field-sizing-content
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#3B82F6]
                    focus:border-transparent'
                "
            ></textarea>
        </div>
    )
}

export default TextArea;