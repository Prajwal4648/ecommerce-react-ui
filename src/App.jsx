import { Routes, Route } from 'react-router-dom';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageProducts from './pages/Admin/ManageProducts';

//login , register and profile
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';

// Cart & Order Components
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import OrderSummary from './pages/Cart/OrderSummary';
import OrderSuccess from './pages/Cart/OrderSuccess';

// Product Pages
import ProductList from './pages/Products/ProductList';
import ProductDetails from './pages/Products/ProductDetails';
import SearchResults from './pages/Products/SearchResults'; // ✅ Import for navbar search

// Cart Context
import { CartProvider } from './pages/Cart/CartContext';

// Home & Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login ,regoster and profile */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/products" element={<ManageProducts />} />

        {/* Cart and Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Products and Categories */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/category/:category" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        {/* Search Results */}
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
