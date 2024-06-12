'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";



const Dashboard = () => {
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = localStorage.getItem("userSession");

      console.log("Datos del usuario obtenidos de localStorage:", storedUserData);

      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          console.log("Datos parseados del usuario:", parsedUserData);


          localStorage.setItem("userSession", JSON.stringify(parsedUserData));

  
          setUserData(parsedUserData);
        } catch (error) {
          console.error("Error al parsear datos del usuario:", error);
        }
      }
    }
  }, []);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const { name, email, address, phone } = userData;

  return (
  <div className="flex flex-col justify-center items-center h-[100vh]">
  <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
  <div className="mt-2 mb-8 w-full">
      <h1 className="px-2 text-xl font-bold text-[#6ac88e] dark:text-white">Bienvenido {name}</h1>
      <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p className="text-sm text-[#6ac88e]">Dirección de correo electrónico </p>
      <p className="text-base font-medium text-[#205072] dark:text-white"> {email}</p>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p className="text-sm text-[#6ac88e]">Dirección </p>
      <p className="text-base font-medium text-[#205072] dark:text-white">{address}</p>
      </div>
      <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
      <p className="text-sm text-[#6ac88e]">Teléfono </p>
      <p className="text-base font-medium text-[#205072] dark:text-white">{phone}</p>
    </div>
    <Link href="/dashboard/orders" className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-[#205072]
                  rounded-lg transition duration-200 hover:bg-[#6ac88e] ease">Mis Ordenes</Link>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;