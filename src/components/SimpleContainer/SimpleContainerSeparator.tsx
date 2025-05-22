import type React from "react";

type SimpleContainerSeparatorProps = {
    title: string,
    children: React.ReactNode,
}

function SimpleContainerSeparator(props: SimpleContainerSeparatorProps){
    const {title, children} = props;
    return (
        <section className="mb-10">
            <h3 className="font-bold text-xl text-gray-400">{title}</h3>
            {children}
        </section>
    )
}

export default SimpleContainerSeparator;