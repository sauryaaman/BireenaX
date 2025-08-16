
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  cloudinary  = require("../config/cloudinary");


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup
exports.signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    // Validate input
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create admin - password will be hashed by middleware
    const newAdmin = await Admin.create({ 
      name, 
      phone, 
      email, 
      password 
    });

    res.status(201).json({
      _id: newAdmin._id,
      name: newAdmin.name,
      phone: newAdmin.phone,
      email: newAdmin.email,
      token: generateToken(newAdmin._id),
    });
    console.log(`New admin created: ${newAdmin.email}`);
  } catch (err) {
    res.status(500).json({ 
      message: "Signup failed", 
      error: err.message 
    });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find admin and select password
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password using method from Admin model
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: admin._id,
      name: admin.name,
      phone: admin.phone,
      email: admin.email,
      token: generateToken(admin._id),
    });
    console.log(`Admin logged in: ${admin.email}`);
  } catch (err) {
    res.status(500).json({ 
      message: "Login failed", 
      error: err.message 
    });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id)
      .select('-password')
      .lean(); // Add lean() for better performance
    
    if (!admin) {
      console.log(`Admin not found with ID: ${req.admin._id}`);
      return res.status(404).json({ message: 'Admin not found' });
    }

    console.log(`Admin profile fetched: ${admin.email}`);
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Error fetching admin data' });
  }
};




