import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductAnalytics, fetchOrderAnalytics } from '../redux/adminSlice';

function Analytics() {
  const dispatch = useDispatch();
  const { productAnalytics, orderAnalytics } = useSelector(state => state.admin);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = () => {
    dispatch(fetchProductAnalytics(dateRange));
    dispatch(fetchOrderAnalytics(dateRange));
  };

  return (
    <div className="analytics-section">
      <h2>Analytics Dashboard</h2>

      <div className="date-filter">
        <input 
          type="date" 
          value={dateRange.from}
          onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
        />
        <input 
          type="date" 
          value={dateRange.to}
          onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
        />
        <button onClick={loadAnalytics}>Update</button>
      </div>

      <div className="stats-cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p className="big-number">{orderAnalytics?.total_orders || 0}</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p className="big-number">${orderAnalytics?.total_revenue || 0}</p>
        </div>
        <div className="card">
          <h3>Avg Order Value</h3>
          <p className="big-number">${orderAnalytics?.avg_order_value || 0}</p>
        </div>
        <div className="card">
          <h3>Total Customers</h3>
          <p className="big-number">{orderAnalytics?.total_customers || 0}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart">
          <h3>Order Frequency</h3>
          <div className="bar-chart">
            {orderAnalytics?.order_frequency?.map(item => (
              <div key={item.date} className="bar" style={{height: `${item.count * 10}px`}}>
                <span>{item.count}</span>
                <label>{item.date}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="customer-behavior">
        <h3>Customer Behavior</h3>
        <div className="behavior-stats">
          <p>Repeat Customers: {orderAnalytics?.repeat_customers || 0}</p>
          <p>New Customers: {orderAnalytics?.new_customers || 0}</p>
          <p>Avg Orders per Customer: {orderAnalytics?.avg_orders_per_customer || 0}</p>
        </div>
      </div>

      <div className="top-products">
        <h3>Top Selling Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Views</th>
              <th>Revenue</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {productAnalytics?.top_products?.map(product => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{product.views || 0}</td>
                <td>${product.revenue}</td>
                <td>{product.conversion_rate || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
