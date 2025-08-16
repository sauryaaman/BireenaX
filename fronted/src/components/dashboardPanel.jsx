import React, { useState, useEffect } from 'react';
import { FaChartBar, FaUsers, FaCalendar, FaBell, FaFacebook,FaFacebookSquare, FaTwitter, FaLinkedin, FaInstagram, FaClock, FaCheck, FaTimes, FaTrash, FaPlus, FaUserCircle, FaTwitterSquare, FaLink, FaCopy, FaExternalLinkAlt  } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreatePostModal from './createPostModel';
import { ToastContainer } from 'react-toastify';
import LinkedInAuthModal from './OauthModel';

import './dashboardPanel.css';

const DashboardPanel = ({ selectedClient }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
   const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clientPosts, setClientPosts] = useState([]);
  const [clientStats, setClientStats] = useState({ total: 0, scheduled: 0, posted: 0, failed: 0 });

   const [isConnecting, setIsConnecting] = useState(false);
   const [showAuthModal, setShowAuthModal] = useState(false);
const [authUrl, setAuthUrl] = useState('');
  const [connectionError, setConnectionError] = useState(null);
  const [isPending, setIsPending] = useState(false);

// Add this function at the top of your component
const forceLinkedInLogout = () => {
  // Set past date
  const pastDate = new Date(0).toUTCString();
  
  // List of all possible LinkedIn cookies
  const cookieNames = [
    'li_at',
    'liap',
    'JSESSIONID',
    'bcookie',
    'bscookie',
    'lang',
    'lidc',
    'sdsc',
    'UserMatchHistory',
    'aam_uuid',
    'li_sugr',
    'li_sugar',
    'spectroscopyId',
    'fid',
  ];

  // Clear all LinkedIn cookies with all possible domains
  cookieNames.forEach(name => {
    document.cookie = `${name}=; expires=${pastDate}; path=/; domain=.linkedin.com`;
    document.cookie = `${name}=; expires=${pastDate}; path=/; domain=.www.linkedin.com`;
    document.cookie = `${name}=; expires=${pastDate}; path=/; domain=.api.linkedin.com`;
  });
   // Clear any stored OAuth state
  localStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('lastConnectedClientId');
};
  // Add this function to clear LinkedIn session
