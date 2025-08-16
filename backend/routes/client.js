const express = require("express");
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { upload, cloudinary } = require('../config/cloudinary');
const Client = require('../models/Client');
const { updateClient, deleteClient } = require('../controllers/clientController');

// Add new client
router.post('/', protect,upload.single('profileImage'), async (req, res) => {
    try {
        const { name, email, phone, socialMedia } = req.body;

        // Check if client exists
        const clientExists = await Client.findOne({ email });
        if (clientExists) {
            // Delete uploaded image if client exists
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
            return res.status(400).json({ message: 'Client already exists' });
        }

        // Create new client
        const client = await Client.create({
            name,
            email,
            phone,
            socialMedia,
             profileImage: req.file ? {
        url: req.file.path,
        publicId: req.file.filename
      } : undefined,
            addedBy: req.admin._id
        });

        res.status(201).json(client);
    } catch (error) {
         // Delete uploaded image if error occurs
    if (req.file) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
        res.status(500).json({ message: error.message });
    }
});

// Get all clients for logged in admin
router.get('/', protect, async (req, res) => {
    try {
        const clients = await Client.find({ addedBy: req.admin._id });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get single client
router.get('/:id', protect, async (req, res) => {
    try {
        const client = await Client.findOne({
            _id: req.params.id,
            addedBy: req.admin._id
        });

        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/update/:id', protect, upload.single('profileImage'), updateClient);
router.delete('/delete/:id', protect, deleteClient);

module.exports = router;


