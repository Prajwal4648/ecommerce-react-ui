import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './OrderSuccess.css';


const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderData;

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
  if (!orderDetails) {

    navigate('/');
    return null;
  }
},[orderDetails, navigate]);

if (!orderDetails) return null;

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    alert('Tracking functionality coming soon!');
  };

  return (
    <div className="order-success-page">
      <div className="success-container">
     
        <div className="success-header">
          <div className="success-icon">
  <span className="checkmark">✔</span>
</div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for your order. We've received it and will process it soon.
          </p>
        </div>


        
        <div className="order-details-card">
          <div className="order-info-header">
            <h2>Order Details</h2>
            <span className="order-number">#{orderDetails.orderNumber}</span>
          </div>

          <div className="order-info-grid">
            <div className="info-item">
              <span className="info-label">📅 Order Date:</span>
              <span className="info-value">{orderDetails.orderDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🚚 Estimated Delivery:</span>
              <span className="info-value">{orderDetails.estimatedDelivery}</span>
            </div>
            <div className="info-item">
              <span className="info-label">💰 Payment Method:</span>
              <span className="info-value">{orderDetails.paymentMethod}</span>
            </div>
            <div className="info-item">
              <span className="info-label">💵 Total Amount:</span>
              <span className="info-value total-amount">{orderDetails.total}</span>
            </div>
          </div>
        </div>

      
        <div className="shipping-card">
          <h3>📦 Shipping Address</h3>
          <div className="address-details">
            <p className="address-name">{orderDetails.shippingAddress.name}</p>
            <p>{orderDetails.shippingAddress.address}</p>
            {orderDetails.shippingAddress.apartment && (
              <p>{orderDetails.shippingAddress.apartment}</p>
            )}
            <p>
              {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{' '}
              {orderDetails.shippingAddress.zipCode}
            </p>
          </div>
        </div>


        <div className="items-card">
          <h3>🛍️ Order Items</h3>
          <div className="items-list">
            {orderDetails.items.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-details">
                  Qty: {item.quantity} × {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="next-steps-card">
          <h3>📋 What's Next?</h3>
          <ul className="steps-list">
            <li>✅ We'll send you an email confirmation shortly</li>
            <li>📦 Your order will be packed and prepared for delivery</li>
            <li>🚚 You'll receive tracking information once shipped</li>
            <li>💵 Pay cash to the delivery person when your order arrives</li>
          </ul>
        </div>


        <div className="action-buttons">
          <button className="btn-secondary" onClick={handleContinueShopping}>
            🛒 Continue Shopping
          </button>
          <button className="btn-primary" onClick={handleTrackOrder}>
            📍 Track Your Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
