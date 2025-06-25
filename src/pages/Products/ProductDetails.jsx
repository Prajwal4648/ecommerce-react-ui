import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then(res => setProduct(res.data))
    .catch(err=>console.error(err))
  },[id]);

  if(!product) return <p>Loading....</p>
  return(
    <div className="product-details-container">
        <img src={product.image} alt={product.title} className="product-details-image"/>
        <div className="product-details-info">
            <h2>{product.title}</h2>
            <div className="product-price"><strong>${product.price}</strong></div>
            <div className="product-category">Category: {product.category}</div>
            <p>{product.description}</p>
            <button className="product-add-btn">Add to cart</button>
        </div>
    </div>
  )
};


export default ProductDetails;