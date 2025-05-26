import { useState, type ChangeEvent ,type FormEvent } from 'react';
import { CustomInput } from '../Input';


interface SignupFormData {
    email: string;
    password: string;
    full_name: string;
    account_type: boolean;
}

interface Auth0SignupResponse {
    _id?: string;
    email?: string;
    description?: string;
    error?: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        full_name: '',
        account_type: false,
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'account_type'){
            setFormData((prev) => ({ ...prev, account_type: value === '1', }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });
            const data: Auth0SignupResponse = await res.json();

            if (res.ok) {
                setSuccess('Registro Exitoso');
            } else {
                setError(data.description || data.error || 'Error al registrarse.');
            }
        } catch (err) {
            setError('Error al conectarse con el servidor.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CustomInput
                type='full_name'
                name='full_name'
                label='Nombre Completo'
                placeholder='Nombre completo'
                value={formData.full_name}
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
                    onClick={() => setFormData((prev) => ({ ...prev, account_type: false }))}
                    className={`w-full p-4 border rounded-md text-left ${
                        !formData.account_type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    >
                    <p className="font-semibold">Estudiante</p>
                    <p className="text-sm text-gray-500">Para estudiantes universitarios que estén buscando una residencia.</p>
                </button>
                <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, account_type: true }))}
                    className={`w-full p-4 border rounded-md text-left ${
                        formData.account_type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    >
                    <p className="font-semibold">Propietario</p>
                    <p className="text-sm text-gray-500">Para propietarios que quieran publicar sus residencias estudiantiles.</p>
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