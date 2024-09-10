// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import styles from './Login.module.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password, isAdmin)) {
      onLogin();
      if (isAdmin) {
        navigate('/admin'); // Redirect to admin page on admin login
      } else {
        navigate('/'); // Redirect to home or another page for regular users
      }
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSide}></div>
        <div className={styles.formSide}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
              Admin Login
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      
    </div>
  );
};

export default Login;
