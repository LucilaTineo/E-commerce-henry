'use client'
import { getProductById } from "@/utils/products";
import { IProducts, userSession } from "@/types/IProducts";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<IProducts>();
  const [userData, setUserData] = useState<userSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userSession');
    console.log("Contenido de userSession en localStorage:", storedUserData);

    if (storedUserData) {
      try {
        const parsedUserData: userSession = JSON.parse(storedUserData);
        console.log("User Data parsed:", parsedUserData);

        if (parsedUserData) {
        const token = localStorage.getItem('token');
        console.log("Token obtenido del localStorage:", token);

        if (token && token.trim() !== "") {

          setUserData({ ...parsedUserData, token });
        } else {
          console.warn("Token ausente o inválido en localStorage");
        }
      } else {
        console.warn("Datos importantes faltantes en userSession:", parsedUserData);
      }
    } catch (error) {
      console.error("Error parsing userSession from localStorage:", error);
    }
  } else {
    console.warn("No se encontró userSession en localStorage.");
  }

    const fetchData = async () => {
      try {
        console.log("Product ID:", params.productId);
        const product = await getProductById(params.productId);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.productId]);

  const handleAdd = () => { 
    console.log("userData:", userData);
    if (!userData || !userData.token || userData.token.trim() === "") {
      alert("Debes iniciar sesión para agregar productos al carrito."); 
      } else if (product) { 
      const cart = JSON.parse(localStorage.getItem("cart") || "[]"); 
      const productExist = cart.some((item: IProducts) => item.id === product.id);
  
        if (productExist) {
          alert("Este producto ya se encuentra en tu carrito.");
          router.push("/cart");
        } else {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          alert("¡Se añadió el producto al carrito!");
          router.push("/cart");
      }
    }
  };
  

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col md:flex-row items-center justify-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex-1 px-4">
            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
              <img src={product?.image} alt={product?.image} className="object-contain w-full h-full rounded-lg bg-white" />
            </div>
          </div>
          <div className="md:flex-1 p-4 space-y-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-[#6ac88e] text-2xl md:text-3xl">{product?.name}</h2>
            <p className="text-gray-500">{product?.description}</p>
            <p className="font-bold text-[#205072] text-3xl">Precio: $ {product?.price}</p>
            <p className="text-gray-400 text-sm">Stock: {product?.stock}</p>
            <button
              id={product?.id.toString()}
              onClick={handleAdd}
              //disabled={!userData || !userData.token}
              className="h-14 px-6 py-2 font-semibold rounded-xl bg-[#6ac88e] hover:bg-[#205072] text-white" >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
