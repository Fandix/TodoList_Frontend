import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Signup.css';
import signupImage from '../../assets/signup_image.webp';
import { register } from '../../services/auth/authService';

function Signup() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const MIN_PASSWORD_LENGTH = 6;

  useEffect(() => {
    if (!location.state || !(location.state as any).fromLogin) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Password does not match, please confirm again.');
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage(`The password length must be greater than ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    try {
      await register(email, password, confirmPassword);
      navigate('/home');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }

    // navigate('/home');
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="row g-0">
          <div className="col-md-6 d-flex align-items-center">
            <div className="signup-form-wrapper">
              <h2 className="signup-title mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
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

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-lock-fill"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-signup w-auto px-4 mb-4">
                  Sign Up
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
