import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCart } from './CartContext';
import './OrderSummary.css';

const OrderSummary = ({ formData, paymentMethod }) => {
  const { cartItems, discount, isPromoApplied } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = 14.40;
  const total = subtotal + shipping + tax - discount;


  const handleCompleteOrder = () => {

    if (!formData || !formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all required fields in the checkout form.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.nameOnCard) {
        alert('Please fill in all card payment details.');
        return;
      }
    }

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      paymentMethod: paymentMethod === 'card' ? 'Card Payment' : 'Cash on Delivery',
      total: `₹${total.toFixed(2)}`,
      subtotal: `₹${subtotal.toFixed(2)}`,
      shipping: shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`,
      tax: `₹${tax.toFixed(2)}`,
      discount: isPromoApplied ? `₹${discount.toFixed(2)}` : '₹0.00',
      customerInfo: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone
      },
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        apartment: formData.apartment || '',
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.title,
        quantity: item.quantity,
        price: `₹${item.price.toFixed(2)}`,
        total: `₹${(item.price * item.quantity).toFixed(2)}`,
        image: item.image
      }))
    };

  
    navigate('/order-success', { state: { orderData } });
  };

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
            Discount (QUICK25) <span>-₹{discount.toFixed(2)}</span>
          </p>
        )}
        <hr />
        <p className="total">
          Total <span>₹{total.toFixed(2)}</span>
        </p>
      </div>

      <button className="complete-order-btn" onClick={handleCompleteOrder}>
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