import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/adminSlice';
import axios from 'axios';

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.admin.orders);
  const [filters, setFilters] = useState({
    date: '',
    category: ''
  });

  console.log('Orders from Redux:', orders);
  if (orders && orders.length > 0) {
    console.log('First order structure:', JSON.stringify(orders[0], null, 2));
  }

  useEffect(() => {
    loadOrders();
  }, [dispatch]);

  const loadOrders = () => {
    dispatch(fetchOrders(filters));
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleExport = (format) => {
    if (format === 'csv') {
      // Create CSV content
      const headers = ['Order ID', 'Customer', 'Total', 'Status', 'Date'];
      const rows = orders && orders.length > 0 
        ? orders.map(order => [order.id, order.user_id || 'N/A', order.total_price, order.status, new Date(order.created_at).toLocaleDateString()].join(','))
        : [];
      const csvContent = [headers.join(','), ...rows].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
      
      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <input 
          type="date" 
          name="date" 
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="Date"
          className="px-2.5 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500 focus:shadow-[0_0_5px_#ec4899]"
        />
        <input 
          type="text" 
          name="category" 
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Category"
          className="px-2.5 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500 focus:shadow-[0_0_5px_#ec4899]"
        />
        <button onClick={loadOrders} className="px-5 py-2.5 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Apply Filters</button>
        
        <button onClick={() => handleExport('csv')} className="px-5 py-2.5 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Export CSV</button>
      </div>

      <table className="w-full bg-white rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Order ID</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">User ID</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Total</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Status</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders && Array.isArray(orders) && orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.id}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.user_id || 'N/A'}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">KSh {order.total_price}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.status}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-3.5 py-3 border-b border-gray-300">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
