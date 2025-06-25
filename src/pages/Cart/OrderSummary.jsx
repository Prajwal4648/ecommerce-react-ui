
import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import './OrderSummary.css';


const OrderSummary = () => {
  const { cartItems, clearCart } = useCart();
  const details = JSON.parse(localStorage.getItem('checkoutDetails') || '{}');

  useEffect(() => {
    clearCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p><strong>Name:</strong> {details.name}</p>
      <p><strong>Email:</strong> {details.email}</p>
      <p><strong>Address:</strong> {details.address}</p>
      <h3>Items:</h3>
      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.title} - ₹{item.price} × {item.quantity}</p>
        </div>
      ))}
      <h3>Total Paid: ₹{total.toFixed(2)}</h3>
      <h4>✅ Order Placed Successfully!</h4>
    </div>
  );
};

export default OrderSummary;
