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

  console.log('Product Analytics:', productAnalytics);
  console.log('Order Analytics:', orderAnalytics);

  useEffect(() => {
    loadAnalytics();
  }, [dispatch]);

  const loadAnalytics = () => {
    dispatch(fetchProductAnalytics(dateRange));
    dispatch(fetchOrderAnalytics(dateRange));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>

      <div className="flex gap-3 mb-5 flex-wrap items-center">
        <input 
          type="date" 
          value={dateRange.from}
          onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
          className="px-2.5 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500 focus:shadow-[0_0_5px_#ec4899]"
        />
        <input 
          type="date" 
          value={dateRange.to}
          onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
          className="px-2.5 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-pink-500 focus:shadow-[0_0_5px_#ec4899]"
        />
        <button onClick={loadAnalytics} className="px-5 py-2.5 bg-gray-600 text-white rounded text-sm transition-all duration-200 hover:bg-gray-700">Update</button>
        
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5 mb-6">
        {!orderAnalytics && (
          <div className="col-span-full bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800">⚠️ Analytics data unavailable. Please ensure the backend analytics endpoints are configured.</p>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 border-l-4 border-pink-600 hover:shadow-lg">
          <h3 className="text-gray-600 m-0 mb-3 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800 m-0">{orderAnalytics?.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 border-l-4 border-pink-600 hover:shadow-lg">
          <h3 className="text-gray-600 m-0 mb-3 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800 m-0">KSh {orderAnalytics?.totalRevenue || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 border-l-4 border-pink-600 hover:shadow-lg">
          <h3 className="text-gray-600 m-0 mb-3 text-sm font-medium">Avg Order Value</h3>
          <p className="text-3xl font-bold text-gray-800 m-0">KSh {orderAnalytics?.averageOrder || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-200 border-l-4 border-pink-600 hover:shadow-lg">
          <h3 className="text-gray-600 m-0 mb-3 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold text-gray-800 m-0">{orderAnalytics?.pendingOrders || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-gray-800 text-lg font-semibold mb-4">Order Frequency</h3>
        <div className="flex gap-2 items-end h-64">
          {orderAnalytics?.order_frequency?.map(item => (
            <div key={item.date} className="flex-1 flex flex-col items-center">
              <div className="bg-pink-500 w-full rounded-t" style={{height: `${item.count * 10}px`}}>
                <span className="text-white text-xs">{item.count}</span>
              </div>
              <label className="text-xs mt-1">{item.date}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-gray-800 text-lg font-semibold mb-4">Customer Behavior</h3>
        <div className="space-y-2">
          <p className="text-gray-700">Repeat Customers: {orderAnalytics?.repeat_customers || 0}</p>
          <p className="text-gray-700">New Customers: {orderAnalytics?.new_customers || 0}</p>
          <p className="text-gray-700">Avg Orders per Customer: {orderAnalytics?.avg_orders_per_customer || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-gray-800 text-lg font-semibold mb-4">Top Selling Products</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Product</th>
              <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Sales</th>
              <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Views</th>
              <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Revenue</th>
              <th className="bg-gray-700 text-white px-3.5 py-3.5 text-left text-sm font-semibold">Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {productAnalytics?.top_products?.map(product => (
              <tr key={product.product_id} className="hover:bg-gray-50">
                <td className="px-3.5 py-3 border-b border-gray-300">{product.name}</td>
                <td className="px-3.5 py-3 border-b border-gray-300">{product.sales}</td>
                <td className="px-3.5 py-3 border-b border-gray-300">{product.views || 0}</td>
                <td className="px-3.5 py-3 border-b border-gray-300">KSh {product.revenue}</td>
                <td className="px-3.5 py-3 border-b border-gray-300">{product.conversion_rate || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
