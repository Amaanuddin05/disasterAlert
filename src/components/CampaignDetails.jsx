import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CampaignDetails.css';

export default function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // This would typically come from an API/database
  const [campaign] = useState({
    id: parseInt(id),
    title: "Flood Relief Fund",
    description: "Support victims of recent flooding in downtown area. Providing emergency shelter, food, and medical supplies to affected families. Our team is working directly with local emergency services to ensure aid reaches those most in need. Your donation will help provide:\n\n- Emergency shelter and temporary housing\n- Food and clean water supplies\n- Medical supplies and first aid kits\n- Hygiene products and sanitation items\n- Clothing and blankets\n- Emergency evacuation support",
    goal: 50000,
    raised: 32000,
    image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=600",
    updates: [
      {
        date: "2024-03-15",
        content: "Successfully provided emergency shelter to 50 families. Medical supplies distributed to local clinics."
      },
      {
        date: "2024-03-10",
        content: "First response team deployed. Initial assessment of affected areas completed."
      }
    ],
    topDonors: [
      { name: "John D.", amount: 5000, date: "2024-03-14" },
      { name: "Sarah M.", amount: 3000, date: "2024-03-13" },
      { name: "Anonymous", amount: 2500, date: "2024-03-12" },
      { name: "Michael R.", amount: 2000, date: "2024-03-11" },
      { name: "Emily W.", amount: 1500, date: "2024-03-10" }
    ]
  });

  const [showDonationForm, setShowDonationForm] = useState(false);
  const [donationData, setDonationData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationData({
      ...donationData,
      [name]: value
    });
  };

  const handleDonationClick = () => {
    setShowDonationForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Navigate to checkout page with donation data
    navigate('/checkout', { 
      state: { 
        donationData,
        campaign: {
          id: campaign.id,
          title: campaign.title,
          image: campaign.image
        }
      } 
    });
  };

  return (
    <div className="campaign-details-container">
      <div className="campaign-header">
        <img src={campaign.image} alt={campaign.title} className="campaign-hero-image" />
        <div className="campaign-title-section">
          <h1>{campaign.title}</h1>
          <div className="campaign-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <div className="raised-amount">
                <h2>₹{campaign.raised.toLocaleString()}</h2>
                <p>raised of ₹{campaign.goal.toLocaleString()} goal</p>
              </div>
              <button className="donate-button" onClick={handleDonationClick}>
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDonationForm && (
        <div className="donation-form-overlay">
          <div className="donation-form-container">
            <h2>Make a Donation</h2>
            <form onSubmit={handleFormSubmit} className="donation-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={donationData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donationData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={donationData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Donation Amount (₹)</label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  min="1"
                  value={donationData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={() => setShowDonationForm(false)}>Cancel</button>
                <button type="submit" className="proceed-button">Proceed to Checkout</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="campaign-content-grid">
        <div className="main-content">
          <section className="about-section">
            <h2>About this campaign</h2>
            <p className="description">{campaign.description}</p>
          </section>

          <section className="updates-section">
            <h2>Campaign Updates</h2>
            <div className="updates-list">
              {campaign.updates.map((update, index) => (
                <div key={index} className="update-card">
                  <div className="update-date">{update.date}</div>
                  <p>{update.content}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar">
          <section className="top-donors-section">
            <h2>Top Donors</h2>
            <div className="donors-list">
              {campaign.topDonors.map((donor, index) => (
                <div key={index} className="donor-card">
                  <div className="donor-info">
                    <span className="donor-name">{donor.name}</span>
                    <span className="donor-amount">₹{donor.amount.toLocaleString()}</span>
                  </div>
                  <div className="donor-date">{donor.date}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 