const clearLinkedInSession = () => {
  const domains = ['.linkedin.com', '.www.linkedin.com', '.api.linkedin.com'];
  const paths = ['/', '/oauth', '/developers'];
  
  // List of LinkedIn cookie names to clear
  const cookieNames = [
    'li_at',
    'liap',
    'JSESSIONID',
    'bcookie',
    'bscookie',
    'lang',
    'lidc',
    'li_cc',
    'UserMatchHistory',
    'aam_uuid',
    'AMCV_',
    'spectroscopyId'
  ];

  // Set expiration to past date
  const pastDate = new Date(0).toUTCString();

  // Clear all combinations of domains and paths
  cookieNames.forEach(name => {
    domains.forEach(domain => {
      paths.forEach(path => {
        document.cookie = `${name}=; expires=${pastDate}; path=${path}; domain=${domain}; secure; SameSite=None`;
      });
    });
    // Also try without domain
    document.cookie = `${name}=; expires=${pastDate}; path=/; secure; SameSite=None`;
  });

  // Clear any stored OAuth state
  localStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('currentAuthClient');
};


  // Mock data for each client - unique data for each client
  const getInitialClientData = (clientId) => {
    const clientData = {
      1: {
        name: 'John Doe',
        stats: { total: 4, scheduled: 1, posted: 2, failed: 1 },
        posts: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            title: 'Excited to announce our latest software development services! 🚀 We help businesses transform their digital presence.',
            status: 'posted',
            platforms: ['facebook', 'twitter', 'linkedin'],
            date: 'Jan 15, 2024, 03:30 PM'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            title: 'Our team at John\'s Tech is growing! ☀️ We\'re looking for talented developers to join our innovative team.',
            status: 'scheduled',
            platforms: ['instagram', 'facebook', 'linkedin'],
            date: 'Jan 21, 2024, 12:00 AM'
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
            title: 'Join us for our upcoming webinar on "Digital Transformation Strategies" 📊 Learn how to leverage technology.',
            status: 'posted',
            platforms: ['linkedin', 'twitter'],
            date: 'Jan 25, 2024, 08:30 PM'
          },
          {
            id: 4,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
            title: 'Website maintenance service failed to post due to technical issues. Will retry shortly.',
            status: 'failed',
            platforms: ['twitter'],
            date: 'Jan 19, 2024, 02:15 PM'
          }
        ]
      },
      2: {
        name: 'Jane Smith',
        stats: { total: 3, scheduled: 1, posted: 2, failed: 0 },
        posts: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
            title: 'Jane\'s Design Studio is now offering UI/UX design services! 🎨 Create beautiful, user-friendly interfaces.',
            status: 'posted',
            platforms: ['instagram', 'facebook'],
            date: 'Jan 16, 2024, 09:00 AM'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            title: 'Portfolio showcase: Check out our latest design projects for major brands! ✨',
            status: 'scheduled',
            platforms: ['linkedin', 'instagram'],
            date: 'Jan 23, 2024, 03:00 PM'
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
            title: 'Design tips: How to create engaging social media graphics that convert! 📊',
            status: 'posted',
            platforms: ['facebook', 'twitter'],
            date: 'Jan 17, 2024, 01:30 PM'
          }
        ]
      },
      3: {
        name: 'Mike Johnson',
        stats: { total: 4, scheduled: 2, posted: 2, failed: 0 },
        posts: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            title: 'Mike\'s Marketing Agency: We specialize in digital marketing strategies that drive results! 📈',
            status: 'posted',
            platforms: ['facebook', 'linkedin'],
            date: 'Jan 14, 2024, 08:00 AM'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            title: 'SEO success story: How we increased organic traffic by 400% for our client! 🚀',
            status: 'posted',
            platforms: ['twitter', 'linkedin'],
            date: 'Jan 15, 2024, 11:30 AM'
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
            title: 'PPC campaign management: Get more leads with our targeted advertising strategies!',
            status: 'scheduled',
            platforms: ['facebook', 'instagram'],
            date: 'Jan 22, 2024, 09:00 AM'
          },
          {
            id: 4,
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
            title: 'Content marketing tips: How to create engaging blog posts that rank on Google!',
            status: 'scheduled',
            platforms: ['linkedin', 'twitter'],
            date: 'Jan 16, 2024, 02:15 PM'
          }
        ]
      },
      4: {
        name: 'Sarah Wilson',
        stats: { total: 1, scheduled: 0, posted: 1, failed: 0 },
        posts: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
            title: 'Sarah\'s Photography Studio: Capturing life\'s beautiful moments! 📸',
            status: 'posted',
            platforms: ['instagram', 'facebook'],
            date: 'Jan 15, 2024, 10:00 AM'
          }
        ]
      },
      5: {
        name: 'David Brown',
        stats: { total: 2, scheduled: 1, posted: 1, failed: 0 },
        posts: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            title: 'David\'s Fitness Studio: Transform your body and mind! 💪',
            status: 'posted',
            platforms: ['instagram', 'facebook'],
            date: 'Jan 14, 2024, 06:00 AM'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
            title: 'Personal training sessions: Get personalized workout plans! 🏋️',
            status: 'scheduled',
            platforms: ['instagram', 'facebook'],
            date: 'Jan 22, 2024, 07:00 AM'
          }
        ]
      }
    };

    return clientData[clientId] || {
      name: 'Unknown Client',
      stats: { total: 0, scheduled: 0, posted: 0, failed: 0 },
      posts: []
    };
  };


// Add useEffect to handle client changes

 
   useEffect(() => {
    setClientStats(calculateStats(clientPosts));
  }, [clientPosts]);
useEffect(() => {
  localStorage.removeItem('linkedinAuthState');
  sessionStorage.removeItem('linkedinAuthState');
}, []);


