
import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import './cart.css';

const CartTempProduct = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="cart-container">
      <h2>🧪 Temp Products for Testing</h2>
      {products.length === 0 ? <p>Loading...</p> : (
        <div>
          {products.map(product => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} />
              <div>
                <h4>{product.title}</h4>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartTempProduct;
