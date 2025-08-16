import React from 'react';
import './About.css';
import { useAuth } from '../context/AuthContext';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
const About = () => {
    const { isAuthenticated } = useAuth();
  return (
    <>
    <Navbar/>
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <div className="about-badge">
              <span>🌟 About PostPilot</span>
            </div>
            <h1 className="about-hero-title">
              We're Building the Future of 
              <span className="gradient-text"> Social Media Management</span>
            </h1>
            <p className="about-hero-description">
              PostPilot was born from a simple idea: managing social media shouldn't be complicated. 
              We're on a mission to help agencies and businesses streamline their social media operations, 
              save time, and drive real results.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To empower businesses and agencies with the most intuitive, powerful, and efficient 
                social media management platform. We believe that great social media management 
                should be accessible to everyone, regardless of team size or budget.
              </p>
              <p>
                Every day, we work to simplify complex workflows, automate repetitive tasks, and 
                provide insights that help our users grow their social media presence and achieve 
                their business goals.
              </p>
            </div>
            <div className="mission-visual">
              <div className="mission-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Innovation First</h3>
              <p>We constantly push boundaries to create cutting-edge solutions that solve real problems and anticipate future needs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Customer Success</h3>
              <p>Your success is our success. We're committed to providing exceptional support and ensuring you achieve your goals.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Simplicity</h3>
              <p>We believe the best solutions are intuitive and easy to use. Complex problems deserve simple solutions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Reliability</h3>
              <p>You can count on us 24/7. We maintain 99.9% uptime and provide robust, secure infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                PostPilot started in 2023 when our founders, a team of social media managers and developers, 
                grew frustrated with the existing tools in the market. They were either too complex, too expensive, 
                or simply didn't work as advertised.
              </p>
              <p>
                What began as a simple internal tool to manage client accounts quickly evolved into something bigger. 
                As we shared it with other agencies and businesses, we realized we weren't alone in our struggles. 
                Everyone was looking for a better way to manage social media.
              </p>
              <p>
                Today, PostPilot serves thousands of agencies and businesses worldwide, helping them save countless 
                hours and achieve remarkable results. But our journey is just beginning.
              </p>
            </div>
            <div className="story-stats">
              <div className="story-stat">
                <span className="stat-number">2023</span>
                <span className="stat-label">Founded</span>
              </div>
              <div className="story-stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="story-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Team Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="section-header">
            <h2>Meet Our Leadership</h2>
            <p>The passionate team behind PostPilot</p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Alex Johnson</h3>
              <span className="team-role">CEO & Co-Founder</span>
              <p>Former social media agency owner with 8+ years of experience in digital marketing and team management.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Sarah Chen</h3>
              <span className="team-role">CTO & Co-Founder</span>
              <p>Full-stack developer with expertise in scalable architecture and user experience design.</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <div className="avatar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3>Michael Rodriguez</h3>
              <span className="team-role">Head of Product</span>
              <p>Product strategist focused on creating intuitive user experiences and driving product innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <div className="about-cta-content">
            <h2>Join Our Journey</h2>
            <p>Ready to transform your social media management? Start your free trial today and see why thousands of businesses choose PostPilot.</p>
            <div className="about-cta-buttons">
             {!isAuthenticated && ( <button className="about-cta-primary-btn">
                Start Free Trial
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button> )}
              <button className="about-cta-secondary-btn">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default About; 