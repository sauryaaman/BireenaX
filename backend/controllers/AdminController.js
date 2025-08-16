const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');

// Update admin profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }

    // Update basic info
    const { name, email, phone } = req.body;
    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;

    // Handle profile image update
    if (req.file) {
      try {
        // Delete old image if exists
        if (admin.profileImage?.publicId) {
          await cloudinary.uploader.destroy(admin.profileImage.publicId);
        }

        // Upload new image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'admin-profiles'
        });

        admin.profileImage = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Failed to update profile image'
        });
      }
    }

    await admin.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        profileImage: admin.profileImage
      }
    });
  } catch (error) {
    console.error('Update admin error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteAdminAccount = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Delete profile image if exists
    if (admin.profileImage?.publicId) {
      try {
        await cloudinary.uploader.destroy(admin.profileImage.publicId);
      } catch (error) {
        console.error('Error deleting profile image:', error);
      }
    }

    // Delete the admin account
    await Admin.findByIdAndDelete(admin._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete account'
    });
  }
};