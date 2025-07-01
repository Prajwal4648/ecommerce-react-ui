import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  Plus,
  Edit,
  Trash
} from "lucide-react";
import { fetchAllProducts } from "../../api/productapi";
import { fetchAllUsers } from "../../api/userApi";
import "./AdminDashboard.css";

/*************************************************************************
  Helpers
*************************************************************************/
const LS = {
  PRODUCTS: "adm_products",
  USERS: "adm_users",
  ORDERS: "adm_orders"
};

const saveLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getLS = (k, fallback = null) => {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

/*************************************************************************
  Generic UI widgets
*************************************************************************/
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="stat-card card">
    <div className="stat-card-content">
      <div className="stat-card-info">
        <p className="stat-card-title">{title}</p>
        <p className="stat-card-value">{value}</p>
      </div>
      <Icon className="stat-card-icon" />
    </div>
  </div>
);

/*************************************************************************
  PRODUCTS TAB
*************************************************************************/
const AddProductForm = ({ onSubmit }) => {
  const init = { name: "", category: "", price: "", stock: "" };
  const [data, setData] = useState(init);
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...data, price: +data.price, stock: +data.stock });
    setData(init);
  };
  return (
    <form className="add-product-form card" onSubmit={handleSubmit}>
      <h3 className="form-heading"><Plus size={18} /> New Product</h3>
      {["name", "category"].map((field) => (
        <React.Fragment key={field}>
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            className="form-input"
            name={field}
            value={data[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            required
          />
        </React.Fragment>
      ))}
      <label className="form-label">Price ($)</label>
      <input className="form-input" type="number" step="0.01" name="price" value={data.price} onChange={handleChange} required />
      <label className="form-label">Stock Qty</label>
      <input className="form-input" type="number" name="stock" value={data.stock} onChange={handleChange} required />
      <button className="submit-btn" type="submit">Add</button>
    </form>
  );
};

const ProductRow = ({ product }) => (
  <li className="product-row card">
    <div className="product-meta">
      <p className="product-name">{product.name}</p>
      <span className={`product-status ${product.active ? "active" : "inactive"}`}>{product.active ? "active" : "inactive"}</span>
    </div>
    <p className="product-secondary">{product.category} • ${product.price} • Stock {product.stock}</p>
    <div className="product-actions">
      <button className="icon-btn" title="Edit soon"><Edit size={16} /></button>
      <button className="icon-btn danger" title="Delete soon"><Trash size={16} /></button>
    </div>
  </li>
);

const ProductsTab = () => {
  const [products, setProducts] = useState(() => getLS(LS.PRODUCTS, []));

  useEffect(() => {
    if (products.length) return;
    fetchAllProducts()
      .then((data) => {
        const formatted = data.map((p) => ({
          id: p.id,
          name: p.title,
          category: p.category,
          price: p.price,
          stock: Math.floor(Math.random() * 50) + 1,
          active: true
        }));
        setProducts(formatted);
        saveLS(LS.PRODUCTS, formatted);
      })
      .catch((e) => console.error("Products fetch error", e));
  }, [products.length]);

  const addProduct = useCallback((p) => {
    const newItem = { ...p, id: Date.now(), active: true };
    const updated = [...products, newItem];
    setProducts(updated);
    saveLS(LS.PRODUCTS, updated);
  }, [products]);

  return (
    <div className="products-tab layout-split">
      <AddProductForm onSubmit={addProduct} />
      <section className="products-list-wrapper">
        <h3 className="list-heading">Products ({products.length})</h3>
        <div className="scrollable-list">
          <ul className="products-list">
            {products.map((p) => <ProductRow key={p.id} product={p} />)}
          </ul>
        </div>
      </section>
    </div>
  );
};

/*************************************************************************
  USERS TAB
*************************************************************************/
const UsersTab = () => {
  const [users, setUsers] = useState(() => getLS(LS.USERS, []));
  useEffect(() => {
    if (users.length) return;
    fetchAllUsers()
      .then((u) => { setUsers(u); saveLS(LS.USERS, u); })
      .catch((err) => console.error("Users fetch error", err));
  }, [users.length]);

  return (
  <div className="products-tab grid-layout">
    {users.map((u) => (
      <div key={u.id} className="card-box">
        <strong>{u.name.firstname} {u.name.lastname}</strong><br />
        <span>{u.email} • {u.phone}</span>
      </div>
    ))}
  </div>
);

};

/*************************************************************************
  ORDERS TAB (simulated)
*************************************************************************/
const generateMockOrders = (products, users, count = 8) => {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  return Array.from({ length: count }, (_, i) => {
    const prod = pick(products);
    const user = pick(users);
    return {
      id: 1000 + i,
      product: prod?.name ?? "Unknown",
      customer: `${user?.name?.firstname ?? "Anon"} ${user?.name?.lastname ?? ""}`.trim(),
      total: prod ? prod.price * (Math.ceil(Math.random() * 3)) : 0,
      status: Math.random() > 0.5 ? "processing" : "delivered"
    };
  });
};

const OrdersTab = () => {
  const prod = getLS(LS.PRODUCTS, []);
  const usr = getLS(LS.USERS, []);
  const [orders] = useState(() => getLS(LS.ORDERS, generateMockOrders(prod, usr)));
  useEffect(() => saveLS(LS.ORDERS, orders), [orders]);

  return (
  <div className="products-tab grid-layout">
    {orders.map((o) => (
      <div key={o.id} className="card-box">
        <strong>Order #{o.id}</strong><br />
        <span>{o.customer} • ${o.total.toFixed(2)} • {o.status}</span>
      </div>
    ))}
  </div>
);

};

/*************************************************************************
  ANALYTICS TAB (computed)
*************************************************************************/
const AnalyticsTab = () => {
  const products = getLS(LS.PRODUCTS, []);
  const orders = getLS(LS.ORDERS, []);

  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [orders]);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
   <div className="products-tab analytics-tab">
  <h3 className="list-heading">Quick Analytics</h3>
  <div className="analytics-grid">
    <div className="analytic-card">💰 Total Revenue: ${totalRevenue.toFixed(2)}</div>
    <div className="analytic-card">📦 Orders Processed: {orders.length}</div>
    <div className="analytic-card">🚫 Out of Stock Products: {outOfStock}</div>
    <div className="analytic-card">⭐ Most Viewed: Casual Sneakers</div>
    <div className="analytic-card">📈 Avg Order Value: ${(totalRevenue / orders.length || 0).toFixed(2)}</div>
    <div className="analytic-card">🔁 Returning Users: 16%</div>
  </div>
</div>
  );
};

