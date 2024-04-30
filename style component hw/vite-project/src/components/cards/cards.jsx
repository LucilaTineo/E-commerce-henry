import React from "react";
import styled from "styled-components";
import ProductCard from "../card/card";

const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Grid responsive */
gap: 20px;
padding: 20px;
`;

const ProductGrid = ({products}) => {

    if (!products) {
        return null;
      }
    return (
        <GridContainer>
            {products.map((product, index) => (
                <ProductCard key={index} product= {product} />
        ))}
        </GridContainer>
    );
};

export default ProductGrid;

