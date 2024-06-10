'use client'
import { getProductById } from "@/utils/products";
import { IProducts, userSession } from "@/types/IProducts";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<IProducts>();
  const [userData, setUserData] = useState<userSession>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  
    const storedUserData = localStorage.getItem('userSession');
    if (storedUserData) {
      try {
        const parsedUserData: userSession = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing userSession from localStorage:", error);
      }
    }


    const fetchData = async () => {
      console.log("Product ID:", params.productId);
        const product = await getProductById(params.productId);
        setProduct(product);
        setLoading(false);
      }
  

    fetchData();
  }, []);

  const handleAdd = (e: any) => {

    if (!userData?.token) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      router.push("/login");
      return;
    }


    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExist = cart.some((product: IProducts) => {
     if (product.id === Number(e?.target?.id)) return true;
    })

    if (productExist) {
      alert("Este producto ya se encuentra en tu carrito.");
     router.push("/cart");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("¡Se añadió el producto al carrito!");
     router.push("/cart");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              <img src={product?.image} alt={product?.image} className="object-cover w-full h-full rounded-lg" />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product?.name}</h2>
            <p className="text-gray-500">{product?.description}</p>
            <p className="font-bold text-indigo-600 text-3xl">Precio: $ {product?.price}</p>
            <p className="text-gray-400 text-sm">Stock: {product?.stock}</p>
            <button
              id={product?.id.toString()}
              onClick={handleAdd}
              disabled={!userData || !userData.token}
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;  
