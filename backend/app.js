const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

dotenv.config();

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/client");
const linkedinAuthRoutes = require('./routes/linkedin');
const postRoutes = require('./routes/linkedinPost'); // Import the LinkedIn post routes
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

require('./services/schedulePostlinkedin'); // Start the scheduler

const app = express();
try {
  const { cloud_name, api_key } = cloudinary.config();
  if (!cloud_name || !api_key) {
    throw new Error('Invalid Cloudinary configuration');
  }
  console.log('✅ Cloudinary configured successfully');
} catch (error) {
  console.error('❌ Cloudinary configuration error:', error.message);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());
// Update the OAuth callback route - move this BEFORE the API routes
app.get('/oauth/linkedin/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    console.log('LinkedIn callback received:', { code, state });
    
    if (!code || !state) {
      throw new Error('Missing required OAuth parameters');
    }
     // Clear ALL LinkedIn related cookies
    const cookiesToClear = [
      'li_at', 'JSESSIONID', 'bcookie', 'bscookie', 
      'liap', 'li_cc', 'UserMatchHistory', 'aam_uuid',
      'lang', 'lidc', 'sdsc'
    ];
    
 cookiesToClear.forEach(cookieName => {
      res.clearCookie(cookieName, { 
        domain: '.linkedin.com', 
        path: '/',
        secure: true,
        httpOnly: true
      });
      res.clearCookie(cookieName, { 
        domain: '.www.linkedin.com', 
        path: '/',
        secure: true,
        httpOnly: true
      });
    });

    const timestamp = Date.now();
    const redirectUrl = `/api/oauth/linkedin/callback?` + 
      `code=${encodeURIComponent(code)}&` +
      `state=${encodeURIComponent(state)}&` +
      `_=${timestamp}&` +
      `clear_session=true`;
    
     // Set headers to prevent caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?oauth=linkedin-error&message=${encodeURIComponent(error.message)}`);
  }
});
// Add this before your routes
app.use((req, res, next) => {
  // Prevent caching for all OAuth routes
  if (req.path.includes('/oauth/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  next();
});



app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use('/api/oauth/linkedin', linkedinAuthRoutes);
app.use('/api/posts', postRoutes); // Add this line
app.use('/api/admin', adminRoutes); // Add admin routes
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
