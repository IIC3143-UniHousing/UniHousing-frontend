import type { ReactNode } from "react";

interface IDashboardContentProps{
    title: string,
    info?: string,
    children: ReactNode
}

function DashboardContent(props: IDashboardContentProps){
    const {title, info, children} = props;

    return (
        <section className="sm:p-10 p-4 m-auto my-5 w-85/100 max-w-6xl bg-[#F9FAFB] rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-[#1F2937] text-center">{title}</h2>
            <p className="mb-5">{info}</p>
            {children}
        </section>
    )
}

export default DashboardContent;