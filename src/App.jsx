import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CommunitySection from './components/CommunitySection'
import CrowdfundSection from './components/CrowdfundSection';
import CampaignDetails from './components/CampaignDetails';
import Checkout from './components/Checkout';
import UserLocation from './components/UserLocation';
import RecentNews from './components/RecentNews';
import ThreatSeverityIndicator from './components/ThreatSeverityIndicator';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/community" element={<CommunitySection />} />
            <Route path="/crowdfund" element={<CrowdfundSection />} />
            <Route path="/campaign/:id" element={<CampaignDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/location" element={<UserLocation />} />
            <Route path="/news" element={<RecentNews />} />
            <Route path="/threat" element={
              <div className="threat-page">
                <h1 className="threat-page-title">Current Threat Assessment</h1>
                <div className="threat-indicator-container">
                  <ThreatSeverityIndicator threatLevel={2} />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
