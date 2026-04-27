import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Registration = () => {
  const navigate = useNavigate();

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

    // Clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Age (convert to number)
    const age = Number(formData.age);
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (age < 13 || age > 120) {
      newErrors.age = 'Age must be between 13 and 120';
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    // Phone
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
      console.log('Form submitted:', formData);

      // Remove sensitive data before storing
      const { password, confirmPassword, ...safeData } = formData;
      localStorage.setItem('registrationData', JSON.stringify(safeData));

      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1 className="registration-title">Gym Membership Registration</h1>
        <p className="registration-subtitle">Join our fitness community today</p>

        <form onSubmit={handleSubmit} className="registration-form">

          {/* Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              className={`form-input ${errors.phone ? 'input-error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              name="age"
              className={`form-input ${errors.age ? 'input-error' : ''}`}
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender *</label>
            <select
              name="gender"
              className={`form-input ${errors.gender ? 'input-error' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          {/* ✅ Fixed Link */}
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Registration Successful!</h2>
            <p>You can now login.</p>
            <button onClick={handleCloseModal}>Go to Login</button>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>&copy; 24071A05E7. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Registration;