import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import './Checkout.css';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); 


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddressSame: true
  });

  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="row">
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Phone" 
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Shipping Address</h3>
            <input 
              type="text" 
              name="address"
              placeholder="Address" 
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input 
              type="text" 
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)" 
              value={formData.apartment}
              onChange={handleInputChange}
            />
            <div className="row">
              <input 
                type="text" 
                name="city"
                placeholder="City" 
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <select 
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              >
                <option value="">Select state</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
            <input 
              type="text" 
              name="zipCode"
              placeholder="ZIP Code" 
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <h3>Payment Information</h3>
            
            
            <div className="payment-methods">
              <label className="payment-option">
                <input 
                id='op'
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
                id='op'
                  type="radio" 
                  name="paymentMethod" 
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="payment-label">💵 Cash on Delivery</span>
              </label>
            </div>

         
            {paymentMethod === 'card' && (
              <div className="card-payment-fields">
                <input 
                 id='op'
                  type="text" 
                  name="cardNumber"
                  placeholder="Card Number" 
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required 
                />
                <div className="row">
                  <input 
                    type="text" 
                    name="expiryDate"
                    placeholder="MM/YY" 
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required 
                  />
                  <input 
                    type="text" 
                    name="cvv"
                    placeholder="CVV" 
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <input 
                  type="text" 
                  name="nameOnCard"
                  placeholder="Name on Card" 
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  required 
                />
                <label className="billing-checkbox">
                  <input 
                    type="checkbox" 
                    name="billingAddressSame"
                    checked={formData.billingAddressSame}
                    onChange={handleInputChange}
                  />
                  Billing address same as shipping
                </label>
              </div>
            )}

           
            {paymentMethod === 'cod' && (
              <div className="cod-info">
                <div className="cod-message">
                  <h4 id="myHeading">📦 Cash on Delivery Selected</h4>
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

       
        <OrderSummary formData={formData} paymentMethod={paymentMethod} />
      </div>
    </div>
  );
};

export default Checkout;