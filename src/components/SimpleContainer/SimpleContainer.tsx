import type React from "react";

function SimpleContainer({children}: {children: React.ReactNode}){
    return (
        <section className="sm:p-8 p-4 m-auto w-85/100 max-w-6xl bg-gray-100 rounded-xl">
            {children}
        </section>
    )
}

export default SimpleContainer;