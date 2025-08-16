import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import ClientList from '../components/clientList';
import DashboardPanel from '../components/dashboardPanel';
import AddClientModal from '../components/addClientModel';

import './dashboard.css';

const Dashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [clients, setClients] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '👨‍💼' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '👩‍💼' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: '👨‍💻' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '👩‍💻' },
    { id: 5, name: 'David Brown', email: 'david@example.com', avatar: '👨‍🎨' },
  ]);
  


  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

   const handleAddClient = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
         <ClientList
      clients={clients}
      onClientSelect={handleClientSelect}
      selectedClient={selectedClient}
      onAddClient={handleAddClient}
    />
        <DashboardPanel selectedClient={selectedClient} />
      </div>
      {showAddClientModal && (
        <AddClientModal 
          onClose={() => setShowAddClientModal(false)}
          onAddClient={handleAddClient}
        />
      )}
    </div>
  );
};

export default Dashboard; 