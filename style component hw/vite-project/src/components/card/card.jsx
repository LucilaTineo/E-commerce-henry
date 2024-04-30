import React from "react";
import styled from "styled-components";

const CardContainer = styled.div `
width: 100%;
  max-width: auto;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;


const ProductCard = ({product}) => {
    return (
        <CardContainer>
            <ProductImage src = {product.image} alt = {product.name}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: {product.price}</p>
            <p>Categoria: {product.categoryId}</p>
            <p>Stock: {product.stock}</p>
            
        </CardContainer>
    );
};


export default ProductCard;