/*************************************************************************
  DASHBOARD SHELL
*************************************************************************/
export default function AdminDashboard() {
  const tabs = ["Products", "Users", "Orders", "Analytics"];
  const [active, setActive] = useState(tabs[0]);

  const stats = {
    products: getLS(LS.PRODUCTS, []).length,
    users: getLS(LS.USERS, []).length,
    orders: getLS(LS.ORDERS, []).length,
    revenue: getLS(LS.ORDERS, []).reduce((s, o) => s + o.total, 0)
  };

  const renderTab = () => {
    switch (active) {
      case "Products": return <ProductsTab />;
      case "Users": return <UsersTab />;
      case "Orders": return <OrdersTab />;
      case "Analytics": return <AnalyticsTab />;
      default: return null;
    }
  };

  return (
    <div className="admin-dash-wrapper full-bleed">
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Manage your store, products and customers</p>
        </header>
        <section className="stats-grid">
          <StatCard title="Total Products" value={stats.products} icon={Package} />
          <StatCard title="Total Users" value={stats.users} icon={Users} />
          <StatCard title="Total Orders" value={stats.orders} icon={ShoppingCart} />
          <StatCard title="Revenue" value={`$${stats.revenue.toFixed(2)}`} icon={DollarSign} />
        </section>
        <nav className="tabs-nav">
          {tabs.map((t) => (
            <button key={t} className={`tab-btn ${active === t ? "active" : ""}`} onClick={() => setActive(t)}>{t}</button>
          ))}
        </nav>
        <main className="tab-panel">{renderTab()}</main>
      </div>
    </div>
  );
}
