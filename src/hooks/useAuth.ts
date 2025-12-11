import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, logout as logoutService, register as registerService } from '../services/auth/authService';

/**
 * Custom hook for authentication operations
 * Encapsulates login, logout, and registration logic with error handling
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  /**
   * Handle user login
   */
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      await loginService(email, password);
      navigate('/home');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user logout
   */
  const logout = async () => {
    setLoading(true);
    setError('');
    try {
      await logoutService();
      navigate('/');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user registration
   */
  const register = async (email: string, password: string, passwordConfirmation: string) => {
    setLoading(true);
    setError('');
    try {
      await registerService(email, password, passwordConfirmation);
      navigate('/home');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setError('');
  };

  return {
    login,
    logout,
    register,
    loading,
    error,
    clearError,
  };
};
