
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('checkoutDetails', JSON.stringify(form));
    navigate('/order-summary');
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" required type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea placeholder="Address" required onChange={(e) => setForm({ ...form, address: e.target.value })}></textarea>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
