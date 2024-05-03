'use client';
import React from "react";
import styled from "styled-components";
import {IProducts} from "@/types/IProducts"


const CardContainer = styled.div `
width: 100%;
  max-width: auto;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;


const ProductCard = ({image, name, description, price, categoryId, stock} : IProducts)  => {
    return (
        <CardContainer>
            <Image src = {image} alt = {image}/>
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Precio: $ {price}</p>
            <p>Categoria: {categoryId}</p>
            <p>Stock: {stock}</p>
            
        </CardContainer>
    );
};


export default ProductCard;

