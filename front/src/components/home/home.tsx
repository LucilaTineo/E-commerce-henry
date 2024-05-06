import React from 'react';
import Cards from '../cards/cards';
import productsToPreLoad from "../../utils/products";

const Home = () => {
  return (
    <div>
        <Cards products={productsToPreLoad} />
    
    </div>
  );
};

export default Home;

