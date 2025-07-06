import SimpleViewTitle from "../../components/SimpleViewTitle/SimpleViewTitle";

function NotFound(){
    return(
        <main className="sm:flex sm:flex-row-reverse h-screen bg-white">
            <div className="sm:w-1/2 flex items-center justify-center px-10 py-5 sm:py-0 bg-[#F9FAFB] rounded-l-3xl shadow-2xl">
            <img
                src="src/imgs/fondo-login.png"
                alt="Ilustración de universitarios en una residencia"
                className="rounded-xl"
            ></img>
            </div>
            <section className='sm:w-1/2 flex items-center justify-center bg-white'>
                <div className="w-8/10 max-w-[600px]">
                    <SimpleViewTitle
                        title="Oops..."
                        subtitle="No hemos podido encontrar esta página"
                    />
                    <div>
                        <p className="mb-5">La página que buscas no aparece dentro de nuestro sistema, revisa si la dirección es correcta o si tienes la sesión abierta.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default NotFound;