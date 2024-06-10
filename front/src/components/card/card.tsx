import React from "react";
import { IProducts } from "@/types/IProducts";
import Link from "next/link";

const ProductCard = ({ image, name, description, price, categoryId, stock, id }: IProducts) => {
  return (
    <div className="w-full max-w-md m-2.5 border border-gray-300 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-200">
      <img src={image} alt={name} className="w-full h-auto rounded-lg mb-2.5 object-cover" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-900 font-bold mb-2">Precio: $ {price}</p>
      <p className="text-gray-700 mb-1">Categoria: {categoryId}</p>
      <p className="text-gray-700 mb-4">Stock: {stock}</p>
      <Link href={`/product/${id}`}>
      <button className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"> Ver Detalle </button>
      </Link>
    </div>
  );
};

export default ProductCard;

