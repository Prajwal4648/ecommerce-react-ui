import React from "react";
import "./ProductsComponent.css";
// If you need ProductList:
import ProductList from "./ProductList";
// If you need the service:
//import { productService } from "./productService";

const ProductsComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const products = [
    { id: 1, name: 'Premium T-Shirt', price: '$29.99', category: 'Men\'s Clothing', stock: 45 },
    { id: 2, name: 'Designer Jeans', price: '$89.99', category: 'Women\'s Clothing', stock: 23 },
    { id: 3, name: 'Sports Sneakers', price: '$119.99', category: 'Footwear', stock: 12 },
    { id: 4, name: 'Leather Wallet', price: '$49.99', category: 'Accessories', stock: 8 }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic will be added later
    console.log('Form submitted:', formData);
    setShowForm(false);
    setFormData({ name: '', price: '', category: '', description: '', image: '' });
  };

  return (
    <div className="products-layout">
      {/* Products List */}
      <div className="products-main">
        <div className="products-header">
          <h3 className="products-title">Products Management</h3>
          <button 
            className="add-product-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
          />
        </div>

        <div className="products-table">
          <div className="table-header">
            <span>Product Name</span>
            <span>Price</span>
            <span>Category</span>
            <span>Stock</span>
            <span>Actions</span>
          </div>
          
          {products.map(product => (
            <div key={product.id} className="table-row">
              <span className="product-name">{product.name}</span>
              <span className="product-price">{product.price}</span>
              <span className="product-category">{product.category}</span>
              <span className={`product-stock ${product.stock < 15 ? 'low-stock' : ''}`}>
                {product.stock}
              </span>
              <div className="product-actions">
                <button className="action-btn edit-btn">
                  <Edit size={14} />
                </button>
                <button className="action-btn delete-btn">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="product-form-container">
          <div className="product-form">
            <div className="form-header">
              <h4 className="form-title">Add New Product</h4>
              <button 
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Select category</option>
                  <option value="mens-clothing">Men's Clothing</option>
                  <option value="womens-clothing">Women's Clothing</option>
                  <option value="footwear">Footwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="kids">Kids</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsComponent;


// import React from "react";
// import "./ProductsComponent.css";

// const ProductsComponent = () => {
//   return (
//     <div className="products-component">
//       <h2>Manage Products</h2>
//       {/* Your products management logic here */}
//     </div>
//   );
// };

// export default ProductsComponent;