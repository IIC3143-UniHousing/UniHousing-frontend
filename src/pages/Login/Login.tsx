import { LoginForm } from '../../components/auth';
import { Link } from 'react-router';
import LoginIcon from '../../imgs/fondo-login.png';

function Login() {
    return (
        <div className="flex h-screen bg-white">
            <div className="w-1/2 flex items-center justify-center px-10 bg-[#F9FAFB]">
            <img
                src={LoginIcon}
                alt="Ilustración de universitarios en una residencia"
                className="rounded-xl"
            ></img>
            </div>
            <div className='w-1/2 flex items-center justify-center bg-white rounded-l-3xl shadow-2xl'>
                <div className='bg-[#F9FAFB] p-10 rounded-xl shadow-md w-full max-w-md'>
                    <h2 className="text-2xl font-semibold mb-6 text-[#1F2937]text-center">
                       Bienvenid@ a Unihousing
                    </h2>
                    <LoginForm/>
                    <p>¿No tienes una cuenta?{" "} <Link to='/signup' className='hover:text-[#2563EB]'>Regístrate</Link></p>
                </div>
            </div>
        </div>
    )
};

export default Login;