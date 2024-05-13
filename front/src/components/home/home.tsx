import React from 'react';
import Cards from '../cards/cards';
import productsToPreLoad from "../../utils/products";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">¡Bienvenido a Tu Tienda de Tecnología!</h1>
        <p className="text-lg mb-8">Descubre los productos más innovadores al mejor precio.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Cards products={productsToPreLoad} />
        </div>
      </div>
    </div>
  );
};

export default Home;


