import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css'; // reuse your product styling

const assignSizes = (product) => {
  const sizes = ["XS", "S", "M", "L", "XL", "4Y", "6Y", "7", "8", "9", "10", "11", "One Size"];
  const assigned = sizes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
  return { ...product, sizes: assigned };
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        const all = res.data.map(assignSizes);
        setProducts(all);
        const match = all.filter((p) =>
          (p.title + " " + p.category).toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(match);
      });
  }, [query]);

  return (
    <div className="product-page">
      <div className="product-content" style={{ width: '100%' }}>
        <div className="product-header">
          <div className="header-left">
            <h2>Search Results</h2>
            <span className="product-count">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found for "{query}"
            </span>
          </div>
        </div>

        <div className="product-grid">
          {filtered.length > 0 ? (
            filtered.map((product) => (
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
                  <div className="product-sizes">Sizes: {product.sizes?.join(', ')}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-products">
              <p>No products found.</p>
              <span>Try a different search term.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
