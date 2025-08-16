import React, { useState } from 'react';
import { FaTimes, FaImage, FaVideo, FaLinkedin, FaClock } from 'react-icons/fa';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { toast } from 'react-toastify';
import './createPostModel.css';

const CreatePostModal = ({ isOpen, onClose, selectedClient, onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledFor, setScheduledFor] = useState(new Date());
  const [preview, setPreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handleMediaChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear other media type
    if (type === 'image') {
      setVideo(null);
    } else {
      setImage(null);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Set media file
    type === 'image' ? setImage(file) : setVideo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('clientId', selectedClient._id);
      
      if (image) formData.append('image', image);
      if (video) formData.append('video', video);
      if (isScheduled) {
        formData.append('scheduledFor', scheduledFor.toISOString());
      }

      const response = await fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success(
        isScheduled ? 
          `Post scheduled for ${new Date(data.post.scheduledFor).toLocaleString()}` :
          'Post created successfully!'
      );

      onPostCreated(data.post);
      onClose();
      
      // Reset form
      setContent('');
      setImage(null);
      setVideo(null);
      setPreview(null);
      setIsScheduled(false);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPosting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="create-post-modal">
        <div className="modal-header">
          <h2>Create LinkedIn Post</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <div className="platform-info">
            <FaLinkedin className="linkedin-icon" />
            <span>Posting as: {selectedClient.socialMedia?.linkedin?.name}</span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            className="post-content"
            required
          />

          <div className="media-upload">
            <div className="upload-buttons">
              <label className="upload-btn">
                <FaImage /> Add Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaChange(e, 'image')}
                  hidden
                />
              </label>

              <label className="upload-btn">
                <FaVideo /> Add Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleMediaChange(e, 'video')}
                  hidden
                />
              </label>
            </div>

            {preview && (
              <div className="media-preview">
                {image ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <video src={preview} controls />
                )}
                <button
                  type="button"
                  className="remove-media"
                  onClick={() => {
                    setImage(null);
                    setVideo(null);
                    setPreview(null);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div className="schedule-section">
            <label className="schedule-toggle">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
              />
              <FaClock /> Schedule Post
            </label>

            {isScheduled && (
              <DateTimePicker
                onChange={setScheduledFor}
                value={scheduledFor}
                minDate={new Date()}
                className="datetime-picker"
                format="y-MM-dd h:mm a"
              />
            )}
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="cancel-btn"
              disabled={isPosting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isPosting || !selectedClient.socialMedia?.linkedin?.connected}
            >
              {isPosting ? 'Posting...' : isScheduled ? 'Schedule Post' : 'Post Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;