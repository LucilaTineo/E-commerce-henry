'use client'
import { useState } from 'react';
import Link from 'next/link';
import { validateRegisterForm } from '@/utils/validateForm';
import { RegisterErrorProps, RegisterProps } from '@/types/IProducts';
import registerImg from '@/assets/registerImg.png';

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterProps>({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });

    const [errors, setErrors] = useState<RegisterErrorProps>({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateRegisterForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await fetch("http://localhost:3001/users/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!res.ok) {
                    const errorText = await res.text(); 
                    throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
                }

                const json = await res.json();
                console.log(json);
                setRegistrationSuccess(true);
                alert("User registered successfully");
            } catch (err) {
                console.log(err);
                alert("There was an error registering the user");
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="bg-white relative lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
            xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img src={registerImg.src} className="btn-"/>
              </div>
            </div>
        
            <div className="w-full mt-20 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                  relative z-10">
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif text-[#205072]">¡Sumate a nuestra comunidad!</p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8"></div>
                  <div>
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Nombre</p>
                    <input
                        type="text"
                        value={formData.name}
                        name="name"
                        placeholder="Full name"
                        onChange={handleChange}
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
                </div>
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="example@gmail.com"
                        onChange={handleChange}
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                </div>
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Dirección</p>
                    <input
                        type="text"
                        value={formData.address}
                        name="address"
                        placeholder="Enter your address"
                        onChange={handleChange}
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {errors.address && <p className="text-red-500 mt-2">{errors.address}</p>}
                </div>
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Contraseña</p>
                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        placeholder="Insert your password"
                        onChange={handleChange}
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                </div>
                <div>
                <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Telefono</p>
                    <input
                        type="text"
                        value={formData.phone}
                        name="phone"
                        placeholder="Enter your phone number"
                        onChange={handleChange}
                        className="border placeholder-[#6ac88e] focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    />
                    {errors.phone && <p className="text-red-500 mt-2">{errors.phone}</p>}
                </div>
                <button type="submit" className="w-full py-4 text-xl font-medium text-center text-white bg-[#6ac88e] rounded-lg transition duration-200 hover:bg-[#205072] ease">Register</button>
                {registrationSuccess && <Link href="/login" className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-[#205072]
                  rounded-lg transition duration-200 hover:bg-[#6ac88e] ease">Login</Link>}
            </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>

    );
};

export default RegisterForm;

