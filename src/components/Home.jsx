import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Disaster Alert</h1>
      <div className="home-content">
        <p>Welcome to Disaster Alert - Your Community Safety Platform</p>
        <button 
          className="community-button"
          onClick={() => navigate('/community')}
        >
          Go to Community
        </button>
        <button className='crowdfund-button' 
        onClick={() => navigate('/crowdfund')}>
          Crowdfund
        </button> 
      </div>
    </div>
  );
} 