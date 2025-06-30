import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const assignSizes = (product) => {
  const sizes = ["XS", "S", "M", "L", "XL", "4Y", "6Y", "7", "8", "9", "10", "11", "One Size"];
  const assigned = sizes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 1);
  return { ...product, sizes: assigned };
};

const matchQuery = (query, product) => {
  const title = product.title.toLowerCase();
  const category = product.category.toLowerCase();
  const q = query.toLowerCase().trim();

  // Match entire word
  return (
    title === q ||
    category === q ||
    title.includes(` ${q} `) || // e.g. "premium slim fit"
    title.startsWith(q) ||
    title.endsWith(q) ||
    category.includes(` ${q} `)
  );
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

        const matches = all.filter(p => matchQuery(query, p));
        setFiltered(matches);
      });
  }, [query]);

  return (
    <div style={styles.page}>
      <style>{cssStyles}</style>

      <div style={styles.header}>
        <h2 style={styles.title}>Search Results</h2>
        <span style={styles.count}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found for "<strong>{query}</strong>"
        </span>
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
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-sizes">Sizes: {product.sizes?.join(', ')}</div>
              </div>
            </Link>
          ))
        ) : (
          <div style={styles.noProducts}>
            <p>No products found.</p>
            <span>Try a different search term.</span>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #f0f0f0',
  },
  title: {
    fontSize: '1.8rem',
    margin: 0,
    color: '#333',
  },
  count: {
    fontSize: '0.95rem',
    color: '#555',
    marginTop: '0.5rem',
    display: 'block',
  },
  noProducts: {
    textAlign: 'center',
    padding: '2rem 1rem',
    color: '#777',
  },
};

const cssStyles = `
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  .product-card {
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid #eee;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: all 0.2s ease;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .product-image-container {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .product-card img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex-grow: 1;
  }

  .product-title {
    font-size: 0.95rem;
    font-weight: 500;
    color: #333;
    line-height: 1.3;
    height: 2.6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    font-size: 1.1rem;
    color: #0d6efd;
    font-weight: 600;
  }

  .product-sizes {
    font-size: 0.8rem;
    color: #666;
    margin-top: auto;
  }

  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
  }
`;
