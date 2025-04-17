import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './UserLocation.css';

// Fix Leaflet default icon issue
let defaultIcon;
try {
  delete L.Icon.Default.prototype._getIconUrl;
  
  defaultIcon = L.icon({
    iconRetinaUrl: icon,
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: icon,
    iconUrl: icon,
    shadowUrl: iconShadow
  });
} catch (e) {
  console.error("Error setting up Leaflet icons", e);
  // Fallback icon in case of error
  defaultIcon = L.divIcon({
    className: 'default-marker-icon',
    html: '<div style="background-color:blue;width:20px;height:20px;border-radius:50%;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
}

// Component to force map update when location changes
const MapView = ({ center, zoom, children }) => {
  const map = L.map('map-container');
  
  useEffect(() => {
    if (map && center) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom]);
  
  return children;
};

const UserLocation = () => {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState('Loading...');
  
  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          console.log('Location obtained:', locationData);
          setLocation(locationData);
          setStatus('Location found!');
        },
        (error) => {
          console.error('Geolocation error:', error);
          setStatus(`Unable to retrieve your location: ${error.message}`);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      setStatus('Geolocation is not supported by your browser');
    }
  }, []);
  
  // If no location is found yet, show a loading state
  if (!location) {
    return (
      <div className="location-container">
        <h1 className="location-title">Your Current Location</h1>
        <div className="status">{status}</div>
        <div className="location-note">
          {status === 'Locating...' ? 
            'Please allow location access when prompted by your browser.' : 
            'Unable to access your location. Please check your browser settings and try again.'}
        </div>
      </div>
    );
  }
  
  return (
    <div className="location-container">
      <h1 className="location-title">Your Current Location</h1>
      <div className="status">{status}</div>
      
      <div className="location-info">
        <p>Latitude: {location.lat.toFixed(6)}</p>
        <p>Longitude: {location.lng.toFixed(6)}</p>
        <p>Accuracy: ~{Math.round(location.accuracy)}m</p>
      </div>
      
      <MapContainer 
        center={[location.lat, location.lng]} 
        zoom={13} 
        className="map-container"
        id="map-container"
        whenCreated={mapInstance => {
          console.log("Map created successfully");
          mapInstance.invalidateSize();
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[location.lat, location.lng]} 
          icon={defaultIcon}
        >
          <Popup>
            You are here <br />
            Accuracy: ~{Math.round(location.accuracy)}m
          </Popup>
        </Marker>
        <Circle 
          center={[location.lat, location.lng]}
          radius={location.accuracy}
          pathOptions={{ 
            color: 'blue', 
            fillColor: '#3388ff', 
            fillOpacity: 0.1 
          }}
        />
      </MapContainer>
      
      <div className="location-note">
        This map shows your current location. The blue circle represents the accuracy range of your location data.
      </div>
    </div>
  );
};

export default UserLocation; 