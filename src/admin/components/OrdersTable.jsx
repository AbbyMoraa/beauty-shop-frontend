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

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    dispatch(fetchOrders(filters));
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleExport = async (format) => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = format === 'csv' ? '/api/admin/export/orders' : '/api/admin/export/orders/pdf';
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders.${format}`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
      
      <div className="flex gap-3 mb-5 flex-wrap">
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
        <button onClick={() => handleExport('pdf')} className="px-5 py-2.5 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Export PDF</button>
      </div>

      <table className="w-full bg-white rounded-md overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Order ID</th>
            <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Customer</th>
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
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.customer}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">KSh {order.total}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.status}</td>
                <td className="px-3.5 py-3 border-b border-gray-300 text-black">{order.date}</td>
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
