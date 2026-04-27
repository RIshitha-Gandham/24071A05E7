import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planName = location.state?.plan || 'Premium Plan';
  const planPrice = location.state?.price || '$39';

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
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

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    if (!paymentData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!cardNumberRegex.test(paymentData.cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!paymentData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!expiryRegex.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Format: MM/YY';
    }

    const cvvRegex = /^[0-9]{3,4}$/;
    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!cvvRegex.test(paymentData.cvv)) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    if (!paymentData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'City is required';
    }

    const zipCodeRegex = /^[0-9]{5,6}$/;
    if (!paymentData.zipCode) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!zipCodeRegex.test(paymentData.zipCode)) {
      newErrors.zipCode = 'Zip code must be 5-6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccessModal(true);
      }, 2000);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="payment-container">
      {/* Header */}
      <div className="payment-header">
        <button className="btn-back" onClick={() => navigate('/membership-plans')}>
          ← Back to Plans
        </button>
        <h1>Payment</h1>
        <p>Complete your membership payment</p>
      </div>

      <div className="payment-content">
        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Plan:</span>
            <strong>{planName}</strong>
          </div>
          <div className="summary-item">
            <span>Price:</span>
            <strong>{planPrice}/month</strong>
          </div>
          <div className="summary-item">
            <span>Duration:</span>
            <strong>1 Month</strong>
          </div>
          <div className="summary-item total">
            <span>Total Amount:</span>
            <strong>{planPrice}</strong>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="payment-form">
          <h2>Payment Information</h2>

          {/* Cardholder Name */}
          <div className="form-group">
            <label htmlFor="cardName" className="form-label">
              Cardholder Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              className={`form-input ${errors.cardName ? 'input-error' : ''}`}
              placeholder="John Doe"
              value={paymentData.cardName}
              onChange={handleChange}
            />
            {errors.cardName && <span className="error-message">{errors.cardName}</span>}
          </div>

          {/* Card Number */}
          <div className="form-group">
            <label htmlFor="cardNumber" className="form-label">
              Card Number <span className="required">*</span>
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className={`form-input ${errors.cardNumber ? 'input-error' : ''}`}
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={handleChange}
              maxLength="16"
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          {/* Expiry and CVV */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date <span className="required">*</span>
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className={`form-input ${errors.expiryDate ? 'input-error' : ''}`}
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={handleChange}
              />
              {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv" className="form-label">
                CVV <span className="required">*</span>
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                className={`form-input ${errors.cvv ? 'input-error' : ''}`}
                placeholder="123"
                value={paymentData.cvv}
                onChange={handleChange}
                maxLength="4"
              />
              {errors.cvv && <span className="error-message">{errors.cvv}</span>}
            </div>
          </div>

          {/* Billing Address */}
          <div className="form-group">
            <label htmlFor="billingAddress" className="form-label">
              Billing Address <span className="required">*</span>
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              className={`form-input ${errors.billingAddress ? 'input-error' : ''}`}
              placeholder="123 Main Street"
              value={paymentData.billingAddress}
              onChange={handleChange}
            />
            {errors.billingAddress && (
              <span className="error-message">{errors.billingAddress}</span>
            )}
          </div>

          {/* City and Zip */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city" className="form-label">
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`form-input ${errors.city ? 'input-error' : ''}`}
                placeholder="New York"
                value={paymentData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="zipCode" className="form-label">
                Zip Code <span className="required">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className={`form-input ${errors.zipCode ? 'input-error' : ''}`}
                placeholder="10001"
                value={paymentData.zipCode}
                onChange={handleChange}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-payment"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Payment Successful!</h2>
            </div>
            <div className="modal-body">
              <div className="success-icon">✓</div>
              <p className="success-message">
                Your payment has been processed successfully!
              </p>
              <p className="success-detail">
                Your {planName} membership is now active.
              </p>
              <p className="payment-details">
                Transaction ID: #TXN{Math.random().toString().slice(2, 11)}
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleCloseModal}
              >
                Back to Dashboard
              </button>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; Copyright 24071A05E7. All rights reserved.</p>
      </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
