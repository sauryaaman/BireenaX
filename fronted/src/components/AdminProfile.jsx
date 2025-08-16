import React, { useState } from 'react';
import { FaUser, FaCamera, FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DeleteConfirmationModal from './DeleteAdmin';
import EditProfileModal from './EditAdminProfile'; 
import Navbar from './navbar';
import Footer from './footer';
import './AdminProfile.css';
import { Slide } from '@mui/material';

const AdminProfilePage = () => {
  const { admin, logout } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteAccount = async (password) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        toast.success('Account deleted successfully');
        logout();
        navigate('/login');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete account');
      }
    } catch (error) {
      toast.error('Error deleting account');
    }
  };

  return (
    <>
    <Navbar />
    
    <div className="admin-profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Admin Profile</h1>
        </div>

        <div className="profile-content">
          <div className="profile-image-section">
            <div className="profile-image">
              {admin.profileImage?.url ? (
                <img src={admin.profileImage.url} alt={admin.name} />
              ) : (
                <FaUser className="default-avatar" />
              )}
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <label>Name</label>
              <p>{admin.name}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{admin.email}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{admin.phone}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="edit-btn"
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit /> Edit Profile
            </button>
            <button 
              className="delete-btn"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaTrash /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal 
          admin={admin}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
    
    </>
  );
};

export default AdminProfilePage;