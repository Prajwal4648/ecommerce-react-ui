import { Navigate } from 'react-router-dom';
import { KEY_IS_ADMIN } from '../utils/constants';

export default function PrivateRoute({ children }) {
  const isAdmin = localStorage.getItem(KEY_IS_ADMIN) === 'true';
  return isAdmin ? children : <Navigate to="/login" />;
}
