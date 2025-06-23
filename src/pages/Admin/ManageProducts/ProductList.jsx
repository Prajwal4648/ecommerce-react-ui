// src/pages/Admin/ManageProducts/ProductList.jsx
import { useEffect, useState } from 'react';
import { seedProducts, getProducts } from './productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function init() {
      await seedProducts();
      setProducts(getProducts());
    }
    init();
  }, []);

  return (
    <div>
      <h2>Manage Products</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.title}</td>
              <td>{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                <button>Edit</button>{' '}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
