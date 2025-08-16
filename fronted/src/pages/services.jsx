import React from 'react';
import './services.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Social Media Marketing",
      description: "Help brands grow their presence across platforms like Facebook, Instagram, and LinkedIn. Our tools allow for scheduled posting, performance tracking, and automated engagement to keep your audience connected and growing.",
      icon: "📱",
      features: [
        "Platform-specific content strategy",
        "Community management",
        "Paid advertising campaigns",
        "Performance analytics"
      ]
    },
    {
      id: 2,
      title: "SEO Optimization",
      description: "Enhance your online visibility with proven SEO strategies. From keyword research to technical optimization, our service ensures your content ranks higher on search engines and attracts the right audience organically.",
      icon: "🔍",
      features: [
        "Keyword research & optimization",
        "Technical SEO audits",
        "Content optimization",
        "Local SEO strategies"
      ]
    },
    {
      id: 3,
      title: "Content Creation",
      description: "Our expert team creates engaging and platform-specific content — including posts, captions, and visuals — that align with your brand's voice. Automate content planning and keep your brand consistent across channels.",
      icon: "✍️",
      features: [
        "Blog writing & management",
        "Video content creation",
        "Infographic design",
        "Email marketing campaigns"
      ]
    },
    {
      id: 4,
      title: "Analytics & Reporting",
      description: "Get in-depth insights into your campaigns with easy-to-understand reports. Track performance metrics like reach, engagement, click-through rates, and conversion so you can make data-driven decisions quickly.",
      icon: "📊",
      features: [
        "Performance tracking",
        "Custom dashboards",
        "ROI analysis",
        "Competitive insights"
      ]
    },
    {
      id: 5,
      title: "Digital Consulting",
      description: "Not sure where to begin? We offer one-on-one digital strategy consulting to help businesses set clear goals, build an online presence, and choose the right tools for growth in today's competitive market.",
      icon: "💡",
      features: [
        "Digital strategy development",
        "Technology recommendations",
        "Process optimization",
        "Team training & support"
      ]
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="services-container">
      {/* Header Section */}
      <section className="services-header-section">
        <div className="header-container">
          <h1 className="services-main-title">Our Services</h1>
          <p className="services-subtitle">
            Explore how PostPilot helps you scale your digital strategy.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">
                <span className="service-icon">{service.icon}</span>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="service-features">
                  <h4 className="features-title">What's included:</h4>
                  <ul className="features-list">
                    {service.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="service-cta">
                <button className="learn-more-btn">
                  <span>Learn More</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Digital Presence?</h2>
            <p className="cta-description">
              Let's discuss how our services can help you achieve your business goals and scale your digital strategy effectively.
            </p>
            <div className="cta-buttons">
              <button className="primary-cta-btn">
                <span>Get Started Today</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="secondary-cta-btn">
                <span>Schedule a Consultation</span>
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

export default Services; 