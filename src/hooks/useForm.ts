import { useState } from 'react';

/**
 * Generic form state management hook
 * @param initialValues - Initial form values
 */
export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  /**
   * Handle input change
   */
  const handleChange = (name: keyof T) => (value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Reset form to initial values
   */
  const reset = () => {
    setValues(initialValues);
  };

  /**
   * Set multiple values at once
   */
  const setFormValues = (newValues: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...newValues,
    }));
  };

  return {
    values,
    handleChange,
    reset,
    setFormValues,
  };
};
