/* ──────────────────  src/pages/Admin/AdminDashboard.jsx  ────────────────── */
import React, { useState } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  Plus,
  Edit,
  Trash
} from "lucide-react";
import "./AdminDashboard.css";

/* ---------- 1. Stat card ---------- */
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <div className="stat-card-info">
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
      </div>
      <Icon className="stat-card-icon" />
    </div>
  </div>
);

/* ---------- 2. Add‑product form ---------- */
const AddProductForm = ({ onSubmit }) => {
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    setData({ name: "", category: "", price: "", stock: "" });
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">
        <Plus size={20} strokeWidth={2.5} /> Add New Product
      </h3>

      <label className="form-label">Product Name</label>
      <input
        className="form-input"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Premium Cotton T‑Shirt"
        required
      />

      <label className="form-label">Category</label>
      <input
        className="form-input"
        type="text"
        name="category"
        value={data.category}
        onChange={handleChange}
        placeholder="Men / Women / Kids"
        required
      />

      <label className="form-label">Price ($)</label>
      <input
        className="form-input"
        type="number"
        step="0.01"
        name="price"
        value={data.price}
        onChange={handleChange}
        placeholder="45"
        required
      />

      <label className="form-label">Stock Quantity</label>
      <input
        className="form-input"
        type="number"
        name="stock"
        value={data.stock}
        onChange={handleChange}
        placeholder="25"
        required
      />

      <button type="submit" className="submit-btn">
        Add Product
      </button>
    </form>
  );
};

/* ---------- 3. Product row ---------- */
const ProductRow = ({ product }) => (
  <li className="product-row">
    <div className="product-meta">
      <p className="product-name">{product.name}</p>
      <span
        className={`product-status ${product.active ? "active" : "inactive"}`}
      >
        {product.active ? "active" : "inactive"}
      </span>
    </div>

    <p className="product-secondary">
      {product.category} • ${product.price} • Stock {product.stock}
    </p>

    <div className="product-actions">
      <button className="icon-btn">
        <Edit size={16} />
      </button>
      <button className="icon-btn danger">
        <Trash size={16} />
      </button>
    </div>
  </li>
);

/* ---------- 4. Products tab ---------- */
const ProductsTab = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Cotton T‑Shirt",
      category: "Men",
      price: 45,
      stock: 25,
      active: true
    },
    {
      id: 2,
      name: "Silk Blouse",
      category: "Women",
      price: 95,
      stock: 15,
      active: true
    },
    {
      id: 3,
      name: "Leather Jacket",
      category: "Men",
      price: 280,
      stock: 8,
      active: true
    },
    {
      id: 4,
      name: "Summer Dress",
      category: "Women",
      price: 120,
      stock: 0,
      active: false
    }
  ]);

  const addProduct = (p) =>
    setProducts([...products, { id: products.length + 1, active: true, ...p }]);

  return (
    <div className="products-tab">
      <AddProductForm onSubmit={addProduct} />

      <div className="products-list-wrapper">
        <h3 className="list-heading">Products ({products.length})</h3>
        <ul className="products-list">
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------- 5. Placeholder tabs ---------- */
const Placeholder = ({ label }) => (
  <div className="placeholder">{label} features coming soon…</div>
);

/* ---------- 6. Dashboard shell ---------- */
const AdminDashboard = () => {
  const tabs = ["Products", "Users", "Orders", "Analytics"];
  const [active, setActive] = useState("Products");

  const renderTab = () =>
    active === "Products" ? <ProductsTab /> : <Placeholder label={active} />;

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Manage your store, products and customers</p>
      </header>

      <section className="stats-grid">
        <StatCard title="Total Products" value="4" icon={Package} />
        <StatCard title="Total Users" value="3" icon={Users} />
        <StatCard title="Total Orders" value="3" icon={ShoppingCart} />
        <StatCard title="Total Revenue" value="$560" icon={DollarSign} />
      </section>

      <nav className="tabs-nav">
        {tabs.map((t) => (
          <button
            key={t}
            className={`tab-btn ${active === t ? "active" : ""}`}
            onClick={() => setActive(t)}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="tab-panel">{renderTab()}</main>
    </div>
  );
};

export default AdminDashboard;
