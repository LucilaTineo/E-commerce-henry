'use client'
import React, { useState } from "react";
import RegisterForm from "@/components/register/registerForm";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/footer/Footer";

const Register = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    return (
        <div>
            {showNavbar && <Navbar isVisible={false} token={null}  setToken={() => {}} />}
            <RegisterForm />
            {showFooter && <Footer isVisible={false} />}
        </div>
    );
};

export default Register;
