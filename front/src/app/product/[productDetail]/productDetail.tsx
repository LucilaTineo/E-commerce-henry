import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../products';
import { useRouter } from 'next/router';


const ProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await fetchProductById(params.id);
        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
    const userToken = localStorage.getItem("userToken");
    setToken(userToken);
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBuy = () => {
    if (!token) {
      alert ("Debes estar logeado para agregar productos al carrito")
      router.push('/login');
    } else {
      const Cart=JSON.parse(localStorage.getItem("ShoppingCart")|| "[]")
      Cart.push(product)
      localStorage.setItem("ShoppingCart", JSON.stringify(Cart))
      alert("se agrego el producto al carrito")
      router.push("/ShoppingCart")
    }
  }
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Category: {product.categoryId}</p>
      <button onClick ={handleBuy}>Add to cart</button>
    </div>
  );
};

export default ProductDetail;


