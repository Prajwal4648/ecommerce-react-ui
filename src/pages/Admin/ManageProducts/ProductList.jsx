import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seedProducts, getProducts, saveProducts } from './productService';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      await seedProducts(); // Fetches and saves to localStorage if not present
      setProducts(getProducts());
    }
    init();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
    setProducts(updated);
  };

  const handleEdit = (id) => {
    navigate(`/admin/manage-products/edit/${id}`);
  };

  return (
    <div style={{ padding: '20px' }}>
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
                <button onClick={() => handleEdit(prod.id)}>Edit</button>{' '}
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}