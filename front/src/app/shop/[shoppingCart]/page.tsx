'use client'
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router"
import { IProducts, userInformation } from "@/types/IProducts";
import { createOrder } from "@/helper/orderHelper";

const ShoppingCart = ({ token }: { token: userInformation }) => {
  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<IProducts[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (storedCart) {
      let totalCart = 0;
      storedCart?.map((item: IProducts) => {
        totalCart += item.price;
      });
      setTotal(totalCart);
      setCart(storedCart);
    }
  }, []);

  async function handleClick() {
    try {
      const orderProductIds = new Set(cart.map((product) => product.id));
      await createOrder(Array.from(orderProductIds), token.token);
      localStorage.setItem("cart", "[]");
      setCart([]);
      setTotal(0);
      alert("Compra realizada con éxito");
    } catch (error) {
      console.error("Error al despachar la compra:", error);
      alert("Hubo un error al despachar la compra. Por favor, inténtalo de nuevo.");
      setCart([]);
    }
  };

  return (
    <div>
      <h2>Carrito de compra</h2>
      <p>Total: ${total}</p>
      <button onClick={handleClick}>Despachar compra</button>
    </div>
  );
};

export default ShoppingCart;
