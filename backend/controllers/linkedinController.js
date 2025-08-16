


const axios = require('axios');
const Client = require('../models/Client');
const config = require('../config/Outh');

exports.initiateLinkedInAuth = async (req, res) => {
  try {
    const { clientId } = req.params;
    if (!clientId) {
      throw new Error('Client ID is required');
    }

    // Generate unique state
    const uniqueState = `${clientId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    
   
    
    
      // Build authorization URL with strict parameters
     const authUrl = `${config.endpoints.authorization}?` +
        `response_type=code&` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
        `state=${uniqueState}&` +
        `scope=${encodeURIComponent(config.scope.join(' '))}&` +
         `prompt=select_account&` + // Force account selection
      `refresh_session=true`; // Force session refresh
    

    console.log('Generated LinkedIn Auth URL:', { authUrl, clientId });
    
     

    res.json({ 
      authUrl,
      clientId,
      message: 'Authorization URL generated successfully'
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ message: 'Failed to generate authorization URL' });
  }
};

exports.handleLinkedInCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    
    // Extract clientId from state
    const [clientId] = state.split('_');
    console.log('LinkedIn callback received:', { code, clientId });

    if (!code || !clientId) {
      throw new Error('Missing required parameters');
    }

    const client = await Client.findById(clientId);
    if (!client) {
      throw new Error('Invalid client ID');
    }

    // Exchange code for token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user profile
    const userInfoResponse = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Cache-Control': 'no-cache'
      }
    });

    const userData = userInfoResponse.data;

    // Update client with new LinkedIn data
    await Client.findByIdAndUpdate(clientId, {
      'socialMedia.linkedin': {
        connected: true,
        accessToken: access_token,
        profileId: userData.sub,
        name: userData.name,
        profileEmail: userData.email,
        profilePicture: userData.picture,
        tokenExpiry: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
      }
    });

     // Clear URL parameters and redirect
    res.redirect(
      `${config.frontendUrl}/dashboard?oauth=linkedin-success&_=${Date.now()}`
    );
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    res.redirect(
      `${config.frontendUrl}/dashboard?oauth=linkedin-error&_=${Date.now()}`
    );
  }
};


