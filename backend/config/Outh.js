const linkedinConfig = {
  clientId: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Updated scopes for OpenID Connect
  scope: [
    'openid',           // Required for OIDC
    'profile',          // Access to basic profile
    'email',           // Access to email
    'w_member_social'   // For posting content
  ],
  
  // Updated endpoints for OpenID Connect
  endpoints: {
    authorization: 'https://www.linkedin.com/oauth/v2/authorization',
    token: 'https://www.linkedin.com/oauth/v2/accessToken',
    userinfo: 'https://api.linkedin.com/v2/userinfo',
    callback: '/api/oauth/linkedin/callback'  // Added callback path
  },

  headers: {
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json'
  }
};

module.exports = linkedinConfig;