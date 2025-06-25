// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';

import AdminLayout from '../pages/Admin/index';
import DashboardHome from '../pages/Admin/DashboardHome';

import ProductList from '../pages/Admin/ManageProducts/ProductList';
import ProductForm from '../pages/Admin/ManageProducts/ProductForm';

import UserList from '../pages/Admin/ManageUsers/UserList';
// (You can add UserForm later when you implement add/edit)

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* Dashboard Home */}
        <Route index element={<DashboardHome />} />

        {/* Products */}
        <Route path="products">
          <Route index element={<ProductList />} />
          <Route path="new" element={<ProductForm />} />
          <Route path=":id/edit" element={<ProductForm />} />
        </Route>

        {/* Users */}
        <Route path="users" element={<UserList />} />

        {/* 404 in Admin */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}
