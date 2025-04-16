import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrowdfundSection.css';

export default function CrowdfundSection() {
  const navigate = useNavigate();
  const [campaigns] = useState([
    {
      id: 1,
      title: "Flood Relief Fund",
      description: "Support victims of recent flooding in downtown area. Providing emergency shelter, food, and medical supplies to affected families.",
      goal: 50000,
      raised: 32000,
      image: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=600"
    },
    {
      id: 2,
      title: "Hurricane Recovery",
      description: "Help rebuild homes damaged by the recent hurricane. Funds will support reconstruction efforts and temporary housing for displaced residents.",
      goal: 100000,
      raised: 45000,
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=600"
    },
    {
      id: 3,
      title: "Earthquake Response",
      description: "Emergency response for earthquake-affected communities. Providing search and rescue equipment, medical aid, and essential supplies.",
      goal: 75000,
      raised: 28000,
      image: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=600"
    },
    {
      id: 4,
      title: "Wildfire Relief",
      description: "Support firefighters and affected residents in wildfire zones. Funding protective equipment and evacuation assistance.",
      goal: 80000,
      raised: 62000,
      image: "https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?w=600"
    },
    {
      id: 5,
      title: "Drought Crisis Fund",
      description: "Providing water and resources to drought-affected regions. Supporting water delivery systems and sustainable agriculture initiatives.",
      goal: 40000,
      raised: 15000,
      image: "https://images.unsplash.com/photo-1504297050568-910d24c426d3?w=600"
    },
    {
      id: 6,
      title: "Tornado Recovery",
      description: "Rebuilding communities affected by recent tornadoes. Funding emergency repairs and community shelter reconstruction.",
      goal: 60000,
      raised: 38000,
      image: "https://images.unsplash.com/photo-1611128698014-ab4850f90677?w=600"
    },
    {
      id: 7,
      title: "Landslide Emergency",
      description: "Supporting communities impacted by devastating landslides. Providing temporary housing and slope stabilization efforts.",
      goal: 45000,
      raised: 12000,
      image: "https://images.unsplash.com/photo-1590502160462-58b41354f588?w=600"
    },
    {
      id: 8,
      title: "Tsunami Relief",
      description: "Emergency assistance for coastal communities affected by tsunami. Funding early warning systems and community preparedness.",
      goal: 120000,
      raised: 89000,
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600"
    },
    {
      id: 9,
      title: "Volcanic Evacuation",
      description: "Supporting evacuation efforts near active volcano. Providing transportation, temporary shelter, and emergency supplies.",
      goal: 70000,
      raised: 41000,
      image: "https://images.unsplash.com/photo-1614627264058-f3e35e86d424?w=600"
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    image: ''
  });

  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      goal: '',
      image: ''
    });
  };

  return (
    <div className="crowdfund-container">
      {/* Active Campaigns Section */}
      <div className="active-campaigns-section">
        <div className="section-header">
          <h2>Active Campaigns</h2>
          <button 
            className="create-campaign-button"
            onClick={() => setShowModal(true)}
          >
            Create Campaign
          </button>
        </div>
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
                <button 
                  className="donate-button"
                  onClick={() => navigate(`/campaign/${campaign.id}`)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create a Fundraising Campaign</h2>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
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
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
