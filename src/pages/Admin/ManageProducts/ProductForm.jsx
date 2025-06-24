import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, updateProduct } from './productService';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allProducts = getProducts();
    const product = allProducts.find((p) => p.id === Number(id));

    if (product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        category: product.category || '',
      });
    } else {
      alert('Product not found');
      navigate('/admin/products');
    }

    setLoading(false);
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateProduct(Number(id), {
      ...formData,
      price: parseFloat(formData.price),
    });

    alert('Product updated!');
    navigate('/admin/products');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label><br />
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category:</label><br />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />
        <button type="submit">💾 Save</button>{' '}
        <button type="button" onClick={() => navigate('/admin/products')}>
          ❌ Cancel
        </button>
      </form>
    </div>
  );
}
