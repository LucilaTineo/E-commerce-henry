import React from "react";
import ProductCard from "../Card/card";
import { IProducts } from "@/types/IProducts";

const gridContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  padding: '20px',
};

const ProductGrid = ({ products }: { products: IProducts[] }) => {
  if (!products) {
    return null;
  }
  return (
    <div style={gridContainerStyle}>
      {products?.map((product) => {
        return <ProductCard key={product.name} {...product} />;
      })}
    </div>
  );
};

export default ProductGrid;
