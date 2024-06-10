'use client'
import {getOrder} from "@/utils/orders";
import { IOrders, userSession } from "@/types/IProducts";
import React, {useEffect, useState} from "react";

const OrdersView = () => {
    const [userData, setUserData] = useState<userSession>();
    const [orders, setOrders] = useState <IOrders []> ([]);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
          const userData = localStorage.getItem("userSession");
          if (userData && typeof userData === "string") {
            try {
              setUserData(JSON.parse(userData));
            } catch (error) {
              console.error("Error parsing user data:", error);
            }
          }
        }
      }, []);

    useEffect (() => {
        const fetchData = async () => {
            const ordersResponse = await getOrder (userData?.token!);
            setOrders(ordersResponse)
        }
        userData?.token && fetchData()
    }, [userData?.token])

    return  (

      <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
      <h1 className="text-blue-900 text-xl font-extrabold"> Tus Pedidos</h1>

      <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className="flex flex-col md:flex-row gap-3 justify-between">

            {
                orders?.length > 0 ? (
                    orders?.map((orden) => {
                        return (
                            <div key={orden.id}>
                                <div> 
                                  <p className="text-lg text-gray-800 font-semibold">{new Date(orden.date).toLocaleDateString()}</p>
                                  <p className="text-gray-600 font-normal text-sm line-through"> Status: {orden.status} </p>  
                                </div>
                            </div>
                        )
                    })
                ): (
                    <div> 
                      <p className="text-gray-600">¡No has realizado ninguna orden, aun! </p>
                      </div>
                )
            }
        </div>
        </div>
        </div>
        </div>
        
    )

}

export default OrdersView;
