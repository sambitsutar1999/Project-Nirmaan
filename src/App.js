// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import DonationForm from './components/DonationForm';
import DonationList from './components/DonationList';
import Register from './components/Register';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import { getCurrentUser, logout } from './utils/auth';
import 'leaflet/dist/leaflet.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getCurrentUser());


  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/donate" element={isAuthenticated ? <DonationForm /> : <Navigate to="/login" />} />
          <Route path="/donations" element={isAuthenticated ? <DonationList /> : <Navigate to="/login" />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register onRegister={handleRegister} />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/admin" element={isAuthenticated && getCurrentUser()?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
