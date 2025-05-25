import { useState, ChangeEvent ,FormEvent } from 'react';

const clientId= process.env.REACT_APP_AUTH0_DOMAIN;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;

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
    const [formData, setFormData] = useState<SignFormData>({
        email: '',
        password: '',
        full_name: '',
        account_type: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}))
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`https://${domain}/dbconnections/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    client_id: clientId,
                    email: formData.email,
                    password: formData.password,
                    connection: 'Username-Password-Authentication',
                    user_metadata: {
                        full_name: formData.full_name,
                        account_type: formData.account_type,
                    },
                }),
            });
            const data: Auth0SignupResponse = await res.json();

            if (res.ok) {
                setSuccess('Registro Exitoso');
            } else {
                console.error(data.description || data.error || 'Error al registrarse.');
            }
        } catch (err) {
            setError('Error al conectarse con auth0.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='full_name'
                placeholder='Nombre Completo'
                value={formData.full_name}
                onChange={handleChange}
                required
            />
            <label> Tipo de Cuenta
            <select name='account_type'>
                <option value='0'>Estudiante</option>
                <option value='1'>Propietario</option>
            </select>
            </label>
            <input
                type='email'
                name='email'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
                 className="w-full p-2 bg-gray-50 font-normal rounded-md border border-gray-500 placeholder:text-gray-500 placeholder:font-bold"
            />
            <input
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type='submit'>
                Registrarse
            </button>
        </form>
    )
};

export default SignupForm;