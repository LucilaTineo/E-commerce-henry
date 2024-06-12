import React from "react";
import logo from "@/assets/logo.png";

const About = () => {
    return (
        <div className="py-16 bg-white">  
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:w-5/12 lg:w-5/12">
                        <img src={logo.src} alt="image" loading="lazy" />
                    </div>
                    <div className="md:w-7/12 lg:w-6/12">
                        <h2 className="text-2xl text-[#6ac88e] font-bold md:text-4xl">Te invitamos a conocernos</h2>
                        <p className="mt-6 text-gray-600">En Innova Gadget, estamos convencidos de que cada gadget que vendemos es una oportunidad para transformar el futuro. Desde dispositivos móviles hasta dispositivos inteligentes para el hogar, cada producto que ofrecemos está diseñado para hacerte la vida más fácil y conectarte con el mundo de manera significativa.</p>
                        <p className="mt-4 text-gray-600"> Nos comprometemos a ofrecerte productos de la más alta calidad. Trabajamos en estrecha colaboración con fabricantes líderes en la industria para garantizar que cada gadget que vendemos cumpla con nuestros rigurosos estándares de calidad.</p>
                        <p className="mt-4 text-gray-600"> Tu satisfacción es nuestra prioridad número uno. Nos esforzamos por brindarte una experiencia de compra excepcional, desde la selección de productos hasta el servicio al cliente. Estamos aquí para ayudarte en cada paso del camino.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
