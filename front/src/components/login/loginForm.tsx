'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
//import { useRouter } from 'next/router';
import { validateLoginForm } from '@/utils/ValidateForm';
import { LoginErrorProps, LoginProps } from '@/types/IProducts';

const LoginForm = () => {
    const [userData, setUserData] = useState<LoginProps>({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<LoginErrorProps>({
        email: '',
        password: '',
    });

    //const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

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
                console.log(json)
                const { token } = json; 
                localStorage.setItem("userInformation", token);
                alert("User logged in successfully");
                //router.push('/');
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const errors = validateLoginForm(userData)
        setErrors(errors);
    }, [userData]);

    return (
        <div className="h-screen flex">
            <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">InnovaGadget</h1>
                    <p className="text-white mt-1">Transformando el futuro, un gadget a la vez</p>
                    <Link href="/" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center flex items-center justify-center">Home</Link>
                </div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-white">
                <form className="bg-white" onSubmit={handleSubmit}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" value={userData.email} name="email" placeholder="Email Address" onChange={handleChange} />
                    </div>
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="password" value={userData.password} name="password" placeholder="Password" onChange={handleChange} />
                    </div>
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                    <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                    <Link href="/register">Crear Cuenta</Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
