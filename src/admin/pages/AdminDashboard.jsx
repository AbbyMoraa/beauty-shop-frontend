import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrdersTable from '../components/OrdersTable';
import Analytics from '../components/Analytics';
import UserManagement from '../components/UserManagement';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        <nav className="flex gap-3 mb-8 border-b border-gray-200">
          <button 
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'orders' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'analytics' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
              activeTab === 'users' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </nav>

        <div>
          {activeTab === 'orders' && <OrdersTable />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'users' && <UserManagement />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
