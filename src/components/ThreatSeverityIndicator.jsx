// import { useState, useEffect } from 'react';
import './ThreatSeverityIndicator.css'; // Import the CSS file

// This component takes a threatLevel prop (0-3) and displays it visually
export default function ThreatSeverityIndicator({ threatLevel = 0 }) {
  // Ensure the threat level is valid (0-3)
  const validThreatLevel = Math.min(Math.max(parseInt(threatLevel), 0), 3);
  
  // Calculate the percentage for the pointer position (0%, 33.33%, 66.66%, or 100%)
  const pointerPosition = (validThreatLevel / 3) * 100;
  
  // Define the colors for each threat level
  const colors = {
    0: "#22c55e", // Green - No threat
    1: "#fbbf24", // Yellow - Slight threat
    2: "#f97316", // Orange - Moderate threat
    3: "#ef4444"  // Red - Severe threat
  };
  
  // Labels for each threat level
  const labels = {
    0: "No Threat",
    1: "Slight Threat",
    2: "Moderate Threat",
    3: "Severe Threat"
  };

  return (
    <div className="threat-container">
      <h2 className="threat-title">Threat Level</h2>
      
      {/* Pointer and current level indicator */}
      <div className="pointer-container">
        <div 
          className="pointer"
          style={{ 
            left: `${pointerPosition}%`,
          }}
        >
          <div className="pointer-inner">
            <div className="pointer-triangle"></div>
          </div>
        </div>
      </div>
      
      {/* Bar container */}
      <div className="bar-container">
        {/* Gradient bar */}
        <div className="gradient-bar">
          <div className="section green-section"></div>
          <div className="section yellow-section"></div>
          <div className="section orange-section"></div>
          <div className="section red-section"></div>
        </div>
        
        {/* Filled section up to the threat level */}
        <div 
          className="filled-section"
          style={{ width: `${pointerPosition}%` }}
        ></div>
        
        {/* Level markers */}
        <div className="level-markers">
          {[0, 1, 2, 3].map(level => (
            <div key={level} className="marker">
              {level > 0 && (
                <div className="marker-line"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Level labels */}
      <div className="level-labels">
        <div>No threat</div>
        <div>Low</div>
        <div>Moderate</div>
        <div>Severe</div>
      </div>
      
      {/* Current threat level text */}
      <div 
        className="threat-label"
        style={{ 
          backgroundColor: colors[validThreatLevel], 
          color: validThreatLevel === 0 ? '#000' : '#fff' 
        }}
      >
        {labels[validThreatLevel]}
      </div>
    </div>
  );
}