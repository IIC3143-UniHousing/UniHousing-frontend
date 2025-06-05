import type React from "react";

type SimpleContainerSeparatorProps = {
    title: string,
    children: React.ReactNode,
}

function SimpleContainerSeparator(props: SimpleContainerSeparatorProps){
    const {title, children} = props;
    return (
        <section className="mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-[#1F2937]text-center">{title}</h3>
            {children}
        </section>
    )
}

export default SimpleContainerSeparator;