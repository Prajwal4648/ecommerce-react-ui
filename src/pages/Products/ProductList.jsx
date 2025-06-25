import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "./SearchBar";
import Filter from "./Filters";
import "./ProductList.css";

// Helper to capitalize category names
const capitalize = (text) => {
  if (text === "men's clothing") return "Men's clothing";
  if (text === "women's clothing") return "Women's clothing";
  if (text === "jewelery") return "Jewelery";
  if (text === "electronics") return "Electronics";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Helper to add dummy sizes
const assignSizes = (product) => {
  const allSizes = [
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
  const randomSizes = allSizes
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 1);
  return { ...product, sizes: randomSizes };
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const sizedProducts = res.data.map(assignSizes);
        setProducts(sizedProducts);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.title + " " + product.category)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(capitalize(product.category));

    const matchesSize =
      selectedSizes.length === 0 ||
      product.sizes?.some((size) => selectedSizes.includes(size));

    return matchesSearch && matchesCategory && matchesSize;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "price-low") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="product-page">
      <div className="sidebar">
        <Search onSearchChange={setSearchTerm} />
        <Filter
          onCategoryChange={setSelectedCategories}
          onSizeChange={setSelectedSizes}
        />
      </div>

      <div className="product-content">
        <div className="product-header">
          <div className="header-left">
            <h2>All Products</h2>
            <span className="product-count">
              {sortedProducts.length} product
              {sortedProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="sort-section">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="product-card"
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                  <div className="product-title">{product.title}</div>
                  <div className="product-price">${product.price}</div>
                  <div className="product-sizes">
                    Sizes: {product.sizes?.join(", ")}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
              <span>Try adjusting your search, category, or size filters.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
