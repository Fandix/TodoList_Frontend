import { ErrorInfo } from 'react';
import './ErrorBoundary.css';

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
}

function ErrorFallback({ error, errorInfo, onReset }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-boundary-container">
      <div className="error-boundary-content">
        <div className="error-icon">
          <i className="bi bi-exclamation-triangle"></i>
        </div>

        <h1 className="error-title">Oops! Something went wrong</h1>

        <p className="error-message">
          We're sorry for the inconvenience. An unexpected error has occurred.
        </p>

        {isDevelopment && error && (
          <div className="error-details">
            <details>
              <summary>Error Details (Development Only)</summary>
              <div className="error-stack">
                <p><strong>Error:</strong> {error.toString()}</p>
                {errorInfo && (
                  <pre>{errorInfo.componentStack}</pre>
                )}
              </div>
            </details>
          </div>
        )}

        <div className="error-actions">
          <button className="btn-primary" onClick={onReset}>
            Try Again
          </button>
          <button className="btn-secondary" onClick={handleReload}>
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
