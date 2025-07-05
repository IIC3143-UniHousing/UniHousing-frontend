import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../imgs/logo_white.png';
import { removeAccessToken } from "../../utils/auth/auth";
import { removeUser } from "../../utils/auth/user";
import { useUser } from '../../context/UserContext'
import userIcon from '../../imgs/user.png'

const Navbar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

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
            <>
                <Link to="/my-housings" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/mis-propiedades')}`}>
                    Mis Propiedades
                </Link>
                <Link to="/housing/new" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/housing/new')}`}>
                    Crear Residencia
                </Link>
            </>
            )}

            {user && (
                <Link to="/housings" className={`text-white px-3 py-2 text-sm font-medium ${linkStyle('/residencias')}`}>
                    Ver Residencias
                </Link>
            )}

            {user ? (
                <div className="relative" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className="focus:outline-none">
                        <img src={userIcon} alt="User" className="h-8 w-8 rounded-full" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi perfil</Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
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