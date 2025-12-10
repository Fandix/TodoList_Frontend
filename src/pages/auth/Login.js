import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginImage from '../../assets/login_image.avif';
import { login } from '../../services/auth/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCreateAccount = (e) => {
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
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-login w-auto px-4 mb-4">
                  Login
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
