import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Filter from './Filters';
import './ProductList.css';
import './SearchBar.css'; // For search box styling

const assignSizes = (product) => {
  const sizes = ["XS", "S", "M", "L", "XL", "4Y", "6Y", "7", "8", "9", "10", "11", "One Size"];
  const assigned = sizes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
  return { ...product, sizes: assigned.length ? assigned : ["One Size"] };
};

export default function ProductList() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = category === "new"
      ? "https://fakestoreapi.com/products?limit=5"
      : category
        ? `https://fakestoreapi.com/products/category/${category}`
        : "https://fakestoreapi.com/products";

    axios.get(url).then((res) => {
      const productsWithSizes = res.data.map(assignSizes);
      setProducts(productsWithSizes);
      setLoading(false);
    });
  }, [category]);

  useEffect(() => {
    let result = [...products];

    // ✅ CATEGORY filter (case-insensitive)
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some((cat) => cat.toLowerCase() === p.category.toLowerCase())
      );
    }

    // ✅ SIZE filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((size) => selectedSizes.includes(size))
      );
    }

    // ✅ PRICE filter
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // ✅ SEARCH
    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ✅ SORTING
    if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, selectedSizes, minPrice, maxPrice, sortBy, searchTerm]);

  return (
    <div className="product-wrapper">
      <div className="product-page">
        <aside className="product-sidebar">
          <div className="search-box">
            <label><strong>Search</strong></label>
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Filter
            onCategoryChange={setSelectedCategories}
            onSizeChange={setSelectedSizes}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </aside>

        <section className="product-content">
          <div className="product-header">
            <div className="header-left">
              <h2>All Products</h2>
              <span className="product-count">{filteredProducts.length} products</span>
            </div>
            <div className="sort-section">
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No products found.</p>
              <span>Try adjusting your filters.</span>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <div className="product-title">{product.title}</div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <div className="product-sizes">Sizes: {product.sizes?.join(", ")}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
