import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext"; // Import the cart context
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  // Get addToCart function from cart context
  const { addToCart } = useCart();

  const showClothingOptions =
    product &&
    (product.category === "men's clothing" ||
      product.category === "women's clothing");

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "4Y",
    "6Y",
    "7",
    "8",
    "9",
    "10",
    "11",
    "One Size",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);

        const all = await axios.get("https://fakestoreapi.com/products");
        const filtered = all.data.filter(
          (item) =>
            item.category === res.data.category && item.id !== res.data.id
        );
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "dec" && prev > 1) return prev - 1;
      if (type === "inc") return prev + 1;
      return prev;
    });
  };

  // Handle add to cart with selected options
  const handleAddToCart = () => {
    if (showClothingOptions && !selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    const productToAdd = {
      ...product,
      selectedSize: selectedSize || null,
      quantity: quantity
    };

    addToCart(productToAdd);
    
    // Optional: Show success message or reset form
    alert(`Added ${quantity} ${product.title} to cart!`);
  };

  if (!product) return <p>Loading....</p>;
  
  return (
    <div className="product-details-container">
      <Link to="/products" className="back-button">
        Back to Products
      </Link>
      <div className="product-main">
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="info-section">
          <span className="product-tag">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="rating">
            {product.rating.rate} reviews from {product.rating.count} people
          </p>

          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className="old-price">
              ${(product.price * 1.25).toFixed(2)}
            </span>
            <span className="discount">25% OFF</span>
          </div>

          <p className="description">{product.description.split(". ")[0]}</p>

          <div className="selectors">
            {showClothingOptions && (
              <>
                <label>Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select a size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label>Color</label>
                <div className="colors">
                  <div className="color white"></div>
                  <div className="color black"></div>
                  <div className="color blue"></div>
                </div>
              </>
            )}

            <label>Quantity</label>
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange("dec")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange("inc")}>+</button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart">
            Add to Cart
          </button>
          <button className="wishlist">Add to WishList</button>

          <ul className="features">
            <li>100% Premium Quality</li>
            <li>Fast & Reliable Shipping</li>
            <li>Easy 7-Day Returns</li>
            <li>Cash on Delivery Available</li>
          </ul>
        </div>
      </div>

      <div className="recommended">
        <h2>You might also like</h2>
        <div className="suggestions">
          {similarProducts.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id} className="card">
              <img
                src={item.image}
                alt={item.title}
                className="suggested-img"
              />
              <p className="suggested-title">{item.title}</p>
              <p className="suggested-price">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;