import React from 'react';
import {FaHome, 
  FaUserPlus, 
  FaSignOutAlt, 
  FaCog, 
  FaInfoCircle, 
  FaEnvelope, 
  FaBlog,
  FaUser,} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import './sidebar.css';

const Sidebar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data/tokens
    alert('Logged out successfully!');
    logout();
    // Show logout message
    
    
    // Redirect to login page
    navigate('/login');
  }; 
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
     <div className="sidebar">
      <div className="sidebar-nav">
        <div 
          className="nav-item" 
          title="Home"
          onClick={() => handleNavigation('/')}
        >
          <FaHome className="nav-icon" />
        </div>

        <div>
          <div 
            className="nav-item" 
            title="Clients"
            onClick={() => handleNavigation('/clients')}
          >
            <FaUserPlus className="nav-icon" />
          </div>
        </div>
        
        <div 
          className="nav-item" 
          title="Services"
          onClick={() => handleNavigation('/services')}
        >
          <FaCog className="nav-icon" />
        </div>

        <div 
          className="nav-item" 
          title="About Us"
          onClick={() => handleNavigation('/about')}
        >
          <FaInfoCircle className="nav-icon" />
        </div>

        <div 
          className="nav-item" 
          title="Contact Us"
          onClick={() => handleNavigation('/contact')}
        >
          <FaEnvelope className="nav-icon" />
        </div>

        <div 
          className="nav-item" 
          title="Blog"
          onClick={() => handleNavigation('/blog')}
        >
          <FaBlog className="nav-icon" />
        </div>

          <div 
          className="nav-item" 
          title="Admin Profile"
          onClick={() => handleNavigation('/Admin')}
        >
          <FaUser className="nav-icon" />
        </div>
        
       
      </div>
      
      <div className="sidebar-footer">
        <div className="nav-item" title="Logout" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 