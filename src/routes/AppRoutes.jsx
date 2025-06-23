import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import AdminLayout from '../pages/Admin/index'; // You'll create this next
import DashboardHome from '../pages/Admin/DashboardHome'; // Placeholder
import PrivateRoute from './PrivateRoute';
import ProductList from '../pages/Admin/ManageProducts/ProductList';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        {/* You can later add nested routes here */}
      </Route>
      <Route path="/admin/products" element={<ProductList />} />
    </Routes>
  );
}
