'use client';
import { IProducts, userSession, IOrders } from "@/types/IProducts";
import { createOrders } from "@/utils/orders";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para realizar una compra.");
      router.push("/login");
      return;
    }


    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: IProducts[] = JSON.parse(storedCart);
        console.log("Parsed Cart:", parsedCart);
        setCart(parsedCart);

        const totalCart = parsedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, [router]);

  const handleClick = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Debes iniciar sesión para realizar una compra.");
      router.push("/login");
      return;
    }
  
    console.log("Token presente:", token);
  
    try {
     
      const orderResponse = await createOrders(cart.map(product => product.id), token);
  
     
      const newOrder: IOrders = {
        id: orderResponse.id, 
        status: "Completado",
        date: new Date(),
        products: cart 
      };
  
     
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));
  
     
      setCart([]);
      setTotal(0);
      localStorage.setItem("cart", "[]");
  
      alert("Compra realizada con éxito");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Hubo un error al realizar la compra. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-[#6ac88e] text-xl font-extrabold">Mi carrito</p>

        <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
        {cart.map((product, index) => (
            <div key={index} className="flex justify-between items-center">
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
          <p className="text-[#6ac88e] text-xl font-extrabold">Resumen de Compra</p>
          <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">Total: ${total}</p>
              <div className="flex gap-2">
                <button onClick={handleClick} className="transition-colors text-sm bg-[#205072] hover:bg[#2ff4d2] p-2 rounded-sm w-full text-white text-hover shadow-md">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
