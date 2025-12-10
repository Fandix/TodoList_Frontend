import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth/authService';

function Home() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    setErrorMessage('');
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
    
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: '1px solid #ddd'
      }}>
        <h1>首頁</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          登出
        </button>
      </header>

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>歡迎來到 Todo List 應用</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>
          這是您的首頁，您可以在這裡管理您的待辦事項。
        </p>
      </div>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>    
  );
}

export default Home;
