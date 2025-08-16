

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Alert,
//   Tabs,
//   Tab
// } from '@mui/material';

// function AdminAuth() {
//   const navigate = useNavigate();
//   const [tab, setTab] = useState(0);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

 
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (tab === 1 && formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       if (tab === 0) {
//         // Login
//         const response = await axios.post('http://localhost:5000/api/auth/login', {
//           email: formData.email,
//           password: formData.password
//         });

//         localStorage.setItem('token', response.data.token);
//         setSuccess('Login successful!');
//         navigate('/');
//       } else {
//         // Signup
//         const response = await axios.post('http://localhost:5000/api/auth/signup', {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           password: formData.password
//         });

//         localStorage.setItem('token', response.data.token);
//         setSuccess('Signup successful!');
//         navigate('/');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Authentication failed');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
//         <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 3 }}>
//           <Tab label="Login" />
//           <Tab label="Sign Up" />
//         </Tabs>

//         {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
//         {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

//         <form onSubmit={handleSubmit}>
//           <Box sx={{ '& .MuiTextField-root': { mb: 2 } }}>
//             {tab === 1 && (
//               <>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required={tab === 1}
//                 />
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required={tab === 1}
//                 />
//               </>
//             )}

//             <TextField
//               fullWidth
//               type="email"
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             <TextField
//               fullWidth
//               type="password"
//               label="Password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />

//             {tab === 1 && (
//               <TextField
//                 fullWidth
//                 type="password"
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required={tab === 1}
//               />
//             )}
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             size="large"
//             sx={{ mt: 2 }}
//           >
//             {tab === 0 ? 'Login' : 'Sign Up'}
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// }

// export default AdminAuth;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Will be implemented in backend phase
      // const response = await fetch('/api/admin/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
       const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      login(response.data.token);
      setSuccess('Account created successfully!');
      navigate('/dashboard');
    
  
      
      setSuccess('Account created successfully!');
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
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

        {/* Right Section - Signup Form */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h1 className="login-title">Sign Up</h1>
            
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

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="form-group">
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={(e) => {
      // Only allow numbers and format them
      const value = e.target.value.replace(/[^\d]/g, '');
      // Limit to 10 digits
      if (value.length <= 10) {
        setFormData({
          ...formData,
          phone: value
        });
      }
    }}
    onBlur={(e) => {
      // Format phone number on blur
      const value = e.target.value.replace(/[^\d]/g, '');
      if (value.length === 10) {
        setFormData({
          ...formData,
          phone: `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6)}`
        });
      }
    }}
    className="form-input"
    placeholder="Enter Phone Number (10 digits)"
    pattern="[0-9-]{12}"
    title="Please enter a valid 10-digit phone number"
    required
    maxLength="12"
  />
</div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Email Address"
                  required
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
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <span>Create Account</span>
              </button>
            </form>

            <div className="signup-link">
              <span className="signup-text">Already have an account ? </span>
              <Link to="/login" className="signup-btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;