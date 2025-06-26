import React from 'react';
import { useCart } from './CartContext';
import './OrderSummary.css';

const OrderSummary = () => {
  const { cartItems, discount, isPromoApplied } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = 14.40; // 8% tax as an example
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="order-summary">
      <h3 className="order-summary-title">Order Summary</h3>

      <div className="order-item">
        {cartItems.map((item) => (
          <div className="order-product" key={item.id}>
            <img src={item.image} alt={item.title} className="product-img" />
            <div className="product-info">
              <p className="product-title">{item.title}</p>
              <p className="product-details">Size: S • Color: White</p>
              <p className="product-qty">Qty: {item.quantity}</p>
            </div>
            <p className="product-price">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="price-breakdown">
        <p>
          Subtotal <span>₹{subtotal.toFixed(2)}</span>
        </p>
        <p>
          Shipping <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
        </p>
        <p>
          Tax <span>₹{tax.toFixed(2)}</span>
        </p>
        {isPromoApplied && (
          <p style={{color: 'green'}}>
            Discount (FLAT10) <span>-₹{discount.toFixed(2)}</span>
          </p>
        )}
        <hr />
        <p className="total">
          Total <span>₹{total.toFixed(2)}</span>
        </p>
      </div>

      <button className="complete-order-btn">
        Complete Order • ₹{total.toFixed(2)}
      </button>

      <div className="order-notes">
        🔒 Your payment information is secure and encrypted
        <br />
        ✉️ Order confirmation will be sent to your email
      </div>
    </div>
  );
};

export default OrderSummary;