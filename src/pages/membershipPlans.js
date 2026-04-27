import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$19',
      duration: '/month',
      description: 'Perfect for beginners',
      features: [
        'Gym access during business hours',
        'Access to cardio machines',
        'Access to basic weights',
        'Basic fitness consultation',
        'Email support',
      ],
      color: 'basic',
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '$39',
      duration: '/month',
      description: 'Most popular choice',
      features: [
        'Unlimited gym access',
        'All cardio and strength equipment',
        'Personal trainer sessions (2/month)',
        'Group fitness classes',
        'Nutrition guidance',
        'Priority phone support',
      ],
      color: 'premium',
      recommended: true,
    },
    {
      id: 3,
      name: 'Elite Plan',
      price: '$59',
      duration: '/month',
      description: 'Maximum benefits',
      features: [
        '24/7 gym access',
        'All equipment and facilities',
        'Unlimited personal training',
        'All group classes + exclusive sessions',
        'One-on-one nutrition planning',
        '24/7 VIP support',
        'Free merchandise',
      ],
      color: 'elite',
    },
  ];

  const handleSelectPlan = (planName, planPrice) => {
    navigate('/payment', { state: { plan: planName, price: planPrice } });
  };

  return (
    <div className="membership-container">
      {/* Header */}
      <div className="membership-header">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Our Membership Plans</h1>
        <p>Choose the perfect plan for your fitness journey</p>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card plan-${plan.color} ${plan.recommended ? 'recommended' : ''}`}
          >
            {plan.recommended && (
              <div className="recommended-badge">⭐ RECOMMENDED</div>
            )}
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-price">
              <span className="price">{plan.price}</span>
              <span className="duration">{plan.duration}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <span className="feature-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`btn btn-select-plan ${plan.color}`}
              onClick={() => handleSelectPlan(plan.name, plan.price)}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="plans-info">
        <h3>Why Choose Our Gym?</h3>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🏋️</div>
            <h4>State-of-the-art Equipment</h4>
            <p>Latest fitness equipment and facilities</p>
          </div>
          <div className="info-card">
            <div className="info-icon">👨‍🏫</div>
            <h4>Expert Trainers</h4>
            <p>Certified and experienced fitness professionals</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🌟</div>
            <h4>Community Support</h4>
            <p>Join a supportive fitness community</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; Copyright 24071A05E7. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MembershipPlans;
