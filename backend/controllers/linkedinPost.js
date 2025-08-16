const Post = require('../models/linkedinPostModel');
const Client = require('../models/Client');
const LinkedInService = require('../services/linkedinService');
const fs = require('fs').promises;
exports.createPost = async (req, res) => {
  try {
    const { content, clientId, scheduledFor } = req.body;
    const files = req.files;

    const client = await Client.findById(clientId);
    if (!client?.socialMedia?.linkedin?.connected) {
      throw new Error('LinkedIn account not connected');
    }

    const linkedInService = new LinkedInService(
      client.socialMedia.linkedin.accessToken,
      client.socialMedia.linkedin.profileId
    );

    // Handle media registration and upload
    let mediaInfo = null;
    if (files?.image?.[0] || files?.video?.[0]) {
      const file = files.image?.[0] || files.video?.[0];
      const mediaType = files.image?.[0] ? 'image' : 'video';

      console.log('📸 Processing media file:', {
        fileName: file.originalname,
        type: mediaType
      });

      // Register and upload media first
      const registeredMedia = await linkedInService.registerAndUploadMedia(file, mediaType);
      console.log('✅ Media registered:', registeredMedia);

      mediaInfo = {
        type: mediaType,
        assetId: registeredMedia.assetId,
        fileName: file.originalname,
        value: registeredMedia.value
      };
    }

    // Create post document with media info
    const post = new Post({
      content,
      clientId,
      mediaType: mediaInfo?.type || 'none',
      mediaAsset: mediaInfo ? {
        assetId: mediaInfo.assetId,
        uploadUrl: mediaInfo.uploadUrl,
        value: mediaInfo.value,
        fileName: mediaInfo.fileName
      } : null,
      status: scheduledFor ? 'scheduled' : 'pending',
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null
    });

    // If not scheduled, post immediately
    if (!scheduledFor) {
      console.log('🚀 Creating immediate post with media:', {
        hasMedia: !!mediaInfo,
        mediaType: mediaInfo?.type,
        assetId: mediaInfo?.assetId
      });

      const linkedInPost = await linkedInService.createPost(content, mediaInfo);
      post.linkedinPostId = linkedInPost.id;
      post.status = 'posted';
      post.postedAt = new Date();
    }

    await post.save();
    console.log('💾 Post saved to database:', {
      id: post._id,
      hasMedia: !!post.mediaAsset,
      mediaType: post.mediaType,
      assetId: post.mediaAsset?.assetId
    });

    // Clean up files
    if (files?.image?.[0]) await fs.unlink(files.image[0].path);
    if (files?.video?.[0]) await fs.unlink(files.video[0].path);

    res.status(201).json({
      success: true,
      message: scheduledFor ? 'Post scheduled' : 'Post created',
      post
    });

  } catch (error) {
    console.error('❌ Post creation error:', error);
    // Clean up files if there was an error
    if (req.files?.image?.[0]) await fs.unlink(req.files.image[0].path).catch(() => {});
    if (req.files?.video?.[0]) await fs.unlink(req.files.video[0].path).catch(() => {});

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// exports.createPost = async (req, res) => {
//   try {
//     const { content, clientId, scheduledFor } = req.body;
//     const files = req.files;

//     const client = await Client.findById(clientId);
//     if (!client?.socialMedia?.linkedin?.connected) {
//       throw new Error('LinkedIn account not connected');
//     }

//     const linkedInService = new LinkedInService(
//       client.socialMedia.linkedin.accessToken,
//       client.socialMedia.linkedin.profileId
//     );

//     let mediaInfo = null;
//     if (files?.image?.[0] || files?.video?.[0]) {
//       const file = files.image?.[0] || files.video?.[0];
//       const mediaType = files.image?.[0] ? 'image' : 'video';

//     //   // Register media with LinkedIn
//     //   const registeredMedia = await linkedInService.registerMedia(mediaType);
      
//     //   // Upload the media file
//     //   await linkedInService.uploadRegisteredMedia(registeredMedia.uploadUrl, file);
      
//     //   mediaInfo = {
//     //     type: mediaType,
//     //     assetId: registeredMedia.assetId,
//     //     value: registeredMedia.value
//     //   };
//     // }
//       // Register and upload media
//       mediaInfo = await linkedInService.registerAndUploadMedia(file, mediaType);
//     }


//     // Create post document
//     const post = new Post({
//       content,
//       clientId,
//       mediaType: mediaInfo?.type || 'none',
//       // Only store mediaAsset if it's a scheduled post
//        mediaAsset: mediaInfo?.asset || null,
//       status: scheduledFor ? 'scheduled' : 'pending',
//       scheduledFor: scheduledFor ? new Date(scheduledFor) : null
//     });

//     // If not scheduled, post immediately using the just uploaded media
//         if (!scheduledFor) {
//       const linkedInPost = await linkedInService.createPost(content, mediaInfo);
//       post.linkedinPostId = linkedInPost.id;
//       post.status = 'posted';
//       post.postedAt = new Date();
//     }

//     await post.save();

//     // Clean up uploaded files
//     if (files?.image?.[0]) await fs.unlink(files.image[0].path);
//     if (files?.video?.[0]) await fs.unlink(files.video[0].path);

//     res.status(201).json({
//       success: true,
//       message: scheduledFor ? 'Post scheduled' : 'Post created',
//       post
//     });

//   } catch (error) {
//     // Clean up files if there was an error
//     if (req.files?.image?.[0]) await fs.unlink(req.files.image[0].path).catch(() => {});
//     if (req.files?.video?.[0]) await fs.unlink(req.files.video[0].path).catch(() => {});

//     console.error('Post creation error:', error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const client = await Client.findById(post.clientId);
    
    // Only try LinkedIn deletion if post was actually posted
    if (post.status === 'posted' && post.linkedinPostId) {
      try {
        const linkedInService = new LinkedInService(
          client.socialMedia.linkedin.accessToken,
          client.socialMedia.linkedin.profileId
        );
        
        await linkedInService.deletePost(post.linkedinPostId);
        console.log('Successfully deleted from LinkedIn:', post.linkedinPostId);
      } catch (linkedInError) {
        console.error('LinkedIn deletion failed:', linkedInError);
        // Continue with local deletion even if LinkedIn fails
      }
    }

    // Delete from database
    await Post.findByIdAndDelete(postId);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Post deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete post',
      error: error.message
    });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { clientId } = req.params;
    const posts = await Post.find({ clientId })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};