useEffect(() => {
    if (selectedClient?._id) {
      fetchPosts();
    }
  }, [selectedClient]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/client/${selectedClient._id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };
  

  // Add effect to clear parameters on client change
 
 

  // Calculate stats from posts
  const calculateStats = (posts) => {
    const stats = {
      total: posts.length,
      scheduled: posts.filter(post => post.status === 'scheduled').length,
      posted: posts.filter(post => post.status === 'posted').length,
      failed: posts.filter(post => post.status === 'failed').length
    };
    return stats;
  };

  // Update stats when posts change
 

  if (!selectedClient) {
    return (
      <div className="dashboard-panel">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2>Select a client to view dashboard</h2>
          <p>Choose a client from the list to see their personalized dashboard</p>
        </div>
      </div>
    );
  }

  const filteredPosts = clientPosts.filter(post => {
    if (activeFilter === 'all') return true;
    return post.status === activeFilter;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'facebook': return <FaFacebook />;
      case 'twitter': return <FaTwitter />;
      case 'linkedin': return <FaLinkedin />;
      case 'instagram': return <FaInstagram />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const isPosted = status === 'posted';
    return (
      <span className={`status-badge ${isPosted ? 'posted' : 'scheduled'}`}>
        {isPosted ? <FaCheck /> : <FaClock />}
        {status}
      </span>
    );
  };
   

  const handleCreatePost = () => {
    if (!selectedClient.socialMedia?.linkedin?.connected) {
      toast.error('Please connect LinkedIn account first');
      return;
    }
    setShowCreatePostModal(true);
  };

  const handlePostCreated = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
    toast.success('Post created successfully!');
  };

 const handleDeletePost = async (postId) => {
  if (!window.confirm('Are you sure you want to delete this post?')) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/posts/${postId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      toast.success('Post deleted successfully');
    } else {
      throw new Error(data.message || 'Failed to delete post');
    }
  } catch (error) {
    console.error('Delete error:', error);
    toast.error(error.message || 'Failed to delete post');
  }
};


  const handleMarkAsPosted = (postId) => {
    const updatedPosts = clientPosts.map(post => 
      post.id === postId ? { ...post, status: 'posted' } : post
    );
    setClientPosts(updatedPosts);
    alert('Post marked as posted!');
  };

  



  // Update the handleLinkedInConnect function
