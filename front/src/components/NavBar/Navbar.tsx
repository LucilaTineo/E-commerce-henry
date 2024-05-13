import React, { useState } from 'react';
import Link from 'next/link';

type NavbarProps = {
  isVisible: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const Navbar: React.FC<NavbarProps> = ({ isVisible, token, setToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      {isVisible && (
        <nav className="bg-gray-600 text-white px-4 py-2 flex justify-between items-center">
          <div className="md:hidden">
            <button className="text-white focus:outline-none" onClick={toggleMenu}>
              ☰
            </button>
          </div>
          <div className="hidden md:flex">
            <ul className="flex">
              <li className="mr-4">
                <Link href="/">Inicio</Link>
              </li>
              <li className="mr-4">
                <Link href="/product">Productos</Link>
              </li>
              <li className="mr-4">
                <Link href="/contacto">Contacto</Link>
              </li>
              {token && (
                <li className="mr-4">
                  <Link href="/user/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          {token ? (
            <div>
              <button className="text-white" type="button" onClick={logOutHandler}>Cerrar Sesión</button>
            </div>
          ) : (
            <div>
              <Link href="/login">Iniciar Sesión</Link>
              <span className="mx-2">|</span>
              <Link href="/register">Registrarse</Link>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
