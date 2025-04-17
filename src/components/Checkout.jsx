import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get donation data from navigation state
  const { donationData, campaign } = location.state || {};

  useEffect(() => {
    // Redirect if no donation data is provided
    if (!donationData || !campaign) {
      navigate('/');
    }
  }, [donationData, campaign, navigate]);

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Implementation of payment gateway
    const options = {
      key: 'rzp_test_uR6R221eI2qJQP',
      amount: donationData.amount * 100, // Convert to smallest currency unit
      name: 'Disaster Alert',
      description: `Donation for ${campaign.title}`,
      image: campaign.image,
      handler: function(response) {
        setIsProcessing(false);
        // Show success message and redirect to campaign page
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        navigate(`/campaign/${campaign.id}`);
      },
      prefill: {
        name: donationData.name,
        email: donationData.email,
        contact: donationData.phone
      },
      theme: {
        color: '#14213d'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function() {
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    });
    rzp.open();
  };

  const handleCancel = () => {
    navigate(`/campaign/${campaign.id}`);
  };

  if (!donationData || !campaign) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1>Donation Checkout</h1>
        
        <div className="campaign-summary">
          <img src={campaign.image} alt={campaign.title} className="campaign-thumbnail" />
          <div className="campaign-info">
            <h2>{campaign.title}</h2>
          </div>
        </div>
        
        <div className="donation-summary">
          <h3>Donation Summary</h3>
          
          <div className="summary-item">
            <span>Donor Name:</span>
            <span>{donationData.name}</span>
          </div>
          
          <div className="summary-item">
            <span>Email:</span>
            <span>{donationData.email}</span>
          </div>
          
          <div className="summary-item">
            <span>Phone:</span>
            <span>{donationData.phone}</span>
          </div>
          
          <div className="summary-item highlight">
            <span>Donation Amount:</span>
            <span>₹{donationData.amount}</span>
          </div>
        </div>
        
        <div className="checkout-actions">
          <button className="cancel-btn" onClick={handleCancel} disabled={isProcessing}>
            Cancel
          </button>
          <button className="pay-btn" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay ₹${donationData.amount}`}
          </button>
        </div>
      </div>
    </div>
  );
} 