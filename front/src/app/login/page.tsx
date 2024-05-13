'use client'
import LoginForm from "@/components/login/loginForm"
import React, { useState } from "react";
import Navbar from "@/components/NavBar/Navbar";
import Footer from "@/components/footer/Footer";

const Login = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const [showFooter, setShowFooter] = useState(false);

    return (
        <div>
            {showNavbar && <Navbar isVisible={false} token={null}  setToken={() => {}} />}
            <LoginForm/>
            {showFooter && <Footer isVisible={false} />}
        </div>
    );
};

export default Login;


