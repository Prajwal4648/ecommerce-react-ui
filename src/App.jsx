import { CartProvider } from './pages/Cart/CartContext';
import { Routes, Route } from 'react-router-dom';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';

// Cart & Order
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Cart/Checkout';
import OrderSummary from './pages/Cart/OrderSummary';
import OrderSuccess from './pages/Cart/OrderSuccess';

// Product Pages
import ProductList from './pages/Products/ProductList';
import ProductDetails from './pages/Products/ProductDetails';
import SearchResults from './pages/Products/SearchResults';

// Home & Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';

// Admin
import PrivateRoute from './routes/PrivateRoute';
import AdminLayout from './pages/Admin'; // index.jsx
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        {/* ---------- Public ---------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Cart & Orders */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />

        {/* ---------- Protected Admin ---------- */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Route>

        {/* Global 404 */}
        <Route path="*" element={<h2>404 ‑ Page Not Found</h2>} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
