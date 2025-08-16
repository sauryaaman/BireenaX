import React, { useState } from 'react';
import { FaCamera,FaUser} from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import './EditClientModel.css';

const EditClientModal = ({ client, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(client.profileImage?.url || '');
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

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    await onSave(client._id, formDataToSend);
    setLoading(false);
  };


 return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Your Client Profile</h2>
        
        <form onSubmit={handleSubmit}>
        <div className="profile-image-upload">
  <div className="image-preview">
    {previewUrl ? (
      <img src={previewUrl} alt="Profile preview" />
    ) : (
      <div className="no-image">
        <FaUser size={40} color="#ccc" />
      </div>
    )}
  </div>
  <label className="image-upload-label" title="Change photo">
    <FaCamera /> Change Photo
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      hidden
    />
  </label>
</div>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="Enter phone number"
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
       <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </div>
  );
};
export default EditClientModal;