import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CampaignDetails.css';

export default function CampaignDetails() {
  const { id } = useParams();
  
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

  const handleDonation = () => {
    const options = {
      key: 'rzp_test_uR6R221eI2qJQP',
      amount: 1000,
      name: 'Disaster Alert',
      description: `Donation for ${campaign.title}`,
      image: campaign.image,
      handler: function(response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#14213d'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
                <h2>${campaign.raised.toLocaleString()}</h2>
                <p>raised of ${campaign.goal.toLocaleString()} goal</p>
              </div>
              <button className="donate-button" onClick={handleDonation}>
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>

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
                    <span className="donor-amount">${donor.amount.toLocaleString()}</span>
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