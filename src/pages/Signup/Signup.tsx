import { SignupForm } from "../../components/auth";
import { Link } from "react-router";
import SignupIcon from '../../imgs/fondo-signup.png'

function Signup() {
    return (
        <div className="flex h-screen bg-white">
            <div className="w-1/2 flex items-center justify-center px-10 bg-[#F9FAFB]">
                <div className="max-w-md text-center">
                    <img
                        src={SignupIcon}
                        alt="Ilustración de universitarios estudiando"
                        className="rounded-xl"
                    ></img>
                    <p className="text-lg mb-6 text-gray-700">
                        ¿Buscas un arriendo que se adapte a tu vida universitaria?
                    </p>
                    <p className="text-lg mb-6 text-gray-700">
                        Regístrate gratis y encuentra espacios pensados para estudiantes
                        como tú: bien ubicados, accesibles y con todo lo que necesitas para
                        concentrarte en lo importante.
                    </p>
                    <p className="text-lg">
                        ¡Tu próximo hogar está a unos clics!
                    </p>
                </div>
            </div>
            <div className='w-1/2 flex items-center justify-center bg-white rounded-l-3xl shadow-2xl'>
                <div className='bg-[#F9FAFB] p-10 rounded-xl shadow-md w-full max-w-md'>
                    <h2 className="text-2xl font-semibold mb-6 text-[#1F2937]text-center">
                        Crea tu cuenta
                    </h2>
                    <SignupForm/>
                    <p>Ya tienes cuenta?{" "} <Link to='/login' className='hover:text-[#2563EB]'>Ingresa</Link></p>
                </div>
            </div>
        </div>
    )
};

export default Signup; 