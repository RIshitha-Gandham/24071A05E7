import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Contact form submitted:', formData);
      setShowSuccessModal(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="contact-container">
      {/* Header */}
      <div className="contact-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>

      <div className="contact-content">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h4>Address</h4>
                <p>123 Fitness Street, Gym City, GC 12345</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-details">
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-details">
                <h4>Email</h4>
                <p>support@gymmanagement.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">⏰</div>
              <div className="info-details">
                <h4>Business Hours</h4>
                <p>Mon - Fri: 6 AM - 10 PM</p>
                <p>Sat - Sun: 7 AM - 8 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Send us a Message</h2>

          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="your@email.com"
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

          {/* Subject Field */}
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject <span className="required">*</span>
            </label>
            <select
              id="subject"
              name="subject"
              className={`form-input ${errors.subject ? 'input-error' : ''}`}
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select a subject</option>
              <option value="membership">Membership Inquiry</option>
              <option value="classes">Class Information</option>
              <option value="billing">Billing Issue</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>

          {/* Message Field */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
              placeholder="Type your message here..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-contact">
            Send Message
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Message Sent Successfully!</h2>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p className="success-message">
                Thank you for contacting us!
              </p>
              <p className="success-detail">
                We will get back to you within 24 hours.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleCloseModal}
              >
                Back to Dashboard
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

export default Contact;
