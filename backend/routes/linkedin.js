const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  initiateLinkedInAuth, 
  handleLinkedInCallback 
} = require('../controllers/linkedinController');
const config = require('../config/Outh');

router.get('/connect/:clientId', protect, initiateLinkedInAuth);
router.get('/callback', handleLinkedInCallback);

router.get('/generate-auth/:clientId', protect, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Generate LinkedIn OAuth URL
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${process.env.LINKEDIN_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI)}&` +
      `state=${clientId}&` +
      `scope=${encodeURIComponent(config.scope.join(' '))}`;

    res.json({ 
      authUrl,
      clientId,
      message: 'Authorization URL generated successfully'
    });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ message: 'Failed to generate authorization URL' });
  }
});

module.exports = router;