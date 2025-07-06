import { useState, type ChangeEvent, type FormEvent } from "react";
import { CustomInput } from "../Input";
import { useNavigate } from "react-router";
import { setAccessToken } from "../../utils/auth/auth";
import { setUser as persistUser } from '../../utils/auth/user';
import { useUser } from '../../context/UserContext';

interface LoginFormData {
    email: string;
    password: string;
}

type UserType = 'estudiante' | 'propietario';

interface User {
    id: number;
    auth0Id: string;
    name: string;
    email: string;
    type: UserType;
    createdAt: string;
    housing: any[];
}

interface Auth0LoginResponse {
    access_token?: string;
    id_token?: string;
    token_type?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
    description?: string;
    user?: User;
}


const LoginForm = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
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
            const res = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data: Auth0LoginResponse = await res.json();
            if (res.ok) {
                setSuccess('Inicio de sesión exitoso');
                if (data.access_token) {
                    setAccessToken(data.access_token);
                }
                if (data.user) {
                    persistUser(data.user);  
                    setUser(data.user);     
                }
                navigate('/')
            } else {
                setError(data.error || 'Error al iniciar sesión.');
            }
        } catch (err) {
            setError('Error al conectarse con el servidor.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            <button type='submit' className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-md font-medium">
                Ingresar
            </button>
        </form>
    )
};

export default LoginForm;