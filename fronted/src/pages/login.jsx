import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
   email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

     // Check if we have a token in the response
      if (response.data && response.data.token) {
        // First set success message
        setSuccess('Login successful!');
        
        // Then update auth context
        login(response.data.token);

        // Clear form
        setFormData({ email: '', password: '' });

        // Add a small delay before navigation to allow state updates
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from, { replace: true });
        }, 500);
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
       console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Login failed. Please check your credentials.'
      );
    
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Left Section - Video */}
        <div className="login-video-section">
          <video 
            className="login-video"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/src/assets/loginAnimation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Section - Login Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h1 className="login-title">Login</h1>
            
            {error && (
              <div className="login-alert error">
                {error}
              </div>
            )}
            
            {success && (
              <div className="login-alert success">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="email"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="submit-btn">
                <span>Submit</span>
              </button>
            </form>

            <div className="signup-link">
              <span className="signup-text">Don't have an account ? </span>
              <Link to="/auth" className="signup-btn">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
