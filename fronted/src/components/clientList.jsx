import React, { useState,useEffect } from 'react';
import { FaSearch, FaUserPlus, FaUserCircle,  FaEllipsisV, FaEdit, FaTrash} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AddClientModal from './addClientModel';
import EditClientModal from './EditClientModel';
import './clientList.css';

const ClientList = ({ onClientSelect, selectedClient, onAddClient }) => {
    const { admin } = useAuth();
    console.log("Admin:", admin);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

   // Fetch clients when component mounts
  useEffect(() => {
    fetchClients();
  }, []);
  const handleClickOutside = (e) => {
  if (!e.target.closest('.dropdown')) {
    setActiveDropdown(null);
  }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/client', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setClients(response.data);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch clients');
      setIsLoading(false);
    }
  };

  const handleAddNewClient = async (newClient) => {
    await fetchClients();
    setShowAddClientModal(false);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  if (isLoading) {
    return <div className="loading">Loading clients...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


const handleEditClick = (client, e) => {
    e.stopPropagation();
    if (!client) {
    toast.error('Client data not available');
    return;
  }
    setClientToEdit(client);
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleEditSave = async (clientId, formData) => {
    try {
      console.log('Updating client:', clientId);
      const response = await axios.put(
        `http://localhost:5000/api/client/update/${clientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      
       if (response.data.success) {
      // Update clients list
      const updatedClients = clients.map(client => 
        client._id === clientId ? response.data.client : client
      );
      setClients(updatedClients);
      
      setShowEditModal(false);
      setClientToEdit(null);
      alert('Client updated successfully');
      toast.success('Client updated successfully');
    }
    } catch (error) {
      console.error('Failed to update client:', error);
      alert('Failed to update client');
       toast.error(error.response?.data?.message || 'Failed to update client');
  
    }
  };

  const handleDeleteClient = async (clientId, e) => {
  e.stopPropagation();
  if (window.confirm('Are you sure you want to delete this client?')) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/client/delete/${clientId}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        // Remove client from list
        setClients(clients.filter(client => client._id !== clientId));
        setActiveDropdown(null);
        alert('Client deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete client');
      }
    } catch (error) {
      console.error('Failed to delete client:', error);
      alert(`Failed to delete client: ${error.message}`);
    }
  }
};




  return (
    <div className="client-list">
      <div className="client-list-header">
        <div className="user-profile">
          <div className="user-avatar">👨‍💼</div>
          <div className="user-info">
            <h3>Welcome,{admin?.name || 'Admin'}</h3>
            <p>Manage your clients</p>
          </div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

           <div className="add-client-section">
        <button 
          className="add-client-btn" 
          onClick={() => setShowAddClientModal(true)}
        >
          <FaUserPlus className="add-icon" />
          <span>+ Add Client</span>
        </button>
      </div>

      <div className="clients-container">
        <div className="clients-header">
          <h4>Clients ({filteredClients.length})</h4>
        </div>
        
       
        <div className="clients-list">
  {filteredClients.map((client) => (
    <div
      key={client._id}
      className={`client-item ${selectedClient?._id === client._id ? 'selected' : ''}`}
      onClick={() => onClientSelect(client)}
    >
      <div className="client-avatar">
        {client.profileImage?.url ? (
          <img 
            src={client.profileImage.url}
            alt={client.name}
            className="client-avatar-image"
          />
        ) : (
          <FaUserCircle className="client-avatar-default" />
        )}
      </div>
      
      <div className="client-info">
        <h5 className="client-name">{client.name}</h5>
        <p className="client-email">{client.email}</p>
      </div>

      <div className="client-actions">
        <div className="dropdown">
          <FaEllipsisV 
            className="dropdown-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setActiveDropdown(activeDropdown === client._id ? null : client._id);
            }}
          />
          {activeDropdown === client._id && (
            <div className="dropdown-menu">
              <button onClick={(e) => handleEditClick(client, e)}>
                <FaEdit /> Edit
              </button>
              <button onClick={(e) => handleDeleteClient(client._id, e)}>
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
       {showEditModal && clientToEdit && (
  
    <EditClientModal
      key={clientToEdit._id}
      client={clientToEdit}
      onClose={() => {
        setShowEditModal(false);
        setClientToEdit(null);
      }}
      onSave={handleEditSave}
    />
 
)}


      </div>
       {/* Add Client Modal */}
      {showAddClientModal && (
        <AddClientModal
          onClose={() => setShowAddClientModal(false)}
          onAddClient={handleAddNewClient}
        />
      )}
    </div>
  );
};

export default ClientList; 