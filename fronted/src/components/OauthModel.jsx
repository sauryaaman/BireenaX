import React from 'react';
import { FaTimes, FaCopy, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';
import './OauthModel.css';

const LinkedInAuthModal = ({ 
  showModal, 
  onClose, 
  authUrl, 
  selectedClient,
  onCopyLink 
}) => {
  const handleCopyAuthLink = async () => {
    try {
      await navigator.clipboard.writeText(authUrl);
      onCopyLink();
      onClose(); // Close modal after copying
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };
  if (!showModal) return null;


 

  return (
    <div className="linkedin-auth-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Connect {selectedClient.name}'s LinkedIn Account</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <p className="instructions">
            Copy this authorization link to share with {selectedClient.name}:
          </p>

          <div className="auth-link-container">
            <input 
              type="text" 
              value={authUrl} 
              readOnly 
              className="auth-link-input"
            />
            <button 
              className="copy-btn primary"
              onClick={handleCopyAuthLink}
            >
              <FaCopy /> Copy Link
            </button>
          </div>
  <div className="note">
            <p>After copying the link:</p>
            <ol>
              <li>Share this link with your client</li>
              <li>Client will need to authorize with their LinkedIn account</li>
              <li>Connection status will update automatically</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAuthModal;