import React, { useState } from 'react';
import { useCart } from './CartContext';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = 14.40; // fixed or calculated
  const total = subtotal + shipping + tax;

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button className="empty-cart-btn" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header Row */}
      <div className="cart-title-row">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>

      {/* Left: Cart Items */}
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <p>Size: S &nbsp; Color: White</p>
              <p>₹{item.price}</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <span className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</span>
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Subtotal ({cartItems.length} items) <span>₹{subtotal.toFixed(2)}</span></p>
        <p>Shipping <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span></p>
        <p>Tax <span>₹{tax.toFixed(2)}</span></p>
        <hr />
        <p className="total">Total <span>₹{total.toFixed(2)}</span></p>

        <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        <button className="continue-btn" onClick={() => navigate('/')}>Continue Shopping</button>

        <hr className="divider" />

        {/* Promo Code */}
        <div className="promo-section">
          <p>Promo Code</p>
          <div className="promo-input-wrapper">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button>Apply</button>
          </div>
        </div>

        <hr className="divider" />

        {/* Benefits */}
        <div className="features">
          <p>🔒 Secure checkout</p>
          <p>📦 Free shipping over ₹100</p>
          <p>🔄 30-day returns</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
