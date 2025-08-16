import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './Blog.css';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'social-media', name: 'Social Media' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'automation', name: 'Automation' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 Social Media Trends That Will Dominate 2024",
      excerpt: "Discover the latest trends that will shape social media marketing this year and how to leverage them for your business growth.",
      category: "social-media",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "trends-2024",
      featured: true
    },
    {
      id: 2,
      title: "How to Create Engaging Content That Converts",
      excerpt: "Learn the proven strategies to create content that not only engages your audience but also drives conversions and sales.",
      category: "marketing",
      author: "Alex Johnson",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "content-strategy"
    },
    {
      id: 3,
      title: "The Complete Guide to Social Media Automation",
      excerpt: "Master the art of automating your social media workflow to save time and increase your online presence efficiency.",
      category: "automation",
      author: "Michael Rodriguez",
      date: "March 10, 2024",
      readTime: "8 min read",
      image: "automation-guide"
    },
    {
      id: 4,
      title: "5 Instagram Reels Strategies That Actually Work",
      excerpt: "Unlock the secrets to creating viral Instagram Reels that boost your brand visibility and engagement rates.",
      category: "social-media",
      author: "Emma Davis",
      date: "March 8, 2024",
      readTime: "6 min read",
      image: "instagram-reels"
    },
    {
      id: 5,
      title: "Building a Social Media Strategy for Small Businesses",
      excerpt: "A comprehensive guide to developing an effective social media strategy that works for small businesses and startups.",
      category: "marketing",
      author: "David Wilson",
      date: "March 5, 2024",
      readTime: "9 min read",
      image: "small-business"
    },
    {
      id: 6,
      title: "The Psychology Behind Viral Social Media Posts",
      excerpt: "Understand the psychological factors that make content go viral and how to apply these principles to your posts.",
      category: "tips",
      author: "Lisa Thompson",
      date: "March 3, 2024",
      readTime: "6 min read",
      image: "viral-psychology"
    },
    {
      id: 7,
      title: "How to Schedule Posts for Maximum Engagement",
      excerpt: "Discover the optimal posting times and scheduling strategies to maximize your social media engagement.",
      category: "automation",
      author: "James Brown",
      date: "March 1, 2024",
      readTime: "5 min read",
      image: "scheduling"
    },
    {
      id: 8,
      title: "Social Media Analytics: What Metrics Really Matter",
      excerpt: "Learn which social media metrics are most important for measuring success and optimizing your strategy.",
      category: "tips",
      author: "Rachel Green",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "analytics"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <>
    <Navbar/>
    <div className="blog-container">
      {/* Hero Section */}
      <section className="blog-hero-section">
        <div className="blog-hero-container">
          <div className="blog-hero-content">
            <div className="blog-badge">
              <span>📝 Blog & Insights</span>
            </div>
            <h1 className="blog-hero-title">
              Latest Insights on 
              <span className="gradient-text"> Social Media Marketing</span>
            </h1>
            <p className="blog-hero-description">
              Discover expert tips, industry trends, and actionable strategies to help you 
              master social media marketing and grow your business online.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="featured-post-section">
          <div className="featured-post-container">
            <div className="section-header">
              <h2>Featured Article</h2>
              <p>Our most popular and insightful content</p>
            </div>
            <div className="featured-post-card">
              <div className="featured-post-image">
                <div className="image-placeholder">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="featured-post-content">
                <div className="post-meta">
                  <span className="post-category">{featuredPost.category.replace('-', ' ')}</span>
                  <span className="post-date">{featuredPost.date}</span>
                  <span className="post-read-time">{featuredPost.readTime}</span>
                </div>
                <h3 className="featured-post-title">{featuredPost.title}</h3>
                <p className="featured-post-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-post-author">
                  <div className="author-avatar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="author-name">By {featuredPost.author}</span>
                </div>
                <button className="read-more-btn">
                  Read Full Article
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section">
        <div className="blog-posts-container">
          <div className="posts-grid">
            {filteredPosts.filter(post => !post.featured).map(post => (
              <article key={post.id} className="blog-post-card">
                <div className="post-image">
                  <div className="image-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category.replace('-', ' ')}</span>
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-author">
                    <div className="author-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="author-name">By {post.author}</span>
                  </div>
                  <button className="read-more-btn small">
                    Read More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated with Our Latest Insights</h2>
            <p>Get the latest social media tips, trends, and strategies delivered straight to your inbox.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                Subscribe
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="newsletter-note">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default Blog; 