// src/App.js
import { Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageProducts from './pages/Admin/ManageProducts';

// Cart & Order Components
import Cart from './pages/Cart/Cart'; 
import Checkout from './pages/Cart/Checkout'; 
import OrderSummary from './pages/Cart/OrderSummary';
import OrderSuccess from './pages/Cart/OrderSuccess'; 

// Product Pages
import ProductList from './pages/Products/ProductList';
import ProductDetails from './pages/Products/ProductDetails';


// Cart Context
import { CartProvider } from './pages/Cart/CartContext';


//home components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';


function App() {
  return (
    <><CartProvider>
      <Navbar />
      <Routes>
        { /* home Routes */}
        <Route path="/" element={<Home />} />
   

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/products" element={<ManageProducts />} />

        {/* Cart Flow Routes */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/*add products route*/}
        <Route path='/products' element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </CartProvider>
    </>
  );
}

export default App;
