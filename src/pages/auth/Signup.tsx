import { useEffect, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import { useAuth, useForm } from '../../hooks';
import { LoginLocationState } from '../../types/navigation';
import { MIN_PASSWORD_LENGTH } from '../../constants';
import './Signup.css';
import signupImage from '../../assets/signup_image.webp';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading, error, clearError } = useAuth();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const state = location.state as LoginLocationState;
    if (!state || !state.fromLogin) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (values.password !== values.confirmPassword) {
      return;
    }
    if (values.password.length < MIN_PASSWORD_LENGTH) {
      return;
    }

    try {
      await register(values.email, values.password, values.confirmPassword);
    } catch (error) {
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const getValidationError = (): string => {
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      return 'Password does not match, please confirm again.';
    }
    if (values.password && values.password.length < MIN_PASSWORD_LENGTH) {
      return `The password length must be greater than ${MIN_PASSWORD_LENGTH} characters.`;
    }
    return '';
  };

  const validationError = getValidationError();
  const displayError = validationError || error;

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center">
            <div className="signup-form-wrapper">
              <h2 className="signup-title mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <FormInput
                    type="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    icon="bi bi-envelope"
                    required
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    type="password"
                    placeholder="Enter Password"
                    value={values.password}
                    onChange={handleChange('password')}
                    icon="bi bi-lock"
                    required
                  />
                </div>

                <div className="mb-3">
                  <FormInput
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    icon="bi bi-lock-fill"
                    required
                  />
                </div>

                {displayError && (
                  <div className="alert alert-danger" role="alert">
                    {displayError}
                  </div>
                )}

                <button type="submit" className="btn btn-signup w-auto px-4 mb-4" disabled={loading || !!validationError}>
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                <p className="back-to-login-text">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={handleBackToLogin}
                    className="login-link"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <div className="illustration-wrapper">
              <img src={signupImage} alt="Todo List" className="illustration-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
