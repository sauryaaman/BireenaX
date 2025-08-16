import React, { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './DeleteAdmin.css';

const DeleteConfirmationModal = ({ onCancel }) => {
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmText !== 'DELETE MY ACCOUNT') {
      toast.error('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete('http://localhost:5000/api/admin/delete', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: { password }
      });

      if (response.data.success) {
        toast.success('Account deleted successfully');
        await logout(); // Logout the user
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <div className="warning-header">
          <FaExclamationTriangle className="warning-icon" />
          <h2>Delete Admin Account</h2>
        </div>

        <div className="warning-content">
          <p className="warning-message">
            ⚠️ This action is permanent and cannot be undone. All your data will be permanently deleted.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter your password to confirm:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Current password"
              />
            </div>

            <div className="form-group">
              <label>Type "DELETE MY ACCOUNT" to confirm:</label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
                placeholder="DELETE MY ACCOUNT"
              />
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="delete-btn"
                disabled={loading || confirmText !== 'DELETE MY ACCOUNT'}
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;