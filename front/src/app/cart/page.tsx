'use client';
import { IProducts, userSession } from "@/types/IProducts";
import { createOrders } from "@/utils/orders";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState<IProducts[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [userData, setUserData] = useState<userSession | null>(null);
  const router = useRouter();

  useEffect(() => {
   
    const storedUserData = localStorage.getItem("userSession");
    if (storedUserData) {
      try {
        const parsedUserData: userSession = JSON.parse(storedUserData);
        setUserData(parsedUserData);

        if (!parsedUserData?.token) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error parsing userSession from localStorage:", error);
      }
    } else {
      router.push("/login");
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart: IProducts[] = JSON.parse(storedCart);
        setCart(parsedCart);
        const totalCart = parsedCart.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, [router]);

  const handleClick = async () => {
    if (!userData?.token) {
      console.log("userData:", userData);
  console.log("cart:", cart);
      alert("Debes iniciar sesión para realizar una compra.");
      router.push("/login");
      return;
    }

    const idProducts = new Set(cart.map((product) => product.id));
    await createOrders(Array.from(idProducts), userData.token);
    console.log("idProducts:", idProducts);

    alert("Compra realizada con éxito");
    setCart([]);
    setTotal(0);
    localStorage.setItem("cart", "[]");
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-full px-14 py-7">
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-blue-900 text-xl font-extrabold">Mi carrito</p>

        <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">

        </div>

        <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
          <p className="text-blue-900 text-xl font-extrabold">Resumen de Compra</p>
          <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
            <div className="flex flex-row justify-between">
              <p className="text-gray-600">Total: ${total}</p>
              <div className="flex gap-2">
                <button onClick={handleClick} className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
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
