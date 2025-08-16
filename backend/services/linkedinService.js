const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class LinkedInService {
  constructor(accessToken, profileId) {
    this.accessToken = accessToken;
    this.profileId = profileId;
    this.headers = {
      'Authorization': `Bearer ${accessToken}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'Content-Type': 'application/json'
    };
  }

  async uploadMedia(fileData, mediaType) {
    try {
      if (!fileData || !fileData.path) {
        throw new Error('Invalid file data provided');
      }

      // Step 1: Register upload
      const registerResponse = await axios.post(
        'https://api.linkedin.com/v2/assets?action=registerUpload',
        {
          registerUploadRequest: {
            recipes: [
              `urn:li:digitalmediaRecipe:feedshare-${mediaType}`
            ],
            owner: `urn:li:person:${this.profileId}`,
            serviceRelationships: [
              {
                relationshipType: 'OWNER',
                identifier: 'urn:li:userGeneratedContent'
              }
            ]
          }
        },
        { headers: this.headers }
      );

      const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
      const asset = registerResponse.data.value.asset;

      // Step 2: Create form data with file
      const formData = new FormData();
      const fileStream = fs.createReadStream(fileData.path);
      formData.append('file', fileStream, {
        filename: path.basename(fileData.path),
        contentType: fileData.mimetype
      });

      // Step 3: Upload file
      await axios.post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${this.accessToken}`
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });

      // Wait for asset processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      return asset;
    } catch (error) {
      console.error('Media upload error:', error.response?.data || error);
      throw new Error(`Failed to upload media: ${error.message}`);
    }
  }
   async registerMedia(mediaType) {
    try {
      const response = await axios.post(
        'https://api.linkedin.com/v2/assets?action=registerUpload',
        {
          registerUploadRequest: {
            recipes: [
              `urn:li:digitalmediaRecipe:feedshare-${mediaType}`
            ],
            owner: `urn:li:person:${this.profileId}`,
            serviceRelationships: [
              {
                relationshipType: 'OWNER',
                identifier: 'urn:li:userGeneratedContent'
              }
            ]
          }
        },
        { headers: this.headers }
      );

      return {
        assetId: response.data.value.asset,
        uploadUrl: response.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl,
        value: response.data.value
      };
    } catch (error) {
      console.error('Media registration error:', error.response?.data || error);
      throw new Error(`Failed to register media: ${error.message}`);
    }
  }

  async uploadRegisteredMedia(uploadUrl, file) {
    try {
      const formData = new FormData();
      const fileStream = fs.createReadStream(file.path);
      formData.append('file', fileStream);

      await axios.post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      return true;
    } catch (error) {
      console.error('Media upload error:', error.response?.data || error);
      throw new Error(`Failed to upload media: ${error.message}`);
    }
  }
  async registerAndUploadMedia(file, mediaType) {
    try {
      console.log('📝 Starting media registration:', {
        fileName: file.originalname,
        mediaType,
        fileSize: file.size
      });

      // Step 1: Register media
      const registerResponse = await axios.post(
        'https://api.linkedin.com/v2/assets?action=registerUpload',
        {
          registerUploadRequest: {
            recipes: [`urn:li:digitalmediaRecipe:feedshare-${mediaType}`],
            owner: `urn:li:person:${this.profileId}`,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent'
            }]
          }
        },
        { headers: this.headers }
      );

      const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
      const assetUrn = registerResponse.data.value.asset;

      console.log('✅ Media registered successfully:', {
        assetUrn,
        uploadUrl: uploadUrl.substring(0, 50) + '...' // Truncate for readability
      });

      // Step 2: Upload media
      const formData = new FormData();
      const fileStream = fs.createReadStream(file.path);
      formData.append('file', fileStream, {
        filename: file.originalname,
        contentType: file.mimetype
      });

      console.log(' Uploading media file...');
      
      await axios.post(uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${this.accessToken}`
        }
      });

      console.log(' Media upload completed successfully');

      // Step 3: Wait for processing
      console.log(' Waiting for media processing...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      return {
        assetId: assetUrn,
        uploadUrl,
        value: registerResponse.data.value,
        fileName: file.originalname
      };
    } catch (error) {
      console.error(' Media upload failed:', error.response?.data || error);
      throw new Error(`Media upload failed: ${error.message}`);
    }
  }

  async createPost(content, mediaInfo = null) {
    try {
         console.log('📝 Creating LinkedIn post:', {
      hasMedia: !!mediaInfo,
      mediaType: mediaInfo?.type,
      assetId: mediaInfo?.assetId
    });

      // let mediaAsset = null;
      // let mediaCategory = 'NONE';

      // if (media && media.file) {
      //   mediaAsset = await this.uploadMedia(media.file, media.type);
      //   mediaCategory = media.type.toUpperCase();
      // }

         const postData = {
      author: `urn:li:person:${this.profileId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content
          },
          shareMediaCategory: mediaInfo?.type ? mediaInfo.type.toUpperCase() : 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };


   
       if (mediaInfo?.assetId) {
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
        status: 'READY',
        media: mediaInfo.assetId,
        title: {
          text: mediaInfo.fileName || 'Media Post'
        }
      }];
    }

    console.log('📤 Sending post data:', JSON.stringify(postData, null, 2));
      const response = await axios.post(
        'https://api.linkedin.com/v2/ugcPosts',
        postData,
        { headers: this.headers }
      );
console.log('Post creation successful:', response.data);

      return {
        id: response.data.id,
        ...response.data
      };
    } catch (error) {
      console.error('LinkedIn post creation error:', error.response?.data || error);
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async deletePost(postId) {
  try {
    if (!postId) {
      throw new Error('Post ID is required');
    }

    // Extract just the numeric ID and remove any URN prefixes
    let cleanId = postId;
    if (postId.includes('urn:li:')) {
      cleanId = postId.split(':').pop();
    }

    // Log the ID we're trying to delete
    console.log('Attempting to delete post with ID:', cleanId);

    // Try the ugcPost endpoint first
    try {
      await axios.delete(
        `https://api.linkedin.com/v2/ugcPosts/${cleanId}`,
        { 
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0'
          }
        }
      );
      console.log('Successfully deleted post with ugcPost endpoint');
      return true;
    } catch (ugcError) {
      console.log('UGC deletion failed, trying share endpoint...');
      
      // If ugcPost fails, try the share endpoint
      try {
        await axios.delete(
          `https://api.linkedin.com/v2/shares/${cleanId}`,
          { 
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'X-Restli-Protocol-Version': '2.0.0'
            }
          }
        );
        console.log('Successfully deleted post with share endpoint');
        return true;
      } catch (shareError) {
        console.error('Share deletion error:', shareError.response?.data);
        throw shareError;
      }
    }
  } catch (error) {
    console.error('Final LinkedIn delete error:', {
      message: error.message,
      response: error.response?.data
    });
    throw new Error(`Failed to delete post: ${error.response?.data?.message || error.message}`);
  }
}
}

module.exports = LinkedInService;