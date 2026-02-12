import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './admin/redux/adminSlice';
import AdminDashboard from './admin/pages/AdminDashboard';

const store = configureStore({
  reducer: {
    admin: adminReducer
  }
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<div><h1>Beauty Shop</h1><a href="/admin">Go to Admin</a></div>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
