import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import CommunitySection from './components/CommunitySection'
import CrowdfundSection from './components/CrowdfundSection';
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
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
