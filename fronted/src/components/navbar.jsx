import React,{useState,useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminAuth from '../pages/signup';

import "./Navbar.css";



function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
   const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span className="logo-text">PostPilot</span>
          <span className="logo-dot"></span>
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Home</span>
            <span className="nav-indicator"></span>
          </Link>
          
          <Link 
            to="/services" 
            className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Services</span>
            <span className="nav-indicator"></span>
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">About Us</span>
            <span className="nav-indicator"></span>
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Contact</span>
            <span className="nav-indicator"></span>
          </Link>
          
          <Link 
            to="/blog" 
            className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-text">Blog</span>
            <span className="nav-indicator"></span>
          </Link>
           {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <span className="nav-text">Dashboard</span>
              <span className="nav-indicator"></span>
            </Link>
          )}


          
          <button 
          
            className="login-btn"
            onClick={handleAuthClick}
          >
            {isAuthenticated ? <span className="btn-text">Logout</span> : <span className="btn-text">Login</span>}
          
            <span className="btn-icon">→</span>
          </button>
        </div>

        <div 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;