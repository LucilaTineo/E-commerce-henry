import React, { useEffect, useState } from "react";
import Orders from "@/app/user/[userDashboard]/page";
import { userInformation, IOrder, IProducts } from "@/types/IProducts";
import { getOrders } from "@/helper/orderHelper";

const User = () => {
    const [user, setUser] = useState<userInformation | null>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userFromIProducts: userInformation = {
                    token: "el-token-del-usuario",
                    userData: {
                        address: "Dirección del usuario",
                        email: "correo@ejemplo.com",
                        id: 1,
                        name: "Nombre del usuario",
                        phone: "123456789",
                        role: "role",
                        orders: []
                    }
                };
                setUser(userFromIProducts);
            } catch (error) {
                console.error("Error al obtener los datos del usuario:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (user && user.token) {
                    const response = await getOrders(user.token);
                    setOrders(response);
                }
            } catch (error) {
                console.error("Error al obtener los pedidos:", error);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <div>
            {user && (
                <div>
                    <h2>Datos del usuario</h2>
                    <p>Nombre: {user.userData.name}</p>
                    <p>Email: {user.userData.email}</p>
                    <p>Phone: {user.userData.phone}</p>
                    <p>Address: {user.userData.address}</p>
                </div>
            )}
            <Orders token={user?.token} />
        </div>
    );
};

export default User;
