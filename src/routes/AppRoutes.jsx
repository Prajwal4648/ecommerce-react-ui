import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import AdminLayout from '../pages/Admin/index';
import DashboardHome from '../pages/Admin/DashboardHome';
import PrivateRoute from './PrivateRoute';
import ProductList from '../pages/Admin/ManageProducts/ProductList';
import ProductForm from '../pages/Admin/ManageProducts/ProductForm'; // ✅ Make sure this is added

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
        {/* ✅ All inside admin layout */}
        <Route index element={<DashboardHome />} />
        <Route path="products" element={<ProductList />} />
        <Route path="manage-products/edit/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  );
}
