import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const Registration = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 13 || formData.age > 120) {
      newErrors.age = 'Age must be between 13 and 120';
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send data to backend
      console.log('Form submitted:', formData);
      // Show success modal (without logging in)
      setShowSuccessModal(true);

      // Store registration data (optional)
      localStorage.setItem('registrationData', JSON.stringify(formData));
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1 className="registration-title">Gym Membership Registration</h1>
        <p className="registration-subtitle">Join our fitness community today</p>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Age Field */}
          <div className="form-group">
            <label htmlFor="age" className="form-label">
              Age <span className="required">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className={`form-input ${errors.age ? 'input-error' : ''}`}
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          {/* Gender Field */}
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender <span className="required">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              className={`form-input ${errors.gender ? 'input-error' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-register">
            Register
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Registration Successful!</h2>
              <button
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p className="success-message">
                Congratulations! Your registration is complete.
              </p>
              <p className="success-detail">
                You can now login with your email and password.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleCloseModal}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; Copyright 24071A05E7. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Registration;
