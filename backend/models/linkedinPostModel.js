const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  mediaType: {
    type: String,
    enum: ['none', 'image', 'video'],
    default: 'none'
  },
  mediaAsset: {
    assetId: String,
    uploadUrl: String,
    value: Object,  // Store the full LinkedIn asset response
    fileName: String
  },
 
  status: {
    type: String,
    enum: ['scheduled', 'posted', 'failed'],
    default: 'scheduled'
  },
  scheduledFor: Date,
   linkedinPostId: String,
  postedAt: Date,
  error: String
}, {
  timestamps: true
});

// Add pre-save middleware for logging
postSchema.pre('save', function(next) {
  if (this.mediaAsset && this.mediaAsset.assetId) {
    console.log('💾 Saving post with media asset:', {
      postId: this._id,
      mediaType: this.mediaType,
      assetUrn: this.mediaAsset.assetId,
      scheduledFor: this.scheduledFor
    });
  }
  next();
});
module.exports = mongoose.model('Post', postSchema);