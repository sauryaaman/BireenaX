import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./Footer.css";

// function Footer() {
//   return (
    
    


//     <footer className="footer">
//       <p>© {new Date().getFullYear()} PostPilot. All rights reserved.</p>
//       <p>Contact: support@postpilot.com</p>
//     </footer>
 




//   );
// }

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <h3>PostPilot</h3>
              <div className="logo-dot"></div>
            </div>
            <p className="footer-description">
              Empowering businesses with innovative digital marketing solutions. 
              Transform your online presence with our cutting-edge tools and strategies.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul className="footer-links">
              <li><a href="/social-media">Social Media Marketing</a></li>
              <li><a href="/seo">SEO Optimization</a></li>
              <li><a href="/content">Content Creation</a></li>
              <li><a href="/analytics">Analytics & Reporting</a></li>
              <li><a href="/consulting">Digital Consulting</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>rohitkr824217@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Digital Street, Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} PostPilot. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;