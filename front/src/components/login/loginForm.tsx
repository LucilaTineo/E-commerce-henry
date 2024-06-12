'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { validateLoginForm } from '@/utils/validateForm';
import { LoginErrorProps, LoginProps } from '@/types/IProducts';
import {useRouter} from 'next/navigation';
import loginImg from '@/assets/loginImg.png'

const LoginForm = () => {
    
    const [userData, setUserData] = useState<LoginProps>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<LoginErrorProps>({
        email: '',
        password: '',
    });

    const [user, setUser] = useState<string | null>(null);

    const [token, setToken] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
      fetch("http://localhost:3001/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log("Response from server:", json);
                const { token, user } = json || {}; 
                console.log("Extracted token:", token);
                console.log("Extracted user:", user);
                setUser(user);
                setToken(token);
                localStorage.setItem("token", token);
                localStorage.setItem("userSession", JSON.stringify (user));
                alert("User logged in successfully");
                router.push('/');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const errors = validateLoginForm(userData)
        setErrors(errors);
    }, [userData]);

    return (
        <div className="bg-white relative lg:py-20">
 <div className="flex flex-col items-center justify-center pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
    <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
      <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
        <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
          <img src={loginImg.src} className="btn-"/>
        </div>
      </div>
      <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
        <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10">
          <p className="w-full text-4xl font-medium text-center leading-snug font-serif text-[#205072]">¡Bienvenido de nuevo!</p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"></div>
            <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                        <input 
                        type="text" 
                        value={userData.email} 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"/>
                    </div>
                    {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                    <div>
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Contraseña</p>
                        <input 
                        type="password" 
                        value={userData.password} 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"/>

                    </div>
                    {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                    
                    <button className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-[#6ac88e]
                  rounded-lg transition duration-200 hover:bg-[#205072] ease">Login</button>
                  <div className="flex justify-between w-full mt-4">
                    <span>Forgot Password ?</span>
                    <Link href="/register" className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-[#205072]
                  rounded-lg transition duration-200 hover:bg-[#6ac88e] ease">Crear Cuenta</Link>
                  </div>
                </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>


    );
};

export default LoginForm;