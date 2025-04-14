import React, { useState } from 'react';
import './CrowdfundSection.css';

export default function CrowdfundSection() {
  const [campaigns] = useState([
    {
      id: 1,
      title: "Flood Relief Fund",
      description: "Support victims of recent flooding in downtown area",
      goal: 50000,
      raised: 32000,
      image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=600"
    },
    {
      id: 2,
      title: "Hurricane Recovery",
      description: "Help rebuild homes damaged by the recent hurricane",
      goal: 100000,
      raised: 45000,
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=600"
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New campaign:', formData);
    // Here you would typically send this to your backend
  };

  return (
    <div className="crowdfund-container">
      {/* Create Campaign Section */}
      <div className="create-campaign-section">
        <h2>Create a Fundraising Campaign</h2>
        <form onSubmit={handleSubmit} className="campaign-form">
          <div className="form-group">
            <label htmlFor="title">Campaign Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter campaign title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your campaign"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="goal">Funding Goal ($)</label>
            <input
              type="number"
              id="goal"
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              placeholder="Enter funding goal"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              required
            />
          </div>
          <button type="submit" className="submit-button">Create Campaign</button>
        </form>
      </div>

      {/* Active Campaigns Section */}
      <div className="active-campaigns-section">
        <h2>Active Campaigns</h2>
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="campaign-card">
              <div className="campaign-image">
                <img src={campaign.image} alt={campaign.title} />
              </div>
              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <div className="campaign-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span>${campaign.raised.toLocaleString()} raised</span>
                    <span>of ${campaign.goal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="donate-button">Donate Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
