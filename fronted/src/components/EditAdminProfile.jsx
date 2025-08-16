import React, { useState } from 'react';
import { FaCamera, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './EditAdminProfile.css';

const EditAdminProfile = ({ admin, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: admin.name || '',
    email: admin.email || '',
    phone: admin.phone || ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(admin.profileImage?.url || '');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      const response = await fetch('http://localhost:5000/api/admin/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
         toast.success('Profile updated successfully! 🎉', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
        onUpdate(data);
        onClose();
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
       toast.error(`Failed to update profile: ${error.message}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-admin-overlay">
      <div className="edit-admin-modal">
        <div className="edit-admin-header">
          <h2>Edit Profile</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-admin-form">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <img 
                src={previewUrl || '/default-avatar.png'} 
                alt="Profile Preview"
                className="profile-preview"
              />
              <label className="image-upload-label">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              <FaTimes /> Cancel
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={loading}
            >
              <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminProfile;