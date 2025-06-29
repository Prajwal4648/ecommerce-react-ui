import React, { useState } from 'react';
import { useCart } from './CartContext';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    discount,
    isPromoApplied,
    applyPromo
  } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
   const tax = subtotal*0.08;
  const total = subtotal + shipping + tax - discount;

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'QUICK25' && !isPromoApplied) {
      const discountAmount = (subtotal + shipping + tax) * 0.25;
      applyPromo(discountAmount);
    } else if (promoCode.toUpperCase() !== 'QUICK25') {
      alert('Invalid promo code');
    } else if (isPromoApplied) {
      alert('Promo code already applied');
    }
  };

  
  const handleQuantityDecrease = (itemId, currentQuantity) => {
    if (currentQuantity <= 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

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
      
      <div className="cart-title-row">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>

      
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
              <button onClick={() => handleQuantityDecrease(item.id, item.quantity)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
            <span className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</span>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Subtotal ({cartItems.length} items) <span>₹{subtotal.toFixed(2)}</span></p>
        <p>Shipping <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span></p>
        <p>Tax <span>₹{tax.toFixed(2)}</span></p>
        {isPromoApplied && (
          <p style={{color: 'green'}}>Discount (QUICK25) <span>-₹{discount.toFixed(2)}</span></p>
        )}
        <hr />
        <p className="total">Total <span>₹{total.toFixed(2)}</span></p>

        <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        <button className="continue-btn" onClick={() => navigate('/')}>Continue Shopping</button>

        <hr className="divider" />

     
        <div className="promo-section">
          <p>Promo Code</p>
          <div className="promo-input-wrapper">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={isPromoApplied}
            />
            <button 
              onClick={handlePromoCode}
              disabled={isPromoApplied}
              style={{
                backgroundColor: isPromoApplied ? '#ccc' : '',
                cursor: isPromoApplied ? 'not-allowed' : 'pointer'
              }}
            >
              {isPromoApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
        </div>

        <hr className="divider" />

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