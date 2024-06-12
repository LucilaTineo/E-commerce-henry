'use client'
import {getOrder} from "@/utils/orders";
import { IOrders, userSession } from "@/types/IProducts";
import React, {useEffect, useState} from "react";

const OrdersView = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        const parsedOrders: IOrders[] = JSON.parse(storedOrders);
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error parsing orders from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      <div className="w-full flex flex-col h-fit gap-4 p-4">
        <h1 className="text-[#205072] text-xl font-extrabold">Tus Pedidos</h1>
        <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="mb-4">
                <p className="text-lg text-[#6ac88e] font-semibold">
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-[#cff4d2] font-normal text-sm">Status: {order.status}</p>
                <div className="mt-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">¡No has realizado ninguna orden, aún!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersView;

