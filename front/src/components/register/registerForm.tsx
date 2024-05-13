import { useState } from 'react';
import Link from 'next/link';
import { validateRegisterForm } from '@/utils/ValidateForm';
import { RegisterErrorProps, RegisterProps } from '@/types/IProducts';

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
        address: "",
        phone: "",
    });

    const [registrationSuccess] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateRegisterForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            fetch("http://localhost:3001/users/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
                alert("User registered successfully");
            })
            .catch((err) => console.log(err));
        } else {
            setErrors(validationErrors);
        }
    };

    const formClass = "flex md:w-1/2 justify-center py-10 items-center bg-white";
    const inputClass = "flex items-center border-2 py-2 px-3 rounded-2xl mb-4";

    return (
        <div className="h-screen md:flex">
            <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans">InnovaGadget</h1>
                    <p className="text-white mt-1">Transformando el futuro, un gadget a la vez</p>
                    <Link href="/" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 text-center flex items-center justify-center">Home</Link>
                </div>

            </div>
            <div className={formClass}>
                <form className="bg-white" onSubmit={handleSubmit}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Register</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>
                    <div className={inputClass}>
                        <input
                            type="text"
                            value={formData.name}
                            name="name"
                            placeholder="Full name"
                            onChange={handleChange}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className={inputClass}>
                        <input
                            type="text"
                            value={formData.email}
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className={inputClass}>
                        <input
                            type="text"
                            value={formData.address}
                            name="address"
                            placeholder="Enter your address"
                            onChange={handleChange}
                        />
                        {errors.address && <p>{errors.address}</p>}
                    </div>
                    <div className={inputClass}>
                        <input
                            type="password"
                            value={formData.password}
                            name="password"
                            placeholder="Insert your password"
                            onChange={handleChange}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <div className={inputClass}>
                        <input
                            type="text"
                            value={formData.phone}
                            name="phone"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                        />
                        {errors.phone && <p>{errors.phone}</p>}
                    </div>
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Register</button>
                    {registrationSuccess && <Link href="/login">Login</Link>}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
