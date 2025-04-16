import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          Disaster Alert
        </Link>
        <button 
          className={`menu-button ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link 
            to="/community" 
            className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Community
          </Link>
          <Link 
            to="/crowdfund" 
            className={`nav-link ${location.pathname === '/crowdfund' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Crowdfund
          </Link>
          <Link 
            to="/news" 
            className={`nav-link ${location.pathname === '/news' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Recent News
          </Link>
          <Link 
            to="/threat" 
            className={`nav-link ${location.pathname === '/threat' ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Threat Level
          </Link>
        </div>
      </div>
    </nav>
  );
} 