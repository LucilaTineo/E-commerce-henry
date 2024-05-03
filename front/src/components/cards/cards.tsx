'use client';
import React from "react";
import styled from "styled-components";
import ProductCard from "../card/card";
import { IProducts } from "@/types/IProducts";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ProductGrid = ({ products }: { products: IProducts[] }) => {
  if (!products) {
    return null;
  }
  return (
    <GridContainer>
      {products?.map((product) => {
        return <ProductCard key={product.name} {...product} />;
      })}
    </GridContainer>
  );
};

export default ProductGrid;
