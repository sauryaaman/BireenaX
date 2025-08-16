const cron = require('node-cron');
const Post = require('../models/linkedinPostModel');
const Client = require('../models/Client');
const LinkedInService = require('./linkedinService');

// Run every minute
cron.schedule('* * * * *', async () => {
  try {
    const scheduledPosts = await Post.find({
      status: 'scheduled',
      scheduledFor: { $lte: new Date() }
    });

    for (const post of scheduledPosts) {
      try {
        const client = await Client.findById(post.clientId);
        
        if (!client?.socialMedia?.linkedin?.connected) {
          post.status = 'failed';
          post.error = 'LinkedIn account not connected';
          await post.save();
          continue;
        }

        const linkedInService = new LinkedInService(
          client.socialMedia.linkedin.accessToken,
          client.socialMedia.linkedin.profileId
        );

          // Check if post has media
 let mediaInfo = null;
   if (post.mediaType !== 'none' && post.mediaAsset?.assetId) {
    console.log('📎 Found scheduled post with media:', {
      postId: post._id,
      mediaType: post.mediaType,
      assetUrn: post.mediaAsset.assetId
    });

    mediaInfo = {
      type: post.mediaType,
      assetId: post.mediaAsset.assetId,
      fileName: post.mediaAsset.fileName
    };
  }

  console.log('🚀 Creating LinkedIn post:', {
    postId: post._id,
    hasMedia: !!mediaInfo,
    scheduledFor: post.scheduledFor
  });
       const linkedInPost = await linkedInService.createPost(post.content, mediaInfo);
  
console.log(' Post created successfully:', {
    postId: post._id,
    linkedInPostId: linkedInPost.id,
    hasMedia: !!mediaInfo
  });
        post.linkedinPostId = linkedInPost.id;
        post.status = 'posted';
        post.postedAt = new Date();
        await post.save();
 console.log(`Successfully posted scheduled post ${post._id} with media:`, 
    mediaInfo ? 'yes' : 'no');
      } catch (error) {
         console.error(`Failed to process scheduled post ${post._id}:`, {
    error: error.message,
    mediaType: post.mediaType,
    hasMediaAsset: !!post.mediaAsset
  });
  post.status = 'failed';
  post.error = error.message;
  await post.save();
      }
    }
  } catch (error) {
    console.error('Scheduler error:', error);
  }
});