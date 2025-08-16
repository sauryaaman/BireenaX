const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { upload, cloudinary } = require('../config/cloudinary');
const { 
  updateAdminProfile, 
  deleteAdminAccount 
} = require('../controllers/adminController');

// Update profile route with image upload
router.put(
  '/profile',
  protect,
  upload.single('profileImage'),
  updateAdminProfile
);

// Delete account route
router.delete(
  '/delete',
  protect,
  deleteAdminAccount
);

module.exports = router;