'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

  useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('token');
            const userSession = localStorage.getItem('userSession');
            if (token && userSession) {
                setIsAuthenticated(true);
                try {
                    const parsedUserSession = JSON.parse(userSession);
                    if (parsedUserSession && parsedUserSession.name) {
                        setUser(parsedUserSession.name);
                    } else {
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Error parsing userSession:', error);
                    setUser(null); 
                }
            } else {
                setIsAuthenticated(false);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
        setIsAuthenticated(false);
        setUser(null);
        alert("Sesión cerrada exitosamente");
        router.push('/login');
    };

    return (
        <nav className="bg-gray-900 text-white p-5 flex justify-between items-center">
    
    <a className="text-3xl font-bold font-heading flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Logo Here.
    </a>
   
    <ul className="list-none m-0 p-0 flex space-x-8 font-semibold">
        <li>
            <a href="/" className="hover:text-gray-200">Inicio</a>
        </li>
        <li>
            <a href="/about" className="hover:text-gray-200">About</a>
        </li>
        <li>
            <a href="/contact" className="hover:text-gray-200">Contacto</a>
        </li>
    </ul>
    <div className="flex items-center space-x-4">
      
        {!isAuthenticated ? (
            <div className="flex">
                <Link href="/login" className="px-4 py-2 bg-[#00EED0] text-[#212B38] rounded mr-2 font-semibold">
                    Sign In
                </Link>
                <Link href="/register" className="px-4 py-2 bg-[#00EED0] text-[#212B38] rounded font-semibold">
                    Sign Up
                </Link>
            </div>
        ) : (
           
            <div className="flex items-center space-x-4">
                
                <a href="/cart" className="hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </a>
                
                <a href="/dashboard" className="hover:text-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </a>
                
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded transition duration-300 ease-in-out hover:bg-red-600 font-semibold"
                >
                    Cerrar Sesión
                </button>
            </div>
        )}
    </div>
</nav>

    );
};

export default Navbar;
