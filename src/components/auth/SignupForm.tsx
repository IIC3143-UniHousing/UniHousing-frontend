import { useState, type ChangeEvent ,type FormEvent } from 'react';
import { CustomInput } from '../Input';
import StudentIcon from '../../imgs/student-icon.png';
import RenterIcon from '../../imgs/renter-icon.png';


interface SignupFormData {
    email: string;
    password: string;
    name: string;
    type: string;
}

interface Auth0SignupResponse {
    _id?: string;
    email?: string;
    description?: string;
    error? : string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        name: '',
        type: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data: Auth0SignupResponse = await res.json();

            if (res.ok) {
                setSuccess('Registro Exitoso');
            } else {
                console.log(data.error);
                setError(data.error || 'Error al registrarse');
            }
        } catch (err) {
            setError('Error al conectarse con el servidor.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CustomInput
                type='name'
                name='name'
                label='Nombre Completo'
                placeholder='Nombre completo'
                value={formData.name}
                onChange={handleChange}
                required
            />
            <CustomInput
                type='email'
                name='email'
                label='Correo electrónico'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
            />
            <CustomInput
                type='password'
                name='password'
                label='Contraseña'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
            />
            <label className="block text-sm font-medium text-gray-600 mb-1"> Tipo de Cuenta</label>
            <div className='flex flex-col gap-1'>
                <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: 'estudiante' }))}
                    className={`w-full p-4 border rounded-md text-left ${
                        formData.type === 'estudiante'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    >
                    <div className='flex items-center gap-3'>
                        <div className='w-16 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
                            <img src={StudentIcon} className='w-8 h-8 flex-shrink-0'/>
                        </div>
                        <div>
                            <p className="font-semibold">Estudiante</p>
                            <p className="text-sm text-gray-500">Para estudiantes universitarios que estén buscando una residencia.</p>
                        </div>
                    </div>
                </button>
                <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, type: 'propietario' }))}
                    className={`w-full p-4 border rounded-md text-left ${
                        formData.type === 'propietario'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    >
                    <div className='flex items-center gap-3'>
                        <div className='w-16 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
                            <img src={RenterIcon} className='w-8 h-8 flex-shrink-0'/>
                        </div>
                        <div>
                            <p className="font-semibold">Propietario</p>
                            <p className="text-sm text-gray-500">Para propietarios que quieran publicar sus residencias estudiantiles.</p>
                        </div>
                    </div>
                </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            <button type='submit' className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-md font-medium">
                Registrarse
            </button>
        </form>
    )
};

export default SignupForm;