import React from 'react';
import './App.css';
import Home from './components/home/home';
import NavBar from './components/NavBar/Navbar';
import ProductGrid from './components/cards/cards';
import productsToPreLoad from './utils/products.js';

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <ProductGrid products={productsToPreLoad} />
    </>
  );
}

export default App;