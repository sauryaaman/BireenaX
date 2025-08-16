import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
   
import './linkedinCallBack.css';
const LinkedInCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        const clientId = localStorage.getItem('connecting_client_id');

        console.log('LinkedIn callback received:', { code, state, clientId });

        if (!code || !state || !clientId) {
          throw new Error('Missing required parameters');
        }

        const response = await axios.post(
          'http://localhost:5000/api/oauth/linkedin/callback',
          { code, state, clientId }
        );

        if (response.data.success) {
          toast.success('LinkedIn connected successfully!');
        }

        localStorage.removeItem('connecting_client_id');
        navigate('/dashboard');
      } catch (error) {
        console.error('LinkedIn callback error:', error);
        toast.error(error.message || 'Failed to connect LinkedIn');
        navigate('/dashboard');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="oauth-callback">
      <h2>Connecting LinkedIn...</h2>
      <p>Please wait while we complete the authorization.</p>
    </div>
  );
};

export default LinkedInCallback;