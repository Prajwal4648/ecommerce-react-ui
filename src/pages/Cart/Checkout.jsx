import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="row">
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Last Name" />
            </div>
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone" />
          </div>

          <div className="form-section">
            <h3>Shipping Address</h3>
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" />
            <div className="row">
              <input type="text" placeholder="City" />
              <select>
                <option>Select state</option>
                <option>Karnataka</option>
                <option>Maharashtra</option>
                <option>Tamil Nadu</option>
              </select>
            </div>
            <input type="text" placeholder="ZIP Code" />
          </div>

          <div className="form-section">
            <h3>Payment Information</h3>
            
            {/* Payment Method Selection */}
            <div className="payment-methods">
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">💳 Card Payment</span>
              </label>
              
              <label className="payment-option">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">💵 Cash on Delivery</span>
              </label>
            </div>

            {/* Card Payment Fields - Only show when card is selected */}
            {paymentMethod === 'card' && (
              <div className="card-payment-fields">
                <input type="text" placeholder="Card Number" required />
                <div className="row">
                  <input type="text" placeholder="MM/YY" required />
                  <input type="text" placeholder="CVV" required />
                </div>
                <input type="text" placeholder="Name on Card" required />
                <label className="billing-checkbox">
                  <input type="checkbox" defaultChecked />
                  Billing address same as shipping
                </label>
              </div>
            )}

            {/* Cash on Delivery Info - Only show when COD is selected */}
            {paymentMethod === 'cod' && (
              <div className="cod-info">
                <div className="cod-message">
                  <p>📦 <strong>Cash on Delivery Selected</strong></p>
                  <p>You will pay when your order is delivered to your address.</p>
                  <ul>
                    <li>✅ No online payment required</li>
                    <li>✅ Pay with cash to delivery person</li>
                    <li>✅ Exact change appreciated</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;