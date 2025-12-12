import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

describe('useForm', () => {
  const initialValues = {
    email: '',
    password: '',
    name: 'Fandix',
  };

  it('should initialize with provided values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
  });

  it('should update a single field using handleChange', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email')('test@example.com');
    });

    expect(result.current.values.email).toBe('test@example.com');
    expect(result.current.values.password).toBe('');
    expect(result.current.values.name).toBe('Fandix');
  });

  it('should update multiple fields independently', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email')('test@example.com');
    });

    act(() => {
      result.current.handleChange('password')('secret123');
    });

    expect(result.current.values.email).toBe('test@example.com');
    expect(result.current.values.password).toBe('secret123');
  });

  it('should reset form to initial values', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange('email')('test@example.com');
      result.current.handleChange('password')('secret123');
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
  });

  it('should set multiple values at once using setFormValues', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.setFormValues({
        email: 'new@example.com',
        password: 'newpassword',
      });
    });

    expect(result.current.values.email).toBe('new@example.com');
    expect(result.current.values.password).toBe('newpassword');
    expect(result.current.values.name).toBe('Fandix');
  });

  it('should handle partial updates with setFormValues', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.setFormValues({ email: 'partial@example.com' });
    });

    expect(result.current.values.email).toBe('partial@example.com');
    expect(result.current.values.password).toBe('');
    expect(result.current.values.name).toBe('Fandix');
  });

  it('should work with different value types', () => {
    const typedInitialValues = {
      count: 0,
      isActive: false,
      items: [] as string[],
    };

    const { result } = renderHook(() => useForm(typedInitialValues));

    act(() => {
      result.current.setFormValues({ count: 5 });
    });

    expect(result.current.values.count).toBe(5);
  });
});
