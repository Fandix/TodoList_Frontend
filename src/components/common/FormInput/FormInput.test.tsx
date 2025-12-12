import { render, screen, fireEvent } from '@testing-library/react';
import FormInput from './FormInput';

describe('FormInput', () => {
  const defaultProps = {
    type: 'text' as const,
    placeholder: 'Enter text',
    value: '',
    onChange: jest.fn(),
    icon: 'bi bi-person',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with placeholder', () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(<FormInput {...defaultProps} />);
    // eslint-disable-next-line testing-library/no-node-access
    const icon = document.querySelector('.bi-person');
    expect(icon).toBeInTheDocument();
  });

  it('should display the provided value', () => {
    render(<FormInput {...defaultProps} value="test value" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should call onChange when input value changes', () => {
    const onChange = jest.fn();
    render(<FormInput {...defaultProps} onChange={onChange} />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(onChange).toHaveBeenCalledWith('new value');
  });

  it('should render as email input when type is email', () => {
    render(<FormInput {...defaultProps} type="email" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should render as password input when type is password', () => {
    render(<FormInput {...defaultProps} type="password" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should have required attribute when required is true', () => {
    render(<FormInput {...defaultProps} required={true} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeRequired();
  });

  it('should not have required attribute when required is false', () => {
    render(<FormInput {...defaultProps} required={false} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).not.toBeRequired();
  });

  it('should have Bootstrap form-control class', () => {
    render(<FormInput {...defaultProps} />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('form-control');
  });
});
