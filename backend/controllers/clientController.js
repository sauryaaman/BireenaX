const { protect } = require('../middleware/authMiddleware');
const Client = require('../models/Client');
const{cloudinary,getConfig }= require('../config/cloudinary');


exports.addClient = protect ,async (req, res) => {
    try {
        const { name, email, phone, socialMedia } = req.body;

        // Check if client exists
        const clientExists = await Client.findOne({ email });
        if (clientExists) {
            return res.status(400).json({ message: 'Client already exists' });
        }

        // Create new client
        const client = await Client.create({
            name,
            email,
            phone,
            socialMedia,
            addedBy: req.admin._id
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClients = protect, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    // Verify cloudinary configuration
    const config = getConfig();
    if (!config.cloud_name) {
      throw new Error('Cloudinary is not properly configured');
    }

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Update basic info
    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;

    // Handle profile image update if provided
    if (req.file) {
      try {
        console.log('Processing image upload...');
        
        // Delete old image if exists
        if (client.profileImage?.publicId) {
          await cloudinary.uploader.destroy(client.profileImage.publicId);
        }

        // Upload new image
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'postpilot/clients',
          resource_type: 'auto'
        });

        client.profileImage = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({
          success: false,
          message: `Failed to handle image: ${uploadError.message}`
        });
      }
    }

    await client.save();

    res.json({
      success: true,
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({  success: false,message: 'Client not found' });
    }

    // Delete profile image from cloudinary if exists
    if (client.profileImage?.publicId) {
      await cloudinary.uploader.destroy(client.profileImage.publicId);
    }

    await Client.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
