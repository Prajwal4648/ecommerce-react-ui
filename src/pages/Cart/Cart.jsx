import React from 'react';
import { useCart } from './CartContext';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      {/* Header Row */}
      <div className="cart-title-row">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cartItems.map(item => (
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
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Subtotal ({cartItems.length} items) <span>₹{total.toFixed(2)}</span></p>
        <p>Shipping <span>₹10.00</span></p>
        <p>Tax <span>₹3.60</span></p>
        <hr />
        <p className="total">Total <span>₹{(total + 13.60).toFixed(2)}</span></p>
        <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        <button className="continue-btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
