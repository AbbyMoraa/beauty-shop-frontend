import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrdersTable from '../components/OrdersTable';
import Analytics from '../components/Analytics';
import UserManagement from '../components/UserManagement';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const dispatch = useDispatch();

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <nav>
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''} 
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </nav>
      </header>

      <div className="main-content">
        {activeTab === 'orders' && <OrdersTable />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'users' && <UserManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
