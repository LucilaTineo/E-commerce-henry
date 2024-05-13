'use client';
import React from "react";
import { IProducts } from "@/types/IProducts";

const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-auto border border-gray-300 rounded-lg p-4">
      {children}
    </div>
  );
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-auto rounded-lg mb-4"
    />
  );
};

const ProductCard = ({
  image,
  name,
  description,
  price,
  categoryId,
  stock,
}: IProducts) => {
  return (
    <CardContainer>
      <Image src={image} alt={image} />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-700 mb-2">Precio: $ {price}</p>
      <p className="text-gray-700 mb-2">Categoria: {categoryId}</p>
      <p className="text-gray-700 mb-2">Stock: {stock}</p>
    </CardContainer>
  );
};

export default ProductCard;


