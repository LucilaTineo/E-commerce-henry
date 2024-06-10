'use client'
import React, { useEffect, useState } from 'react';
import Cards from '../CardGrid/cardGrid';
import Carousel from "../Carousel/carousel";

const apiUrl = "http://localhost:3001";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/products`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Error fetching products:", res.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Carousel />
      <Cards products={products} />
    </div>
  );
};

export default Home;

