import React from 'react';
import './FormInput.css';

interface FormInputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: string;
  required?: boolean;
}

function FormInput({
  type,
  placeholder,
  value,
  onChange,
  icon,
  required = false,
}: FormInputProps) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <i className={icon}></i>
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default FormInput;
