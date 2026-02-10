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
    <div className="orders-section">
      <h2>All Orders</h2>
      
      <div className="filters">
        <input 
          type="date" 
          name="date" 
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="Date"
        />
        <input 
          type="text" 
          name="category" 
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Category"
        />
        <button onClick={loadOrders}>Apply Filters</button>
        <button onClick={() => handleExport('csv')}>Export CSV</button>
        <button onClick={() => handleExport('pdf')}>Export PDF</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
