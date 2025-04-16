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
        const apiKey = '45ee229485b44ca18f88b80daff416d9';
        // Use qInTitle to filter for these terms only in the title
        const query = '"natural disaster" OR earthquake OR flood OR hurricane OR tsunami OR landslide OR wildfire';
        const url = `https://newsapi.org/v2/everything?qInTitle=${query}&sortBy=publishedAt&language=en&pageSize=12&apiKey=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Filtered Disaster News:', data);

        if (data.articles && Array.isArray(data.articles)) {
          // Filter out articles without images
          const filteredNews = data.articles.filter(article => article.urlToImage);
          setNews(filteredNews);
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
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
          <p>No disaster-related news articles with images found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h1>Recent Disaster News</h1>
      <div className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <div className="news-image">
              <img src={article.urlToImage} alt={article.title} />
            </div>
            <div className="news-content">
              <h2>{article.title || 'Untitled'}</h2>
              <div className="news-meta">
                <span className="news-date">{formatDate(article.publishedAt)}</span>
                {article.source && <span className="news-source">{article.source.name}</span>}
              </div>
              <p className="news-description">
                {article.description ? `${article.description.slice(0, 200)}...` : 'No description available'}
              </p>
              {article.url && (
                <a
                  href={article.url}
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
