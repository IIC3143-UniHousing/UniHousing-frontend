type TextAreaProps = {
    name: string,
    title: string
}

function TextArea(props: TextAreaProps){
    const {name, title} = props;

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
                className="w-full h-40 p-2 bg-gray-50 font-normal rounded-md border border-gray-500 placeholder:text-gray-500 placeholder:font-bold"
            ></textarea>
        </div>
    )
}

export default TextArea;