const handleLinkedInConnect = async () => {
  setIsConnecting(true);
  setConnectionError(null);

  try {
    if (!selectedClient?._id) {
      throw new Error('Client not selected');
    }

    // Get authorization URL for this client
    const response = await axios.get(
      `http://localhost:5000/api/oauth/linkedin/connect/${selectedClient._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    if (response.data?.authUrl) {
      // Store auth URL and show modal instead of redirecting
      setAuthUrl(response.data.authUrl);
      setShowAuthModal(true);
      setIsPending(true); // Set pending state when URL is generated
    
    }
  } catch (error) {
    console.error('LinkedIn connection error:', error);
    setConnectionError('Failed to generate authorization link');
  } finally {
    setIsConnecting(false);
  }
};
  // Add useEffect to clear LinkedIn state on mount


  // Add after handleLinkedInConnect
const handleCopyAuthLink = async () => {
  try {
    await navigator.clipboard.writeText(authUrl);
    toast.success('Authorization link copied to clipboard!');
  } catch (error) {
    setConnectionError('Failed to copy link');
  }
};

const handleOpenAuthLink = () => {
  window.open(authUrl, '_blank');
};

  const handleCopyLink = () => {
    toast.success('Authorization link copied to clipboard!');
  };
  return (
    <div className="dashboard-panel">
      <div className="panel-header">
        <div className="client-header">
          <div className="client-avatar-large">
            {selectedClient.profileImage?.url ? (
              <img 
                src={selectedClient.profileImage.url}
                alt={selectedClient.name}
                className="client-avatar-image"
              />
            ) : (
              <FaUserCircle className="default-avatar-icon" />
            )}

          </div>
          <div className="client-details">
            <h2 className="client-name">{selectedClient.name}</h2>
            <p className="client-email">{selectedClient.email}</p>
          </div>
        </div>
        <div className="header-actions">

 <div className="social-connect-buttons">
            <button 
              className={`connect-btn facebook ${selectedClient.socialMedia?.facebook?.connected ? 'connected' : ''}`}
              onClick={() => handleSocialConnect('facebook')}
            >
              <FaFacebookSquare />
              <span>{selectedClient.socialMedia?.facebook?.connected ? 'Connected' : 'Connect Facebook'}</span>
            </button>

            <button 
              className={`connect-btn instagram ${selectedClient.socialMedia?.instagram?.connected ? 'connected' : ''}`}
              onClick={() => handleSocialConnect('instagram')}
            >
              <FaInstagram />
              <span>{selectedClient.socialMedia?.instagram?.connected ? 'Connected' : 'Connect Instagram'}</span>
            </button>

           {/* //Add this to your existing JSX where the LinkedIn button is */}
            <button 
  className={`connect-btn linkedin ${
    selectedClient.socialMedia?.linkedin?.connected ? 'connected' : 
    isPending ? 'pending' : ''
  }`}
  onClick={handleLinkedInConnect}
  disabled={isConnecting || isPending}
>
  <FaLinkedin />
  <span>
    {isConnecting ? 'Connecting...' : 
     isPending ? `Waiting for ${selectedClient.name}'s approval` :
     selectedClient.socialMedia?.linkedin?.connected ? 
     `Connected as ${selectedClient.socialMedia.linkedin.name}` : 
     'Connect LinkedIn'}
  </span>
</button>
      
      {connectionError && (
        <div className="connection-error">
          {connectionError}
        </div>
      )}

 <button 
              className={`connect-btn twitter ${selectedClient.socialMedia?.twitter?.connected ? 'connected' : ''}`}
              onClick={() => handleSocialConnect('twitter')}
            >
              <FaTwitterSquare />
              <span>{selectedClient.socialMedia?.twitter?.connected ? 'Connected' : 'Connect Twitter'}</span>
            </button>
          </div>


          <button className="action-btn create-post-btn" onClick={handleCreatePost}>
            <FaPlus />
            <span>Create Post</span>
          </button>
          <button className="action-btn">
            <FaBell />
          </button>
        </div>
      </div>

      <div className="panel-content">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaChartBar />
            </div>
            <div className="stat-info">
              <h3>Total Posts</h3>
              <p className="stat-number">{clientStats.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>Scheduled</h3>
              <p className="stat-number">{clientStats.scheduled}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">
              <FaCheck />
            </div>
            <div className="stat-info">
              <h3>Posted</h3>
              <p className="stat-number">{clientStats.posted}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red">
              <FaTimes />
            </div>
            <div className="stat-info">
              <h3>Failed</h3>
              <p className="stat-number">{clientStats.failed}</p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        {/*<div className="filter-buttons">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'scheduled' ? 'active' : ''}`}
            onClick={() => setActiveFilter('scheduled')}
          >
            Scheduled
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'posted' ? 'active' : ''}`}
            onClick={() => setActiveFilter('posted')}
          >
            Posted
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'failed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('failed')}
          >
            Failed
          </button>
        </div>

        {/* Posts Grid 
        <div className="posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-image-container">
                <img src={post.image} alt={post.title} className="post-image" />
                {getStatusBadge(post.status)}
              </div>
              
              <div className="post-content">
                <h4 className="post-title">{post.title}</h4>
                
                <div className="platform-tags">
                  {post.platforms.map((platform, index) => (
                    <span key={index} className="platform-tag">
                      {getPlatformIcon(platform)}
                      {platform}
                    </span>
                  ))}
                </div>
                
                <div className="post-date">
                  <FaClock className="date-icon" />
                  {post.date}
                </div>
                
                <div className="post-actions">
                  {post.status === 'scheduled' && (
                    <button 
                      className="action-link mark-posted"
                      onClick={() => handleMarkAsPosted(post.id)}
                    >
                      Mark as Posted
                    </button>
                  )}
                  <button 
                    className="action-link delete"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>*/}
      {/* </div> */}
      <LinkedInAuthModal 
        showModal={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        authUrl={authUrl}
        selectedClient={selectedClient}
        onCopyLink={handleCopyLink}
      />
       <div className="posts-section">
        <div className="posts-header">
          <h3>Posts</h3>
          <button className="create-post-btn" onClick={handleCreatePost}>
            <FaPlus /> Create Post
          </button>
        </div>

        <div className="filter-buttons">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'scheduled' ? 'active' : ''}`}
            onClick={() => setActiveFilter('scheduled')}
          >
            Scheduled
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'posted' ? 'active' : ''}`}
            onClick={() => setActiveFilter('posted')}
          >
            Posted
          </button>
            <button 
            className={`filter-btn ${activeFilter === 'failed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('failed')}
          >
            Failed
          </button>
        </div>

        {isLoading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <div className="posts-grid">
            {posts
              .filter(post => activeFilter === 'all' || post.status === activeFilter)
              .map(post => (
                <div key={post._id} className="post-card">
                  {post.mediaType !== 'none' && (
                    <div className="post-media">
                      {post.mediaType === 'image' ? (
                        <img src={post.mediaUrl} alt="Post media" />
                      ) : (
                        <video src={post.mediaUrl} controls />
                      )}
                    </div>
                      )}
                  
                  <div className="post-content">
                    <p className="post-text">{post.content}</p>
                    
                    <div className="post-info">
                      <span className={`post-status ${post.status}`}>
                        {post.status}
                      </span>
                      {post.scheduledFor && (
                        <span className="scheduled-time">
                          <FaClock />
                          {new Date(post.scheduledFor).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      className="delete-post-btn"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
      
          ))}
          </div>
        )}
      </div>
      </div>

      <CreatePostModal
        isOpen={showCreatePostModal}
        onClose={() => setShowCreatePostModal(false)}
        selectedClient={selectedClient}
        onPostCreated={handlePostCreated}
      />
         <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </div>

    

    
  );
  
}

export default DashboardPanel;