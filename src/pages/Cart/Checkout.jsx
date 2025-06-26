import React from 'react';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
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
            <input type="text" placeholder="Card Number" />
            <div className="row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>
            <input type="text" placeholder="Name on Card" />
            <label className="billing-checkbox">
              <input type="checkbox" defaultChecked />
              Billing address same as shipping
            </label>
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
