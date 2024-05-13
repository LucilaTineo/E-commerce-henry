'use client'
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { IOrder, userInformation } from "@/types/IProducts";
import { getOrders } from "@/helper/orderHelper";

const Orders = ({ token }: { token: userInformation | null }) => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                if (token && token.token) {
                    const response = await getOrders(token.token);
                    setOrders(response);
                }
            } catch (error) {
                console.error("Error al obtener el historial de compras:", error);
            }
        }
        
        fetchData();
    }, [token]);

    return (
        <div>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id}>
                        <div>
                            <p>{new Date(order.date).toLocaleString()}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    No tienes <NextLink href="/product">realizada</NextLink> ninguna compra aún.
                </div>
            )}
        </div>
    );
};

export default Orders;


