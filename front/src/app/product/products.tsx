'use client';
import React from "react";
import ProductCard from "../../components/card/card";

export const fetchProducts = async () => {
  const response = await fetch("http://localhost:3001/products");
  const products = await response.json();
  return products;
};

export const fetchProductById = async (productId: string) => {
  const response = await fetch(`http://localhost:3001/products/${productId}`)
  const product = await response.json();
  return product;
};

const Products = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProductsData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    fetchProductsData();
  }, []);

  return (
    <div>
      <section>
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
            stock={product.stock}
            categoryId={product.categoryId}
          />
        ))}
      </section>
    </div>
  );
};

export default Products;


