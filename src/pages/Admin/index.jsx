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
    <div>
      {/* <h1>Admin Panel</h1>
      <nav>
        <Link to="/admin">Dashboard</Link> |{' '}
        <Link to="/admin/products">Manage Products</Link> |{' '}
        <Link to="/admin/users">Manage Users</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav> */}
      <hr />
      <Outlet />
    </div>
  );
}
