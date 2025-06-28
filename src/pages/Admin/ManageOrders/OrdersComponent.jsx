import React from "react";
import "./OrdersComponent.css";
const OrdersComponent = () => {
  const orders = [
    { id: 1, customer: 'John Smith', total: '$129.99', status: 'Completed', date: '2024-06-25', items: 2 },
    { id: 2, customer: 'Sarah Johnson', total: '$89.99', status: 'Pending', date: '2024-06-26', items: 1 },
    { id: 3, customer: 'Mike Wilson', total: '$340.50', status: 'Shipped', date: '2024-06-27', items: 3 }
  ];

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h3 className="orders-title">Orders Management</h3>
        <button className="export-btn">
          <Package size={16} />
          Export Orders
        </button>
      </div>

      <div className="search-bar">
        <Search size={16} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="search-input"
        />
      </div>

      <div className="orders-table">
        <div className="table-header">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        
        {orders.map(order => (
          <div key={order.id} className="table-row">
            <span className="order-id">#{order.id.toString().padStart(4, '0')}</span>
            <span className="order-customer">{order.customer}</span>
            <span className="order-total">{order.total}</span>
            <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
            <span className="order-date">{order.date}</span>
            <div className="order-actions">
              <button className="action-btn view-btn">
                <Eye size={14} />
              </button>
              <button className="action-btn edit-btn">
                <Edit size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="orders-stats">
        <div className="stat-item">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value">3</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending</span>
          <span className="stat-value pending">1</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value completed">2</span>
        </div>
      </div>
    </div>
  );
};

export default OrdersComponent;


// import React from "react";
// import "./OrdersComponent.css";

// const OrdersComponent = () => {
//   return (
//     <div className="orders-component">
//       <h2>Manage Orders</h2>
//       {/* Your orders management logic here */}
//     </div>
//   );
// };

// export default OrdersComponent;