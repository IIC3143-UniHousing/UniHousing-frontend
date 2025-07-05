import type { ReactNode } from "react";

interface IDashboardContentProps{
    title: string,
    info: string,
    children: ReactNode
}

function DashboardContent(props: IDashboardContentProps){
    const {title, info, children} = props;

    return (
        <section>
            <h2>{title}</h2>
            <p>{info}</p>
            {children}
        </section>
    )
}

export default DashboardContent;