

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  profileImage: {
    url: String,
    publicId: String
  },
  socialMedia: {
    facebook: {
       connected: { type: Boolean, default: false },
      accessToken: String,
      profileId: String,
       profileEmail: String,
      name: String,
      tokenExpiry: Date
    },
    instagram: {
        connected: { type: Boolean, default: false },
      accessToken: String,
      profileId: String,
       profileEmail: String,
      name: String,
      tokenExpiry: Date
    },
    linkedin: {
       connected: { type: Boolean, default: false },
      accessToken: String,
      profileId: String,
       profileEmail: String,
      name: String,
      tokenExpiry: Date,
      profilePicture: String
    }
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);