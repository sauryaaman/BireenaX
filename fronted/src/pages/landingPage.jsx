import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LandingPage.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
function LandingPage() {
    const navigate = useNavigate();
const { isAuthenticated } = useAuth();
  const handleStart = () => {
    navigate("/auth");
  };
  const handleLearnMore = () => {
    navigate("/services");
  };
  return (


<>
<Navbar />
    {/* <div className="home-container">
      
      <div className="overlay">
        <div className="home-content">
          <h1>PostPilot</h1>
          <p>
            Manage all your clients' social media in one place. Create, schedule, update & automate posts across platforms like Facebook, Instagram & LinkedIn.
          </p>
            {!isAuthenticated && (
                            <button onClick={handleStart}>Get Started</button>
                        )}
        </div>
      </div>
     
    </div> */}


     <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀 #1 Social Media Management Platform</span>
            </div>
            <h1 className="hero-title">
              Manage All Your Clients' 
              <span className="gradient-text"> Social Media</span> 
              in One Place
            </h1>
            <p className="hero-description">
              Create, schedule, update & automate posts across platforms like Facebook, 
              Instagram & LinkedIn. Save time, boost engagement, and grow your clients' 
              social media presence effortlessly.
            </p>
            <div className="hero-buttons">
              {!isAuthenticated && (
                            <button className="primary-btn" onClick={handleStart}>
                <span>Get Started Free</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
                        )}
              
              <button className="secondary-btn" onClick={handleLearnMore}>
                <span>Learn More</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50M+</span>
                <span className="stat-label">Posts Created</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div className="header-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="dashboard-content">
                <div className="content-row">
                  <div className="content-item"></div>
                  <div className="content-item"></div>
                  <div className="content-item"></div>
                </div>
                <div className="content-row">
                  <div className="content-item large"></div>
                  <div className="content-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose PostPilot?</h2>
            <p className="section-subtitle">
              Everything you need to manage social media for multiple clients efficiently
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Multi-Platform Management</h3>
              <p>Manage Facebook, Instagram, LinkedIn, Twitter, and more from a single dashboard. Schedule posts across all platforms simultaneously.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Smart Automation</h3>
              <p>Set up automated posting schedules, content recycling, and AI-powered content suggestions to keep your clients' feeds active 24/7.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 19v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6M7 19h10M12 3v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Client Management</h3>
              <p>Organize multiple clients with separate dashboards, custom branding, and detailed analytics for each account.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18h18M8 12h8M8 8h8M8 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Track engagement, growth, and performance with detailed reports and insights to optimize your social media strategy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Content Calendar</h3>
              <p>Visual content calendar with drag-and-drop functionality to plan and organize your social media content strategy.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Team Collaboration</h3>
              <p>Invite team members, assign roles, and collaborate on content creation with approval workflows and comments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Transform Your Social Media Management?</h2>
            <p>Join thousands of agencies and businesses who trust PostPilot to manage their social media presence.</p>
            <div className="cta-buttons">
               {!isAuthenticated && (
                            <button className="primary-btn" onClick={handleStart}>
                <span>Get Started Free</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
                        )}
              <button className="cta-secondary-btn" onClick={handleLearnMore}>
                View Pricing
              </button>
            </div>
        </div>
      </div>
      </section>
    </div>
     <Footer />
     </>
  );
   
}

export default LandingPage;