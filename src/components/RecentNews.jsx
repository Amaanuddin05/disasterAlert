import React, { useEffect, useState } from 'react';
import './RecentNews.css';

export default function RecentNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.reliefweb.int/v1/reports?appname=disasteralert&preset=latest&limit=12&query[value]=disaster'
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('News data:', data); // Debug log
        
        if (data && data.data && Array.isArray(data.data)) {
          setNews(data.data);
        } else {
          throw new Error('Unexpected API response format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('News fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      // Ignore the error and return a fallback
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="news-container">
        <h1>Recent Disaster News</h1>
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <h1>Recent Disaster News</h1>
        <div className="error-message">
          <p>Error loading news: {error}</p>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="news-container">
        <h1>Recent Disaster News</h1>
        <div className="error-message">
          <p>No news articles found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h1>Recent Disaster News</h1>
      <div className="news-grid">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            {item.fields.file && item.fields.file.url && (
              <div className="news-image">
                <img src={item.fields.file.url} alt={item.fields.title} />
              </div>
            )}
            {!item.fields.file?.url && (
              <div className="news-image no-image">
                <div className="placeholder-image">News</div>
              </div>
            )}
            <div className="news-content">
              <h2>{item.fields.title || 'Untitled'}</h2>
              <div className="news-meta">
                <span className="news-date">
                  {item.fields.date ? formatDate(item.fields.date.created) : 'Unknown date'}
                </span>
                {item.fields.source && item.fields.source.length > 0 && (
                  <span className="news-source">{item.fields.source[0].name}</span>
                )}
              </div>
              <p className="news-description">
                {item.fields.body 
                  ? `${item.fields.body.slice(0, 200)}...` 
                  : 'No description available'}
              </p>
              {item.fields.url && (
                <a 
                  href={item.fields.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more-button"
                >
                  Read More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 