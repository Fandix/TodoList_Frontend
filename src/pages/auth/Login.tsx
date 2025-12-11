import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import { useAuth, useForm } from '../../hooks';
import './Login.css';
import LoginImage from '../../assets/login_image.avif';

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/signup', { state: { fromLogin: true } });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center">
            <div className="login-form-wrapper">
              <h2 className="login-title mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <FormInput
                    type="email"
                    placeholder="Enter Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    icon="bi bi-person"
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

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button type="submit" className="btn btn-login w-auto px-4 mb-4" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="create-account-text">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="create-link"
                  >
                    Create One
                  </button>
                </p>
              </form>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <div className="illustration-wrapper">
              <img src={LoginImage} alt="Todo List" className="illustration-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
