import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2 className="brand-title">💪 Gym Management System</h2>
        </div>
        <div className="nav-actions">
          {!isLoggedIn ? (
            <>
              <button
                className="btn btn-nav"
                onClick={() => handleButtonClick('/register')}
              >
                Register
              </button>
              <button
                className="btn btn-nav"
                onClick={() => handleButtonClick('/login')}
              >
                Login
              </button>
              <button
                className="btn btn-nav"
                onClick={() => handleButtonClick('/contact')}
              >
                Contact
              </button>
            </>
          ) : (
            <>
              <span className="user-greeting">Welcome, {user.name || user.email}!</span>
              <button
                className="btn btn-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="dashboard-hero">
          {!isLoggedIn ? (
            <>
              <h1 className="hero-title">Welcome to Gym Management System</h1>
              <p className="hero-subtitle">
                Join our fitness community and achieve your fitness goals
              </p>
            </>
          ) : (
            <>
              <h1 className="hero-title">Welcome to Your Dashboard, {user.name || 'Member'}!</h1>
              <p className="hero-subtitle">
                Manage your membership and explore our services
              </p>
            </>
          )}
        </div>

        {/* Buttons Grid */}
        <div className="dashboard-buttons">
          {!isLoggedIn ? (
            <>
              {/* Not Logged In - Keep empty, buttons are in header */}
            </>
          ) : (
            <>
              {/* Logged In - Show Membership Plans, Payment, Contact */}
              <button
                className="dashboard-btn btn-membership-large"
                onClick={() => handleButtonClick('/membership-plans')}
              >
                <div className="btn-icon">🎯</div>
                <h3>Membership Plans</h3>
                <p>View and upgrade plans</p>
              </button>

              <button
                className="dashboard-btn btn-payment-large"
                onClick={() => handleButtonClick('/payment')}
              >
                <div className="btn-icon">💳</div>
                <h3>Payment</h3>
                <p>Manage payments</p>
              </button>

              <button
                className="dashboard-btn btn-contact-large"
                onClick={() => handleButtonClick('/contact')}
              >
                <div className="btn-icon">📞</div>
                <h3>Contact</h3>
                <p>Contact our support team</p>
              </button>
            </>
          )}
        </div>
      </div>

        {/* Footer */}
      <footer className="app-footer">
        <p>&copy; Copyright 24071A05E7. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
