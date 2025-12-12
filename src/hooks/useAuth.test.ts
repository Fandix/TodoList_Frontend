import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockLoginService = jest.fn();
const mockLogoutService = jest.fn();
const mockRegisterService = jest.fn();

jest.mock('../services/auth/authService', () => ({
  login: (...args: unknown[]) => mockLoginService(...args),
  logout: (...args: unknown[]) => mockLogoutService(...args),
  register: (...args: unknown[]) => mockRegisterService(...args),
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have loading as false initially', () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.loading).toBe(false);
    });

    it('should have empty error initially', () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.error).toBe('');
    });
  });

  describe('login', () => {
    it('should call login service with email and password', async () => {
      mockLoginService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(mockLoginService).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should navigate to /home on successful login', async () => {
      mockLoginService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('should set loading to true during login', async () => {
      let resolveLogin: () => void;
      mockLoginService.mockImplementationOnce(
        () => new Promise<void>((resolve) => { resolveLogin = resolve; })
      );

      const { result } = renderHook(() => useAuth());

      act(() => {
        result.current.login('test@example.com', 'password123');
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolveLogin!();
      });

      expect(result.current.loading).toBe(false);
    });

    it('should set error on login failure', async () => {
      mockLoginService.mockRejectedValueOnce(new Error('Invalid credentials'));
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.login('test@example.com', 'wrongpassword');
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Invalid credentials');
    });

    it('should throw error on login failure', async () => {
      const error = new Error('Invalid credentials');
      mockLoginService.mockRejectedValueOnce(error);
      const { result } = renderHook(() => useAuth());

      await expect(
        act(async () => {
          await result.current.login('test@example.com', 'wrongpassword');
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logout', () => {
    it('should call logout service', async () => {
      mockLogoutService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockLogoutService).toHaveBeenCalled();
    });

    it('should navigate to / on successful logout', async () => {
      mockLogoutService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.logout();
      });

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should set error on logout failure', async () => {
      mockLogoutService.mockRejectedValueOnce(new Error('Logout failed'));
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.logout();
        } catch {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Logout failed');
    });
  });

  describe('register', () => {
    it('should call register service with email, password, and confirmation', async () => {
      mockRegisterService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.register('test@example.com', 'password123', 'password123');
      });

      expect(mockRegisterService).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
        'password123'
      );
    });

    it('should navigate to /home on successful registration', async () => {
      mockRegisterService.mockResolvedValueOnce(undefined);
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.register('test@example.com', 'password123', 'password123');
      });

      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });

    it('should set error on registration failure', async () => {
      mockRegisterService.mockRejectedValueOnce(new Error('Email already exists'));
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        try {
          await result.current.register('test@example.com', 'password123', 'password123');
        } catch {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Email already exists');
    });
  });
});
