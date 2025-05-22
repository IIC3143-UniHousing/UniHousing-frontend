type SimpleViewTitleProps = {
    title: string,
    subtitle?: string
}

function SimpleViewTitle(props: SimpleViewTitleProps){
    const {title, subtitle} = props;

    return (
        <div className="text-center m-4">
            <h1 className="block text-3xl sm:text-5xl font-bold m-4">{title}</h1>
            <h2 className="block text-lg text-gray-500">{subtitle}</h2>
        </div>
    )
}

export default SimpleViewTitle;