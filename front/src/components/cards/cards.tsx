'use client'
import React from "react";
import ProductCard from "../card/card";
import { IProducts } from "@/types/IProducts";

const ProductGrid = ({ products }: { products: IProducts[] }) => {
  if (!products) {
    return null;
  }
  return (
    <div>
      {products?.map((product) => {
        return <ProductCard key={product.name} {...product} />;
      })}
    </div>
  );
};

export default ProductGrid;
