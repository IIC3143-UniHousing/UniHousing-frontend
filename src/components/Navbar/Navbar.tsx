import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../imgs/logo_white.png';
import { removeAccessToken } from "../../utils/auth/auth";
import { removeUser } from "../../utils/auth/user";
import { useUser } from '../../context/UserContext'

const Navbar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const linkStyle = (path) => {
        return location.pathname === path
        ? 'border-b-2 border-white'
        : 'border-b-2 border-transparent';
    };

    const handleLogout = () => {
        removeAccessToken(); 
        removeUser(); 
        setUser(null);        
        navigate('/');
    };

    return (
        <nav className="bg-[#3B82F6] py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
            <img src={logo} alt="UniHousing Logo" className="h-10 mr-4" />
        </div>

        <div className="flex items-center space-x-6">
            <Link to="/" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/')}`}>
            Inicio
            </Link>
            
            {user && user.type === 'propietario' && (
            <Link to="/housing/new" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/crear-residencia')}`}>
                Crear Residencia
            </Link>
            )}

            <Link to="/housings" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/residencias')}`}>
            Ver Residencias
            </Link>

            {user ? (
                <button 
                    onClick={handleLogout}
                    className="bg-white text-[#3B82F6] px-4 py-2 rounded-md text-sm font-medium"
                >
                    Logout
                </button>
                    ) : (
                <Link to="/login">
                    <button className="bg-white text-[#3B82F6] px-4 py-2 rounded-md text-sm font-medium">
                        Login
                    </button>
                </Link>
            )}
            </div>
        </nav>
    );
};

export default Navbar;