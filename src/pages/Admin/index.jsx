// src/pages/Admin/index.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { KEY_IS_ADMIN } from '../../utils/constants';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(KEY_IS_ADMIN);
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-wrapper">
      
      <Outlet />
    </div>
  );
}
