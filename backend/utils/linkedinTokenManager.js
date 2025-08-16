const axios = require('axios');
const Client = require('../models/Client');
const config = require('../config/Outh');

const tokenManager = {
  isTokenExpired: (expiryDate) => {
    return new Date() >= new Date(expiryDate);
  },

  refreshLinkedInToken: async (clientId) => {
    try {
      const client = await Client.findById(clientId);
      
      if (!client?.socialMedia?.linkedin?.accessToken) {
        throw new Error('No LinkedIn token found');
      }

      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
          grant_type: 'refresh_token',
          refresh_token: client.socialMedia.linkedin.refreshToken,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET
        }
      });

      const { access_token, expires_in, refresh_token } = response.data;

      await Client.findByIdAndUpdate(clientId, {
        'socialMedia.linkedin.accessToken': access_token,
        'socialMedia.linkedin.refreshToken': refresh_token,
        'socialMedia.linkedin.tokenExpiry': new Date(Date.now() + expires_in * 1000)
      });

      return access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new Error('Failed to refresh LinkedIn token');
    }
  }
};
const getUserProfile = async (accessToken) => {
  try {
    // Use the OpenID Connect userinfo endpoint instead of /v2/me
    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response?.data || error.message);
    throw error;
  }
};
const exchangeCodeForToken = async (code) => {
  try {
    const response = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Token exchange error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  ...tokenManager,
  getUserProfile,
  
  exchangeCodeForToken
};

