import { Routes, Route } from 'react-router-dom';

// Auth & Routing
import Login from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';

// Admin Layout & Pages
import AdminLayout from '../pages/Admin/index';
import DashboardHome from '../pages/Admin/DashboardHome';
import ProductList from '../pages/Admin/ManageProducts/ProductList';
import ProductForm from '../pages/Admin/ManageProducts/ProductForm';
import UserList from '../pages/Admin/ManageUsers/UserList';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* Admin Home Dashboard */}
        <Route index element={<DashboardHome />} />

        {/* Manage Products */}
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="new" element={<ProductForm />} />
          <Route path=":id/edit" element={<ProductForm />} />
        </Route>

        {/* Manage Users */}
        <Route path="users" element={<UserList />} />
      </Route>

      {/* Fallback Route (optional) */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}
