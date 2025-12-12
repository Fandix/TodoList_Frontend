import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (name: keyof T) => (value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialValues);
  };

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
