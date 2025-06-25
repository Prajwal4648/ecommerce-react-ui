import React,{useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ProductList.css'

const ProductList = () =>{
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(res=>setProducts(res.data))
        .catch(err=>console.error(err));
    },[]);

    return(
        <div className="product-grid">
            
            {products.map(product=>(
                <div key={product.id}>
                    <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                    <img src={product.image} alt={product.title}/>
                    <div className="product-title">{product.title}</div>
                    <div className="product-price">${product.price}</div>
                    </Link>
                    </div>
            ))}
        </div>
    )
}

export default ProductList;