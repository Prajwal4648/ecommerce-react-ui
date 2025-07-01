// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Auth/Login';
import PrivateRoute from './PrivateRoute';

import AdminLayout    from '../pages/Admin';            // index.jsx
import AdminDashboard from '../pages/Admin/AdminDashboard';

// (Users, Products imports gone)

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---------- Public ---------- */}
      <Route path="/login" element={<Login />} />

      {/* ---------- Protected Admin ---------- */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* Admin home = dashboard */}
        <Route index element={<AdminDashboard />} />

        {/* Fallback inside /admin */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<h2>404 ‑ Page Not Found</h2>} />
    </Routes>
  );
}
