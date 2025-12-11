import { Navigate } from 'react-router-dom';
import { STORAGE_KEYS } from '../constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected Route Component
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
