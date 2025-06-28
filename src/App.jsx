// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageProducts from './pages/Admin/ManageProducts';

// Cart & Order Components
import Cart from './pages/Cart/Cart'; // formerly CartPage
import Checkout from './pages/Cart/Checkout'; // formerly CheckoutForm
import OrderSummary from './pages/Cart/OrderSummary';

import OrderSuccess from './pages/Cart/OrderSuccess'; // formerly OrderSuccessPage

// Product Pages
import ProductList from './pages/Products/ProductList'; 
import ProductDetails from './pages/Products/ProductDetails';


// Cart Context
import { CartProvider } from './pages/Cart/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/products" element={<ManageProducts />} />

          {/* Cart Flow Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Temporary test route to add products manually */}


          <Route path='/products' element={<ProductList/>}/>
           <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
