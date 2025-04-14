import React, { useState } from "react";
import "./CommunitySection.css";

export default function CommunitySection() {
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    console.log("Posted:", postText);
  };

  const handleLike = (postId) => {
    console.log("Liked post:", postId);
  };

  const handleComment = (postId) => {
    console.log("Commented on post:", postId);
  };

  const handleShare = (postId) => {
    console.log("Shared post:", postId);
  };

  // Sample media data
  const postMedia = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1523978591478-c753949ff840?w=600",
      description: "Flooding in downtown area"
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=600",
      description: "Storm damage on Main Street"
    }
  ];

  return (
    <div className="community-container">
      {/* Upload Section */}
      <div className="upload-card">
        <div className="upload-content">
          <div className="upload-header">
            <img
              src={import.meta.env.BASE_URL + "assets/catPFP.png"}
              alt="Profile"
              className="profile-pic"
            />
            <textarea
              className="post-textarea"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
          </div>
          <div className="upload-actions">
            <div className="action-buttons">
              <button className="icon-button">📷 Photo</button>
              <button className="icon-button">🎥 Video</button>
              {/* <button className="icon-button">📄 Report</button> */}
              {/* <button className="icon-button">📍 Location</button> */}
            </div>
            <button className="post-button" onClick={handlePost}>➡️ Post</button>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      {[1, 2].map((postId) => (
        <div key={postId} className="feed-card">
          <div className="feed-content">
            <div className="feed-header">
              <img
                src="/profile-placeholder.jpg"
                alt="User"
                className="profile-pic-small"
              />
              <div className="user-info">
                <p className="username">@user{postId}</p>
                <p className="timestamp">📍 Location • 2h ago</p>
              </div>
            </div>
            <p className="post-text">This is a sample disaster update with image or report...</p>
            <div className="media-preview">
              <img 
                src={postMedia[postId - 1].url}
                alt={postMedia[postId - 1].description}
                className="preview-image"
              />
            </div>
            <div className="interaction-row">
              <button className="interaction-button" onClick={() => handleLike(postId)}>
                ❤️ Like
              </button>
              <button className="interaction-button" onClick={() => handleComment(postId)}>
                💬 Comment
              </button>
              <button className="interaction-button" onClick={() => handleShare(postId)}>
                🔁 Share
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 