import type React from "react";

function SimpleContainer({children}: {children: React.ReactNode}){
    return (
        <section className="sm:p-10 p-4 m-auto w-85/100 max-w-6xl bg-[#F9FAFB] rounded-xl shadow-md">
            {children}
        </section>
    )
}

export default SimpleContainer;